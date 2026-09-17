// SubscriptionManager.js - Grandmaster Abonelik & Ödeme Yönetim Altyapısı
// Google Play Billing / Apple StoreKit / RevenueCat entegrasyonuna hazır soyutlama.

export const SUBSCRIPTION_PLANS = [
  {
    id: 'intro_monthly',
    nameTr: 'Tanışma Paketi (İlk Ay)',
    nameEn: 'Intro Offer (1st Month)',
    priceFormatted: '₺49,99',
    billingPeriod: '1 ay (sonra ₺79,99/ay)',
    badgeTr: 'ÖNERİLEN',
    badgeEn: 'RECOMMENDED',
    isIntro: true
  },
  {
    id: 'monthly',
    nameTr: 'Aylık Grandmaster',
    nameEn: 'Monthly Grandmaster',
    priceFormatted: '₺79,99',
    billingPeriod: 'Her ay yenilenir',
    badgeTr: 'STANDART',
    badgeEn: 'STANDARD'
  },
  {
    id: 'yearly',
    nameTr: 'Yıllık Grandmaster',
    nameEn: 'Annual Grandmaster',
    priceFormatted: '₺499,99',
    billingPeriod: 'Yılda bir (Aylık ~₺41,60)',
    badgeTr: '%48 İNDİRİM',
    badgeEn: '48% OFF'
  },
  {
    id: 'lifetime',
    nameTr: 'Ömür Boyu Simyacı',
    nameEn: 'Lifetime Alchemist',
    priceFormatted: '₺999,99',
    billingPeriod: 'Tek seferlik ödeme',
    badgeTr: 'SONSUZ ERİŞİM',
    badgeEn: 'LIFETIME'
  }
];

export class SubscriptionManager {
  constructor() {
    this.status = 'free'; // 'free', 'trial', 'active', 'lifetime'
    this.planId = null;
    this.expiryDate = null;
    this.lastDailyBonusDate = null;
    this.listeners = [];
    this.billingProvider = null;

    this._load();
    this._initBillingProvider();
  }

  _load() {
    try {
      if (typeof localStorage === 'undefined') return;
      const saved = localStorage.getItem('alchemy_sub_data');
      if (saved) {
        const data = JSON.parse(saved);
        this.status = data.status || 'free';
        this.planId = data.planId || null;
        this.expiryDate = data.expiryDate ? new Date(data.expiryDate) : null;
        this.lastDailyBonusDate = data.lastDailyBonusDate || null;

        // Süre kontrolü
        if (this.status === 'active' && this.expiryDate && new Date() > this.expiryDate) {
          this.status = 'expired';
          this._save();
        }
      }
    } catch (e) {
      console.warn('[SubscriptionManager] Load error:', e);
    }
  }

  _save() {
    try {
      if (typeof localStorage === 'undefined') return;
      const data = {
        status: this.status,
        planId: this.planId,
        expiryDate: this.expiryDate ? this.expiryDate.toISOString() : null,
        lastDailyBonusDate: this.lastDailyBonusDate,
        updatedAt: Date.now()
      };
      localStorage.setItem('alchemy_sub_data', JSON.stringify(data));
      this._notifyListeners();
    } catch (e) {
      console.warn('[SubscriptionManager] Save error:', e);
    }
  }

  _initBillingProvider() {
    // Native billing hook (ileride Google Play / RevenueCat bağlamak için)
    if (typeof window !== 'undefined' && window.Capacitor?.Plugins?.Purchases) {
      this.billingProvider = {
        name: 'CapacitorPurchases',
        purchase: async (planId) => {
          return await window.Capacitor.Plugins.Purchases.purchasePackage({ identifier: planId });
        }
      };
    } else {
      this.billingProvider = {
        name: 'MockBilling',
        purchase: async (planId) => {
          console.log(`[SubscriptionManager] Mock purchase triggered for plan: ${planId}`);
          return { success: true, planId };
        }
      };
    }
  }

  setBillingProvider(provider) {
    if (provider && typeof provider.purchase === 'function') {
      this.billingProvider = provider;
      console.log(`[SubscriptionManager] Custom billing provider set: ${provider.name}`);
    }
  }

  isGrandmaster() {
    return this.status === 'active' || this.status === 'lifetime' || this.status === 'trial';
  }

  getHintMultiplier() {
    return this.isGrandmaster() ? 3 : 1;
  }

  canClaimDailyBonus() {
    if (!this.isGrandmaster()) return false;
    const today = new Date().toISOString().slice(0, 10);
    return this.lastDailyBonusDate !== today;
  }

  claimDailyBonus() {
    if (this.canClaimDailyBonus()) {
      this.lastDailyBonusDate = new Date().toISOString().slice(0, 10);
      this._save();
      return 3; // +3 bonus ipucu
    }
    return 0;
  }

  async subscribe(planId) {
    try {
      if (this.billingProvider) {
        await this.billingProvider.purchase(planId);
      }
      this.planId = planId;
      this.status = planId === 'lifetime' ? 'lifetime' : 'active';
      
      const expiry = new Date();
      if (planId === 'yearly') {
        expiry.setFullYear(expiry.getFullYear() + 1);
      } else if (planId === 'lifetime') {
        expiry.setFullYear(expiry.getFullYear() + 99);
      } else {
        expiry.setMonth(expiry.getMonth() + 1);
      }
      this.expiryDate = expiry;
      this._save();
      return { success: true, status: this.status };
    } catch (err) {
      console.error('[SubscriptionManager] Subscription failed:', err);
      return { success: false, error: err.message };
    }
  }

  cancelSubscription() {
    this.status = 'free';
    this.planId = null;
    this.expiryDate = null;
    this._save();
  }

  onStatusChange(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  _notifyListeners() {
    const isGm = this.isGrandmaster();
    this.listeners.forEach(cb => {
      try { cb({ status: this.status, isGrandmaster: isGm, planId: this.planId }); } catch (e) { console.error(e); }
    });
  }
}

export const subscriptionManager = new SubscriptionManager();
