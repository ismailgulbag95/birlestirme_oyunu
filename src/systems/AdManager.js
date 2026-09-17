// AdManager.js - Reklam Yönetim ve Entegrasyon Altyapısı
// Google AdMob (Capacitor) ve gelecekteki diğer reklam sağlayıcıları (Unity Ads vb.) için hazır soyutlama katmanı.

export class AdManager {
  constructor() {
    this.provider = null;
    this.isLoaded = true;
    this.onRewardCallbacks = [];
    this._initProvider();
  }

  _initProvider() {
    // 1. Capacitor AdMob eklentisi mevcutsa onu bağla
    if (typeof window !== 'undefined' && window.Capacitor?.Plugins?.AdMob) {
      this.provider = {
        name: 'CapacitorAdMob',
        native: window.Capacitor.Plugins.AdMob,
        showRewarded: async () => {
          try {
            await window.Capacitor.Plugins.AdMob.showRewardVideoAd();
            return true;
          } catch (err) {
            console.warn('[AdManager] Native AdMob error, falling back:', err);
            return false;
          }
        }
      };
      console.log('[AdManager] Native AdMob provider detected.');
    } else {
      // 2. Mock / Web Test Sağlayıcısı (Tarayıcı ortamında sorunsuz çalışır)
      this.provider = {
        name: 'MockWebProvider',
        showRewarded: async (rewardDetails) => {
          return new Promise((resolve) => {
            console.log('[AdManager] Mock rewarded ad started...', rewardDetails);
            // Simüle edilmiş kısa reklam izleme akışı
            setTimeout(() => {
              console.log('[AdManager] Mock rewarded ad finished successfully.');
              resolve(true);
            }, 500);
          });
        }
      };
    }
  }

  /**
   * Özel bir reklam sağlayıcısı (örn: Production AdMob, IronSource, Unity) atamak için kullanılır.
   * @param {Object} customProvider - { name: string, showRewarded: async (details) => boolean, isReady?: () => boolean }
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
    return this.isLoaded;
  }

  preloadNext() {
    if (this.provider && typeof this.provider.prepare === 'function') {
      this.provider.prepare().catch(e => console.warn('[AdManager] Preload error:', e));
    }
  }

  /**
   * Ödüllü reklamı gösterir.
   * @param {Object} options - { rewardType: string, itemId?: string, multiplier?: number }
   * @returns {Promise<{ success: boolean, multiplier: number }>}
   */
  async showRewardedAd(options = {}) {
    const multiplier = options.multiplier || 1;
    if (!this.provider) {
      return { success: false, multiplier: 1 };
    }

    try {
      const watched = await this.provider.showRewarded(options);
      if (watched) {
        this.onRewardCallbacks.forEach(cb => {
          try { cb(options); } catch (e) { console.error(e); }
        });
        return { success: true, multiplier };
      }
      return { success: false, multiplier: 1 };
    } catch (err) {
      console.error('[AdManager] Error during showRewardedAd:', err);
      return { success: false, multiplier: 1 };
    }
  }

  onReward(callback) {
    if (typeof callback === 'function') {
      this.onRewardCallbacks.push(callback);
    }
  }
}

export const adManager = new AdManager();
