from PIL import Image
from pathlib import Path
import sys
sys.path.append('.')
from tools.run_full_pipeline import extract_binary_mask, segment_connected_components, extract_isolated_item

im1 = Image.open('assets/raw_sheets/kategori 1.jfif')
w1, h1 = im1.size
mask1 = extract_binary_mask(im1)
labels1, comps1 = segment_connected_components(mask1, min_size=500)

def merge_ids(id_list):
    pixels = []
    for i in id_list:
        pixels.extend(comps1[i]['pixels'])
    min_x = min(p[0] for p in pixels)
    max_x = max(p[0] for p in pixels)
    min_y = min(p[1] for p in pixels)
    max_y = max(p[1] for p in pixels)
    return {
        'id': id_list[0],
        'bbox': [min_x, min_y, max_x, max_y],
        'pixels': pixels
    }

final_k1 = {
    'fire': merge_ids([1, 3]),                      # Ateş + kıvılcım
    'water': comps1[4],                             # Su damlası
    'earth': comps1[5],                             # Çimenli küp toprak
    'air': merge_ids([2, 6, 8]),                    # Hortum hava
    'mud': merge_ids([7, 9, 10]),                   # Çamur yığını + sıçrayan parçalar
    'lava': comps1[14],                             # Lav taşı
    'steam': comps1[11],                            # Buhar bulutu
    'rain': merge_ids([12, 16, 18]),                # 3 damla yağmur
    'energy': comps1[13],                           # Elektrikli enerji küresi
    'wind': merge_ids([15, 17]),                    # Rüzgar dalgası
    'stone': comps1[19],                            # Gri kaya
    'sand': comps1[22],                             # Kum tepesi
    'glass': comps1[21],                            # Cam küp
    'cloud': comps1[23],                            # Bulut
    'lightning': comps1[20]                         # Yıldırım
}

out_dir = Path('public/textures/items')
for name, c in final_k1.items():
    item_im = extract_isolated_item(im1, labels1, c)
    item_im.save(out_dir / f'{name}.png')
    print(f'Kategori 1 perfected: {name}.png')

# Recreate montage for kategori_1
thumb_size = 140
cols = 5
montage_items = [
    'fire', 'water', 'earth', 'air', 'mud',
    'lava', 'steam', 'rain', 'energy', 'wind',
    'stone', 'sand', 'glass', 'cloud', 'lightning',
    'kar', 'buz', 'obsidian', 'col'
]
montage = Image.new('RGBA', (thumb_size * cols, thumb_size * 4), (230, 230, 230, 255))
for idx, m_id in enumerate(montage_items):
    im = Image.open(out_dir / f'{m_id}.png')
    t = im.copy()
    t.thumbnail((thumb_size - 16, thumb_size - 16))
    x = (idx % cols) * thumb_size + (thumb_size - t.width) // 2
    y = (idx // cols) * thumb_size + (thumb_size - t.height) // 2
    montage.paste(t, (x, y), t)

montage.save('assets/cropped_preview/kategori_1_final_montage.png')
print('Kategori 1 montage perfected!')
