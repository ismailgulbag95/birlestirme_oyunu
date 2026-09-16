import os
import json
import glob
from PIL import Image
from pathlib import Path
import sys

sys.path.append('.')
from tools.slice_item_sheets import (
    extract_binary_mask,
    segment_connected_components,
    merge_nearby_subparts,
    sort_components_spatially,
    extract_isolated_item
)

def main():
    debug_dir = Path('tools/debug_sheets')
    debug_dir.mkdir(parents=True, exist_ok=True)

    sheets = sorted(glob.glob('assets/raw_sheets/sheet_*.jpg'))
    print(f'Found {len(sheets)} sheets')

    html_content = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Sheet Grid Inspector</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #121212; color: #e0e0e0; padding: 20px; }
.sheet-card { background: #1e1e1e; border: 1px solid #333; border-radius: 8px; margin-bottom: 30px; padding: 15px; }
.sheet-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #4fc3f7; }
.grid-container { display: flex; gap: 20px; align-items: flex-start; }
.orig-img { max-width: 350px; height: auto; border: 1px solid #444; border-radius: 4px; }
.cells-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.cell-box { background: #262626; padding: 6px; border-radius: 6px; text-align: center; border: 1px solid #444; width: 110px; }
.cell-box img { max-width: 90px; max-height: 90px; background: radial-gradient(circle, #333 0%, #1a1a1a 100%); border-radius: 4px; }
.cell-label { font-size: 11px; margin-top: 4px; color: #888; }
.current-mapped { font-size: 11px; color: #81c784; font-weight: bold; margin-top: 2px; }
.expected-pool { margin-bottom: 12px; font-size: 12px; color: #ffb74d; background: #2a2a2a; padding: 8px; border-radius: 4px; line-height: 1.5; }
</style>
</head>
<body>
<h1>Sheet Grid Inspector & Item Identifier</h1>
'''

    for s_path in sheets:
        s_name = Path(s_path).stem
        s_dir = debug_dir / s_name
        s_dir.mkdir(parents=True, exist_ok=True)
        
        cfg_file = Path(f'assets/sheet_prompts/{s_name}_config.json')
        expected_items = []
        if cfg_file.exists():
            with open(cfg_file, 'r', encoding='utf-8') as f:
                cfg = json.load(f)
                expected_items = cfg.get('items', [])
                
        img = Image.open(s_path)
        w, h = img.size
        mask = extract_binary_mask(img)
        labels, components = segment_connected_components(mask)
        labels, components = merge_nearby_subparts(labels, components, w, h)
        ordered_comps = sort_components_spatially(components)
        
        pool_str = ", ".join([f"{it[1]} (<code>{it[0]}</code>)" for it in expected_items])
        html_content += f'<div class="sheet-card"><div class="sheet-title">{s_name} (Tespit: {len(ordered_comps)}, Beklenen: {len(expected_items)})</div>'
        html_content += f'<div class="expected-pool"><b>Beklenen Item Havuzu:</b> {pool_str}</div>'
        html_content += '<div class="grid-container">'
        html_content += f'<div><b>Orijinal Sheet:</b><br><img class="orig-img" src="../../{s_path}"></div>'
        html_content += '<div><b>Dilimlenen Hücreler (Soldan Sağa, Yukarıdan Aşağıya):</b><div class="cells-grid">'
        
        for idx, comp in enumerate(ordered_comps):
            cell_img = extract_isolated_item(img, labels, comp)
            cell_filename = f'cell_{idx+1:02d}.png'
            cell_path = s_dir / cell_filename
            cell_img.save(cell_path)
            
            curr_id = expected_items[idx][0] if idx < len(expected_items) else 'YOK'
            curr_name = expected_items[idx][1] if idx < len(expected_items) else '-'
            
            html_content += f'''
            <div class="cell-box">
                <img src="{s_name}/{cell_filename}">
                <div class="cell-label">Hücre #{idx+1:02d}</div>
                <div class="current-mapped">{curr_name}<br><small style="color:#aaa">{curr_id}</small></div>
            </div>
            '''
            
        html_content += '</div></div></div></div>'

    html_content += '</body></html>'

    with open('tools/sheet_grid_inspector.html', 'w', encoding='utf-8') as f:
        f.write(html_content)

    print('HTML inspector generated at tools/sheet_grid_inspector.html')

if __name__ == '__main__':
    main()
