/**
 * Multi-Mode Item Definitions (Filtered by Semantic Context Scoring Engine)
 * Mode 1 (Classic): 92 items (Strict 2-input DAG)
 * Mode 2 (Grandmaster): 443 items (270 original + 173 user-approved recipes)
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
  },
  "anchor": {
    "id": "anchor",
    "name": "Çapa",
    "description": "Çapa, Metal + Deniz birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#4b94c0",
      "secondary": "#82c9ed",
      "emissive": "#255f85"
    },
    "particles": {
      "type": "spark",
      "color": "#82c9ed",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "beaver": {
    "id": "beaver",
    "name": "Kunduz",
    "description": "Kunduz, Hayvan + Ağaç birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#656a23",
      "secondary": "#c2e3ab",
      "emissive": "#474d22"
    },
    "particles": {
      "type": "spark",
      "color": "#c2e3ab",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "agac"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "birdhouse": {
    "id": "birdhouse",
    "name": "Kuş Evi",
    "description": "Kuş Evi, Kuş + Odun birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#c65a12",
      "secondary": "#fedf9a",
      "emissive": "#9a400f"
    },
    "particles": {
      "type": "spark",
      "color": "#fedf9a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "boar": {
    "id": "boar",
    "name": "Yaban Domuzu",
    "description": "Yaban Domuzu, Domuz + Orman birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#856c75",
      "secondary": "#a3d7b4",
      "emissive": "#783d52"
    },
    "particles": {
      "type": "spark",
      "color": "#a3d7b4",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "domuz",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "branch": {
    "id": "branch",
    "name": "Dal",
    "description": "Dal, Ağaç + Balta birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3d7a64",
      "secondary": "#8c985d",
      "emissive": "#255345"
    },
    "particles": {
      "type": "spark",
      "color": "#8c985d",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "balta"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "cacao": {
    "id": "cacao",
    "name": "Kakao",
    "description": "Kakao, Bitki + Tohum birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#1cb454",
      "secondary": "#68e796",
      "emissive": "#156a35"
    },
    "particles": {
      "type": "spark",
      "color": "#68e796",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "tohum"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "candy": {
    "id": "candy",
    "name": "Şekerleme",
    "description": "Şekerleme, Şeker + Meyve birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#e45e25",
      "secondary": "#fcb265",
      "emissive": "#992916"
    },
    "particles": {
      "type": "spark",
      "color": "#fcb265",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "seker",
        "meyve"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 100
  },
  "caramel": {
    "id": "caramel",
    "name": "Karamel",
    "description": "Karamel, Şeker + Ateş birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#e45e25",
      "secondary": "#fa991d",
      "emissive": "#992916"
    },
    "particles": {
      "type": "spark",
      "color": "#fa991d",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "seker",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 100
  },
  "cardboard": {
    "id": "cardboard",
    "name": "Karton",
    "description": "Karton, Kağıt + Odun birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#b65c0a",
      "secondary": "#fedf9a",
      "emissive": "#753a11"
    },
    "particles": {
      "type": "spark",
      "color": "#fedf9a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kagit",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "coconut": {
    "id": "coconut",
    "name": "Hindistan Cevizi",
    "description": "Hindistan Cevizi, Ada + Ağaç birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#139d5f",
      "secondary": "#44baba",
      "emissive": "#0d6f46"
    },
    "particles": {
      "type": "spark",
      "color": "#44baba",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ada",
        "agac"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "crystal_ball": {
    "id": "crystal_ball",
    "name": "Crystal Ball",
    "description": "Crystal Ball, Cam + Büyü birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#5a7cf3",
      "secondary": "#d0bbfd",
      "emissive": "#2751ae"
    },
    "particles": {
      "type": "spark",
      "color": "#d0bbfd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "buyu"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "dinozor": {
    "id": "dinozor",
    "name": "Dinozor",
    "description": "Dinozor, Taş + Zaman + Yumurta birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#867b5e",
      "secondary": "#b7b792",
      "emissive": "#473d35"
    },
    "particles": {
      "type": "spark",
      "color": "#b7b792",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "tas",
        "zaman",
        "yumurta"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "el_arabasi": {
    "id": "el_arabasi",
    "name": "El Arabası",
    "description": "El Arabası, Tekerlek + Odun + Alet birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#835138",
      "secondary": "#dad099",
      "emissive": "#5c4028"
    },
    "particles": {
      "type": "spark",
      "color": "#dad099",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "tekerlek",
        "odun",
        "alet"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "fireworks": {
    "id": "fireworks",
    "name": "Havai Fişek",
    "description": "Havai Fişek, Barut + Kağıt + Ateş birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#e14b25",
      "secondary": "#f68b44",
      "emissive": "#902518"
    },
    "particles": {
      "type": "spark",
      "color": "#f68b44",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "barut",
        "kagit",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "solid",
    "semantic_score": 100
  },
  "flying_fish": {
    "id": "flying_fish",
    "name": "Uçan Balık",
    "description": "Uçan Balık, Balık + Hava birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#1fbae6",
      "secondary": "#a4edfc",
      "emissive": "#058bbd"
    },
    "particles": {
      "type": "spark",
      "color": "#a4edfc",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "fountain": {
    "id": "fountain",
    "name": "Çeşme",
    "description": "Çeşme, Su + Taş birleşiminden elde edilir.",
    "tier": 3,
    "colorPalette": {
      "primary": "#337ca9",
      "secondary": "#66b0d8",
      "emissive": "#1b557b"
    },
    "particles": {
      "type": "spark",
      "color": "#66b0d8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "fridge": {
    "id": "fridge",
    "name": "Buzdolabı",
    "description": "Buzdolabı, Elektrik + Buz birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#3aa0f7",
      "secondary": "#badcfe",
      "emissive": "#1069d0"
    },
    "particles": {
      "type": "spark",
      "color": "#badcfe",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "elektrik",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "girdap": {
    "id": "girdap",
    "name": "Girdap",
    "description": "Girdap, Deniz + Rüzgâr + Su birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#1497d7",
      "secondary": "#70cffa",
      "emissive": "#0372ae"
    },
    "particles": {
      "type": "spark",
      "color": "#70cffa",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "deniz",
        "ruzgar",
        "su"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "gunes_saati": {
    "id": "gunes_saati",
    "name": "Güneş Saati",
    "description": "Güneş Saati, Güneş + Taş birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#ad894b",
      "secondary": "#c8b16e",
      "emissive": "#744a2f"
    },
    "particles": {
      "type": "spark",
      "color": "#c8b16e",
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
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "igloo": {
    "id": "igloo",
    "name": "İglo",
    "description": "İglo, Kar + Ev birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d3a481",
      "secondary": "#fef3c5",
      "emissive": "#a28578"
    },
    "particles": {
      "type": "spark",
      "color": "#fef3c5",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kar",
        "ev"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "incubator": {
    "id": "incubator",
    "name": "Kuluçka Makinesi",
    "description": "Kuluçka Makinesi, Yumurta + Elektrik birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#507bc1",
      "secondary": "#94b4db",
      "emissive": "#1e3c8a"
    },
    "particles": {
      "type": "spark",
      "color": "#94b4db",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yumurta",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kaktus": {
    "id": "kaktus",
    "name": "Kaktüs",
    "description": "Kaktüs, Çöl + Bitki birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#7e9e32",
      "secondary": "#c2e87a",
      "emissive": "#656a23"
    },
    "particles": {
      "type": "spark",
      "color": "#c2e87a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "col",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "kano": {
    "id": "kano",
    "name": "Kano",
    "description": "Kano, Odun + Deniz birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#4a626b",
      "secondary": "#9bd2c1",
      "emissive": "#3a545a"
    },
    "particles": {
      "type": "spark",
      "color": "#9bd2c1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "kasaba": {
    "id": "kasaba",
    "name": "Kasaba",
    "description": "Kasaba, Ev + İnsan birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d5790a",
      "secondary": "#fde68a",
      "emissive": "#96440c"
    },
    "particles": {
      "type": "spark",
      "color": "#fde68a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kasirga": {
    "id": "kasirga",
    "name": "Kasırga",
    "description": "Kasırga, Rüzgâr + Deniz + Yağmur birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#1497d7",
      "secondary": "#70cffa",
      "emissive": "#0372ae"
    },
    "particles": {
      "type": "spark",
      "color": "#70cffa",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "ruzgar",
        "deniz",
        "yagmur"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "kum_saati": {
    "id": "kum_saati",
    "name": "Kum Saati",
    "description": "Kum Saati, Zaman + Cam + Kum birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#a4a957",
      "secondary": "#f4eb9a",
      "emissive": "#707448"
    },
    "particles": {
      "type": "spark",
      "color": "#f4eb9a",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "zaman",
        "cam",
        "kum"
      ]
    ],
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "kurek": {
    "id": "kurek",
    "name": "Kürek",
    "description": "Kürek, Odun + Metal + Taş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#837270",
      "secondary": "#c9cab6",
      "emissive": "#4e4745"
    },
    "particles": {
      "type": "spark",
      "color": "#c9cab6",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "metal",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "mancinik": {
    "id": "mancinik",
    "name": "Mancınık",
    "description": "Mancınık, Odun + Ip + Taş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#666785",
      "secondary": "#a6babf",
      "emissive": "#40456a"
    },
    "particles": {
      "type": "spark",
      "color": "#a6babf",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "ip",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "nilufer": {
    "id": "nilufer",
    "name": "Nilüfer",
    "description": "Nilüfer, Çiçek + Göl birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#7766b0",
      "secondary": "#9ac6f0",
      "emissive": "#61417f"
    },
    "particles": {
      "type": "spark",
      "color": "#9ac6f0",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cicek",
        "gol"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "parachute": {
    "id": "parachute",
    "name": "Paraşüt",
    "description": "Paraşüt, Kumaş + Ip + Hava birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#6f92a7",
      "secondary": "#bfcfe1",
      "emissive": "#32588f"
    },
    "particles": {
      "type": "spark",
      "color": "#bfcfe1",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "kumas",
        "ip",
        "hava"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "perfume": {
    "id": "perfume",
    "name": "Parfüm",
    "description": "Parfüm, Çiçek + Zeytinyağı birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#81646b",
      "secondary": "#a3d7b4",
      "emissive": "#693645"
    },
    "particles": {
      "type": "spark",
      "color": "#a3d7b4",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cicek",
        "zeytinyagi"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "pirate": {
    "id": "pirate",
    "name": "Korsan",
    "description": "Korsan, İnsan + Yelkenli birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#7c9169",
      "secondary": "#fef3c5",
      "emissive": "#5c5e55"
    },
    "particles": {
      "type": "spark",
      "color": "#fef3c5",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "yelkenli"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "plankton": {
    "id": "plankton",
    "name": "Plankton",
    "description": "Plankton, Deniz + Yaşam birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#12a593",
      "secondary": "#5fd6d2",
      "emissive": "#0c756f"
    },
    "particles": {
      "type": "spark",
      "color": "#5fd6d2",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "deniz",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "prizma": {
    "id": "prizma",
    "name": "Prizma",
    "description": "Prizma, Cam + Işık birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#99c587",
      "secondary": "#eff1c4",
      "emissive": "#668766"
    },
    "particles": {
      "type": "spark",
      "color": "#eff1c4",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "recel": {
    "id": "recel",
    "name": "Reçel",
    "description": "Reçel, Meyve + Su + Ateş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#a05970",
      "secondary": "#ba9c91",
      "emissive": "#7c3648"
    },
    "particles": {
      "type": "spark",
      "color": "#ba9c91",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "meyve",
        "su",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "reindeer": {
    "id": "reindeer",
    "name": "Ren Geyiği",
    "description": "Ren Geyiği, Hayvan + Kar birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d3a481",
      "secondary": "#ffebd5",
      "emissive": "#a28578"
    },
    "particles": {
      "type": "spark",
      "color": "#ffebd5",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "kar"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "scarecrow": {
    "id": "scarecrow",
    "name": "Korkuluk",
    "description": "Korkuluk, Odun + Giysi birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#676182",
      "secondary": "#afc6c2",
      "emissive": "#474775"
    },
    "particles": {
      "type": "spark",
      "color": "#afc6c2",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "giysi"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "scuba": {
    "id": "scuba",
    "name": "Dalış Takımı",
    "description": "Dalış Takımı, İnsan + Su + Hava birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#65a099",
      "secondary": "#b2dcd5",
      "emissive": "#3e6b7b"
    },
    "particles": {
      "type": "spark",
      "color": "#b2dcd5",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "insan",
        "su",
        "hava"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "snowman": {
    "id": "snowman",
    "name": "Kardan Adam",
    "description": "Kardan Adam, Kar + Odun + İnsan birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d39c5b",
      "secondary": "#feeeb1",
      "emissive": "#a57854"
    },
    "particles": {
      "type": "spark",
      "color": "#feeeb1",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "kar",
        "odun",
        "insan"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "soap": {
    "id": "soap",
    "name": "Sabun",
    "description": "Sabun, Zeytinyağı + Kül birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#3d7a64",
      "secondary": "#6fc19c",
      "emissive": "#244a41"
    },
    "particles": {
      "type": "spark",
      "color": "#6fc19c",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "zeytinyagi",
        "kul"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "semantic_score": 100
  },
  "sosis": {
    "id": "sosis",
    "name": "Sosis",
    "description": "Sosis, Hayvan + Tuz + Ateş birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d45a1c",
      "secondary": "#fbae4c",
      "emissive": "#8e2d13"
    },
    "particles": {
      "type": "spark",
      "color": "#fbae4c",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "hayvan",
        "tuz",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "sunflower": {
    "id": "sunflower",
    "name": "Ayçiçeği",
    "description": "Ayçiçeği, Güneş + Çiçek birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#f17352",
      "secondary": "#fbc786",
      "emissive": "#b93633"
    },
    "particles": {
      "type": "spark",
      "color": "#fbc786",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "gunes",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "termometre": {
    "id": "termometre",
    "name": "Termometre",
    "description": "Termometre, Cam + Metal + Ateş birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#948ca7",
      "secondary": "#e1bea7",
      "emissive": "#56526f"
    },
    "particles": {
      "type": "spark",
      "color": "#e1bea7",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "cam",
        "metal",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "tundra": {
    "id": "tundra",
    "name": "Tundra",
    "description": "Tundra, Kar + Orman birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#84ad97",
      "secondary": "#a5efc0",
      "emissive": "#709487"
    },
    "particles": {
      "type": "spark",
      "color": "#a5efc0",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kar",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "ucurtma": {
    "id": "ucurtma",
    "name": "Uçurtma",
    "description": "Uçurtma, Kağıt + Ip + Rüzgâr birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#6f92a7",
      "secondary": "#bfcfe1",
      "emissive": "#32588f"
    },
    "particles": {
      "type": "spark",
      "color": "#bfcfe1",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "kagit",
        "ip",
        "ruzgar"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "umbrella": {
    "id": "umbrella",
    "name": "Şemsiye",
    "description": "Şemsiye, Kumaş + Ip + Yağmur birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#5d7f96",
      "secondary": "#87bedf",
      "emissive": "#334f83"
    },
    "particles": {
      "type": "spark",
      "color": "#87bedf",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "kumas",
        "ip",
        "yagmur"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "uydu": {
    "id": "uydu",
    "name": "Uydu",
    "description": "Uydu, Uzay + Roket birleşiminden elde edilir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#16609a",
      "secondary": "#3576bd",
      "emissive": "#094066"
    },
    "particles": {
      "type": "spark",
      "color": "#3576bd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "uzay",
        "roket"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "vadi": {
    "id": "vadi",
    "name": "Vadi",
    "description": "Vadi, Dağ + Nehir + Taş birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#33688d",
      "secondary": "#7ca3c0",
      "emissive": "#174060"
    },
    "particles": {
      "type": "spark",
      "color": "#7ca3c0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "dag",
        "nehir",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "vase": {
    "id": "vase",
    "name": "Vase",
    "description": "Vase, Cam + Çiçek birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#9283c9",
      "secondary": "#eee1f3",
      "emissive": "#604e92"
    },
    "particles": {
      "type": "spark",
      "color": "#eee1f3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "vinc": {
    "id": "vinc",
    "name": "Vinç",
    "description": "Vinç, Metal + Ip + Tekerlek birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#767794",
      "secondary": "#b8cbcc",
      "emissive": "#474b71"
    },
    "particles": {
      "type": "spark",
      "color": "#b8cbcc",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "metal",
        "ip",
        "tekerlek"
      ]
    ],
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "akrep": {
    "id": "akrep",
    "name": "Akrep",
    "description": "Akrep, Bocek + Çöl birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#8a7d7e",
      "secondary": "#afc3a1",
      "emissive": "#695171"
    },
    "particles": {
      "type": "spark",
      "color": "#afc3a1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bocek",
        "col"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "alien": {
    "id": "alien",
    "name": "Uzaylı",
    "description": "Uzaylı, Uzay + Yaşam birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#207055",
      "secondary": "#5c8f97",
      "emissive": "#124c34"
    },
    "particles": {
      "type": "spark",
      "color": "#5c8f97",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "uzay",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "altin_sikke": {
    "id": "altin_sikke",
    "name": "Altın Sikke",
    "description": "Altın Sikke, Altın + Para birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#a7944a",
      "secondary": "#c9caa1",
      "emissive": "#604621"
    },
    "particles": {
      "type": "spark",
      "color": "#c9caa1",
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
    "semantic_score": 100
  },
  "arctic": {
    "id": "arctic",
    "name": "Arktik Bölge",
    "description": "Arktik Bölge, Buz + Kar birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#95d9f9",
      "secondary": "#f0f9ff",
      "emissive": "#67add4"
    },
    "particles": {
      "type": "spark",
      "color": "#f0f9ff",
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
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "asteroit": {
    "id": "asteroit",
    "name": "Asteroit",
    "description": "Asteroit, Taş + Uzay birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#41486b",
      "secondary": "#63699d",
      "emissive": "#212c40"
    },
    "particles": {
      "type": "spark",
      "color": "#63699d",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "uzay"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "aurora": {
    "id": "aurora",
    "name": "Kutup Işıkları",
    "description": "Kutup Işıkları, Güneş + Gece + Uzay birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#664736",
      "secondary": "#745e62",
      "emissive": "#462b1f"
    },
    "particles": {
      "type": "spark",
      "color": "#745e62",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "gunes",
        "gece",
        "uzay"
      ]
    ],
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "ayna": {
    "id": "ayna",
    "name": "Ayna",
    "description": "Ayna, Cam + Metal birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#66b0d8",
      "secondary": "#d6e4f0",
      "emissive": "#256d98"
    },
    "particles": {
      "type": "spark",
      "color": "#d6e4f0",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "baby": {
    "id": "baby",
    "name": "Bebek",
    "description": "Bebek, İnsan + Yaşam birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#8cb235",
      "secondary": "#c2eb9b",
      "emissive": "#656a23"
    },
    "particles": {
      "type": "spark",
      "color": "#c2eb9b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "baharat_cesnisi": {
    "id": "baharat_cesnisi",
    "name": "Baharat",
    "description": "Baharat, Bitki + Tuz + Ateş birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#a38038",
      "secondary": "#d3b64d",
      "emissive": "#6d4623"
    },
    "particles": {
      "type": "spark",
      "color": "#d3b64d",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bitki",
        "tuz",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "bal_kavanozu": {
    "id": "bal_kavanozu",
    "name": "Bal Kavanozu",
    "description": "Bal Kavanozu, Bal + Cam birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#91b880",
      "secondary": "#efe9a3",
      "emissive": "#44696b"
    },
    "particles": {
      "type": "spark",
      "color": "#efe9a3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bal",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "semantic_score": 100
  },
  "bat": {
    "id": "bat",
    "name": "Yarasa",
    "description": "Yarasa, Hayvan + Gece birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#69372a",
      "secondary": "#988396",
      "emissive": "#44261d"
    },
    "particles": {
      "type": "spark",
      "color": "#988396",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "beton": {
    "id": "beton",
    "name": "Beton",
    "description": "Beton, Tuğla + Su + Taş birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#6b5f7d",
      "secondary": "#979bb6",
      "emissive": "#45425b"
    },
    "particles": {
      "type": "spark",
      "color": "#979bb6",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "tugla",
        "su",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "bitcoin": {
    "id": "bitcoin",
    "name": "Bitcoin",
    "description": "Bitcoin, Internet + Para birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#507bc1",
      "secondary": "#7aa4d9",
      "emissive": "#1e3c8a"
    },
    "particles": {
      "type": "spark",
      "color": "#7aa4d9",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "internet",
        "para"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "bomba": {
    "id": "bomba",
    "name": "Bomba",
    "description": "Bomba, Barut + Metal + Ateş birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ca5a61",
      "secondary": "#e58b56",
      "emissive": "#802f36"
    },
    "particles": {
      "type": "spark",
      "color": "#e58b56",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "barut",
        "metal",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "solid",
    "semantic_score": 100
  },
  "bonfire": {
    "id": "bonfire",
    "name": "Kamp Ateşi",
    "description": "Kamp Ateşi, Odun + Ateş + Taş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#a2534a",
      "secondary": "#d9a973",
      "emissive": "#74342c"
    },
    "particles": {
      "type": "spark",
      "color": "#d9a973",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "ates",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "boomerang": {
    "id": "boomerang",
    "name": "Bumerang",
    "description": "Bumerang, Odun + Rüzgâr birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#657f83",
      "secondary": "#efecc4",
      "emissive": "#3a626d"
    },
    "particles": {
      "type": "spark",
      "color": "#efecc4",
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
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "bouquet": {
    "id": "bouquet",
    "name": "Çiçek Buketi",
    "description": "Çiçek Buketi, Çiçek + Çiçek + Kağıt birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#e65868",
      "secondary": "#fcd2d3",
      "emissive": "#a72243"
    },
    "particles": {
      "type": "spark",
      "color": "#fcd2d3",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "cicek",
        "cicek",
        "kagit"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "boyut_kapisi": {
    "id": "boyut_kapisi",
    "name": "Boyut Kapısı",
    "description": "Boyut Kapısı, Uzay + Büyü + Zaman birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#774a69",
      "secondary": "#a58697",
      "emissive": "#4b2b44"
    },
    "particles": {
      "type": "spark",
      "color": "#a58697",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "uzay",
        "buyu",
        "zaman"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "bozkir": {
    "id": "bozkir",
    "name": "Bozkır",
    "description": "Bozkır, Çöl + Orman birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#786e1d",
      "secondary": "#a4df64",
      "emissive": "#64531b"
    },
    "particles": {
      "type": "spark",
      "color": "#a4df64",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "col",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "broom": {
    "id": "broom",
    "name": "Süpürge",
    "description": "Süpürge, Odun + Kumaş + Ip birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#8d6859",
      "secondary": "#c9cbba",
      "emissive": "#574153"
    },
    "particles": {
      "type": "spark",
      "color": "#c9cbba",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "kumas",
        "ip"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "bucket": {
    "id": "bucket",
    "name": "Kova",
    "description": "Kova, Metal + Odun + Alet birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#837270",
      "secondary": "#c9cab6",
      "emissive": "#4e4745"
    },
    "particles": {
      "type": "spark",
      "color": "#c9cab6",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "metal",
        "odun",
        "alet"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "buhar_jeneratoru": {
    "id": "buhar_jeneratoru",
    "name": "Buhar Jeneratörü",
    "description": "Buhar Jeneratörü, Buhar + Elektrik + Metal birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#7698cd",
      "secondary": "#b8d0ea",
      "emissive": "#39538e"
    },
    "particles": {
      "type": "spark",
      "color": "#b8d0ea",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "buhar",
        "elektrik",
        "metal"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "semantic_score": 100
  },
  "buyu_parsomeni": {
    "id": "buyu_parsomeni",
    "name": "Büyü Parşömeni",
    "description": "Büyü Parşömeni, Büyü + Kağıt birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ab597a",
      "secondary": "#dfaed3",
      "emissive": "#622952"
    },
    "particles": {
      "type": "spark",
      "color": "#dfaed3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buyu",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "buz_runu": {
    "id": "buz_runu",
    "name": "Buz Rünü",
    "description": "Buz Rünü, Büyü + Buz birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#5a7cf3",
      "secondary": "#d0bbfd",
      "emissive": "#2751ae"
    },
    "particles": {
      "type": "spark",
      "color": "#d0bbfd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buyu",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "calendar": {
    "id": "calendar",
    "name": "Takvim",
    "description": "Takvim, Zaman + Kağıt birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d28105",
      "secondary": "#fedc79",
      "emissive": "#7f410f"
    },
    "particles": {
      "type": "spark",
      "color": "#fedc79",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "zaman",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "cali": {
    "id": "cali",
    "name": "Çalı",
    "description": "Çalı, Bitki + Orman birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#1c9549",
      "secondary": "#68e796",
      "emissive": "#156a35"
    },
    "particles": {
      "type": "spark",
      "color": "#68e796",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "camouflage": {
    "id": "camouflage",
    "name": "Kamuflaj",
    "description": "Kamuflaj, Giysi + Orman + İnsan birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#6d8267",
      "secondary": "#8dceac",
      "emissive": "#4c515a"
    },
    "particles": {
      "type": "spark",
      "color": "#8dceac",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "giysi",
        "orman",
        "insan"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "cark": {
    "id": "cark",
    "name": "Çark",
    "description": "Çark, Metal + Alet birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#7c8ca2",
      "secondary": "#b0bccd",
      "emissive": "#3d4b5f"
    },
    "particles": {
      "type": "spark",
      "color": "#b0bccd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "alet"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "cehennem_tasi": {
    "id": "cehennem_tasi",
    "name": "Cehennem Taşı",
    "description": "Cehennem Taşı, Lav + Büyü + Taş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#9a5194",
      "secondary": "#c48999",
      "emissive": "#682957"
    },
    "particles": {
      "type": "spark",
      "color": "#c48999",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "lav",
        "buyu",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame",
    "semantic_score": 100
  },
  "celik_kulce": {
    "id": "celik_kulce",
    "name": "Çelik Külçe",
    "description": "Çelik Külçe, Demir + Kömür birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#5a6678",
      "secondary": "#979faa",
      "emissive": "#222d3e"
    },
    "particles": {
      "type": "spark",
      "color": "#979faa",
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
    "semantic_score": 100
  },
  "chemical_waste": {
    "id": "chemical_waste",
    "name": "Kimyasal Atık",
    "description": "Kimyasal Atık, Asit + Metal + Su birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#468ed2",
      "secondary": "#76bdf1",
      "emissive": "#2259a1"
    },
    "particles": {
      "type": "spark",
      "color": "#76bdf1",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "asit",
        "metal",
        "su"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "cig": {
    "id": "cig",
    "name": "Çığ",
    "description": "Çığ, Kar + Dağ birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#929ba7",
      "secondary": "#b2bac5",
      "emissive": "#6d7686"
    },
    "particles": {
      "type": "spark",
      "color": "#b2bac5",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kar",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "corba": {
    "id": "corba",
    "name": "Çorba",
    "description": "Çorba, Su + Bitki + Ateş birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#5c8478",
      "secondary": "#92b593",
      "emissive": "#465753"
    },
    "particles": {
      "type": "spark",
      "color": "#92b593",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "su",
        "bitki",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "crayfish": {
    "id": "crayfish",
    "name": "Istakoz",
    "description": "Istakoz, Deniz + Taş + Balık birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#248fb7",
      "secondary": "#66c3e3",
      "emissive": "#15698d"
    },
    "particles": {
      "type": "spark",
      "color": "#66c3e3",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "deniz",
        "tas",
        "balik"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "demir_parmaklik": {
    "id": "demir_parmaklik",
    "name": "Demir Parmaklik",
    "description": "Demir Parmaklik, Demir + Duvar birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b8656f",
      "secondary": "#edadb1",
      "emissive": "#662e38"
    },
    "particles": {
      "type": "spark",
      "color": "#edadb1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "demir",
        "duvar"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "demir_zirh": {
    "id": "demir_zirh",
    "name": "Demir Zirh",
    "description": "Demir Zirh, Demir + Deri birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b78d5f",
      "secondary": "#f0e0cd",
      "emissive": "#563b32"
    },
    "particles": {
      "type": "spark",
      "color": "#f0e0cd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "demir",
        "deri"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "denizanasi": {
    "id": "denizanasi",
    "name": "Denizanası",
    "description": "Denizanası, Deniz + Yaşam + Işık birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#5fb269",
      "secondary": "#94dfba",
      "emissive": "#4b7c4b"
    },
    "particles": {
      "type": "spark",
      "color": "#94dfba",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "deniz",
        "yasam",
        "isik"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "deprem": {
    "id": "deprem",
    "name": "Deprem",
    "description": "Deprem, Basınç + Dağ + Toprak birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#595e75",
      "secondary": "#888985",
      "emissive": "#28315d"
    },
    "particles": {
      "type": "spark",
      "color": "#888985",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "basinc",
        "dag",
        "toprak"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "deri_kiyafet": {
    "id": "deri_kiyafet",
    "name": "Deri Giysi",
    "description": "Deri Giysi, Deri + Giysi birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#8a7d7e",
      "secondary": "#afbed2",
      "emissive": "#4b4274"
    },
    "particles": {
      "type": "spark",
      "color": "#afbed2",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "deri",
        "giysi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "deri_zirh": {
    "id": "deri_zirh",
    "name": "Deri Zırh",
    "description": "Deri Zırh, Deri + Zırh birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#906638",
      "secondary": "#c9bdb1",
      "emissive": "#44261d"
    },
    "particles": {
      "type": "spark",
      "color": "#c9bdb1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "deri",
        "zirh"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "dinamolu_fener": {
    "id": "dinamolu_fener",
    "name": "Dinamo Feneri",
    "description": "Dinamo Feneri, Tekerlek + Elektrik + Işık birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#98855e",
      "secondary": "#dadeb0",
      "emissive": "#735d4f"
    },
    "particles": {
      "type": "spark",
      "color": "#dadeb0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "tekerlek",
        "elektrik",
        "isik"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "domates": {
    "id": "domates",
    "name": "Domates",
    "description": "Domates, Bitki + Toprak + Güneş birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#858828",
      "secondary": "#b6b048",
      "emissive": "#5a4f18"
    },
    "particles": {
      "type": "spark",
      "color": "#b6b048",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bitki",
        "toprak",
        "gunes"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "dukkan": {
    "id": "dukkan",
    "name": "Dükkan",
    "description": "Dükkan, Şehir + Para birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#56657a",
      "secondary": "#b0bccd",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#b0bccd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sehir",
        "para"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "egg_wild": {
    "id": "egg_wild",
    "name": "Yabani Yumurta",
    "description": "Yabani Yumurta, Hayvan + Yuva birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#a34a0c",
      "secondary": "#fedf9a",
      "emissive": "#753a11"
    },
    "particles": {
      "type": "spark",
      "color": "#fedf9a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "yuva"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "elektrik_motoru": {
    "id": "elektrik_motoru",
    "name": "Elektrik Motoru",
    "description": "Elektrik Motoru, Elektrik + Metal + Tekerlek birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#767794",
      "secondary": "#c9d5cd",
      "emissive": "#474b71"
    },
    "particles": {
      "type": "spark",
      "color": "#c9d5cd",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "elektrik",
        "metal",
        "tekerlek"
      ]
    ],
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "fan": {
    "id": "fan",
    "name": "Vantilatör",
    "description": "Vantilatör, Elektrik + Rüzgâr birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#3aa0f7",
      "secondary": "#badcfe",
      "emissive": "#1069d0"
    },
    "particles": {
      "type": "spark",
      "color": "#badcfe",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "elektrik",
        "ruzgar"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "fay_hatti": {
    "id": "fay_hatti",
    "name": "Fay Hattı",
    "description": "Fay Hattı, Basınç + Kaya + Toprak birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#60657b",
      "secondary": "#888985",
      "emissive": "#2d3763"
    },
    "particles": {
      "type": "spark",
      "color": "#888985",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "basinc",
        "kaya",
        "toprak"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "feather": {
    "id": "feather",
    "name": "Tüy",
    "description": "Tüy, Kuş + Hava birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#999887",
      "secondary": "#efe5d4",
      "emissive": "#62636a"
    },
    "particles": {
      "type": "spark",
      "color": "#efe5d4",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "firefly": {
    "id": "firefly",
    "name": "Ateş Böceği",
    "description": "Ateş Böceği, Bocek + Işık birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#9ba786",
      "secondary": "#afcbc2",
      "emissive": "#746c6e"
    },
    "particles": {
      "type": "spark",
      "color": "#afcbc2",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bocek",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "flint": {
    "id": "flint",
    "name": "Çakmak Taşı",
    "description": "Çakmak Taşı, Taş + Metal + Ateş birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#a27482",
      "secondary": "#c8a490",
      "emissive": "#663b49"
    },
    "particles": {
      "type": "spark",
      "color": "#c8a490",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "tas",
        "metal",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "firtina_bulutu": {
    "id": "firtina_bulutu",
    "name": "Fırtına Bulutu",
    "description": "Fırtına Bulutu, Bulut + Yıldırım + Rüzgâr birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#a4c2a0",
      "secondary": "#f0f2d6",
      "emissive": "#658172"
    },
    "particles": {
      "type": "spark",
      "color": "#f0f2d6",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bulut",
        "yildirim",
        "ruzgar"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "semantic_score": 100
  },
  "fiyort": {
    "id": "fiyort",
    "name": "Fiyort",
    "description": "Fiyort, Dağ + Deniz birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#1b638e",
      "secondary": "#4e99c2",
      "emissive": "#094066"
    },
    "particles": {
      "type": "spark",
      "color": "#4e99c2",
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
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "flut": {
    "id": "flut",
    "name": "Flüt",
    "description": "Flüt, Odun + Hava + Müzik birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#8c7c59",
      "secondary": "#f4e5bb",
      "emissive": "#4e534d"
    },
    "particles": {
      "type": "spark",
      "color": "#f4e5bb",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "hava",
        "muzik"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "gezegen": {
    "id": "gezegen",
    "name": "Gezegen",
    "description": "Gezegen, Uzay + Güneş + Taş birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#7d644b",
      "secondary": "#958574",
      "emissive": "#52392d"
    },
    "particles": {
      "type": "spark",
      "color": "#958574",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "uzay",
        "gunes",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "giant": {
    "id": "giant",
    "name": "Dev",
    "description": "Dev, İnsan + Dağ birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#947030",
      "secondary": "#b1ad8b",
      "emissive": "#62351a"
    },
    "particles": {
      "type": "spark",
      "color": "#b1ad8b",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "golge": {
    "id": "golge",
    "name": "Gölge",
    "description": "Gölge, İnsan + Işık birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#f8b510",
      "secondary": "#feeb8a",
      "emissive": "#bf6f07"
    },
    "particles": {
      "type": "spark",
      "color": "#feeb8a",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "gozetleme_kulesi": {
    "id": "gozetleme_kulesi",
    "name": "Gözetleme Kulesi",
    "description": "Gözetleme Kulesi, Odun + İnsan + Dağ birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#936025",
      "secondary": "#cac08a",
      "emissive": "#673817"
    },
    "particles": {
      "type": "spark",
      "color": "#cac08a",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "insan",
        "dag"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "granit": {
    "id": "granit",
    "name": "Granit",
    "description": "Granit, Taş + Dağ + Basınç birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#52739e",
      "secondary": "#849fc0",
      "emissive": "#223e79"
    },
    "particles": {
      "type": "spark",
      "color": "#849fc0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "tas",
        "dag",
        "basinc"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "gul": {
    "id": "gul",
    "name": "Gül",
    "description": "Gül, Çiçek + Su + Güneş birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#a17979",
      "secondary": "#bac4ac",
      "emissive": "#7c4758"
    },
    "particles": {
      "type": "spark",
      "color": "#bac4ac",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "cicek",
        "su",
        "gunes"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "gulyabani": {
    "id": "gulyabani",
    "name": "Gulyabani",
    "description": "Gulyabani, İnsan + Büyü + Gece birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#85516c",
      "secondary": "#a588ad",
      "emissive": "#5a2d43"
    },
    "particles": {
      "type": "spark",
      "color": "#a588ad",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "insan",
        "buyu",
        "gece"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "gunduz": {
    "id": "gunduz",
    "name": "Gündüz",
    "description": "Gündüz, Güneş + Zaman birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#e09408",
      "secondary": "#fcd036",
      "emissive": "#9d500c"
    },
    "particles": {
      "type": "spark",
      "color": "#fcd036",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "gunes",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "halat": {
    "id": "halat",
    "name": "Halat",
    "description": "Halat, Kumaş + Bitki birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#7e9e32",
      "secondary": "#c2e3ab",
      "emissive": "#475b26"
    },
    "particles": {
      "type": "spark",
      "color": "#c2e3ab",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "harita": {
    "id": "harita",
    "name": "Harita",
    "description": "Harita, Kağıt + Dağ + Deniz birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#5a6961",
      "secondary": "#89adba",
      "emissive": "#2e3c49"
    },
    "particles": {
      "type": "spark",
      "color": "#89adba",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "kagit",
        "dag",
        "deniz"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "havyar": {
    "id": "havyar",
    "name": "Havyar",
    "description": "Havyar, Balık + Tuz birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#70976d",
      "secondary": "#b1d48f",
      "emissive": "#406361"
    },
    "particles": {
      "type": "spark",
      "color": "#b1d48f",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "tuz"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "hazine": {
    "id": "hazine",
    "name": "Hazine",
    "description": "Hazine, Altın + Ada birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#7db645",
      "secondary": "#80baa9",
      "emissive": "#536d2f"
    },
    "particles": {
      "type": "spark",
      "color": "#80baa9",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "altin",
        "ada"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "hesap_makinesi": {
    "id": "hesap_makinesi",
    "name": "Hesap Makinesi",
    "description": "Hesap Makinesi, Metal + Elektrik + Kağıt birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#8d8991",
      "secondary": "#c9d0d8",
      "emissive": "#494870"
    },
    "particles": {
      "type": "spark",
      "color": "#c9d0d8",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "metal",
        "elektrik",
        "kagit"
      ]
    ],
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "hologram_kupu": {
    "id": "hologram_kupu",
    "name": "Hologram Küpü",
    "description": "Hologram Küpü, Işık + Cam + Bilgisayar birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#6bbaa7",
      "secondary": "#b2e0d5",
      "emissive": "#457d79"
    },
    "particles": {
      "type": "spark",
      "color": "#b2e0d5",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "isik",
        "cam",
        "bilgisayar"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "hydra": {
    "id": "hydra",
    "name": "Hidra",
    "description": "Hidra, Deniz + Ejderha + Büyü birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#316aa6",
      "secondary": "#7fafae",
      "emissive": "#214876"
    },
    "particles": {
      "type": "spark",
      "color": "#7fafae",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "deniz",
        "ejderha",
        "buyu"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "igne": {
    "id": "igne",
    "name": "İğne",
    "description": "İğne, Metal + Kumaş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b78d5f",
      "secondary": "#e5d6c6",
      "emissive": "#60453c"
    },
    "particles": {
      "type": "spark",
      "color": "#e5d6c6",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "kumas"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "iksir_kazani": {
    "id": "iksir_kazani",
    "name": "İksir Kazanı",
    "description": "İksir Kazanı, Metal + Büyü + Ateş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#aa60a3",
      "secondary": "#d799a6",
      "emissive": "#6f2f5e"
    },
    "particles": {
      "type": "spark",
      "color": "#d799a6",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "metal",
        "buyu",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "iron_shield": {
    "id": "iron_shield",
    "name": "Demir Kalkan",
    "description": "Demir Kalkan, Demir + Odun birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#937263",
      "secondary": "#f0e7bd",
      "emissive": "#524034"
    },
    "particles": {
      "type": "spark",
      "color": "#f0e7bd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "demir",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "jenerator": {
    "id": "jenerator",
    "name": "Jeneratör",
    "description": "Jeneratör, Enerji + Metal + Tekerlek birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#b08745",
      "secondary": "#ecde91",
      "emissive": "#815f2a"
    },
    "particles": {
      "type": "spark",
      "color": "#ecde91",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "enerji",
        "metal",
        "tekerlek"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "kabile": {
    "id": "kabile",
    "name": "Kabile",
    "description": "Kabile, İnsan + Ateş + Orman birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#a96d2c",
      "secondary": "#c0bd60",
      "emissive": "#80411b"
    },
    "particles": {
      "type": "spark",
      "color": "#c0bd60",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "insan",
        "ates",
        "orman"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "kadirga": {
    "id": "kadirga",
    "name": "Kadırga",
    "description": "Kadırga, Yelkenli + Odun + Deniz birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#326d89",
      "secondary": "#bce1d6",
      "emissive": "#285b71"
    },
    "particles": {
      "type": "spark",
      "color": "#bce1d6",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "yelkenli",
        "odun",
        "deniz"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "kaldirim": {
    "id": "kaldirim",
    "name": "Kaldırım",
    "description": "Kaldırım, Taş + Şehir birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#56657a",
      "secondary": "#b0bccd",
      "emissive": "#293548"
    },
    "particles": {
      "type": "spark",
      "color": "#b0bccd",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kanal": {
    "id": "kanal",
    "name": "Kanal",
    "description": "Kanal, Su + Şehir birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#256d98",
      "secondary": "#82c9ed",
      "emissive": "#11496e"
    },
    "particles": {
      "type": "spark",
      "color": "#82c9ed",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "sehir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "karbon": {
    "id": "karbon",
    "name": "Karbon",
    "description": "Karbon, Odun + Ateş + Hava birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#936b6e",
      "secondary": "#f2c48a",
      "emissive": "#644a52"
    },
    "particles": {
      "type": "spark",
      "color": "#f2c48a",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "ates",
        "hava"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "karbondioksit": {
    "id": "karbondioksit",
    "name": "Karbondioksit",
    "description": "Karbondioksit, Ateş + Hava + Bitki birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#6e9789",
      "secondary": "#cac795",
      "emissive": "#456060"
    },
    "particles": {
      "type": "spark",
      "color": "#cac795",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "ates",
        "hava",
        "bitki"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame",
    "semantic_score": 100
  },
  "kayip_sehir": {
    "id": "kayip_sehir",
    "name": "Kayıp Şehir",
    "description": "Kayıp Şehir, Şehir + Çöl + Zaman birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#a37226",
      "secondary": "#ecdc7a",
      "emissive": "#72431b"
    },
    "particles": {
      "type": "spark",
      "color": "#ecdc7a",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "sehir",
        "col",
        "zaman"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kentaurluk": {
    "id": "kentaurluk",
    "name": "Kentaur",
    "description": "Kentaur, İnsan + At + Büyü birleşiminden elde edilir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#ac5d57",
      "secondary": "#e9c5b0",
      "emissive": "#7b3a3b"
    },
    "particles": {
      "type": "spark",
      "color": "#e9c5b0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "insan",
        "at",
        "buyu"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "kilit": {
    "id": "kilit",
    "name": "Kilit",
    "description": "Kilit, Metal + Duvar + Alet birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#9c6a78",
      "secondary": "#c8a3ae",
      "emissive": "#5c3b48"
    },
    "particles": {
      "type": "spark",
      "color": "#c8a3ae",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "metal",
        "duvar",
        "alet"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kita": {
    "id": "kita",
    "name": "Kıta",
    "description": "Kıta, Ada + Okyanus + Taş birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#27909c",
      "secondary": "#45a1d2",
      "emissive": "#13616f"
    },
    "particles": {
      "type": "spark",
      "color": "#45a1d2",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "ada",
        "okyanus",
        "tas"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "kizarmis_kus_eti": {
    "id": "kizarmis_kus_eti",
    "name": "Kızarmış Tavuk",
    "description": "Kızarmış Tavuk, Tavuk + Ateş + Tuz birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d45a1c",
      "secondary": "#ef8e15",
      "emissive": "#8e2d13"
    },
    "particles": {
      "type": "spark",
      "color": "#ef8e15",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "tavuk",
        "ates",
        "tuz"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "semantic_score": 100
  },
  "korfez": {
    "id": "korfez",
    "name": "Körfez",
    "description": "Körfez, Deniz + Ada + Dağ birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#177f8a",
      "secondary": "#3592c3",
      "emissive": "#075361"
    },
    "particles": {
      "type": "spark",
      "color": "#3592c3",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "deniz",
        "ada",
        "dag"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "kozmik_usturlap": {
    "id": "kozmik_usturlap",
    "name": "Kozmik Usturlap",
    "description": "Kozmik Usturlap, Teleskop + Zaman + Uzay birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#526e68",
      "secondary": "#779995",
      "emissive": "#324448"
    },
    "particles": {
      "type": "spark",
      "color": "#779995",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "teleskop",
        "zaman",
        "uzay"
      ]
    ],
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "semantic_score": 100
  },
  "kristal": {
    "id": "kristal",
    "name": "Kristal",
    "description": "Kristal, Taş + Işık birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#afa050",
      "secondary": "#c9caa1",
      "emissive": "#7f662d"
    },
    "particles": {
      "type": "spark",
      "color": "#c9caa1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kuantum_islemci": {
    "id": "kuantum_islemci",
    "name": "Kuantum İşlemci",
    "description": "Kuantum İşlemci, Bilgisayar + Enerji + Uzay birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#5d7c69",
      "secondary": "#779995",
      "emissive": "#495945"
    },
    "particles": {
      "type": "spark",
      "color": "#779995",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bilgisayar",
        "enerji",
        "uzay"
      ]
    ],
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 100
  },
  "kukurt": {
    "id": "kukurt",
    "name": "Kükürt",
    "description": "Kükürt, Volkan + Taş birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#a04d59",
      "secondary": "#c78b67",
      "emissive": "#662e38"
    },
    "particles": {
      "type": "spark",
      "color": "#c78b67",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "volkan",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame",
    "semantic_score": 100
  },
  "kule": {
    "id": "kule",
    "name": "Kule",
    "description": "Kule, Taş + Odun birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#7b5a4d",
      "secondary": "#c9c5a1",
      "emissive": "#524034"
    },
    "particles": {
      "type": "spark",
      "color": "#c9c5a1",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kurabiye": {
    "id": "kurabiye",
    "name": "Kurabiye",
    "description": "Kurabiye, Un + Şeker + Ateş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#ed8e47",
      "secondary": "#fcbb68",
      "emissive": "#a94910"
    },
    "particles": {
      "type": "spark",
      "color": "#fcbb68",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "un",
        "seker",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "kutuphane": {
    "id": "kutuphane",
    "name": "Kütüphane",
    "description": "Kütüphane, Kitap + Ev birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#98477b",
      "secondary": "#dfb5c3",
      "emissive": "#622952"
    },
    "particles": {
      "type": "spark",
      "color": "#dfb5c3",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kitap",
        "ev"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "kuyruklu_yildiz": {
    "id": "kuyruklu_yildiz",
    "name": "Kuyruklu Yıldız",
    "description": "Kuyruklu Yıldız, Yıldız + Buz + Uzay birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#708878",
      "secondary": "#b0b0ae",
      "emissive": "#4e5b52"
    },
    "particles": {
      "type": "spark",
      "color": "#b0b0ae",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "yildiz",
        "buz",
        "uzay"
      ]
    ],
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "labyrinth": {
    "id": "labyrinth",
    "name": "Labirent",
    "description": "Labirent, Duvar + İnsan + Büyü birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#c4555f",
      "secondary": "#e79ea8",
      "emissive": "#882e3e"
    },
    "particles": {
      "type": "spark",
      "color": "#e79ea8",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "duvar",
        "insan",
        "buyu"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "lasso": {
    "id": "lasso",
    "name": "Kement",
    "description": "Kement, Ip + At birleşiminden elde edilir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#676182",
      "secondary": "#afc6c2",
      "emissive": "#474775"
    },
    "particles": {
      "type": "spark",
      "color": "#afc6c2",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "at"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "magara": {
    "id": "magara",
    "name": "Mağara",
    "description": "Mağara, Dağ + Gece birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#292e50",
      "secondary": "#4b5186",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#4b5186",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "dag",
        "gece"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "mana": {
    "id": "mana",
    "name": "Mana",
    "description": "Mana, Büyü + Enerji birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b3777b",
      "secondary": "#dfb2a2",
      "emissive": "#8b544d"
    },
    "particles": {
      "type": "spark",
      "color": "#dfb2a2",
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
    "semantic_score": 100
  },
  "matbaa": {
    "id": "matbaa",
    "name": "Matbaa",
    "description": "Matbaa, Kağıt + Metal + Kitap birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#a3718e",
      "secondary": "#d8bbd8",
      "emissive": "#59385a"
    },
    "particles": {
      "type": "spark",
      "color": "#d8bbd8",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "kagit",
        "metal",
        "kitap"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "matches": {
    "id": "matches",
    "name": "Kibrit",
    "description": "Kibrit, Odun + Metal + Ateş birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b26259",
      "secondary": "#ebba80",
      "emissive": "#7b3b32"
    },
    "particles": {
      "type": "spark",
      "color": "#ebba80",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "metal",
        "ates"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "medeniyet": {
    "id": "medeniyet",
    "name": "Medeniyet",
    "description": "Medeniyet, Şehir + İnsan + Kitap birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#936476",
      "secondary": "#d8c0cd",
      "emissive": "#5f3348"
    },
    "particles": {
      "type": "spark",
      "color": "#d8c0cd",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "sehir",
        "insan",
        "kitap"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "medicine": {
    "id": "medicine",
    "name": "İlaç",
    "description": "İlaç, Bitki + Su + Yaşam birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#17af81",
      "secondary": "#6cdec5",
      "emissive": "#0f785e"
    },
    "particles": {
      "type": "spark",
      "color": "#6cdec5",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bitki",
        "su",
        "yasam"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "meka_zirhi": {
    "id": "meka_zirhi",
    "name": "Meka Zırhı",
    "description": "Meka Zırhı, Robot + Zırh birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#2b7da9",
      "secondary": "#66b0d8",
      "emissive": "#094066"
    },
    "particles": {
      "type": "spark",
      "color": "#66b0d8",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "robot",
        "zirh"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 100
  },
  "melek": {
    "id": "melek",
    "name": "Melek",
    "description": "Melek, İnsan + Işık + Büyü birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#ce8c5a",
      "secondary": "#e9c9b0",
      "emissive": "#995336"
    },
    "particles": {
      "type": "spark",
      "color": "#e9c9b0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "insan",
        "isik",
        "buyu"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "meltem": {
    "id": "meltem",
    "name": "Meltem",
    "description": "Meltem, Deniz + Rüzgâr + Güneş birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#65a099",
      "secondary": "#b1cfb3",
      "emissive": "#3e6b7b"
    },
    "particles": {
      "type": "spark",
      "color": "#b1cfb3",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "deniz",
        "ruzgar",
        "gunes"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "mercan": {
    "id": "mercan",
    "name": "Mercan",
    "description": "Mercan, Deniz + Taş + Yaşam birleşiminden elde edilir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#2d9490",
      "secondary": "#71c5c9",
      "emissive": "#196366"
    },
    "particles": {
      "type": "spark",
      "color": "#71c5c9",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "deniz",
        "tas",
        "yasam"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "semantic_score": 100
  },
  "mermer": {
    "id": "mermer",
    "name": "Mermer",
    "description": "Mermer, Taş + Basınç birleşiminden elde edilir.",
    "tier": 3,
    "colorPalette": {
      "primary": "#628dc3",
      "secondary": "#94b4db",
      "emissive": "#2c52a0"
    },
    "particles": {
      "type": "spark",
      "color": "#94b4db",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "basinc"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "metropol": {
    "id": "metropol",
    "name": "Metropol",
    "description": "Metropol, Şehir + Gokdelen birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#416cb0",
      "secondary": "#96bdee",
      "emissive": "#1e3c8a"
    },
    "particles": {
      "type": "spark",
      "color": "#96bdee",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sehir",
        "gokdelen"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "miknatis": {
    "id": "miknatis",
    "name": "Mıknatıs",
    "description": "Mıknatıs, Elektrik + Demir birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#6893d7",
      "secondary": "#bbd7f7",
      "emissive": "#284897"
    },
    "particles": {
      "type": "spark",
      "color": "#bbd7f7",
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
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "minyatur_yildiz": {
    "id": "minyatur_yildiz",
    "name": "Minyatür Yıldız",
    "description": "Minyatür Yıldız, Yıldız + Büyü + Işık birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d09762",
      "secondary": "#e9ccb0",
      "emissive": "#a55f35"
    },
    "particles": {
      "type": "spark",
      "color": "#e9ccb0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "yildiz",
        "buyu",
        "isik"
      ]
    ],
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "mummy": {
    "id": "mummy",
    "name": "Mumya",
    "description": "Mumya, İnsan + Kumaş + Zaman birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dd8a07",
      "secondary": "#fddf7e",
      "emissive": "#90470d"
    },
    "particles": {
      "type": "spark",
      "color": "#fddf7e",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "insan",
        "kumas",
        "zaman"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "mushroom": {
    "id": "mushroom",
    "name": "Mantar",
    "description": "Mantar, Ağaç + Yağmur birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0c8282",
      "secondary": "#5fd6d2",
      "emissive": "#0d676b"
    },
    "particles": {
      "type": "spark",
      "color": "#5fd6d2",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "obsidyen_bicak": {
    "id": "obsidyen_bicak",
    "name": "Obsidyen Bıçak",
    "description": "Obsidyen Bıçak, Obsidyen + Metal + Alet birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#74849a",
      "secondary": "#a6b4c6",
      "emissive": "#334053"
    },
    "particles": {
      "type": "spark",
      "color": "#a6b4c6",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "obsidyen",
        "metal",
        "alet"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "ok": {
    "id": "ok",
    "name": "Ok",
    "description": "Ok, Odun + Taş + Rüzgâr birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#657b86",
      "secondary": "#d0d4c0",
      "emissive": "#375765"
    },
    "particles": {
      "type": "spark",
      "color": "#d0d4c0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "odun",
        "tas",
        "ruzgar"
      ]
    ],
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "oksijen": {
    "id": "oksijen",
    "name": "Oksijen",
    "description": "Oksijen, Bitki + Güneş + Hava birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#70b576",
      "secondary": "#cbe09a",
      "emissive": "#44725a"
    },
    "particles": {
      "type": "spark",
      "color": "#cbe09a",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bitki",
        "gunes",
        "hava"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "okul": {
    "id": "okul",
    "name": "Okul",
    "description": "Okul, İnsan + Kitap + Ev birleşiminden elde edilir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b76456",
      "secondary": "#e9c5b0",
      "emissive": "#7d373a"
    },
    "particles": {
      "type": "spark",
      "color": "#e9c5b0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "insan",
        "kitap",
        "ev"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "palmiye": {
    "id": "palmiye",
    "name": "Palmiye",
    "description": "Palmiye, Ada + Güneş + Ağaç birleşiminden elde edilir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#5e9d43",
      "secondary": "#81bb88",
      "emissive": "#456531"
    },
    "particles": {
      "type": "spark",
      "color": "#81bb88",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "ada",
        "gunes",
        "agac"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "pamuk": {
    "id": "pamuk",
    "name": "Pamuk",
    "description": "Pamuk, Bitki + Güneş + Yağmur birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#5ea265",
      "secondary": "#93ce98",
      "emissive": "#44694d"
    },
    "particles": {
      "type": "spark",
      "color": "#93ce98",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bitki",
        "gunes",
        "yagmur"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "parsomen": {
    "id": "parsomen",
    "name": "Parşömen",
    "description": "Parşömen, Kağıt + Deri birleşiminden elde edilir.",
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
        "kagit",
        "deri"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "semantic_score": 100
  },
  "pastirma": {
    "id": "pastirma",
    "name": "Pastırma",
    "description": "Pastırma, Hayvan + Tuz + Güneş birleşiminden elde edilir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d67809",
      "secondary": "#fcc751",
      "emissive": "#8c3f0d"
    },
    "particles": {
      "type": "spark",
      "color": "#fcc751",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "hayvan",
        "tuz",
        "gunes"
      ]
    ],
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "patates": {
    "id": "patates",
    "name": "Patates",
    "description": "Patates, Bitki + Toprak + Su birleşiminden elde edilir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#347f67",
      "secondary": "#75af8e",
      "emissive": "#1f564b"
    },
    "particles": {
      "type": "spark",
      "color": "#75af8e",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "bitki",
        "toprak",
        "su"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "nature",
    "semantic_score": 100
  },
  "plato": {
    "id": "plato",
    "name": "Plato",
    "description": "Plato, Dağ + Taş birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#4c5b70",
      "secondary": "#7c8ca2",
      "emissive": "#212c40"
    },
    "particles": {
      "type": "spark",
      "color": "#7c8ca2",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "dag",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "semantic_score": 100
  },
  "plazma": {
    "id": "plazma",
    "name": "Plazma",
    "description": "Plazma, Elektrik + Ateş + Hava birleşiminden elde edilir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#7681bb",
      "secondary": "#cfb9b0",
      "emissive": "#484f94"
    },
    "particles": {
      "type": "spark",
      "color": "#cfb9b0",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "elektrik",
        "ates",
        "hava"
      ]
    ],
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "crystal",
    "semantic_score": 100
  },
  "prizma_tasi": {
    "id": "prizma_tasi",
    "name": "Prizma Taşı",
    "description": "Prizma Taşı, Büyü + Taş + Işık birleşiminden elde edilir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#9e7e84",
      "secondary": "#c6b2bf",
      "emissive": "#6e4d4f"
    },
    "particles": {
      "type": "spark",
      "color": "#c6b2bf",
      "count": 12
    },
    "recipe": null,
    "trioRecipes": [
      [
        "buyu",
        "tas",
        "isik"
      ]
    ],
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "semantic_score": 100
  },
  "radar": {
    "id": "radar",
    "name": "Radar",
    "description": "Radar, Radyo + Bilgisayar birleşiminden elde edilir.",
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
        "radyo",
        "bilgisayar"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "semantic_score": 100
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
