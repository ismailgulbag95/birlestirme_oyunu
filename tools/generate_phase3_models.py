import json
import re

PHASE3_MODELS = """
  // =========================================================================
  // FAZ 3: ALETLER, ZANAAT VE SİLAHLAR (04_zanaat_ve_aletler)
  // =========================================================================

  static _createMancinikMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap Çerçeve Kaidesi
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85, flatShading: true });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.4, flatShading: true });

    // 4 Tekerlek
    [[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]].forEach(([wx, wz]) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 6), woodMat);
      wheel.position.set(wx, 0.1, wz);
      wheel.rotation.z = Math.PI / 2;
      group.add(wheel);
    });

    // Gövde Kirişleri
    const beam1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.35), woodMat);
    beam1.position.y = 0.14;
    group.add(beam1);

    // Fırlatma Kolu
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.55, 0.06), woodMat);
    arm.position.set(0, 0.35, -0.05);
    arm.rotation.x = 0.5;
    group.add(arm);

    // Taş Yuvası ve Gülle
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.06, 0.06, 5), ironMat);
    cup.position.set(0, 0.58, -0.18);
    cup.rotation.x = 0.5;
    group.add(cup);

    const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: 0x64748b, flatShading: true }));
    stone.position.set(0, 0.62, -0.18);
    group.add(stone);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      arm.rotation.x = 0.5 + Math.sin(time * 3.0) * 0.12;
      cup.position.set(0, 0.35 + Math.cos(arm.rotation.x) * 0.28, -0.05 - Math.sin(arm.rotation.x) * 0.28);
      stone.position.set(0, cup.position.y + 0.04, cup.position.z);
    };
    return group;
  }

  static _createTufekMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap Kundak
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c2c16, roughness: 0.8, flatShading: true });
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.45), woodMat);
    stock.position.set(0, 0.38, -0.18);
    stock.rotation.x = -0.2;
    group.add(stock);

    // 2. Çelik Namlu
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25, flatShading: true });
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.65, 6), steelMat);
    barrel.position.set(0, 0.45, 0.15);
    barrel.rotation.x = Math.PI / 2;
    group.add(barrel);

    // 3. Altın Tetik ve Mekanizma
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, flatShading: true });
    const trigger = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.008, 3, 6), goldMat);
    trigger.position.set(0, 0.35, -0.02);
    group.add(trigger);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createTabancaMesh(def) {
    const group = new THREE.Group();
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3, flatShading: true });
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });

    // Kabza
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.08), gripMat);
    grip.position.set(0, 0.3, -0.08);
    grip.rotation.x = 0.3;
    group.add(grip);

    // Namlu ve Sürgü
    const slide = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.35), steelMat);
    slide.position.set(0, 0.44, 0.05);
    group.add(slide);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createMizrakMesh(def) {
    const group = new THREE.Group();
    // 1. Uzun Ahşap Sap
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.85, 5), woodMat);
    shaft.position.y = 0.42;
    group.add(shaft);

    // 2. Parlak Çelik Mızrak Ucu
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 4), steelMat);
    tip.position.y = 0.95;
    group.add(tip);

    // 3. Kırmızı Püskül
    const tasselMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, flatShading: true });
    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.065, 0.1, 4), tasselMat);
    tassel.position.y = 0.82;
    group.add(tassel);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      tassel.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createGurzMesh(def) {
    const group = new THREE.Group();
    // 1. Sap
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8, flatShading: true });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.65, 5), woodMat);
    handle.position.y = 0.35;
    group.add(handle);

    // 2. Dikenli Ağır Demir Baş
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3, flatShading: true });
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), ironMat);
    head.position.y = 0.72;
    group.add(head);

    // Dikenler
    const spikeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, flatShading: true });
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 4), spikeMat);
      spike.position.set(Math.cos(ang) * 0.16, 0.72, Math.sin(ang) * 0.16);
      spike.rotation.set(Math.sin(ang) * 1.5, 0, -Math.cos(ang) * 1.5);
      group.add(spike);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createCekicMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap Sap
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.6, 5), woodMat);
    handle.position.y = 0.32;
    group.add(handle);

    // 2. Ağır Demir Çekiç Başı
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.3, flatShading: true });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.16), steelMat);
    head.position.y = 0.62;
    group.add(head);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createBaltaMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap Sap
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c2c16, roughness: 0.8, flatShading: true });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.7, 5), woodMat);
    handle.position.y = 0.36;
    group.add(handle);

    // 2. Fasetli Çelik Balta Ağzı
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25, flatShading: true });
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.05), bladeMat);
    blade.position.set(0.12, 0.68, 0);
    group.add(blade);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createTestereMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap Kabza
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    const grip = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.025, 4, 6), gripMat);
    grip.position.set(-0.25, 0.45, 0);
    group.add(grip);

    // 2. Dişli Çelik Testere Plakası
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25, flatShading: true });
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.02), steelMat);
    blade.position.set(0.08, 0.45, 0);
    group.add(blade);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createAnahtarMesh(def) {
    const group = new THREE.Group();
    // 1. Parlak Altın Halka ve Gövde
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true
    });

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.035, 4, 8), goldMat);
    ring.position.y = 0.68;
    group.add(ring);

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.48, 5), goldMat);
    shaft.position.y = 0.38;
    group.add(shaft);

    // Anahtar Dişleri
    const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.03), goldMat);
    teeth.position.set(0.05, 0.2, 0);
    group.add(teeth);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;
    };
    return group;
  }

  static _createKilitMesh(def) {
    const group = new THREE.Group();
    // 1. Altın Gövde
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.25, flatShading: true });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.18), goldMat);
    body.position.y = 0.28;
    group.add(body);

    // 2. Çelik Kavisli Kanca
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2, flatShading: true });
    const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.04, 4, 8, Math.PI), steelMat);
    shackle.position.y = 0.48;
    shackle.rotation.z = Math.PI;
    group.add(shackle);

    // 3. Anahtar Deliği
    const keyholeMat = new THREE.MeshBasicMaterial({ color: 0x1c1917 });
    const keyhole = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 0.02), keyholeMat);
    keyhole.position.set(0, 0.28, 0.1);
    group.add(keyhole);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createCarkMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Pirinç/Bronz Dişli Çark
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });

    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.08, 8), brassMat);
    disc.position.y = 0.45;
    disc.rotation.x = Math.PI / 2;
    group.add(disc);

    // 8 Diş
    for (let d = 0; d < 8; d++) {
      const ang = (d / 8) * Math.PI * 2;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.08), brassMat);
      tooth.position.set(Math.cos(ang) * 0.42, 0.45, Math.sin(ang) * 0.42);
      tooth.rotation.y = -ang;
      group.add(tooth);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      disc.rotation.z += dt * 2.0;
    };
    return group;
  }

  static _createDisliMesh(def) {
    return this._createCarkMesh(def);
  }

  static _createGitarMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap Akustik Gövde (Kum Saati Eğrisi)
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5, flatShading: true });
    const body1 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.1, 7), woodMat);
    body1.position.set(0, 0.25, 0);
    const body2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 7), woodMat);
    body2.position.set(0, 0.46, 0);
    group.add(body1);
    group.add(body2);

    // 2. Uzun Sap ve Burguluk
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x451a03, flatShading: true });
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.05), neckMat);
    neck.position.set(0, 0.72, 0);
    group.add(neck);

    // 3. Teller
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const stringMesh = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.65, 0.01), stringMat);
    stringMesh.position.set(0, 0.48, 0.06);
    group.add(stringMesh);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createFlutMesh(def) {
    const group = new THREE.Group();
    // Parlak Gümüş Flüt Borusu
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2, flatShading: true });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 6), silverMat);
    body.position.y = 0.45;
    body.rotation.z = 0.4;
    group.add(body);

    // Delikler
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    for (let h = 0; h < 5; h++) {
      const hole = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.05), holeMat);
      hole.position.set(h * 0.05 - 0.1, 0.35 + h * 0.08, 0.02);
      group.add(hole);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createDavulMesh(def) {
    const group = new THREE.Group();
    // 1. Silindirik Gövde
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6, flatShading: true });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.38, 8), woodMat);
    body.position.y = 0.32;
    group.add(body);

    // 2. Beyaz Deri Gergi Yüzeyleri
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8, flatShading: true });
    const topSkin = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.39, 0.04, 8), skinMat);
    topSkin.position.y = 0.51;
    group.add(topSkin);

    // 3. Çapraz Ahşap Bagetler
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.45, 4), stickMat);
    s1.position.set(-0.1, 0.62, 0);
    s1.rotation.set(0.4, 0, 0.4);
    const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.45, stickMat);
    s2.position.set(0.1, 0.62, 0);
    s2.rotation.set(-0.4, 0, -0.4);
    group.add(s1);
    group.add(s2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createMikroskopMesh(def) {
    const group = new THREE.Group();
    // 1. Ağır Metal Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.4, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.38), baseMat);
    base.position.y = 0.04;
    group.add(base);

    // 2. Kavisli Kol
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.55, 5), baseMat);
    arm.position.set(-0.12, 0.35, 0);
    arm.rotation.z = -0.3;
    group.add(arm);

    // 3. Çelik Oküler / Optik Tüp
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2, flatShading: true });
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.45, 6), tubeMat);
    tube.position.set(0.06, 0.55, 0);
    tube.rotation.z = 0.3;
    group.add(tube);

    // Mercek Parlaması
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 6), lensMat);
    lens.position.set(0.12, 0.35, 0);
    group.add(lens);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createTeleskopMesh(def) {
    const group = new THREE.Group();
    // 1. Üçayak (Tripod)
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    for (let i = 0; i < 3; i++) {
      const ang = (i / 3) * Math.PI * 2;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.55, 4), woodMat);
      leg.position.set(Math.cos(ang) * 0.18, 0.25, Math.sin(ang) * 0.18);
      leg.rotation.set(Math.sin(ang) * 0.35, 0, -Math.cos(ang) * 0.35);
      group.add(leg);
    }

    // 2. Pirinç/Altın Teleskop Tüpü
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.25, flatShading: true });
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 0.75, 6), brassMat);
    tube.position.set(0, 0.62, 0);
    tube.rotation.set(0.4, 0, 0.4);
    group.add(tube);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }
"""

