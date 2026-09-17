import fs from 'fs';
import path from 'path';
import { ITEM_DEFINITIONS } from '../src/items/itemDefinitions.js';

const itemKeys = Object.keys(ITEM_DEFINITIONS);
console.log('Total items in ITEM_DEFINITIONS:', itemKeys.length);

const texturesDir = path.join(process.cwd(), 'public', 'textures', 'items');
const existingFiles = new Set(fs.existsSync(texturesDir) ? fs.readdirSync(texturesDir) : []);
console.log('Total texture files in public/textures/items:', existingFiles.size);

const missing2D = [];
const existing2D = [];

for (const id of itemKeys) {
    const filename = id + '.png';
    if (existingFiles.has(filename)) {
        existing2D.push(id);
    } else {
        missing2D.push({
            id: id,
            name: ITEM_DEFINITIONS[id].name || id,
            tier: ITEM_DEFINITIONS[id].tier,
            icon: ITEM_DEFINITIONS[id].icon
        });
    }
}

console.log('Found 2D images:', existing2D.length);
console.log('Missing 2D images count:', missing2D.length);

if (missing2D.length > 0) {
    console.log('\n--- Missing Items List ---');
    missing2D.forEach(item => {
        console.log(`- ID: "${item.id}" | İsim: "${item.name}" | Tier: ${item.tier} | Icon: ${item.icon}`);
    });
} else {
    console.log('\nHarika! Tüm itemların 2D görseli mevcut.');
}

// 2. Ayrıca crafting_tree.json içindeki tüm girdiler ve sonuçlar kontrol edilsin
if (fs.existsSync('crafting_tree.json')) {
    const tree = JSON.parse(fs.readFileSync('crafting_tree.json', 'utf8'));
    const allTreeItems = new Set();
    
    function addTreeKeys(obj) {
        if (!obj) return;
        for (const [k, v] of Object.entries(obj)) {
            allTreeItems.add(k);
            if (Array.isArray(v)) {
                v.forEach(recipe => {
                    if (recipe.inputs) recipe.inputs.forEach(inp => allTreeItems.add(inp));
                    if (recipe.result) allTreeItems.add(recipe.result);
                });
            }
        }
    }
    
    addTreeKeys(tree.recipes_by_result);
    addTreeKeys(tree.recipes_by_inputs);
    addTreeKeys(tree.trio_recipes_by_result);
    addTreeKeys(tree.trio_recipes_by_inputs);
    
    const missingTreeItems = [];
    allTreeItems.forEach(id => {
        if (!existingFiles.has(id + '.png')) {
            missingTreeItems.push(id);
        }
    });
    
    console.log('\nCrafting tree toplam benzersiz item referansı:', allTreeItems.size);
    console.log('Crafting tree içinde olup görseli eksik olanlar:', missingTreeItems.length);
    if (missingTreeItems.length > 0) {
        console.log('Eksikler:', missingTreeItems);
    }
}
