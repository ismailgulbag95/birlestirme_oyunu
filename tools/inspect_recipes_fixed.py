import json
import re

with open('src/items/itemDefinitions.js', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'export const ITEM_DEFINITIONS = (\{.*?\n\});', text, re.DOTALL)
if match:
    items = json.loads(match.group(1))
    print(f"Total items in itemDefinitions.js: {len(items)}")

    recipe_counts = {}
    null_recipes = []
    hava_su_desc = []
    hava_su_inputs = []

    for item_id, data in items.items():
        rec = data.get("recipe")
        desc = data.get("description", "")
        if "Havadaki nemin ve su zerreciklerinin" in desc:
            hava_su_desc.append(item_id)
        
        if not rec or not rec.get("inputs"):
            null_recipes.append((item_id, data.get("name")))
        else:
            inputs = tuple(sorted(rec["inputs"]))
            recipe_counts[inputs] = recipe_counts.get(inputs, 0) + 1
            if set(inputs) == {'hava', 'su'}:
                hava_su_inputs.append(item_id)

    print(f"Items with no recipe: {len(null_recipes)}")
    print(f"Items with duplicate/placeholder 'Havadaki nemin ve su zerreciklerinin...' desc: {len(hava_su_desc)}")
    print(f"Items with recipe inputs ['hava', 'su']: {len(hava_su_inputs)}")
    print(f"Unique recipe combinations: {len(recipe_counts)}")

    print("\nTop 10 most duplicated recipes:")
    for inputs, count in sorted(recipe_counts.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  {inputs} -> {count} items")

    print("\nSample items that have 'Havadaki nemin ve su zerreciklerinin...' description:")
    for it in hava_su_desc[:20]:
        print(f"  - {it}: {items[it].get('name')} | inputs={items[it].get('recipe', {}).get('inputs')}")
