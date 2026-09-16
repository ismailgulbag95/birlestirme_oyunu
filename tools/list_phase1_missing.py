import json
import re

with open('tools/all_521_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    factory_text = f.read()

# Find all switch cases in ItemFactory
switch_part = factory_text[factory_text.find('switch (canonicalId)'):factory_text.find('default:')]
cases = set(re.findall(r"case\s+['\"]([^'\"]+)['\"]:", switch_part))

# Filter category 01_elements and 02_doga
phase1_items = {}
for k, v in items.items():
    cat = v.get('category', '')
    if cat in ['01_elements', '02_doga'] or 'element' in cat or 'doga' in cat:
        phase1_items[k] = v

print(f"Total items in Phase 1 (01_elements & 02_doga): {len(phase1_items)}")
already_handled = set(phase1_items.keys()) & cases
missing_phase1 = set(phase1_items.keys()) - cases

print(f"Already handled with dedicated mesh: {len(already_handled)}")
print(f"Missing dedicated mesh in Phase 1: {len(missing_phase1)}")

print("\nList of Missing Phase 1 Items:")
for it in sorted(missing_phase1):
    print(f"  - {it} ({items[it].get('name')}) | {items[it].get('description')}")
