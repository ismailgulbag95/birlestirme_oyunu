import json
import re

with open('tools/all_521_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    factory_text = f.read()

switch_part = factory_text[factory_text.find('switch (canonicalId)'):factory_text.find('default:')]
existing_cases = set(re.findall(r"case\s+['\"]([^'\"]+)['\"]:", switch_part))

# Define procedural model generators based on item characteristics
def create_model_code(item_id, item_data):
    name = item_data.get('name', item_id)
    cat = item_data.get('category', '')
    p_col = item_data.get('colorPalette', {}).get('primary', '#6366f1')
    s_col = item_data.get('colorPalette', {}).get('secondary', '#818cf8')
    e_col = item_data.get('colorPalette', {}).get('emissive', '#1e1b4b')
    arch = item_data.get('archetype3d', 'mineral')

    method_name = f"_create{item_id.title().replace('_', '')}Mesh"

    # Specific handcrafted templates
    # 1. Mum (Candle)
    if 'mum' in item_id or 'kandil' in item_id or 'fener' in item_id:
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Fasetli Balmumu Gövdesi (Eriyen Damlalar)
    const waxMat = new THREE.MeshStandardMaterial({{ color: 0xfef08a, roughness: 0.4, flatShading: true }});
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.6, 7), waxMat);
    candle.position.y = 0.3;
    group.add(candle);

    // Damla
    const drop = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), waxMat);
    drop.position.set(0.12, 0.42, 0.08);
    group.add(drop);

    // 2. Siyah Fitil ve Titreşen Alev
    const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.1, 3), new THREE.MeshBasicMaterial({{ color: 0x18181b }}));
    wick.position.y = 0.64;
    group.add(wick);

    const flameMat = new THREE.MeshBasicMaterial({{ color: 0xf59e0b }});
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 5), flameMat);
    flame.position.y = 0.76;
    group.add(flame);

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      flame.scale.y = 1.0 + Math.sin(time * 8.0) * 0.2;
      flame.scale.x = 1.0 + Math.cos(time * 6.0) * 0.1;
    }};
    return group;
  }}"""

    # 2. Çadır (Tent)
    elif 'cadir' in item_id:
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Kumaş Çadır Gövdesi (Piramidal Çatı)
    const tentMat = new THREE.MeshStandardMaterial({{ color: 0xd97706, roughness: 0.8, flatShading: true }});
    const tent = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.65, 4), tentMat);
    tent.position.y = 0.32;
    tent.rotation.y = Math.PI / 4;
    group.add(tent);

    // 2. Ahşap Destek Direkleri
    const poleMat = new THREE.MeshStandardMaterial({{ color: 0x78350f, flatShading: true }});
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.72, 4), poleMat);
    pole.position.set(0, 0.35, 0.38);
    group.add(pole);

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    }};
    return group;
  }}"""

    # 3. Tütün / Yaprak / Bitkiler (Tobacco / Leaf / Plant)
    elif 'tutun' in item_id or 'yaprak' in item_id or 'pamuk' in item_id or 'bugday' in item_id or 'misir' in item_id:
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Fasetli Bitki Sapı ve Açılmış Yapraklar
    const plantMat = new THREE.MeshStandardMaterial({{
      color: '{p_col}',
      emissive: '{e_col}',
      emissiveIntensity: 0.25,
      roughness: 0.6,
      flatShading: true
    }});
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.65, 5), plantMat);
    stem.position.y = 0.32;
    group.add(stem);

    for (let l = 0; l < 4; l++) {{
      const ang = (l / 4) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 3), plantMat);
      leaf.position.set(Math.cos(ang) * 0.16, 0.25 + l * 0.1, Math.sin(ang) * 0.16);
      leaf.rotation.set(Math.sin(ang) * 0.7, ang, Math.cos(ang) * 0.7);
      group.add(leaf);
    }}

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    }};
    return group;
  }}"""

    # 4. Virüs / Bakteri / Hücre (Virus / Bacteria / Cell)
    elif 'virus' in item_id or 'bakteri' in item_id or 'hucre' in item_id:
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Biyolojik Virüs Çekirdek Kapsülü
    const coreMat = new THREE.MeshStandardMaterial({{
      color: 0x9333ea,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      flatShading: true
    }});
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 0), coreMat);
    core.position.y = 0.48;
    group.add(core);

    // 2. Yüzeydeki Diken Proteinleri (Spike Proteins)
    const spikeMat = new THREE.MeshStandardMaterial({{ color: 0xef4444, flatShading: true }});
    for (let s = 0; s < 12; s++) {{
      const ang1 = (s / 12) * Math.PI * 2;
      const ang2 = (s % 4) * 0.8 - 0.4;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.16, 4), spikeMat);
      spike.position.set(Math.cos(ang1) * 0.36, 0.48 + Math.sin(ang2) * 0.2, Math.sin(ang1) * 0.36);
      spike.rotation.set(Math.sin(ang1), 0, -Math.cos(ang1));
      group.add(spike);
    }}

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;
      core.scale.setScalar(1.0 + Math.sin(time * 3.5) * 0.08);
      group.position.y = Math.sin(time * 2.0) * 0.03;
    }};
    return group;
  }}"""

    # 5. Kitap / Parşömen / Harita / Gazete (Book / Scroll / Map)
    elif 'kitap' in item_id or 'parsomen' in item_id or 'harita' in item_id or 'gazete' in item_id or 'yazi' in item_id:
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Deri Ciltli Kalın Kitap / Parşömen
    const coverMat = new THREE.MeshStandardMaterial({{ color: 0x78350f, roughness: 0.7, flatShading: true }});
    const pagesMat = new THREE.MeshStandardMaterial({{ color: 0xfef08a, roughness: 0.8, flatShading: true }});

    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.65), coverMat);
    cover.position.y = 0.25;
    cover.rotation.set(0.3, 0.2, 0);
    group.add(cover);

    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.6), pagesMat);
    pages.position.set(0.02, 0, 0);
    cover.add(pages);

    // Altın Mühür / Toka
    const seal = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({{ color: 0xf59e0b, metalness: 0.9 }}));
    seal.position.set(0.24, 0.06, 0);
    cover.add(seal);

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    }};
    return group;
  }}"""

    # 6. Binalar / Şehir / Ev / Okul / Hastane / Kütüphane / Müze
    elif any(k in item_id for k in ['bina', 'ev', 'otel', 'hastane', 'okul', 'kutuphane', 'muze', 'dukkan', 'pazar', 'sehir', 'metropol', 'koy', 'kasaba', 'kulube', 'sur', 'kopru', 'liman', 'tunel', 'baraj', 'darphane', 'medeniyet', 'imparatorluk', 'krallik', 'kabile']):
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({{ color: 0x475569, roughness: 0.9, flatShading: true }});
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({{
      color: '{p_col}',
      emissive: '{e_col}',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    }});
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({{ color: '{s_col}', roughness: 0.5, flatShading: true }});
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    }};
    return group;
  }}"""

    # 7. Taşıtlar (Tren, Uçak, Gemi, Tekne, Zeplin, Kano, Balon, Motosiklet, Bisiklet)
    elif any(k in item_id for k in ['tren', 'ucak', 'gemi', 'tekne', 'kano', 'zeplin', 'sicak_hava_balonu', 'fayton', 'kamyon', 'zirhli_gemi', 'kadirga', 'denizalti', 'motosiklet', 'bisiklet', 'demiryolu', 'ucurtma']):
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({{
      color: '{p_col}',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    }});
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({{ color: '{s_col}', roughness: 0.4, flatShading: true }});
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    }};
    return group;
  }}"""

    # 8. Mistik, Kozmik, Büyü, İksirler (Star, Time, Magic, Potion, Spirit, Angel, God)
    elif any(k in item_id for k in ['yildiz', 'kuyruklu_yildiz', 'evren', 'uzay', 'gece', 'gunduz', 'safak', 'zaman', 'kum_saati', 'tilsim', 'muska', 'totem', 'altar', 'heykel', 'obelisk', 'ruh', 'hayalet', 'melek', 'seytan', 'tanri', 'cin', 'peri', 'mana', 'mana_i_ksiri', 'sifa_i_ksiri', 'olumsuzluk_i_ksiri', 'i_ksir', 'i_ksir_kazani', 'run', 'simya', 'kozmik_usturlap', 'plato', 'manyetizma']):
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({{
      color: '{p_col}',
      emissive: '{s_col}',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    }});
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({{ color: '{s_col}' }});
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    }};
    return group;
  }}"""

    # 9. Generic Rich Multi-Part Form based on Archetype
    else:
        return method_name, f"""  static {method_name}(def) {{
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({{
      color: '{p_col}',
      emissive: '{e_col}',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    }});
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({{
      color: '{s_col}',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    }});
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {{
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    }};
    return group;
  }}"""

generated_methods = []
generated_cases = []

for item_id, item_data in items.items():
    if item_id not in existing_cases:
        m_name, m_code = create_model_code(item_id, item_data)
        generated_methods.append(m_code)
        generated_cases.append(f"""      case '{item_id}':
        mainMesh = this.{m_name}(def);
        break;""")

print(f"Generated {len(generated_methods)} new 3D model functions and switch cases!")

# Inject into ItemFactory.js
all_new_methods_code = "\n  // =========================================================================\n  // DEDICATED 3D MODELS FOR ALL REMAINING 521 ITEMS (%100 COVERAGE)\n  // =========================================================================\n" + "\n\n".join(generated_methods) + "\n"
all_new_cases_code = "\n".join(generated_cases) + "\n"

pos = factory_text.find('  static _createArchetypeMesh(def)')
if pos != -1:
    factory_text = factory_text[:pos] + all_new_methods_code + "\n" + factory_text[pos:]

case_pos = factory_text.find('      default:')
if case_pos != -1:
    factory_text = factory_text[:case_pos] + all_new_cases_code + factory_text[case_pos:]

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(factory_text)

print("Successfully injected all remaining 3D models into ItemFactory.js!")
