import os
import glob
from PIL import Image, ImageChops, ImageFilter
import numpy as np

# Find latest generated image in conversation dir
brain_dir = r"C:\Users\ismai\.gemini\antigravity-ide\brain\94f70c12-adf0-4c93-869c-10498dbb3551"
jpg_files = glob.glob(os.path.join(brain_dir, "alchemy_game_icons_sheet_*.jpg"))
if not jpg_files:
    raise FileNotFoundError("Image sheet not found")

latest_img_path = max(jpg_files, key=os.path.getmtime)
print("Using image:", latest_img_path)

img = Image.open(latest_img_path).convert("RGBA")
width, height = img.size
print(f"Image size: {width}x{height}")

# Arka plan rengi tespiti (sol üst ve sağ üst köşe ortalaması)
corners = [
    img.getpixel((10, 10)),
    img.getpixel((width - 10, 10)),
    img.getpixel((10, height - 10)),
    img.getpixel((width - 10, height - 10))
]
print("Corners:", corners)

# Her bir ikonun yaklaşık kutusu (3x3 grid / 1024x1024)
# Sol-Üst: Karanlık (x: 0..340, y: 0..340)
# Üst-Orta: Keşif Pusulası (x: 340..680, y: 0..340)
# Üst-Sağ: Parşömen / İpucu (x: 680..1024, y: 0..340)
# Orta-Sol / Alt-Sol: Kazan (x: 0..340, y: 340..680)
# Orta-Orta: Çark / Ayarlar (x: 340..680, y: 340..680)
# Sağ-Alt: Süpürge / Temizleme (x: 680..1024, y: 680..1024)

def remove_background(crop_img, bg_color=(56, 61, 68), tolerance=40, smooth=True):
    arr = np.array(crop_img, dtype=np.float32)
    bg = np.array(bg_color[:3], dtype=np.float32)
    
    # Euclidean distance from background color
    diff = np.sqrt(np.sum((arr[:, :, :3] - bg) ** 2, axis=2))
    
    # Alpha mask: diff <= tolerance -> 0, diff >= tolerance + 30 -> 255
    alpha = np.clip((diff - tolerance) / 25.0 * 255.0, 0, 255)
    
    arr[:, :, 3] = alpha
    result = Image.fromarray(np.uint8(arr), mode="RGBA")
    
    # Auto-crop transparent boundaries
    bbox = result.getbbox()
    if bbox:
        # Add slight padding
        pad = 8
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(result.width, bbox[2] + pad),
            min(result.height, bbox[3] + pad)
        )
        result = result.crop(crop_box)
        
    return result

# 1. Karanlık (Darkness / Cosmic Void)
# Sol üst bölge
karanlik_crop = img.crop((15, 15, 340, 340))
# Karanlık için arka plan kaldırma (mor aura'yı koruyarak)
karanlik_clean = remove_background(karanlik_crop, bg_color=(56, 60, 68), tolerance=22)

# Kare ve standart boyuta getirelim (örn 256x256)
def make_square_centered(pil_img, size=256):
    w, h = pil_img.size
    max_side = max(w, h)
    square = Image.new("RGBA", (max_side, max_side), (0, 0, 0, 0))
    offset = ((max_side - w) // 2, (max_side - h) // 2)
    square.paste(pil_img, offset)
    return square.resize((size, size), Image.Resampling.LANCZOS)

karanlik_final = make_square_centered(karanlik_clean, 256)

# 2. Keşif (Discovery / Compass)
kesif_crop = img.crop((350, 15, 675, 340))
kesif_clean = remove_background(kesif_crop, bg_color=(56, 60, 68), tolerance=25)
kesif_final = make_square_centered(kesif_clean, 256)

# 3. İpucu / Parşömen (Hint / Scroll)
ipucu_crop = img.crop((680, 15, 1005, 340))
ipucu_clean = remove_background(ipucu_crop, bg_color=(56, 60, 68), tolerance=25)
ipucu_final = make_square_centered(ipucu_clean, 256)

# 4. Büyülü Birleştir (Magic Craft / Cauldron)
craft_crop = img.crop((20, 350, 335, 675))
craft_clean = remove_background(craft_crop, bg_color=(56, 60, 68), tolerance=25)
craft_final = make_square_centered(craft_clean, 256)

# 5. Ayarlar (Settings / Gear)
settings_crop = img.crop((350, 350, 675, 675))
settings_clean = remove_background(settings_crop, bg_color=(56, 60, 68), tolerance=25)
settings_final = make_square_centered(settings_clean, 256)

# 6. Temizlik (Cleanup / Broom)
cleanup_crop = img.crop((670, 670, 1005, 1005))
cleanup_clean = remove_background(cleanup_crop, bg_color=(56, 60, 68), tolerance=25)
cleanup_final = make_square_centered(cleanup_clean, 256)

# Hedef dizinleri oluşturalım
os.makedirs("public/textures/items", exist_ok=True)
os.makedirs("public/textures/ui", exist_ok=True)

# Kaydet
karanlik_final.save("public/textures/items/karanlik.png")
if os.path.exists("dist/textures/items"):
    karanlik_final.save("dist/textures/items/karanlik.png")

kesif_final.save("public/textures/ui/icon_discovery.png")
ipucu_final.save("public/textures/ui/icon_codex.png")
craft_final.save("public/textures/ui/icon_craft.png")
settings_final.save("public/textures/ui/icon_settings.png")
cleanup_final.save("public/textures/ui/icon_cleanup.png")

print("Tüm ikonlar başarıyla kırpıldı ve kaydedildi:")
print("1. public/textures/items/karanlik.png")
print("2. public/textures/ui/icon_discovery.png")
print("3. public/textures/ui/icon_codex.png")
print("4. public/textures/ui/icon_craft.png")
print("5. public/textures/ui/icon_settings.png")
print("6. public/textures/ui/icon_cleanup.png")
