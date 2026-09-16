"""
Birleştirme Oyunu - Akıllı Item Ayıklama ve İsimlendirme Pipeline'ı
-------------------------------------------------------------------
Bu betik tamamen birleştirme_oyunu projesi içine kurulmuştur.
1. assets/raw_sheets/ klasöründeki kategori görsel sayfalarını okur.
2. Dış Çerçeveden Flood-Fill ile sadece stüdyo arka planını siler (parlama ve beyaz yüzeyler korunur).
3. Kapalı halka boşluklarını (anahtar deliği, çark göbeği vb.) temizler.
4. Satır ve sütun uzamsal sıralaması (Spatial Sorting: soldan sağa, yukarıdan aşağıya) yapar.
5. İki aşamalı çalışabilir:
   Aşama 1: Önce kırpar, önizleme klasörüne çıkarır veya kategori sırasına göre otomatik eşleştirir.
   Aşama 2: Projedeki item listesiyle (itemDefinitions.js) eşleştirip public/textures/items/ altına kaydeder.
"""

import os
import re
import sys
import json
import shutil
from pathlib import Path
from PIL import Image, ImageFilter

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
RAW_SHEETS_DIR = WORKSPACE_DIR / "assets" / "raw_sheets"
OUTPUT_ITEMS_DIR = WORKSPACE_DIR / "public" / "textures" / "items"
DEBUG_PREVIEW_DIR = WORKSPACE_DIR / "assets" / "cropped_preview"
ITEM_DEFS_FILE = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"

