/**
 * Multi-Mode Item Definitions (Filtered by Semantic Context Scoring Engine)
 * Mode 1 (Classic): 92 items (Strict 2-input DAG)
 * Mode 2 (Grandmaster): 270 items (All Context Scores >= 90%, Trio >= 96%)
 */

export const CLASSIC_ITEM_DEFINITIONS = {
  "ates": {
    "id": "ates",
    "name": "Ateş",
    "description": "Saf ısı ve enerjinin kaynağı.",
    "tier": 1,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame"
  },
  "su": {
    "id": "su",
    "name": "Su",
    "description": "Hayat veren berrak sıvı.",
    "tier": 1,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid"
  },
  "toprak": {
    "id": "toprak",
    "name": "Toprak",
    "description": "Doğurgan ve kadim yer küre.",
    "tier": 1,
    "colorPalette": {
      "primary": "#78350f",
      "secondary": "#a16207",
      "emissive": "#451a03"
    },
    "particles": {
      "type": "spark",
      "color": "#a16207",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral"
  },
  "hava": {
    "id": "hava",
    "name": "Hava",
    "description": "Gökyüzünü dolduran görünmez nefes.",
    "tier": 1,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#e0f2fe",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "duman": {
    "id": "duman",
    "name": "Duman",
    "description": "Yanma sonucu çıkan partiküllü gaz.",
    "tier": 2,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
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
    "archetype3d": "gas"
  },
  "buhar": {
    "id": "buhar",
    "name": "Buhar",
    "description": "Suyun buharlaşmasından doğan sıcak gaz.",
    "tier": 2,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
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
    "archetype3d": "gas"
  },
  "lav": {
    "id": "lav",
    "name": "Lav",
    "description": "Toprağın aşırı sıcakta erimiş akkor hali.",
    "tier": 2,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
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
    "archetype3d": "flame"
  },
  "enerji": {
    "id": "enerji",
    "name": "Enerji",
    "description": "Yoğunlaşan saf termal güç.",
    "tier": 2,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ates",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "deniz": {
    "id": "deniz",
    "name": "Deniz",
    "description": "Bir araya gelen büyük su kütlesi.",
    "tier": 2,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
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
    "archetype3d": "fluid"
  },
  "nem": {
    "id": "nem",
    "name": "Nem",
    "description": "Havadaki su buharı yoğunluğu.",
    "tier": 2,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#bae6fd",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
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
    "archetype3d": "fluid"
  },
  "tas": {
    "id": "tas",
    "name": "Taş",
    "description": "Sıkışıp katılaşan zemin kütlesi.",
    "tier": 2,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
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
    "archetype3d": "mineral"
  },
  "camur": {
    "id": "camur",
    "name": "Çamur",
    "description": "Toprağın su ile yoğrulmuş balçık hali.",
    "tier": 2,
    "colorPalette": {
      "primary": "#78350f",
      "secondary": "#a16207",
      "emissive": "#451a03"
    },
    "particles": {
      "type": "spark",
      "color": "#a16207",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "toprak",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral"
  },
  "basinc": {
    "id": "basinc",
    "name": "Basınç",
    "description": "Hava kütlelerinin sıkışması.",
    "tier": 2,
    "colorPalette": {
      "primary": "#60a5fa",
      "secondary": "#93c5fd",
      "emissive": "#2563eb"
    },
    "particles": {
      "type": "spark",
      "color": "#93c5fd",
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
    "archetype3d": "gas"
  },
  "tugla": {
    "id": "tugla",
    "name": "Tuğla",
    "description": "Fırınlanmış dayanıklı yapı taşı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "camur",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "mantar": {
    "id": "mantar",
    "name": "Mantar",
    "description": "Nemli topraktan fışkıran şapkalı mantar.",
    "tier": 3,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#fef08a",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "nem",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "ruzgar": {
    "id": "ruzgar",
    "name": "Rüzgâr",
    "description": "Basınç farkından doğan hava akımı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#e0f2fe",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "basinc",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "cukur": {
    "id": "cukur",
    "name": "Çukur",
    "description": "Yerkabuğunun çökmesiyle oluşan krater.",
    "tier": 3,
    "colorPalette": {
      "primary": "#78350f",
      "secondary": "#451a03",
      "emissive": "#170701"
    },
    "particles": {
      "type": "spark",
      "color": "#451a03",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "toprak",
        "basinc"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral"
  },
  "sis": {
    "id": "sis",
    "name": "Sis",
    "description": "Düşük irtifada asılı kalan puslu hava.",
    "tier": 3,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "duman",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "kaynama": {
    "id": "kaynama",
    "name": "Kaynama",
    "description": "Buharlaşma noktasındaki suyun fokurdaması.",
    "tier": 3,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#7dd3fc",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#7dd3fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "buhar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid"
  },
  "bulut": {
    "id": "bulut",
    "name": "Bulut",
    "description": "Atmosferde toplanan yoğun su buharı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#cbd5e1",
      "secondary": "#f1f5f9",
      "emissive": "#64748b"
    },
    "particles": {
      "type": "spark",
      "color": "#f1f5f9",
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
    "archetype3d": "gas"
  },
  "kaya": {
    "id": "kaya",
    "name": "Kaya",
    "description": "Taşların birleşmesiyle oluşan iri kütle.",
    "tier": 3,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#64748b",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#64748b",
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
    "archetype3d": "mineral"
  },
  "ada": {
    "id": "ada",
    "name": "Ada",
    "description": "Deniz ortasında yükselen kara parçası.",
    "tier": 3,
    "colorPalette": {
      "primary": "#10b981",
      "secondary": "#0284c7",
      "emissive": "#047857"
    },
    "particles": {
      "type": "spark",
      "color": "#0284c7",
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
    "archetype3d": "nature"
  },
  "isik": {
    "id": "isik",
    "name": "Işık",
    "description": "Yüksek enerjili alevden yayılan ışıma.",
    "tier": 3,
    "colorPalette": {
      "primary": "#facc15",
      "secondary": "#fef08a",
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
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "yasam": {
    "id": "yasam",
    "name": "Yaşam",
    "description": "Organik çorbadan doğan ilk biyolojik kıvılcım.",
    "tier": 3,
    "colorPalette": {
      "primary": "#22c55e",
      "secondary": "#86efac",
      "emissive": "#15803d"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
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
    "archetype3d": "nature"
  },
  "metal": {
    "id": "metal",
    "name": "Metal",
    "description": "Taşların eritilmesiyle elde edilen parlak maden.",
    "tier": 3,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral"
  },
  "duvar": {
    "id": "duvar",
    "name": "Duvar",
    "description": "Tuğlaların harçla örülmesiyle oluşan yapı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tugla",
        "tugla"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "elektrik": {
    "id": "elektrik",
    "name": "Elektrik",
    "description": "Metallerden akan elektron akımı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#93c5fd",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#93c5fd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal"
  },
  "yagmur": {
    "id": "yagmur",
    "name": "Yağmur",
    "description": "Bulutların doygunluğa ulaşıp bıraktığı yağış.",
    "tier": 4,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "bulut"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid"
  },
  "dag": {
    "id": "dag",
    "name": "Dağ",
    "description": "Yerkabuğunun yükselttiği devasa kütle.",
    "tier": 4,
    "colorPalette": {
      "primary": "#334155",
      "secondary": "#64748b",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#64748b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kaya",
        "kaya"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral"
  },
  "kum": {
    "id": "kum",
    "name": "Kum",
    "description": "Rüzgarın kayaları ufalayarak oluşturduğu taneler.",
    "tier": 4,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fef08a",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
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
    "archetype3d": "mineral"
  },
  "gunes": {
    "id": "gunes",
    "name": "Güneş",
    "description": "Gündüzü aydınlatan göksel fener.",
    "tier": 4,
    "colorPalette": {
      "primary": "#f59e0b",
      "secondary": "#fbbf24",
      "emissive": "#b45309"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
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
    "archetype3d": "crystal"
  },
  "buz": {
    "id": "buz",
    "name": "Buz",
    "description": "Rüzgarın dondurucu etkisiyle katılaşan su.",
    "tier": 4,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
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
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "firtina": {
    "id": "firtina",
    "name": "Fırtına",
    "description": "Hızlı hareket eden fırtına bulutları.",
    "tier": 4,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bulut",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "balik": {
    "id": "balik",
    "name": "Balık",
    "description": "Suda yüzen pullu omurgalı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#06b6d4",
      "secondary": "#67e8f9",
      "emissive": "#0891b2"
    },
    "particles": {
      "type": "spark",
      "color": "#67e8f9",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "su"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "kus": {
    "id": "kus",
    "name": "Kuş",
    "description": "Gökyüzünde süzülen kanatlı canlı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#f97316",
      "secondary": "#fed7aa",
      "emissive": "#c2410c"
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
    "archetype3d": "nature"
  },
  "insan": {
    "id": "insan",
    "name": "İnsan",
    "description": "Alet yapabilen ve düşünen bilinçli canlı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#f59e0b",
      "secondary": "#fde68a",
      "emissive": "#b45309"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "ev": {
    "id": "ev",
    "name": "Ev",
    "description": "İnsanların barındığı sıcak yuva.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#fde68a",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "duvar",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "ampul": {
    "id": "ampul",
    "name": "Ampul",
    "description": "Elektrikle odayı aydınlatan cam lamba.",
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
        "cam",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal"
  },
  "bitki": {
    "id": "bitki",
    "name": "Bitki",
    "description": "Toprak ve yağmurla filizlenen yeşillik.",
    "tier": 5,
    "colorPalette": {
      "primary": "#22c55e",
      "secondary": "#86efac",
      "emissive": "#15803d"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "toprak",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "gol": {
    "id": "gol",
    "name": "Göl",
    "description": "Çukur arazide biriken tatlı su.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yagmur",
        "cukur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid"
  },
  "volkan": {
    "id": "volkan",
    "name": "Volkan",
    "description": "Zirvesinden lav püskürten yanardağ.",
    "tier": 5,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f97316",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "dag",
        "lav"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame"
  },
  "nehir": {
    "id": "nehir",
    "name": "Nehir",
    "description": "Dağlardan vadilere akan su yatağı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#7dd3fc",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#7dd3fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yagmur",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid"
  },
  "kar": {
    "id": "kar",
    "name": "Kar",
    "description": "Soğuk bulutlardan dökülen kristal yağış.",
    "tier": 5,
    "colorPalette": {
      "primary": "#f1f5f9",
      "secondary": "#ffffff",
      "emissive": "#cbd5e1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bulut",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "yildirim": {
    "id": "yildirim",
    "name": "Yıldırım",
    "description": "Fırtına bulutlarından boşalan elektrik arkı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fef08a",
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
    "archetype3d": "crystal"
  },
  "plaj": {
    "id": "plaj",
    "name": "Plaj",
    "description": "Deniz kıyısında uzanan kum şeridi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#fde047",
      "secondary": "#38bdf8",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kum",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature"
  },
  "cam": {
    "id": "cam",
    "name": "Cam",
    "description": "Kumun yüksek ısıda saydamlaşması.",
    "tier": 5,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
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
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "crystal"
  },
  "alet": {
    "id": "alet",
    "name": "Alet",
    "description": "İnsan eliyle yontulmuş ilk el aleti.",
    "tier": 5,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "gokkusagi": {
    "id": "gokkusagi",
    "name": "Gökkuşağı",
    "description": "Işığın yağmur damlalarında spektruma ayrılması.",
    "tier": 5,
    "colorPalette": {
      "primary": "#ec4899",
      "secondary": "#8b5cf6",
      "emissive": "#db2777"
    },
    "particles": {
      "type": "spark",
      "color": "#8b5cf6",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "gunes",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "magic"
  },
  "col": {
    "id": "col",
    "name": "Çöl",
    "description": "Kavurucu güneş altında uzanan kum denizi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fde047",
      "emissive": "#b45309"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
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
    "archetype3d": "nature"
  },
  "buzul": {
    "id": "buzul",
    "name": "Buzul",
    "description": "Yüksek dağ yamaçlarında dev buz kütlesi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#bae6fd",
      "secondary": "#f0f9ff",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#f0f9ff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buz",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "crystal"
  },
  "dolu": {
    "id": "dolu",
    "name": "Dolu",
    "description": "Donmuş sert yağmur taneleri.",
    "tier": 5,
    "colorPalette": {
      "primary": "#e2e8f0",
      "secondary": "#ffffff",
      "emissive": "#94a3b8"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yagmur",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "hortum": {
    "id": "hortum",
    "name": "Hortum",
    "description": "Fırtınanın dönen yıkıcı hava girdabı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "firtina",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "koy": {
    "id": "koy",
    "name": "Köy",
    "description": "Evlerin birleşmesiyle kurulan yerleşim.",
    "tier": 6,
    "colorPalette": {
      "primary": "#b45309",
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
        "ev",
        "ev"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "agac": {
    "id": "agac",
    "name": "Ağaç",
    "description": "Güneş ışığıyla göğe yükselen gövdeli bitki.",
    "tier": 6,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#86efac",
      "emissive": "#166534"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "cicek": {
    "id": "cicek",
    "name": "Çiçek",
    "description": "Işığa doğru açan rengarenk taç yapraklar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ec4899",
      "secondary": "#fbcfe8",
      "emissive": "#be185d"
    },
    "particles": {
      "type": "spark",
      "color": "#fbcfe8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "yosun": {
    "id": "yosun",
    "name": "Yosun",
    "description": "Islak zeminlerde yayılan ilkel yeşil tabaka.",
    "tier": 6,
    "colorPalette": {
      "primary": "#059669",
      "secondary": "#6ee7b7",
      "emissive": "#047857"
    },
    "particles": {
      "type": "spark",
      "color": "#6ee7b7",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "su"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "tarim": {
    "id": "tarim",
    "name": "Tarım",
    "description": "Toprağı ekip biçme ve hasat etme sanatı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ca8a04",
      "secondary": "#fef08a",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "selale": {
    "id": "selale",
    "name": "Şelale",
    "description": "Dağ yamacından köpürerek dökülen akarsu.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#7dd3fc",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#7dd3fc",
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
    "archetype3d": "fluid"
  },
  "zaman": {
    "id": "zaman",
    "name": "Zaman",
    "description": "Kum saatiyle ölçülen evrensel akış.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ca8a04",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kum",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal"
  },
  "orman": {
    "id": "orman",
    "name": "Orman",
    "description": "Ağaçların oluşturduğu uçsuz bucaksız yeşillik.",
    "tier": 7,
    "colorPalette": {
      "primary": "#166534",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#4ade80",
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
    "archetype3d": "nature"
  },
  "odun": {
    "id": "odun",
    "name": "Odun",
    "description": "Ağaçtan kesilen kaliteli kereste.",
    "tier": 7,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "meyve": {
    "id": "meyve",
    "name": "Meyve",
    "description": "Çiçeklenen ağacın lezzetli ve sulu hediyesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#fca5a5",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#fca5a5",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "yaprak": {
    "id": "yaprak",
    "name": "Yaprak",
    "description": "Ağaç dallarından dökülen yeşil örtü.",
    "tier": 7,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#86efac",
      "emissive": "#15803d"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "yuva": {
    "id": "yuva",
    "name": "Yuva",
    "description": "Kuşların dallar arasına kurduğu korunaklı ev.",
    "tier": 7,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "komur": {
    "id": "komur",
    "name": "Kömür",
    "description": "Yüksek ısıda kömürleşmiş fosil yakıt.",
    "tier": 7,
    "colorPalette": {
      "primary": "#1f2937",
      "secondary": "#4b5563",
      "emissive": "#111827"
    },
    "particles": {
      "type": "spark",
      "color": "#4b5563",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral"
  },
  "un": {
    "id": "un",
    "name": "Un",
    "description": "Tahılların taş değirmende öğütülmesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#fef08a",
      "secondary": "#ffffff",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tarim",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral"
  },
  "sehir": {
    "id": "sehir",
    "name": "Şehir",
    "description": "Gelişmiş büyük medeniyet merkezi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#cbd5e1",
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
        "koy"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "hayvan": {
    "id": "hayvan",
    "name": "Hayvan",
    "description": "Ormanlarda dolaşan vahşi canlı.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b45309",
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
        "yasam",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "celik": {
    "id": "celik",
    "name": "Çelik",
    "description": "Demirin karbonla dövülüp sertleşmesi.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "komur"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral"
  },
  "tekerlek": {
    "id": "tekerlek",
    "name": "Tekerlek",
    "description": "Dönerek yük taşımayı sağlayan devrimsel buluş.",
    "tier": 8,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "hamur": {
    "id": "hamur",
    "name": "Hamur",
    "description": "Un ve suyun yoğrulmasıyla oluşan karışım.",
    "tier": 8,
    "colorPalette": {
      "primary": "#fef08a",
      "secondary": "#fef9c3",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fef9c3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "un",
        "su"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "yangin": {
    "id": "yangin",
    "name": "Yangın",
    "description": "Ağaçların alev alarak kontrolden çıkması.",
    "tier": 8,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "orman",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame"
  },
  "balta": {
    "id": "balta",
    "name": "Balta",
    "description": "Odun saplı metal kesici alet.",
    "tier": 8,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#92400e",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#92400e",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "kul": {
    "id": "kul",
    "name": "Kül",
    "description": "Yanan odunun bıraktığı ince gri toz.",
    "tier": 8,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "sal": {
    "id": "sal",
    "name": "Sal",
    "description": "Su üzerinde batmadan yüzen kütükler.",
    "tier": 8,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#0284c7",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#0284c7",
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
    "archetype3d": "nature"
  },
  "kopru": {
    "id": "kopru",
    "name": "Köprü",
    "description": "Nehirleri birbirine bağlayan ahşap geçit.",
    "tier": 8,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "akkor": {
    "id": "akkor",
    "name": "Akkor",
    "description": "Kömürün ışıl ışıl yanan en sıcak hali.",
    "tier": 8,
    "colorPalette": {
      "primary": "#ea580c",
      "secondary": "#fbbf24",
      "emissive": "#9a3412"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "komur",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame"
  },
  "evcil_hayvan": {
    "id": "evcil_hayvan",
    "name": "Evcil Hayvan",
    "description": "İnsanla dost olan uysal canlı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ca8a04",
      "secondary": "#fef08a",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "inek": {
    "id": "inek",
    "name": "İnek",
    "description": "Çiftlikte beslenen sütçü büyükbaş.",
    "tier": 9,
    "colorPalette": {
      "primary": "#1f2937",
      "secondary": "#ffffff",
      "emissive": "#111827"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "tarim"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "domuz": {
    "id": "domuz",
    "name": "Domuz",
    "description": "Çamur banyosunu seven pembe çiftlik hayvanı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#f472b6",
      "secondary": "#fbcfe8",
      "emissive": "#db2777"
    },
    "particles": {
      "type": "spark",
      "color": "#fbcfe8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "ekmek": {
    "id": "ekmek",
    "name": "Ekmek",
    "description": "Taş fırında pişen mis kokulu ekmek.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fde68a",
      "emissive": "#92400e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
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
    "archetype3d": "nature"
  },
  "kilic": {
    "id": "kilic",
    "name": "Kılıç",
    "description": "Keskin çelikten dövülmüş savaş silahı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#cbd5e1",
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
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "araba": {
    "id": "araba",
    "name": "Araba",
    "description": "Tekerlekli ilkel yük arabası.",
    "tier": 9,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tekerlek",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "yelkenli": {
    "id": "yelkenli",
    "name": "Yelkenli",
    "description": "Rüzgar gücüyle denizleri aşan tekne.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#ffffff",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sal",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "buhar_motoru": {
    "id": "buhar_motoru",
    "name": "Buhar Motoru",
    "description": "Buharın gücünü harekete çeviren makine.",
    "tier": 9,
    "colorPalette": {
      "primary": "#334155",
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
        "buhar",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral"
  },
  "sut": {
    "id": "sut",
    "name": "Süt",
    "description": "İnekten sağılan taze beyaz içecek.",
    "tier": 10,
    "colorPalette": {
      "primary": "#ffffff",
      "secondary": "#f8fafc",
      "emissive": "#e2e8f0"
    },
    "particles": {
      "type": "spark",
      "color": "#f8fafc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "inek",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "fluid"
  },
  "at": {
    "id": "at",
    "name": "At",
    "description": "Rüzgar gibi koşan asil binek.",
    "tier": 10,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "evcil_hayvan",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "tren": {
    "id": "tren",
    "name": "Tren",
    "description": "Raylar üzerinde giden buharlı dev lokomotif.",
    "tier": 10,
    "colorPalette": {
      "primary": "#1e293b",
      "secondary": "#64748b",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#64748b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buhar_motoru",
        "araba"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral"
  },
  "buharli_gemi": {
    "id": "buharli_gemi",
    "name": "Buharlı Gemi",
    "description": "Buhar çarklarıyla okyanusları aşan dev gemi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#1e293b",
      "secondary": "#0284c7",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#0284c7",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buhar_motoru",
        "sal"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral"
  },
  "peynir": {
    "id": "peynir",
    "name": "Peynir",
    "description": "Mayalanıp olgunlaşmış leziz süt ürünü.",
    "tier": 11,
    "colorPalette": {
      "primary": "#facc15",
      "secondary": "#fef08a",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sut",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "tereyagi": {
    "id": "tereyagi",
    "name": "Tereyağı",
    "description": "Sütün çalkalanmasıyla elde edilen saf yağ.",
    "tier": 11,
    "colorPalette": {
      "primary": "#fde047",
      "secondary": "#fef9c3",
      "emissive": "#eab308"
    },
    "particles": {
      "type": "spark",
      "color": "#fef9c3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sut",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "dondurma": {
    "id": "dondurma",
    "name": "Dondurma",
    "description": "Süt ve buzla yapılan serinletici tatlı.",
    "tier": 11,
    "colorPalette": {
      "primary": "#f472b6",
      "secondary": "#bae6fd",
      "emissive": "#ec4899"
    },
    "particles": {
      "type": "spark",
      "color": "#bae6fd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sut",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  }
};

export const GRANDMASTER_ITEM_DEFINITIONS = {
  "ates": {
    "id": "ates",
    "name": "Ateş",
    "description": "Saf ısı ve enerjinin kaynağı.",
    "tier": 1,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame"
  },
  "su": {
    "id": "su",
    "name": "Su",
    "description": "Hayat veren berrak sıvı.",
    "tier": 1,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid"
  },
  "toprak": {
    "id": "toprak",
    "name": "Toprak",
    "description": "Doğurgan ve kadim yer küre.",
    "tier": 1,
    "colorPalette": {
      "primary": "#78350f",
      "secondary": "#a16207",
      "emissive": "#451a03"
    },
    "particles": {
      "type": "spark",
      "color": "#a16207",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral"
  },
  "hava": {
    "id": "hava",
    "name": "Hava",
    "description": "Gökyüzünü dolduran görünmez nefes.",
    "tier": 1,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#e0f2fe",
      "count": 12
    },
    "recipe": null,
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "duman": {
    "id": "duman",
    "name": "Duman",
    "description": "Yanma sonucu çıkan partiküllü gaz.",
    "tier": 2,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
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
    "archetype3d": "gas"
  },
  "buhar": {
    "id": "buhar",
    "name": "Buhar",
    "description": "Suyun buharlaşmasından doğan sıcak gaz.",
    "tier": 2,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
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
    "archetype3d": "gas"
  },
  "lav": {
    "id": "lav",
    "name": "Lav",
    "description": "Toprağın aşırı sıcakta erimiş akkor hali.",
    "tier": 2,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
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
    "archetype3d": "flame"
  },
  "enerji": {
    "id": "enerji",
    "name": "Enerji",
    "description": "Yoğunlaşan saf termal güç.",
    "tier": 2,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ates",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "deniz": {
    "id": "deniz",
    "name": "Deniz",
    "description": "Bir araya gelen büyük su kütlesi.",
    "tier": 2,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
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
    "archetype3d": "fluid"
  },
  "nem": {
    "id": "nem",
    "name": "Nem",
    "description": "Havadaki su buharı yoğunluğu.",
    "tier": 2,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#bae6fd",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
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
    "archetype3d": "fluid"
  },
  "tas": {
    "id": "tas",
    "name": "Taş",
    "description": "Sıkışıp katılaşan zemin kütlesi.",
    "tier": 2,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
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
    "archetype3d": "mineral"
  },
  "camur": {
    "id": "camur",
    "name": "Çamur",
    "description": "Toprağın su ile yoğrulmuş balçık hali.",
    "tier": 2,
    "colorPalette": {
      "primary": "#78350f",
      "secondary": "#a16207",
      "emissive": "#451a03"
    },
    "particles": {
      "type": "spark",
      "color": "#a16207",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "toprak",
        "su"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral"
  },
  "basinc": {
    "id": "basinc",
    "name": "Basınç",
    "description": "Hava kütlelerinin sıkışması.",
    "tier": 2,
    "colorPalette": {
      "primary": "#60a5fa",
      "secondary": "#93c5fd",
      "emissive": "#2563eb"
    },
    "particles": {
      "type": "spark",
      "color": "#93c5fd",
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
    "archetype3d": "gas"
  },
  "tugla": {
    "id": "tugla",
    "name": "Tuğla",
    "description": "Fırınlanmış dayanıklı yapı taşı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "camur",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "mantar": {
    "id": "mantar",
    "name": "Mantar",
    "description": "Nemli topraktan fışkıran şapkalı mantar.",
    "tier": 3,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#fef08a",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "nem",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "ruzgar": {
    "id": "ruzgar",
    "name": "Rüzgâr",
    "description": "Basınç farkından doğan hava akımı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#e0f2fe",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "basinc",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "cukur": {
    "id": "cukur",
    "name": "Çukur",
    "description": "Yerkabuğunun çökmesiyle oluşan krater.",
    "tier": 3,
    "colorPalette": {
      "primary": "#78350f",
      "secondary": "#451a03",
      "emissive": "#170701"
    },
    "particles": {
      "type": "spark",
      "color": "#451a03",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "toprak",
        "basinc"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral"
  },
  "sis": {
    "id": "sis",
    "name": "Sis",
    "description": "Düşük irtifada asılı kalan puslu hava.",
    "tier": 3,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "duman",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "kaynama": {
    "id": "kaynama",
    "name": "Kaynama",
    "description": "Buharlaşma noktasındaki suyun fokurdaması.",
    "tier": 3,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#7dd3fc",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#7dd3fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "buhar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid"
  },
  "bulut": {
    "id": "bulut",
    "name": "Bulut",
    "description": "Atmosferde toplanan yoğun su buharı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#cbd5e1",
      "secondary": "#f1f5f9",
      "emissive": "#64748b"
    },
    "particles": {
      "type": "spark",
      "color": "#f1f5f9",
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
    "archetype3d": "gas"
  },
  "kaya": {
    "id": "kaya",
    "name": "Kaya",
    "description": "Taşların birleşmesiyle oluşan iri kütle.",
    "tier": 3,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#64748b",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#64748b",
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
    "archetype3d": "mineral"
  },
  "ada": {
    "id": "ada",
    "name": "Ada",
    "description": "Deniz ortasında yükselen kara parçası.",
    "tier": 3,
    "colorPalette": {
      "primary": "#10b981",
      "secondary": "#0284c7",
      "emissive": "#047857"
    },
    "particles": {
      "type": "spark",
      "color": "#0284c7",
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
    "archetype3d": "nature"
  },
  "isik": {
    "id": "isik",
    "name": "Işık",
    "description": "Yüksek enerjili alevden yayılan ışıma.",
    "tier": 3,
    "colorPalette": {
      "primary": "#facc15",
      "secondary": "#fef08a",
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
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "yasam": {
    "id": "yasam",
    "name": "Yaşam",
    "description": "Organik çorbadan doğan ilk biyolojik kıvılcım.",
    "tier": 3,
    "colorPalette": {
      "primary": "#22c55e",
      "secondary": "#86efac",
      "emissive": "#15803d"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
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
    "archetype3d": "nature"
  },
  "metal": {
    "id": "metal",
    "name": "Metal",
    "description": "Taşların eritilmesiyle elde edilen parlak maden.",
    "tier": 3,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#cbd5e1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral"
  },
  "duvar": {
    "id": "duvar",
    "name": "Duvar",
    "description": "Tuğlaların harçla örülmesiyle oluşan yapı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tugla",
        "tugla"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "elektrik": {
    "id": "elektrik",
    "name": "Elektrik",
    "description": "Metallerden akan elektron akımı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#93c5fd",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#93c5fd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal"
  },
  "yagmur": {
    "id": "yagmur",
    "name": "Yağmur",
    "description": "Bulutların doygunluğa ulaşıp bıraktığı yağış.",
    "tier": 4,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "bulut"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid"
  },
  "dag": {
    "id": "dag",
    "name": "Dağ",
    "description": "Yerkabuğunun yükselttiği devasa kütle.",
    "tier": 4,
    "colorPalette": {
      "primary": "#334155",
      "secondary": "#64748b",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#64748b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kaya",
        "kaya"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral"
  },
  "kum": {
    "id": "kum",
    "name": "Kum",
    "description": "Rüzgarın kayaları ufalayarak oluşturduğu taneler.",
    "tier": 4,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fef08a",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
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
    "archetype3d": "mineral"
  },
  "gunes": {
    "id": "gunes",
    "name": "Güneş",
    "description": "Gündüzü aydınlatan göksel fener.",
    "tier": 4,
    "colorPalette": {
      "primary": "#f59e0b",
      "secondary": "#fbbf24",
      "emissive": "#b45309"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
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
    "archetype3d": "crystal"
  },
  "buz": {
    "id": "buz",
    "name": "Buz",
    "description": "Rüzgarın dondurucu etkisiyle katılaşan su.",
    "tier": 4,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
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
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "firtina": {
    "id": "firtina",
    "name": "Fırtına",
    "description": "Hızlı hareket eden fırtına bulutları.",
    "tier": 4,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bulut",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "balik": {
    "id": "balik",
    "name": "Balık",
    "description": "Suda yüzen pullu omurgalı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#06b6d4",
      "secondary": "#67e8f9",
      "emissive": "#0891b2"
    },
    "particles": {
      "type": "spark",
      "color": "#67e8f9",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "su"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "kus": {
    "id": "kus",
    "name": "Kuş",
    "description": "Gökyüzünde süzülen kanatlı canlı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#f97316",
      "secondary": "#fed7aa",
      "emissive": "#c2410c"
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
    "archetype3d": "nature"
  },
  "insan": {
    "id": "insan",
    "name": "İnsan",
    "description": "Alet yapabilen ve düşünen bilinçli canlı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#f59e0b",
      "secondary": "#fde68a",
      "emissive": "#b45309"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "ev": {
    "id": "ev",
    "name": "Ev",
    "description": "İnsanların barındığı sıcak yuva.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#fde68a",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "duvar",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "ampul": {
    "id": "ampul",
    "name": "Ampul",
    "description": "Elektrikle odayı aydınlatan cam lamba.",
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
        "cam",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal"
  },
  "bitki": {
    "id": "bitki",
    "name": "Bitki",
    "description": "Toprak ve yağmurla filizlenen yeşillik.",
    "tier": 5,
    "colorPalette": {
      "primary": "#22c55e",
      "secondary": "#86efac",
      "emissive": "#15803d"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "toprak",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "gol": {
    "id": "gol",
    "name": "Göl",
    "description": "Çukur arazide biriken tatlı su.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yagmur",
        "cukur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid"
  },
  "volkan": {
    "id": "volkan",
    "name": "Volkan",
    "description": "Zirvesinden lav püskürten yanardağ.",
    "tier": 5,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f97316",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "dag",
        "lav"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame"
  },
  "nehir": {
    "id": "nehir",
    "name": "Nehir",
    "description": "Dağlardan vadilere akan su yatağı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#7dd3fc",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#7dd3fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yagmur",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid"
  },
  "kar": {
    "id": "kar",
    "name": "Kar",
    "description": "Soğuk bulutlardan dökülen kristal yağış.",
    "tier": 5,
    "colorPalette": {
      "primary": "#f1f5f9",
      "secondary": "#ffffff",
      "emissive": "#cbd5e1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bulut",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "yildirim": {
    "id": "yildirim",
    "name": "Yıldırım",
    "description": "Fırtına bulutlarından boşalan elektrik arkı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fef08a",
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
    "archetype3d": "crystal"
  },
  "plaj": {
    "id": "plaj",
    "name": "Plaj",
    "description": "Deniz kıyısında uzanan kum şeridi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#fde047",
      "secondary": "#38bdf8",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kum",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature"
  },
  "cam": {
    "id": "cam",
    "name": "Cam",
    "description": "Kumun yüksek ısıda saydamlaşması.",
    "tier": 5,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
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
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "crystal"
  },
  "alet": {
    "id": "alet",
    "name": "Alet",
    "description": "İnsan eliyle yontulmuş ilk el aleti.",
    "tier": 5,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "gokkusagi": {
    "id": "gokkusagi",
    "name": "Gökkuşağı",
    "description": "Işığın yağmur damlalarında spektruma ayrılması.",
    "tier": 5,
    "colorPalette": {
      "primary": "#ec4899",
      "secondary": "#8b5cf6",
      "emissive": "#db2777"
    },
    "particles": {
      "type": "spark",
      "color": "#8b5cf6",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "gunes",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "magic"
  },
  "col": {
    "id": "col",
    "name": "Çöl",
    "description": "Kavurucu güneş altında uzanan kum denizi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fde047",
      "emissive": "#b45309"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
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
    "archetype3d": "nature"
  },
  "buzul": {
    "id": "buzul",
    "name": "Buzul",
    "description": "Yüksek dağ yamaçlarında dev buz kütlesi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#bae6fd",
      "secondary": "#f0f9ff",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#f0f9ff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buz",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "crystal"
  },
  "dolu": {
    "id": "dolu",
    "name": "Dolu",
    "description": "Donmuş sert yağmur taneleri.",
    "tier": 5,
    "colorPalette": {
      "primary": "#e2e8f0",
      "secondary": "#ffffff",
      "emissive": "#94a3b8"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yagmur",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal"
  },
  "hortum": {
    "id": "hortum",
    "name": "Hortum",
    "description": "Fırtınanın dönen yıkıcı hava girdabı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "firtina",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "koy": {
    "id": "koy",
    "name": "Köy",
    "description": "Evlerin birleşmesiyle kurulan yerleşim.",
    "tier": 6,
    "colorPalette": {
      "primary": "#b45309",
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
        "ev",
        "ev"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "agac": {
    "id": "agac",
    "name": "Ağaç",
    "description": "Güneş ışığıyla göğe yükselen gövdeli bitki.",
    "tier": 6,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#86efac",
      "emissive": "#166534"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "cicek": {
    "id": "cicek",
    "name": "Çiçek",
    "description": "Işığa doğru açan rengarenk taç yapraklar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ec4899",
      "secondary": "#fbcfe8",
      "emissive": "#be185d"
    },
    "particles": {
      "type": "spark",
      "color": "#fbcfe8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "yosun": {
    "id": "yosun",
    "name": "Yosun",
    "description": "Islak zeminlerde yayılan ilkel yeşil tabaka.",
    "tier": 6,
    "colorPalette": {
      "primary": "#059669",
      "secondary": "#6ee7b7",
      "emissive": "#047857"
    },
    "particles": {
      "type": "spark",
      "color": "#6ee7b7",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "su"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "tarim": {
    "id": "tarim",
    "name": "Tarım",
    "description": "Toprağı ekip biçme ve hasat etme sanatı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ca8a04",
      "secondary": "#fef08a",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "selale": {
    "id": "selale",
    "name": "Şelale",
    "description": "Dağ yamacından köpürerek dökülen akarsu.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#7dd3fc",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#7dd3fc",
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
    "archetype3d": "fluid"
  },
  "zaman": {
    "id": "zaman",
    "name": "Zaman",
    "description": "Kum saatiyle ölçülen evrensel akış.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ca8a04",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kum",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal"
  },
  "orman": {
    "id": "orman",
    "name": "Orman",
    "description": "Ağaçların oluşturduğu uçsuz bucaksız yeşillik.",
    "tier": 7,
    "colorPalette": {
      "primary": "#166534",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#4ade80",
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
    "archetype3d": "nature"
  },
  "odun": {
    "id": "odun",
    "name": "Odun",
    "description": "Ağaçtan kesilen kaliteli kereste.",
    "tier": 7,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "meyve": {
    "id": "meyve",
    "name": "Meyve",
    "description": "Çiçeklenen ağacın lezzetli ve sulu hediyesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#fca5a5",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#fca5a5",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "yaprak": {
    "id": "yaprak",
    "name": "Yaprak",
    "description": "Ağaç dallarından dökülen yeşil örtü.",
    "tier": 7,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#86efac",
      "emissive": "#15803d"
    },
    "particles": {
      "type": "spark",
      "color": "#86efac",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "yuva": {
    "id": "yuva",
    "name": "Yuva",
    "description": "Kuşların dallar arasına kurduğu korunaklı ev.",
    "tier": 7,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "komur": {
    "id": "komur",
    "name": "Kömür",
    "description": "Yüksek ısıda kömürleşmiş fosil yakıt.",
    "tier": 7,
    "colorPalette": {
      "primary": "#1f2937",
      "secondary": "#4b5563",
      "emissive": "#111827"
    },
    "particles": {
      "type": "spark",
      "color": "#4b5563",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral"
  },
  "un": {
    "id": "un",
    "name": "Un",
    "description": "Tahılların taş değirmende öğütülmesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#fef08a",
      "secondary": "#ffffff",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tarim",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral"
  },
  "sehir": {
    "id": "sehir",
    "name": "Şehir",
    "description": "Gelişmiş büyük medeniyet merkezi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#cbd5e1",
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
        "koy"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "hayvan": {
    "id": "hayvan",
    "name": "Hayvan",
    "description": "Ormanlarda dolaşan vahşi canlı.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b45309",
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
        "yasam",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "celik": {
    "id": "celik",
    "name": "Çelik",
    "description": "Demirin karbonla dövülüp sertleşmesi.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "komur"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral"
  },
  "tekerlek": {
    "id": "tekerlek",
    "name": "Tekerlek",
    "description": "Dönerek yük taşımayı sağlayan devrimsel buluş.",
    "tier": 8,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "hamur": {
    "id": "hamur",
    "name": "Hamur",
    "description": "Un ve suyun yoğrulmasıyla oluşan karışım.",
    "tier": 8,
    "colorPalette": {
      "primary": "#fef08a",
      "secondary": "#fef9c3",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fef9c3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "un",
        "su"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "yangin": {
    "id": "yangin",
    "name": "Yangın",
    "description": "Ağaçların alev alarak kontrolden çıkması.",
    "tier": 8,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#991b1b"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "orman",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame"
  },
  "balta": {
    "id": "balta",
    "name": "Balta",
    "description": "Odun saplı metal kesici alet.",
    "tier": 8,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#92400e",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#92400e",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "kul": {
    "id": "kul",
    "name": "Kül",
    "description": "Yanan odunun bıraktığı ince gri toz.",
    "tier": 8,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas"
  },
  "sal": {
    "id": "sal",
    "name": "Sal",
    "description": "Su üzerinde batmadan yüzen kütükler.",
    "tier": 8,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#0284c7",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#0284c7",
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
    "archetype3d": "nature"
  },
  "kopru": {
    "id": "kopru",
    "name": "Köprü",
    "description": "Nehirleri birbirine bağlayan ahşap geçit.",
    "tier": 8,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "akkor": {
    "id": "akkor",
    "name": "Akkor",
    "description": "Kömürün ışıl ışıl yanan en sıcak hali.",
    "tier": 8,
    "colorPalette": {
      "primary": "#ea580c",
      "secondary": "#fbbf24",
      "emissive": "#9a3412"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "komur",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame"
  },
  "evcil_hayvan": {
    "id": "evcil_hayvan",
    "name": "Evcil Hayvan",
    "description": "İnsanla dost olan uysal canlı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ca8a04",
      "secondary": "#fef08a",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "inek": {
    "id": "inek",
    "name": "İnek",
    "description": "Çiftlikte beslenen sütçü büyükbaş.",
    "tier": 9,
    "colorPalette": {
      "primary": "#1f2937",
      "secondary": "#ffffff",
      "emissive": "#111827"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "tarim"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "domuz": {
    "id": "domuz",
    "name": "Domuz",
    "description": "Çamur banyosunu seven pembe çiftlik hayvanı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#f472b6",
      "secondary": "#fbcfe8",
      "emissive": "#db2777"
    },
    "particles": {
      "type": "spark",
      "color": "#fbcfe8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "ekmek": {
    "id": "ekmek",
    "name": "Ekmek",
    "description": "Taş fırında pişen mis kokulu ekmek.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fde68a",
      "emissive": "#92400e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
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
    "archetype3d": "nature"
  },
  "kilic": {
    "id": "kilic",
    "name": "Kılıç",
    "description": "Keskin çelikten dövülmüş savaş silahı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#cbd5e1",
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
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral"
  },
  "araba": {
    "id": "araba",
    "name": "Araba",
    "description": "Tekerlekli ilkel yük arabası.",
    "tier": 9,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tekerlek",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "yelkenli": {
    "id": "yelkenli",
    "name": "Yelkenli",
    "description": "Rüzgar gücüyle denizleri aşan tekne.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#ffffff",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sal",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature"
  },
  "buhar_motoru": {
    "id": "buhar_motoru",
    "name": "Buhar Motoru",
    "description": "Buharın gücünü harekete çeviren makine.",
    "tier": 9,
    "colorPalette": {
      "primary": "#334155",
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
        "buhar",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral"
  },
  "sut": {
    "id": "sut",
    "name": "Süt",
    "description": "İnekten sağılan taze beyaz içecek.",
    "tier": 10,
    "colorPalette": {
      "primary": "#ffffff",
      "secondary": "#f8fafc",
      "emissive": "#e2e8f0"
    },
    "particles": {
      "type": "spark",
      "color": "#f8fafc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "inek",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "fluid"
  },
  "at": {
    "id": "at",
    "name": "At",
    "description": "Rüzgar gibi koşan asil binek.",
    "tier": 10,
    "colorPalette": {
      "primary": "#92400e",
      "secondary": "#fde68a",
      "emissive": "#713f12"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "evcil_hayvan",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature"
  },
  "tren": {
    "id": "tren",
    "name": "Tren",
    "description": "Raylar üzerinde giden buharlı dev lokomotif.",
    "tier": 10,
    "colorPalette": {
      "primary": "#1e293b",
      "secondary": "#64748b",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#64748b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buhar_motoru",
        "araba"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral"
  },
  "buharli_gemi": {
    "id": "buharli_gemi",
    "name": "Buharlı Gemi",
    "description": "Buhar çarklarıyla okyanusları aşan dev gemi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#1e293b",
      "secondary": "#0284c7",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#0284c7",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buhar_motoru",
        "sal"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral"
  },
  "peynir": {
    "id": "peynir",
    "name": "Peynir",
    "description": "Mayalanıp olgunlaşmış leziz süt ürünü.",
    "tier": 11,
    "colorPalette": {
      "primary": "#facc15",
      "secondary": "#fef08a",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#fef08a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sut",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "tereyagi": {
    "id": "tereyagi",
    "name": "Tereyağı",
    "description": "Sütün çalkalanmasıyla elde edilen saf yağ.",
    "tier": 11,
    "colorPalette": {
      "primary": "#fde047",
      "secondary": "#fef9c3",
      "emissive": "#eab308"
    },
    "particles": {
      "type": "spark",
      "color": "#fef9c3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sut",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "dondurma": {
    "id": "dondurma",
    "name": "Dondurma",
    "description": "Süt ve buzla yapılan serinletici tatlı.",
    "tier": 11,
    "colorPalette": {
      "primary": "#f472b6",
      "secondary": "#bae6fd",
      "emissive": "#ec4899"
    },
    "particles": {
      "type": "spark",
      "color": "#bae6fd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sut",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "nature"
  },
  "pasta": {
    "id": "pasta",
    "name": "Pasta",
    "description": "Un (hamur tabanı) + Süt (krema) + Fırın ateşi.",
    "tier": 11,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "un",
        "sut",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 98
  },
  "pizza": {
    "id": "pizza",
    "name": "Pizza",
    "description": "Hamur tabanı + Peynir + Fırın ateşi.",
    "tier": 12,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hamur",
        "peynir",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "sandvic": {
    "id": "sandvic",
    "name": "Sandvic",
    "description": "Ekmek + Peynir + Et/Domuz dolgusu.",
    "tier": 12,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ekmek",
        "peynir",
        "domuz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 96
  },
  "cay": {
    "id": "cay",
    "name": "Çay",
    "description": "Çay yaprağı + Su + Demleme ateşi.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#f59e0b",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#f59e0b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yaprak",
        "su",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 99
  },
  "sarap": {
    "id": "sarap",
    "name": "Şarap",
    "description": "Meyve suyu + Su + Fermantasyon zamanı.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "meyve",
        "su",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "semantic_score": 96
  },
  "gokdelen": {
    "id": "gokdelen",
    "name": "Gokdelen",
    "description": "Şehir + Taşıyıcı çelik iskelet + Cam cephe.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sehir",
        "celik",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 99
  },
  "baraj": {
    "id": "baraj",
    "name": "Baraj",
    "description": "Beton set + Nehir debisi + Hidroelektrik üretimi.",
    "tier": 6,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "duvar",
        "nehir",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "semantic_score": 99
  },
  "liman": {
    "id": "liman",
    "name": "Liman",
    "description": "Kıyı kenti + Deniz + Yanaşan gemi/sal.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sehir",
        "deniz",
        "sal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "semantic_score": 96
  },
  "fener": {
    "id": "fener",
    "name": "Fener",
    "description": "Kıyı kulesi + Güçlü ışık + Deniz.",
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
        "duvar",
        "isik",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 97
  },
  "degirmen": {
    "id": "degirmen",
    "name": "Değirmen",
    "description": "Bina + Rüzgar kuvveti + Öğütücü taş mekanizması.",
    "tier": 6,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "ruzgar",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 96
  },
  "sera": {
    "id": "sera",
    "name": "Sera",
    "description": "Kapalı yapı + Yalıtkan cam + Bitki seracılığı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#4ade80",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "cam",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flora",
    "semantic_score": 98
  },
  "akvaryum": {
    "id": "akvaryum",
    "name": "Akvaryum",
    "description": "Cam hazne + Berrak su + Balık.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "su",
        "balik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 99
  },
  "ciftlik": {
    "id": "ciftlik",
    "name": "Ciftlik",
    "description": "Kırsal yerleşim + Tarım ekimi + Hayvan besiciliği.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "tarim",
        "hayvan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 97
  },
  "kale": {
    "id": "kale",
    "name": "Kale",
    "description": "Çift sur duvarı + Masif taş tahkimatı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "duvar",
        "duvar",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "semantic_score": 96
  },
  "piramit": {
    "id": "piramit",
    "name": "Piramit",
    "description": "Dev taş bloklar + Çöl coğrafyası + Bin yıllık zaman.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "col",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "semantic_score": 98
  },
  "sovalye": {
    "id": "sovalye",
    "name": "Sovalye",
    "description": "Savaşçı insan + Kılıç ustalığı + Çelik zırh.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "kilic",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 99
  },
  "madenci": {
    "id": "madenci",
    "name": "Madenci",
    "description": "Emekçi + Kazma aleti + Yeraltı maden çukuru.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "alet",
        "cukur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 96
  },
  "marangoz": {
    "id": "marangoz",
    "name": "Marangoz",
    "description": "Usta insan + Ahşap malzeme + Zanaat aletleri.",
    "tier": 8,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "odun",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "firinci": {
    "id": "firinci",
    "name": "Firinci",
    "description": "Usta insan + Hamur yoğurma + Fırın ateşi.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "hamur",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "ciftci": {
    "id": "ciftci",
    "name": "Ciftci",
    "description": "Toprak insanı + Tarım ekimi + Orak/Çapa aleti.",
    "tier": 7,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "tarim",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 99
  },
  "balikci": {
    "id": "balikci",
    "name": "Balikci",
    "description": "Avcı insan + Balık + Sulara açılan sal.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "balik",
        "sal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "itfaiye": {
    "id": "itfaiye",
    "name": "Itfaiye",
    "description": "Kurtarıcı insan + Tazyikli su + Yangın müdahalesi.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "su",
        "yangin"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 99
  },
  "kuyumcu": {
    "id": "kuyumcu",
    "name": "Kuyumcu",
    "description": "Zanaatkar + Değerli maden + Ocak ateşi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "metal",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 96
  },
  "asci": {
    "id": "asci",
    "name": "Asci",
    "description": "Mutfak ustası + Yemek/Ekmek + Pişirme ateşi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "ekmek",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 96
  },
  "durbun": {
    "id": "durbun",
    "name": "Durbun",
    "description": "İki optik mercek (cam + cam) + Metal çerçeve.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "cam",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 97
  },
  "gunes_paneli": {
    "id": "gunes_paneli",
    "name": "Güneş Paneli",
    "description": "Silikon cam yüzey + Metal iletken + Güneş ışığı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "metal",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "flame",
    "semantic_score": 99
  },
  "ruzgar_turbini": {
    "id": "ruzgar_turbini",
    "name": "Ruzgar Turbini",
    "description": "Dönen rotor + Metal kule + Rüzgar gücü.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tekerlek",
        "metal",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 97
  },
  "lokomotif": {
    "id": "lokomotif",
    "name": "Lokomotif",
    "description": "Buhar motoru + Ağır çelik gövde + Kömür yakıtı.",
    "tier": 10,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buhar_motoru",
        "celik",
        "komur"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "semantic_score": 99
  },
  "ucak": {
    "id": "ucak",
    "name": "Uçak",
    "description": "Kuş aerodinamiği + Çelik gövde + Motor tahriki.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "celik",
        "buhar_motoru"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 97
  },
  "denizalti": {
    "id": "denizalti",
    "name": "Denizaltı",
    "description": "Balık hidrodinamiği + Çelik mukavemet + Cam lumboz.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "celik",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 98
  },
  "helikopter": {
    "id": "helikopter",
    "name": "Helikopter",
    "description": "Gövde aracı + Pervane rüzgarı + Çelik iskelet.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "araba",
        "ruzgar",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 97
  },
  "bilgisayar": {
    "id": "bilgisayar",
    "name": "Bilgisayar",
    "description": "Elektrik devreleri + Silikon cam çip + Metal kasa.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "elektrik",
        "cam",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 97
  },
  "robot": {
    "id": "robot",
    "name": "Robot",
    "description": "Bilgisayar beyni + Metal iskelet + Hareket enerjisi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bilgisayar",
        "metal",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 98
  },
  "roket": {
    "id": "roket",
    "name": "Roket",
    "description": "Çelik gövde + Yüksek ateş itkisi + Tahrik sistemi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "araba",
        "ates",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 97
  },
  "uzay_gemisi": {
    "id": "uzay_gemisi",
    "name": "Uzay Gemisi",
    "description": "Roket tahriki + Çelik zırh + Otonom bilgisayar.",
    "tier": 11,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "roket",
        "celik",
        "bilgisayar"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "semantic_score": 98
  },
  "barut": {
    "id": "barut",
    "name": "Barut",
    "description": "Kömür tozu + Kimyasal potansiyel + Ateşleme.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ea580c",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ea580c",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "komur",
        "enerji",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "solid",
    "semantic_score": 96
  },
  "heykel": {
    "id": "heykel",
    "name": "Heykel",
    "description": "Masif taş + Heykeltıraş aleti + İnsan sanatı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "alet",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 96
  },
  "okyanus": {
    "id": "okyanus",
    "name": "Okyanus",
    "description": "Birleşen devasa açık deniz kütleleri.",
    "tier": 3,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "deniz",
        "deniz",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "semantic_score": 96
  },
  "meteor": {
    "id": "meteor",
    "name": "Meteor",
    "description": "Uzay taşı + Atmosferik sürtünme ateşi + Hava.",
    "tier": 3,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "ates",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "serap": {
    "id": "serap",
    "name": "Serap",
    "description": "Kızgın çöl kumu + Güneş sıcağı + Su yanılsaması.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "col",
        "gunes",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 97
  },
  "anka_kusu": {
    "id": "anka_kusu",
    "name": "Anka Kuşu",
    "description": "Kutsal kuş + Saf ateş + Küllerinden doğuş.",
    "tier": 9,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "ates",
        "kul"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "peri": {
    "id": "peri",
    "name": "Peri",
    "description": "Işıltılı insan formu + Kanatlı hava perisi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "isik",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 97
  },
  "buyu": {
    "id": "buyu",
    "name": "Büyü",
    "description": "İnsan iradesi + Saf enerji + Kadim bilgi zamanı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "enerji",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 96
  },
  "altin": {
    "id": "altin",
    "name": "Altın",
    "description": "Güneş gibi parıldayan en asil değerli maden.",
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
        "metal",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "demir": {
    "id": "demir",
    "name": "Demir",
    "description": "Taşlaşmış sert metal cevheri.",
    "tier": 4,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#e2e8f0",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "bakir": {
    "id": "bakir",
    "name": "Bakır",
    "description": "Kızıl renkli ısı iletkeni metal.",
    "tier": 4,
    "colorPalette": {
      "primary": "#c2410c",
      "secondary": "#fb923c",
      "emissive": "#7c2d12"
    },
    "particles": {
      "type": "spark",
      "color": "#fb923c",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "bronz": {
    "id": "bronz",
    "name": "Bronz",
    "description": "Bakır ve kalay alaşımından doğan antik metal.",
    "tier": 5,
    "colorPalette": {
      "primary": "#c2410c",
      "secondary": "#fb923c",
      "emissive": "#7c2d12"
    },
    "particles": {
      "type": "spark",
      "color": "#fb923c",
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
    "semantic_score": 92
  },
  "elmas": {
    "id": "elmas",
    "name": "Elmas",
    "description": "Kömürün devasa basınçla kristalleşmesi.",
    "tier": 8,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#f0f9ff",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#f0f9ff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "komur",
        "basinc"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "safir": {
    "id": "safir",
    "name": "Safir",
    "description": "Okyanus mavisi asil mücevher taşı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#2563eb",
      "secondary": "#93c5fd",
      "emissive": "#1e3a8a"
    },
    "particles": {
      "type": "spark",
      "color": "#93c5fd",
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
    "semantic_score": 93
  },
  "zumrut": {
    "id": "zumrut",
    "name": "Zümrüt",
    "description": "Doğa yeşili parlak zümrüt taşı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#059669",
      "secondary": "#6ee7b7",
      "emissive": "#064e3b"
    },
    "particles": {
      "type": "spark",
      "color": "#6ee7b7",
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
    "semantic_score": 93
  },
  "kehribar": {
    "id": "kehribar",
    "name": "Kehribar",
    "description": "Ağaç reçinesinin milyon yılda taşlaşması.",
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
        "agac",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "obsidyen": {
    "id": "obsidyen",
    "name": "Obsidyen",
    "description": "Lavın su ile aniden soğuyan volkanik camı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
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
    "semantic_score": 95
  },
  "tuz": {
    "id": "tuz",
    "name": "Tuz",
    "description": "Deniz suyunun buharlaşmasıyla çöken mineral.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "deniz",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "semantic_score": 95
  },
  "tuzlu_su": {
    "id": "tuzlu_su",
    "name": "Tuzlu Su",
    "description": "Tuz ile doymuş mineral sıvısı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
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
    "semantic_score": 95
  },
  "gok": {
    "id": "gok",
    "name": "Gok",
    "description": "Bulutların süzüldüğü geniş kubbe.",
    "tier": 4,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hava",
        "bulut"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "gece": {
    "id": "gece",
    "name": "Gece",
    "description": "Gök kubbenin karanlığa bürünmesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#312e81",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "zaman",
        "gok"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 93
  },
  "ay": {
    "id": "ay",
    "name": "Ay",
    "description": "Gece göğünü aydınlatan uydumuz.",
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
        "tas",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 94
  },
  "yildiz": {
    "id": "yildiz",
    "name": "Yıldız",
    "description": "Gece parıldayan uzak güneşler.",
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
        "gunes",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 95
  },
  "uzay": {
    "id": "uzay",
    "name": "Uzay",
    "description": "Sonsuz ve karanlık kozmik boşluk.",
    "tier": 8,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#312e81",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "gok",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 94
  },
  "karadelik": {
    "id": "karadelik",
    "name": "Karadelik",
    "description": "Çöken devasa yıldızın sonsuz kütleçekimi.",
    "tier": 9,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#312e81",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yildiz",
        "basinc"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 95
  },
  "astronot": {
    "id": "astronot",
    "name": "Astronot",
    "description": "Uzay boşluğuna çıkan insan kaşifi.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "uzay"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "tohum": {
    "id": "tohum",
    "name": "Tohum",
    "description": "Toprağa ekilmeye hazır yaşam özü.",
    "tier": 6,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#4ade80",
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
    "semantic_score": 95
  },
  "bakteri": {
    "id": "bakteri",
    "name": "Bakteri",
    "description": "Balçıkta üreyen mikroskobik canlı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "virus": {
    "id": "virus",
    "name": "Virüs",
    "description": "Biyolojik mikroskobik yapı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bakteri",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "semantic_score": 92
  },
  "bocek": {
    "id": "bocek",
    "name": "Bocek",
    "description": "Bitkilerle beslenen küçük eklembacaklı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "ari": {
    "id": "ari",
    "name": "Arı",
    "description": "Çiçeklerden nektar toplayan çalışkan arı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#f59e0b",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#f59e0b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bocek",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "semantic_score": 95
  },
  "bal": {
    "id": "bal",
    "name": "Bal",
    "description": "Arının çiçek özlerinden yaptığı tatlı şifa.",
    "tier": 8,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
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
    "semantic_score": 95
  },
  "kelebek": {
    "id": "kelebek",
    "name": "Kelebek",
    "description": "Kanatlanıp süzülen renkli böcek.",
    "tier": 7,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bocek",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "semantic_score": 93
  },
  "karinca": {
    "id": "karinca",
    "name": "Karınca",
    "description": "Toprak altında koloniler kuran emektar.",
    "tier": 7,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bocek",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "semantic_score": 94
  },
  "ip": {
    "id": "ip",
    "name": "Ip",
    "description": "Bitki liflerinin eğrilmesiyle oluşan halat/ip.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "kumas": {
    "id": "kumas",
    "name": "Kumaş",
    "description": "İplerin dokunmasıyla oluşan giysi tabanı.",
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
        "ip",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 94
  },
  "giysi": {
    "id": "giysi",
    "name": "Giysi",
    "description": "İnsanı hava koşullarından koruyan elbise.",
    "tier": 8,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "orumcek": {
    "id": "orumcek",
    "name": "Örümcek",
    "description": "İpek ağlar ören çok bacaklı avcı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bocek",
        "ip"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "semantic_score": 94
  },
  "surungen": {
    "id": "surungen",
    "name": "Surungen",
    "description": "Çöl kumlarında pullarıyla sürünen canlı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "col"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "timsah": {
    "id": "timsah",
    "name": "Timsah",
    "description": "Nehir sularında pusuya yatan dev zırhlı avcı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#84cc16",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "surungen",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "semantic_score": 95
  },
  "kurbaga": {
    "id": "kurbaga",
    "name": "Kurbağa",
    "description": "Göl kenarında zıplayan amfibi canlı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "surungen",
        "gol"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "kedi": {
    "id": "kedi",
    "name": "Kedi",
    "description": "Evde yaşayan uysal ve sevimli dost.",
    "tier": 9,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "ev"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "semantic_score": 94
  },
  "kurt": {
    "id": "kurt",
    "name": "Kurt",
    "description": "Ormanlarda sürü halinde gezen asil yırtıcı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
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
    "semantic_score": 95
  },
  "tilki": {
    "id": "tilki",
    "name": "Tilki",
    "description": "Kurnaz ve çevik kızıl orman avcısı.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kurt",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 92
  },
  "ayi": {
    "id": "ayi",
    "name": "Ayı",
    "description": "Dağlarda ve mağaralarda yaşayan dev memeli.",
    "tier": 9,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "semantic_score": 94
  },
  "aslan": {
    "id": "aslan",
    "name": "Aslan",
    "description": "Savana ve çölün heybetli ormanlar kralı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#f59e0b",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#f59e0b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "col"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "semantic_score": 95
  },
  "kartal": {
    "id": "kartal",
    "name": "Kartal",
    "description": "Yüksek zirvelerde yuva yapan keskin gözlü avcı.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
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
    "semantic_score": 95
  },
  "baykus": {
    "id": "baykus",
    "name": "Baykuş",
    "description": "Geceleri sessizce uçan bilge kuş.",
    "tier": 8,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "tavuk": {
    "id": "tavuk",
    "name": "Tavuk",
    "description": "Çiftliklerde yumurtlayan evcil kuş.",
    "tier": 7,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "tarim"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "semantic_score": 94
  },
  "yumurta": {
    "id": "yumurta",
    "name": "Yumurta",
    "description": "Yeni bir yaşamın filizlendiği besin kabuğu.",
    "tier": 8,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tavuk",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "yunus": {
    "id": "yunus",
    "name": "Yunus",
    "description": "İnsanlarla dostluk kuran zeki deniz memelisi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "semantic_score": 94
  },
  "kan": {
    "id": "kan",
    "name": "Kan",
    "description": "Kılıç darbesiyle akan kırmızı hayat sıvısı.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "kilic"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "kopekbaligi": {
    "id": "kopekbaligi",
    "name": "Köpekbalığı",
    "description": "Kan kokusunu kilometrelerce öteden alan avcı.",
    "tier": 11,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "kan"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "semantic_score": 95
  },
  "balina": {
    "id": "balina",
    "name": "Balina",
    "description": "Okyanusların en büyük devasa memelisi.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
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
    "semantic_score": 94
  },
  "manyetizma": {
    "id": "manyetizma",
    "name": "Manyetizma",
    "description": "Elektrik akımıyla oluşan manyetik çekim.",
    "tier": 5,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
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
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "asit": {
    "id": "asit",
    "name": "Asit",
    "description": "Aşındırıcı ve reaktif kimyasal sıvı.",
    "tier": 3,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 92
  },
  "lazer": {
    "id": "lazer",
    "name": "Lazer",
    "description": "Yoğunlaştırılmış tek dalga boylu ışık huzmesi.",
    "tier": 4,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "isik",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 95
  },
  "mercek": {
    "id": "mercek",
    "name": "Mercek",
    "description": "Işığı kıran optik cam mercek.",
    "tier": 6,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "mikroskop": {
    "id": "mikroskop",
    "name": "Mikroskop",
    "description": "Gözle görülmeyen mikro dünyayı büyüten alet.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "mercek",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 95
  },
  "radyo": {
    "id": "radyo",
    "name": "Radyo",
    "description": "Elektromanyetik hava dalgalarıyla ses yayını.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
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
    "semantic_score": 94
  },
  "telgraf": {
    "id": "telgraf",
    "name": "Telgraf",
    "description": "Teller üzerinden mors alfabesiyle iletişim.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "elektrik",
        "ip"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 93
  },
  "telefon": {
    "id": "telefon",
    "name": "Telefon",
    "description": "İnsan sesini mesafeler ötesine ileten cihaz.",
    "tier": 8,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "telgraf",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 95
  },
  "televizyon": {
    "id": "televizyon",
    "name": "Televizyon",
    "description": "Görüntü ve sesi cam ekranda birleştiren cihaz.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "radyo",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "semantic_score": 94
  },
  "kamera": {
    "id": "kamera",
    "name": "Kamera",
    "description": "Işığı hapsedip anı donduran fotoğraf makinesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
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
    "semantic_score": 95
  },
  "kagit": {
    "id": "kagit",
    "name": "Kağıt",
    "description": "Ahşap hamurunun preslenmesiyle oluşan sayfa.",
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
        "basinc"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 95
  },
  "fotograf": {
    "id": "fotograf",
    "name": "Fotoğraf",
    "description": "Kameranın kağıda bastığı ölümsüz kare.",
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
        "kamera",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "semantic_score": 95
  },
  "kitap": {
    "id": "kitap",
    "name": "Kitap",
    "description": "İnsan aklının ve hikayelerinin toplandığı eser.",
    "tier": 9,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kagit",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 95
  },
  "gazete": {
    "id": "gazete",
    "name": "Gazete",
    "description": "Şehir haberlerini yayan günlük baskı.",
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
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 93
  },
  "mikrocip": {
    "id": "mikrocip",
    "name": "Mikroçip",
    "description": "Milyonlarca transistör içeren minik beyin.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bilgisayar",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "semantic_score": 95
  },
  "internet": {
    "id": "internet",
    "name": "Internet",
    "description": "Tüm bilgisayarları birbirine bağlayan dev ağ.",
    "tier": 7,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bilgisayar",
        "bilgisayar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "yapay_zeka": {
    "id": "yapay_zeka",
    "name": "Yapay Zeka",
    "description": "Öğrenen ve düşünen dijital zeka.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bilgisayar",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "semantic_score": 94
  },
  "bisiklet": {
    "id": "bisiklet",
    "name": "Bisiklet",
    "description": "İki tekerlekli pedalsız/pedallı taşıt.",
    "tier": 9,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tekerlek",
        "tekerlek"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "semantic_score": 94
  },
  "motosiklet": {
    "id": "motosiklet",
    "name": "Motosiklet",
    "description": "Motor gücüyle çalışan iki tekerlekli canavar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bisiklet",
        "buhar_motoru"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 94
  },
  "zeplin": {
    "id": "zeplin",
    "name": "Zeplin",
    "description": "Hafif gazla gökyüzünde yüzen dev hava gemisi.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hava",
        "kumas"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "semantic_score": 92
  },
  "sicak_hava_balonu": {
    "id": "sicak_hava_balonu",
    "name": "Sıcak Hava Balonu",
    "description": "Isınan havanın kaldırma kuvvetiyle uçan balon.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#f97316",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "zeplin",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame",
    "semantic_score": 93
  },
  "fayton": {
    "id": "fayton",
    "name": "Fayton",
    "description": "Atların çektiği nostaljik yolcu arabası.",
    "tier": 11,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
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
    "semantic_score": 95
  },
  "kamyon": {
    "id": "kamyon",
    "name": "Kamyon",
    "description": "Ağır yükleri taşıyan çelik gövdeli dev araç.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "araba",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 94
  },
  "top": {
    "id": "top",
    "name": "Top",
    "description": "Barut patlamasıyla gülle fırlatan ağır silah.",
    "tier": 9,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ef4444",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "barut"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "semantic_score": 95
  },
  "yay": {
    "id": "yay",
    "name": "Yay",
    "description": "Esnek ahşap ve gergin ipten yapılan yay.",
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
        "ip"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "semantic_score": 95
  },
  "zirh": {
    "id": "zirh",
    "name": "Zırh",
    "description": "Vücudu ölümcül darbelerden koruyan çelik zırh.",
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
        "celik",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "semantic_score": 95
  },
  "ses": {
    "id": "ses",
    "name": "Ses",
    "description": "Hava titreşimlerinin yarattığı akustik dalga.",
    "tier": 3,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hava",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "muzik": {
    "id": "muzik",
    "name": "Müzik",
    "description": "İnsanın notalara döktüğü estetik melodi.",
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
        "ses",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "semantic_score": 95
  },
  "deri": {
    "id": "deri",
    "name": "Deri",
    "description": "Hayvan postunun işlenmesiyle elde edilen dayanıklı deri.",
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
        "hayvan",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "semantic_score": 94
  },
  "davul": {
    "id": "davul",
    "name": "Davul",
    "description": "Gergin deriye vurularak çalınan ritim çalgısı.",
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
        "muzik",
        "deri"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "semantic_score": 94
  },
  "gitar": {
    "id": "gitar",
    "name": "Gitar",
    "description": "Ahşap gövdeli ve telli enstrüman.",
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
        "muzik",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 95
  },
  "piyano": {
    "id": "piyano",
    "name": "Piyano",
    "description": "Çelik telleri ve tuşlarıyla polifonik enstrüman.",
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
        "muzik",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "fabric",
    "semantic_score": 94
  },
  "boya": {
    "id": "boya",
    "name": "Boya",
    "description": "Renkli çiçek pigmentlerinin suyla çözünmesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
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
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "tablo": {
    "id": "tablo",
    "name": "Tablo",
    "description": "Tuval kumaşı üzerine boyayla yapılan resim.",
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
        "boya",
        "kumas"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 94
  },
  "sanat": {
    "id": "sanat",
    "name": "Sanat",
    "description": "İnsan ruhunun renklere ve çizgilere yansıması.",
    "tier": 8,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "boya"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "tiyatro": {
    "id": "tiyatro",
    "name": "Tiyatro",
    "description": "Sahne sanatlarının icra edildiği kültürel mekan.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "sanat"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "semantic_score": 94
  },
  "sinema": {
    "id": "sinema",
    "name": "Sinema",
    "description": "Kamera ile kaydedilen görsel sinema sanatı.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tiyatro",
        "kamera"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "semantic_score": 94
  },
  "para": {
    "id": "para",
    "name": "Para",
    "description": "Ticaretin ortak değişim aracı madeni sikke.",
    "tier": 6,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "altin",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "kagit_para": {
    "id": "kagit_para",
    "name": "Kağıt Para",
    "description": "Devlet güvenceli basılı kağıt banknot.",
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
        "para",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "fabric",
    "semantic_score": 94
  },
  "bugday": {
    "id": "bugday",
    "name": "Buğday",
    "description": "Toprağın bereketi altın sarısı tahıl başağı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tarim",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "pirinc": {
    "id": "pirinc",
    "name": "Pirinç",
    "description": "Su dolu tarlalarda yetişen temel besin kaynağı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tarim",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "misir": {
    "id": "misir",
    "name": "Mısır",
    "description": "Güneş altında koçan veren sarı mısır.",
    "tier": 7,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tarim",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "semantic_score": 94
  },
  "zeytin": {
    "id": "zeytin",
    "name": "Zeytin",
    "description": "Akdeniz güneşinde olgunlaşan barış simgesi ağaç meyvesi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#4ade80",
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
    "archetype3d": "food",
    "semantic_score": 95
  },
  "zeytinyagi": {
    "id": "zeytinyagi",
    "name": "Zeytinyağı",
    "description": "Zeytinlerin soğuk sıkımıyla elde edilen altın sıvı.",
    "tier": 8,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#4ade80",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "zeytin",
        "basinc"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 95
  },
  "elma": {
    "id": "elma",
    "name": "Elma",
    "description": "Ağacın dalından sarkan tatlı kırmızı elma.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "meyve"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "semantic_score": 95
  },
  "limon": {
    "id": "limon",
    "name": "Limon",
    "description": "Ekşi asidik şifa kaynağı sarı meyve.",
    "tier": 7,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "asit"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 94
  },
  "karpuz": {
    "id": "karpuz",
    "name": "Karpuz",
    "description": "Yazın serinleten bol sulu iri meyve.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "meyve",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "semantic_score": 95
  },
  "cilek": {
    "id": "cilek",
    "name": "Çilek",
    "description": "Toprağa yakın yetişen mis kokulu kırmızı meyve.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#f87171",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "meyve",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 94
  },
  "findik": {
    "id": "findik",
    "name": "Fındık",
    "description": "Sert kabuklu besleyici ağaç yemişi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
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
    "archetype3d": "food",
    "semantic_score": 93
  },
  "seker": {
    "id": "seker",
    "name": "Şeker",
    "description": "Şeker kamışının kaynatılıp kristalize edilmesi.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
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
    "semantic_score": 94
  },
  "bira": {
    "id": "bira",
    "name": "Bira",
    "description": "Malt arpa ve buğdayın mayalanmasıyla oluşan içecek.",
    "tier": 8,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#fde047",
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
    "semantic_score": 94
  },
  "sirke": {
    "id": "sirke",
    "name": "Sirke",
    "description": "Şarabın asetik aside dönüşmesiyle elde edilen sirke.",
    "tier": 9,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sarap",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "yogurt": {
    "id": "yogurt",
    "name": "Yoğurt",
    "description": "Faydalı bakterilerle mayalanan yoğun kıvamlı süt ürünü.",
    "tier": 11,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sut",
        "bakteri"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "food",
    "semantic_score": 95
  },
  "buyucu": {
    "id": "buyucu",
    "name": "Buyucu",
    "description": "Büyü ilmini öğrenmiş kadim alim.",
    "tier": 8,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "buyu"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "asa": {
    "id": "asa",
    "name": "Asa",
    "description": "Büyü enerjisini odaklayan sihirli asa.",
    "tier": 8,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "buyu"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "zehir": {
    "id": "zehir",
    "name": "Zehir",
    "description": "Zehirli mantar ve bitki özlerinden elde edilen toksin.",
    "tier": 6,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "mantar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "pegasus": {
    "id": "pegasus",
    "name": "Pegasus",
    "description": "Gökyüzünde süzülen kanatlı asil efsane atı.",
    "tier": 11,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "at",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "fauna",
    "semantic_score": 95
  },
  "kemik": {
    "id": "kemik",
    "name": "Kemik",
    "description": "Zamanla etten arınan sert iskelet parçası.",
    "tier": 9,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "boynuz": {
    "id": "boynuz",
    "name": "Boynuz",
    "description": "Hayvanın başındaki sert savunma boynuzu.",
    "tier": 10,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
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
    "semantic_score": 93
  },
  "iskelet": {
    "id": "iskelet",
    "name": "Iskelet",
    "description": "Kemiklerin bir araya geldiği anatomik iskelet.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kemik",
        "kemik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "zombi": {
    "id": "zombi",
    "name": "Zombi",
    "description": "Zehirle iradesini yitirmiş yaşayan ölü.",
    "tier": 7,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "zehir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "semantic_score": 94
  },
  "hayalet": {
    "id": "hayalet",
    "name": "Hayalet",
    "description": "Gece karanlığında süzülen ruhani varlık.",
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
        "insan",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "semantic_score": 93
  },
  "centaur": {
    "id": "centaur",
    "name": "Kentaur",
    "description": "Yarısı insan yarısı at kadim yaratık.",
    "tier": 11,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "at"
      ]
    },
    "icon": "✨",
    "category": "Mitoloji & Yaratık",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "grifon": {
    "id": "grifon",
    "name": "Grifon",
    "description": "Kartal başlı ve aslan gövdeli efsanevi bekçi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kartal",
        "aslan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "semantic_score": 95
  },
  "anit": {
    "id": "anit",
    "name": "Anıt",
    "description": "Geçmiş kahramanları anmak için dikilen abide.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "heykel",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "semantic_score": 94
  },
  "isci": {
    "id": "isci",
    "name": "Isci",
    "description": "Aletiyle üretime güç katan emektar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "cikolata": {
    "id": "cikolata",
    "name": "Çikolata",
    "description": "Şeker + Süt + Kakao ateşi.",
    "tier": 11,
    "colorPalette": {
      "primary": "#3b1a08",
      "secondary": "#78350f",
      "emissive": "#1c0a02"
    },
    "particles": {
      "type": "spark",
      "color": "#78350f",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "seker",
        "sut",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 98
  },
  "kahve": {
    "id": "kahve",
    "name": "Kahve",
    "description": "Kahve tohumu/çekirdeği + Su + Ateş.",
    "tier": 7,
    "colorPalette": {
      "primary": "#451a03",
      "secondary": "#92400e",
      "emissive": "#260c02"
    },
    "particles": {
      "type": "spark",
      "color": "#92400e",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tohum",
        "su",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 97
  },
  "saray": {
    "id": "saray",
    "name": "Saray",
    "description": "Görkemli kale yapısı + Altın ihtişamı + Başkent şehri.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kale",
        "altin",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "semantic_score": 97
  },
  "tapinak": {
    "id": "tapinak",
    "name": "Tapınak",
    "description": "Kutsal mekan + Büyü enerjisi + Kadim taş mimarisi.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#fbbf24",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "buyu",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "semantic_score": 96
  },
  "muze": {
    "id": "muze",
    "name": "Müze",
    "description": "Kültür binası + Sanat heykelleri + Tarihi zaman.",
    "tier": 7,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "heykel",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "semantic_score": 96
  },
  "fabrika": {
    "id": "fabrika",
    "name": "Fabrika",
    "description": "Büyük tesis + Buharlı makine gücü + Emekçi işçi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "buhar_motoru",
        "isci"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "banka": {
    "id": "banka",
    "name": "Banka",
    "description": "Finans binası + Para + Şehir ticareti.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "para",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "semantic_score": 97
  },
  "teleskop": {
    "id": "teleskop",
    "name": "Teleskop",
    "description": "Büyüteç mercek + Optik cam + Gökyüzü gözlemi.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#38bdf8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "mercek",
        "cam",
        "gok"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "semantic_score": 97
  },
  "tank": {
    "id": "tank",
    "name": "Tank",
    "description": "Zırhlı araç + Ağır çelik + Ateşli top.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "araba",
        "celik",
        "top"
      ]
    },
    "icon": "✨",
    "category": "Askeri & Araç",
    "archetype3d": "mineral",
    "semantic_score": 97
  },
  "ejderha": {
    "id": "ejderha",
    "name": "Ejderha",
    "description": "Kadim sürüngen + Alev püskürtme + Kanatlı hava.",
    "tier": 7,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#84cc16",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "surungen",
        "ates",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "semantic_score": 98
  },
  "sfenks": {
    "id": "sfenks",
    "name": "Sfenks",
    "description": "Aslan gövdesi + İnsan başı + Kadim çöl bekçisi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#d97706",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "aslan",
        "insan",
        "col"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "semantic_score": 97
  },
  "kurtadam": {
    "id": "kurtadam",
    "name": "Kurtadam",
    "description": "İnsan + Vahşi kurt + Dolunay etkisi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "kurt",
        "ay"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 98
  },
  "vampir": {
    "id": "vampir",
    "name": "Vampir",
    "description": "Ölümsüz insan + Kan arzusu + Gece karanlığı.",
    "tier": 11,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "kan",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "magic",
    "semantic_score": 97
  },
  "golem": {
    "id": "golem",
    "name": "Golem",
    "description": "Yoğrulmuş balçık + Büyü tılsımı + Hayat verme.",
    "tier": 8,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "camur",
        "buyu",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 98
  },
  "iksir": {
    "id": "iksir",
    "name": "Iksir",
    "description": "Saf su bazı + Simyacı büyüsü + Şifalı bitki özü.",
    "tier": 8,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "buyu",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 97
  },
  "krallik": {
    "id": "krallik",
    "name": "Krallık",
    "description": "Şehirler birliği + Şövalye ordusu + Hükümdar sarayı.",
    "tier": 11,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sehir",
        "sovalye",
        "saray"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "semantic_score": 98
  },
  "gumus": {
    "id": "gumus",
    "name": "Gümüş",
    "description": "Ay ışığı zarafetinde beyaz parlak maden.",
    "tier": 9,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#e2e8f0",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "ay"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "galaksi": {
    "id": "galaksi",
    "name": "Galaksi",
    "description": "Milyarlarca yıldızın oluşturduğu kozmik sarmal.",
    "tier": 9,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#c084fc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yildiz",
        "uzay"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 95
  },
  "yilan": {
    "id": "yilan",
    "name": "Yılan",
    "description": "Zehirli dişleriyle avlanan pullu sürüngen.",
    "tier": 7,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#84cc16",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "surungen",
        "zehir"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "semantic_score": 95
  },
  "borsa": {
    "id": "borsa",
    "name": "Borsa",
    "description": "Hisselerin ve emtiaların alınıp satıldığı piyasa.",
    "tier": 9,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#94a3b8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "banka",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 93
  },
  "zehir_iksiri": {
    "id": "zehir_iksiri",
    "name": "Zehir Iksiri",
    "description": "Düşmanı zehirleyen sinsi sıvı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "iksir",
        "zehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 94
  },
  "tekboynuz": {
    "id": "tekboynuz",
    "name": "Tekboynuz",
    "description": "Alnında sihirli boynuz taşıyan saf tekboynuz.",
    "tier": 11,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "at",
        "boynuz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  },
  "imparatorluk": {
    "id": "imparatorluk",
    "name": "Imparatorluk",
    "description": "Birden fazla krallığı yöneten büyük devlet.",
    "tier": 12,
    "colorPalette": {
      "primary": "#3b82f6",
      "secondary": "#60a5fa",
      "emissive": "#1d4ed8"
    },
    "particles": {
      "type": "spark",
      "color": "#60a5fa",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "krallik",
        "krallik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 95
  }
};

export const ITEM_DEFINITIONS = CLASSIC_ITEM_DEFINITIONS;

export function getItemDefinitionsForMode(mode = 'classic') {
  return mode === 'classic' ? CLASSIC_ITEM_DEFINITIONS : GRANDMASTER_ITEM_DEFINITIONS;
}

export function getCanonicalId(id) {
  if (!id) return id;
  return id.toLowerCase().trim();
}
