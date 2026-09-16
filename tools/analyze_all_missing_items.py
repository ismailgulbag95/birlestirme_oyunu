import json
import re

# Load canonical items or itemDefinitions
with open('src/items/itemDefinitions.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Load ItemFactory
with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    factory_text = f.read()

# Extract items from itemDefinitions
# Parse all keys in ITEM_DEFINITIONS
pattern = r'"([a-zA-Z0-9_-]+)":\s*\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"'
matches = re.findall(pattern, text)
print(f"Found {len(matches)} item definitions matching pattern.")

items_dict = {m[0]: {"id": m[1], "name": m[2]} for m in matches}

# Also get switch cases
switch_part = factory_text[factory_text.find('switch (canonicalId)'):factory_text.find('default:')]
cases = set(re.findall(r"case\s+['\"]([^'\"]+)['\"]:", switch_part))

implemented = set(items_dict.keys()) & cases
missing = set(items_dict.keys()) - cases

print(f"Total Unique Items in Definitions: {len(items_dict)}")
print(f"Total Handled in ItemFactory Switch: {len(implemented)}")
print(f"Total Missing (Falling to generic cylinder/archetype): {len(missing)}")

# Get categories of missing items
missing_by_cat = {}
for item_id in sorted(missing):
    # find category in itemDefinitions
    m = re.search(rf'"{item_id}":\s*\{{.*?"category":\s*"([^"]+)"', text, re.DOTALL)
    cat = m.group(1) if m else "unknown"
    missing_by_cat.setdefault(cat, []).append((item_id, items_dict[item_id]['name']))

print("\n--- Missing Items by Category ---")
for cat, itms in sorted(missing_by_cat.items()):
    print(f"\nCategory '{cat}' ({len(itms)} items):")
    for it_id, it_name in itms:
        print(f"  - {it_id} ({it_name})")
