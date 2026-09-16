import json

with open('tools/all_521_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

archetypes = {}
for k, v in items.items():
    arch = v.get('archetype3d', 'NONE')
    archetypes[arch] = archetypes.get(arch, 0) + 1

print('Updated Archetype distribution:', archetypes)

for test_id in ['cikolata', 'kahve', 'aslan', 'kopek', 'dinamit', 'robot', 'piramit', 'galaksi', 'elmas', 'agac']:
    it = items.get(test_id, {})
    print(f"{test_id}: arch={it.get('archetype3d')}, primary={it.get('colorPalette', {}).get('primary')}, sec={it.get('colorPalette', {}).get('secondary')}")
