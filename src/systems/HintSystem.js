import { ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';
import { i18n } from '../i18n/translations.js';
import { FreeTierManager } from './FreeTierManager.js';
import { subscriptionManager } from './SubscriptionManager.js';

export class HintSystem {
  constructor(mode = 'classic') {
    this.mode = mode;
    this.hintRights = 3;
    this.discoveryCount = 0;
    this.successfulMatches = 0;
    this.hintLevels = {}; // itemId -> level
    this.infiniteHints = false;
    this.lastFreeHintDate = null;
  }

  setMode(mode) {
    this.mode = mode;
  }

  setInfiniteHints(enabled) {
    this.infiniteHints = !!enabled;
    if (this.infiniteHints) {
      this.hintRights = 999;
    }
  }

  revealAllHints(lockedItems) {
    lockedItems.forEach(itemId => {
      const def = ITEM_DEFINITIONS[itemId];
      if (!def) return;
      const inputs = (this.mode === 'grandmaster' && def.trioRecipes && def.trioRecipes.length > 0)
        ? def.trioRecipes[0]
        : (def.recipe ? def.recipe.inputs.filter(inp => inp != null) : []);
      if (inputs.length > 0) {
        this.hintLevels[itemId] = inputs.length + 1;
      }
    });
  }

  recordDiscovery() {
    this.discoveryCount++;
    if (this.discoveryCount % 3 === 0) {
      this.hintRights++;
      return true; // gained hint right
    }
    return false;
  }

  recordMatch() {
    return false;
  }

  /**
   * Günlük 1 ücretsiz ipucu alabilme kontrolü
   */
  canClaimDailyFreeHint() {
    const today = new Date().toISOString().slice(0, 10);
    return this.lastFreeHintDate !== today;
  }

  claimDailyFreeHint() {
    if (this.canClaimDailyFreeHint()) {
      this.lastFreeHintDate = new Date().toISOString().slice(0, 10);
      this.hintRights++;
      return true;
    }
    return false;
  }

  /**
   * Keşfedilebilir kilitli eşyaları listeler.
   * Klasik moddaysa ve Grandmaster abonesi değilse yalnızca FreeTier (80 eşya) içindekileri hedefler.
   */
  getCraftableLockedItems(discoveredItems, lockedItems) {
    const isGrandmaster = this.mode === 'grandmaster' || subscriptionManager.isGrandmaster();
    const discoveredCanonical = new Set(discoveredItems.map(i => getCanonicalId(i) || i));

    return lockedItems.filter(itemId => {
      const canonicalId = getCanonicalId(itemId) || itemId;
      const def = ITEM_DEFINITIONS[canonicalId] || ITEM_DEFINITIONS[itemId];
      if (!def) return false;

      // Klasik mod kısıtlaması: Sadece FreeTier (80 eşya) listesinde olanlar
      if (!isGrandmaster && !FreeTierManager.isItemInFreeTier(canonicalId)) {
        return false;
      }

      // 1. Temel 2'li tarif kontrolü
      if (def.recipe && def.recipe.inputs) {
        const validInputs = def.recipe.inputs.filter(inp => inp != null);
        const is2Craftable = validInputs.every(input => {
          const can = getCanonicalId(input) || input;
          return discoveredItems.includes(input) || discoveredCanonical.has(can);
        });
        if (is2Craftable) return true;
      }

      // 2. Grandmaster modunda 3'lü tarif kontrolü
      if (this.mode === 'grandmaster' && def.trioRecipes && Array.isArray(def.trioRecipes)) {
        for (const trio of def.trioRecipes) {
          const isTrioCraftable = trio.every(input => {
            const can = getCanonicalId(input) || input;
            return discoveredItems.includes(input) || discoveredCanonical.has(can);
          });
          if (isTrioCraftable) return true;
        }
      }

      return false;
    });
  }

  getHint(itemId) {
    const canonicalId = getCanonicalId(itemId) || itemId;
    const def = ITEM_DEFINITIONS[canonicalId] || ITEM_DEFINITIONS[itemId];
    const itemName = i18n.getItemName(canonicalId, def?.name);
    if (!def || (!def.recipe && (!def.trioRecipes || def.trioRecipes.length === 0))) {
      return { text: i18n.t('hint_basic_element'), level: 0, maxLevel: 0 };
    }

    const inputs = (this.mode === 'grandmaster' && def.trioRecipes && def.trioRecipes.length > 0)
      ? def.trioRecipes[0]
      : (def.recipe ? def.recipe.inputs.filter(inp => inp != null) : []);

    if (inputs.length === 0) {
      return { text: i18n.t('hint_basic_element'), level: 0, maxLevel: 0 };
    }

    const level = this.hintLevels[canonicalId] || this.hintLevels[itemId] || 0;
    const count = inputs.length;
    const maxLevel = count + 1;

    if (level === 0) {
      return {
        text: `<i>${i18n.t('hint_click_to_open')}</i>`,
        level: 0,
        maxLevel
      };
    } else if (level === 1) {
      return {
        text: i18n.t('hint_consists_of', { name: itemName, count: count }),
        level: 1,
        maxLevel
      };
    } else {
      const revealedCount = level - 1;
      const componentNames = inputs.map((inp, idx) => {
        if (idx < revealedCount) {
          const canonical = getCanonicalId(inp) || inp;
          return i18n.getItemName(canonical, ITEM_DEFINITIONS[canonical]?.name || inp);
        } else {
          return '?';
        }
      });
      return {
        text: `<strong>${itemName}</strong>: ${componentNames.join(' + ')}`,
        level: level,
        maxLevel
      };
    }
  }

  canUseHint(itemId) {
    const canonicalId = getCanonicalId(itemId) || itemId;
    const def = ITEM_DEFINITIONS[canonicalId] || ITEM_DEFINITIONS[itemId];
    if (!def) return false;
    const inputs = (this.mode === 'grandmaster' && def.trioRecipes && def.trioRecipes.length > 0)
      ? def.trioRecipes[0]
      : (def.recipe ? def.recipe.inputs.filter(inp => inp != null) : []);
    if (inputs.length === 0) return false;
    const count = inputs.length;
    const level = this.hintLevels[canonicalId] || this.hintLevels[itemId] || 0;
    return level <= count; // max level is count + 1
  }

  useHint(itemId) {
    const canonicalId = getCanonicalId(itemId) || itemId;
    if (this.infiniteHints) {
      this.hintRights = 999;
      const currentLevel = this.hintLevels[canonicalId] || 0;
      this.hintLevels[canonicalId] = currentLevel + 1;
      return { success: true, needsAd: false };
    }
    if (this.hintRights > 0) {
      this.hintRights--;
      const currentLevel = this.hintLevels[canonicalId] || 0;
      this.hintLevels[canonicalId] = currentLevel + 1;
      return { success: true, needsAd: false };
    } else {
      return { success: false, needsAd: true };
    }
  }

  watchAdForHint(itemId, multiplier = 1) {
    const canonicalId = getCanonicalId(itemId) || itemId;
    // Reklam izlendiğinde kazanılan hak (ücretsiz modda 1, abonelikte 3)
    const gained = Math.max(1, multiplier);
    this.hintRights += gained;
    this.hintRights--; // Bu ipucu için 1 hak harca
    const currentLevel = this.hintLevels[canonicalId] || 0;
    this.hintLevels[canonicalId] = currentLevel + 1;
    return gained;
  }
}
