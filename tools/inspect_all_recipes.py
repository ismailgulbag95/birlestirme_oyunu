import json
import re

with open('src/items/itemDefinitions.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Match each item
items_dict = {}
# Find all item blocks
blocks = re.split(r'\n  "([a-z0-9_]+)": \{', text)
print(f"Split blocks length: {len(blocks)}")

item_count = 0
hava_su_exact = []
null_recipes = []
desc_hava_su = []

# Let's inspect
for i in range(1, len(blocks), 2):
    item_id = blocks[i]
    block_content = blocks[i+1]
    item_count += 1
    
    # check recipe
    rec_match = re.search(r'"recipe":\s*(\{[^}]+\}|null)', block_content)
    desc_match = re.search(r'"description":\s*"([^"]+)"', block_content)
    
    if desc_match and "Havadaki nemin" in desc_match.group(1):
        desc_hava_su.append(item_id)
        
    if rec_match:
        rec_val = rec_match.group(1)
        if rec_val == "null":
            null_recipes.append(item_id)
        else:
            inps = re.findall(r'"inputs":\s*\[([^\]]+)\]', rec_val)
            if inps:
                clean = [x.strip(' \n"') for x in inps[0].split(',') if x.strip(' \n"')]
                if sorted(clean) == ['hava', 'su']:
                    hava_su_exact.append(item_id)

print(f"Total items parsed: {item_count}")
print(f"Null recipes (base items): {len(null_recipes)} -> {null_recipes}")
print(f"Exact [hava, su] recipes: {len(hava_su_exact)} -> {hava_su_exact}")
print(f"Placeholder desc count: {len(desc_hava_su)} -> {desc_hava_su}")
