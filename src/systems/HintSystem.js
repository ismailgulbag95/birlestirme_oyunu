import { ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';

export class HintSystem {
  constructor() {
    this.hintRights = 3;
    this.successfulMatches = 0;
    this.hintLevels = {}; // itemId -> level
  }

  recordMatch() {
    this.successfulMatches++;
    if (this.successfulMatches % 3 === 0) {
      this.hintRights++;
      return true; // gained hint right
    }
    return false;
  }

  getCraftableLockedItems(discoveredItems, lockedItems) {
    const discoveredCanonical = new Set(discoveredItems.map(i => getCanonicalId(i)));

    return lockedItems.filter(itemId => {
      const def = ITEM_DEFINITIONS[itemId];
      if (!def || !def.recipe || !def.recipe.inputs) return false;
      const validInputs = def.recipe.inputs.filter(inp => inp != null);
      return validInputs.every(input => {
        const can = getCanonicalId(input);
        return discoveredItems.includes(input) || discoveredCanonical.has(can);
      });
    });
  }

  getHint(itemId) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def || !def.recipe) return { text: 'Bu temel bir elementtir.', level: 0, maxLevel: 0 };

    const level = this.hintLevels[itemId] || 0;
    const inputs = def.recipe.inputs.filter(inp => inp != null);
    const count = inputs.length;
    const maxLevel = count + 1;

    if (level === 0) {
      return {
        text: '<i>İpucu açmak için tıklayın</i>',
        level: 0,
        maxLevel
      };
    } else if (level === 1) {
      return {
        text: `<strong>${def.name}</strong>: ${count} bileşenden oluşur.`,
        level: 1,
        maxLevel
      };
    } else {
      const revealedCount = level - 1;
      const componentNames = inputs.map((inp, idx) => {
        if (idx < revealedCount) {
          const itemDef = ITEM_DEFINITIONS[inp] || ITEM_DEFINITIONS[getCanonicalId(inp)];
          return itemDef ? itemDef.name : inp;
        } else {
          return '?';
        }
      });
      return {
        text: `<strong>${def.name}</strong>: ${componentNames.join(' + ')}`,
        level: level,
        maxLevel
      };
    }
  }

  canUseHint(itemId) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def || !def.recipe) return false;
    const count = def.recipe.inputs.filter(inp => inp != null).length;
    const level = this.hintLevels[itemId] || 0;
    return level <= count; // max level is count + 1
  }

  useHint(itemId) {
    if (this.hintRights > 0) {
      this.hintRights--;
      const currentLevel = this.hintLevels[itemId] || 0;
      this.hintLevels[itemId] = currentLevel + 1;
      return { success: true, needsAd: false };
    } else {
      return { success: false, needsAd: true };
    }
  }

  watchAdForHint(itemId) {
    this.hintRights++;
    this.hintRights--; // consume for this hint
    const currentLevel = this.hintLevels[itemId] || 0;
    this.hintLevels[itemId] = currentLevel + 1;
  }
}
