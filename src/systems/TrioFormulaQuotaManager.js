export const FREE_TRIO_FORMULA_LIMIT = 25;
export const REWARDED_TRIO_FORMULA_BATCH = 5;

export class TrioFormulaQuotaManager {
  constructor(savedData = {}, legacyFormulaKeys = []) {
    const savedKeys = Array.isArray(savedData.trioDiscoveredFormulaKeys)
      ? savedData.trioDiscoveredFormulaKeys
      : legacyFormulaKeys;

    this.discoveredFormulaKeys = new Set(savedKeys.filter(key => typeof key === 'string'));
    const savedRewardedSlots = Number.isInteger(savedData.trioRewardedFormulaSlots)
      ? Math.max(0, savedData.trioRewardedFormulaSlots)
      : 0;
    const legacySlots = Math.max(0, this.discoveredFormulaKeys.size - FREE_TRIO_FORMULA_LIMIT);
    this.rewardedFormulaSlots = Math.max(savedRewardedSlots, legacySlots);
  }

  hasDiscovered(formulaKey) {
    return this.discoveredFormulaKeys.has(formulaKey);
  }

  canDiscover(formulaKey) {
    return this.hasDiscovered(formulaKey) || this.discoveredFormulaKeys.size < this.getUnlockedLimit();
  }

  recordDiscovery(formulaKey) {
    if (!formulaKey || this.hasDiscovered(formulaKey) || !this.canDiscover(formulaKey)) return false;
    this.discoveredFormulaKeys.add(formulaKey);
    return true;
  }

  grantRewardedBatch() {
    this.rewardedFormulaSlots += REWARDED_TRIO_FORMULA_BATCH;
    return this.getStatus();
  }

  getUnlockedLimit() {
    return FREE_TRIO_FORMULA_LIMIT + this.rewardedFormulaSlots;
  }

  getStatus() {
    const discovered = this.discoveredFormulaKeys.size;
    const limit = this.getUnlockedLimit();
    return { discovered, limit, remaining: Math.max(0, limit - discovered) };
  }

  reset() {
    this.discoveredFormulaKeys.clear();
    this.rewardedFormulaSlots = 0;
  }
}
