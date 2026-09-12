from PIL import Image
from pathlib import Path
from tools.slice_item_sheets import (
    extract_binary_mask, segment_connected_components, 
    merge_nearby_subparts, sort_components_spatially, extract_isolated_item
)

for sheet_name in ['karma.jfif', 'karma2.jfif']:
    sheet_path = Path(f'assets/raw_sheets/{sheet_name}')
    img = Image.open(sheet_path)
    w, h = img.size
    mask = extract_binary_mask(img)
    labels, comps = segment_connected_components(mask)
    labels, comps = merge_nearby_subparts(labels, comps, w, h)
    ordered = sort_components_spatially(comps)
    
    out_dir = Path(f'assets/cropped_preview/{sheet_path.stem}')
    out_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Extracting {sheet_name} ({len(ordered)} items)...")
    for idx, comp in enumerate(ordered):
        item_img = extract_isolated_item(img, labels, comp)
        b = comp["bbox"]
        item_img.save(out_dir / f"{idx+1:02d}_bbox_{b[0]}_{b[1]}_{b[2]}_{b[3]}.png")
    print(f"Saved {sheet_name} to {out_dir}")
