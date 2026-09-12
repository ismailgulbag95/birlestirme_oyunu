"""
Birleştirme Oyunu - Nihai Item Ayıklama ve Eşleştirme Pipeline'ı
-----------------------------------------------------------------
1. kategori 1..8 sayfalarındaki ana eşyaları kırpar ve akıllı maske ile şeffaflaştırır.
2. karma.jfif ve karma2.jfif içindeki (Yeni) eşyaları kırpıp ilgili kategorilere ve ID'lere bağlar.
3. Çok parçalı nesneleri (Ateş kıvılcımları, Yağmur damlaları, Çiviler, Tohum taneleri) tek nesne olarak birleştirir.
4. public/textures/items/<id>.png olarak doğrudan oyuna hazır şeffaf PNG formatında kaydeder.
5. assets/cropped_preview/ klasöründe her kategori için önizleme montajı (montage) oluşturur.
"""

import sys
import shutil
from pathlib import Path
from PIL import Image, ImageFilter

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = WORKSPACE_DIR / "assets" / "raw_sheets"
OUTPUT_DIR = WORKSPACE_DIR / "public" / "textures" / "items"
PREVIEW_DIR = WORKSPACE_DIR / "assets" / "cropped_preview"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

def extract_binary_mask(img):
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

def segment_connected_components(mask, min_size=200):
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
                if len(comp_pixels) >= min_size and bw >= 20 and bh >= 20 and (bw < w * 0.95 or bh < h * 0.95):
                    components[current_label] = {
                        "id": current_label,
                        "bbox": [min_x, min_y, max_x, max_y],
                        "pixels": comp_pixels
                    }
                    current_label += 1

    return labels, components

def merge_components_by_distance(labels, components, w, h, max_dist=20, max_part_size=1500):
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

                if (p1_len < max_part_size or p2_len < max_part_size) and (dx <= max_dist and dy <= max_dist):
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

def clean_enclosed_holes(item_rgba, min_hole_size=150, white_lum_thresh=248):
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

    comp_pixel_set = set(comp["pixels"])
    for local_y in range(crop_h):
        global_y = y1 + local_y
        for local_x in range(crop_w):
            global_x = x1 + local_x
            if (global_x, global_y) in comp_pixel_set:
                r, g, b_col = rgb_pix[global_x, global_y]
                item_pix[local_x, local_y] = (r, g, b_col, 255)

    item_img = clean_enclosed_holes(item_img)
    r_ch, g_ch, b_ch, a_ch = item_img.split()
    smooth_a = a_ch.filter(ImageFilter.SMOOTH)
    return Image.merge("RGBA", (r_ch, g_ch, b_ch, smooth_a))

def sort_components_spatially(components):
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

def slice_sheet(sheet_filename, merge_dist=20, max_part_size=1500):
    sheet_path = RAW_DIR / sheet_filename
    im = Image.open(sheet_path)
    w, h = im.size
    mask = extract_binary_mask(im)
    labels, comps = segment_connected_components(mask)
    labels, comps = merge_components_by_distance(labels, comps, w, h, max_dist=merge_dist, max_part_size=max_part_size)
    ordered = sort_components_spatially(comps)
    
    extracted_images = []
    for c in ordered:
        item_im = extract_isolated_item(im, labels, c)
        extracted_images.append(item_im)
    return extracted_images

