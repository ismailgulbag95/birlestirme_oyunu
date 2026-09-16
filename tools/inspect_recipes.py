import json
import re
from pathlib import Path

def main():
    content = Path("src/items/itemDefinitions.js").read_text(encoding="utf-8")
    json_str = content[content.find('{'):content.rfind('}')+1]
    items = json.loads(json_str)
    print(f"Total items in itemDefinitions.js: {len(items)}")
    
    recipe_counts = {}
    null_recipes = []
    
    for item_id, data in items.items():
        rec = data.get("recipe")
        if not rec or not rec.get("inputs"):
            null_recipes.append((item_id, data.get("name")))
        else:
            inputs = tuple(sorted(rec["inputs"]))
            recipe_counts[inputs] = recipe_counts.get(inputs, 0) + 1
            
    print(f"Items with no recipe: {len(null_recipes)} -> {null_recipes}")
    print(f"Unique recipes count: {len(recipe_counts)}")
    
    print("\nTop 10 most duplicated recipes:")
    for inputs, count in sorted(recipe_counts.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  {inputs} -> {count} items")

    print("\nSample 15 items with their recipes & descriptions:")
    for item_id in list(items.keys())[:15]:
        d = items[item_id]
        print(f"[{d['name']} ({item_id})]: Recipe={d.get('recipe', {}).get('inputs') if d.get('recipe') else 'BASE'} | Desc='{d.get('description')}'")

if __name__ == "__main__":
    main()
