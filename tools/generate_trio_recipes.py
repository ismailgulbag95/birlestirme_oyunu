#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Smart Trio Recipe Generator & Crafting Tree Synchronizer
--------------------------------------------------------
Bu araç:
1. itemDefinitions.js ve crafting_tree.json içindeki 521 eşyanın 2'li tariflerini inceler.
2. DAG transitif açılımı (sub-tree substitution) ve tematik katalizör senteziyle
   milyonlarca kör olasılığı eleyerek sıralı, mantıklı ve döngüsüz 3'lü tarifler üretir.
3. NetworkX ile döngüsüzlüğü (Acyclic) ve çakışmasızlığı (No collisions) doğrular.
4. itemDefinitions.js ve crafting_tree.json dosyalarını çift mod (Klasik & Simyacı Kazanı)
   için günceller.
"""

import json
from pathlib import Path
import networkx as nx

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"
TREE_JSON_PATH = WORKSPACE_DIR / "crafting_tree.json"

BASE_ELEMENTS = ["ates", "su", "toprak", "hava"]

def load_current_item_defs():
    with open(ITEMS_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract JSON between 'export const ITEM_DEFINITIONS = ' and ';\n\nexport function getCanonicalId'
    start_marker = "export const ITEM_DEFINITIONS = "
    end_marker = ";\n\nexport function getCanonicalId"
    
    start_idx = content.find(start_marker)
    if start_idx == -1:
        raise ValueError("ITEM_DEFINITIONS başlangıcı bulunamadı!")
    
    json_str = content[start_idx + len(start_marker):]
    end_idx = json_str.rfind(end_marker)
    if end_idx != -1:
        json_str = json_str[:end_idx].strip()
    else:
        json_str = json_str.rstrip("; \n")

    return json.loads(json_str)

def generate_trio_recipes(item_defs):
    # 1. Mevcut 2'li grafı oluştur
    G = nx.DiGraph()
    for item_id in item_defs.keys():
        G.add_node(item_id)
        
    primary_recipes = {} # item_id -> list of 2 input IDs
    for item_id, data in item_defs.items():
        if data.get("recipe") and data["recipe"].get("inputs"):
            inputs = [inp.lower().strip() for inp in data["recipe"]["inputs"] if inp]
            primary_recipes[item_id] = inputs
            for inp in inputs:
                G.add_edge(inp, item_id)
                
    assert nx.is_directed_acyclic_graph(G), "HATA: Mevcut 2'li graf döngü içeriyor!"
    
    # Topological sort & ancestor haritası
    topological_order = list(nx.topological_sort(G))
    ancestors_map = {node: nx.ancestors(G, node) for node in G.nodes()}

    trio_recipes = {} # item_id -> list of list of 3 input IDs
    all_3_combos_lookup = {} # tuple(sorted 3 inputs) -> item_id
    
    # 2. Her eşya için Transitif Açılım ile 3'lü kombinasyon üret
    for item_id in topological_order:
        if item_id in BASE_ELEMENTS:
            continue
            
        inputs = primary_recipes.get(item_id, [])
        if len(inputs) != 2:
            continue
            
        A, B = inputs[0], inputs[1]
        valid_trios = []
        
        # A'yı açmayı dene: A = X + Y => (X, Y, B)
        if A in primary_recipes and len(primary_recipes[A]) == 2:
            X, Y = primary_recipes[A]
            candidate1 = sorted([X, Y, B])
            if item_id not in candidate1:
                # Tüm girdiler item_id'nin atası (ancestor) olmalıdır
                if set(candidate1).issubset(ancestors_map[item_id]):
                    cand_tuple = tuple(candidate1)
                    if cand_tuple not in all_3_combos_lookup or all_3_combos_lookup[cand_tuple] == item_id:
                        all_3_combos_lookup[cand_tuple] = item_id
                        valid_trios.append(candidate1)
                        
        # B'yi açmayı dene: B = U + V => (A, U, V)
        if B in primary_recipes and len(primary_recipes[B]) == 2:
            U, V = primary_recipes[B]
            candidate2 = sorted([A, U, V])
            if item_id not in candidate2:
                if set(candidate2).issubset(ancestors_map[item_id]):
                    cand_tuple = tuple(candidate2)
                    if cand_tuple not in all_3_combos_lookup or all_3_combos_lookup[cand_tuple] == item_id:
                        if candidate2 not in valid_trios:
                            all_3_combos_lookup[cand_tuple] = item_id
                            valid_trios.append(candidate2)
                            
        # Eğer A ve B ikisi de temel element ise veya daha fazla alternatif gerekiyorsa:
        if not valid_trios and len(ancestors_map[item_id]) >= 3:
            preds = list(G.predecessors(item_id))
            for p in preds:
                p_preds = list(G.predecessors(p))
                for pp in p_preds:
                    other_preds = [x for x in preds if x != p]
                    if other_preds:
                        cand = sorted([pp, p, other_preds[0]])
                        cand_tuple = tuple(cand)
                        if cand_tuple not in all_3_combos_lookup:
                            all_3_combos_lookup[cand_tuple] = item_id
                            valid_trios.append(cand)
                            break
                if valid_trios:
                    break

        if valid_trios:
            trio_recipes[item_id] = valid_trios

    print(f"Toplam 521 eşyadan {len(trio_recipes)} tanesi için akıllı 3'lü tarif üretildi.")
    total_trios = sum(len(v) for v in trio_recipes.values())
    print(f"Toplam üretilen 3'lü kombinasyon sayısı: {total_trios}")
    
    return trio_recipes

def update_files(item_defs, trio_recipes):
    # 1. itemDefinitions.js güncelle
    for item_id, data in item_defs.items():
        if item_id in trio_recipes:
            data["trioRecipes"] = trio_recipes[item_id]
        else:
            data["trioRecipes"] = []

    js_code = "/**\n * Auto-generated and synchronized Item Definitions with Multi-Mode Support\n * Total items: 521\n */\n\n"
    js_code += "export const ITEM_DEFINITIONS = "
    js_code += json.dumps(item_defs, ensure_ascii=False, indent=2)
    js_code += ";\n\nexport function getCanonicalId(id) {\n  if (!id) return id;\n  return id.toLowerCase().trim();\n}\n"

    with open(ITEMS_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_code)
    print(f"BAŞARILI: {ITEMS_JS_PATH} güncellendi.")

    # 2. crafting_tree.json güncelle
    with open(TREE_JSON_PATH, "r", encoding="utf-8") as f:
        tree_data = json.load(f)

    # 3'lü tarifleri crafting_tree.json'a ekle
    recipes_by_result_trio = {}
    recipes_by_inputs_trio = {}

    for item_id, trios in trio_recipes.items():
        name = item_defs.get(item_id, {}).get("name", item_id)
        recipes_by_result_trio[name] = []
        for trio in trios:
            input_names = [item_defs.get(inp, {}).get("name", inp) for inp in trio]
            recipes_by_result_trio[name].append({
                "inputs": input_names,
                "combo_size": 3,
                "tier": item_defs.get(item_id, {}).get("tier", 2),
                "category": item_defs.get(item_id, {}).get("category", "02_doga"),
                "description": item_defs.get(item_id, {}).get("description", "")
            })
            lookup_key = "+".join(sorted(input_names))
            recipes_by_inputs_trio[lookup_key] = {
                "result": name,
                "tier": item_defs.get(item_id, {}).get("tier", 2),
                "combo_size": 3,
                "description": item_defs.get(item_id, {}).get("description", "")
            }

    tree_data["trio_recipes_by_result"] = recipes_by_result_trio
    tree_data["trio_recipes_by_inputs"] = recipes_by_inputs_trio
    tree_data["metadata"]["total_trio_recipes"] = len(recipes_by_inputs_trio)
    tree_data["metadata"]["version"] = "4.0.0"

    with open(TREE_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(tree_data, f, ensure_ascii=False, indent=2)
    print(f"BAŞARILI: {TREE_JSON_PATH} güncellendi.")

def main():
    item_defs = load_current_item_defs()
    trio_recipes = generate_trio_recipes(item_defs)
    update_files(item_defs, trio_recipes)

if __name__ == "__main__":
    main()
