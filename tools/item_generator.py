"""
Yeni İtem Üretim ve Entegrasyon Pipeline'ı
-----------------------------------------
Bu araç:
1. itemDefinitions.js içindeki mevcut tüm eşyaları ve tarifleri ayrıştırır (parse eder).
2. Mevcut eşyaları kullanarak yeni mantıksal eşyalar ve tarifler sentezler.
   - Kural: Gerekmedikçe mevcut tarifleri bozmaz. Sadece bağlamı (alakalılık düzeyini)
     belirgin şekilde artıracaksa alternatif kombinasyon önerir.
3. Referans Midjourney / NanoBanana stiline uygun 14'lü (5x3 grid) İngilizce prompt oluşturur.
4. Üretilen spritesheet görselini akıllı flood-fill ve bağlı bileşen analiziyle şeffaflaştırıp
   parçalara ayırır, her eşyaya ait `public/textures/items/<id>.png` dosyasını oluşturur.
5. `itemDefinitions.js` ve `ItemFactory.js` (Three.js 3D modelleri) için gereken kod
   iskeletlerini üretir.
"""

import sys
import os
import re
import json
import argparse
from pathlib import Path
from PIL import Image, ImageFilter

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"
FACTORY_JS_PATH = WORKSPACE_DIR / "src" / "items" / "ItemFactory.js"
RAW_DIR = WORKSPACE_DIR / "assets" / "raw_sheets"
TEXTURES_DIR = WORKSPACE_DIR / "public" / "textures" / "items"
PREVIEW_DIR = WORKSPACE_DIR / "assets" / "cropped_preview"

RAW_DIR.mkdir(parents=True, exist_ok=True)
TEXTURES_DIR.mkdir(parents=True, exist_ok=True)
PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

def load_existing_items():
    """Mevcut item tanımlarını ve tariflerini itemDefinitions.js dosyasından okur."""
    content = ITEMS_JS_PATH.read_text(encoding="utf-8")
    
    # Basit regex ile id'leri ve adları çıkar
    item_matches = re.findall(r"(\w+):\s*\{\s*id:\s*['\"](\w+)['\"],\s*name:\s*['\"]([^'\"]+)['\"]", content)
    items = {item_id: name for _, item_id, name in item_matches}

    # Tarif kayıtlarını çıkar
    recipes = []
    recipe_matches = re.findall(r"inputs:\s*\[([^\]]+)\],\s*output:\s*['\"](\w+)['\"]", content)
    for inputs_str, output in recipe_matches:
        inputs = [i.strip().strip("'\"") for i in inputs_str.split(",") if i.strip() and i.strip() != "null"]
        recipes.append({"inputs": inputs, "output": output})

    return items, recipes

def generate_prompt_for_items(items_list):
    """
    14 adet eşyadan oluşan liste için NanoBanana / Gemini / Midjourney uyumlu
    5x3 grid spritesheet promptu üretir.
    items_list: list of dicts: [{'id': ..., 'name_tr': ..., 'prompt_desc': ...}]
    """
    items_desc = ", ".join([f"({i+1}) {item['prompt_desc']}" for i, item in enumerate(items_list)])
    
    prompt = (
        "A neat 5x3 grid spritesheet containing exactly 14 individual 2D casual mobile game icons, "
        "completely isolated on a solid pure white background. Clean vector art, vibrant cell shading, "
        "bold crisp outlines, flat shading, zero background drop shadows. "
        "NO text, NO labels, NO words, NO titles, NO typography, NO numbers, NO captions below or above items, strictly icon illustrations only. "
        f"The image must distinctly feature each of these 14 separate items arranged in orderly rows: {items_desc}. "
        "Generous empty white space between all items, bottom right corner is empty, perfectly modular for sprite slicing --ar 16:9 --v 6.0 --no text, font, letters, watermark, labels, names, words, typography, numbers"
    )
    return prompt

