/**
 * Multi-Mode Item Definitions
 * Classic Mode (92 items) & Grandmaster Mode (650+ items)
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "magic",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "baloncuk": {
    "id": "baloncuk",
    "name": "Baloncuk",
    "description": "Suyun içinde hapsolan buhar küreciği.",
    "tier": 3,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "buhar"
      ]
    },
    "icon": "✨",
    "category": "Fizik & Sıvı",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "obsidyen": {
    "id": "obsidyen",
    "name": "Obsidyen",
    "description": "Volkanik camsı kayaç.",
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
    "trioRecipes": []
  },
  "ruzg_r": {
    "id": "ruzg_r",
    "name": "Rüzgâr",
    "description": "Havanın enerjiyle hızla hareket etmesi.",
    "tier": 3,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
  },
  "okyanus": {
    "id": "okyanus",
    "name": "Okyanus",
    "description": "Dev su kütlesi.",
    "tier": 3,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
  },
  "tuz": {
    "id": "tuz",
    "name": "Tuz",
    "description": "Deniz suyunun güneşle buharlaşmasından kalan mineral.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "tuzlu_su": {
    "id": "tuzlu_su",
    "name": "Tuzlu Su",
    "description": "Tuzla doymuş doğal su.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
  },
  "fay_hatti": {
    "id": "fay_hatti",
    "name": "Fay Hattı",
    "description": "Yer kabuğundaki kırık çizgisi.",
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
    "trioRecipes": []
  },
  "deprem": {
    "id": "deprem",
    "name": "Deprem",
    "description": "Tektonik sarsıntı.",
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
    "trioRecipes": []
  },
  "tsunami": {
    "id": "tsunami",
    "name": "Tsunami",
    "description": "Devasa okyanus dalgası.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "gayzer": {
    "id": "gayzer",
    "name": "Gayzer",
    "description": "Fışkıran sıcak yeraltı suyu.",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yanardag": {
    "id": "yanardag",
    "name": "Yanardağ",
    "description": "Püsküren volkanik dağ.",
    "tier": 6,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "magara": {
    "id": "magara",
    "name": "Mağara",
    "description": "Derin kaya kovuğu.",
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
    "trioRecipes": []
  },
  "vadi": {
    "id": "vadi",
    "name": "Vadi",
    "description": "Akarsu vadisi.",
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
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "kanyon": {
    "id": "kanyon",
    "name": "Kanyon",
    "description": "Derin yarılmış kanyon.",
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
        "nehir",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "yarimada": {
    "id": "yarimada",
    "name": "Yarımada",
    "description": "Üç tarafı suyla çevrili kara.",
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
    "trioRecipes": []
  },
  "kita": {
    "id": "kita",
    "name": "Kıta",
    "description": "Büyük anakara.",
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
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "vaha": {
    "id": "vaha",
    "name": "Vaha",
    "description": "Çölde yeşil su kaynağı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "crystal",
    "trioRecipes": []
  },
  "buz_dagi": {
    "id": "buz_dagi",
    "name": "Buz Dağı",
    "description": "Okyanusta yüzen aysberg.",
    "tier": 7,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "cig": {
    "id": "cig",
    "name": "Çığ",
    "description": "Yuvarlanan kar kütlesi.",
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
    "trioRecipes": []
  },
  "meltem": {
    "id": "meltem",
    "name": "Meltem",
    "description": "Hafif sahil esintisi.",
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
        "ruzg_r",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "kasirga": {
    "id": "kasirga",
    "name": "Kasırga",
    "description": "Dev tropik kasırga.",
    "tier": 6,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "tayfun": {
    "id": "tayfun",
    "name": "Tayfun",
    "description": "Okyanus tayfunu.",
    "tier": 7,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "tufan": {
    "id": "tufan",
    "name": "Tufan",
    "description": "Büyük su tufanı.",
    "tier": 4,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "fiyort": {
    "id": "fiyort",
    "name": "Fiyort",
    "description": "Buzul körfezi.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "kutup": {
    "id": "kutup",
    "name": "Kutup",
    "description": "Buzullarla ve donmuş denizlerle kaplı kutup bölgesi.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buz",
        "okyanus"
      ]
    },
    "icon": "✨",
    "category": "Coğrafya & Doğa",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "atom": {
    "id": "atom",
    "name": "Atom",
    "description": "Maddenin en küçük yapı taşı ve enerji çekirdeği.",
    "tier": 3,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "basinc",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "Fizik & Fenomen",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "korfez": {
    "id": "korfez",
    "name": "Körfez",
    "description": "Korunaklı körfez.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "ozon": {
    "id": "ozon",
    "name": "Ozon",
    "description": "Ozon gazı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "aurora": {
    "id": "aurora",
    "name": "Aurora",
    "description": "Kutup ışıkları.",
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
    "trioRecipes": []
  },
  "cakmaktasi": {
    "id": "cakmaktasi",
    "name": "Çakmaktaşı",
    "description": "Kıvılcım çıkaran çakmaktaşı.",
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
    "trioRecipes": []
  },
  "kirec": {
    "id": "kirec",
    "name": "Kireç",
    "description": "Kalker tozu.",
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
        "su"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "alci": {
    "id": "alci",
    "name": "Alçı",
    "description": "Alçı harcı.",
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
  "cimento": {
    "id": "cimento",
    "name": "Çimento",
    "description": "Çimento tozu.",
    "tier": 5,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "harc": {
    "id": "harc",
    "name": "Harç",
    "description": "Bağlama harcı.",
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
    "trioRecipes": []
  },
  "beton": {
    "id": "beton",
    "name": "Beton",
    "description": "Sertleşen beton.",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tugla_duvar": {
    "id": "tugla_duvar",
    "name": "Tuğla Duvar",
    "description": "Tuğla duvar.",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
  },
  "demir": {
    "id": "demir",
    "name": "Demir",
    "description": "Sağlam demir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
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
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bakir": {
    "id": "bakir",
    "name": "Bakır",
    "description": "Kızıl bakır.",
    "tier": 5,
    "colorPalette": {
      "primary": "#c2410c",
      "secondary": "#fb923c",
      "emissive": "#7c2d12"
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
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bronz": {
    "id": "bronz",
    "name": "Bronz",
    "description": "Bronz alaşımı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#c2410c",
      "secondary": "#fb923c",
      "emissive": "#7c2d12"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "altin": {
    "id": "altin",
    "name": "Altın",
    "description": "Parlayan altın.",
    "tier": 5,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fef08a",
      "emissive": "#a16207"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "gumus": {
    "id": "gumus",
    "name": "Gümüş",
    "description": "Değerli gümüş.",
    "tier": 5,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "kursun": {
    "id": "kursun",
    "name": "Kurşun",
    "description": "Ağır kurşun.",
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
        "kum"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "civa": {
    "id": "civa",
    "name": "Cıva",
    "description": "Sıvı cıva.",
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
  "kukurt": {
    "id": "kukurt",
    "name": "Kükürt",
    "description": "Kükürt minerali.",
    "tier": 4,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "capa": {
    "id": "capa",
    "name": "Çapa",
    "description": "Gemileri denizde sabit tutmak için atılan ağır demir çapa.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "demir",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "Araç & Deniz",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "kok": {
    "id": "kok",
    "name": "Kök",
    "description": "Bitkinin kökleri.",
    "tier": 5,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "su_yosunu": {
    "id": "su_yosunu",
    "name": "Su Yosunu",
    "description": "Suda serbestçe fotosentez yapan ilkel su bitkisi ve alg.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "deniz",
        "bitki"
      ]
    },
    "icon": "✨",
    "category": "Flora & Doğa",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "oksijen": {
    "id": "oksijen",
    "name": "Oksijen",
    "description": "Bitkilerin fotosenteziyle açığa çıkan yaşamsal oksijen gazı.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "Kimya & Madde",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "cimen": {
    "id": "cimen",
    "name": "Çimen",
    "description": "Yeşil çimenlik.",
    "tier": 5,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "cali": {
    "id": "cali",
    "name": "Çalı",
    "description": "Bodur çalı.",
    "tier": 6,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
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
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "bozkir": {
    "id": "bozkir",
    "name": "Bozkır",
    "description": "Geniş bozkır.",
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
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tohum": {
    "id": "tohum",
    "name": "Tohum",
    "description": "Bitki tohumu.",
    "tier": 5,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bitki",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "dal": {
    "id": "dal",
    "name": "Dal",
    "description": "Ağaç gövdesinden ayrılan ahşap dal parçası.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "Flora & Malzeme",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "kiymik": {
    "id": "kiymik",
    "name": "Kıymık",
    "description": "Ahşap kıymık.",
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
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "agac_kabugu": {
    "id": "agac_kabugu",
    "name": "Ağaç Kabuğu",
    "description": "Ağaç kabuğu.",
    "tier": 7,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "recine": {
    "id": "recine",
    "name": "Reçine",
    "description": "Ağaç özsuyu.",
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
  "kehribar": {
    "id": "kehribar",
    "name": "Kehribar",
    "description": "Kehribar fosili.",
    "tier": 8,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fef08a",
      "emissive": "#a16207"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "fosil": {
    "id": "fosil",
    "name": "Fosil",
    "description": "Canlı fosili.",
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
    "trioRecipes": []
  },
  "petrol": {
    "id": "petrol",
    "name": "Petrol",
    "description": "Organik fosillerin yer altında basınç altında kalmasıyla oluşan petrol.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "basinc",
        "fosil"
      ]
    },
    "icon": "✨",
    "category": "Enerji & Maden",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bataklik": {
    "id": "bataklik",
    "name": "Bataklık",
    "description": "Islak bataklık.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "tundra": {
    "id": "tundra",
    "name": "Tundra",
    "description": "Donmuş tundra.",
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
    "trioRecipes": []
  },
  "karli_cam_agaci": {
    "id": "karli_cam_agaci",
    "name": "Karlı Çam Ağacı",
    "description": "Karlı çam.",
    "tier": 7,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karbon": {
    "id": "karbon",
    "name": "Karbon",
    "description": "Kömürleşme sonucu oluşan temel organik karbon elementi.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "komur",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "Kimya & Madde",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karbondioksit": {
    "id": "karbondioksit",
    "name": "Karbondioksit",
    "description": "Karbon ve oksijenin birleşimiyle oluşan sera gazı.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "karbon",
        "oksijen"
      ]
    },
    "icon": "✨",
    "category": "Kimya & Madde",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "elmas": {
    "id": "elmas",
    "name": "Elmas",
    "description": "Sert elmas.",
    "tier": 9,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#f0f9ff",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "demir_kulce": {
    "id": "demir_kulce",
    "name": "Demir Külçe",
    "description": "Demir külçe.",
    "tier": 6,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "demir",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "celik_kulce": {
    "id": "celik_kulce",
    "name": "Çelik Külçe",
    "description": "Çelik külçe.",
    "tier": 10,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
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
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "barut": {
    "id": "barut",
    "name": "Barut",
    "description": "Barut tozu.",
    "tier": 9,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ea580c",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "kagit": {
    "id": "kagit",
    "name": "Kağıt",
    "description": "Ağaç liflerinden üretilen beyaz kağıt.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "su"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "kalem": {
    "id": "kalem",
    "name": "Kalem",
    "description": "Kömür uçlu ahşap kurşun kalem.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "komur"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "yazi": {
    "id": "yazi",
    "name": "Yazı",
    "description": "Sembolik yazılı metin.",
    "tier": 10,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "kitap": {
    "id": "kitap",
    "name": "Kitap",
    "description": "Bilgi dolu ciltli kitap.",
    "tier": 11,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "plankton": {
    "id": "plankton",
    "name": "Plankton",
    "description": "Deniz ekosisteminin temelini oluşturan mikroskobik canlılar.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "deniz",
        "su_yosunu"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Deniz",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "akvaryum": {
    "id": "akvaryum",
    "name": "Akvaryum",
    "description": "Balıkların ve su canlılarının yaşadığı şeffaf cam akvaryum.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "balik"
      ]
    },
    "icon": "✨",
    "category": "Yaşam & Ev",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "yarasa": {
    "id": "yarasa",
    "name": "Yarasa",
    "description": "Karanlık mağaralarda yaşayan uçan yarasa.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "magara"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karga": {
    "id": "karga",
    "name": "Karga",
    "description": "Zeki siyah karga.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "tas"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Kuşlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "guguk_kusu": {
    "id": "guguk_kusu",
    "name": "Guguk Kuşu",
    "description": "Orman guguk kuşu.",
    "tier": 8,
    "colorPalette": {},
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
    "category": "Fauna & Kuşlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "flamingo": {
    "id": "flamingo",
    "name": "Flamingo",
    "description": "Zarif pembe flamingo.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "gol"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Kuşlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ucan_balik": {
    "id": "ucan_balik",
    "name": "Uçan Balık",
    "description": "Süzülen uçan balık.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Su Canlıları",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bugday": {
    "id": "bugday",
    "name": "Buğday",
    "description": "Buğday başağı.",
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
    "trioRecipes": []
  },
  "pamuk": {
    "id": "pamuk",
    "name": "Pamuk",
    "description": "Lifli pamuk.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "bambu": {
    "id": "bambu",
    "name": "Bambu",
    "description": "Bambu kamışı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "sarmasik": {
    "id": "sarmasik",
    "name": "Sarmaşık",
    "description": "Tırmanıcı sarmaşık.",
    "tier": 7,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "kaktus": {
    "id": "kaktus",
    "name": "Kaktüs",
    "description": "Çöl kaktüsü.",
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
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "palmiye": {
    "id": "palmiye",
    "name": "Palmiye",
    "description": "Tropik palmiye.",
    "tier": 7,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kazma": {
    "id": "kazma",
    "name": "Kazma",
    "description": "Madenci kazması.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "bicak": {
    "id": "bicak",
    "name": "Bıçak",
    "description": "Keskin bıçak.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "alet",
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
    "description": "Ağır çekiç.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "kurek": {
    "id": "kurek",
    "name": "Kürek",
    "description": "Toprak küreği.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
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
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "testere": {
    "id": "testere",
    "name": "Testere",
    "description": "Odun testeresi.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "alet",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "ors": {
    "id": "ors",
    "name": "Örs",
    "description": "Demirci örsü.",
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
    "trioRecipes": []
  },
  "mizrak": {
    "id": "mizrak",
    "name": "Mızrak",
    "description": "Uzun mızrak.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kalkan": {
    "id": "kalkan",
    "name": "Kalkan",
    "description": "Savunma kalkanı.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "zirh": {
    "id": "zirh",
    "name": "Zırh",
    "description": "Savaş zırhı.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "celik",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "pusula": {
    "id": "pusula",
    "name": "Pusula",
    "description": "Yön gösteren pusula.",
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
        "cam"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "elektrik_motoru": {
    "id": "elektrik_motoru",
    "name": "Elektrik Motoru",
    "description": "Elektromekanik motor.",
    "tier": 6,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#38bdf8",
      "emissive": "#ca8a04"
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
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "electric",
    "trioRecipes": []
  },
  "jenerator": {
    "id": "jenerator",
    "name": "Jeneratör",
    "description": "Elektrik jeneratörü.",
    "tier": 7,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "elektrik_motoru",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "bilgisayar": {
    "id": "bilgisayar",
    "name": "Bilgisayar",
    "description": "Elektronik bilgisayar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "elektrik",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "robot": {
    "id": "robot",
    "name": "Robot",
    "description": "Programlanabilir mekanik robot.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "yapay_zeka": {
    "id": "yapay_zeka",
    "name": "Yapay Zeka",
    "description": "Yapay zeka zihni.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bilgisayar",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
  },
  "patates": {
    "id": "patates",
    "name": "Patates",
    "description": "Nişastalı patates.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "sogan": {
    "id": "sogan",
    "name": "Soğan",
    "description": "Keskin kokulu soğan.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "sarimsak": {
    "id": "sarimsak",
    "name": "Sarımsak",
    "description": "Şifalı sarımsak.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "zeytin": {
    "id": "zeytin",
    "name": "Zeytin",
    "description": "Şifalı zeytin.",
    "tier": 7,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "badem": {
    "id": "badem",
    "name": "Badem",
    "description": "Besleyici badem.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "ceviz": {
    "id": "ceviz",
    "name": "Ceviz",
    "description": "Sert kabuklu ceviz.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "gul": {
    "id": "gul",
    "name": "Gül",
    "description": "Kırmızı dikenli gül.",
    "tier": 6,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "nilufer": {
    "id": "nilufer",
    "name": "Nilüfer",
    "description": "Nilüfer çiçeği.",
    "tier": 6,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "cay": {
    "id": "cay",
    "name": "Çay",
    "description": "Demlenmiş çay.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#f59e0b",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "kahve": {
    "id": "kahve",
    "name": "Kahve",
    "description": "Kavrulmuş kahve.",
    "tier": 6,
    "colorPalette": {
      "primary": "#451a03",
      "secondary": "#92400e",
      "emissive": "#260c02"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "tutun": {
    "id": "tutun",
    "name": "Tütün",
    "description": "Kurutulmuş tütün.",
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
    "trioRecipes": []
  },
  "nane": {
    "id": "nane",
    "name": "Nane",
    "description": "Ferahlatıcı nane.",
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
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "lif": {
    "id": "lif",
    "name": "Lif",
    "description": "Doğal lif.",
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
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ip": {
    "id": "ip",
    "name": "İp",
    "description": "Bağlama ipi.",
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
    "trioRecipes": []
  },
  "iplik": {
    "id": "iplik",
    "name": "İplik",
    "description": "Dikiş ipliği.",
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
        "ip",
        "ip"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kumas": {
    "id": "kumas",
    "name": "Kumaş",
    "description": "Dokunmuş kumaş.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "pamuk"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "yay": {
    "id": "yay",
    "name": "Yay",
    "description": "Ok yayı.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "ok": {
    "id": "ok",
    "name": "Ok",
    "description": "Sivri ok.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "olta": {
    "id": "olta",
    "name": "Olta",
    "description": "Balık oltası.",
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
        "ip",
        "bicak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "civi": {
    "id": "civi",
    "name": "Çivi",
    "description": "Metal çivi.",
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
        "cekic"
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
    "description": "Vidalı parça.",
    "tier": 11,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "civi",
        "celik"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kilit": {
    "id": "kilit",
    "name": "Kilit",
    "description": "Metal kilit.",
    "tier": 11,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "halat": {
    "id": "halat",
    "name": "Halat",
    "description": "Çekme halatı.",
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
        "ip",
        "lif"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "demir_parmaklik": {
    "id": "demir_parmaklik",
    "name": "Demir Parmaklık",
    "description": "Demir parmaklık.",
    "tier": 6,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "demir",
        "demir"
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
    "description": "Demir kalkan.",
    "tier": 9,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kalkan",
        "demir"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ahsap_kalkan": {
    "id": "ahsap_kalkan",
    "name": "Ahşap Kalkan",
    "description": "Ahşap kalkan.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kalkan",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "balik_eti": {
    "id": "balik_eti",
    "name": "Balık Eti",
    "description": "Balık eti.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "kus_tuyu": {
    "id": "kus_tuyu",
    "name": "Kuş Tüyü",
    "description": "Kuş tüyü.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kartal": {
    "id": "kartal",
    "name": "Kartal",
    "description": "Yırtıcı kartal.",
    "tier": 6,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "ahtapot": {
    "id": "ahtapot",
    "name": "Ahtapot",
    "description": "Sekiz kollu ahtapot.",
    "tier": 6,
    "colorPalette": {
      "primary": "#9333ea",
      "secondary": "#c084fc",
      "emissive": "#581c87"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "denizanasi": {
    "id": "denizanasi",
    "name": "Denizanası",
    "description": "Şeffaf denizanası.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
  "balina": {
    "id": "balina",
    "name": "Balina",
    "description": "Dev balina.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "yunus": {
    "id": "yunus",
    "name": "Yunus",
    "description": "Deniz yunusu.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "seker": {
    "id": "seker",
    "name": "Şeker",
    "description": "Kristal şeker.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "cikolata": {
    "id": "cikolata",
    "name": "Çikolata",
    "description": "Kakao çikolatası.",
    "tier": 6,
    "colorPalette": {
      "primary": "#3b1a08",
      "secondary": "#78350f",
      "emissive": "#1c0a02"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "zeytinyagi": {
    "id": "zeytinyagi",
    "name": "Zeytinyağı",
    "description": "Saf zeytinyağı.",
    "tier": 8,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "palamut": {
    "id": "palamut",
    "name": "Palamut",
    "description": "Meşe palamudu tohumu.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tohum",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "Flora & Meyveler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "baobab": {
    "id": "baobab",
    "name": "Baobab",
    "description": "Geniş gövdeli baobab ağacı.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "agac",
        "col"
      ]
    },
    "icon": "✨",
    "category": "Flora & Ağaçlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kakao": {
    "id": "kakao",
    "name": "Kakao",
    "description": "Kakao çekirdeği.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tohum",
        "palmiye"
      ]
    },
    "icon": "✨",
    "category": "Flora & Tarım",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "aycicegi": {
    "id": "aycicegi",
    "name": "Ayçiçeği",
    "description": "Sarı ayçiçeği.",
    "tier": 6,
    "colorPalette": {},
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
    "category": "Flora & Çiçekler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karamel": {
    "id": "karamel",
    "name": "Karamel",
    "description": "Kızarmış karamel şekeri.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "seker",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "Gıda & Tatlı",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tost": {
    "id": "tost",
    "name": "Tost",
    "description": "Kızarmış çıtır tost ekmeği.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ekmek",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "Gıda & Ekmek",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "buket": {
    "id": "buket",
    "name": "Buket",
    "description": "Rengarenk çiçek buketi.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cicek",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "Flora & Çiçekler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kutu": {
    "id": "kutu",
    "name": "Kutu",
    "description": "Eşya saklama kutusu.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "odun"
      ]
    },
    "icon": "✨",
    "category": "Malzeme & Eşya",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "balon": {
    "id": "balon",
    "name": "Balon",
    "description": "Renkli uçan balon.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hava",
        "kumas"
      ]
    },
    "icon": "✨",
    "category": "Eşya & Eğlence",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bandaj": {
    "id": "bandaj",
    "name": "Bandaj",
    "description": "Tıbbi yara bandajı.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "Tıp & Sağlık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bumerang": {
    "id": "bumerang",
    "name": "Bumerang",
    "description": "Avcı bumerangı.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "Silah & Avcılık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "supurge": {
    "id": "supurge",
    "name": "Süpürge",
    "description": "Çalı süpürgesi.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "cali"
      ]
    },
    "icon": "✨",
    "category": "Ev & Temizlik",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "vantilator": {
    "id": "vantilator",
    "name": "Vantilatör",
    "description": "Masaüstü vantilatör.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "elektrik_motoru",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "Teknoloji & Ev",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "el_feneri": {
    "id": "el_feneri",
    "name": "El Feneri",
    "description": "Pilli el feneri.",
    "tier": 4,
    "colorPalette": {},
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
    "category": "Alet & Aydınlatma",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "gozluk": {
    "id": "gozluk",
    "name": "Gözlük",
    "description": "Okuma gözlüğü.",
    "tier": 4,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "Alet & Optik",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "el_bombasi": {
    "id": "el_bombasi",
    "name": "El Bombası",
    "description": "Parça tesirli el bombası.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "barut",
        "metal"
      ]
    },
    "icon": "✨",
    "category": "Silah & Askeri",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kibrit": {
    "id": "kibrit",
    "name": "Kibrit",
    "description": "Kibrit çöpü.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "kukurt"
      ]
    },
    "icon": "✨",
    "category": "Alet & Ateş",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bebek": {
    "id": "bebek",
    "name": "Bebek",
    "description": "Sevimli bebek.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "zaman"
      ]
    },
    "icon": "✨",
    "category": "İnsan & Yaşam",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kan": {
    "id": "kan",
    "name": "Kan",
    "description": "Yaşamsal kan.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "bicak"
      ]
    },
    "icon": "✨",
    "category": "Biyoloji & Vücut",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "beyin": {
    "id": "beyin",
    "name": "Beyin",
    "description": "İnsan beyni.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "Biyoloji & Vücut",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "dna": {
    "id": "dna",
    "name": "DNA",
    "description": "Genetik DNA zinciri.",
    "tier": 4,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yasam",
        "atom"
      ]
    },
    "icon": "✨",
    "category": "Biyoloji & Genetik",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "mumya": {
    "id": "mumya",
    "name": "Mumya",
    "description": "Sargılı mumya.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "bandaj"
      ]
    },
    "icon": "✨",
    "category": "Tarih & Mitoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sovalye": {
    "id": "sovalye",
    "name": "Şövalye",
    "description": "Zırhlı şövalye.",
    "tier": 11,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "zirh"
      ]
    },
    "icon": "✨",
    "category": "Tarih & Meslek",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "casus": {
    "id": "casus",
    "name": "Casus",
    "description": "Gizli casus.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "gozluk"
      ]
    },
    "icon": "✨",
    "category": "Meslek & Gizem",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "korkuluk": {
    "id": "korkuluk",
    "name": "Korkuluk",
    "description": "Tarla korkuluğu.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "cali"
      ]
    },
    "icon": "✨",
    "category": "Tarım & Eşya",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kardan_adam": {
    "id": "kardan_adam",
    "name": "Kardan Adam",
    "description": "Kardan adam.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kar",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "Kış & Eğlence",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "pinokyo": {
    "id": "pinokyo",
    "name": "Pinokyo",
    "description": "Canlı tahta kukla Pinokyo.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "yasam"
      ]
    },
    "icon": "✨",
    "category": "Masal & Karakter",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "cadir": {
    "id": "cadir",
    "name": "Çadır",
    "description": "Kumaş çadır.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "altin_sikke": {
    "id": "altin_sikke",
    "name": "Altın Sikke",
    "description": "Ticaret sikkesi.",
    "tier": 6,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fef08a",
      "emissive": "#a16207"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "altin",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "pazar": {
    "id": "pazar",
    "name": "Pazar",
    "description": "Alışveriş pazarı.",
    "tier": 7,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "altin_sikke"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "structure",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kale": {
    "id": "kale",
    "name": "Kale",
    "description": "Savunma kalesi.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "tugla_duvar"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "kule": {
    "id": "kule",
    "name": "Kule",
    "description": "Gözetleme kulesi.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "tas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "sur": {
    "id": "sur",
    "name": "Sur",
    "description": "Şehir surları.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "saray": {
    "id": "saray",
    "name": "Saray",
    "description": "Hükümdar sarayı.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kale",
        "altin"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "anit": {
    "id": "anit",
    "name": "Anıt",
    "description": "Taş anıt.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "tas",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "muze": {
    "id": "muze",
    "name": "Müze",
    "description": "Sanat ve tarih müzesi.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "yol": {
    "id": "yol",
    "name": "Yol",
    "description": "Taş yol.",
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
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "liman": {
    "id": "liman",
    "name": "Liman",
    "description": "Liman.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "ev"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "tunel": {
    "id": "tunel",
    "name": "Tünel",
    "description": "Dağ tüneli.",
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
        "dag",
        "kazma"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "iglo": {
    "id": "iglo",
    "name": "İglo",
    "description": "Kutup iglosu.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "buz",
        "ev"
      ]
    },
    "icon": "✨",
    "category": "Yapı & Barınak",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "gokdelen": {
    "id": "gokdelen",
    "name": "Gökdelen",
    "description": "Modern gökdelen.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sehir",
        "cam"
      ]
    },
    "icon": "✨",
    "category": "Yapı & Şehir",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "fiskiye": {
    "id": "fiskiye",
    "name": "Fıskiye",
    "description": "Şehir fıskiyesi.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su",
        "anit"
      ]
    },
    "icon": "✨",
    "category": "Yapı & Şehir",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "labirent": {
    "id": "labirent",
    "name": "Labirent",
    "description": "Karmaşık labirent.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "sur",
        "yol"
      ]
    },
    "icon": "✨",
    "category": "Yapı & Gizem",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "havai_fisek": {
    "id": "havai_fisek",
    "name": "Havai Fişek",
    "description": "Kutlama havai fişeği.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "barut",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "Kutlama & Işık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "benzin": {
    "id": "benzin",
    "name": "Benzin",
    "description": "Rafine benzin yakıtı.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "petrol",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "Enerji & Yakıt",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "supernova": {
    "id": "supernova",
    "name": "Süpernova",
    "description": "Kozmik süpernova patlaması.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "gunes",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "Uzay & Kozmoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "dev": {
    "id": "dev",
    "name": "Dev",
    "description": "Devasa yaratık dev.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "insan",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "Mitoloji & Yaratık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "murekkepbaligi": {
    "id": "murekkepbaligi",
    "name": "Mürekkepbalığı",
    "description": "Derin deniz mürekkepbalığı.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ahtapot",
        "okyanus"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Deniz",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "akbaba": {
    "id": "akbaba",
    "name": "Akbaba",
    "description": "Çöl akbabası.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "col"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Kuşlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kus_yuvasi": {
    "id": "kus_yuvasi",
    "name": "Kuş Yuvası",
    "description": "Kuş yuvası.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kus",
        "dal"
      ]
    },
    "icon": "✨",
    "category": "Doğa & Kuşlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kus_evi": {
    "id": "kus_evi",
    "name": "Kuş Evi",
    "description": "Bahçe kuş evi.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "Eşya & Doğa",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sunger": {
    "id": "sunger",
    "name": "Sünger",
    "description": "Deniz süngeri.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "su_yosunu",
        "kum"
      ]
    },
    "icon": "✨",
    "category": "Deniz & Temizlik",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "cit": {
    "id": "cit",
    "name": "Çit",
    "description": "Ahşap bahçe çiti.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "koy"
      ]
    },
    "icon": "✨",
    "category": "Yapı & Bahçe",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "vazo": {
    "id": "vazo",
    "name": "Vazo",
    "description": "Çiçek vazosu.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "camur",
        "cicek"
      ]
    },
    "icon": "✨",
    "category": "Ev & Sanat",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yastik": {
    "id": "yastik",
    "name": "Yastık",
    "description": "Yumuşak uyku yastığı.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "kus_tuyu"
      ]
    },
    "icon": "✨",
    "category": "Ev & Eşya",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "boya": {
    "id": "boya",
    "name": "Boya",
    "description": "Renkli boya pigmenti.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cicek",
        "recine"
      ]
    },
    "icon": "✨",
    "category": "Sanat & Renk",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tutkal": {
    "id": "tutkal",
    "name": "Tutkal",
    "description": "Güçlü yapıştırıcı tutkal.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "recine",
        "un"
      ]
    },
    "icon": "✨",
    "category": "Alet & Yapıştırıcı",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yuzuk": {
    "id": "yuzuk",
    "name": "Yüzük",
    "description": "Değerli altın yüzük.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "altin",
        "elmas"
      ]
    },
    "icon": "✨",
    "category": "Mücevher & Eşya",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "madalya": {
    "id": "madalya",
    "name": "Madalya",
    "description": "Ödül madalyası.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "altin",
        "kumas"
      ]
    },
    "icon": "✨",
    "category": "Onur & Ödül",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "semsiye": {
    "id": "semsiye",
    "name": "Şemsiye",
    "description": "Yağmur şemsiyesi.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "yagmur"
      ]
    },
    "icon": "✨",
    "category": "Eşya & Koruma",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "buzdolabi": {
    "id": "buzdolabi",
    "name": "Buzdolabı",
    "description": "Elektrikli buzdolabı.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "Ev & Teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "vakum": {
    "id": "vakum",
    "name": "Vakum",
    "description": "Elektrikli süpürge vakum.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "elektrik_motoru"
      ]
    },
    "icon": "✨",
    "category": "Ev & Teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "pipo": {
    "id": "pipo",
    "name": "Pipo",
    "description": "Tütün piposu.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "tutun"
      ]
    },
    "icon": "✨",
    "category": "Eşya & Keyif",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "aluminyum": {
    "id": "aluminyum",
    "name": "Alüminyum",
    "description": "Hafif alüminyum.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "Maden & Metal",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bitcoin": {
    "id": "bitcoin",
    "name": "Bitcoin",
    "description": "Kripto para Bitcoin.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bilgisayar",
        "altin_sikke"
      ]
    },
    "icon": "✨",
    "category": "Finans & Teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "takvim": {
    "id": "takvim",
    "name": "Takvim",
    "description": "Zaman takvimi.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "zaman",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "Zaman & Bilgi",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kamuflaj": {
    "id": "kamuflaj",
    "name": "Kamuflaj",
    "description": "Askeri kamuflaj deseni.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "Askeri & Giysi",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karton": {
    "id": "karton",
    "name": "Karton",
    "description": "Mukavva karton.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kagit",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "Malzeme & Kağıt",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kimyasal_atik": {
    "id": "kimyasal_atik",
    "name": "Kimyasal Atık",
    "description": "Zehirli kimyasal atık.",
    "tier": 5,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kukurt",
        "su"
      ]
    },
    "icon": "✨",
    "category": "Sanayi & Çevre",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yuruyen_merdiven": {
    "id": "yuruyen_merdiven",
    "name": "Yürüyen Merdiven",
    "description": "Otomatik yürüyen merdiven.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ev",
        "elektrik_motoru"
      ]
    },
    "icon": "✨",
    "category": "Teknoloji & Ulaşım",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "patlayici": {
    "id": "patlayici",
    "name": "Patlayıcı",
    "description": "Patlayıcı dinamit.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "barut",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "Silah & Enerji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "dalis_tupu": {
    "id": "dalis_tupu",
    "name": "Dalış Tüpü",
    "description": "Sualtı dalış tüpü.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "oksijen",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "Spor & Deniz",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "silah": {
    "id": "silah",
    "name": "Silah",
    "description": "Askeri silah.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "alet",
        "barut"
      ]
    },
    "icon": "✨",
    "category": "Silah & Savaş",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bit": {
    "id": "bit",
    "name": "Bit",
    "description": "Dijital bit verisi.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "bilgisayar",
        "elektrik"
      ]
    },
    "icon": "✨",
    "category": "Bilişim & Veri",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "anka_kusu": {
    "id": "anka_kusu",
    "name": "Anka Kuşu",
    "description": "Küllerinden doğan Anka kuşu.",
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
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ucak": {
    "id": "ucak",
    "name": "Uçak",
    "description": "Gökyüzünde uçan uçak.",
    "tier": 5,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "ayna": {
    "id": "ayna",
    "name": "Ayna",
    "description": "Işığı yansıtan ayna.",
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
    "trioRecipes": []
  },
  "tepe": {
    "id": "tepe",
    "name": "Tepe",
    "description": "Toprağın su ile doyması ve yoğrulması sonucu viskoz ve şekillendirilebilir tepe meydana gelir.",
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
        "deniz"
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
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan uzay sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
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
    "archetype3d": "magic",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
        "kus",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "fici": {
    "id": "fici",
    "name": "Fıçı",
    "description": "Ahşap ve demir çemberlerle yapılan depolama fıçısı.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "un"
      ]
    },
    "icon": "✨",
    "category": "Malzeme & Eşya",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tiyatro": {
    "id": "tiyatro",
    "name": "Tiyatro",
    "description": "Müze ve Sinema elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tiyatro meydana gelir.",
    "tier": 3,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "su"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "yildiz_tozu": {
    "id": "yildiz_tozu",
    "name": "Yıldız Tozu",
    "description": "Büyü Parşömeni ve Totem elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yıldız tozu meydana gelir.",
    "tier": 3,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
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
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "ekmek"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "kement": {
    "id": "kement",
    "name": "Kement",
    "description": "Hayvanları yakalamak için fırlatılan halkalı ip.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "supurge"
      ]
    },
    "icon": "✨",
    "category": "Araç & Avcılık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "salyangoz": {
    "id": "salyangoz",
    "name": "Salyangoz",
    "description": "Sırtında helezonik kabuğunu taşıyan yavaş canlı.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "nane"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Canlılar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "firtina_kilici": {
    "id": "firtina_kilici",
    "name": "Fırtına Kılıcı",
    "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan fırtına kılıcı sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "kazma"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "olumsuzluk_iksiri": {
    "id": "olumsuzluk_iksiri",
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
        "enerji",
        "elmas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "archetype3d": "food",
    "trioRecipes": []
  },
  "bisiklet": {
    "id": "bisiklet",
    "name": "Bisiklet",
    "description": "Lokomotif ve Tekerlek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda bisiklet meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "meyve_suyu": {
    "id": "meyve_suyu",
    "name": "Meyve Suyu",
    "description": "Su Çömleği ve Çilek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda meyve suyu meydana gelir.",
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
        "kamuflaj"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "geyik": {
    "id": "geyik",
    "name": "Geyik",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla geyik ortaya çıkar.",
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
        "buz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sandvic": {
    "id": "sandvic",
    "name": "Sandviç",
    "description": "İki ekmek dilimi arasına konulan peynir ve lezzetler.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "sur"
      ]
    },
    "icon": "✨",
    "category": "Gıda & Mutfak",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "skarabe": {
    "id": "skarabe",
    "name": "Skarabe",
    "description": "Eski Mısırda kutsal sayılan altın kabuklu böcek.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "kaktus"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Mitoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "internet": {
    "id": "internet",
    "name": "İnternet",
    "description": "Et, Siber Kristal ve İp elementlerinin dengeli füzyonuyla yeni bir form olan i̇nternet sentezlenir.",
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
        "yildirim"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karinca": {
    "id": "karinca",
    "name": "Karınca",
    "description": "Aurora, Örümcek ve İpekböceği elementlerinin dengeli füzyonuyla yeni bir form olan karınca sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "fayton": {
    "id": "fayton",
    "name": "Fayton",
    "description": "Odun, Tutulma ve Tüy elementlerinin dengeli füzyonuyla yeni bir form olan fayton sentezlenir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "dag"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "ates_topu_kitabi": {
    "id": "ates_topu_kitabi",
    "name": "Ateş Topu Kitabı",
    "description": "Ateş, Büyü Parşömeni ve Dinamit elementlerinin dengeli füzyonuyla yeni bir form olan ateş topu kitabı sentezlenir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "mermer": {
    "id": "mermer",
    "name": "Mermer",
    "description": "Hamur ve Mercek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda mermer meydana gelir.",
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
        "hava"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
        "alet",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kulucka": {
    "id": "kulucka",
    "name": "Kuluçka",
    "description": "Yumurtaların güvenle çatlamasını sağlayan ısıtmalı kuluçka cihazı.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kanyon",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "Teknoloji & Tarım",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "radyasyon": {
    "id": "radyasyon",
    "name": "Radyasyon",
    "description": "Nebula, Yıldırım ve Yıldırım Parşömeni elementlerinin dengeli füzyonuyla yeni bir form olan radyasyon sentezlenir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#22c55e",
      "secondary": "#86efac",
      "emissive": "#15803d"
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
    "category": "01_elements",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "manyetizma": {
    "id": "manyetizma",
    "name": "Manyetizma",
    "description": "Ametist, Büyü Parşömeni ve Evren elementlerinin dengeli füzyonuyla yeni bir form olan manyetizma sentezlenir.",
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
    "trioRecipes": []
  },
  "kentaurluk": {
    "id": "kentaurluk",
    "name": "Kentaurluk",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kentaurluk ortaya çıkar.",
    "tier": 5,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "balik",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "minyatur_yildiz": {
    "id": "minyatur_yildiz",
    "name": "Minyatür Yıldız",
    "description": "Gezegen ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda minyatür yıldız meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "saat": {
    "id": "saat",
    "name": "Saat",
    "description": "Kum Saati ve Zaman elementlerinin anlamsal ve fiziksel etkileşimi sonucunda saat meydana gelir.",
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
        "su"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "oyuncak": {
    "id": "oyuncak",
    "name": "Oyuncak",
    "description": "Çocukların eğlenmesi için ahşap veya kumaştan yapılan figür.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kazma"
      ]
    },
    "icon": "✨",
    "category": "Eşya & Eğlence",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "krallik": {
    "id": "krallik",
    "name": "Krallık",
    "description": "Büyü Parşömeni, Uçurtma ve İmparatorluk elementlerinin dengeli füzyonuyla yeni bir form olan krallık sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "plazma_tufegi": {
    "id": "plazma_tufegi",
    "name": "Plazma Tüfeği",
    "description": "Dinamit, Fırtına Kılıcı ve Harç elementlerinin dengeli füzyonuyla yeni bir form olan plazma tüfeği sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "recel": {
    "id": "recel",
    "name": "Reçel",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla reçel ortaya çıkar.",
    "tier": 9,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "alet",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "mum": {
    "id": "mum",
    "name": "Mum",
    "description": "Ayı, Meşale ve Sis elementlerinin dengeli füzyonuyla yeni bir form olan mum sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "fabric",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "prizma_tasi": {
    "id": "prizma_tasi",
    "name": "Prizma Taşı",
    "description": "Büyü Parşömeni ve Prizma elementlerinin anlamsal ve fiziksel etkileşimi sonucunda prizma taşı meydana gelir.",
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
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kurt": {
    "id": "kurt",
    "name": "Kurt",
    "description": "Kahin Küresi, Kar ve Su elementlerinin dengeli füzyonuyla yeni bir form olan kurt sentezlenir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "alet",
        "civi"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "tavuk": {
    "id": "tavuk",
    "name": "Tavuk",
    "description": "Kadırga ve Tepe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tavuk meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "alet",
        "bicak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "zurafa": {
    "id": "zurafa",
    "name": "Zürafa",
    "description": "Yüksek ağaç yapraklarına ulaşan upuzun boyunlu memeli.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "sarimsak"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "dinozor": {
    "id": "dinozor",
    "name": "Dinozor",
    "description": "Kaplumbağa, Okyanus ve Örümcek elementlerinin dengeli füzyonuyla yeni bir form olan dinozor sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
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
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "aku": {
    "id": "aku",
    "name": "Akü",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla akü ortaya çıkar.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kuyruklu_yildiz": {
    "id": "kuyruklu_yildiz",
    "name": "Kuyruklu Yıldız",
    "description": "Akrep ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kuyruklu yıldız meydana gelir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "kum_saati": {
    "id": "kum_saati",
    "name": "Kum Saati",
    "description": "Gezegen ve Kum elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kum saati meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "tugla"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "limon": {
    "id": "limon",
    "name": "Limon",
    "description": "Buhar, Sarımsak ve Çark elementlerinin dengeli füzyonuyla yeni bir form olan limon sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kutup"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "virus": {
    "id": "virus",
    "name": "Virüs",
    "description": "Bakteri, Kasırga ve Nebula elementlerinin dengeli füzyonuyla yeni bir form olan virüs sentezlenir.",
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
    "trioRecipes": []
  },
  "denizalti": {
    "id": "denizalti",
    "name": "Denizaltı",
    "description": "Deniz ve Denizanası elementlerinin anlamsal ve fiziksel etkileşimi sonucunda denizaltı meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "fiskiye"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "tabanca": {
    "id": "tabanca",
    "name": "Tabanca",
    "description": "Kartal ve Çorba elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tabanca meydana gelir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "altar": {
    "id": "altar",
    "name": "Altar",
    "description": "Anıt ve Prizma Taşı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda altar meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "yaprak"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
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
        "alet",
        "cekic"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
        "supurge",
        "lif"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "golge": {
    "id": "golge",
    "name": "Gölge",
    "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gölge meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "zeytin"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "gezegen": {
    "id": "gezegen",
    "name": "Gezegen",
    "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gezegen meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "buzul"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "demir_zirh": {
    "id": "demir_zirh",
    "name": "Demir Zırh",
    "description": "Demir Kalkan ve Demir Külçe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda demir zırh meydana gelir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kitap"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "anahtar": {
    "id": "anahtar",
    "name": "Anahtar",
    "description": "Kilit, Kürek ve Şifa İksiri elementlerinin dengeli füzyonuyla yeni bir form olan anahtar sentezlenir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "inci": {
    "id": "inci",
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
        "supurge",
        "mizrak"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "fener": {
    "id": "fener",
    "name": "Fener",
    "description": "Ateş, Hava ve Su elementlerinin dengeli füzyonuyla yeni bir form olan fener sentezlenir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "buz_runu": {
    "id": "buz_runu",
    "name": "Buz Rünü",
    "description": "Buz ve Buzul elementlerinin anlamsal ve fiziksel etkileşimi sonucunda buz rünü meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#e0f2fe",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "muze"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "fener_kulesi": {
    "id": "fener_kulesi",
    "name": "Fener Kulesi",
    "description": "Gökkuşağı ve Kule elementlerinin anlamsal ve fiziksel etkileşimi sonucunda fener kulesi meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "atom"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "atesbocegi": {
    "id": "atesbocegi",
    "name": "Ateşböceği",
    "description": "Geceleri karnından biyolüminesans yeşil-sarı ışık saçan böcek.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kakao"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Böcekler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "teleskop": {
    "id": "teleskop",
    "name": "Teleskop",
    "description": "Alacakaranlık, Gözetleme Kulesi ve Meteor elementlerinin dengeli füzyonuyla yeni bir form olan teleskop sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kar"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "buyu_parsomeni": {
    "id": "buyu_parsomeni",
    "name": "Büyü Parşömeni",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla büyü parşömeni ortaya çıkar.",
    "tier": 9,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kirec"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "meka_zirhi": {
    "id": "meka_zirhi",
    "name": "Meka Zırhı",
    "description": "Gökkuşağı ve Runik Zırh elementlerinin anlamsal ve fiziksel etkileşimi sonucunda meka zırhı meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "tuz"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "akrep": {
    "id": "akrep",
    "name": "Akrep",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla akrep ortaya çıkar.",
    "tier": 7,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "lamba": {
    "id": "lamba",
    "name": "Lamba",
    "description": "Masa veya odayı aydınlatan elektrikli abajur / lamba.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "beyin"
      ]
    },
    "icon": "✨",
    "category": "Ev & Aydınlatma",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "buyu": {
    "id": "buyu",
    "name": "Büyü",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla büyü ortaya çıkar.",
    "tier": 7,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
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
    "archetype3d": "magic",
    "trioRecipes": []
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "yesim": {
    "id": "yesim",
    "name": "Yeşim",
    "description": "Ayı ve Kristal elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yeşim meydana gelir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#059669",
      "secondary": "#6ee7b7",
      "emissive": "#064e3b"
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
    "trioRecipes": []
  },
  "zehirli_kilic": {
    "id": "zehirli_kilic",
    "name": "Zehirli Kılıç",
    "description": "Anka Külü ve Kasaba elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zehirli kılıç meydana gelir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "pastirma": {
    "id": "pastirma",
    "name": "Pastırma",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla pastırma ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "food",
    "trioRecipes": []
  },
  "kurbaga": {
    "id": "kurbaga",
    "name": "Kurbağa",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kurbağa ortaya çıkar.",
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
        "cicek",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kadirga": {
    "id": "kadirga",
    "name": "Kadırga",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kadırga ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "fare": {
    "id": "fare",
    "name": "Fare",
    "description": "Peynir seven çevik küçük kemirgen.",
    "tier": 12,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "sovalye"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kerevit": {
    "id": "kerevit",
    "name": "Kerevit",
    "description": "Tatlı sularda ve nehirlerde yaşayan tatlı su ıstakozu.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kus_evi"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Su Canlıları",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "otomobil": {
    "id": "otomobil",
    "name": "Otomobil",
    "description": "Bisiklet, Lokomotif ve Roket elementlerinin dengeli füzyonuyla yeni bir form olan otomobil sentezlenir.",
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
        "hava"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
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
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "firca": {
    "id": "firca",
    "name": "Fırça",
    "description": "Boya sürmek veya yüzey temizlemek için kullanılan kıllı alet.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "selale"
      ]
    },
    "icon": "✨",
    "category": "Sanat & Alet",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "siber_kristal": {
    "id": "siber_kristal",
    "name": "Siber Kristal",
    "description": "Cin, Runik Zırh ve Zırh elementlerinin dengeli füzyonuyla yeni bir form olan siber kristal sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#f0f9ff",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "komur"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "telgraf": {
    "id": "telgraf",
    "name": "Telgraf",
    "description": "Radyo ve İnternet elementlerinin anlamsal ve fiziksel etkileşimi sonucunda telgraf meydana gelir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "tirtil": {
    "id": "tirtil",
    "name": "Tırtıl",
    "description": "Yaprakları kemirerek koza örmeye hazırlanan sevimli larva.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "anit"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Böcekler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "buhar_jeneratoru": {
    "id": "buhar_jeneratoru",
    "name": "Buhar Jeneratörü",
    "description": "Buhar ve Lokomotif elementlerinin anlamsal ve fiziksel etkileşimi sonucunda buhar jeneratörü meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "supernova"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "seramik": {
    "id": "seramik",
    "name": "Seramik",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla seramik ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
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
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "imparatorluk": {
    "id": "imparatorluk",
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
        "supurge",
        "korfez"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "baraj": {
    "id": "baraj",
    "name": "Baraj",
    "description": "Buhar, Göl ve Tünel elementlerinin dengeli füzyonuyla yeni bir form olan baraj sentezlenir.",
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
        "supurge",
        "kibrit"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "et": {
    "id": "et",
    "name": "Et",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla et ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cicek",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
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
        "cicek",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "resim": {
    "id": "resim",
    "name": "Resim",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla resim ortaya çıkar.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "cali"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "mancinik": {
    "id": "mancinik",
    "name": "Mancınık",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mancınık ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "icten_yanmali_motor": {
    "id": "icten_yanmali_motor",
    "name": "İçten Yanmalı Motor",
    "description": "Lokomotif ve Roket elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇çten yanmalı motor meydana gelir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "safak": {
    "id": "safak",
    "name": "Şafak",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şafak ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "demir",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "fotograf": {
    "id": "fotograf",
    "name": "Fotoğraf",
    "description": "Alçı, Ceviz ve Sinema elementlerinin dengeli füzyonuyla yeni bir form olan fotoğraf sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "tundra"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "bira": {
    "id": "bira",
    "name": "Bira",
    "description": "Bisiklet, Sal ve Vadi elementlerinin dengeli füzyonuyla yeni bir form olan bira sentezlenir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "food",
    "trioRecipes": []
  },
  "pirinc": {
    "id": "pirinc",
    "name": "Pirinç",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla pirinç ortaya çıkar.",
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
        "tas"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "hac": {
    "id": "hac",
    "name": "Haç",
    "description": "Altın ve ahşaptan yapılan kutsal manevi sembol.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "anka_kusu"
      ]
    },
    "icon": "✨",
    "category": "Tarih & Sembol",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "karpuz": {
    "id": "karpuz",
    "name": "Karpuz",
    "description": "Kasaba ve Kulübe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda karpuz meydana gelir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
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
    "archetype3d": "food",
    "trioRecipes": []
  },
  "metropol": {
    "id": "metropol",
    "name": "Metropol",
    "description": "Kentaurluk ve Şehir elementlerinin anlamsal ve fiziksel etkileşimi sonucunda metropol meydana gelir.",
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
        "supurge",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "gunduz": {
    "id": "gunduz",
    "name": "Gündüz",
    "description": "Kentaurluk ve Yatak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gündüz meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "lav"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "findik": {
    "id": "findik",
    "name": "Fındık",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla fındık ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
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
    "archetype3d": "food",
    "trioRecipes": []
  },
  "kale_kapisi": {
    "id": "kale_kapisi",
    "name": "Kale Kapısı",
    "description": "Demir Külçe ve Tünel elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kale kapısı meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "vadi"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "muzik": {
    "id": "muzik",
    "name": "Müzik",
    "description": "Ceviz, Muz ve Ruh elementlerinin dengeli füzyonuyla yeni bir form olan müzik sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "disli_cark": {
    "id": "disli_cark",
    "name": "Dişli Çark",
    "description": "Dişli ve Çığ elementlerinin anlamsal ve fiziksel etkileşimi sonucunda dişli çark meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "kavrulmus_et": {
    "id": "kavrulmus_et",
    "name": "Kavrulmuş Et",
    "description": "Sarmaşık ve Tereyağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kavrulmuş et meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "vantilator"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "kamyon": {
    "id": "kamyon",
    "name": "Kamyon",
    "description": "Buharlı Gemi, El Arabası ve Otomobil elementlerinin dengeli füzyonuyla yeni bir form olan kamyon sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "metal",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "sabun": {
    "id": "sabun",
    "name": "Sabun",
    "description": "Kül ve yağın birleşimiyle üretilen köpüklü temizlik maddesi.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "iplik"
      ]
    },
    "icon": "✨",
    "category": "Temizlik & Hijyen",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "migfer": {
    "id": "migfer",
    "name": "Miğfer",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla miğfer ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "degirmen": {
    "id": "degirmen",
    "name": "Değirmen",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla değirmen ortaya çıkar.",
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
        "celik",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kelebek": {
    "id": "kelebek",
    "name": "Kelebek",
    "description": "Kireç ve Kulübe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kelebek meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "celik",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kanal": {
    "id": "kanal",
    "name": "Kanal",
    "description": "Buhar ve Tünel elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kanal meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "guguk_kusu"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "kunduz": {
    "id": "kunduz",
    "name": "Kunduz",
    "description": "Nehirlerde odunlarla barajlar inşa eden marifetli kemirgen.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "domates": {
    "id": "domates",
    "name": "Domates",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla domates ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "food",
    "trioRecipes": []
  },
  "yagmurluk": {
    "id": "yagmurluk",
    "name": "Yağmurluk",
    "description": "Su geçirmeyen koruyucu başlıklı ceket.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "dalis_tupu"
      ]
    },
    "icon": "✨",
    "category": "Giysi & Koruma",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "piramit": {
    "id": "piramit",
    "name": "Piramit",
    "description": "Granit, Gökkuşağı ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan piramit sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "cimento"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "koruk": {
    "id": "koruk",
    "name": "Körük",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla körük ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "motosiklet": {
    "id": "motosiklet",
    "name": "Motosiklet",
    "description": "Bisiklet ve İçten Yanmalı Motor elementlerinin anlamsal ve fiziksel etkileşimi sonucunda motosiklet meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "sera": {
    "id": "sera",
    "name": "Sera",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sera ortaya çıkar.",
    "tier": 11,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "zirh"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "prizma": {
    "id": "prizma",
    "name": "Prizma",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla prizma ortaya çıkar.",
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
        "hayvan",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kirpi": {
    "id": "kirpi",
    "name": "Kirpi",
    "description": "Sırtı dikenlerle kaplı sevimli küçük memeli.",
    "tier": 11,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "karbondioksit"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kuvars": {
    "id": "kuvars",
    "name": "Kuvars",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kuvars ortaya çıkar.",
    "tier": 7,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#f0f9ff",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "deniz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "turbin": {
    "id": "turbin",
    "name": "Türbin",
    "description": "Kule ve Meşale elementlerinin anlamsal ve fiziksel etkileşimi sonucunda türbin meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "aluminyum"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "zaman_kum_saati": {
    "id": "zaman_kum_saati",
    "name": "Zaman Kum Saati",
    "description": "Kum Saati ve Zaman elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zaman kum saati meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kalkan"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "kopek": {
    "id": "kopek",
    "name": "Köpek",
    "description": "Baykuş ve Hayvan elementlerinin anlamsal ve fiziksel etkileşimi sonucunda köpek meydana gelir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "aslan": {
    "id": "aslan",
    "name": "Aslan",
    "description": "Akrep ve Odun elementlerinin anlamsal ve fiziksel etkileşimi sonucunda aslan meydana gelir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#f59e0b",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
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
        "celik",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "baharat_cesnisi": {
    "id": "baharat_cesnisi",
    "name": "Baharat Çeşnisi",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla baharat çeşnisi ortaya çıkar.",
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
        "gunes"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kutsal_kase": {
    "id": "kutsal_kase",
    "name": "Kutsal Kase",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kutsal kase ortaya çıkar.",
    "tier": 7,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "pasta": {
    "id": "pasta",
    "name": "Pasta",
    "description": "Sarmaşık ve Tereyağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda pasta meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "tunel"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "vampir": {
    "id": "vampir",
    "name": "Vampir",
    "description": "Maya, Yılan ve Zehir Şişesi elementlerinin dengeli füzyonuyla yeni bir form olan vampir sentezlenir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "hayvan",
        "buz"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "magic",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "gazete": {
    "id": "gazete",
    "name": "Gazete",
    "description": "Ceviz ve Yazı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gazete meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "porselen": {
    "id": "porselen",
    "name": "Porselen",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla porselen ortaya çıkar.",
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
        "supurge",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "armut": {
    "id": "armut",
    "name": "Armut",
    "description": "Boşluk Şişesi, Kağıt Para ve Kentaurluk elementlerinin dengeli füzyonuyla yeni bir form olan armut sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "hortum"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "asteroit": {
    "id": "asteroit",
    "name": "Asteroit",
    "description": "Ametist, Aslan ve Fosil elementlerinin dengeli füzyonuyla yeni bir form olan asteroit sentezlenir.",
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
        "supurge",
        "tost"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "cark": {
    "id": "cark",
    "name": "Çark",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çark ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
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
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kasaba": {
    "id": "kasaba",
    "name": "Kasaba",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kasaba ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
    "archetype3d": "structure",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "gozetleme_kulesi": {
    "id": "gozetleme_kulesi",
    "name": "Gözetleme Kulesi",
    "description": "Granit, Gökkuşağı ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan gözetleme kulesi sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "el_feneri"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "barometre": {
    "id": "barometre",
    "name": "Barometre",
    "description": "Barut ve Barut Fıçısı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda barometre meydana gelir.",
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
  "felsefe_tasi": {
    "id": "felsefe_tasi",
    "name": "Felsefe Taşı",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla felsefe taşı ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "celik",
        "cekic"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "sarap": {
    "id": "sarap",
    "name": "Şarap",
    "description": "Alet, Barut Fıçısı ve Buhar elementlerinin dengeli füzyonuyla yeni bir form olan şarap sentezlenir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "food",
    "trioRecipes": []
  },
  "kaplan": {
    "id": "kaplan",
    "name": "Kaplan",
    "description": "Kahin Küresi, Kristal ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan kaplan sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#f59e0b",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "balik"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "cehennem_tasi": {
    "id": "cehennem_tasi",
    "name": "Cehennem Taşı",
    "description": "Evren, Tanrı ve Zehir Şişesi elementlerinin dengeli füzyonuyla yeni bir form olan cehennem taşı sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "murekkepbaligi"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "tablo": {
    "id": "tablo",
    "name": "Tablo",
    "description": "Meşale ve Reçel elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tablo meydana gelir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "bosluk_sisesi": {
    "id": "bosluk_sisesi",
    "name": "Boşluk Şişesi",
    "description": "Kehribar ve Çamur elementlerinin anlamsal ve fiziksel etkileşimi sonucunda boşluk şişesi meydana gelir.",
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
        "supurge",
        "kaya"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "borsa": {
    "id": "borsa",
    "name": "Borsa",
    "description": "Dükkan, Pazar ve Zincir elementlerinin dengeli füzyonuyla yeni bir form olan borsa sentezlenir.",
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
        "supurge",
        "su"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kabile": {
    "id": "kabile",
    "name": "Kabile",
    "description": "Kartal ve Kasaba elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kabile meydana gelir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "buz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "kaldirim": {
    "id": "kaldirim",
    "name": "Kaldırım",
    "description": "Mana İksiri, Mancınık ve Sağlam Sandık elementlerinin dengeli füzyonuyla yeni bir form olan kaldırım sentezlenir.",
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
        "su",
        "orman"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "vinc": {
    "id": "vinc",
    "name": "Vinç",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla vinç ortaya çıkar.",
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
        "hava"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "trioRecipes": []
  },
  "igne": {
    "id": "igne",
    "name": "İğne",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla i̇ğne ortaya çıkar.",
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
    "trioRecipes": []
  },
  "denizkizi": {
    "id": "denizkizi",
    "name": "Denizkızı",
    "description": "Sarımsak ve İnek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda denizkızı meydana gelir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
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
    "category": "03_canlilar",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "uzay_gemisi": {
    "id": "uzay_gemisi",
    "name": "Uzay Gemisi",
    "description": "Geyik ve Uzay elementlerinin anlamsal ve fiziksel etkileşimi sonucunda uzay gemisi meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "magara"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "radyo": {
    "id": "radyo",
    "name": "Radyo",
    "description": "Cam, Müzik ve Radyasyon elementlerinin dengeli füzyonuyla yeni bir form olan radyo sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "iksir": {
    "id": "iksir",
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
        "odun",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "gunes_saati": {
    "id": "gunes_saati",
    "name": "Güneş Saati",
    "description": "Alacakaranlık ve Kum Saati elementlerinin anlamsal ve fiziksel etkileşimi sonucunda güneş saati meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "dal"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "kozmik_usturlap": {
    "id": "kozmik_usturlap",
    "name": "Kozmik Usturlap",
    "description": "Gezegen ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kozmik usturlap meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "tutkal"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kara_delik": {
    "id": "kara_delik",
    "name": "Kara Delik",
    "description": "Işığın bile kaçamadığı devasa çekim alanına sahip uzay girdabı.",
    "tier": 9,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "Uzay & Kozmoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "hayalet": {
    "id": "hayalet",
    "name": "Hayalet",
    "description": "Balta ve İğne elementlerinin anlamsal ve fiziksel etkileşimi sonucunda hayalet meydana gelir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
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
    "archetype3d": "mech",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "muska": {
    "id": "muska",
    "name": "Muska",
    "description": "Makas, Muz ve Tufan elementlerinin dengeli füzyonuyla yeni bir form olan muska sentezlenir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "simya": {
    "id": "simya",
    "name": "Simya",
    "description": "Balta ve Cıva elementlerinin anlamsal ve fiziksel etkileşimi sonucunda simya meydana gelir.",
    "tier": 3,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "davul": {
    "id": "davul",
    "name": "Davul",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla davul ortaya çıkar.",
    "tier": 4,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "toprak",
        "ruzg_r"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "yilan": {
    "id": "yilan",
    "name": "Yılan",
    "description": "Kurbağa, Kurşun ve Zümrüt elementlerinin dengeli füzyonuyla yeni bir form olan yılan sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
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
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "okul": {
    "id": "okul",
    "name": "Okul",
    "description": "Kentaurluk ve Medeniyet elementlerinin anlamsal ve fiziksel etkileşimi sonucunda okul meydana gelir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "buz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "ilkel_bicak": {
    "id": "ilkel_bicak",
    "name": "İlkel Bıçak",
    "description": "Metal Bıçak ve Porselen elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇lkel bıçak meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "odun",
        "cekic"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "uydu": {
    "id": "uydu",
    "name": "Uydu",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla uydu ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "yosun"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "fil": {
    "id": "fil",
    "name": "Fil",
    "description": "Dev hortumu ve fildişleriyle yeryüzünün en büyük kara memelisi.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "sarimsak"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "medeniyet": {
    "id": "medeniyet",
    "name": "Medeniyet",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla medeniyet ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "tugla"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "galaksi": {
    "id": "galaksi",
    "name": "Galaksi",
    "description": "Minyatür Yıldız ve Nebula elementlerinin anlamsal ve fiziksel etkileşimi sonucunda galaksi meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kutup"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "korsan": {
    "id": "korsan",
    "name": "Korsan",
    "description": "Denizlerde hazine peşinde koşan gözüpek denizci.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "yaprak"
      ]
    },
    "icon": "✨",
    "category": "Tarih & Meslek",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "peri": {
    "id": "peri",
    "name": "Peri",
    "description": "Pil ve Pirinç elementlerinin anlamsal ve fiziksel etkileşimi sonucunda peri meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "lif"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "zumrut": {
    "id": "zumrut",
    "name": "Zümrüt",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla zümrüt ortaya çıkar.",
    "tier": 4,
    "colorPalette": {
      "primary": "#059669",
      "secondary": "#6ee7b7",
      "emissive": "#064e3b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ren_geyigi": {
    "id": "ren_geyigi",
    "name": "Ren Geyiği",
    "description": "Kutup soğuklarında ve tundrada yaşayan çatallı boynuzlu geyik.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "zeytin"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kristal": {
    "id": "kristal",
    "name": "Kristal",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kristal ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#38bdf8",
      "secondary": "#f0f9ff",
      "emissive": "#0284c7"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "buzul"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kazan": {
    "id": "kazan",
    "name": "Kazan",
    "description": "Dinamolu Fener, Kasaba ve Zeytin elementlerinin dengeli füzyonuyla yeni bir form olan kazan sentezlenir.",
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
    "trioRecipes": []
  },
  "granit": {
    "id": "granit",
    "name": "Granit",
    "description": "Hava ve Toprak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda granit meydana gelir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kitap"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "mektup": {
    "id": "mektup",
    "name": "Mektup",
    "description": "Duygu ve haberleri ulaştıran mühürlü kağıt mesaj.",
    "tier": 11,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "mizrak"
      ]
    },
    "icon": "✨",
    "category": "İletişim & Yazı",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "roket": {
    "id": "roket",
    "name": "Roket",
    "description": "Kule, Lokomotif ve Rün elementlerinin dengeli füzyonuyla yeni bir form olan roket sentezlenir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "cam",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "pegasus": {
    "id": "pegasus",
    "name": "Pegasus",
    "description": "Aurora, Kuş ve Nilüfer elementlerinin dengeli füzyonuyla yeni bir form olan pegasus sentezlenir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "meyve_bahcesi": {
    "id": "meyve_bahcesi",
    "name": "Meyve Bahçesi",
    "description": "Çilek ve Çiçek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda meyve bahçesi meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#16a34a",
      "secondary": "#4ade80",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "muze"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flora",
    "trioRecipes": []
  },
  "ilac": {
    "id": "ilac",
    "name": "İlaç",
    "description": "Hastalıkları iyileştiren şifalı bitkisel ve kimyasal bileşen.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "atom"
      ]
    },
    "icon": "✨",
    "category": "Tıp & Sağlık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "su_comlegi": {
    "id": "su_comlegi",
    "name": "Su Çömleği",
    "description": "Baharat Çeşnisi ve Göl elementlerinin anlamsal ve fiziksel etkileşimi sonucunda su çömleği meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kakao"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "kerberos": {
    "id": "kerberos",
    "name": "Kerberos",
    "description": "Yeraltı dünyasının kapılarını bekleyen üç başlı alev köpeği.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kirec"
      ]
    },
    "icon": "✨",
    "category": "Mitoloji & Yaratık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "seytan": {
    "id": "seytan",
    "name": "Şeytan",
    "description": "Tanrı ve Zehir Şişesi elementlerinin anlamsal ve fiziksel etkileşimi sonucunda şeytan meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "plazma": {
    "id": "plazma",
    "name": "Plazma",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla plazma ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "tuz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "sifa_iksiri": {
    "id": "sifa_iksiri",
    "name": "Şifa İksiri",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şifa i̇ksiri ortaya çıkar.",
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
        "tas",
        "civi"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ipekbocegi": {
    "id": "ipekbocegi",
    "name": "İpekböceği",
    "description": "Anka Kuşu ve Örümcek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇pekböceği meydana gelir.",
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
        "kazma",
        "beyin"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kandil": {
    "id": "kandil",
    "name": "Kandil",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kandil ortaya çıkar.",
    "tier": 11,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "olta"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "gece": {
    "id": "gece",
    "name": "Gece",
    "description": "Alacakaranlık ve Yatak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda gece meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "tutulma": {
    "id": "tutulma",
    "name": "Tutulma",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan tutulma sentezlenir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "sovalye"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "ay": {
    "id": "ay",
    "name": "Ay",
    "description": "Anka Külü ve Un elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ay meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kus_evi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "kedi": {
    "id": "kedi",
    "name": "Kedi",
    "description": "Baykuş ve Lif elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kedi meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kagit_para": {
    "id": "kagit_para",
    "name": "Kağıt Para",
    "description": "Hazine, Pazar ve Zincir elementlerinin dengeli füzyonuyla yeni bir form olan kağıt para sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "selale"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "tuy": {
    "id": "tuy",
    "name": "Tüy",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan tüy sentezlenir.",
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
        "kazma",
        "akvaryum"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "nebula": {
    "id": "nebula",
    "name": "Nebula",
    "description": "Evren, Gezegen ve Gökkuşağı elementlerinin dengeli füzyonuyla yeni bir form olan nebula sentezlenir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "somon": {
    "id": "somon",
    "name": "Somon",
    "description": "Büyü, Kandil ve Sosis elementlerinin dengeli füzyonuyla yeni bir form olan somon sentezlenir.",
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
        "kazma",
        "komur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "boynuz": {
    "id": "boynuz",
    "name": "Boynuz",
    "description": "Ayı, Miğfer ve Zombi elementlerinin dengeli füzyonuyla yeni bir form olan boynuz sentezlenir.",
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
        "kazma",
        "anit"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "plato": {
    "id": "plato",
    "name": "Plato",
    "description": "Manyetizma, Yunus ve İnci elementlerinin dengeli füzyonuyla yeni bir form olan plato sentezlenir.",
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
        "kristal",
        "elmas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bakteri": {
    "id": "bakteri",
    "name": "Bakteri",
    "description": "Köpekbalığı, Pasta ve İllüzyon Aynası elementlerinin dengeli füzyonuyla yeni bir form olan bakteri sentezlenir.",
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
        "kazma",
        "supernova"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "zehirli_sivi": {
    "id": "zehirli_sivi",
    "name": "Zehirli Sıvı",
    "description": "Plazma Tüfeği, Zehir Şişesi ve İllüzyon Aynası elementlerinin dengeli füzyonuyla yeni bir form olan zehirli sıvı sentezlenir.",
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
        "tas",
        "cekic"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tarak": {
    "id": "tarak",
    "name": "Tarak",
    "description": "Saçları düzeltmek ve taramak için dişli alet.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "korfez"
      ]
    },
    "icon": "✨",
    "category": "Kişisel Bakım",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yercekimsiz_platform": {
    "id": "yercekimsiz_platform",
    "name": "Yerçekimsiz Platform",
    "description": "Güneş Paneli, Lokomotif ve İnternet elementlerinin dengeli füzyonuyla yeni bir form olan yerçekimsiz platform sentezlenir.",
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
        "enerji",
        "yildirim"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "barut_ficisi": {
    "id": "barut_ficisi",
    "name": "Barut Fıçısı",
    "description": "Bataklık ve Felsefe Taşı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda barut fıçısı meydana gelir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ea580c",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "banka": {
    "id": "banka",
    "name": "Banka",
    "description": "Barut, Kağıt Para ve Zincir elementlerinin dengeli füzyonuyla yeni bir form olan banka sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kibrit"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "corba": {
    "id": "corba",
    "name": "Çorba",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla çorba ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "cali"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "ruzgar_gulu": {
    "id": "ruzgar_gulu",
    "name": "Rüzgar Gülü",
    "description": "Fırtına ve Rüzgar elementlerinin anlamsal ve fiziksel etkileşimi sonucunda rüzgar gülü meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "tundra"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "heykel": {
    "id": "heykel",
    "name": "Heykel",
    "description": "Tılsım ve Yelken elementlerinin anlamsal ve fiziksel etkileşimi sonucunda heykel meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "anka_kusu"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "kano": {
    "id": "kano",
    "name": "Kano",
    "description": "Anka Külü ve Kürek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kano meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "lav"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yun": {
    "id": "yun",
    "name": "Yün",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yün ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "vadi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "camur"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "durbun": {
    "id": "durbun",
    "name": "Dürbün",
    "description": "Uzak mesafeleri iki gözle yakınlaştıran optik alet.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "vantilator"
      ]
    },
    "icon": "✨",
    "category": "Alet & Optik",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yildiz": {
    "id": "yildiz",
    "name": "Yıldız",
    "description": "Gezegen ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yıldız meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "iplik"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "kutuphane": {
    "id": "kutuphane",
    "name": "Kütüphane",
    "description": "Gazete, Kitap ve Müze elementlerinin dengeli füzyonuyla yeni bir form olan kütüphane sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "guguk_kusu"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "parfum": {
    "id": "parfum",
    "name": "Parfüm",
    "description": "Çiçek özlerinin alkolle damıtılmasıyla yapılan hoş koku.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "Kozmetik & Koku",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "zeplin": {
    "id": "zeplin",
    "name": "Zeplin",
    "description": "Dinamit, Sinema ve İnek elementlerinin dengeli füzyonuyla yeni bir form olan zeplin sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "dalis_tupu"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "anka_kulu": {
    "id": "anka_kulu",
    "name": "Anka Külü",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla anka külü ortaya çıkar.",
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
        "kazma",
        "cimento"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "gurz": {
    "id": "gurz",
    "name": "Gürz",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla gürz ortaya çıkar.",
    "tier": 11,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "zirh"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mech",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "portakal": {
    "id": "portakal",
    "name": "Portakal",
    "description": "Kartal ve Melek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda portakal meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#ea580c",
      "secondary": "#fb923c",
      "emissive": "#7c2d12"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "aluminyum"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "parasut": {
    "id": "parasut",
    "name": "Paraşüt",
    "description": "Yüksekten güvenle süzülerek inmeyi sağlayan kumaş kubbe.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kalkan"
      ]
    },
    "icon": "✨",
    "category": "Havacılık & Araç",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "runik_zirh": {
    "id": "runik_zirh",
    "name": "Runik Zırh",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla runik zırh ortaya çıkar.",
    "tier": 11,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "tunel"
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
    "description": "Hücre, Salça ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan top sentezlenir.",
    "tier": 4,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "girdap": {
    "id": "girdap",
    "name": "Girdap",
    "description": "Geyik ve Çivi elementlerinin anlamsal ve fiziksel etkileşimi sonucunda girdap meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "titanyum": {
    "id": "titanyum",
    "name": "Titanyum",
    "description": "Bronz, Metal ve Zombi elementlerinin dengeli füzyonuyla yeni bir form olan titanyum sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "hortum"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "firtina_bulutu": {
    "id": "firtina_bulutu",
    "name": "Fırtına Bulutu",
    "description": "Gökkuşağı ve Çamur elementlerinin anlamsal ve fiziksel etkileşimi sonucunda fırtına bulutu meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#cbd5e1",
      "emissive": "#475569"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "tost"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "gas",
    "trioRecipes": []
  },
  "baharat": {
    "id": "baharat",
    "name": "Baharat",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla baharat ortaya çıkar.",
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
        "kazma",
        "el_feneri"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tilki": {
    "id": "tilki",
    "name": "Tilki",
    "description": "Kızıl kürkü ve kurnazlığıyla tanınan orman avcısı.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "balik"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sekerleme": {
    "id": "sekerleme",
    "name": "Şekerleme",
    "description": "Meyve aromalı tatlı rengarenk şeker.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "murekkepbaligi"
      ]
    },
    "icon": "✨",
    "category": "Gıda & Tatlı",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "hidra": {
    "id": "hidra",
    "name": "Hidra",
    "description": "Kafası kesildikçe yerine yenisi çıkan çok başlı bataklık ejderi.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kaya"
      ]
    },
    "icon": "✨",
    "category": "Mitoloji & Yaratık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sirke": {
    "id": "sirke",
    "name": "Sirke",
    "description": "Halat, Hesap Makinesi ve Köy elementlerinin dengeli füzyonuyla yeni bir form olan sirke sentezlenir.",
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
        "cam",
        "civi"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tilsim": {
    "id": "tilsim",
    "name": "Tılsım",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla tılsım ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "su"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "kanguru": {
    "id": "kanguru",
    "name": "Kanguru",
    "description": "Güçlü bacaklarıyla zıplayan ve yavrusunu kesesinde taşıyan canlı.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "magara"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "uzayli": {
    "id": "uzayli",
    "name": "Uzaylı",
    "description": "Dünya dışı gezegenlerden gelen akıllı varlık.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "dal"
      ]
    },
    "icon": "✨",
    "category": "Uzay & Bilim Kurgu",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tank": {
    "id": "tank",
    "name": "Tank",
    "description": "Paletli ağır zırhlı ve toplu muharebe aracı.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "tutkal"
      ]
    },
    "icon": "✨",
    "category": "Askeri & Araç",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "asker": {
    "id": "asker",
    "name": "Asker",
    "description": "Vatanını savunan eğitimli ve silahlı savaşçı.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kazma",
        "kus"
      ]
    },
    "icon": "✨",
    "category": "Tarih & Meslek",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "bogurtlen": {
    "id": "bogurtlen",
    "name": "Böğürtlen",
    "description": "Çalılarda yetişen sulu tatlı yabani meyve.",
    "tier": 8,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "sarimsak"
      ]
    },
    "icon": "✨",
    "category": "Flora & Meyveler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
        "yosun",
        "tugla"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "hindistan_cevizi": {
    "id": "hindistan_cevizi",
    "name": "Hindistan Cevizi",
    "description": "Palmiyelerde yetişen sert kabuklu sütlü meyve.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "kutup"
      ]
    },
    "icon": "✨",
    "category": "Flora & Meyveler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "mezar": {
    "id": "mezar",
    "name": "Mezar",
    "description": "Taş anıtla işaretlenmiş ebedi istirahat yeri.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "fiskiye"
      ]
    },
    "icon": "✨",
    "category": "Tarih & Yapı",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "tanri": {
    "id": "tanri",
    "name": "Tanrı",
    "description": "Evren ve İnsan elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tanrı meydana gelir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "yaprak"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "kova": {
    "id": "kova",
    "name": "Kova",
    "description": "Su ve sıvı taşımaya yarayan kulplu metal/ahşap kap.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "lif"
      ]
    },
    "icon": "✨",
    "category": "Ev & Depolama",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "alfabe": {
    "id": "alfabe",
    "name": "Alfabe",
    "description": "Asa ve Yazı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda alfabe meydana gelir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "zeytin"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "alacakaranlik": {
    "id": "alacakaranlik",
    "name": "Alacakaranlık",
    "description": "Gökkuşağı ve Mızrak elementlerinin anlamsal ve fiziksel etkileşimi sonucunda alacakaranlık meydana gelir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "buzul"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "ruh": {
    "id": "ruh",
    "name": "Ruh",
    "description": "Kertenkele ve Mercan Kayalığı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ruh meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "mizrak"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "muze"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "golem": {
    "id": "golem",
    "name": "Golem",
    "description": "Badem, Dolu ve Totem elementlerinin dengeli füzyonuyla yeni bir form olan golem sentezlenir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "atom"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "mercan": {
    "id": "mercan",
    "name": "Mercan",
    "description": "Cıva ve Mercek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda mercan meydana gelir.",
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
        "bicak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ucurtma": {
    "id": "ucurtma",
    "name": "Uçurtma",
    "description": "Toprağın su ile doyması ve yoğrulması sonucu viskoz ve şekillendirilebilir uçurtma meydana gelir.",
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
        "yosun",
        "kakao"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sahin": {
    "id": "sahin",
    "name": "Şahin",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla şahin ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "kar"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "gunes_paneli": {
    "id": "gunes_paneli",
    "name": "Güneş Paneli",
    "description": "Güneş Saati, Kum Saati ve Teleskop elementlerinin dengeli füzyonuyla yeni bir form olan güneş paneli sentezlenir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "enerji",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "flame",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "kirec"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "mesale": {
    "id": "mesale",
    "name": "Meşale",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla meşale ortaya çıkar.",
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
        "tuz"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yel_degirmeni": {
    "id": "yel_degirmeni",
    "name": "Yel Değirmeni",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan yel değirmeni sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "cekic"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "structure",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "zirhli_gemi": {
    "id": "zirhli_gemi",
    "name": "Zırhlı Gemi",
    "description": "Buhar Jeneratörü ve Denizanası elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zırhlı gemi meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "olta"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kahin_kuresi": {
    "id": "kahin_kuresi",
    "name": "Kahin Küresi",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan kahin küresi sentezlenir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "sovalye"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "bomba": {
    "id": "bomba",
    "name": "Bomba",
    "description": "Dinamit, Kasırga ve Roket elementlerinin dengeli füzyonuyla yeni bir form olan bomba sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ea580c",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "kus_evi"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "solid",
    "trioRecipes": []
  },
  "helikopter": {
    "id": "helikopter",
    "name": "Helikopter",
    "description": "Roket, Teleskop ve Uçak elementlerinin dengeli füzyonuyla yeni bir form olan helikopter sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "hazine": {
    "id": "hazine",
    "name": "Hazine",
    "description": "Müze ve Çömlek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda hazine meydana gelir.",
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
        "yosun",
        "selale"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "maya": {
    "id": "maya",
    "name": "Maya",
    "description": "Balina, Odun ve Yün elementlerinin dengeli füzyonuyla yeni bir form olan maya sentezlenir.",
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
        "akvaryum"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "mercan_kayaligi": {
    "id": "mercan_kayaligi",
    "name": "Mercan Kayalığı",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mercan kayalığı ortaya çıkar.",
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
        "yosun",
        "komur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "hologram_kupu": {
    "id": "hologram_kupu",
    "name": "Hologram Küpü",
    "description": "Fotoğraf, Hortum ve Mikroskop elementlerinin dengeli füzyonuyla yeni bir form olan hologram küpü sentezlenir.",
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
        "isik",
        "yildirim"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "anten": {
    "id": "anten",
    "name": "Anten",
    "description": "Elektromanyetik dalgaları alıp yayan metal çubuk.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "anit"
      ]
    },
    "icon": "✨",
    "category": "Teknoloji & İletişim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yogurt": {
    "id": "yogurt",
    "name": "Yoğurt",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yoğurt ortaya çıkar.",
    "tier": 6,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "supernova"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "radar": {
    "id": "radar",
    "name": "Radar",
    "description": "Radyo ve Teleskop elementlerinin anlamsal ve fiziksel etkileşimi sonucunda radar meydana gelir.",
    "tier": 5,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "isik",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "sfenks": {
    "id": "sfenks",
    "name": "Sfenks",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan sfenks sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
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
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kristal_kure": {
    "id": "kristal_kure",
    "name": "Kristal Küre",
    "description": "Geleceği ve gizemleri gösteren parlayan büyü küresi.",
    "tier": 7,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "korfez"
      ]
    },
    "icon": "✨",
    "category": "Mistik & Büyü",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "illuzyon_aynasi": {
    "id": "illuzyon_aynasi",
    "name": "İllüzyon Aynası",
    "description": "Fosil ve İksir elementlerinin anlamsal ve fiziksel etkileşimi sonucunda i̇llüzyon aynası meydana gelir.",
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
        "yosun",
        "kibrit"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "asa": {
    "id": "asa",
    "name": "Asa",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla asa ortaya çıkar.",
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
        "yosun",
        "cali"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "obelisk": {
    "id": "obelisk",
    "name": "Obelisk",
    "description": "Ampul, Kahin Küresi ve Uçurtma elementlerinin dengeli füzyonuyla yeni bir form olan obelisk sentezlenir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "tundra"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "mikrocip": {
    "id": "mikrocip",
    "name": "Mikroçip",
    "description": "Halat, Mikroskop ve Siber Kristal elementlerinin dengeli füzyonuyla yeni bir form olan mikroçip sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
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
      "color": "#ffffff",
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
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "lazer": {
    "id": "lazer",
    "name": "Lazer",
    "description": "Fener ve Lav elementlerinin anlamsal ve fiziksel etkileşimi sonucunda lazer meydana gelir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "anka_kusu"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "telefon": {
    "id": "telefon",
    "name": "Telefon",
    "description": "Telgraf, İnternet ve İplik elementlerinin dengeli füzyonuyla yeni bir form olan telefon sentezlenir.",
    "tier": 6,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "nehir"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "havyar": {
    "id": "havyar",
    "name": "Havyar",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla havyar ortaya çıkar.",
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
        "lav"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "asit_yagmuru": {
    "id": "asit_yagmuru",
    "name": "Asit Yağmuru",
    "description": "Kalkan, Kasırga ve Yoğurt elementlerinin dengeli füzyonuyla yeni bir form olan asit yağmuru sentezlenir.",
    "tier": 7,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "vadi"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "mana": {
    "id": "mana",
    "name": "Mana",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mana ortaya çıkar.",
    "tier": 8,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "vantilator"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
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
        "kumas",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "piyano": {
    "id": "piyano",
    "name": "Piyano",
    "description": "Gitar, Müzik ve Sincap elementlerinin dengeli füzyonuyla yeni bir form olan piyano sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "iplik"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "fabric",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "solucan": {
    "id": "solucan",
    "name": "Solucan",
    "description": "Halat, Parşömen ve Sincap elementlerinin dengeli füzyonuyla yeni bir form olan solucan sentezlenir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "civi"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "bicak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "darphane": {
    "id": "darphane",
    "name": "Darphane",
    "description": "Ampul, Halat ve Nane elementlerinin dengeli füzyonuyla yeni bir form olan darphane sentezlenir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
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
        "guguk_kusu"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "kurt_adam": {
    "id": "kurt_adam",
    "name": "Kurt Adam",
    "description": "Kurt ve Yunus elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kurt adam meydana gelir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "kagit"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "uzum": {
    "id": "uzum",
    "name": "Üzüm",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla üzüm ortaya çıkar.",
    "tier": 7,
    "colorPalette": {
      "primary": "#7e22ce",
      "secondary": "#a855f7",
      "emissive": "#3b0764"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "dalis_tupu"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "timsah": {
    "id": "timsah",
    "name": "Timsah",
    "description": "Alet ve Tepe elementlerinin anlamsal ve fiziksel etkileşimi sonucunda timsah meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "kumas",
        "cekic"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "yaban_domuzu": {
    "id": "yaban_domuzu",
    "name": "Yaban Domuzu",
    "description": "Ormanlarda yaşayan güçlü ve dişli vahşi domuz.",
    "tier": 6,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "cimento"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "savas_baltasi": {
    "id": "savas_baltasi",
    "name": "Savaş Baltası",
    "description": "Harç ve Kasırga elementlerinin anlamsal ve fiziksel etkileşimi sonucunda savaş baltası meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "zirh"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kopekbaligi": {
    "id": "kopekbaligi",
    "name": "Köpekbalığı",
    "description": "Balık ve Denizanası elementlerinin anlamsal ve fiziksel etkileşimi sonucunda köpekbalığı meydana gelir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "yosun",
        "karbondioksit"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "sicak_hava_balonu": {
    "id": "sicak_hava_balonu",
    "name": "Sıcak Hava Balonu",
    "description": "Rüzgar Gülü, Termometre ve Uçak elementlerinin dengeli füzyonuyla yeni bir form olan sıcak hava balonu sentezlenir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#ef4444",
      "secondary": "#f97316",
      "emissive": "#b91c1c"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kopekbaligi"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "flame",
    "trioRecipes": []
  },
  "kavurma": {
    "id": "kavurma",
    "name": "Kavurma",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kavurma ortaya çıkar.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "ates"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "food",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kavurma"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "mikroskop": {
    "id": "mikroskop",
    "name": "Mikroskop",
    "description": "Kemik, Mürekkep ve Teleskop elementlerinin dengeli füzyonuyla yeni bir form olan mikroskop sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "boyut_kapisi"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "mana_iksiri": {
    "id": "mana_iksiri",
    "name": "Mana İksiri",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla mana i̇ksiri ortaya çıkar.",
    "tier": 12,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "sal"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "evren": {
    "id": "evren",
    "name": "Evren",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla evren ortaya çıkar.",
    "tier": 13,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "mana_iksiri"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "biber": {
    "id": "biber",
    "name": "Biber",
    "description": "Evren ve Kristal elementlerinin anlamsal ve fiziksel etkileşimi sonucunda biber meydana gelir.",
    "tier": 14,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "evren"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "ametist": {
    "id": "ametist",
    "name": "Ametist",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ametist ortaya çıkar.",
    "tier": 8,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c4b5fd",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "su"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "el_arabasi": {
    "id": "el_arabasi",
    "name": "El Arabası",
    "description": "Lokomotif ve Otomobil elementlerinin anlamsal ve fiziksel etkileşimi sonucunda el arabası meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "ametist"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "kulube": {
    "id": "kulube",
    "name": "Kulübe",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kulübe ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "el_arabasi"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "para": {
    "id": "para",
    "name": "Para",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla para ortaya çıkar.",
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
        "ip",
        "toprak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yumurta": {
    "id": "yumurta",
    "name": "Yumurta",
    "description": "Karınca, Kuş ve Sarmaşık elementlerinin dengeli füzyonuyla yeni bir form olan yumurta sentezlenir.",
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
        "supurge",
        "para"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yildirim_parsomeni": {
    "id": "yildirim_parsomeni",
    "name": "Yıldırım Parşömeni",
    "description": "Fırtına Kılıcı ve Gökkuşağı elementlerinin anlamsal ve fiziksel etkileşimi sonucunda yıldırım parşömeni meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#38bdf8",
      "emissive": "#ca8a04"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "yumurta"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "electric",
    "trioRecipes": []
  },
  "misir": {
    "id": "misir",
    "name": "Mısır",
    "description": "Uçurtma, Zeytin ve İmparatorluk elementlerinin dengeli füzyonuyla yeni bir form olan mısır sentezlenir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "yildirim_parsomeni"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "yatak": {
    "id": "yatak",
    "name": "Yatak",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yatak ortaya çıkar.",
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
        "supurge",
        "misir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "makas": {
    "id": "makas",
    "name": "Makas",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan makas sentezlenir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "hava"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "deri_zirh": {
    "id": "deri_zirh",
    "name": "Deri Zırh",
    "description": "Mağara ve Zırh elementlerinin anlamsal ve fiziksel etkileşimi sonucunda deri zırh meydana gelir.",
    "tier": 9,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "makas"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "televizyon": {
    "id": "televizyon",
    "name": "Televizyon",
    "description": "Cam, Sinema ve Tiyatro elementlerinin dengeli füzyonuyla yeni bir form olan televizyon sentezlenir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#0ea5e9",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "deri_zirh"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "salca": {
    "id": "salca",
    "name": "Salça",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla salça ortaya çıkar.",
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
        "ip",
        "enerji"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "matara": {
    "id": "matara",
    "name": "Matara",
    "description": "Yolculuklarda su ve içecek taşımaya yarayan dayanıklı şişe.",
    "tier": 10,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "buhar_motoru"
      ]
    },
    "icon": "✨",
    "category": "Macera & Eşya",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "cilek": {
    "id": "cilek",
    "name": "Çilek",
    "description": "Melek, Sarımsak ve Yaprak elementlerinin dengeli füzyonuyla yeni bir form olan çilek sentezlenir.",
    "tier": 11,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "matara"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "karadelik": {
    "id": "karadelik",
    "name": "Karadelik",
    "description": "Kükürt, Runik Zırh ve Tünel elementlerinin dengeli füzyonuyla yeni bir form olan karadelik sentezlenir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#1e1b4b",
      "secondary": "#312e81",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "cilek"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "tufek": {
    "id": "tufek",
    "name": "Tüfek",
    "description": "Harç ve Rün elementlerinin anlamsal ve fiziksel etkileşimi sonucunda tüfek meydana gelir.",
    "tier": 8,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#ef4444",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "isik"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "lokomotif": {
    "id": "lokomotif",
    "name": "Lokomotif",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan lokomotif sentezlenir.",
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
        "supurge",
        "tufek"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "matbaa": {
    "id": "matbaa",
    "name": "Matbaa",
    "description": "Balta, Pamuk ve Çorba elementlerinin dengeli füzyonuyla yeni bir form olan matbaa sentezlenir.",
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
        "supurge",
        "lokomotif"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ipek": {
    "id": "ipek",
    "name": "İpek",
    "description": "Kumaş, Porselen ve Taş elementlerinin dengeli füzyonuyla yeni bir form olan i̇pek sentezlenir.",
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
        "supurge",
        "matbaa"
      ]
    },
    "icon": "✨",
    "category": "05_maden_ve_materyaller",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ejderha": {
    "id": "ejderha",
    "name": "Ejderha",
    "description": "Ahtapot ve Yelken elementlerinin anlamsal ve fiziksel etkileşimi sonucunda ejderha meydana gelir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "ipek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "tesla_bobini": {
    "id": "tesla_bobini",
    "name": "Tesla Bobini",
    "description": "Kurt, Robot ve Titanyum elementlerinin dengeli füzyonuyla yeni bir form olan tesla bobini sentezlenir.",
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
        "supurge",
        "ejderha"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ayi": {
    "id": "ayi",
    "name": "Ayı",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla ayı ortaya çıkar.",
    "tier": 14,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "tesla_bobini"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "sinema": {
    "id": "sinema",
    "name": "Sinema",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sinema ortaya çıkar.",
    "tier": 15,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "ayi"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "iksir_kazani": {
    "id": "iksir_kazani",
    "name": "İksir Kazanı",
    "description": "Hava, Su ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan i̇ksir kazanı sentezlenir.",
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
        "ip",
        "insan"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "muz": {
    "id": "muz",
    "name": "Muz",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla muz ortaya çıkar.",
    "tier": 9,
    "colorPalette": {
      "primary": "#eab308",
      "secondary": "#fde047",
      "emissive": "#854d0e"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "iksir_kazani"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "su_degirmeni": {
    "id": "su_degirmeni",
    "name": "Su Değirmeni",
    "description": "Asit Yağmuru ve Su Çömleği elementlerinin anlamsal ve fiziksel etkileşimi sonucunda su değirmeni meydana gelir.",
    "tier": 10,
    "colorPalette": {
      "primary": "#0284c7",
      "secondary": "#38bdf8",
      "emissive": "#0369a1"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "muz"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fluid",
    "trioRecipes": []
  },
  "sosis": {
    "id": "sosis",
    "name": "Sosis",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sosis ortaya çıkar.",
    "tier": 11,
    "colorPalette": {
      "primary": "#dc2626",
      "secondary": "#f87171",
      "emissive": "#7f1d1d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "su_degirmeni"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "tapinak": {
    "id": "tapinak",
    "name": "Tapınak",
    "description": "Anıt, Piramit ve Prizma Taşı elementlerinin dengeli füzyonuyla yeni bir form olan tapınak sentezlenir.",
    "tier": 12,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "sosis"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "zincir": {
    "id": "zincir",
    "name": "Zincir",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla zincir ortaya çıkar.",
    "tier": 11,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "civi"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "deve": {
    "id": "deve",
    "name": "Deve",
    "description": "Çöl sıcağına ve susuzluğa dayanıklı hörgüçlü hayvan.",
    "tier": 12,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "zincir"
      ]
    },
    "icon": "✨",
    "category": "Fauna & Hayvanlar",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "pil": {
    "id": "pil",
    "name": "Pil",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla pil ortaya çıkar.",
    "tier": 10,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "ip",
        "cekic"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "pil"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
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
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "parsomen"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "zehir": {
    "id": "zehir",
    "name": "Zehir",
    "description": "Balta ve Geyik elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zehir meydana gelir.",
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
        "supurge",
        "dinamolu_fener"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "uranyum": {
    "id": "uranyum",
    "name": "Uranyum",
    "description": "Ahtapot, Uzay ve İllüzyon Aynası elementlerinin dengeli füzyonuyla yeni bir form olan uranyum sentezlenir.",
    "tier": 14,
    "colorPalette": {
      "primary": "#22c55e",
      "secondary": "#86efac",
      "emissive": "#15803d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "zehir"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "flut": {
    "id": "flut",
    "name": "Flüt",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla flüt ortaya çıkar.",
    "tier": 15,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "uranyum"
      ]
    },
    "icon": "✨",
    "category": "01_elements",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "kentaur": {
    "id": "kentaur",
    "name": "Kentaur",
    "description": "Gövdesi insan, altı at olan efsanevi orman savaşçısı.",
    "tier": 16,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "flut"
      ]
    },
    "icon": "✨",
    "category": "Mitoloji & Yaratık",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "ari": {
    "id": "ari",
    "name": "Arı",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla arı ortaya çıkar.",
    "tier": 17,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#f59e0b",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kentaur"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kurabiye": {
    "id": "kurabiye",
    "name": "Kurabiye",
    "description": "Ekmek, Sarımsak ve Şeker elementlerinin dengeli füzyonuyla yeni bir form olan kurabiye sentezlenir.",
    "tier": 18,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fbbf24",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "ari"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "food",
    "trioRecipes": []
  },
  "mercek": {
    "id": "mercek",
    "name": "Mercek",
    "description": "Hamur, Melek ve Yakut elementlerinin dengeli füzyonuyla yeni bir form olan mercek sentezlenir.",
    "tier": 19,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kurabiye"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kertenkele": {
    "id": "kertenkele",
    "name": "Kertenkele",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kertenkele ortaya çıkar.",
    "tier": 20,
    "colorPalette": {
      "primary": "#15803d",
      "secondary": "#84cc16",
      "emissive": "#14532d"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "mercek"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "run": {
    "id": "run",
    "name": "Rün",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla rün ortaya çıkar.",
    "tier": 21,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kertenkele"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "aile": {
    "id": "aile",
    "name": "Aile",
    "description": "Ayı, Fındık ve Vida elementlerinin dengeli füzyonuyla yeni bir form olan aile sentezlenir.",
    "tier": 22,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "run"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "orumcek": {
    "id": "orumcek",
    "name": "Örümcek",
    "description": "Kurbağa ve Kurşun elementlerinin anlamsal ve fiziksel etkileşimi sonucunda örümcek meydana gelir.",
    "tier": 23,
    "colorPalette": {
      "primary": "#b45309",
      "secondary": "#d97706",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "aile"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "fauna",
    "trioRecipes": []
  },
  "kaplumbaga": {
    "id": "kaplumbaga",
    "name": "Kaplumbağa",
    "description": "Balık ve Örümcek elementlerinin anlamsal ve fiziksel etkileşimi sonucunda kaplumbağa meydana gelir.",
    "tier": 24,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "orumcek"
      ]
    },
    "icon": "✨",
    "category": "03_canlilar",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "yelken": {
    "id": "yelken",
    "name": "Yelken",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla yelken ortaya çıkar.",
    "tier": 25,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kaplumbaga"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kemik": {
    "id": "kemik",
    "name": "Kemik",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla kemik ortaya çıkar.",
    "tier": 26,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "yelken"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "itfaiyeci": {
    "id": "itfaiyeci",
    "name": "İtfaiyeci",
    "description": "Yangınları söndüren ve hayat kurtaran kahraman.",
    "tier": 27,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kemik"
      ]
    },
    "icon": "✨",
    "category": "Meslek & Toplum",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sincap": {
    "id": "sincap",
    "name": "Sincap",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla sincap ortaya çıkar.",
    "tier": 28,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "itfaiyeci"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  },
  "demiryolu": {
    "id": "demiryolu",
    "name": "Demiryolu",
    "description": "Buhar Jeneratörü ve Buhar Motoru elementlerinin anlamsal ve fiziksel etkileşimi sonucunda demiryolu meydana gelir.",
    "tier": 30,
    "colorPalette": {
      "primary": "#94a3b8",
      "secondary": "#e2e8f0",
      "emissive": "#334155"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "tekerlek"
      ]
    },
    "icon": "✨",
    "category": "07_bilim_ve_teknoloji",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "hucre": {
    "id": "hucre",
    "name": "Hücre",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla hücre ortaya çıkar.",
    "tier": 31,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "demiryolu"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "baykus": {
    "id": "baykus",
    "name": "Baykuş",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla baykuş ortaya çıkar.",
    "tier": 32,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "hucre"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "iskelet": {
    "id": "iskelet",
    "name": "İskelet",
    "description": "Vücuda destek veren kemik çatısı.",
    "tier": 33,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "baykus"
      ]
    },
    "icon": "✨",
    "category": "Biyoloji & Vücut",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "kamp_atesi": {
    "id": "kamp_atesi",
    "name": "Kamp Ateşi",
    "description": "Açık havada dallar ve odunlarla yakılan büyük ısınma ateşi.",
    "tier": 34,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "iskelet"
      ]
    },
    "icon": "✨",
    "category": "Doğa & Ateş",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "portal_runu": {
    "id": "portal_runu",
    "name": "Portal Rünü",
    "description": "Kale Kapısı, Mağara ve Tünel elementlerinin dengeli füzyonuyla yeni bir form olan portal rünü sentezlenir.",
    "tier": 35,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "kamp_atesi"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "structure",
    "trioRecipes": []
  },
  "cin": {
    "id": "cin",
    "name": "Cin",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla cin ortaya çıkar.",
    "tier": 36,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "portal_runu"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "melek": {
    "id": "melek",
    "name": "Melek",
    "description": "Havadaki nemin ve su zerreciklerinin bir araya gelip yoğunlaşmasıyla melek ortaya çıkar.",
    "tier": 37,
    "colorPalette": {
      "primary": "#7c3aed",
      "secondary": "#c084fc",
      "emissive": "#4c1d95"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "cin"
      ]
    },
    "icon": "✨",
    "category": "02_doga",
    "archetype3d": "magic",
    "trioRecipes": []
  },
  "zehir_sisesi": {
    "id": "zehir_sisesi",
    "name": "Zehir Şişesi",
    "description": "Dinamit ve Runik Zırh elementlerinin anlamsal ve fiziksel etkileşimi sonucunda zehir şişesi meydana gelir.",
    "tier": 38,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "melek"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "crystal",
    "trioRecipes": []
  },
  "alkol": {
    "id": "alkol",
    "name": "Alkol",
    "description": "Alet, Barut Fıçısı ve Limon elementlerinin dengeli füzyonuyla yeni bir form olan alkol sentezlenir.",
    "tier": 40,
    "colorPalette": {
      "primary": "#64748b",
      "secondary": "#94a3b8",
      "emissive": "#1e293b"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "ampul"
      ]
    },
    "icon": "✨",
    "category": "06_yemek_ve_tarim",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "konserve": {
    "id": "konserve",
    "name": "Konserve",
    "description": "Metal kutuda uzun süre saklanabilen gıda.",
    "tier": 41,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "alkol"
      ]
    },
    "icon": "✨",
    "category": "Gıda & Mutfak",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "sampanya": {
    "id": "sampanya",
    "name": "Şampanya",
    "description": "Köpüklü ve baloncuklu kutlama şarabı.",
    "tier": 42,
    "colorPalette": {},
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "konserve"
      ]
    },
    "icon": "✨",
    "category": "Gıda & İçecek",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "gitar": {
    "id": "gitar",
    "name": "Gitar",
    "description": "Müzik, Tekerlek ve Tüfek elementlerinin dengeli füzyonuyla yeni bir form olan gitar sentezlenir.",
    "tier": 43,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "sampanya"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "metal_bicak": {
    "id": "metal_bicak",
    "name": "Metal Bıçak",
    "description": "Kılıç, Metal ve Çelik Külçe elementlerinin dengeli füzyonuyla yeni bir form olan metal bıçak sentezlenir.",
    "tier": 44,
    "colorPalette": {
      "primary": "#475569",
      "secondary": "#94a3b8",
      "emissive": "#0f172a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "gitar"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mech",
    "trioRecipes": []
  },
  "safir": {
    "id": "safir",
    "name": "Safir",
    "description": "Gürz ve Su elementlerinin anlamsal ve fiziksel etkileşimi sonucunda safir meydana gelir.",
    "tier": 45,
    "colorPalette": {
      "primary": "#2563eb",
      "secondary": "#93c5fd",
      "emissive": "#1e3a8a"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "metal_bicak"
      ]
    },
    "icon": "✨",
    "category": "04_zanaat_ve_aletler",
    "archetype3d": "mineral",
    "trioRecipes": []
  },
  "harita": {
    "id": "harita",
    "name": "Harita",
    "description": "Ceviz, Mağara ve Toprak elementlerinin dengeli füzyonuyla yeni bir form olan harita sentezlenir.",
    "tier": 46,
    "colorPalette": {
      "primary": "#d97706",
      "secondary": "#fed7aa",
      "emissive": "#78350f"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "supurge",
        "safir"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "fabric",
    "trioRecipes": []
  },
  "yildiz_gecidi_cekirdegi": {
    "id": "yildiz_gecidi_cekirdegi",
    "name": "Yıldız Geçidi Çekirdeği",
    "description": "Gezegen, Gökkuşağı ve Kule elementlerinin dengeli füzyonuyla yeni bir form olan yıldız geçidi çekirdeği sentezlenir.",
    "tier": 47,
    "colorPalette": {
      "primary": "#fbbf24",
      "secondary": "#fef08a",
      "emissive": "#d97706"
    },
    "particles": {
      "type": "spark",
      "color": "#ffffff",
      "count": 12
    },
    "recipe": {
      "inputs": [
        "harita",
        "supurge"
      ]
    },
    "icon": "✨",
    "category": "08_mistik_ve_evren",
    "archetype3d": "magic",
    "trioRecipes": []
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
    "archetype3d": "fluid",
    "trioRecipes": []
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
    "archetype3d": "gas",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "mineral",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "flame",
    "trioRecipes": []
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
    "archetype3d": "nature",
    "trioRecipes": []
  }
};

export const ITEM_DEFINITIONS = GRANDMASTER_ITEM_DEFINITIONS;

export function getItemDefinitionsForMode(mode = 'classic') {
  return mode === 'classic' ? CLASSIC_ITEM_DEFINITIONS : GRANDMASTER_ITEM_DEFINITIONS;
}

export function getCanonicalId(id) {
  if (!id) return id;
  return id.toLowerCase().trim();
}
