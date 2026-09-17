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

    # 1. Test Classic Mode
    G_classic = nx.DiGraph()
    for item_id in items.keys():
        G_classic.add_node(item_id)
        if items[item_id].get("recipe") and items[item_id]["recipe"].get("inputs"):
            for inp in items[item_id]["recipe"]["inputs"]:
                G_classic.add_edge(inp.lower().strip(), item_id)

    assert nx.is_directed_acyclic_graph(G_classic), "Klasik graf döngü içeriyor!"
    reachable_classic = set(BASE_ELEMENTS)
    for b in BASE_ELEMENTS:
        reachable_classic.update(nx.descendants(G_classic, b))
    unreachable_classic = set(items.keys()) - reachable_classic
    assert len(unreachable_classic) == 0, f"Klasik modda ulaşılamayan: {unreachable_classic}"

    # 2. Test Grandmaster Mode
    G_grand = nx.DiGraph()
    for item_id in items.keys():
        G_grand.add_node(item_id)
        if items[item_id].get("recipe") and items[item_id]["recipe"].get("inputs"):
            for inp in items[item_id]["recipe"]["inputs"]:
                G_grand.add_edge(inp.lower().strip(), item_id)
        if items[item_id].get("trioRecipes"):
            for trio in items[item_id]["trioRecipes"]:
                for inp in trio:
                    G_grand.add_edge(inp.lower().strip(), item_id)

    assert nx.is_directed_acyclic_graph(G_grand), "Grandmaster graf döngü içeriyor!"
    reachable_grand = set(BASE_ELEMENTS)
    for b in BASE_ELEMENTS:
        reachable_grand.update(nx.descendants(G_grand, b))
    unreachable_grand = set(items.keys()) - reachable_grand
    assert len(unreachable_grand) == 0, f"Grandmaster modunda ulaşılamayan: {unreachable_grand}"

    print(f"BAŞARILI: Her iki mod da %100 ulaşıla-bilir ve sıfır döngülü!")
    print(f"Toplam Eşya: {len(items)}")
    print(f"Klasik 2'li Tarifler: {len(G_classic.edges()) // 2}")
    trio_count = sum(len(items[i].get("trioRecipes", [])) for i in items)
    print(f"Grandmaster 3'lü Tarifler: {trio_count}")

if __name__ == "__main__":
    main()
