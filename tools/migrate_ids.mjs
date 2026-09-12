import fs from 'fs';

const mapping = JSON.parse(fs.readFileSync('tools/id_mapping.json', 'utf8'));

// 1. Update src/items/itemDefinitions.js
let itemDef = fs.readFileSync('src/items/itemDefinitions.js', 'utf8');

// For the first 54 definitions:
for (const [en, tr] of Object.entries(mapping)) {
  // replace definition key
  itemDef = itemDef.replace(new RegExp('^  ' + en + ':\\s*\\{', 'm'), '  ' + tr + ': {');
  // replace id property
  itemDef = itemDef.replace(new RegExp("id:\\s*['\"]" + en + "['\"]"), "id: '" + tr + "'");
}

// Replace recipe inputs inside ITEM_DEFINITIONS (lines 1 to 600)
// To avoid accidental replaces outside, we do word-boundary replaces on recipe inputs
for (const [en, tr] of Object.entries(mapping)) {
  itemDef = itemDef.replace(new RegExp("inputs:\\s*\\[([^\\]]*)\\b" + en + "\\b([^\\]]*)\\]", 'g'), (match, p1, p2) => {
    return match.replace(new RegExp("'" + en + "'", 'g'), "'" + tr + "'");
  });
}

// Update ITEM_ALIASES in itemDefinitions.js so that English keys map to Turkish canonical IDs
// and getCanonicalId returns the Turkish ID
const aliasEntries = [];
for (const [en, tr] of Object.entries(mapping)) {
  aliasEntries.push(`  ${en}: '${tr}'`);
}
const aliasBlock = `export const ITEM_ALIASES = {\n${aliasEntries.join(',\n')}\n};

export function getCanonicalId(id) {
  if (!id) return null;
  return ITEM_ALIASES[id] || id;
}

// Map alias keys directly on ITEM_DEFINITIONS for fast lookup
Object.keys(ITEM_ALIASES).forEach(aliasKey => {
  const targetId = ITEM_ALIASES[aliasKey];
  if (ITEM_DEFINITIONS[targetId] && !ITEM_DEFINITIONS[aliasKey]) {
    ITEM_DEFINITIONS[aliasKey] = ITEM_DEFINITIONS[targetId];
  }
});`;

itemDef = itemDef.replace(/export const ITEM_ALIASES = \{[\s\S]*?\n\}\);\n/m, aliasBlock + '\n');

fs.writeFileSync('src/items/itemDefinitions.js', itemDef, 'utf8');
console.log('itemDefinitions.js successfully migrated to Turkish IDs!');

// 2. Update src/main.js initial unlockedItems and lockedItems
let mainJs = fs.readFileSync('src/main.js', 'utf8');
mainJs = mainJs.replace(
  "this.unlockedItems = ['fire', 'water', 'earth', 'air'];",
  "this.unlockedItems = ['ates', 'su', 'toprak', 'hava'];"
);

for (const [en, tr] of Object.entries(mapping)) {
  // in lockedItems, replace 'en' with 'tr'
  mainJs = mainJs.replace(new RegExp("'" + en + "'", 'g'), "'" + tr + "'");
}

fs.writeFileSync('src/main.js', mainJs, 'utf8');
console.log('main.js successfully updated with Turkish IDs!');

// 3. Update src/items/ItemFactory.js switch cases
let factoryJs = fs.readFileSync('src/items/ItemFactory.js', 'utf8');
for (const [en, tr] of Object.entries(mapping)) {
  factoryJs = factoryJs.replace(new RegExp("case '" + en + "':", 'g'), `case '${tr}':\n      case '${en}':`);
}
fs.writeFileSync('src/items/ItemFactory.js', factoryJs, 'utf8');
console.log('ItemFactory.js cases updated with dual-support (TR + EN fallback)!');
