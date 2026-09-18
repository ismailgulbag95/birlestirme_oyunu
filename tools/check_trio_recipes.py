import json, re

with open('tools/all_521_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

with open('src/items/itemDefinitions.js', 'r', encoding='utf-8') as f:
    js = f.read()

count = 0
for k, v in items.items():
    m = re.search(rf'\"{k}\":\s*\{{.*?\"recipe\":\s*\{{\"inputs\":\s*\[(.*?)\]\}}.*?\"trioRecipes\":\s*\[(.*?)\]', js, re.DOTALL)
    if m and count < 15:
        duo = m.group(1).replace('\n', '').strip()
        trio = m.group(2).replace('\n', '').strip()
        if trio:
            print(f"{v.get('name')} ({k}):")
            print(f"  👉 2'li Formül: {duo}")
            print(f"  👉 3'lü Formül (Trio): {trio}\n")
            count += 1
