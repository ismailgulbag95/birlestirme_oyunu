import json

def main():
    items = json.load(open('tools/all_521_items.json', 'r', encoding='utf-8'))
    with open('tools/item_list_report.txt', 'w', encoding='utf-8') as f:
        for k, v in sorted(items.items()):
            f.write(f"{k} | {v.get('name')} | {v.get('category')} | {v.get('archetype3d', '')}\n")
    print(f"Generated tools/item_list_report.txt with {len(items)} items.")

if __name__ == "__main__":
    main()
