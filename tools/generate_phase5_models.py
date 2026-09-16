import json
import re

PHASE5_MODELS = """
  // =========================================================================
  // FAZ 5: YEMEK, TARIM VE SİMYA (06_yemek_ve_tarim)
  // =========================================================================

  static _createCikolataMesh(def) {
    const group = new THREE.Group();
    // 1. Koyu Kakao Çikolata Tableti (Kırılmış Köşe)
    const chocoMat = new THREE.MeshStandardMaterial({
      color: 0x3b1a08,
      roughness: 0.4,
      metalness: 0.1,
      flatShading: true
    });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.12, 0.65), chocoMat);
    bar.position.y = 0.25;
    bar.rotation.set(0.3, 0.2, 0);
    group.add(bar);

    // Çikolata Kareleri / Bölmeleri
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const block = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.16), chocoMat);
        block.position.set((r - 0.5) * 0.22, 0.07, (c - 1) * 0.18);
        bar.add(block);
      }
    }

    // 2. Parlak Altın Folyo Sargı
    const foilMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const foil = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.35), foilMat);
    foil.position.set(0, -0.01, -0.16);
    bar.add(foil);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createKahveMesh(def) {
    const group = new THREE.Group();
    // 1. Seramik Fincan ve Kulp
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, flatShading: true });
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.42, 8), cupMat);
    cup.position.y = 0.25;
    group.add(cup);

    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 4, 8), cupMat);
    handle.position.set(0.28, 0.25, 0);
    group.add(handle);

    // 2. Demlenmiş Sıcak Kahve Yüzeyi
    const coffeeMat = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      emissive: 0x260c02,
      roughness: 0.1,
      flatShading: true
    });
    const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.05, 8), coffeeMat);
    coffee.position.y = 0.42;
    group.add(coffee);

    // 3. Yükselen Sıcak Buhar Halkaları
    const steamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
    const s1 = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 3, 6), steamMat);
    s1.position.set(0, 0.62, 0);
    s1.rotation.x = Math.PI / 2;
    const s2 = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 3, 6), steamMat);
    s2.position.set(0.04, 0.78, 0);
    s2.rotation.x = Math.PI / 2;
    group.add(s1);
    group.add(s2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      s1.position.y = 0.62 + Math.sin(time * 3.0) * 0.04;
      s2.position.y = 0.78 + Math.cos(time * 2.5) * 0.05;
      s1.scale.setScalar(1.0 + Math.sin(time * 3.0) * 0.15);
      s2.scale.setScalar(1.0 + Math.cos(time * 2.5) * 0.15);
    };
    return group;
  }

  static _createCayMesh(def) {
    return this._createKahveMesh(def);
  }

  static _createPizzaMesh(def) {
    const group = new THREE.Group();
    // 1. Fırınlanmış Çıtır Hamur Tabanı (Pizza Dilimi)
    const crustMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8, flatShading: true });
    const slice = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 8, 1, false, 0, Math.PI / 3), crustMat);
    slice.position.y = 0.1;
    group.add(slice);

    // 2. Eriyen Peynir ve Domates Sosu
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      flatShading: true
    });
    const cheese = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.04, 8, 1, false, 0.05, Math.PI / 3 - 0.1), cheeseMat);
    cheese.position.y = 0.15;
    group.add(cheese);

    // 3. Fasetli Sucuk Dilimleri
    const salamiMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, flatShading: true });
    [0.2, 0.35].forEach((dist, idx) => {
      const sal = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 6), salamiMat);
      sal.position.set(Math.cos(0.4 + idx * 0.3) * dist, 0.18, Math.sin(0.4 + idx * 0.3) * dist);
      group.add(sal);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createPastaMesh(def) {
    const group = new THREE.Group();
    // 1. İki Katlı Fasetli Pasta Keki
    const cakeMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.6, flatShading: true });
    const creamMat = new THREE.MeshStandardMaterial({ color: 0xfdf2f8, roughness: 0.4, flatShading: true });

    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.48, 0.22, 8), cakeMat);
    b1.position.y = 0.14;
    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.2, 7), creamMat);
    b2.position.y = 0.35;
    group.add(b1);
    group.add(b2);

    // 2. Üstteki Çilek ve Mum
    const berryMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, flatShading: true });
    const berry = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), berryMat);
    berry.position.set(0, 0.52, 0);
    group.add(berry);

    // Mum Alevi
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 4), flameMat);
    flame.position.set(0, 0.64, 0);
    group.add(flame);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      flame.scale.y = 1.0 + Math.sin(time * 6.0) * 0.2;
    };
    return group;
  }

  static _createDondurmaMesh(def) {
    const group = new THREE.Group();
    // 1. Gofret Külah
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8, flatShading: true });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.65, 6), coneMat);
    cone.position.y = 0.28;
    cone.rotation.x = Math.PI;
    group.add(cone);

    // 2. Çilekli & Vanilyalı Dondurma Topları
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4, flatShading: true });
    const scoop1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), pinkMat);
    scoop1.position.set(0, 0.62, 0);
    group.add(scoop1);

    const mintMat = new THREE.MeshStandardMaterial({ color: 0x6ee7b7, roughness: 0.4, flatShading: true });
    const scoop2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), mintMat);
    scoop2.position.set(0.06, 0.82, 0);
    group.add(scoop2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createBiraMesh(def) {
    const group = new THREE.Group();
    // 1. Ahşap Kupa
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.28, 0.55, 7), mugMat);
    mug.position.y = 0.3;
    group.add(mug);

    // Kulp
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.04, 4, 7), mugMat);
    handle.position.set(0.3, 0.3, 0);
    group.add(handle);

    // 2. Taşmış Bira Köpüğü
    const foamMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3, flatShading: true });
    const foam = new THREE.Mesh(new THREE.DodecahedronGeometry(0.26, 0), foamMat);
    foam.position.set(0, 0.6, 0);
    group.add(foam);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createSarapMesh(def) {
    const group = new THREE.Group();
    // 1. Kristal Kadeh
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.1,
      transparent: true,
      opacity: 0.5,
      flatShading: true
    });
    const bowl = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.35, 7), glassMat);
    bowl.position.y = 0.55;
    bowl.rotation.x = Math.PI;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.32, 5), glassMat);
    stem.position.y = 0.25;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 7), glassMat);
    base.position.y = 0.08;
    group.add(bowl);
    group.add(stem);
    group.add(base);

    // 2. Kırmızı Şarap
    const wineMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      flatShading: true
    });
    const wine = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.22, 7), wineMat);
    wine.position.y = 0.48;
    wine.rotation.x = Math.PI;
    group.add(wine);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createPeynirMesh(def) {
    const group = new THREE.Group();
    // Delikli İsviçre Peyniri Üçgeni
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.6,
      flatShading: true
    });
    const wedge = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.24, 7, 1, false, 0, Math.PI / 2.5), cheeseMat);
    wedge.position.y = 0.18;
    group.add(wedge);

    // Delikler (Koyu Çukurlar)
    const holeMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, flatShading: true });
    const h1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), holeMat);
    h1.position.set(0.18, 0.25, 0.1);
    const h2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.045, 0), holeMat);
    h2.position.set(0.28, 0.15, 0.18);
    group.add(h1);
    group.add(h2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createKarpuzMesh(def) {
    const group = new THREE.Group();
    // 1. Yeşil Kabuk
    const rindMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6, flatShading: true });
    const rind = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.12, 8, 1, false, 0, Math.PI / 2), rindMat);
    rind.position.y = 0.15;
    group.add(rind);

    // 2. Kırmızı Sulu Meyve Eti
    const fleshMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5, flatShading: true });
    const flesh = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.12, 8, 1, false, 0, Math.PI / 2), fleshMat);
    flesh.position.y = 0.16;
    group.add(flesh);

    // 3. Siyah Çekirdekler
    const seedMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    [-0.1, 0.1].forEach((sx, i) => {
      const seed = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.04, 0.02), seedMat);
      seed.position.set(0.2 + sx, 0.23, 0.15 + i * 0.1);
      group.add(seed);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createCilekMesh(def) {
    const group = new THREE.Group();
    // 1. Kırmızı Fasetli Çilek Gövdesi
    const berryMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      flatShading: true
    });
    const berry = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.55, 6), berryMat);
    berry.position.y = 0.35;
    berry.rotation.x = Math.PI;
    group.add(berry);

    // 2. Yeşil Çanak Yapraklar
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, flatShading: true });
    for (let l = 0; l < 4; l++) {
      const ang = (l / 4) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 3), leafMat);
      leaf.position.set(Math.cos(ang) * 0.14, 0.58, Math.sin(ang) * 0.14);
      leaf.rotation.set(Math.sin(ang) * 0.8, 0, Math.cos(ang) * 0.8);
      group.add(leaf);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };
    return group;
  }

  static _createBalKavanozuMesh(def) {
    const group = new THREE.Group();
    // 1. Kil/Cam Kavanoz
    const jarMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6, flatShading: true });
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.5, 7), jarMat);
    jar.position.y = 0.28;
    group.add(jar);

    // 2. Altın Bal Sızıntısı
    const honeyMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.1,
      flatShading: true
    });
    const honey = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), honeyMat);
    honey.position.set(0, 0.52, 0);
    group.add(honey);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }
"""