def extract_binary_mask(img):
    """Görseldeki saf beyaz veya açık arka planı flood-fill ile transparan maske haline getirir."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    pixels = rgb.load()

    mask = Image.new("L", (w, h), 255)
    mask_pixels = mask.load()

    visited = bytearray(w * h)
    queue = []

    # Kenarlardan başla
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
        visited[x] = 1
        visited[(h - 1) * w + x] = 1

    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
        visited[y * w] = 1
        visited[y * w + (w - 1)] = 1

    q_idx = 0
    while q_idx < len(queue):
        cx, cy = queue[q_idx]
        q_idx += 1

        r, g, b = pixels[cx, cy]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        c_diff = max(r, g, b) - min(r, g, b)

        # Beyaz veya açık gri arka plan tespiti
        is_bg = (lum > 235) or (lum > 205 and c_diff < 16) or (lum > 175 and c_diff < 10)

        if is_bg:
            mask_pixels[cx, cy] = 0
            for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                if 0 <= nx < w and 0 <= ny < h:
                    pos = ny * w + nx
                    if not visited[pos]:
                        visited[pos] = 1
                        queue.append((nx, ny))

    clean_mask = mask.filter(ImageFilter.MedianFilter(3))
    return clean_mask

def segment_connected_components(mask, min_size=250):
    """Maske üzerindeki ayrık nesneleri ve bounding kutularını bulur."""
    w, h = mask.size
    pixels = mask.load()
    labels = [0] * (w * h)
    components = {}
    current_label = 1

    for y in range(h):
        for x in range(w):
            pos = y * w + x
            if pixels[x, y] > 128 and labels[pos] == 0:
                queue = [(x, y)]
                labels[pos] = current_label
                min_x, max_x = x, x
                min_y, max_y = y, y
                comp_pixels = [(x, y)]

                q_idx = 0
                while q_idx < len(queue):
                    cx, cy = queue[q_idx]
                    q_idx += 1
                    if cx < min_x: min_x = cx
                    if cx > max_x: max_x = cx
                    if cy < min_y: min_y = cy
                    if cy > max_y: max_y = cy

                    for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                        if 0 <= nx < w and 0 <= ny < h:
                            npos = ny * w + nx
                            if pixels[nx, ny] > 128 and labels[npos] == 0:
                                labels[npos] = current_label
                                queue.append((nx, ny))
                                comp_pixels.append((nx, ny))

                if len(comp_pixels) >= min_size:
                    components[current_label] = {
                        "bbox": (min_x, min_y, max_x, max_y),
                        "pixels": comp_pixels,
                        "area": len(comp_pixels)
                    }
                    current_label += 1

    return components

def slice_spritesheet(image_path, target_items, output_dir=TEXTURES_DIR):
    """
    Spritesheet görselini 14 eşyaya böler ve hedef isimlerle şeffaf PNG olarak kaydeder.
    target_items: list of item_id strings (sırasıyla sol-üstten sağ-alta 14 adet)
    """
    img = Image.open(image_path).convert("RGBA")
    mask = extract_binary_mask(img)
    components = segment_connected_components(mask, min_size=200)

    boxes = []
    for cid, cdata in components.items():
        min_x, min_y, max_x, max_y = cdata["bbox"]
        if (max_x - min_x) < 20 or (max_y - min_y) < 20:
            continue
        center_y = (min_y + max_y) / 2
        center_x = (min_x + max_x) / 2
        boxes.append({
            "cid": cid,
            "bbox": (min_x, min_y, max_x, max_y),
            "cx": center_x,
            "cy": center_y,
            "data": cdata
        })

    img_h = img.height
    row_height = img_h / 3.0
    for b in boxes:
        b["row"] = int(b["cy"] // (row_height * 0.9))

    boxes.sort(key=lambda b: (b["row"], b["cx"]))

    print(f"[{image_path.name}] {len(boxes)} adet nesne tespit edildi. Hedef: {len(target_items)} eşya.")

    saved_items = []
    for idx, item_id in enumerate(target_items):
        if idx >= len(boxes):
            print(f"Uyarı: {item_id} için yeterli kırpılmış parça bulunamadı!")
            break
        
        box = boxes[idx]
        min_x, min_y, max_x, max_y = box["bbox"]
        pad = 8
        min_x = max(0, min_x - pad)
        min_y = max(0, min_y - pad)
        max_x = min(img.width, max_x + pad)
        max_y = min(img.height, max_y + pad)

        cropped_img = img.crop((min_x, min_y, max_x, max_y))
        cropped_mask = mask.crop((min_x, min_y, max_x, max_y))
        cropped_img.putalpha(cropped_mask)

        max_dim = max(cropped_img.width, cropped_img.height)
        square = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
        ox = (max_dim - cropped_img.width) // 2
        oy = (max_dim - cropped_img.height) // 2
        square.paste(cropped_img, (ox, oy), cropped_img)
        final_thumb = square.resize((256, 256), Image.Resampling.LANCZOS)

        out_file = output_dir / f"{item_id}.png"
        final_thumb.save(out_file, "PNG")
        saved_items.append(out_file)
        print(f"  -> Kaydedildi: {out_file.name}")

    return saved_items

def generate_code_templates(new_items, category_num=9):
    """
    Yeni eklenen eşyalar için itemDefinitions.js ve ItemFactory.js şablon kodlarını oluşturur.
    """
    definitions_code = f"\n// ================= KATEGORİ {category_num} EŞYA TANIMLARI ================\n"
    for item in new_items:
        definitions_code += f"""  {item['id']}: {{
    id: '{item['id']}',
    name: '{item['name_tr']}',
    description: '{item['desc_tr']}',
    tier: {item.get('tier', 8)},
    colorPalette: {{ primary: '{item.get('color_primary', '#6366f1')}', secondary: '{item.get('color_secondary', '#a855f7')}', emissive: '{item.get('color_emissive', '#4338ca')}' }},
    particles: {{ type: '{item.get('particle_type', 'spark')}', color: '{item.get('particle_color', '#818cf8')}', count: 12 }},
    recipe: {{ inputs: {json.dumps(item['inputs'])} }},
    icon: '{item.get('icon', '✨')}',
    category: '{item.get('category_name', f'kategori_{category_num}')}'
  }},\n"""

    recipes_code = f"\nexport const RECIPES_CAT_{category_num} = [\n"
    for item in new_items:
        inputs_json = json.dumps(item['inputs'])
        recipes_code += f"  {{ inputs: {inputs_json}, output: '{item['id']}', category: {category_num} }},\n"
    recipes_code += "];\n"

    return definitions_code, recipes_code

def main():
    parser = argparse.ArgumentParser(description="Birleştirme Oyunu Yeni İtem Pipeline Aracı")
    parser.add_argument("--scan", action="store_true", help="Mevcut eşyaları ve tarifleri tara")
    parser.add_argument("--slice", type=str, help="İşlenecek spritesheet görsel dosyasının yolu")
    parser.add_argument("--items-json", type=str, help="Eşya kimlikleri ve prompt tanımlarını içeren JSON dosyası")
    args = parser.parse_args()

    items, recipes = load_existing_items()
    print(f"Mevcut Sistem Durumu: {len(items)} eşya, {len(recipes)} aktif tarif kayıtlı.")

    if args.scan:
        print("Taranan ilk 10 eşya:")
        for k in list(items.keys())[:10]:
            print(f" - {k}: {items[k]}")

    if args.slice:
        if not args.items_json:
            print("Hata: --items-json belirtilmelidir.")
            return
        with open(args.items_json, "r", encoding="utf-8") as f:
            target_items = json.load(f)
        image_path = Path(args.slice)
        if not image_path.is_absolute():
            image_path = WORKSPACE_DIR / image_path
        print(f"Dilimleme başlatılıyor: {image_path}")
        slice_spritesheet(image_path, target_items)


if __name__ == "__main__":
    main()
