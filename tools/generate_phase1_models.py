import re
import json

# Definitions of Phase 1 Models
PHASE1_MODELS = """
  // =========================================================================
  // FAZ 1: DOĞA, ÇEVRE VE ELEMENTLER (01_elements & 02_doga)
  // =========================================================================

  static _createYanardagMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Volkanik Dağ Konisi
    const coneGeo = new THREE.CylinderGeometry(0.24, 0.65, 0.68, 7);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x332a27,
      roughness: 0.9,
      flatShading: true
    });
    const cone = new THREE.Mesh(coneGeo, rockMat);
    cone.position.y = 0.34;
    cone.castShadow = true;
    group.add(cone);

    // 2. Krater İçi Kaynayan Lav Havuzu
    const lavaGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 7);
    const lavaMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff4500,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      flatShading: true
    });
    const lava = new THREE.Mesh(lavaGeo, lavaMat);
    lava.position.y = 0.68;
    group.add(lava);

    // 3. Volkanik Duman Halkası
    const smokeGeo = new THREE.TorusGeometry(0.18, 0.05, 4, 7);
    const smokeMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.7,
      flatShading: true
    });
    const smoke = new THREE.Mesh(smokeGeo, smokeMat);
    smoke.position.y = 0.88;
    smoke.rotation.x = Math.PI / 2;
    group.add(smoke);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      smoke.position.y = 0.88 + Math.sin(time * 2.5) * 0.06;
      smoke.scale.setScalar(1.0 + Math.sin(time * 3.0) * 0.15);
      lava.scale.y = 1.0 + Math.sin(time * 4.0) * 0.2;
    };
    return group;
  }

  static _createGolMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Çimenli Kıyı Arazisi
    const bankGeo = new THREE.CylinderGeometry(0.62, 0.68, 0.16, 8);
    const bankMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.85, flatShading: true });
    const bank = new THREE.Mesh(bankGeo, bankMat);
    bank.position.y = 0.08;
    group.add(bank);

    // 2. Berrak Durgun Su Yüzeyi
    const waterGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.06, 8);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
      flatShading: true
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.16;
    group.add(water);

    // 3. Su Üstü Fasetli Nilüfer Yaprağı ve Çiçeği
    const padGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 5);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x15803d, flatShading: true });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(0.18, 0.2, 0.1);
    group.add(pad);

    const lotusGeo = new THREE.DodecahedronGeometry(0.06, 0);
    const lotusMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xdb2777, emissiveIntensity: 0.5, flatShading: true });
    const lotus = new THREE.Mesh(lotusGeo, lotusMat);
    lotus.position.set(0.18, 0.25, 0.1);
    group.add(lotus);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
      water.position.y = 0.16 + Math.sin(time * 2.0) * 0.015;
    };
    return group;
  }

  static _createDenizMesh(def) {
    const group = new THREE.Group();
    // 1. Dalgalı Fasetli Okyanus Kütlesi
    const waveGeo = new THREE.CylinderGeometry(0.65, 0.7, 0.28, 8);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9,
      flatShading: true
    });
    const ocean = new THREE.Mesh(waveGeo, oceanMat);
    ocean.position.y = 0.14;
    group.add(ocean);

    // 2. Fasetli Beyaz Dalga Köpükleri
    const crestGeo = new THREE.TorusGeometry(0.48, 0.04, 4, 8);
    const crestMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const crest = new THREE.Mesh(crestGeo, crestMat);
    crest.position.y = 0.28;
    crest.rotation.x = Math.PI / 2;
    group.add(crest);

    // 3. Minik Fasetli Ada / Kaya
    const rockGeo = new THREE.DodecahedronGeometry(0.16, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8, flatShading: true });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.set(-0.15, 0.32, -0.1);
    group.add(rock);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      crest.rotation.z += dt * 1.5;
      ocean.scale.y = 1.0 + Math.sin(time * 3.0) * 0.05;
    };
    return group;
  }

  static _createSelaleMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Dik Uçurum Kayası
    const cliffGeo = new THREE.BoxGeometry(0.5, 0.8, 0.4);
    const cliffMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const cliff = new THREE.Mesh(cliffGeo, cliffMat);
    cliff.position.set(0, 0.4, -0.12);
    cliff.castShadow = true;
    group.add(cliff);

    // 2. Dökülen Çağlayan Şelale Akıntısı
    const fallGeo = new THREE.BoxGeometry(0.28, 0.74, 0.08);
    const fallMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85,
      flatShading: true
    });
    const fall = new THREE.Mesh(fallGeo, fallMat);
    fall.position.set(0, 0.38, 0.12);
    group.add(fall);

    // 3. Tabandaki Fasetli Köpük Havuzu
    const poolGeo = new THREE.CylinderGeometry(0.36, 0.42, 0.1, 7);
    const pool = new THREE.Mesh(poolGeo, fallMat);
    pool.position.set(0, 0.05, 0.2);
    group.add(pool);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
      fall.scale.y = 1.0 + Math.sin(time * 6.0) * 0.04;
      pool.scale.setScalar(1.0 + Math.sin(time * 4.0) * 0.05);
    };
    return group;
  }

  static _createFirtinaMesh(def) {
    const group = new THREE.Group();
    // 1. Koyu Fırtına Bulutu Kümeleri
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8, flatShading: true });
    const c1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), cloudMat);
    c1.position.set(0, 0.6, 0);
    const c2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), cloudMat);
    c2.position.set(-0.22, 0.52, 0.08);
    const c3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), cloudMat);
    c3.position.set(0.22, 0.54, -0.06);
    group.add(c1);
    group.add(c2);
    group.add(c3);

    // 2. Parlayan Şimşek Kıvrımı
    const boltGeo = new THREE.OctahedronGeometry(0.16, 0);
    boltGeo.scale(0.4, 1.8, 0.4);
    const boltMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const bolt = new THREE.Mesh(boltGeo, boltMat);
    bolt.position.set(0, 0.25, 0.1);
    bolt.rotation.z = 0.2;
    group.add(bolt);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      bolt.visible = Math.sin(time * 12.0) > -0.2;
      c1.position.y = 0.6 + Math.sin(time * 3.0) * 0.02;
    };
    return group;
  }

  static _createKasirgaMesh(def) {
    const group = new THREE.Group();
    // 1. Dönen Spiral Girdap Halkaları (Tornado Vortex)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.75,
      flatShading: true
    });

    const rings = [];
    for (let i = 0; i < 4; i++) {
      const rad = 0.16 + i * 0.12;
      const rGeo = new THREE.TorusGeometry(rad, 0.035, 4, 7);
      const ring = new THREE.Mesh(rGeo, ringMat);
      ring.position.y = 0.15 + i * 0.22;
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      rings.push(ring);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;
      rings.forEach((r, idx) => {
        r.rotation.z += dt * (3.0 + idx * 1.5);
        r.position.x = Math.sin(time * 4.0 + idx) * 0.04;
      });
    };
    return group;
  }

  static _createHortumMesh(def) {
    return this._createKasirgaMesh(def);
  }

  static _createTayfunMesh(def) {
    return this._createKasirgaMesh(def);
  }

  static _createTsunamiMesh(def) {
    const group = new THREE.Group();
    // 1. Dev Kıvrımlı Dalga Duvarı (Crest Wave)
    const waveGeo = new THREE.TorusGeometry(0.5, 0.18, 5, 8, Math.PI * 1.1);
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9,
      flatShading: true
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.position.set(0, 0.4, 0);
    wave.rotation.z = Math.PI / 4;
    group.add(wave);

    // 2. Tepe Dalga Köpüğü
    const foamGeo = new THREE.DodecahedronGeometry(0.12, 0);
    const foamMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const foam = new THREE.Mesh(foamGeo, foamMat);
    foam.position.set(0.28, 0.72, 0);
    group.add(foam);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      wave.rotation.z = Math.PI / 4 + Math.sin(time * 3.0) * 0.08;
    };
    return group;
  }

  static _createGirdapMesh(def) {
    const group = new THREE.Group();
    // 1. İç İçe Dönen Su Hunisi
    const vortexGeo = new THREE.ConeGeometry(0.55, 0.45, 7, 1, true);
    const vortexMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
      flatShading: true
    });
    const vortex = new THREE.Mesh(vortexGeo, vortexMat);
    vortex.position.y = 0.35;
    vortex.rotation.x = Math.PI;
    group.add(vortex);

    const ringGeo = new THREE.TorusGeometry(0.48, 0.03, 3, 7);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.55;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      vortex.rotation.y -= dt * 4.0;
      ring.rotation.z += dt * 3.0;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createBuzulMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Keskin Buz Kütleleri
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.1,
      flatShading: true
    });

    const i1 = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.75, 5), iceMat);
    i1.position.set(0, 0.38, 0);
    const i2 = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 4), iceMat);
    i2.position.set(-0.2, 0.25, 0.1);
    i2.rotation.z = 0.2;
    const i3 = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.55, 4), iceMat);
    i3.position.set(0.2, 0.28, -0.08);
    i3.rotation.z = -0.25;

    group.add(i1);
    group.add(i2);
    group.add(i3);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createMercanKayaligiMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Deniz Tabanı Kayası
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.62, 0.16, 7);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.8, flatShading: true });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.08;
    group.add(base);

    // 2. Renkli Fasetli Mercan Dalları
    const coralMat1 = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.6, flatShading: true });
    const coralMat2 = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6, flatShading: true });
    const coralMat3 = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.6, flatShading: true });

    const c1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), coralMat1);
    c1.position.set(-0.16, 0.28, 0.1);
    const c2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.45, 5), coralMat2);
    c2.position.set(0.14, 0.35, -0.05);
    c2.rotation.z = -0.2;
    const c3 = new THREE.Mesh(new THREE.OctahedronGeometry(0.15, 0), coralMat3);
    c3.position.set(0, 0.38, 0.16);

    group.add(c1);
    group.add(c2);
    group.add(c3);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      c2.rotation.x = Math.sin(time * 2.0) * 0.08;
    };
    return group;
  }

  static _createAuroraMesh(def) {
    const group = new THREE.Group();
    // 1. Dalgalanan Fasetli Kuzey Işıkları Perdeleri
    const auroraMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    });
    const ribbon1 = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.55, 8, 1, true), auroraMat);
    ribbon1.position.y = 0.45;
    group.add(ribbon1);

    const auroraMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide
    });
    const ribbon2 = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.65, 8, 1, true), auroraMat2);
    ribbon2.position.y = 0.52;
    group.add(ribbon2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      ribbon1.rotation.y += dt * 1.5;
      ribbon2.rotation.y -= dt * 1.2;
      group.rotation.y += dt * 0.7;
      ribbon1.scale.y = 1.0 + Math.sin(time * 3.0) * 0.12;
      ribbon2.scale.y = 1.0 + Math.cos(time * 2.5) * 0.15;
    };
    return group;
  }

  static _createBambuMesh(def) {
    const group = new THREE.Group();
    // 1. Segmentli Bambu Sapları
    const bambooMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6, flatShading: true });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8, flatShading: true });

    [-0.12, 0.12].forEach((bx, idx) => {
      for (let j = 0; j < 3; j++) {
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.26, 5), bambooMat);
        seg.position.set(bx, 0.14 + j * 0.26, idx * 0.06);
        group.add(seg);

        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.03, 5), jointMat);
        ring.position.set(bx, 0.27 + j * 0.26, idx * 0.06);
        group.add(ring);
      }
    });

    // Minik bambu yaprağı
    const leafGeo = new THREE.ConeGeometry(0.06, 0.22, 3);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, flatShading: true });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(0.18, 0.72, 0.06);
    leaf.rotation.z = -0.6;
    group.add(leaf);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      leaf.rotation.z = -0.6 + Math.sin(time * 3.0) * 0.08;
    };
    return group;
  }

  static _createPalmiyeMesh(def) {
    const group = new THREE.Group();
    // 1. Kıvrık Fasetli Palmiye Gövdesi
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const tSeg = new THREE.Mesh(new THREE.CylinderGeometry(0.07 - i * 0.01, 0.08 - i * 0.01, 0.22, 5), trunkMat);
      tSeg.position.set(i * 0.04, 0.12 + i * 0.18, 0);
      tSeg.rotation.z = -0.15;
      group.add(tSeg);
    }

    // 2. Açılmış Palmiye Yaprakları
    const frondMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7, flatShading: true });
    for (let f = 0; f < 5; f++) {
      const angle = (f / 5) * Math.PI * 2;
      const frond = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.42, 3), frondMat);
      frond.position.set(0.16 + Math.cos(angle) * 0.18, 0.78, Math.sin(angle) * 0.18);
      frond.rotation.set(Math.sin(angle) * 0.8, angle, Math.cos(angle) * 0.8);
      group.add(frond);
    }

    // Hindistancevizi
    const cocoMat = new THREE.MeshStandardMaterial({ color: 0x451a03, flatShading: true });
    const coco = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), cocoMat);
    coco.position.set(0.14, 0.72, 0.04);
    group.add(coco);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKarliCamAgaciMesh(def) {
    const group = new THREE.Group();
    // 1. Gövde
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c2c16, roughness: 0.9, flatShading: true });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.3, 5), trunkMat);
    trunk.position.y = 0.15;
    group.add(trunk);

    // 2. Kar Kaplı İbreli Katmanlar
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x14532d, flatShading: true });
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, flatShading: true });

    [0.35, 0.55, 0.75].forEach((py, idx) => {
      const rad = 0.38 - idx * 0.09;
      const layer = new THREE.Mesh(new THREE.ConeGeometry(rad, 0.3, 5), pineMat);
      layer.position.y = py;
      group.add(layer);

      const snow = new THREE.Mesh(new THREE.ConeGeometry(rad * 0.85, 0.12, 5), snowMat);
      snow.position.y = py + 0.1;
      group.add(snow);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
    };
    return group;
  }

  static _createCicekMesh(def) {
    const group = new THREE.Group();
    // 1. İnce Kıvrık Sap
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803d, flatShading: true });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.6, 5), stemMat);
    stem.position.y = 0.3;
    group.add(stem);

    // 2. Yapraklar
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 3), stemMat);
    leaf.position.set(0.08, 0.26, 0);
    leaf.rotation.z = -0.6;
    group.add(leaf);

    // 3. Renkli Taç Yapraklar
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xbe185d,
      emissiveIntensity: 0.4,
      roughness: 0.4,
      flatShading: true
    });
    for (let p = 0; p < 5; p++) {
      const angle = (p / 5) * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 4), petalMat);
      petal.position.set(Math.cos(angle) * 0.12, 0.62, Math.sin(angle) * 0.12);
      petal.rotation.set(Math.sin(angle) * 0.5, 0, Math.cos(angle) * 0.5);
      group.add(petal);
    }

    // 4. Altın Çiçek Özü
    const core = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    core.position.set(0, 0.64, 0);
    group.add(core);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      core.scale.setScalar(1.0 + Math.sin(time * 3.0) * 0.08);
    };
    return group;
  }

  static _createGulMesh(def) {
    return this._createCicekMesh(def);
  }

  static _createVahaMesh(def) {
    const group = new THREE.Group();
    // 1. Çöl Kum Tepesi Kaidesi
    const sandGeo = new THREE.CylinderGeometry(0.62, 0.68, 0.14, 7);
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9, flatShading: true });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.position.y = 0.07;
    group.add(sand);

    // 2. Küçük Vaha Göleti
    const waterGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 7);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9,
      flatShading: true
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(-0.1, 0.15, 0);
    group.add(water);

    // 3. Minyatür Palmiye
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.45, 4), trunkMat);
    trunk.position.set(0.18, 0.35, -0.05);
    trunk.rotation.z = -0.15;
    group.add(trunk);

    const frondMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, flatShading: true });
    const fronds = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), frondMat);
    fronds.position.set(0.24, 0.58, -0.05);
    group.add(fronds);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createVadiMesh(def) {
    const group = new THREE.Group();
    // İki Kanyon Yamacı Arasında Akan Nehir
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.9, flatShading: true });
    const r1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.65, 0.65), rockMat);
    r1.position.set(-0.24, 0.32, 0);
    const r2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.55, 0.65), rockMat);
    r2.position.set(0.24, 0.28, 0);
    group.add(r1);
    group.add(r2);

    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
      flatShading: true
    });
    const river = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.65), riverMat);
    river.position.set(0, 0.08, 0);
    group.add(river);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
    };
    return group;
  }

  static _createBataklikMesh(def) {
    const group = new THREE.Group();
    const mudMat = new THREE.MeshStandardMaterial({ color: 0x3f3222, roughness: 0.95, flatShading: true });
    const mud = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.65, 0.16, 7), mudMat);
    mud.position.y = 0.08;
    group.add(mud);

    // Zehirli yeşil bataklık kabarcıkları
    const slimeMat = new THREE.MeshStandardMaterial({
      color: 0x84cc16,
      emissive: 0x4d7c0f,
      emissiveIntensity: 0.6,
      flatShading: true
    });
    const b1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1, 0), slimeMat);
    b1.position.set(-0.15, 0.18, 0.1);
    const b2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), slimeMat);
    b2.position.set(0.18, 0.18, -0.12);
    group.add(b1);
    group.add(b2);

    // Kuru kütük parçası
    const logMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, flatShading: true });
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.35, 4), logMat);
    log.position.set(0.05, 0.18, 0.15);
    log.rotation.set(0.3, 0.5, 1.2);
    group.add(log);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      b1.scale.setScalar(1.0 + Math.sin(time * 3.5) * 0.2);
      b2.scale.setScalar(1.0 + Math.cos(time * 4.0) * 0.25);
    };
    return group;
  }

  static _createBozkirMesh(def) {
    const group = new THREE.Group();
    const plainMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.9, flatShading: true });
    const plain = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.65, 0.14, 7), plainMat);
    plain.position.y = 0.07;
    group.add(plain);

    // Kuru ot demetleri
    const grassMat = new THREE.MeshStandardMaterial({ color: 0xa16207, flatShading: true });
    [-0.15, 0.15].forEach((gx, idx) => {
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 4), grassMat);
      tuft.position.set(gx, 0.24, idx * 0.1);
      tuft.rotation.z = idx === 0 ? -0.2 : 0.25;
      group.add(tuft);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createTundraMesh(def) {
    const group = new THREE.Group();
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.65, 0.14, 7), groundMat);
    ground.position.y = 0.07;
    group.add(ground);

    const frostMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.3, flatShading: true });
    const frost = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.04, 7), frostMat);
    frost.position.y = 0.15;
    group.add(frost);

    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), groundMat);
    rock.position.set(-0.15, 0.22, 0.1);
    group.add(rock);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createDepremMesh(def) {
    const group = new THREE.Group();
    // Kırılmış İki Tektonik Plaka
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.85, flatShading: true });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.25, 0.6), plateMat);
    p1.position.set(-0.18, 0.16, 0);
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.25, 0.6), plateMat);
    p2.position.set(0.18, 0.22, 0);
    group.add(p1);
    group.add(p2);

    // Kırık Arasındaki Kırmızı Magma Işıltısı
    const crackMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const crack = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.55), crackMat);
    crack.position.set(0, 0.14, 0);
    group.add(crack);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      p1.position.y = 0.16 + Math.sin(time * 8.0) * 0.02;
      p2.position.y = 0.22 - Math.sin(time * 8.0) * 0.02;
    };
    return group;
  }

  static _createYarimadaMesh(def) {
    const group = new THREE.Group();
    // Deniz Yüzeyi Kaidesi
    const waterGeo = new THREE.CylinderGeometry(0.65, 0.7, 0.12, 8);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85, flatShading: true });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.06;
    group.add(water);

    // Denize Doğru Uzanan Fasetli Yarımada Kara Parçası
    const landGeo = new THREE.BoxGeometry(0.32, 0.18, 0.65);
    const landMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8, flatShading: true });
    const land = new THREE.Mesh(landGeo, landMat);
    land.position.set(0, 0.16, 0.1);
    group.add(land);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKitaMesh(def) {
    const group = new THREE.Group();
    // Mavi Küre Okyanus Tabanı
    const globeMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, flatShading: true });
    const globe = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42, 1), globeMat);
    globe.position.y = 0.45;
    group.add(globe);

    // Kıta Toprak Kütleleri
    const landMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, flatShading: true });
    const l1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), landMat);
    l1.position.set(0.18, 0.58, 0.22);
    const l2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), landMat);
    l2.position.set(-0.2, 0.38, 0.24);
    group.add(l1);
    group.add(l2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createCigMesh(def) {
    const group = new THREE.Group();
    // Dağ Yamacı
    const slopeMat = new THREE.MeshStandardMaterial({ color: 0x64748b, flatShading: true });
    const slope = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.6, 0.5), slopeMat);
    slope.position.set(0, 0.3, -0.1);
    slope.rotation.x = -0.4;
    group.add(slope);

    // Yuvarlanan Dev Kar Topları
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, flatShading: true });
    const s1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), snowMat);
    s1.position.set(-0.12, 0.45, 0.1);
    const s2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), snowMat);
    s2.position.set(0.15, 0.25, 0.2);
    group.add(s1);
    group.add(s2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      s1.rotation.x += dt * 3.0;
      s2.rotation.x += dt * 4.0;
    };
    return group;
  }

  static _createDoluMesh(def) {
    const group = new THREE.Group();
    const hailMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      transparent: true,
      opacity: 0.85,
      flatShading: true
    });

    const stones = [];
    [[-0.15, 0.3, 0.1], [0.12, 0.45, -0.08], [-0.05, 0.6, -0.12], [0.18, 0.2, 0.15], [0, 0.35, 0]].forEach(([hx, hy, hz]) => {
      const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09, 0), hailMat);
      stone.position.set(hx, hy, hz);
      group.add(stone);
      stones.push(stone);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      stones.forEach((s, idx) => {
        s.position.y = 0.2 + ((s.position.y - 0.2 + dt * (0.5 + idx * 0.2)) % 0.5);
      });
    };
    return group;
  }

  static _createTutulmaMesh(def) {
    const group = new THREE.Group();
    // Parlayan Güneş Koronası
    const coronaGeo = new THREE.TorusGeometry(0.38, 0.06, 4, 8);
    const coronaMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const corona = new THREE.Mesh(coronaGeo, coronaMat);
    corona.position.y = 0.48;
    group.add(corona);

    // Güneşin Önünü Kapatan Karanlık Ay Küresi
    const moonGeo = new THREE.DodecahedronGeometry(0.34, 1);
    const moonMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.9, flatShading: true });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(0.04, 0.48, 0.08);
    group.add(moon);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      corona.rotation.z += dt * 1.5;
    };
    return group;
  }
"""

