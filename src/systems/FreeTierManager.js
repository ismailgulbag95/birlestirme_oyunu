// FreeTierManager.js - Ücretsiz Katman (Klasik 80 Eşya) Ağaç ve Kısıtlama Yönetimi
// 80 eşyalık özenle seçilmiş, %100 çözülebilir ve bağımsız kanca ağacı.

import { ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';

// Tier 1-4 (65 eşya) + Tier 5 seçili (15 eşya) = Tam 80 Eşya
export const FREE_TIER_ITEMS = new Set([
  // Tier 1 (4 Temel)
  'ates', 'su', 'toprak', 'hava',

  // Tier 2 (7 Eşya)
  'buhar', 'camur', 'enerji', 'lav', 'toz', 'yagmur', 'ruzgar',

  // Tier 3 (14 Eşya)
  'bulut', 'duman', 'gunes', 'isi', 'kum', 'obsidyen', 'patlama', 
  'ses', 'tas', 'tas_ocagi', 'volkan', 'yagmur_damlasi', 'yanardag_camur', 'yarik',

  // Tier 4 (40 Eşya)
  'ahsap', 'alev', 'asit', 'astronomi', 'at', 'ates_firtinasi', 'balik', 'batarya', 
  'barut', 'bitki', 'buz', 'cam', 'cark', 'cehennem_tasi', 'cesme', 'deniz', 
  'depo', 'demir', 'elmas', 'goktasi', 'gunes_paneli', 'hava_dalgalari', 'heykel', 
  'i_sik', 'kagit', 'kahin_kuresi', 'kemik', 'kil', 'kirec', 'kutup_ayisi', 
  'lazer', 'magma', 'metal', 'nehir', 'safir', 'sis', 'su_dongusu', 'termal_kaynak', 
  'tusunami', 'vaha',

  // Tier 5 Seçilmiş Kilit 15 Eşya
  'cicek', 'cimen', 'tohum', 'yildirim', 'dag', 
  'bakteri', 'gokkusagi', 'araba', 'balta', 'kazma', 
  'corba', 'kar', 'col', 'seker', 'pamuk'
]);

export const FREE_TIER_MAX_COUNT = 80;
export const TOTAL_ITEMS_COUNT = 521;

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