PHASE3_CASES = """      case 'mancinik':
      case 'catapult':
        mainMesh = this._createMancinikMesh(def);
        break;
      case 'tufek':
      case 'gun':
        mainMesh = this._createTufekMesh(def);
        break;
      case 'tabanca':
      case 'pistol':
        mainMesh = this._createTabancaMesh(def);
        break;
      case 'mizrak':
      case 'spear':
        mainMesh = this._createMizrakMesh(def);
        break;
      case 'gurz':
      case 'mace':
        mainMesh = this._createGurzMesh(def);
        break;
      case 'cekic':
      case 'hammer':
        mainMesh = this._createCekicMesh(def);
        break;
      case 'balta':
      case 'axe':
        mainMesh = this._createBaltaMesh(def);
        break;
      case 'testere':
      case 'saw':
        mainMesh = this._createTestereMesh(def);
        break;
      case 'anahtar':
      case 'key':
        mainMesh = this._createAnahtarMesh(def);
        break;
      case 'kilit':
      case 'lock':
        mainMesh = this._createKilitMesh(def);
        break;
      case 'cark':
      case 'gear':
      case 'disli':
        mainMesh = this._createCarkMesh(def);
        break;
      case 'gitar':
      case 'guitar':
        mainMesh = this._createGitarMesh(def);
        break;
      case 'flut':
      case 'flute':
        mainMesh = this._createFlutMesh(def);
        break;
      case 'davul':
      case 'drum':
        mainMesh = this._createDavulMesh(def);
        break;
      case 'mikroskop':
      case 'microscope':
        mainMesh = this._createMikroskopMesh(def);
        break;
      case 'teleskop':
      case 'telescope':
        mainMesh = this._createTeleskopMesh(def);
        break;
"""

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Insert methods before static _createArchetypeMesh
pos = text.find('  static _createArchetypeMesh(def)')
if pos != -1:
    text = text[:pos] + PHASE3_MODELS + "\n" + text[pos:]

# Insert cases before default:
case_pos = text.find('      default:')
if case_pos != -1:
    text = text[:case_pos] + PHASE3_CASES + text[case_pos:]

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully injected Phase 3 Tools, Crafting & Weapons into ItemFactory.js!")
