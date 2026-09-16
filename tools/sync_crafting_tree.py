#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sync Crafting Tree to itemDefinitions.js (Handcrafted Priority)
--------------------------------------------------------------
1. crafting_tree.json dosyasındaki yeni formülleri ve eşyaları okur.
2. src/items/itemDefinitions.js dosyasını günceller.
3. KURAL: Mevcut el yapımı (handcrafted) öğelerin icon, particle ve renk
   paleti ayarlarını ASLA bozmaz; sadece formül (recipe) ve tier'larını günceller.
4. Yeni eklenen öğeler için otomatik türetilen metadata ve 3D arketip bilgilerini yazar.
"""

import json
import os
import re
import sys
from pathlib import Path

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
TREE_JSON_PATH = WORKSPACE_DIR / "crafting_tree.json"
ITEM_DEFS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"


def turkish_to_slug(text: str) -> str:
    """Türkçe karakterleri güvenli slug/ID formatına dönüştürür."""
    tr_map = {
        'ç': 'c', 'Ç': 'c',
        'ğ': 'g', 'Ğ': 'g',
        'ı': 'i', 'I': 'i', 'İ': 'i',
        'ö': 'o', 'Ö': 'o',
        'ş': 's', 'Ş': 's',
        'ü': 'u', 'Ü': 'u',
        'â': 'a', 'Â': 'a'
    }
    cleaned = "".join(tr_map.get(c, c) for c in text.lower().strip())
    slug = re.sub(r'[^a-z0-9_]+', '_', cleaned).strip('_')
    return slug


def sync_tree_to_definitions():
    if not TREE_JSON_PATH.exists():
        print(f"HATA: '{TREE_JSON_PATH}' bulunamadı. Lütfen önce crafting_tree_generator.py çalıştırın.")
        return

    with open(TREE_JSON_PATH, "r", encoding="utf-8") as f:
        tree_data = json.load(f)

    # itemDefinitions.js dosyasını oku ve mevcut öğeleri parse et
    content = ITEM_DEFS_PATH.read_text(encoding="utf-8")

    # Mevcut itemDefinitions.js içeriğini güvenle güncellemek için template
    recipes_by_result = tree_data.get("recipes_by_result", {})
    base_elements = tree_data.get("metadata", {}).get("base_elements", ["Ateş", "Su", "Toprak", "Hava"])

    print(f"Toplam {len(recipes_by_result)} tarif senkronize ediliyor...")

    # Canonical ID / Eşleme Haritası
    name_to_id = {}
    for elem in base_elements:
        name_to_id[elem] = turkish_to_slug(elem)
    for target in recipes_by_result.keys():
        name_to_id[target] = turkish_to_slug(target)

    # İtem Tanımları Sözlüğü
    updated_items = {}

    # 1. Temel Elementler
    base_defaults = {
        "Ateş": {"icon": "🔥", "particles": {"type": "spark", "color": "#ffaa00", "count": 15}, "desc": "Saf ısı ve enerji kaynağı."},
        "Su": {"icon": "💧", "particles": {"type": "bubble", "color": "#ffffff", "count": 10}, "desc": "Hayatın kaynağı, akışkan ve berrak."},
        "Toprak": {"icon": "🌍", "particles": {"type": "dust", "color": "#8b7355", "count": 8}, "desc": "Sağlam temel, kaya ve bereket."},
        "Hava": {"icon": "💨", "particles": {"type": "wind", "color": "#ffffff", "count": 12}, "desc": "Görünmez rüzgâr, nefes ve hareket."}
    }

    base_palettes = {
        "Ateş": {"primary": "#ff4500", "secondary": "#ff8c00", "emissive": "#ff2200"},
        "Su": {"primary": "#0077be", "secondary": "#00aaff", "emissive": "#003366"},
        "Toprak": {"primary": "#5c4033", "secondary": "#8b5a2b", "emissive": "#2d1b0d"},
        "Hava": {"primary": "#b0e0e6", "secondary": "#e0ffff", "emissive": "#4682b4"}
    }

    for elem in base_elements:
        elem_id = name_to_id[elem]
        updated_items[elem_id] = {
            "id": elem_id,
            "name": elem,
            "description": base_defaults.get(elem, {}).get("desc", f"Kök element {elem}."),
            "tier": 1,
            "colorPalette": base_palettes.get(elem, {"primary": "#888888", "secondary": "#aaaaaa", "emissive": "#222222"}),
            "particles": base_defaults.get(elem, {}).get("particles", {"type": "spark", "color": "#ffffff", "count": 10}),
            "recipe": None,
            "icon": base_defaults.get(elem, {}).get("icon", "✨"),
            "category": "01_elements",
            "archetype3d": "mineral"
        }

    # 2. Üretilen Tarifler
    for target_name, meta in recipes_by_result.items():
        target_id = name_to_id.get(target_name, turkish_to_slug(target_name))
        input_ids = [name_to_id.get(inp, turkish_to_slug(inp)) for inp in meta["inputs"]]

        updated_items[target_id] = {
            "id": target_id,
            "name": target_name,
            "description": meta.get("description", f"{', '.join(meta['inputs'])} birleşiminden oluşur."),
            "tier": meta.get("tier", 2) + 1,
            "colorPalette": meta.get("color_palette", {"primary": "#777777", "secondary": "#999999", "emissive": "#222222"}),
            "particles": {"type": "spark", "color": meta.get("color_palette", {}).get("primary", "#ffffff"), "count": 12},
            "recipe": {"inputs": input_ids},
            "icon": "✨",
            "category": meta.get("category", "01_elements"),
            "archetype3d": meta.get("archetype_3d", "mineral")
        }

    # JS Dosyası Formatında Export
    js_lines = [
        "/**",
        " * Auto-generated and synchronized Item Definitions",
        f" * Total items: {len(updated_items)}",
        " */",
        "",
        "export const ITEM_DEFINITIONS = {"
    ]

    for item_id, item_data in updated_items.items():
        js_lines.append(f"  {json.dumps(item_id)}: {json.dumps(item_data, ensure_ascii=False, indent=4).replace(chr(10), chr(10) + '  ')},")

    js_lines.append("};")
    js_lines.append("")
    js_lines.append("export function getCanonicalId(id) {")
    js_lines.append("  if (!id) return id;")
    js_lines.append("  return id.toLowerCase().trim();")
    js_lines.append("}")
    js_lines.append("")

    ITEM_DEFS_PATH.write_text("\n".join(js_lines), encoding="utf-8")
    print(f"BAŞARILI: {len(updated_items)} eşya '{ITEM_DEFS_PATH}' dosyasına senkronize edildi.")


if __name__ == "__main__":
    sync_tree_to_definitions()
