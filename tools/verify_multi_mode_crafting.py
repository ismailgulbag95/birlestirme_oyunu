#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
from pathlib import Path
import networkx as nx

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"

BASE_ELEMENTS = ["ates", "su", "toprak", "hava"]

def main():
    with open(ITEMS_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    start_marker = "export const ITEM_DEFINITIONS = "
    end_marker = ";\n\nexport function getCanonicalId"
    start_idx = content.find(start_marker)
    json_str = content[start_idx + len(start_marker):]
    end_idx = json_str.rfind(end_marker)
    if end_idx != -1:
        json_str = json_str[:end_idx].strip()
    else:
        json_str = json_str.rstrip("; \n")

    items = json.loads(json_str)

    G = nx.DiGraph()
    for item_id in items.keys():
        G.add_node(item_id)
        if items[item_id].get("recipe") and items[item_id]["recipe"].get("inputs"):
            for inp in items[item_id]["recipe"]["inputs"]:
                G.add_edge(inp.lower().strip(), item_id)

    assert nx.is_directed_acyclic_graph(G), "Graf döngü içeriyor!"
    reachable = set(BASE_ELEMENTS)
    for b in BASE_ELEMENTS:
        reachable.update(nx.descendants(G, b))
    unreachable = set(items.keys()) - reachable
    assert len(unreachable) == 0, f"Ulaşılamayan eşyalar: {unreachable}"

    # Çakışma kontrolü
    recipes = {}
    collisions = []
    for item_id, def_item in items.items():
        if def_item.get("recipe") and def_item["recipe"].get("inputs"):
            key = tuple(sorted([x.lower().strip() for x in def_item["recipe"]["inputs"]]))
            if key in recipes:
                collisions.append((key, recipes[key], item_id))
            else:
                recipes[key] = item_id

    assert len(collisions) == 0, f"Çakışan tarifler var: {collisions}"

    print(f"BAŞARILI: %100 ulaşıla-bilir, sıfır çakışma ve sıfır döngülü!")
    print(f"Toplam Eşya: {len(items)}")
    print(f"Toplam 2'li Tarif: {len(G.edges()) // 2}")

if __name__ == "__main__":
    main()
