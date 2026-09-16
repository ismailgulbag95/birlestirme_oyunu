import json
import re

with open('src/items/itemDefinitions.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see how ITEM_DEFINITIONS is structured
# Is it exported as ITEM_DEFINITIONS = { ... }
# Let's extract all item objects
match = re.search(r'export const ITEM_DEFINITIONS = (\{.*?\n\};)', text, re.DOTALL)
if match:
    # Let's analyze with python
    try:
        # Since it's valid JS object (similar to JSON but might have some differences)
        js_str = match.group(1).rstrip(';')
        # replace any single quotes or trailing commas if any
        # or parse using regex
        pass
    except Exception as e:
        print("Parse error:", e)

# Let's inspect some items that fall into default
items_without_special_mesh = ['robot', 'dinamit', 'cikolata', 'kahve', 'uranyum', 'piramit', 'saray', 'aslan', 'kopek', 'pegasus']

for it in items_without_special_mesh:
    m = re.search(rf'"{it}":\s*(\{{.*?\n\s*\}}),?', text, re.DOTALL)
    if m:
        print(f"--- {it} ---")
        print(m.group(1))
    else:
        print(f"Could not find item: {it}")
