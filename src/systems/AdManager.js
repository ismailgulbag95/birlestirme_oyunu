import { Capacitor, registerPlugin } from '@capacitor/core';
import { AdMob, AdmobConsentStatus } from '@capacitor-community/admob';

const TEST_REWARDED_AD_UNIT_ID = 'ca-app-pub-3940256099942544/5224354917';
const AdPrivacy = registerPlugin('AdPrivacy');
const buildEnv = import.meta.env ?? {};

export class AdManager {
  constructor() {
    this.provider = null;
    this.onRewardCallbacks = [];
    this.rewardInProgress = false;
    this.canRequestAds = false;
    this.privacyOptionsRequired = false;
    this.useTestAds = Boolean(buildEnv.DEV) || buildEnv.MODE === 'test';
    this.adUnitId = this.useTestAds
      ? TEST_REWARDED_AD_UNIT_ID
      : buildEnv.VITE_ADMOB_REWARDED_AD_UNIT_ID;
    this.isNative = Capacitor.isNativePlatform();
    this.initialization = this._initProvider();
  }

  async _initProvider() {
    if (!this.isNative || !this.adUnitId) return false;

    try {
      try {
        const consent = await AdMob.requestConsentInfo();
        if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
          await AdMob.showConsentForm();
        }
      } catch (error) {
        // UMP can still use a consent choice saved from an earlier session.
        console.warn('[AdManager] Consent info update failed:', error);
      }

      await this._refreshConsentState();
      if (!this.canRequestAds) return false;

      await AdMob.initialize({ initializeForTesting: this.useTestAds });

      let adReady = false;
      let preparingAd = null;
      const prepare = () => {
        if (!this.canRequestAds) return Promise.resolve(false);
        if (adReady) return Promise.resolve(true);
        if (preparingAd) return preparingAd;

        preparingAd = AdMob.prepareRewardVideoAd({
          adId: this.adUnitId,
          isTesting: this.useTestAds
        })
          .then(() => {
            adReady = true;
            return true;
          })
          .catch(error => {
            console.warn('[AdManager] Rewarded ad load failed:', error);
            return false;
          })
          .finally(() => {
            preparingAd = null;
          });

        return preparingAd;
      };

      this.provider = {
        name: 'CapacitorCommunityAdMob',
        isReady: () => adReady,
        prepare,
        invalidate: () => { adReady = false; },
        showRewarded: async () => {
          if (!this.canRequestAds) return { error: 'consent_required' };
          if (!await prepare()) return { error: 'unavailable' };

          try {
            const reward = await AdMob.showRewardVideoAd();
            adReady = false;
            this.preloadNext();
            return { rewarded: Number(reward?.amount) > 0 };
          } catch (error) {
            adReady = false;
            this.preloadNext();
            throw error;
          }
        }
      };

      this.preloadNext();
      return true;
    } catch (error) {
      console.warn('[AdManager] AdMob initialization or consent failed:', error);
      return false;
    }
  }

  async _refreshConsentState() {
    const [adsState, privacyState] = await Promise.all([
      AdPrivacy.canRequestAds(),
      AdPrivacy.isPrivacyOptionsRequired()
    ]);
    this.canRequestAds = adsState?.canRequestAds === true;
    this.privacyOptionsRequired = privacyState?.required === true;
    return this.canRequestAds;
  }

  isPrivacyOptionsRequired() {
    return this.isNative && this.privacyOptionsRequired;
  }

  async showPrivacyOptions() {
    if (!this.isPrivacyOptionsRequired()) return false;

    try {
      await AdPrivacy.showPrivacyOptionsForm();
      await this._refreshConsentState();
      this.provider?.invalidate?.();
      if (this.canRequestAds) await this.preloadNext();
      return true;
    } catch (error) {
      console.warn('[AdManager] Privacy options form failed:', error);
      try {
        await this._refreshConsentState();
      } catch {
        this.canRequestAds = false;
      }
      this.provider?.invalidate?.();
      if (this.canRequestAds) await this.preloadNext();
      return false;
    }
  }

  /**
   * Özel bir reklam sağlayıcısı (örn: Production AdMob, IronSource, Unity) atamak için kullanılır.
   * The provider must resolve true (or { rewarded: true }) only after its SDK confirms the reward.
   * @param {Object} customProvider - { name: string, showRewarded: async (details) => boolean | { rewarded: boolean }, isReady?: () => boolean }
   */
  setProvider(customProvider) {
    if (customProvider && typeof customProvider.showRewarded === 'function') {
      this.provider = customProvider;
      console.log(`[AdManager] Custom ad provider set: ${customProvider.name || 'Anonymous'}`);
    }
  }

  isAdAvailable() {
    if (!this.canRequestAds) return false;
    if (this.provider && typeof this.provider.isReady === 'function') {
      return this.provider.isReady();
    }
    return Boolean(this.provider);
  }

  isAdConfigured() {
    return this.isNative && Boolean(this.adUnitId);
  }

  preloadNext() {
    if (!this.canRequestAds) return Promise.resolve(false);
    if (this.provider && typeof this.provider.prepare === 'function') {
      return Promise.resolve(this.provider.prepare()).catch(e => {
        console.warn('[AdManager] Preload error:', e);
        return false;
      });
    }
    return Promise.resolve(false);
  }

  /**
   * Ödüllü reklamı gösterir.
   * @param {Object} options - { rewardType: string, itemId?: string, multiplier?: number }
   * @returns {Promise<{ success: boolean, multiplier: number }>}
   */
  async showRewardedAd(options = {}) {
    const multiplier = options.multiplier || 1;
    await this.initialization;
    if (!this.canRequestAds) {
      return { success: false, multiplier: 1, error: 'consent_required' };
    }
    if (!this.provider || typeof this.provider.showRewarded !== 'function') {
      return { success: false, multiplier: 1, error: 'unavailable' };
    }
    if (this.rewardInProgress) return { success: false, multiplier: 1, error: 'in_progress' };

    this.rewardInProgress = true;
    try {
      const result = await this.provider.showRewarded(options);
      const rewarded = result === true || result?.rewarded === true || Number(result?.amount) > 0;
      if (rewarded) {
        this.onRewardCallbacks.forEach(cb => {
          try { cb(options); } catch (e) { console.error(e); }
        });
        return { success: true, multiplier };
      }
      return { success: false, multiplier: 1, error: result?.error || 'not_rewarded' };
    } catch (err) {
      console.error('[AdManager] Error during showRewardedAd:', err);
      return { success: false, multiplier: 1, error: 'failed' };
    } finally {
      this.rewardInProgress = false;
    }
  }

  onReward(callback) {
    if (typeof callback === 'function') {
      this.onRewardCallbacks.push(callback);
    }
  }
}

export const adManager = new AdManager();
