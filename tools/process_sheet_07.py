import os
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

SHEET_PATH = r"C:\Users\ismai\.gemini\antigravity-ide\brain\f1f0f847-c955-4abf-af01-da0772fab632\sheet_07_fauna_habitat_crafts_1789716348915.jpg"
OUTPUT_DIR = r"d:\github\birlestirme_oyunu\public\textures\items"

os.makedirs(OUTPUT_DIR, exist_ok=True)

ITEMS_GRID = [
    ["camel", "mouse", "pig", "reindeer", "snail"],
    ["squid", "vulture", "scarab", "nest", "birdhouse"],
    ["sponge", "fence", "incubator", "vase", "pillow"]
]

def remove_background_pure_pil(img_rgb, tolerance=32):
    w, h = img_rgb.size
    rgb_arr = np.array(img_rgb.convert("RGB")).astype(np.float32)
    
    corner_pixels = [
        rgb_arr[0, 0], rgb_arr[0, w-1],
        rgb_arr[h-1, 0], rgb_arr[h-1, w-1],
        rgb_arr[2, 2], rgb_arr[2, w-3],
        rgb_arr[h-3, 2], rgb_arr[h-3, w-3]
    ]
    bg_color = np.mean(corner_pixels, axis=0)
    
    diff = np.sqrt(np.sum((rgb_arr - bg_color) ** 2, axis=2))
    is_bg_candidate = (diff < tolerance)
    
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    for x in range(w):
        if is_bg_candidate[0, x] and not visited[0, x]:
            visited[0, x] = True
            queue.append((0, x))
        if is_bg_candidate[h-1, x] and not visited[h-1, x]:
            visited[h-1, x] = True
            queue.append((h-1, x))
            
    for y in range(h):
        if is_bg_candidate[y, 0] and not visited[y, 0]:
            visited[y, 0] = True
            queue.append((y, 0))
        if is_bg_candidate[y, w-1] and not visited[y, w-1]:
            visited[y, w-1] = True
            queue.append((y, w-1))
            
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and is_bg_candidate[ny, nx]:
                    visited[ny, nx] = True
                    queue.append((ny, nx))
                    
    alpha = np.where(visited, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(radius=0.6))
    
    rgba = img_rgb.convert("RGBA")
    rgba.putalpha(alpha_img)
    return rgba

def process_sheet():
    img = Image.open(SHEET_PATH)
    sheet_w, sheet_h = img.size
    print(f"Sheet 07 boyutu: {sheet_w}x{sheet_h}")
    
    rows = 3
    cols = 5
    cell_w = sheet_w / cols
    cell_h = sheet_h / rows
    
    saved_count = 0
    for r in range(rows):
        for c in range(cols):
            slug = ITEMS_GRID[r][c]
            
            left = int(c * cell_w)
            top = int(r * cell_h)
            right = int((c + 1) * cell_w)
            bottom = int((r + 1) * cell_h)
            
            cell = img.crop((left, top, right, bottom))
            clean_cell = remove_background_pure_pil(cell, tolerance=34)
            
            bbox = clean_cell.getbbox()
            if bbox:
                cropped = clean_cell.crop(bbox)
                target_size = 512
                final_img = Image.new("RGBA", (target_size, target_size), (0, 0, 0, 0))
                
                max_dim = int(target_size * 0.86)
                cw, ch = cropped.size
                scale = max_dim / max(cw, ch)
                nw, nh = int(cw * scale), int(ch * scale)
                resized = cropped.resize((nw, nh), Image.Resampling.LANCZOS)
                
                pos_x = (target_size - nw) // 2
                pos_y = (target_size - nh) // 2
                final_img.paste(resized, (pos_x, pos_y), resized)
            else:
                final_img = clean_cell.resize((512, 512), Image.Resampling.LANCZOS)
                
            out_file = os.path.join(OUTPUT_DIR, f"{slug}.png")
            final_img.save(out_file, "PNG", optimize=True)
            print(f" [OK] {slug}.png -> {out_file}")
            saved_count += 1

    print(f"\nPaket 7: Toplam {saved_count} fauna/eşya görseli başarıyla üretildi!")

if __name__ == "__main__":
    process_sheet()
