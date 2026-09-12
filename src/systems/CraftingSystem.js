import { 
  ITEM_DEFINITIONS, 
  RECIPES_CAT_1, 
  RECIPES_CAT_2, 
  RECIPES_CAT_3, 
  RECIPES_CAT_4, 
  RECIPES_CAT_5, 
  RECIPES_CAT_6, 
  RECIPES_CAT_7, 
  RECIPES_CATEGORY_8,
  RECIPES_CAT_9,
  RECIPES_CAT_10,
  RECIPES_CAT_FAUNA,
  RECIPES_CAT_SIMPLE,
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

    // Tüm kategorilerin reçetelerini ekle
    RECIPES_CAT_1.forEach(r => addRecipe(r.inputs, r.output));
    RECIPES_CAT_2.forEach(r => addRecipe(r.inputs, r.output));
    RECIPES_CAT_3.forEach(r => addRecipe(r.inputs, r.output));
    RECIPES_CAT_4.forEach(r => addRecipe(r.inputs, r.output));
    RECIPES_CAT_5.forEach(r => addRecipe(r.inputs, r.output));
    RECIPES_CAT_6.forEach(r => addRecipe(r.inputs, r.output));
    RECIPES_CAT_7.forEach(r => addRecipe(r.inputs, r.output));
    RECIPES_CATEGORY_8.forEach(r => addRecipe(r.inputs, r.output));
    if (typeof RECIPES_CAT_9 !== 'undefined') RECIPES_CAT_9.forEach(r => addRecipe(r.inputs, r.output));
    if (typeof RECIPES_CAT_10 !== 'undefined') RECIPES_CAT_10.forEach(r => addRecipe(r.inputs, r.output));
    if (typeof RECIPES_CAT_FAUNA !== 'undefined') RECIPES_CAT_FAUNA.forEach(r => addRecipe(r.inputs, r.output));
    if (typeof RECIPES_CAT_SIMPLE !== 'undefined') RECIPES_CAT_SIMPLE.forEach(r => addRecipe(r.inputs, r.output));

    // 2. Diğer tanımlı reçeteleri ekle
    Object.keys(ITEM_DEFINITIONS).forEach(id => {
      const def = ITEM_DEFINITIONS[id];
      if (def && def.recipe && def.recipe.inputs) {
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

