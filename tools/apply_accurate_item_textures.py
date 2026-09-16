"""
Birleştirme Oyunu - Doğrulanmış Görsel ve Eşya Eşleştirme Sistemi
------------------------------------------------------------------
Her bir sheet'teki hücrelerin manuel ve görsel denetim sonuçlarına göre
doğru eşya ID'lerine tam ve cerrahi olarak atanmasını sağlar.
"""

import os
import shutil
from pathlib import Path
from PIL import Image

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
DEBUG_SHEETS_DIR = WORKSPACE_DIR / "tools" / "debug_sheets"
OUTPUT_ITEMS_DIR = WORKSPACE_DIR / "public" / "textures" / "items"

OUTPUT_ITEMS_DIR.mkdir(parents=True, exist_ok=True)

# Format: target_item_id: (sheet_folder_name, cell_number)
EXACT_MAPPINGS = {
    # sheet_01_02_doga (Tümü doğrulanmış 1-15)
    "ahtapot": ("sheet_01_02_doga", 1),
    "akrep": ("sheet_01_02_doga", 2),
    "aku": ("sheet_01_02_doga", 3),
    "asa": ("sheet_01_02_doga", 4),
    "ayi": ("sheet_01_02_doga", 5),
    "baharat": ("sheet_01_02_doga", 6),
    "baharat_cesnisi": ("sheet_01_02_doga", 7),
    "bakir": ("sheet_01_02_doga", 8),
    "balta": ("sheet_01_02_doga", 9),
    "bozkir": ("sheet_01_02_doga", 10),
    "buyu": ("sheet_01_02_doga", 11),
    "ceviz": ("sheet_01_02_doga", 12),
    "civa": ("sheet_01_02_doga", 13),
    "davul": ("sheet_01_02_doga", 14),
    "domates": ("sheet_01_02_doga", 15),

    # sheet_02_02_doga (Düzeltilen grup)
    "et": ("sheet_02_02_doga", 1),
    "ev": ("sheet_02_02_doga", 2),
    "fiyort": ("sheet_02_02_doga", 3),
    "gurz": ("sheet_02_02_doga", 5),
    "findik": ("sheet_02_02_doga", 6),
    "gul": ("sheet_02_02_doga", 7),
    "hucre": ("sheet_02_02_doga", 9),
    "kandil": ("sheet_02_02_doga", 10),
    "havyar": ("sheet_02_02_doga", 11),
    "kentaurluk": ("sheet_02_02_doga", 14),
    "kertenkele": ("sheet_02_02_doga", 15),

    # sheet_03_02_doga (Düzeltilen grup)
    "koruk": ("sheet_03_02_doga", 1),
    "koy": ("sheet_03_02_doga", 2),
    "kukurt": ("sheet_03_02_doga", 3),
    "kurek": ("sheet_03_02_doga", 4),
    "kita": ("sheet_03_02_doga", 5),
    "mana": ("sheet_03_02_doga", 6),
    "kuvars": ("sheet_03_02_doga", 3),  # Sarı kuvars kristali
    "mana_i_ksiri": ("sheet_03_02_doga", 8),
    "medeniyet": ("sheet_03_02_doga", 9),
    "melek": ("sheet_03_02_doga", 10),
    "mercan_kayaligi": ("sheet_03_02_doga", 11),
    "muz": ("sheet_03_02_doga", 12),
    "parsomen": ("sheet_03_02_doga", 13),
    "pirinc": ("sheet_03_02_doga", 14),
    "plazma": ("sheet_03_02_doga", 15),

    # sheet_04_02_doga (Düzeltilen grup)
    "sarimsak": ("sheet_04_02_doga", 1),
    "seramik": ("sheet_04_02_doga", 2),
    "sosis": ("sheet_04_02_doga", 3),
    "sur": ("sheet_04_02_doga", 4),
    "tepe": ("sheet_04_02_doga", 5),
    "tereyagi": ("sheet_04_02_doga", 6),
    "totem": ("sheet_04_02_doga", 7),
    "tufan": ("sheet_04_02_doga", 8),
    "tilsim": ("sheet_04_02_doga", 10),
    "uydu": ("sheet_04_02_doga", 11),
    "ucurtma": ("sheet_04_02_doga", 12),
    "vaha": ("sheet_04_02_doga", 13),
    "yaprak": ("sheet_04_02_doga", 14),
    "yarimada": ("sheet_04_02_doga", 15),

    # sheet_05_02_doga (Düzeltilen grup)
    "yun": ("sheet_05_02_doga", 1),
    "cali": ("sheet_05_02_doga", 2),
    "cimen": ("sheet_05_02_doga", 3),
    "havuc": ("sheet_05_02_doga", 4),
    "corba": ("sheet_05_02_doga", 5),
    "uzum": ("sheet_05_02_doga", 7),
    "i_nek": ("sheet_05_02_doga", 8),
    "i_gne": ("sheet_05_02_doga", 9),
    "sahin": ("sheet_05_02_doga", 10),
    "selale": ("sheet_05_02_doga", 11),
    "tutulma": ("sheet_05_02_doga", 13),
    "tuy": ("sheet_05_02_doga", 14),
    "alfabe": ("sheet_05_02_doga", 15),

    # sheet_06_02_doga (1-15)
    "bal_kavanozu": ("sheet_06_02_doga", 1),
    "biber": ("sheet_06_02_doga", 2),
    "dolu": ("sheet_06_02_doga", 3),
    "ejderha": ("sheet_06_02_doga", 4),
    "girdap": ("sheet_06_02_doga", 5),
    "grifon": ("sheet_06_02_doga", 6),
    "gulyabani": ("sheet_06_02_doga", 7),
    "hayalet": ("sheet_06_02_doga", 8),
    "heykel": ("sheet_06_02_doga", 9),
    "kabile": ("sheet_06_02_doga", 10),
    "kano": ("sheet_06_02_doga", 11),
    "karpuz": ("sheet_06_02_doga", 12),
    "liman": ("sheet_06_02_doga", 13),
    "okul": ("sheet_06_02_doga", 14),
    "peri": ("sheet_06_02_doga", 15),

    # sheet_07_02_doga (1-15)
    "portakal": ("sheet_07_02_doga", 1),
    "ruh": ("sheet_07_02_doga", 2),
    "simya": ("sheet_07_02_doga", 3),
    "tabanca": ("sheet_07_02_doga", 4),
    "tuz": ("sheet_07_02_doga", 5),
    "tuzlu_su": ("sheet_07_02_doga", 6),
    "vadi": ("sheet_07_02_doga", 7),
    "yakut": ("sheet_07_02_doga", 8),
    "yapay_zeka": ("sheet_07_02_doga", 9),
    "yelkenli": ("sheet_07_02_doga", 10),
    "yesim": ("sheet_07_02_doga", 11),
    "yunus": ("sheet_07_02_doga", 12),
    "zehir": ("sheet_07_02_doga", 14),
    "zeytin": ("sheet_07_02_doga", 15),

    # sheet_08_02_doga (Düzeltilen grup)
    "sehir": ("sheet_08_02_doga", 1),
    "krallik": ("sheet_08_02_doga", 1),
    "dukkan": ("sheet_08_02_doga", 2),
    "hortum": ("sheet_08_02_doga", 3),
    "kulube": ("sheet_08_02_doga", 5),  # Kulübe burada!
    "matbaa": ("sheet_08_02_doga", 6),
    "obelisk": ("sheet_08_02_doga", 7),
    "palmiye": ("sheet_08_02_doga", 8),
    "tundra": ("sheet_08_02_doga", 9),
    "araba": ("sheet_08_02_doga", 10),
    "meyve_bahcesi": ("sheet_08_02_doga", 12),
    "balina": ("sheet_08_02_doga", 13),
    "darphane": ("sheet_08_02_doga", 14),
    "dondurma": ("sheet_08_02_doga", 15),

    # sheet_09_02_doga
    "kutuphane": ("sheet_09_02_doga", 1),
    "bambu": ("sheet_09_02_doga", 2),
    "golem": ("sheet_09_02_doga", 3),
    "karli_cam_agaci": ("sheet_09_02_doga", 4),
    "duman": ("sheet_09_02_doga", 5),
    "bira": ("sheet_09_02_doga", 6),
    "boynuz": ("sheet_09_02_doga", 7),
    "fayton": ("sheet_09_02_doga", 8),
    "kaldirim": ("sheet_09_02_doga", 9),
    "mum": ("sheet_09_02_doga", 10),
    "uranyum": ("sheet_09_02_doga", 12),

    # sheet_10_04_zanaat_ve_aletler (1-15)
    "alet": ("sheet_10_04_zanaat_ve_aletler", 1),
    "alci": ("sheet_10_04_zanaat_ve_aletler", 2),
    "ametist": ("sheet_10_04_zanaat_ve_aletler", 3),
    "bataklik": ("sheet_10_04_zanaat_ve_aletler", 4),
    "cin": ("sheet_10_04_zanaat_ve_aletler", 5),
    "fosil": ("sheet_10_04_zanaat_ve_aletler", 6),
    "halat": ("sheet_10_04_zanaat_ve_aletler", 7),
    "jenerator": ("sheet_10_04_zanaat_ve_aletler", 8),
    "kadirga": ("sheet_10_04_zanaat_ve_aletler", 9),
    "kale": ("sheet_10_04_zanaat_ve_aletler", 10),
    "kalem": ("sheet_10_04_zanaat_ve_aletler", 11),
    "kartal": ("sheet_10_04_zanaat_ve_aletler", 12),
    "kavurma": ("sheet_10_04_zanaat_ve_aletler", 13),
    "kehribar": ("sheet_10_04_zanaat_ve_aletler", 14),
    "kemik": ("sheet_10_04_zanaat_ve_aletler", 15),

    # sheet_11_04_zanaat_ve_aletler (Düzeltilen grup)
    "kilit": ("sheet_11_04_zanaat_ve_aletler", 1),
    "kirec": ("sheet_11_04_zanaat_ve_aletler", 2),
    "mancinik": ("sheet_11_04_zanaat_ve_aletler", 3),
    "meltem": ("sheet_11_04_zanaat_ve_aletler", 5),
    "migfer": ("sheet_11_04_zanaat_ve_aletler", 9),
    "mizrak": ("sheet_11_04_zanaat_ve_aletler", 10),
    "para": ("sheet_11_04_zanaat_ve_aletler", 11),
    "pastirma": ("sheet_11_04_zanaat_ve_aletler", 14),
    "salca": ("sheet_11_04_zanaat_ve_aletler", 15),

    # sheet_12_04_zanaat_ve_aletler (1-15)
    "zirh": ("sheet_12_04_zanaat_ve_aletler", 1),
    "cark": ("sheet_12_04_zanaat_ve_aletler", 2),
    "cekic": ("sheet_12_04_zanaat_ve_aletler", 3),
    "cimento": ("sheet_12_04_zanaat_ve_aletler", 4),
    "cig": ("sheet_12_04_zanaat_ve_aletler", 5),
    "i_ksir": ("sheet_12_04_zanaat_ve_aletler", 6),
    "safak": ("sheet_12_04_zanaat_ve_aletler", 7),
    "sifa_i_ksiri": ("sheet_12_04_zanaat_ve_aletler", 8),
    "makas": ("sheet_12_04_zanaat_ve_aletler", 9),
    "sfenks": ("sheet_12_04_zanaat_ve_aletler", 10),
    "yel_degirmeni": ("sheet_12_04_zanaat_ve_aletler", 11),
    "i_ksir_kazani": ("sheet_12_04_zanaat_ve_aletler", 12),
    "bisiklet": ("sheet_12_04_zanaat_ve_aletler", 13),
    "gazete": ("sheet_12_04_zanaat_ve_aletler", 14),
    "hesap_makinesi": ("sheet_12_04_zanaat_ve_aletler", 15),

    # sheet_13_04_zanaat_ve_aletler (Düzeltilen grup)
    "murekkep": ("sheet_13_04_zanaat_ve_aletler", 1),
    "platin": ("sheet_13_04_zanaat_ve_aletler", 2),
    "safir": ("sheet_13_04_zanaat_ve_aletler", 3),
    "tablo": ("sheet_13_04_zanaat_ve_aletler", 4),
    "timsah": ("sheet_13_04_zanaat_ve_aletler", 5),
    "tufek": ("sheet_13_04_zanaat_ve_aletler", 7),
    "zombi": ("sheet_13_04_zanaat_ve_aletler", 8),
    "muska": ("sheet_13_04_zanaat_ve_aletler", 9),
    "solucan": ("sheet_13_04_zanaat_ve_aletler", 10),
    "mercek": ("sheet_13_04_zanaat_ve_aletler", 11),
    "mermer": ("sheet_13_04_zanaat_ve_aletler", 14),
    "bicak": ("sheet_13_04_zanaat_ve_aletler", 15),

    # sheet_14_04_zanaat_ve_aletler (Düzeltilen grup)
    "sarap": ("sheet_14_04_zanaat_ve_aletler", 1),
    "anahtar": ("sheet_14_04_zanaat_ve_aletler", 3),
    "dinamolu_fener": ("sheet_14_04_zanaat_ve_aletler", 4),
    "disli": ("sheet_14_04_zanaat_ve_aletler", 5),
    "saray": ("sheet_14_04_zanaat_ve_aletler", 6),
    "sirke": ("sheet_14_04_zanaat_ve_aletler", 7),
    "kazan": ("sheet_14_04_zanaat_ve_aletler", 8),
    "gitar": ("sheet_14_04_zanaat_ve_aletler", 9),
    "mikrocip": ("sheet_14_04_zanaat_ve_aletler", 10),

    # sheet_15_01_elements (1-15)
    "buzul": ("sheet_15_01_elements", 1),
    "flut": ("sheet_15_01_elements", 2),
    "golge": ("sheet_15_01_elements", 3),
    "resim": ("sheet_15_01_elements", 4),
    "yogurt": ("sheet_15_01_elements", 5),
    "gol": ("sheet_15_01_elements", 6),
    "kasirga": ("sheet_15_01_elements", 7),
    "deniz": ("sheet_15_01_elements", 8),
    "firtina": ("sheet_15_01_elements", 9),
    "gunduz": ("sheet_15_01_elements", 10),
    "kanal": ("sheet_15_01_elements", 11),
    "yanardag": ("sheet_15_01_elements", 12),
    "asit_yagmuru": ("sheet_15_01_elements", 13),
    "baraj": ("sheet_15_01_elements", 14),
    "fotograf": ("sheet_15_01_elements", 15),

    # sheet_16_01_elements (Düzeltilen grup)
    "korfez": ("sheet_16_01_elements", 1),
    "tayfun": ("sheet_16_01_elements", 2),
    "buharli_gemi": ("sheet_16_01_elements", 3),
    "denizalti": ("sheet_16_01_elements", 4),
    "metropol": ("sheet_16_01_elements", 5),
    "ruzgar_gulu": ("sheet_16_01_elements", 6),
    "aurora": ("sheet_16_01_elements", 7),
    "zirhli_gemi": ("sheet_16_01_elements", 8),
    "deprem": ("sheet_16_01_elements", 9),
    "kayip_sehir": ("sheet_16_01_elements", 10),
    "kopru": ("sheet_16_01_elements", 11),
    "meteor": ("sheet_16_01_elements", 12),
    "tsunami": ("sheet_16_01_elements", 12),
    "zeplin": ("sheet_16_01_elements", 13),

    # sheet_17_01_elements
    "radyasyon": ("sheet_17_01_elements", 1),
    "televizyon": ("sheet_17_01_elements", 5),
    "ozon": ("sheet_17_01_elements", 9),
    "sicak_hava_balonu": ("sheet_17_01_elements", 13),

    # sheet_18_08_mistik_ve_evren (1-15)
    "evren": ("sheet_18_08_mistik_ve_evren", 1),
    "gezegen": ("sheet_18_08_mistik_ve_evren", 2),
    "kule": ("sheet_18_08_mistik_ve_evren", 3),
    "sera": ("sheet_18_08_mistik_ve_evren", 4),
    "sinema": ("sheet_18_08_mistik_ve_evren", 5),
    "tunel": ("sheet_18_08_mistik_ve_evren", 6),
    "muze": ("sheet_18_08_mistik_ve_evren", 7),
    "alacakaranlik": ("sheet_18_08_mistik_ve_evren", 8),
    "anit": ("sheet_18_08_mistik_ve_evren", 9),
    "fener_kulesi": ("sheet_18_08_mistik_ve_evren", 10),
    "kitap": ("sheet_18_08_mistik_ve_evren", 11),
    "kozmik_usturlap": ("sheet_18_08_mistik_ve_evren", 12),
    "kum_saati": ("sheet_18_08_mistik_ve_evren", 13),
    "kuyruklu_yildiz": ("sheet_18_08_mistik_ve_evren", 14),
    "tanri": ("sheet_18_08_mistik_ve_evren", 15),

    # sheet_19_08_mistik_ve_evren (Düzeltilen grup)
    "tiyatro": ("sheet_19_08_mistik_ve_evren", 1),
    "turbin": ("sheet_19_08_mistik_ve_evren", 2),
    "uzay_gemisi": ("sheet_19_08_mistik_ve_evren", 4),
    "i_nci": ("sheet_19_08_mistik_ve_evren", 5),
    "yildiz": ("sheet_19_08_mistik_ve_evren", 6),
    "kaplan": ("sheet_19_08_mistik_ve_evren", 8),
    "karadelik": ("sheet_19_08_mistik_ve_evren", 9),
    "manyetizma": ("sheet_19_08_mistik_ve_evren", 10),
    "piramit": ("sheet_19_08_mistik_ve_evren", 11),
    "zaman": ("sheet_19_08_mistik_ve_evren", 12),
    "i_mparatorluk": ("sheet_19_08_mistik_ve_evren", 13),
    "galaksi": ("sheet_19_08_mistik_ve_evren", 14),
    "gece": ("sheet_19_08_mistik_ve_evren", 15),

    # sheet_20_08_mistik_ve_evren (Düzeltilen grup)
    "gunes_saati": ("sheet_20_08_mistik_ve_evren", 1),
    "isik": ("sheet_20_08_mistik_ve_evren", 2),
    "seytan": ("sheet_20_08_mistik_ve_evren", 3),
    "tapinak": ("sheet_20_08_mistik_ve_evren", 4),
    "olumsuzluk_i_ksiri": ("sheet_20_08_mistik_ve_evren", 5),
    "harita": ("sheet_20_08_mistik_ve_evren", 7),
    "asteroit": ("sheet_20_08_mistik_ve_evren", 8),
    "plato": ("sheet_20_08_mistik_ve_evren", 9),
    "banka": ("sheet_20_08_mistik_ve_evren", 10),
    "pegasus": ("sheet_20_08_mistik_ve_evren", 11),
    "cadir": ("sheet_20_08_mistik_ve_evren", 12),
    "prizma": ("sheet_20_08_mistik_ve_evren", 15),

    # sheet_21_05_maden_ve_materyaller (1-15)
    "granit": ("sheet_21_05_maden_ve_materyaller", 1),
    "dinamit": ("sheet_21_05_maden_ve_materyaller", 2),
    "beton": ("sheet_21_05_maden_ve_materyaller", 3),
    "bronz": ("sheet_21_05_maden_ve_materyaller", 4),
    "hazine": ("sheet_21_05_maden_ve_materyaller", 5),
    "altin_sikke": ("sheet_21_05_maden_ve_materyaller", 6),
    "pazar": ("sheet_21_05_maden_ve_materyaller", 7),
    "altin": ("sheet_21_05_maden_ve_materyaller", 8),
    "demir": ("sheet_21_05_maden_ve_materyaller", 9),
    "gumus": ("sheet_21_05_maden_ve_materyaller", 10),
    "celik": ("sheet_21_05_maden_ve_materyaller", 11),
    "i_pek": ("sheet_21_05_maden_ve_materyaller", 12),
    "borsa": ("sheet_21_05_maden_ve_materyaller", 13),
    "elmas": ("sheet_21_05_maden_ve_materyaller", 14),
    "kagit_para": ("sheet_21_05_maden_ve_materyaller", 15),

    # sheet_22_05_maden_ve_materyaller
    "titanyum": ("sheet_22_05_maden_ve_materyaller", 1),
    "armut": ("sheet_22_05_maden_ve_materyaller", 3),

    # sheet_23_03_canlilar (Düzeltilen grup)
    "kursun": ("sheet_23_03_canlilar", 1),
    "i_nsan": ("sheet_23_03_canlilar", 2),
    "anka_kusu": ("sheet_23_03_canlilar", 3),
    "denizanasi": ("sheet_23_03_canlilar", 4),
    "denizkizi": ("sheet_23_03_canlilar", 5),
    "orumcek": ("sheet_23_03_canlilar", 6),
    "i_lluzyon_aynasi": ("sheet_23_03_canlilar", 7),
    "balik_eti": ("sheet_23_03_canlilar", 8),
    "kopekbaligi": ("sheet_23_03_canlilar", 10),
    "kurt_adam": ("sheet_23_03_canlilar", 11),
    "kopek": ("sheet_23_03_canlilar", 12),
    "i_pekbocegi": ("sheet_23_03_canlilar", 13),
    "vampir": ("sheet_23_03_canlilar", 15),

    # sheet_24_03_canlilar (1-4)
    "dinozor": ("sheet_24_03_canlilar", 1),
    "aile": ("sheet_24_03_canlilar", 2),
    "bakteri": ("sheet_24_03_canlilar", 3),
    "virus": ("sheet_24_03_canlilar", 4),

    # sheet_25_06_yemek_ve_tarim (1-15)
    "porselen": ("sheet_25_06_yemek_ve_tarim", 1),
    "sarmasik": ("sheet_25_06_yemek_ve_tarim", 2),
    "pasta": ("sheet_25_06_yemek_ve_tarim", 3),
    "limon": ("sheet_25_06_yemek_ve_tarim", 4),
    "zeytinyagi": ("sheet_25_06_yemek_ve_tarim", 5),
    "cilek": ("sheet_25_06_yemek_ve_tarim", 6),
    "meyve_suyu": ("sheet_25_06_yemek_ve_tarim", 7),
    "kok": ("sheet_25_06_yemek_ve_tarim", 8),
    "sogan": ("sheet_25_06_yemek_ve_tarim", 9),
    "seker": ("sheet_25_06_yemek_ve_tarim", 10),
    "alkol": ("sheet_25_06_yemek_ve_tarim", 11),
    "kurabiye": ("sheet_25_06_yemek_ve_tarim", 12),
    "cikolata": ("sheet_25_06_yemek_ve_tarim", 13),
    "patates": ("sheet_25_06_yemek_ve_tarim", 14),
    "kahve": ("sheet_25_06_yemek_ve_tarim", 15),

    # sheet_26_06_yemek_ve_tarim
    "cay": ("sheet_26_06_yemek_ve_tarim", 14),  # Çay bardağı #14!

    # sheet_27_07_bilim_ve_teknoloji (Düzeltilen grup)
    "i_p": ("sheet_27_07_bilim_ve_teknoloji", 1),
    "lazer": ("sheet_27_07_bilim_ve_teknoloji", 2),
    "testere": ("sheet_27_07_bilim_ve_teknoloji", 3),
    "i_plik": ("sheet_27_07_bilim_ve_teknoloji", 4),
    "roket": ("sheet_27_07_bilim_ve_teknoloji", 7),
    "barometre": ("sheet_27_07_bilim_ve_teknoloji", 8),
    "kamera": ("sheet_27_07_bilim_ve_teknoloji", 9),
    "otomobil": ("sheet_27_07_bilim_ve_teknoloji", 10),
    "i_cten_yanmali_motor": ("sheet_27_07_bilim_ve_teknoloji", 12),
    "demiryolu": ("sheet_27_07_bilim_ve_teknoloji", 14),
    "tren": ("sheet_27_07_bilim_ve_teknoloji", 15),

    # sheet_28_07_bilim_ve_teknoloji (Düzeltilen grup)
    "radyo": ("sheet_28_07_bilim_ve_teknoloji", 1),
    "i_nternet": ("sheet_28_07_bilim_ve_teknoloji", 3),
    "radar": ("sheet_28_07_bilim_ve_teknoloji", 4),
    "telgraf": ("sheet_28_07_bilim_ve_teknoloji", 6),
    "bilgisayar": ("sheet_28_07_bilim_ve_teknoloji", 8),
    "helikopter": ("sheet_28_07_bilim_ve_teknoloji", 9),
    "mikroskop": ("sheet_28_07_bilim_ve_teknoloji", 11),
    "robot": ("sheet_28_07_bilim_ve_teknoloji", 12),
    "telefon": ("sheet_28_07_bilim_ve_teknoloji", 13),
}

