from PIL import Image
from pathlib import Path
import sys
sys.path.append('.')
from tools.run_full_pipeline import (
    extract_binary_mask, segment_connected_components, 
    merge_components_by_distance, sort_components_spatially, extract_isolated_item
)

out_dir = Path('public/textures/items')

# 1. Fix Kategori 1 (tam 15 eşya olmalı)
print("Fixing Kategori 1...")
im1 = Image.open('assets/raw_sheets/kategori 1.jfif')
w1, h1 = im1.size
mask1 = extract_binary_mask(im1)
labels1, comps1 = segment_connected_components(mask1, min_size=500)
labels1, comps1 = merge_components_by_distance(labels1, comps1, w1, h1, max_dist=120, max_part_size=15000)
ordered1 = sort_components_spatially(comps1)
print(f'Kategori 1 comp count: {len(ordered1)}')

items_k1 = [
    'fire', 'water', 'earth', 'air', 'mud', 
    'lava', 'steam', 'rain', 'energy', 'wind', 
    'stone', 'sand', 'glass', 'cloud', 'lightning'
]
for idx, c in enumerate(ordered1):
    if idx < len(items_k1):
        item_im = extract_isolated_item(im1, labels1, c)
        item_id = items_k1[idx]
        item_im.save(out_dir / f'{item_id}.png')
        print(f'  kategori 1 [{idx+1}] -> {item_id}.png')

# 2. Fix Kategori 7 (tam 10 eşya olmalı: Çiviler tek küme)
print("\nFixing Kategori 7...")
im7 = Image.open('assets/raw_sheets/kategori7.jfif')
w7, h7 = im7.size
mask7 = extract_binary_mask(im7)
labels7, comps7 = segment_connected_components(mask7, min_size=500)
labels7, comps7 = merge_components_by_distance(labels7, comps7, w7, h7, max_dist=150, max_part_size=25000)
ordered7 = sort_components_spatially(comps7)
print(f'Kategori 7 comp count: {len(ordered7)}')

items_k7 = [
    'celik_kulce', 'ors', 'civi', 'tugla', 'harc', 
    'tugla_duvar', 'saglam_sandik', 'kristal', 'teleskop', 'vinc'
]
for idx, c in enumerate(ordered7):
    if idx < len(items_k7):
        item_im = extract_isolated_item(im7, labels7, c)
        item_id = items_k7[idx]
        item_im.save(out_dir / f'{item_id}.png')
        print(f'  kategori 7 [{idx+1}] -> {item_id}.png')

# 3. Fix Kategori 8 (İlk 10 eşya ana sayfadan alınmalı)
print("\nFixing Kategori 8...")
im8 = Image.open('assets/raw_sheets/kategori 8.jfif')
w8, h8 = im8.size
mask8 = extract_binary_mask(im8)
labels8, comps8 = segment_connected_components(mask8, min_size=500)
labels8, comps8 = merge_components_by_distance(labels8, comps8, w8, h8, max_dist=40, max_part_size=3000)
ordered8 = sort_components_spatially(comps8)
print(f'Kategori 8 comp count: {len(ordered8)}')

items_k8 = [
    'yildiz_tozu', 'prizma_tasi', 'kahin_kuresi', 'portal_runu', 'bosluk_sisesi', 
    'boyut_kapisi', 'anka_kulu', 'runik_zirh', 'firtina_kilici', 'yildiz_gecidi_cekirdegi'
]
for idx, c in enumerate(ordered8[:10]):
    item_im = extract_isolated_item(im8, labels8, c)
    item_id = items_k8[idx]
    item_im.save(out_dir / f'{item_id}.png')
    print(f'  kategori 8 [{idx+1}] -> {item_id}.png')

print("\nKalibrasyon başarıyla tamamlandı!")