# Kategori listesi ve eşyaların ID + Türkçe adları
CATEGORY_CONFIG = {
    "01_elements": {
        "slug": "01_elements",
        "aliases": ["01_elements", "1_elements", "elements", "01", "elementler"],
        "items": [
            ("fire", "Ateş"), ("water", "Su"), ("earth", "Toprak"), ("air", "Hava"),
            ("steam", "Buhar"), ("mud", "Çamur"), ("lava", "Lav"), ("sand", "Kum"),
            ("obsidian", "Obsidyen"), ("rain", "Yağmur"), ("energy", "Enerji"),
            ("wind", "Rüzgar"), ("stone", "Taş"), ("glass", "Cam"), ("cloud", "Bulut"),
            ("lightning", "Yıldırım"), ("kar", "Kar"), ("buz", "Buz"), ("col", "Çöl")
        ]
    },
    "02_doga": {
        "slug": "02_doga",
        "aliases": ["02_doga", "2_doga", "doga", "nature", "02"],
        "items": [
            ("plant", "Bitki"), ("tree", "Ağaç"), ("wood", "Odun"), ("splinter", "Kıymık"),
            ("fiber", "Lif"), ("mushroom", "Mantar"), ("cotton", "Pamuk"), ("resin", "Reçine"),
            ("tohum", "Tohum"), ("bugday", "Buğday"), ("nane", "Nane"), ("agac_kabugu", "Ağaç Kabuğu")
        ]
    },
    "03_canlilar": {
        "slug": "03_canlilar",
        "aliases": ["03_canlilar", "3_canlilar", "canlilar", "life", "03"],
        "items": [
            ("life", "Yaşam"), ("bird", "Kuş"), ("animal", "Hayvan"), ("fish", "Balık"),
            ("inek", "İnek"), ("sut", "Süt"), ("yumurta", "Yumurta"), ("mercan", "Mercan")
        ]
    },
    "04_zanaat_ve_aletler": {
        "slug": "04_zanaat_ve_aletler",
        "aliases": ["04_zanaat_ve_aletler", "4_zanaat_ve_aletler", "craft_tools", "zanaat", "aletler", "04"],
        "items": [
            ("rope", "İp"), ("fabric", "Kumaş"), ("coal", "Kömür"), ("ash", "Kül"),
            ("paper", "Kağıt"), ("primitive_knife", "İlkel Bıçak"), ("feather", "Kuş Tüyü"),
            ("leather", "Deri"), ("cooked_meat", "Kavrulmuş Et"), ("pottery", "Çömlek"),
            ("water_jug", "Su Çömleği"), ("bottle", "Şişe"), ("flint", "Çakmaktaşı"),
            ("bow", "Yay"), ("arrow", "Ok"), ("torch", "Meşale"), ("raw_metal", "Metal"),
            ("iron_ingot", "Demir Külçe"), ("metal_knife", "Metal Bıçak"), ("pickaxe", "Kazma"),
            ("sword", "Kılıç"), ("wooden_shield", "Ahşap Kalkan"), ("iron_shield", "Demir Kalkan"),
            ("leather_armor", "Deri Zırh"), ("iron_armor", "Demir Zırh"), ("bed", "Yatak"),
            ("olta", "Olta"), ("yelken", "Yelken"), ("sal", "Sal"), ("obsidyen_bicak", "Obsidyen Bıçak")
        ]
    },
    "05_kimya_simya_buyu": {
        "slug": "05_kimya_simya_buyu",
        "aliases": ["05_kimya_simya_buyu", "5_kimya_simya_buyu", "simya", "buyu", "05"],
        "items": [
            ("zehirli_sivi", "Zehirli Sıvı"), ("zehir_sisesi", "Zehir Şişesi"),
            ("zehirli_kilic", "Zehirli Kılıç"), ("sifa_iksiri", "Şifa İksiri"),
            ("mana_iksiri", "Mana İksiri"), ("barut", "Barut"), ("bomba", "Bomba"),
            ("buyu_parsomeni", "Büyü Parşömeni"), ("yildirim_parsomeni", "Yıldırım Parşömeni"),
            ("ates_topu_kitabi", "Ateş Topu Kitabı"), ("peynir", "Peynir"), ("un", "Un"),
            ("hamur", "Hamur"), ("ekmek", "Ekmek")
        ]
    },
    "06_mekanik_medeniyet": {
        "slug": "06_mekanik_medeniyet",
        "aliases": ["06_mekanik_medeniyet", "6_mekanik_medeniyet", "mekanik", "medeniyet", "06"],
        "items": [
            ("buhar_motoru", "Buhar Motoru"), ("tekerlek", "Tekerlek"), ("el_arabasi", "El Arabası"),
            ("lokomotif", "Lokomotif"), ("ampul", "Ampul"), ("fener", "Fener"),
            ("pusula", "Pusula"), ("miknatis", "Mıknatıs"), ("elektrik_motoru", "Elektrik Motoru"),
            ("disli_cark", "Dişli Çark"), ("degirmen", "Değirmen"), ("ayna", "Ayna"), ("saat", "Saat")
        ]
    },
    "07_agir_sanayi_insaat": {
        "slug": "07_agir_sanayi_insaat",
        "aliases": ["07_agir_sanayi_insaat", "7_agir_sanayi_insaat", "agir_sanayi", "insaat", "07"],
        "items": [
            ("celik_kulce", "Çelik Külçe"), ("ors", "Örs"), ("civi", "Çivi"),
            ("tugla", "Tuğla"), ("harc", "Harç"), ("tugla_duvar", "Tuğla Duvar"),
            ("saglam_sandik", "Sağlam Sandık"), ("kristal", "Kristal"),
            ("teleskop", "Teleskop"), ("vinc", "Vinç"), ("demir_parmaklik", "Demir Parmaklık"),
            ("savas_baltasi", "Savaş Baltası"), ("gozetleme_kulesi", "Gözetleme Kulesi"),
            ("kale_kapisi", "Kale Kapısı")
        ]
    },
    "08_kozmoloji_boyutlar": {
        "slug": "08_kozmoloji_boyutlar",
        "aliases": ["08_kozmoloji_boyutlar", "8_kozmoloji_boyutlar", "kozmoloji", "boyutlar", "08"],
        "items": [
            ("yildiz_tozu", "Yıldız Tozu"), ("prizma_tasi", "Prizma Taşı"),
            ("kahin_kuresi", "Kahin Küresi"), ("portal_runu", "Portal Rünü"),
            ("bosluk_sisesi", "Boşluk Şişesi"), ("boyut_kapisi", "Boyut Kapısı"),
            ("anka_kulu", "Anka Külü"), ("runik_zirh", "Runik Zırh"),
            ("firtina_kilici", "Fırtına Kılıcı"), ("yildiz_gecidi_cekirdegi", "Yıldız Geçidi Çekirdeği"),
            ("buz_runu", "Buz Rünü"), ("cehennem_tasi", "Cehennem Taşı"),
            ("zaman_kum_saati", "Zaman Kum Saati"), ("illuzyon_aynasi", "İllüzyon Aynası")
        ]
    }
}

