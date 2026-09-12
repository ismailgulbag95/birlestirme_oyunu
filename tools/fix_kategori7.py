from PIL import Image
from pathlib import Path
import sys
sys.path.append('.')
from tools.run_full_pipeline import extract_binary_mask, segment_connected_components, extract_isolated_item

im7 = Image.open('assets/raw_sheets/kategori7.jfif')
w7, h7 = im7.size
mask7 = extract_binary_mask(im7)
labels7, comps7 = segment_connected_components(mask7, min_size=500)

# Merge nails (comps 3, 6, 7, 8) into one single component
nail_pixels = []
for nid in [3, 6, 7, 8]:
    nail_pixels.extend(comps7[nid]['pixels'])

min_x = min(p[0] for p in nail_pixels)
max_x = max(p[0] for p in nail_pixels)
min_y = min(p[1] for p in nail_pixels)
max_y = max(p[1] for p in nail_pixels)

civi_comp = {
    'id': 3,
    'bbox': [min_x, min_y, max_x, max_y],
    'pixels': nail_pixels
}

final_comps = {
    'celik_kulce': comps7[4],       # [83, 111, 506, 434]
    'ors': comps7[2],               # [603, 108, 1077, 436]
    'civi': civi_comp,              # Nails cluster
    'tugla': comps7[5],             # [1719, 120, 2133, 424]
    'harc': comps7[1],              # [2290, 83, 2648, 463]
    'tugla_duvar': comps7[13],      # [98, 588, 492, 956]
    'saglam_sandik': comps7[11],    # [627, 566, 1051, 978]
    'kristal': comps7[9],           # [1233, 557, 1530, 980]
    'teleskop': comps7[12],         # [1713, 582, 2139, 958]
    'vinc': comps7[10]              # [2363, 559, 2559, 982]
}

out_dir = Path('public/textures/items')
for name, c in final_comps.items():
    item_im = extract_isolated_item(im7, labels7, c)
    item_im.save(out_dir / f'{name}.png')
    print(f'Kategori 7 fixed: {name}.png')

# Recreate montage for kategori_7
thumb_size = 140
cols = 5
montage_items = [
    'celik_kulce', 'ors', 'civi', 'tugla', 'harc',
    'tugla_duvar', 'saglam_sandik', 'kristal', 'teleskop', 'vinc',
    'demir_parmaklik', 'savas_baltasi', 'gozetleme_kulesi', 'kale_kapisi'
]
montage = Image.new('RGBA', (thumb_size * cols, thumb_size * 3), (230, 230, 230, 255))
for idx, m_id in enumerate(montage_items):
    im = Image.open(out_dir / f'{m_id}.png')
    t = im.copy()
    t.thumbnail((thumb_size - 16, thumb_size - 16))
    x = (idx % cols) * thumb_size + (thumb_size - t.width) // 2
    y = (idx // cols) * thumb_size + (thumb_size - t.height) // 2
    montage.paste(t, (x, y), t)

montage.save('assets/cropped_preview/kategori_7_final_montage.png')
print('Kategori 7 montage recreated successfully!')
