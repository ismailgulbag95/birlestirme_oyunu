import json
from generate_full_521_crafting_tree import get_complete_recipe_book, BASE_ELEMENTS

def debug():
    all_items = json.load(open('tools/all_521_items.json', 'r', encoding='utf-8'))
    all_ids = set(all_items.keys())
    recipes_book = get_complete_recipe_book()
    
    unlocked = set(BASE_ELEMENTS)
    
    for it in range(1, 20):
        new_unlocked = set()
        for item_id, data in recipes_book.items():
            if item_id in all_ids and item_id not in unlocked:
                inputs = data["inputs"]
                if all(inp in unlocked for inp in inputs):
                    new_unlocked.add(item_id)
        if not new_unlocked:
            print(f"Loop stopped at iteration {it}. Unlocked: {len(unlocked)} / {len(all_ids)}")
            break
        unlocked.update(new_unlocked)
        print(f"Iteration {it}: +{len(new_unlocked)} items -> Total {len(unlocked)}")

    unresolved = all_ids - unlocked
    print(f"\nRemaining {len(unresolved)} items:")
    for u in sorted(unresolved):
        req = recipes_book.get(u, {}).get("inputs", [])
        missing = [r for r in req if r not in unlocked]
        print(f"  {u}: inputs={req} -> Missing: {missing}")

if __name__ == "__main__":
    debug()