PHASE5_CASES = """      case 'cikolata':
      case 'chocolate':
        mainMesh = this._createCikolataMesh(def);
        break;
      case 'kahve':
      case 'coffee':
        mainMesh = this._createKahveMesh(def);
        break;
      case 'cay':
      case 'tea':
        mainMesh = this._createCayMesh(def);
        break;
      case 'pizza':
        mainMesh = this._createPizzaMesh(def);
        break;
      case 'pasta':
      case 'cake':
        mainMesh = this._createPastaMesh(def);
        break;
      case 'dondurma':
      case 'ice_cream':
        mainMesh = this._createDondurmaMesh(def);
        break;
      case 'bira':
      case 'beer':
        mainMesh = this._createBiraMesh(def);
        break;
      case 'sarap':
      case 'wine':
        mainMesh = this._createSarapMesh(def);
        break;
      case 'peynir':
      case 'cheese':
        mainMesh = this._createPeynirMesh(def);
        break;
      case 'karpuz':
      case 'watermelon':
        mainMesh = this._createKarpuzMesh(def);
        break;
      case 'cilek':
      case 'strawberry':
        mainMesh = this._createCilekMesh(def);
        break;
      case 'bal_kavanozu':
        mainMesh = this._createBalKavanozuMesh(def);
        break;
"""

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Insert methods before static _createArchetypeMesh
pos = text.find('  static _createArchetypeMesh(def)')
if pos != -1:
    text = text[:pos] + PHASE5_MODELS + "\n" + text[pos:]

# Insert cases before default:
case_pos = text.find('      default:')
if case_pos != -1:
    text = text[:case_pos] + PHASE5_CASES + text[case_pos:]

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully injected Phase 5 Food, Agriculture & Alchemy into ItemFactory.js!")
