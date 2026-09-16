import json
import re

PHASE4_MODELS = """
  // =========================================================================
  // FAZ 4: MADENLER, MATERYALLER VE YAPILAR (05_maden_ve_materyaller & Mimari)
  // =========================================================================

  static _createPiramitMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Kumtaşı Basamaklı Piramit
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.85,
      flatShading: true
    });
    const pyr = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.72, 4), sandMat);
    pyr.position.y = 0.36;
    pyr.rotation.y = Math.PI / 4;
    pyr.castShadow = true;
    group.add(pyr);

    // 2. Parlayan Saf Altın Piramidion (Zirve Taşı)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.15,
      flatShading: true
    });
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.22, 4), goldMat);
    cap.position.y = 0.64;
    cap.rotation.y = Math.PI / 4;
    group.add(cap);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      cap.scale.setScalar(1.0 + Math.sin(time * 3.0) * 0.05);
    };
    return group;
  }

  static _createSarayMesh(def) {
    const group = new THREE.Group();
    // 1. Mermer Zemin Kaidesi
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.6), marbleMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. 4 İyonik Mermer Sütun
    const colGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.45, 6);
    [[-0.22, -0.18], [0.22, -0.18], [-0.22, 0.18], [0.22, 0.18]].forEach(([cx, cz]) => {
      const col = new THREE.Mesh(colGeo, marbleMat);
      col.position.set(cx, 0.32, cz);
      group.add(col);
    });

    // 3. Altın Varaklı Kubbe ve Çatı
    const roof = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.55), marbleMat);
    roof.position.y = 0.58;
    group.add(roof);

    const goldDomeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true
    });
    const dome = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 1), goldDomeMat);
    dome.position.y = 0.74;
    group.add(dome);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
    };
    return group;
  }

  static _createKaleMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kale Gövdesi
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.85, flatShading: true });
    const mainKeep = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.55, 0.48), stoneMat);
    mainKeep.position.y = 0.3;
    group.add(mainKeep);

    // 2. 4 Köşe Burcu
    const towerGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.68, 6);
    [[-0.24, -0.24], [0.24, -0.24], [-0.24, 0.24], [0.24, 0.24]].forEach(([tx, tz]) => {
      const tower = new THREE.Mesh(towerGeo, stoneMat);
      tower.position.set(tx, 0.36, tz);
      group.add(tower);
    });

    // 3. Kırmızı Kale Bayrağı
    const flagMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, side: THREE.DoubleSide, flatShading: true });
    const flag = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.02), flagMat);
    flag.position.set(0.1, 0.78, 0);
    group.add(flag);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.35, 4), stoneMat);
    pole.position.set(0, 0.72, 0);
    group.add(pole);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
      flag.rotation.y = Math.sin(time * 4.0) * 0.35;
    };
    return group;
  }

  static _createFenerKulesiMesh(def) {
    const group = new THREE.Group();
    // 1. Beyaz & Kırmızı Çizgili Kule Gövdesi
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, flatShading: true });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, flatShading: true });

    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.25, 7), whiteMat);
    b1.position.y = 0.14;
    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.25, 7), redMat);
    b2.position.y = 0.38;
    const b3 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.25, 7), whiteMat);
    b3.position.y = 0.62;
    group.add(b1);
    group.add(b2);
    group.add(b3);

    // 2. Parlayan Dönen Fener Odası
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const light = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), lightMat);
    light.position.y = 0.82;
    group.add(light);

    // Dönen Işık Hüzmesi
    const beamMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.85, 4), beamMat);
    beam.position.set(0, 0.82, 0.45);
    beam.rotation.x = Math.PI / 2;
    group.add(beam);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      beam.rotation.z += dt * 3.5;
    };
    return group;
  }

  static _createTapinakMesh(def) {
    const group = new THREE.Group();
    // 1. Antik Kumtaşı Kaide ve Sütunlar
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.5), stoneMat);
    base.position.y = 0.05;
    group.add(base);

    // 6 Sütun
    for (let c = 0; c < 6; c++) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.45, 5), stoneMat);
      const cx = (c % 3 - 1) * 0.24;
      const cz = (Math.floor(c / 3) - 0.5) * 0.32;
      col.position.set(cx, 0.32, cz);
      group.add(col);
    }

    // 2. Üçgen Alınlık Çatı
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.28, 4), stoneMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
    };
    return group;
  }

  static _createYelDegirmeniMesh(def) {
    const group = new THREE.Group();
    // 1. Koni Ahşap Gövde
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85, flatShading: true });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.36, 0.65, 7), woodMat);
    body.position.y = 0.34;
    group.add(body);

    // 2. 4 Adet Dönen Pervane Kanadı
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 0.62, 0.22);
    group.add(rotorGroup);

    const sailMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, side: THREE.DoubleSide, flatShading: true });
    for (let b = 0; b < 4; b++) {
      const ang = (b / 4) * Math.PI * 2;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 0.02), sailMat);
      blade.position.set(Math.cos(ang) * 0.22, Math.sin(ang) * 0.22, 0);
      blade.rotation.z = ang;
      rotorGroup.add(blade);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
      rotorGroup.rotation.z += dt * 3.0;
    };
    return group;
  }

  static _createHazineMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap & Demir Sandık Gövdesi
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c2c16, roughness: 0.8, flatShading: true });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, flatShading: true });

    const box = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.32, 0.38), woodMat);
    box.position.y = 0.18;
    group.add(box);

    // Demir Şeritler
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.57, 0.34, 0.06), ironMat);
    band.position.set(0, 0.18, 0);
    group.add(band);

    // 2. Sandıktan Taşan Parlayan Altın Sikkeler ve Mücevherler
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const loot = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), goldMat);
    loot.position.set(0, 0.38, 0);
    group.add(loot);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      loot.scale.setScalar(1.0 + Math.sin(time * 3.0) * 0.06);
    };
    return group;
  }

  static _createAltinSikkeMesh(def) {
    const group = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });

    // 3 Üst Üste Yığılmış Altın Sikke
    for (let c = 0; c < 3; c++) {
      const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 8), goldMat);
      coin.position.set(c * 0.04 - 0.04, 0.1 + c * 0.1, 0);
      coin.rotation.set(0.1, c * 0.4, 0.1);
      group.add(coin);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
    };
    return group;
  }

  static _createElmasMesh(def) {
    const group = new THREE.Group();
    // Parlak Fasetli Elmas Kristali (Brilliant Cut)
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.92,
      flatShading: true
    });

    const gemTop = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.48, 0.22, 8), gemMat);
    gemTop.position.y = 0.52;
    group.add(gemTop);

    const gemBottom = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.45, 8), gemMat);
    gemBottom.position.y = 0.22;
    gemBottom.rotation.x = Math.PI;
    group.add(gemBottom);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createYakutMesh(def) {
    const group = new THREE.Group();
    const rubyMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xbe123c,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.3,
      flatShading: true
    });
    const ruby = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), rubyMat);
    ruby.position.y = 0.45;
    ruby.scale.set(0.9, 1.3, 0.9);
    group.add(ruby);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
    };
    return group;
  }

  static _createZumrutMesh(def) {
    const group = new THREE.Group();
    const emeraldMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x047857,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.3,
      flatShading: true
    });
    const emerald = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.65, 6), emeraldMat);
    emerald.position.y = 0.45;
    group.add(emerald);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
    };
    return group;
  }

  static _createSafirMesh(def) {
    const group = new THREE.Group();
    const sapphireMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.3,
      flatShading: true
    });
    const saph = new THREE.Mesh(new THREE.IcosahedronGeometry(0.36, 0), sapphireMat);
    saph.position.y = 0.45;
    group.add(saph);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
    };
    return group;
  }

  static _createAmetistMesh(def) {
    const group = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9, flatShading: true });
    const geodeBase = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38, 0), rockMat);
    geodeBase.position.y = 0.4;
    group.add(geodeBase);

    // İç Kristaller
    const ametistMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.9,
      metalness: 0.4,
      flatShading: true
    });
    for (let c = 0; c < 4; c++) {
      const crys = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 4), ametistMat);
      crys.position.set(c * 0.06 - 0.09, 0.45 + c * 0.04, 0.15);
      crys.rotation.x = Math.PI / 4;
      group.add(crys);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }
"""

