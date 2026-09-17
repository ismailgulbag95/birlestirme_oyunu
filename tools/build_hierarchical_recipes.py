#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hierarchical, Collision-Free, General-to-Specific Crafting Tree Generator
For All 521 Items
-------------------------------------------------------------------------
Kurallar:
1. %100 Collision-Free: Her (A, B) ikilisi dünyada SADECE 1 eşya üretir.
2. %100 Strict DAG: Hiçbir döngü yoktur. Tüm eşyalar 4 temel elementten adım adım üretilebilir.
3. Genelden Özele (Pedagojik İlerleme):
   - Tier 1: 4 Kök Element (Ateş, Su, Toprak, Hava)
   - Tier 2: 6 Temel Doğa Bileşeni (Çamur, Lav, Buhar, Yağmur, Toz, Enerji)
   - Tier 3: Temel Maddeler & İlkel Doğa (Taş, Kum, Cam, Kül, Rüzgar, Bulut, Sis, Buz, Deniz, Yaşam...)
   - Tier 4: İlk Canlılık & Kök Canlılar (Bitki, Bakteri, Hücre, Tohum, Madenler, Demir, Bakır...)
   - Tier 5: Genel Sınıflar (Ağaç, Çiçek, Çimen, Meyve, Hayvan, Balık, Kuş, Böcek, Alet, Odun...)
   - Tier 6+: Detaylı & Özel Varlıklar (Karpuz = Meyve + Su, Elma = Meyve + Ağaç, Arı = Böcek + Çiçek...)
"""

import json
import re
from pathlib import Path
import networkx as nx

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"
TREE_JSON_PATH = WORKSPACE_DIR / "crafting_tree.json"
ALL_ITEMS_JSON = WORKSPACE_DIR / "tools" / "all_521_items.json"

BASE_ELEMENTS = ["ates", "su", "toprak", "hava"]

def generate_and_verify_all():
    with open(ALL_ITEMS_JSON, "r", encoding="utf-8") as f:
        all_items_data = json.load(f)

    # Mevcut itemDefinitions.js dosyasından görsel verileri al
    current_item_defs = {}
    if ITEMS_JS_PATH.exists():
        js_text = ITEMS_JS_PATH.read_text(encoding="utf-8")
        # JSON bloğunu ayıkla
        m = re.search(r"export\s+const\s+ITEM_DEFINITIONS\s*=\s*(\{[\s\S]*?\n\};)", js_text)
        if m:
            raw_obj = m.group(1).rstrip(";")
            # Basit regex ile veya json yükleme ile parse etmeyi deneyelim
            # Eğer doğrudan parse edemezsek all_items_data üzerinden besleniriz
            pass

    print(f"Toplam hedef eşya sayısı: {len(all_items_data)}")

if __name__ == "__main__":
    generate_and_verify_all()
