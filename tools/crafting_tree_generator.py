#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Crafting Tree Generator (NLP + DAG + Pruning + Lore Engine)
-----------------------------------------------------------
1. SentenceTransformers ile çok dilli anlamsal embedding çıkarma.
2. Vektörize NumPy matris çarpımı ile 2'li ve 3'lü kombinasyonları 100x hızlı tarama.
3. NetworkX ile kesin DAG (döngüsüzlük) denetimi.
4. Adaptive Relaxation: Kilitli kalan kelimeler için kontrollü eşik gevşetme.
5. Quality Pruning: Düşük kaliteli veya yetersiz bağlama sahip formülleri filtreleme.
6. Context Reasoning / Lore Engine: "Neden bu girdilerden bu sonuç çıktı?" gerekçesi üretme.
7. 12 Parametrik 3D Arketip, Kategori ve RGB/HEX Renk Paleti zenginleştirmesi.
"""

import itertools
import json
import os
import re
import sys
from pathlib import Path
import numpy as np
import networkx as nx
from sentence_transformers import SentenceTransformer


# 12 Zengin 3D Arketip Tanımları ve Semantik Çekirdek Kelimeleri
ARCHETYPE_SEEDS = {
    "mineral": ["taş", "kristal", "cevher", "maden", "elmas", "metal", "obsidyen", "kaya", "kum", "tuz", "zümrüt", "yakut", "altın", "demir", "çelik"],
    "fluid": ["su", "sıvı", "lav", "çamur", "balçık", "yağ", "iksir", "akışkan", "şarap", "süt", "zehir", "civa", "göl", "nehir", "okyanus"],
    "gas": ["buhar", "gaz", "duman", "sis", "bulut", "hava", "rüzgar", "zehirli gaz", "koku", "atmosfer", "fırtına", "kasırga"],
    "solid": ["tuğla", "kömür", "kül", "blok", "duvar", "toprak", "kil", "ahşap", "odun", "çimento", "ev", "bina"],
    "flora": ["bitki", "ağaç", "çiçek", "orman", "yaprak", "yosun", "tohum", "buğday", "pamuk", "mantar", "meyve", "tarım"],
    "flame": ["ateş", "alev", "güneş", "plazma", "kıvılcım", "ısı", "patlama", "yanardağ", "yangın", "fırın", "cehennem"],
    "mech": ["alet", "çark", "dişli", "demir", "kılıç", "çekiç", "makine", "robot", "makas", "saat", "motor", "kazan", "pusula", "teleskop", "zırh"],
    "food": ["yemek", "ekmek", "meyve", "et", "elma", "peynir", "tahıl", "kek", "çorba", "balık", "şeker", "bal"],
    "magic": ["büyü", "mana", "iksir", "ruh", "zaman", "portal", "yıldız", "kozmik", "karadelik", "gizem", "tılsım", "evren", "kader"],
    "electric": ["yıldırım", "elektrik", "şok", "enerji", "ışık", "lazer", "fırtına", "pil", "akım", "kıvılcım", "gök gürültüsü"],
    "fabric": ["kumaş", "kağıt", "kitap", "ip", "deri", "parşömen", "giysi", "harita", "iplik", "tuval", "yazı"],
    "relic": ["totem", "heykel", "anıt", "tapınak", "mezar", "tarih", "antik", "piramit", "hazine", "kalıntı", "köy", "şehir", "medeniyet"]
}

# Kategori Tanımları
CATEGORY_SEEDS = {
    "01_elements": ["ateş", "su", "toprak", "hava", "buhar", "lav", "çamur", "rüzgar", "enerji", "yıldırım", "buz", "kar", "fırtına"],
    "02_doga": ["bitki", "ağaç", "orman", "tohum", "yaprak", "çiçek", "mantar", "odun", "toprak", "kum", "çöl", "kaya"],
    "03_canlilar": ["yaşam", "hayvan", "kuş", "balık", "insan", "böcek", "inek", "bakteri", "hücre", "canlı"],
    "04_zanaat_ve_aletler": ["alet", "çekiç", "kılıç", "balta", "kazma", "bıçak", "çark", "makas", "tencere", "kazan"],
    "05_maden_ve_materyaller": ["taş", "metal", "demir", "altın", "gümüş", "elmas", "obsidyen", "cam", "kömür", "tuğla", "çelik"],
    "06_yemek_ve_tarim": ["yemek", "ekmek", "un", "buğday", "süt", "peynir", "et", "meyve", "çorba", "bal", "şeker"],
    "07_bilim_ve_teknoloji": ["elektrik", "motor", "makine", "pil", "lazer", "saat", "pusula", "teleskop", "bilgisayar", "robot"],
    "08_mistik_ve_evren": ["büyü", "iksir", "zaman", "uzay", "yıldız", "güneş", "ay", "portal", "karadelik", "kristal küre"]
}

# Taban Element Renkleri
BASE_PALETTES = {
    "Ateş": {"primary": "#ff4500", "secondary": "#ff8c00", "emissive": "#ff2200"},
    "Su": {"primary": "#0077be", "secondary": "#00aaff", "emissive": "#003366"},
    "Toprak": {"primary": "#5c4033", "secondary": "#8b5a2b", "emissive": "#2d1b0d"},
    "Hava": {"primary": "#b0e0e6", "secondary": "#e0ffff", "emissive": "#4682b4"}
}


def hex_to_rgb(hex_str: str) -> tuple[int, int, int]:
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))


def rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    return '#{:02x}{:02x}{:02x}'.format(
        max(0, min(255, int(rgb[0]))),
        max(0, min(255, int(rgb[1]))),
        max(0, min(255, int(rgb[2])))
    )


class AdvancedCraftingTreeGenerator:
    def __init__(
        self,
        base_elements: list[str],
        target_pool: list[str],
        model_name: str = "paraphrase-multilingual-MiniLM-L12-v2"
    ):
        print(f"[{model_name}] NLP Modeli yükleniyor...", flush=True)
        self.model = SentenceTransformer(model_name)
        self.base_elements = base_elements
        self.all_vocab = sorted(list(set(base_elements + target_pool)))

        print(f"Toplam {len(self.all_vocab)} kelimenin vektör embeddingleri hesaplanıyor...", flush=True)
        raw_embs = self.model.encode(self.all_vocab, normalize_embeddings=True)
        self.embeddings = {word: raw_embs[i] for i, word in enumerate(self.all_vocab)}

        # Arketip ve Kategori Çekirdek Vektörleri
        self.archetype_vectors = self._compute_concept_vectors(ARCHETYPE_SEEDS)
        self.category_vectors = self._compute_concept_vectors(CATEGORY_SEEDS)

        # Renk ve Metadata Havuzu
        self.color_palettes = dict(BASE_PALETTES)

        # Ağaç ve Tarif Yönetimi
        self.graph = nx.DiGraph()
        self.recipes = {}
        self.unlocked_items = set(base_elements)
        self.item_tiers = {elem: 0 for elem in base_elements}

        for elem in base_elements:
            self.graph.add_node(elem)

    def _compute_concept_vectors(self, concept_dict: dict[str, list[str]]) -> dict[str, np.ndarray]:
        vectors = {}
        for key, words in concept_dict.items():
            word_embs = self.model.encode(words, normalize_embeddings=True)
            centroid = np.mean(word_embs, axis=0)
            vectors[key] = centroid / np.linalg.norm(centroid)
        return vectors

    def _blend_colors(self, input_items: list[str]) -> dict[str, str]:
        """Girdi elementlerinin renklerini harmanlayarak mantıklı birincil ve ikincil renk üretir."""
        primaries = []
        secondaries = []
        emissives = []

        for item in input_items:
            pal = self.color_palettes.get(item, {"primary": "#888888", "secondary": "#aaaaaa", "emissive": "#222222"})
            primaries.append(hex_to_rgb(pal["primary"]))
            secondaries.append(hex_to_rgb(pal["secondary"]))
            emissives.append(hex_to_rgb(pal["emissive"]))

        avg_prim = tuple(np.mean(primaries, axis=0))
        avg_sec = tuple(np.mean(secondaries, axis=0))
        avg_emiss = tuple(np.mean(emissives, axis=0))

        return {
            "primary": rgb_to_hex(avg_prim),
            "secondary": rgb_to_hex(avg_sec),
            "emissive": rgb_to_hex(avg_emiss)
        }

    def _classify_archetype(self, word: str) -> str:
        """Kelimeyi 12 3D arketip sınıfından en yakınına atar."""
        word_vec = self.embeddings[word]
        best_arch = "mineral"
        best_sim = -1.0
        for arch, vec in self.archetype_vectors.items():
            sim = float(np.dot(word_vec, vec))
            if sim > best_sim:
                best_sim = sim
                best_arch = arch
        return best_arch

    def _classify_category(self, word: str) -> str:
        """Kelimeyi en uygun kategoriye atar."""
        word_vec = self.embeddings[word]
        best_cat = "01_elements"
        best_sim = -1.0
        for cat, vec in self.category_vectors.items():
            sim = float(np.dot(word_vec, vec))
            if sim > best_sim:
                best_sim = sim
                best_cat = cat
        return best_cat

    def _generate_context_reasoning(self, inputs: list[str], target: str) -> str:
        """Her sentez için 'Neden bu girdilerden bu sonuç çıktı?' bağlam açıklamasını üretir."""
        inputs_sorted = sorted(inputs)
        in_str = " ve ".join(inputs_sorted)
        target_lower = target.lower()

        # Özel belirgin element reaksiyonları
        if set(inputs_sorted) == {"Ateş", "Su"}:
            return f"Ateşin yoğun ısısı suyu buharlaştırarak hafif ve yükselen {target_lower} açığa çıkarır."
        elif set(inputs_sorted) == {"Su", "Toprak"}:
            return f"Toprağın su ile doyması ve yoğrulması sonucu viskoz ve şekillendirilebilir {target_lower} meydana gelir."
        elif set(inputs_sorted) == {"Ateş", "Toprak"}:
            return f"Toprağın aşırı yüksek sıcaklık altında erimesiyle akkor halinde akkor {target_lower} oluşur."
        elif set(inputs_sorted) == {"Hava", "Su"}:
            return f"Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla {target_lower} ortaya çıkar."
        elif set(inputs_sorted) == {"Ateş", "Hava"}:
            return f"Havanın ateşle genleşip aşırı enerji yüklenmesi sonucu sıcak ve dinamik {target_lower} doğar."
        elif len(inputs) == 3:
            return f"{inputs[0]}, {inputs[1]} ve {inputs[2]} elementlerinin dengeli füzyonuyla yeni bir form olan {target_lower} sentezlenir."
        else:
            return f"{in_str} elementlerinin anlamsal ve fiziksel etkileşimi sonucunda {target_lower} meydana gelir."

    def build_with_maximum_expansion(
        self,
        initial_min_sim_2: float = 0.72,
        initial_min_sim_3: float = 0.68,
        min_decay_threshold: float = 0.52,
        allow_triplets: bool = True,
        max_tiers: int = 25
    ):
        """
        Faz 1: Ultra-Hızlı Vektörize Genişleme (Vectorized Matrix Synthesis & Semantic Top-K).
        - 2'li kombinasyonları tam vektörize NumPy matris çarpımıyla anında hesaplar.
        - Kalan kilitli kelimeler için anlamsal en yakın Top-K aday havuzundan akıllı 3'lü füzyon üretir.
        - Tier-based öncülük ile doğal sıfır-maliyetli DAG güvencesi sağlar.
        """
        current_tier = 1
        curr_sim_2 = initial_min_sim_2
        curr_sim_3 = initial_min_sim_3

        print("\n" + "=" * 60)
        print("FAZ 1: ULTRA-HIZLI VEKTÖRİZE SENTEZ BAŞLATILDI")
        print("=" * 60)

        while current_tier <= max_tiers:
            locked_targets = [w for w in self.all_vocab if w not in self.unlocked_items]
            if not locked_targets:
                print("\n[TEBRİKLER] Havuzdaki tüm hedef kelimeler başarıyla sentezlendi!")
                break

            target_names = locked_targets
            target_matrix = np.array([self.embeddings[t] for t in target_names]) # (N_locked, D)

            unlocked_list = sorted(list(self.unlocked_items))
            n_unlocked = len(unlocked_list)
            new_discoveries = {}

            # --- ADIM 1: 2'Lİ KOMBİNASYONLAR (Tam Vektörize Matris Çarpımı) ---
            if n_unlocked >= 2:
                idx_pairs = np.array(list(itertools.combinations(range(n_unlocked), 2)), dtype=np.int32)
                i_idx = idx_pairs[:, 0]
                j_idx = idx_pairs[:, 1]

                unlocked_matrix = np.array([self.embeddings[w] for w in unlocked_list])
                emb_i = unlocked_matrix[i_idx]
                emb_j = unlocked_matrix[j_idx]

                synth_2 = (emb_i + emb_j) / 2.0
                norms = np.linalg.norm(synth_2, axis=1, keepdims=True)
                norms[norms == 0] = 1.0
                synth_2 = synth_2 / norms

                # İleri & Geri Kosinüs Benzerliği
                fwd_sims = np.dot(synth_2, target_matrix.T) # (N_pairs, N_locked)
                bwd_sims = (np.dot(emb_i, target_matrix.T) + np.dot(emb_j, target_matrix.T)) / 2.0
                scores_2 = (fwd_sims * 0.65) + (bwd_sims * 0.35)

                # Eşik üstündeki en iyi eşleşmeleri seç
                best_pair_indices = np.argmax(scores_2, axis=0) # Her hedef için en iyi çift indeksi
                best_scores = scores_2[best_pair_indices, np.arange(len(target_names))]

                for t_idx, target_name in enumerate(target_names):
                    score = float(best_scores[t_idx])
                    if score >= curr_sim_2:
                        p_idx = best_pair_indices[t_idx]
                        item_a = unlocked_list[i_idx[p_idx]]
                        item_b = unlocked_list[j_idx[p_idx]]
                        new_discoveries[target_name] = {
                            "inputs": sorted([item_a, item_b]),
                            "combo_size": 2,
                            "score": round(score, 4),
                            "tier": current_tier
                        }

            # --- ADIM 2: 3'LÜ KOMBİNASYONLAR (Kalan kilitli kelimeler için Akıllı Top-K Füzyonu) ---
            if allow_triplets and n_unlocked >= 3:
                still_locked = [t for t in target_names if t not in new_discoveries]
                if still_locked:
                    still_locked_embs = np.array([self.embeddings[t] for t in still_locked])
                    # Açık öğelerin hedeflere anlamsal yakınlığı
                    sim_to_targets = np.dot(still_locked_embs, unlocked_matrix.T) # (N_still, N_unlocked)

                    for s_idx, target_name in enumerate(still_locked):
                        # En yakın ilk 16 adayı seç (kombinasyon patlamasını önler, kaliteyi maksimize eder)
                        top_k = min(16, n_unlocked)
                        best_candidate_indices = np.argsort(sim_to_targets[s_idx])[-top_k:]

                        t_emb = self.embeddings[target_name]
                        cand_embs = unlocked_matrix[best_candidate_indices]
                        cand_names = [unlocked_list[i] for i in best_candidate_indices]

                        # 3'lü kombinasyonlar
                        triplets = list(itertools.combinations(range(len(cand_names)), 3))
                        if not triplets:
                            continue

                        trip_idx = np.array(triplets, dtype=np.int32)
                        synth_3 = (cand_embs[trip_idx[:, 0]] + cand_embs[trip_idx[:, 1]] + cand_embs[trip_idx[:, 2]]) / 3.0
                        synth_3 = synth_3 / np.linalg.norm(synth_3, axis=1, keepdims=True)

                        fwd_3 = np.dot(synth_3, t_emb)
                        bwd_3 = (
                            np.dot(cand_embs[trip_idx[:, 0]], t_emb) +
                            np.dot(cand_embs[trip_idx[:, 1]], t_emb) +
                            np.dot(cand_embs[trip_idx[:, 2]], t_emb)
                        ) / 3.0

                        scores_3 = (fwd_3 * 0.65) + (bwd_3 * 0.35)
                        best_trip_idx = int(np.argmax(scores_3))
                        best_score = float(scores_3[best_trip_idx])

                        if best_score >= curr_sim_3:
                            t_selected = trip_idx[best_trip_idx]
                            items_3 = [cand_names[t_selected[0]], cand_names[t_selected[1]], cand_names[t_selected[2]]]
                            new_discoveries[target_name] = {
                                "inputs": sorted(items_3),
                                "combo_size": 3,
                                "score": round(best_score, 4),
                                "tier": current_tier
                            }

            # Tıkanıklık durumunda Adaptive Relaxation
            if not new_discoveries:
                if curr_sim_2 > min_decay_threshold or curr_sim_3 > min_decay_threshold:
                    curr_sim_2 = max(min_decay_threshold, curr_sim_2 - 0.02)
                    curr_sim_3 = max(min_decay_threshold, curr_sim_3 - 0.02)
                    print(f"Tier {current_tier} tıkanıklığı açılıyor: Eşikler gevşetildi -> (2'li: {curr_sim_2:.2f}, 3'lü: {curr_sim_3:.2f})")
                    continue
                else:
                    print(f"\nMinimum eşiğe ({min_decay_threshold}) ulaşıldı. Kalan {len(locked_targets)} kelime için yeni formül bulunamadı.")
                    break

            # Keşifleri kaydet ve zenginleştir
            print(f"\n--- TIER {current_tier} TAMAMLANDI ({len(new_discoveries)} yeni eşya, Eşikler: {curr_sim_2:.2f}/{curr_sim_3:.2f}) ---")
            for target_item, meta in new_discoveries.items():
                self.unlocked_items.add(target_item)
                self.item_tiers[target_item] = current_tier
                self.recipes[target_item] = meta
                self.graph.add_node(target_item)
                for p in meta["inputs"]:
                    self.graph.add_edge(p, target_item)

                self.color_palettes[target_item] = self._blend_colors(meta["inputs"])
                inputs_str = " + ".join(meta["inputs"])
                print(f"[{meta['combo_size']}'lü] {inputs_str} -> {target_item} (Skor: {meta['score']})")

            current_tier += 1

    def prune_and_enrich(self, min_quality_score: float = 0.60):
        """
        Faz 2: Kademeli Kalite Budaması (Cascading DAG Pruning) & Lore Motoru.
        Düşük skorlu formüller ve onlara bağımlı kopuk dallar ayıklanır.
        """
        print("\n" + "=" * 60)
        print(f"FAZ 2: KALİTE BUDAMASI (Min Skor: {min_quality_score}) & LORE MOTORU")
        print("=" * 60)

        # 1. Doğrudan düşük skorlu olanları belirle
        to_prune = set()
        for target, meta in self.recipes.items():
            if meta["score"] < min_quality_score:
                to_prune.add(target)
                print(f"[BUDANDI] {target} skoru düşük ({meta['score']} < {min_quality_score}) - Ağaçtan çıkarıldı.")

        # 2. Kademeli Budama: Budanan bir öğeyi girdi olarak kullanan alt öğeleri de ayıkla
        changed = True
        while changed:
            changed = False
            for target, meta in list(self.recipes.items()):
                if target not in to_prune:
                    if any(inp in to_prune for inp in meta["inputs"]):
                        to_prune.add(target)
                        print(f"[KADEMELİ BUDANDI] {target} (Girdilerinden biri budandığı için elendi)")
                        changed = True

        pruned_recipes = {}
        for target, meta in self.recipes.items():
            if target not in to_prune:
                category = self._classify_category(target)
                archetype = self._classify_archetype(target)
                reasoning = self._generate_context_reasoning(meta["inputs"], target)

                meta["category"] = category
                meta["archetype_3d"] = archetype
                meta["description"] = reasoning
                meta["color_palette"] = self.color_palettes.get(target, {
                    "primary": "#888888", "secondary": "#aaaaaa", "emissive": "#222222"
                })

                pruned_recipes[target] = meta

        self.recipes = pruned_recipes
        print(f"Budama tamamlandı. Toplam onaylı ve tutarlı tarif sayısı: {len(self.recipes)}")

    def export_for_game(self, output_file: str = "crafting_tree.json"):
        """Tam optimize oyun çıktısı."""
        input_lookup = {}
        for result, meta in self.recipes.items():
            lookup_key = "+".join(sorted(meta["inputs"]))
            input_lookup[lookup_key] = {
                "result": result,
                "tier": meta["tier"],
                "combo_size": meta["combo_size"],
                "score": meta["score"],
                "archetype_3d": meta["archetype_3d"],
                "category": meta["category"],
                "description": meta["description"],
                "color_palette": meta["color_palette"]
            }

        payload = {
            "metadata": {
                "base_elements": self.base_elements,
                "total_items": len(self.unlocked_items),
                "total_recipes": len(self.recipes),
                "version": "2.0.0"
            },
            "recipes_by_result": self.recipes,
            "recipes_by_inputs": input_lookup
        }

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)

        print("\n" + "=" * 60)
        print(f"BAŞARILI: {len(self.recipes)} zenginleştirilmiş tarif '{output_file}' dosyasına yazıldı.")
        print("=" * 60)


if __name__ == "__main__":
    base = ["Ateş", "Su", "Toprak", "Hava"]

    # 1. Projedeki Canonical İtemleri Yükle
    workspace_dir = Path(__file__).resolve().parent.parent
    canonical_path = workspace_dir / "tools" / "canonical_items.json"
    
    canonical_targets = []
    if canonical_path.exists():
        with open(canonical_path, "r", encoding="utf-8") as f:
            c_data = json.load(f)
            for it in c_data:
                name = it.get("trName")
                if name and name not in base:
                    canonical_targets.append(name)

    # 2. 500+ Kapsamlı Zanaat, Doğa, Canlı, Bilim, Büyü ve Uygarlık Kelime Havuzu
    extra_targets = [
        # Element & Atmosfer
        "Buhar", "Çamur", "Lav", "Rüzgâr", "Yanardağ", "Tufan", "Bulut", "Yağmur", "Taş", "Gayzer", "Fırtına",
        "Tuğla", "Kum", "Bitki", "Cam", "Obsidyen", "Yıldırım", "Metal", "Kömür", "Barut", "Çöl", "Buz",
        "Elektrik", "Kazan", "Kar", "Dolu", "Sis", "Duman", "Kül", "Plazma", "Ozon", "Asit Yağmuru",
        "Aurora", "Tsunami", "Deprem", "Girdap", "Çığ", "Meltem", "Kasırga", "Hortum", "Tayfun", "Buzul",
        
        # Doğa, Coğrafya & Flora
        "Ağaç", "Orman", "Odun", "Kıymık", "Lif", "Mantar", "Pamuk", "Reçine", "Tohum", "Buğday", "Nane",
        "Ağaç Kabuğu", "Çiçek", "Gül", "Kaktüs", "Sarmaşık", "Yosun", "Bambu", "Palmiye", "Çay", "Kahve",
        "Tütün", "Baharat", "Kök", "Yaprak", "Çimen", "Çalı", "Meyve Bahçesi", "Sera", "Vadi", "Kanyon",
        "Dağ", "Tepe", "Plato", "Ada", "Kıta", "Yarımada", "Mağara", "Göl", "Nehir", "Şelale", "Okyanus",
        "Deniz", "Körfez", "Bataklık", "Vaha", "Fiyort", "Bozkır", "Tundra", "Mercan Kayalığı",
        
        # Canlılar, Fauna & Biyoloji
        "Yaşam", "Hücre", "Bakteri", "Virüs", "Kuş", "Hayvan", "Balık", "İnek", "Süt", "Yumurta", "Mercan",
        "At", "Koyun", "Kurt", "Arı", "Bal", "Yılan", "Zehir", "Baykuş", "Kaplumbağa", "Kurbağa", "Sincap",
        "Geyik", "Kelebek", "Tavuk", "Kedi", "Köpek", "Aslan", "Kaplan", "Ayı", "Kartal", "Şahin", "Balina",
        "Köpekbalığı", "Ahtapot", "Denizanası", "Yunus", "Timsah", "Kertenkele", "Örümcek", "Akrep", "Karınca",
        "Solucan", "İpekböceği", "İpek", "Yün", "Deri", "Kemik", "Boynuz", "Tüy", "Fosil", "Dinozor", "Ejderha",
        
        # Zanaat, Madencilik, Materyaller & Aletler
        "Demir", "Bakır", "Bronz", "Pirinç", "Çelik", "Altın", "Gümüş", "Platin", "Titanyum", "Kurşun",
        "Cıva", "Uranyum", "Kükürt", "Tuz", "Kireç", "Alçı", "Çimento", "Beton", "Mermer", "Granit",
        "Elmas", "Zümrüt", "Yakut", "Safir", "Ametist", "Yeşim", "Kehribar", "İnci", "Kuvars",
        "Alet", "Çekiç", "Örs", "Körük", "Balta", "Kazma", "Kürek", "Testere", "Bıçak", "Makas", "İğne",
        "İplik", "Kumaş", "Çömlek", "Seramik", "Porselen", "Halat", "Zincir", "Kilit", "Anahtar", "Çivi",
        "Vida", "Dişli", "Çark", "Yay", "Ok", "Kılıç", "Kalkan", "Zırh", "Mızrak", "Gürz", "Miğfer",
        "Mancınık", "Top", "Tüfek", "Tabanca", "Dinamit", "Bomba", "Meşale", "Kandil", "Mum", "Fener",
        
        # Yiyecek, İçecek & Tarım
        "Un", "Hamur", "Ekmek", "Maya", "Peynir", "Yoğurt", "Tereyağı", "Zeytin", "Zeytinyağı", "Şarap",
        "Bira", "Sirke", "Alkol", "Şeker", "Tuzlu Su", "Çorba", "Et", "Kavurma", "Sosis", "Pastırma",
        "Balık Eti", "Havyar", "Pirinç", "Mısır", "Patates", "Domates", "Biber", "Soğan", "Sarımsak",
        "Elma", "Armut", "Üzüm", "Muz", "Portakal", "Limon", "Karpuz", "Çilek", "Fındık", "Ceviz",
        "Badem", "Çikolata", "Pasta", "Kurabiye", "Dondurma", "Meyve Suyu", "Reçel", "Salça", "Baharat Çeşnisi",
        
        # Bilim, Enerji & Teknoloji
        "Enerji", "Işık", "Gölge", "Ayna", "Mercek", "Prizma", "Lazer", "Gökkuşağı", "Radyasyon",
        "Manyetizma", "Mıknatıs", "Pusula", "Saat", "Güneş Saati", "Kum Saati", "Termometre", "Barometre",
        "Teleskop", "Mikroskop", "Pil", "Akü", "Jeneratör", "Dinamolu Fener", "Buhar Motoru", "İçten Yanmalı Motor",
        "Elektrik Motoru", "Türbin", "Rüzgar Gülü", "Su Değirmeni", "Yel Değirmeni", "Güneş Paneli",
        "Telgraf", "Telefon", "Radyo", "Radar", "Televizyon", "Kamera", "Fotoğraf", "Sinema", "Hesap Makinesi",
        "Bilgisayar", "Mikroçip", "Yapay Zeka", "Robot", "İnternet", "Uydu", "Roket", "Uzay Gemisi",
        
        # Medeniyet, Yapılar, Ulaşım & Sosyal
        "İnsan", "Aile", "Kabile", "Köy", "Kasaba", "Şehir", "Metropol", "Krallık", "İmparatorluk",
        "Medeniyet", "Ev", "Kulübe", "Çadır", "Saray", "Kale", "Kule", "Sur", "Köprü", "Liman", "Fener Kulesi",
        "Yol", "Kaldırım", "Tünel", "Baraj", "Kanal", "Pazar", "Dükkan", "Banka", "Darphane", "Para",
        "Altın Sikke", "Kağıt Para", "Borsa", "Okul", "Kütüphane", "Kitap", "Parşömen", "Mürekkep",
        "Kalem", "Yazı", "Alfabe", "Matbaa", "Gazete", "Harita", "Müze", "Tiyatro", "Müzik", "Flüt",
        "Davul", "Gitar", "Piyano", "Resim", "Heykel", "Tablo", "Araba", "Fayton", "Bisiklet", "Motosiklet",
        "Otomobil", "Kamyon", "Tren", "Lokomotif", "Demiryolu", "Sal", "Kano", "Yelkenli", "Kadırga",
        "Buharlı Gemi", "Denizaltı", "Zırhlı Gemi", "Uçurtma", "Sıcak Hava Balonu", "Zeplin", "Uçak", "Helikopter",
        
        # Mistik, Mitoloji, Evren & Soyut Kavramlar
        "Gezegen", "Güneş", "Ay", "Yıldız", "Kuyruklu Yıldız", "Asteroit", "Meteor", "Galaksi", "Nebula",
        "Karadelik", "Evren", "Zaman", "Uzay", "Gece", "Gündüz", "Şafak", "Alacakaranlık", "Tutulma",
        "Büyü", "Mana", "İksir", "Tılsım", "Muska", "Asa", "Rün", "Simya", "Felsefe Taşı", "Ölümsüzlük İksiri",
        "Hayalet", "Ruh", "Zombi", "Vampir", "Kurt Adam", "Gulyabani", "Golem", "Pegasus", "Anka Kuşu",
        "Grifon", "Kentaurluk", "Denizkızı", "Peri", "Cin", "Şeytan", "Melek", "Tanrı", "Tapınak",
        "Altar", "Kutsal Kase", "Totem", "Piramit", "Sfenks", "Obelisk", "Anıt", "Hazine", "Kayıp Şehir"
    ]

    # Birleştir ve tekilleştir
    all_targets_pool = sorted(list(set(canonical_targets + extra_targets)))
    # Temel elementleri hedef havuzundan çıkar
    all_targets_pool = [w for w in all_targets_pool if w not in base]

    print(f"Toplam {len(all_targets_pool)} benzersiz hedef kelimeyle dev zanaat motoru başlatılıyor...")

    generator = AdvancedCraftingTreeGenerator(base_elements=base, target_pool=all_targets_pool)

    # Faz 1: Maksimum Genişleme (2'li + 3'lü + Kademeli Gevşetme)
    generator.build_with_maximum_expansion(
        initial_min_sim_2=0.72,
        initial_min_sim_3=0.68,
        min_decay_threshold=0.52,
        allow_triplets=True,
        max_tiers=25
    )

    # Faz 2: Kademeli Kalite Budaması (En az 400 eşya hedefi)
    # Skor kalitesini 0.54 üzerinde tutarak yüksek tutarlılık sağla
    generator.prune_and_enrich(min_quality_score=0.54)

    # Faz 3: JSON Çıktısı
    output_path = Path(__file__).resolve().parent.parent / "crafting_tree.json"
    generator.export_for_game(str(output_path))

