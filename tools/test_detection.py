from pathlib import Path
from PIL import Image
import sys

# Import our existing functions
from slice_item_sheets import extract_binary_mask, segment_connected_components, merge_nearby_subparts, sort_components_spatially

raw_dir = Path('assets/raw_sheets')
for f in sorted(raw_dir.glob('*.jfif')):
    img = Image.open(f)
    w, h = img.size
    mask = extract_binary_mask(img)
    labels, comps = segment_connected_components(mask)
    labels, comps = merge_nearby_subparts(labels, comps, w, h)
    ordered = sort_components_spatially(comps)
    print(f"{f.name} ({w}x{h}): detected {len(ordered)} components")