# Switch cases for Phase 1
PHASE1_CASES = """      case 'yanardag':
      case 'volkan':
        mainMesh = this._createYanardagMesh(def);
        break;
      case 'gol':
        mainMesh = this._createGolMesh(def);
        break;
      case 'deniz':
      case 'okyanus':
        mainMesh = this._createDenizMesh(def);
        break;
      case 'selale':
        mainMesh = this._createSelaleMesh(def);
        break;
      case 'firtina':
        mainMesh = this._createFirtinaMesh(def);
        break;
      case 'kasirga':
        mainMesh = this._createKasirgaMesh(def);
        break;
      case 'hortum':
        mainMesh = this._createHortumMesh(def);
        break;
      case 'tayfun':
        mainMesh = this._createTayfunMesh(def);
        break;
      case 'tsunami':
        mainMesh = this._createTsunamiMesh(def);
        break;
      case 'girdap':
        mainMesh = this._createGirdapMesh(def);
        break;
      case 'buzul':
        mainMesh = this._createBuzulMesh(def);
        break;
      case 'mercan_kayaligi':
        mainMesh = this._createMercanKayaligiMesh(def);
        break;
      case 'aurora':
        mainMesh = this._createAuroraMesh(def);
        break;
      case 'bambu':
        mainMesh = this._createBambuMesh(def);
        break;
      case 'palmiye':
        mainMesh = this._createPalmiyeMesh(def);
        break;
      case 'karli_cam_agaci':
        mainMesh = this._createKarliCamAgaciMesh(def);
        break;
      case 'cicek':
        mainMesh = this._createCicekMesh(def);
        break;
      case 'gul':
        mainMesh = this._createGulMesh(def);
        break;
      case 'vaha':
        mainMesh = this._createVahaMesh(def);
        break;
      case 'vadi':
        mainMesh = this._createVadiMesh(def);
        break;
      case 'bataklik':
        mainMesh = this._createBataklikMesh(def);
        break;
      case 'bozkir':
        mainMesh = this._createBozkirMesh(def);
        break;
      case 'tundra':
        mainMesh = this._createTundraMesh(def);
        break;
      case 'deprem':
        mainMesh = this._createDepremMesh(def);
        break;
      case 'yarimada':
        mainMesh = this._createYarimadaMesh(def);
        break;
      case 'kita':
        mainMesh = this._createKitaMesh(def);
        break;
      case 'cig':
        mainMesh = this._createCigMesh(def);
        break;
      case 'dolu':
        mainMesh = this._createDoluMesh(def);
        break;
      case 'tutulma':
        mainMesh = this._createTutulmaMesh(def);
        break;
"""

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Insert methods before static _createArchetypeMesh
pos = text.find('  static _createArchetypeMesh(def)')
if pos != -1:
    text = text[:pos] + PHASE1_MODELS + "\n" + text[pos:]
else:
    print("Error: Could not find _createArchetypeMesh insertion point!")

# 2. Insert cases before default:
case_pos = text.find('      default:')
if case_pos != -1:
    text = text[:case_pos] + PHASE1_CASES + text[case_pos:]
else:
    print("Error: Could not find default: insertion point!")

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully injected Phase 1 Models and Switch Cases into ItemFactory.js!")
