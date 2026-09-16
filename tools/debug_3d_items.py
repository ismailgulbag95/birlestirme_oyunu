import re
import json

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

with open('src/items/itemDefinitions.js', 'r', encoding='utf-8') as f:
    item_defs_text = f.read()

# 1. All _create*Mesh methods
methods = re.findall(r'static\s+(_create\w+Mesh)\s*\(', text)
print(f"Total _create...Mesh methods defined in ItemFactory: {len(methods)}")

# 2. Switch block
switch_start = text.find('switch (canonicalId)')
switch_end = text.find('default:', switch_start)
switch_part = text[switch_start:switch_end]

cases = re.findall(r"case\s+['\"]([^'\"]+)['\"]:", switch_part)
print(f"Total cases in switch: {len(cases)}")

called_methods = re.findall(r"this\.(_create\w+Mesh)\s*\(", switch_part)
print(f"Total methods called in switch: {len(called_methods)}")

uncalled = set(methods) - set(called_methods) - {'_createArchetypeMesh', '_createDefaultMesh'}
print(f"Methods defined but NOT hooked into switch: {len(uncalled)}")
for m in sorted(list(uncalled)):
    print(f"  - {m}")

# 3. Item definitions
# Parse itemDefinitions keys
item_keys = re.findall(r'^\s*"([a-zA-Z0-9_-]+)":\s*\{', item_defs_text, re.MULTILINE)
print(f"\nTotal items in itemDefinitions.js: {len(item_keys)}")

items_in_switch = set(cases)
missing_from_switch = set(item_keys) - items_in_switch
print(f"Items in itemDefinitions but NOT in switch: {len(missing_from_switch)}")

# Let's inspect which ones are missing and see if there are corresponding methods or not
has_method_but_not_in_switch = []
no_method_at_all = []

for item in missing_from_switch:
    # camelCase possible method name
    # e.g., 'altin_kulce' -> '_createAltinKulceMesh' or '_createAltin_kulceMesh' or '_createGoldIngotMesh' etc.
    # search for substring in methods
    parts = item.split('_')
    camel = ''.join(p.capitalize() for p in parts)
    expected_name = f"_create{camel}Mesh"
    
    found = [m for m in methods if camel.lower() in m.lower()]
    if found:
        has_method_but_not_in_switch.append((item, found))
    else:
        no_method_at_all.append(item)

print(f"\nItems that have a method candidate ({len(has_method_but_not_in_switch)}):")
for item, ms in has_method_but_not_in_switch[:20]:
    print(f"  {item} -> {ms}")

print(f"\nItems with NO method at all ({len(no_method_at_all)}):")
print(f"Count: {len(no_method_at_all)}")
print("First 30:", no_method_at_all[:30])
