import os
import glob
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

def create_montages():
    debug_dir = Path('tools/debug_sheets')
    montage_dir = Path('tools/debug_montages')
    montage_dir.mkdir(parents=True, exist_ok=True)
    
    sheet_dirs = sorted([d for d in debug_dir.iterdir() if d.is_dir()])
    print(f"Creating montages for {len(sheet_dirs)} sheets...")
    
    cell_w, cell_h = 160, 160
    cols, rows = 5, 3
    
    for s_dir in sheet_dirs:
        cells = sorted(list(s_dir.glob('cell_*.png')))
        if not cells:
            continue
            
        montage = Image.new('RGBA', (cols * cell_w, rows * cell_h), (30, 30, 30, 255))
        draw = ImageDraw.Draw(montage)
        
        for idx, c_path in enumerate(cells):
            if idx >= cols * rows:
                break
            col = idx % cols
            row = idx // cols
            x = col * cell_w
            y = row * cell_h
            
            # Draw cell background border
            draw.rectangle([x+2, y+2, x+cell_w-2, y+cell_h-2], outline=(70, 70, 70, 255), width=1)
            
            # Paste cell image centered
            c_img = Image.open(c_path)
            c_img.thumbnail((cell_w - 20, cell_h - 40), Image.Resampling.LANCZOS)
            cw, ch = c_img.size
            px = x + (cell_w - cw) // 2
            py = y + 10 + (cell_h - 40 - ch) // 2
            
            # Alpha composite
            montage.paste(c_img, (px, py), c_img.convert('RGBA'))
            
            # Label
            draw.text((x + 6, y + cell_h - 22), f"#{idx+1:02d}", fill=(255, 220, 100, 255))
            
        out_path = montage_dir / f"{s_dir.name}_montage.png"
        montage.save(out_path)
        print(f"Saved: {out_path.name}")

if __name__ == '__main__':
    create_montages()
