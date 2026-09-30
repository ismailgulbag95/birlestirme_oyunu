// AdManager.js - Reklam Yönetim ve Entegrasyon Altyapısı
// Google AdMob (Capacitor) ve gelecekteki diğer reklam sağlayıcıları (Unity Ads vb.) için hazır soyutlama katmanı.

export class AdManager {
  constructor() {
    this.provider = null;
    this.onRewardCallbacks = [];
    this.rewardInProgress = false;
    this._initProvider();
  }

  _initProvider() {
    // 1. Capacitor AdMob eklentisi mevcutsa onu bağla
    const adMob = typeof window !== 'undefined' ? window.Capacitor?.Plugins?.AdMob : null;
    if (adMob && typeof adMob.showRewardVideoAd === 'function') {
      this.provider = {
        name: 'CapacitorAdMob',
        showRewarded: async () => {
          try {
            return await adMob.showRewardVideoAd();
          } catch (err) {
            console.warn('[AdManager] Native AdMob error:', err);
            return false;
          }
        }
      };
      console.log('[AdManager] Native AdMob provider detected.');
    } else {
      console.warn('[AdManager] No rewarded ad provider configured.');
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
    if (this.provider && typeof this.provider.isReady === 'function') {
      return this.provider.isReady();
    }
    return Boolean(this.provider);
  }

  preloadNext() {
    if (this.provider && typeof this.provider.prepare === 'function') {
      Promise.resolve(this.provider.prepare()).catch(e => console.warn('[AdManager] Preload error:', e));
    }
  }

  /**
   * Ödüllü reklamı gösterir.
   * @param {Object} options - { rewardType: string, itemId?: string, multiplier?: number }
   * @returns {Promise<{ success: boolean, multiplier: number }>}
   */
  async showRewardedAd(options = {}) {
    const multiplier = options.multiplier || 1;
    if (!this.provider || typeof this.provider.showRewarded !== 'function') {
      return { success: false, multiplier: 1, error: 'unavailable' };
    }
    if (this.rewardInProgress) return { success: false, multiplier: 1, error: 'in_progress' };

    this.rewardInProgress = true;
    try {
      const result = await this.provider.showRewarded(options);
      const rewarded = result === true || result?.rewarded === true;
      if (rewarded) {
        this.onRewardCallbacks.forEach(cb => {
          try { cb(options); } catch (e) { console.error(e); }
        });
        return { success: true, multiplier };
      }
      return { success: false, multiplier: 1, error: 'not_rewarded' };
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