PHASE4_CASES = """      case 'piramit':
      case 'pyramid':
        mainMesh = this._createPiramitMesh(def);
        break;
      case 'saray':
      case 'palace':
        mainMesh = this._createSarayMesh(def);
        break;
      case 'kale':
      case 'castle':
        mainMesh = this._createKaleMesh(def);
        break;
      case 'fener_kulesi':
      case 'lighthouse':
        mainMesh = this._createFenerKulesiMesh(def);
        break;
      case 'tapinak':
      case 'temple':
        mainMesh = this._createTapinakMesh(def);
        break;
      case 'yel_degirmeni':
      case 'windmill':
        mainMesh = this._createYelDegirmeniMesh(def);
        break;
      case 'hazine':
      case 'treasure':
        mainMesh = this._createHazineMesh(def);
        break;
      case 'altin_sikke':
      case 'gold_coin':
      case 'para':
        mainMesh = this._createAltinSikkeMesh(def);
        break;
      case 'elmas':
      case 'diamond':
        mainMesh = this._createElmasMesh(def);
        break;
      case 'yakut':
      case 'ruby':
        mainMesh = this._createYakutMesh(def);
        break;
      case 'zumrut':
      case 'emerald':
        mainMesh = this._createZumrutMesh(def);
        break;
      case 'safir':
      case 'sapphire':
        mainMesh = this._createSafirMesh(def);
        break;
      case 'ametist':
      case 'amethyst':
        mainMesh = this._createAmetistMesh(def);
        break;
"""

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Insert methods before static _createArchetypeMesh
pos = text.find('  static _createArchetypeMesh(def)')
if pos != -1:
    text = text[:pos] + PHASE4_MODELS + "\n" + text[pos:]

# Insert cases before default:
case_pos = text.find('      default:')
if case_pos != -1:
    text = text[:case_pos] + PHASE4_CASES + text[case_pos:]

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully injected Phase 4 Minerals, Materials & Architecture into ItemFactory.js!")