def apply_mappings():
    updated = 0
    missing = 0
    
    print(f"Toplam {len(EXACT_MAPPINGS)} doğrulanmış eşya haritası uygulanıyor...")
    
    for item_id, (sheet_folder, cell_idx) in EXACT_MAPPINGS.items():
        cell_file = DEBUG_SHEETS_DIR / sheet_folder / f"cell_{cell_idx:02d}.png"
        if not cell_file.exists():
            print(f"UYARI: Bulunamadı -> {cell_file}")
            missing += 1
            continue
            
        target_file = OUTPUT_ITEMS_DIR / f"{item_id}.png"
        shutil.copyfile(cell_file, target_file)
        
        # ID varyasyonları (i_nek / inek, vb.)
        clean_id = item_id.replace("i_", "i").replace("_i_", "_i")
        if clean_id != item_id:
            clean_target = OUTPUT_ITEMS_DIR / f"{clean_id}.png"
            shutil.copyfile(cell_file, clean_target)
            
        updated += 1
        print(f"  [OK] {item_id}.png <- {sheet_folder}/cell_{cell_idx:02d}.png")
        
    print(f"\nİşlem Tamamlandı: {updated} görsel başarıyla güncellendi, {missing} eksik.")

if __name__ == '__main__':
    apply_mappings()