# Tüm kategoriler için tanımlar (id, Ad, Kaynak Belirleyici)
ALL_CATEGORIES = {
    "kategori_1": {
        "title": "Kategori 1: İlkel Elementler & Temel Fizik",
        "items": [
            ("fire", "Ateş"),
            ("water", "Su"),
            ("earth", "Toprak"),
            ("air", "Hava"),
            ("mud", "Çamur"),
            ("lava", "Lav"),
            ("steam", "Buhar"),
            ("rain", "Yağmur"),
            ("energy", "Enerji"),
            ("wind", "Rüzgar"),
            ("stone", "Taş"),
            ("sand", "Kum"),
            ("glass", "Cam"),
            ("cloud", "Bulut"),
            ("lightning", "Yıldırım"),
            ("kar", "Kar"),
            ("buz", "Buz"),
            ("obsidian", "Obsidyen"),
            ("col", "Çöl")
        ]
    },
    "kategori_2": {
        "title": "Kategori 2: Flora, Jeoloji & Hammaddeler",
        "items": [
            ("plant", "Bitki Filizi"),
            ("tree", "Çam Ağacı"),
            ("wood", "Odun (Kütük)"),
            ("splinter", "Kıymık"),
            ("fiber", "Bitki Lifi"),
            ("rope", "İp (Halat)"),
            ("mushroom", "Orman Mantarı"),
            ("yosun", "Yosun"),
            ("cotton", "Pamuk Kozası"),
            ("fabric", "Kumaş"),
            ("coal", "Kömür"),
            ("paper", "Parşömen (Kağıt)"),
            ("tohum", "Tohum"),
            ("bugday", "Buğday Başağı"),
            ("nane", "Nane Yaprağı"),
            ("agac_kabugu", "Ağaç Kabuğu")
        ]
    },
    "kategori_3": {
        "title": "Kategori 3: Biyoloji & Canlılar",
        "items": [
            ("life", "Yaşam Özü"),
            ("bird", "Mavi Kuş"),
            ("animal", "Karasal Hayvan (Geyik)"),
            ("fish", "Balık"),
            ("feather", "Kuş Tüyü"),
            ("leather", "Deri (Ham Post)"),
            ("cooked_meat", "Kavrulmuş Et Butu"),
            ("resin", "Reçine (Kehribar Damlası)"),
            ("kizarmis_kus_eti", "Kızarmış Kuş Eti"),
            ("deri_kiyafet", "Deri Kıyafet"),
            ("kaya", "Kaya / Fosilli Taş"),
            ("egg_wild", "Kuş Yumurtası (Büyük)"),
            ("inek", "İnek"),
            ("sut", "Süt Çömleği"),
            ("yumurta", "Yumurta"),
            ("mercan", "Mercan Dalı")
        ]
    },
    "kategori_4": {
        "title": "Kategori 4: Zanaat, İlkel Aletler & Teçhizat",
        "items": [
            ("pottery", "Çömlek"),
            ("water_jug", "Su Çömleği"),
            ("bottle", "Cam Şişe"),
            ("flint", "Çakmaktaşı"),
            ("primitive_knife", "İlkel Bıçak"),
            ("bow", "Yay"),
            ("arrow", "Ok"),
            ("torch", "Meşale"),
            ("raw_metal", "Ham Metal Cevheri"),
            ("iron_ingot", "Demir Külçe"),
            ("metal_knife", "Metal Çakı / Bıçak"),
            ("pickaxe", "Kazma"),
            ("sword", "Kılıç"),
            ("wooden_shield", "Ahşap Kalkan"),
            ("iron_shield", "Demir Kalkan"),
            ("leather_armor", "Deri Zırh Yeleği"),
            ("iron_armor", "Demir Göğüs Zırhı"),
            ("bed", "Ahşap Yatak"),
            ("olta", "Olta"),
            ("yelken", "Yelken Bezi"),
            ("sal", "Ahşap Sal"),
            ("obsidyen_bicak", "Obsidyen Bıçak")
        ]
    },
    "kategori_5": {
        "title": "Kategori 5: Kimya, Simya & Büyü",
        "items": [
            ("zehirli_sivi", "Zehirli Sıvı"),
            ("zehir_sisesi", "Zehir Şişesi"),
            ("zehirli_kilic", "Zehirli Kılıç"),
            ("sifa_iksiri", "Şifa İksiri (Kırmızı)"),
            ("mana_iksiri", "Mana İksiri (Mavi)"),
            ("barut", "Barut Kesesi"),
            ("bomba", "Bomba"),
            ("buyu_parsomeni", "Büyü Parşömeni"),
            ("yildirim_parsomeni", "Yıldırım Parşömeni"),
            ("ates_topu_kitabi", "Ateş Topu Büyü Kitabı"),
            ("peynir", "Peynir Dilimi"),
            ("un", "Un Kasesi"),
            ("hamur", "Hamur Bezesi"),
            ("ekmek", "Somun Ekmek")
        ]
    },
    "kategori_6": {
        "title": "Kategori 6: Mekanik & Medeniyet",
        "items": [
            ("buhar_motoru", "Buhar Motoru"),
            ("tekerlek", "Ahşap Tekerlek"),
            ("el_arabasi", "El Arabası"),
            ("lokomotif", "Buharlı Lokomotif"),
            ("ampul", "Akkor Ampul"),
            ("fener", "Demir Madenci Feneri"),
            ("pusula", "Pusula"),
            ("miknatis", "At Nalı Mıknatıs"),
            ("elektrik_motoru", "Elektrik Motoru"),
            ("disli_cark", "Dişli Çark"),
            ("degirmen", "Yel Değirmeni"),
            ("ayna", "El Aynası"),
            ("saat", "Mekanik Cep Saati")
        ]
    },
    "kategori_7": {
        "title": "Kategori 7: Ağır Sanayi, Metalurji ve İleri İnşaat",
        "items": [
            ("celik_kulce", "Çelik Külçe"),
            ("ors", "Demirci Örsü"),
            ("civi", "Demir Çiviler"),
            ("tugla", "Pişmiş Tuğla"),
            ("harc", "Harç Kovası"),
            ("tugla_duvar", "Tuğla Duvar Bloğu"),
            ("saglam_sandik", "Sağlam Sandık"),
            ("kristal", "Kristal Parçası"),
            ("teleskop", "Teleskop"),
            ("vinc", "Vinç Mekanizması"),
            ("demir_parmaklik", "Demir Parmaklık"),
            ("savas_baltasi", "Çift Başlı Savaş Baltası"),
            ("gozetleme_kulesi", "Taş Gözetleme Kulesi"),
            ("kale_kapisi", "Ağır Kale Kapısı")
        ]
    },
    "kategori_8": {
        "title": "Kategori 8: Kadim Kozmoloji, Boyutlar & Esrarengiz Güçler",
        "items": [
            ("yildiz_tozu", "Yıldız Tozu"),
            ("prizma_tasi", "Prizma Taşı"),
            ("kahin_kuresi", "Kahin Küresi"),
            ("portal_runu", "Portal Rünü Tableti"),
            ("bosluk_sisesi", "Boşluk Şişesi"),
            ("boyut_kapisi", "Boyut Kapısı"),
            ("anka_kulu", "Anka Külü"),
            ("runik_zirh", "Rünik Zırh"),
            ("firtina_kilici", "Fırtına Kılıcı"),
            ("yildiz_gecidi_cekirdegi", "Yıldız Geçidi Çekirdeği"),
            ("buz_runu", "Buz Rünü Tableti"),
            ("cehennem_tasi", "Cehennem Taşı"),
            ("zaman_kum_saati", "Zaman Kum Saati"),
            ("illuzyon_aynasi", "İllüzyon Aynası")
        ]
    }
}

