import json

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

phase1_test_items = [
    'yanardag', 'gol', 'deniz', 'selale', 'firtina', 'kasirga', 'hortum', 
    'tayfun', 'tsunami', 'girdap', 'buzul', 'mercan_kayaligi', 'aurora', 
    'bambu', 'palmiye', 'karli_cam_agaci', 'cicek', 'gul', 'vaha', 'vadi', 
    'bataklik', 'bozkir', 'tundra', 'deprem', 'yarimada', 'kita', 'cig', 
    'dolu', 'tutulma'
]

missing_methods = []
for it in phase1_test_items:
    # check switch case
    if f"case '{it}':" not in text:
        missing_methods.append(f"Switch case missing for: {it}")

print(f"Total Phase 1 Items Verified: {len(phase1_test_items)}")
print(f"Missing cases: {len(missing_methods)}")
if missing_methods:
    for m in missing_methods:
        print(" ", m)
else:
    print("All Phase 1 items are properly defined and wired in switch-case!")
