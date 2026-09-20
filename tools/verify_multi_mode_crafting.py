#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re, sys
sys.stdout.reconfigure(encoding='utf-8')
from pathlib import Path
import networkx as nx

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"

BASE_ELEMENTS = ["ates", "su", "toprak", "hava"]

def verify_mode_graph(mode_name, items):
    print(f"\n--- {mode_name.upper()} DOĞRULANIYOR ---")
    G = nx.DiGraph()
    for item_id in items.keys():
        G.add_node(item_id)
        if items[item_id].get("recipe") and items[item_id]["recipe"].get("inputs"):
            for inp in items[item_id]["recipe"]["inputs"]:
                G.add_edge(inp.lower().strip(), item_id)

    assert nx.is_directed_acyclic_graph(G), f"{mode_name} grafı döngü içeriyor!"
    reachable = set(BASE_ELEMENTS)
    for b in BASE_ELEMENTS:
        reachable.update(nx.descendants(G, b))
    unreachable = set(items.keys()) - reachable
    assert len(unreachable) == 0, f"{mode_name} modunda ulaşılamayan eşyalar var: {unreachable}"

    recipes = {}
    collisions = []
    for item_id, def_item in items.items():
        if def_item.get("recipe") and def_item["recipe"].get("inputs"):
            key = tuple(sorted([x.lower().strip() for x in def_item["recipe"]["inputs"]]))
            if key in recipes:
                collisions.append((key, recipes[key], item_id))
            else:
                recipes[key] = item_id

    assert len(collisions) == 0, f"{mode_name} modunda çakışan tarifler var: {collisions}"

    trio_count = sum(1 for d in items.values() if d.get("recipe") and len(d["recipe"]["inputs"]) == 3)
    duo_count = sum(1 for d in items.values() if d.get("recipe") and len(d["recipe"]["inputs"]) == 2)

    print(f"✓ {mode_name} BAŞARILI: %100 Ulaşılabilir, 0 Çakışma, 0 Döngü.")
    print(f"  Toplam Eşya: {len(items)} | 2'li Tarif: {duo_count} | 3'lü Tarif: {trio_count}")

def main():
    with open(ITEMS_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract CLASSIC_ITEM_DEFINITIONS and GRANDMASTER_ITEM_DEFINITIONS
    classic_match = re.search(r'export const CLASSIC_ITEM_DEFINITIONS\s*=\s*(\{.*?\});\s*\n\s*export const GRANDMASTER', content, re.DOTALL)
    gm_match = re.search(r'export const GRANDMASTER_ITEM_DEFINITIONS\s*=\s*(\{.*?\});\s*\n\s*export const ITEM_DEFINITIONS', content, re.DOTALL)

    if not classic_match or not gm_match:
        raise ValueError("itemDefinitions.js içinden mod tanımları regex ile okunamadı!")

    classic_items = json.loads(classic_match.group(1))
    gm_items = json.loads(gm_match.group(1))

    verify_mode_graph("Klasik Mod (Mod 1)", classic_items)
    verify_mode_graph("Grandmaster / Simyacı Kazanı (Mod 2)", gm_items)

if __name__ == "__main__":
    main()
