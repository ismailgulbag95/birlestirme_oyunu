/**
 * Auto-generated and synchronized Item Definitions with Multi-Mode Support
 * Total items: 522
 */

export const ITEM_DEFINITIONS = {
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
  "ahtapot": {
    "id": "ahtapot",
    "name": "Ahtapot",
    "description": "Denizlerin derinliklerinde yaşayan sekiz kollu ve kamuflaj ustası canlı.",
    "tier": 7,
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
        "su",
        "yasam",
        "yosun"
      ],
      [
        "balik",
        "bitki",
        "su"
      ]
    ]
  },
  "akrep": {
    "id": "akrep",
    "name": "Akrep",
    "description": "Çöl kumlarında yaşayan, kıskançlı ve zehirli kuyruklu eklembacaklı.",
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
        "kum",
        "orumcek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "aku": {
    "id": "aku",
    "name": "Akü",
    "description": "Araçlar için yüksek kapasiteli şarj edilebilir elektrik akümülatörü.",
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
        "kursun",
        "pil"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "metal",
        "pil",
        "toprak"
      ],
      [
        "elektrik",
        "kursun",
        "metal"
      ]
    ]
  },
  "alet": {
    "id": "alet",
    "name": "Alet",
    "description": "İşleri kolaylaştırmak için tahta ve taştan yapılmış ilkel araç.",
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
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "alci": {
    "id": "alci",
    "name": "Alçı",
    "description": "Kirecin suyla karıştırılıp kuruduğunda donan harç maddesi.",
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
    "trioRecipes": []
  },
  "ametist": {
    "id": "ametist",
    "name": "Ametist",
    "description": "Mistik mor rengiyle büyüleyen kuvars kristali.",
    "tier": 4,
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
        "enerji",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "tas"
      ]
    ]
  },
  "ampul": {
    "id": "ampul",
    "name": "Ampul",
    "description": "Elektrik akımıyla teli parlayarak odayı aydınlatan cam ampul.",
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
        "cam",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "elektrik",
        "kum"
      ],
      [
        "cam",
        "enerji",
        "yildirim"
      ]
    ]
  },
  "anka_kulu": {
    "id": "anka_kulu",
    "name": "Anka Külü",
    "description": "Anka kuşunun yanıp kül olduğunda bıraktığı yeniden doğuş tozu.",
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
    "trioRecipes": []
  },
  "ari": {
    "id": "ari",
    "name": "Arı",
    "description": "Çiçeklerin nektarını toplayıp kovanında bal üreten kanatlı böcek.",
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
        "cicek",
        "hayvan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "asa": {
    "id": "asa",
    "name": "Asa",
    "description": "Büyü enerjisini odaklayıp fırlatmaya yarayan sihirli asa.",
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
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "odun",
        "su",
        "tas"
      ],
      [
        "agac",
        "kristal",
        "tas"
      ]
    ]
  },
  "ayi": {
    "id": "ayi",
    "name": "Ayı",
    "description": "Ormanlarda ve mağaralarda yaşayan devasa cüsseli ve güçlü memeli.",
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
        "hayvan",
        "magara"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "baharat": {
    "id": "baharat",
    "name": "Baharat",
    "description": "Yemeklere lezzet ve koku katan kurutulmuş aromatik bitki tozu.",
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
        "ates",
        "tohum"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "baharat_cesnisi": {
    "id": "baharat_cesnisi",
    "name": "Baharat Çeşnisi",
    "description": "Farklı baharatların tuzla harmanlanmış lezzet karışımı.",
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
        "ates",
        "tohum",
        "tuz"
      ],
      [
        "ates",
        "baharat",
        "deniz"
      ]
    ]
  },
  "bakir": {
    "id": "bakir",
    "name": "Bakır",
    "description": "Kızıl renkli, elektrik ve ısı iletkenliği yüksek yumuşak metal.",
    "tier": 5,
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
        "ates",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bal": {
    "id": "bal",
    "name": "Bal",
    "description": "Arıların çiçek özlerinden ürettiği şifalı tatlı besin.",
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
        "ari",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ari",
        "bitki",
        "isik"
      ]
    ]
  },
  "balta": {
    "id": "balta",
    "name": "Balta",
    "description": "Ağaç kesmek ve odun yarmak için keskin başlı alet.",
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
        "alet",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "bataklik": {
    "id": "bataklik",
    "name": "Bataklık",
    "description": "Su ve balçıkla kaplı, sazlıklarla örtülü ıslak alan.",
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
        "bitki",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "camur",
        "su",
        "tohum"
      ]
    ]
  },
  "baykus": {
    "id": "baykus",
    "name": "Baykuş",
    "description": "Karanlık gecelerde sessizce avlanan bilge gözlü gece kuşu.",
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
        "gece",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bitki": {
    "id": "bitki",
    "name": "Bitki",
    "description": "Topraktan ve güneş ışığından beslenerek yeşeren canlı.",
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
        "su",
        "tohum"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "bozkir": {
    "id": "bozkir",
    "name": "Bozkır",
    "description": "Karasal iklimde uzanan ağaçsız geniş çayır ve otlak düzlük.",
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
        "cimen",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "buhar": {
    "id": "buhar",
    "name": "Buhar",
    "description": "Ateşin ısısıyla suyun buharlaşmasından doğan sıcak gaz kütlesi.",
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
    "trioRecipes": []
  },
  "buzul": {
    "id": "buzul",
    "name": "Buzul",
    "description": "Yıllar boyunca birikip sıkışan devasa donmuş buz tabakası.",
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
        "buz",
        "kar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "buyu": {
    "id": "buyu",
    "name": "Büyü",
    "description": "Doğaüstü iradeyle fizik kanunlarını bükme ve yaratma kudreti.",
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
        "ates",
        "hava",
        "yasam"
      ]
    ]
  },
  "buyu_parsomeni": {
    "id": "buyu_parsomeni",
    "name": "Büyü Parşömeni",
    "description": "Üzerinde efsunlu sözler yazılı kadim büyü parşömeni.",
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
        "buyu",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "enerji",
        "kagit",
        "yasam"
      ],
      [
        "buyu",
        "odun",
        "su"
      ]
    ]
  },
  "ceviz": {
    "id": "ceviz",
    "name": "Ceviz",
    "description": "Beyne benzeyen kıvrımlı yapısıyla bilinen sert kabuklu kuruyemiş.",
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
        "kemik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "bitki",
        "kemik",
        "toprak"
      ],
      [
        "agac",
        "hayvan",
        "toprak"
      ]
    ]
  },
  "cin": {
    "id": "cin",
    "name": "Cin",
    "description": "Dumansız ve kızgın ateşten yaratılmış görünmez mistik varlık.",
    "tier": 2,
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
        "ates",
        "ruh"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "civa": {
    "id": "civa",
    "name": "Cıva",
    "description": "Oda sıcaklığında sıvı halde bulunan gümüşi metalik element.",
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
        "metal",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "davul": {
    "id": "davul",
    "name": "Davul",
    "description": "Gerilmiş deriye tokmakla vurularak çalınan ritim çalgısı.",
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
        "hayvan",
        "odun",
        "tas"
      ],
      [
        "agac",
        "deri",
        "tas"
      ]
    ]
  },
  "demir_kulce": {
    "id": "demir_kulce",
    "name": "Demir Külçe",
    "description": "Yüksek fırında eritilip kalıba dökülmüş saf demir kütlesi.",
    "tier": 6,
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
        "ates",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "deri": {
    "id": "deri",
    "name": "Deri",
    "description": "Hayvan gövdesinden soyularak işlenen dayanıklı dış tabaka.",
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
        "hayvan",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "degirmen": {
    "id": "degirmen",
    "name": "Değirmen",
    "description": "Rüzgar veya su gücüyle tahıl öğüten mekanik değirmen.",
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
        "cark",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "alet",
        "odun",
        "tas"
      ]
    ]
  },
  "domates": {
    "id": "domates",
    "name": "Domates",
    "description": "Kırmızı rengi ve sulu yapısıyla sofraların vazgeçilmezi sebze.",
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
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "isik",
        "su",
        "tohum"
      ],
      [
        "ates",
        "bitki",
        "hava"
      ]
    ]
  },
  "et": {
    "id": "et",
    "name": "Et",
    "description": "Beslenmek için hazırlanan taze hayvansal et.",
    "tier": 10,
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
        "bicak",
        "hayvan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "ev": {
    "id": "ev",
    "name": "Ev",
    "description": "İnsanların barınıp huzurla yaşadığı duvarlı ve çatılı yuva.",
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
        "tugla"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "harc",
        "odun",
        "tugla"
      ]
    ]
  },
  "evren": {
    "id": "evren",
    "name": "Evren",
    "description": "Tüm maddeyi, enerjiyi, zamanı ve mekanı içinde barındıran sonsuz bütün.",
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
        "galaksi",
        "karadelik"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "galaksi",
        "gece",
        "yildiz"
      ]
    ]
  },
  "fay_hatti": {
    "id": "fay_hatti",
    "name": "Fay Hattı",
    "description": "Yer kabuğundaki tektonik kırık çizgisi.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "felsefe_tasi": {
    "id": "felsefe_tasi",
    "name": "Felsefe Taşı",
    "description": "Her şeyi altına çeviren ve ölümsüzlük bahşeden efsanevi simya taşı.",
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
        "altin",
        "elmas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "elmas",
        "isik",
        "metal"
      ],
      [
        "altin",
        "komur",
        "tas"
      ]
    ]
  },
  "fiyort": {
    "id": "fiyort",
    "name": "Fiyort",
    "description": "Buzulların aşındırdığı derin ve dik yamaçlı deniz körfezi.",
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
        "dag",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "deniz",
        "tas",
        "toprak"
      ]
    ]
  },
  "flut": {
    "id": "flut",
    "name": "Flüt",
    "description": "Üflenerek çalınan dinlendirici sesli ahşap nefesli çalgı.",
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
        "alet",
        "bambu",
        "hava"
      ]
    ]
  },
  "fosil": {
    "id": "fosil",
    "name": "Fosil",
    "description": "Taşlaşmış toprak katmanlarında korunan kadim canlı kalıntısı.",
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
        "kemik",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "hayvan",
        "tas",
        "toprak"
      ]
    ]
  },
  "findik": {
    "id": "findik",
    "name": "Fındık",
    "description": "Sert kabuğun içinde saklanan yağlı ve besleyici lezzetli yemiş.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "geyik": {
    "id": "geyik",
    "name": "Geyik",
    "description": "Görkemli boynuzlarıyla ormanın derinliklerinde süzülen zarif hayvan.",
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
        "at",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bozkir",
        "hayvan",
        "orman"
      ]
    ]
  },
  "gezegen": {
    "id": "gezegen",
    "name": "Gezegen",
    "description": "Bir yıldızın etrafındaki yörüngede dönen büyük gök cismi.",
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
        "gunes",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "isik",
        "tas",
        "yildiz"
      ]
    ]
  },
  "granit": {
    "id": "granit",
    "name": "Granit",
    "description": "Magmanın yer altında yavaşça soğuyarak kristalleştiği sert taş.",
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
        "lav",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "gokkusagi": {
    "id": "gokkusagi",
    "name": "Gökkuşağı",
    "description": "Güneş ışığının yağmur damlalarında kırılarak oluşturduğu 7 renkli yay.",
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
        "gunes",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "gunes",
        "hava",
        "yagmur"
      ]
    ]
  },
  "golge": {
    "id": "golge",
    "name": "Gölge",
    "description": "Işığın karanlıkla buluştuğu ve engellendiği silüet alanı.",
    "tier": 5,
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
        "karanlik"
      ]
    },
    "icon": "👤",
    "category": "01_elements",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "gul": {
    "id": "gul",
    "name": "Gül",
    "description": "Dikenli dalları ve büyüleyici kokusuyla aşkın simgesi kırmızı çiçek.",
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
        "ates",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": [
      [
        "ates",
        "bitki",
        "isik"
      ]
    ]
  },
  "gurz": {
    "id": "gurz",
    "name": "Gürz",
    "description": "Düşman zırhlarını ezmek için kullanılan ağır başlıklı topuz.",
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
        "demir",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "metal",
        "odun",
        "toprak"
      ],
      [
        "agac",
        "demir",
        "tas"
      ]
    ]
  },
  "halat": {
    "id": "halat",
    "name": "Halat",
    "description": "Kalın ve ağır yükleri çekmek için bükülmüş güçlü urgan.",
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
        "i_p",
        "i_p"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "hamur": {
    "id": "hamur",
    "name": "Hamur",
    "description": "Unun su ve tuzla yoğrulmasıyla oluşan yumuşak hamur.",
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
        "su",
        "un"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bugday",
        "degirmen",
        "su"
      ]
    ]
  },
  "harc": {
    "id": "harc",
    "name": "Harç",
    "description": "Çimento, kum ve suyun karışımıyla oluşan bağlayıcı inşaat harcı.",
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
        "camur",
        "kirec",
        "su"
      ]
    ]
  },
  "havyar": {
    "id": "havyar",
    "name": "Havyar",
    "description": "Değerli mersin balığından elde edilen lüks tuzlu balık yumurtası.",
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
        "su",
        "tuz",
        "yasam"
      ],
      [
        "ates",
        "balik",
        "deniz"
      ]
    ]
  },
  "hucre": {
    "id": "hucre",
    "name": "Hücre",
    "description": "Canlıların temel yapı taşı olan biyolojik birim.",
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
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "camur",
        "enerji",
        "su"
      ]
    ]
  },
  "jenerator": {
    "id": "jenerator",
    "name": "Jeneratör",
    "description": "Mekanik hareketi elektrik enerjisine çeviren güçlü santral makinesi.",
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
        "buhar_motoru",
        "miknatis"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "buhar",
        "demir",
        "miknatis"
      ],
      [
        "buhar_motoru",
        "demir",
        "manyetizma"
      ]
    ]
  },
  "kadirga": {
    "id": "kadirga",
    "name": "Kadırga",
    "description": "Hem kürekle hem yelkenle yürütülen tarihi savaş gemisi.",
    "tier": 14,
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
        "kurek",
        "yelkenli"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "metal",
        "odun",
        "yelkenli"
      ],
      [
        "kurek",
        "odun",
        "yelken"
      ]
    ]
  },
  "kaktus": {
    "id": "kaktus",
    "name": "Kaktüs",
    "description": "Çöl kuraklığına gövdesinde su depolayarak direnen dikenli bitki.",
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
        "bitki",
        "kum"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kale": {
    "id": "kale",
    "name": "Kale",
    "description": "Düşman saldırılarına karşı şehri koruyan mazgallı sağlam taş hisar.",
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
        "harc",
        "tas",
        "tugla"
      ]
    ]
  },
  "kalem": {
    "id": "kalem",
    "name": "Kalem",
    "description": "Düşünceleri kağıda dökmek için kullanılan yazı aleti.",
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
        "kus_tuyu",
        "murekkep"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "hava",
        "kus",
        "murekkep"
      ],
      [
        "komur",
        "kus_tuyu",
        "su"
      ]
    ]
  },
  "kandil": {
    "id": "kandil",
    "name": "Kandil",
    "description": "İçinde yağ yakılarak ışık veren ilkel pişmiş toprak lamba.",
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
        "ates",
        "comlek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "alet",
        "ates",
        "camur"
      ]
    ]
  },
  "kar": {
    "id": "kar",
    "name": "Kar",
    "description": "Bulutlardaki su buharının donarak oluşturduğu beyaz kristal taneleri.",
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
        "bulut",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "kartal": {
    "id": "kartal",
    "name": "Kartal",
    "description": "Yüksek dağ zirvelerinde yuva yapan keskin gözlü yırtıcı kuş.",
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
        "dag",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kasaba": {
    "id": "kasaba",
    "name": "Kasaba",
    "description": "Köyden büyük, çarşısı ve zanaatkarları olan küçük kentsel yerleşim.",
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
        "koy",
        "pazar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "i_nsan",
        "koy",
        "para"
      ]
    ]
  },
  "kavurma": {
    "id": "kavurma",
    "name": "Kavurma",
    "description": "Kendi yağında kavrularak pişirilen lezzetli et.",
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
        "ates",
        "et"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "bicak",
        "hayvan"
      ]
    ]
  },
  "kagit": {
    "id": "kagit",
    "name": "Kağıt",
    "description": "Ağaç hamurunun preslenip kurutulmasıyla elde edilen ince yazı tabakası.",
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
        "odun",
        "su"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "agac",
        "su",
        "tas"
      ]
    ]
  },
  "kehribar": {
    "id": "kehribar",
    "name": "Kehribar",
    "description": "Milyonlarca yıllık ağaç reçinesinin taşlaşmış fosil hali.",
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
    "trioRecipes": []
  },
  "kemik": {
    "id": "kemik",
    "name": "Kemik",
    "description": "Omurgalı canlıların iskeletini oluşturan sert kalsiyum yapı.",
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
        "hayvan",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kentaurluk": {
    "id": "kentaurluk",
    "name": "Kentaurluk",
    "description": "Gövdesi insan, altı at olan efsanevi orman savaşçısı ırk.",
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
        "at",
        "i_nsan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kertenkele": {
    "id": "kertenkele",
    "name": "Kertenkele",
    "description": "Güneş altında kayalarda ısınan çevik sürüngen canlı.",
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
        "kum",
        "kurbaga"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kilit": {
    "id": "kilit",
    "name": "Kilit",
    "description": "Kapıları ve sandıkları güvenle kilitleyen mekanik düzenek.",
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
        "civi",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "civi",
        "metal",
        "toprak"
      ]
    ]
  },
  "kirec": {
    "id": "kirec",
    "name": "Kireç",
    "description": "Kalker taşının ateşte yakılmasıyla elde edilen beyaz bağlayıcı toz.",
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
        "ates",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "koyun": {
    "id": "koyun",
    "name": "Koyun",
    "description": "Yumuşacık yünü ve eti için beslenen sürü hayvanı.",
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
        "cimen",
        "hayvan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kristal": {
    "id": "kristal",
    "name": "Kristal",
    "description": "Minerallerin kusursuz geometrik yapıda katılaşmış formu.",
    "tier": 4,
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
        "su",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kule": {
    "id": "kule",
    "name": "Kule",
    "description": "Uzakları gözetlemek veya savunmak için göğe yükselen silindirik taş yapı.",
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
    "trioRecipes": []
  },
  "kulube": {
    "id": "kulube",
    "name": "Kulübe",
    "description": "Orman içinde ahşaptan yapılmış mütevazı barınak.",
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
        "ev",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "kum": {
    "id": "kum",
    "name": "Kum",
    "description": "Kayaların rüzgar ve erozyonla ufalanmasından doğan ince tanecikler.",
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
        "hava",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kurbaga": {
    "id": "kurbaga",
    "name": "Kurbağa",
    "description": "Hem karada hem suda yaşayabilen zıplayan amfibi canlı.",
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
    "trioRecipes": []
  },
  "kursun": {
    "id": "kursun",
    "name": "Kurşun",
    "description": "Ağır, yumuşak ve gri renkli yoğun metal elementi.",
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
        "metal",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kutsal_kase": {
    "id": "kutsal_kase",
    "name": "Kutsal Kase",
    "description": "İçenlere ebedi hayat bahşettiği söylenen efsanevi kase.",
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
        "altin",
        "olumsuzluk_i_ksiri"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "isik",
        "metal",
        "olumsuzluk_i_ksiri"
      ],
      [
        "altin",
        "felsefe_tasi",
        "i_ksir"
      ]
    ]
  },
  "kuvars": {
    "id": "kuvars",
    "name": "Kuvars",
    "description": "Basınç ve enerjiyle kristalleşen sert mineral kristalleri.",
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
        "enerji",
        "kum"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "kum"
      ],
      [
        "enerji",
        "hava",
        "toprak"
      ]
    ]
  },
  "koruk": {
    "id": "koruk",
    "name": "Körük",
    "description": "Ocağın ateşini körükleyip sıcaklığı artıran hava üfleyici körük.",
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
        "hava",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "agac",
        "hava",
        "tas"
      ]
    ]
  },
  "koy": {
    "id": "koy",
    "name": "Köy",
    "description": "Kırsal alanda tarım ve hayvancılıkla geçinen şirin yerleşim birimi.",
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
    "trioRecipes": []
  },
  "kukurt": {
    "id": "kukurt",
    "name": "Kükürt",
    "description": "Yanardağ kraterlerinden çıkarılan sarı renkli yanıcı mineral.",
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
        "toprak",
        "yanardag"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kul": {
    "id": "kul",
    "name": "Kül",
    "description": "Ateşin yanıp kül ettiği maddelerden geriye kalan mineral tozu.",
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
        "ates",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kurek": {
    "id": "kurek",
    "name": "Kürek",
    "description": "Toprak, kum veya karı küremek için kullanılan geniş ağızlı alet.",
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
        "metal",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kita": {
    "id": "kita",
    "name": "Kıta",
    "description": "Okyanuslarla çevrili devasa yeryüzü ana karası.",
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
        "ada",
        "ada"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kiymik": {
    "id": "kiymik",
    "name": "Kıymık",
    "description": "Odunun yarılmasıyla ayrılan ince ve sivri ahşap parçası.",
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
        "balta",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "lav": {
    "id": "lav",
    "name": "Lav",
    "description": "Toprağın ve kayaların aşırı yüksek sıcaklıkta erimiş akkor hali.",
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
    "trioRecipes": []
  },
  "lif": {
    "id": "lif",
    "name": "Lif",
    "description": "Bitki saplarından ayrılan ince ve dayanıklı dokuma teli.",
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
        "bitki",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "su",
        "tas",
        "tohum"
      ]
    ]
  },
  "mana": {
    "id": "mana",
    "name": "Mana",
    "description": "Büyücülerin büyü yaparken tükettiği saf ruhani enerji havuzu.",
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
        "buyu",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "buyu",
        "hava"
      ]
    ]
  },
  "mana_i_ksiri": {
    "id": "mana_i_ksiri",
    "name": "Mana İksiri",
    "description": "Tükenen büyü enerjisini anında dolduran parlak mavi iksir.",
    "tier": 6,
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
        "i_ksir",
        "mana"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "buyu",
        "mana",
        "su"
      ],
      [
        "buyu",
        "enerji",
        "i_ksir"
      ]
    ]
  },
  "mancinik": {
    "id": "mancinik",
    "name": "Mancınık",
    "description": "Kale surlarını yıkmak için dev kayalar fırlatan kuşatma motoru.",
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
        "halat",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "agac",
        "halat",
        "tas"
      ]
    ]
  },
  "mantar": {
    "id": "mantar",
    "name": "Mantar",
    "description": "Karanlık ve nemli orman tabanında yeşeren şapkalı canlı.",
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
        "camur",
        "yosun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "medeniyet": {
    "id": "medeniyet",
    "name": "Medeniyet",
    "description": "Kültür, bilim, hukuk ve sanatın ulaştığı en yüksek toplumsal düzey.",
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
        "sehir",
        "yazi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "kale",
        "kasaba",
        "yazi"
      ],
      [
        "kagit",
        "kalem",
        "sehir"
      ]
    ]
  },
  "melek": {
    "id": "melek",
    "name": "Melek",
    "description": "Saf ışıktan yaratılmış, ilahi emirleri yerine getiren masum varlık.",
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
        "isik",
        "ruh"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "ruh"
      ]
    ]
  },
  "meltem": {
    "id": "meltem",
    "name": "Meltem",
    "description": "Denizden karaya doğru esen ferahlatıcı hafif sahil rüzgarı.",
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
        "ruzgar",
        "su"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "mercan_kayaligi": {
    "id": "mercan_kayaligi",
    "name": "Mercan Kayalığı",
    "description": "Binlerce deniz canlısına yuva olan dev su altı resifi.",
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
        "deniz",
        "mercan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "deniz",
        "tas",
        "yasam"
      ]
    ]
  },
  "mesale": {
    "id": "mesale",
    "name": "Meşale",
    "description": "Ucu reçineli bezle sarılıp yakılan elde taşınan aydınlatma aracı.",
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
        "ates",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "migfer": {
    "id": "migfer",
    "name": "Miğfer",
    "description": "Başı darbelerden korumak için tasarlanmış sağlam miğfer kaskı.",
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
        "cekic",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "cekic",
        "metal",
        "toprak"
      ]
    ]
  },
  "muz": {
    "id": "muz",
    "name": "Muz",
    "description": "Tropik iklimde yetişen yumuşak ve potasyum zengini sarı meyve.",
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
        "isik",
        "palmiye"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "palmiye"
      ],
      [
        "agac",
        "isik",
        "kum"
      ]
    ]
  },
  "miknatis": {
    "id": "miknatis",
    "name": "Mıknatıs",
    "description": "Demir ve metalleri çeken manyetik kutuplu nesne.",
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
        "demir",
        "manyetizma"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "manyetizma",
        "metal",
        "toprak"
      ]
    ]
  },
  "mizrak": {
    "id": "mizrak",
    "name": "Mızrak",
    "description": "Uzun ahşap bir sapın ucuna takılan sivri metal mızrak.",
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
        "bicak",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "obsidyen": {
    "id": "obsidyen",
    "name": "Obsidyen",
    "description": "Volkanik lavın suyla temas edip aniden donmasıyla oluşan cam kayaç.",
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
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "odun": {
    "id": "odun",
    "name": "Odun",
    "description": "Ağaç gövdesinin kesilerek elde edilen sert ahşap parçası.",
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
    "trioRecipes": []
  },
  "ok": {
    "id": "ok",
    "name": "Ok",
    "description": "Ucu sivri metal başlıklı, yayla fırlatılan hedef oku.",
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
        "kiymik",
        "yay"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "olta": {
    "id": "olta",
    "name": "Olta",
    "description": "Balık tutmak için kullanılan kancalı ve ipli esnek kamış.",
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
        "i_p",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "alet",
        "bitki",
        "odun"
      ],
      [
        "agac",
        "i_p",
        "tas"
      ]
    ]
  },
  "pamuk": {
    "id": "pamuk",
    "name": "Pamuk",
    "description": "Tarlalarda açan yumuşacık beyaz lifli dokuma bitkisi.",
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
        "bitki",
        "bulut"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "bulut",
        "su",
        "tohum"
      ],
      [
        "bitki",
        "buhar",
        "hava"
      ]
    ]
  },
  "para": {
    "id": "para",
    "name": "Para",
    "description": "Ticarette malların değerini belirleyen ve takası sağlayan resmi araç.",
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
        "altin",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "demir",
        "isik",
        "metal"
      ],
      [
        "altin",
        "metal",
        "toprak"
      ]
    ]
  },
  "parsomen": {
    "id": "parsomen",
    "name": "Parşömen",
    "description": "İşlenmiş hayvan derisinden hazırlanan dayanıklı kadim yazı rulosu.",
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
        "deri",
        "yazi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "hayvan",
        "tas",
        "yazi"
      ],
      [
        "deri",
        "kagit",
        "kalem"
      ]
    ]
  },
  "pastirma": {
    "id": "pastirma",
    "name": "Pastırma",
    "description": "Çemen ve baharatlarla kurutulup olgunlaştırılmış geleneksel et.",
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
        "et",
        "tuz"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "et",
        "tohum"
      ],
      [
        "baharat",
        "bicak",
        "hayvan"
      ]
    ]
  },
  "pil": {
    "id": "pil",
    "name": "Pil",
    "description": "Kimyasal enerjiyi elektrik enerjisine dönüştürüp depolayan güç kaynağı.",
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
        "elektrik",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "enerji",
        "metal",
        "yildirim"
      ],
      [
        "ates",
        "elektrik",
        "tas"
      ]
    ]
  },
  "pirinc": {
    "id": "pirinc",
    "name": "Pirinç",
    "description": "Suyla dolu çeltik tarlalarında yetişen temel Uzakdoğu tahılı.",
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
        "bataklik",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bitki",
        "su",
        "tohum"
      ]
    ]
  },
  "plazma": {
    "id": "plazma",
    "name": "Plazma",
    "description": "Ateşin aşırı enerji ve elektrikle iyonlaşmış dördüncü madde hali.",
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
        "ates",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame",
    "trioRecipes": [
      [
        "ates",
        "enerji",
        "yildirim"
      ]
    ]
  },
  "porselen": {
    "id": "porselen",
    "name": "Porselen",
    "description": "Beyaz kaolinden üretilen zarif, ince ve dayanıklı mutfak eşyası.",
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
        "kirec",
        "seramik"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "seramik",
        "tas"
      ],
      [
        "cam",
        "comlek",
        "kirec"
      ]
    ]
  },
  "prizma": {
    "id": "prizma",
    "name": "Prizma",
    "description": "Beyaz ışığı kırarak gökkuşağı renklerine ayıran üçgen optik cam.",
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
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "isik",
        "kum"
      ],
      [
        "ates",
        "cam",
        "hava"
      ]
    ]
  },
  "resim": {
    "id": "resim",
    "name": "Resim",
    "description": "Fırça ve renklerle tuvale yansıtılan görsel sanat eseri.",
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
        "kumas",
        "murekkep"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "kagit",
        "kalem",
        "murekkep"
      ]
    ]
  },
  "recel": {
    "id": "recel",
    "name": "Reçel",
    "description": "Meyvelerin şekerle kaynatılarak kavanozlara doldurulmuş hali.",
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
        "cilek",
        "seker"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "bitki",
        "cilek"
      ]
    ]
  },
  "recine": {
    "id": "recine",
    "name": "Reçine",
    "description": "Ağaçların gövdesinden sızan yapışkan ve aromatik özsu.",
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
    "trioRecipes": []
  },
  "runik_zirh": {
    "id": "runik_zirh",
    "name": "Runik Zırh",
    "description": "Üzerine koruyucu büyülü rünler kazınmış kırılmaz runik zırh.",
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
        "demir_zirh",
        "run"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "demir_kulce",
        "run",
        "zirh"
      ],
      [
        "buyu",
        "demir_zirh",
        "tas"
      ]
    ]
  },
  "run": {
    "id": "run",
    "name": "Rün",
    "description": "Kadim taşlara kazınmış gizemli ve güçlü büyü harfi.",
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
        "buyu",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "enerji",
        "tas",
        "yasam"
      ]
    ]
  },
  "sal": {
    "id": "sal",
    "name": "Sal",
    "description": "Birbirine bağlanmış kütüklerden yapılan en ilkel su taşıtı.",
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
        "i_p",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "salca": {
    "id": "salca",
    "name": "Salça",
    "description": "Domateslerin ezilip güneşte kurutularak yoğunlaştırılmış ezmesi.",
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
        "domates",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bitki",
        "gunes",
        "isik"
      ],
      [
        "domates",
        "isik",
        "yildiz"
      ]
    ]
  },
  "sarmasik": {
    "id": "sarmasik",
    "name": "Sarmaşık",
    "description": "Ağaçlara ve kayalara dolanarak tırmanan sarılıcı yeşil bitki.",
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
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "sarimsak": {
    "id": "sarimsak",
    "name": "Sarımsak",
    "description": "Doğal antibiyotik olarak bilinen keskin kokulu şifa deposu.",
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
        "baharat",
        "sogan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "sogan",
        "tohum"
      ],
      [
        "baharat",
        "kok",
        "toprak"
      ]
    ]
  },
  "saglam_sandik": {
    "id": "saglam_sandik",
    "name": "Sağlam Sandık",
    "description": "Eşyaları ve değerli madenleri saklamak için kilitli ahşap sandık.",
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
        "kilit",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sera": {
    "id": "sera",
    "name": "Sera",
    "description": "Bitkileri soğuktan koruyarak yıl boyu yetiştiren cam mekan.",
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
        "bitki",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flora",
    "trioRecipes": [
      [
        "cam",
        "su",
        "tohum"
      ],
      [
        "ates",
        "bitki",
        "kum"
      ]
    ]
  },
  "seramik": {
    "id": "seramik",
    "name": "Seramik",
    "description": "Sırlanarak fırınlanmış su geçirmez pürüzsüz toprak kap.",
    "tier": 10,
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
        "comlek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": [
      [
        "ates",
        "comlek",
        "kum"
      ],
      [
        "alet",
        "cam",
        "camur"
      ]
    ]
  },
  "sincap": {
    "id": "sincap",
    "name": "Sincap",
    "description": "Ağaç dallarında ceviz saklayan kabarık kuyruklu sevimli kemirgen.",
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
        "hayvan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sinema": {
    "id": "sinema",
    "name": "Sinema",
    "description": "Peş peşe oynatılan karelerle dev perdede canlanan film sanatı.",
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
        "fotograf",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "isik",
        "kagit",
        "kamera"
      ],
      [
        "ates",
        "fotograf",
        "hava"
      ]
    ]
  },
  "sis": {
    "id": "sis",
    "name": "Sis",
    "description": "Yeryüzüne çöken serin nem ve su buharı tabakası.",
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
    "trioRecipes": []
  },
  "sosis": {
    "id": "sosis",
    "name": "Sosis",
    "description": "Kıyılmış baharatlı etin kılıflara doldurulması.",
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
        "baharat",
        "et"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "sur": {
    "id": "sur",
    "name": "Sur",
    "description": "Şehrin etrafını çepeçevre saran yüksek ve kalın savunma duvarı.",
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
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "tas": {
    "id": "tas",
    "name": "Taş",
    "description": "Ateşli lavın suyla aniden soğuyup katılaşması sonucu oluşan sert kayaç.",
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
    "trioRecipes": []
  },
  "tekerlek": {
    "id": "tekerlek",
    "name": "Tekerlek",
    "description": "Dönerek hareketi ve taşımayı devrimleştiren dairesel icat.",
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
        "cark",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "agac",
        "alet",
        "tas"
      ]
    ]
  },
  "tepe": {
    "id": "tepe",
    "name": "Tepe",
    "description": "Dağdan alçak, eğimli ve yuvarlak doğal yükselti.",
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
    "trioRecipes": []
  },
  "tereyagi": {
    "id": "tereyagi",
    "name": "Tereyağı",
    "description": "Süt kaymağının yayıkta dövülmesiyle toplanan saf yağ.",
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
        "alet",
        "sut"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "alet",
        "sut",
        "tuz"
      ]
    ]
  },
  "totem": {
    "id": "totem",
    "name": "Totem",
    "description": "Kabilenin atalarını ve koruyucu ruhlarını simgeleyen oymalı ahşap sütun.",
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
        "ruh",
        "tas"
      ],
      [
        "isik",
        "odun",
        "yasam"
      ]
    ]
  },
  "tufan": {
    "id": "tufan",
    "name": "Tufan",
    "description": "Şiddetli yağmurlar sonucu yeryüzünü kaplayan dev su taşkını.",
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
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "tugla": {
    "id": "tugla",
    "name": "Tuğla",
    "description": "Çamurun kalıplanıp fırında pişirilmesiyle elde edilen dayanıklı yapı taşı.",
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
        "ates",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tunel": {
    "id": "tunel",
    "name": "Tünel",
    "description": "Dağların altından delinerek açılan yeraltı geçiş koridoru.",
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
        "dag",
        "kazma"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "kazma",
        "tas",
        "toprak"
      ],
      [
        "dag",
        "odun",
        "tas"
      ]
    ]
  },
  "tilsim": {
    "id": "tilsim",
    "name": "Tılsım",
    "description": "Üzerine koruyucu büyüler kazınmış kutsal metal takı.",
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
        "buyu",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "enerji",
        "metal",
        "yasam"
      ],
      [
        "ates",
        "buyu",
        "tas"
      ]
    ]
  },
  "un": {
    "id": "un",
    "name": "Un",
    "description": "Buğday tanelerinin değirmende öğütülmesiyle elde edilen ince un.",
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
        "bugday",
        "degirmen"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bitki",
        "degirmen",
        "tohum"
      ],
      [
        "bugday",
        "cark",
        "tas"
      ]
    ]
  },
  "uydu": {
    "id": "uydu",
    "name": "Uydu",
    "description": "Dünya yörüngesinde dönerek haberleşme ve gözlem yapan uzay aracı.",
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
        "radyo",
        "roket"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "elektrik",
        "hava",
        "roket"
      ],
      [
        "barut",
        "demir",
        "radyo"
      ]
    ]
  },
  "ucurtma": {
    "id": "ucurtma",
    "name": "Uçurtma",
    "description": "İnce bir iple gökyüzünde rüzgara karşı süzülen renkli oyuncak.",
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
        "kagit",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "odun",
        "ruzgar",
        "su"
      ]
    ]
  },
  "vaha": {
    "id": "vaha",
    "name": "Vaha",
    "description": "Çölün ortasında yer altı sularıyla yeşeren cennet köşesi.",
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
        "col",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "vinc": {
    "id": "vinc",
    "name": "Vinç",
    "description": "Devasa yapı bloklarını ve yükleri göklere kaldıran hidrolik kule vinci.",
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
        "demir",
        "halat"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "halat",
        "metal",
        "toprak"
      ]
    ]
  },
  "volkan": {
    "id": "volkan",
    "name": "Volkan",
    "description": "Yerin derinliklerindeki magmayı yüzeye taşıyan yanardağ.",
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
    "trioRecipes": []
  },
  "yaprak": {
    "id": "yaprak",
    "name": "Yaprak",
    "description": "Bitkilerin nefes alıp fotosentez yaptığı yeşil yaprak.",
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
    "trioRecipes": []
  },
  "yarimada": {
    "id": "yarimada",
    "name": "Yarımada",
    "description": "Üç tarafı suyla çevrili, bir tarafı karaya bağlı kara parçası.",
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
        "ada",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yatak": {
    "id": "yatak",
    "name": "Yatak",
    "description": "Yorgun bedeni dinlendiren yumuşak döşekli ahşap karyola.",
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
        "kumas",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "agac",
        "kumas",
        "tas"
      ]
    ]
  },
  "yazi": {
    "id": "yazi",
    "name": "Yazı",
    "description": "Konuşulan dili simgelerle kalıcı kılan medeniyet icadı.",
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
        "kalem"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "kalem",
        "odun",
        "su"
      ],
      [
        "kagit",
        "kus_tuyu",
        "murekkep"
      ]
    ]
  },
  "yelken": {
    "id": "yelken",
    "name": "Yelken",
    "description": "Rüzgarı yakalayarak tekneleri denizlerde yürüten dayanıklı kumaş kanat.",
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
        "kumas",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yol": {
    "id": "yol",
    "name": "Yol",
    "description": "Şehirleri ve köyleri birbirine bağlayan döşeli ulaşım şeridi.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yogurt": {
    "id": "yogurt",
    "name": "Yoğurt",
    "description": "Ilık sütün yoğurt mayasıyla fermante edilerek katılaştırılması.",
    "tier": 14,
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
        "maya",
        "sut"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "bakteri",
        "maya",
        "sut"
      ]
    ]
  },
  "yun": {
    "id": "yun",
    "name": "Yün",
    "description": "Koyundan kırkılan, sıcak tutan doğal yumuşak lif kütlesi.",
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
        "makas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "zincir": {
    "id": "zincir",
    "name": "Zincir",
    "description": "Birbirine geçmiş demir halkalardan oluşan kopmaz bağ.",
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
        "demir",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "zumrut": {
    "id": "zumrut",
    "name": "Zümrüt",
    "description": "Doğanın yeşilini içinde barındıran ışıltılı değerli taş.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "zirh": {
    "id": "zirh",
    "name": "Zırh",
    "description": "Vücudu silahlardan korumak için giyilen zırhlı donanım.",
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
        "deri",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "hayvan",
        "metal",
        "tas"
      ],
      [
        "ates",
        "deri",
        "tas"
      ]
    ]
  },
  "cakmaktasi": {
    "id": "cakmaktasi",
    "name": "Çakmaktaşı",
    "description": "Birbirine sürtüldüğünde parlak kıvılcımlar çıkaran sert çakmaktaşı.",
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
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "cali": {
    "id": "cali",
    "name": "Çalı",
    "description": "Kısa boylu, dallı ve sık gövdeli bodur bitki kümesi.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "camur": {
    "id": "camur",
    "name": "Çamur",
    "description": "Toprağın su ile yoğrulmasıyla oluşan yumuşak balçık.",
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
    "trioRecipes": []
  },
  "cark": {
    "id": "cark",
    "name": "Çark",
    "description": "Dönme hareketini ileten dişli ahşap tekerlek mekanizması.",
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
        "disli",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "cekic": {
    "id": "cekic",
    "name": "Çekiç",
    "description": "Nesneleri dövmek veya çakmak için saplı ağır taş/demir başlık.",
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
        "demir",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "cimen": {
    "id": "cimen",
    "name": "Çimen",
    "description": "Yeryüzünü halı gibi kaplayan sık yeşillik tabakası.",
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
        "bitki",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "cimento": {
    "id": "cimento",
    "name": "Çimento",
    "description": "Harç ve beton yapımında kullanılan bağlayıcı gri toz.",
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
        "camur",
        "kirec"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "flora",
    "trioRecipes": [
      [
        "ates",
        "camur",
        "tas"
      ]
    ]
  },
  "civi": {
    "id": "civi",
    "name": "Çivi",
    "description": "Ahşap ve taş parçaları birbirine tutturmaya yarayan sivri metal.",
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
        "cekic",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "corba": {
    "id": "corba",
    "name": "Çorba",
    "description": "Sebze, et ve baharatların kaynatılmasıyla yapılan sıcacık yemek.",
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
        "et",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "et",
        "su"
      ]
    ]
  },
  "col": {
    "id": "col",
    "name": "Çöl",
    "description": "Gündüzleri kavurucu, geceleri dondurucu uçsuz bucaksız kum denizi.",
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
        "kum"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "comlek": {
    "id": "comlek",
    "name": "Çömlek",
    "description": "Killi çamurun aletle şekillendirilip çömleğe dönüştürülmesi.",
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
        "alet",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "camur",
        "odun",
        "tas"
      ]
    ]
  },
  "cig": {
    "id": "cig",
    "name": "Çığ",
    "description": "Dağ yamaçlarından koparak aşağı yuvarlanan dev kar kütlesi.",
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
        "kar",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ors": {
    "id": "ors",
    "name": "Örs",
    "description": "Demircilerin kızgın metalleri dövüp şekillendirdiği ağır çelik kütük.",
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
        "demir",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "celik",
        "demir",
        "tas"
      ]
    ]
  },
  "uzum": {
    "id": "uzum",
    "name": "Üzüm",
    "description": "Salkım salkım sarkan, taze veya kurutularak yenen tatlı meyve.",
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
        "isik",
        "sarmasik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "sarmasik"
      ]
    ]
  },
  "i_ksir": {
    "id": "i_ksir",
    "name": "İksir",
    "description": "Şifalı otların ve büyülü maddelerin kazanında kaynatılmış iksir.",
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
        "buyu",
        "su"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "i_nek": {
    "id": "i_nek",
    "name": "İnek",
    "description": "Çiftliklerde otlayıp insanlara bol süt ve et sağlayan uysal memeli.",
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
        "sut"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "i_nsan": {
    "id": "i_nsan",
    "name": "İnsan",
    "description": "Düşünme, alet yapma ve dünyayı dönüştürme yetisine sahip varlık.",
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
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "camur",
        "enerji",
        "toprak"
      ]
    ]
  },
  "i_p": {
    "id": "i_p",
    "name": "İp",
    "description": "Bitkisel liflerin bükülerek birleştirilmesiyle yapılan sağlam bağ.",
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
        "alet",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bitki",
        "odun",
        "tas"
      ],
      [
        "alet",
        "su",
        "tohum"
      ]
    ]
  },
  "i_gne": {
    "id": "i_gne",
    "name": "İğne",
    "description": "Dikiş dikmek için ucu sivri ve delikli ince metal tel.",
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
        "demir",
        "kiymik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "kiymik",
        "metal",
        "toprak"
      ]
    ]
  },
  "safak": {
    "id": "safak",
    "name": "Şafak",
    "description": "Güneş doğmadan hemen önce ufkun kızıla boyandığı an.",
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
        "gece",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "sahin": {
    "id": "sahin",
    "name": "Şahin",
    "description": "Hızlı dalışlarıyla bilinen avcı yırtıcı kuş.",
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
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "selale": {
    "id": "selale",
    "name": "Şelale",
    "description": "Nehir suyunun yüksek kayalıklardan köpürerek döküldüğü çağlayan.",
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
        "dag",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "nehir",
        "tas",
        "toprak"
      ]
    ]
  },
  "sifa_i_ksiri": {
    "id": "sifa_i_ksiri",
    "name": "Şifa İksiri",
    "description": "Yaraları anında iyileştiren kırmızı renkli şifalı iksir.",
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
        "gul",
        "i_ksir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "cicek",
        "i_ksir"
      ],
      [
        "buyu",
        "gul",
        "su"
      ]
    ]
  },
  "sise": {
    "id": "sise",
    "name": "Şişe",
    "description": "Sıvıları saklamak için üflenerek şekillendirilmiş cam kap.",
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
        "ates",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "at": {
    "id": "at",
    "name": "At",
    "description": "Asil duruşu, gücü ve hızıyla tarihe yön veren binek hayvanı.",
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
        "bozkir",
        "hayvan"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "buz": {
    "id": "buz",
    "name": "Buz",
    "description": "Suyun dondurucu havayla katılaşarak oluşturduğu şeffaf kristal.",
    "tier": 2,
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
        "hava",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "dinamit": {
    "id": "dinamit",
    "name": "Dinamit",
    "description": "Madencilikte kayaları parçalamak için kullanılan nitrogliserinli çubuk.",
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
        "komur",
        "kukurt",
        "kum"
      ],
      [
        "barut",
        "hava",
        "toprak"
      ]
    ]
  },
  "fener": {
    "id": "fener",
    "name": "Fener",
    "description": "Rüzgardan etkilenmemesi için cam kafes içine konmuş ışık kaynağı.",
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
        "cam",
        "mum"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "firtina_kilici": {
    "id": "firtina_kilici",
    "name": "Fırtına Kılıcı",
    "description": "Savrulduğunda şimşekler çaktıran fırtına efsunlu kılıç.",
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
        "kilic",
        "yildirim"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "cekic",
        "celik",
        "yildirim"
      ],
      [
        "enerji",
        "firtina",
        "kilic"
      ]
    ]
  },
  "gol": {
    "id": "gol",
    "name": "Göl",
    "description": "Karalar içinde çukur alanlarda toplanmış durgun tatlı su kütlesi.",
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
        "camur",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "kahin_kuresi": {
    "id": "kahin_kuresi",
    "name": "Kahin Küresi",
    "description": "Geleceği ve kaderin sırlarını gösteren parıldayan kristal küre.",
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
        "buyu",
        "kristal"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "enerji",
        "kristal",
        "yasam"
      ],
      [
        "buyu",
        "su",
        "tas"
      ]
    ]
  },
  "kalkan": {
    "id": "kalkan",
    "name": "Kalkan",
    "description": "Savaşta darbeleri savuşturmak için taşınan koruyucu levha.",
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
        "celik",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "celik",
        "deri",
        "odun"
      ]
    ]
  },
  "kasirga": {
    "id": "kasirga",
    "name": "Kasırga",
    "description": "Okyanus üzerinde dönerek güçlenen dev tropik fırtına.",
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
        "hortum",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": [
      [
        "firtina",
        "ruzgar",
        "su"
      ]
    ]
  },
  "lokomotif": {
    "id": "lokomotif",
    "name": "Lokomotif",
    "description": "Raylar üstündeki treni çeken güçlü buharlı veya elektrikli çekici.",
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
      ],
      [
        "alet",
        "buhar_motoru",
        "odun"
      ]
    ]
  },
  "makas": {
    "id": "makas",
    "name": "Makas",
    "description": "İki kesici bıçağın bir merkezde birleşmesiyle kumaş kesen aygıt.",
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
        "bicak",
        "bicak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "magara": {
    "id": "magara",
    "name": "Mağara",
    "description": "Kayalıkların ve dağların içinde doğal olarak oluşmuş derin kovuk.",
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
        "dag",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "muze": {
    "id": "muze",
    "name": "Müze",
    "description": "Tarihi eserlerin ve sanat harikalarının sergilendiği kültür kurumu.",
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
        "fosil",
        "odun",
        "tugla"
      ],
      [
        "ev",
        "kemik",
        "tas"
      ]
    ]
  },
  "nilufer": {
    "id": "nilufer",
    "name": "Nilüfer",
    "description": "Durgun göl sularının üzerinde yüzen zarif su çiçeği.",
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
        "cicek",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "sfenks": {
    "id": "sfenks",
    "name": "Sfenks",
    "description": "Piramitleri bekleyen insan başlı dev aslan heykeli.",
    "tier": 10,
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
        "aslan",
        "heykel"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": [
      [
        "bozkir",
        "heykel",
        "kedi"
      ],
      [
        "aslan",
        "cekic",
        "mermer"
      ]
    ]
  },
  "tutulma": {
    "id": "tutulma",
    "name": "Tutulma",
    "description": "Ayın dünya ile güneş arasına girip gündüzü karartması.",
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
        "ay",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "gece",
        "gunes",
        "tas"
      ],
      [
        "ay",
        "isik",
        "yildiz"
      ]
    ]
  },
  "tuy": {
    "id": "tuy",
    "name": "Tüy",
    "description": "Hafif ve aerodinamik doğal kuş tüyü.",
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
        "hava",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "uzay": {
    "id": "uzay",
    "name": "Uzay",
    "description": "Gök cisimleri arasındaki sonsuz karanlık ve sessiz boşluk.",
    "tier": 11,
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
        "evren",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "galaksi",
        "gece",
        "karadelik"
      ],
      [
        "evren",
        "isik",
        "toprak"
      ]
    ]
  },
  "yel_degirmeni": {
    "id": "yel_degirmeni",
    "name": "Yel Değirmeni",
    "description": "Rüzgarın kanatları çevirmesiyle tahıl öğüten kule değirmeni.",
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
        "degirmen",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "cark",
        "hava",
        "tas"
      ]
    ]
  },
  "i_ksir_kazani": {
    "id": "i_ksir_kazani",
    "name": "İksir Kazanı",
    "description": "Fokurdayan büyülü karışımların hazırlandığı mistik kazan.",
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
        "i_ksir",
        "kazan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "buyu",
        "kazan",
        "su"
      ],
      [
        "ates",
        "demir",
        "i_ksir"
      ]
    ]
  },
  "ada": {
    "id": "ada",
    "name": "Ada",
    "description": "Dört tarafı tamamen sularla çevrili kara parçası.",
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
        "deniz",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "alacakaranlik": {
    "id": "alacakaranlik",
    "name": "Alacakaranlık",
    "description": "Gündüzün geceye, ışığın karanlığa kavuştuğu loş an.",
    "tier": 4,
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
        "golge",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "alfabe": {
    "id": "alfabe",
    "name": "Alfabe",
    "description": "Bir dilin tüm seslerini temsil eden harfler dizgesi.",
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
        "yazi",
        "yazi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "anka_kusu": {
    "id": "anka_kusu",
    "name": "Anka Kuşu",
    "description": "Küllerinden yeniden doğan ebedi ateş kuşu Simurg.",
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
        "ates",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "anit": {
    "id": "anit",
    "name": "Anıt",
    "description": "Önemli olayları ve kahramanları ölümsüzleştiren anıt yapı.",
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
        "heykel",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "cekic",
        "mermer",
        "tas"
      ]
    ]
  },
  "aslan": {
    "id": "aslan",
    "name": "Aslan",
    "description": "Görkemli yelesi ve kükreyişiyle savanaların ve ormanların kralı.",
    "tier": 8,
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
        "bozkir",
        "kedi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "ay": {
    "id": "ay",
    "name": "Ay",
    "description": "Dünyanın uydusu olan ve geceleri güneş ışığını yansıtan gümüş gökcismi.",
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
        "gece",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "gece",
        "isik",
        "uzay"
      ]
    ]
  },
  "bal_kavanozu": {
    "id": "bal_kavanozu",
    "name": "Bal Kavanozu",
    "description": "Saf ve altın rengi balla doldurulmuş şeffaf kavanoz.",
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
        "bal",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ari",
        "cam",
        "cicek"
      ],
      [
        "ates",
        "bal",
        "kum"
      ]
    ]
  },
  "barut": {
    "id": "barut",
    "name": "Barut",
    "description": "Kükürt, kömür ve güherçilenin patlayıcı karışımı.",
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
        "komur",
        "kukurt"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "solid",
    "trioRecipes": [
      [
        "ates",
        "kukurt",
        "odun"
      ],
      [
        "komur",
        "toprak",
        "yanardag"
      ]
    ]
  },
  "barut_ficisi": {
    "id": "barut_ficisi",
    "name": "Barut Fıçısı",
    "description": "Büyük patlamalar yaratmak için doldurulmuş barut dolu ahşap fıçı.",
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
        "komur",
        "kukurt",
        "odun"
      ],
      [
        "agac",
        "barut",
        "tas"
      ]
    ]
  },
  "beton": {
    "id": "beton",
    "name": "Beton",
    "description": "Harç ve çakılın donarak kaya gibi sertleşen modern yapı malzemesi.",
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
        "kum"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "harc",
        "kum",
        "su"
      ]
    ]
  },
  "biber": {
    "id": "biber",
    "name": "Biber",
    "description": "Acı veya tatlı çeşitleriyle yemeklere lezzet katan taze sebze.",
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
        "ates",
        "domates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "bisiklet": {
    "id": "bisiklet",
    "name": "Bisiklet",
    "description": "İki tekerlek üzerinde pedal çevirerek sürülen insan gücüyle çalışan araç.",
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
        "demir",
        "tekerlek"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "metal",
        "tekerlek",
        "toprak"
      ]
    ]
  },
  "biyonik_kol": {
    "id": "biyonik_kol",
    "name": "Biyonik Kol",
    "description": "Düşünce sinyalleriyle hareket eden protez biyonik mekanik kol.",
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
        "i_nsan",
        "robot"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bilgisayar",
        "celik",
        "i_nsan"
      ]
    ]
  },
  "boyut_kapisi": {
    "id": "boyut_kapisi",
    "name": "Boyut Kapısı",
    "description": "Farklı evrenlere ve boyutlara açılan devasa kozmik solucan deliği geçidi.",
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
        "evren",
        "portal_runu"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "galaksi",
        "karadelik",
        "portal_runu"
      ],
      [
        "buyu",
        "evren",
        "run"
      ]
    ]
  },
  "bosluk_sisesi": {
    "id": "bosluk_sisesi",
    "name": "Boşluk Şişesi",
    "description": "İçinde mutlak uzay boşluğunu hapseden gizemli cam fanus.",
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
        "gece",
        "sise"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "cam",
        "gece",
        "uzay"
      ]
    ]
  },
  "bronz": {
    "id": "bronz",
    "name": "Bronz",
    "description": "Bakır ve diğer madenlerin eritilerek alaşımlanmış sert formu.",
    "tier": 6,
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
        "bakir",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "buhar_jeneratoru": {
    "id": "buhar_jeneratoru",
    "name": "Buhar Jeneratörü",
    "description": "Buhar basıncını elektrik enerjisine dönüştüren termik ünite.",
    "tier": 9,
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
        "jenerator"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": [
      [
        "buhar",
        "buhar_motoru",
        "miknatis"
      ]
    ]
  },
  "bulut": {
    "id": "bulut",
    "name": "Bulut",
    "description": "Gökyüzünde toplanan su buharı ve nem kütlesi.",
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
    "trioRecipes": []
  },
  "buz_dagi": {
    "id": "buz_dagi",
    "name": "Buz Dağı",
    "description": "Denizlerde ve okyanuslarda serbestçe yüzen devasa aysberg.",
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
        "buzul",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "solid",
    "trioRecipes": [
      [
        "buz",
        "kar",
        "su"
      ]
    ]
  },
  "buz_runu": {
    "id": "buz_runu",
    "name": "Buz Rünü",
    "description": "Dokunduğu her şeyi anında donduran buz rünü taşı.",
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
        "run"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "solid",
    "trioRecipes": [
      [
        "buyu",
        "buz",
        "tas"
      ]
    ]
  },
  "dag": {
    "id": "dag",
    "name": "Dağ",
    "description": "Tektonik hareketlerle göğe doğru yükselen ulu zirve.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "demir_kalkan": {
    "id": "demir_kalkan",
    "name": "Demir Kalkan",
    "description": "Ağır ve geçit vermez yekpare demir savunma kalkanı.",
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
        "demir",
        "kalkan"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "kalkan",
        "metal",
        "toprak"
      ]
    ]
  },
  "deniz": {
    "id": "deniz",
    "name": "Deniz",
    "description": "Uçsuz bucaksız tuzlu su havzası.",
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
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "denizanasi": {
    "id": "denizanasi",
    "name": "Denizanası",
    "description": "Denizlerde süzülen jelatinimsi ve dokunaçlı şeffaf canlı.",
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
    "trioRecipes": []
  },
  "denizkizi": {
    "id": "denizkizi",
    "name": "Denizkızı",
    "description": "Efsanelere konu olan yarı insan yarı balık büyülü deniz varlığı.",
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
        "i_nsan"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "i_nsan",
        "su",
        "yasam"
      ]
    ]
  },
  "deri_zirh": {
    "id": "deri_zirh",
    "name": "Deri Zırh",
    "description": "Sertleştirilmiş deriden yapılmış hafif ve esnek savaş yeleği.",
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
        "deri",
        "i_p"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "hayvan",
        "i_p",
        "tas"
      ],
      [
        "alet",
        "bitki",
        "deri"
      ]
    ]
  },
  "dolu": {
    "id": "dolu",
    "name": "Dolu",
    "description": "Yağmur damlalarının fırtınada donarak oluşturduğu buz topları.",
    "tier": 3,
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
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "ejderha": {
    "id": "ejderha",
    "name": "Ejderha",
    "description": "Ağzından alev püskürten, pullu ve kanatlı efsanevi ejderha.",
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
        "ates",
        "dinozor"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": [
      [
        "ates",
        "fosil",
        "kertenkele"
      ]
    ]
  },
  "fener_kulesi": {
    "id": "fener_kulesi",
    "name": "Fener Kulesi",
    "description": "Karanlık gecelerde denizdeki gemilere yol gösteren ışıklı deniz feneri.",
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
        "ates",
        "kule"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "ates",
        "kale",
        "tas"
      ]
    ]
  },
  "firtina": {
    "id": "firtina",
    "name": "Fırtına",
    "description": "Güçlü rüzgarların enerjiyle birleşip kasıp kavurduğu fırtına.",
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
        "enerji",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "elektrik",
        "hava",
        "yagmur"
      ]
    ]
  },
  "firtina_bulutu": {
    "id": "firtina_bulutu",
    "name": "Fırtına Bulutu",
    "description": "Şimşek ve şiddetli yağmur getiren kara fırtına bulutu.",
    "tier": 4,
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
        "bulut",
        "firtina"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "gazete": {
    "id": "gazete",
    "name": "Gazete",
    "description": "Günün haberlerini halka ulaştıran günlük basılı yayın.",
    "tier": 13,
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
        "matbaa"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "matbaa",
        "odun",
        "su"
      ],
      [
        "disli",
        "kagit",
        "yazi"
      ]
    ]
  },
  "girdap": {
    "id": "girdap",
    "name": "Girdap",
    "description": "Suyun dairesel çekim hareketiyle oluşan derin anafor.",
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
        "ruzgar",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "grifon": {
    "id": "grifon",
    "name": "Grifon",
    "description": "Gövdesi aslan, başı ve kanatları kartal olan cesur mitolojik yaratık.",
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
        "aslan",
        "kartal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": [
      [
        "bozkir",
        "kartal",
        "kedi"
      ],
      [
        "aslan",
        "dag",
        "kus"
      ]
    ]
  },
  "gulyabani": {
    "id": "gulyabani",
    "name": "Gulyabani",
    "description": "Karanlık çöllerde ve harabelerde dolaşan hortlak varlık.",
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
        "col",
        "hayalet"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "col",
        "gece",
        "ruh"
      ]
    ]
  },
  "gunduz": {
    "id": "gunduz",
    "name": "Gündüz",
    "description": "Güneşin doğmasıyla başlayan aydınlık ve hareketli zaman dilimi.",
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
        "gunes",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "hayalet": {
    "id": "hayalet",
    "name": "Hayalet",
    "description": "Bu dünyadan ayrılamamış ölülerin yarı saydam silueti.",
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
        "gece",
        "ruh"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "isik",
        "ruh",
        "toprak"
      ],
      [
        "gece",
        "isik",
        "yasam"
      ]
    ]
  },
  "hayvan": {
    "id": "hayvan",
    "name": "Hayvan",
    "description": "Kendi kendine hareket edebilen ve beslenen canlı organizma.",
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
        "toprak",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "hazine": {
    "id": "hazine",
    "name": "Hazine",
    "description": "Sandıklar dolusu altın ve mücevherden oluşan zenginlik.",
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
        "saglam_sandik"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "isik",
        "metal",
        "saglam_sandik"
      ],
      [
        "altin",
        "demir",
        "odun"
      ]
    ]
  },
  "hesap_makinesi": {
    "id": "hesap_makinesi",
    "name": "Hesap Makinesi",
    "description": "Matematiksel işlemleri anında ve hatasız yapan hesap cihazı.",
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
        "demir",
        "disli"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "disli",
        "metal",
        "toprak"
      ],
      [
        "cark",
        "demir",
        "metal"
      ]
    ]
  },
  "heykel": {
    "id": "heykel",
    "name": "Heykel",
    "description": "Mermer veya taşa çekiçle form verilerek yapılan 3D sanat eseri.",
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
        "cekic",
        "mermer"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "mermer",
        "odun",
        "tas"
      ],
      [
        "cekic",
        "kirec",
        "tas"
      ]
    ]
  },
  "kabile": {
    "id": "kabile",
    "name": "Kabile",
    "description": "Aynı kökten gelen insanların oluşturduğu dayanışma topluluğu.",
    "tier": 13,
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
        "aile",
        "kumas",
        "odun"
      ]
    ]
  },
  "kale_kapisi": {
    "id": "kale_kapisi",
    "name": "Kale Kapısı",
    "description": "Kalenin girişini koruyan devasa demir takviyeli meşe kapı.",
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
        "demir",
        "kale"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "kale",
        "metal",
        "toprak"
      ],
      [
        "demir",
        "tas",
        "tugla_duvar"
      ]
    ]
  },
  "kanal": {
    "id": "kanal",
    "name": "Kanal",
    "description": "Gemilerin geçmesi için kazılmış yapay su yolu.",
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
        "kazma",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "nehir",
        "odun",
        "tas"
      ],
      [
        "dag",
        "gol",
        "kazma"
      ]
    ]
  },
  "kano": {
    "id": "kano",
    "name": "Kano",
    "description": "İçi oyulmuş ağaç gövdesinden yapılan hafif nehir teknesi.",
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
        "kurek",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "agac",
        "kurek",
        "tas"
      ]
    ]
  },
  "karpuz": {
    "id": "karpuz",
    "name": "Karpuz",
    "description": "Yaz aylarında serinleten içi kıpkırmızı ve çekirdekli dev bostan meyvesi.",
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
        "su",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "kavrulmus_et": {
    "id": "kavrulmus_et",
    "name": "Kavrulmuş Et",
    "description": "Ateşte iyice pişirilip mühürlenmiş nefis et porsiyonu.",
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
        "ates",
        "pastirma"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "kazma": {
    "id": "kazma",
    "name": "Kazma",
    "description": "Toprağı ve sert kayaları kazmak için ucu sivri kazı aracı.",
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
        "demir",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kedi": {
    "id": "kedi",
    "name": "Kedi",
    "description": "Mırıltısıyla huzur veren, çevik ve bağımsız evcil avcı.",
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
        "hayvan",
        "i_nsan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kelebek": {
    "id": "kelebek",
    "name": "Kelebek",
    "description": "Tırtıldan kozaya, kozadan rengarenk kanatlara dönüşen zarif canlı.",
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
        "cicek",
        "hayvan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kitap": {
    "id": "kitap",
    "name": "Kitap",
    "description": "Ciltlenmiş sayfalarıyla insanlığın hafızasını taşıyan yazılı eser.",
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
        "kagit",
        "yazi"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "deri",
        "kagit",
        "murekkep"
      ]
    ]
  },
  "kozmik_usturlap": {
    "id": "kozmik_usturlap",
    "name": "Kozmik Usturlap",
    "description": "Yıldızların ve gezegenlerin konumunu hesaplayan antika astronomik cihaz.",
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
        "pusula",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "cam",
        "demir",
        "yildiz"
      ],
      [
        "ates",
        "plazma",
        "pusula"
      ]
    ]
  },
  "kum_saati": {
    "id": "kum_saati",
    "name": "Kum Saati",
    "description": "İki cam fanus arasında ince kumun akışıyla süreyi ölçen araç.",
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
        "cam",
        "hava",
        "toprak"
      ]
    ]
  },
  "kumas": {
    "id": "kumas",
    "name": "Kumaş",
    "description": "İpliklerin dokuma tezgahında örülmesiyle elde edilen kumaş.",
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
        "pamuk",
        "i_p"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "i_gne",
        "i_plik",
        "pamuk"
      ]
    ]
  },
  "kuyruklu_yildiz": {
    "id": "kuyruklu_yildiz",
    "name": "Kuyruklu Yıldız",
    "description": "Güneşe yaklaştıkça arkasında milyonlarca kilometrelik gaz kuyruğu bırakan gökcismi.",
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
        "buz",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "buz",
        "plazma"
      ]
    ]
  },
  "kus_tuyu": {
    "id": "kus_tuyu",
    "name": "Kuş Tüyü",
    "description": "Kuşların gövdesini kaplayan hafif ve yumuşak tüy.",
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
        "kus"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kilic": {
    "id": "kilic",
    "name": "Kılıç",
    "description": "Demircinin örs üzerinde döverek şekillendirdiği keskin çelik kılıç.",
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
        "cekic",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "celik",
        "odun",
        "tas"
      ],
      [
        "cekic",
        "demir",
        "komur"
      ]
    ]
  },
  "lazer": {
    "id": "lazer",
    "name": "Lazer",
    "description": "Tek dalga boyunda yoğunlaştırılmış güçlü ışık demeti.",
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
        "isik",
        "kristal"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "kristal"
      ],
      [
        "isik",
        "su",
        "tas"
      ]
    ]
  },
  "liman": {
    "id": "liman",
    "name": "Liman",
    "description": "Gemilerin demirleyip yük indirip bindirdiği korunaklı kıyı tesisi.",
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
        "deniz",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "meka_zirhi": {
    "id": "meka_zirhi",
    "name": "Meka Zırhı",
    "description": "İnsanın içine girip devasa güç kazandığı hidrolik meka dış iskeleti.",
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
        "demir_zirh",
        "robot"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "demir_kulce",
        "robot",
        "zirh"
      ],
      [
        "bilgisayar",
        "demir",
        "demir_zirh"
      ]
    ]
  },
  "minyatur_yildiz": {
    "id": "minyatur_yildiz",
    "name": "Minyatür Yıldız",
    "description": "Simyacının kristal fanus içinde hapsettiği cüce parlak yıldız.",
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
        "camur",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "camur",
        "plazma"
      ]
    ]
  },
  "murekkep": {
    "id": "murekkep",
    "name": "Mürekkep",
    "description": "Kömür karası ve sudan yapılan yazı yazma sıvısı.",
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
    "trioRecipes": []
  },
  "nane": {
    "id": "nane",
    "name": "Nane",
    "description": "Ferahlatıcı kokusuyla bilinen şifalı yeşil ot.",
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
        "hava",
        "yaprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "agac",
        "hava",
        "isik"
      ]
    ]
  },
  "nehir": {
    "id": "nehir",
    "name": "Nehir",
    "description": "Dağlardan doğup denizlere doğru kıvrılarak akan tatlı su ırmağı.",
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
        "dag",
        "gol"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "gol",
        "tas",
        "toprak"
      ],
      [
        "camur",
        "dag",
        "su"
      ]
    ]
  },
  "okul": {
    "id": "okul",
    "name": "Okul",
    "description": "Çocukların ve gençlerin bilgi ve beceri edindiği eğitim yuvası.",
    "tier": 13,
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
        "yazi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "ev",
        "kitap",
        "yazi"
      ]
    ]
  },
  "okyanus": {
    "id": "okyanus",
    "name": "Okyanus",
    "description": "Kıtaları birbirinden ayıran devasa tuzlu su okyanusu.",
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
        "deniz",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "orman": {
    "id": "orman",
    "name": "Orman",
    "description": "Sayısız ağaç ve canlının bir arada yaşadığı dev ekosistem.",
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
        "agac"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "pasta": {
    "id": "pasta",
    "name": "Pasta",
    "description": "Krema, meyve ve şekerle süslenmiş özel kutlama tatlısı.",
    "tier": 13,
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
        "seker",
        "un",
        "yumurta"
      ]
    ]
  },
  "peri": {
    "id": "peri",
    "name": "Peri",
    "description": "Kelebek kanatlarıyla doğayı koruyan minik ve sevimli büyü varlığı.",
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
        "buyu",
        "kelebek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "buyu",
        "cicek",
        "kelebek"
      ]
    ]
  },
  "platin": {
    "id": "platin",
    "name": "Platin",
    "description": "Aşırı dayanıklı, kararmayan nadir ve değerli beyaz maden.",
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
        "elmas",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "komur",
        "metal",
        "tas"
      ],
      [
        "ates",
        "elmas",
        "tas"
      ]
    ]
  },
  "portakal": {
    "id": "portakal",
    "name": "Portakal",
    "description": "Turunçgiller familyasından C vitamini deposu sulu kış meyvesi.",
    "tier": 7,
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
        "agac",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "prizma_tasi": {
    "id": "prizma_tasi",
    "name": "Prizma Taşı",
    "description": "Işığı büyülü şekilde büken ve yansıtan prizmatik kristal taş.",
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
        "kristal",
        "prizma"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "prizma",
        "su",
        "tas"
      ],
      [
        "cam",
        "isik",
        "kristal"
      ]
    ]
  },
  "ruh": {
    "id": "ruh",
    "name": "Ruh",
    "description": "Beden öldükten sonra yaşamaya devam eden saf bilinç özü.",
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
        "yasam"
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
  "safir": {
    "id": "safir",
    "name": "Safir",
    "description": "Göklerin ve denizlerin mavisini yansıtan değerli kristal taş.",
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
        "su",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "savas_baltasi": {
    "id": "savas_baltasi",
    "name": "Savaş Baltası",
    "description": "İki elle savrulan çift taraflı keskin çelik savaş baltası.",
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
        "balta",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "balta",
        "demir",
        "komur"
      ]
    ]
  },
  "simya": {
    "id": "simya",
    "name": "Simya",
    "description": "Değersiz metalleri altına, maddeleri ebediyete dönüştürme kadim sanatı.",
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
        "buyu",
        "kitap"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "su_comlegi": {
    "id": "su_comlegi",
    "name": "Su Çömleği",
    "description": "İçinde serin içme suyu saklanan sırlı toprak çömlek.",
    "tier": 10,
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
        "comlek",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "alet",
        "camur",
        "su"
      ]
    ]
  },
  "tabanca": {
    "id": "tabanca",
    "name": "Tabanca",
    "description": "Tek elle kullanılabilen kompakt barutlu ateşli silah.",
    "tier": 12,
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
        "tufek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "metal",
        "toprak",
        "tufek"
      ],
      [
        "demir",
        "odun",
        "top"
      ]
    ]
  },
  "tablo": {
    "id": "tablo",
    "name": "Tablo",
    "description": "Çerçevelenerek duvara asılmış değerli sanat eseri.",
    "tier": 13,
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
        "resim"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "agac",
        "resim",
        "tas"
      ],
      [
        "kumas",
        "murekkep",
        "odun"
      ]
    ]
  },
  "tanri": {
    "id": "tanri",
    "name": "Tanrı",
    "description": "Tüm kainatın ve varlığın yaratıcısı olan yüce ilahi kudret.",
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
        "evren",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "galaksi",
        "karadelik",
        "yasam"
      ],
      [
        "camur",
        "enerji",
        "evren"
      ]
    ]
  },
  "tavuk": {
    "id": "tavuk",
    "name": "Tavuk",
    "description": "Evcilleştirilmiş, yumurta veren kümes kuşu.",
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
        "bugday",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "testere": {
    "id": "testere",
    "name": "Testere",
    "description": "Tırtıklı dişleriyle ahşap ve metali biçen marangoz aleti.",
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
        "bicak",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "alet",
        "demir",
        "tas"
      ],
      [
        "bicak",
        "metal",
        "toprak"
      ]
    ]
  },
  "timsah": {
    "id": "timsah",
    "name": "Timsah",
    "description": "Nehir ve bataklıklarda pusu kuran güçlü çeneli dev sürüngen.",
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
        "kertenkele",
        "su"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": [
      [
        "kum",
        "kurbaga",
        "su"
      ]
    ]
  },
  "tiyatro": {
    "id": "tiyatro",
    "name": "Tiyatro",
    "description": "İnsan hikayelerinin canlı olarak sahnede sergilendiği dramatik sanat.",
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
        "i_nsan",
        "kumas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "tohum": {
    "id": "tohum",
    "name": "Tohum",
    "description": "İçinde yeni bir bitkinin potansiyelini taşıyan çekirdek.",
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
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "tuz": {
    "id": "tuz",
    "name": "Tuz",
    "description": "Tuzlu deniz suyunun buharlaşmasıyla geriye kalan beyaz mineral kristalleri.",
    "tier": 3,
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
        "ates",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "tuzlu_su": {
    "id": "tuzlu_su",
    "name": "Tuzlu Su",
    "description": "Tuz mineralleriyle doymuş doğal deniz suyu.",
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
        "su",
        "tuz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "tugla_duvar": {
    "id": "tugla_duvar",
    "name": "Tuğla Duvar",
    "description": "Tuğla ve harcın örülmesiyle dikilen sağlam ayırıcı yapı.",
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
        "tugla"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "cimento",
        "su",
        "tugla"
      ],
      [
        "ates",
        "camur",
        "harc"
      ]
    ]
  },
  "tufek": {
    "id": "tufek",
    "name": "Tüfek",
    "description": "Omuzdan ateşlenen menzilli barutlu piyade tüfeği.",
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
        "odun",
        "top"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "barut",
        "celik",
        "odun"
      ]
    ]
  },
  "turbin": {
    "id": "turbin",
    "name": "Türbin",
    "description": "Akışkanların geçişiyle dönerek elektrik üreten dev kanatlı çark.",
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
        "jenerator",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "buhar_motoru",
        "miknatis",
        "ruzgar"
      ]
    ]
  },
  "uzay_gemisi": {
    "id": "uzay_gemisi",
    "name": "Uzay Gemisi",
    "description": "İnsanları ve yükleri yıldızlararası boşlukta taşıyan yüksek teknolojili araç.",
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
        "bilgisayar",
        "roket"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "elektrik",
        "mikrocip",
        "roket"
      ],
      [
        "barut",
        "bilgisayar",
        "demir"
      ]
    ]
  },
  "vadi": {
    "id": "vadi",
    "name": "Vadi",
    "description": "Nehirlerin dağları aşındırarak açtığı yeşil boğaz.",
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
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "vida": {
    "id": "vida",
    "name": "Vida",
    "description": "Dönerek ahşaba veya metale kenetlenen yivli bağlantı elemanı.",
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
        "alet",
        "civi"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "civi",
        "odun",
        "tas"
      ],
      [
        "alet",
        "cekic",
        "demir"
      ]
    ]
  },
  "yakut": {
    "id": "yakut",
    "name": "Yakut",
    "description": "Ateşin kızıllığını içinde barındıran kıymetli korindon minerali.",
    "tier": 4,
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
        "ates",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yanardag": {
    "id": "yanardag",
    "name": "Yanardağ",
    "description": "Ateş ve lav püskürten aktif volkanik dağ.",
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
    "trioRecipes": []
  },
  "yapay_zeka": {
    "id": "yapay_zeka",
    "name": "Yapay Zeka",
    "description": "Öğrenme, analiz ve karar verme yetisine sahip ileri düzey yazılım zekası.",
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
        "bilgisayar",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "elektrik",
        "mikrocip",
        "yasam"
      ],
      [
        "bilgisayar",
        "camur",
        "enerji"
      ]
    ]
  },
  "yay": {
    "id": "yay",
    "name": "Yay",
    "description": "Esnek ahşap ve gergin kirişten oluşan menzilli fırlatıcı.",
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
        "i_p",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "yelkenli": {
    "id": "yelkenli",
    "name": "Yelkenli",
    "description": "Rüzgarı yelkenlerine doldurarak denizleri aşan tekne.",
    "tier": 13,
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
        "halat",
        "kumas",
        "odun"
      ]
    ]
  },
  "yesim": {
    "id": "yesim",
    "name": "Yeşim",
    "description": "Dinginliği simgeleyen pürüzsüz açık yeşil mineral taşı.",
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
        "su",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yosun": {
    "id": "yosun",
    "name": "Yosun",
    "description": "Nemli kayaların ve su kenarlarının üzerinde yayılan yeşil örtü.",
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
        "bitki",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "yunus": {
    "id": "yunus",
    "name": "Yunus",
    "description": "Zekası ve oyuncu hareketleriyle bilinen dost canlısı deniz memelisi.",
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
        "balina",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "yildirim": {
    "id": "yildirim",
    "name": "Yıldırım",
    "description": "Bulutların sürtünmesiyle gökyüzünden yere çakan dev elektrik arkı.",
    "tier": 4,
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
        "enerji",
        "firtina"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "electric",
    "trioRecipes": [
      [
        "ates",
        "firtina",
        "hava"
      ]
    ]
  },
  "yildirim_parsomeni": {
    "id": "yildirim_parsomeni",
    "name": "Yıldırım Parşömeni",
    "description": "Okunduğunda gökten dev şimşekler yağdıran büyülü rulo.",
    "tier": 13,
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
        "parsomen",
        "yildirim"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "electric",
    "trioRecipes": [
      [
        "deri",
        "yazi",
        "yildirim"
      ],
      [
        "enerji",
        "firtina",
        "parsomen"
      ]
    ]
  },
  "yildiz": {
    "id": "yildiz",
    "name": "Yıldız",
    "description": "Çekirdeğinde nükleer füzyon gerçekleşen dev akkor plazma küresi.",
    "tier": 7,
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
        "ates",
        "plazma"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "yildiz_tozu": {
    "id": "yildiz_tozu",
    "name": "Yıldız Tozu",
    "description": "Süpernova patlamalarından evrene yayılan kadim element tozu.",
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
        "hava",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "plazma"
      ]
    ]
  },
  "zehir": {
    "id": "zehir",
    "name": "Zehir",
    "description": "Canlıların bedenini felç eden veya yok eden ölümcül toksin.",
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
        "yilan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "zehir_sisesi": {
    "id": "zehir_sisesi",
    "name": "Zehir Şişesi",
    "description": "Üzerinde kurukafa işareti olan ölümcül zehir dolu cam şişe.",
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
        "sise",
        "zehir"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "cam",
        "zehir"
      ],
      [
        "sise",
        "su",
        "yilan"
      ]
    ]
  },
  "zehirli_kilic": {
    "id": "zehirli_kilic",
    "name": "Zehirli Kılıç",
    "description": "Düşmanları tek darbede zehirleyen yeşil parıltılı çelik kılıç.",
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
        "kilic",
        "zehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "cekic",
        "celik",
        "zehir"
      ],
      [
        "kilic",
        "su",
        "yilan"
      ]
    ]
  },
  "zeytin": {
    "id": "zeytin",
    "name": "Zeytin",
    "description": "Akdeniz ikliminde yetişen şifalı ve yağlı ağaç meyvesi.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "zombi": {
    "id": "zombi",
    "name": "Zombi",
    "description": "Büyüyle mezarından kaldırılmış bilinci olmayan yaşayan ölü.",
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
        "buyu",
        "i_nsan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "enerji",
        "i_nsan",
        "yasam"
      ]
    ]
  },
  "cicek": {
    "id": "cicek",
    "name": "Çiçek",
    "description": "Bitkilerin renkli ve mis kokulu üreme organı.",
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
        "bitki",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "orumcek": {
    "id": "orumcek",
    "name": "Örümcek",
    "description": "Sekiz bacaklı, avını yakalamak için usta ağlar ören canlı.",
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
        "hayvan",
        "i_plik"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "i_lluzyon_aynasi": {
    "id": "i_lluzyon_aynasi",
    "name": "İllüzyon Aynası",
    "description": "Bakan kişiye farklı yanılsamalar gösteren büyülü illüzyon aynası.",
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
        "ayna",
        "buyu"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "buyu",
        "cam",
        "gumus"
      ],
      [
        "ayna",
        "enerji",
        "yasam"
      ]
    ]
  },
  "i_nci": {
    "id": "i_nci",
    "name": "İnci",
    "description": "İstiridyenin içine kaçan kum tanesini kaplayarak oluşturduğu değerli inci.",
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
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "i_plik": {
    "id": "i_plik",
    "name": "İplik",
    "description": "Dokuma ve dikişte kullanılan ince eğrilmiş iplik.",
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
        "i_p",
        "i_p"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sehir": {
    "id": "sehir",
    "name": "Şehir",
    "description": "Geniş caddeleri, fabrikaları ve binalarıyla büyük medeniyet merkezi.",
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
        "kale",
        "kasaba"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "kasaba",
        "tas",
        "tugla_duvar"
      ],
      [
        "kale",
        "koy",
        "pazar"
      ]
    ]
  },
  "altin_sikke": {
    "id": "altin_sikke",
    "name": "Altın Sikke",
    "description": "Üzerinde hükümdar mührü taşıyan saf altın para.",
    "tier": 7,
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
        "isik",
        "metal",
        "para"
      ]
    ]
  },
  "asit_yagmuru": {
    "id": "asit_yagmuru",
    "name": "Asit Yağmuru",
    "description": "Havadaki kükürtlü gazların yağmur suyuyla birleşip asitleşmesi.",
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
        "duman",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "yagmur"
      ]
    ]
  },
  "ates_topu_kitabi": {
    "id": "ates_topu_kitabi",
    "name": "Ateş Topu Kitabı",
    "description": "Düşmanlara alev topu yağdırmayı öğreten simya büyü kitabı.",
    "tier": 13,
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
        "kitap"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flame",
    "trioRecipes": [
      [
        "ates",
        "kagit",
        "yazi"
      ]
    ]
  },
  "balik": {
    "id": "balik",
    "name": "Balık",
    "description": "Solungaçlarıyla suda nefes alıp yüzen pullu omurgalı canlı.",
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
        "su",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "balik_eti": {
    "id": "balik_eti",
    "name": "Balık Eti",
    "description": "Taze balığın temizlenip dilimlenmiş eti.",
    "tier": 10,
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
        "bicak",
        "su",
        "yasam"
      ],
      [
        "alet",
        "balik",
        "tas"
      ]
    ]
  },
  "baraj": {
    "id": "baraj",
    "name": "Baraj",
    "description": "Nehir sularını tutarak enerji üreten ve su depolayan dev set.",
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
        "beton",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "beton",
        "celik",
        "nehir"
      ]
    ]
  },
  "dukkan": {
    "id": "dukkan",
    "name": "Dükkan",
    "description": "Belirli ürünlerin satıldığı küçük ticarethane.",
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
        "pazar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "odun",
        "pazar",
        "tugla"
      ],
      [
        "ev",
        "i_nsan",
        "para"
      ]
    ]
  },
  "fotograf": {
    "id": "fotograf",
    "name": "Fotoğraf",
    "description": "Işıkla kağıda basılmış dondurulmuş an görüntüsü.",
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
        "cam",
        "kamera"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "isik",
        "kagit",
        "kamera"
      ]
    ]
  },
  "gozetleme_kulesi": {
    "id": "gozetleme_kulesi",
    "name": "Gözetleme Kulesi",
    "description": "Düşman hareketlerini erkenden fark etmek için kurulmuş yüksek gözetleme kulesi.",
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
        "fener",
        "kule"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "cam",
        "kule",
        "mum"
      ],
      [
        "fener",
        "kale",
        "tas"
      ]
    ]
  },
  "hortum": {
    "id": "hortum",
    "name": "Hortum",
    "description": "Dönen güçlü hava kolonunun yere uzanmasıyla oluşan hortum.",
    "tier": 4,
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
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "kaplan": {
    "id": "kaplan",
    "name": "Kaplan",
    "description": "Çizgili postu ve müthiş avlanma becerisiyle bilinen büyük kedi.",
    "tier": 8,
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
    "trioRecipes": []
  },
  "karadelik": {
    "id": "karadelik",
    "name": "Karadelik",
    "description": "Işığın dahi kaçamayacağı kadar güçlü bir yerçekimine sahip kozmik tekillik.",
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
        "gece",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "isik",
        "toprak",
        "yildiz"
      ],
      [
        "ates",
        "gece",
        "plazma"
      ]
    ]
  },
  "kaya": {
    "id": "kaya",
    "name": "Kaya",
    "description": "Yerkabuğunu oluşturan sert ve büyük taş kütlesi.",
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
    "trioRecipes": []
  },
  "kurt": {
    "id": "kurt",
    "name": "Kurt",
    "description": "Ay ışığında uluyan, sürü halinde organize avlanan vahşi avcı.",
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
        "hayvan",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kus": {
    "id": "kus",
    "name": "Kuş",
    "description": "Tüyleri ve kanatlarıyla göklerde süzülen omurgalı canlı.",
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
        "hava",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "korfez": {
    "id": "korfez",
    "name": "Körfez",
    "description": "Denizin karanın içine doğru sokulduğu korunaklı su girintisi.",
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
        "deniz",
        "yarimada"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "limon": {
    "id": "limon",
    "name": "Limon",
    "description": "Ekşi tadı ve ferahlatıcı kokusuyla yemeklere katılan sarı meyve.",
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
    "trioRecipes": []
  },
  "manyetizma": {
    "id": "manyetizma",
    "name": "Manyetizma",
    "description": "Elektrik akımlarının yarattığı manyetik çekim alanı.",
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
        "demir",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "elektrik",
        "metal",
        "toprak"
      ],
      [
        "demir",
        "enerji",
        "yildirim"
      ]
    ]
  },
  "matbaa": {
    "id": "matbaa",
    "name": "Matbaa",
    "description": "Kitapların binlerce nüsha halinde hızlıca basılmasını sağlayan devrim.",
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
        "disli",
        "yazi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "cark",
        "metal",
        "yazi"
      ],
      [
        "disli",
        "kagit",
        "kalem"
      ]
    ]
  },
  "muska": {
    "id": "muska",
    "name": "Muska",
    "description": "Kötülüklerden ve nazardan koruduğuna inanılan boyuna asılan koruyucu nesne.",
    "tier": 6,
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
        "buyu",
        "deri"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "deri",
        "enerji",
        "yasam"
      ],
      [
        "buyu",
        "hayvan",
        "tas"
      ]
    ]
  },
  "nebula": {
    "id": "nebula",
    "name": "Nebula",
    "description": "Yeni yıldızların doğduğu renkli ve ışıldayan dev kozmik gaz bulutu.",
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
        "bulut",
        "yildiz_tozu"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "buhar",
        "hava",
        "yildiz_tozu"
      ],
      [
        "bulut",
        "hava",
        "yildiz"
      ]
    ]
  },
  "obelisk": {
    "id": "obelisk",
    "name": "Obelisk",
    "description": "Güneş ışınlarını simgeleyen tek parça dikilitaş anıtı.",
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
        "anit",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "altin",
        "anit",
        "tas"
      ]
    ]
  },
  "palmiye": {
    "id": "palmiye",
    "name": "Palmiye",
    "description": "Tropik sahillerde ve vahada yetişen uzun gövdeli yapraklı ağaç.",
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
        "bitki",
        "kum",
        "toprak"
      ],
      [
        "agac",
        "hava",
        "toprak"
      ]
    ]
  },
  "pazar": {
    "id": "pazar",
    "name": "Pazar",
    "description": "Tüccarların ürünlerini sergileyip halka sattığı hareketli çarşı.",
    "tier": 7,
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
        "i_nsan",
        "para"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "dukkan",
        "i_nsan",
        "para"
      ]
    ]
  },
  "piramit": {
    "id": "piramit",
    "name": "Piramit",
    "description": "Firavunların ebedi istirahatgahı olan devasa geometrik anıt mezar.",
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
        "tapinak",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "plazma_tufegi": {
    "id": "plazma_tufegi",
    "name": "Plazma Tüfeği",
    "description": "Aşırı sıcak plazma enerjisi mermileri sıkan bilim kurgu silahı.",
    "tier": 12,
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
        "plazma",
        "tufek"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "flame",
    "trioRecipes": [
      [
        "ates",
        "elektrik",
        "tufek"
      ],
      [
        "odun",
        "plazma",
        "top"
      ]
    ]
  },
  "roket": {
    "id": "roket",
    "name": "Roket",
    "description": "Yakıtın arkadan püskürmesiyle yerçekimini yenip uzaya fırlayan araç.",
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
        "uzay"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "ruzgar": {
    "id": "ruzgar",
    "name": "Rüzgâr",
    "description": "Hava kütlelerinin basınç farkıyla hareket etmesiyle oluşan esinti.",
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
        "hava",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "solucan": {
    "id": "solucan",
    "name": "Solucan",
    "description": "Toprağın içinde yaşayan ve toprağı havalandıran omurgasız canlı.",
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
    "trioRecipes": []
  },
  "tayfun": {
    "id": "tayfun",
    "name": "Tayfun",
    "description": "Okyanuslarda büyük dalgalar ve yıkım yaratan şiddetli fırtına.",
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
        "kasirga",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": [
      [
        "hortum",
        "ruzgar",
        "su"
      ]
    ]
  },
  "tundra": {
    "id": "tundra",
    "name": "Tundra",
    "description": "Kutup kuşağında donmuş topraklar ve likenlerle kaplı soğuk ova.",
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
        "buzul",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "buz",
        "kar",
        "toprak"
      ]
    ]
  },
  "yasam": {
    "id": "yasam",
    "name": "Yaşam",
    "description": "Çamurun şimşek enerjisiyle buluşmasından doğan ilk yaşam kıvılcımı.",
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
        "enerji",
        "su",
        "toprak"
      ],
      [
        "ates",
        "camur",
        "hava"
      ]
    ]
  },
  "yilan": {
    "id": "yilan",
    "name": "Yılan",
    "description": "Ayaksız, yerde kıvrılarak sürünen zehirli ve avcı canlı.",
    "tier": 5,
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
        "solucan",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "yildiz_gecidi_cekirdegi": {
    "id": "yildiz_gecidi_cekirdegi",
    "name": "Yıldız Geçidi Çekirdeği",
    "description": "Yıldız geçidini sonsuz enerjiyle besleyen reaktör çekirdeği.",
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
        "boyut_kapisi",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "enerji",
        "evren",
        "portal_runu"
      ],
      [
        "ates",
        "boyut_kapisi",
        "hava"
      ]
    ]
  },
  "zaman": {
    "id": "zaman",
    "name": "Zaman",
    "description": "Olayların geçmişten geleceğe aktığı dördüncü boyut akışı.",
    "tier": 11,
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
        "evren",
        "kum_saati"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "galaksi",
        "karadelik",
        "kum_saati"
      ],
      [
        "cam",
        "evren",
        "kum"
      ]
    ]
  },
  "zeytinyagi": {
    "id": "zeytinyagi",
    "name": "Zeytinyağı",
    "description": "Zeytinlerin taş baskıda sıkılmasıyla elde edilen altın sıvı.",
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
        "tas",
        "zeytin"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "agac",
        "tas",
        "toprak"
      ]
    ]
  },
  "cilek": {
    "id": "cilek",
    "name": "Çilek",
    "description": "Kırmızı rengi ve mis kokusuyla sevilen lezzetli orman meyvesi.",
    "tier": 7,
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
        "seker",
        "su",
        "tohum"
      ]
    ]
  },
  "i_mparatorluk": {
    "id": "i_mparatorluk",
    "name": "İmparatorluk",
    "description": "Birçok milleti ve kıtayı tek çatı altında toplayan dev imparatorluk.",
    "tier": 13,
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
        "kale",
        "krallik"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "krallik",
        "tas",
        "tugla_duvar"
      ],
      [
        "kale",
        "saray",
        "sehir"
      ]
    ]
  },
  "altar": {
    "id": "altar",
    "name": "Altar",
    "description": "Tapınakların kalbinde adakların sunulduğu kutsal kurban masası.",
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
        "buyu",
        "tapinak"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "buyu",
        "mermer",
        "tapinak"
      ]
    ]
  },
  "altin": {
    "id": "altin",
    "name": "Altın",
    "description": "Güneş gibi parlayan, paslanmaz en kıymetli sarı metal.",
    "tier": 5,
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
        "isik",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "metal"
      ],
      [
        "ates",
        "isik",
        "tas"
      ]
    ]
  },
  "ayna": {
    "id": "ayna",
    "name": "Ayna",
    "description": "Camın arkasına gümüş kaplanarak görüntü yansıtması sağlanan eşya.",
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
        "cam",
        "gumus"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "gumus",
        "kum"
      ],
      [
        "cam",
        "isik",
        "metal"
      ]
    ]
  },
  "barometre": {
    "id": "barometre",
    "name": "Barometre",
    "description": "Hava basıncını ölçerek hava durumunu tahmin eden gösterge.",
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
        "hava"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "buhar_motoru": {
    "id": "buhar_motoru",
    "name": "Buhar Motoru",
    "description": "Buharın basıncını mekanik piston hareketine dönüştüren motor.",
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
        "buhar",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "gas",
    "trioRecipes": [
      [
        "buhar",
        "metal",
        "toprak"
      ]
    ]
  },
  "buharli_gemi": {
    "id": "buharli_gemi",
    "name": "Buharlı Gemi",
    "description": "Buhar çarklarıyla dalgaları yaran okyanus gemisi.",
    "tier": 14,
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
        "buhar_motoru",
        "yelkenli"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": [
      [
        "buhar",
        "demir",
        "yelkenli"
      ],
      [
        "buhar_motoru",
        "odun",
        "yelken"
      ]
    ]
  },
  "demir": {
    "id": "demir",
    "name": "Demir",
    "description": "Yer kabuğundan çıkarılan en sağlam ve işlenebilir temel metal.",
    "tier": 5,
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
    "trioRecipes": []
  },
  "demir_parmaklik": {
    "id": "demir_parmaklik",
    "name": "Demir Parmaklık",
    "description": "Güvenlik veya hapis amacıyla döşenmiş demir çubuk kafes.",
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
        "civi",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "demir_zirh": {
    "id": "demir_zirh",
    "name": "Demir Zırh",
    "description": "Şövalyeleri koruyan dövme demirden gövde zırhı.",
    "tier": 7,
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
        "demir_kulce",
        "zirh"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "demir",
        "zirh"
      ],
      [
        "demir_kulce",
        "deri",
        "metal"
      ]
    ]
  },
  "denizalti": {
    "id": "denizalti",
    "name": "Denizaltı",
    "description": "Su altında kilometrelerce derinlikte görünmeden ilerleyen çelik gemi.",
    "tier": 14,
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
        "metal",
        "yelkenli"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "ekmek": {
    "id": "ekmek",
    "name": "Ekmek",
    "description": "Yoğrulmuş hamurun fırında nar gibi pişirilmiş temel hali.",
    "tier": 13,
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
        "ates",
        "hamur"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "su",
        "un"
      ],
      [
        "maya",
        "su",
        "un"
      ]
    ]
  },
  "galaksi": {
    "id": "galaksi",
    "name": "Galaksi",
    "description": "Milyarlarca yıldız ve gezegen sisteminin döndüğü dev kozmik ada.",
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
        "karadelik",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "karadelik",
        "plazma"
      ]
    ]
  },
  "gece": {
    "id": "gece",
    "name": "Gece",
    "description": "Güneşin ufkun ardına geçmesiyle yeryüzünü saran karanlık örtü.",
    "tier": 3,
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "gumus": {
    "id": "gumus",
    "name": "Gümüş",
    "description": "Ay ışığı kadar berrak ve saf beyaz değerli maden.",
    "tier": 5,
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
    "trioRecipes": []
  },
  "gunes": {
    "id": "gunes",
    "name": "Güneş",
    "description": "Gündüzleri dünyamızı aydınlatan ve yaşam veren ana yıldızımız.",
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
        "isik",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flame",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "yildiz"
      ],
      [
        "ates",
        "isik",
        "plazma"
      ]
    ]
  },
  "gunes_saati": {
    "id": "gunes_saati",
    "name": "Güneş Saati",
    "description": "Güneşin konumuyla gölgenin hareketini izleyerek zamanı gösteren düzenek.",
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
        "golge",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flame",
    "trioRecipes": [
      [
        "i_nsan",
        "isik",
        "tas"
      ]
    ]
  },
  "isik": {
    "id": "isik",
    "name": "Işık",
    "description": "Ateşin karanlığı yaran parlak aydınlığı.",
    "tier": 2,
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
        "ates",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "kamera": {
    "id": "kamera",
    "name": "Kamera",
    "description": "Işığı yakalayarak anları ve hareketli görüntüleri kaydeden cihaz.",
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
        "cam",
        "mercek"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "ates",
        "kum",
        "mercek"
      ]
    ]
  },
  "kaplumbaga": {
    "id": "kaplumbaga",
    "name": "Kaplumbağa",
    "description": "Sert bir kabuk taşıyan yavaş ve uzun ömürlü sürüngen.",
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
        "kertenkele",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "kum",
        "kurbaga",
        "tas"
      ]
    ]
  },
  "kurt_adam": {
    "id": "kurt_adam",
    "name": "Kurt Adam",
    "description": "Dolunay çıktığında vahşi bir kurda dönüşen lanetli insan.",
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
        "ay",
        "kurt"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kopek": {
    "id": "kopek",
    "name": "Köpek",
    "description": "İnsanın en sadık dostu haline gelmiş evcil ve koruyucu hayvan.",
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
        "i_nsan",
        "kurt"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kopekbaligi": {
    "id": "kopekbaligi",
    "name": "Köpekbalığı",
    "description": "Keskin dişleri ve koku alma yetisiyle okyanusların tepe avcısı.",
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
        "et"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": [
      [
        "deniz",
        "su",
        "yasam"
      ]
    ]
  },
  "metropol": {
    "id": "metropol",
    "name": "Metropol",
    "description": "Milyonlarca insanın yaşadığı küresel çapta devasa mega kent.",
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
        "sehir",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "meyve_bahcesi": {
    "id": "meyve_bahcesi",
    "name": "Meyve Bahçesi",
    "description": "Elma, armut ve meyve ağaçlarının özenle yetiştirildiği bahçe.",
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
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": [
      [
        "bitki",
        "cicek",
        "toprak"
      ]
    ]
  },
  "meyve_suyu": {
    "id": "meyve_suyu",
    "name": "Meyve Suyu",
    "description": "Taze sıkılmış meyvelerin leziz ve vitaminli içeceği.",
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
        "elma",
        "su"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "agac",
        "cicek",
        "su"
      ]
    ]
  },
  "ruzgar_gulu": {
    "id": "ruzgar_gulu",
    "name": "Rüzgar Gülü",
    "description": "Rüzgarın yönünü ve şiddetini gösteren fırıldak çarkı.",
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
        "cark",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": [
      [
        "cark",
        "odun",
        "ruzgar"
      ]
    ]
  },
  "saat": {
    "id": "saat",
    "name": "Saat",
    "description": "Zamanın akışını hassas şekilde ölçen mekanik çarklı aygıt.",
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
        "disli",
        "kum"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "cark",
        "kum",
        "metal"
      ],
      [
        "disli",
        "hava",
        "toprak"
      ]
    ]
  },
  "su_degirmeni": {
    "id": "su_degirmeni",
    "name": "Su Değirmeni",
    "description": "Akan suyun gücüyle dönerek un öğüten su çarkı.",
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
        "cark",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": [
      [
        "cark",
        "odun",
        "su"
      ]
    ]
  },
  "yagmur": {
    "id": "yagmur",
    "name": "Yağmur",
    "description": "Havadaki nemin yoğunlaşıp yeryüzüne damlalar halinde düşmesi.",
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
        "hava",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "zaman_kum_saati": {
    "id": "zaman_kum_saati",
    "name": "Zaman Kum Saati",
    "description": "İçindeki tanelerle zamanı bükebilen büyülü kum saati.",
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
  "zirhli_gemi": {
    "id": "zirhli_gemi",
    "name": "Zırhlı Gemi",
    "description": "Gövdesi kalın çelik levhalarla kaplı ağır savaş zırhlısı.",
    "tier": 14,
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
        "celik",
        "yelkenli"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "demir",
        "komur",
        "yelkenli"
      ],
      [
        "celik",
        "odun",
        "yelken"
      ]
    ]
  },
  "celik_kulce": {
    "id": "celik_kulce",
    "name": "Çelik Külçe",
    "description": "Dövülerek kalıplanmış sağlam çelik blok.",
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
        "ates",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "demir",
        "komur"
      ]
    ]
  },
  "i_pekbocegi": {
    "id": "i_pekbocegi",
    "name": "İpekböceği",
    "description": "Dut yapraklarıyla beslenip değerli ipek kozası ören tırtıl.",
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
        "yaprak",
        "yasam"
      ],
      [
        "agac",
        "isik",
        "solucan"
      ]
    ]
  },
  "i_cten_yanmali_motor": {
    "id": "i_cten_yanmali_motor",
    "name": "İçten Yanmalı Motor",
    "description": "Yakıtın silindir içinde patlamasıyla güç üreten motor.",
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
        "ates",
        "buhar_motoru"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "ates",
        "buhar",
        "demir"
      ]
    ]
  },
  "seytan": {
    "id": "seytan",
    "name": "Şeytan",
    "description": "Kibri yüzünden lanetlenmiş, insanları yoldan çıkaran karanlık güç.",
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
        "cin",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "cin",
        "isik",
        "toprak"
      ]
    ]
  },
  "araba": {
    "id": "araba",
    "name": "Araba",
    "description": "Atların çektiği veya motorla çalışan tekerlekli kara taşıtı.",
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
        "at",
        "tekerlek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "aurora": {
    "id": "aurora",
    "name": "Aurora",
    "description": "Güneş rüzgarlarının atmosferle buluşmasıyla parlayan kutup ışıkları.",
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
        "hava",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "balina": {
    "id": "balina",
    "name": "Balina",
    "description": "Okyanuslarda yüzen dünyanın en büyük memeli dev canlısı.",
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
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "bomba": {
    "id": "bomba",
    "name": "Bomba",
    "description": "Fitili ateşlendiğinde infilak eden yıkıcı patlayıcı aygıt.",
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
        "demir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "cehennem_tasi": {
    "id": "cehennem_tasi",
    "name": "Cehennem Taşı",
    "description": "Yeraltının lav ateşini içinde hapseden korlaşmış cehennem taşı.",
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
        "lav",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "darphane": {
    "id": "darphane",
    "name": "Darphane",
    "description": "Devlet adına resmi altın ve madeni paraların basıldığı atölye.",
    "tier": 7,
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
        "ates",
        "para",
        "tas"
      ],
      [
        "altin",
        "demir",
        "metal"
      ]
    ]
  },
  "deprem": {
    "id": "deprem",
    "name": "Deprem",
    "description": "Yer kabuğundaki fayların kırılmasıyla oluşan tektonik sarsıntı.",
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
        "enerji",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "dondurma": {
    "id": "dondurma",
    "name": "Dondurma",
    "description": "Süt ve meyvelerin dondurularak çırpılmasıyla yapılan serin tatlı.",
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
        "buz",
        "sut"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "buz",
        "seker",
        "sut"
      ]
    ]
  },
  "kanyon": {
    "id": "kanyon",
    "name": "Kanyon",
    "description": "Sert kayaların akarsularca derin biçimde yarılmasıyla oluşan vadi.",
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
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "dag",
        "nehir",
        "ruzgar"
      ]
    ]
  },
  "krallik": {
    "id": "krallik",
    "name": "Krallık",
    "description": "Bir hükümdarın egemenliği altında yönetilen geniş topraklar.",
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
        "saray",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "altin",
        "mermer",
        "sehir"
      ],
      [
        "kale",
        "kasaba",
        "saray"
      ]
    ]
  },
  "kok": {
    "id": "kok",
    "name": "Kök",
    "description": "Bitkiyi toprağa bağlayan ve besin toplayan yeraltı kökleri.",
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
        "bitki",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "kopru": {
    "id": "kopru",
    "name": "Köprü",
    "description": "İki yakayı birbirine bağlayarak geçit veren kemerli köprü.",
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
        "nehir",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "celik",
        "halat",
        "tas"
      ],
      [
        "harc",
        "odun",
        "tas"
      ]
    ]
  },
  "mercek": {
    "id": "mercek",
    "name": "Mercek",
    "description": "Işığı kırarak nesneleri büyüten veya odaklayan kavisli optik cam.",
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
        "alet",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "cam",
        "odun",
        "tas"
      ],
      [
        "alet",
        "ates",
        "kum"
      ]
    ]
  },
  "misir": {
    "id": "misir",
    "name": "Mısır",
    "description": "Koçanları üzerinde altın sarısı taneleri olan verimli tahıl.",
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
        "bitki",
        "isik",
        "tohum"
      ],
      [
        "ates",
        "bugday",
        "hava"
      ]
    ]
  },
  "otomobil": {
    "id": "otomobil",
    "name": "Otomobil",
    "description": "Dört tekerlekli motorlu modern kişisel yolcu taşıtı.",
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
        "araba",
        "i_cten_yanmali_motor"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "at",
        "i_cten_yanmali_motor",
        "tekerlek"
      ],
      [
        "araba",
        "ates",
        "buhar_motoru"
      ]
    ]
  },
  "peynir": {
    "id": "peynir",
    "name": "Peynir",
    "description": "Sütün mayalanıp süzülmesiyle elde edilen lezzetli gıda.",
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
        "bakteri",
        "sut"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "bakteri",
        "sut",
        "tuz"
      ],
      [
        "maya",
        "sut",
        "tuz"
      ]
    ]
  },
  "portal_runu": {
    "id": "portal_runu",
    "name": "Portal Rünü",
    "description": "Mekanlar arası anlık geçit açan büyülü portal rünü.",
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
        "buyu",
        "run"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "enerji",
        "run",
        "yasam"
      ]
    ]
  },
  "sogan": {
    "id": "sogan",
    "name": "Soğan",
    "description": "Kat kat zarlarıyla doğranırken göz yaşartan lezzet kaynağı sebze.",
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
        "kok",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "tapinak": {
    "id": "tapinak",
    "name": "Tapınak",
    "description": "İbadet etmek ve tanrılara adak adamak için inşa edilen kutsal yapı.",
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
        "saray",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "altin",
        "mermer",
        "tas"
      ]
    ]
  },
  "zehirli_sivi": {
    "id": "zehirli_sivi",
    "name": "Zehirli Sıvı",
    "description": "Zehirli özlerin suyla karıştırılmış tehlikeli şişesi.",
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
        "su",
        "zehir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "celik": {
    "id": "celik",
    "name": "Çelik",
    "description": "Demirin karbon ve kömürle dövülerek güçlendirilmiş dayanıklı hali.",
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
        "demir",
        "komur"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "demir",
        "komur"
      ]
    ]
  },
  "olumsuzluk_i_ksiri": {
    "id": "olumsuzluk_i_ksiri",
    "name": "Ölümsüzlük İksiri",
    "description": "İçene ebedi gençlik ve sonsuz ömür sunan iksirlerin iksiri.",
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
        "felsefe_tasi",
        "i_ksir"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "altin",
        "elmas",
        "i_ksir"
      ],
      [
        "buyu",
        "felsefe_tasi",
        "su"
      ]
    ]
  },
  "i_pek": {
    "id": "i_pek",
    "name": "İpek",
    "description": "İpekböceğinin ördüğü eşsiz parlaklıkta ve incelikte lüks kumaş lifi.",
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
        "i_pekbocegi",
        "i_plik"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "i_plik",
        "solucan",
        "yaprak"
      ]
    ]
  },
  "seker": {
    "id": "seker",
    "name": "Şeker",
    "description": "Şeker kamışı veya pancarından kaynatılarak kristalleştirilen tatlandırıcı.",
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
        "ates",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "cam": {
    "id": "cam",
    "name": "Cam",
    "description": "Kumun yüksek sıcaklıkta eritilerek şeffaflaştırılması.",
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
        "ates",
        "kum"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "demiryolu": {
    "id": "demiryolu",
    "name": "Demiryolu",
    "description": "Trenlerin üzerinde hızla kayarak ilerlediği paralel çelik ray hattı.",
    "tier": 6,
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
        "demir",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "el_arabasi": {
    "id": "el_arabasi",
    "name": "El Arabası",
    "description": "Yükleri taşımak için tek tekerlekli insan gücüyle çalışan araç.",
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
        "tekerlek"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "agac",
        "tas",
        "tekerlek"
      ]
    ]
  },
  "elektrik_motoru": {
    "id": "elektrik_motoru",
    "name": "Elektrik Motoru",
    "description": "Elektrik enerjisini kesintisiz dönme hareketine çeviren motor.",
    "tier": 8,
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
        "elektrik",
        "miknatis"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "electric",
    "trioRecipes": [
      [
        "enerji",
        "miknatis",
        "yildirim"
      ],
      [
        "demir",
        "elektrik",
        "manyetizma"
      ]
    ]
  },
  "mercan": {
    "id": "mercan",
    "name": "Mercan",
    "description": "Sıcak deniz diplerinde kireçli iskeletler oluşturan renkli deniz canlısı.",
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
        "camur",
        "enerji",
        "tas"
      ]
    ]
  },
  "mermer": {
    "id": "mermer",
    "name": "Mermer",
    "description": "Yüksek ısı ve basınç altında başkalaşmış damarlı pürüzsüz taş.",
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
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "metal": {
    "id": "metal",
    "name": "Metal",
    "description": "Kayaçların eritilmesiyle içindeki metalik cevherin saflaştırılması.",
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
        "ates",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "motosiklet": {
    "id": "motosiklet",
    "name": "Motosiklet",
    "description": "İki tekerlekli ve motor gücüyle çalışan hızlı kara taşıtı.",
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
        "bisiklet",
        "i_cten_yanmali_motor"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "demir",
        "i_cten_yanmali_motor",
        "tekerlek"
      ],
      [
        "ates",
        "bisiklet",
        "buhar_motoru"
      ]
    ]
  },
  "tren": {
    "id": "tren",
    "name": "Tren",
    "description": "Raylar üzerinde birbirine bağlı vagonları çeken katar.",
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
        "lokomotif"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "lokomotif",
        "metal",
        "toprak"
      ],
      [
        "buhar_motoru",
        "demir",
        "tekerlek"
      ]
    ]
  },
  "maya": {
    "id": "maya",
    "name": "Maya",
    "description": "Hamuru kabartan ve fermantasyonu başlatan canlı kültür.",
    "tier": 13,
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
        "hamur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "hamur",
        "su",
        "yasam"
      ],
      [
        "bakteri",
        "su",
        "un"
      ]
    ]
  },
  "meteor": {
    "id": "meteor",
    "name": "Meteor",
    "description": "Dünya atmosferine girip sürtünmeyle alev alan kayan yıldız taşı.",
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
        "hava",
        "tas",
        "yildiz"
      ]
    ]
  },
  "tsunami": {
    "id": "tsunami",
    "name": "Tsunami",
    "description": "Deniz tabanındaki depremle tetiklenen devasa okyanus dalgası.",
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
        "deprem",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "ucak": {
    "id": "ucak",
    "name": "Uçak",
    "description": "Sabit kanatları ve güçlü motorlarıyla bulutları yaran hızlı hava taşıtı.",
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
        "buhar_motoru",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "elektrik": {
    "id": "elektrik",
    "name": "Elektrik",
    "description": "Yıldırım ve enerjinin kontrol edilebilir akım hali.",
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
        "enerji",
        "yildirim"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "electric",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "yildirim"
      ]
    ]
  },
  "metal_bicak": {
    "id": "metal_bicak",
    "name": "Metal Bıçak",
    "description": "Demirden dövülmüş son derece keskin metal bıçak.",
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
        "alet",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "demir",
        "odun",
        "tas"
      ],
      [
        "alet",
        "metal",
        "toprak"
      ]
    ]
  },
  "vampir": {
    "id": "vampir",
    "name": "Vampir",
    "description": "Geceleri kanla beslenen, güneş ışığına çıkamayan ölümsüz varlık.",
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
        "gece",
        "i_nsan"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "i_nsan",
        "isik",
        "toprak"
      ]
    ]
  },
  "bicak": {
    "id": "bicak",
    "name": "Bıçak",
    "description": "Kesme ve dilimleme işlemlerinde kullanılan keskin bıçak.",
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
        "alet",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "enerji": {
    "id": "enerji",
    "name": "Enerji",
    "description": "Ateş ve havanın dinamik etkileşiminden doğan saf güç.",
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
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "electric",
    "trioRecipes": []
  },
  "obsidyen_bicak": {
    "id": "obsidyen_bicak",
    "name": "Obsidyen Bıçak",
    "description": "Volkanik obsidyen camından yapılmış jilet kadar keskin bıçak.",
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
        "agac",
        "obsidyen",
        "tas"
      ]
    ]
  },
  "i_lkel_bicak": {
    "id": "i_lkel_bicak",
    "name": "İlkel Bıçak",
    "description": "Yontulmuş çakmaktaşından yapılan ilk kesici alet.",
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
        "cakmaktasi",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "ahsap_kalkan": {
    "id": "ahsap_kalkan",
    "name": "Ahşap Kalkan",
    "description": "Hafif ve çevik ahşaptan yapılmış siperlik.",
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
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "deri",
        "odun",
        "demir"
      ]
    ]
  },
  "alkol": {
    "id": "alkol",
    "name": "Alkol",
    "description": "Şekerli meyvelerin fermantasyonuyla oluşan sarhoş edici sıvı.",
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
        "bakteri",
        "seker"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "seker",
        "su",
        "yasam"
      ],
      [
        "ates",
        "bakteri",
        "bitki"
      ]
    ]
  },
  "badem": {
    "id": "badem",
    "name": "Badem",
    "description": "İlkbaharda çiçek açan ağacın lezzetli ve şifalı sert çekirdeği.",
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
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "borsa": {
    "id": "borsa",
    "name": "Borsa",
    "description": "Hisse senetlerinin ve kıymetli madenlerin alınıp satıldığı finans piyasası.",
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
  "elmas": {
    "id": "elmas",
    "name": "Elmas",
    "description": "Kömürün aşırı yer altı basıncı altında kristalleşmiş en sert cevheri.",
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
    "trioRecipes": []
  },
  "harita": {
    "id": "harita",
    "name": "Harita",
    "description": "Yeryüzü şekillerini ve sınırları gösteren coğrafi çizim.",
    "tier": 9,
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
        "odun",
        "pusula",
        "su"
      ],
      [
        "cam",
        "demir",
        "kagit"
      ]
    ]
  },
  "kamyon": {
    "id": "kamyon",
    "name": "Kamyon",
    "description": "Ağır yükleri ve ticari malları şehirlerarası taşıyan büyük taşıt.",
    "tier": 12,
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
        "otomobil"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "metal",
        "otomobil",
        "toprak"
      ],
      [
        "araba",
        "demir",
        "i_cten_yanmali_motor"
      ]
    ]
  },
  "karinca": {
    "id": "karinca",
    "name": "Karınca",
    "description": "Topluluk halinde yaşayan çalışkan ve güçlü minik canlı.",
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
        "hayvan",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kurabiye": {
    "id": "kurabiye",
    "name": "Kurabiye",
    "description": "Fırında gevrek pişirilmiş tereyağlı ve lezzetli atıştırmalık.",
    "tier": 12,
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
        "tereyagi",
        "un"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "alet",
        "sut",
        "un"
      ],
      [
        "bugday",
        "degirmen",
        "tereyagi"
      ]
    ]
  },
  "kutuphane": {
    "id": "kutuphane",
    "name": "Kütüphane",
    "description": "Binlerce cilt kitabın korunduğu sessiz bilgi mabedi.",
    "tier": 13,
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
    "trioRecipes": []
  },
  "pusula": {
    "id": "pusula",
    "name": "Pusula",
    "description": "Manyetik iğnesiyle kuzeyi göstererek yol bulmayı sağlayan alet.",
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
        "i_gne",
        "miknatis"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "cam",
        "i_gne",
        "miknatis"
      ]
    ]
  },
  "somon": {
    "id": "somon",
    "name": "Somon",
    "description": "Akıntıya karşı yüzerek nehirlerde üreyen pembe etli lezzetli balık.",
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
        "balik",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "nehir",
        "su",
        "yasam"
      ],
      [
        "balik",
        "dag",
        "gol"
      ]
    ]
  },
  "teleskop": {
    "id": "teleskop",
    "name": "Teleskop",
    "description": "Uzak yıldızları ve gezegenleri yakından incelemeyi sağlayan gök dürbünü.",
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
        "mercek",
        "uzay"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "top": {
    "id": "top",
    "name": "Top",
    "description": "Barut patlamasıyla demir gülleler fırlatan ağır savaş topu.",
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
        "barut",
        "kursun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "ates",
        "barut",
        "demir"
      ]
    ]
  },
  "zeplin": {
    "id": "zeplin",
    "name": "Zeplin",
    "description": "Gazla dolu dev gövdesi ve pervaneleriyle uçan güdümlü hava gemisi.",
    "tier": 13,
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
        "i_cten_yanmali_motor",
        "sicak_hava_balonu"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "ates",
        "buhar_motoru",
        "sicak_hava_balonu"
      ],
      [
        "ates",
        "i_cten_yanmali_motor",
        "kumas"
      ]
    ]
  },
  "sarap": {
    "id": "sarap",
    "name": "Şarap",
    "description": "Ezilmiş üzüm suyunun fıçılarda fermente edilmesiyle yapılan içki.",
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
        "maya",
        "uzum"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "bambu": {
    "id": "bambu",
    "name": "Bambu",
    "description": "Hafif, esnek ve son derece hızlı uzayan sert gövdeli kamış.",
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
        "cimen"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "elma": {
    "id": "elma",
    "name": "Elma",
    "description": "Ağaç dallarından sarkan sulu, tatlı ve kırmızı meyve.",
    "tier": 7,
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
        "agac",
        "elma"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "cikolata": {
    "id": "cikolata",
    "name": "Çikolata",
    "description": "Kakao ve sütün şekerle işlenmesiyle yapılan nefis tatlı.",
    "tier": 9,
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
        "seker",
        "sut"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "ates",
        "bitki",
        "sut"
      ],
      [
        "cimen",
        "i_nek",
        "seker"
      ]
    ]
  },
  "agac_kabugu": {
    "id": "agac_kabugu",
    "name": "Ağaç Kabuğu",
    "description": "Ağacın gövdesini dış etkenlerden koruyan sert dış katman.",
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
    "trioRecipes": []
  },
  "golem": {
    "id": "golem",
    "name": "Golem",
    "description": "Çamur veya taştan yapılıp büyüyle canlandırılmış dev yapay muhafız.",
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
        "buyu",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "buyu",
        "tas",
        "yasam"
      ]
    ]
  },
  "karli_cam_agaci": {
    "id": "karli_cam_agaci",
    "name": "Karlı Çam Ağacı",
    "description": "Dalları bembeyaz karlarla kaplanmış kış çam ağacı.",
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
        "bitki",
        "kar",
        "toprak"
      ],
      [
        "agac",
        "bulut",
        "buz"
      ]
    ]
  },
  "agac": {
    "id": "agac",
    "name": "Ağaç",
    "description": "Gövdesi odunlaşarak yıllar içinde göğe yükselen ulu bitki.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "anahtar": {
    "id": "anahtar",
    "name": "Anahtar",
    "description": "Kilitli mekanizmaları açmak için özel dişli metal parça.",
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
        "alet",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "asteroit": {
    "id": "asteroit",
    "name": "Asteroit",
    "description": "Uzay boşluğunda serbestçe sürüklenen devasa kaya parçası.",
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
        "tas",
        "yildiz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "plazma",
        "tas"
      ]
    ]
  },
  "dinamolu_fener": {
    "id": "dinamolu_fener",
    "name": "Dinamolu Fener",
    "description": "Elde çevrilen dinamo mekanizmasıyla pil olmadan ışık veren fener.",
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
        "disli",
        "fener"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "cark",
        "fener",
        "metal"
      ],
      [
        "cam",
        "disli",
        "mum"
      ]
    ]
  },
  "dinozor": {
    "id": "dinozor",
    "name": "Dinozor",
    "description": "Milyonlarca yıl önce yeryüzüne hükmetmiş dev kadim sürüngen.",
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
        "fosil",
        "kertenkele"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": [
      [
        "kemik",
        "kertenkele",
        "tas"
      ],
      [
        "fosil",
        "kum",
        "kurbaga"
      ]
    ]
  },
  "disli": {
    "id": "disli",
    "name": "Dişli",
    "description": "Makinelerde gücü aktaran hassas kesilmiş metal dişli.",
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
        "cark",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "alet",
        "metal",
        "odun"
      ],
      [
        "ates",
        "cark",
        "tas"
      ]
    ]
  },
  "duman": {
    "id": "duman",
    "name": "Duman",
    "description": "Ateşin yanma sonucu havaya bıraktığı gaz ve is.",
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
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "gunes_paneli": {
    "id": "gunes_paneli",
    "name": "Güneş Paneli",
    "description": "Güneş ışığını doğrudan temiz elektrik akımına çeviren fotovoltaik panel.",
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
        "elektrik",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "kayip_sehir": {
    "id": "kayip_sehir",
    "name": "Kayıp Şehir",
    "description": "Zamanın ve bitki örtüsünün yuttuğu kadim harabe uygarlık.",
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
        "orman",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "kale",
        "kasaba",
        "orman"
      ]
    ]
  },
  "muzik": {
    "id": "muzik",
    "name": "Müzik",
    "description": "Seslerin uyumuyla ruhu besleyen evrensel sanat dalı.",
    "tier": 9,
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
        "davul",
        "flut"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "alet",
        "davul",
        "flut"
      ]
    ]
  },
  "radyasyon": {
    "id": "radyasyon",
    "name": "Radyasyon",
    "description": "Kararsız atom çekirdeklerinden yayılan yüksek enerjili parçacıklar.",
    "tier": 6,
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
        "enerji",
        "uranyum"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "uranyum"
      ]
    ]
  },
  "saray": {
    "id": "saray",
    "name": "Saray",
    "description": "Kralların ve hükümdarların yaşadığı sütunlu görkemli anıtsal yapı.",
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
        "altin",
        "mermer"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "trioRecipes": [
      [
        "isik",
        "mermer",
        "metal"
      ],
      [
        "altin",
        "kirec",
        "tas"
      ]
    ]
  },
  "siber_kristal": {
    "id": "siber_kristal",
    "name": "Siber Kristal",
    "description": "Kuantum verilerini ışık hızında depolayan siber optik kristal.",
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
        "kristal",
        "mikrocip"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "mikrocip",
        "su",
        "tas"
      ],
      [
        "elektrik",
        "kristal",
        "kum"
      ]
    ]
  },
  "sirke": {
    "id": "sirke",
    "name": "Sirke",
    "description": "Alkolün asetik asit bakterileriyle ekşitilmiş doğal koruyucu hali.",
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
        "hava",
        "sarap"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "bakteri",
        "hava",
        "uzum"
      ]
    ]
  },
  "televizyon": {
    "id": "televizyon",
    "name": "Televizyon",
    "description": "Görüntü ve sesi ekranında birleştirip evlere sunan yayın alıcısı.",
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
        "cam",
        "radyo"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "cam",
        "elektrik",
        "radyo"
      ]
    ]
  },
  "disli_cark": {
    "id": "disli_cark",
    "name": "Dişli Çark",
    "description": "Mekanik sistemlerin kalbini oluşturan dişli takımı.",
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
        "cark",
        "disli"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "alet",
        "disli",
        "odun"
      ]
    ]
  },
  "kazan": {
    "id": "kazan",
    "name": "Kazan",
    "description": "İçinde yemek veya iksir kaynatılan büyük demir kap.",
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
        "ates",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ozon": {
    "id": "ozon",
    "name": "Ozon",
    "description": "Yıldırımın oksijeni iyonlaştırmasıyla oluşan ozon gazı.",
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
        "elektrik",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": [
      [
        "enerji",
        "hava",
        "yildirim"
      ]
    ]
  },
  "radyo": {
    "id": "radyo",
    "name": "Radyo",
    "description": "Elektromanyetik dalgalarla havadan ses ve müzik yayını alan cihaz.",
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
        "elektrik",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "i_nternet": {
    "id": "i_nternet",
    "name": "İnternet",
    "description": "Dünyadaki tüm bilgisayarları birbirine bağlayan devasa küresel bilgi ağı.",
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
        "bilgisayar",
        "bilgisayar"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "radar": {
    "id": "radar",
    "name": "Radar",
    "description": "Radyo dalgaları fırlatarak uzaktaki cisimlerin yerini tespit eden sistem.",
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
        "metal",
        "radyo"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "ates",
        "radyo",
        "tas"
      ],
      [
        "elektrik",
        "hava",
        "metal"
      ]
    ]
  },
  "telgraf": {
    "id": "telgraf",
    "name": "Telgraf",
    "description": "Mors alfabesiyle elektrik sinyalleri gönderen ilk uzak iletişim cihazı.",
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
        "i_p"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "enerji",
        "i_p",
        "yildirim"
      ],
      [
        "alet",
        "bitki",
        "elektrik"
      ]
    ]
  },
  "bilgisayar": {
    "id": "bilgisayar",
    "name": "Bilgisayar",
    "description": "Milyarlarca mantıksal veriyi saniyeler içinde işleyen akıllı elektronik beyin.",
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
        "elektrik",
        "mikrocip"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "bira": {
    "id": "bira",
    "name": "Bira",
    "description": "Arpa maltı ve şerbetçiotunun mayalanmasıyla yapılan köpüklü içecek.",
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
        "maya"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "gitar": {
    "id": "gitar",
    "name": "Gitar",
    "description": "Tellerine parmakla dokunularak çalınan melodik çalgı.",
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
        "i_p",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "helikopter": {
    "id": "helikopter",
    "name": "Helikopter",
    "description": "Tepesindeki dönen pervanesi sayesinde dikey iniş-kalkış yapabilen hava aracı.",
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
        "cark",
        "ucak"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "alet",
        "odun",
        "ucak"
      ],
      [
        "buhar_motoru",
        "cark",
        "demir"
      ]
    ]
  },
  "kagit_para": {
    "id": "kagit_para",
    "name": "Kağıt Para",
    "description": "Merkez bankası güvencesiyle basılan hafif ve değerli banknot.",
    "tier": 9,
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
        "para"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "odun",
        "para",
        "su"
      ],
      [
        "altin",
        "demir",
        "kagit"
      ]
    ]
  },
  "mikroskop": {
    "id": "mikroskop",
    "name": "Mikroskop",
    "description": "Gözle görülmeyen mikropları büyüterek gösteren bilimsel cihaz.",
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
        "isik",
        "mercek"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "ates",
        "hava",
        "mercek"
      ],
      [
        "alet",
        "cam",
        "isik"
      ]
    ]
  },
  "patates": {
    "id": "patates",
    "name": "Patates",
    "description": "Toprağın altında yetişen nişasta zengini temel yumru sebze.",
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
        "bitki",
        "kok"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "plato": {
    "id": "plato",
    "name": "Plato",
    "description": "Akarsularla yarılmış, deniz seviyesinden yüksek geniş düzlük.",
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
        "dag",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "robot": {
    "id": "robot",
    "name": "Robot",
    "description": "Programlanabilir mekanik kolları ve sensörleriyle çalışan yapay varlık.",
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
        "bilgisayar",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "bilgisayar",
        "elektrik",
        "metal"
      ]
    ]
  },
  "telefon": {
    "id": "telefon",
    "name": "Telefon",
    "description": "İnsan sesini kablolar üzerinden uzaklara ileten iletişim devrimi.",
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
        "elektrik",
        "telgraf"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "enerji",
        "telgraf",
        "yildirim"
      ]
    ]
  },
  "termometre": {
    "id": "termometre",
    "name": "Termometre",
    "description": "Cıvanın genleşmesiyle sıcaklık derecesini ölçen bilimsel alet.",
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
        "cam",
        "civa"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "ates",
        "civa",
        "kum"
      ],
      [
        "cam",
        "metal",
        "su"
      ]
    ]
  },
  "titanyum": {
    "id": "titanyum",
    "name": "Titanyum",
    "description": "Çelik kadar güçlü fakat çok daha hafif yüksek teknolojili metal.",
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
        "celik",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "demir",
        "komur",
        "metal"
      ],
      [
        "ates",
        "celik",
        "tas"
      ]
    ]
  },
  "armut": {
    "id": "armut",
    "name": "Armut",
    "description": "Gövdesi konik, içi sulu ve tatlı lezzetli kış meyvesi.",
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
        "su"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "mikrocip": {
    "id": "mikrocip",
    "name": "Mikroçip",
    "description": "Milyonlarca transistör içeren minyatür silikon entegre devre yongası.",
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
        "elektrik",
        "kum"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "enerji",
        "kum",
        "yildirim"
      ],
      [
        "elektrik",
        "hava",
        "toprak"
      ]
    ]
  },
  "piyano": {
    "id": "piyano",
    "name": "Piyano",
    "description": "Tuşlarına basıldığında tellere vuran çekiçlerle çalan zarif müzik aleti.",
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
        "disli",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "fabric",
    "trioRecipes": [
      [
        "cark",
        "metal",
        "odun"
      ],
      [
        "agac",
        "disli",
        "tas"
      ]
    ]
  },
  "sicak_hava_balonu": {
    "id": "sicak_hava_balonu",
    "name": "Sıcak Hava Balonu",
    "description": "İçindeki havanın ateşle ısıtılmasıyla göğe yükselen dev balon.",
    "tier": 12,
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
        "kumas"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "banka": {
    "id": "banka",
    "name": "Banka",
    "description": "Paranın saklandığı, yatırıldığı ve kredi sağlanan finans kurumu.",
    "tier": 7,
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
        "altin_sikke",
        "ev"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "boynuz": {
    "id": "boynuz",
    "name": "Boynuz",
    "description": "Geyik veya boğaların başında çıkan sert savunma uzantısı.",
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
        "hayvan",
        "kemik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "fayton": {
    "id": "fayton",
    "name": "Fayton",
    "description": "Dört tekerlekli, körüklü ve atlı zarif gezinti arabası.",
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
        "araba",
        "at"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": [
      [
        "araba",
        "bozkir",
        "hayvan"
      ]
    ]
  },
  "hologram_kupu": {
    "id": "hologram_kupu",
    "name": "Hologram Küpü",
    "description": "Işık kırılmasıyla 3 boyutlu hareketli görüntüler yansıtan fütüristik küp.",
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
        "kristal",
        "lazer"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "lazer",
        "su",
        "tas"
      ]
    ]
  },
  "kahve": {
    "id": "kahve",
    "name": "Kahve",
    "description": "Kavrulmuş kahve çekirdeklerinin demlenmesiyle yapılan uyarıcı içecek.",
    "tier": 5,
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
        "enerji",
        "tohum"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "kaldirim": {
    "id": "kaldirim",
    "name": "Kaldırım",
    "description": "Yayaların güvenle yürümesi için yol kenarına döşenmiş taş tabaka.",
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
        "yol"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "cimento",
        "tas",
        "yol"
      ]
    ]
  },
  "sut": {
    "id": "sut",
    "name": "Süt",
    "description": "İnekten sağılan taze, kalsiyum dolu beyaz besleyici sıvı.",
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
        "cimen",
        "i_nek"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "cay": {
    "id": "cay",
    "name": "Çay",
    "description": "Taze çay yapraklarının kaynar suda demlenmesiyle elde edilen içecek.",
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
        "su",
        "yaprak"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": [
      [
        "agac",
        "isik",
        "su"
      ]
    ]
  },
  "aile": {
    "id": "aile",
    "name": "Aile",
    "description": "Sevgi ve kan bağıyla bir araya gelmiş toplumun en küçük yapı taşı.",
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
        "i_nsan",
        "i_nsan"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "bakteri": {
    "id": "bakteri",
    "name": "Bakteri",
    "description": "Sularda oluşan mikroskobik tek hücreli ilk canlı organizma.",
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
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "mum": {
    "id": "mum",
    "name": "Mum",
    "description": "Balmumu veya parafinin fitille yakılarak aydınlattığı mum.",
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
        "ates",
        "i_p"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "bugday": {
    "id": "bugday",
    "name": "Buğday",
    "description": "İnsanlığın temel besin kaynağı olan altın sarısı başaklı tahıl.",
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
        "bitki",
        "tohum"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "gayzer": {
    "id": "gayzer",
    "name": "Gayzer",
    "description": "Yeraltındaki kaynar su ve buharın basınçla fışkırması.",
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
        "buhar",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "komur": {
    "id": "komur",
    "name": "Kömür",
    "description": "Odunun havasız ortamda yakılıp karbonlaşmasıyla elde edilen siyah mineral.",
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
        "ates",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "pegasus": {
    "id": "pegasus",
    "name": "Pegasus",
    "description": "Sırtındaki bembeyaz kanatlarıyla göklerde uçan efsanevi at.",
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
        "at",
        "kus_tuyu"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "fauna",
    "trioRecipes": [
      [
        "bozkir",
        "hayvan",
        "kus_tuyu"
      ],
      [
        "at",
        "hava",
        "kus"
      ]
    ]
  },
  "uranyum": {
    "id": "uranyum",
    "name": "Uranyum",
    "description": "Nükleer enerji ve ışıma yayan ağır radyoaktif element.",
    "tier": 5,
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
        "enerji",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "ates",
        "enerji",
        "tas"
      ]
    ]
  },
  "virus": {
    "id": "virus",
    "name": "Virüs",
    "description": "Hücreleri enfekte edebilen mikroskobik genetik parçacık.",
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
        "bakteri",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yercekimsiz_platform": {
    "id": "yercekimsiz_platform",
    "name": "Yerçekimsiz Platform",
    "description": "Manyetik itme gücüyle havada asılı duran anti-yerçekimi platformu.",
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
        "manyetizma",
        "plazma"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": [
      [
        "demir",
        "elektrik",
        "plazma"
      ],
      [
        "ates",
        "elektrik",
        "manyetizma"
      ]
    ]
  },
  "cadir": {
    "id": "cadir",
    "name": "Çadır",
    "description": "Göçebelerin ve kaşiflerin kolayca kurup topladığı portatif kumaş barınak.",
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
        "kumas",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "tutun": {
    "id": "tutun",
    "name": "Tütün",
    "description": "Kurutulup yakılan aromatik yapraklı bitki türü.",
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
        "duman",
        "yaprak"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tesla_bobini": {
    "id": "tesla_bobini",
    "name": "Tesla Bobini",
    "description": "Havaya devasa şimşekler ve kablosuz elektrik yayan rezonans transformatörü.",
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
        "elektrik",
        "miknatis"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yumurta": {
    "id": "yumurta",
    "name": "Yumurta",
    "description": "Tavuğun yumurtladığı protein zengini kabuklu besin.",
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
        "bugday",
        "tavuk"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karanlik": {
    "id": "karanlik",
    "name": "Karanlık",
    "description": "Işığın yokluğu, evrenin sessiz derinliği ve mutlak boşluk.",
    "tier": 4,
    "colorPalette": {
      "primary": "#09090b",
      "secondary": "#18181b",
      "emissive": "#020617"
    },
    "particles": {
      "type": "smoke",
      "color": "#27272a",
      "count": 15
    },
    "recipe": {
      "inputs": [
        "gece",
        "uzay"
      ]
    },
    "icon": "🌑",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": [
      [
        "evren",
        "gece",
        "uzay"
      ]
    ]
  }
};

export function getCanonicalId(id) {
  if (!id) return id;
  return id.toLowerCase().trim();
}
