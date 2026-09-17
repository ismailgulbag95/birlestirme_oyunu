/**
 * Auto-generated and synchronized Item Definitions with Multi-Mode Support
 * Total items: 521
 * 100% Collision-Free & Strict Hierarchical DAG
 */

export const ITEM_DEFINITIONS = {
  "anka_kusu": {
      "id": "anka_kusu",
      "name": "Anka Kuşu",
      "description": "Kurbağa ve Kurşun elementlerinin anlamsal ve fiziksel etkileşimi sonucunda anka kuşu meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "ates"
          ]
      ]
  },
  "denizanasi": {
      "id": "denizanasi",
      "name": "Denizanası",
      "description": "Bataklık ve Göl elementlerinin anlamsal ve fiziksel etkileşimi sonucunda denizanası meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "su"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "balik",
              "su",
              "isik"
          ]
      ]
  },
  "helikopter": {
      "id": "helikopter",
      "name": "Helikopter",
      "description": "Roket, Teleskop ve Uçak elementlerinin dengeli füzyonuyla yeni bir form olan helikopter sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "elektrik",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yildirim",
              "enerji",
              "yildirim"
          ]
      ]
  },
  "kilit": {
      "id": "kilit",
      "name": "Kilit",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kilit ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "su"
          ]
      ]
  },
  "tuzlu_su": {
      "id": "tuzlu_su",
      "name": "Tuzlu Su",
      "description": "Cıva ve Tüy elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tuzlu su meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "tuz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "su",
              "tuz",
              "toprak"
          ]
      ]
  },
  "uydu": {
      "id": "uydu",
      "name": "Uydu",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla uydu ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "deniz"
          ]
      ]
  },
  "granit": {
      "id": "granit",
      "name": "Granit",
      "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda granit meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "kanyon"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "kanyon"
          ]
      ]
  },
  "kurt": {
      "id": "kurt",
      "name": "Kurt",
      "description": "Kahin Küresi, Kar ve Su elementlerinin dengeli füzyonuyla yeni bir form olan kurt sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "odun",
              "toprak",
              "su"
          ]
      ]
  },
  "run": {
      "id": "run",
      "name": "Rün",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla rün ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "hava"
          ]
      ]
  },
  "hesap_makinesi": {
      "id": "hesap_makinesi",
      "name": "Hesap Makinesi",
      "description": "Makas ve Parşömen elementlerinin anlamsal ve fiziksel etkileşimi sonucunda hesap makinesi meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "enerji"
          ]
      ]
  },
  "mercan_kayaligi": {
      "id": "mercan_kayaligi",
      "name": "Mercan Kayalığı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mercan kayalığı ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "gunes"
          ]
      ]
  },
  "hazine": {
      "id": "hazine",
      "name": "Hazine",
      "description": "Müze ve Çömlek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda hazine meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "cicek"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "cicek"
          ]
      ]
  },
  "at": {
      "id": "at",
      "name": "At",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan at sentezlenir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "enerji",
              "su"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "ates",
              "hava",
              "su"
          ]
      ]
  },
  "disli_cark": {
      "id": "disli_cark",
      "name": "Dişli Çark",
      "description": "Dişli ve Çığ elementlerinin anlamsal ve fiziksel etkileşimi sonucunda dişli çark meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "isik"
          ]
      ]
  },
  "kirec": {
      "id": "kirec",
      "name": "Kireç",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kireç ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "ates",
              "su"
          ]
      ]
  },
  "yildirim_parsomeni": {
      "id": "yildirim_parsomeni",
      "name": "Yıldırım Parşömeni",
      "description": "Fırtına Kılıcı ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yıldırım parşömeni meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#38bdf8",
          "emissive": "#ca8a04"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "tutun"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "electric",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "tutun"
          ]
      ]
  },
  "i_lluzyon_aynasi": {
      "id": "i_lluzyon_aynasi",
      "name": "İllüzyon Aynası",
      "description": "Fosil ve İksir elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇llüzyon aynası meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "isik"
          ]
      ]
  },
  "cark": {
      "id": "cark",
      "name": "Çark",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çark ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "lav",
              "su",
              "hava"
          ]
      ]
  },
  "corba": {
      "id": "corba",
      "name": "Çorba",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çorba ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "buz"
          ]
      ]
  },
  "dinamit": {
      "id": "dinamit",
      "name": "Dinamit",
      "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan dinamit sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ea580c",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "barut",
              "kum"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "kukurt",
              "komur",
              "kum"
          ]
      ]
  },
  "ok": {
      "id": "ok",
      "name": "Ok",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ok ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "kiymik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "odun",
              "kiymik",
              "yay"
          ]
      ]
  },
  "buz_runu": {
      "id": "buz_runu",
      "name": "Buz Rünü",
      "description": "Buz ve Buzul elementlerinin anlamsal ve fiziksel etkileşimi sonucunda buz rünü meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#e0f2fe",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "bubble",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "run",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "odun",
              "hava",
              "buz"
          ]
      ]
  },
  "akrep": {
      "id": "akrep",
      "name": "Akrep",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla akrep ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "tas"
          ]
      ]
  },
  "kamyon": {
      "id": "kamyon",
      "name": "Kamyon",
      "description": "Buharlı Gemi, El Arabası ve Otomobil elementlerinin dengeli füzyonuyla yeni bir form olan kamyon sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "elektrik",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yildirim",
              "enerji",
              "hava"
          ]
      ]
  },
  "kemik": {
      "id": "kemik",
      "name": "Kemik",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kemik ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "lav",
              "su",
              "isik"
          ]
      ]
  },
  "alci": {
      "id": "alci",
      "name": "Alçı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla alçı ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kirec",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kirec",
              "su",
              "kum"
          ]
      ]
  },
  "koruk": {
      "id": "koruk",
      "name": "Körük",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla körük ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "orman"
          ]
      ]
  },
  "barut": {
      "id": "barut",
      "name": "Barut",
      "description": "Alet ve Salça elementlerinin anlamsal ve fiziksel etkileşimi sonucunda barut meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ea580c",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kukurt",
              "komur"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "kukurt",
              "komur",
              "ates"
          ]
      ]
  },
  "kavrulmus_et": {
      "id": "kavrulmus_et",
      "name": "Kavrulmuş Et",
      "description": "Sarmaşık ve Tereyağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kavrulmuş et meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "meltem"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "meltem"
          ]
      ]
  },
  "kagit": {
      "id": "kagit",
      "name": "Kağıt",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kağıt ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "ates"
          ]
      ]
  },
  "gokkusagi": {
      "id": "gokkusagi",
      "name": "Gökkuşağı",
      "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gökkuşağı meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yagmur",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "su",
              "hava",
              "gunes"
          ]
      ]
  },
  "buhar_jeneratoru": {
      "id": "buhar_jeneratoru",
      "name": "Buhar Jeneratörü",
      "description": "Buhar ve Lokomotif elementlerinin anlamsal ve fiziksel etkileşimi sonucunda buhar jeneratörü meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "sogan"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "sogan"
          ]
      ]
  },
  "i_cten_yanmali_motor": {
      "id": "i_cten_yanmali_motor",
      "name": "İçten Yanmalı Motor",
      "description": "Lokomotif ve Roket elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇çten yanmalı motor meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "elektrik",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yildirim",
              "enerji",
              "ates"
          ]
      ]
  },
  "kale": {
      "id": "kale",
      "name": "Kale",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kale ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "tugla_duvar"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "lav",
              "su",
              "tugla_duvar"
          ]
      ]
  },
  "telgraf": {
      "id": "telgraf",
      "name": "Telgraf",
      "description": "Radyo ve İnternet elementlerinin anlamsal ve fiziksel etkileşimi sonucunda telgraf meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "elektrik",
              "i_p"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yildirim",
              "enerji",
              "i_p"
          ]
      ]
  },
  "muz": {
      "id": "muz",
      "name": "Muz",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla muz ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "palmiye",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "agac",
              "kum",
              "isik"
          ]
      ]
  },
  "kartal": {
      "id": "kartal",
      "name": "Kartal",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kartal ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "kus",
              "dag",
              "ruzgar"
          ]
      ]
  },
  "kamera": {
      "id": "kamera",
      "name": "Kamera",
      "description": "Fotoğraf ve Sinema elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kamera meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "yildirim"
          ]
      ]
  },
  "cehennem_tasi": {
      "id": "cehennem_tasi",
      "name": "Cehennem Taşı",
      "description": "Evren, Tanrı ve Zehir Şişesi elementlerinin dengeli füzyonuyla yeni bir form olan cehennem taşı sentezlenir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "enerji",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "ates",
              "hava",
              "toprak"
          ]
      ]
  },
  "anit": {
      "id": "anit",
      "name": "Anıt",
      "description": "Kule ve Müze elementlerinin anlamsal ve fiziksel etkileşimi sonucunda anıt meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "enerji",
              "elmas"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "ates",
              "hava",
              "elmas"
          ]
      ]
  },
  "deniz": {
      "id": "deniz",
      "name": "Deniz",
      "description": "Göl ve Gölge elementlerinin anlamsal ve fiziksel etkileşimi sonucunda deniz meydana gelir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "yagmur"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "su",
              "su",
              "yagmur"
          ]
      ]
  },
  "safir": {
      "id": "safir",
      "name": "Safir",
      "description": "Gürz ve Su elementlerinin anlamsal ve fiziksel etkileşimi sonucunda safir meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#2563eb",
          "secondary": "#93c5fd",
          "emissive": "#1e3a8a"
      },
      "particles": {
          "type": "spark",
          "color": "#dbeafe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "deniz",
              "su"
          ]
      ]
  },
  "lazer": {
      "id": "lazer",
      "name": "Lazer",
      "description": "Fener ve Lav elementlerinin anlamsal ve fiziksel etkileşimi sonucunda lazer meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cam",
              "hava",
              "ates"
          ]
      ]
  },
  "kahin_kuresi": {
      "id": "kahin_kuresi",
      "name": "Kahin Küresi",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan kahin küresi sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "enerji",
              "ates",
              "ates"
          ]
      ]
  },
  "alfabe": {
      "id": "alfabe",
      "name": "Alfabe",
      "description": "Asa ve Yazı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda alfabe meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "deniz"
          ]
      ]
  },
  "hayvan": {
      "id": "hayvan",
      "name": "Hayvan",
      "description": "Koyun ve Kurbağa elementlerinin anlamsal ve fiziksel etkileşimi sonucunda hayvan meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "dag"
          ]
      ]
  },
  "buz": {
      "id": "buz",
      "name": "Buz",
      "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan buz sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#e0f2fe",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "bubble",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "su",
              "ruzgar",
              "hava"
          ]
      ]
  },
  "cimento": {
      "id": "cimento",
      "name": "Çimento",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çimento ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kirec",
              "camur"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "kirec",
              "camur",
              "kum"
          ]
      ]
  },
  "plazma_tufegi": {
      "id": "plazma_tufegi",
      "name": "Plazma Tüfeği",
      "description": "Dinamit, Fırtına Kılıcı ve Harç elementlerinin dengeli füzyonuyla yeni bir form olan plazma tüfeği sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "su"
          ]
      ]
  },
  "zirhli_gemi": {
      "id": "zirhli_gemi",
      "name": "Zırhlı Gemi",
      "description": "Buhar Jeneratörü ve Denizanası elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zırhlı gemi meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "kasirga"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "kasirga"
          ]
      ]
  },
  "mercek": {
      "id": "mercek",
      "name": "Mercek",
      "description": "Hamur, Melek ve Yakut elementlerinin dengeli füzyonuyla yeni bir form olan mercek sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "toprak"
          ]
      ]
  },
  "tekerlek": {
      "id": "tekerlek",
      "name": "Tekerlek",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla tekerlek ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "enerji"
          ]
      ]
  },
  "portal_runu": {
      "id": "portal_runu",
      "name": "Portal Rünü",
      "description": "Kale Kapısı, Mağara ve Tünel elementlerinin dengeli füzyonuyla yeni bir form olan portal rünü sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "su"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "enerji",
              "ates",
              "su"
          ]
      ]
  },
  "metal": {
      "id": "metal",
      "name": "Metal",
      "description": "Gümüş ve Çelik Külçe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda metal meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "tas"
          ]
      ]
  },
  "dukkan": {
      "id": "dukkan",
      "name": "Dükkan",
      "description": "Müze, Sarmaşık ve Zincir elementlerinin dengeli füzyonuyla yeni bir form olan dükkan sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "orman"
          ]
      ]
  },
  "kavurma": {
      "id": "kavurma",
      "name": "Kavurma",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kavurma ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "isik"
          ]
      ]
  },
  "kum": {
      "id": "kum",
      "name": "Kum",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kum ortaya çıkar.",
      "tier": 2,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "toprak",
              "toprak",
              "hava"
          ]
      ]
  },
  "buzul": {
      "id": "buzul",
      "name": "Buzul",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla buzul ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#e0f2fe",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "bubble",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buz",
              "kar"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "buz",
              "kar",
              "dag"
          ]
      ]
  },
  "boynuz": {
      "id": "boynuz",
      "name": "Boynuz",
      "description": "Ayı, Miğfer ve Zombi elementlerinin dengeli füzyonuyla yeni bir form olan boynuz sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "kemik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "kemik"
          ]
      ]
  },
  "denizkizi": {
      "id": "denizkizi",
      "name": "Denizkızı",
      "description": "Sarımsak ve İnek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda denizkızı meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "deniz"
          ]
      ]
  },
  "su_comlegi": {
      "id": "su_comlegi",
      "name": "Su Çömleği",
      "description": "Baharat Çeşnisi ve Göl elementlerinin anlamsal ve fiziksel etkileşimi sonucunda su çömleği meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "bulut"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "bulut"
          ]
      ]
  },
  "yilan": {
      "id": "yilan",
      "name": "Yılan",
      "description": "Kurbağa, Kurşun ve Zümrüt elementlerinin dengeli füzyonuyla yeni bir form olan yılan sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#15803d",
          "secondary": "#84cc16",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bef264",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "dag"
          ]
      ]
  },
  "dondurma": {
      "id": "dondurma",
      "name": "Dondurma",
      "description": "Dolu, Domates ve Kaya elementlerinin dengeli füzyonuyla yeni bir form olan dondurma sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "ruzgar"
          ]
      ]
  },
  "salca": {
      "id": "salca",
      "name": "Salça",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla salça ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "i_p",
              "pamuk",
              "ates"
          ]
      ]
  },
  "ruh": {
      "id": "ruh",
      "name": "Ruh",
      "description": "Kertenkele ve Mercan Kayalığı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ruh meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yasam",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "camur",
              "enerji",
              "isik"
          ]
      ]
  },
  "ametist": {
      "id": "ametist",
      "name": "Ametist",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ametist ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c4b5fd",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ede9fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "i_p",
              "pamuk",
              "su"
          ]
      ]
  },
  "virus": {
      "id": "virus",
      "name": "Virüs",
      "description": "Bakteri, Kasırga ve Nebula elementlerinin dengeli füzyonuyla yeni bir form olan virüs sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bakteri",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bakteri",
              "hava",
              "toprak"
          ]
      ]
  },
  "patates": {
      "id": "patates",
      "name": "Patates",
      "description": "Kavrulmuş Et, Melek ve Soğan elementlerinin dengeli füzyonuyla yeni bir form olan patates sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kok",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "kok",
              "toprak",
              "camur"
          ]
      ]
  },
  "harc": {
      "id": "harc",
      "name": "Harç",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla harç ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cimento",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "cimento",
              "su",
              "kum"
          ]
      ]
  },
  "kurt_adam": {
      "id": "kurt_adam",
      "name": "Kurt Adam",
      "description": "Kurt ve Yunus elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kurt adam meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "gunes"
          ]
      ]
  },
  "dinozor": {
      "id": "dinozor",
      "name": "Dinozor",
      "description": "Kaplumbağa, Okyanus ve Örümcek elementlerinin dengeli füzyonuyla yeni bir form olan dinozor sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#15803d",
          "secondary": "#84cc16",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bef264",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "isik"
          ]
      ]
  },
  "demiryolu": {
      "id": "demiryolu",
      "name": "Demiryolu",
      "description": "Buhar Jeneratörü ve Buhar Motoru elementlerinin anlamsal ve fiziksel etkileşimi sonucunda demiryolu meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "yildirim"
          ]
      ]
  },
  "tutulma": {
      "id": "tutulma",
      "name": "Tutulma",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan tutulma sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#1e1b4b",
          "secondary": "#312e81",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#818cf8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "buz"
          ]
      ]
  },
  "kul": {
      "id": "kul",
      "name": "Kül",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kül ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "tas"
          ]
      ]
  },
  "felsefe_tasi": {
      "id": "felsefe_tasi",
      "name": "Felsefe Taşı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla felsefe taşı ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "i_p",
              "pamuk",
              "toprak"
          ]
      ]
  },
  "kus": {
      "id": "kus",
      "name": "Kuş",
      "description": "Kurbağa, Kurşun ve İğne elementlerinin dengeli füzyonuyla yeni bir form olan kuş sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yasam",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "ruzgar"
          ]
      ]
  },
  "alkol": {
      "id": "alkol",
      "name": "Alkol",
      "description": "Alet, Barut Fıçısı ve Limon elementlerinin dengeli füzyonuyla yeni bir form olan alkol sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "seker",
              "bakteri"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "ates",
              "bakteri"
          ]
      ]
  },
  "pamuk": {
      "id": "pamuk",
      "name": "Pamuk",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla pamuk ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "bulut"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "bitki",
              "bulut",
              "tohum"
          ]
      ]
  },
  "motosiklet": {
      "id": "motosiklet",
      "name": "Motosiklet",
      "description": "Bisiklet ve İçten Yanmalı Motor elementlerinin anlamsal ve fiziksel etkileşimi sonucunda motosiklet meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "hava"
          ]
      ]
  },
  "zumrut": {
      "id": "zumrut",
      "name": "Zümrüt",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla zümrüt ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#059669",
          "secondary": "#6ee7b7",
          "emissive": "#064e3b"
      },
      "particles": {
          "type": "spark",
          "color": "#d1fae5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "bitki"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "bitki",
              "toprak"
          ]
      ]
  },
  "aku": {
      "id": "aku",
      "name": "Akü",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla akü ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "ruzgar"
          ]
      ]
  },
  "tufek": {
      "id": "tufek",
      "name": "Tüfek",
      "description": "Harç ve Rün elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tüfek meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "i_p",
              "pamuk",
              "hava"
          ]
      ]
  },
  "palmiye": {
      "id": "palmiye",
      "name": "Palmiye",
      "description": "Melek, Pamuk ve Çorba elementlerinin dengeli füzyonuyla yeni bir form olan palmiye sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "kum"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "agac",
              "kum",
              "vaha"
          ]
      ]
  },
  "tunel": {
      "id": "tunel",
      "name": "Tünel",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla tünel ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "enerji",
              "ates",
              "toprak"
          ]
      ]
  },
  "celik": {
      "id": "celik",
      "name": "Çelik",
      "description": "Beton, Bronz ve Demir Kalkan elementlerinin dengeli füzyonuyla yeni bir form olan çelik sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "kus_tuyu"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "kus_tuyu"
          ]
      ]
  },
  "mana": {
      "id": "mana",
      "name": "Mana",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mana ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "gunes"
          ]
      ]
  },
  "zeytin": {
      "id": "zeytin",
      "name": "Zeytin",
      "description": "Balta ve Nilüfer elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zeytin meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#15803d",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#86efac",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "tohum"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "agac",
              "tohum",
              "gunes"
          ]
      ]
  },
  "recine": {
      "id": "recine",
      "name": "Reçine",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla reçine ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "agac",
              "ates",
              "gunes"
          ]
      ]
  },
  "tepe": {
      "id": "tepe",
      "name": "Tepe",
      "description": "Toprağın su ile doyması ve yoğrulması sonucu viskoz ve şekillendirilebilir tepe meydana gelir.",
      "tier": 2,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "toprak",
              "toprak",
              "ates"
          ]
      ]
  },
  "muze": {
      "id": "muze",
      "name": "Müze",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan müze sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ev",
              "fosil"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "odun",
              "tugla_duvar",
              "fosil"
          ]
      ]
  },
  "firtina_bulutu": {
      "id": "firtina_bulutu",
      "name": "Fırtına Bulutu",
      "description": "Gökkuşağı ve Çamur elementlerinin anlamsal ve fiziksel etkileşimi sonucunda fırtına bulutu meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "firtina",
              "bulut"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "ruzgar",
              "bulut",
              "bulut"
          ]
      ]
  },
  "badem": {
      "id": "badem",
      "name": "Badem",
      "description": "Bitki, Karadelik ve Muz elementlerinin dengeli füzyonuyla yeni bir form olan badem sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "cicek"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "agac",
              "cicek",
              "tohum"
          ]
      ]
  },
  "kazan": {
      "id": "kazan",
      "name": "Kazan",
      "description": "Dinamolu Fener, Kasaba ve Zeytin elementlerinin dengeli füzyonuyla yeni bir form olan kazan sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "ates"
          ]
      ]
  },
  "piramit": {
      "id": "piramit",
      "name": "Piramit",
      "description": "Granit, Gökkuşağı ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan piramit sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "tapinak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "lav",
              "su",
              "tapinak"
          ]
      ]
  },
  "fotograf": {
      "id": "fotograf",
      "name": "Fotoğraf",
      "description": "Alçı, Ceviz ve Sinema elementlerinin dengeli füzyonuyla yeni bir form olan fotoğraf sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kamera",
              "kagit"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "cam",
              "yildirim",
              "kagit"
          ]
      ]
  },
  "barometre": {
      "id": "barometre",
      "name": "Barometre",
      "description": "Barut ve Barut Fıçısı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda barometre meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "ates"
          ]
      ]
  },
  "anka_kulu": {
      "id": "anka_kulu",
      "name": "Anka Külü",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla anka külü ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "anka_kusu",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kus",
              "ates",
              "ates"
          ]
      ]
  },
  "balina": {
      "id": "balina",
      "name": "Balina",
      "description": "Kaya, Liman ve Tavuk elementlerinin dengeli füzyonuyla yeni bir form olan balina sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "okyanus"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "okyanus",
              "deniz"
          ]
      ]
  },
  "kurbaga": {
      "id": "kurbaga",
      "name": "Kurbağa",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kurbağa ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "camur"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "camur"
          ]
      ]
  },
  "zeplin": {
      "id": "zeplin",
      "name": "Zeplin",
      "description": "Dinamit, Sinema ve İnek elementlerinin dengeli füzyonuyla yeni bir form olan zeplin sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "camur"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "camur"
          ]
      ]
  },
  "kale_kapisi": {
      "id": "kale_kapisi",
      "name": "Kale Kapısı",
      "description": "Demir Külçe ve Tünel elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kale kapısı meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "elmas"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "enerji",
              "ates",
              "elmas"
          ]
      ]
  },
  "evren": {
      "id": "evren",
      "name": "Evren",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla evren ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "tapinak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "tapinak"
          ]
      ]
  },
  "lif": {
      "id": "lif",
      "name": "Lif",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla lif ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "pamuk",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "pamuk",
              "ruzgar",
              "bitki"
          ]
      ]
  },
  "tilsim": {
      "id": "tilsim",
      "name": "Tılsım",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla tılsım ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "isik"
          ]
      ]
  },
  "yumurta": {
      "id": "yumurta",
      "name": "Yumurta",
      "description": "Karınca, Kuş ve Sarmaşık elementlerinin dengeli füzyonuyla yeni bir form olan yumurta sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "cikolata"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "cikolata"
          ]
      ]
  },
  "kagit_para": {
      "id": "kagit_para",
      "name": "Kağıt Para",
      "description": "Hazine, Pazar ve Zincir elementlerinin dengeli füzyonuyla yeni bir form olan kağıt para sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "tundra"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "tundra"
          ]
      ]
  },
  "baharat": {
      "id": "baharat",
      "name": "Baharat",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla baharat ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "buz"
          ]
      ]
  },
  "tundra": {
      "id": "tundra",
      "name": "Tundra",
      "description": "Nilüfer, Sera ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan tundra sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buzul",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "buzul",
              "toprak",
              "kar"
          ]
      ]
  },
  "radar": {
      "id": "radar",
      "name": "Radar",
      "description": "Radyo ve Teleskop elementlerinin anlamsal ve fiziksel etkileşimi sonucunda radar meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "yildirim"
          ]
      ]
  },
  "buharli_gemi": {
      "id": "buharli_gemi",
      "name": "Buharlı Gemi",
      "description": "Buhar Jeneratörü ve Denizanası elementlerinin anlamsal ve fiziksel etkileşimi sonucunda buharlı gemi meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "radar"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "radar"
          ]
      ]
  },
  "metropol": {
      "id": "metropol",
      "name": "Metropol",
      "description": "Kentaurluk ve Şehir elementlerinin anlamsal ve fiziksel etkileşimi sonucunda metropol meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sehir",
              "sehir"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "ev",
              "ev",
              "sehir"
          ]
      ]
  },
  "barut_ficisi": {
      "id": "barut_ficisi",
      "name": "Barut Fıçısı",
      "description": "Bataklık ve Felsefe Taşı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda barut fıçısı meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ea580c",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "barut",
              "odun"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "kukurt",
              "komur",
              "odun"
          ]
      ]
  },
  "kus_tuyu": {
      "id": "kus_tuyu",
      "name": "Kuş Tüyü",
      "description": "Kurşun ve İğne elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kuş tüyü meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "kus",
              "ruzgar",
              "hava"
          ]
      ]
  },
  "prizma": {
      "id": "prizma",
      "name": "Prizma",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla prizma ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "tas"
          ]
      ]
  },
  "sogan": {
      "id": "sogan",
      "name": "Soğan",
      "description": "Pamuk, Porselen ve Zeytinyağı elementlerinin dengeli füzyonuyla yeni bir form olan soğan sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kok",
              "su"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "kok",
              "su",
              "toprak"
          ]
      ]
  },
  "sise": {
      "id": "sise",
      "name": "Şişe",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şişe ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "su"
          ]
      ]
  },
  "krallik": {
      "id": "krallik",
      "name": "Krallık",
      "description": "Büyü Parşömeni, Uçurtma ve İmparatorluk elementlerinin dengeli füzyonuyla yeni bir form olan krallık sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "toprak",
              "yasam",
              "orman"
          ]
      ]
  },
  "gumus": {
      "id": "gumus",
      "name": "Gümüş",
      "description": "Altın Sikke ve Bronz elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gümüş meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "isik"
          ]
      ]
  },
  "pil": {
      "id": "pil",
      "name": "Pil",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla pil ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "elektrik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "elektrik"
          ]
      ]
  },
  "domates": {
      "id": "domates",
      "name": "Domates",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla domates ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "toprak",
              "yasam",
              "deniz"
          ]
      ]
  },
  "resim": {
      "id": "resim",
      "name": "Resim",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla resim ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "gumus"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "gumus"
          ]
      ]
  },
  "bataklik": {
      "id": "bataklik",
      "name": "Bataklık",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla bataklık ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "camur",
              "bitki"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "camur",
              "bitki",
              "su"
          ]
      ]
  },
  "radyasyon": {
      "id": "radyasyon",
      "name": "Radyasyon",
      "description": "Nebula, Yıldırım ve Yıldırım Parşömeni elementlerinin dengeli füzyonuyla yeni bir form olan radyasyon sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#22c55e",
          "secondary": "#86efac",
          "emissive": "#15803d"
      },
      "particles": {
          "type": "spark",
          "color": "#4ade80",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "sise"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "sise"
          ]
      ]
  },
  "kalem": {
      "id": "kalem",
      "name": "Kalem",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kalem ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "toprak"
          ]
      ]
  },
  "i_plik": {
      "id": "i_plik",
      "name": "İplik",
      "description": "Porselen ve İp elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇plik meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_p",
              "i_p"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "i_p",
              "i_p",
              "lif"
          ]
      ]
  },
  "kopek": {
      "id": "kopek",
      "name": "Köpek",
      "description": "Baykuş ve Hayvan elementlerinin anlamsal ve fiziksel etkileşimi sonucunda köpek meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "toprak",
              "yasam",
              "dag"
          ]
      ]
  },
  "balta": {
      "id": "balta",
      "name": "Balta",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla balta ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "toprak",
              "yasam",
              "gunes"
          ]
      ]
  },
  "alacakaranlik": {
      "id": "alacakaranlik",
      "name": "Alacakaranlık",
      "description": "Gökkuşağı ve Mızrak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda alacakaranlık meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#1e1b4b",
          "secondary": "#312e81",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#818cf8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "prizma"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "prizma"
          ]
      ]
  },
  "enerji": {
      "id": "enerji",
      "name": "Enerji",
      "description": "Elektrik ve Resim elementlerinin anlamsal ve fiziksel etkileşimi sonucunda enerji meydana gelir.",
      "tier": 2,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#38bdf8",
          "emissive": "#ca8a04"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ates",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "electric",
      "trioRecipes": [
          [
              "ates",
              "hava",
              "hava"
          ]
      ]
  },
  "bilgisayar": {
      "id": "bilgisayar",
      "name": "Bilgisayar",
      "description": "Siber Kristal, Tablo ve İnternet elementlerinin dengeli füzyonuyla yeni bir form olan bilgisayar sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "hava"
          ]
      ]
  },
  "kaplumbaga": {
      "id": "kaplumbaga",
      "name": "Kaplumbağa",
      "description": "Balık ve Örümcek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kaplumbağa meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "toprak",
              "yasam",
              "buz"
          ]
      ]
  },
  "fayton": {
      "id": "fayton",
      "name": "Fayton",
      "description": "Odun, Tutulma ve Tüy elementlerinin dengeli füzyonuyla yeni bir form olan fayton sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "orman"
          ]
      ]
  },
  "agac_kabugu": {
      "id": "agac_kabugu",
      "name": "Ağaç Kabuğu",
      "description": "Ahşap Kalkan, Elmas ve Meyve Bahçesi elementlerinin dengeli füzyonuyla yeni bir form olan ağaç kabuğu sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "leaf",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "agac",
              "hava",
              "ruzgar"
          ]
      ]
  },
  "uzay_gemisi": {
      "id": "uzay_gemisi",
      "name": "Uzay Gemisi",
      "description": "Geyik ve Uzay elementlerinin anlamsal ve fiziksel etkileşimi sonucunda uzay gemisi meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "barut_ficisi"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "barut_ficisi"
          ]
      ]
  },
  "demir_zirh": {
      "id": "demir_zirh",
      "name": "Demir Zırh",
      "description": "Demir Kalkan ve Demir Külçe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda demir zırh meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "metropol"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "metropol"
          ]
      ]
  },
  "galaksi": {
      "id": "galaksi",
      "name": "Galaksi",
      "description": "Minyatür Yıldız ve Nebula elementlerinin anlamsal ve fiziksel etkileşimi sonucunda galaksi meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "buharli_gemi"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "buharli_gemi"
          ]
      ]
  },
  "muska": {
      "id": "muska",
      "name": "Muska",
      "description": "Makas, Muz ve Tufan elementlerinin dengeli füzyonuyla yeni bir form olan muska sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "enerji"
          ]
      ]
  },
  "peynir": {
      "id": "peynir",
      "name": "Peynir",
      "description": "Grifon, Nilüfer ve Vadi elementlerinin dengeli füzyonuyla yeni bir form olan peynir sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "isik"
          ]
      ]
  },
  "kule": {
      "id": "kule",
      "name": "Kule",
      "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kule meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kale",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "kale",
              "tas",
              "ruzgar"
          ]
      ]
  },
  "i_lkel_bicak": {
      "id": "i_lkel_bicak",
      "name": "İlkel Bıçak",
      "description": "Metal Bıçak ve Porselen elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇lkel bıçak meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "i_p",
              "pamuk",
              "enerji"
          ]
      ]
  },
  "top": {
      "id": "top",
      "name": "Top",
      "description": "Hücre, Salça ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan top sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "i_p",
              "pamuk",
              "isik"
          ]
      ]
  },
  "buz_dagi": {
      "id": "buz_dagi",
      "name": "Buz Dağı",
      "description": "Buz ve Buzul elementlerinin anlamsal ve fiziksel etkileşimi sonucunda buz dağı meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#e0f2fe",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "bubble",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buzul",
              "okyanus"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "buzul",
              "okyanus",
              "deniz"
          ]
      ]
  },
  "uzay": {
      "id": "uzay",
      "name": "Uzay",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan uzay sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#1e1b4b",
          "secondary": "#312e81",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#818cf8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "deniz"
          ]
      ]
  },
  "cin": {
      "id": "cin",
      "name": "Cin",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla cin ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_p",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "lif",
              "lif",
              "ates"
          ]
      ]
  },
  "saray": {
      "id": "saray",
      "name": "Saray",
      "description": "Makas, Nane ve Tavuk elementlerinin dengeli füzyonuyla yeni bir form olan saray sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_p",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "lif",
              "lif",
              "su"
          ]
      ]
  },
  "i_ksir": {
      "id": "i_ksir",
      "name": "İksir",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla i̇ksir ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_p",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "lif",
              "lif",
              "toprak"
          ]
      ]
  },
  "civi": {
      "id": "civi",
      "name": "Çivi",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çivi ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "dag"
          ]
      ]
  },
  "banka": {
      "id": "banka",
      "name": "Banka",
      "description": "Barut, Kağıt Para ve Zincir elementlerinin dengeli füzyonuyla yeni bir form olan banka sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "halat"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "halat"
          ]
      ]
  },
  "altar": {
      "id": "altar",
      "name": "Altar",
      "description": "Anıt ve Prizma Taşı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda altar meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "baharat"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "baharat"
          ]
      ]
  },
  "ayi": {
      "id": "ayi",
      "name": "Ayı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ayı ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "magara"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "magara"
          ]
      ]
  },
  "kristal": {
      "id": "kristal",
      "name": "Kristal",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kristal ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#f0f9ff",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "spark",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "ruzgar"
          ]
      ]
  },
  "yatak": {
      "id": "yatak",
      "name": "Yatak",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yatak ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "gunes"
          ]
      ]
  },
  "nehir": {
      "id": "nehir",
      "name": "Nehir",
      "description": "Göl ve Gölge elementlerinin anlamsal ve fiziksel etkileşimi sonucunda nehir meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "gol",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "gol",
              "dag",
              "su"
          ]
      ]
  },
  "sincap": {
      "id": "sincap",
      "name": "Sincap",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sincap ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "agac"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "agac"
          ]
      ]
  },
  "turbin": {
      "id": "turbin",
      "name": "Türbin",
      "description": "Kule ve Meşale elementlerinin anlamsal ve fiziksel etkileşimi sonucunda türbin meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kristal",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "ruzgar",
              "ates"
          ]
      ]
  },
  "ahtapot": {
      "id": "ahtapot",
      "name": "Ahtapot",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ahtapot ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#9333ea",
          "secondary": "#c084fc",
          "emissive": "#581c87"
      },
      "particles": {
          "type": "spark",
          "color": "#f0abfc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "yosun"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "yosun",
              "deniz"
          ]
      ]
  },
  "yelken": {
      "id": "yelken",
      "name": "Yelken",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yelken ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "i_p",
              "pamuk",
              "ruzgar"
          ]
      ]
  },
  "bal": {
      "id": "bal",
      "name": "Bal",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla bal ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "civi"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "civi"
          ]
      ]
  },
  "baykus": {
      "id": "baykus",
      "name": "Baykuş",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla baykuş ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kus",
              "orman",
              "isik"
          ]
      ]
  },
  "bisiklet": {
      "id": "bisiklet",
      "name": "Bisiklet",
      "description": "Lokomotif ve Tekerlek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda bisiklet meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "civi"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "civi"
          ]
      ]
  },
  "televizyon": {
      "id": "televizyon",
      "name": "Televizyon",
      "description": "Cam, Sinema ve Tiyatro elementlerinin dengeli füzyonuyla yeni bir form olan televizyon sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "kagit_para"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "kagit_para"
          ]
      ]
  },
  "murekkep": {
      "id": "murekkep",
      "name": "Mürekkep",
      "description": "Porselen ve Yazı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda mürekkep meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "komur",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "odun",
              "ates",
              "su"
          ]
      ]
  },
  "tereyagi": {
      "id": "tereyagi",
      "name": "Tereyağı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla tereyağı ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "buz"
          ]
      ]
  },
  "demir": {
      "id": "demir",
      "name": "Demir",
      "description": "Demir Kalkan ve Demir Külçe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda demir meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "toprak"
          ]
      ]
  },
  "havyar": {
      "id": "havyar",
      "name": "Havyar",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla havyar ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "tuz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "tuz"
          ]
      ]
  },
  "grifon": {
      "id": "grifon",
      "name": "Grifon",
      "description": "Geyik ve Kartal elementlerinin anlamsal ve fiziksel etkileşimi sonucunda grifon meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "orman"
          ]
      ]
  },
  "biber": {
      "id": "biber",
      "name": "Biber",
      "description": "Evren ve Kristal elementlerinin anlamsal ve fiziksel etkileşimi sonucunda biber meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "deniz"
          ]
      ]
  },
  "asa": {
      "id": "asa",
      "name": "Asa",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla asa ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "kristal"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "kristal"
          ]
      ]
  },
  "obsidyen_bicak": {
      "id": "obsidyen_bicak",
      "name": "Obsidyen Bıçak",
      "description": "Meltem ve Metal Bıçak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda obsidyen bıçak meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "obsidyen",
              "odun"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "lav",
              "tas",
              "odun"
          ]
      ]
  },
  "comlek": {
      "id": "comlek",
      "name": "Çömlek",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çömlek ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "dag"
          ]
      ]
  },
  "kar": {
      "id": "kar",
      "name": "Kar",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kar ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#e0f2fe",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "bubble",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bulut",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "bulut",
              "buz",
              "hava"
          ]
      ]
  },
  "elmas": {
      "id": "elmas",
      "name": "Elmas",
      "description": "Kedi, Obelisk ve Çilek elementlerinin dengeli füzyonuyla yeni bir form olan elmas sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#f0f9ff",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "spark",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "komur",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "komur",
              "tas",
              "enerji"
          ]
      ]
  },
  "bronz": {
      "id": "bronz",
      "name": "Bronz",
      "description": "Granit ve Taş elementlerinin anlamsal ve fiziksel etkileşimi sonucunda bronz meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#c2410c",
          "secondary": "#fb923c",
          "emissive": "#7c2d12"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "yumurta"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "yumurta"
          ]
      ]
  },
  "runik_zirh": {
      "id": "runik_zirh",
      "name": "Runik Zırh",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla runik zırh ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir_zirh",
              "run"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sarimsak",
              "metropol",
              "run"
          ]
      ]
  },
  "obsidyen": {
      "id": "obsidyen",
      "name": "Obsidyen",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla obsidyen ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "lav",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "lav",
              "tas",
              "su"
          ]
      ]
  },
  "kopekbaligi": {
      "id": "kopekbaligi",
      "name": "Köpekbalığı",
      "description": "Balık ve Denizanası elementlerinin anlamsal ve fiziksel etkileşimi sonucunda köpekbalığı meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "ruzgar"
          ]
      ]
  },
  "sera": {
      "id": "sera",
      "name": "Sera",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sera ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "bitki"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "bitki"
          ]
      ]
  },
  "kita": {
      "id": "kita",
      "name": "Kıta",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kıta ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ada",
              "ada"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "ada",
              "ada",
              "okyanus"
          ]
      ]
  },
  "makas": {
      "id": "makas",
      "name": "Makas",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan makas sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "ates"
          ]
      ]
  },
  "ejderha": {
      "id": "ejderha",
      "name": "Ejderha",
      "description": "Ahtapot ve Yelken elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ejderha meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#15803d",
          "secondary": "#84cc16",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bef264",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "dinozor",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "hayvan",
              "isik",
              "ates"
          ]
      ]
  },
  "firtina": {
      "id": "firtina",
      "name": "Fırtına",
      "description": "Kalkan ve Kasırga elementlerinin anlamsal ve fiziksel etkileşimi sonucunda fırtına meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ruzgar",
              "bulut"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "ruzgar",
              "bulut",
              "enerji"
          ]
      ]
  },
  "buyu": {
      "id": "buyu",
      "name": "Büyü",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla büyü ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "enerji",
              "yasam"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "enerji",
              "camur",
              "enerji"
          ]
      ]
  },
  "beton": {
      "id": "beton",
      "name": "Beton",
      "description": "Granit ve Çimento elementlerinin anlamsal ve fiziksel etkileşimi sonucunda beton meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "harc",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "harc",
              "tas",
              "kum"
          ]
      ]
  },
  "siber_kristal": {
      "id": "siber_kristal",
      "name": "Siber Kristal",
      "description": "Cin, Runik Zırh ve Zırh elementlerinin dengeli füzyonuyla yeni bir form olan siber kristal sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#f0f9ff",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "spark",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kristal",
              "su"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "agac",
              "ruzgar",
              "su"
          ]
      ]
  },
  "demir_kalkan": {
      "id": "demir_kalkan",
      "name": "Demir Kalkan",
      "description": "Demir Külçe ve Kalkan elementlerinin anlamsal ve fiziksel etkileşimi sonucunda demir kalkan meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "tilsim"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "tilsim"
          ]
      ]
  },
  "kopru": {
      "id": "kopru",
      "name": "Köprü",
      "description": "Baraj, Tuğla Duvar ve Yol elementlerinin dengeli füzyonuyla yeni bir form olan köprü sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "nehir"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "odun",
              "nehir",
              "tas"
          ]
      ]
  },
  "ekmek": {
      "id": "ekmek",
      "name": "Ekmek",
      "description": "Kavrulmuş Et ve Sarmaşık elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ekmek meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hamur",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "hamur",
              "ates",
              "un"
          ]
      ]
  },
  "anahtar": {
      "id": "anahtar",
      "name": "Anahtar",
      "description": "Kilit, Kürek ve Şifa İksiri elementlerinin dengeli füzyonuyla yeni bir form olan anahtar sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "su"
          ]
      ]
  },
  "biyonik_kol": {
      "id": "biyonik_kol",
      "name": "Biyonik Kol",
      "description": "Kutsal Kase ve Köy elementlerinin anlamsal ve fiziksel etkileşimi sonucunda biyonik kol meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "cicek",
              "isik",
              "enerji"
          ]
      ]
  },
  "kurabiye": {
      "id": "kurabiye",
      "name": "Kurabiye",
      "description": "Ekmek, Sarımsak ve Şeker elementlerinin dengeli füzyonuyla yeni bir form olan kurabiye sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "un",
              "tereyagi"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bugday",
              "tas",
              "tereyagi"
          ]
      ]
  },
  "kahve": {
      "id": "kahve",
      "name": "Kahve",
      "description": "Limon, Tabanca ve Çikolata elementlerinin dengeli füzyonuyla yeni bir form olan kahve sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#451a03",
          "secondary": "#92400e",
          "emissive": "#260c02"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tohum",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "tohum",
              "ates",
              "su"
          ]
      ]
  },
  "celik_kulce": {
      "id": "celik_kulce",
      "name": "Çelik Külçe",
      "description": "Bronz ve Demir Kalkan elementlerinin anlamsal ve fiziksel etkileşimi sonucunda çelik külçe meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "korfez"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "korfez"
          ]
      ]
  },
  "kutuphane": {
      "id": "kutuphane",
      "name": "Kütüphane",
      "description": "Gazete, Kitap ve Müze elementlerinin dengeli füzyonuyla yeni bir form olan kütüphane sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "isik"
          ]
      ]
  },
  "deri": {
      "id": "deri",
      "name": "Deri",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla deri ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "buz"
          ]
      ]
  },
  "zombi": {
      "id": "zombi",
      "name": "Zombi",
      "description": "Pamuk ve Runik Zırh elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zombi meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "toprak"
          ]
      ]
  },
  "ayna": {
      "id": "ayna",
      "name": "Ayna",
      "description": "Anka Külü ve Ay elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ayna meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "gumus"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "gumus"
          ]
      ]
  },
  "platin": {
      "id": "platin",
      "name": "Platin",
      "description": "Pil ve Sincap elementlerinin anlamsal ve fiziksel etkileşimi sonucunda platin meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "elmas"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "elmas"
          ]
      ]
  },
  "i_mparatorluk": {
      "id": "i_mparatorluk",
      "name": "İmparatorluk",
      "description": "Büyü Parşömeni, Medeniyet ve Odun elementlerinin dengeli füzyonuyla yeni bir form olan i̇mparatorluk sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "krallik",
              "kale"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "orman",
              "kale"
          ]
      ]
  },
  "tesla_bobini": {
      "id": "tesla_bobini",
      "name": "Tesla Bobini",
      "description": "Kurt, Robot ve Titanyum elementlerinin dengeli füzyonuyla yeni bir form olan tesla bobini sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "elektrik",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yildirim",
              "enerji",
              "demir"
          ]
      ]
  },
  "yildirim": {
      "id": "yildirim",
      "name": "Yıldırım",
      "description": "Buzul ve Fırtına Kılıcı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yıldırım meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#38bdf8",
          "emissive": "#ca8a04"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "firtina",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "electric",
      "trioRecipes": [
          [
              "firtina",
              "enerji",
              "bulut"
          ]
      ]
  },
  "kumas": {
      "id": "kumas",
      "name": "Kumaş",
      "description": "Porselen ve Çekiç elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kumaş meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_p",
              "pamuk"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "lif",
              "lif",
              "pamuk"
          ]
      ]
  },
  "gayzer": {
      "id": "gayzer",
      "name": "Gayzer",
      "description": "Kristal, Reçel ve Çekiç elementlerinin dengeli füzyonuyla yeni bir form olan gayzer sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "volkan"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "su",
              "volkan",
              "buhar"
          ]
      ]
  },
  "sut": {
      "id": "sut",
      "name": "Süt",
      "description": "Hayvan, Kavrulmuş Et ve Sarmaşık elementlerinin dengeli füzyonuyla yeni bir form olan süt sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarimsak",
              "lif"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "lif"
          ]
      ]
  },
  "hava": {
      "id": "hava",
      "name": "Hava",
      "description": "Görünmez rüzgâr, nefes ve hareket.",
      "tier": 1,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": null,
      "icon": "💨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": []
  },
  "gol": {
      "id": "gol",
      "name": "Göl",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan göl sentezlenir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "camur"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "su",
              "camur",
              "toprak"
          ]
      ]
  },
  "vinc": {
      "id": "vinc",
      "name": "Vinç",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla vinç ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "halat",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "i_p",
              "lif",
              "demir"
          ]
      ]
  },
  "asit_yagmuru": {
      "id": "asit_yagmuru",
      "name": "Asit Yağmuru",
      "description": "Kalkan, Kasırga ve Yoğurt elementlerinin dengeli füzyonuyla yeni bir form olan asit yağmuru sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "ev"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "ev"
          ]
      ]
  },
  "yogurt": {
      "id": "yogurt",
      "name": "Yoğurt",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yoğurt ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "tufan"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "tufan"
          ]
      ]
  },
  "asteroit": {
      "id": "asteroit",
      "name": "Asteroit",
      "description": "Ametist, Aslan ve Fosil elementlerinin dengeli füzyonuyla yeni bir form olan asteroit sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kristal",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "agac",
              "ruzgar",
              "toprak"
          ]
      ]
  },
  "gozetleme_kulesi": {
      "id": "gozetleme_kulesi",
      "name": "Gözetleme Kulesi",
      "description": "Granit, Gökkuşağı ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan gözetleme kulesi sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kristal",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "kristal",
              "hava",
              "ates"
          ]
      ]
  },
  "civa": {
      "id": "civa",
      "name": "Cıva",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla cıva ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "su"
          ]
      ]
  },
  "bal_kavanozu": {
      "id": "bal_kavanozu",
      "name": "Bal Kavanozu",
      "description": "Kasaba ve Kutsal Kase elementlerinin anlamsal ve fiziksel etkileşimi sonucunda bal kavanozu meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bal",
              "cam"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "celik",
              "civi",
              "cam"
          ]
      ]
  },
  "gitar": {
      "id": "gitar",
      "name": "Gitar",
      "description": "Müzik, Tekerlek ve Tüfek elementlerinin dengeli füzyonuyla yeni bir form olan gitar sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "hava"
          ]
      ]
  },
  "ates_topu_kitabi": {
      "id": "ates_topu_kitabi",
      "name": "Ateş Topu Kitabı",
      "description": "Ateş, Büyü Parşömeni ve Dinamit elementlerinin dengeli füzyonuyla yeni bir form olan ateş topu kitabı sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kristal",
              "elmas"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "agac",
              "ruzgar",
              "elmas"
          ]
      ]
  },
  "aslan": {
      "id": "aslan",
      "name": "Aslan",
      "description": "Akrep ve Odun elementlerinin anlamsal ve fiziksel etkileşimi sonucunda aslan meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#f59e0b",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "tas"
          ]
      ]
  },
  "yunus": {
      "id": "yunus",
      "name": "Yunus",
      "description": "Kristal ve Odun elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yunus meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "enerji",
              "okyanus"
          ]
      ]
  },
  "elektrik": {
      "id": "elektrik",
      "name": "Elektrik",
      "description": "Elektrik Motoru ve Işık elementlerinin anlamsal ve fiziksel etkileşimi sonucunda elektrik meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#38bdf8",
          "emissive": "#ca8a04"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yildirim",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "electric",
      "trioRecipes": [
          [
              "yildirim",
              "enerji",
              "tas"
          ]
      ]
  },
  "yarimada": {
      "id": "yarimada",
      "name": "Yarımada",
      "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yarımada meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ada",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "ada",
              "toprak",
              "deniz"
          ]
      ]
  },
  "cay": {
      "id": "cay",
      "name": "Çay",
      "description": "Kahve ve İpek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda çay meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#f59e0b",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yaprak",
              "buhar"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "yaprak",
              "buhar",
              "su"
          ]
      ]
  },
  "ucak": {
      "id": "ucak",
      "name": "Uçak",
      "description": "Gezegen, Roket ve İçten Yanmalı Motor elementlerinin dengeli füzyonuyla yeni bir form olan uçak sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "isik",
              "firtina",
              "enerji"
          ]
      ]
  },
  "bakteri": {
      "id": "bakteri",
      "name": "Bakteri",
      "description": "Köpekbalığı, Pasta ve İllüzyon Aynası elementlerinin dengeli füzyonuyla yeni bir form olan bakteri sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hucre",
              "camur"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "hucre",
              "camur",
              "su"
          ]
      ]
  },
  "tuz": {
      "id": "tuz",
      "name": "Tuz",
      "description": "Tufan ve Tüy elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tuz meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deniz",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "deniz",
              "ates",
              "toprak"
          ]
      ]
  },
  "koyun": {
      "id": "koyun",
      "name": "Koyun",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla koyun ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "cimen"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "cimen"
          ]
      ]
  },
  "altin": {
      "id": "altin",
      "name": "Altın",
      "description": "Altın Sikke ve Bronz elementlerinin anlamsal ve fiziksel etkileşimi sonucunda altın meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fef08a",
          "emissive": "#a16207"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "ruzgar"
          ]
      ]
  },
  "olta": {
      "id": "olta",
      "name": "Olta",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla olta ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "su",
              "orman"
          ]
      ]
  },
  "col": {
      "id": "col",
      "name": "Çöl",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çöl ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kum",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "gunes",
              "ruzgar"
          ]
      ]
  },
  "vadi": {
      "id": "vadi",
      "name": "Vadi",
      "description": "Cıva ve Deri elementlerinin anlamsal ve fiziksel etkileşimi sonucunda vadi meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "su",
              "deniz"
          ]
      ]
  },
  "nebula": {
      "id": "nebula",
      "name": "Nebula",
      "description": "Evren, Gezegen ve Gökkuşağı elementlerinin dengeli füzyonuyla yeni bir form olan nebula sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "ates"
          ]
      ]
  },
  "mermer": {
      "id": "mermer",
      "name": "Mermer",
      "description": "Hamur ve Mercek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda mermer meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "kirec"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "kirec",
              "dag"
          ]
      ]
  },
  "muzik": {
      "id": "muzik",
      "name": "Müzik",
      "description": "Ceviz, Muz ve Ruh elementlerinin dengeli füzyonuyla yeni bir form olan müzik sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "fay_hatti"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "fay_hatti"
          ]
      ]
  },
  "korfez": {
      "id": "korfez",
      "name": "Körfez",
      "description": "Baharat, Göl ve Gölge elementlerinin dengeli füzyonuyla yeni bir form olan körfez sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deniz",
              "yarimada"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "deniz",
              "yarimada",
              "su"
          ]
      ]
  },
  "testere": {
      "id": "testere",
      "name": "Testere",
      "description": "Harç ve Resim elementlerinin anlamsal ve fiziksel etkileşimi sonucunda testere meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "buhar"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "buhar"
          ]
      ]
  },
  "halat": {
      "id": "halat",
      "name": "Halat",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla halat ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_p",
              "lif"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "i_p",
              "i_p",
              "i_p"
          ]
      ]
  },
  "ampul": {
      "id": "ampul",
      "name": "Ampul",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ampul ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "elektrik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "elektrik"
          ]
      ]
  },
  "yapay_zeka": {
      "id": "yapay_zeka",
      "name": "Yapay Zeka",
      "description": "Havyar ve Koyun elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yapay zeka meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bilgisayar",
              "yasam"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "celik",
              "hava",
              "yasam"
          ]
      ]
  },
  "cikolata": {
      "id": "cikolata",
      "name": "Çikolata",
      "description": "Kurabiye ve Sarmaşık elementlerinin anlamsal ve fiziksel etkileşimi sonucunda çikolata meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#3b1a08",
          "secondary": "#78350f",
          "emissive": "#1c0a02"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tohum",
              "seker"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bitki",
              "ruzgar",
              "seker"
          ]
      ]
  },
  "kaldirim": {
      "id": "kaldirim",
      "name": "Kaldırım",
      "description": "Mana İksiri, Mancınık ve Sağlam Sandık elementlerinin dengeli füzyonuyla yeni bir form olan kaldırım sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yol",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "kum",
              "tas"
          ]
      ]
  },
  "seytan": {
      "id": "seytan",
      "name": "Şeytan",
      "description": "Tanrı ve Zehir Şişesi elementlerinin anlamsal ve fiziksel etkileşimi sonucunda şeytan meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "su"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "su"
          ]
      ]
  },
  "orumcek": {
      "id": "orumcek",
      "name": "Örümcek",
      "description": "Kurbağa ve Kurşun elementlerinin anlamsal ve fiziksel etkileşimi sonucunda örümcek meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "i_plik"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "i_plik"
          ]
      ]
  },
  "sirke": {
      "id": "sirke",
      "name": "Sirke",
      "description": "Halat, Hesap Makinesi ve Köy elementlerinin dengeli füzyonuyla yeni bir form olan sirke sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "enerji"
          ]
      ]
  },
  "bicak": {
      "id": "bicak",
      "name": "Bıçak",
      "description": "Metal Bıçak ve Porselen elementlerinin anlamsal ve fiziksel etkileşimi sonucunda bıçak meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "isik"
          ]
      ]
  },
  "tas": {
      "id": "tas",
      "name": "Taş",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla taş ortaya çıkar.",
      "tier": 3,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "lav",
              "su"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "lav",
              "su",
              "toprak"
          ]
      ]
  },
  "kasirga": {
      "id": "kasirga",
      "name": "Kasırga",
      "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan kasırga sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hortum",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "hortum",
              "deniz",
              "okyanus"
          ]
      ]
  },
  "meltem": {
      "id": "meltem",
      "name": "Meltem",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla meltem ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ruzgar",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "ruzgar",
              "deniz",
              "hava"
          ]
      ]
  },
  "tutun": {
      "id": "tutun",
      "name": "Tütün",
      "description": "Alkol, Kömür ve Çiçek elementlerinin dengeli füzyonuyla yeni bir form olan tütün sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yaprak",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "agac",
              "isik",
              "ates"
          ]
      ]
  },
  "girdap": {
      "id": "girdap",
      "name": "Girdap",
      "description": "Geyik ve Çivi elementlerinin anlamsal ve fiziksel etkileşimi sonucunda girdap meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "bitki",
              "su",
              "dag"
          ]
      ]
  },
  "dag": {
      "id": "dag",
      "name": "Dağ",
      "description": "Granit ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda dağ meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "fay_hatti"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "fay_hatti",
              "toprak"
          ]
      ]
  },
  "karpuz": {
      "id": "karpuz",
      "name": "Karpuz",
      "description": "Kasaba ve Kulübe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda karpuz meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tohum",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bitki",
              "ruzgar",
              "su"
          ]
      ]
  },
  "magara": {
      "id": "magara",
      "name": "Mağara",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan mağara sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "dag",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "dag",
              "tas",
              "toprak"
          ]
      ]
  },
  "degirmen": {
      "id": "degirmen",
      "name": "Değirmen",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla değirmen ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "odun",
              "ruzgar",
              "bugday"
          ]
      ]
  },
  "davul": {
      "id": "davul",
      "name": "Davul",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla davul ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deri",
              "odun"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "cicek",
              "buz",
              "odun"
          ]
      ]
  },
  "kum_saati": {
      "id": "kum_saati",
      "name": "Kum Saati",
      "description": "Gezegen ve Kum elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kum saati meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "kum"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "kum"
          ]
      ]
  },
  "pegasus": {
      "id": "pegasus",
      "name": "Pegasus",
      "description": "Aurora, Kuş ve Nilüfer elementlerinin dengeli füzyonuyla yeni bir form olan pegasus sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "at",
              "kus_tuyu"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "enerji",
              "su",
              "kus_tuyu"
          ]
      ]
  },
  "elma": {
      "id": "elma",
      "name": "Elma",
      "description": "Elmas ve Kedi elementlerinin anlamsal ve fiziksel etkileşimi sonucunda elma meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "yosun",
              "hava",
              "enerji"
          ]
      ]
  },
  "yercekimsiz_platform": {
      "id": "yercekimsiz_platform",
      "name": "Yerçekimsiz Platform",
      "description": "Güneş Paneli, Lokomotif ve İnternet elementlerinin dengeli füzyonuyla yeni bir form olan yerçekimsiz platform sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "plato"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "plato"
          ]
      ]
  },
  "cadir": {
      "id": "cadir",
      "name": "Çadır",
      "description": "Gökkuşağı, Mantar ve Meşale elementlerinin dengeli füzyonuyla yeni bir form olan çadır sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kumas",
              "odun"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "kumas",
              "odun",
              "i_p"
          ]
      ]
  },
  "duman": {
      "id": "duman",
      "name": "Duman",
      "description": "Davul, Mermer ve Orman elementlerinin dengeli füzyonuyla yeni bir form olan duman sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "bitki",
              "su",
              "gunes"
          ]
      ]
  },
  "gulyabani": {
      "id": "gulyabani",
      "name": "Gulyabani",
      "description": "Geyik ve Gürz elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gulyabani meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "su",
              "isik"
          ]
      ]
  },
  "yagmur": {
      "id": "yagmur",
      "name": "Yağmur",
      "description": "Asit Yağmuru ve Fırtına elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yağmur meydana gelir.",
      "tier": 2,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "su",
              "su",
              "hava"
          ]
      ]
  },
  "i_p": {
      "id": "i_p",
      "name": "İp",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla i̇p ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "lif",
              "lif"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "pamuk",
              "ruzgar",
              "lif"
          ]
      ]
  },
  "fiyort": {
      "id": "fiyort",
      "name": "Fiyort",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla fiyort ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deniz",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "deniz",
              "dag",
              "buzul"
          ]
      ]
  },
  "recel": {
      "id": "recel",
      "name": "Reçel",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla reçel ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "civi"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "civi"
          ]
      ]
  },
  "aile": {
      "id": "aile",
      "name": "Aile",
      "description": "Ayı, Fındık ve Vida elementlerinin dengeli füzyonuyla yeni bir form olan aile sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "bitki",
              "su",
              "buz"
          ]
      ]
  },
  "kadirga": {
      "id": "kadirga",
      "name": "Kadırga",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kadırga ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "bicak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "bicak"
          ]
      ]
  },
  "un": {
      "id": "un",
      "name": "Un",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla un ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bugday",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bugday",
              "tas",
              "ruzgar"
          ]
      ]
  },
  "kanal": {
      "id": "kanal",
      "name": "Kanal",
      "description": "Buhar ve Tünel elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kanal meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "yesim"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "yesim"
          ]
      ]
  },
  "ahsap_kalkan": {
      "id": "ahsap_kalkan",
      "name": "Ahşap Kalkan",
      "description": "Barut Fıçısı, Meşale ve İpek elementlerinin dengeli füzyonuyla yeni bir form olan ahşap kalkan sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yosun",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yosun",
              "lav",
              "su"
          ]
      ]
  },
  "toprak": {
      "id": "toprak",
      "name": "Toprak",
      "description": "Sağlam temel, kaya ve bereket.",
      "tier": 1,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 8
      },
      "recipe": null,
      "icon": "🌍",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": []
  },
  "sis": {
      "id": "sis",
      "name": "Sis",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sis ortaya çıkar.",
      "tier": 3,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buhar",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "buhar",
              "toprak",
              "hava"
          ]
      ]
  },
  "fener_kulesi": {
      "id": "fener_kulesi",
      "name": "Fener Kulesi",
      "description": "Gökkuşağı ve Kule elementlerinin anlamsal ve fiziksel etkileşimi sonucunda fener kulesi meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kule",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "kale",
              "tas",
              "ates"
          ]
      ]
  },
  "yazi": {
      "id": "yazi",
      "name": "Yazı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yazı ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kalem",
              "kagit"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "celik",
              "toprak",
              "kagit"
          ]
      ]
  },
  "sehir": {
      "id": "sehir",
      "name": "Şehir",
      "description": "Ceviz ve Kentaurluk elementlerinin anlamsal ve fiziksel etkileşimi sonucunda şehir meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ev",
              "ev"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "odun",
              "tugla_duvar",
              "ev"
          ]
      ]
  },
  "nilufer": {
      "id": "nilufer",
      "name": "Nilüfer",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan nilüfer sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "cicek",
              "su",
              "deniz"
          ]
      ]
  },
  "tsunami": {
      "id": "tsunami",
      "name": "Tsunami",
      "description": "Denizaltı, Deprem ve Körfez elementlerinin dengeli füzyonuyla yeni bir form olan tsunami sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deniz",
              "deprem"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "deniz",
              "deprem",
              "okyanus"
          ]
      ]
  },
  "buhar_motoru": {
      "id": "buhar_motoru",
      "name": "Buhar Motoru",
      "description": "Buhar Jeneratörü ve Lokomotif elementlerinin anlamsal ve fiziksel etkileşimi sonucunda buhar motoru meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buhar",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "ates",
              "su",
              "demir"
          ]
      ]
  },
  "vampir": {
      "id": "vampir",
      "name": "Vampir",
      "description": "Maya, Yılan ve Zehir Şişesi elementlerinin dengeli füzyonuyla yeni bir form olan vampir sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "su",
              "agac",
              "toprak"
          ]
      ]
  },
  "mum": {
      "id": "mum",
      "name": "Mum",
      "description": "Ayı, Meşale ve Sis elementlerinin dengeli füzyonuyla yeni bir form olan mum sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bal",
              "i_p"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "celik",
              "civi",
              "i_p"
          ]
      ]
  },
  "kuvars": {
      "id": "kuvars",
      "name": "Kuvars",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kuvars ortaya çıkar.",
      "tier": 3,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#f0f9ff",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "spark",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kum",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "enerji",
              "cam"
          ]
      ]
  },
  "su_degirmeni": {
      "id": "su_degirmeni",
      "name": "Su Değirmeni",
      "description": "Asit Yağmuru ve Su Çömleği elementlerinin anlamsal ve fiziksel etkileşimi sonucunda su değirmeni meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "degirmen",
              "nehir"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "degirmen",
              "nehir",
              "su"
          ]
      ]
  },
  "uzum": {
      "id": "uzum",
      "name": "Üzüm",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla üzüm ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#7e22ce",
          "secondary": "#a855f7",
          "emissive": "#3b0764"
      },
      "particles": {
          "type": "spark",
          "color": "#d8b4fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sarmasik",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bitki",
              "agac",
              "isik"
          ]
      ]
  },
  "araba": {
      "id": "araba",
      "name": "Araba",
      "description": "Kıta, Uçurtma ve Zeytin elementlerinin dengeli füzyonuyla yeni bir form olan araba sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tekerlek",
              "at"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cam",
              "enerji",
              "at"
          ]
      ]
  },
  "manyetizma": {
      "id": "manyetizma",
      "name": "Manyetizma",
      "description": "Ametist, Büyü Parşömeni ve Evren elementlerinin dengeli füzyonuyla yeni bir form olan manyetizma sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "toprak"
          ]
      ]
  },
  "gunes_paneli": {
      "id": "gunes_paneli",
      "name": "Güneş Paneli",
      "description": "Güneş Saati, Kum Saati ve Teleskop elementlerinin dengeli füzyonuyla yeni bir form olan güneş paneli sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "cig"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "cig"
          ]
      ]
  },
  "pasta": {
      "id": "pasta",
      "name": "Pasta",
      "description": "Sarmaşık ve Tereyağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda pasta meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hamur",
              "seker"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "un",
              "su",
              "seker"
          ]
      ]
  },
  "karadelik": {
      "id": "karadelik",
      "name": "Karadelik",
      "description": "Kükürt, Runik Zırh ve Tünel elementlerinin dengeli füzyonuyla yeni bir form olan karadelik sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#1e1b4b",
          "secondary": "#312e81",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#818cf8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "hava"
          ]
      ]
  },
  "tugla_duvar": {
      "id": "tugla_duvar",
      "name": "Tuğla Duvar",
      "description": "Kule ve Tünel elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tuğla duvar meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tugla",
              "harc"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tugla",
              "harc",
              "cimento"
          ]
      ]
  },
  "mikroskop": {
      "id": "mikroskop",
      "name": "Mikroskop",
      "description": "Kemik, Mürekkep ve Teleskop elementlerinin dengeli füzyonuyla yeni bir form olan mikroskop sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "mercek",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cam",
              "toprak",
              "isik"
          ]
      ]
  },
  "bosluk_sisesi": {
      "id": "bosluk_sisesi",
      "name": "Boşluk Şişesi",
      "description": "Kehribar ve Çamur elementlerinin anlamsal ve fiziksel etkileşimi sonucunda boşluk şişesi meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "cali"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "cali"
          ]
      ]
  },
  "ada": {
      "id": "ada",
      "name": "Ada",
      "description": "Asa ve Olta elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ada meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deniz",
              "volkan"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "deniz",
              "volkan",
              "toprak"
          ]
      ]
  },
  "odun": {
      "id": "odun",
      "name": "Odun",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla odun ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "toprak"
          ]
      ]
  },
  "tablo": {
      "id": "tablo",
      "name": "Tablo",
      "description": "Meşale ve Reçel elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tablo meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "resim",
              "odun"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "sarimsak",
              "gumus",
              "odun"
          ]
      ]
  },
  "yildiz_tozu": {
      "id": "yildiz_tozu",
      "name": "Yıldız Tozu",
      "description": "Büyü Parşömeni ve Totem elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yıldız tozu meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "elmas"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "elmas"
          ]
      ]
  },
  "kayip_sehir": {
      "id": "kayip_sehir",
      "name": "Kayıp Şehir",
      "description": "Kentaurluk, Metropol ve Şehir elementlerinin dengeli füzyonuyla yeni bir form olan kayıp şehir sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sehir",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "ev",
              "ev",
              "orman"
          ]
      ]
  },
  "demir_parmaklik": {
      "id": "demir_parmaklik",
      "name": "Demir Parmaklık",
      "description": "Demir Kalkan ve Demir Külçe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda demir parmaklık meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "bambu"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "bambu"
          ]
      ]
  },
  "roket": {
      "id": "roket",
      "name": "Roket",
      "description": "Kule, Lokomotif ve Rün elementlerinin dengeli füzyonuyla yeni bir form olan roket sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "barut",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "kukurt",
              "komur",
              "demir"
          ]
      ]
  },
  "kehribar": {
      "id": "kehribar",
      "name": "Kehribar",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kehribar ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fef08a",
          "emissive": "#a16207"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "recine",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "recine",
              "tas",
              "toprak"
          ]
      ]
  },
  "kozmik_usturlap": {
      "id": "kozmik_usturlap",
      "name": "Kozmik Usturlap",
      "description": "Gezegen ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kozmik usturlap meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "seker"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "seker"
          ]
      ]
  },
  "olumsuzluk_i_ksiri": {
      "id": "olumsuzluk_i_ksiri",
      "name": "Ölümsüzlük İksiri",
      "description": "Evren, Prizma Taşı ve Yaşam elementlerinin dengeli füzyonuyla yeni bir form olan ölümsüzlük i̇ksiri sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "felsefe_tasi",
              "i_ksir"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kumas",
              "toprak",
              "i_ksir"
          ]
      ]
  },
  "timsah": {
      "id": "timsah",
      "name": "Timsah",
      "description": "Alet ve Tepe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda timsah meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#15803d",
          "secondary": "#84cc16",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bef264",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "celik",
              "bicak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "sarimsak",
              "kus_tuyu",
              "bicak"
          ]
      ]
  },
  "limon": {
      "id": "limon",
      "name": "Limon",
      "description": "Buhar, Sarımsak ve Çark elementlerinin dengeli füzyonuyla yeni bir form olan limon sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "su"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "su"
          ]
      ]
  },
  "i_pek": {
      "id": "i_pek",
      "name": "İpek",
      "description": "Kumaş, Porselen ve Taş elementlerinin dengeli füzyonuyla yeni bir form olan i̇pek sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "orman"
          ]
      ]
  },
  "teleskop": {
      "id": "teleskop",
      "name": "Teleskop",
      "description": "Alacakaranlık, Gözetleme Kulesi ve Meteor elementlerinin dengeli füzyonuyla yeni bir form olan teleskop sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "mercek",
              "cam"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cam",
              "toprak",
              "cam"
          ]
      ]
  },
  "deprem": {
      "id": "deprem",
      "name": "Deprem",
      "description": "Kasırga, Piramit ve Yanardağ elementlerinin dengeli füzyonuyla yeni bir form olan deprem sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "fay_hatti",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "fay_hatti",
              "enerji",
              "toprak"
          ]
      ]
  },
  "para": {
      "id": "para",
      "name": "Para",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla para ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "demir"
          ]
      ]
  },
  "su": {
      "id": "su",
      "name": "Su",
      "description": "Hayatın kaynağı, akışkan ve berrak.",
      "tier": 1,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 10
      },
      "recipe": null,
      "icon": "💧",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": []
  },
  "liman": {
      "id": "liman",
      "name": "Liman",
      "description": "Kıta ve Tutulma elementlerinin anlamsal ve fiziksel etkileşimi sonucunda liman meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deniz",
              "ev"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "deniz",
              "ev",
              "odun"
          ]
      ]
  },
  "gazete": {
      "id": "gazete",
      "name": "Gazete",
      "description": "Ceviz ve Yazı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gazete meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "bicak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "bicak"
          ]
      ]
  },
  "aurora": {
      "id": "aurora",
      "name": "Aurora",
      "description": "Minyatür Yıldız, Tundra ve Yıldırım elementlerinin dengeli füzyonuyla yeni bir form olan aurora sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "isik",
              "hava",
              "enerji"
          ]
      ]
  },
  "zirh": {
      "id": "zirh",
      "name": "Zırh",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla zırh ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deri",
              "metal"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cicek",
              "buz",
              "metal"
          ]
      ]
  },
  "robot": {
      "id": "robot",
      "name": "Robot",
      "description": "Otomobil, Örümcek ve İnsan elementlerinin dengeli füzyonuyla yeni bir form olan robot sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bilgisayar",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "celik",
              "hava",
              "demir"
          ]
      ]
  },
  "melek": {
      "id": "melek",
      "name": "Melek",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla melek ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ruh",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "yasam",
              "isik",
              "isik"
          ]
      ]
  },
  "tabanca": {
      "id": "tabanca",
      "name": "Tabanca",
      "description": "Kartal ve Çorba elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tabanca meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tufek",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "kumas",
              "hava",
              "demir"
          ]
      ]
  },
  "solucan": {
      "id": "solucan",
      "name": "Solucan",
      "description": "Halat, Parşömen ve Sincap elementlerinin dengeli füzyonuyla yeni bir form olan solucan sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "camur",
              "yasam"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "camur",
              "camur",
              "enerji"
          ]
      ]
  },
  "yol": {
      "id": "yol",
      "name": "Yol",
      "description": "Toprağın su ile doyması ve yoğrulması sonucu viskoz ve şekillendirilebilir yol meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "kum"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "kum",
              "toprak"
          ]
      ]
  },
  "sicak_hava_balonu": {
      "id": "sicak_hava_balonu",
      "name": "Sıcak Hava Balonu",
      "description": "Rüzgar Gülü, Termometre ve Uçak elementlerinin dengeli füzyonuyla yeni bir form olan sıcak hava balonu sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "cakmaktasi"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "cakmaktasi"
          ]
      ]
  },
  "porselen": {
      "id": "porselen",
      "name": "Porselen",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla porselen ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "selale"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "selale"
          ]
      ]
  },
  "titanyum": {
      "id": "titanyum",
      "name": "Titanyum",
      "description": "Bronz, Metal ve Zombi elementlerinin dengeli füzyonuyla yeni bir form olan titanyum sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "celik"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "celik"
          ]
      ]
  },
  "tayfun": {
      "id": "tayfun",
      "name": "Tayfun",
      "description": "Koyun, Volkan ve Yelken elementlerinin dengeli füzyonuyla yeni bir form olan tayfun sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kasirga",
              "okyanus"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "kasirga",
              "okyanus",
              "ruzgar"
          ]
      ]
  },
  "i_ksir_kazani": {
      "id": "i_ksir_kazani",
      "name": "İksir Kazanı",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan i̇ksir kazanı sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kazan",
              "i_ksir"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "celik",
              "ates",
              "i_ksir"
          ]
      ]
  },
  "flut": {
      "id": "flut",
      "name": "Flüt",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla flüt ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bambu",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "cimen",
              "agac",
              "hava"
          ]
      ]
  },
  "yasam": {
      "id": "yasam",
      "name": "Yaşam",
      "description": "Evren, Medeniyet ve İnsan elementlerinin dengeli füzyonuyla yeni bir form olan yaşam sentezlenir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "camur",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "camur",
              "enerji",
              "yildirim"
          ]
      ]
  },
  "ari": {
      "id": "ari",
      "name": "Arı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla arı ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#f59e0b",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "cicek"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "cicek"
          ]
      ]
  },
  "obelisk": {
      "id": "obelisk",
      "name": "Obelisk",
      "description": "Ampul, Kahin Küresi ve Uçurtma elementlerinin dengeli füzyonuyla yeni bir form olan obelisk sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "anit"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "lav",
              "su",
              "anit"
          ]
      ]
  },
  "saat": {
      "id": "saat",
      "name": "Saat",
      "description": "Kum Saati ve Zaman elementlerinin anlamsal ve fiziksel etkileşimi sonucunda saat meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "yosun"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "yosun"
          ]
      ]
  },
  "matbaa": {
      "id": "matbaa",
      "name": "Matbaa",
      "description": "Balta, Pamuk ve Çorba elementlerinin dengeli füzyonuyla yeni bir form olan matbaa sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "su",
              "tas",
              "fay_hatti"
          ]
      ]
  },
  "altin_sikke": {
      "id": "altin_sikke",
      "name": "Altın Sikke",
      "description": "Büyü Parşömeni, Gökkuşağı ve Taş elementlerinin dengeli füzyonuyla yeni bir form olan altın sikke sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fef08a",
          "emissive": "#a16207"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "para"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "para"
          ]
      ]
  },
  "gurz": {
      "id": "gurz",
      "name": "Gürz",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla gürz ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "demir"
          ]
      ]
  },
  "kukurt": {
      "id": "kukurt",
      "name": "Kükürt",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kükürt ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "volkan",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "volkan",
              "toprak",
              "ates"
          ]
      ]
  },
  "otomobil": {
      "id": "otomobil",
      "name": "Otomobil",
      "description": "Bisiklet, Lokomotif ve Roket elementlerinin dengeli füzyonuyla yeni bir form olan otomobil sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "araba",
              "i_cten_yanmali_motor"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tekerlek",
              "at",
              "i_cten_yanmali_motor"
          ]
      ]
  },
  "i_nek": {
      "id": "i_nek",
      "name": "İnek",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla i̇nek ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "su",
              "isik",
              "enerji"
          ]
      ]
  },
  "tren": {
      "id": "tren",
      "name": "Tren",
      "description": "Buhar Jeneratörü ve Buhar Motoru elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tren meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "yanardag"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "yanardag"
          ]
      ]
  },
  "lav": {
      "id": "lav",
      "name": "Lav",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla lav ortaya çıkar.",
      "tier": 2,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ates",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "ates",
              "ates",
              "toprak"
          ]
      ]
  },
  "kilic": {
      "id": "kilic",
      "name": "Kılıç",
      "description": "Fırtına Kılıcı ve Taş elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kılıç meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "civi"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "lav",
              "su",
              "civi"
          ]
      ]
  },
  "kalkan": {
      "id": "kalkan",
      "name": "Kalkan",
      "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan kalkan sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "dolu"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "dolu"
          ]
      ]
  },
  "gul": {
      "id": "gul",
      "name": "Gül",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla gül ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cicek",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "cicek",
              "ates",
              "bitki"
          ]
      ]
  },
  "saglam_sandik": {
      "id": "saglam_sandik",
      "name": "Sağlam Sandık",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sağlam sandık ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "su",
              "su",
              "ruzgar"
          ]
      ]
  },
  "ay": {
      "id": "ay",
      "name": "Ay",
      "description": "Anka Külü ve Un elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ay meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "toprak",
              "agac",
              "toprak"
          ]
      ]
  },
  "piyano": {
      "id": "piyano",
      "name": "Piyano",
      "description": "Gitar, Müzik ve Sincap elementlerinin dengeli füzyonuyla yeni bir form olan piyano sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "balik"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "balik"
          ]
      ]
  },
  "zehirli_kilic": {
      "id": "zehirli_kilic",
      "name": "Zehirli Kılıç",
      "description": "Anka Külü ve Kasaba elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zehirli kılıç meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "toprak",
              "su",
              "yagmur"
          ]
      ]
  },
  "gezegen": {
      "id": "gezegen",
      "name": "Gezegen",
      "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gezegen meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "lav",
              "su",
              "gunes"
          ]
      ]
  },
  "kok": {
      "id": "kok",
      "name": "Kök",
      "description": "Kavrulmuş Et, Pasta ve Sarmaşık elementlerinin dengeli füzyonuyla yeni bir form olan kök sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "bitki",
              "toprak",
              "su"
          ]
      ]
  },
  "jenerator": {
      "id": "jenerator",
      "name": "Jeneratör",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla jeneratör ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "bicak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "lav",
              "su",
              "bicak"
          ]
      ]
  },
  "komur": {
      "id": "komur",
      "name": "Kömür",
      "description": "Ateş, Buhar Motoru ve Demir Kalkan elementlerinin dengeli füzyonuyla yeni bir form olan kömür sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "odun",
              "ates",
              "toprak"
          ]
      ]
  },
  "pusula": {
      "id": "pusula",
      "name": "Pusula",
      "description": "Cıva, Peynir ve Prizma elementlerinin dengeli füzyonuyla yeni bir form olan pusula sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "cam"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "cam"
          ]
      ]
  },
  "armut": {
      "id": "armut",
      "name": "Armut",
      "description": "Boşluk Şişesi, Kağıt Para ve Kentaurluk elementlerinin dengeli füzyonuyla yeni bir form olan armut sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "isik"
          ]
      ]
  },
  "kasaba": {
      "id": "kasaba",
      "name": "Kasaba",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kasaba ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "toprak",
              "hava",
              "enerji"
          ]
      ]
  },
  "sfenks": {
      "id": "sfenks",
      "name": "Sfenks",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan sfenks sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "civi"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "civi"
          ]
      ]
  },
  "okyanus": {
      "id": "okyanus",
      "name": "Okyanus",
      "description": "Baharat ve Kıta elementlerinin anlamsal ve fiziksel etkileşimi sonucunda okyanus meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deniz",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "deniz",
              "deniz",
              "su"
          ]
      ]
  },
  "ceviz": {
      "id": "ceviz",
      "name": "Ceviz",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ceviz ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "odun"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "agac",
              "odun",
              "tohum"
          ]
      ]
  },
  "kursun": {
      "id": "kursun",
      "name": "Kurşun",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kurşun ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "toprak",
              "isik",
              "enerji"
          ]
      ]
  },
  "cam": {
      "id": "cam",
      "name": "Cam",
      "description": "Kamera ve İp elementlerinin anlamsal ve fiziksel etkileşimi sonucunda cam meydana gelir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kum",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "hava"
          ]
      ]
  },
  "kaktus": {
      "id": "kaktus",
      "name": "Kaktüs",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kaktüs ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "kum"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "bitki",
              "kum",
              "col"
          ]
      ]
  },
  "kitap": {
      "id": "kitap",
      "name": "Kitap",
      "description": "Büyü Parşömeni ve Yazı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kitap meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kagit",
              "yazi"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "cam",
              "ates",
              "yazi"
          ]
      ]
  },
  "kazma": {
      "id": "kazma",
      "name": "Kazma",
      "description": "Kale ve Kasaba elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kazma meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "toprak",
              "su",
              "ruzgar"
          ]
      ]
  },
  "somon": {
      "id": "somon",
      "name": "Somon",
      "description": "Büyü, Kandil ve Sosis elementlerinin dengeli füzyonuyla yeni bir form olan somon sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "nehir"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "nehir"
          ]
      ]
  },
  "ozon": {
      "id": "ozon",
      "name": "Ozon",
      "description": "Bulut, Radyasyon ve Rüzgâr elementlerinin dengeli füzyonuyla yeni bir form olan ozon sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hava",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "hava",
              "yildirim",
              "elektrik"
          ]
      ]
  },
  "findik": {
      "id": "findik",
      "name": "Fındık",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla fındık ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "gunes"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "gunes"
          ]
      ]
  },
  "sinema": {
      "id": "sinema",
      "name": "Sinema",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sinema ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "fotograf",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "kamera",
              "kagit",
              "isik"
          ]
      ]
  },
  "gunes_saati": {
      "id": "gunes_saati",
      "name": "Güneş Saati",
      "description": "Alacakaranlık ve Kum Saati elementlerinin anlamsal ve fiziksel etkileşimi sonucunda güneş saati meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "yaprak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "yaprak"
          ]
      ]
  },
  "ucurtma": {
      "id": "ucurtma",
      "name": "Uçurtma",
      "description": "Toprağın su ile doyması ve yoğrulması sonucu viskoz ve şekillendirilebilir uçurtma meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kagit",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "cam",
              "ates",
              "ruzgar"
          ]
      ]
  },
  "bira": {
      "id": "bira",
      "name": "Bira",
      "description": "Bisiklet, Sal ve Vadi elementlerinin dengeli füzyonuyla yeni bir form olan bira sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bugday",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "cimen",
              "tohum",
              "su"
          ]
      ]
  },
  "bozkir": {
      "id": "bozkir",
      "name": "Bozkır",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla bozkır ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cimen",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "cimen",
              "ruzgar",
              "toprak"
          ]
      ]
  },
  "el_arabasi": {
      "id": "el_arabasi",
      "name": "El Arabası",
      "description": "Lokomotif ve Otomobil elementlerinin anlamsal ve fiziksel etkileşimi sonucunda el arabası meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tekerlek",
              "odun"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cam",
              "enerji",
              "odun"
          ]
      ]
  },
  "kertenkele": {
      "id": "kertenkele",
      "name": "Kertenkele",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kertenkele ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#15803d",
          "secondary": "#84cc16",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bef264",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kurbaga",
              "kum"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "camur",
              "kum"
          ]
      ]
  },
  "gunduz": {
      "id": "gunduz",
      "name": "Gündüz",
      "description": "Kentaurluk ve Yatak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gündüz meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "gunes",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "isik",
              "enerji",
              "isik"
          ]
      ]
  },
  "uranyum": {
      "id": "uranyum",
      "name": "Uranyum",
      "description": "Ahtapot, Uzay ve İllüzyon Aynası elementlerinin dengeli füzyonuyla yeni bir form olan uranyum sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#22c55e",
          "secondary": "#86efac",
          "emissive": "#15803d"
      },
      "particles": {
          "type": "spark",
          "color": "#4ade80",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "enerji"
          ]
      ]
  },
  "kandil": {
      "id": "kandil",
      "name": "Kandil",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kandil ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "comlek",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "cicek",
              "dag",
              "ates"
          ]
      ]
  },
  "sur": {
      "id": "sur",
      "name": "Sur",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sur ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kale",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "kale",
              "toprak",
              "tas"
          ]
      ]
  },
  "minyatur_yildiz": {
      "id": "minyatur_yildiz",
      "name": "Minyatür Yıldız",
      "description": "Gezegen ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda minyatür yıldız meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "zeytinyagi"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "zeytinyagi"
          ]
      ]
  },
  "alet": {
      "id": "alet",
      "name": "Alet",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla alet ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "bicak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "bicak"
          ]
      ]
  },
  "yelkenli": {
      "id": "yelkenli",
      "name": "Yelkenli",
      "description": "Havyar ve Yelken elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yelkenli meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "yelken"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "yelken"
          ]
      ]
  },
  "elektrik_motoru": {
      "id": "elektrik_motoru",
      "name": "Elektrik Motoru",
      "description": "Buhar Motoru ve İçten Yanmalı Motor elementlerinin anlamsal ve fiziksel etkileşimi sonucunda elektrik motoru meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#38bdf8",
          "emissive": "#ca8a04"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "alet",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "electric",
      "trioRecipes": [
          [
              "cam",
              "bicak",
              "yildirim"
          ]
      ]
  },
  "kiymik": {
      "id": "kiymik",
      "name": "Kıymık",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kıymık ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "odun",
              "tas",
              "agac"
          ]
      ]
  },
  "seramik": {
      "id": "seramik",
      "name": "Seramik",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla seramik ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "comlek",
              "cam"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "cicek",
              "dag",
              "cam"
          ]
      ]
  },
  "hucre": {
      "id": "hucre",
      "name": "Hücre",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla hücre ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yasam",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "su",
              "camur"
          ]
      ]
  },
  "parsomen": {
      "id": "parsomen",
      "name": "Parşömen",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla parşömen ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deri",
              "yazi"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "cicek",
              "buz",
              "yazi"
          ]
      ]
  },
  "kedi": {
      "id": "kedi",
      "name": "Kedi",
      "description": "Baykuş ve Lif elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kedi meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "alet",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "cam",
              "bicak",
              "ates"
          ]
      ]
  },
  "deri_zirh": {
      "id": "deri_zirh",
      "name": "Deri Zırh",
      "description": "Mağara ve Zırh elementlerinin anlamsal ve fiziksel etkileşimi sonucunda deri zırh meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "deri",
              "i_p"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cicek",
              "buz",
              "i_p"
          ]
      ]
  },
  "tapinak": {
      "id": "tapinak",
      "name": "Tapınak",
      "description": "Anıt, Piramit ve Prizma Taşı elementlerinin dengeli füzyonuyla yeni bir form olan tapınak sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "mermer",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "tas",
              "kirec",
              "isik"
          ]
      ]
  },
  "camur": {
      "id": "camur",
      "name": "Çamur",
      "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda çamur meydana gelir.",
      "tier": 2,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "su",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "su",
              "toprak",
              "toprak"
          ]
      ]
  },
  "bulut": {
      "id": "bulut",
      "name": "Bulut",
      "description": "Gökkuşağı ve Çamur elementlerinin anlamsal ve fiziksel etkileşimi sonucunda bulut meydana gelir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buhar",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "buhar",
              "hava",
              "hava"
          ]
      ]
  },
  "tiyatro": {
      "id": "tiyatro",
      "name": "Tiyatro",
      "description": "Müze ve Sinema elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tiyatro meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "ates"
          ]
      ]
  },
  "demir_kulce": {
      "id": "demir_kulce",
      "name": "Demir Külçe",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla demir külçe ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#e2e8f0",
          "emissive": "#334155"
      },
      "particles": {
          "type": "spark",
          "color": "#f8fafc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "mantar"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "mantar"
          ]
      ]
  },
  "tuy": {
      "id": "tuy",
      "name": "Tüy",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan tüy sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "hava"
          ]
      ]
  },
  "buyu_parsomeni": {
      "id": "buyu_parsomeni",
      "name": "Büyü Parşömeni",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla büyü parşömeni ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kagit",
              "buyu"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "cam",
              "ates",
              "buyu"
          ]
      ]
  },
  "cicek": {
      "id": "cicek",
      "name": "Çiçek",
      "description": "Flüt ve Sarımsak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda çiçek meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "bitki",
              "isik",
              "gunes"
          ]
      ]
  },
  "sarimsak": {
      "id": "sarimsak",
      "name": "Sarımsak",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sarımsak ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sogan",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "sogan",
              "toprak",
              "gunes"
          ]
      ]
  },
  "yildiz_gecidi_cekirdegi": {
      "id": "yildiz_gecidi_cekirdegi",
      "name": "Yıldız Geçidi Çekirdeği",
      "description": "Gezegen, Gökkuşağı ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan yıldız geçidi çekirdeği sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "hortum"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "hortum"
          ]
      ]
  },
  "tanri": {
      "id": "tanri",
      "name": "Tanrı",
      "description": "Evren ve İnsan elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tanrı meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "evren",
              "yasam"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "sarimsak",
              "tapinak",
              "yasam"
          ]
      ]
  },
  "karinca": {
      "id": "karinca",
      "name": "Karınca",
      "description": "Aurora, Örümcek ve İpekböceği elementlerinin dengeli füzyonuyla yeni bir form olan karınca sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "toprak"
          ]
      ]
  },
  "hologram_kupu": {
      "id": "hologram_kupu",
      "name": "Hologram Küpü",
      "description": "Fotoğraf, Hortum ve Mikroskop elementlerinin dengeli füzyonuyla yeni bir form olan hologram küpü sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "lazer",
              "kristal"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "cam",
              "hava",
              "kristal"
          ]
      ]
  },
  "okul": {
      "id": "okul",
      "name": "Okul",
      "description": "Kentaurluk ve Medeniyet elementlerinin anlamsal ve fiziksel etkileşimi sonucunda okul meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ev",
              "kitap"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "odun",
              "tugla_duvar",
              "kitap"
          ]
      ]
  },
  "zehir_sisesi": {
      "id": "zehir_sisesi",
      "name": "Zehir Şişesi",
      "description": "Dinamit ve Runik Zırh elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zehir şişesi meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "bugday"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "bugday"
          ]
      ]
  },
  "cimen": {
      "id": "cimen",
      "name": "Çimen",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çimen ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "yagmur"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "bitki",
              "yagmur",
              "toprak"
          ]
      ]
  },
  "koy": {
      "id": "koy",
      "name": "Köy",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla köy ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ev",
              "cimen"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "odun",
              "tugla_duvar",
              "cimen"
          ]
      ]
  },
  "bomba": {
      "id": "bomba",
      "name": "Bomba",
      "description": "Dinamit, Kasırga ve Roket elementlerinin dengeli füzyonuyla yeni bir form olan bomba sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ea580c",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "yay"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "yay"
          ]
      ]
  },
  "simya": {
      "id": "simya",
      "name": "Simya",
      "description": "Balta ve Cıva elementlerinin anlamsal ve fiziksel etkileşimi sonucunda simya meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kitap",
              "buyu"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kagit",
              "yazi",
              "buyu"
          ]
      ]
  },
  "safak": {
      "id": "safak",
      "name": "Şafak",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şafak ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "alet",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "cam",
              "bicak",
              "su"
          ]
      ]
  },
  "sarmasik": {
      "id": "sarmasik",
      "name": "Sarmaşık",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sarmaşık ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "agac"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "bitki",
              "agac",
              "orman"
          ]
      ]
  },
  "pazar": {
      "id": "pazar",
      "name": "Pazar",
      "description": "Müze, Zincir ve Çimen elementlerinin dengeli füzyonuyla yeni bir form olan pazar sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "karli_cam_agaci"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "karli_cam_agaci"
          ]
      ]
  },
  "yel_degirmeni": {
      "id": "yel_degirmeni",
      "name": "Yel Değirmeni",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan yel değirmeni sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "degirmen",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "odun",
              "ruzgar",
              "hava"
          ]
      ]
  },
  "kaya": {
      "id": "kaya",
      "name": "Kaya",
      "description": "Baharat, Cıva ve Olta elementlerinin dengeli füzyonuyla yeni bir form olan kaya sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "tas",
              "dag"
          ]
      ]
  },
  "i_gne": {
      "id": "i_gne",
      "name": "İğne",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla i̇ğne ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "kiymik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "kiymik"
          ]
      ]
  },
  "kano": {
      "id": "kano",
      "name": "Kano",
      "description": "Anka Külü ve Kürek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kano meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "tohum"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "tohum"
          ]
      ]
  },
  "tugla": {
      "id": "tugla",
      "name": "Tuğla",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla tuğla ortaya çıkar.",
      "tier": 3,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "camur",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "camur",
              "ates",
              "toprak"
          ]
      ]
  },
  "vaha": {
      "id": "vaha",
      "name": "Vaha",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla vaha ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "col",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "col",
              "su",
              "toprak"
          ]
      ]
  },
  "mana_i_ksiri": {
      "id": "mana_i_ksiri",
      "name": "Mana İksiri",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mana i̇ksiri ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "mana",
              "i_ksir"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "balik",
              "gunes",
              "i_ksir"
          ]
      ]
  },
  "volkan": {
      "id": "volkan",
      "name": "Volkan",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla volkan ortaya çıkar.",
      "tier": 3,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "lav",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "lav",
              "toprak",
              "ates"
          ]
      ]
  },
  "hamur": {
      "id": "hamur",
      "name": "Hamur",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla hamur ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "un",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "un",
              "su",
              "tuz"
          ]
      ]
  },
  "golem": {
      "id": "golem",
      "name": "Golem",
      "description": "Badem, Dolu ve Totem elementlerinin dengeli füzyonuyla yeni bir form olan golem sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "camur",
              "buyu"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "su",
              "toprak",
              "buyu"
          ]
      ]
  },
  "ors": {
      "id": "ors",
      "name": "Örs",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla örs ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "tas"
          ]
      ]
  },
  "sarap": {
      "id": "sarap",
      "name": "Şarap",
      "description": "Alet, Barut Fıçısı ve Buhar elementlerinin dengeli füzyonuyla yeni bir form olan şarap sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "uzum",
              "bakteri"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "sarmasik",
              "isik",
              "bakteri"
          ]
      ]
  },
  "bitki": {
      "id": "bitki",
      "name": "Bitki",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla bitki ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "yasam"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "toprak",
              "yasam",
              "su"
          ]
      ]
  },
  "agac": {
      "id": "agac",
      "name": "Ağaç",
      "description": "Ağaç Kabuğu ve Karlı Çam Ağacı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ağaç meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "leaf",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "tohum"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "bitki",
              "tohum",
              "toprak"
          ]
      ]
  },
  "boyut_kapisi": {
      "id": "boyut_kapisi",
      "name": "Boyut Kapısı",
      "description": "Tünel ve Şelale elementlerinin anlamsal ve fiziksel etkileşimi sonucunda boyut kapısı meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "portal_runu",
              "evren"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "isik",
              "su",
              "evren"
          ]
      ]
  },
  "nane": {
      "id": "nane",
      "name": "Nane",
      "description": "Davul ve Mana elementlerinin anlamsal ve fiziksel etkileşimi sonucunda nane meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yaprak",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yaprak",
              "ruzgar",
              "su"
          ]
      ]
  },
  "cilek": {
      "id": "cilek",
      "name": "Çilek",
      "description": "Melek, Sarımsak ve Yaprak elementlerinin dengeli füzyonuyla yeni bir form olan çilek sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "seker"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "toprak",
              "yasam",
              "seker"
          ]
      ]
  },
  "borsa": {
      "id": "borsa",
      "name": "Borsa",
      "description": "Dükkan, Pazar ve Zincir elementlerinin dengeli füzyonuyla yeni bir form olan borsa sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "para",
              "pazar"
          ]
      },
      "icon": "✨",
      "category": "05_maden_ve_materyaller",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "altin",
              "demir",
              "pazar"
          ]
      ]
  },
  "fosil": {
      "id": "fosil",
      "name": "Fosil",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla fosil ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "yasam"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "yasam",
              "toprak"
          ]
      ]
  },
  "heykel": {
      "id": "heykel",
      "name": "Heykel",
      "description": "Tılsım ve Yelken elementlerinin anlamsal ve fiziksel etkileşimi sonucunda heykel meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "fosil"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "fosil"
          ]
      ]
  },
  "kentaurluk": {
      "id": "kentaurluk",
      "name": "Kentaurluk",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kentaurluk ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "heykel"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "heykel"
          ]
      ]
  },
  "et": {
      "id": "et",
      "name": "Et",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla et ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hayvan",
              "bicak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "balik",
              "dag",
              "bicak"
          ]
      ]
  },
  "ruzgar_gulu": {
      "id": "ruzgar_gulu",
      "name": "Rüzgar Gülü",
      "description": "Fırtına ve Rüzgar elementlerinin anlamsal ve fiziksel etkileşimi sonucunda rüzgar gülü meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cark",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "tas",
              "hava",
              "hava"
          ]
      ]
  },
  "tohum": {
      "id": "tohum",
      "name": "Tohum",
      "description": "Muz ve Totem elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tohum meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "ruzgar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "bitki",
              "ruzgar",
              "toprak"
          ]
      ]
  },
  "balik_eti": {
      "id": "balik_eti",
      "name": "Balık Eti",
      "description": "Baharat Çeşnisi, Bataklık ve Göl elementlerinin dengeli füzyonuyla yeni bir form olan balık eti sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balik",
              "bicak"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "bicak"
          ]
      ]
  },
  "karli_cam_agaci": {
      "id": "karli_cam_agaci",
      "name": "Karlı Çam Ağacı",
      "description": "Ahşap Kalkan, Elmas ve Meyve Bahçesi elementlerinin dengeli füzyonuyla yeni bir form olan karlı çam ağacı sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "leaf",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "kar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "agac",
              "kar",
              "buzul"
          ]
      ]
  },
  "yay": {
      "id": "yay",
      "name": "Yay",
      "description": "Tılsım ve Üzüm elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yay meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "i_p"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "i_p"
          ]
      ]
  },
  "bakir": {
      "id": "bakir",
      "name": "Bakır",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla bakır ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#c2410c",
          "secondary": "#fb923c",
          "emissive": "#7c2d12"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "balik_eti"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "balik_eti"
          ]
      ]
  },
  "kaplan": {
      "id": "kaplan",
      "name": "Kaplan",
      "description": "Kahin Küresi, Kristal ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan kaplan sentezlenir.",
      "tier": 13,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#f59e0b",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kedi",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "alet",
              "ates",
              "orman"
          ]
      ]
  },
  "sahin": {
      "id": "sahin",
      "name": "Şahin",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şahin ortaya çıkar.",
      "tier": 14,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "kaplan"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "kaplan"
          ]
      ]
  },
  "yildiz": {
      "id": "yildiz",
      "name": "Yıldız",
      "description": "Gezegen ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yıldız meydana gelir.",
      "tier": 15,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "sahin"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "sahin"
          ]
      ]
  },
  "kutsal_kase": {
      "id": "kutsal_kase",
      "name": "Kutsal Kase",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kutsal kase ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "altin",
              "olumsuzluk_i_ksiri"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kanyon",
              "ruzgar",
              "olumsuzluk_i_ksiri"
          ]
      ]
  },
  "lokomotif": {
      "id": "lokomotif",
      "name": "Lokomotif",
      "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan lokomotif sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buhar_motoru",
              "tekerlek"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "buhar",
              "demir",
              "tekerlek"
          ]
      ]
  },
  "portakal": {
      "id": "portakal",
      "name": "Portakal",
      "description": "Kartal ve Melek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda portakal meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#ea580c",
          "secondary": "#fb923c",
          "emissive": "#7c2d12"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "lokomotif"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "lokomotif"
          ]
      ]
  },
  "kurek": {
      "id": "kurek",
      "name": "Kürek",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kürek ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "metal"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "metal"
          ]
      ]
  },
  "disli": {
      "id": "disli",
      "name": "Dişli",
      "description": "Kemik, Porselen ve Çığ elementlerinin dengeli füzyonuyla yeni bir form olan dişli sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "cark"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "cark"
          ]
      ]
  },
  "mesale": {
      "id": "mesale",
      "name": "Meşale",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla meşale ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "disli"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "disli"
          ]
      ]
  },
  "bugday": {
      "id": "bugday",
      "name": "Buğday",
      "description": "Soğan, Toprak ve Zeytinyağı elementlerinin dengeli füzyonuyla yeni bir form olan buğday sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cimen",
              "tohum"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "cimen",
              "tohum",
              "gunes"
          ]
      ]
  },
  "i_nci": {
      "id": "i_nci",
      "name": "İnci",
      "description": "Evren ve Kristal elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇nci meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "mesale"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "mesale"
          ]
      ]
  },
  "geyik": {
      "id": "geyik",
      "name": "Geyik",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla geyik ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "at",
              "orman"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "enerji",
              "su",
              "orman"
          ]
      ]
  },
  "telefon": {
      "id": "telefon",
      "name": "Telefon",
      "description": "Telgraf, İnternet ve İplik elementlerinin dengeli füzyonuyla yeni bir form olan telefon sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "telgraf",
              "elektrik"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "elektrik",
              "i_p",
              "elektrik"
          ]
      ]
  },
  "hortum": {
      "id": "hortum",
      "name": "Hortum",
      "description": "Geyik, Havyar ve Hücre elementlerinin dengeli füzyonuyla yeni bir form olan hortum sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ruzgar",
              "firtina"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "ruzgar",
              "firtina",
              "hava"
          ]
      ]
  },
  "mantar": {
      "id": "mantar",
      "name": "Mantar",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mantar ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "camur",
              "yosun"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "camur",
              "yosun",
              "orman"
          ]
      ]
  },
  "baharat_cesnisi": {
      "id": "baharat_cesnisi",
      "name": "Baharat Çeşnisi",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla baharat çeşnisi ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "baharat",
              "tuz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "balik",
              "buz",
              "tuz"
          ]
      ]
  },
  "medeniyet": {
      "id": "medeniyet",
      "name": "Medeniyet",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla medeniyet ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "sehir",
              "yazi"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "ev",
              "ev",
              "yazi"
          ]
      ]
  },
  "gece": {
      "id": "gece",
      "name": "Gece",
      "description": "Alacakaranlık ve Yatak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gece meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#1e1b4b",
          "secondary": "#312e81",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#818cf8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "medeniyet"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "medeniyet"
          ]
      ]
  },
  "yun": {
      "id": "yun",
      "name": "Yün",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yün ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "koyun",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "hayvan",
              "cimen",
              "tas"
          ]
      ]
  },
  "i_nsan": {
      "id": "i_nsan",
      "name": "İnsan",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla i̇nsan ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "yun"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "yun"
          ]
      ]
  },
  "mercan": {
      "id": "mercan",
      "name": "Mercan",
      "description": "Cıva ve Mercek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda mercan meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "alet",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "cam",
              "bicak",
              "toprak"
          ]
      ]
  },
  "ates": {
      "id": "ates",
      "name": "Ateş",
      "description": "Saf ısı ve enerji kaynağı.",
      "tier": 1,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 15
      },
      "recipe": null,
      "icon": "🔥",
      "category": "01_elements",
      "archetype3d": "flame",
      "trioRecipes": []
  },
  "radyo": {
      "id": "radyo",
      "name": "Radyo",
      "description": "Cam, Müzik ve Radyasyon elementlerinin dengeli füzyonuyla yeni bir form olan radyo sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "elektrik",
              "i_nsan"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yildirim",
              "enerji",
              "i_nsan"
          ]
      ]
  },
  "zeytinyagi": {
      "id": "zeytinyagi",
      "name": "Zeytinyağı",
      "description": "Baharat Çeşnisi, Porselen ve Sarmaşık elementlerinin dengeli füzyonuyla yeni bir form olan zeytinyağı sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#15803d",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#86efac",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "zeytin",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "zeytin",
              "tas",
              "su"
          ]
      ]
  },
  "fener": {
      "id": "fener",
      "name": "Fener",
      "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan fener sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "mum",
              "cam"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "bal",
              "i_p",
              "cam"
          ]
      ]
  },
  "yaprak": {
      "id": "yaprak",
      "name": "Yaprak",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yaprak ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "leaf",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "agac",
              "isik",
              "ruzgar"
          ]
      ]
  },
  "pirinc": {
      "id": "pirinc",
      "name": "Pirinç",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla pirinç ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "fener"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "fener"
          ]
      ]
  },
  "misir": {
      "id": "misir",
      "name": "Mısır",
      "description": "Uçurtma, Zeytin ve İmparatorluk elementlerinin dengeli füzyonuyla yeni bir form olan mısır sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#eab308",
          "secondary": "#fde047",
          "emissive": "#854d0e"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bugday",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "cimen",
              "tohum",
              "isik"
          ]
      ]
  },
  "sifa_i_ksiri": {
      "id": "sifa_i_ksiri",
      "name": "Şifa İksiri",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şifa i̇ksiri ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_ksir",
              "gul"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "i_p",
              "toprak",
              "gul"
          ]
      ]
  },
  "termometre": {
      "id": "termometre",
      "name": "Termometre",
      "description": "Barometre, Güneş Saati ve Kalkan elementlerinin dengeli füzyonuyla yeni bir form olan termometre sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cam",
              "civa"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kum",
              "ates",
              "civa"
          ]
      ]
  },
  "hayalet": {
      "id": "hayalet",
      "name": "Hayalet",
      "description": "Balta ve İğne elementlerinin anlamsal ve fiziksel etkileşimi sonucunda hayalet meydana gelir.",
      "tier": 13,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ruh",
              "gece"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "yasam",
              "isik",
              "gece"
          ]
      ]
  },
  "gunes": {
      "id": "gunes",
      "name": "Güneş",
      "description": "Alacakaranlık ve Kum Saati elementlerinin anlamsal ve fiziksel etkileşimi sonucunda güneş meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "isik",
              "enerji",
              "ates"
          ]
      ]
  },
  "kulube": {
      "id": "kulube",
      "name": "Kulübe",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kulübe ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "cimen"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "cimen"
          ]
      ]
  },
  "isik": {
      "id": "isik",
      "name": "Işık",
      "description": "Alacakaranlık ve Yıldırım elementlerinin anlamsal ve fiziksel etkileşimi sonucunda işık meydana gelir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "enerji",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "enerji",
              "ates",
              "hava"
          ]
      ]
  },
  "i_pekbocegi": {
      "id": "i_pekbocegi",
      "name": "İpekböceği",
      "description": "Anka Kuşu ve Örümcek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇pekböceği meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "solucan",
              "yaprak"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "camur",
              "yasam",
              "yaprak"
          ]
      ]
  },
  "balik": {
      "id": "balik",
      "name": "Balık",
      "description": "Baharat Çeşnisi, Bataklık ve Göl elementlerinin dengeli füzyonuyla yeni bir form olan balık sentezlenir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yasam",
              "deniz"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "yasam",
              "deniz",
              "su"
          ]
      ]
  },
  "meyve_suyu": {
      "id": "meyve_suyu",
      "name": "Meyve Suyu",
      "description": "Su Çömleği ve Çilek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda meyve suyu meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "elma",
              "su"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yosun",
              "ruzgar",
              "su"
          ]
      ]
  },
  "dolu": {
      "id": "dolu",
      "name": "Dolu",
      "description": "Kül ve Vaha elementlerinin anlamsal ve fiziksel etkileşimi sonucunda dolu meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#38bdf8",
          "secondary": "#e0f2fe",
          "emissive": "#0284c7"
      },
      "particles": {
          "type": "bubble",
          "color": "#e0f2fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yagmur",
              "buz"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "solid",
      "trioRecipes": [
          [
              "yagmur",
              "buz",
              "ruzgar"
          ]
      ]
  },
  "yanardag": {
      "id": "yanardag",
      "name": "Yanardağ",
      "description": "Kule ve Volkan elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yanardağ meydana gelir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "volkan",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "volkan",
              "dag",
              "lav"
          ]
      ]
  },
  "baraj": {
      "id": "baraj",
      "name": "Baraj",
      "description": "Buhar, Göl ve Tünel elementlerinin dengeli füzyonuyla yeni bir form olan baraj sentezlenir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "nehir",
              "beton"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "gol",
              "dag",
              "beton"
          ]
      ]
  },
  "plazma": {
      "id": "plazma",
      "name": "Plazma",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla plazma ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#ef4444",
          "secondary": "#f97316",
          "emissive": "#b91c1c"
      },
      "particles": {
          "type": "spark",
          "color": "#ffedd5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "baraj"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flame",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "baraj"
          ]
      ]
  },
  "yosun": {
      "id": "yosun",
      "name": "Yosun",
      "description": "Koyun ve Yün elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yosun meydana gelir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "bitki",
              "su",
              "tas"
          ]
      ]
  },
  "i_nternet": {
      "id": "i_nternet",
      "name": "İnternet",
      "description": "Et, Siber Kristal ve İp elementlerinin dengeli füzyonuyla yeni bir form olan i̇nternet sentezlenir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bilgisayar",
              "bilgisayar"
          ]
      },
      "icon": "✨",
      "category": "07_bilim_ve_teknoloji",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "celik",
              "hava",
              "bilgisayar"
          ]
      ]
  },
  "vida": {
      "id": "vida",
      "name": "Vida",
      "description": "Kentaurluk ve Medeniyet elementlerinin anlamsal ve fiziksel etkileşimi sonucunda vida meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "civi",
              "alet"
          ]
      },
      "icon": "✨",
      "category": "03_canlilar",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "dag",
              "alet"
          ]
      ]
  },
  "zehir": {
      "id": "zehir",
      "name": "Zehir",
      "description": "Balta ve Geyik elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zehir meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yilan",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "hayvan",
              "dag",
              "su"
          ]
      ]
  },
  "selale": {
      "id": "selale",
      "name": "Şelale",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şelale ortaya çıkar.",
      "tier": 7,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "nehir",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "nehir",
              "dag",
              "su"
          ]
      ]
  },
  "cekic": {
      "id": "cekic",
      "name": "Çekiç",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çekiç ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "alet",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cam",
              "bicak",
              "hava"
          ]
      ]
  },
  "cakmaktasi": {
      "id": "cakmaktasi",
      "name": "Çakmaktaşı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çakmaktaşı ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "enerji",
              "ates"
          ]
      ]
  },
  "orman": {
      "id": "orman",
      "name": "Orman",
      "description": "Jeneratör ve Örs elementlerinin anlamsal ve fiziksel etkileşimi sonucunda orman meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "leaf",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "agac",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "agac",
              "toprak",
              "yasam"
          ]
      ]
  },
  "mizrak": {
      "id": "mizrak",
      "name": "Mızrak",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mızrak ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "alet",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "cam",
              "bicak",
              "enerji"
          ]
      ]
  },
  "mikrocip": {
      "id": "mikrocip",
      "name": "Mikroçip",
      "description": "Halat, Mikroskop ve Siber Kristal elementlerinin dengeli füzyonuyla yeni bir form olan mikroçip sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "spark",
          "color": "#7dd3fc",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kum",
              "elektrik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "toprak",
              "hava",
              "elektrik"
          ]
      ]
  },
  "kuyruklu_yildiz": {
      "id": "kuyruklu_yildiz",
      "name": "Kuyruklu Yıldız",
      "description": "Akrep ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kuyruklu yıldız meydana gelir.",
      "tier": 16,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "buz",
              "yildiz"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "su",
              "ruzgar",
              "yildiz"
          ]
      ]
  },
  "seker": {
      "id": "seker",
      "name": "Şeker",
      "description": "Sarımsak, Sosis ve Zeytinyağı elementlerinin dengeli füzyonuyla yeni bir form olan şeker sentezlenir.",
      "tier": 5,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fbbf24",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fde047",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "bitki",
              "ates"
          ]
      },
      "icon": "✨",
      "category": "06_yemek_ve_tarim",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "bitki",
              "ates",
              "gunes"
          ]
      ]
  },
  "zehirli_sivi": {
      "id": "zehirli_sivi",
      "name": "Zehirli Sıvı",
      "description": "Plazma Tüfeği, Zehir Şişesi ve İllüzyon Aynası elementlerinin dengeli füzyonuyla yeni bir form olan zehirli sıvı sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "zehir",
              "su"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "yilan",
              "su",
              "su"
          ]
      ]
  },
  "maya": {
      "id": "maya",
      "name": "Maya",
      "description": "Balina, Odun ve Yün elementlerinin dengeli füzyonuyla yeni bir form olan maya sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hamur",
              "bakteri"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "un",
              "su",
              "bakteri"
          ]
      ]
  },
  "bambu": {
      "id": "bambu",
      "name": "Bambu",
      "description": "Ahşap Kalkan ve Pamuk elementlerinin anlamsal ve fiziksel etkileşimi sonucunda bambu meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cimen",
              "agac"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "cimen",
              "agac",
              "su"
          ]
      ]
  },
  "kabile": {
      "id": "kabile",
      "name": "Kabile",
      "description": "Kartal ve Kasaba elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kabile meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "aile",
              "cadir"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "yosun",
              "buz",
              "cadir"
          ]
      ]
  },
  "denizalti": {
      "id": "denizalti",
      "name": "Denizaltı",
      "description": "Deniz ve Denizanası elementlerinin anlamsal ve fiziksel etkileşimi sonucunda denizaltı meydana gelir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yelkenli",
              "su"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "odun",
              "yelken",
              "su"
          ]
      ]
  },
  "cali": {
      "id": "cali",
      "name": "Çalı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çalı ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "cimen",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "cimen",
              "toprak",
              "bitki"
          ]
      ]
  },
  "darphane": {
      "id": "darphane",
      "name": "Darphane",
      "description": "Ampul, Halat ve Nane elementlerinin dengeli füzyonuyla yeni bir form olan darphane sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "metal",
              "para"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "sarimsak",
              "tas",
              "para"
          ]
      ]
  },
  "golge": {
      "id": "golge",
      "name": "Gölge",
      "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gölge meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#1e1b4b",
          "secondary": "#312e81",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#818cf8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "isik",
              "i_nsan"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "enerji",
              "ates",
              "i_nsan"
          ]
      ]
  },
  "cig": {
      "id": "cig",
      "name": "Çığ",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çığ ortaya çıkar.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kar",
              "dag"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kar",
              "dag",
              "ruzgar"
          ]
      ]
  },
  "kanyon": {
      "id": "kanyon",
      "name": "Kanyon",
      "description": "Dağ, Nehir ve Yanardağ elementlerinin dengeli füzyonuyla yeni bir form olan kanyon sentezlenir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "nehir",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "kaya"
          ]
      ]
  },
  "metal_bicak": {
      "id": "metal_bicak",
      "name": "Metal Bıçak",
      "description": "Kılıç, Metal ve Çelik Külçe elementlerinin dengeli füzyonuyla yeni bir form olan metal bıçak sentezlenir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "alet"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "alet"
          ]
      ]
  },
  "yesim": {
      "id": "yesim",
      "name": "Yeşim",
      "description": "Ayı ve Kristal elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yeşim meydana gelir.",
      "tier": 4,
      "colorPalette": {
          "primary": "#059669",
          "secondary": "#6ee7b7",
          "emissive": "#064e3b"
      },
      "particles": {
          "type": "spark",
          "color": "#d1fae5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "tas",
              "su"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "tas",
              "su",
              "yosun"
          ]
      ]
  },
  "dinamolu_fener": {
      "id": "dinamolu_fener",
      "name": "Dinamolu Fener",
      "description": "Bal Kavanozu, Fener ve Tutulma elementlerinin dengeli füzyonuyla yeni bir form olan dinamolu fener sentezlenir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "fener",
              "disli"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "mum",
              "cam",
              "disli"
          ]
      ]
  },
  "zaman": {
      "id": "zaman",
      "name": "Zaman",
      "description": "Evren, Kentaurluk ve Mızrak elementlerinin dengeli füzyonuyla yeni bir form olan zaman sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kum_saati",
              "evren"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "cam",
              "kum",
              "evren"
          ]
      ]
  },
  "meka_zirhi": {
      "id": "meka_zirhi",
      "name": "Meka Zırhı",
      "description": "Gökkuşağı ve Runik Zırh elementlerinin anlamsal ve fiziksel etkileşimi sonucunda meka zırhı meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "robot",
              "demir_zirh"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "bilgisayar",
              "demir",
              "demir_zirh"
          ]
      ]
  },
  "totem": {
      "id": "totem",
      "name": "Totem",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla totem ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "ruh"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "ruh"
          ]
      ]
  },
  "plato": {
      "id": "plato",
      "name": "Plato",
      "description": "Manyetizma, Yunus ve İnci elementlerinin dengeli füzyonuyla yeni bir form olan plato sentezlenir.",
      "tier": 6,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "dag",
              "toprak"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "dag",
              "toprak",
              "ates"
          ]
      ]
  },
  "zaman_kum_saati": {
      "id": "zaman_kum_saati",
      "name": "Zaman Kum Saati",
      "description": "Kum Saati ve Zaman elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zaman kum saati meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#fbbf24",
          "secondary": "#fef08a",
          "emissive": "#d97706"
      },
      "particles": {
          "type": "spark",
          "color": "#fef08a",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kum_saati",
              "zaman"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "cam",
              "kum",
              "zaman"
          ]
      ]
  },
  "mancinik": {
      "id": "mancinik",
      "name": "Mancınık",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mancınık ortaya çıkar.",
      "tier": 9,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#ef4444",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "halat"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "halat"
          ]
      ]
  },
  "buhar": {
      "id": "buhar",
      "name": "Buhar",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla buhar ortaya çıkar.",
      "tier": 2,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "ates",
              "su"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "ates",
              "ates",
              "su"
          ]
      ]
  },
  "fay_hatti": {
      "id": "fay_hatti",
      "name": "Fay Hattı",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla fay hattı ortaya çıkar.",
      "tier": 4,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "toprak",
              "tas"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "toprak",
              "tas",
              "enerji"
          ]
      ]
  },
  "yakut": {
      "id": "yakut",
      "name": "Yakut",
      "description": "Koyun ve Yün elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yakut meydana gelir.",
      "tier": 10,
      "colorPalette": {
          "primary": "#e11d48",
          "secondary": "#fda4af",
          "emissive": "#881337"
      },
      "particles": {
          "type": "spark",
          "color": "#ffe4e6",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "mancinik"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "mancinik"
          ]
      ]
  },
  "kelebek": {
      "id": "kelebek",
      "name": "Kelebek",
      "description": "Kireç ve Kulübe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kelebek meydana gelir.",
      "tier": 12,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "alet",
              "isik"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "cam",
              "bicak",
              "isik"
          ]
      ]
  },
  "ruzgar": {
      "id": "ruzgar",
      "name": "Rüzgâr",
      "description": "Fırtına Bulutu ve Rüzgar elementlerinin anlamsal ve fiziksel etkileşimi sonucunda rüzgâr meydana gelir.",
      "tier": 3,
      "colorPalette": {
          "primary": "#94a3b8",
          "secondary": "#cbd5e1",
          "emissive": "#475569"
      },
      "particles": {
          "type": "spark",
          "color": "#e2e8f0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "hava",
              "enerji"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "gas",
      "trioRecipes": [
          [
              "hava",
              "hava",
              "enerji"
          ]
      ]
  },
  "migfer": {
      "id": "migfer",
      "name": "Miğfer",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla miğfer ortaya çıkar.",
      "tier": 13,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "cekic"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "cekic"
          ]
      ]
  },
  "firtina_kilici": {
      "id": "firtina_kilici",
      "name": "Fırtına Kılıcı",
      "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan fırtına kılıcı sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kilic",
              "yildirim"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "tas",
              "civi",
              "yildirim"
          ]
      ]
  },
  "prizma_tasi": {
      "id": "prizma_tasi",
      "name": "Prizma Taşı",
      "description": "Büyü Parşömeni ve Prizma elementlerinin anlamsal ve fiziksel etkileşimi sonucunda prizma taşı meydana gelir.",
      "tier": 8,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "prizma",
              "kristal"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "balik",
              "tas",
              "kristal"
          ]
      ]
  },
  "tufan": {
      "id": "tufan",
      "name": "Tufan",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla tufan ortaya çıkar.",
      "tier": 5,
      "colorPalette": {
          "primary": "#0284c7",
          "secondary": "#38bdf8",
          "emissive": "#0369a1"
      },
      "particles": {
          "type": "bubble",
          "color": "#bae6fd",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "yagmur",
              "okyanus"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "fluid",
      "trioRecipes": [
          [
              "yagmur",
              "okyanus",
              "deniz"
          ]
      ]
  },
  "pastirma": {
      "id": "pastirma",
      "name": "Pastırma",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla pastırma ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "et",
              "baharat"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "hayvan",
              "bicak",
              "baharat"
          ]
      ]
  },
  "peri": {
      "id": "peri",
      "name": "Peri",
      "description": "Pil ve Pirinç elementlerinin anlamsal ve fiziksel etkileşimi sonucunda peri meydana gelir.",
      "tier": 13,
      "colorPalette": {
          "primary": "#7c3aed",
          "secondary": "#c084fc",
          "emissive": "#4c1d95"
      },
      "particles": {
          "type": "spark",
          "color": "#ddd6fe",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "i_nsan",
              "kelebek"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "magic",
      "trioRecipes": [
          [
              "kanyon",
              "yun",
              "kelebek"
          ]
      ]
  },
  "meteor": {
      "id": "meteor",
      "name": "Meteor",
      "description": "Deprem, Kozmik Usturlap ve Yıldırım Parşömeni elementlerinin dengeli füzyonuyla yeni bir form olan meteor sentezlenir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "asteroit",
              "hava"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "kristal",
              "toprak",
              "hava"
          ]
      ]
  },
  "ev": {
      "id": "ev",
      "name": "Ev",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ev ortaya çıkar.",
      "tier": 8,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#cbd5e1",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "odun",
              "tugla_duvar"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "structure",
      "trioRecipes": [
          [
              "agac",
              "tas",
              "tugla_duvar"
          ]
      ]
  },
  "miknatis": {
      "id": "miknatis",
      "name": "Mıknatıs",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mıknatıs ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "manyetizma"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "manyetizma"
          ]
      ]
  },
  "sal": {
      "id": "sal",
      "name": "Sal",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sal ortaya çıkar.",
      "tier": 11,
      "colorPalette": {
          "primary": "#64748b",
          "secondary": "#94a3b8",
          "emissive": "#1e293b"
      },
      "particles": {
          "type": "spark",
          "color": "#ffffff",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "miknatis"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "mineral",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "miknatis"
          ]
      ]
  },
  "sosis": {
      "id": "sosis",
      "name": "Sosis",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sosis ortaya çıkar.",
      "tier": 12,
      "colorPalette": {
          "primary": "#dc2626",
          "secondary": "#f87171",
          "emissive": "#7f1d1d"
      },
      "particles": {
          "type": "spark",
          "color": "#fca5a5",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "sal"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "food",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "sal"
          ]
      ]
  },
  "meyve_bahcesi": {
      "id": "meyve_bahcesi",
      "name": "Meyve Bahçesi",
      "description": "Çilek ve Çiçek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda meyve bahçesi meydana gelir.",
      "tier": 13,
      "colorPalette": {
          "primary": "#16a34a",
          "secondary": "#4ade80",
          "emissive": "#14532d"
      },
      "particles": {
          "type": "spark",
          "color": "#bbf7d0",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kanyon",
              "sosis"
          ]
      },
      "icon": "✨",
      "category": "02_doga",
      "archetype3d": "flora",
      "trioRecipes": [
          [
              "nehir",
              "tas",
              "sosis"
          ]
      ]
  },
  "harita": {
      "id": "harita",
      "name": "Harita",
      "description": "Ceviz, Mağara ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan harita sentezlenir.",
      "tier": 11,
      "colorPalette": {
          "primary": "#d97706",
          "secondary": "#fed7aa",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kagit",
              "pusula"
          ]
      },
      "icon": "✨",
      "category": "08_mistik_ve_evren",
      "archetype3d": "fabric",
      "trioRecipes": [
          [
              "cam",
              "ates",
              "pusula"
          ]
      ]
  },
  "tavuk": {
      "id": "tavuk",
      "name": "Tavuk",
      "description": "Kadırga ve Tepe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tavuk meydana gelir.",
      "tier": 7,
      "colorPalette": {
          "primary": "#b45309",
          "secondary": "#d97706",
          "emissive": "#78350f"
      },
      "particles": {
          "type": "spark",
          "color": "#fed7aa",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "kus",
              "bugday"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "fauna",
      "trioRecipes": [
          [
              "yasam",
              "hava",
              "bugday"
          ]
      ]
  },
  "zincir": {
      "id": "zincir",
      "name": "Zincir",
      "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla zincir ortaya çıkar.",
      "tier": 10,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "demir",
              "demir"
          ]
      },
      "icon": "✨",
      "category": "04_zanaat_ve_aletler",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "metal",
              "toprak",
              "demir"
          ]
      ]
  },
  "savas_baltasi": {
      "id": "savas_baltasi",
      "name": "Savaş Baltası",
      "description": "Harç ve Kasırga elementlerinin anlamsal ve fiziksel etkileşimi sonucunda savaş baltası meydana gelir.",
      "tier": 9,
      "colorPalette": {
          "primary": "#475569",
          "secondary": "#94a3b8",
          "emissive": "#0f172a"
      },
      "particles": {
          "type": "spark",
          "color": "#94a3b8",
          "count": 12
      },
      "recipe": {
          "inputs": [
              "balta",
              "celik"
          ]
      },
      "icon": "✨",
      "category": "01_elements",
      "archetype3d": "mech",
      "trioRecipes": [
          [
              "bitki",
              "gunes",
              "celik"
          ]
      ]
  },
};

export function getCanonicalId(id) {
  if (!id) return id;
  return id.toLowerCase().trim();
}
