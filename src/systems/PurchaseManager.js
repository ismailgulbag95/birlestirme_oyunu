// One-time hint pack purchase support.
export const HINT_PACKS = [
  { id: 'hint_pack_5', hints: 5 },
  { id: 'hint_pack_15', hints: 15 },
  { id: 'hint_pack_40', hints: 40 }
];

export class PurchaseManager {
  constructor() {
    this.billingProvider = null;
    this._initBillingProvider();
  }

  _initBillingProvider() {
    const purchases = typeof window !== 'undefined' ? window.Capacitor?.Plugins?.Purchases : null;
    if (purchases && typeof purchases.purchasePackage === 'function') {
      this.billingProvider = {
        name: 'CapacitorPurchases',
        purchase: packageId => purchases.purchasePackage({ identifier: packageId })
      };
    } else {
      this.billingProvider = {
        name: 'MockBilling',
        purchase: async packageId => ({ success: true, packageId })
      };
    }
  }

  setBillingProvider(provider) {
    if (provider && typeof provider.purchase === 'function') {
      this.billingProvider = provider;
    }
  }

  async buyHintPack(packId) {
    const pack = HINT_PACKS.find(item => item.id === packId);
    if (!pack) return { success: false, error: 'Invalid pack' };

    try {
      if (this.billingProvider) await this.billingProvider.purchase(packId);
      return { success: true, hints: pack.hints, pack };
    } catch (error) {
      console.error('[PurchaseManager] Hint pack purchase failed:', error);
      return { success: false, error: error.message };
    }
  }
}

export const purchaseManager = new PurchaseManager();
