import json

with open('tools/canonical_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

# English translations dictionary for all 176 items: (id -> { name, desc })
translations = {
  # Kategori 1: Elementler
  "ates": {"name": "Fire", "desc": "Source of pure heat and energy."},
  "su": {"name": "Water", "desc": "The essence of life, fluid and crystal clear."},
  "toprak": {"name": "Earth", "desc": "Solid foundation, rock and fertile soil."},
  "hava": {"name": "Air", "desc": "Invisible wind, breath and gentle motion."},
  "buhar": {"name": "Steam", "desc": "Vapor born from the fiery dance of heat and water."},
  "camur": {"name": "Mud", "desc": "A rich blend of water and earth."},
  "lav": {"name": "Lava", "desc": "Molten majesty of earth ignited by intense fire."},
  "kum": {"name": "Sand", "desc": "Fine grains weathered by wind and stone."},
  "obsidyen": {"name": "Obsidian", "desc": "Dark volcanic glass formed by rapidly cooled lava."},
  "yagmur": {"name": "Rain", "desc": "Gentle droplets falling from clouds in the sky."},
  "enerji": {"name": "Energy", "desc": "Pure plasma power derived from air and fire."},
  "ruzgar": {"name": "Wind", "desc": "Strong, fast-flowing currents of moving air."},
  "tas": {"name": "Stone", "desc": "Dense solid rock hardened over ages."},
  "cam": {"name": "Glass", "desc": "Transparent solid forged by melting sand under heat."},
  "bulut": {"name": "Cloud", "desc": "Fluffy floating accumulation of condensed vapor."},
  "yildirim": {"name": "Lightning", "desc": "Sharp flash of electrical discharge from stormy skies."},
  "kar": {"name": "Snow", "desc": "Crystalline frozen water flakes drifting softly."},
  "buz": {"name": "Ice", "desc": "Solid frozen water, glassy and cold."},
  "col": {"name": "Desert", "desc": "Endless expanse of windswept golden sand."},
  "sis": {"name": "Fog", "desc": "Dense mist shrouding the landscape in mystery."},
  "gayzer": {"name": "Geyser", "desc": "A natural boiling spring erupting hot water and steam."},
  "buz_dagi": {"name": "Iceberg", "desc": "A colossal glacier floating gracefully in deep waters."},

  # Kategori 2: Doğa & Bitkiler
  "bitki": {"name": "Plant", "desc": "A fresh green sprout nurtured by fertile soil and rain."},
  "agac": {"name": "Tree", "desc": "A sturdy wooden giant with lush foliage and deep roots."},
  "odun": {"name": "Wood", "desc": "Timber harvested from strong tree trunks."},
  "kiymik": {"name": "Splinter", "desc": "A sharp fragment chipped from dry wood."},
  "lif": {"name": "Fiber", "desc": "Strands of plant tissue spun for crafting."},
  "mantar": {"name": "Mushroom", "desc": "A woodland fungus with a spotted cap growing in damp shade."},
  "pamuk": {"name": "Cotton", "desc": "Soft white fluffy fibers harvested from shrub pods."},
  "recine": {"name": "Resin", "desc": "Golden aromatic sap hardened from tree bark."},
  "tohum": {"name": "Seed", "desc": "A potent embryo holding the future of new life."},
  "bugday": {"name": "Wheat", "desc": "Golden cereal grain rippling across cultivated fields."},
  "nane": {"name": "Mint", "desc": "Fragrant aromatic herb with refreshing coolness."},
  "agac_kabugu": {"name": "Tree Bark", "desc": "Protective tough outer layer of wooden trunks."},
  "nilufer": {"name": "Water Lily", "desc": "An aquatic blooming blossom floating calmly on water."},
  "elma": {"name": "Apple", "desc": "Sweet, crisp red orchard fruit ripened under the sun."},
  "kaktus": {"name": "Cactus", "desc": "Spiny succulent storing water beneath the desert heat."},
  "cam_agaci": {"name": "Pine Tree", "desc": "Evergreen conifer standing tall through harsh winter snows."},

  # Kategori 3: Canlılar & Fauna
  "yasam": {"name": "Life", "desc": "The miraculous glowing spark that animates the universe."},
  "kus": {"name": "Bird", "desc": "Winged creature soaring through open skies."},
  "hayvan": {"name": "Animal", "desc": "A four-legged creature walking across wild terrains."},
  "balik": {"name": "Fish", "desc": "Aquatic swimmer gliding through currents and tides."},
  "inek": {"name": "Cow", "desc": "Gentle domesticated ruminant grazing on pastures."},
  "sut": {"name": "Milk", "desc": "Pure nutritious white liquid produced by livestock."},
  "yumurta": {"name": "Egg", "desc": "Fragile shell encasing developing fledgling life."},
  "mercan": {"name": "Coral", "desc": "Vibrant marine organism building underwater reefs."},
  "at": {"name": "Horse", "desc": "Majestic noble steed known for power and speed."},
  "koyun": {"name": "Sheep", "desc": "Woolly fleece-bearing herd animal."},
  "kurt": {"name": "Wolf", "desc": "Fierce pack predator howling under moonlit skies."},
  "ari": {"name": "Bee", "desc": "Industrious buzzing pollinator harvesting nectar."},
  "yilan": {"name": "Snake", "desc": "Slithering reptile navigating quietly through brush."},
  "baykus": {"name": "Owl", "desc": "Wise nocturnal avian raptor watching in the dark."},
  "kaplumbaga": {"name": "Turtle", "desc": "Ancient shelled reptile moving at a steady pace."},
  "kurbaga": {"name": "Frog", "desc": "Amphibian leaper thriving by pond reeds."},
  "sincap": {"name": "Squirrel", "desc": "Agile woodland rodent gathering nuts in the canopy."},
  "geyik": {"name": "Deer", "desc": "Graceful herbivore with crowned branching antlers."},
  "kelebek": {"name": "Butterfly", "desc": "Delicate winged insect decorated with painted patterns."},
  "tavuk": {"name": "Chicken", "desc": "Domestic barnyard fowl laying fresh eggs every morning."},
  "kedi": {"name": "Cat", "desc": "Curious agile feline companion with keen instincts."},
  "somon": {"name": "Salmon", "desc": "Resilient fish leaping upstream against rushing rivers."},

  # Kategori 4: Zanaat & Temel Aletler
  "ip": {"name": "Rope", "desc": "Strong twisted cord braided from plant fibers."},
  "kumas": {"name": "Fabric", "desc": "Woven cloth woven from soft natural threads."},
  "komur": {"name": "Coal", "desc": "Combustible dark fossil fuel fueling fierce heat."},
  "kul": {"name": "Ash", "desc": "Fine powdery residue left after a glowing fire burns out."},
  "kagit": {"name": "Paper", "desc": "Smooth parchment sheet pressed from fibrous pulp."},
  "ilkel_bicak": {"name": "Primitive Knife", "desc": "A flint blade fastened to an unrefined wooden handle."},
  "kus_tuyu": {"name": "Feather", "desc": "Light aerodynamic quill shed from avian wings."},
  "deri": {"name": "Leather", "desc": "Supple tanned animal hide treated for crafting."},
  "kavrulmus_et": {"name": "Cooked Meat", "desc": "Hearty roasted meat prepared over blazing embers."},
  "comlek": {"name": "Pottery", "desc": "Fired earthenware vessel sculpted from clay."},
  "su_comlegi": {"name": "Water Jug", "desc": "A sturdy ceramic jug filled with cool mountain water."},
  "sise": {"name": "Bottle", "desc": "A sealed glass flask designed to hold precious liquids."},
  "cakmaktasi": {"name": "Flint", "desc": "Hard sedimentary stone that sparks sparks upon impact."},
  "yay": {"name": "Bow", "desc": "Flexible curved wooden weapon strung under tension."},
  "ok": {"name": "Arrow", "desc": "Straight shaft fletched with feathers and tipped with flint."},
  "mesale": {"name": "Torch", "desc": "A resinous wooden torch illuminating murky corridors."},
  "metal": {"name": "Metal", "desc": "Malleable lustrous ore extracted from minerals."},
  "demir_kulce": {"name": "Iron Ingot", "desc": "Purified rectangular bar of forged solid iron."},
  "metal_bicak": {"name": "Metal Knife", "desc": "Sharp steel blade fitted with a secure grip."},
  "kazma": {"name": "Pickaxe", "desc": "Pointed tool designed for shattering rock and mining ores."},
  "kilic": {"name": "Sword", "desc": "Finely balanced steel blade forged for combat and defense."},
  "ahsap_kalkan": {"name": "Wooden Shield", "desc": "Plank shield reinforced with leather trimming."},
  "demir_kalkan": {"name": "Iron Shield", "desc": "Heavy riveted steel shield deflecting fierce strikes."},
  "deri_zirh": {"name": "Leather Armor", "desc": "Flexible lightweight vest stitched from cured hide."},
  "demir_zirh": {"name": "Iron Armor", "desc": "Solid plate harness protecting against heavy blows."},
  "yatak": {"name": "Bed", "desc": "Comfortable resting mattress framed in polished wood."},
  "olta": {"name": "Fishing Rod", "desc": "Slender rod rigged with line and hook for catching fish."},
  "yelken": {"name": "Sail", "desc": "Sturdy canvas sheet catching offshore breezes."},
  "sal": {"name": "Raft", "desc": "Buoyant log platform lashed together for water travel."},
  "obsidyen_bicak": {"name": "Obsidian Dagger", "desc": "Razor-sharp edge crafted from dark volcanic glass."},
  "bal": {"name": "Honey", "desc": "Golden sweet nectar produced by industrious bees."},
  "kalkan": {"name": "Shield", "desc": "Solid round wooden shield fending off enemy arrows."},

  # Kategori 5: Kimya, Simya & Büyü
  "zehirli_sivi": {"name": "Toxic Liquid", "desc": "Noxious green brew distilled from wild mushrooms."},
  "zehir_sisesi": {"name": "Poison Flask", "desc": "Sealed vial filled with potent corrosive venom."},
  "zehirli_kilic": {"name": "Poisoned Blade", "desc": "Sword coated in deadly venom dealing lingering harm."},
  "sifa_iksiri": {"name": "Healing Potion", "desc": "Soothing herbal elixir that restores vitality and health."},
  "mana_iksiri": {"name": "Mana Potion", "desc": "Glowing azure draught replenishing arcane spiritual energy."},
  "barut": {"name": "Gunpowder", "desc": "Explosive chemical mixture of sulfur, carbon and ash."},
  "bomba": {"name": "Bomb", "desc": "Volatile iron canister primed with black powder."},
  "buyu_parsomeni": {"name": "Spell Scroll", "desc": "Ancient parchment inscribed with mystical incantations."},
  "yildirim_parsomeni": {"name": "Lightning Scroll", "desc": "Crackling parchment unleashing focused electric fury."},
  "ates_topu_kitabi": {"name": "Fireball Tome", "desc": "Grimoire containing the ancient secrets of fiery devastation."},
  "peynir": {"name": "Cheese", "desc": "Aged dairy wheel curdled with delicate care."},
  "un": {"name": "Flour", "desc": "Fine white powder ground from ripe wheat ears."},
  "hamur": {"name": "Dough", "desc": "Kneaded mixture of flour and water ready for baking."},
  "ekmek": {"name": "Bread", "desc": "Golden baked loaf with a crispy crust and warm crumb."},
  "barut_ficisi": {"name": "Powder Keg", "desc": "Wooden barrel packed with high explosives."},
  "iksir_kazani": {"name": "Alchemy Cauldron", "desc": "Cast-iron vat simmering mystical potions over open heat."},

  # Kategori 6: Mekanik & Medeniyet
  "buhar_motoru": {"name": "Steam Engine", "desc": "Mechanical engine converting pressurized vapor into drive."},
  "tekerlek": {"name": "Wheel", "desc": "Circular revolving rim that revolutionized overland transit."},
  "el_arabasi": {"name": "Wheelbarrow", "desc": "Hand-propelled cart transporting heavy loads with ease."},
  "lokomotif": {"name": "Locomotive", "desc": "Mighty steam-powered iron horse chugging on steel tracks."},
  "ampul": {"name": "Lightbulb", "desc": "Incandescent glass bulb illuminating darkness with filament glow."},
  "fener": {"name": "Lantern", "desc": "Portable lamp casting warm light onto shadowy paths."},
  "pusula": {"name": "Compass", "desc": "Navigational dial whose magnetized needle points true north."},
  "miknatis": {"name": "Magnet", "desc": "Polarized alloy drawing ferromagnetic metals toward it."},
  "elektrik_motoru": {"name": "Electric Motor", "desc": "Electromagnetic rotor generating continuous rotational torque."},
  "disli_cark": {"name": "Gear Cog", "desc": "Toothed machine wheel interlocking to transfer mechanical power."},
  "degirmen": {"name": "Windmill", "desc": "Towering structure harnessing air currents to turn millstones."},
  "ayna": {"name": "Mirror", "desc": "Smooth reflective surface echoing light and crystal reflections."},
  "saat": {"name": "Clock", "desc": "Intricate tick-tock mechanism measuring the march of time."},
  "su_degirmeni": {"name": "Watermill", "desc": "Rotating waterwheel converting stream flow into work."},

  # Kategori 7: Ağır Sanayi & İnşaat
  "celik_kulce": {"name": "Steel Ingot", "desc": "High-tensile refined iron-carbon alloy bar."},
  "ors": {"name": "Anvil", "desc": "Heavy forged steel block upon which weapons take shape."},
  "civi": {"name": "Nail", "desc": "Sharp pointed metal spike securing timber constructs."},
  "tugla": {"name": "Brick", "desc": "Kiln-baked rectangular block designed for masonry."},
  "harc": {"name": "Mortar", "desc": "Binding paste of sand, water and mineral paste."},
  "tugla_duvar": {"name": "Brick Wall", "desc": "Solid defensive barricade built from mortared bricks."},
  "saglam_sandik": {"name": "Sturdy Chest", "desc": "Iron-banded timber trunk safeguarding valuable treasures."},
  "kristal": {"name": "Crystal", "desc": "Faceted translucent mineral radiating prismatic gleams."},
  "teleskop": {"name": "Telescope", "desc": "Optical tube magnifying distant stars and cosmic sights."},
  "vinc": {"name": "Crane", "desc": "Towering mechanical derrick hoisting monumental weights."},
  "demir_parmaklik": {"name": "Iron Bars", "desc": "Heavy steel grates barring intrusion and passage."},
  "savas_baltasi": {"name": "Battleaxe", "desc": "Double-bladed cleaver delivering devastating overhead swings."},
  "gozetleme_kulesi": {"name": "Watchtower", "desc": "High observation post keeping vigil over surrounding borders."},
  "kale_kapisi": {"name": "Fortress Gate", "desc": "Massive reinforced portcullis withstanding siege assaults."},

  # Kategori 8: Kozmoloji & Boyut
  "yildiz_tozu": {"name": "Stardust", "desc": "Shimmering cosmic particulate harvested from stellar tails."},
  "prizma_tasi": {"name": "Prism Gem", "desc": "Geometric crystal splitting illumination into rainbow hues."},
  "kahin_kuresi": {"name": "Scrying Orb", "desc": "Mystical crystal sphere granting glimpses of unseen horizons."},
  "portal_runu": {"name": "Portal Rune", "desc": "Carved runic glyph resonating with dimensional harmonics."},
  "bosluk_sisesi": {"name": "Void Flask", "desc": "Hermetic phial containing a swirling miniature abyss."},
  "boyut_kapisi": {"name": "Dimensional Gate", "desc": "Stone archway warping space to bridge remote realities."},
  "anka_kulu": {"name": "Phoenix Ash", "desc": "Sacred burning embers from which life rises renewed."},
  "runik_zirh": {"name": "Runic Armor", "desc": "Suit of enchanted steel inlaid with glowing wards."},
  "firtina_kilici": {"name": "Stormblade", "desc": "Crackling broadsword enveloped in fierce electric arcing."},
  "yildiz_gecidi_cekirdegi": {"name": "Stargate Core", "desc": "Hyper-dense cosmic nexus powering interstellar passages."},
  "buz_runu": {"name": "Frost Rune", "desc": "Inscribed glacial talisman emitting biting sub-zero cold."},
  "cehennem_tasi": {"name": "Nether Stone", "desc": "Scorching brimstone pulsing with inner volcanic fires."},
  "zaman_kum_saati": {"name": "Hourglass of Time", "desc": "Chrono-relic whose celestial sands bend the flow of moments."},
  "illuzyon_aynasi": {"name": "Mirror of Illusions", "desc": "Spectral glass reflecting phantom mirages and optical tricks."},

  # Kategori 9: Yüksek Bilim & Sibernetik
  "siber_kristal": {"name": "Cyber Crystal", "desc": "Synthetically structured micro-matrix computing data beams."},
  "hologram_kupu": {"name": "Hologram Cube", "desc": "High-tech photonic projector beaming 3D light holographs."},
  "buhar_jeneratoru": {"name": "Steam Dynamo", "desc": "Heavy-duty power generator converting high-pressure steam into current."},
  "meka_zirhi": {"name": "Mecha Exoskeleton", "desc": "Hydraulic powered combat suit boosting strength tenfold."},
  "plazma_tufegi": {"name": "Plasma Rifle", "desc": "Advanced energy firearm discharging superheated ionized rounds."},
  "felsefe_tasi": {"name": "Philosopher's Stone", "desc": "Legendary alchemical catalyst transmuting elements and extending vitality."},
  "gunes_paneli": {"name": "Solar Array", "desc": "Photovoltaic grid converting solar radiation into clean electric flow."},
  "yercekimsiz_platform": {"name": "Antigravity Plate", "desc": "Floating magnetic disc negating local gravitational pull."},
  "biyonik_kol": {"name": "Bionic Arm", "desc": "Prosthetic mechanical limb with servo-assisted dexterity."},
  "usturlap": {"name": "Astrolabe", "desc": "Precision brass astronomical instrument charting constellations."},
  "tesla_bobini": {"name": "Tesla Coil", "desc": "Resonant induction transformer casting crackling high-voltage bolts."},
  "kuantum_islemci": {"name": "Quantum Processor", "desc": "Superconducting qubit matrix performing hyper-dimensional calculations."},
  "minyatur_yildiz": {"name": "Miniature Star", "desc": "Self-sustaining micro-fusion sphere radiating cosmic radiance."},

  # Kategori 10: Doğa & Coğrafya
  "dag": {"name": "Mountain", "desc": "Majestic rocky summit towering high above low valleys."},
  "kaya": {"name": "Boulder", "desc": "Massive eroded crag resting solidly on earthen soil."},
  "gunes": {"name": "Sun", "desc": "Blazing golden star radiating daylight warmth and solar energy."},
  "okyanus": {"name": "Ocean", "desc": "Boundless expanse of deep tidal waters cradling marine depths."},
  "volkan": {"name": "Volcano", "desc": "Fissured mountain peak spewing molten lava and smoke into skies."},
  "ada": {"name": "Island", "desc": "Isolated paradise of verdant land surrounded by open waters."},
  "nehir": {"name": "River", "desc": "Winding freshwater current carving paths through wilderness."},
  "orman": {"name": "Forest", "desc": "Sprawling woodland grove thriving with ancient trees and wildlife."},
  "firtina_bulutu": {"name": "Stormcloud", "desc": "Dark rumbling cumulonimbus crackling with sudden lightning."},
  "magara": {"name": "Cave", "desc": "Subterranean cavern carved through rocky depths."},
  "gokkusagi": {"name": "Rainbow", "desc": "Vibrant chromatic arc painted by sunlight parting the rain."},
  "kanyon": {"name": "Canyon", "desc": "Deep monumental gorge sculpted by ancient riverbeds."},
  "fay_hatti": {"name": "Fault Line", "desc": "Tectonic earth fissure vibrating with geological energy."}
}

# Verify coverage
missing_trans = [it['id'] for it in items if it['id'] not in translations]
print('Missing translations count:', len(missing_trans))
if missing_trans:
    print('Missing IDs:', missing_trans)
else:
    print('All 176 items have full English translations!')

# Build combined dictionaries
full_i18n = {
    "tr": {
        "ui": {
            "search_placeholder": "🔍 Ara...",
            "all_categories": "📁 Tümü",
            "cat_elements": "🔥 Element",
            "cat_nature": "🌱 Doğa",
            "cat_life": "🧬 Canlı",
            "cat_craft_tools": "⚔️ Zanaat",
            "cat_5": "🧪 Simya & Büyü",
            "cat_6": "⚙️ Mekanik",
            "cat_7": "🏗️ Ağır Sanayi",
            "cat_8": "🌌 Kozmoloji & Boyut",
            "cat_9": "🔬 Yüksek Bilim",
            "cat_10": "🌄 Doğa & Coğrafya",
            "sort_discovery": "⏳ Keşif",
            "sort_category": "📂 Kategori",
            "cleanup": "🧹 Temizlik",
            "char_apprentice": "🧙‍♂️ Çırak",
            "char_observer": "🎭 Gözlemci",
            "hints_title": "💡 İpuçları",
            "hint_rights": "Hak: {n}",
            "hint_get": "İpucu Al (-1 Hak)",
            "hint_opened": "✓ Tam İpucu Açık",
            "hint_no_craftable": "Şu an keşfedilebilir yeni ipucu yok. Farklı kombinasyonlar deneyin!",
            "hint_click_to_open": "İpucu açmak için tıklayın",
            "hint_consists_of": "<strong>{name}</strong>: {count} bileşenden oluşur.",
            "hint_basic_element": "Bu temel bir elementtir.",
            "discovery_title": "Yeni Keşif",
            "ad_title": "📺 Reklam İzle",
            "ad_desc": "İpucu hakkınız bitti! Kısa bir reklam izleyerek hemen +1 İpucu kazanabilirsiniz.",
            "ad_watch_btn": "Reklamı İzle (+1 İpucu)",
            "ad_cancel_btn": "Vazgeç",
            "ad_watched_alert": "📺 Reklam başarıyla izlendi! +1 İpucu hakkı harcanarak detaylı ipucu açıldı.",
            "lang_btn": "🌐 Dil: TR"
        },
        "items": {}
    },
    "en": {
        "ui": {
            "search_placeholder": "🔍 Search...",
            "all_categories": "📁 All",
            "cat_elements": "🔥 Elements",
            "cat_nature": "🌱 Nature",
            "cat_life": "🧬 Life",
            "cat_craft_tools": "⚔️ Craft & Tools",
            "cat_5": "🧪 Alchemy & Magic",
            "cat_6": "⚙️ Mechanics",
            "cat_7": "🏗️ Heavy Industry",
            "cat_8": "🌌 Cosmology & Void",
            "cat_9": "🔬 High Science",
            "cat_10": "🌄 Geography",
            "sort_discovery": "⏳ Discovered",
            "sort_category": "📂 Category",
            "cleanup": "🧹 Clear Table",
            "char_apprentice": "🧙‍♂️ Apprentice",
            "char_observer": "🎭 Observer",
            "hints_title": "💡 Hints",
            "hint_rights": "Rights: {n}",
            "hint_get": "Get Hint (-1 Right)",
            "hint_opened": "✓ Full Hint Revealed",
            "hint_no_craftable": "No new craftable items to discover right now. Try combining different items!",
            "hint_click_to_open": "Click to unlock hint",
            "hint_consists_of": "<strong>{name}</strong>: consists of {count} components.",
            "hint_basic_element": "This is a basic element.",
            "discovery_title": "New Discovery",
            "ad_title": "📺 Watch Ad",
            "ad_desc": "Out of hint rights! Watch a short ad to earn +1 Hint right immediately.",
            "ad_watch_btn": "Watch Ad (+1 Hint)",
            "ad_cancel_btn": "Cancel",
            "ad_watched_alert": "📺 Ad watched successfully! Used +1 hint right to reveal detailed clue.",
            "lang_btn": "🌐 Lang: EN"
        },
        "items": {}
    }
}

for it in items:
    itemId = it['id']
    full_i18n['tr']['items'][itemId] = {
        'name': it['trName'],
        'desc': it['trDesc']
    }
    en_info = translations.get(itemId, {'name': it['trName'], 'desc': it['trDesc']})
    full_i18n['en']['items'][itemId] = {
        'name': en_info['name'],
        'desc': en_info['desc']
    }

with open('tools/full_i18n.json', 'w', encoding='utf-8') as f:
    json.dump(full_i18n, f, ensure_ascii=False, indent=2)

print('tools/full_i18n.json generated successfully!')
