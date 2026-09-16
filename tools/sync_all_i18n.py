import json
from pathlib import Path

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"
FULL_I18N_PATH = WORKSPACE_DIR / "tools" / "full_i18n.json"

def main():
    with open(FULL_I18N_PATH, "r", encoding="utf-8") as f:
        i18n_data = json.load(f)

    content = ITEMS_JS_PATH.read_text(encoding="utf-8")
    json_str = content[content.find('{'):content.rfind('}')+1]
    items = json.loads(json_str)

    tr_items = i18n_data.get("tr", {}).get("items", {})
    en_items = i18n_data.get("en", {}).get("items", {})

    for item_id, d in items.items():
        name_tr = d.get("name", item_id)
        desc_tr = d.get("description", "")
        
        tr_items[item_id] = {
            "name": name_tr,
            "desc": desc_tr
        }
        
        if item_id not in en_items:
            en_items[item_id] = {
                "name": name_tr,
                "desc": desc_tr
            }

    i18n_data["tr"]["items"] = tr_items
    i18n_data["en"]["items"] = en_items

    with open(FULL_I18N_PATH, "w", encoding="utf-8") as f:
        json.dump(i18n_data, f, ensure_ascii=False, indent=2)

    print("BAŞARILI: tools/full_i18n.json güncellendi.")

if __name__ == "__main__":
    main()
