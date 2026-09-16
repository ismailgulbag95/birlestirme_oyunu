import json
import re

PHASE6_MODELS = """
  // =========================================================================
  // FAZ 6: BİLİM, TEKNOLOJİ VE MİSTİK/EVREN (07_bilim_ve_teknoloji & 08_mistik)
  // =========================================================================

  static _createRobotMesh(def) {
    const group = new THREE.Group();
    // 1. Metalik Robot Başı ve Gövdesi
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0369a1,
      emissiveIntensity: 0.25,
      metalness: 0.8,
      roughness: 0.25,
      flatShading: true
    });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.35, 0.35), steelMat);
    head.position.y = 0.58;
    group.add(head);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.38), steelMat);
    body.position.y = 0.22;
    group.add(body);

    // 2. Parlayan Neon Sarı Gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    [-0.09, 0.09].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), eyeMat);
      eye.position.set(ex, 0.6, 0.18);
      group.add(eye);
    });

    // 3. Anten ve Parlayan Kırmızı Işık
    const antMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 4), antMat);
    ant.position.set(0, 0.84, 0);
    group.add(ant);

    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const bulb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), bulbMat);
    bulb.position.set(0, 0.96, 0);
    group.add(bulb);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      bulb.scale.setScalar(1.0 + Math.sin(time * 6.0) * 0.2);
    };
    return group;
  }

  static _createDinamitMesh(def) {
    const group = new THREE.Group();
    // 1. 3 Kırmızı Dinamit Lokumu
    const dynMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.25,
      roughness: 0.6,
      flatShading: true
    });
    const bandMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9, flatShading: true });

    [[-0.08, 0.14], [0.08, 0.14], [0, 0.28]].forEach(([dx, dy]) => {
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.55, 6), dynMat);
      stick.position.set(dx, dy + 0.15, 0);
      stick.rotation.z = 0.3;
      group.add(stick);
    });

    // Siyah Bağlama Bandı
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 6), bandMat);
    band.position.set(0, 0.35, 0);
    band.rotation.z = 0.3;
    group.add(band);

    // 2. Yanan Fitil ve Kıvılcım
    const fuseMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, flatShading: true });
    const fuse = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 3), fuseMat);
    fuse.position.set(-0.15, 0.6, 0);
    fuse.rotation.z = -0.4;
    group.add(fuse);

    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), sparkMat);
    spark.position.set(-0.2, 0.7, 0);
    group.add(spark);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      spark.scale.setScalar(1.0 + Math.sin(time * 15.0) * 0.35);
    };
    return group;
  }

  static _createBilgisayarMesh(def) {
    const group = new THREE.Group();
    // 1. Retro Monitör ve Kaide
    const beigeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5, flatShading: true });
    const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.42, 0.3), beigeMat);
    monitor.position.set(0, 0.42, -0.05);
    group.add(monitor);

    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.12, 6), beigeMat);
    stand.position.set(0, 0.16, -0.05);
    group.add(stand);

    // 2. Parlayan Yeşil Terminal Ekranı
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.32, 0.02), screenMat);
    screen.position.set(0, 0.42, 0.11);
    group.add(screen);

    // 3. Klavye
    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.04, 0.22), beigeMat);
    keyboard.position.set(0, 0.08, 0.2);
    keyboard.rotation.x = 0.15;
    group.add(keyboard);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createRoketMesh(def) {
    const group = new THREE.Group();
    // 1. Beyaz Gövde ve Kırmızı Burun Konisi
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.3, flatShading: true });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.65, 7), whiteMat);
    body.position.y = 0.45;
    group.add(body);

    const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, flatShading: true });
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.35, 7), redMat);
    nose.position.y = 0.92;
    group.add(nose);

    // 2. 3 Adet Denge Kanatçığı
    for (let f = 0; f < 3; f++) {
      const ang = (f / 3) * Math.PI * 2;
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.25, 0.03), redMat);
      fin.position.set(Math.cos(ang) * 0.22, 0.25, Math.sin(ang) * 0.22);
      fin.rotation.y = -ang;
      group.add(fin);
    }

    // 3. Roket Alevi Egzozu
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 5), flameMat);
    flame.position.y = 0.02;
    flame.rotation.x = Math.PI;
    group.add(flame);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      flame.scale.y = 1.0 + Math.sin(time * 8.0) * 0.25;
      group.position.y = Math.sin(time * 3.0) * 0.03;
    };
    return group;
  }

  static _createUyduMesh(def) {
    const group = new THREE.Group();
    // 1. Altın Yaldızlı Ana Gövde
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), goldMat);
    core.position.y = 0.45;
    group.add(core);

    // 2. İki Mavi Güneş Paneli
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      flatShading: true
    });
    const lPanel = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.25, 0.02), panelMat);
    lPanel.position.set(-0.45, 0.45, 0);
    const rPanel = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.25, 0.02), panelMat);
    rPanel.position.set(0.45, 0.45, 0);
    group.add(lPanel);
    group.add(rPanel);

    // 3. Çanak Anten
    const dishMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.6, flatShading: true });
    const dish = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.1, 7), dishMat);
    dish.position.set(0, 0.72, 0);
    group.add(dish);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      group.rotation.z += dt * 0.4;
    };
    return group;
  }

  static _createUzayGemisiMesh(def) {
    const group = new THREE.Group();
    // 1. Çelik Gövde
    const shipMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const fuselage = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.85, 4), shipMat);
    fuselage.position.set(0, 0.45, 0);
    fuselage.rotation.set(-Math.PI / 2, 0, Math.PI / 4);
    group.add(fuselage);

    // 2. Neon Mavi İtki Motorları
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    [-0.15, 0.15].forEach(tx => {
      const thruster = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 4), thrusterMat);
      thruster.position.set(tx, 0.45, -0.45);
      thruster.rotation.x = -Math.PI / 2;
      group.add(thruster);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createHelikopterMesh(def) {
    const group = new THREE.Group();
    // 1. Gövde ve Kuyruk
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), bodyMat);
    cabin.scale.set(0.9, 0.9, 1.3);
    cabin.position.y = 0.42;
    group.add(cabin);

    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.45, 4), bodyMat);
    tail.position.set(0, 0.45, -0.45);
    tail.rotation.x = Math.PI / 2;
    group.add(tail);

    // 2. Dönen Üst Pervane
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 0.72, 0);
    group.add(rotorGroup);

    const bladeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.01, 0.06), bladeMat);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.01, 0.9), bladeMat);
    rotorGroup.add(b1);
    rotorGroup.add(b2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      rotorGroup.rotation.y += dt * 12.0;
    };
    return group;
  }

  static _createArabaMesh(def) {
    const group = new THREE.Group();
    // 1. Kırmızı Spor Gövde
    const carMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, flatShading: true });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.75), carMat);
    chassis.position.y = 0.22;
    group.add(chassis);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.38), new THREE.MeshStandardMaterial({ color: 0x0f172a, flatShading: true }));
    cabin.position.set(0, 0.36, -0.05);
    group.add(cabin);

    // 2. 4 Tekerlek
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9, flatShading: true });
    [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]].forEach(([wx, wz]) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 6), wheelMat);
      wheel.position.set(wx, 0.1, wz);
      wheel.rotation.z = Math.PI / 2;
      group.add(wheel);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createKaradelikMesh(def) {
    const group = new THREE.Group();
    // 1. Saf Karanlık Çekirdek (Olay Ufku)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), coreMat);
    core.position.y = 0.48;
    group.add(core);

    // 2. Parlayan Mor/Turuncu Yığılma Diski (Accretion Disk)
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const disk = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.65, 8), diskMat);
    disk.position.y = 0.48;
    disk.rotation.x = Math.PI / 2.3;
    group.add(disk);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      disk.rotation.z += dt * 4.0;
      group.rotation.y += dt * 0.8;
      core.scale.setScalar(1.0 + Math.sin(time * 3.0) * 0.05);
    };
    return group;
  }

  static _createGalaksiMesh(def) {
    const group = new THREE.Group();
    // 1. İki Kollu Dönen Spiral Galaksi Diskleri
    const galMat1 = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    const gal1 = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.1, 4, 8), galMat1);
    gal1.position.y = 0.48;
    gal1.rotation.x = Math.PI / 3;
    group.add(gal1);

    const galMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    const gal2 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 4, 8), galMat2);
    gal2.position.y = 0.48;
    gal2.rotation.x = Math.PI / 3;
    group.add(gal2);

    // Galaksi Çekirdeği
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), coreMat);
    core.position.y = 0.48;
    group.add(core);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      gal1.rotation.z += dt * 2.0;
      gal2.rotation.z += dt * 2.8;
      group.rotation.y += dt * 0.7;
    };
    return group;
  }

  static _createGezegenMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Gezegen Küresi
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      roughness: 0.4,
      flatShading: true
    });
    const planet = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 1), planetMat);
    planet.position.y = 0.48;
    group.add(planet);

    // 2. Parlak Satürn Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.62, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2.8;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ring.rotation.z += dt * 1.2;
    };
    return group;
  }

  static _createGunesSaatiMesh(def) {
    const group = new THREE.Group();
    // 1. Mermer Kadran Tablası
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4, flatShading: true });
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 0.1, 8), marbleMat);
    dial.position.y = 0.08;
    group.add(dial);

    // 2. Altın Gnomon İbresi
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2, flatShading: true });
    const gnomon = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.42, 3), goldMat);
    gnomon.position.set(0, 0.28, 0);
    gnomon.rotation.set(0.4, 0, 0);
    group.add(gnomon);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createKutsalKaseMesh(def) {
    const group = new THREE.Group();
    // 1. Saf Altın Kutsal Kadeh
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.15,
      flatShading: true
    });
    const cup = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.35, 7), goldMat);
    cup.position.y = 0.55;
    cup.rotation.x = Math.PI;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.3, 5), goldMat);
    stem.position.y = 0.28;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.06, 7), goldMat);
    base.position.y = 0.08;
    group.add(cup);
    group.add(stem);
    group.add(base);

    // 2. Parlayan Kutsal Işıltı Küresi
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const glow = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), glowMat);
    glow.position.set(0, 0.62, 0);
    group.add(glow);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      glow.scale.setScalar(1.0 + Math.sin(time * 4.0) * 0.15);
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createUranyumMesh(def) {
    const group = new THREE.Group();
    // 1. Metalik Koruma Çerçevesi
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.4, flatShading: true });
    const frame = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.12, 6), frameMat);
    frame.position.y = 0.08;
    group.add(frame);

    // 2. Parlayan Radyoaktif Yeşil Uranyum Çubukları
    const radMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x16a34a,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.2,
      flatShading: true
    });
    for (let c = 0; c < 3; c++) {
      const ang = (c / 3) * Math.PI * 2;
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.55, 5), radMat);
      rod.position.set(Math.cos(ang) * 0.12, 0.38, Math.sin(ang) * 0.12);
      group.add(rod);
    }

    // 3. Radyasyon Işıma Halkası
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x86efac, transparent: true, opacity: 0.6 });
    const glow = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.02, 3, 6), glowMat);
    glow.position.y = 0.45;
    glow.rotation.x = Math.PI / 2;
    group.add(glow);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      glow.rotation.z += dt * 2.5;
      glow.scale.setScalar(1.0 + Math.sin(time * 5.0) * 0.12);
    };
    return group;
  }
"""

