import { 
  ITEM_DEFINITIONS, 
  getCanonicalId 
} from '../items/itemDefinitions.js';

export class CraftingSystem {
  constructor() {
    this.recipes = {};
    this._initRecipes();
  }

  _initRecipes() {
    const addRecipe = (inputs, output) => {
      const padded = [inputs[0] ?? null, inputs[1] ?? null, inputs[2] ?? null];
      const canonicalInputs = padded.map(id => (id ? getCanonicalId(id) : null));
      const key = this._sortAndKey(canonicalInputs);
      this.recipes[key] = output;
    };

    // Tüm tanımlı tarifleri ITEM_DEFINITIONS üzerinden dinamik olarak yükle
    Object.keys(ITEM_DEFINITIONS).forEach(id => {
      const def = ITEM_DEFINITIONS[id];
      if (def && def.recipe && def.recipe.inputs && Array.isArray(def.recipe.inputs) && def.recipe.inputs.length > 0) {
        addRecipe(def.recipe.inputs, def.id || id);
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
    // 3 girdi yuvası; boş yuvalar null kabul edilir
    const padded = [itemIds[0] ?? null, itemIds[1] ?? null, itemIds[2] ?? null];
    if (padded.every(x => x === null)) return null;

    const canonicalInputs = padded.map(id => (id ? getCanonicalId(id) : null));
    const key = this._sortAndKey(canonicalInputs);
    return this.recipes[key] || null;
  }
}