def match_category_from_filename(filename):
    lower = filename.lower()
    for cat_key, info in CATEGORY_CONFIG.items():
        for alias in info["aliases"]:
            if alias in lower:
                return cat_key
    return None

def extract_binary_mask(img):
    """
    Dış çerçeveden (4 kenardan) flood-fill yaparak arka planı bulur.
    İçerideki yansıma ve beyaz metalleri asla silmez.
    """
    rgb = img.convert("RGB")
    w, h = rgb.size
    pixels = rgb.load()

    mask = Image.new("L", (w, h), 255)
    mask_pixels = mask.load()

    visited = bytearray(w * h)
    queue = []

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

                bw = max_x - min_x
                bh = max_y - min_y
                if len(comp_pixels) >= min_size and bw >= 24 and bh >= 24 and (bw < w * 0.95 or bh < h * 0.95):
                    components[current_label] = {
                        "id": current_label,
                        "bbox": [min_x, min_y, max_x, max_y],
                        "pixels": comp_pixels
                    }
                    current_label += 1

    return labels, components

def merge_nearby_subparts(labels, components, w, h):
    merged = True
    while merged:
        merged = False
        comp_ids = list(components.keys())
        for i in range(len(comp_ids)):
            id1 = comp_ids[i]
            if id1 not in components: continue
            b1 = components[id1]["bbox"]
            p1_len = len(components[id1]["pixels"])

            for j in range(i + 1, len(comp_ids)):
                id2 = comp_ids[j]
                if id2 not in components: continue
                b2 = components[id2]["bbox"]
                p2_len = len(components[id2]["pixels"])

                dx = max(0, max(b1[0], b2[0]) - min(b1[2], b2[2]))
                dy = max(0, max(b1[1], b2[1]) - min(b1[3], b2[3]))

                # Kopuk ufak sap veya parça (< 1200 px ve mesafe < 18 px)
                if (p1_len < 1200 or p2_len < 1200) and (dx < 18 and dy < 18):
                    components[id1]["bbox"] = [
                        min(b1[0], b2[0]), min(b1[1], b2[1]),
                        max(b1[2], b2[2]), max(b1[3], b2[3])
                    ]
                    components[id1]["pixels"].extend(components[id2]["pixels"])
                    for px, py in components[id2]["pixels"]:
                        labels[py * w + px] = id1
                    del components[id2]
                    merged = True
                    break
            if merged: break

    return labels, components

def clean_enclosed_holes(item_rgba, min_hole_size=200, white_lum_thresh=248):
    w, h = item_rgba.size
    r_ch, g_ch, b_ch, a_ch = item_rgba.split()
    r_pix = r_ch.load()
    g_pix = g_ch.load()
    b_pix = b_ch.load()
    a_pix = a_ch.load()

    cand_holes = Image.new("L", (w, h), 0)
    cand_pix = cand_holes.load()

    for y in range(h):
        for x in range(w):
            if a_pix[x, y] > 100:
                r, g, b = r_pix[x, y], g_pix[x, y], b_pix[x, y]
                lum = 0.299 * r + 0.587 * g + 0.114 * b
                c_diff = max(r, g, b) - min(r, g, b)
                if lum >= white_lum_thresh and c_diff <= 5:
                    cand_pix[x, y] = 255

    visited = bytearray(w * h)
    hole_pixels = set()

    for y in range(h):
        for x in range(w):
            pos = y * w + x
            if not visited[pos] and cand_pix[x, y] == 255:
                queue = [(x, y)]
                visited[pos] = 1
                island = [(x, y)]
                q_idx = 0
                while q_idx < len(queue):
                    cx, cy = queue[q_idx]
                    q_idx += 1
                    for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
                        if 0 <= nx < w and 0 <= ny < h:
                            npos = ny * w + nx
                            if not visited[npos] and cand_pix[nx, ny] == 255:
                                visited[npos] = 1
                                queue.append((nx, ny))
                                island.append((nx, ny))

                if len(island) >= min_hole_size:
                    for ix, iy in island:
                        hole_pixels.add((ix, iy))

    if not hole_pixels:
        return item_rgba

    new_a = a_ch.copy()
    new_a_pix = new_a.load()
    for hx, hy in hole_pixels:
        new_a_pix[hx, hy] = 0

    smooth_a = new_a.filter(ImageFilter.SMOOTH)
    return Image.merge("RGBA", (r_ch, g_ch, b_ch, smooth_a))

