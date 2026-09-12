import re
from pathlib import Path

content = Path("src/items/itemDefinitions.js").read_text(encoding="utf-8")

# Extract canonical entries from ITEM_DEFINITIONS
# Match: key: { ... category: ... }
item_blocks = re.findall(r"(\b[a-z0-9_]+):\s*\{\s*id:\s*['\"]([^'\"]+)['\"].*?category:\s*['\"]?([^,\r\n'\"]+)['\"]?", content, re.DOTALL)

items_by_cat = {}
seen = set()
for var_name, item_id, cat in item_blocks:
    if item_id in seen:
        continue
    seen.add(item_id)
    cat_clean = cat.strip()
    # Normalize category: 'elements' -> '1_elements', etc.
    cat_map = {
        'elements': '1_elements', '1': '1_elements',
        'nature': '2_doga', '2': '2_doga',
        'life': '3_canlilar', '3': '3_canlilar',
        'craft_tools': '4_zanaat_ve_aletler', '4': '4_zanaat_ve_aletler',
        '5': '5_kimya_simya_buyu',
        '6': '6_mekanik_medeniyet',
        '7': '7_agir_sanayi_insaat',
        '8': '8_kozmoloji_boyutlar'
    }
    normalized_cat = cat_map.get(cat_clean, cat_clean)
    
    # Get Turkish name
    name_m = re.search(rf"{item_id}:\s*\{{[^}}]*?name:\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
    item_name = name_m.group(1) if name_m else item_id
    
    items_by_cat.setdefault(normalized_cat, []).append({'id': item_id, 'name': item_name})

print("=== BIRLESTIRME OYUNU KATEGORI VE ITEM ENVENTARI ===")
total = 0
for cat in sorted(items_by_cat.keys()):
    items = items_by_cat[cat]
    total += len(items)
    print(f"\n📂 {cat} (Toplam: {len(items)} eşya):")
    for i, it in enumerate(items, 1):
        print(f"   {i:02d}. {it['id']} ({it['name']})")

print(f"\nGenel Toplam: {total} eşya")