PHASE6_CASES = """      case 'robot':
        mainMesh = this._createRobotMesh(def);
        break;
      case 'dinamit':
      case 'dynamite':
      case 'bomba':
      case 'bomb':
        mainMesh = this._createDinamitMesh(def);
        break;
      case 'bilgisayar':
      case 'computer':
        mainMesh = this._createBilgisayarMesh(def);
        break;
      case 'roket':
      case 'rocket':
        mainMesh = this._createRoketMesh(def);
        break;
      case 'uydu':
      case 'satellite':
        mainMesh = this._createUyduMesh(def);
        break;
      case 'uzay_gemisi':
      case 'spaceship':
        mainMesh = this._createUzayGemisiMesh(def);
        break;
      case 'helikopter':
      case 'helicopter':
        mainMesh = this._createHelikopterMesh(def);
        break;
      case 'araba':
      case 'car':
      case 'otomobil':
        mainMesh = this._createArabaMesh(def);
        break;
      case 'karadelik':
      case 'black_hole':
        mainMesh = this._createKaradelikMesh(def);
        break;
      case 'galaksi':
      case 'galaxy':
      case 'nebula':
        mainMesh = this._createGalaksiMesh(def);
        break;
      case 'gezegen':
      case 'planet':
        mainMesh = this._createGezegenMesh(def);
        break;
      case 'gunes_saati':
        mainMesh = this._createGunesSaatiMesh(def);
        break;
      case 'kutsal_kase':
      case 'holy_grail':
        mainMesh = this._createKutsalKaseMesh(def);
        break;
      case 'uranyum':
      case 'uranium':
        mainMesh = this._createUranyumMesh(def);
        break;
"""

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Insert methods before static _createArchetypeMesh
pos = text.find('  static _createArchetypeMesh(def)')
if pos != -1:
    text = text[:pos] + PHASE6_MODELS + "\n" + text[pos:]

# Insert cases before default:
case_pos = text.find('      default:')
if case_pos != -1:
    text = text[:case_pos] + PHASE6_CASES + text[case_pos:]

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully injected Phase 6 Science, Technology & Mystical into ItemFactory.js!")
