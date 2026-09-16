import json
import re

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    factory_text = f.read()

with open('tools/all_521_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

switch_part = factory_text[factory_text.find('switch (canonicalId)'):factory_text.find('default:')]
cases = set(re.findall(r"case\s+['\"]([^'\"]+)['\"]:", switch_part))

missing_from_switch = []
for item_id, item_data in items.items():
    if item_id not in cases:
        missing_from_switch.append((item_id, item_data.get('name', item_id), item_data.get('category', '')))

print(f"Total Items in all_521_items.json: {len(items)}")
print(f"Items IN Switch Case: {len(items) - len(missing_from_switch)}")
print(f"Items MISSING from Switch Case (Falling to default archetype): {len(missing_from_switch)}")

print("\n--- All Missing Items ---")
for it, name, cat in sorted(missing_from_switch):
    print(f"'{it}': '{name}' ({cat})")
