// FreeTierManager.js - Klasik Mod (92 Eşya) Ağaç ve Kısıtlama Yönetimi
import { CLASSIC_ITEM_DEFINITIONS, GRANDMASTER_ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';

export const FREE_TIER_ITEMS = new Set(Object.keys(CLASSIC_ITEM_DEFINITIONS));
export const FREE_TIER_MAX_COUNT = Object.keys(CLASSIC_ITEM_DEFINITIONS).length;
export const TOTAL_ITEMS_COUNT = Object.keys(GRANDMASTER_ITEM_DEFINITIONS).length;

export class FreeTierManager {
  static get maxFreeCount() {
    return FREE_TIER_MAX_COUNT;
  }

  static get totalItemCount() {
    return TOTAL_ITEMS_COUNT;
  }

  /**
   * Bir eşyanın ücretsiz modda (Klasik) erişilebilir olup olmadığını döner.
   * @param {string} itemId 
   * @returns {boolean}
   */
  static isItemInFreeTier(itemId) {
    if (!itemId) return false;
    const canonical = getCanonicalId(itemId) || itemId;
    return FREE_TIER_ITEMS.has(canonical) || FREE_TIER_ITEMS.has(itemId);
  }

  /**
   * Bir eşyanın Grandmaster kilitli olup olmadığını döner.
   * @param {string} itemId 
   * @param {boolean} isGrandmasterSubscribed 
   * @returns {boolean}
   */
  static isLockedByGrandmaster(itemId, isGrandmasterSubscribed = false) {
    if (isGrandmasterSubscribed) return false;
    return !this.isItemInFreeTier(itemId);
  }

  /**
   * Ücretsiz mod ilerlemesini hesaplar.
   * @param {string[]} unlockedItems 
   * @param {boolean} isGrandmaster 
   * @returns {{ current: number, max: number, percentage: number, isComplete: boolean }}
   */
  static getProgression(unlockedItems = [], isGrandmaster = false) {
    const canonicals = new Set(unlockedItems.map(i => getCanonicalId(i) || i));
    
    if (isGrandmaster) {
      const count = canonicals.size;
      return {
        current: count,
        max: TOTAL_ITEMS_COUNT,
        percentage: Math.min(100, Math.round((count / TOTAL_ITEMS_COUNT) * 100)),
        isComplete: count >= TOTAL_ITEMS_COUNT,
        mode: 'grandmaster'
      };
    } else {
      let freeCount = 0;
      canonicals.forEach(id => {
        if (FREE_TIER_ITEMS.has(id)) freeCount++;
      });
      return {
        current: freeCount,
        max: FREE_TIER_MAX_COUNT,
        percentage: Math.min(100, Math.round((freeCount / FREE_TIER_MAX_COUNT) * 100)),
        isComplete: freeCount >= FREE_TIER_MAX_COUNT,
        mode: 'classic'
      };
    }
  }

  /**
   * 80 eşyalık listeyi döner.
   */
  static getFreeTierList() {
    return Array.from(FREE_TIER_ITEMS);
  }
}
