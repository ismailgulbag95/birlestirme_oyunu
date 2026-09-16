#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 2D Sheet Prompts (15-Item Batches for Missing Items)
------------------------------------------------------------
1. public/textures/items/ klasörünü tarar ve mevcut .png dosyalarını bulur.
2. crafting_tree.json içindeki eşyaları kontrol eder.
3. Görseli olanları eler, SADECE EKSİK olanları listeler.
4. Eksik eşyaları kategori bazında 15'erli 3x5 ızgara paketlerine böler.
5. Midjourney / FLUX / DALL-E için kopyala-yapıştır hazır prompt dosyaları üretir.
6. slice_item_sheets.py için otomatik konfigürasyon hazırlar.
"""

import json
import os
import re
import sys
from pathlib import Path

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
TEXTURES_DIR = WORKSPACE_DIR / "public" / "textures" / "items"
TREE_JSON_PATH = WORKSPACE_DIR / "crafting_tree.json"
PROMPTS_OUTPUT_DIR = WORKSPACE_DIR / "assets" / "sheet_prompts"


def turkish_to_slug(text: str) -> str:
    tr_map = {
        'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g',
        'ı': 'i', 'I': 'i', 'İ': 'i', 'ö': 'o',
        'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u',
        'Ü': 'u', 'â': 'a', 'Â': 'a'
    }
    cleaned = "".join(tr_map.get(c, c) for c in text.lower().strip())
    slug = re.sub(r'[^a-z0-9_]+', '_', cleaned).strip('_')
    return slug


def generate_missing_sheet_prompts():
    if not TREE_JSON_PATH.exists():
        print(f"HATA: '{TREE_JSON_PATH}' bulunamadı. Lütfen önce crafting_tree_generator.py çalıştırın.")
        return

    PROMPTS_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with open(TREE_JSON_PATH, "r", encoding="utf-8") as f:
        tree_data = json.load(f)

    # 1. Mevcut PNG dosyalarını tespit et
    existing_slugs = set()
    if TEXTURES_DIR.exists():
        for file in TEXTURES_DIR.glob("*.png"):
            existing_slugs.add(file.stem.lower())

    print(f"Mevcut bulunan 2D PNG görsel sayısı: {len(existing_slugs)}")

    # 2. Tüm eşyaları topla
    all_items = []
    base_elements = tree_data.get("metadata", {}).get("base_elements", [])
    for elem in base_elements:
        all_items.append({
            "name": elem,
            "slug": turkish_to_slug(elem),
            "category": "01_elements"
        })

    for target_name, meta in tree_data.get("recipes_by_result", {}).items():
        all_items.append({
            "name": target_name,
            "slug": turkish_to_slug(target_name),
            "category": meta.get("category", "01_elements")
        })

    # 3. Sadece eksikleri filtrele
    missing_items = [it for it in all_items if it["slug"] not in existing_slugs]
    print(f"Görseli EKSİK olan eşya sayısı: {len(missing_items)} / {len(all_items)}")

    if not missing_items:
        print("[MÜKEMMEL] Tüm eşyaların 2D görseli mevcut! Yeni prompt üretilmesine gerek yok.")
        return

    # 4. Kategorilere göre grupla
    by_category = {}
    for it in missing_items:
        cat = it["category"]
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(it)

    # 5. 15'erli paketlere böl ve Prompt üret
    prompt_summary = []
    batch_counter = 1

    for cat_name, items in by_category.items():
        # 15'li dilimler
        for i in range(0, len(items), 15):
            batch = items[i:i+15]
            batch_slug = f"sheet_{batch_counter:02d}_{cat_name}"
            item_names_str = ", ".join([it["name"] for it in batch])
            item_slugs_list = [(it["slug"], it["name"]) for it in batch]

            # AI Prompt Şablonu (15'li 3x5 ızgara, beyaz arka plan, izometrik stilize oyun ikonu)
            prompt_text = (
                f"15 isolated stylized isometric game icons, perfectly arranged in a 3x5 grid on a pure solid white background, "
                f"mobile casual merge game style, colorful, crisp edges, subtle ambient occlusion, no outer shadows, "
                f"icons included: {item_names_str}. 3D render style, clean vector look, high resolution asset sheet --ar 3:2 --v 6.0"
            )

            prompt_file = PROMPTS_OUTPUT_DIR / f"{batch_slug}.txt"
            prompt_file.write_text(prompt_text, encoding="utf-8")

            # Slice konfigürasyon formatı
            config_snippet = {
                "sheet_name": f"{batch_slug}.png",
                "category": cat_name,
                "count": len(batch),
                "items": item_slugs_list
            }

            config_file = PROMPTS_OUTPUT_DIR / f"{batch_slug}_config.json"
            config_file.write_text(json.dumps(config_snippet, ensure_ascii=False, indent=2), encoding="utf-8")

            prompt_summary.append({
                "sheet": batch_slug,
                "category": cat_name,
                "item_count": len(batch),
                "items": [it["name"] for it in batch]
            })

            print(f"[{batch_slug}] -> {len(batch)} eksik eşya için prompt oluşturuldu ({prompt_file.name})")
            batch_counter += 1

    summary_file = PROMPTS_OUTPUT_DIR / "prompts_summary.json"
    summary_file.write_text(json.dumps(prompt_summary, ensure_ascii=False, indent=2), encoding="utf-8")

    print("\n" + "=" * 60)
    print(f"BAŞARILI: Toplam {len(prompt_summary)} adet 15'li görsel sayfası promptu hazırlandı.")
    print(f"Prompt klasörü: {PROMPTS_OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    generate_missing_sheet_prompts()
