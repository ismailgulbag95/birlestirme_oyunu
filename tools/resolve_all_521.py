#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Resolve and Build 100% Collision-Free Hierarchical Recipes for All 521 Items
"""

import json
import re
import sys
from pathlib import Path
import networkx as nx

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"
TREE_JSON_PATH = WORKSPACE_DIR / "crafting_tree.json"
ALL_ITEMS_JSON = WORKSPACE_DIR / "tools" / "all_521_items.json"

BASE_ELEMENTS = ["ates", "su", "toprak", "hava"]

def build_tree():
    with open(ALL_ITEMS_JSON, "r", encoding="utf-8") as f:
        all_items_data = json.load(f)

    all_keys = set(all_items_data.keys())
    print(f"Toplam 521 Eşya Yüklendi. Kök Elementler: {len(BASE_ELEMENTS)}")

    used_pairs = {}
    used_trios = {}
    recipes = {}
    reachable = set(BASE_ELEMENTS)
    tiers = {elem: 1 for elem in BASE_ELEMENTS}

    def pair_key(a, b):
        return tuple(sorted([a.strip().lower(), b.strip().lower()]))

    def trio_key(a, b, c):
        return tuple(sorted([a.strip().lower(), b.strip().lower(), c.strip().lower()]))

    def add(item_id, inputs, trio_inputs=None, desc=""):
        item_id = item_id.strip().lower()
        if item_id not in all_keys and item_id not in BASE_ELEMENTS:
            raise ValueError(f"HATA: '{item_id}' 521 eşya listesinde bulunamadı!")

        if item_id in recipes:
            raise ValueError(f"HATA: '{item_id}' zaten tanımlandı!")

        a, b = inputs[0].strip().lower(), inputs[1].strip().lower()

        if a not in reachable:
            raise ValueError(f"DAG HATASI: '{item_id}' için girdi '{a}' henüz üretilemedi! (Mevcut reachable: {len(reachable)})")
        if b not in reachable:
            raise ValueError(f"DAG HATASI: '{item_id}' için girdi '{b}' henüz üretilemedi! (Mevcut reachable: {len(reachable)})")

        key = pair_key(a, b)
        if key in used_pairs:
            existing = used_pairs[key]
            raise ValueError(f"ÇAKIŞMA HATASI: {key} ikilisi zaten '{existing}' için kullanıldı! '{item_id}' eklenemez!")

        used_pairs[key] = item_id

        trios = []
        if trio_inputs:
            for trio in trio_inputs:
                if len(trio) == 3:
                    ta, tb, tc = trio[0].strip().lower(), trio[1].strip().lower(), trio[2].strip().lower()
                    if ta in reachable and tb in reachable and tc in reachable:
                        tkey = trio_key(ta, tb, tc)
                        if tkey not in used_trios:
                            used_trios[tkey] = item_id
                            trios.append([ta, tb, tc])

        tier = max(tiers[a], tiers[b]) + 1
        tiers[item_id] = tier
        reachable.add(item_id)
        recipes[item_id] = {
            "inputs": [a, b],
            "trioRecipes": trios,
            "tier": tier,
            "desc": desc or all_items_data.get(item_id, {}).get("description", "")
        }

    return add, reachable, recipes, used_pairs, used_trios, all_items_data, all_keys

if __name__ == "__main__":
    add, reachable, recipes, used_pairs, used_trios, all_items_data, all_keys = build_tree()
    print("Modül hazır.")
