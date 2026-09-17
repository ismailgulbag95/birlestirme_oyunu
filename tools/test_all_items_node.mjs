import { ItemFactory } from '../src/items/ItemFactory.js';
import { ITEM_DEFINITIONS } from '../src/items/itemDefinitions.js';

let errorCount = 0;
for (const id of Object.keys(ITEM_DEFINITIONS)) {
  try {
    const mesh = ItemFactory.createItemMesh(id);
    if (!mesh) {
      console.error(`NULL MESH for ${id}`);
      errorCount++;
    }
    // Test update method if exists
    if (mesh.userData && typeof mesh.userData.update === 'function') {
      mesh.userData.update(1.0, 0.016);
    }
  } catch (err) {
    console.error(`ERROR creating mesh for [${id}]:`, err.message);
    errorCount++;
  }
}

if (errorCount === 0) {
  console.log(`SUCCESS: All ${Object.keys(ITEM_DEFINITIONS).length} items rendered without any runtime errors!`);
} else {
  console.error(`FAILED: ${errorCount} items failed during instantiation!`);
  process.exit(1);
}