def extract_isolated_item(original_img, labels, comp, padding=8):
    orig_w, orig_h = original_img.size
    b = comp["bbox"]
    x1 = max(0, b[0] - padding)
    y1 = max(0, b[1] - padding)
    x2 = min(orig_w, b[2] + padding)
    y2 = min(orig_h, b[3] + padding)

    crop_w = x2 - x1
    crop_h = y2 - y1

    orig_rgb = original_img.convert("RGB")
    rgb_pix = orig_rgb.load()
    target_id = comp["id"]

    item_img = Image.new("RGBA", (crop_w, crop_h), (0, 0, 0, 0))
    item_pix = item_img.load()

    for local_y in range(crop_h):
        global_y = y1 + local_y
        for local_x in range(crop_w):
            global_x = x1 + local_x
            pos = global_y * orig_w + global_x
            if labels[pos] == target_id:
                r, g, b_col = rgb_pix[global_x, global_y]
                item_pix[local_x, local_y] = (r, g, b_col, 255)

    item_img = clean_enclosed_holes(item_img)
    r_ch, g_ch, b_ch, a_ch = item_img.split()
    smooth_a = a_ch.filter(ImageFilter.SMOOTH)
    final_item = Image.merge("RGBA", (r_ch, g_ch, b_ch, smooth_a))
    return final_item

def sort_components_spatially(components):
    """
    Satır bazlı (Vertical overlap) ve satır içi soldan sağa doğal sıralama
    """
    comp_list = list(components.values())
    if not comp_list:
        return []

    comp_list.sort(key=lambda c: (c["bbox"][1], c["bbox"][0]))
    rows = []

    for c in comp_list:
        b = c["bbox"]
        y1, y2 = b[1], b[3]
        bh = y2 - y1

        assigned_row = None
        for row in rows:
            ry1 = min(item["bbox"][1] for item in row)
            ry2 = max(item["bbox"][3] for item in row)
            overlap = max(0, min(y2, ry2) - max(y1, ry1))
            min_h = min(bh, ry2 - ry1)

            if overlap >= min_h * 0.25 or (y1 >= ry1 and y1 <= ry2):
                assigned_row = row
                break

        if assigned_row is not None:
            assigned_row.append(c)
        else:
            rows.append([c])

    rows.sort(key=lambda r: sum(item["bbox"][1] for item in r) / len(r))
    ordered = []
    for row in rows:
        row.sort(key=lambda item: item["bbox"][0])
        ordered.extend(row)

    return ordered

