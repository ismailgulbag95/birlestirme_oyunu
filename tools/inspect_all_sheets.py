import json
import glob
from pathlib import Path

def main():
    configs = sorted(glob.glob('assets/sheet_prompts/*_config.json'))
    for cfg_path in configs:
        with open(cfg_path, 'r', encoding='utf-8') as f:
            d = json.load(f)
        s_name = d.get('sheet_name', Path(cfg_path).stem)
        items = d.get('items', [])
        print(f"=== {s_name} ({len(items)} items) ===")
        for idx, it in enumerate(items):
            print(f"  [{idx+1:02d}] {it[0]}: {it[1]}")

if __name__ == '__main__':
    main()