def main():
    print("=== BİRLEŞTİRME OYUNU ITEM ÜRETİMİ BAŞLADI ===\n")
    
    # 1. Karma sayfalarını dilimle
    print("1/10 Karma sayfaları dilimleniyor...")
    karma1_items = slice_sheet("karma.jfif", merge_dist=20)
    print(f"  karma.jfif: {len(karma1_items)} eşya çıkarıldı.")

    # karma2'de tohumları birleştirmek için merge_dist=45 kullanıyoruz
    karma2_items = slice_sheet("karma2.jfif", merge_dist=50, max_part_size=1800)
    print(f"  karma2.jfif: {len(karma2_items)} eşya çıkarıldı.")

    # Karma 1 eşleşmeleri (16 adet)
    # Sıra: Peynir, Un, Hamur, Ekmek | Dişli, Değirmen, Ayna, Saat | Parmaklık, Balta, Kule, Kapı | Buz Rünü, Cehennem Taşı, Kum Saati, İllüzyon
    karma1_map = {
        "peynir": karma1_items[0],
        "un": karma1_items[1],
        "hamur": karma1_items[2],
        "ekmek": karma1_items[3],
        "disli_cark": karma1_items[4],
        "degirmen": karma1_items[5],
        "ayna": karma1_items[6],
        "saat": karma1_items[7],
        "demir_parmaklik": karma1_items[8],
        "savas_baltasi": karma1_items[9],
        "gozetleme_kulesi": karma1_items[10],
        "kale_kapisi": karma1_items[11],
        "buz_runu": karma1_items[12],
        "cehennem_tasi": karma1_items[13],
        "zaman_kum_saati": karma1_items[14],
        "illuzyon_aynasi": karma1_items[15]
    }

    # Karma 2 eşleşmeleri (16 adet)
    # Sıra: Kar, Buz, Obsidyen, Çöl | Tohum (küme), Buğday, Nane, Ağaç Kabuğu | İnek, Süt, Yumurta, Mercan | Olta, Yelken, Sal, Obsidyen Bıçak
    karma2_map = {
        "kar": karma2_items[0],
        "buz": karma2_items[1],
        "obsidian": karma2_items[2],
        "col": karma2_items[3],
        "tohum": karma2_items[4],
        "bugday": karma2_items[5],
        "nane": karma2_items[6],
        "agac_kabugu": karma2_items[7],
        "inek": karma2_items[8],
        "sut": karma2_items[9],
        "yumurta": karma2_items[10],
        "mercan": karma2_items[11],
        "olta": karma2_items[12],
        "yelken": karma2_items[13],
        "sal": karma2_items[14],
        "obsidyen_bicak": karma2_items[15]
    }

    # 2. Ana Kategori sayfalarını dilimle ve birleştir
    category_sources = {
        "kategori_1": ("kategori 1.jfif", 55, 2500), # Ateş ve yağmur damlalarını birleştirmek için yüksek tolerans
        "kategori_2": ("kategori2.jfif", 20, 1500),
        "kategori_3": ("kategori3.jfif", 20, 1500),
        "kategori_4": ("kategori4.jfif", 20, 1500),
        "kategori_5": ("kategori5.jfif", 20, 1500),
        "kategori_6": ("kategori6.jfif", 20, 1500),
        "kategori_7": ("kategori7.jfif", 60, 3000), # Çivileri birleştirmek için yüksek tolerans
        "kategori_8": ("kategori 8.jfif", 20, 1500)
    }

    saved_total = 0

    for cat_key, cat_data in ALL_CATEGORIES.items():
        sheet_file, m_dist, m_size = category_sources[cat_key]
        print(f"\n--- {cat_data['title']} İşleniyor ({sheet_file}) ---")
        base_items = slice_sheet(sheet_file, merge_dist=m_dist, max_part_size=m_size)
        print(f"  Ana sayfadan çıkarılan: {len(base_items)} eşya")

        cat_folder = PREVIEW_DIR / cat_key
        cat_folder.mkdir(parents=True, exist_ok=True)

        cat_montage_items = []

        base_idx = 0
        for item_id, item_name in cat_data["items"]:
            item_im = None
            source_info = ""

            if item_id in karma1_map:
                item_im = karma1_map[item_id]
                source_info = "karma.jfif"
            elif item_id in karma2_map:
                item_im = karma2_map[item_id]
                source_info = "karma2.jfif"
            else:
                if base_idx < len(base_items):
                    item_im = base_items[base_idx]
                    source_info = f"{sheet_file} (no: {base_idx+1})"
                    base_idx += 1
                else:
                    print(f"  UYARI: {item_id} ({item_name}) için görsel bulunamadı!")
                    continue

            # 1. Ana Proje dizinine kaydet (public/textures/items/<id>.png)
            final_path = OUTPUT_DIR / f"{item_id}.png"
            item_im.save(final_path, format="PNG")

            # 2. Önizleme klasörüne kaydet
            preview_path = cat_folder / f"{len(cat_montage_items)+1:02d}_{item_id}.png"
            item_im.save(preview_path, format="PNG")

            cat_montage_items.append((item_im, item_id, item_name))
            saved_total += 1
            print(f"  [{len(cat_montage_items):02d}] {item_id}.png <- {item_name} (Kaynak: {source_info})")

        # Kategori montajı oluştur
        thumb_size = 140
        cols = min(6, len(cat_montage_items))
        rows = (len(cat_montage_items) + cols - 1) // cols
        montage = Image.new("RGBA", (thumb_size * cols, thumb_size * rows), (230, 230, 230, 255))

        for idx, (im, iid, iname) in enumerate(cat_montage_items):
            t = im.copy()
            t.thumbnail((thumb_size - 16, thumb_size - 16))
            x = (idx % cols) * thumb_size + (thumb_size - t.width) // 2
            y = (idx // cols) * thumb_size + (thumb_size - t.height) // 2
            montage.paste(t, (x, y), t)

        montage.save(PREVIEW_DIR / f"{cat_key}_final_montage.png")
        print(f"  ✓ {cat_key} montajı kaydedildi: {PREVIEW_DIR / f'{cat_key}_final_montage.png'}")

    print(f"\n=======================================================")
    print(f"TEBRİKLER! Toplam {saved_total} eşya kusursuz şekilde ayıklandı ve kaydedildi.")
    print(f"1. Oyun Dizinine: {OUTPUT_DIR}")
    print(f"2. Denetim & Önizleme Dizinine: {PREVIEW_DIR}")
    print("=======================================================\n")

if __name__ == "__main__":
    main()