def process_single_sheet(sheet_path, target_category_key=None, direct_save=False):
    print(f"\n--- İşleniyor: {sheet_path.name} ---")
    img = Image.open(sheet_path)
    w, h = img.size
    print(f"Boyut: {w}x{h}")

    # 1. Maske
    mask = extract_binary_mask(img)
    # 2. Segmentasyon
    labels, components = segment_connected_components(mask)
    labels, components = merge_nearby_subparts(labels, components, w, h)
    ordered_comps = sort_components_spatially(components)
    found_count = len(ordered_comps)
    print(f"Tespit Edilen Item Sayısı: {found_count}")

    # Dinamik Prompt Config Denetimi (Örn: sheet_01_02_doga_config.json)
    PROMPTS_DIR = WORKSPACE_DIR / "assets" / "sheet_prompts"
    prompt_config_file = PROMPTS_DIR / f"{sheet_path.stem}_config.json"
    
    cat_key = target_category_key or match_category_from_filename(sheet_path.name)
    if prompt_config_file.exists():
        with open(prompt_config_file, "r", encoding="utf-8") as pf:
            cfg_data = json.load(pf)
            expected_items = cfg_data.get("items", [])
            cat_key = cfg_data.get("category", cat_key)
            print(f"Otomatik Prompt Konfigürasyonu Yüklendi: {prompt_config_file.name} ({len(expected_items)} item)")
    else:
        expected_items = CATEGORY_CONFIG[cat_key]["items"] if cat_key in CATEGORY_CONFIG else []

    if cat_key:
        print(f"Eşleşen Kategori: {cat_key} (Beklenen: {len(expected_items)} item)")
    else:
        print("Uyarı: Dosya adından kategori tespit edilemedi. Numaralandırılarak kaydedilecek.")

    # Çıkış dizinleri
    sheet_stem = sheet_path.stem
    cat_preview_dir = DEBUG_PREVIEW_DIR / (cat_key or sheet_stem)
    cat_preview_dir.mkdir(parents=True, exist_ok=True)
    OUTPUT_ITEMS_DIR.mkdir(parents=True, exist_ok=True)

    extracted_records = []

    for idx, comp in enumerate(ordered_comps):
        item_img = extract_isolated_item(img, labels, comp)

        item_id = None
        item_name = None
        if idx < len(expected_items):
            item_id, item_name = expected_items[idx]

        # 1. Önce Kırpılmış Önizleme Kaydı (Sıralı indeksle)
        preview_filename = f"{idx+1:02d}_{item_id or 'item'}.png"
        preview_path = cat_preview_dir / preview_filename
        item_img.save(preview_path, format="PNG")

        # 2. İsimlendirilmiş Ana Proje Kaydı (Eğer item_id biliniyorsa)
        if item_id:
            final_path = OUTPUT_ITEMS_DIR / f"{item_id}.png"
            item_img.save(final_path, format="PNG")
            extracted_records.append({
                "index": idx + 1,
                "item_id": item_id,
                "item_name": item_name,
                "preview": str(preview_path.relative_to(WORKSPACE_DIR)),
                "final": str(final_path.relative_to(WORKSPACE_DIR))
            })
            print(f"  [{idx+1:02d}] -> {item_id}.png ({item_name})")
        else:
            print(f"  [{idx+1:02d}] -> {preview_filename} (Beklenen listede karşılığı yok)")

    return extracted_records

def main():
    RAW_SHEETS_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_ITEMS_DIR.mkdir(parents=True, exist_ok=True)
    DEBUG_PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    sheet_files = sorted(list(RAW_SHEETS_DIR.glob("*.png")) + list(RAW_SHEETS_DIR.glob("*.jpg")) + list(RAW_SHEETS_DIR.glob("*.jpeg")))

    if not sheet_files:
        print("\n=======================================================")
        print("BİLGİ: 'assets/raw_sheets/' klasöründe işlenecek görsel bulunamadı.")
        print("Lütfen ürettiğiniz tek/grid kategori görsellerini bu klasöre koyun.")
        print(f"Hedef Klasör: {RAW_SHEETS_DIR}")
        print("=======================================================\n")
        return

    print(f"Toplam {len(sheet_files)} görsel sayfası bulundu. İşlem başlatılıyor...")
    for sheet in sheet_files:
        process_single_sheet(sheet)

    print("\nİşlem tamamlandı! Kırpılmış eşyalar:")
    print(f"- Önizleme / Denetim: {DEBUG_PREVIEW_DIR}")
    print(f"- Oyunda Kullanıma Hazır İsimlendirilmiş PNG'ler: {OUTPUT_ITEMS_DIR}")

if __name__ == "__main__":
    main()
