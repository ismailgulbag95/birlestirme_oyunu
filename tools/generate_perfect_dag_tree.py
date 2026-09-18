#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Perfect Hierarchical DAG Tree Generator for All 521 Items
Kullanıcı Kuralları ve Yüksek Bağlamlı Simya Formülleri ile Revize Edilmiş Motor.
"""

import json
import os
import re
import sys
from pathlib import Path
import networkx as nx

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
ITEMS_JS_PATH = WORKSPACE_DIR / "src" / "items" / "itemDefinitions.js"
TREE_JSON_PATH = WORKSPACE_DIR / "crafting_tree.json"
ALL_ITEMS_JSON = WORKSPACE_DIR / "tools" / "all_521_items.json"

BASE_ELEMENTS = ["ates", "su", "toprak", "hava"]

class DagBuilder:
    def __init__(self, all_items_data):
        self.all_items_data = all_items_data
        self.all_keys = set(all_items_data.keys())
        self.reachable = set(BASE_ELEMENTS)
        self.tiers = {elem: 1 for elem in BASE_ELEMENTS}
        self.recipes = {}
        self.used_pairs = {}
        self.used_trios = {}

    def pair_key(self, a, b):
        return tuple(sorted([a.strip().lower(), b.strip().lower()]))

    def trio_key(self, a, b, c):
        return tuple(sorted([a.strip().lower(), b.strip().lower(), c.strip().lower()]))

    def add(self, item_id, inputs, trio_inputs=None, desc=""):
        item_id = item_id.strip().lower()
        if item_id not in self.all_keys and item_id not in BASE_ELEMENTS:
            return False

        if item_id in self.recipes:
            return False

        if len(inputs) != 2:
            return False

        a, b = inputs[0].strip().lower(), inputs[1].strip().lower()

        if a not in self.reachable or b not in self.reachable:
            return False

        key = self.pair_key(a, b)
        if key in self.used_pairs:
            return False

        self.used_pairs[key] = item_id

        trios = []
        if trio_inputs:
            for trio in trio_inputs:
                if len(trio) == 3:
                    ta, tb, tc = trio[0].strip().lower(), trio[1].strip().lower(), trio[2].strip().lower()
                    if ta in self.reachable and tb in self.reachable and tc in self.reachable:
                        tkey = self.trio_key(ta, tb, tc)
                        if tkey not in self.used_trios:
                            self.used_trios[tkey] = item_id
                            trios.append([ta, tb, tc])

        tier = max(self.tiers[a], self.tiers[b]) + 1
        self.tiers[item_id] = tier
        self.reachable.add(item_id)
        self.recipes[item_id] = {
            "inputs": [a, b],
            "trioRecipes": trios,
            "tier": tier,
            "desc": desc or self.all_items_data.get(item_id, {}).get("description", "")
        }
        return True

def run_build():
    with open(ALL_ITEMS_JSON, "r", encoding="utf-8") as f:
        all_items_data = json.load(f)

    b = DagBuilder(all_items_data)
    add = b.add

    # =========================================================================
    # KATMAN 1: 6 TEMEL ELEMENT KOMBİNASYONU (Tier 2)
    # =========================================================================
    add("camur", ["su", "toprak"], [["su", "toprak", "toprak"]], "Toprağın su ile yoğrulmasıyla oluşan balçık.")
    add("lav", ["ates", "toprak"], [["ates", "ates", "toprak"]], "Toprağın aşırı sıcakta erimiş akkor hali.")
    add("buhar", ["ates", "su"], [["ates", "ates", "su"]], "Suyun buharlaşmasından doğan sıcak gaz.")
    add("yagmur", ["su", "hava"], [["su", "su", "hava"]], "Havadaki nemin yağışa dönüşmesi.")
    add("kum", ["toprak", "hava"], [["toprak", "toprak", "hava"]], "Rüzgarın toprağı ufalamasıyla oluşan tanecikler.")
    add("enerji", ["ates", "hava"], [["ates", "hava", "hava"]], "Ateş ve havanın enerjisi.")
    
    # KURAL 1: Su + Su = Deniz
    add("deniz", ["su", "su"], [["su", "su", "su"]], "Geniş tuzlu su havzası.")
    add("basinc", ["hava", "hava"], [["hava", "hava", "enerji"]], "Havanın sıkışmasıyla oluşan yüksek fiziksel kuvvet.")
    add("bubble", ["su", "buhar"], [["su", "buhar", "hava"]], "Suyun içinde hapsolan buhar küreciği.")
    add("boiling", ["buhar", "ates"], [["su", "ates", "ates"]], "Suyun yüksek sıcaklıkta buharlaşarak kaynama noktasına ulaşması.")

    # =========================================================================
    # KATMAN 2: İLKEL DOĞA, ATMOSFER & TEMEL MATERYALLER (Tier 3)
    # =========================================================================
    add("tas", ["lav", "su"], [["lav", "su", "toprak"]], "Lavın suyla katılaşması sonucu oluşan kayaç.")
    add("obsidyen", ["lav", "tas"], [["lav", "tas", "su"]], "Volkanik camsı kayaç.")
    add("ruzgar", ["hava", "enerji"], [["hava", "hava", "enerji"]], "Havanın enerjiyle hızla hareket etmesi.")
    add("cam", ["kum", "ates"], [["kum", "ates", "hava"]], "Kumun erimesiyle oluşan şeffaf cam.")
    add("bulut", ["buhar", "hava"], [["buhar", "hava", "hava"]], "Gökyüzünde toplanan nem kütlesi.")
    add("sis", ["buhar", "toprak"], [["buhar", "toprak", "hava"]], "Yeryüzüne çöken nem tabakası.")
    add("volkan", ["lav", "toprak"], [["lav", "toprak", "ates"]], "Magmayı yüzeye püskürten dağ.")
    add("buz", ["su", "ruzgar"], [["su", "ruzgar", "hava"]], "Donmuş şeffaf buz kristali.")
    add("kar", ["bulut", "buz"], [["bulut", "buz", "hava"]], "Donmuş beyaz kar taneleri.")
    add("dolu", ["yagmur", "buz"], [["yagmur", "buz", "ruzgar"]], "Donarak düşen buz taneleri.")
    add("okyanus", ["deniz", "su"], [["deniz", "deniz", "su"]], "Dev su kütlesi.")
    
    # KURAL 8: Güneş = Işık + Ateş
    add("isik", ["enerji", "ates"], [["enerji", "ates", "hava"]], "Aydınlatan ışık dalgası.")
    add("gunes", ["isik", "ates"], [["isik", "ates", "hava"]], "Gökyüzünü aydınlatan ulu yıldız.")
    
    # KURAL 4: Deniz + Güneş = Tuz
    add("tuz", ["deniz", "gunes"], [["deniz", "gunes", "ates"]], "Deniz suyunun güneşle buharlaşmasından kalan mineral.")
    add("tuzlu_su", ["su", "tuz"], [["su", "tuz", "toprak"]], "Tuzla doymuş doğal su.")
    
    add("firtina", ["ruzgar", "bulut"], [["ruzgar", "bulut", "enerji"]], "Güçlü fırtına.")
    add("yildirim", ["firtina", "enerji"], [["firtina", "enerji", "bulut"]], "Çakan dev elektrik arkı.")
    
    # KURAL 5 & 2: Fay Hattı + Enerji = Deprem, Deniz + Deprem = Tsunami
    add("fay_hatti", ["toprak", "tas"], [["toprak", "tas", "enerji"]], "Yer kabuğundaki kırık çizgisi.")
    add("deprem", ["fay_hatti", "enerji"], [["fay_hatti", "enerji", "toprak"]], "Tektonik sarsıntı.")
    add("tsunami", ["deniz", "deprem"], [["deniz", "deprem", "okyanus"]], "Devasa okyanus dalgası.")
    
    add("alev", ["ates", "isik"], [["ates", "isik", "hava"]], "Ateşin parlayan dili.")
    add("gayzer", ["su", "volkan"], [["su", "volkan", "buhar"]], "Fışkıran sıcak yeraltı suyu.")
    add("dag", ["tas", "fay_hatti"], [["tas", "fay_hatti", "toprak"]], "Göğe yükselen ulu zirve.")
    add("tepe", ["toprak", "tas"], [["toprak", "tas", "camur"]], "Doğal tepe yükseltisi.")
    add("yanardag", ["volkan", "dag"], [["volkan", "dag", "lav"]], "Püsküren volkanik dağ.")
    add("kaya", ["tas", "tas"], [["tas", "tas", "dag"]], "Büyük kaya kütlesi.")
    add("magara", ["dag", "tas"], [["dag", "tas", "toprak"]], "Derin kaya kovuğu.")
    add("vadi", ["dag", "toprak"], [["dag", "toprak", "nehir"]], "Akarsu vadisi.")
    
    # KURAL 1: Yağmur + Çamur = Göl
    add("gol", ["yagmur", "camur"], [["yagmur", "camur", "toprak"]], "Tatlı su gölü.")
    add("nehir", ["gol", "tas"], [["gol", "tas", "su"]], "Akan tatlı su nehri.")
    add("selale", ["nehir", "dag"], [["nehir", "dag", "su"]], "Yüksekten dökülen şelale.")
    add("kanyon", ["nehir", "tas"], [["nehir", "tas", "kaya"]], "Derin yarılmış kanyon.")
    add("ada", ["deniz", "volkan"], [["deniz", "volkan", "toprak"]], "Dört tarafı suyla çevrili ada.")
    add("yarimada", ["ada", "toprak"], [["ada", "toprak", "deniz"]], "Üç tarafı suyla çevrili kara.")
    add("kita", ["ada", "ada"], [["ada", "ada", "okyanus"]], "Büyük anakara.")
    add("col", ["kum", "gunes"], [["kum", "gunes", "ruzgar"]], "Kum çölü.")
    add("vaha", ["col", "su"], [["col", "su", "toprak"]], "Çölde yeşil su kaynağı.")
    add("buzul", ["buz", "kar"], [["buz", "kar", "dag"]], "Donmuş buzul.")
    add("buz_dagi", ["buzul", "okyanus"], [["buzul", "okyanus", "deniz"]], "Okyanusta yüzen aysberg.")
    add("cig", ["kar", "dag"], [["kar", "dag", "ruzgar"]], "Yuvarlanan kar kütlesi.")
    add("meltem", ["ruzgar", "deniz"], [["ruzgar", "deniz", "hava"]], "Hafif sahil esintisi.")
    add("girdap", ["su", "ruzgar"], [["su", "ruzgar", "deniz"]], "Suyun anaforu.")
    add("hortum", ["ruzgar", "firtina"], [["ruzgar", "firtina", "hava"]], "Dönen hava hortumu.")
    add("kasirga", ["hortum", "deniz"], [["hortum", "deniz", "okyanus"]], "Dev tropik kasırga.")
    add("tayfun", ["kasirga", "okyanus"], [["kasirga", "okyanus", "ruzgar"]], "Okyanus tayfunu.")
    add("tufan", ["yagmur", "okyanus"], [["yagmur", "okyanus", "deniz"]], "Büyük su tufanı.")
    add("plato", ["dag", "toprak"], [["dag", "toprak", "tepe"]], "Geniş yüksek düzlük.")
    add("fiyort", ["deniz", "dag"], [["deniz", "dag", "buzul"]], "Buzul körfezi.")
    add("beach", ["kum", "deniz"], [["kum", "deniz", "gunes"]], "Kum ve denizin buluştuğu güneşli sahil şeridi.")
    add("arctic", ["buz", "okyanus"], [["buz", "okyanus", "kar"]], "Buzullarla ve donmuş denizlerle kaplı kutup bölgesi.")
    add("atom", ["basinc", "enerji"], [["basinc", "enerji", "elektrik"]], "Maddenin en küçük yapı taşı ve enerji çekirdeği.")
    add("korfez", ["deniz", "yarimada"], [["deniz", "yarimada", "su"]], "Korunaklı körfez.")
    add("ozon", ["hava", "yildirim"], [["hava", "yildirim", "elektrik"]], "Ozon gazı.")
    add("aurora", ["isik", "hava"], [["isik", "hava", "enerji"]], "Kutup ışıkları.")
    add("cakmaktasi", ["tas", "enerji"], [["tas", "enerji", "ates"]], "Kıvılcım çıkaran çakmaktaşı.")
    add("kirec", ["tas", "su"], [["tas", "su", "kirec"]], "Kalker tozu.")
    add("alci", ["kirec", "su"], [["kirec", "su", "kum"]], "Alçı harcı.")
    add("cimento", ["kirec", "camur"], [["kirec", "camur", "kum"]], "Çimento tozu.")
    add("harc", ["cimento", "su"], [["cimento", "su", "kum"]], "Bağlama harcı.")
    add("beton", ["harc", "tas"], [["harc", "tas", "kum"]], "Sertleşen beton.")
    add("tugla", ["camur", "ates"], [["camur", "ates", "toprak"]], "Pişmiş tuğla.")
    add("tugla_duvar", ["tugla", "harc"], [["tugla", "harc", "cimento"]], "Tuğla duvar.")

    # =========================================================================
    # KATMAN 3: MADENLER, METALLER VE ELEKTRİK (KURAL 3)
    # =========================================================================
    add("metal", ["tas", "ates"], [["tas", "ates", "lav"]], "Kayaçların yüksek ısıyla eritilmesinden elde edilen saf metal.")
    
    # KURAL 3: Metal + Enerji = Elektrik
    add("elektrik", ["metal", "enerji"], [["metal", "enerji", "yildirim"]], "Metal iletken üzerinden akan elektrik akımı.")
    
    add("demir", ["metal", "toprak"], [["metal", "toprak", "ates"]], "Sağlam demir.")
    add("bakir", ["metal", "ates"], [["metal", "ates", "elektrik"]], "Kızıl bakır.")
    add("bronz", ["bakir", "tas"], [["bakir", "tas", "metal"]], "Bronz alaşımı.")
    add("altin", ["metal", "gunes"], [["metal", "gunes", "isik"]], "Parlayan altın.")
    add("gumus", ["metal", "isik"], [["metal", "isik", "buz"]], "Değerli gümüş.")
    add("kursun", ["metal", "kum"], [["metal", "kum", "toprak"]], "Ağır kurşun.")
    add("civa", ["metal", "su"], [["metal", "su", "gumus"]], "Sıvı cıva.")
    add("uranyum", ["metal", "enerji"], [["metal", "enerji", "yildirim"]], "Uranyum madeni.")
    add("kukurt", ["volkan", "toprak"], [["volkan", "toprak", "ates"]], "Kükürt minerali.")
    add("anchor", ["demir", "deniz"], [["demir", "deniz", "metal"]], "Gemileri denizde sabit tutmak için atılan ağır demir çapa.")

    # =========================================================================
    # KATMAN 4: İLK YAŞAM, BİTKİLER, TOHUM & İNSAN
    # =========================================================================
    add("yasam", ["camur", "enerji"], [["camur", "enerji", "yildirim"]], "İlk yaşam kıvılcımı.")
    
    # KURAL 10: İnsan = Yaşam + Toprak
    add("i_nsan", ["yasam", "toprak"], [["yasam", "toprak", "enerji"]], "Bilinçli insan.")
    
    add("bitki", ["yasam", "su"], [["yasam", "su", "toprak"]], "Fotosentez yapan yeşil bitki.")
    add("kok", ["bitki", "toprak"], [["bitki", "toprak", "su"]], "Bitkinin kökleri.")
    add("yosun", ["bitki", "su"], [["bitki", "su", "tas"]], "Nemli taş yosunu.")
    add("algae", ["deniz", "bitki"], [["deniz", "bitki", "gunes"]], "Suda serbestçe fotosentez yapan ilkel su bitkisi ve alg.")
    add("oksijen", ["bitki", "gunes"], [["bitki", "gunes", "hava"]], "Bitkilerin fotosenteziyle açığa çıkan yaşamsal oksijen gazı.")
    add("cimen", ["bitki", "yagmur"], [["bitki", "yagmur", "toprak"]], "Yeşil çimenlik.")
    add("cali", ["cimen", "toprak"], [["cimen", "toprak", "bitki"]], "Bodur çalı.")
    add("bozkir", ["cimen", "ruzgar"], [["cimen", "ruzgar", "toprak"]], "Geniş bozkır.")
    
    # KURAL 6: Bitki + Rüzgâr = Tohum
    add("tohum", ["bitki", "ruzgar"], [["bitki", "ruzgar", "toprak"]], "Bitki tohumu.")
    add("cicek", ["bitki", "isik"], [["bitki", "isik", "gunes"]], "Renkli çiçek.")
    add("agac", ["bitki", "tohum"], [["bitki", "tohum", "toprak"]], "Odunlaşan ağaç.")
    add("branch", ["agac", "ruzgar"], [["agac", "ruzgar", "orman"]], "Ağaç gövdesinden ayrılan ahşap dal parçası.")
    add("odun", ["agac", "tas"], [["agac", "tas", "toprak"]], "Sert ahşap odun.")
    add("kiymik", ["odun", "ruzgar"], [["odun", "tas", "agac"]], "Ahşap kıymık.")
    add("yaprak", ["agac", "isik"], [["agac", "isik", "ruzgar"]], "Yeşil yaprak.")
    add("agac_kabugu", ["agac", "hava"], [["agac", "hava", "ruzgar"]], "Ağaç kabuğu.")
    add("orman", ["agac", "toprak"], [["agac", "toprak", "yasam"]], "Büyük ağaç ormanı.")
    add("recine", ["agac", "ates"], [["agac", "ates", "gunes"]], "Ağaç özsuyu.")
    add("kehribar", ["recine", "tas"], [["recine", "tas", "toprak"]], "Kehribar fosili.")
    add("fosil", ["tas", "yasam"], [["tas", "yasam", "toprak"]], "Canlı fosili.")
    add("petrol", ["basinc", "fosil"], [["basinc", "fosil", "toprak"]], "Organik fosillerin yer altında basınç altında kalmasıyla oluşan petrol.")
    add("bataklik", ["camur", "bitki"], [["camur", "bitki", "su"]], "Islak bataklık.")
    add("tundra", ["buzul", "toprak"], [["buzul", "toprak", "kar"]], "Donmuş tundra.")
    add("karli_cam_agaci", ["agac", "kar"], [["agac", "kar", "buzul"]], "Karlı çam.")

    # Kömür, Elmas, Çelik Zinciri
    add("komur", ["odun", "ates"], [["odun", "ates", "toprak"]], "Yanmış ahşap kömürü.")
    add("karbon", ["komur", "ates"], [["komur", "ates", "odun"]], "Kömürleşme sonucu oluşan temel organik karbon elementi.")
    add("karbondioksit", ["karbon", "oksijen"], [["karbon", "oksijen", "ates"]], "Karbon ve oksijenin birleşimiyle oluşan sera gazı.")
    add("elmas", ["komur", "tas"], [["komur", "tas", "enerji"]], "Sert elmas.")
    add("celik", ["demir", "komur"], [["demir", "komur", "ates"]], "Sağlam çelik.")
    add("demir_kulce", ["demir", "ates"], [["demir", "ates", "celik"]], "Demir külçe.")
    add("celik_kulce", ["celik", "ates"], [["celik", "ates", "demir_kulce"]], "Çelik külçe.")
    add("barut", ["kukurt", "komur"], [["kukurt", "komur", "ates"]], "Barut tozu.")

    # Kağıt, Yazı, Kitap Zinciri (KURAL 9)
    add("kagit", ["agac", "su"], [["agac", "su", "gunes"]], "Ağaç liflerinden üretilen beyaz kağıt.")
    add("kalem", ["odun", "komur"], [["odun", "komur", "kagit"]], "Kömür uçlu ahşap kurşun kalem.")
    add("yazi", ["kalem", "kagit"], [["kalem", "kagit", "i_nsan"]], "Sembolik yazılı metin.")
    add("kitap", ["kagit", "yazi"], [["kagit", "yazi", "i_nsan"]], "Bilgi dolu ciltli kitap.")

    # Temel Canlılar
    add("hayvan", ["yasam", "toprak"], [["yasam", "toprak", "orman"]], "Yeryüzü hayvanı.")
    add("balik", ["yasam", "deniz"], [["yasam", "deniz", "su"]], "Deniz balığı.")
    add("plankton", ["deniz", "algae"], [["deniz", "algae", "yasam"]], "Deniz ekosisteminin temelini oluşturan mikroskobik canlılar.")
    add("aquarium", ["cam", "balik"], [["cam", "balik", "su"]], "Balıkların ve su canlılarının yaşadığı şeffaf cam akvaryum.")
    add("kus", ["yasam", "hava"], [["yasam", "hava", "ruzgar"]], "Uçan kuş.")
    add("bocek", ["yasam", "cimen"], [["yasam", "cimen", "toprak"]], "Küçük böcek.")
    add("surungen", ["hayvan", "kum"], [["hayvan", "kum", "tas"]], "Pullu sürüngen.")
    add("kurbaga", ["hayvan", "camur"], [["hayvan", "camur", "su"]], "Yeşil kurbağa.")
    add("bat", ["kus", "magara"], [["kus", "magara", "yasam"]], "Karanlık mağaralarda yaşayan uçan yarasa.")
    add("beaver", ["hayvan", "odun"], [["hayvan", "odun", "nehir"]], "Nehirlerde baraj kuran kunduz.")
    add("boar", ["hayvan", "orman"], [["hayvan", "orman", "toprak"]], "Ormanlarda yaşayan yaban domuzu.")
    add("caterpillar", ["bocek", "yaprak"], [["bocek", "yaprak", "cimen"]], "Yaprak yiyen tırtıl.")
    add("crayfish", ["bocek", "nehir"], [["bocek", "nehir", "tas"]], "Tatlı su kereviti.")
    add("crow", ["kus", "tas"], [["kus", "tas", "agac"]], "Zeki siyah karga.")
    add("cuckoo", ["kus", "orman"], [["kus", "orman", "agac"]], "Orman guguk kuşu.")
    add("elephant", ["hayvan", "tepe"], [["hayvan", "tepe", "orman"]], "Devasa fil.")
    add("firefly", ["bocek", "isik"], [["bocek", "isik", "ates"]], "Işık saçan ateşböceği.")
    add("flamingo", ["kus", "gol"], [["kus", "gol", "su"]], "Zarif pembe flamingo.")
    add("flying_fish", ["balik", "hava"], [["balik", "hava", "ruzgar"]], "Süzülen uçan balık.")
    add("fox", ["hayvan", "cali"], [["hayvan", "cali", "orman"]], "Kızıl orman tilkisi.")
    add("giraffe", ["hayvan", "agac"], [["hayvan", "agac", "bozkir"]], "Uzun boyunlu zürafa.")
    add("hedgehog", ["hayvan", "kiymik"], [["hayvan", "kiymik", "cali"]], "Dikenli kirpi.")
    add("kangaroo", ["hayvan", "bozkir"], [["hayvan", "bozkir", "toprak"]], "Keseli kanguru.")

    # Tarım ve Meyve
    add("meyve", ["cicek", "agac"], [["cicek", "agac", "gunes"]], "Tatlı meyve.")
    add("bugday", ["cimen", "tohum"], [["cimen", "tohum", "gunes"]], "Buğday başağı.")
    add("pamuk", ["bitki", "bulut"], [["bitki", "bulut", "tohum"]], "Lifli pamuk.")
    add("bambu", ["cimen", "agac"], [["cimen", "agac", "su"]], "Bambu kamışı.")
    add("sarmasik", ["bitki", "agac"], [["bitki", "agac", "orman"]], "Tırmanıcı sarmaşık.")
    add("kaktus", ["bitki", "kum"], [["bitki", "kum", "col"]], "Çöl kaktüsü.")
    add("mantar", ["camur", "yosun"], [["camur", "yosun", "orman"]], "Orman mantarı.")
    add("palmiye", ["agac", "kum"], [["agac", "kum", "vaha"]], "Tropik palmiye.")

    # =========================================================================
    # KATMAN 5: TEKNOLOJİ, BİLGİSAYAR & KURAL 7 (ROBOT)
    # =========================================================================
    add("alet", ["odun", "tas"], [["odun", "tas", "i_nsan"]], "Temel el aleti.")
    add("balta", ["alet", "odun"], [["alet", "odun", "tas"]], "Odun baltası.")
    add("kazma", ["alet", "tas"], [["alet", "tas", "maden"]], "Madenci kazması.")
    add("bicak", ["alet", "metal"], [["alet", "metal", "tas"]], "Keskin bıçak.")
    add("cekic", ["alet", "demir"], [["alet", "demir", "odun"]], "Ağır çekiç.")
    add("kurek", ["alet", "toprak"], [["alet", "toprak", "odun"]], "Toprak küreği.")
    add("testere", ["alet", "celik"], [["alet", "celik", "odun"]], "Odun testeresi.")
    add("ors", ["demir", "tas"], [["demir", "tas", "ates"]], "Demirci örsü.")
    add("kilic", ["celik", "ates"], [["celik", "ates", "alet"]], "Savaş kılıcı.")
    add("mizrak", ["odun", "bicak"], [["odun", "bicak", "metal"]], "Uzun mızrak.")
    add("kalkan", ["odun", "demir"], [["odun", "demir", "alet"]], "Savunma kalkanı.")
    add("zirh", ["celik", "demir"], [["celik", "demir", "i_nsan"]], "Savaş zırhı.")
    add("migfer", ["demir", "ates"], [["demir", "ates", "alet"]], "Metal miğfer.")
    add("pusula", ["demir", "cam"], [["demir", "cam", "miknatis"]], "Yön gösteren pusula.")
    
    # Motor, Bilgisayar ve Robot
    add("elektrik_motoru", ["demir", "elektrik"], [["demir", "elektrik", "enerji"]], "Elektromekanik motor.")
    add("jenerator", ["elektrik_motoru", "enerji"], [["elektrik_motoru", "enerji", "demir"]], "Elektrik jeneratörü.")
    add("bilgisayar", ["elektrik", "cam"], [["elektrik", "cam", "metal"]], "Elektronik bilgisayar.")
    
    # KURAL 7: Bilgisayar + Demir = Robot
    add("robot", ["bilgisayar", "demir"], [["bilgisayar", "demir", "elektrik"]], "Programlanabilir mekanik robot.")
    add("yapay_zeka", ["bilgisayar", "i_nsan"], [["bilgisayar", "i_nsan", "elektrik"]], "Yapay zeka zihni.")
    add("zaman", ["kum", "cam"], [["kum", "cam", "gunes"]], "Kum saati ve güneşle akan zaman.")

    # Kalan Katman 5-8 Spesifik Öğeler
    add("karpuz", ["meyve", "su"], [["tohum", "su", "toprak"]], "İçi sulu tatlı dev kırmızı karpuz.")
    add("elma", ["meyve", "agac"], [["meyve", "agac", "gunes"]], "Çıtır tatlı elma.")
    add("portakal", ["meyve", "gunes"], [["meyve", "gunes", "agac"]], "Turuncu sulu narenciye.")
    add("limon", ["meyve", "asit_yagmuru"], [["meyve", "asit_yagmuru", "gunes"]], "Ekşi sarı limon.")
    add("cilek", ["meyve", "cimen"], [["meyve", "cimen", "tohum"]], "Kırmızı kokulu çilek.")
    add("uzum", ["meyve", "sarmasik"], [["meyve", "sarmasik", "gunes"]], "Salkım salkım üzüm.")
    add("muz", ["meyve", "bambu"], [["meyve", "bambu", "gunes"]], "Tatlı sarı muz.")
    add("armut", ["meyve", "agac_kabugu"], [["meyve", "agac_kabugu", "agac"]], "Sulu tatlı armut.")
    add("domates", ["meyve", "toprak"], [["meyve", "toprak", "gunes"]], "Kırmızı domates.")
    add("patates", ["kok", "toprak"], [["kok", "toprak", "camur"]], "Nişastalı patates.")
    add("havuc", ["kok", "cimen"], [["kok", "cimen", "toprak"]], "Turuncu havuç.")
    add("sogan", ["kok", "su"], [["kok", "su", "toprak"]], "Keskin kokulu soğan.")
    add("sarimsak", ["sogan", "toprak"], [["sogan", "toprak", "gunes"]], "Şifalı sarımsak.")
    add("zeytin", ["agac", "tohum"], [["agac", "tohum", "gunes"]], "Şifalı zeytin.")
    add("findik", ["agac", "tas"], [["agac", "tas", "tohum"]], "Sert kabuklu fındık.")
    add("badem", ["agac", "cicek"], [["agac", "cicek", "tohum"]], "Besleyici badem.")
    add("ceviz", ["agac", "odun"], [["agac", "odun", "tohum"]], "Sert kabuklu ceviz.")
    add("gul", ["cicek", "ates"], [["cicek", "ates", "bitki"]], "Kırmızı dikenli gül.")
    add("lale", ["cicek", "ruzgar"], [["cicek", "ruzgar", "toprak"]], "Zarif lale.")
    add("papatya", ["cicek", "gunes"], [["cicek", "gunes", "cimen"]], "Beyaz papatya.")
    add("nilufer", ["cicek", "su"], [["cicek", "su", "deniz"]], "Nilüfer çiçeği.")
    add("cay", ["yaprak", "buhar"], [["yaprak", "buhar", "su"]], "Demlenmiş çay.")
    add("kahve", ["tohum", "ates"], [["tohum", "ates", "su"]], "Kavrulmuş kahve.")
    add("tutun", ["yaprak", "ates"], [["yaprak", "ates", "duman"]], "Kurutulmuş tütün.")
    add("baharat", ["tohum", "ates"], [["tohum", "ates", "tuz"]], "Aromatik baharat.")
    add("baharat_cesnisi", ["baharat", "tuz"], [["baharat", "tuz", "tohum"]], "Baharat çeşnisi.")
    add("nane", ["yaprak", "ruzgar"], [["yaprak", "ruzgar", "su"]], "Ferahlatıcı nane.")

    add("lif", ["pamuk", "ruzgar"], [["pamuk", "ruzgar", "bitki"]], "Doğal lif.")
    add("i_p", ["lif", "lif"], [["lif", "lif", "alet"]], "Bağlama ipi.")
    add("i_plik", ["i_p", "i_p"], [["i_p", "i_p", "lif"]], "Dikiş ipliği.")
    add("kumas", ["i_p", "pamuk"], [["i_p", "pamuk", "alet"]], "Dokunmuş kumaş.")
    add("kiyafet", ["kumas", "i_nsan"], [["kumas", "i_nsan", "i_plik"]], "Giyilebilir kıyafet.")
    add("yay", ["odun", "i_p"], [["odun", "i_p", "alet"]], "Ok yayı.")
    add("ok", ["odun", "kiymik"], [["odun", "kiymik", "yay"]], "Sivri ok.")
    add("olta", ["i_p", "bicak"], [["i_p", "bicak", "odun"]], "Balık oltası.")
    add("civi", ["demir", "cekic"], [["demir", "cekic", "ates"]], "Metal çivi.")
    add("vida", ["civi", "celik"], [["civi", "celik", "alet"]], "Vidalı parça.")
    add("kilit", ["demir", "civi"], [["demir", "civi", "celik"]], "Metal kilit.")
    add("anahtar", ["demir", "alet"], [["demir", "alet", "kilit"]], "Kilit anahtarı.")
    add("halat", ["i_p", "lif"], [["i_p", "i_p", "i_p"]], "Çekme halatı.")
    add("demir_parmaklik", ["demir", "demir"], [["demir", "demir", "celik"]], "Demir parmaklık.")
    add("demir_kalkan", ["kalkan", "demir"], [["kalkan", "demir", "celik"]], "Demir kalkan.")
    add("ahsap_kalkan", ["kalkan", "odun"], [["kalkan", "odun", "tas"]], "Ahşap kalkan.")

    # Canlılar
    add("ari", ["bocek", "cicek"], [["bocek", "cicek", "gunes"]], "Bal arısı.")
    add("bal", ["ari", "cicek"], [["ari", "cicek", "gunes"]], "Tatlı bal.")
    add("kelebek", ["bocek", "isik"], [["bocek", "isik", "cicek"]], "Renkli kelebek.")
    add("karinca", ["bocek", "toprak"], [["bocek", "toprak", "tohum"]], "Karınca.")
    add("orumcek", ["bocek", "i_p"], [["bocek", "i_p", "orman"]], "Örümcek.")
    add("akrep", ["bocek", "kum"], [["bocek", "kum", "tas"]], "Çöl akrebi.")
    add("sinek", ["bocek", "hava"], [["bocek", "hava", "yasam"]], "Vızıltılı sinek.")
    add("i_pekbocegi", ["bocek", "yaprak"], [["bocek", "yaprak", "agac"]], "İpekböceği.")
    add("i_pek", ["i_pekbocegi", "yaprak"], [["i_pekbocegi", "yaprak", "alet"]], "Saf ipek.")
    add("kemik", ["hayvan", "toprak"], [["hayvan", "toprak", "tas"]], "Kemik.")
    add("deri", ["hayvan", "alet"], [["hayvan", "alet", "bicak"]], "Hayvan derisi.")
    add("et", ["hayvan", "bicak"], [["hayvan", "bicak", "ates"]], "Taze et.")
    add("kavrulmus_et", ["et", "ates"], [["et", "ates", "tuz"]], "Pişmiş et.")
    add("balik_eti", ["balik", "bicak"], [["balik", "bicak", "tuz"]], "Balık eti.")
    add("i_nek", ["hayvan", "cimen"], [["hayvan", "cimen", "toprak"]], "Sütçü inek.")
    add("sut", ["i_nek", "su"], [["i_nek", "su", "cimen"]], "Taze süt.")
    add("peynir", ["sut", "tuz"], [["sut", "tuz", "bakteri"]], "Mayalı peynir.")
    add("yogurt", ["sut", "bakteri"], [["sut", "bakteri", "ates"]], "Geleneksel yoğurt.")
    add("tereyagi", ["sut", "enerji"], [["sut", "enerji", "tuz"]], "Tereyağı.")
    add("koyun", ["hayvan", "bulut"], [["hayvan", "bulut", "cimen"]], "Yünlü koyun.")
    add("yun", ["koyun", "alet"], [["koyun", "alet", "bicak"]], "Doğal yün.")
    add("at", ["hayvan", "ruzgar"], [["hayvan", "ruzgar", "cimen"]], "Binek atı.")
    add("kurt", ["hayvan", "orman"], [["hayvan", "orman", "dag"]], "Vahşi kurt.")
    add("kopek", ["kurt", "i_nsan"], [["kurt", "i_nsan", "et"]], "Evcil köpek.")
    add("kedi", ["hayvan", "sut"], [["hayvan", "sut", "i_nsan"]], "Evcil kedi.")
    add("ayi", ["hayvan", "balik"], [["hayvan", "balik", "orman"]], "Boz ayı.")
    add("aslan", ["hayvan", "gunes"], [["hayvan", "gunes", "orman"]], "Kral aslan.")
    add("maymun", ["hayvan", "agac"], [["hayvan", "agac", "orman"]], "Orman maymunu.")
    add("kus_tuyu", ["kus", "ruzgar"], [["kus", "ruzgar", "hava"]], "Kuş tüyü.")
    add("kartal", ["kus", "dag"], [["kus", "dag", "ruzgar"]], "Yırtıcı kartal.")
    add("baykus", ["kus", "orman"], [["kus", "orman", "isik"]], "Gece baykuşu.")
    add("penguen", ["kus", "buz"], [["kus", "buz", "deniz"]], "Kutup pengueni.")
    add("ahtapot", ["balik", "yosun"], [["balik", "yosun", "deniz"]], "Sekiz kollu ahtapot.")
    add("denizanasi", ["balik", "su"], [["balik", "su", "isik"]], "Şeffaf denizanası.")
    add("kopekbaligi", ["balik", "et"], [["balik", "et", "deniz"]], "Köpekbalığı.")
    add("balina", ["balik", "okyanus"], [["balik", "okyanus", "deniz"]], "Dev balina.")
    add("yunus", ["balik", "enerji"], [["balik", "enerji", "okyanus"]], "Deniz yunusu.")
    add("yilan", ["surungen", "cimen"], [["surungen", "cimen", "orman"]], "Kıvrılan yılan.")
    add("timsah", ["surungen", "nehir"], [["surungen", "nehir", "camur"]], "Nehir timsahı.")
    add("kaplumbaga", ["surungen", "tas"], [["surungen", "tas", "deniz"]], "Kaplumbağa.")
    add("bukalemun", ["surungen", "isik"], [["surungen", "isik", "orman"]], "Bukalemun.")
    add("dinozor", ["surungen", "fosil"], [["surungen", "fosil", "toprak"]], "Tarih öncesi dev dinozor.")

    # Mutfak ve Gıda
    add("un", ["bugday", "tas"], [["bugday", "tas", "ruzgar"]], "Öğütülmüş un.")
    add("hamur", ["un", "su"], [["un", "su", "tuz"]], "Ekmek hamuru.")
    add("ekmek", ["hamur", "ates"], [["hamur", "ates", "un"]], "Taze ekmek.")
    add("makarna", ["hamur", "su"], [["hamur", "su", "tuz"]], "Makarna.")
    add("pasta", ["hamur", "bal"], [["hamur", "bal", "sut"]], "Kremalı pasta.")
    add("kurabiye", ["hamur", "meyve"], [["hamur", "meyve", "ates"]], "Kıtır kurabiye.")
    add("seker", ["bitki", "ates"], [["bitki", "ates", "gunes"]], "Kristal şeker.")
    add("cikolata", ["tohum", "seker"], [["tohum", "seker", "sut"]], "Kakao çikolatası.")
    add("zeytinyagi", ["zeytin", "tas"], [["zeytin", "tas", "su"]], "Saf zeytinyağı.")
    add("meyve_suyu", ["meyve", "su"], [["meyve", "su", "seker"]], "Taze meyve suyu.")
    add("alkol", ["meyve", "bakteri"], [["meyve", "bakteri", "ates"]], "Meyve alkolü.")
    add("sarap", ["uzum", "alkol"], [["uzum", "alkol", "agac"]], "Kırmızı şarap.")
    add("bira", ["bugday", "alkol"], [["bugday", "alkol", "su"]], "Arpa birası.")
    add("sirke", ["sarap", "hava"], [["sarap", "hava", "bakteri"]], "Mayalı sirke.")
    add("acorn", ["tohum", "orman"], [["tohum", "orman", "agac"]], "Meşe palamudu tohumu.")
    add("baobab", ["agac", "col"], [["agac", "col", "gunes"]], "Geniş gövdeli baobab ağacı.")
    add("berry", ["meyve", "cali"], [["meyve", "cali", "orman"]], "Yabani böğürtlen meyvesi.")
    add("cacao", ["tohum", "palmiye"], [["tohum", "palmiye", "gunes"]], "Kakao çekirdeği.")
    add("coconut", ["palmiye", "meyve"], [["palmiye", "meyve", "kum"]], "Tropik hindistan cevizi.")
    add("sunflower", ["cicek", "gunes"], [["cicek", "gunes", "tohum"]], "Sarı ayçiçeği.")
    add("candy", ["seker", "meyve"], [["seker", "meyve", "ates"]], "Meyveli tatlı şekerleme.")
    add("caramel", ["seker", "ates"], [["seker", "ates", "sut"]], "Kızarmış karamel şekeri.")
    add("canned_food", ["et", "metal"], [["et", "metal", "tuz"]], "Metal kutuda konserve gıda.")
    add("toast", ["ekmek", "ates"], [["ekmek", "ates", "peynir"]], "Kızarmış çıtır tost ekmeği.")
    add("sandwich", ["ekmek", "peynir"], [["ekmek", "peynir", "et"]], "Lezzetli sandviç.")
    add("champagne", ["sarap", "bubble"], [["sarap", "bubble", "cam"]], "Köpüklü kutlama şampanyası.")
    add("barrel", ["odun", "demir"], [["odun", "demir", "sarap"]], "Depolama ahşap fıçısı.")
    add("bouquet", ["cicek", "cicek"], [["cicek", "cicek", "cicek"]], "Rengarenk çiçek buketi.")
    add("box", ["odun", "odun"], [["odun", "odun", "alet"]], "Eşya saklama kutusu.")
    add("balloon", ["hava", "kumas"], [["hava", "kumas", "i_p"]], "Renkli uçan balon.")
    add("bandage", ["kumas", "i_nsan"], [["kumas", "i_nsan", "alet"]], "Tıbbi yara bandajı.")
    add("boomerang", ["odun", "kus"], [["odun", "kus", "alet"]], "Avcı bumerangı.")
    add("broom", ["odun", "cali"], [["odun", "cali", "i_p"]], "Çalı süpürgesi.")
    add("brush", ["odun", "yun"], [["odun", "yun", "alet"]], "Ressam fırçası.")
    add("bucket", ["demir", "kutu"], [["demir", "kutu", "su"]], "Metal su kovası.")
    add("comb", ["kemik", "alet"], [["kemik", "alet", "i_nsan"]], "Kemik tarak.")
    add("fan", ["elektrik_motoru", "ruzgar"], [["elektrik_motoru", "ruzgar", "demir"]], "Masaüstü vantilatör.")
    add("antenna", ["metal", "radyo"], [["metal", "radyo", "elektrik"]], "İletişim anteni.")
    add("binoculars", ["cam", "teleskop"], [["cam", "teleskop", "metal"]], "Çift gözlü dürbün.")
    add("flashlight", ["cam", "isik"], [["cam", "isik", "pil"]], "Pilli el feneri.")
    add("flask", ["metal", "deri"], [["metal", "deri", "su"]], "Yolcu matarası.")
    add("glasses", ["cam", "cam"], [["cam", "cam", "metal"]], "Okuma gözlüğü.")
    add("grenade", ["barut", "metal"], [["barut", "metal", "ates"]], "Parça tesirli el bombası.")
    add("matches", ["odun", "kukurt"], [["odun", "kukurt", "ates"]], "Kibrit çöpü.")
    add("alien", ["yasam", "meteor"], [["yasam", "meteor", "uzay"]], "Uzaylı varlık.")
    add("baby", ["i_nsan", "zaman"], [["i_nsan", "zaman", "sevgi"]], "Sevimli bebek.")
    add("blood", ["i_nsan", "bicak"], [["i_nsan", "bicak", "et"]], "Yaşamsal kan.")
    add("brain", ["i_nsan", "elektrik"], [["i_nsan", "elektrik", "enerji"]], "İnsan beyni.")
    add("dna", ["yasam", "atom"], [["yasam", "atom", "enerji"]], "Genetik DNA zinciri.")
    add("skeleton", ["kemik", "kemik"], [["kemik", "kemik", "kemik"]], "Kemik iskelet.")
    add("mummy", ["i_nsan", "bandage"], [["i_nsan", "bandage", "piramit"]], "Sargılı mumya.")
    add("knight", ["i_nsan", "zirh"], [["i_nsan", "zirh", "kilic"]], "Zırhlı şövalye.")
    add("pirate", ["i_nsan", "yelkenli"], [["i_nsan", "yelkenli", "deniz"]], "Deniz korsanı.")
    add("soldier", ["i_nsan", "tufek"], [["i_nsan", "tufek", "zirh"]], "Silahlı asker.")
    add("spy", ["i_nsan", "glasses"], [["i_nsan", "glasses", "sehir"]], "Gizli casus.")
    add("firefighter", ["i_nsan", "bucket"], [["i_nsan", "bucket", "ates"]], "Kahraman itfaiyeci.")
    add("scarecrow", ["kumas", "cali"], [["kumas", "cali", "kus"]], "Tarla korkuluğu.")
    add("snowman", ["kar", "i_nsan"], [["kar", "i_nsan", "havuc"]], "Kardan adam.")
    add("pinocchio", ["odun", "yasam"], [["odun", "yasam", "i_nsan"]], "Canlı tahta kukla Pinokyo.")

    # Yapı, Şehir, Medeniyet
    add("ev", ["odun", "tugla_duvar"], [["odun", "tugla_duvar", "i_nsan"]], "Sıcak yuva ev.")
    add("cadir", ["kumas", "odun"], [["kumas", "odun", "i_p"]], "Kumaş çadır.")
    add("yatak", ["kumas", "yun"], [["kumas", "yun", "odun"]], "Yumuşak yatak.")
    add("mobilya", ["odun", "alet"], [["odun", "alet", "civi"]], "Ahşap mobilya.")
    add("kutu", ["odun", "civi"], [["odun", "civi", "alet"]], "Ahşap kutu.")
    add("saglam_sandik", ["kutu", "demir"], [["kutu", "demir", "kilit"]], "Kilitli sandık.")
    add("hazine", ["saglam_sandik", "altin"], [["saglam_sandik", "altin", "elmas"]], "Altın hazinesi.")
    add("altin_sikke", ["altin", "ates"], [["altin", "ates", "cekic"]], "Ticaret sikkesi.")
    add("pazar", ["i_nsan", "altin_sikke"], [["i_nsan", "altin_sikke", "ev"]], "Alışveriş pazarı.")
    add("koy", ["ev", "cimen"], [["ev", "cimen", "i_nsan"]], "Köy yerleşimi.")
    add("sehir", ["ev", "ev"], [["ev", "ev", "i_nsan"]], "Gelişmiş şehir.")
    add("kale", ["tas", "tugla_duvar"], [["tas", "tugla_duvar", "demir"]], "Savunma kalesi.")
    add("kule", ["kale", "tas"], [["kale", "tas", "ruzgar"]], "Gözetleme kulesi.")
    add("sur", ["kale", "toprak"], [["kale", "toprak", "tas"]], "Şehir surları.")
    add("saray", ["kale", "altin"], [["kale", "altin", "mermer"]], "Hükümdar sarayı.")
    add("tapinak", ["mermer", "isik"], [["mermer", "isik", "i_nsan"]], "İbadet tapınağı.")
    add("anit", ["tas", "i_nsan"], [["tas", "i_nsan", "mermer"]], "Taş anıt.")
    add("muze", ["ev", "fosil"], [["ev", "fosil", "anit"]], "Sanat ve tarih müzesi.")
    add("yol", ["tas", "kum"], [["tas", "kum", "toprak"]], "Taş yol.")
    add("kopru", ["odun", "nehir"], [["odun", "nehir", "tas"]], "Nehir köprüsü.")
    add("degirmen", ["odun", "ruzgar"], [["odun", "ruzgar", "bugday"]], "Rüzgar değirmeni.")
    add("su_degirmeni", ["degirmen", "nehir"], [["degirmen", "nehir", "su"]], "Su değirmeni.")
    add("liman", ["deniz", "ev"], [["deniz", "ev", "odun"]], "Liman.")
    add("denizfeneri", ["kule", "isik"], [["kule", "isik", "deniz"]], "Deniz feneri.")
    add("tunel", ["dag", "kazma"], [["dag", "kazma", "yol"]], "Dağ tüneli.")
    add("igloo", ["buz", "ev"], [["buz", "ev", "kar"]], "Kutup iglosu.")
    add("skyscraper", ["sehir", "cam"], [["sehir", "cam", "celik"]], "Modern gökdelen.")
    add("fountain", ["su", "anit"], [["su", "anit", "sehir"]], "Şehir fıskiyesi.")
    add("grave", ["toprak", "kemik"], [["toprak", "kemik", "tas"]], "Taş mezar.")
    add("labyrinth", ["sur", "yol"], [["sur", "yol", "tas"]], "Karmaşık labirent.")
    add("bonfire", ["odun", "alev"], [["odun", "alev", "ates"]], "Kamp ateşi.")
    add("fireworks", ["barut", "isik"], [["barut", "isik", "hava"]], "Kutlama havai fişeği.")
    add("gasoline", ["petrol", "ates"], [["petrol", "ates", "enerji"]], "Rafine benzin yakıtı.")
    add("black_hole", ["meteor", "basinc"], [["meteor", "basinc", "uzay"]], "Kozmik kara delik.")
    add("supernova", ["gunes", "enerji"], [["gunes", "enerji", "isik"]], "Kozmik süpernova patlaması.")
    add("crystal_ball", ["cam", "buyu"], [["cam", "buyu", "kristal"]], "Büyülü kristal küre.")
    add("centaur", ["i_nsan", "at"], [["i_nsan", "at", "orman"]], "Yarı insan yarı at kentaur.")
    add("cerberus", ["kopek", "lav"], [["kopek", "lav", "ates"]], "Üç başlı cehennem köpeği Kerberos.")
    add("hydra", ["yilan", "bataklik"], [["yilan", "bataklik", "su"]], "Çok başlı su ejderi Hidra.")
    add("giant", ["i_nsan", "dag"], [["i_nsan", "dag", "tas"]], "Devasa yaratık dev.")
    add("camel", ["hayvan", "col"], [["hayvan", "col", "kum"]], "Çöl devesi.")
    add("mouse", ["hayvan", "peynir"], [["hayvan", "peynir", "ev"]], "Peynir kurdu fare.")
    add("pig", ["hayvan", "camur"], [["hayvan", "camur", "cimen"]], "Çiftlik domuzu.")
    add("reindeer", ["hayvan", "kar"], [["hayvan", "kar", "tundra"]], "Kutup ren geyiği.")
    add("snail", ["bocek", "camur"], [["bocek", "camur", "yagmur"]], "Kabuklu salyangoz.")
    add("squid", ["ahtapot", "okyanus"], [["ahtapot", "okyanus", "derinlik"]], "Derin deniz mürekkepbalığı.")
    add("vulture", ["kus", "col"], [["kus", "col", "et"]], "Çöl akbabası.")
    add("scarab", ["bocek", "kum"], [["bocek", "kum", "piramit"]], "Mısır böceği skarabe.")
    add("nest", ["kus", "branch"], [["kus", "branch", "agac"]], "Kuş yuvası.")
    add("birdhouse", ["ev", "kus"], [["ev", "kus", "odun"]], "Bahçe kuş evi.")
    add("sponge", ["algae", "kum"], [["algae", "kum", "deniz"]], "Deniz süngeri.")
    add("fence", ["odun", "koy"], [["odun", "koy", "civi"]], "Ahşap bahçe çiti.")
    add("incubator", ["kus", "lamba"], [["kus", "lamba", "elektrik"]], "Kuluçka makinesi.")
    add("vase", ["camur", "cicek"], [["camur", "cicek", "ates"]], "Çiçek vazosu.")
    add("pillow", ["kumas", "kus_tuyu"], [["kumas", "kus_tuyu", "yatak"]], "Yumuşak uyku yastığı.")
    add("medicine", ["bitki", "i_ksir"], [["bitki", "i_ksir", "i_nsan"]], "Şifalı ilaç.")
    add("soap", ["kul", "zeytinyagi"], [["kul", "zeytinyagi", "su"]], "Temizleyici sabun.")
    add("perfume", ["cicek", "alkol"], [["cicek", "alkol", "su"]], "Hoş kokulu parfüm.")
    add("paint", ["cicek", "recine"], [["cicek", "recine", "su"]], "Renkli boya pigmenti.")
    add("glue", ["recine", "un"], [["recine", "un", "su"]], "Güçlü yapıştırıcı tutkal.")
    add("ring", ["altin", "elmas"], [["altin", "elmas", "metal"]], "Değerli altın yüzük.")
    add("medal", ["altin", "kumas"], [["altin", "kumas", "i_p"]], "Ödül madalyası.")
    add("letter", ["kagit", "kalem"], [["kagit", "kalem", "yazi"]], "Mühürlü mektup.")
    add("umbrella", ["kumas", "yagmur"], [["kumas", "yagmur", "metal"]], "Yağmur şemsiyesi.")
    add("raincoat", ["kiyafet", "yagmur"], [["kiyafet", "yagmur", "kumas"]], "Su geçirmez yağmurluk.")
    add("parachute", ["kumas", "hava"], [["kumas", "hava", "i_p"]], "Hava paraşütü.")
    add("fridge", ["metal", "buz"], [["metal", "buz", "elektrik"]], "Elektrikli buzdolabı.")
    add("vacuum", ["broom", "elektrik_motoru"], [["broom", "elektrik_motoru", "demir"]], "Elektrikli süpürge vakum.")
    add("toy", ["odun", "kumas"], [["odun", "kumas", "i_nsan"]], "Ahşap oyuncak.")
    add("pipe", ["odun", "tutun"], [["odun", "tutun", "ates"]], "Tütün piposu.")
    add("aluminium", ["metal", "hava"], [["metal", "hava", "ates"]], "Hafif alüminyum.")
    add("bitcoin", ["bilgisayar", "altin_sikke"], [["bilgisayar", "altin_sikke", "elektrik"]], "Kripto para Bitcoin.")
    add("calendar", ["zaman", "kagit"], [["zaman", "kagit", "gunes"]], "Zaman takvimi.")
    add("camouflage", ["kumas", "orman"], [["kumas", "orman", "asker"]], "Askeri kamuflaj deseni.")
    add("cardboard", ["kagit", "kagit"], [["kagit", "kagit", "kutu"]], "Mukavva karton.")
    add("chemical_waste", ["kukurt", "su"], [["kukurt", "su", "ates"]], "Zehirli kimyasal atık.")
    add("cross", ["altin", "tapinak"], [["altin", "tapinak", "isik"]], "Kutsal haç sembolü.")
    add("escalator", ["ev", "elektrik_motoru"], [["ev", "elektrik_motoru", "i_nsan"]], "Otomatik yürüyen merdiven.")
    add("explosive", ["barut", "ates"], [["barut", "ates", "kukurt"]], "Patlayıcı dinamit.")
    add("lamp", ["ampul", "metal"], [["ampul", "metal", "elektrik"]], "Masa lambası.")
    add("lasso", ["halat", "at"], [["halat", "at", "i_p"]], "Kovboy kemendi.")
    add("scuba", ["oksijen", "deniz"], [["oksijen", "deniz", "metal"]], "Sualtı dalış tüpü.")
    add("tank", ["araba", "zirh"], [["araba", "zirh", "tufek"]], "Zırhlı savaş tankı.")
    add("weapon", ["alet", "barut"], [["alet", "barut", "metal"]], "Askeri silah.")
    add("bit", ["bilgisayar", "elektrik"], [["bilgisayar", "elektrik", "isik"]], "Dijital bit verisi.")

    # Mistik & Evren
    add("buyu", ["enerji", "kristal"], [["enerji", "kristal", "isik"]], "Gizemli büyü gücü.")
    add("buyu_parsomeni", ["buyu", "kagit"], [["buyu", "kagit", "yazi"]], "Büyü yazılı parşömen.")
    add("i_ksir", ["su", "bitki"], [["su", "bitki", "buyu"]], "Şifalı simya iksiri.")
    add("felsefe_tasi", ["i_ksir", "altin"], [["i_ksir", "altin", "elmas"]], "Efsanevi felsefe taşı.")
    add("cin", ["hava", "ates"], [["hava", "ates", "buyu"]], "Dumansız ateşten doğan cin.")
    add("anka_kusu", ["kus", "ates"], [["kus", "ates", "kul"]], "Küllerinden doğan Anka kuşu.")
    add("anka_kulu", ["anka_kusu", "kul"], [["anka_kusu", "kul", "ates"]], "Kutsal anka külü.")

    # Ulaşım & Araçlar
    add("tekerlek", ["odun", "alet"], [["odun", "alet", "tas"]], "Dönen ahşap tekerlek.")
    add("araba", ["metal", "tekerlek"], [["metal", "tekerlek", "odun"]], "Dört tekerlekli araba.")
    add("tren", ["buhar", "demir"], [["buhar", "demir", "komur"]], "Raylarda giden buharlı tren.")
    add("tekne", ["odun", "su"], [["odun", "su", "alet"]], "Ahşap su teknesi.")
    add("gemi", ["tekne", "demir"], [["tekne", "demir", "deniz"]], "Büyük deniz gemisi.")
    add("yelkenli", ["tekne", "kumas"], [["tekne", "kumas", "ruzgar"]], "Rüzgarla giden yelkenli.")
    add("ucak", ["metal", "kus"], [["metal", "kus", "elektrik_motoru"]], "Gökyüzünde uçan uçak.")
    add("ayna", ["cam", "gumus"], [["cam", "gumus", "isik"]], "Işığı yansıtan ayna.")

    # =========================================================================
    # OTOMATİK ÇÖZÜMLEME DÖNGÜSÜ: KALAN TÜM EŞYALARI SEMANTİK KURALLARLA ÇÖZ
    # =========================================================================
    round_num = 0
    while True:
        unresolved = [k for k in b.all_keys if k not in b.reachable]
        if not unresolved:
            break
        
        round_num += 1
        added_in_round = 0
        
        for k in unresolved:
            candidate_pairs = []
            cat = all_items_data.get(k, {}).get("category", "")
            
            # Zanaat ve Aletler
            if "alet" in cat or "zanaat" in cat:
                for base1 in ["alet", "demir", "celik", "odun", "tas", "cam", "kumas", "i_p"]:
                    for base2 in ["ates", "su", "toprak", "hava", "enerji", "isik", "i_nsan", "civi", "bicak", "cekic"]:
                        if base1 in b.reachable and base2 in b.reachable and base1 != base2:
                            candidate_pairs.append((base1, base2))
                            
            # Doğa ve Canlılar
            elif "doga" in cat or "canli" in cat:
                for base1 in ["hayvan", "kus", "balik", "bocek", "bitki", "agac", "cicek", "yosun", "su", "toprak"]:
                    for base2 in ["orman", "deniz", "dag", "ruzgar", "gunes", "isik", "buz", "tas"]:
                        if base1 in b.reachable and base2 in b.reachable and base1 != base2:
                            candidate_pairs.append((base1, base2))
                            
            # Bilim ve Teknoloji
            elif "bilim" in cat or "teknoloji" in cat:
                for base1 in ["elektrik", "metal", "celik", "cam", "enerji", "alet", "isik"]:
                    for base2 in ["yildirim", "hava", "i_nsan", "ates"]:
                        if base1 in b.reachable and base2 in b.reachable and base1 != base2:
                            candidate_pairs.append((base1, base2))
                            
            # Mistik ve Evren
            elif "mistik" in cat or "evren" in cat:
                for base1 in ["enerji", "isik", "kristal", "altin"]:
                    for base2 in ["ates", "su", "toprak", "hava", "elmas"]:
                        if base1 in b.reachable and base2 in b.reachable and base1 != base2:
                            candidate_pairs.append((base1, base2))
            
            # Genel Havuz (Genelden Özele son eklenen kavramları tara)
            pool = list(b.reachable)
            pool.reverse()
            for p1 in pool[:60]:
                for p2 in pool[:60]:
                    if p1 != p2:
                        candidate_pairs.append((p1, p2))

            # Adaylardan kullanılmamış ilk çifti seç
            for pa, pb in candidate_pairs:
                if add(k, [pa, pb], None, all_items_data.get(k, {}).get("description", "")):
                    added_in_round += 1
                    break

    # =========================================================================
    # GRANDMASTER 3'LÜ TARİFLERİ (Collision-Free Otomatik Türetim)
    # =========================================================================
    for item_id, meta in b.recipes.items():
        if not meta["trioRecipes"]:
            inp_a, inp_b = meta["inputs"]
            trio_candidates = []
            
            if inp_a in b.recipes:
                a1, a2 = b.recipes[inp_a]["inputs"]
                trio_candidates.append([a1, a2, inp_b])
            if inp_b in b.recipes:
                b1, b2 = b.recipes[inp_b]["inputs"]
                trio_candidates.append([inp_a, b1, b2])
            for cat in BASE_ELEMENTS:
                trio_candidates.append([inp_a, inp_b, cat])

            for tc in trio_candidates:
                if len(tc) == 3 and tc[0] in b.reachable and tc[1] in b.reachable and tc[2] in b.reachable:
                    tkey = b.trio_key(tc[0], tc[1], tc[2])
                    if tkey not in b.used_trios:
                        b.used_trios[tkey] = item_id
                        meta["trioRecipes"].append(tc)
                        break

    # =========================================================================
    # DOĞRULAMA VE İSTATİSTİKLER
    # =========================================================================
    print("=" * 60)
    print(f"SONUÇ: Toplam Tanımlanan Eşya: {len(b.recipes) + len(BASE_ELEMENTS)} / {len(b.all_keys)}")
    print(f"Toplam 2'li Benzersiz Formül Sayısı: {len(b.used_pairs)}")
    print(f"Çakışma Sayısı: 0 (%100 Collision-Free)")
    
    G = nx.DiGraph()
    for elem in BASE_ELEMENTS:
        G.add_node(elem)
    for item_id, meta in b.recipes.items():
        G.add_node(item_id)
        for inp in meta["inputs"]:
            G.add_edge(inp, item_id)

    is_dag = nx.is_directed_acyclic_graph(G)
    print(f"Directed Acyclic Graph (DAG) Doğrulaması: {'BAŞARILI (Döngüsüz)' if is_dag else 'BAŞARISIZ'}")
    
    reachable_nodes = set(BASE_ELEMENTS)
    for elem in BASE_ELEMENTS:
        reachable_nodes.update(nx.descendants(G, elem))
    print(f"4 Elementten Erişilebilen Eşya Sayısı: {len(reachable_nodes)} / {len(b.all_keys)}")

    # =========================================================================
    # JSON VE JS DOSYALARINA SENKRONİZASYON
    # =========================================================================
    tree_export = {
        "metadata": {
            "version": "2.1.0",
            "total_items": len(b.all_keys),
            "base_elements": ["Ateş", "Su", "Toprak", "Hava"],
            "is_collision_free": True,
            "is_strict_dag": is_dag
        },
        "recipes_by_result": {}
    }
    for item_id, meta in b.recipes.items():
        item_name = all_items_data.get(item_id, {}).get("name", item_id.replace("_", " ").title())
        inp_names = [all_items_data.get(x, {}).get("name", x.replace("_", " ").title()) for x in meta["inputs"]]
        tree_export["recipes_by_result"][item_name] = {
            "inputs": inp_names,
            "tier": meta["tier"],
            "description": meta["desc"],
            "color_palette": all_items_data.get(item_id, {}).get("colorPalette", {}),
            "archetype_3d": all_items_data.get(item_id, {}).get("archetype3d", "mineral"),
            "category": all_items_data.get(item_id, {}).get("category", "01_elements")
        }
    
    with open(TREE_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(tree_export, f, ensure_ascii=False, indent=2)
    print(f"BAŞARILI: '{TREE_JSON_PATH}' dosyası güncellendi.")

    updated_defs = {}
    for item_id in b.all_keys:
        item_raw = all_items_data.get(item_id, {})
        rec = b.recipes.get(item_id, None)
        
        recipe_val = {"inputs": rec["inputs"]} if rec else None
        trio_val = rec.get("trioRecipes", []) if rec else []
        tier_val = rec.get("tier", 1) if rec else 1

        updated_defs[item_id] = {
            "id": item_id,
            "name": item_raw.get("name", item_id.title()),
            "description": item_raw.get("description", ""),
            "tier": tier_val,
            "colorPalette": item_raw.get("colorPalette", {"primary": "#64748b", "secondary": "#94a3b8", "emissive": "#1e293b"}),
            "particles": item_raw.get("particles", {"type": "spark", "color": "#ffffff", "count": 8}),
            "recipe": recipe_val,
            "icon": item_raw.get("icon", "✨"),
            "category": item_raw.get("category", "01_elements"),
            "archetype3d": item_raw.get("archetype3d", "mineral"),
            "trioRecipes": trio_val
        }

    js_lines = [
        "/**",
        " * Auto-generated and synchronized Item Definitions with Multi-Mode Support",
        f" * Total items: {len(updated_defs)}",
        " * 100% Collision-Free & Strict Hierarchical DAG",
        " */",
        "",
        "export const ITEM_DEFINITIONS = {"
    ]
    for item_id, def_data in updated_defs.items():
        js_lines.append(f"  {json.dumps(item_id)}: {json.dumps(def_data, ensure_ascii=False, indent=4).replace(chr(10), chr(10) + '  ')},")
    js_lines.append("};")
    js_lines.append("")
    js_lines.append("export function getCanonicalId(id) {")
    js_lines.append("  if (!id) return id;")
    js_lines.append("  return id.toLowerCase().trim();")
    js_lines.append("}")
    js_lines.append("")

    with open(ITEMS_JS_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(js_lines))
    print(f"BAŞARILI: '{ITEMS_JS_PATH}' dosyası güncellendi.")

if __name__ == "__main__":
    run_build()
