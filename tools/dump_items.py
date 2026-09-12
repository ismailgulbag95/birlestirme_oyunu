import re
from pathlib import Path

file_path = Path("src/items/itemDefinitions.js")
content = file_path.read_text(encoding="utf-8")

blocks = re.findall(r"(\w+):\s*\{([^}]+)\}", content)
categories = {}

for var_name, block in blocks:
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
    cat_m = re.search(r"category:\s*['\"]?([^,\r\n'\"]+)['\"]?", block)
    
    if id_m and name_m:
        item_id = id_m.group(1)
        item_name = name_m.group(1)
        cat = cat_m.group(1).strip() if cat_m else "uncategorized"
        categories.setdefault(cat, []).append({"id": item_id, "name": item_name})

print("Categories and counts:")
for cat, items in categories.items():
    print(f"[{cat}] ({len(items)} items):")
    for it in items:
        print(f"  - {it['id']}: {it['name']}")
    print()

print(f"Total categories: {len(categories)}")
print(f"Total items: {sum(len(v) for v in categories.values())}")
