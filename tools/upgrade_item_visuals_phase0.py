import json
import re

with open('tools/all_521_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

def match_token(item_id, tokens):
    # Check if any token matches either as whole word or split by underscore
    parts = item_id.split('_')
    for t in tokens:
        if t in parts or item_id == t:
            return True
        if len(t) >= 4 and t in item_id: # only allow substring if token is long enough
            return True
    return False

def determine_item_visuals(item_id, item_data):
    name = item_data.get('name', '').lower()
    cat = item_data.get('category', '').lower()
    
    primary = "#64748b"
    secondary = "#94a3b8"
    emissive = "#1e293b"
    archetype = "mineral"
    particle_type = "spark"
    particle_color = "#ffffff"

    # Specific gems & minerals FIRST to avoid substring traps (e.g. elmas containing elma)
    if match_token(item_id, ['elmas', 'diamond', 'kuvars', 'quartz', 'kristal', 'crystal']):
        primary = "#38bdf8"
        secondary = "#f0f9ff"
        emissive = "#0284c7"
        archetype = "mineral"
        particle_type = "spark"
        particle_color = "#e0f2fe"
    elif match_token(item_id, ['altin', 'gold', 'kehribar', 'amber', 'altin_sikke', 'altin_kulce']):
        primary = "#eab308"
        secondary = "#fef08a"
        emissive = "#a16207"
        archetype = "mineral"
        particle_color = "#fef08a"
    elif match_token(item_id, ['yakut', 'ruby']):
        primary = "#e11d48"
        secondary = "#fda4af"
        emissive = "#881337"
        archetype = "mineral"
        particle_color = "#ffe4e6"
    elif match_token(item_id, ['safir', 'sapphire']):
        primary = "#2563eb"
        secondary = "#93c5fd"
        emissive = "#1e3a8a"
        archetype = "mineral"
        particle_color = "#dbeafe"
    elif match_token(item_id, ['zumrut', 'emerald', 'yesim', 'jade']):
        primary = "#059669"
        secondary = "#6ee7b7"
        emissive = "#064e3b"
        archetype = "mineral"
        particle_color = "#d1fae5"
    elif match_token(item_id, ['ametist', 'amethyst']):
        primary = "#7c3aed"
        secondary = "#c4b5fd"
        emissive = "#4c1d95"
        archetype = "mineral"
        particle_color = "#ede9fe"
    elif match_token(item_id, ['gumus', 'silver', 'platin', 'platinum', 'titanyum', 'titanium', 'celik', 'steel', 'demir', 'iron']):
        primary = "#94a3b8"
        secondary = "#e2e8f0"
        emissive = "#334155"
        archetype = "mineral"
        particle_color = "#f8fafc"
    elif match_token(item_id, ['bakir', 'copper', 'bronz', 'bronze']):
        primary = "#c2410c"
        secondary = "#fb923c"
        emissive = "#7c2d12"
        archetype = "mineral"
        particle_color = "#ffedd5"
    elif match_token(item_id, ['uranyum', 'uranium', 'radyasyon', 'plutonyum']):
        primary = "#22c55e"
        secondary = "#86efac"
        emissive = "#15803d"
        archetype = "magic"
        particle_color = "#4ade80"

    # Food & Drinks
    elif match_token(item_id, ['cikolata', 'chocolate', 'kakao', 'cocoa']):
        primary = "#3b1a08"
        secondary = "#78350f"
        emissive = "#1c0a02"
        archetype = "food"
        particle_color = "#fde047"
    elif match_token(item_id, ['kahve', 'coffee']):
        primary = "#451a03"
        secondary = "#92400e"
        emissive = "#260c02"
        archetype = "food"
        particle_color = "#fed7aa"
    elif match_token(item_id, ['cay', 'tea', 'bitki_cayi']):
        primary = "#b45309"
        secondary = "#f59e0b"
        emissive = "#78350f"
        archetype = "food"
        particle_color = "#fef08a"
    elif match_token(item_id, ['bal', 'honey', 'recel', 'jam', 'peynir', 'cheese', 'tereyagi', 'butter', 'bira', 'beer', 'muz', 'banana', 'limon', 'lemon', 'misir', 'corn']):
        primary = "#eab308"
        secondary = "#fde047"
        emissive = "#854d0e"
        archetype = "food"
        particle_color = "#fef08a"
    elif match_token(item_id, ['cilek', 'strawberry', 'elma', 'apple', 'domates', 'tomato', 'karpuz', 'watermelon', 'sarap', 'wine', 'et', 'meat', 'sosis', 'sausage', 'kavurma', 'pastirma', 'biber', 'pepper']):
        primary = "#dc2626"
        secondary = "#f87171"
        emissive = "#7f1d1d"
        archetype = "food"
        particle_color = "#fca5a5"
    elif match_token(item_id, ['uzum', 'grape', 'patlican']):
        primary = "#7e22ce"
        secondary = "#a855f7"
        emissive = "#3b0764"
        archetype = "food"
        particle_color = "#d8b4fe"
    elif match_token(item_id, ['portakal', 'orange', 'havuc', 'carrot']):
        primary = "#ea580c"
        secondary = "#fb923c"
        emissive = "#7c2d12"
        archetype = "food"
        particle_color = "#fed7aa"
    elif match_token(item_id, ['zeytin', 'olive', 'zeytinyagi', 'marul', 'salatalik']):
        primary = "#15803d"
        secondary = "#4ade80"
        emissive = "#14532d"
        archetype = "food"
        particle_color = "#86efac"
    elif match_token(item_id, ['ekmek', 'bread', 'pasta', 'cake', 'pizza', 'kurabiye', 'cookie', 'corba', 'soup', 'seker', 'sugar', 'tuz', 'salt', 'dondurma', 'ice_cream', 'yogurt', 'yemek', 'food', 'patates', 'potato', 'sogan', 'onion', 'sarimsak', 'garlic', 'ceviz', 'findik', 'badem', 'armut']):
        primary = "#d97706"
        secondary = "#fbbf24"
        emissive = "#78350f"
        archetype = "food"
        particle_color = "#fde047"

    # Fire / Explosives / Heat
    elif match_token(item_id, ['dinamit', 'dynamite', 'bomba', 'bomb', 'barut', 'gunpowder']):
        primary = "#dc2626"
        secondary = "#ea580c"
        emissive = "#7f1d1d"
        archetype = "solid"
        particle_type = "spark"
        particle_color = "#fef08a"
    elif match_token(item_id, ['ates', 'fire', 'lav', 'lava', 'gunes', 'sun', 'volkan', 'magma', 'alev', 'sicak', 'yangin', 'cehennem', 'plazma', 'yanardag']):
        primary = "#ef4444"
        secondary = "#f97316"
        emissive = "#b91c1c"
        archetype = "flame"
        particle_type = "spark"
        particle_color = "#ffedd5"

    # Water / Ice / Weather
    elif match_token(item_id, ['buz', 'ice', 'kar', 'snow', 'dolu', 'hail', 'buz_dagi', 'buzul']):
        primary = "#38bdf8"
        secondary = "#e0f2fe"
        emissive = "#0284c7"
        archetype = "solid"
        particle_type = "bubble"
        particle_color = "#e0f2fe"
    elif match_token(item_id, ['su', 'water', 'deniz', 'ocean', 'yagmur', 'rain', 'gol', 'lake', 'nehir', 'river', 'selale', 'tsunami', 'girdap', 'okyanus', 'akvaryum', 'fiyort', 'korfez', 'kanal', 'vaha', 'bataklik', 'tufan']):
        primary = "#0284c7"
        secondary = "#38bdf8"
        emissive = "#0369a1"
        archetype = "fluid"
        particle_type = "bubble"
        particle_color = "#bae6fd"
    elif match_token(item_id, ['hava', 'air', 'ruzgar', 'wind', 'bulut', 'cloud', 'buhar', 'steam', 'duman', 'smoke', 'sis', 'fog', 'kasirga', 'tayfun', 'hortum', 'ozon', 'gaz']):
        primary = "#94a3b8"
        secondary = "#cbd5e1"
        emissive = "#475569"
        archetype = "gas"
        particle_type = "spark"
        particle_color = "#e2e8f0"
    elif match_token(item_id, ['yildirim', 'lightning', 'elektrik', 'electricity', 'enerji', 'energy', 'akim']):
        primary = "#eab308"
        secondary = "#38bdf8"
        emissive = "#ca8a04"
        archetype = "electric"
        particle_type = "spark"
        particle_color = "#fef08a"

    # Flora & Nature
    elif match_token(item_id, ['bitki', 'plant', 'agac', 'tree', 'yaprak', 'leaf', 'cicek', 'flower', 'orman', 'forest', 'bambu', 'cali', 'sarmasik', 'yosun', 'palmiye', 'tohum', 'gul', 'lale', 'nilufer', 'cimen', 'tarim', 'sera', 'bahce', 'meyve_bahcesi', 'karli_cam_agaci', 'kok']):
        primary = "#16a34a"
        secondary = "#4ade80"
        emissive = "#14532d"
        archetype = "flora"
        particle_type = "leaf" if any(k in item_id for k in ['yaprak', 'agac', 'orman']) else "spark"
        particle_color = "#bbf7d0"

    # Animals & Monsters
    elif match_token(item_id, ['aslan', 'lion', 'kaplan', 'tiger', 'ari', 'bee']):
        primary = "#d97706"
        secondary = "#f59e0b"
        emissive = "#78350f"
        archetype = "fauna"
        particle_color = "#fde047"
    elif match_token(item_id, ['ejderha', 'dragon', 'dinozor', 'dinosaur', 'kertenkele', 'lizard', 'timsah', 'crocodile', 'yilan', 'snake']):
        primary = "#15803d"
        secondary = "#84cc16"
        emissive = "#14532d"
        archetype = "fauna"
        particle_color = "#bef264"
    elif match_token(item_id, ['ahtapot', 'octopus', 'denizanasi', 'jellyfish']):
        primary = "#9333ea"
        secondary = "#c084fc"
        emissive = "#581c87"
        archetype = "fauna"
        particle_color = "#f0abfc"
    elif match_token(item_id, ['kedi', 'cat', 'tavuk', 'chicken', 'koyun', 'sheep', 'kopek', 'dog', 'ayi', 'bear', 'kurt', 'wolf', 'kus', 'bird', 'kartal', 'eagle', 'sahin', 'balik', 'fish', 'balina', 'whale', 'kopekbaligi', 'shark', 'inek', 'cow', 'at', 'horse', 'pegasus', 'karinca', 'ant', 'orumcek', 'spider', 'kelebek', 'butterfly', 'akrep', 'scorpion', 'hayvan', 'animal', 'canli', 'insan', 'human', 'aile', 'kurt_adam', 'kentaurluk', 'grifon', 'sfenks', 'yunus', 'denizkizi', 'solucan', 'ipekbocegi']):
        primary = "#b45309"
        secondary = "#d97706"
        emissive = "#78350f"
        archetype = "fauna"
        particle_color = "#fed7aa"

    # Structures & Architecture
    elif match_token(item_id, ['piramit', 'pyramid', 'saray', 'palace', 'tapinak', 'temple', 'anit', 'monument', 'obelisk', 'sfenks']):
        primary = "#d97706"
        secondary = "#fbbf24"
        emissive = "#78350f"
        archetype = "structure"
        particle_color = "#fde047"
    elif match_token(item_id, ['ev', 'house', 'bina', 'building', 'kule', 'tower', 'kale', 'castle', 'kopru', 'bridge', 'sehir', 'city', 'kasaba', 'town', 'koy', 'village', 'liman', 'port', 'sur', 'wall', 'kulube', 'hut', 'cadir', 'tent', 'fener_kulesi', 'lighthouse', 'yel_degirmeni', 'windmill', 'su_degirmeni', 'darphane', 'kutuphane', 'okul', 'muze', 'tiyatro', 'sinema', 'banka', 'pazar', 'dukkan', 'fabrika', 'hastane', 'otel', 'istasyon', 'kayip_sehir', 'medeniyet', 'imparatorluk', 'krallik', 'kabile']):
        primary = "#475569"
        secondary = "#94a3b8"
        emissive = "#1e293b"
        archetype = "structure"
        particle_color = "#cbd5e1"

    # Machines & High Tech & Vehicles & Tools
    elif match_token(item_id, ['robot', 'bilgisayar', 'computer', 'lazer', 'laser', 'radar', 'mikroskop', 'teleskop', 'yapay_zeka', 'internet', 'mikrocip', 'hesap_makinesi', 'telefon', 'telgraf', 'kamera', 'televizyon', 'radyo', 'roket', 'rocket', 'uydu', 'satellite', 'uzay_gemisi', 'spaceship']):
        primary = "#0ea5e9"
        secondary = "#38bdf8"
        emissive = "#0369a1"
        archetype = "mech"
        particle_color = "#7dd3fc"
    elif match_token(item_id, ['araba', 'car', 'tren', 'train', 'ucak', 'plane', 'helikopter', 'helicopter', 'motosiklet', 'motorcycle', 'bisiklet', 'bicycle', 'gemi', 'ship', 'tekne', 'boat', 'yelkenli', 'kano', 'zeplin', 'fayton', 'kamyon', 'zirhli_gemi', 'kadirga', 'mancinik', 'top', 'cannon', 'tufek', 'tabanca']):
        primary = "#dc2626"
        secondary = "#ef4444"
        emissive = "#7f1d1d"
        archetype = "mech"
        particle_color = "#fca5a5"
    elif match_token(item_id, ['kilic', 'sword', 'balta', 'axe', 'kazma', 'pickaxe', 'kurek', 'shovel', 'bicak', 'knife', 'mizrak', 'spear', 'yay', 'bow', 'ok', 'arrow', 'cekic', 'hammer', 'testere', 'saw', 'makas', 'scissors', 'kalkan', 'shield', 'zirh', 'armor', 'migfer', 'helmet', 'gurz', 'mace', 'cark', 'disli', 'motor', 'vida', 'alet', 'zincir', 'kilit', 'anahtar', 'koruk', 'jenerator', 'turbin', 'aku', 'pil']):
        primary = "#475569"
        secondary = "#94a3b8"
        emissive = "#0f172a"
        archetype = "mech"
        particle_color = "#94a3b8"

    # Magic / Universe / Cosmic / Alchemy
    elif match_token(item_id, ['karadelik', 'black_hole', 'uzay', 'space', 'gece', 'night', 'golge', 'shadow', 'alacakaranlik', 'tutulma']):
        primary = "#1e1b4b"
        secondary = "#312e81"
        emissive = "#0f172a"
        archetype = "magic"
        particle_color = "#818cf8"
    elif match_token(item_id, ['galaksi', 'galaxy', 'nebula', 'portal', 'boyut', 'mana', 'buyu', 'magic', 'iksir', 'potion', 'parsomen', 'scroll', 'kitap', 'book', 'run', 'rune', 'tilsim', 'amulet', 'muska', 'totem', 'altar', 'heykel', 'kutsal_kase', 'kure', 'ruh', 'spirit', 'hayalet', 'ghost', 'melek', 'angel', 'seytan', 'demon', 'tanri', 'god', 'golem', 'cin', 'peri', 'vampir', 'zombi', 'felsefe_tasi', 'simya', 'olumsuzluk_iksiri', 'sifa_iksiri', 'mana_iksiri']):
        primary = "#7c3aed"
        secondary = "#c084fc"
        emissive = "#4c1d95"
        archetype = "magic"
        particle_color = "#ddd6fe"
    elif match_token(item_id, ['yildiz', 'star', 'kuyruklu_yildiz', 'comet', 'ay', 'moon', 'gezegen', 'planet', 'evren', 'universe', 'isik', 'light', 'gunduz', 'safak', 'kozmik_usturlap', 'gunes_saati', 'kum_saati', 'zaman', 'time']):
        primary = "#fbbf24"
        secondary = "#fef08a"
        emissive = "#d97706"
        archetype = "magic"
        particle_color = "#fef08a"

    # Fabrics / Paper / Arts / Music
    elif match_token(item_id, ['kumas', 'fabric', 'pamuk', 'cotton', 'ipek', 'silk', 'yun', 'wool', 'deri', 'leather', 'kagit', 'paper', 'yazi', 'alfabe', 'gazete', 'harita', 'map', 'tablo', 'resim', 'fotograf', 'muzik', 'music', 'gitar', 'flut', 'davul', 'piyano', 'kandil', 'mum', 'fener', 'dinamolu_fener']):
        primary = "#d97706"
        secondary = "#fed7aa"
        emissive = "#78350f"
        archetype = "fabric"
        particle_color = "#fed7aa"

    return {
        "primary": primary,
        "secondary": secondary,
        "emissive": emissive,
        "archetype": archetype,
        "particle_type": particle_type,
        "particle_color": particle_color
    }

for item_id, item_data in items.items():
    vis = determine_item_visuals(item_id, item_data)
    item_data['colorPalette'] = {
        'primary': vis['primary'],
        'secondary': vis['secondary'],
        'emissive': vis['emissive']
    }
    item_data['archetype3d'] = vis['archetype']
    item_data['particles'] = {
        'type': vis['particle_type'],
        'color': vis['particle_color'],
        'count': item_data.get('particles', {}).get('count', 12)
    }

with open('tools/all_521_items.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

item_defs_js = "/**\n * Auto-generated and synchronized Item Definitions\n * Total items: 521\n */\n\nexport const ITEM_DEFINITIONS = "
item_defs_js += json.dumps(items, ensure_ascii=False, indent=2)
item_defs_js += ";\n\n"

item_defs_js += """export function getItemDefinition(itemId) {
  if (!itemId) return null;
  const canonical = getCanonicalId(itemId);
  return ITEM_DEFINITIONS[canonical] || ITEM_DEFINITIONS[itemId] || null;
}

export function getCanonicalId(itemId) {
  if (!itemId) return itemId;
  const idMap = {
    'fire': 'ates',
    'water': 'su',
    'earth': 'toprak',
    'air': 'hava',
    'steam': 'buhar',
    'mud': 'camur',
    'lava': 'lav',
    'sand': 'kum',
    'obsidian': 'obsidyen',
    'rain': 'yagmur',
    'energy': 'enerji',
    'wind': 'ruzgar',
    'stone': 'tas',
    'glass': 'cam',
    'cloud': 'bulut',
    'lightning': 'yildirim',
    'plant': 'bitki',
    'tree': 'agac',
    'wood': 'odun',
    'splinter': 'kiymik',
    'fiber': 'lif',
    'pottery': 'comlek',
    'water_jug': 'su_comlegi',
    'bottle': 'sise',
    'flint': 'cakmaktasi',
    'bow': 'yay',
    'arrow': 'ok',
    'torch': 'mesale',
    'raw_metal': 'metal',
    'iron_ingot': 'demir_kulce',
    'metal_knife': 'metal_bicak',
    'pickaxe': 'kazma',
    'sword': 'kilic',
    'wooden_shield': 'ahsap_kalkan',
    'iron_shield': 'demir_kalkan',
    'leather_armor': 'deri_zirh',
    'iron_armor': 'demir_zirh',
    'bed': 'yatak',
    'rope': 'ip',
    'mushroom': 'mantar',
    'cotton': 'pamuk',
    'fabric': 'kumas',
    'coal': 'komur',
    'ash': 'kul',
    'paper': 'kagit',
    'life': 'yasam',
    'bird': 'kus',
    'animal': 'hayvan',
    'fish': 'balik',
    'primitive_knife': 'ilkel_bicak',
    'feather': 'kus_tuyu',
    'leather': 'deri',
    'cooked_meat': 'kavrulmus_et',
    'resin': 'recine',
    'kedi': 'kedi',
    'cat': 'kedi',
    'kopek': 'kopek',
    'dog': 'kopek',
    'aslan': 'aslan',
    'lion': 'aslan'
  };
  return idMap[itemId] || itemId;
}
"""

with open('src/items/itemDefinitions.js', 'w', encoding='utf-8') as f:
    f.write(item_defs_js)

print("Updated with precise token matching successfully!")
