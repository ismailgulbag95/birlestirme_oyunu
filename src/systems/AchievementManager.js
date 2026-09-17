// AchievementManager.js - Başarımlar, Rozetler ve Tematik Koleksiyonlar Sistemi
// Oyuncuya dopamin, motivasyon ve koleksiyon tamamlama hissi kazandırır.

import { ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';
import { i18n } from '../i18n/translations.js';

export const BADGES = [
  {
    id: 'badge_10',
    titleTr: 'İlk Kıvılcım',
    titleEn: 'First Spark',
    descTr: '10 farklı eşya keşfettin!',
    descEn: 'Discovered 10 unique items!',
    icon: '✨',
    requiredCount: 10,
    type: 'milestone'
  },
  {
    id: 'badge_30',
    titleTr: 'Zanaatkar Simyacı',
    titleEn: 'Craftsman Alchemist',
    descTr: '30 farklı eşyaya ulaştın, koleksiyonların genişliyor!',
    descEn: 'Reached 30 items, your collections expand!',
    icon: '🛠️',
    requiredCount: 30,
    type: 'milestone'
  },
  {
    id: 'badge_40',
    titleTr: 'Gözlemci Uyanışı',
    titleEn: 'Observer Awakening',
    descTr: '40 eşyaya ulaştın ve Gözlemci karakterinin kilidini açtın!',
    descEn: 'Reached 40 items and unlocked the Observer character!',
    icon: '🎭',
    requiredCount: 40,
    type: 'milestone'
  },
  {
    id: 'badge_70',
    titleTr: 'Usta Adayı',
    titleEn: 'Master Candidate',
    descTr: '70 eşya keşfettin, Klasik Evrenin sonuna yaklaşıyorsun!',
    descEn: 'Discovered 70 items, approaching the end of Classic Realm!',
    icon: '🔮',
    requiredCount: 70,
    type: 'milestone'
  },
  {
    id: 'badge_80',
    titleTr: 'Klasik Simya Ustası',
    titleEn: 'Classic Alchemy Master',
    descTr: 'Klasik modun 80 eşyasını eksiksiz tamamladın! Simyacı Kazanı seni çağırıyor.',
    descEn: 'Completed all 80 items in Classic mode! Grandmaster awaits.',
    icon: '👑',
    requiredCount: 80,
    type: 'milestone'
  },
  {
    id: 'badge_grandmaster_unlocked',
    titleTr: 'Büyük Simyacı',
    titleEn: 'Grand Alchemist',
    descTr: 'Grandmaster moduna katıldın ve 3\'lü kombinasyonların kapısını araladın!',
    descEn: 'Joined Grandmaster and opened the gate of 3-item recipes!',
    icon: '⚗️',
    type: 'special'
  }
];

export const COLLECTIONS = [
  {
    id: 'col_elements',
    titleTr: 'Dört Temel Unsur',
    titleEn: 'Four Primordials',
    icon: '🔥',
    items: ['ates', 'su', 'toprak', 'hava']
  },
  {
    id: 'col_nature',
    titleTr: 'Doğa & Botanik',
    titleEn: 'Nature & Flora',
    icon: '🌱',
    items: ['tohum', 'bitki', 'cicek', 'cimen', 'pamuk', 'ahsap', 'kar']
  },
  {
    id: 'col_minerals',
    titleTr: 'Maden & Jeoloji',
    titleEn: 'Minerals & Geology',
    icon: '⛏️',
    items: ['tas', 'kum', 'kil', 'demir', 'elmas', 'safir', 'obsidyen', 'dag', 'volkan']
  },
  {
    id: 'col_craft',
    titleTr: 'Zanaat & Araçlar',
    titleEn: 'Craft & Tools',
    icon: '⚔️',
    items: ['balta', 'kazma', 'cam', 'kagit', 'cark', 'heykel', 'batarya']
  },
  {
    id: 'col_life',
    titleTr: 'Canlılar Âlemi',
    titleEn: 'Living Creatures',
    icon: '🧬',
    items: ['at', 'balik', 'kutup_ayisi', 'bakteri', 'kemik']
  },
  {
    id: 'col_mystic',
    titleTr: 'Mistik & Gökyüzü',
    titleEn: 'Mystic & Sky',
    icon: '🌌',
    items: ['gunes', 'enerji', 'yildirim', 'gokkusagi', 'goktasi', 'kahin_kuresi', 'lazer']
  }
];

export class AchievementManager {
  constructor() {
    this.unlockedBadgeIds = new Set();
    this.listeners = [];
    this._load();
  }

  _load() {
    try {
      if (typeof localStorage === 'undefined') return;
      const saved = localStorage.getItem('alchemy_achievements_data');
      if (saved) {
        const data = JSON.parse(saved);
        this.unlockedBadgeIds = new Set(data.unlockedBadgeIds || []);
      }
    } catch (e) {
      console.warn('[AchievementManager] Load error:', e);
    }
  }

  _save() {
    try {
      if (typeof localStorage === 'undefined') return;
      const data = {
        unlockedBadgeIds: Array.from(this.unlockedBadgeIds),
        updatedAt: Date.now()
      };
      localStorage.setItem('alchemy_achievements_data', JSON.stringify(data));
    } catch (e) {
      console.warn('[AchievementManager] Save error:', e);
    }
  }

  /**
   * Keşif sayısına göre yeni açılan milestone rozetlerini kontrol eder ve açar.
   * @param {number} unlockedCount 
   * @returns {Array<Object>} Yeni açılan rozetler listesi
   */
  checkMilestones(unlockedCount) {
    const newlyUnlocked = [];
    BADGES.forEach(badge => {
      if (badge.type === 'milestone' && badge.requiredCount && unlockedCount >= badge.requiredCount) {
        if (!this.unlockedBadgeIds.has(badge.id)) {
          this.unlockedBadgeIds.add(badge.id);
          newlyUnlocked.push(badge);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      this._save();
      this._notify(newlyUnlocked);
    }
    return newlyUnlocked;
  }

  /**
   * Özel bir rozeti açar (örn: Grandmaster abonelik).
   */
  unlockBadge(badgeId) {
    const badge = BADGES.find(b => b.id === badgeId);
    if (badge && !this.unlockedBadgeIds.has(badgeId)) {
      this.unlockedBadgeIds.add(badgeId);
      this._save();
      this._notify([badge]);
      return badge;
    }
    return null;
  }

  getBadges() {
    return BADGES.map(badge => ({
      ...badge,
      isUnlocked: this.unlockedBadgeIds.has(badge.id)
    }));
  }

  /**
   * Koleksiyonların tamamlanma durumunu ve öğelerini döner.
   * @param {string[]} unlockedItems 
   */
  getCollectionsProgress(unlockedItems = []) {
    const canonicalSet = new Set(unlockedItems.map(i => getCanonicalId(i) || i));

    return COLLECTIONS.map(col => {
      const total = col.items.length;
      let collected = 0;
      const itemsDetail = col.items.map(itemId => {
        const canonical = getCanonicalId(itemId) || itemId;
        const isOwned = canonicalSet.has(canonical) || canonicalSet.has(itemId);
        if (isOwned) collected++;
        const def = ITEM_DEFINITIONS[canonical] || ITEM_DEFINITIONS[itemId];
        return {
          id: canonical,
          name: i18n.getItemName(canonical, def?.name || itemId),
          icon: def?.icon || '✨',
          isOwned
        };
      });

      const percentage = Math.round((collected / total) * 100);
      return {
        id: col.id,
        title: i18n.currentLang === 'tr' ? col.titleTr : col.titleEn,
        icon: col.icon,
        total,
        collected,
        percentage,
        isComplete: collected >= total,
        items: itemsDetail
      };
    });
  }

  onBadgeUnlocked(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  _notify(newBadges) {
    this.listeners.forEach(cb => {
      try { cb(newBadges); } catch (e) { console.error(e); }
    });
  }
}

export const achievementManager = new AchievementManager();
