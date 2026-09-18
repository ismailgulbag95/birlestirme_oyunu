import { 
  getItemDefinitionsForMode,
  getCanonicalId 
} from '../items/itemDefinitions.js';

export class CraftingSystem {
  constructor(mode = 'classic') {
    this.mode = mode; // 'classic' (92 eşya 2'li) veya 'grandmaster' (666 eşya 2'li ve 3'lü)
    this.recipes = {};
    this._initRecipes();
  }

  setMode(mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this._initRecipes();
    }
  }

  getMode() {
    return this.mode;
  }

  _initRecipes() {
    this.recipes = {};
    const addRecipe = (inputs, output) => {
      const padded = [inputs[0] ?? null, inputs[1] ?? null, inputs[2] ?? null];
      const canonicalInputs = padded.map(id => (id ? getCanonicalId(id) : null));
      const key = this._sortAndKey(canonicalInputs);
      this.recipes[key] = output;
    };

    const targetDefs = getItemDefinitionsForMode(this.mode);

    // Tanımlı tarifleri aktif moda göre yükle
    Object.keys(targetDefs).forEach(id => {
      const def = targetDefs[id];
      if (!def) return;

      // 1. 2'li tarifler
      if (def.recipe && def.recipe.inputs && Array.isArray(def.recipe.inputs) && def.recipe.inputs.length > 0) {
        addRecipe(def.recipe.inputs, def.id || id);
      }

      // 2. Simyacı Kazanı (Grandmaster) modunda 3'lü tarifler
      if (this.mode === 'grandmaster' && def.trioRecipes && Array.isArray(def.trioRecipes)) {
        def.trioRecipes.forEach(trioInputs => {
          if (Array.isArray(trioInputs) && trioInputs.length === 3) {
            addRecipe(trioInputs, def.id || id);
          }
        });
      }
    });
  }

  _sortAndKey(inputs) {
    // Girdileri alfabetik sırala, null olanları sona yerleştir
    const sorted = [...inputs].sort((a, b) => {
      if (a === null && b === null) return 0;
      if (a === null) return 1;
      if (b === null) return -1;
      return a.localeCompare(b);
    });
    return sorted.map(x => (x === null ? 'null' : x)).join('+');
  }

  checkRecipe(itemIds) {
    // Klasik modda 3 eşya verilmişse üretim yapılamaz
    const nonNullCount = itemIds.filter(x => x !== null && x !== undefined).length;
    if (this.mode === 'classic' && nonNullCount > 2) {
      return null;
    }

    // 3 girdi yuvası; boş yuvalar null kabul edilir
    const padded = [itemIds[0] ?? null, itemIds[1] ?? null, itemIds[2] ?? null];
    if (padded.every(x => x === null)) return null;

    const canonicalInputs = padded.map(id => (id ? getCanonicalId(id) : null));
    const key = this._sortAndKey(canonicalInputs);
    return this.recipes[key] || null;
  }
}


