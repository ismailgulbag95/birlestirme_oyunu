import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ITEM_DEFINITIONS, getCanonicalId } from './itemDefinitions.js';

export class ItemFactory {
  static _textureLoader = new THREE.TextureLoader();
  static _coinCache = new Map();
  static _coinTextureCache = new Map();

  static _createCoinCompositeTextures(image, palette, width = 512, height = 512) {
    const primary = palette?.primary || '#d97706';
    const secondary = palette?.secondary || '#fef08a';
    const emissive = palette?.emissive || '#b45309';

    // Helper: draw single face with upright orientation
    const renderFace = (angle = 0) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const cx = width / 2;
      const cy = height / 2;
      const r = width / 2;

      // 1. Sadece şeffaf alanlar için dolu arka plan (Opaque background - circular clip)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      // Derin koyu metalik zemin (ikon rengi değişmesin diye düz dolgu)
      const bgGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      bgGrad.addColorStop(0, '#1a1a1a');
      bgGrad.addColorStop(0.7, '#111111');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Büyülü Rünik & Simya Geometrisi (ikon olmayan alanlarda)
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.86, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([8, 12]);
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.76, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = secondary;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * (r * 0.2), cy + Math.sin(angle) * (r * 0.2));
        ctx.lineTo(cx + Math.cos(angle) * (r * 0.74), cy + Math.sin(angle) * (r * 0.74));
        ctx.stroke();
      }

      // 3. İkonu doğrudan çiz (renk değişikliği yok, shadow yok, globalAlpha=1)
      ctx.globalAlpha = 1.0;
      ctx.shadowColor = 'transparent'; // Shadow sıfırla - ikon rengini bozmaz
      ctx.shadowBlur = 0;

      const iconSize = width * 0.72;

      // Görseli 180 derece döndürerek tam doğru dik pozisyona getir
      ctx.save();
      ctx.translate(cx, cy);
      if (angle !== 0) {
        ctx.rotate(angle);
      }
      ctx.drawImage(image, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
      ctx.restore();

      ctx.restore(); // clip serbest bırak

      return canvas;
    };

    // Ön yüz: 90 derece sola (-Math.PI / 2)
    const frontCanvas = renderFace(-Math.PI / 2);

    // Arka yüz: 90 derece sağa (Math.PI / 2)
    const backCanvas = renderFace(Math.PI / -2);

    // Bump / Kabartma Haritası Üretimi
    const createBump = (srcCanvas) => {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = width;
      bCanvas.height = height;
      const bCtx = bCanvas.getContext('2d');
      const imgData = srcCanvas.getContext('2d').getImageData(0, 0, width, height);
      const data = imgData.data;
      const bData = bCtx.createImageData(width, height);

      for (let i = 0; i < data.length; i += 4) {
        // Luminance hesapla
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        bData.data[i] = lum;
        bData.data[i + 1] = lum;
        bData.data[i + 2] = lum;
        bData.data[i + 3] = 255;
      }
      bCtx.putImageData(bData, 0, 0);
      const tex = new THREE.CanvasTexture(bCanvas);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };

    const frontTex = new THREE.CanvasTexture(frontCanvas);
    frontTex.colorSpace = THREE.SRGBColorSpace;
    frontTex.wrapS = THREE.ClampToEdgeWrapping;
    frontTex.wrapT = THREE.ClampToEdgeWrapping;

    const backTex = new THREE.CanvasTexture(backCanvas);
    backTex.colorSpace = THREE.SRGBColorSpace;
    backTex.wrapS = THREE.ClampToEdgeWrapping;
    backTex.wrapT = THREE.ClampToEdgeWrapping;

    const frontBump = createBump(frontCanvas);
    const backBump = createBump(backCanvas);

    return {
      diffuse: frontTex,
      diffuseBack: backTex,
      bump: frontBump,
      bumpBack: backBump
    };
  }

  static _createReliefCoinMesh(canonicalId, def) {
    const group = new THREE.Group();
    group.userData.itemId = canonicalId;
    group.userData.definition = def;

    // Radius: 0.48, Thickness: 0.10, Segments: 48
    const radius = 0.48;
    const thickness = 0.10;
    const coinGeo = new THREE.CylinderGeometry(radius, radius, thickness, 48);

    // Palet renkleri
    const palette = def?.colorPalette || def?.color_palette || {};
    const primaryColor = new THREE.Color(palette.primary || '#d97706');
    const secondaryColor = new THREE.Color(palette.secondary || '#fef08a');
    const emissiveColor = new THREE.Color(palette.emissive || '#b45309');

    // 1. Dış Pahlı Metalik Altın / Element Gövdesi (Rim Material)
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.18,
      emissive: emissiveColor,
      emissiveIntensity: 0.45,
      flatShading: false
    });

    // 2. Ön ve Arka Yüz Materyalleri (Görsel rengini bozmamak için emissive sıfır, saf beyaz diffuse)
    const frontFaceMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.5,
      emissive: 0x000000,
      emissiveIntensity: 0,
      bumpScale: 0.05,
      transparent: false // İçi boş görünmesini engelle, arkası dolu
    });

    const backFaceMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.5,
      emissive: 0x000000,
      emissiveIntensity: 0,
      bumpScale: 0.05,
      transparent: false
    });

    // 3. Çoklu materyal: [0: Yan Kenar, 1: Üst/Ön Yüz, 2: Alt/Arka Yüz]
    const coinMesh = new THREE.Mesh(coinGeo, [rimMaterial, frontFaceMat, backFaceMat]);
    coinMesh.rotation.x = Math.PI / 2; // Madalyonu dik masaya çevir
    coinMesh.castShadow = true;
    coinMesh.receiveShadow = true;

    // 4. Dekoratif Pahlı Dış Yüzükler & Büyülü Tırtıklar (Beveled Outer Rings)
    const ringGeo = new THREE.TorusGeometry(radius * 0.98, 0.025, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffe066,
      metalness: 0.95,
      roughness: 0.12,
      emissive: primaryColor,
      emissiveIntensity: 0.6
    });
    const ringFront = new THREE.Mesh(ringGeo, ringMat);
    ringFront.position.z = thickness * 0.51;
    const ringBack = new THREE.Mesh(ringGeo, ringMat);
    ringBack.position.z = -thickness * 0.51;

    // 5. Büyülü Dış Enerji Parçacıkları (Floating Arcane Orbiters)
    const orbGroup = new THREE.Group();
    const orbCount = 6;
    const orbGeo = new THREE.OctahedronGeometry(0.038, 0);
    const orbMat = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      emissive: primaryColor,
      emissiveIntensity: 1.5,
      roughness: 0.1
    });

    const orbiters = [];
    for (let i = 0; i < orbCount; i++) {
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const angle = (i / orbCount) * Math.PI * 2;
      orb.userData = {
        angle: angle,
        radius: radius * 1.35 + (i % 2) * 0.08,
        speed: 1.8 + (i % 3) * 0.4,
        yOffset: ((i % 3) - 1) * 0.12
      };
      orbGroup.add(orb);
      orbiters.push(orb);
    }

    // Madalyon Gövdesini toparla
    const coinBody = new THREE.Group();
    coinBody.add(coinMesh);
    coinBody.add(ringFront);
    coinBody.add(ringBack);
    coinBody.add(orbGroup);
    coinBody.position.y = 0.38; // Masadan yukarıda süzülme tabanı
    group.add(coinBody);

    // 6. 2D İkon Doku & Bump Yükleme
    const iconNameMap = {
      'ates': 'ates.png',
      'fire': 'ates.png',
      'su': 'su.png',
      'water': 'su.png',
      'toprak': 'toprak.png',
      'earth': 'toprak.png',
      'hava': 'hava.png',
      'air': 'hava.png'
    };
    const iconFileName = iconNameMap[canonicalId] || `${canonicalId}.png`;
    const texturePath = `./textures/items/${iconFileName}`;

    if (this._coinTextureCache.has(texturePath)) {
      const cached = this._coinTextureCache.get(texturePath);
      frontFaceMat.map = cached.diffuse;
      frontFaceMat.bumpMap = cached.bump;
      frontFaceMat.needsUpdate = true;

      backFaceMat.map = cached.diffuseBack;
      backFaceMat.bumpMap = cached.bumpBack;
      backFaceMat.needsUpdate = true;
    } else {
      this._textureLoader.load(
        texturePath,
        (tex) => {
          const comp = this._createCoinCompositeTextures(tex.image, palette);
          this._coinTextureCache.set(texturePath, comp);

          frontFaceMat.map = comp.diffuse;
          frontFaceMat.bumpMap = comp.bump;
          frontFaceMat.needsUpdate = true;

          backFaceMat.map = comp.diffuseBack;
          backFaceMat.bumpMap = comp.bumpBack;
          backFaceMat.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.warn(`[ItemFactory] Coin texture load fallback for ${canonicalId}:`, err);
        }
      );
    }

    // 7. 60 FPS Büyülü Parıldayan Turntable & Yörünge Animasyonu
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.5; // Kendi etrafında akıcı dönüş

      // Havada süzülme (Mystic Bobbing)
      coinBody.position.y = 0.38 + Math.sin(time * 2.8) * 0.045;
      coinBody.rotation.z = Math.sin(time * 1.8) * 0.05; // Nazik madalyon salınımı

      // Büyülü Işıma Nabzı (Sadece kenar ve altın halkalarda parıldama)
      const pulse = 0.45 + Math.sin(time * 4.5) * 0.35;
      rimMaterial.emissiveIntensity = pulse;
      ringMat.emissiveIntensity = pulse * 1.4;

      // Yörüngedeki Büyülü Kıvılcımların Dönüşü
      orbiters.forEach(orb => {
        const u = orb.userData;
        u.angle += u.speed * dt;
        orb.position.x = Math.cos(u.angle) * u.radius;
        orb.position.y = Math.sin(u.angle) * u.radius;
        orb.position.z = Math.sin(time * 3.0 + u.angle) * 0.08 + u.yOffset;
        orb.rotation.x += dt * 3.0;
        orb.rotation.y += dt * 2.5;
      });
    };

    return group;
  }

  static _gltfLoader = new GLTFLoader();
  static _modelCache = new Map();
  static _category01GlbMap = {
    'camur': './models/01_elements/camur.glb',
    'mud': './models/01_elements/camur.glb',
    'lav': './models/01_elements/lav.glb',
    'lava': './models/01_elements/lav.glb',
    'buhar': './models/01_elements/buhar.glb',
    'steam': './models/01_elements/buhar.glb',
    'yagmur': './models/01_elements/yagmur.glb',
    'rain': './models/01_elements/yagmur.glb',
    'enerji': './models/01_elements/enerji.glb',
    'energy': './models/01_elements/enerji.glb',
    'ruzgar': './models/01_elements/ruzgar.glb',
    'wind': './models/01_elements/ruzgar.glb',
    'buz': './models/01_elements/buz.glb',
    'ice': './models/01_elements/buz.glb',
    'yildirim': './models/01_elements/yildirim.glb',
    'lightning': './models/01_elements/yildirim.glb',
    'bulut': './models/01_elements/bulut.glb',
    'cloud': './models/01_elements/bulut.glb',
    'firtina': './models/01_elements/firtina.glb',
    'storm': './models/01_elements/firtina.glb'
  };

  static _setupGlbModel(gltfScene, canonicalId, targetGroup) {
    const model = gltfScene.clone(true);

    // Auto-fit & center bounding box
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
    const targetSize = 0.95; // Fit inside slot plate bounds
    const scale = targetSize / maxDim;

    model.scale.set(scale, scale, scale);
    model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    // Enable shadows & PBR material settings
    const emissiveMaterials = [];
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          if (child.material.emissive && child.material.emissive.getHex() !== 0) {
            emissiveMaterials.push(child.material);
          }
        }
      }
    });

    // Replace placeholder inside targetGroup smoothly
    while (targetGroup.children.length > 0) {
      targetGroup.remove(targetGroup.children[0]);
    }

    const wrapper = new THREE.Group();
    wrapper.add(model);
    targetGroup.add(wrapper);

    // Animation hook: Turntable rotation + Floating Bobbing + Pulse
    targetGroup.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      targetGroup.rotation.y += dt * 0.85; // Smooth turntable spin on plate

      // Gentle floating bobbing
      wrapper.position.y = Math.sin(time * 2.5) * 0.04;

      // Elemental dynamic animations
      if (['ates', 'fire', 'lav', 'lava', 'yildirim', 'lightning', 'enerji', 'energy'].includes(canonicalId)) {
        const pulse = 0.85 + Math.sin(time * 4.0) * 0.35;
        emissiveMaterials.forEach(mat => {
          mat.emissiveIntensity = pulse;
        });
      } else if (['hava', 'air', 'ruzgar', 'wind', 'buhar', 'steam'].includes(canonicalId)) {
        wrapper.rotation.z = Math.sin(time * 3.0) * 0.04;
        wrapper.rotation.x = Math.cos(time * 2.2) * 0.03;
      }
    };
  }

  constructor() {
    // Cache or setup if needed
  }

  static _createOutline(geometry, color = 0x1e293b, thickness = 0.035) {
    const outlineMat = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.BackSide
    });
    const outlineMesh = new THREE.Mesh(geometry, outlineMat);
    outlineMesh.scale.multiplyScalar(1.0 + thickness);
    return outlineMesh;
  }

  static createItemMesh(itemId) {
    const canonicalId = getCanonicalId(itemId) || itemId;
    const def = ITEM_DEFINITIONS[canonicalId] || ITEM_DEFINITIONS[itemId] || ITEM_DEFINITIONS.ates;
    return this._createReliefCoinMesh(canonicalId, def);
  }

  static _createSteamMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Puf Buhar Kümeleri (Low-Poly Steam Puffs)
    const steamMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      emissive: 0x94a3b8,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });

    const puffs = [
      { r: 0.32, pos: [0, 0.25, 0] },
      { r: 0.38, pos: [-0.14, 0.5, 0.06] },
      { r: 0.34, pos: [0.15, 0.58, -0.05] },
      { r: 0.28, pos: [-0.04, 0.82, 0.04] },
      { r: 0.2, pos: [0.1, 0.98, 0] }
    ];

    const puffMeshes = [];
    puffs.forEach(p => {
      const geo = new THREE.DodecahedronGeometry(p.r, 0);
      const puff = new THREE.Mesh(geo, steamMat);
      puff.position.set(...p.pos);
      puff.castShadow = true;
      group.add(puff);
      puffMeshes.push(puff);
    });

    // 2. Tabanda Sıcak Buhar Parıltısı
    const light = new THREE.PointLight(0xe2e8f0, 1.8, 2.5);
    light.position.set(0, 0.5, 0.2);
    group.add(light);

    // 60 FPS Canlı Yükselme & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;

      puffMeshes.forEach((mesh, idx) => {
        const offset = idx * 0.8;
        mesh.position.y = puffs[idx].pos[1] + Math.sin(time * 2.5 + offset) * 0.04;
        mesh.scale.setScalar(1.0 + Math.sin(time * 2.0 + offset) * 0.06);
      });
    };

    return group;
  }

  static _createMudMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Akışkan Çamur Kaidesi (Low-Poly Mud Base)
    const baseGeo = new THREE.CylinderGeometry(0.68, 0.78, 0.22, 7);
    const mudMat = new THREE.MeshStandardMaterial({
      color: 0x452b1e,
      roughness: 0.75,
      metalness: 0.08,
      flatShading: true
    });
    const base = new THREE.Mesh(baseGeo, mudMat);
    base.position.y = 0.12;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // 2. Fasetli Çamur Kubbesi
    const domeGeo = new THREE.IcosahedronGeometry(0.48, 1);
    domeGeo.scale(1.15, 0.75, 1.1);
    const dome = new THREE.Mesh(domeGeo, mudMat);
    dome.position.y = 0.32;
    dome.castShadow = true;
    group.add(dome);

    // 3. Fasetli Islak Çamur Baloncukları (Glossy Mud Bubbles)
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0x6b4226,
      emissive: 0x2e190e,
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.2,
      flatShading: true
    });

    const b1Geo = new THREE.DodecahedronGeometry(0.18, 0);
    const b1 = new THREE.Mesh(b1Geo, bubbleMat);
    b1.position.set(0.18, 0.52, 0.12);
    group.add(b1);

    const b2Geo = new THREE.DodecahedronGeometry(0.12, 0);
    const b2 = new THREE.Mesh(b2Geo, bubbleMat);
    b2.position.set(-0.22, 0.44, -0.15);
    group.add(b2);

    // Sıçrayan fasetli çamur damlacıkları
    const dropGeo = new THREE.TetrahedronGeometry(0.07, 0);
    const drops = [
      { pos: [0.45, 0.22, 0.25] },
      { pos: [-0.42, 0.2, -0.3] },
      { pos: [-0.15, 0.62, 0.2] }
    ];
    drops.forEach(d => {
      const dropMesh = new THREE.Mesh(dropGeo, mudMat);
      dropMesh.position.set(...d.pos);
      group.add(dropMesh);
    });

    // 60 FPS Baloncuk Nefes Alma & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;

      const scale1 = 1.0 + Math.sin(time * 3.0) * 0.15;
      b1.scale.set(scale1, scale1 * 0.9, scale1);
      const scale2 = 1.0 + Math.cos(time * 2.6) * 0.12;
      b2.scale.set(scale2, scale2 * 0.9, scale2);
    };

    return group;
  }

  static _createLavaMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Koyu Volkanik Bazalt Taban (Low-Poly Basalt Crust)
    const crustGeo = new THREE.DodecahedronGeometry(0.64, 0);
    crustGeo.scale(1.1, 0.85, 1.1);
    const crustMat = new THREE.MeshStandardMaterial({
      color: 0x1f1917,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true
    });
    const crust = new THREE.Mesh(crustGeo, crustMat);
    crust.position.y = 0.38;
    crust.castShadow = true;
    crust.receiveShadow = true;
    group.add(crust);

    // 2. Fasetli Parlayan Magma Çekirdeği (Glowing Magma Crystals)
    const magmaMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff2200,
      emissiveIntensity: 1.8,
      roughness: 0.2,
      flatShading: true
    });

    const magmaCores = [
      { geo: new THREE.ConeGeometry(0.24, 0.55, 5), pos: [0.15, 0.62, 0.15], rot: [0.2, 0, -0.15] },
      { geo: new THREE.ConeGeometry(0.18, 0.42, 4), pos: [-0.18, 0.56, -0.12], rot: [-0.25, 0, 0.2] },
      { geo: new THREE.IcosahedronGeometry(0.22, 0), pos: [0, 0.68, 0], rot: [0, 0, 0] }
    ];

    const magmaMeshes = [];
    magmaCores.forEach(c => {
      const mesh = new THREE.Mesh(c.geo, magmaMat);
      mesh.position.set(...c.pos);
      mesh.rotation.set(...c.rot);
      group.add(mesh);
      magmaMeshes.push(mesh);
    });

    // 3. Parlayan Akkor Işık (PointLight)
    const lavaLight = new THREE.PointLight(0xff5500, 2.6, 3.5);
    lavaLight.position.set(0, 0.75, 0.2);
    group.add(lavaLight);

    // 60 FPS Canlı Magma Nabzı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;

      const pulse = 1.0 + Math.sin(time * 4.0) * 0.08;
      magmaMeshes.forEach(m => m.scale.set(pulse, 1.0 + Math.sin(time * 3.5) * 0.12, pulse));
      lavaLight.intensity = 2.4 + Math.sin(time * 5.0) * 0.4 + (Math.random() - 0.5) * 0.2;
    };

    return group;
  }

  static _createSandMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Altın Çöl Kum Tepesi (Low-Poly Dunes)
    const duneMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true
    });

    // Ana kum piramidi (6 kenarlı fasetli koni)
    const mainDuneGeo = new THREE.ConeGeometry(0.72, 0.68, 6);
    const mainDune = new THREE.Mesh(mainDuneGeo, duneMat);
    mainDune.position.set(-0.05, 0.35, 0);
    mainDune.rotation.y = 0.2;
    mainDune.castShadow = true;
    mainDune.receiveShadow = true;
    group.add(mainDune);

    // İkincil yan kum tepeciği (5 kenarlı faset)
    const sideDuneGeo = new THREE.ConeGeometry(0.46, 0.48, 5);
    const sideDune = new THREE.Mesh(sideDuneGeo, duneMat);
    sideDune.position.set(0.38, 0.24, 0.15);
    sideDune.rotation.y = -0.4;
    sideDune.castShadow = true;
    group.add(sideDune);

    // 2. Parıldayan Fasetli Kum Kristalleri (Floating Sand Shards)
    const shardGeo = new THREE.OctahedronGeometry(0.065, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      flatShading: true
    });

    const shards = [];
    const shardConfigs = [
      { angle: 0.5, r: 0.48, y: 0.45, speed: 1.4 },
      { angle: 2.5, r: 0.52, y: 0.62, speed: 1.8 },
      { angle: 4.5, r: 0.42, y: 0.32, speed: 1.2 }
    ];

    shardConfigs.forEach(cfg => {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      shard.position.set(Math.cos(cfg.angle) * cfg.r, cfg.y, Math.sin(cfg.angle) * cfg.r);
      shard.userData = cfg;
      group.add(shard);
      shards.push(shard);
    });

    // 60 FPS Kum Tanecikleri Süzülmesi & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;

      shards.forEach(s => {
        s.userData.angle += s.userData.speed * dt;
        s.position.x = Math.cos(s.userData.angle) * s.userData.r;
        s.position.z = Math.sin(s.userData.angle) * s.userData.r;
        s.position.y = s.userData.y + Math.sin(time * 3.0 + s.userData.angle) * 0.04;
        s.rotation.x += dt * 3;
        s.rotation.y += dt * 2.5;
      });
    };

    return group;
  }

  static _createObsidianMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Volkanik Cam Kristal Prizması (Low-Poly Obsidian Monolith)
    const crystalGeo = new THREE.OctahedronGeometry(0.58, 0);
    crystalGeo.scale(0.85, 1.35, 0.85);

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x160a26,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.65,
      flatShading: true
    });

    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.y = 0.6;
    crystal.rotation.y = Math.PI / 4;
    crystal.castShadow = true;
    group.add(crystal);

    // 2. Yan Keskin Kristal Fasetleri (Obsidian Shards)
    const sideGeo1 = new THREE.OctahedronGeometry(0.32, 0);
    sideGeo1.scale(0.6, 1.1, 0.6);
    const side1 = new THREE.Mesh(sideGeo1, crystalMat);
    side1.position.set(0.32, 0.38, 0.12);
    side1.rotation.set(0.1, 0.4, -0.35);
    side1.castShadow = true;
    group.add(side1);

    const sideGeo2 = new THREE.OctahedronGeometry(0.24, 0);
    sideGeo2.scale(0.6, 1.0, 0.6);
    const side2 = new THREE.Mesh(sideGeo2, crystalMat);
    side2.position.set(-0.28, 0.32, -0.15);
    side2.rotation.set(-0.2, -0.3, 0.4);
    side2.castShadow = true;
    group.add(side2);

    // 3. Kristal Yüzey Parıltısı Faseti
    const shineGeo = new THREE.ConeGeometry(0.12, 0.42, 4);
    const shineMat = new THREE.MeshBasicMaterial({
      color: 0xd8b4fe,
      transparent: true,
      opacity: 0.75
    });
    const shine = new THREE.Mesh(shineGeo, shineMat);
    shine.position.set(-0.16, 0.65, 0.28);
    shine.rotation.set(0.2, 0.3, 0.25);
    group.add(shine);

    // 60 FPS Mor Parıltı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      crystal.scale.y = 1.0 + Math.sin(time * 2.2) * 0.03;
    };

    return group;
  }

  static _createRainMesh(def) {
    const group = new THREE.Group();

    // 1. Üstte Fasetli Koyu Yağmur Bulutu (Low-Poly Storm Cloudlet)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      emissive: 0x1e293b,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      flatShading: true
    });

    const puffs = [
      { r: 0.32, pos: [0, 0.85, 0] },
      { r: 0.24, pos: [-0.22, 0.8, 0.05] },
      { r: 0.22, pos: [0.22, 0.8, -0.05] }
    ];
    puffs.forEach(p => {
      const geo = new THREE.DodecahedronGeometry(p.r, 0);
      const mesh = new THREE.Mesh(geo, cloudMat);
      mesh.position.set(...p.pos);
      mesh.castShadow = true;
      group.add(mesh);
    });

    // 2. Fasetli Berrak Yağmur Damlaları (Low-Poly Teardrops)
    const dropMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9,
      flatShading: true
    });

    const dropConfigs = [
      { scale: 0.26, x: -0.18, y: 0.52, z: 0.08, speed: 1.8 },
      { scale: 0.3, x: 0.12, y: 0.42, z: -0.05, speed: 2.2 },
      { scale: 0.24, x: -0.02, y: 0.25, z: 0.12, speed: 2.0 }
    ];

    const drops = [];
    dropConfigs.forEach(cfg => {
      const dGroup = new THREE.Group();
      dGroup.position.set(cfg.x, cfg.y, cfg.z);

      const tipGeo = new THREE.ConeGeometry(0.38, 0.65, 6);
      const tip = new THREE.Mesh(tipGeo, dropMat);
      tip.position.y = 0.22;
      dGroup.add(tip);

      const baseGeo = new THREE.IcosahedronGeometry(0.38, 1);
      const base = new THREE.Mesh(baseGeo, dropMat);
      dGroup.add(base);

      dGroup.scale.setScalar(cfg.scale);
      dGroup.userData = cfg;
      group.add(dGroup);
      drops.push(dGroup);
    });

    // 3. Tabanda Fasetli Su Dalga Halkası (Splash Ripple)
    const splashGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.05, 8);
    const splashMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.6,
      flatShading: true
    });
    const splash = new THREE.Mesh(splashGeo, splashMat);
    splash.position.y = 0.05;
    group.add(splash);

    // 60 FPS Damla Salınımı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;

      drops.forEach(d => {
        d.position.y = d.userData.y + Math.sin(time * 3.5 * d.userData.speed) * 0.06;
      });
    };

    return group;
  }

  static _createEnergyMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Akkor Plazma Çekirdeği (Low-Poly Energy Core)
    const coreGeo = new THREE.IcosahedronGeometry(0.4, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfacc15,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      flatShading: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.58;
    group.add(core);

    // 2. Fasetli Çapraz Enerji Yörünge Halkaları (Low-Poly Orbital Bands)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      flatShading: true
    });

    const ring1Geo = new THREE.TorusGeometry(0.62, 0.04, 4, 10);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.position.y = 0.58;
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(0.55, 0.038, 4, 10);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.position.y = 0.58;
    group.add(ring2);

    // 3. Parlak Elektrik Işığı
    const light = new THREE.PointLight(0xffea00, 2.6, 3.5);
    light.position.set(0, 0.58, 0);
    group.add(light);

    // 60 FPS Yörünge Dönüşü & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;

      ring1.rotation.x += dt * 2.0;
      ring1.rotation.y += dt * 2.5;

      ring2.rotation.y -= dt * 2.2;
      ring2.rotation.z += dt * 1.8;

      const pulse = 1.0 + Math.sin(time * 5.0) * 0.08;
      core.scale.setScalar(pulse);
      light.intensity = 2.4 + Math.sin(time * 6.0) * 0.5;
    };

    return group;
  }

  static _createWindMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Dinamik Spiral Rüzgar Şeritleri (Low-Poly Wind Spirals)
    const windMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
      flatShading: true
    });

    const r1Geo = new THREE.TorusGeometry(0.58, 0.045, 4, 12, Math.PI * 1.6);
    const r1 = new THREE.Mesh(r1Geo, windMat);
    r1.position.y = 0.48;
    r1.rotation.x = Math.PI / 4;
    group.add(r1);

    const r2Geo = new THREE.TorusGeometry(0.42, 0.038, 4, 10, Math.PI * 1.5);
    const r2 = new THREE.Mesh(r2Geo, windMat);
    r2.position.set(0.05, 0.65, 0);
    r2.rotation.set(Math.PI / 3, Math.PI / 4, 0.2);
    group.add(r2);

    const r3Geo = new THREE.TorusGeometry(0.26, 0.03, 4, 8, Math.PI * 1.4);
    const r3 = new THREE.Mesh(r3Geo, windMat);
    r3.position.set(-0.04, 0.82, 0);
    r3.rotation.set(Math.PI / 5, -Math.PI / 3, 0.4);
    group.add(r3);

    // 2. Rüzgara Kapılan Fasetli Yapraklar
    const leafGeo = new THREE.ConeGeometry(0.05, 0.16, 3);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 0.35,
      flatShading: true
    });

    const leaf1 = new THREE.Mesh(leafGeo, leafMat);
    leaf1.position.set(0.42, 0.52, 0.2);
    group.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeo, leafMat);
    leaf2.position.set(-0.35, 0.72, -0.15);
    group.add(leaf2);

    // 60 FPS Rüzgar Şeritleri Dönüşü & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;

      r1.rotation.z += dt * 1.2;
      r2.rotation.z -= dt * 1.5;
      r3.rotation.z += dt * 1.8;
      leaf1.rotation.x += dt * 3;
      leaf2.rotation.y += dt * 2.5;
    };

    return group;
  }

  static _createStoneMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Doğal Kaya Monoliti (Low-Poly Slate Rock)
    const stoneGeo = new THREE.DodecahedronGeometry(0.6, 0);
    stoneGeo.scale(0.9, 1.15, 0.85);

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true
    });

    const stone = new THREE.Mesh(stoneGeo, stoneMat);
    stone.position.y = 0.52;
    stone.rotation.y = 0.35;
    stone.castShadow = true;
    stone.receiveShadow = true;
    group.add(stone);

    // 2. Açık Gri Keskin Kırık Faseti
    const facetGeo = new THREE.TetrahedronGeometry(0.24, 0);
    const facetMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.7,
      flatShading: true
    });
    const facet = new THREE.Mesh(facetGeo, facetMat);
    facet.position.set(0.22, 0.58, 0.36);
    facet.rotation.set(0.2, 0.5, 0.1);
    group.add(facet);

    // 3. Tabanda Fasetli Yosun Lekesi (Low-Poly Moss Pad)
    const mossGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.08, 6);
    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.8,
      flatShading: true
    });
    const moss = new THREE.Mesh(mossGeo, mossMat);
    moss.position.set(-0.1, 0.08, 0.1);
    moss.receiveShadow = true;
    group.add(moss);

    // 60 FPS Ağır Kaya Dönüşü
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createGlassMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Cam Kristal Prizması (Low-Poly Glass Gem Prism)
    const glassGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.72, 6);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.9,
      roughness: 0.08,
      metalness: 0.05,
      transparent: true,
      opacity: 0.95,
      ior: 1.5,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25,
      flatShading: true
    });

    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.y = 0.48;
    glass.rotation.y = Math.PI / 6;
    glass.castShadow = true;
    group.add(glass);

    // 2. İçinde Yansıyan Fasetli Çekirdek
    const innerGeo = new THREE.OctahedronGeometry(0.18, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    inner.position.y = 0.48;
    group.add(inner);

    // 3. Yüzeydeki Beyaz Parıltı Çizgisi
    const glintGeo = new THREE.ConeGeometry(0.08, 0.35, 4);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    const glint = new THREE.Mesh(glintGeo, glintMat);
    glint.position.set(-0.25, 0.58, 0.22);
    glint.rotation.set(0.2, 0.1, 0.3);
    group.add(glint);

    // 60 FPS Prizma Yansımaları & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      inner.rotation.x += dt * 1.5;
      inner.rotation.y += dt * 2.0;
    };

    return group;
  }

  static _createCloudMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Beyaz Puf Bulut Kümeleri (Low-Poly Puffy Clouds)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf1f5f9,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.05,
      flatShading: true
    });

    const puffs = [
      { r: 0.36, pos: [0, 0.48, 0] },
      { r: 0.28, pos: [-0.28, 0.42, 0.05] },
      { r: 0.26, pos: [0.28, 0.44, -0.04] },
      { r: 0.24, pos: [0.08, 0.62, 0.08] },
      { r: 0.22, pos: [-0.1, 0.36, -0.15] }
    ];

    puffs.forEach(p => {
      const geo = new THREE.DodecahedronGeometry(p.r, 0);
      const puff = new THREE.Mesh(geo, cloudMat);
      puff.position.set(...p.pos);
      puff.castShadow = true;
      group.add(puff);
    });

    // 60 FPS Bulut Nefes Alma & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.0) * 0.04;
    };

    return group;
  }

  static _createLightningMesh(def) {
    const group = new THREE.Group();

    // 1. Zikzak Çizen Keskin Fasetli Şimşek (Low-Poly Lightning Bolt)
    const boltMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xffe600,
      emissiveIntensity: 1.6,
      roughness: 0.15,
      flatShading: true
    });

    // Üst parça
    const p1Geo = new THREE.BoxGeometry(0.14, 0.52, 0.1);
    const p1 = new THREE.Mesh(p1Geo, boltMat);
    p1.position.set(-0.1, 0.78, 0);
    p1.rotation.z = -0.42;
    p1.castShadow = true;
    group.add(p1);

    // Orta çapraz dirsek
    const p2Geo = new THREE.BoxGeometry(0.16, 0.42, 0.1);
    const p2 = new THREE.Mesh(p2Geo, boltMat);
    p2.position.set(0.08, 0.52, 0);
    p2.rotation.z = 0.75;
    p2.castShadow = true;
    group.add(p2);

    // Alt sivri ok ucu (4 fasetli piramit)
    const p3Geo = new THREE.ConeGeometry(0.14, 0.52, 4);
    const p3 = new THREE.Mesh(p3Geo, boltMat);
    p3.position.set(0.02, 0.22, 0);
    p3.rotation.z = -0.25;
    p3.castShadow = true;
    group.add(p3);

    const light = new THREE.PointLight(0xfff000, 2.5, 4);
    light.position.set(0, 0.5, 0.2);
    group.add(light);

    return group;
  }

  static _createPlantMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Küçük Toprak Tepeciği Tabanı
    const soilGeo = new THREE.CylinderGeometry(0.38, 0.48, 0.12, 6);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x452b1e,
      roughness: 0.9,
      flatShading: true
    });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.06;
    soil.receiveShadow = true;
    group.add(soil);

    // 2. Fasetli Gövde (Sprout Stem)
    const stemGeo = new THREE.CylinderGeometry(0.035, 0.048, 0.42, 4);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.6,
      flatShading: true
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.25;
    stem.rotation.z = -0.1;
    stem.castShadow = true;
    group.add(stem);

    // 3. Fasetli Çift Yaprak (Low-Poly Twin Leaves)
    const leafGeo = new THREE.ConeGeometry(0.12, 0.42, 4);
    leafGeo.scale(1.0, 1.0, 0.35);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 0.25,
      roughness: 0.45,
      flatShading: true
    });

    const leafLeft = new THREE.Mesh(leafGeo, leafMat);
    leafLeft.position.set(-0.15, 0.38, 0.02);
    leafLeft.rotation.set(0.15, 0, 0.95);
    leafLeft.castShadow = true;
    group.add(leafLeft);

    const leafRight = new THREE.Mesh(leafGeo, leafMat);
    leafRight.position.set(0.16, 0.35, -0.02);
    leafRight.rotation.set(-0.15, 0, -1.05);
    leafRight.castShadow = true;
    group.add(leafRight);

    // Tepedeki minik filiz ucu
    const budGeo = new THREE.ConeGeometry(0.06, 0.18, 4);
    const bud = new THREE.Mesh(budGeo, leafMat);
    bud.position.set(0.02, 0.48, 0);
    group.add(bud);

    // 60 FPS Rüzgar Salınımı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const sway = Math.sin(time * 2.2) * 0.06;
      stem.rotation.z = -0.1 + sway;
      leafLeft.rotation.z = 0.95 + sway * 0.8;
      leafRight.rotation.z = -1.05 + sway * 0.8;
    };

    return group;
  }

  static _createTreeMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Odun Gövdesi (Low-Poly Tree Trunk)
    const trunkGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.48, 6);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.85,
      flatShading: true
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.24;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    group.add(trunk);

    // 2. Üç Katmanlı Fasetli Çam Yaprakları (Low-Poly Pine Canopy)
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      emissive: 0x052e16,
      emissiveIntensity: 0.2,
      roughness: 0.5,
      flatShading: true
    });

    const coneTiers = [
      { r: 0.64, h: 0.48, y: 0.52, segments: 6, rot: 0 },
      { r: 0.48, h: 0.42, y: 0.78, segments: 6, rot: 0.3 },
      { r: 0.32, h: 0.38, y: 1.02, segments: 5, rot: 0.6 }
    ];

    const tiers = [];
    coneTiers.forEach(t => {
      const cGeo = new THREE.ConeGeometry(t.r, t.h, t.segments);
      const cMesh = new THREE.Mesh(cGeo, foliageMat);
      cMesh.position.y = t.y;
      cMesh.rotation.y = t.rot;
      cMesh.castShadow = true;
      group.add(cMesh);
      tiers.push(cMesh);
    });

    // 60 FPS Tepe Salınımı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      tiers[2].rotation.z = Math.sin(time * 2.0) * 0.04;
      tiers[1].rotation.z = Math.sin(time * 2.0 + 0.5) * 0.02;
    };

    return group;
  }

  static _createWoodMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Yatay Meşe Kütüğü (Low-Poly Wood Log)
    const logGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.82, 6);
    const logMat = new THREE.MeshStandardMaterial({
      color: 0x854d0e,
      roughness: 0.85,
      flatShading: true
    });
    const log = new THREE.Mesh(logGeo, logMat);
    log.position.y = 0.32;
    log.rotation.z = Math.PI / 2;
    log.rotation.y = 0.2;
    log.castShadow = true;
    log.receiveShadow = true;
    group.add(log);

    // 2. Kütüğün Uçlarındaki Açık Sarı Fasetli Kesit Halkaları
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.7,
      flatShading: true
    });

    [-0.415, 0.415].forEach(x => {
      const capGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 6);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(x, 0.32, 0);
      cap.rotation.z = Math.PI / 2;
      group.add(cap);
    });

    // 3. Kütüğün Üstünde Yeşeren Küçük Fasetli Filiz
    const sproutGeo = new THREE.ConeGeometry(0.05, 0.18, 4);
    const sproutMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      flatShading: true
    });
    const sprout = new THREE.Mesh(sproutGeo, sproutMat);
    sprout.position.set(0.05, 0.6, 0.05);
    sprout.rotation.z = 0.25;
    group.add(sprout);

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createSplinterMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Keskin Ahşap Kıymık Kristalleri (Low-Poly Splinters)
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.75,
      flatShading: true
    });

    // Ana büyük kıymık (4 kenarlı sivri piramit)
    const s1Geo = new THREE.ConeGeometry(0.12, 0.78, 4);
    const s1 = new THREE.Mesh(s1Geo, woodMat);
    s1.position.set(-0.08, 0.44, 0);
    s1.rotation.set(0.1, 0, -0.38);
    s1.castShadow = true;
    group.add(s1);

    // Yan orta kıymık
    const s2Geo = new THREE.ConeGeometry(0.09, 0.62, 4);
    const s2 = new THREE.Mesh(s2Geo, woodMat);
    s2.position.set(0.14, 0.38, 0.06);
    s2.rotation.set(-0.15, 0, 0.45);
    s2.castShadow = true;
    group.add(s2);

    // Küçük kıymık parçası
    const s3Geo = new THREE.ConeGeometry(0.06, 0.42, 4);
    const s3 = new THREE.Mesh(s3Geo, woodMat);
    s3.position.set(0.02, 0.28, -0.12);
    s3.rotation.set(0.35, 0, 0.2);
    s3.castShadow = true;
    group.add(s3);

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createFiberMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Açık Sarı-Yeşil Bitki Lifi Demeti (Low-Poly Fiber Strands)
    const fiberMat = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      roughness: 0.65,
      flatShading: true
    });

    const strands = [];
    for (let i = 0; i < 4; i++) {
      const fGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.74, 5);
      const fiber = new THREE.Mesh(fGeo, fiberMat);
      fiber.position.set((i - 1.5) * 0.11, 0.4, (i % 2) * 0.05);
      fiber.rotation.z = (i - 1.5) * 0.2;
      fiber.rotation.y = (i * 0.3);
      fiber.castShadow = true;
      group.add(fiber);
      strands.push(fiber);
    }

    // 2. Lifleri Ortadan Tutan Fasetli Bağlama Düğümü
    const knotGeo = new THREE.TorusGeometry(0.24, 0.045, 4, 8);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x65a30d,
      roughness: 0.7,
      flatShading: true
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.y = 0.4;
    knot.rotation.x = Math.PI / 2;
    group.add(knot);

    // 60 FPS Liflerin Hafif Esnemesi & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      strands.forEach((s, idx) => {
        s.rotation.z = (idx - 1.5) * 0.2 + Math.sin(time * 2.5 + idx) * 0.04;
      });
    };

    return group;
  }

  static _createRopeMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Sarmal Halat Halkası (Low-Poly Twisted Rope)
    const ropeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.8,
      flatShading: true
    });

    const torusGeo = new THREE.TorusGeometry(0.38, 0.11, 4, 12);
    const rope = new THREE.Mesh(torusGeo, ropeMat);
    rope.position.y = 0.34;
    rope.rotation.x = Math.PI / 2.2;
    rope.castShadow = true;
    rope.receiveShadow = true;
    group.add(rope);

    // 2. Halatın Düğümünden Kıvrılarak Çıkan Uç
    const tipGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.38, 5);
    const tip = new THREE.Mesh(tipGeo, ropeMat);
    tip.position.set(0.36, 0.26, 0.14);
    tip.rotation.set(0.2, 0.4, 0.65);
    tip.castShadow = true;
    group.add(tip);

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createMushroomMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Porselen Beyazı Mantar Sapı (Low-Poly Mushroom Stalk)
    const stalkGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.42, 6);
    const stalkMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.5,
      flatShading: true
    });
    const stalk = new THREE.Mesh(stalkGeo, stalkMat);
    stalk.position.y = 0.22;
    stalk.castShadow = true;
    stalk.receiveShadow = true;
    group.add(stalk);

    // 2. Fasetli Canlı Kırmızı Mantar Şapkası (Low-Poly Red Cap)
    const capGeo = new THREE.ConeGeometry(0.52, 0.38, 7);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      flatShading: true
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.52;
    cap.castShadow = true;
    group.add(cap);

    // 3. Şapka Üzerindeki Fasetli Beyaz Benekler
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dotGeo = new THREE.TetrahedronGeometry(0.065, 0);
    const dots = [
      [0, 0.72, 0.08],
      [0.24, 0.52, 0.22],
      [-0.24, 0.52, 0.22],
      [0.28, 0.48, -0.16],
      [-0.28, 0.48, -0.16]
    ];
    dots.forEach(([dx, dy, dz]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(dx, dy, dz);
      group.add(dot);
    });

    // 60 FPS Şapkanın Nefes Alma Salınımı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const breathe = 1.0 + Math.sin(time * 2.2) * 0.04;
      cap.scale.set(breathe, 1.0 + Math.cos(time * 2.2) * 0.03, breathe);
    };

    return group;
  }

  static _createYosunMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Zümrüt Yeşili Kadifemsi Yosun Kümeleri (Low-Poly Velvet Moss)
    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true
    });

    const puffs = [
      { r: 0.36, pos: [0, 0.2, 0] },
      { r: 0.28, pos: [0.25, 0.18, 0.14] },
      { r: 0.26, pos: [-0.22, 0.16, 0.1] },
      { r: 0.22, pos: [0.06, 0.36, -0.06] }
    ];

    puffs.forEach(p => {
      const geo = new THREE.DodecahedronGeometry(p.r, 0);
      geo.scale(1.15, 0.7, 1.1);
      const m = new THREE.Mesh(geo, mossMat);
      m.position.set(...p.pos);
      m.castShadow = true;
      m.receiveShadow = true;
      group.add(m);
    });

    // 2. Minik Parlayan Fasetli Sarı-Yeşil Yosun Sporları
    const sporeMat = new THREE.MeshBasicMaterial({ color: 0xbbf7d0 });
    const sporeGeo = new THREE.TetrahedronGeometry(0.045, 0);
    const spores = [
      [-0.1, 0.42, 0.1], [0.18, 0.34, 0.2], [-0.15, 0.28, -0.18]
    ];
    spores.forEach(([sx, sy, sz]) => {
      const spore = new THREE.Mesh(sporeGeo, sporeMat);
      spore.position.set(sx, sy, sz);
      group.add(spore);
    });

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createCottonMesh(def) {
    const group = new THREE.Group();

    // 1. Altta Kurutulmuş Fasetli Çanak Yapraklar (Low-Poly Calyx Base)
    const calyxMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      roughness: 0.85,
      flatShading: true
    });

    for (let i = 0; i < 4; i++) {
      const leafGeo = new THREE.ConeGeometry(0.12, 0.4, 4);
      const leaf = new THREE.Mesh(leafGeo, calyxMat);
      const ang = (i * Math.PI) / 2;
      leaf.position.set(Math.cos(ang) * 0.22, 0.25, Math.sin(ang) * 0.22);
      leaf.rotation.z = -Math.cos(ang) * 0.65;
      leaf.rotation.x = Math.sin(ang) * 0.65;
      leaf.castShadow = true;
      group.add(leaf);
    }

    // 2. Üstte Fasetli Bembeyaz Pamuk Kozası (Low-Poly Cotton Puffs)
    const cottonMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf8fafc,
      emissiveIntensity: 0.25,
      roughness: 0.45,
      flatShading: true
    });

    const puffs = [
      [0, 0.48, 0, 0.3],
      [-0.16, 0.42, 0.1, 0.22],
      [0.16, 0.42, 0.1, 0.22],
      [0, 0.4, -0.16, 0.22]
    ];

    const puffMeshes = [];
    puffs.forEach(([cx, cy, cz, cr]) => {
      const cGeo = new THREE.DodecahedronGeometry(cr, 0);
      const puff = new THREE.Mesh(cGeo, cottonMat);
      puff.position.set(cx, cy, cz);
      puff.castShadow = true;
      group.add(puff);
      puffMeshes.push(puff);
    });

    // 60 FPS Pamuk Nefes Alma & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const b = 1.0 + Math.sin(time * 2.0) * 0.04;
      puffMeshes.forEach(p => p.scale.set(b, b, b));
    };

    return group;
  }

  static _createFabricMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Katlanmış Mavi Kumaş Rulosu (Low-Poly Rolled Fabric)
    const clothMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.2,
      roughness: 0.55,
      flatShading: true
    });

    // Ana katlanmış gövde (6 fasetli yatay silindir rulosu)
    const rollGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.72, 6);
    const roll = new THREE.Mesh(rollGeo, clothMat);
    roll.position.y = 0.28;
    roll.rotation.z = Math.PI / 2;
    roll.rotation.y = 0.25;
    roll.castShadow = true;
    roll.receiveShadow = true;
    group.add(roll);

    // Üstteki katlanmış kumaş kıvrımı
    const flapGeo = new THREE.BoxGeometry(0.68, 0.08, 0.32);
    const flap = new THREE.Mesh(flapGeo, clothMat);
    flap.position.set(0, 0.44, 0.08);
    flap.rotation.y = 0.25;
    flap.castShadow = true;
    group.add(flap);

    // 2. Fasetli Altın Renkli Kumaş Kuşağı / Şeridi
    const ribbonGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.12, 6);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.4,
      flatShading: true
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.y = 0.28;
    ribbon.rotation.z = Math.PI / 2;
    ribbon.rotation.y = 0.25;
    group.add(ribbon);

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createCoalMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Mat Siyah Antrasit Kömür Bloğu (Low-Poly Anthracite Ore)
    const coalGeo = new THREE.DodecahedronGeometry(0.56, 0);
    coalGeo.scale(1.15, 0.88, 1.0);

    const coalMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.2,
      flatShading: true
    });
    const coal = new THREE.Mesh(coalGeo, coalMat);
    coal.position.y = 0.42;
    coal.rotation.y = 0.3;
    coal.castShadow = true;
    coal.receiveShadow = true;
    group.add(coal);

    // 2. Yan Fasetli Kömür Parçaları
    const shardGeo = new THREE.TetrahedronGeometry(0.18, 0);
    const shard1 = new THREE.Mesh(shardGeo, coalMat);
    shard1.position.set(0.38, 0.25, 0.2);
    shard1.rotation.set(0.2, 0.5, -0.3);
    shard1.castShadow = true;
    group.add(shard1);

    const shard2 = new THREE.Mesh(shardGeo, coalMat);
    shard2.position.set(-0.35, 0.22, -0.18);
    shard2.rotation.set(-0.4, 0.2, 0.5);
    shard2.castShadow = true;
    group.add(shard2);

    // 3. İç Yarıkta Gizli Kırmızı Köz Parıltısı
    const emberMat = new THREE.MeshBasicMaterial({ color: 0xff3b00 });
    const emberGeo = new THREE.TetrahedronGeometry(0.08, 0);
    const ember = new THREE.Mesh(emberGeo, emberMat);
    ember.position.set(0.15, 0.48, 0.25);
    group.add(ember);

    // 60 FPS Gizli Köz Nabzı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const pulse = 1.0 + Math.sin(time * 3.5) * 0.2;
      ember.scale.setScalar(pulse);
    };

    return group;
  }

  static _createAshMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Açık Gri Kül Tepeciği (Low-Poly Ash Mound)
    const ashGeo = new THREE.ConeGeometry(0.68, 0.38, 7);
    const ashMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.95,
      flatShading: true
    });
    const ash = new THREE.Mesh(ashGeo, ashMat);
    ash.position.y = 0.19;
    ash.castShadow = true;
    ash.receiveShadow = true;
    ash.add(this._createOutline(ashGeo, 0x334155, 0.035));
    group.add(ash);

    // Köz parçacıkları (ember)
    const emberMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const emberGeo = new THREE.DodecahedronGeometry(0.06, 0);
    const ember = new THREE.Mesh(emberGeo, emberMat);
    ember.position.set(0.18, 0.25, 0.1);
    group.add(ember);

    const ember2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.04, 0), emberMat);
    ember2.position.set(-0.15, 0.22, -0.1);
    group.add(ember2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ember.scale.setScalar(0.9 + Math.sin(time * 5.0) * 0.2);
    };

    return group;
  }

  static _createPaperMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Parşömen Sayfası (Low-Poly Parchment Sheet)
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      roughness: 0.75,
      flatShading: true
    });

    const sheetGeo = new THREE.BoxGeometry(0.72, 0.04, 0.52);
    const paper = new THREE.Mesh(sheetGeo, paperMat);
    paper.position.y = 0.22;
    paper.rotation.set(0.06, 0.2, 0.04);
    paper.castShadow = true;
    paper.receiveShadow = true;
    group.add(paper);

    // 2. Fasetli Kıvrık Rulo Kenarı (Rolled Edge)
    const rollGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.52, 6);
    const roll = new THREE.Mesh(rollGeo, paperMat);
    roll.position.set(0.36, 0.26, 0.06);
    roll.rotation.set(Math.PI / 2, 0, -0.2);
    roll.castShadow = true;
    group.add(roll);

    // 3. Fasetli Kırmızı Balmumu Mühür (Wax Seal)
    const sealGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 6);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      flatShading: true
    });
    const seal = new THREE.Mesh(sealGeo, sealMat);
    seal.position.set(-0.16, 0.25, -0.05);
    group.add(seal);

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createLifeMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Canlı Yeşil Yaşam Kristali (Low-Poly Life Core)
    const coreGeo = new THREE.IcosahedronGeometry(0.42, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x4ade80,
      emissiveIntensity: 1.4,
      roughness: 0.15,
      flatShading: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.52;
    group.add(core);

    // 2. Çift Sarmal Enerji Yörünge Halkaları (Helix Rings)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xbbf7d0,
      emissive: 0x86efac,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      flatShading: true
    });

    const ring1Geo = new THREE.TorusGeometry(0.58, 0.035, 4, 10);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.position.y = 0.52;
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(0.58, 0.035, 4, 10);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.position.y = 0.52;
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // 3. Yaşam Işığı (PointLight)
    const light = new THREE.PointLight(0x4ade80, 2.4, 3.5);
    light.position.set(0, 0.52, 0);
    group.add(light);

    // 60 FPS Canlı Çift Sarmal Dönüş & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ring1.rotation.z += dt * 1.8;
      ring2.rotation.x += dt * 1.6;

      const pulse = 1.0 + Math.sin(time * 3.5) * 0.06;
      core.scale.setScalar(pulse);
    };

    return group;
  }

  static _createBirdMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Ahşap & Yeşil Çimen Kaidesi
    const baseGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.08, 6);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.8,
      flatShading: true
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.06;
    base.add(this._createOutline(baseGeo, 0x14532d, 0.035));
    group.add(base);

    // 2. Fasetli Ağaç Dalı / Tünek
    const perchGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.5, 5);
    perchGeo.rotateZ(Math.PI / 2);
    const perchMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85, flatShading: true });
    const perch = new THREE.Mesh(perchGeo, perchMat);
    perch.position.set(0, 0.16, 0);
    group.add(perch);

    // 3. Fasetli Gök Mavisi Kuş Gövdesi
    const bodyGeo = new THREE.DodecahedronGeometry(0.28, 0);
    bodyGeo.scale(0.85, 0.95, 1.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      flatShading: true
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0.42, -0.04);
    body.add(this._createOutline(bodyGeo, 0x0369a1, 0.035));
    group.add(body);

    // 4. Pastel Sarı Fasetli Göğüs
    const chestGeo = new THREE.TetrahedronGeometry(0.18, 0);
    const chestMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.45,
      flatShading: true
    });
    const chest = new THREE.Mesh(chestGeo, chestMat);
    chest.position.set(0, 0.38, 0.14);
    group.add(chest);

    // 5. Kuş Kafası ve Sevimli Gözler
    const headGeo = new THREE.DodecahedronGeometry(0.16, 0);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(0, 0.54, 0.16);
    head.add(this._createOutline(headGeo, 0x0369a1, 0.03));
    group.add(head);

    // Siyah boncuk gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    [-0.11, 0.11].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.04), eyeMat);
      eye.position.set(ex, 0.56, 0.24);
      group.add(eye);
    });

    // Altın sarı sivri gaga (4 köşeli koni)
    const beakGeo = new THREE.ConeGeometry(0.06, 0.18, 4);
    beakGeo.rotateX(Math.PI / 2);
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, flatShading: true });
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.position.set(0, 0.52, 0.32);
    group.add(beak);

    // 6. Fasetli Çift Kanat
    const wingGeo = new THREE.ConeGeometry(0.12, 0.38, 4);
    wingGeo.scale(0.3, 1, 0.85);
    const wingLeft = new THREE.Mesh(wingGeo, bodyMat);
    wingLeft.position.set(-0.24, 0.44, -0.04);
    wingLeft.rotation.set(Math.PI / 2.6, 0, 0.35);
    group.add(wingLeft);

    const wingRight = new THREE.Mesh(wingGeo, bodyMat);
    wingRight.position.set(0.24, 0.44, -0.04);
    wingRight.rotation.set(Math.PI / 2.6, 0, -0.35);
    group.add(wingRight);

    // Çatallı fasetli kuyruk
    const tailGeo = new THREE.ConeGeometry(0.1, 0.28, 3);
    tailGeo.rotateX(-Math.PI / 2.4);
    const tail = new THREE.Mesh(tailGeo, bodyMat);
    tail.position.set(0, 0.42, -0.34);
    group.add(tail);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const breathe = Math.sin(time * 3.5) * 0.06;
      wingLeft.rotation.z = 0.35 + breathe;
      wingRight.rotation.z = -0.35 - breathe;
      head.position.y = 0.54 + Math.sin(time * 2.0) * 0.015;
    };

    return group;
  }

  static _createAnimalMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Yeşil Otlak Kaidesi
    const groundGeo = new THREE.CylinderGeometry(0.48, 0.54, 0.08, 6);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.8,
      flatShading: true
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = 0.06;
    ground.add(this._createOutline(groundGeo, 0x14532d, 0.035));
    group.add(ground);

    // Minik fasetli sarı papatya süsü
    const flowerGeo = new THREE.DodecahedronGeometry(0.06, 0);
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, flatShading: true });
    const flower = new THREE.Mesh(flowerGeo, flowerMat);
    flower.position.set(0.26, 0.12, 0.2);
    group.add(flower);

    // 2. Fasetli Karamel Canlı Gövdesi (Low-Poly Deer Body)
    const deerMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.65,
      flatShading: true
    });
    const bodyGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.64, 6);
    bodyGeo.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, deerMat);
    body.position.y = 0.44;
    body.add(this._createOutline(bodyGeo, 0x78350f, 0.035));
    group.add(body);

    // 3. Fasetli Baş, Kulaklar ve Boyun
    const neckGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.28, 5);
    neckGeo.rotateX(0.4);
    const neck = new THREE.Mesh(neckGeo, deerMat);
    neck.position.set(0, 0.58, 0.24);
    group.add(neck);

    const headGeo = new THREE.DodecahedronGeometry(0.16, 0);
    const head = new THREE.Mesh(headGeo, deerMat);
    head.position.set(0, 0.72, 0.34);
    head.add(this._createOutline(headGeo, 0x78350f, 0.035));
    group.add(head);

    // Siyah parlak gözler ve burun
    const darkMat = new THREE.MeshBasicMaterial({ color: 0x1c1917 });
    [-0.1, 0.1].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), darkMat);
      eye.position.set(ex, 0.74, 0.42);
      group.add(eye);
    });

    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.06), darkMat);
    nose.position.set(0, 0.67, 0.48);
    group.add(nose);

    // Kulaklar (4 köşeli koniler)
    const earGeo = new THREE.ConeGeometry(0.05, 0.14, 4);
    [-0.12, 0.12].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, deerMat);
      ear.position.set(ex, 0.82, 0.28);
      ear.rotation.set(-0.3, 0, i === 0 ? -0.45 : 0.45);
      group.add(ear);
    });

    // Altın sarısı fasetli dallı boynuzlar
    const hornMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.35,
      flatShading: true
    });
    [-0.09, 0.09].forEach((hx, i) => {
      const hornGeo = new THREE.ConeGeometry(0.035, 0.32, 4);
      const horn = new THREE.Mesh(hornGeo, hornMat);
      horn.position.set(hx, 0.92, 0.28);
      horn.rotation.set(-0.25, 0, i === 0 ? -0.4 : 0.4);
      group.add(horn);

      // Yan dal boynuzu
      const subHornGeo = new THREE.ConeGeometry(0.025, 0.14, 4);
      const subHorn = new THREE.Mesh(subHornGeo, hornMat);
      subHorn.position.set(hx < 0 ? hx - 0.06 : hx + 0.06, 0.94, 0.32);
      subHorn.rotation.set(-0.1, 0, i === 0 ? -0.8 : 0.8);
      group.add(subHorn);
    });

    // 4 Fasetli Bacak ve Toynaklar
    const legGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.36, 5);
    const hoofMat = new THREE.MeshStandardMaterial({ color: 0x292524, flatShading: true });
    [[-0.14, -0.2], [0.14, -0.2], [-0.14, 0.2], [0.14, 0.2]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, deerMat);
      leg.position.set(lx, 0.24, lz);
      group.add(leg);

      const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), hoofMat);
      hoof.position.set(lx, 0.08, lz);
      group.add(hoof);
    });

    // Beyaz uçlu minik kuyruk
    const tailMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, flatShading: true });
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 4), tailMat);
    tail.position.set(0, 0.48, -0.34);
    tail.rotation.x = -Math.PI / 2.8;
    group.add(tail);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      head.position.y = 0.72 + Math.sin(time * 2.5) * 0.02;
      tail.rotation.z = Math.sin(time * 4.0) * 0.2;
    };

    return group;
  }

  static _createFishMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Berrak Turkuaz Su Dalgası Kaidesi
    const waterGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.08, 6);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      flatShading: true
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.06;
    water.add(this._createOutline(waterGeo, 0x0c4a6e, 0.035));
    group.add(water);

    // Su köpüğü baloncukları (Icosahedron)
    const bubbleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, flatShading: true });
    const b1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.07, 0), bubbleMat);
    b1.position.set(0.24, 0.12, 0.15);
    group.add(b1);
    const b2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.05, 0), bubbleMat);
    b2.position.set(-0.22, 0.12, -0.18);
    group.add(b2);

    // 2. Fasetli Parlak Turuncu-Beyaz Koi Balığı Gövdesi
    const fishMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xc2410c,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      flatShading: true
    });
    const bodyGeo = new THREE.DodecahedronGeometry(0.28, 0);
    bodyGeo.scale(0.7, 0.9, 1.5);
    const body = new THREE.Mesh(bodyGeo, fishMat);
    body.position.y = 0.36;
    body.add(this._createOutline(bodyGeo, 0x9a3412, 0.035));
    group.add(body);

    // Beyaz benek deseni (fasetli)
    const spotMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, flatShading: true });
    const spot = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), spotMat);
    spot.position.set(0.05, 0.46, 0.05);
    group.add(spot);

    // Siyah gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    [-0.14, 0.14].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), eyeMat);
      eye.position.set(ex, 0.4, 0.28);
      group.add(eye);
    });

    // Fasetli sırt yüzgeci
    const finMat = new THREE.MeshStandardMaterial({ color: 0xfb923c, flatShading: true });
    const finGeo = new THREE.ConeGeometry(0.08, 0.22, 3);
    finGeo.rotateX(-0.5);
    const dorsalFin = new THREE.Mesh(finGeo, finMat);
    dorsalFin.position.set(0, 0.52, -0.05);
    group.add(dorsalFin);

    // Fasetli yan yüzgeçler
    const sideFinGeo = new THREE.ConeGeometry(0.06, 0.18, 3);
    const leftFin = new THREE.Mesh(sideFinGeo, finMat);
    leftFin.position.set(-0.2, 0.32, 0.1);
    leftFin.rotation.set(0.5, 0, 0.8);
    group.add(leftFin);

    const rightFin = new THREE.Mesh(sideFinGeo, finMat);
    rightFin.position.set(0.2, 0.32, 0.1);
    rightFin.rotation.set(0.5, 0, -0.8);
    group.add(rightFin);

    // Fasetli hareketli kuyruk yüzgeci
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0.36, -0.38);
    const tailGeo = new THREE.ConeGeometry(0.18, 0.32, 3);
    tailGeo.rotateX(-Math.PI / 2);
    const tail = new THREE.Mesh(tailGeo, finMat);
    tail.position.z = -0.12;
    tailGroup.add(tail);
    group.add(tailGroup);

    // 60 FPS Canlı Yüzme Salınımı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      tailGroup.rotation.y = Math.sin(time * 5.0) * 0.4;
      body.rotation.y = Math.sin(time * 5.0 + 1.2) * 0.1;
      leftFin.rotation.z = 0.8 + Math.sin(time * 6.0) * 0.2;
      rightFin.rotation.z = -0.8 - Math.sin(time * 6.0) * 0.2;
    };

    return group;
  }

  static _createPrimitiveKnifeMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Ahşap Sap (Low-Poly Handle)
    const handleGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.52, 6);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0x854d0e,
      roughness: 0.8,
      flatShading: true
    });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.22;
    handle.castShadow = true;
    group.add(handle);

    // 2. Fasetli Keskin Çakmaktaşı Uç (Flint Blade)
    const bladeGeo = new THREE.ConeGeometry(0.15, 0.56, 4);
    bladeGeo.scale(0.4, 1, 1);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.6,
      metalness: 0.35,
      flatShading: true
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.64;
    blade.castShadow = true;
    group.add(blade);

    // 3. Sapı Bıçağa Bağlayan Fasetli Lif İpi Sarımı
    const wrapGeo = new THREE.TorusGeometry(0.085, 0.025, 4, 8);
    const wrapMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      flatShading: true
    });
    const wrap = new THREE.Mesh(wrapGeo, wrapMat);
    wrap.position.y = 0.44;
    wrap.rotation.x = Math.PI / 2;
    group.add(wrap);

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createFeatherMesh(def) {
    const group = new THREE.Group();

    // Altın Mürekkep Hokkası (Tablosuz, doğrudan stand görevi görür)
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.7, roughness: 0.25, flatShading: true });
    const inkpotGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.18, 6);
    const inkpot = new THREE.Mesh(inkpotGeo, goldMat);
    inkpot.position.set(0, 0.14, 0);
    inkpot.add(this._createOutline(inkpotGeo, 0xb45309, 0.035));
    group.add(inkpot);

    // Fasetli Dolgun Mavi-Beyaz Yazı Tüyü (Quill)
    const featherGroup = new THREE.Group();
    featherGroup.position.set(0.08, 0.48, 0);

    const featherMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5, flatShading: true });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5, flatShading: true });

    // Tüy Omurgası (Shaft)
    const shaftGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.76, 5);
    const shaft = new THREE.Mesh(shaftGeo, goldMat);
    shaft.rotation.z = -0.38;
    featherGroup.add(shaft);

    // Fasetli Mavi Tüy Gövdesi
    const vaneGeo = new THREE.ConeGeometry(0.22, 0.6, 4);
    vaneGeo.scale(0.3, 1, 0.9);
    const vane = new THREE.Mesh(vaneGeo, featherMat);
    vane.position.set(-0.08, 0.12, 0);
    vane.rotation.z = -0.38;
    vane.add(this._createOutline(vaneGeo, 0x0284c7, 0.035));
    featherGroup.add(vane);

    // Beyaz Fasetli Alt Tüy Katmanı
    const vaneSubGeo = new THREE.ConeGeometry(0.15, 0.4, 4);
    vaneSubGeo.scale(0.28, 1, 0.85);
    const vaneSub = new THREE.Mesh(vaneSubGeo, whiteMat);
    vaneSub.position.set(-0.05, 0.04, 0.02);
    vaneSub.rotation.z = -0.38;
    featherGroup.add(vaneSub);

    group.add(featherGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      featherGroup.rotation.z = Math.sin(time * 3.0) * 0.1;
      featherGroup.position.y = 0.48 + Math.sin(time * 2.5) * 0.02;
    };

    return group;
  }

  static _createLeatherMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Taş Zemin Kaidesi
    const baseGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.08, 6);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85, flatShading: true });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.06;
    base.add(this._createOutline(baseGeo, 0x1e293b, 0.035));
    group.add(base);

    // 2. Ahşap Tabaklama Gergi Çerçevesi (4 Kütük)
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const postGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.68, 5);

    const post1 = new THREE.Mesh(postGeo, woodMat);
    post1.position.set(-0.26, 0.42, 0);
    group.add(post1);

    const post2 = new THREE.Mesh(postGeo, woodMat);
    post2.position.set(0.26, 0.42, 0);
    group.add(post2);

    const barGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.56, 5);
    barGeo.rotateZ(Math.PI / 2);
    const barTop = new THREE.Mesh(barGeo, woodMat);
    barTop.position.set(0, 0.72, 0);
    group.add(barTop);

    const barBot = new THREE.Mesh(barGeo, woodMat);
    barBot.position.set(0, 0.14, 0);
    group.add(barBot);

    // 3. İplerle Gerilmiş Fasetli Tabaklanmış Deri
    const leatherMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.75, flatShading: true });
    const hideGeo = new THREE.DodecahedronGeometry(0.24, 0);
    hideGeo.scale(1.1, 1.4, 0.2);
    const hide = new THREE.Mesh(hideGeo, leatherMat);
    hide.position.set(0, 0.43, 0);
    hide.add(this._createOutline(hideGeo, 0x78350f, 0.035));
    group.add(hide);

    // Gergi İpleri (4 Köşe)
    const ropeMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    [[-0.24, 0.68], [0.24, 0.68], [-0.24, 0.18], [0.24, 0.18]].forEach(([rx, ry]) => {
      const rope = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.02), ropeMat);
      rope.position.set(rx * 0.75, ry, 0);
      group.add(rope);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      hide.scale.x = 1.1 + Math.sin(time * 2.5) * 0.02;
    };

    return group;
  }

  static _createCookedMeatMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sulu Pişmiş Biftek Gövdesi (Tablosuz, merkezli)
    const meatGroup = new THREE.Group();
    meatGroup.position.set(0, 0.4, 0);

    const meatMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.6, flatShading: true });
    const meatGeo = new THREE.DodecahedronGeometry(0.32, 0);
    meatGeo.scale(1.25, 0.65, 1.05);
    const meat = new THREE.Mesh(meatGeo, meatMat);
    meat.position.set(-0.08, 0, 0);
    meat.add(this._createOutline(meatGeo, 0x4c0519, 0.035));
    meatGroup.add(meat);

    // Beyaz Kemik Sapı
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5, flatShading: true });
    const boneGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.4, 5);
    boneGeo.rotateZ(Math.PI / 2.4);
    const bone = new THREE.Mesh(boneGeo, boneMat);
    bone.position.set(0.3, 0.04, 0);
    meatGroup.add(bone);

    // Kemik ucu fasetli topuz
    const knob = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), boneMat);
    knob.position.set(0.46, 0.12, 0);
    meatGroup.add(knob);

    // Tüten Buhar/Duman Parçacığı
    const steamMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.75 });
    const steam = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), steamMat);
    steam.position.set(-0.08, 0.22, 0);
    meatGroup.add(steam);

    group.add(meatGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      steam.position.y = 0.22 + Math.sin(time * 3.5) * 0.08;
      steam.scale.setScalar(0.85 + Math.sin(time * 3.5) * 0.25);
    };

    return group;
  }

  static _createResinMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Berrak Kehribar Damlası (Low-Poly Amber Resin Gem)
    const coneGeo = new THREE.ConeGeometry(0.42, 0.65, 7);
    const coneMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      transmission: 0.85,
      roughness: 0.12,
      ior: 1.54,
      transparent: true,
      opacity: 0.92,
      flatShading: true
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = 0.52;
    cone.castShadow = true;
    group.add(cone);

    const baseGeo = new THREE.IcosahedronGeometry(0.42, 1);
    const base = new THREE.Mesh(baseGeo, coneMat);
    base.position.y = 0.32;
    base.castShadow = true;
    group.add(base);

    // 2. İçinde Donup Kalmış Minik Fasetli Yeşil Yaprak Kalıntısı
    const leafGeo = new THREE.TetrahedronGeometry(0.09, 0);
    const leafMat = new THREE.MeshBasicMaterial({ color: 0x15803d });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(0.04, 0.38, 0.02);
    group.add(leaf);

    // 60 FPS Parıltı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createPotteryMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Pişmiş Kilden Rustik Çömlek (Low-Poly Clay Pot)
    const potMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.7,
      flatShading: true
    });

    // Gövde (8 fasetli çift kademe)
    const lowerGeo = new THREE.CylinderGeometry(0.48, 0.32, 0.36, 8);
    const lower = new THREE.Mesh(lowerGeo, potMat);
    lower.position.y = 0.22;
    lower.castShadow = true;
    lower.receiveShadow = true;
    group.add(lower);

    const upperGeo = new THREE.CylinderGeometry(0.28, 0.48, 0.32, 8);
    const upper = new THREE.Mesh(upperGeo, potMat);
    upper.position.y = 0.54;
    upper.castShadow = true;
    group.add(upper);

    // 2. Fasetli Ağız Çemberi (Rim)
    const rimGeo = new THREE.TorusGeometry(0.24, 0.045, 4, 8);
    const rim = new THREE.Mesh(rimGeo, potMat);
    rim.position.y = 0.7;
    rim.rotation.x = Math.PI / 2;
    group.add(rim);

    // 60 FPS Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createWaterJugMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Rustik Seramik Sürahi (Low-Poly Water Jug)
    const jugMat = new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.65,
      flatShading: true
    });

    const bodyGeo = new THREE.CylinderGeometry(0.44, 0.28, 0.58, 8);
    const body = new THREE.Mesh(bodyGeo, jugMat);
    body.position.y = 0.35;
    body.castShadow = true;
    group.add(body);

    const neckGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.32, 8);
    const neck = new THREE.Mesh(neckGeo, jugMat);
    neck.position.y = 0.74;
    group.add(neck);

    // 2. Fasetli Kulp
    const handleGeo = new THREE.TorusGeometry(0.22, 0.045, 4, 8, Math.PI);
    const handle = new THREE.Mesh(handleGeo, jugMat);
    handle.position.set(-0.32, 0.54, 0);
    handle.rotation.z = -Math.PI / 2;

    // Su yüzeyi
    const waterGeo = new THREE.CircleGeometry(0.18, 12);
    const waterMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(0, 0.94, 0);
    water.rotation.x = -Math.PI / 2;
    group.add(water);

    return group;
  }

  static _createBottleMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Düşük Poligonlu Şişe Gövdesi (6 segmentli hexagonal cam prizma)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xbae6fd,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
      ior: 1.45,
      flatShading: true
    });

    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.34, 0.62, 6);
    const body = new THREE.Mesh(bodyGeo, glassMat);
    body.position.y = 0.34;
    body.add(this._createOutline(bodyGeo, 0x0284c7, 0.035));
    group.add(body);

    // Fasetli Şişe Boynu
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.28, 6);
    const neck = new THREE.Mesh(neckGeo, glassMat);
    neck.position.y = 0.72;
    neck.add(this._createOutline(neckGeo, 0x0284c7, 0.03));
    group.add(neck);

    // Şişe İçi Sıvı (Low-poly berrak mavi iksir)
    const liquidGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.38, 6);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      flatShading: true
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = 0.26;
    group.add(liquid);

    // Fasetli Mantar Tıpa
    const corkGeo = new THREE.CylinderGeometry(0.14, 0.1, 0.18, 6);
    const corkMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8, flatShading: true });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.9;
    cork.add(this._createOutline(corkGeo, 0x78350f, 0.03));
    group.add(cork);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      liquid.position.y = 0.26 + Math.sin(time * 3) * 0.02;
    };

    return group;
  }

  static _createFlintMesh(def) {
    const group = new THREE.Group();

    // Fasetli Keskin Yontma Çakmaktaşı
    const flintGeo = new THREE.DodecahedronGeometry(0.48, 0);
    flintGeo.scale(1.1, 0.7, 0.5);
    const flintMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.65,
      metalness: 0.25,
      flatShading: true
    });
    const flint = new THREE.Mesh(flintGeo, flintMat);
    flint.position.y = 0.38;
    flint.rotation.set(0.2, 0.3, -0.2);
    flint.add(this._createOutline(flintGeo, 0x0f172a, 0.04));
    group.add(flint);

    // Kıvılcım faset parçacığı
    const sparkGeo = new THREE.TetrahedronGeometry(0.09, 0);
    const sparkMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      flatShading: true
    });
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.set(0.35, 0.55, 0.1);
    group.add(spark);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      spark.position.y = 0.55 + Math.sin(time * 5) * 0.06;
      spark.rotation.x += dt * 2;
    };

    return group;
  }

  static _createBowMesh(def) {
    const group = new THREE.Group();

    // Kavisli Fasetli Ahşap Yay Gövdesi (Merkezlenmiş, büyütülmüş)
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, 0.46, 0);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.6, flatShading: true });
    const arcGeo = new THREE.TorusGeometry(0.44, 0.045, 5, 12, Math.PI * 0.95);
    arcGeo.rotateZ(Math.PI * 0.52);
    const arc = new THREE.Mesh(arcGeo, woodMat);
    arc.add(this._createOutline(arcGeo, 0x713f12, 0.035));
    bowGroup.add(arc);

    // Deri Kabza Sarımı (Grip)
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x451a03, flatShading: true });
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.16, 6), gripMat);
    grip.position.set(-0.43, 0, 0);
    bowGroup.add(grip);

    // Gergin Beyaz Kiriş İpi (String)
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const stringGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.86, 4);
    const bowString = new THREE.Mesh(stringGeo, stringMat);
    bowString.position.set(-0.06, 0, 0);
    bowGroup.add(bowString);

    group.add(bowGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      bowString.position.x = -0.06 + Math.sin(time * 5.0) * 0.015;
    };

    return group;
  }

  static _createArrowMesh(def) {
    const group = new THREE.Group();

    // Fasetli İnce Ahşap Şaft
    const shaftGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.95, 5);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7, flatShading: true });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 0.45;
    shaft.add(this._createOutline(shaftGeo, 0x78350f, 0.03));
    group.add(shaft);

    // Fasetli Piramit Metal Uç
    const tipGeo = new THREE.ConeGeometry(0.09, 0.24, 4);
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true
    });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.y = 0.98;
    tip.add(this._createOutline(tipGeo, 0x1e293b, 0.035));
    group.add(tip);

    // Fasetli Kırmızı Yele Tüyleri (3 yönlü)
    const fletchMat = new THREE.MeshStandardMaterial({ color: 0xef4444, flatShading: true });
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const fGeo = new THREE.BoxGeometry(0.08, 0.22, 0.015);
      const f = new THREE.Mesh(fGeo, fletchMat);
      f.position.set(Math.cos(angle) * 0.05, 0.12, Math.sin(angle) * 0.05);
      f.rotation.y = -angle;
      group.add(f);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2) * 0.04;
    };

    return group;
  }

  static _createTorchMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap Meşale Sapı
    const stickGeo = new THREE.CylinderGeometry(0.065, 0.05, 0.75, 6);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const stick = new THREE.Mesh(stickGeo, stickMat);
    stick.position.y = 0.35;
    stick.add(this._createOutline(stickGeo, 0x451a03, 0.035));
    group.add(stick);

    // Fasetli Demir Çember
    const ringGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 6);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, flatShading: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.68;
    group.add(ring);

    // Fasetli Dış Alev (Düşük poligon koni)
    const flameGeo = new THREE.ConeGeometry(0.18, 0.42, 5);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.8,
      flatShading: true
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.9;
    group.add(flame);

    // İç Çekirdek Alev
    const coreFlameGeo = new THREE.ConeGeometry(0.1, 0.26, 5);
    const coreFlameMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const coreFlame = new THREE.Mesh(coreFlameGeo, coreFlameMat);
    coreFlame.position.y = 0.88;
    group.add(coreFlame);

    const light = new THREE.PointLight(0xff7700, 1.8, 3.0);
    light.position.set(0, 0.95, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      flame.scale.set(
        1 + Math.sin(time * 8) * 0.12,
        1 + Math.cos(time * 10) * 0.15,
        1 + Math.sin(time * 7) * 0.12
      );
      coreFlame.scale.set(
        1 + Math.cos(time * 9) * 0.1,
        1 + Math.sin(time * 11) * 0.12,
        1 + Math.cos(time * 8) * 0.1
      );
    };

    return group;
  }

  static _createRawMetalMesh(def) {
    const group = new THREE.Group();

    // Fasetli Taş Taban Matrisi
    const rockGeo = new THREE.DodecahedronGeometry(0.48, 0);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true
    });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.y = 0.38;
    rock.add(this._createOutline(rockGeo, 0x1e293b, 0.04));
    group.add(rock);

    // Taş Üzerinde Parlayan Fasetli Metal Çıkıntıları (Gümüş/Demir kristaller)
    const oreMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x94a3b8,
      emissiveIntensity: 0.35,
      flatShading: true
    });

    const oreOffsets = [
      [0.25, 0.48, 0.18, 0.16],
      [-0.2, 0.42, 0.22, 0.14],
      [0.05, 0.62, -0.15, 0.18],
      [-0.18, 0.25, -0.22, 0.13]
    ];

    oreOffsets.forEach(([x, y, z, s]) => {
      const oreGeo = new THREE.IcosahedronGeometry(s, 0);
      const oreMesh = new THREE.Mesh(oreGeo, oreMat);
      oreMesh.position.set(x, y, z);
      oreMesh.add(this._createOutline(oreGeo, 0x334155, 0.03));
      group.add(oreMesh);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      rock.position.y = 0.38 + Math.sin(time * 2) * 0.02;
    };

    return group;
  }

  static _createIronIngotMesh(def) {
    const group = new THREE.Group();

    // Fasetli Metalik Demir Malzemesi
    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true
    });

    const createIngot = (x, y, z, rotY, scale = 1.0) => {
      const ingot = new THREE.Group();
      // Pahlı prizma külçe (iri ve belirgin)
      const geo = new THREE.BoxGeometry(0.54 * scale, 0.16 * scale, 0.28 * scale);
      const mesh = new THREE.Mesh(geo, ironMat);
      mesh.add(this._createOutline(geo, 0x475569, 0.035));
      ingot.add(mesh);

      // Üst Damga Çentiği
      const stampMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
      const stamp = new THREE.Mesh(new THREE.BoxGeometry(0.24 * scale, 0.02, 0.1 * scale), stampMat);
      stamp.position.y = 0.085 * scale;
      ingot.add(stamp);

      ingot.position.set(x, y, z);
      ingot.rotation.y = rotY;
      return ingot;
    };

    // Doğrudan istiflenmiş 3 külçe (alt tabla/tablo YOK, merkezli)
    group.add(createIngot(-0.14, 0.22, -0.06, 0.12, 1.05));
    group.add(createIngot(0.14, 0.22, 0.08, -0.15, 1.05));
    group.add(createIngot(0, 0.38, 0.02, 0.28, 1.0));

    // Metalik Parıltı Işığı
    const light = new THREE.PointLight(0xe2e8f0, 2.0, 2.2);
    light.position.set(0, 0.45, 0.25);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      light.intensity = 1.8 + Math.sin(time * 3.0) * 0.5;
    };

    return group;
  }

  static _createMetalKnifeMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap Sap
    const handleGeo = new THREE.CylinderGeometry(0.06, 0.055, 0.4, 6);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.7, flatShading: true });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.18;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Fasetli Metal Balçak
    const guardGeo = new THREE.BoxGeometry(0.24, 0.05, 0.08);
    const guardMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, flatShading: true });
    const guard = new THREE.Mesh(guardGeo, guardMat);
    guard.position.y = 0.4;
    group.add(guard);

    // Fasetli Keskin Çelik Namlu
    const bladeGeo = new THREE.ConeGeometry(0.12, 0.65, 4);
    bladeGeo.scale(1, 1, 0.25);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x94a3b8,
      emissiveIntensity: 0.2,
      flatShading: true
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.72;
    blade.add(this._createOutline(bladeGeo, 0x475569, 0.035));
    group.add(blade);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.rotation.z = Math.sin(time * 2) * 0.05;
    };

    return group;
  }

  static _createPickaxeMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Maden Kayası Kaidesi
    const rockGeo = new THREE.DodecahedronGeometry(0.44, 0);
    rockGeo.scale(1.2, 0.5, 1.1);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.y = 0.16;
    rock.add(this._createOutline(rockGeo, 0x1e293b, 0.035));
    group.add(rock);

    // Kayaya gömülü parlayan altın cevheri kristalleri
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xeab308, emissiveIntensity: 0.6, flatShading: true });
    const ore1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1, 0), goldMat);
    ore1.position.set(-0.24, 0.22, 0.18);
    group.add(ore1);

    const ore2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), goldMat);
    ore2.position.set(0.28, 0.18, -0.15);
    group.add(ore2);

    // 2. Kayaya Saplanmış Fasetli Kazma Grubu
    const pickGroup = new THREE.Group();
    pickGroup.position.set(0, 0.48, 0);
    pickGroup.rotation.set(0.3, 0.2, -0.4);

    // Ahşap Sap
    const handleGeo = new THREE.CylinderGeometry(0.035, 0.04, 0.72, 5);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8, flatShading: true });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.06;
    pickGroup.add(handle);

    // Çelik Kazma Başlığı (Kavisli Sivri Çift Ağız)
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25, flatShading: true });
    const headArcGeo = new THREE.TorusGeometry(0.32, 0.045, 5, 8, Math.PI * 0.75);
    headArcGeo.rotateZ(Math.PI * 0.62);
    const headMesh = new THREE.Mesh(headArcGeo, steelMat);
    headMesh.position.set(0, 0.38, 0);
    headMesh.add(this._createOutline(headArcGeo, 0x334155, 0.035));
    pickGroup.add(headMesh);

    // Sivri Kazma Uçları
    const tipMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, flatShading: true });
    [-0.24, 0.24].forEach((tx, i) => {
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 4), tipMat);
      tip.position.set(tx, 0.28, 0);
      tip.rotation.z = i === 0 ? 0.8 : -0.8;
      pickGroup.add(tip);
    });

    group.add(pickGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ore1.scale.setScalar(0.95 + Math.sin(time * 3.5) * 0.1);
    };

    return group;
  }

  static _createSwordMesh(def) {
    const group = new THREE.Group();

    // Fasetli Parlak Çelik Namlu (Prizmatik çift oluklu estetik)
    const bladeGeo = new THREE.ConeGeometry(0.14, 0.98, 4);
    bladeGeo.scale(1, 1, 0.3);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.25,
      flatShading: true
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.7;
    blade.add(this._createOutline(bladeGeo, 0x475569, 0.04));
    group.add(blade);

    // Fasetli Altın Balçak (Crossguard)
    const guardGeo = new THREE.BoxGeometry(0.48, 0.08, 0.1);
    const guardMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const guard = new THREE.Mesh(guardGeo, guardMat);
    guard.position.y = 0.22;
    guard.add(this._createOutline(guardGeo, 0xb45309, 0.035));
    group.add(guard);

    // Fasetli Deri Kabza
    const hiltGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.26, 6);
    const hiltMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const hilt = new THREE.Mesh(hiltGeo, hiltMat);
    hilt.position.y = 0.08;
    hilt.add(this._createOutline(hiltGeo, 0x451a03, 0.03));
    group.add(hilt);

    // Fasetli Altın Kabza Başı (Pommel)
    const pommelGeo = new THREE.DodecahedronGeometry(0.07, 0);
    const pommel = new THREE.Mesh(pommelGeo, guardMat);
    pommel.position.y = -0.06;
    group.add(pommel);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2) * 0.03;
    };

    return group;
  }

  static _createWoodenShieldMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sekizgen Ahşap Gövde
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.75, flatShading: true });
    const shieldGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.08, 8);
    const shield = new THREE.Mesh(shieldGeo, woodMat);
    shield.rotation.x = Math.PI / 2;
    shield.position.y = 0.45;
    shield.add(this._createOutline(shieldGeo, 0x451a03, 0.035));
    group.add(shield);

    // Demir Fasetli Dış Çember
    const rimGeo = new THREE.TorusGeometry(0.52, 0.035, 5, 8);
    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.35,
      flatShading: true
    });
    const rim = new THREE.Mesh(rimGeo, ironMat);
    rim.position.set(0, 0.45, 0.04);
    group.add(rim);

    // Fasetli Sivri Demir Orta Göbek (Shield Boss)
    const bossGeo = new THREE.ConeGeometry(0.18, 0.18, 6);
    const boss = new THREE.Mesh(bossGeo, ironMat);
    boss.rotation.x = Math.PI / 2;
    boss.position.set(0, 0.45, 0.1);
    boss.add(this._createOutline(bossGeo, 0x334155, 0.035));
    group.add(boss);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createIronShieldMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ağır Demir Kalkan (Merkezlenmiş, büyütülmüş)
    const shieldGroup = new THREE.Group();
    shieldGroup.position.set(0, 0.44, 0);

    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });

    // Kalkan Gövdesi (Heater Shield)
    const bodyGeo = new THREE.CylinderGeometry(0.44, 0.22, 0.74, 6);
    bodyGeo.scale(1.0, 1.0, 0.26);
    const shieldBody = new THREE.Mesh(bodyGeo, ironMat);
    shieldBody.add(this._createOutline(bodyGeo, 0x1e293b, 0.035));
    shieldGroup.add(shieldBody);

    // Altın Orta Göbek (Shield Boss)
    const bossMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.75, roughness: 0.25, flatShading: true });
    const bossGeo = new THREE.ConeGeometry(0.14, 0.16, 6);
    bossGeo.rotateX(Math.PI / 2);
    const boss = new THREE.Mesh(bossGeo, bossMat);
    boss.position.set(0, 0.06, 0.14);
    shieldGroup.add(boss);

    // 4 Fasetli Çelik Perçin
    const rivetGeo = new THREE.DodecahedronGeometry(0.035, 0);
    [[-0.28, 0.24], [0.28, 0.24], [-0.16, -0.24], [0.16, -0.24]].forEach(([rx, ry]) => {
      const rivet = new THREE.Mesh(rivetGeo, rimMat);
      rivet.position.set(rx, ry, 0.12);
      shieldGroup.add(rivet);
    });

    // Arka Deri Tutma Kayışı
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 4, 8), strapMat);
    strap.position.set(0, 0, -0.14);
    shieldGroup.add(strap);

    group.add(shieldGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      shieldGroup.position.y = 0.44 + Math.sin(time * 2.5) * 0.02;
    };

    return group;
  }

  static _createLeatherArmorMesh(def) {
    const group = new THREE.Group();

    // Manken Direği
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85, flatShading: true });
    const poleGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.68, 5);
    const pole = new THREE.Mesh(poleGeo, woodMat);
    pole.position.y = 0.38;
    group.add(pole);

    // Fasetli Tokalı Deri Zırh Gövdesi
    const leatherMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7, flatShading: true });
    const darkLeatherMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8, flatShading: true });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, flatShading: true });

    const bodyGeo = new THREE.CylinderGeometry(0.34, 0.26, 0.58, 6);
    bodyGeo.scale(1.15, 1.0, 0.75);
    const armorBody = new THREE.Mesh(bodyGeo, leatherMat);
    armorBody.position.y = 0.5;
    armorBody.add(this._createOutline(bodyGeo, 0x451a03, 0.035));
    group.add(armorBody);

    // Fasetli Omuzluklar
    const pauldronGeo = new THREE.DodecahedronGeometry(0.15, 0);
    pauldronGeo.scale(1.2, 0.7, 0.9);
    [-0.38, 0.38].forEach(px => {
      const pauldron = new THREE.Mesh(pauldronGeo, darkLeatherMat);
      pauldron.position.set(px, 0.7, 0);
      pauldron.add(this._createOutline(pauldronGeo, 0x451a03, 0.03));
      group.add(pauldron);
    });

    // Bel Kemeri ve Toka
    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.09, 0.44), darkLeatherMat);
    belt.position.set(0, 0.32, 0);
    group.add(belt);

    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.46), brassMat);
    buckle.position.set(0, 0.32, 0);
    group.add(buckle);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      armorBody.scale.x = 1.15 + Math.sin(time * 2.5) * 0.02;
    };

    return group;
  }

  static _createIronArmorMesh(def) {
    const group = new THREE.Group();

    // Fasetli Parlak Çelik Göğüs Zırhı (Cuirass)
    const cuirassGeo = new THREE.CylinderGeometry(0.36, 0.3, 0.76, 6);
    cuirassGeo.scale(1.2, 1, 0.7);
    const cuirassMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2,
      flatShading: true
    });
    const cuirass = new THREE.Mesh(cuirassGeo, cuirassMat);
    cuirass.position.y = 0.46;
    cuirass.add(this._createOutline(cuirassGeo, 0x1e293b, 0.04));
    group.add(cuirass);

    // Fasetli Çelik Omuzluklar
    [-0.42, 0.42].forEach(sx => {
      const spGeo = new THREE.ConeGeometry(0.2, 0.25, 5);
      spGeo.rotateZ(sx > 0 ? -0.8 : 0.8);
      const sp = new THREE.Mesh(spGeo, cuirassMat);
      sp.position.set(sx, 0.72, 0);
      sp.add(this._createOutline(spGeo, 0x334155, 0.035));
      group.add(sp);
    });

    // Göğüs ortası perçin/çizgi kabartması
    const ridgeGeo = new THREE.BoxGeometry(0.06, 0.6, 0.38);
    const ridge = new THREE.Mesh(ridgeGeo, cuirassMat);
    ridge.position.set(0, 0.46, 0.1);
    group.add(ridge);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createBedMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap Karyola İskeleti
    const frameGeo = new THREE.BoxGeometry(0.85, 0.2, 1.15);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.16;
    frame.add(this._createOutline(frameGeo, 0x451a03, 0.035));
    group.add(frame);

    // Ahşap Yatak Başlığı
    const headboardGeo = new THREE.BoxGeometry(0.85, 0.45, 0.12);
    const headboard = new THREE.Mesh(headboardGeo, frameMat);
    headboard.position.set(0, 0.35, -0.52);
    headboard.add(this._createOutline(headboardGeo, 0x451a03, 0.035));
    group.add(headboard);

    // Fasetli Kırmızı Yatak Örtüsü (Düşük poligon kabarık yorgan)
    const blanketGeo = new THREE.BoxGeometry(0.78, 0.16, 0.75);
    const blanketMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.7, flatShading: true });
    const blanket = new THREE.Mesh(blanketGeo, blanketMat);
    blanket.position.set(0, 0.28, 0.14);
    blanket.add(this._createOutline(blanketGeo, 0x991b1b, 0.035));
    group.add(blanket);

    // Fasetli Beyaz Yastık
    const pillowGeo = new THREE.BoxGeometry(0.62, 0.14, 0.26);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6, flatShading: true });
    const pillow = new THREE.Mesh(pillowGeo, pillowMat);
    pillow.position.set(0, 0.3, -0.34);
    pillow.add(this._createOutline(pillowGeo, 0x94a3b8, 0.03));
    group.add(pillow);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  // Kategori 5 3D Mesh Üreteçleri
  static _createZehirliSiviMesh(def) {
    const group = new THREE.Group();

    // Fasetli Cam İksir Matarası (Merkezlenmiş, tablosuz)
    const flaskGroup = new THREE.Group();
    flaskGroup.position.set(0, 0.4, 0);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x86efac,
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      transmission: 0.8,
      flatShading: true
    });

    const flaskBodyGeo = new THREE.DodecahedronGeometry(0.32, 0);
    const flaskBody = new THREE.Mesh(flaskBodyGeo, glassMat);
    flaskBody.add(this._createOutline(flaskBodyGeo, 0x14532d, 0.035));
    flaskGroup.add(flaskBody);

    // Şişe Boynu ve Mantar Tıpa
    const neckGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.24, 6);
    const neck = new THREE.Mesh(neckGeo, glassMat);
    neck.position.y = 0.3;
    flaskGroup.add(neck);

    const corkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9, flatShading: true });
    const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.075, 0.11, 6), corkMat);
    cork.position.y = 0.42;
    flaskGroup.add(cork);

    // İçteki Parlayan Zehirli Sıvı Çekirdeği
    const poisonMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x16a34a,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      flatShading: true
    });
    const poisonGeo = new THREE.DodecahedronGeometry(0.24, 0);
    const poison = new THREE.Mesh(poisonGeo, poisonMat);
    poison.position.y = -0.04;
    flaskGroup.add(poison);

    // Zehir Işıltısı
    const light = new THREE.PointLight(0x22c55e, 2.4, 2.5);
    light.position.set(0, 0, 0);
    flaskGroup.add(light);

    group.add(flaskGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      poison.scale.setScalar(1.0 + Math.sin(time * 4.0) * 0.08);
      light.intensity = 2.2 + Math.sin(time * 4.0) * 0.6;
    };

    return group;
  }

  static _createZehirSisesiMesh(def) {
    const group = new THREE.Group();

    // 6 Segmentli Fasetli Zehir Şişesi Gövdesi
    const bottleGeo = new THREE.CylinderGeometry(0.3, 0.36, 0.65, 6);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0x22c55e,
      transmission: 0.7,
      opacity: 0.9,
      transparent: true,
      emissive: 0x15803d,
      emissiveIntensity: 0.5,
      roughness: 0.15,
      flatShading: true
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.35;
    bottle.add(this._createOutline(bottleGeo, 0x14532d, 0.04));
    group.add(bottle);

    // Fasetli Boyun
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.28, 6);
    const neck = new THREE.Mesh(neckGeo, bottleMat);
    neck.position.y = 0.74;
    neck.add(this._createOutline(neckGeo, 0x14532d, 0.035));
    group.add(neck);

    // Fasetli Koyu Tıpa
    const corkGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.16, 6);
    const corkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8, flatShading: true });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.92;
    group.add(cork);

    // Asidik yeşil parıltı ışığı
    const light = new THREE.PointLight(0x22c55e, 1.6, 2.5);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };

    return group;
  }

  static _createZehirliKilicMesh(def) {
    const group = new THREE.Group();

    // Fasetli Yeşil Zehirle Parıldayan Çelik Namlu
    const bladeGeo = new THREE.ConeGeometry(0.14, 1.05, 4);
    bladeGeo.scale(1, 1, 0.3);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x86efac,
      emissive: 0x22c55e,
      emissiveIntensity: 0.7,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.7;
    blade.add(this._createOutline(bladeGeo, 0x14532d, 0.04));
    group.add(blade);

    // Koyu Yeşil Balçak
    const guardGeo = new THREE.BoxGeometry(0.48, 0.08, 0.1);
    const guardMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.5, flatShading: true });
    const guard = new THREE.Mesh(guardGeo, guardMat);
    guard.position.y = 0.22;
    group.add(guard);

    // Fasetli Kabza
    const hiltGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.28, 6);
    const hilt = new THREE.Mesh(hiltGeo, guardMat);
    hilt.position.y = 0.08;
    hilt.add(this._createOutline(hiltGeo, 0x052e16, 0.03));
    group.add(hilt);

    // Zehir Damlası Parçacığı
    const dropGeo = new THREE.TetrahedronGeometry(0.08, 0);
    const dropMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    const drop = new THREE.Mesh(dropGeo, dropMat);
    drop.position.set(0.1, 0.5, 0);
    group.add(drop);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      drop.position.y = 0.4 + Math.sin(time * 4) * 0.15;
    };

    return group;
  }

  static _createSifaIksiriMesh(def) {
    const group = new THREE.Group();

    // Fasetli Küresel Şişe (Dodecahedron tabanlı kristal matara)
    const bottleGeo = new THREE.DodecahedronGeometry(0.44, 0);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0xef4444,
      transmission: 0.75,
      opacity: 0.9,
      transparent: true,
      emissive: 0xdc2626,
      emissiveIntensity: 0.55,
      roughness: 0.15,
      flatShading: true
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.42;
    bottle.add(this._createOutline(bottleGeo, 0x991b1b, 0.04));
    group.add(bottle);

    // Fasetli Boyun
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.26, 6);
    const neck = new THREE.Mesh(neckGeo, bottleMat);
    neck.position.y = 0.78;
    neck.add(this._createOutline(neckGeo, 0x991b1b, 0.035));
    group.add(neck);

    // Fasetli Mantar Tıpa
    const corkGeo = new THREE.CylinderGeometry(0.14, 0.1, 0.15, 6);
    const corkMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8, flatShading: true });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.94;
    group.add(cork);

    // Parlayan Kalp / Artı Sembolü Faseti
    const crossMat = new THREE.MeshBasicMaterial({ color: 0xfff1f2 });
    const crossV = new THREE.BoxGeometry(0.06, 0.22, 0.04);
    const crossVM = new THREE.Mesh(crossV, crossMat);
    crossVM.position.set(0, 0.42, 0.4);
    group.add(crossVM);

    const crossH = new THREE.BoxGeometry(0.22, 0.06, 0.04);
    const crossHM = new THREE.Mesh(crossH, crossMat);
    crossHM.position.set(0, 0.42, 0.4);
    group.add(crossHM);

    const light = new THREE.PointLight(0xef4444, 1.8, 3);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };

    return group;
  }

  static _createManaIksiriMesh(def) {
    const group = new THREE.Group();

    // Fasetli Icosahedron Kristal Şişe
    const bottleGeo = new THREE.IcosahedronGeometry(0.44, 0);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.75,
      opacity: 0.9,
      transparent: true,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      flatShading: true
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.42;
    bottle.add(this._createOutline(bottleGeo, 0x0369a1, 0.04));
    group.add(bottle);

    // Fasetli Boyun
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.26, 6);
    const neck = new THREE.Mesh(neckGeo, bottleMat);
    neck.position.y = 0.78;
    neck.add(this._createOutline(neckGeo, 0x0369a1, 0.035));
    group.add(neck);

    // Fasetli Altın Tıpa
    const corkGeo = new THREE.CylinderGeometry(0.14, 0.1, 0.15, 6);
    const corkMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.94;
    group.add(cork);

    // Yörüngede Dönen Mini Mana Fasetleri
    const orbMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });
    const orbs = [];
    for (let i = 0; i < 3; i++) {
      const oGeo = new THREE.OctahedronGeometry(0.06, 0);
      const o = new THREE.Mesh(oGeo, orbMat);
      group.add(o);
      orbs.push({ mesh: o, angle: (i * Math.PI * 2) / 3 });
    }

    const light = new THREE.PointLight(0x38bdf8, 1.8, 3);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
      orbs.forEach(o => {
        o.angle += dt * 2.0;
        o.mesh.position.set(
          Math.cos(o.angle) * 0.55,
          0.45 + Math.sin(o.angle * 2) * 0.1,
          Math.sin(o.angle) * 0.55
        );
      });
    };

    return group;
  }

  static _createBarutMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kumaş Kese (6 kenarlı torba gövde)
    const pouchGeo = new THREE.CylinderGeometry(0.3, 0.44, 0.5, 6);
    const pouchMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85, flatShading: true });
    const pouch = new THREE.Mesh(pouchGeo, pouchMat);
    pouch.position.y = 0.25;
    pouch.add(this._createOutline(pouchGeo, 0x1e293b, 0.04));
    group.add(pouch);

    // Kese Boğazı Kordon Bağı
    const tieGeo = new THREE.TorusGeometry(0.31, 0.03, 4, 6);
    const tieMat = new THREE.MeshStandardMaterial({ color: 0xd97706, flatShading: true });
    const tie = new THREE.Mesh(tieGeo, tieMat);
    tie.rotation.x = Math.PI / 2;
    tie.position.y = 0.48;
    group.add(tie);

    // Ağzından Dökülen Fasetli Barut Yığını
    const heapGeo = new THREE.ConeGeometry(0.3, 0.24, 6);
    const heapMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9,
      metalness: 0.2,
      flatShading: true
    });
    const heap = new THREE.Mesh(heapGeo, heapMat);
    heap.position.y = 0.56;
    group.add(heap);

    // Tehlikeli minik kıvılcım taneciği
    const sparkGeo = new THREE.TetrahedronGeometry(0.06, 0);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.set(0.18, 0.65, 0.1);
    group.add(spark);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      spark.position.y = 0.65 + Math.sin(time * 6) * 0.04;
    };

    return group;
  }

  static _createBombaMesh(def) {
    const group = new THREE.Group();

    // Fasetli Döküm Demir Bomba Gövdesi (Siyah Gülle - Büyütülmüş ve Merkezlenmiş)
    const bombMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.45,
      flatShading: true
    });
    const bombGeo = new THREE.DodecahedronGeometry(0.36, 0);
    const bomb = new THREE.Mesh(bombGeo, bombMat);
    bomb.position.y = 0.38;
    bomb.add(this._createOutline(bombGeo, 0x09090b, 0.04));
    group.add(bomb);

    // Pirinç Fitil Kovanı (Collar)
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.75, flatShading: true });
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.1, 6), brassMat);
    collar.position.y = 0.72;
    group.add(collar);

    // Kavisli Fasetli İp Fitil
    const fuseMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8, flatShading: true });
    const fuseGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.22, 4);
    fuseGeo.rotateZ(0.4);
    const fuse = new THREE.Mesh(fuseGeo, fuseMat);
    fuse.position.set(0.06, 0.84, 0);
    group.add(fuse);

    // Yanan Kıvılcım Parçacığı (Spark)
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const spark = new THREE.Mesh(new THREE.DodecahedronGeometry(0.065, 0), sparkMat);
    spark.position.set(0.12, 0.95, 0);
    group.add(spark);

    const sparkLight = new THREE.PointLight(0xf97316, 2.5, 2.2);
    sparkLight.position.set(0.12, 0.95, 0);
    group.add(sparkLight);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      spark.scale.setScalar(0.9 + Math.sin(time * 12.0) * 0.3);
      sparkLight.intensity = 2.2 + Math.sin(time * 12.0) * 0.8;
    };

    return group;
  }

  static _createBuyuParsomeniMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sarılı Parşömen (6 kenarlı silindir)
    const scrollGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.85, 6);
    const scrollMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.35,
      roughness: 0.6,
      flatShading: true
    });
    const scroll = new THREE.Mesh(scrollGeo, scrollMat);
    scroll.rotation.z = Math.PI / 2.2;
    scroll.position.y = 0.36;
    scroll.add(this._createOutline(scrollGeo, 0x7c3aed, 0.04));
    group.add(scroll);

    // Mor Büyü Kurdelesi
    const ribGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 6);
    const ribMat = new THREE.MeshStandardMaterial({ color: 0x9333ea, roughness: 0.4, flatShading: true });
    const ribbon = new THREE.Mesh(ribGeo, ribMat);
    ribbon.rotation.z = Math.PI / 2.2;
    ribbon.position.y = 0.36;
    group.add(ribbon);

    // Havada Süzülen Eflatun Rünik Faset
    const runeGeo = new THREE.OctahedronGeometry(0.08, 0);
    const runeMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe });
    const rune = new THREE.Mesh(runeGeo, runeMat);
    rune.position.set(0, 0.65, 0);
    group.add(rune);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      rune.position.y = 0.65 + Math.sin(time * 3) * 0.05;
      rune.rotation.y += dt * 2;
    };

    return group;
  }

  static _createYildirimParsomeniMesh(def) {
    const group = new THREE.Group();

    // Fasetli Şimşek Parşömeni
    const scrollGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.85, 6);
    const scrollMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xeab308,
      roughness: 0.4
    });
    const scroll = new THREE.Mesh(scrollGeo, scrollMat);
    scroll.rotation.z = Math.PI / 2.2;
    scroll.position.y = 0.35;
    scroll.add(this._createOutline(scrollGeo, 0xca8a04, 0.04));
    group.add(scroll);

    // Altın sarısı mühür
    const ribGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 12);
    const ribMat = new THREE.MeshToonMaterial({ color: 0xf59e0b });
    const ribbon = new THREE.Mesh(ribGeo, ribMat);
    ribbon.rotation.z = Math.PI / 2.2;
    ribbon.position.y = 0.35;
    group.add(ribbon);

    return group;
  }

  static _createAtesTopuKitabiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kırmızı Deri Kapak
    const coverGeo = new THREE.BoxGeometry(0.72, 0.14, 0.92);
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.35,
      roughness: 0.6,
      flatShading: true
    });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    cover.position.y = 0.22;
    cover.add(this._createOutline(coverGeo, 0x7f1d1d, 0.04));
    group.add(cover);

    // Fasetli Sayfalar (Hafif sararmış kadim kağıt)
    const pagesGeo = new THREE.BoxGeometry(0.66, 0.1, 0.86);
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.8, flatShading: true });
    const pages = new THREE.Mesh(pagesGeo, pagesMat);
    pages.position.set(0.02, 0.22, 0);
    group.add(pages);

    // Kapaktaki Parlayan Fasetli Alev Kristali (Octahedron)
    const gemGeo = new THREE.OctahedronGeometry(0.14, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf97316,
      emissiveIntensity: 0.85,
      flatShading: true
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(0, 0.32, 0);
    gem.rotation.y = Math.PI / 4;
    group.add(gem);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      gem.rotation.y += dt * 2;
      gem.scale.setScalar(1 + Math.sin(time * 4) * 0.12);
    };

    return group;
  }

  // Kategori 6 3D Mesh Üreteçleri
  static _createBuharMotoruMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Döküm Sanayi Zemin Kaidesi
    const baseGeo = new THREE.BoxGeometry(0.76, 0.1, 0.64);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, flatShading: true });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.06;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.035));
    group.add(base);

    // 2. Fasetli Yatay Bakır Basınç Kazanı (Boiler)
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.8,
      roughness: 0.35,
      flatShading: true
    });
    const boilerGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.48, 6);
    boilerGeo.rotateZ(Math.PI / 2);
    const boiler = new THREE.Mesh(boilerGeo, copperMat);
    boiler.position.set(-0.1, 0.28, 0);
    boiler.add(this._createOutline(boilerGeo, 0x78350f, 0.035));
    group.add(boiler);

    // Dikey Buhar Bacası (Chimney)
    const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.36, 5), baseMat);
    chimney.position.set(-0.24, 0.54, 0);
    group.add(chimney);

    // 3. Fasetli Pirinç Volan Çarkı (Flywheel)
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.75, roughness: 0.3, flatShading: true });
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(0.24, 0.32, 0);

    const rimGeo = new THREE.TorusGeometry(0.2, 0.035, 4, 8);
    const wheelRim = new THREE.Mesh(rimGeo, brassMat);
    wheelRim.add(this._createOutline(rimGeo, 0xb45309, 0.03));
    wheelGroup.add(wheelRim);

    // Çark Parmakları (Spokes)
    for (let i = 0; i < 3; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.38, 0.02), brassMat);
      spoke.rotation.z = (i * Math.PI) / 3;
      wheelGroup.add(spoke);
    }
    group.add(wheelGroup);

    // Piston Bağlantı Kolu
    const pistonGeo = new THREE.BoxGeometry(0.24, 0.04, 0.04);
    const piston = new THREE.Mesh(pistonGeo, copperMat);
    piston.position.set(0.08, 0.32, 0.08);
    group.add(piston);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      wheelGroup.rotation.z -= dt * 4.0;
      piston.position.x = 0.08 + Math.sin(time * 6.0) * 0.05;
    };

    return group;
  }

  static _createTekerlekMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sekizgen Demir Çember (Torus segmentli)
    const rimGeo = new THREE.TorusGeometry(0.48, 0.065, 5, 8);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.y = 0.48;
    rim.add(this._createOutline(rimGeo, 0x1e293b, 0.035));
    group.add(rim);

    // Fasetli Ahşap Göbek
    const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 6);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.75, flatShading: true });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.position.y = 0.48;
    hub.rotation.x = Math.PI / 2;
    hub.add(this._createOutline(hubGeo, 0x451a03, 0.03));
    group.add(hub);

    // 4 Fasetli Ahşap Parmaklık Kolu
    for (let i = 0; i < 4; i++) {
      const spokeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.84, 4);
      const spoke = new THREE.Mesh(spokeGeo, hubMat);
      spoke.position.y = 0.48;
      spoke.rotation.z = (i * Math.PI) / 4;
      group.add(spoke);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      rim.rotation.z += dt * 0.5;
      hub.rotation.y += dt * 0.5;
    };

    return group;
  }

  static _createElArabasiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap El Arabası Teknesi (Tablosuz, doğrudan merkezli)
    const cartGroup = new THREE.Group();
    cartGroup.position.set(0, 0.36, 0);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.75, flatShading: true });
    const tubGeo = new THREE.CylinderGeometry(0.34, 0.24, 0.28, 5);
    tubGeo.scale(1.2, 1.0, 0.85);
    const tub = new THREE.Mesh(tubGeo, woodMat);
    tub.position.set(-0.06, 0.1, 0);
    tub.add(this._createOutline(tubGeo, 0x451a03, 0.035));
    cartGroup.add(tub);

    // İçi Dolu Parlak Altın/Demir Cevheri
    const oreMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xca8a04, emissiveIntensity: 0.4, flatShading: true });
    const ore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), oreMat);
    ore.position.set(-0.06, 0.24, 0);
    ore.scale.set(1.1, 0.5, 0.8);
    cartGroup.add(ore);

    // Ön Demir Tekerlek
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, flatShading: true });
    const wheelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 6);
    wheelGeo.rotateX(Math.PI / 2);
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(0.36, -0.1, 0);
    cartGroup.add(wheel);

    // Ahşap Tutma Kolları & Destek Ayakları
    const handleGeo = new THREE.BoxGeometry(0.86, 0.04, 0.04);
    [-0.16, 0.16].forEach(hz => {
      const handle = new THREE.Mesh(handleGeo, woodMat);
      handle.position.set(0, 0, hz);
      handle.rotation.z = -0.15;
      cartGroup.add(handle);

      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.04), woodMat);
      leg.position.set(-0.22, -0.12, hz);
      cartGroup.add(leg);
    });

    group.add(cartGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      cartGroup.position.y = 0.36 + Math.sin(time * 3.0) * 0.02;
    };

    return group;
  }

  static _createLokomotifMesh(def) {
    const group = new THREE.Group();

    // Fasetli Antrasit Lokomotif Gövdesi (6 segmentli silindir)
    const boilerGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.72, 6);
    const boilerMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.5,
      flatShading: true
    });
    const boiler = new THREE.Mesh(boilerGeo, boilerMat);
    boiler.rotation.z = Math.PI / 2;
    boiler.position.set(-0.08, 0.44, 0);
    boiler.add(this._createOutline(boilerGeo, 0x020617, 0.04));
    group.add(boiler);

    // Kırmızı Fasetli Makinist Kabini
    const cabGeo = new THREE.BoxGeometry(0.42, 0.52, 0.5);
    const cabMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.6, flatShading: true });
    const cab = new THREE.Mesh(cabGeo, cabMat);
    cab.position.set(-0.35, 0.56, 0);
    cab.add(this._createOutline(cabGeo, 0x991b1b, 0.04));
    group.add(cab);

    // Fasetli Duman Bacası
    const stackGeo = new THREE.CylinderGeometry(0.09, 0.12, 0.32, 6);
    const stackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, flatShading: true });
    const stack = new THREE.Mesh(stackGeo, stackMat);
    stack.position.set(0.24, 0.76, 0);
    stack.add(this._createOutline(stackGeo, 0x020617, 0.035));
    group.add(stack);

    // Sarı Fasetli Ön Far Lambası
    const lampGeo = new THREE.ConeGeometry(0.08, 0.12, 5);
    lampGeo.rotateZ(-Math.PI / 2);
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.set(0.3, 0.44, 0);
    group.add(lamp);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 3) * 0.02;
    };

    return group;
  }

  static _createAmpulMesh(def) {
    const group = new THREE.Group();

    // Fasetli Düşük Poligon Cam Ampul (Icosahedron 0-subdivision)
    const bulbGeo = new THREE.IcosahedronGeometry(0.42, 0);
    const bulbMat = new THREE.MeshPhysicalMaterial({
      color: 0xfacc15,
      emissive: 0xfef08a,
      emissiveIntensity: 0.95,
      transmission: 0.75,
      opacity: 0.95,
      transparent: true,
      roughness: 0.15,
      flatShading: true
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = 0.58;
    bulb.add(this._createOutline(bulbGeo, 0xca8a04, 0.035));
    group.add(bulb);

    // Fasetli Vidalı Metal Taban (6 segmentli silindir)
    const baseGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.28, 6);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.2;
    base.add(this._createOutline(baseGeo, 0x334155, 0.035));
    group.add(base);

    const light = new THREE.PointLight(0xffea00, 2.5, 3.5);
    light.position.set(0, 0.58, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      light.intensity = 2.2 + Math.sin(time * 8) * 0.5;
    };

    return group;
  }

  static _createFenerMesh(def) {
    const group = new THREE.Group();

    // Fasetli Altıgen Cam Fanus
    const frameGeo = new THREE.CylinderGeometry(0.26, 0.3, 0.62, 6);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
      flatShading: true
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.42;
    frame.add(this._createOutline(frameGeo, 0x78350f, 0.04));
    group.add(frame);

    // Fasetli Pirinç Şapka
    const capGeo = new THREE.ConeGeometry(0.34, 0.18, 6);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.8;
    cap.add(this._createOutline(capGeo, 0xb45309, 0.035));
    group.add(cap);

    // Askı Halkası
    const ringGeo = new THREE.TorusGeometry(0.12, 0.025, 4, 6);
    const ring = new THREE.Mesh(ringGeo, capMat);
    ring.position.set(0, 0.95, 0);
    group.add(ring);

    const light = new THREE.PointLight(0xffd700, 2.2, 3);
    light.position.set(0, 0.45, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      frame.position.y = 0.42 + Math.sin(time * 2.5) * 0.02;
    };

    return group;
  }

  static _createPusulaMesh(def) {
    const group = new THREE.Group();

    // Fasetli Pirinç Gövde (8 segmentli sekizgen kasa)
    const caseGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.1, 8);
    const caseMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const casing = new THREE.Mesh(caseGeo, caseMat);
    casing.position.y = 0.06;
    casing.add(this._createOutline(caseGeo, 0xb45309, 0.04));
    group.add(casing);

    // Fasetli Beyaz Kadran
    const dialGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.02, 8);
    const dialMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5, flatShading: true });
    const dial = new THREE.Mesh(dialGeo, dialMat);
    dial.position.y = 0.12;
    group.add(dial);

    // Kırmızı Kuzey İbresi (Fasetli prizma)
    const needleNGeo = new THREE.ConeGeometry(0.08, 0.35, 4);
    needleNGeo.scale(1, 1, 0.2);
    const needleNMat = new THREE.MeshStandardMaterial({ color: 0xef4444, flatShading: true });
    const needleN = new THREE.Mesh(needleNGeo, needleNMat);
    needleN.position.set(0, 0.14, 0.15);
    needleN.rotation.x = -Math.PI / 2;
    group.add(needleN);

    // Mavi Güney İbresi
    const needleSMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, flatShading: true });
    const needleS = new THREE.Mesh(needleNGeo, needleSMat);
    needleS.position.set(0, 0.14, -0.15);
    needleS.rotation.x = Math.PI / 2;
    group.add(needleS);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      needleN.rotation.z = Math.sin(time * 2) * 0.2;
      needleS.rotation.z = Math.sin(time * 2) * 0.2;
    };

    return group;
  }

  static _createMiknatisMesh(def) {
    const group = new THREE.Group();

    // Fasetli Klasik At Nalı Mıknatıs (Merkezlenmiş, tablosuz)
    const magnetGroup = new THREE.Group();
    magnetGroup.position.set(0, 0.44, 0);

    const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.45, roughness: 0.35, flatShading: true });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.45, roughness: 0.35, flatShading: true });
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.9, flatShading: true });

    // U-Şekli At Nalı Yayı
    const uGeo = new THREE.TorusGeometry(0.28, 0.08, 5, 8, Math.PI);
    uGeo.rotateZ(Math.PI);
    const uMesh = new THREE.Mesh(uGeo, redMat);
    uMesh.add(this._createOutline(uGeo, 0x991b1b, 0.035));
    magnetGroup.add(uMesh);

    // Sol Bacak (Kırmızı - N)
    const legRed = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.26, 5), redMat);
    legRed.position.set(-0.28, -0.13, 0);
    magnetGroup.add(legRed);

    // Sağ Bacak (Mavi - S)
    const legBlue = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.26, 5), blueMat);
    legBlue.position.set(0.28, -0.13, 0);
    magnetGroup.add(legBlue);

    // Gümüş Kutup Uçları
    const tipGeo = new THREE.CylinderGeometry(0.082, 0.082, 0.1, 5);
    const tipLeft = new THREE.Mesh(tipGeo, silverMat);
    tipLeft.position.set(-0.28, -0.3, 0);
    magnetGroup.add(tipLeft);

    const tipRight = new THREE.Mesh(tipGeo, silverMat);
    tipRight.position.set(0.28, -0.3, 0);
    magnetGroup.add(tipRight);

    // Manyetik Alan Parıltı Işığı
    const light = new THREE.PointLight(0x60a5fa, 2.2, 2.5);
    light.position.set(0, -0.22, 0.1);
    magnetGroup.add(light);

    // Çekilen Manyetik Demir Talaşları
    const chipMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, flatShading: true });
    [-0.28, 0.28].forEach(cx => {
      const chip = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), chipMat);
      chip.position.set(cx, -0.38, 0);
      magnetGroup.add(chip);
    });

    group.add(magnetGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      magnetGroup.position.y = 0.44 + Math.sin(time * 3.5) * 0.03;
      light.intensity = 2.0 + Math.sin(time * 6.0) * 0.6;
    };

    return group;
  }

  static _createElektrikMotoruMesh(def) {
    const group = new THREE.Group();

    // Fasetli Mavi Endüstriyel Döküm Gövde (6 segmentli silindir)
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.62, 6);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.6,
      roughness: 0.4,
      flatShading: true
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.38;
    body.rotation.z = Math.PI / 2;
    body.add(this._createOutline(bodyGeo, 0x0369a1, 0.04));
    group.add(body);

    // Fasetli Bakır Bobin Sargısı
    const coilGeo = new THREE.TorusGeometry(0.37, 0.06, 5, 8);
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const coil = new THREE.Mesh(coilGeo, coilMat);
    coil.position.set(0, 0.38, 0);
    coil.rotation.y = Math.PI / 2;
    group.add(coil);

    // Fasetli Çelik Mil (4 segmentli)
    const shaftGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.88, 4);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15,
      flatShading: true
    });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 0.38;
    shaft.rotation.z = Math.PI / 2;
    group.add(shaft);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      shaft.rotation.x += dt * 6;
    };

    return group;
  }

  // Kategori 7 3D Mesh Üreteçleri
  static _createCelikKulceMesh(def) {
    const group = new THREE.Group();

    // Fasetli Temperli Mavi-Gümüş Çelik Külçeler
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      metalness: 0.95,
      roughness: 0.15,
      flatShading: true
    });

    const createSteelIngot = (x, y, z, rotY, scale = 1.0) => {
      const ingot = new THREE.Group();
      const geo = new THREE.BoxGeometry(0.56 * scale, 0.16 * scale, 0.28 * scale);
      const mesh = new THREE.Mesh(geo, steelMat);
      mesh.add(this._createOutline(geo, 0x0369a1, 0.035));
      ingot.add(mesh);

      // Çelik Damgası
      const stamp = new THREE.Mesh(new THREE.BoxGeometry(0.24 * scale, 0.02, 0.1 * scale), new THREE.MeshBasicMaterial({ color: 0x0c4a6e }));
      stamp.position.y = 0.085 * scale;
      ingot.add(stamp);

      ingot.position.set(x, y, z);
      ingot.rotation.y = rotY;
      return ingot;
    };

    // Doğrudan istiflenmiş 3 çelik külçe (alt tabla/tablo YOK, merkezli)
    group.add(createSteelIngot(-0.14, 0.22, -0.06, 0.12, 1.05));
    group.add(createSteelIngot(0.14, 0.22, 0.08, -0.15, 1.05));
    group.add(createSteelIngot(0, 0.38, 0.02, 0.25, 1.0));

    // Mavi Çelik Pırıltısı
    const light = new THREE.PointLight(0x38bdf8, 2.2, 2.5);
    light.position.set(0, 0.5, 0.2);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      light.intensity = 2.0 + Math.sin(time * 3.5) * 0.6;
    };

    return group;
  }

  static _createOrsMesh(def) {
    const group = new THREE.Group();

    // Fasetli Dökme Demir Taban
    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true
    });

    const baseGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.22, 4);
    const base = new THREE.Mesh(baseGeo, ironMat);
    base.position.y = 0.11;
    base.rotation.y = Math.PI / 4;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.04));
    group.add(base);

    // Orta boyun sütunu
    const waistGeo = new THREE.BoxGeometry(0.32, 0.2, 0.28);
    const waist = new THREE.Mesh(waistGeo, ironMat);
    waist.position.y = 0.28;
    group.add(waist);

    // Üst tabla
    const topGeo = new THREE.BoxGeometry(0.68, 0.22, 0.36);
    const topAnvil = new THREE.Mesh(topGeo, ironMat);
    topAnvil.position.y = 0.46;
    topAnvil.add(this._createOutline(topGeo, 0x0f172a, 0.04));
    group.add(topAnvil);

    // Örsün sivri boynuz ucu (horn)
    const hornGeo = new THREE.ConeGeometry(0.16, 0.38, 8);
    hornGeo.scale(0.8, 1, 0.6);
    const horn = new THREE.Mesh(hornGeo, ironMat);
    horn.rotation.z = -Math.PI / 2;
    horn.position.set(0.48, 0.46, 0);
    horn.add(this._createOutline(hornGeo, 0x0f172a, 0.035));
    group.add(horn);

    return group;
  }

  static _createCiviMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sivri Çelik Çivi Gövdesi (5 segmentli konik prizma)
    const shaftGeo = new THREE.CylinderGeometry(0.04, 0.015, 0.65, 5);
    const nailMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const shaft = new THREE.Mesh(shaftGeo, nailMat);
    shaft.position.y = 0.32;
    shaft.add(this._createOutline(shaftGeo, 0x334155, 0.03));
    group.add(shaft);

    // Fasetli Geniş Çivi Başı (6 segmentli altıgen tabla)
    const headGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.05, 6);
    const head = new THREE.Mesh(headGeo, nailMat);
    head.position.y = 0.65;
    head.add(this._createOutline(headGeo, 0x1e293b, 0.03));
    group.add(head);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2) * 0.02;
    };

    return group;
  }

  static _createTuglaMesh(def) {
    const group = new THREE.Group();

    // Fasetli Pişmiş Kırmızı Tuğla Gövdesi
    const geo = new THREE.BoxGeometry(0.65, 0.26, 0.36);
    const brickMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.8, flatShading: true });
    const brick = new THREE.Mesh(geo, brickMat);
    brick.position.y = 0.14;
    brick.add(this._createOutline(geo, 0x7c2d12, 0.035));
    group.add(brick);

    // Fasetli 3 Delik Oyuğu (Altıgen prizmalar)
    const holeMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.9, flatShading: true });
    [-0.18, 0, 0.18].forEach(hx => {
      const hGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.06, 6);
      const hole = new THREE.Mesh(hGeo, holeMat);
      hole.position.set(hx, 0.27, 0);
      group.add(hole);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createHarcMesh(def) {
    const group = new THREE.Group();

    // Fasetli Çimento Harç Yığını (Dodecahedron tepe)
    const moundGeo = new THREE.DodecahedronGeometry(0.42, 0);
    moundGeo.scale(1.2, 0.6, 1.1);
    const moundMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85, flatShading: true });
    const mound = new THREE.Mesh(moundGeo, moundMat);
    mound.position.y = 0.18;
    mound.add(this._createOutline(moundGeo, 0x475569, 0.035));
    group.add(mound);

    // Fasetli İnşaat Malası (Metal prizmatik bıçak + ahşap sap)
    const bladeGeo = new THREE.ConeGeometry(0.12, 0.3, 3);
    bladeGeo.scale(1, 0.1, 1);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.set(0.12, 0.34, 0.12);
    blade.rotation.set(0.6, 0.4, 0.8);
    group.add(blade);

    const handleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.18, 5);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.7, flatShading: true });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0.24, 0.44, 0.22);
    handle.rotation.set(0.6, 0.4, 0.8);
    group.add(handle);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createTuglaDuvarMesh(def) {
    const group = new THREE.Group();

    // Fasetli Tuğla Duvar Bloğu
    const wallGeo = new THREE.BoxGeometry(0.82, 0.65, 0.22);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.75, flatShading: true });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = 0.33;
    wall.add(this._createOutline(wallGeo, 0x7f1d1d, 0.04));
    group.add(wall);

    // Harç Derz Çizgileri
    const mortarMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.8, flatShading: true });
    [-0.12, 0.12].forEach(my => {
      const lineGeo = new THREE.BoxGeometry(0.83, 0.03, 0.23);
      const line = new THREE.Mesh(lineGeo, mortarMat);
      line.position.set(0, 0.33 + my, 0);
      group.add(line);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createSaglamSandikMesh(def) {
    const group = new THREE.Group();

    // Fasetli Meşe Ağacı Sandık Gövdesi
    const chestGeo = new THREE.BoxGeometry(0.74, 0.45, 0.48);
    const chestMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75, flatShading: true });
    const chest = new THREE.Mesh(chestGeo, chestMat);
    chest.position.y = 0.24;
    chest.add(this._createOutline(chestGeo, 0x451a03, 0.04));
    group.add(chest);

    // Fasetli Dövme Demir Kuşak Şeritleri
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true
    });
    [-0.22, 0.22].forEach(bx => {
      const bGeo = new THREE.BoxGeometry(0.06, 0.47, 0.5);
      const band = new THREE.Mesh(bGeo, bandMat);
      band.position.set(bx, 0.24, 0);
      group.add(band);
    });

    // Fasetli Altın Asma Kilit
    const lockGeo = new THREE.BoxGeometry(0.09, 0.11, 0.05);
    const lockMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const lock = new THREE.Mesh(lockGeo, lockMat);
    lock.position.set(0, 0.24, 0.25);
    group.add(lock);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createKristalMesh(def) {
    const group = new THREE.Group();

    // Fasetli Prizmatik Gök Mavisi Ana Kristal (Octahedron fasetli)
    const mainGeo = new THREE.OctahedronGeometry(0.42, 0);
    mainGeo.scale(0.8, 1.4, 0.8);
    const crysMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.9,
      flatShading: true
    });
    const crys = new THREE.Mesh(mainGeo, crysMat);
    crys.position.y = 0.45;
    crys.add(this._createOutline(mainGeo, 0x0369a1, 0.04));
    group.add(crys);

    // Yan Küçük Kristal Fasetleri
    const sideGeo = new THREE.OctahedronGeometry(0.24, 0);
    sideGeo.scale(0.7, 1.3, 0.7);
    [[-0.22, 0.26, 0.12, 0.4], [0.2, 0.22, -0.1, -0.45]].forEach(([sx, sy, sz, rz]) => {
      const sideCrys = new THREE.Mesh(sideGeo, crysMat);
      sideCrys.position.set(sx, sy, sz);
      sideCrys.rotation.z = rz;
      group.add(sideCrys);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      crys.position.y = 0.45 + Math.sin(time * 2.5) * 0.03;
    };

    return group;
  }

  static _createTeleskopMesh(def) {
    const group = new THREE.Group();

    // Fasetli Pirinç Teleskop Tüpü (6 segmentli silindir)
    const scopeGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.8, 6);
    const scopeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const scope = new THREE.Mesh(scopeGeo, scopeMat);
    scope.rotation.z = Math.PI / 4;
    scope.position.set(0, 0.55, 0);
    scope.add(this._createOutline(scopeGeo, 0xb45309, 0.035));
    group.add(scope);

    // Fasetli Ön Mercek Camı
    const lensGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.02, 6);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0.29, 0.84, 0);
    lens.rotation.z = Math.PI / 4;
    group.add(lens);

    // Fasetli Tripod Ayakları
    const legGeo = new THREE.CylinderGeometry(0.025, 0.02, 0.55, 4);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    [-0.3, 0, 0.3].forEach((angle, i) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(Math.sin(i * 2.1) * 0.18, 0.25, Math.cos(i * 2.1) * 0.18);
      leg.rotation.x = Math.cos(i * 2.1) * 0.3;
      leg.rotation.z = Math.sin(i * 2.1) * 0.3;
      group.add(leg);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createVincMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sarı Kule Gövdesi
    const towerGeo = new THREE.BoxGeometry(0.16, 0.85, 0.16);
    const craneMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.5,
      metalness: 0.2,
      flatShading: true
    });
    const tower = new THREE.Mesh(towerGeo, craneMat);
    tower.position.set(-0.15, 0.44, 0);
    tower.add(this._createOutline(towerGeo, 0xa16207, 0.035));
    group.add(tower);

    // Fasetli Yatay Bom Kolu
    const jibGeo = new THREE.BoxGeometry(0.85, 0.12, 0.12);
    const jib = new THREE.Mesh(jibGeo, craneMat);
    jib.position.set(0.18, 0.82, 0);
    jib.add(this._createOutline(jibGeo, 0xa16207, 0.035));
    group.add(jib);

    // Çelik Kablo ve Fasetli Kanca
    const cableGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.35, 4);
    const cableMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    const cable = new THREE.Mesh(cableGeo, cableMat);
    cable.position.set(0.48, 0.62, 0);
    group.add(cable);

    const hookGeo = new THREE.TorusGeometry(0.06, 0.02, 4, 8, Math.PI * 1.3);
    const hookMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const hook = new THREE.Mesh(hookGeo, hookMat);
    hook.position.set(0.48, 0.43, 0);
    group.add(hook);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      hook.position.y = 0.43 + Math.sin(time * 3) * 0.03;
    };

    return group;
  }

  // Kategori VIII 3D Mesh Üreteçleri
  static _createYildizTozuMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kozmik Mor Çekirdek (Icosahedron 0-subdivision)
    const coreGeo = new THREE.IcosahedronGeometry(0.35, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0xc084fc,
      emissiveIntensity: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.4;
    core.add(this._createOutline(coreGeo, 0x6b21a8, 0.04));
    group.add(core);

    // Yörüngede Dönen Fasetli Altın Yıldız Parçacıkları (Octahedron)
    const starGeo = new THREE.OctahedronGeometry(0.07, 0);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
    const stars = [];
    for (let i = 0; i < 6; i++) {
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);
      stars.push({ mesh: star, angle: (i / 6) * Math.PI * 2 });
    }

    const light = new THREE.PointLight(0xc084fc, 1.8, 2.5);
    light.position.set(0, 0.4, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      core.rotation.x += dt * 0.5;
      stars.forEach(s => {
        s.angle += dt * 1.5;
        s.mesh.position.set(
          Math.cos(s.angle) * 0.48,
          0.4 + Math.sin(s.angle * 2) * 0.12,
          Math.sin(s.angle) * 0.48
        );
        s.mesh.rotation.y += dt * 3;
      });
    };

    return group;
  }

  static _createPrizmaTasiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Gökkuşağı Kristal Prizması (3 yüzeyli piramit)
    const prismGeo = new THREE.ConeGeometry(0.38, 0.72, 3);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x818cf8,
      emissiveIntensity: 0.7,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.65,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    prism.position.y = 0.36;
    prism.add(this._createOutline(prismGeo, 0x4338ca, 0.035));
    group.add(prism);

    // Alt Oyma Antik Fasetli Taş Kaide
    const baseGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.12, 6);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8, flatShading: true });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.06;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.035));
    group.add(base);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      prism.position.y = 0.36 + Math.sin(time * 2) * 0.02;
    };

    return group;
  }

  static _createKahinKuresiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Mor Sisli Kristal Küre (Dodecahedron 0-subdivision)
    const orbGeo = new THREE.DodecahedronGeometry(0.38, 0);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0xa855f7,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 0.52;
    orb.add(this._createOutline(orbGeo, 0x3730a3, 0.04));
    group.add(orb);

    // Fasetli Altın Kaide (6 segmentli silindir)
    const standGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.22, 6);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = 0.11;
    stand.add(this._createOutline(standGeo, 0xb45309, 0.035));
    group.add(stand);

    const light = new THREE.PointLight(0xa855f7, 2.0, 2.5);
    light.position.set(0, 0.52, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      orb.rotation.x += dt * 0.8;
      orb.rotation.z += dt * 0.5;
    };

    return group;
  }

  static _createPortalRunuMesh(def) {
    const group = new THREE.Group();

    // Fasetli Pembe-Macenta Runik Halka (8 segmentli Torus)
    const ringGeo = new THREE.TorusGeometry(0.42, 0.07, 5, 8);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.95,
      roughness: 0.25,
      flatShading: true
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.22;
    ring.add(this._createOutline(ringGeo, 0x9d174d, 0.035));
    group.add(ring);

    // Ortadaki Parlayan Fasetli Boyut Diski (Sekizgen)
    const discGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.02, 8);
    const discMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.y = 0.22;
    group.add(disc);

    // Havada süzülen rünik faset parçacığı
    const sparkGeo = new THREE.OctahedronGeometry(0.08, 0);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfbcfe8 });
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.set(0, 0.45, 0);
    group.add(spark);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      disc.rotation.y += dt * 1.5;
      spark.position.y = 0.45 + Math.sin(time * 4) * 0.08;
      spark.rotation.x += dt * 3;
    };

    return group;
  }

  static _createBoslukSisesiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Koyu Lacivert/Mor Esrarlı Cam Şişe (6 segmentli)
    const bottleGeo = new THREE.CylinderGeometry(0.24, 0.36, 0.58, 6);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.32;
    bottle.add(this._createOutline(bottleGeo, 0x0f172a, 0.035));
    group.add(bottle);

    // Fasetli Mantar Tıpa
    const corkGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.14, 6);
    const corkMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7, flatShading: true });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.66;
    group.add(cork);

    // Şişe içindeki kozmik yıldız tanesi
    const starGeo = new THREE.OctahedronGeometry(0.08, 0);
    const starMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.set(0, 0.32, 0);
    group.add(star);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      star.position.y = 0.32 + Math.sin(time * 3) * 0.04;
      star.rotation.y += dt * 2;
    };

    return group;
  }

  static _createBoyutKapisiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kadim Obsidyen Kemer Kapı İskeleti
    const frameGeo = new THREE.BoxGeometry(0.85, 1.05, 0.16);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.7,
      metalness: 0.4,
      flatShading: true
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.52;
    frame.add(this._createOutline(frameGeo, 0x0f172a, 0.04));
    group.add(frame);

    // Fasetli Mor Boyut Perdesi
    const portalGeo = new THREE.BoxGeometry(0.55, 0.82, 0.04);
    const portalMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xc084fc,
      emissiveIntensity: 1.1,
      roughness: 0.2,
      flatShading: true
    });
    const portal = new THREE.Mesh(portalGeo, portalMat);
    portal.position.set(0, 0.5, 0.02);
    group.add(portal);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      portal.scale.set(
        1 + Math.sin(time * 3) * 0.03,
        1 + Math.cos(time * 4) * 0.03,
        1
      );
    };

    return group;
  }

  static _createAnkaKuluMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kutsal Altın/Kırmızı Anka Vazosu (6 segmentli silindir)
    const urnGeo = new THREE.CylinderGeometry(0.24, 0.36, 0.48, 6);
    const urnMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      metalness: 0.65,
      roughness: 0.35,
      emissive: 0xe11d48,
      emissiveIntensity: 0.5,
      flatShading: true
    });
    const urn = new THREE.Mesh(urnGeo, urnMat);
    urn.position.y = 0.25;
    urn.add(this._createOutline(urnGeo, 0x881337, 0.035));
    group.add(urn);

    // Yükselen Ebedi Anka Alevi (5 segmentli koni)
    const flameGeo = new THREE.ConeGeometry(0.18, 0.45, 5);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xef4444,
      emissiveIntensity: 1.0,
      flatShading: true
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.64;
    flame.add(this._createOutline(flameGeo, 0xb45309, 0.03));
    group.add(flame);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      flame.scale.set(
        1 + Math.sin(time * 6) * 0.15,
        1 + Math.cos(time * 8) * 0.18,
        1 + Math.sin(time * 5) * 0.15
      );
    };

    return group;
  }

  static _createRunikZirhMesh(def) {
    const group = new THREE.Group();

    // Fasetli Paladin Plaka Zırhı (Tablosuz, heybetli ve merkezli)
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      flatShading: true
    });

    const chestGeo = new THREE.CylinderGeometry(0.38, 0.28, 0.66, 6);
    chestGeo.scale(1.15, 1.0, 0.8);
    const chest = new THREE.Mesh(chestGeo, armorMat);
    chest.position.y = 0.44;
    chest.add(this._createOutline(chestGeo, 0x0284c7, 0.04));
    group.add(chest);

    // Göğüsteki Parlayan Antik Rünik Sembol
    const runeGeo = new THREE.OctahedronGeometry(0.14, 0);
    const rune = new THREE.Mesh(runeGeo, runeMat);
    rune.position.set(0, 0.48, 0.24);
    group.add(rune);

    // Heybetli Katmanlı Omuzluklar
    [-0.42, 0.42].forEach(px => {
      const pauldronGeo = new THREE.DodecahedronGeometry(0.18, 0);
      pauldronGeo.scale(1.2, 0.8, 1.0);
      const pauldron = new THREE.Mesh(pauldronGeo, armorMat);
      pauldron.position.set(px, 0.68, 0);
      pauldron.add(this._createOutline(pauldronGeo, 0x0284c7, 0.035));
      group.add(pauldron);
    });

    // Mavi Büyü Parıltısı
    const light = new THREE.PointLight(0x38bdf8, 2.4, 2.5);
    light.position.set(0, 0.5, 0.28);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const pulse = 0.85 + Math.sin(time * 3.0) * 0.25;
      rune.scale.setScalar(pulse);
      light.intensity = 1.8 + pulse * 0.8;
    };

    return group;
  }

  static _createFirtinaKiliciMesh(def) {
    const group = new THREE.Group();

    // Fasetli Şimşek Mavisi Efsanevi Namlu (Prizmatik)
    const bladeGeo = new THREE.ConeGeometry(0.14, 1.1, 4);
    bladeGeo.scale(1, 1, 0.3);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.95,
      flatShading: true
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.72;
    blade.add(this._createOutline(bladeGeo, 0x0369a1, 0.035));
    group.add(blade);

    // Altın Yıldırım Balçak
    const guardGeo = new THREE.BoxGeometry(0.48, 0.08, 0.1);
    const guardMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const guard = new THREE.Mesh(guardGeo, guardMat);
    guard.position.y = 0.22;
    guard.add(this._createOutline(guardGeo, 0xb45309, 0.03));
    group.add(guard);

    // Fasetli Kabza
    const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 6);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8, flatShading: true });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.08;
    group.add(handle);

    // Fasetli Şimşek Kıvılcımı
    const sparkGeo = new THREE.TetrahedronGeometry(0.08, 0);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.set(0.12, 0.6, 0);
    group.add(spark);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      spark.position.y = 0.6 + Math.sin(time * 6) * 0.15;
      spark.rotation.z += dt * 4;
    };

    return group;
  }

  static _createYildizGecidiCekirdegiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Nabız Gibi Atan Eflatun Kozmik Çekirdek (Icosahedron 0-subdivision)
    const coreGeo = new THREE.IcosahedronGeometry(0.36, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0xf43f5e,
      emissiveIntensity: 1.1,
      roughness: 0.15,
      flatShading: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.45;
    core.add(this._createOutline(coreGeo, 0x9d174d, 0.04));
    group.add(core);

    // Fasetli Turkuaz Dış Halka (8 segmentli Torus)
    const ring1Geo = new THREE.TorusGeometry(0.55, 0.04, 4, 8);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.85,
      flatShading: true
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.y = 0.45;
    group.add(ring1);

    // Fasetli Altın İkinci Halka (8 segmentli Torus)
    const ring2Geo = new THREE.TorusGeometry(0.62, 0.035, 4, 8);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.6,
      flatShading: true
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.position.y = 0.45;
    group.add(ring2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ring1.rotation.x += dt * 1.5;
      ring2.rotation.y += dt * 1.2;
      core.scale.setScalar(1 + Math.sin(time * 5) * 0.08);
    };

    return group;
  }

  // === 32 Yeni Eşya 3D Mesh Üreteçleri ===
  static _createKarMesh(def) {
    const group = new THREE.Group();

    // Fasetli 6 Kollu Kristal Kar Tanesi (Snowflake)
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0xe2e8f0,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      flatShading: true
    });

    // Fasetli Merkez Göbek (6 segmentli)
    const centerGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 6);
    const center = new THREE.Mesh(centerGeo, snowMat);
    center.position.y = 0.45;
    center.rotation.x = Math.PI / 2;
    center.add(this._createOutline(centerGeo, 0x94a3b8, 0.04));
    group.add(center);

    // 6 Fasetli Radyal Kristal Kolu
    for (let i = 0; i < 6; i++) {
      const armGroup = new THREE.Group();
      armGroup.position.y = 0.45;
      armGroup.rotation.z = (i * Math.PI) / 3;

      const armGeo = new THREE.BoxGeometry(0.08, 0.65, 0.06);
      const arm = new THREE.Mesh(armGeo, snowMat);
      arm.position.y = 0.35;
      arm.add(this._createOutline(armGeo, 0x94a3b8, 0.035));
      armGroup.add(arm);

      // Kolların ucundaki yan V dalları
      const branchGeo = new THREE.BoxGeometry(0.05, 0.22, 0.05);
      const b1 = new THREE.Mesh(branchGeo, snowMat);
      b1.position.set(-0.08, 0.45, 0);
      b1.rotation.z = 0.6;
      armGroup.add(b1);

      const b2 = new THREE.Mesh(branchGeo, snowMat);
      b2.position.set(0.08, 0.45, 0);
      b2.rotation.z = -0.6;
      armGroup.add(b2);

      group.add(armGroup);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2) * 0.04;
    };

    return group;
  }

  static _createBuzMesh(def) {
    const group = new THREE.Group();

    // Fasetli Yontulmuş Buz Küpü (Düşük poligonlu prizma)
    const iceGeo = new THREE.BoxGeometry(0.68, 0.68, 0.68);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.85,
      opacity: 0.88,
      transparent: true,
      ior: 1.31,
      emissive: 0x7dd3fc,
      emissiveIntensity: 0.35,
      flatShading: true
    });

    const ice = new THREE.Mesh(iceGeo, iceMat);
    ice.position.y = 0.42;
    ice.rotation.y = 0.2;
    ice.add(this._createOutline(iceGeo, 0x0284c7, 0.035));
    group.add(ice);

    // Üstte Beyaz Buz Don Faseti (Tetrahedron highlight)
    const frostGeo = new THREE.TetrahedronGeometry(0.22, 0);
    const frostMat = new THREE.MeshStandardMaterial({ color: 0xf0f9ff, roughness: 0.4, flatShading: true });
    const frost = new THREE.Mesh(frostGeo, frostMat);
    frost.position.set(0.2, 0.68, 0.2);
    group.add(frost);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ice.rotation.x = Math.sin(time * 1.5) * 0.05;
    };

    return group;
  }

  static _createColMesh(def) {
    const group = new THREE.Group();

    const duneMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.85,
      flatShading: true
    });

    // Ana Fasetli Kum Tepesi (6 segmentli koni)
    const d1Geo = new THREE.ConeGeometry(0.85, 0.45, 6);
    d1Geo.scale(1.3, 1, 0.8);
    const d1 = new THREE.Mesh(d1Geo, duneMat);
    d1.position.set(-0.15, 0.22, 0);
    d1.add(this._createOutline(d1Geo, 0xb45309, 0.04));
    group.add(d1);

    // İkinci Arka Fasetli Kum Tepesi (5 segmentli koni)
    const d2Geo = new THREE.ConeGeometry(0.65, 0.38, 5);
    d2Geo.scale(1.1, 1, 0.7);
    const d2 = new THREE.Mesh(d2Geo, duneMat);
    d2.position.set(0.35, 0.18, -0.2);
    d2.add(this._createOutline(d2Geo, 0xb45309, 0.035));
    group.add(d2);

    // Fasetli Kum Saati Taneciği / Çöl Taşı
    const stoneGeo = new THREE.DodecahedronGeometry(0.12, 0);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9, flatShading: true });
    const stone = new THREE.Mesh(stoneGeo, stoneMat);
    stone.position.set(0.1, 0.32, 0.25);
    group.add(stone);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createTohumMesh(def) {
    const group = new THREE.Group();

    // Fasetli Tohum Taneleri Kümesi (Dodecahedron 0-subdivision)
    const seedMat = new THREE.MeshStandardMaterial({
      color: 0xca8a04,
      roughness: 0.6,
      flatShading: true
    });

    const seeds = [
      { x: -0.15, y: 0.18, z: 0.08, r: 0.16, sy: 1.6 },
      { x: 0.12, y: 0.22, z: -0.05, r: 0.18, sy: 1.7 },
      { x: 0, y: 0.28, z: 0.15, r: 0.14, sy: 1.5 }
    ];

    seeds.forEach(s => {
      const sGeo = new THREE.DodecahedronGeometry(s.r, 0);
      sGeo.scale(1, s.sy, 0.85);
      const mesh = new THREE.Mesh(sGeo, seedMat);
      mesh.position.set(s.x, s.y, s.z);
      mesh.rotation.z = s.x * 0.8;
      mesh.add(this._createOutline(sGeo, 0x713f12, 0.04));
      group.add(mesh);
    });

    // Minik Yeşil Yaşam Pırıltısı (Filiz başlangıcı)
    const sproutGeo = new THREE.TetrahedronGeometry(0.08, 0);
    const sproutMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    const sprout = new THREE.Mesh(sproutGeo, sproutMat);
    sprout.position.set(0, 0.44, 0.12);
    group.add(sprout);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      sprout.position.y = 0.44 + Math.sin(time * 3) * 0.03;
    };

    return group;
  }

  static _createBugdayMesh(def) {
    const group = new THREE.Group();

    // Fasetli Altın Sarısı Buğday Sapı
    const wheatMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.5, flatShading: true });
    const stemGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.95, 5);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.7, flatShading: true });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.45;
    stem.rotation.z = -0.12;
    stem.add(this._createOutline(stemGeo, 0x854d0e, 0.035));
    group.add(stem);

    // Başaktaki Fasetli Taneler (6 çift simetrik 4-kenarlı piramit)
    for (let i = 0; i < 6; i++) {
      [-0.12, 0.12].forEach(side => {
        const grainGeo = new THREE.ConeGeometry(0.08, 0.22, 4);
        const grain = new THREE.Mesh(grainGeo, wheatMat);
        grain.position.set(side, 0.45 + i * 0.1, 0);
        grain.rotation.z = side < 0 ? 0.6 : -0.6;
        grain.add(this._createOutline(grainGeo, 0x854d0e, 0.035));
        group.add(grain);
      });
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.rotation.z = Math.sin(time * 2) * 0.05;
    };

    return group;
  }

  static _createNaneMesh(def) {
    const group = new THREE.Group();

    // Fasetli Canlı Yeşil Nane Yaprakları Grubu (Tablosuz, merkezli)
    const mintGroup = new THREE.Group();
    mintGroup.position.set(0, 0.42, 0);

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.55,
      flatShading: true
    });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x059669, flatShading: true });

    // Ana Nane Sapı
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.6, 5), stemMat);
    mintGroup.add(stem);

    // Çapraz 4 Fasetli Nane Yaprağı (Büyütülmüş ve zengin)
    const leafGeo = new THREE.ConeGeometry(0.22, 0.52, 4);
    leafGeo.scale(0.85, 1.0, 0.25);

    [[0.2, 0.05, 0, 0.6], [-0.2, 0.05, 0, -0.6], [0, 0.2, 0.2, 0.5], [0, 0.2, -0.2, -0.5]].forEach(([lx, ly, lz, rotZ]) => {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(lx, ly, lz);
      leaf.rotation.z = rotZ;
      leaf.add(this._createOutline(leafGeo, 0x047857, 0.03));
      mintGroup.add(leaf);
    });

    // Ferahlatıcı Çiğ Damlası Kristali
    const dewMat = new THREE.MeshBasicMaterial({ color: 0xa7f3d0 });
    const dew = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), dewMat);
    dew.position.set(0.05, 0.32, 0.1);
    mintGroup.add(dew);

    group.add(mintGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      dew.position.y = 0.32 + Math.sin(time * 3.0) * 0.025;
      mintGroup.position.y = 0.42 + Math.sin(time * 2.0) * 0.02;
    };

    return group;
  }

  static _createAgacKabuguMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kavisli Ağaç Kabuğu (6 segmentli açık silindir)
    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.85,
      side: THREE.DoubleSide,
      flatShading: true
    });

    const barkGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.75, 6, 1, true, 0, Math.PI * 0.9);
    const bark = new THREE.Mesh(barkGeo, barkMat);
    bark.position.y = 0.38;
    bark.rotation.y = 0.3;
    bark.add(this._createOutline(barkGeo, 0x451a03, 0.04));
    group.add(bark);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createInekMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Çayır Kaidesi
    const meadowGeo = new THREE.CylinderGeometry(0.54, 0.58, 0.08, 6);
    const meadowMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.8,
      flatShading: true
    });
    const meadow = new THREE.Mesh(meadowGeo, meadowMat);
    meadow.position.y = 0.06;
    meadow.add(this._createOutline(meadowGeo, 0x14532d, 0.035));
    group.add(meadow);

    // 2. Fasetli Siyah-Beyaz Holstein Gövdesi
    const cowWhite = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.65, flatShading: true });
    const cowBlack = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.7, flatShading: true });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.6, flatShading: true });

    const bodyGeo = new THREE.BoxGeometry(0.5, 0.44, 0.72);
    const body = new THREE.Mesh(bodyGeo, cowWhite);
    body.position.set(0, 0.48, 0);
    body.add(this._createOutline(bodyGeo, 0x09090b, 0.035));
    group.add(body);

    // Siyah Benekler
    const spot1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.32), cowBlack);
    spot1.position.set(0.18, 0.52, -0.1);
    group.add(spot1);

    const spot2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.26, 0.28), cowBlack);
    spot2.position.set(-0.16, 0.46, 0.12);
    group.add(spot2);

    // Pembe Meme
    const udder = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.24), pinkMat);
    udder.position.set(0, 0.24, -0.12);
    group.add(udder);

    // 3. Fasetli 4 Sağlam Bacak ve Toynaklar
    const legGeo = new THREE.CylinderGeometry(0.055, 0.05, 0.34, 5);
    const hoofMat = new THREE.MeshStandardMaterial({ color: 0x27272a, flatShading: true });
    [[-0.18, -0.24], [0.18, -0.24], [-0.18, 0.24], [0.18, 0.24]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, cowWhite);
      leg.position.set(lx, 0.23, lz);
      group.add(leg);

      const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.08), hoofMat);
      hoof.position.set(lx, 0.08, lz);
      group.add(hoof);
    });

    // 4. Kafa, Pembe Ağız/Burun ve Çan
    const headGeo = new THREE.BoxGeometry(0.3, 0.3, 0.32);
    const head = new THREE.Mesh(headGeo, cowWhite);
    head.position.set(0, 0.65, 0.42);
    head.add(this._createOutline(headGeo, 0x09090b, 0.035));
    group.add(head);

    // Kafa beneği
    const headSpot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.33), cowBlack);
    headSpot.position.set(0.09, 0.7, 0.42);
    group.add(headSpot);

    // Pembe Burun
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.16), pinkMat);
    snout.position.set(0, 0.56, 0.6);
    group.add(snout);

    // Siyah burun delikleri
    const nostrilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    [-0.07, 0.07].forEach(nx => {
      const nos = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), nostrilMat);
      nos.position.set(nx, 0.58, 0.68);
      group.add(nos);
    });

    // Siyah boncuk gözler
    [-0.12, 0.12].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), nostrilMat);
      eye.position.set(ex, 0.72, 0.52);
      group.add(eye);
    });

    // Minik Fasetli Boynuzlar
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, flatShading: true });
    [-0.14, 0.14].forEach((hx, i) => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.12, 4), hornMat);
      horn.position.set(hx, 0.85, 0.38);
      horn.rotation.set(-0.2, 0, i === 0 ? -0.4 : 0.4);
      group.add(horn);
    });

    // Altın sarısı boyun çanı
    const bellMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.6, flatShading: true });
    const bell = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.1, 5), bellMat);
    bell.position.set(0, 0.46, 0.52);
    group.add(bell);

    // 5. Püsküllü Kuyruk
    const tailGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.36, 4);
    const tail = new THREE.Mesh(tailGeo, cowWhite);
    tail.position.set(0, 0.44, -0.38);
    tail.rotation.x = -0.3;
    group.add(tail);

    const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 4), cowBlack);
    tuft.position.set(0, 0.26, -0.44);
    group.add(tuft);

    // 60 FPS Canlı Çiğneme ve Kuyruk Sallama
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      snout.position.x = Math.sin(time * 3.5) * 0.015;
      tail.rotation.z = Math.sin(time * 3.0) * 0.2;
    };

    return group;
  }

  static _createSutMesh(def) {
    const group = new THREE.Group();

    // Fasetli Rustik Kil Süt Güğümü (6 segmentli)
    const jugGeo = new THREE.CylinderGeometry(0.28, 0.36, 0.55, 6);
    const jugMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7, flatShading: true });
    const jug = new THREE.Mesh(jugGeo, jugMat);
    jug.position.y = 0.32;
    jug.add(this._createOutline(jugGeo, 0x78350f, 0.04));
    group.add(jug);

    // Fasetli Beyaz Süt Üst Yüzeyi (6 segmentli disk)
    const milkGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.02, 6);
    const milkMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, flatShading: true });
    const milk = new THREE.Mesh(milkGeo, milkMat);
    milk.position.set(0, 0.59, 0);
    group.add(milk);

    // Süt Damlası (Tetrahedron)
    const dropGeo = new THREE.TetrahedronGeometry(0.08, 0);
    const drop = new THREE.Mesh(dropGeo, milkMat);
    drop.position.set(0, 0.75, 0);
    group.add(drop);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      drop.position.y = 0.75 + Math.sin(time * 4) * 0.05;
    };

    return group;
  }

  static _createYumurtaMesh(def) {
    const group = new THREE.Group();

    // Fasetli Dodecahedron Yumurta Formu
    const eggGeo = new THREE.DodecahedronGeometry(0.35, 0);
    eggGeo.scale(1, 1.35, 1);
    const eggMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      roughness: 0.5,
      flatShading: true
    });
    const egg = new THREE.Mesh(eggGeo, eggMat);
    egg.position.y = 0.42;
    egg.add(this._createOutline(eggGeo, 0xd97706, 0.04));
    group.add(egg);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      egg.rotation.z = Math.sin(time * 2) * 0.08;
    };

    return group;
  }

  static _createMercanMesh(def) {
    const group = new THREE.Group();

    // Fasetli Çatallanan Canlı Mercan Gövdesi
    const coralMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.55, flatShading: true });

    // Ana Gövde (5 segmentli silindir)
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.65, 5);
    const stem = new THREE.Mesh(stemGeo, coralMat);
    stem.position.y = 0.32;
    stem.add(this._createOutline(stemGeo, 0x9f1239, 0.035));
    group.add(stem);

    // Yan Kollar (5 segmentli silindirler)
    [
      { ang: 0.45, x: 0.18, y: 0.45, z: 0 },
      { ang: -0.5, x: -0.16, y: 0.38, z: 0.05 },
      { ang: 0.3, x: 0.05, y: 0.62, z: -0.1 }
    ].forEach(b => {
      const bGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.4, 5);
      const branch = new THREE.Mesh(bGeo, coralMat);
      branch.position.set(b.x, b.y, b.z);
      branch.rotation.z = b.ang;
      branch.add(this._createOutline(bGeo, 0x9f1239, 0.03));
      group.add(branch);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2) * 0.02;
    };

    return group;
  }

  static _createOltaMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap Olta Kamışı (5 segmentli ince silindir)
    const rodGeo = new THREE.CylinderGeometry(0.025, 0.04, 1.15, 5);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.75, flatShading: true });
    const rod = new THREE.Mesh(rodGeo, rodMat);
    rod.position.set(-0.15, 0.45, 0);
    rod.rotation.z = -Math.PI / 4;
    rod.add(this._createOutline(rodGeo, 0x451a03, 0.035));
    group.add(rod);

    // Misina Teli
    const lineGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.55, 4);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.set(0.25, 0.55, 0);
    group.add(line);

    // Fasetli Metal Kanca (Torus)
    const hookGeo = new THREE.TorusGeometry(0.06, 0.015, 4, 8, Math.PI * 1.3);
    const hookMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const hook = new THREE.Mesh(hookGeo, hookMat);
    hook.position.set(0.25, 0.28, 0);
    group.add(hook);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      hook.rotation.z = Math.sin(time * 3) * 0.15;
    };

    return group;
  }

  static _createYelkenMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap Direk (5 segmentli)
    const mastGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.05, 5);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.set(-0.25, 0.52, 0);
    mast.add(this._createOutline(mastGeo, 0x451a03, 0.035));
    group.add(mast);

    // Fasetli Üçgen Beyaz Yelken Bezi (4 segmentli koni prizma)
    const sailGeo = new THREE.ConeGeometry(0.42, 0.75, 4);
    sailGeo.scale(1, 1, 0.12);
    const sailMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5, flatShading: true });
    const sail = new THREE.Mesh(sailGeo, sailMat);
    sail.position.set(0.12, 0.52, 0);
    sail.rotation.z = -Math.PI / 2.2;
    sail.add(this._createOutline(sailGeo, 0x94a3b8, 0.035));
    group.add(sail);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      sail.rotation.x = Math.sin(time * 2) * 0.08;
    };

    return group;
  }

  static _createSalMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kütükler (6 segmentli silindirler)
    const logGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.85, 6);
    const logMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.8, flatShading: true });

    for (let i = -2; i <= 2; i++) {
      const log = new THREE.Mesh(logGeo, logMat);
      log.rotation.x = Math.PI / 2;
      log.position.set(i * 0.18, 0.15, 0);
      log.add(this._createOutline(logGeo, 0x451a03, 0.035));
      group.add(log);
    }

    // Fasetli Bağlama Halatları
    const bindGeo = new THREE.BoxGeometry(0.95, 0.04, 0.06);
    const bindMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7, flatShading: true });
    [-0.25, 0.25].forEach(bz => {
      const bMesh = new THREE.Mesh(bindGeo, bindMat);
      bMesh.position.set(0, 0.26, bz);
      group.add(bMesh);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2) * 0.02;
    };

    return group;
  }

  static _createObsidyenBicakMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap Sap
    const handleGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.45, 6);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.8, flatShading: true });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.2;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Koyu Mor-Siyah Keskin Fasetli Obsidyen Uç (4 segmentli piramit)
    const bladeGeo = new THREE.ConeGeometry(0.14, 0.65, 4);
    bladeGeo.scale(0.35, 1, 1);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.8,
      emissive: 0x3b0764,
      emissiveIntensity: 0.5,
      flatShading: true
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.68;
    blade.add(this._createOutline(bladeGeo, 0x020617, 0.04));
    group.add(blade);

    return group;
  }

  static _createPeynirMesh(def) {
    const group = new THREE.Group();

    // Fasetli Canlı Sarı Üçgen Peynir Dilimi (3 segmentli prizma)
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.5,
      flatShading: true
    });
    const cheeseGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.28, 3);
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.2;
    cheese.add(this._createOutline(cheeseGeo, 0xb45309, 0.04));
    group.add(cheese);

    // Üzerindeki Fasetli Peynir Delikleri
    const holeMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.7, flatShading: true });
    const holes = [[0.15, 0.28, 0.1], [-0.12, 0.28, 0.05], [0, 0.28, -0.15]];
    holes.forEach(([hx, hy, hz]) => {
      const hGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 6);
      const hole = new THREE.Mesh(hGeo, holeMat);
      hole.position.set(hx, hy, hz);
      group.add(hole);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createUnMesh(def) {
    const group = new THREE.Group();

    // Fasetli Bej Un Çuvalı (6 segmentli silindir)
    const sackGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.55, 6);
    const sackMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.8, flatShading: true });
    const sack = new THREE.Mesh(sackGeo, sackMat);
    sack.position.y = 0.28;
    sack.add(this._createOutline(sackGeo, 0xd97706, 0.035));
    group.add(sack);

    // Üstten Dökülen Fasetli Bembeyaz Un Tepeciği (6 segmentli koni)
    const flourGeo = new THREE.ConeGeometry(0.28, 0.22, 6);
    const flourMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true });
    const flour = new THREE.Mesh(flourGeo, flourMat);
    flour.position.y = 0.62;
    group.add(flour);

    // Havada süzülen un tanesi (Tetrahedron)
    const puffGeo = new THREE.TetrahedronGeometry(0.06, 0);
    const puff = new THREE.Mesh(puffGeo, flourMat);
    puff.position.set(0.12, 0.78, 0);
    group.add(puff);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      puff.position.y = 0.78 + Math.sin(time * 3) * 0.04;
      puff.rotation.x += dt * 2;
    };

    return group;
  }

  static _createHamurMesh(def) {
    const group = new THREE.Group();

    // Fasetli Kabarık Yuvarlak Ekmek Hamuru (Dodecahedron 0-subdivision)
    const doughGeo = new THREE.DodecahedronGeometry(0.42, 0);
    doughGeo.scale(1.25, 0.75, 1.15);
    const doughMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.7, flatShading: true });
    const dough = new THREE.Mesh(doughGeo, doughMat);
    dough.position.y = 0.25;
    dough.add(this._createOutline(doughGeo, 0xca8a04, 0.035));
    group.add(dough);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      dough.scale.set(
        1.25 + Math.sin(time * 2) * 0.04,
        0.75 + Math.cos(time * 2.5) * 0.03,
        1.15 + Math.sin(time * 2) * 0.04
      );
    };

    return group;
  }

  static _createEkmekMesh(def) {
    const group = new THREE.Group();

    // Fasetli Çıtır Köy Somunu (Artisan Loaf - Tablosuz, merkezli ve iri)
    const breadMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.65,
      flatShading: true
    });
    const flourMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      roughness: 0.8,
      flatShading: true
    });

    const loafGeo = new THREE.DodecahedronGeometry(0.35, 0);
    loafGeo.scale(1.45, 0.85, 1.05);
    const loaf = new THREE.Mesh(loafGeo, breadMat);
    loaf.position.set(0, 0.36, 0);
    loaf.add(this._createOutline(loafGeo, 0x92400e, 0.035));
    group.add(loaf);

    // Üstteki Fasetli Un Serpintisi
    const flour = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), flourMat);
    flour.position.set(0, 0.54, 0);
    flour.scale.set(1.2, 0.3, 0.8);
    group.add(flour);

    // Fırın Bıçak Kesikleri (Crust Slits)
    const slitMat = new THREE.MeshBasicMaterial({ color: 0x78350f });
    [-0.18, 0, 0.18].forEach(sx => {
      const slit = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.045, 0.28), slitMat);
      slit.position.set(sx, 0.56, 0);
      slit.rotation.y = 0.25;
      group.add(slit);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      loaf.position.y = 0.36 + Math.sin(time * 2.5) * 0.02;
    };

    return group;
  }

  static _createDisliCarkMesh(def) {
    const group = new THREE.Group();

    // Fasetli Çelik Dişli Çark Gövdesi (8 segmentli silindir)
    const bodyGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.1, 8);
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const gear = new THREE.Mesh(bodyGeo, gearMat);
    gear.position.y = 0.25;
    gear.rotation.x = Math.PI / 2;
    gear.add(this._createOutline(bodyGeo, 0x1e293b, 0.035));
    group.add(gear);

    // 8 Adet Fasetli Dış Diş
    const toothGeo = new THREE.BoxGeometry(0.1, 0.12, 0.12);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, gearMat);
      tooth.position.set(Math.cos(angle) * 0.42, 0.25 + Math.sin(angle) * 0.42, 0);
      tooth.rotation.z = angle;
      group.add(tooth);
    }

    // Ortadaki Altıgen Mil Deliği
    const holeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 6);
    const holeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, flatShading: true });
    const hole = new THREE.Mesh(holeGeo, holeMat);
    hole.position.y = 0.25;
    hole.rotation.x = Math.PI / 2;
    group.add(hole);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      gear.rotation.z += dt * 1.5;
    };

    return group;
  }

  static _createDegirmenMesh(def) {
    const group = new THREE.Group();

    // Fasetli Taş Gövde (6 segmentli konik kule)
    const towerGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.65, 6);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 0.32;
    tower.add(this._createOutline(towerGeo, 0x451a03, 0.04));
    group.add(tower);

    // Kırmızı Kiremit Konik Çatı (6 segmentli)
    const roofGeo = new THREE.ConeGeometry(0.32, 0.26, 6);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.7, flatShading: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 0.76;
    roof.add(this._createOutline(roofGeo, 0x7f1d1d, 0.035));
    group.add(roof);

    // Dönen 4 Pervane Yelkeni Grubu
    const sailsGroup = new THREE.Group();
    sailsGroup.position.set(0, 0.52, 0.3);

    const bladeGeo = new THREE.BoxGeometry(0.08, 0.58, 0.02);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.6, flatShading: true });
    [0, Math.PI / 2].forEach(angle => {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.z = angle;
      blade.add(this._createOutline(bladeGeo, 0xd97706, 0.025));
      sailsGroup.add(blade);
    });
    group.add(sailsGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      sailsGroup.rotation.z += dt * 2.0;
    };

    return group;
  }

  static _createAynaMesh(def) {
    const group = new THREE.Group();

    // Fasetli Altın Çerçeve
    const frameGeo = new THREE.BoxGeometry(0.52, 0.72, 0.06);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.38;
    frame.add(this._createOutline(frameGeo, 0xb45309, 0.04));
    group.add(frame);

    // Parlak Fasetli Cam Yansıtıcı Yüzey
    const glassGeo = new THREE.PlaneGeometry(0.42, 0.62);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.95,
      roughness: 0.05,
      reflectivity: 1.0,
      clearcoat: 1.0,
      flatShading: true
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0, 0.38, 0.032);
    group.add(glass);

    // Üst Fasetli Taç Süsü (Octahedron)
    const crestGeo = new THREE.OctahedronGeometry(0.09, 0);
    const crest = new THREE.Mesh(crestGeo, frameMat);
    crest.position.set(0, 0.76, 0);
    group.add(crest);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      crest.rotation.y += dt * 2;
    };

    return group;
  }

  static _createSaatMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sekizgen Altın Cep Saati Kasası
    const caseGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 8);
    const caseMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });
    const casing = new THREE.Mesh(caseGeo, caseMat);
    casing.position.y = 0.1;
    casing.add(this._createOutline(caseGeo, 0xb45309, 0.04));
    group.add(casing);

    // Fasetli Kadran (8 segmentli disk)
    const dialGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.02, 8);
    const dialMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, flatShading: true });
    const dial = new THREE.Mesh(dialGeo, dialMat);
    dial.position.y = 0.16;
    group.add(dial);

    // Akrep ve Yelkovan
    const handMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const hand1Geo = new THREE.BoxGeometry(0.03, 0.02, 0.16);
    const hand1 = new THREE.Mesh(hand1Geo, handMat);
    hand1.position.set(0, 0.18, 0.08);
    group.add(hand1);

    const hand2Geo = new THREE.BoxGeometry(0.02, 0.02, 0.24);
    const hand2 = new THREE.Mesh(hand2Geo, handMat);
    hand2.position.set(0.08, 0.18, 0);
    hand2.rotation.y = Math.PI / 3;
    group.add(hand2);

    // Üst Fasetli Kurma Tepesi Halkası
    const ringGeo = new THREE.TorusGeometry(0.1, 0.025, 4, 8);
    const ring = new THREE.Mesh(ringGeo, caseMat);
    ring.position.set(0, 0.1, -0.48);
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      hand2.rotation.y += dt * 3.0;
    };

    return group;
  }

  static _createDemirParmaklikMesh(def) {
    const group = new THREE.Group();

    // Dövme Demir Kirişler ve Parmaklıklar
    const frameGeo = new THREE.BoxGeometry(0.72, 0.08, 0.08);
    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });

    // Üst ve alt kirişler
    [-0.28, 0.28].forEach(fy => {
      const fMesh = new THREE.Mesh(frameGeo, ironMat);
      fMesh.position.y = 0.38 + fy;
      fMesh.add(this._createOutline(frameGeo, 0x0f172a, 0.035));
      group.add(fMesh);
    });

    // 4 Fasetli Sivri Uçlu Dikey Parmaklık (4 segmentli silindir + 4 segmentli koni)
    const barGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 4);
    const tipGeo = new THREE.ConeGeometry(0.045, 0.12, 4);
    [-0.24, -0.08, 0.08, 0.24].forEach(bx => {
      const bar = new THREE.Mesh(barGeo, ironMat);
      bar.position.set(bx, 0.38, 0);
      bar.add(this._createOutline(barGeo, 0x0f172a, 0.03));
      group.add(bar);

      const tip = new THREE.Mesh(tipGeo, ironMat);
      tip.position.set(bx, 0.78, 0);
      group.add(tip);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createSavasBaltasiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Ahşap Sap (6 segmentli)
    const handleGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.95, 6);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.46;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Çift Taraflı Fasetli Çelik Balta Ağızları (3 segmentli prizma)
    const bladeGeo = new THREE.CylinderGeometry(0.24, 0.32, 0.05, 3);
    bladeGeo.scale(1.2, 0.8, 1);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.2,
      flatShading: true
    });

    // Sol Ağız
    const bladeL = new THREE.Mesh(bladeGeo, bladeMat);
    bladeL.rotation.z = Math.PI / 2;
    bladeL.position.set(-0.24, 0.75, 0);
    bladeL.add(this._createOutline(bladeGeo, 0x1e293b, 0.035));
    group.add(bladeL);

    // Sağ Ağız
    const bladeR = new THREE.Mesh(bladeGeo, bladeMat);
    bladeR.rotation.z = -Math.PI / 2;
    bladeR.position.set(0.24, 0.75, 0);
    bladeR.add(this._createOutline(bladeGeo, 0x1e293b, 0.035));
    group.add(bladeR);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.rotation.z = Math.sin(time * 2) * 0.06;
    };

    return group;
  }

  static _createGozetlemeKulesiMesh(def) {
    const group = new THREE.Group();

    // Fasetli Sekizgen Taş Kule Gövdesi (6 segmentli)
    const towerGeo = new THREE.CylinderGeometry(0.28, 0.38, 0.65, 6);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8, flatShading: true });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 0.32;
    tower.add(this._createOutline(towerGeo, 0x334155, 0.04));
    group.add(tower);

    // Fasetli Ahşap Balkon Sahanlığı (6 segmentli)
    const deckGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 6);
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75, flatShading: true });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.y = 0.68;
    deck.add(this._createOutline(deckGeo, 0x451a03, 0.035));
    group.add(deck);

    // Kırmızı Kiremit Kule Çatısı (6 segmentli koni)
    const roofGeo = new THREE.ConeGeometry(0.38, 0.35, 6);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.7, flatShading: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 0.9;
    roof.add(this._createOutline(roofGeo, 0x7f1d1d, 0.035));
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createKaleKapisiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İki yanı taş burç kuleli, ortası demir parmaklıklı & ahşap kanatlı kale kapısı
    const archGeo = new THREE.BoxGeometry(0.85, 0.82, 0.18);
    const stoneMat = new THREE.MeshToonMaterial({ color: 0x64748b, roughness: 0.8 });
    const arch = new THREE.Mesh(archGeo, stoneMat);
    arch.position.y = 0.42;
    arch.add(this._createOutline(archGeo, 0x1e293b, 0.04));
    group.add(arch);

    // Ortadaki koyu meşe ahşap kapı kanatları
    const doorGeo = new THREE.BoxGeometry(0.48, 0.62, 0.2);
    const doorMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 0.32, 0);
    door.add(this._createOutline(doorGeo, 0x451a03, 0.035));
    group.add(door);

    // Dövme demir menteşe ve çiviler
    const studMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
    [-0.15, 0.15].forEach(dx => {
      const studGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 6);
      const stud = new THREE.Mesh(studGeo, studMat);
      stud.position.set(dx, 0.32, 0);
      stud.rotation.x = Math.PI / 2;
      group.add(stud);
    });

    return group;
  }

  static _createBuzRunuMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Buz Tableti (6 köşeli prizma)
    const tabletGeo = new THREE.CylinderGeometry(0.34, 0.38, 0.62, 6);
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.1,
      flatShading: true
    });
    const tablet = new THREE.Mesh(tabletGeo, iceMat);
    tablet.position.y = 0.38;
    tablet.add(this._createOutline(tabletGeo, 0x0369a1, 0.035));
    group.add(tablet);

    // Yüzeydeki 6 kollu fasetli rünik kar kristali motifi
    const runeGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.04, 6);
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0xf0f9ff,
      emissive: 0x7dd3fc,
      emissiveIntensity: 0.85,
      flatShading: true
    });
    const rune = new THREE.Mesh(runeGeo, runeMat);
    rune.rotation.x = Math.PI / 2;
    rune.position.set(0, 0.38, 0.26);
    group.add(rune);

    // Yanlara fasetli buz kristalleri
    const shardGeo = new THREE.ConeGeometry(0.08, 0.26, 4);
    [-0.32, 0.32].forEach((x, i) => {
      const shard = new THREE.Mesh(shardGeo, iceMat);
      shard.position.set(x, 0.35 + i * 0.05, 0);
      shard.rotation.z = (i === 0 ? 0.35 : -0.35);
      group.add(shard);
    });

    const light = new THREE.PointLight(0x7dd3fc, 1.8, 2.2);
    light.position.set(0, 0.4, 0.2);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      tablet.position.y = 0.38 + Math.sin(time * 2.2) * 0.03;
      rune.position.y = tablet.position.y;
    };

    return group;
  }

  static _createCehennemTasiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Volkanik Magma Taşı
    const geo = new THREE.DodecahedronGeometry(0.42, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x450a0a,
      emissive: 0xef4444,
      emissiveIntensity: 0.85,
      roughness: 0.5,
      metalness: 0.1,
      flatShading: true
    });
    const stone = new THREE.Mesh(geo, mat);
    stone.position.y = 0.42;
    stone.add(this._createOutline(geo, 0x1f0303, 0.04));
    group.add(stone);

    // Fasetli kor lav sivri dikitleri (4 köşeli koniler)
    const spikeGeo = new THREE.ConeGeometry(0.12, 0.3, 4);
    const spikeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xd97706,
      emissiveIntensity: 0.9,
      flatShading: true
    });
    [[0, 0.72, 0, 0], [0.36, 0.42, 0.18, 0.65], [-0.36, 0.42, -0.18, -0.65]].forEach(([sx, sy, sz, rz]) => {
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      spike.position.set(sx, sy, sz);
      spike.rotation.z = rz;
      group.add(spike);
    });

    const light = new THREE.PointLight(0xef4444, 2.2, 2.5);
    light.position.set(0, 0.45, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      stone.position.y = 0.42 + Math.sin(time * 2.5) * 0.03;
    };

    return group;
  }

  static _createZamanKumSaatiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Alt ve Üst Pirinç Tablalar (8 köşeli)
    const capGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.07, 8);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.25,
      flatShading: true
    });

    const topCap = new THREE.Mesh(capGeo, goldMat);
    topCap.position.y = 0.72;
    topCap.add(this._createOutline(capGeo, 0xb45309, 0.035));
    group.add(topCap);

    const btmCap = new THREE.Mesh(capGeo, goldMat);
    btmCap.position.y = 0.05;
    btmCap.add(this._createOutline(capGeo, 0xb45309, 0.035));
    group.add(btmCap);

    // 6 fasetli çift cam koni haznesi
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.3,
      roughness: 0.15,
      transparent: true,
      opacity: 0.65,
      flatShading: true
    });

    const bulbTopGeo = new THREE.ConeGeometry(0.25, 0.32, 6);
    const bulbTop = new THREE.Mesh(bulbTopGeo, glassMat);
    bulbTop.rotation.x = Math.PI;
    bulbTop.position.y = 0.54;
    group.add(bulbTop);

    const bulbBtmGeo = new THREE.ConeGeometry(0.25, 0.32, 6);
    const bulbBtm = new THREE.Mesh(bulbBtmGeo, glassMat);
    bulbBtm.position.y = 0.23;
    group.add(bulbBtm);

    // Fasetli parıldayan altın kum yığını
    const sandGeo = new THREE.ConeGeometry(0.18, 0.2, 5);
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: 0xeab308,
      emissiveIntensity: 0.8,
      flatShading: true
    });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.position.y = 0.15;
    group.add(sand);

    // 3 adet fasetli altın destek sütunu (5 köşeli silindir)
    const colGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.68, 5);
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const col = new THREE.Mesh(colGeo, goldMat);
      col.position.set(Math.cos(angle) * 0.27, 0.38, Math.sin(angle) * 0.27);
      group.add(col);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      sand.scale.y = 0.95 + Math.sin(time * 3.0) * 0.08;
    };

    return group;
  }

  static _createIlluzyonAynasiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Gotik Ayna Çerçevesi (8 köşeli prizma)
    const frameGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 8);
    frameGeo.rotateX(Math.PI / 2);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x4a044e,
      metalness: 0.75,
      roughness: 0.3,
      emissive: 0xa21caf,
      emissiveIntensity: 0.35,
      flatShading: true
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.42;
    frame.add(this._createOutline(frameGeo, 0x2e1065, 0.04));
    group.add(frame);

    // İllüzyon girdap aynası (6 köşeli parıldayan fasetli disk)
    const vortexGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 6);
    vortexGeo.rotateX(Math.PI / 2);
    const vortexMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.95,
      flatShading: true
    });
    const vortex = new THREE.Mesh(vortexGeo, vortexMat);
    vortex.position.set(0, 0.42, 0.045);
    group.add(vortex);

    // Gotik ayna tepeliği (4 köşeli koni)
    const crestGeo = new THREE.ConeGeometry(0.12, 0.24, 4);
    const crest = new THREE.Mesh(crestGeo, frameMat);
    crest.position.set(0, 0.82, 0);
    group.add(crest);

    const light = new THREE.PointLight(0xf43f5e, 2.0, 2.5);
    light.position.set(0, 0.42, 0.15);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      vortex.rotation.z += dt * 0.8;
      frame.position.y = 0.42 + Math.sin(time * 2.2) * 0.025;
      vortex.position.y = frame.position.y;
      crest.position.y = frame.position.y + 0.4;
    };

    return group;
  }


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


  // =========================================================================
  // FAZ 2: CANLILAR VE YARATIKLAR (03_canlilar & Fauna & Mistik Canlılar)
  // =========================================================================

  static _createAslanMesh(def) {
    const group = new THREE.Group();
    // 1. Gövde
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), bodyMat);
    body.scale.set(1.0, 0.9, 1.3);
    body.position.y = 0.38;
    body.castShadow = true;
    group.add(body);

    // 2. Görkemli Fasetli Altın Yele
    const maneMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8, flatShading: true });
    const mane = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), maneMat);
    mane.position.set(0, 0.58, 0.22);
    mane.castShadow = true;
    group.add(mane);

    // 3. Baş ve Burun
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), bodyMat);
    head.position.set(0, 0.58, 0.34);
    group.add(head);

    const snoutMat = new THREE.MeshStandardMaterial({ color: 0x451a03, flatShading: true });
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.08), snoutMat);
    snout.position.set(0, 0.53, 0.48);
    group.add(snout);

    // 4. Parlayan Kehribar Gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    [-0.06, 0.06].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.02), eyeMat);
      eye.position.set(ex, 0.62, 0.45);
      group.add(eye);
    });

    // 5. 4 Bacak
    const legGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.26, 5);
    [[-0.14, -0.16], [0.14, -0.16], [-0.14, 0.16], [0.14, 0.16]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, bodyMat);
      leg.position.set(lx, 0.14, lz);
      group.add(leg);
    });

    // 6. Kuyruk ve Yele Ucu
    const tailMat = new THREE.MeshStandardMaterial({ color: 0xd97706, flatShading: true });
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.35, 4), tailMat);
    tail.position.set(0, 0.38, -0.38);
    tail.rotation.x = -0.6;
    group.add(tail);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      tail.rotation.y = Math.sin(time * 3.5) * 0.3;
      body.position.y = 0.38 + Math.sin(time * 2.5) * 0.015;
    };
    return group;
  }

  static _createKopekMesh(def) {
    const group = new THREE.Group();
    // 1. Gövde
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.75, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), bodyMat);
    body.scale.set(0.9, 0.85, 1.25);
    body.position.y = 0.35;
    body.castShadow = true;
    group.add(body);

    // 2. Baş ve Sarkık Kulaklar
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), bodyMat);
    head.position.set(0, 0.55, 0.25);
    group.add(head);

    const earMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    [-0.12, 0.12].forEach((ex, i) => {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.04), earMat);
      ear.position.set(ex, 0.54, 0.22);
      ear.rotation.z = i === 0 ? 0.3 : -0.3;
      group.add(ear);
    });

    // 3. Burun ve Dil
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.08), new THREE.MeshBasicMaterial({ color: 0x1c1917 }));
    nose.position.set(0, 0.5, 0.38);
    group.add(nose);

    // 4. Bacaklar
    const legGeo = new THREE.CylinderGeometry(0.045, 0.055, 0.24, 5);
    [[-0.12, -0.14], [0.12, -0.14], [-0.12, 0.14], [0.12, 0.14]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, bodyMat);
      leg.position.set(lx, 0.12, lz);
      group.add(leg);
    });

    // 5. Sallanan Kuyruk
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.25, 4), bodyMat);
    tail.position.set(0, 0.38, -0.3);
    tail.rotation.x = -0.7;
    group.add(tail);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      tail.rotation.y = Math.sin(time * 8.0) * 0.45;
    };
    return group;
  }

  static _createAyiMesh(def) {
    const group = new THREE.Group();
    // 1. İri Gövde
    const bearMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38, 0), bearMat);
    body.scale.set(1.1, 1.0, 1.3);
    body.position.y = 0.42;
    body.castShadow = true;
    group.add(body);

    // 2. Büyük Baş ve Yuvarlak Kulaklar
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), bearMat);
    head.position.set(0, 0.62, 0.3);
    group.add(head);

    [-0.15, 0.15].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), bearMat);
      ear.position.set(ex, 0.78, 0.26);
      group.add(ear);
    });

    // 3. Güçlü Bacaklar
    const legGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.28, 6);
    [[-0.16, -0.18], [0.16, -0.18], [-0.16, 0.18], [0.16, 0.18]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, bearMat);
      leg.position.set(lx, 0.15, lz);
      group.add(leg);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      body.position.y = 0.42 + Math.sin(time * 2.0) * 0.02;
    };
    return group;
  }

  static _createKurtMesh(def) {
    const group = new THREE.Group();
    const wolfMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), wolfMat);
    body.scale.set(0.9, 0.85, 1.3);
    body.position.y = 0.36;
    group.add(body);

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), wolfMat);
    head.position.set(0, 0.58, 0.26);
    group.add(head);

    // Sivri Kulaklar
    const earMat = new THREE.MeshStandardMaterial({ color: 0x334155, flatShading: true });
    [-0.09, 0.09].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 4), earMat);
      ear.position.set(ex, 0.74, 0.24);
      group.add(ear);
    });

    // Bacaklar
    const legGeo = new THREE.CylinderGeometry(0.045, 0.055, 0.26, 5);
    [[-0.12, -0.14], [0.12, -0.14], [-0.12, 0.14], [0.12, 0.14]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, wolfMat);
      leg.position.set(lx, 0.13, lz);
      group.add(leg);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createKurtAdamMesh(def) {
    return this._createKurtMesh(def);
  }

  static _createEjderhaMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Zümrüt Ejderha Gövdesi
    const dragMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      emissive: 0x14532d,
      emissiveIntensity: 0.4,
      roughness: 0.6,
      flatShading: true
    });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.34, 0), dragMat);
    body.scale.set(0.9, 0.9, 1.4);
    body.position.y = 0.42;
    group.add(body);

    // 2. Boynuzlu Ejderha Başı
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), dragMat);
    head.position.set(0, 0.62, 0.38);
    group.add(head);

    const hornMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.5, flatShading: true });
    [-0.1, 0.1].forEach((hx, i) => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 4), hornMat);
      horn.position.set(hx, 0.78, 0.32);
      horn.rotation.set(-0.3, 0, i === 0 ? -0.4 : 0.4);
      group.add(horn);
    });

    // 3. Fasetli Kanatlar
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, side: THREE.DoubleSide, flatShading: true });
    const leftWing = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.65, 3), wingMat);
    leftWing.position.set(-0.35, 0.62, 0);
    leftWing.rotation.set(Math.PI / 2, 0, 0.7);
    const rightWing = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.65, 3), wingMat);
    rightWing.position.set(0.35, 0.62, 0);
    rightWing.rotation.set(Math.PI / 2, 0, -0.7);
    group.add(leftWing);
    group.add(rightWing);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      leftWing.rotation.z = 0.7 + Math.sin(time * 5.0) * 0.25;
      rightWing.rotation.z = -0.7 - Math.sin(time * 5.0) * 0.25;
    };
    return group;
  }

  static _createDinozorMesh(def) {
    const group = new THREE.Group();
    // 1. Büyük Gövde
    const dinoMat = new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.7, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.36, 0), dinoMat);
    body.scale.set(1.0, 1.1, 1.3);
    body.position.y = 0.48;
    group.add(body);

    // 2. Uzun Boyun ve Baş
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.45, 5), dinoMat);
    neck.position.set(0, 0.75, 0.25);
    neck.rotation.x = -0.4;
    group.add(neck);

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), dinoMat);
    head.position.set(0, 0.95, 0.38);
    group.add(head);

    // 3. Sırt Dikenleri
    const spineMat = new THREE.MeshStandardMaterial({ color: 0xd97706, flatShading: true });
    for (let s = 0; s < 4; s++) {
      const spine = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 3), spineMat);
      spine.position.set(0, 0.72 - s * 0.08, 0.1 - s * 0.15);
      group.add(spine);
    }

    // 4. İki Güçlü Arka Bacak
    const legGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.35, 6);
    [-0.18, 0.18].forEach(lx => {
      const leg = new THREE.Mesh(legGeo, dinoMat);
      leg.position.set(lx, 0.18, -0.05);
      group.add(leg);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      neck.rotation.x = -0.4 + Math.sin(time * 2.5) * 0.06;
    };
    return group;
  }

  static _createAhtapotMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Mor Kafa
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0x581c87,
      emissiveIntensity: 0.35,
      roughness: 0.5,
      flatShading: true
    });
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.34, 0), octMat);
    head.position.y = 0.55;
    group.add(head);

    // 2. Parlayan Gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    [-0.1, 0.1].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.02), eyeMat);
      eye.position.set(ex, 0.52, 0.32);
      group.add(eye);
    });

    // 3. 8 Adet Kıvrık Dokunaç
    const tentacles = [];
    for (let t = 0; t < 8; t++) {
      const angle = (t / 8) * Math.PI * 2;
      const tent = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.06, 0.42, 4), octMat);
      tent.position.set(Math.cos(angle) * 0.22, 0.22, Math.sin(angle) * 0.22);
      tent.rotation.set(Math.sin(angle) * 0.6, 0, -Math.cos(angle) * 0.6);
      group.add(tent);
      tentacles.push({ mesh: tent, baseAngle: angle });
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      head.position.y = 0.55 + Math.sin(time * 2.5) * 0.03;
      tentacles.forEach((t, i) => {
        t.mesh.rotation.x = Math.sin(time * 3.0 + i) * 0.2;
      });
    };
    return group;
  }

  static _createDenizanasiMesh(def) {
    const group = new THREE.Group();
    // 1. Şeffaf Parlayan Kubbe
    const bellMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
      flatShading: true
    });
    const bell = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.35, 7), bellMat);
    bell.position.y = 0.65;
    group.add(bell);

    // 2. İnce Işıltılı Dokunaçlar
    const tentMat = new THREE.MeshBasicMaterial({ color: 0xe9d5ff, transparent: true, opacity: 0.75 });
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      const tent = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.45, 3), tentMat);
      tent.position.set(Math.cos(ang) * 0.16, 0.3, Math.sin(ang) * 0.16);
      group.add(tent);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.7;
      bell.scale.y = 1.0 + Math.sin(time * 3.0) * 0.12;
      group.position.y = Math.sin(time * 2.0) * 0.04;
    };
    return group;
  }

  static _createBalinaMesh(def) {
    const group = new THREE.Group();
    // 1. İri Aerodinamik Gövde
    const whaleMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.6, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35, 0), whaleMat);
    body.scale.set(0.9, 0.8, 1.6);
    body.position.y = 0.42;
    group.add(body);

    // 2. Beyaz Karın
    const bellyMat = new THREE.MeshStandardMaterial({ color: 0xf0f9ff, flatShading: true });
    const belly = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.7), bellyMat);
    belly.position.set(0, 0.24, 0);
    group.add(belly);

    // 3. Kuyruk Yüzgeci
    const finMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, side: THREE.DoubleSide, flatShading: true });
    const tailFin = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.42, 3), finMat);
    tailFin.position.set(0, 0.45, -0.6);
    tailFin.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    group.add(tailFin);

    // 4. Su Fıskiyesi
    const spoutMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.8 });
    const spout = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 4), spoutMat);
    spout.position.set(0, 0.72, 0.15);
    group.add(spout);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
      tailFin.rotation.y = Math.sin(time * 3.5) * 0.35;
      spout.scale.y = 1.0 + Math.sin(time * 4.0) * 0.2;
    };
    return group;
  }

  static _createKopekbaligiMesh(def) {
    const group = new THREE.Group();
    // 1. Çelik Grisi Gövde
    const sharkMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, flatShading: true });
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.85, 5), sharkMat);
    body.position.set(0, 0.42, 0);
    body.rotation.x = -Math.PI / 2;
    group.add(body);

    // 2. İkonik Sırt Yüzgeci
    const fin = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 3), sharkMat);
    fin.position.set(0, 0.62, 0);
    fin.rotation.x = -0.4;
    group.add(fin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      body.rotation.y = -Math.PI / 2 + Math.sin(time * 4.0) * 0.15;
    };
    return group;
  }

  static _createKartalMesh(def) {
    const group = new THREE.Group();
    // 1. Gövde
    const eagleMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), eagleMat);
    body.position.y = 0.45;
    group.add(body);

    // 2. Beyaz Baş ve Altın Gaga
    const headMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, flatShading: true });
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), headMat);
    head.position.set(0, 0.62, 0.16);
    group.add(head);

    const beakMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, flatShading: true });
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.12, 4), beakMat);
    beak.position.set(0, 0.58, 0.28);
    beak.rotation.x = Math.PI / 2;
    group.add(beak);

    // 3. Geniş Açılmış Kanatlar
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x290d02, side: THREE.DoubleSide, flatShading: true });
    const lWing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.22), wingMat);
    lWing.position.set(-0.35, 0.52, 0);
    const rWing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.22), wingMat);
    rWing.position.set(0.35, 0.52, 0);
    group.add(lWing);
    group.add(rWing);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      lWing.rotation.z = Math.sin(time * 5.0) * 0.25;
      rWing.rotation.z = -Math.sin(time * 5.0) * 0.25;
    };
    return group;
  }

  static _createSahinMesh(def) {
    return this._createKartalMesh(def);
  }

  static _createPegasusMesh(def) {
    const group = new THREE.Group();
    // 1. Beyaz At Gövdesi
    const horseMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3, 0), horseMat);
    body.scale.set(0.9, 0.9, 1.35);
    body.position.y = 0.42;
    group.add(body);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.35, 5), horseMat);
    neck.position.set(0, 0.65, 0.22);
    neck.rotation.x = -0.4;
    group.add(neck);

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.15, 0), horseMat);
    head.position.set(0, 0.8, 0.32);
    group.add(head);

    // 2. Kanatlar
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, side: THREE.DoubleSide, flatShading: true });
    const lWing = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 3), wingMat);
    lWing.position.set(-0.32, 0.62, 0);
    lWing.rotation.set(Math.PI / 2, 0, 0.7);
    const rWing = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 3), wingMat);
    rWing.position.set(0.32, 0.62, 0);
    rWing.rotation.set(Math.PI / 2, 0, -0.7);
    group.add(lWing);
    group.add(rWing);

    // 3. 4 Bacak
    const legGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.3, 5);
    [[-0.12, -0.16], [0.12, -0.16], [-0.12, 0.16], [0.12, 0.16]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, horseMat);
      leg.position.set(lx, 0.15, lz);
      group.add(leg);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      lWing.rotation.z = 0.7 + Math.sin(time * 5.0) * 0.25;
      rWing.rotation.z = -0.7 - Math.sin(time * 5.0) * 0.25;
    };
    return group;
  }

  static _createAkrepMesh(def) {
    const group = new THREE.Group();
    // 1. Zırhlı Gövde
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.7, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), bodyMat);
    body.scale.set(1.0, 0.6, 1.2);
    body.position.y = 0.16;
    group.add(body);

    // 2. İki Kıskaç
    const pincerMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, flatShading: true });
    [-0.18, 0.18].forEach(px => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.22, 4), bodyMat);
      arm.position.set(px, 0.18, 0.18);
      arm.rotation.z = px < 0 ? -0.5 : 0.5;
      group.add(arm);

      const pincer = new THREE.Mesh(new THREE.OctahedronGeometry(0.07, 0), pincerMat);
      pincer.position.set(px * 1.5, 0.22, 0.28);
      group.add(pincer);
    });

    // 3. Kıvrık İğneli Kuyruk
    const tailMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const seg = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06 - i * 0.008, 0), bodyMat);
      seg.position.set(0, 0.22 + i * 0.1, -0.15 - i * 0.04 + (i > 1 ? (i - 1) * 0.1 : 0));
      group.add(seg);
    }
    const stinger = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 4), tailMat);
    stinger.position.set(0, 0.58, 0.05);
    stinger.rotation.x = -Math.PI / 3;
    group.add(stinger);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      stinger.rotation.x = -Math.PI / 3 + Math.sin(time * 4.0) * 0.2;
    };
    return group;
  }

  static _createOrumcekMesh(def) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.85, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), mat);
    body.position.set(0, 0.18, -0.08);
    group.add(body);

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), mat);
    head.position.set(0, 0.18, 0.14);
    group.add(head);

    // Kırmızı gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    [-0.04, 0.04].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.02), eyeMat);
      eye.position.set(ex, 0.22, 0.24);
      group.add(eye);
    });

    // 8 Bacak
    for (let l = 0; l < 8; l++) {
      const side = l < 4 ? -1 : 1;
      const idx = l % 4;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.32, 4), mat);
      leg.position.set(side * 0.22, 0.16, -0.15 + idx * 0.1);
      leg.rotation.z = side * 0.7;
      group.add(leg);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKarincaMesh(def) {
    const group = new THREE.Group();
    const antMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8, flatShading: true });
    // 3 segmentli gövde
    const abdomen = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), antMat);
    abdomen.position.set(0, 0.16, -0.18);
    const thorax = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), antMat);
    thorax.position.set(0, 0.16, 0);
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), antMat);
    head.position.set(0, 0.18, 0.18);
    group.add(abdomen);
    group.add(thorax);
    group.add(head);

    // Antenler
    [-0.05, 0.05].forEach((ax, i) => {
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.015, 0.18, 3), antMat);
      ant.position.set(ax, 0.28, 0.26);
      ant.rotation.set(-0.3, 0, i === 0 ? -0.3 : 0.3);
      group.add(ant);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createTimsahMesh(def) {
    const group = new THREE.Group();
    const crocMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.85, flatShading: true });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.65), crocMat);
    body.position.y = 0.14;
    group.add(body);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.35), crocMat);
    snout.position.set(0, 0.12, 0.42);
    group.add(snout);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createGolemMesh(def) {
    const group = new THREE.Group();
    // 1. Ağır Taş Gövde
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.9, flatShading: true });
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35, 0), stoneMat);
    body.position.y = 0.45;
    group.add(body);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.22), stoneMat);
    head.position.set(0, 0.72, 0.08);
    group.add(head);

    // Parlayan Runik Gözler
    const runeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    [-0.06, 0.06].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.02), runeMat);
      eye.position.set(ex, 0.72, 0.2);
      group.add(eye);
    });

    // İri Taş Kollar
    [-0.32, 0.32].forEach(ax => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.16), stoneMat);
      arm.position.set(ax, 0.4, 0);
      group.add(arm);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }


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
    const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.45, 4), stickMat);
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


  // =========================================================================
  // DEDICATED 3D MODELS FOR ALL REMAINING 521 ITEMS (%100 COVERAGE)
  // =========================================================================
  static _createAkuMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAletMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAlciMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAsaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBaharatMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBaharatCesnisiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBakirMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#c2410c',
      emissive: '#7c2d12',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fb923c',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBuyuMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#4c1d95',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#c084fc',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createCevizMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#fbbf24', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createCinMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createCivaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createDomatesMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f87171',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createEtMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f87171',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createEvMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createEvrenMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#d97706',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#fef08a', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createFiyortMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createFosilMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createFindikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createGranitMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createGolgeMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#1e1b4b',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#312e81',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createHalatMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createHavyarMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createHucreMesh(def) {
    const group = new THREE.Group();
    // 1. Biyolojik Virüs Çekirdek Kapsülü
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 0), coreMat);
    core.position.y = 0.48;
    group.add(core);

    // 2. Yüzeydeki Diken Proteinleri (Spike Proteins)
    const spikeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, flatShading: true });
    for (let s = 0; s < 12; s++) {
      const ang1 = (s / 12) * Math.PI * 2;
      const ang2 = (s % 4) * 0.8 - 0.4;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.16, 4), spikeMat);
      spike.position.set(Math.cos(ang1) * 0.36, 0.48 + Math.sin(ang2) * 0.2, Math.sin(ang1) * 0.36);
      spike.rotation.set(Math.sin(ang1), 0, -Math.cos(ang1));
      group.add(spike);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;
      core.scale.setScalar(1.0 + Math.sin(time * 3.5) * 0.08);
      group.position.y = Math.sin(time * 2.0) * 0.03;
    };
    return group;
  }

  static _createJeneratorMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKadirgaMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createKalemMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKandilMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Balmumu Gövdesi (Eriyen Damlalar)
    const waxMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.4, flatShading: true });
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.6, 7), waxMat);
    candle.position.y = 0.3;
    group.add(candle);

    // Damla
    const drop = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), waxMat);
    drop.position.set(0.12, 0.42, 0.08);
    group.add(drop);

    // 2. Siyah Fitil ve Titreşen Alev
    const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.1, 3), new THREE.MeshBasicMaterial({ color: 0x18181b }));
    wick.position.y = 0.64;
    group.add(wick);

    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 5), flameMat);
    flame.position.y = 0.76;
    group.add(flame);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      flame.scale.y = 1.0 + Math.sin(time * 8.0) * 0.2;
      flame.scale.x = 1.0 + Math.cos(time * 6.0) * 0.1;
    };
    return group;
  }

  static _createKasabaMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKavurmaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f87171',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKehribarMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#a16207',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fef08a',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKemikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKentaurlukMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKertenkeleMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#15803d',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#84cc16',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKirecMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKuleMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKulubeMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKursunMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKuvarsMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#0284c7',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f0f9ff',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKorukMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKoyMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKukurtMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKurekMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createManaMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createManaIKsiriMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createMedeniyetMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createMelekMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createMeltemMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMigferMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMuzMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#854d0e',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fde047',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createParsomenMesh(def) {
    const group = new THREE.Group();
    // 1. Deri Ciltli Kalın Kitap / Parşömen
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7, flatShading: true });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8, flatShading: true });

    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.65), coverMat);
    cover.position.y = 0.25;
    cover.rotation.set(0.3, 0.2, 0);
    group.add(cover);

    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.6), pagesMat);
    pages.position.set(0.02, 0, 0);
    cover.add(pages);

    // Altın Mühür / Toka
    const seal = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
    seal.position.set(0.24, 0.06, 0);
    cover.add(seal);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createPastirmaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f87171',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPilMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPirincMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPlazmaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#ef4444',
      emissive: '#b91c1c',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f97316',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPorselenMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPrizmaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createResimMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createRecelMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#854d0e',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fde047',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createRunMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createSalcaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSarmasikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSarimsakMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSeraMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSeramikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSinemaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSosisMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f87171',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSurMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createTepeMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTereyagiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#854d0e',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fde047',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTotemMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createTufanMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTunelMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createTilsimMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createUcurtmaMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createYaprakMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Bitki Sapı ve Açılmış Yapraklar
    const plantMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.25,
      roughness: 0.6,
      flatShading: true
    });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.65, 5), plantMat);
    stem.position.y = 0.32;
    group.add(stem);

    for (let l = 0; l < 4; l++) {
      const ang = (l / 4) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 3), plantMat);
      leaf.position.set(Math.cos(ang) * 0.16, 0.25 + l * 0.1, Math.sin(ang) * 0.16);
      leaf.rotation.set(Math.sin(ang) * 0.7, ang, Math.cos(ang) * 0.7);
      group.add(leaf);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createYaziMesh(def) {
    const group = new THREE.Group();
    // 1. Deri Ciltli Kalın Kitap / Parşömen
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7, flatShading: true });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8, flatShading: true });

    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.65), coverMat);
    cover.position.y = 0.25;
    cover.rotation.set(0.3, 0.2, 0);
    group.add(cover);

    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.6), pagesMat);
    pages.position.set(0.02, 0, 0);
    cover.add(pages);

    // Altın Mühür / Toka
    const seal = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
    seal.position.set(0.24, 0.06, 0);
    cover.add(seal);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createYolMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createYogurtMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createYunMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createZincirMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createZirhMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createCaliMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createCimenMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createCimentoMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createCorbaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createUzumMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#7e22ce',
      emissive: '#3b0764',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#a855f7',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createIKsirMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#94a3b8',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#94a3b8' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createINekMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createINsanMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createIPMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createIGneMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSafakMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#fef08a',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createSifaIKsiriMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#94a3b8',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#94a3b8' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createMakasMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMuzeMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createSfenksMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTuyMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createUzayMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#1e1b4b',
      emissive: '#312e81',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#312e81' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createIKsirKazaniMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#94a3b8',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#94a3b8' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createAlacakaranlikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#1e1b4b',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#312e81',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAlfabeMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAnkaKusuMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAnitMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAyMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#d97706',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fef08a',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBetonMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBiberMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f87171',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBisikletMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createBronzMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#c2410c',
      emissive: '#7c2d12',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fb923c',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createDenizkiziMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createGazeteMesh(def) {
    const group = new THREE.Group();
    // 1. Deri Ciltli Kalın Kitap / Parşömen
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7, flatShading: true });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8, flatShading: true });

    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.65), coverMat);
    cover.position.y = 0.25;
    cover.rotation.set(0.3, 0.2, 0);
    group.add(cover);

    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.6), pagesMat);
    pages.position.set(0.02, 0, 0);
    cover.add(pages);

    // Altın Mühür / Toka
    const seal = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
    seal.position.set(0.24, 0.06, 0);
    cover.add(seal);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createGrifonMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createGulyabaniMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createGunduzMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#fef08a',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createHayaletMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#94a3b8',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#94a3b8' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createHesapMakinesiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createHeykelMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createKabileMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKanalMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKanoMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createKitapMesh(def) {
    const group = new THREE.Group();
    // 1. Deri Ciltli Kalın Kitap / Parşömen
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7, flatShading: true });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8, flatShading: true });

    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.65), coverMat);
    cover.position.y = 0.25;
    cover.rotation.set(0.3, 0.2, 0);
    group.add(cover);

    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.6), pagesMat);
    pages.position.set(0.02, 0, 0);
    cover.add(pages);

    // Altın Mühür / Toka
    const seal = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
    seal.position.set(0.24, 0.06, 0);
    cover.add(seal);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createKozmikUsturlapMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#fef08a',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createKumSaatiMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#fef08a',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createKuyrukluYildizMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#fef08a',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createLazerMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createLimanMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createMurekkepMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createOkulMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createPeriMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createPlatinMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#334155',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPortakalMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#ea580c',
      emissive: '#7c2d12',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fb923c',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createRuhMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createSimyaMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createTabloMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTanriMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createTiyatroMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTuzMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTuzluSuMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTurbinMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createVidaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createYapayZekaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createYelkenliMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#ef4444',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createYesimMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#059669',
      emissive: '#064e3b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#6ee7b7',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createYunusMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createYildizMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#fef08a',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createZehirMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createZeytinMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#15803d',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createZombiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#4c1d95',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#c084fc',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createILluzyonAynasiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createINciMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createIPlikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSehirMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createAsitYagmuruMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBalikEtiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBarajMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createDukkanMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createFotografMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKaplanMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKorfezMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createLimonMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#854d0e',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fde047',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createManyetizmaMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#94a3b8',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#94a3b8' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createMatbaaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMuskaMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createObeliskMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#fbbf24',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fbbf24' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createPazarMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createSolucanMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createZamanMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#fef08a',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createZeytinyagiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#15803d',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createIMparatorlukMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAltarMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createAltinMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#a16207',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fef08a',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBarometreMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBuharliGemiMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createDemirMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#334155',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createDenizaltiMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#38bdf8', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createGeceMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#1e1b4b',
      emissive: '#312e81',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#312e81' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createGumusMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#334155',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createIsikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#d97706',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fef08a',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKameraMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMetropolMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createMeyveBahcesiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMeyveSuyuMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createRuzgarGuluMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#475569',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#cbd5e1',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createZirhliGemiMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createIPekbocegiMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createICtenYanmaliMotorMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSeytanMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#c084fc',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createDarphaneMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKrallikMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKokMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#16a34a',
      emissive: '#14532d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKopruMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createMercekMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMisirMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Bitki Sapı ve Açılmış Yapraklar
    const plantMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#854d0e',
      emissiveIntensity: 0.25,
      roughness: 0.6,
      flatShading: true
    });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.65, 5), plantMat);
    stem.position.y = 0.32;
    group.add(stem);

    for (let l = 0; l < 4; l++) {
      const ang = (l / 4) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 3), plantMat);
      leaf.position.set(Math.cos(ang) * 0.16, 0.25 + l * 0.1, Math.sin(ang) * 0.16);
      leaf.rotation.set(Math.sin(ang) * 0.7, ang, Math.cos(ang) * 0.7);
      group.add(leaf);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createSoganMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createCelikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#334155',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createOlumsuzlukIKsiriMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#94a3b8',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#94a3b8' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createIPekMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSekerMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createDemiryoluMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createMermerMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMotosikletMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createTrenMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createMayaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMeteorMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createUcakMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createElektrikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#eab308',
      emissive: '#ca8a04',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createVampirMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      emissive: '#4c1d95',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#c084fc',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBicakMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createILkelBicakMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#0f172a',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAlkolMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBademMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBorsaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createHaritaMesh(def) {
    const group = new THREE.Group();
    // 1. Deri Ciltli Kalın Kitap / Parşömen
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7, flatShading: true });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8, flatShading: true });

    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.65), coverMat);
    cover.position.y = 0.25;
    cover.rotation.set(0.3, 0.2, 0);
    group.add(cover);

    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.6), pagesMat);
    pages.position.set(0.02, 0, 0);
    cover.add(pages);

    // Altın Mühür / Toka
    const seal = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
    seal.position.set(0.24, 0.06, 0);
    cover.add(seal);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
    };
    return group;
  }

  static _createKamyonMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createKurabiyeMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKutuphaneMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createTopMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#ef4444',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createZeplinMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createAsteroitMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createDinamoluFenerMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Balmumu Gövdesi (Eriyen Damlalar)
    const waxMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.4, flatShading: true });
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.6, 7), waxMat);
    candle.position.y = 0.3;
    group.add(candle);

    // Damla
    const drop = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), waxMat);
    drop.position.set(0.12, 0.42, 0.08);
    group.add(drop);

    // 2. Siyah Fitil ve Titreşen Alev
    const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.1, 3), new THREE.MeshBasicMaterial({ color: 0x18181b }));
    wick.position.y = 0.64;
    group.add(wick);

    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 5), flameMat);
    flame.position.y = 0.76;
    group.add(flame);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      flame.scale.y = 1.0 + Math.sin(time * 8.0) * 0.2;
      flame.scale.x = 1.0 + Math.cos(time * 6.0) * 0.1;
    };
    return group;
  }

  static _createDumanMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#475569',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#cbd5e1',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKayipSehirMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createMuzikMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createRadyasyonMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#22c55e',
      emissive: '#15803d',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#86efac',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSirkeMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTelevizyonMesh(def) {
    const group = new THREE.Group();
    // 1. Taş Kaide
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.58), baseMat);
    base.position.y = 0.05;
    group.add(base);

    // 2. Ana Yapı Kütlesi
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.25,
      roughness: 0.7,
      flatShading: true
    });
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.42), wallMat);
    mainBuilding.position.y = 0.32;
    group.add(mainBuilding);

    // 3. Çatı ve Kubbe
    const roofMat = new THREE.MeshStandardMaterial({ color: '#38bdf8', roughness: 0.5, flatShading: true });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 4), roofMat);
    roof.position.y = 0.68;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createKazanMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createOzonMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#475569',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#cbd5e1',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createRadyoMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createINternetMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createRadarMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTelgrafMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createKagitParaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPatatesMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPlatoMesh(def) {
    const group = new THREE.Group();
    // 1. Parlayan Fasetli Mistik Çekirdek
    const mysticMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#94a3b8',
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), mysticMat);
    core.position.y = 0.48;
    core.scale.set(0.9, 1.3, 0.9);
    group.add(core);

    // 2. Dönen Yörünge Enerji Halkası
    const ringMat = new THREE.MeshBasicMaterial({ color: '#94a3b8' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 4, 8), ringMat);
    ring.position.y = 0.48;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.1;
      core.rotation.y += dt * 2.0;
      ring.rotation.z += dt * 3.0;
      group.position.y = Math.sin(time * 2.5) * 0.04;
    };
    return group;
  }

  static _createTelefonMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTermometreMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createTitanyumMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      emissive: '#334155',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createArmutMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createMikrocipMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      emissive: '#0369a1',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createPiyanoMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#fed7aa',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createSicakHavaBalonuMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#ef4444',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#f97316', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createBankaMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBoynuzMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createFaytonMesh(def) {
    const group = new THREE.Group();
    // 1. Aerodinamik Gövde
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.72), hullMat);
    hull.position.y = 0.28;
    group.add(hull);

    // 2. Kabin / Yelken / Pervane
    const cabMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4, flatShading: true });
    const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), cabMat);
    cabin.position.set(0, 0.48, 0);
    group.add(cabin);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 2.5) * 0.03;
    };
    return group;
  }

  static _createKaldirimMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createAileMesh(def) {
    const group = new THREE.Group();
    // 1. Kaide / Gövde
    const pMat = new THREE.MeshStandardMaterial({
      color: '#b45309',
      emissive: '#78350f',
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), pMat);
    base.position.y = 0.35;
    group.add(base);

    // 2. Tepe Detayı
    const sMat = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.5,
      flatShading: true
    });
    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), sMat);
    crown.position.y = 0.65;
    group.add(crown);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      crown.rotation.y += dt * 2.0;
    };
    return group;
  }

  static _createBakteriMesh(def) {
    const group = new THREE.Group();
    // 1. Biyolojik Virüs Çekirdek Kapsülü
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 0), coreMat);
    core.position.y = 0.48;
    group.add(core);

    // 2. Yüzeydeki Diken Proteinleri (Spike Proteins)
    const spikeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, flatShading: true });
    for (let s = 0; s < 12; s++) {
      const ang1 = (s / 12) * Math.PI * 2;
      const ang2 = (s % 4) * 0.8 - 0.4;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.16, 4), spikeMat);
      spike.position.set(Math.cos(ang1) * 0.36, 0.48 + Math.sin(ang2) * 0.2, Math.sin(ang1) * 0.36);
      spike.rotation.set(Math.sin(ang1), 0, -Math.cos(ang1));
      group.add(spike);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;
      core.scale.setScalar(1.0 + Math.sin(time * 3.5) * 0.08);
      group.position.y = Math.sin(time * 2.0) * 0.03;
    };
    return group;
  }

  static _createMumMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Balmumu Gövdesi (Eriyen Damlalar)
    const waxMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.4, flatShading: true });
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.6, 7), waxMat);
    candle.position.y = 0.3;
    group.add(candle);

    // Damla
    const drop = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), waxMat);
    drop.position.set(0.12, 0.42, 0.08);
    group.add(drop);

    // 2. Siyah Fitil ve Titreşen Alev
    const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.1, 3), new THREE.MeshBasicMaterial({ color: 0x18181b }));
    wick.position.y = 0.64;
    group.add(wick);

    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 5), flameMat);
    flame.position.y = 0.76;
    group.add(flame);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.9;
      flame.scale.y = 1.0 + Math.sin(time * 8.0) * 0.2;
      flame.scale.x = 1.0 + Math.cos(time * 6.0) * 0.1;
    };
    return group;
  }

  static _createVirusMesh(def) {
    const group = new THREE.Group();
    // 1. Biyolojik Virüs Çekirdek Kapsülü
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      flatShading: true
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 0), coreMat);
    core.position.y = 0.48;
    group.add(core);

    // 2. Yüzeydeki Diken Proteinleri (Spike Proteins)
    const spikeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, flatShading: true });
    for (let s = 0; s < 12; s++) {
      const ang1 = (s / 12) * Math.PI * 2;
      const ang2 = (s % 4) * 0.8 - 0.4;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.16, 4), spikeMat);
      spike.position.set(Math.cos(ang1) * 0.36, 0.48 + Math.sin(ang2) * 0.2, Math.sin(ang1) * 0.36);
      spike.rotation.set(Math.sin(ang1), 0, -Math.cos(ang1));
      group.add(spike);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.2;
      core.scale.setScalar(1.0 + Math.sin(time * 3.5) * 0.08);
      group.position.y = Math.sin(time * 2.0) * 0.03;
    };
    return group;
  }

  static _createCadirMesh(def) {
    const group = new THREE.Group();
    // 1. Kumaş Çadır Gövdesi (Piramidal Çatı)
    const tentMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8, flatShading: true });
    const tent = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.65, 4), tentMat);
    tent.position.y = 0.32;
    tent.rotation.y = Math.PI / 4;
    group.add(tent);

    // 2. Ahşap Destek Direkleri
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.72, 4), poleMat);
    pole.position.set(0, 0.35, 0.38);
    group.add(pole);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createTutunMesh(def) {
    const group = new THREE.Group();
    // 1. Fasetli Bitki Sapı ve Açılmış Yapraklar
    const plantMat = new THREE.MeshStandardMaterial({
      color: '#64748b',
      emissive: '#1e293b',
      emissiveIntensity: 0.25,
      roughness: 0.6,
      flatShading: true
    });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.65, 5), plantMat);
    stem.position.y = 0.32;
    group.add(stem);

    for (let l = 0; l < 4; l++) {
      const ang = (l / 4) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 3), plantMat);
      leaf.position.set(Math.cos(ang) * 0.16, 0.25 + l * 0.1, Math.sin(ang) * 0.16);
      leaf.rotation.set(Math.sin(ang) * 0.7, ang, Math.cos(ang) * 0.7);
      group.add(leaf);
    }

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 0.8;
    };
    return group;
  }

  static _createArchetypeMesh(def) {
    const archetype = def?.archetype3d || 'mineral';
    const primaryColor = def?.colorPalette?.primary ? new THREE.Color(def.colorPalette.primary) : new THREE.Color(0x38bdf8);
    const secondaryColor = def?.colorPalette?.secondary ? new THREE.Color(def.colorPalette.secondary) : new THREE.Color(0x818cf8);
    const emissiveColor = def?.colorPalette?.emissive ? new THREE.Color(def.colorPalette.emissive) : new THREE.Color(0x1e1b4b);

    const group = new THREE.Group();

    switch (archetype) {
      case 'fauna':
      case 'creature': {
        // 1. Fasetli Gövde
        const bodyGeo = new THREE.DodecahedronGeometry(0.32, 0);
        bodyGeo.scale(1.0, 0.9, 1.25);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.35,
          roughness: 0.65,
          flatShading: true
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.38;
        body.castShadow = true;
        group.add(body);

        // 2. Fasetli Baş
        const headGeo = new THREE.DodecahedronGeometry(0.2, 0);
        const head = new THREE.Mesh(headGeo, bodyMat);
        head.position.set(0, 0.58, 0.28);
        head.castShadow = true;
        group.add(head);

        // 3. Kulaklar
        const earGeo = new THREE.ConeGeometry(0.06, 0.14, 4);
        const earMat = new THREE.MeshStandardMaterial({ color: secondaryColor, flatShading: true });
        [-0.1, 0.1].forEach((ex, i) => {
          const ear = new THREE.Mesh(earGeo, earMat);
          ear.position.set(ex, 0.74, 0.26);
          ear.rotation.set(-0.2, 0, i === 0 ? -0.3 : 0.3);
          group.add(ear);
        });

        // 4. Parlayan Gözler
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
        [-0.07, 0.07].forEach(ex => {
          const eye = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.02), eyeMat);
          eye.position.set(ex, 0.6, 0.44);
          const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.022, 0.025), pupilMat);
          pupil.position.set(ex, 0.6, 0.445);
          group.add(eye);
          group.add(pupil);
        });

        // 5. 4 Bacak
        const legGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.24, 5);
        [[-0.14, -0.16], [0.14, -0.16], [-0.14, 0.16], [0.14, 0.16]].forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(legGeo, bodyMat);
          leg.position.set(lx, 0.14, lz);
          group.add(leg);
        });

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 0.9;
          body.position.y = 0.38 + Math.sin(time * 3.0) * 0.02;
          head.position.y = 0.58 + Math.sin(time * 3.0 + 0.5) * 0.025;
        };
        break;
      }

      case 'structure':
      case 'building': {
        // 1. Taş Basamak Kaidesi
        const baseGeo = new THREE.BoxGeometry(0.72, 0.12, 0.72);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x475569,
          roughness: 0.9,
          flatShading: true
        });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.06;
        base.castShadow = true;
        group.add(base);

        // 2. Ana Bina Gövdesi
        const towerGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.54, 6);
        const towerMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.3,
          roughness: 0.7,
          flatShading: true
        });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.y = 0.38;
        tower.castShadow = true;
        group.add(tower);

        // 3. Konik / Piramidal Kubbe Çatı
        const roofGeo = new THREE.ConeGeometry(0.42, 0.38, 6);
        const roofMat = new THREE.MeshStandardMaterial({
          color: secondaryColor,
          roughness: 0.5,
          metalness: 0.2,
          flatShading: true
        });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 0.82;
        roof.castShadow = true;
        group.add(roof);

        // 4. Zirve Süsü / Altın Uç
        const finialGeo = new THREE.OctahedronGeometry(0.08, 0);
        const finialMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8, roughness: 0.2 });
        const finial = new THREE.Mesh(finialGeo, finialMat);
        finial.position.y = 1.05;
        group.add(finial);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 0.8;
        };
        break;
      }

      case 'food': {
        // 1. Seramik / Ahşap Lezzet Tabağı
        const plateGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.08, 8);
        const plateMat = new THREE.MeshStandardMaterial({
          color: 0xf8fafc,
          roughness: 0.3,
          flatShading: true
        });
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.y = 0.04;
        group.add(plate);

        // 2. Ana Yiyecek Kütlesi (Fasetli Lezzet)
        const foodGeo = new THREE.DodecahedronGeometry(0.32, 0);
        foodGeo.scale(1.1, 0.85, 1.1);
        const foodMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.35,
          roughness: 0.45,
          flatShading: true
        });
        const food = new THREE.Mesh(foodGeo, foodMat);
        food.position.y = 0.32;
        food.castShadow = true;
        group.add(food);

        // 3. Üst Sos / Garnitür / Yaprak
        const topGeo = new THREE.ConeGeometry(0.14, 0.22, 5);
        const topMat = new THREE.MeshStandardMaterial({
          color: secondaryColor,
          roughness: 0.3,
          flatShading: true
        });
        const topMesh = new THREE.Mesh(topGeo, topMat);
        topMesh.position.set(0.04, 0.58, 0.02);
        topMesh.rotation.z = -0.2;
        group.add(topMesh);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 0.9;
        };
        break;
      }

      case 'mech': {
        // 1. Metalik Mekanik Gövde
        const chassisGeo = new THREE.BoxGeometry(0.48, 0.38, 0.48);
        const chassisMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.3,
          roughness: 0.35,
          metalness: 0.75,
          flatShading: true
        });
        const chassis = new THREE.Mesh(chassisGeo, chassisMat);
        chassis.position.y = 0.36;
        chassis.castShadow = true;
        group.add(chassis);

        // 2. Parlayan Çekirdek
        const coreGeo = new THREE.OctahedronGeometry(0.18, 0);
        const coreMat = new THREE.MeshStandardMaterial({
          color: secondaryColor,
          emissive: secondaryColor,
          emissiveIntensity: 1.0,
          flatShading: true
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(0, 0.36, 0.25);
        group.add(core);

        // 3. Anten / Sensör
        const antGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.3, 4);
        const antMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
        const ant = new THREE.Mesh(antGeo, antMat);
        ant.position.set(0.14, 0.65, -0.1);
        group.add(ant);

        const tipGeo = new THREE.SphereGeometry(0.05, 5, 4);
        const tipMat = new THREE.MeshBasicMaterial({ color: secondaryColor });
        const tip = new THREE.Mesh(tipGeo, tipMat);
        tip.position.set(0.14, 0.8, -0.1);
        group.add(tip);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 1.0;
          core.rotation.z += dt * 2.5;
        };
        break;
      }

      case 'fluid':
      case 'liquid': {
        const rippleGeo = new THREE.CylinderGeometry(0.55, 0.62, 0.08, 8);
        const rippleMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.35,
          roughness: 0.15,
          transparent: true,
          opacity: 0.85,
          flatShading: true
        });
        const ripple = new THREE.Mesh(rippleGeo, rippleMat);
        ripple.position.y = 0.06;
        group.add(ripple);

        const dropGeo = new THREE.IcosahedronGeometry(0.36, 1);
        dropGeo.scale(1.0, 1.3, 1.0);
        const dropMat = new THREE.MeshStandardMaterial({
          color: secondaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.45,
          roughness: 0.1,
          transparent: true,
          opacity: 0.9,
          flatShading: true
        });
        const drop = new THREE.Mesh(dropGeo, dropMat);
        drop.position.y = 0.5;
        drop.castShadow = true;
        group.add(drop);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 0.9;
          drop.position.y = 0.5 + Math.sin(time * 2.5) * 0.05;
        };
        break;
      }

      case 'flame': {
        const flameGeo = new THREE.ConeGeometry(0.36, 0.88, 6);
        const flameMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.9,
          roughness: 0.3,
          flatShading: true
        });
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.y = 0.52;
        flame.castShadow = true;
        group.add(flame);

        const innerGeo = new THREE.ConeGeometry(0.2, 0.48, 5);
        const innerMat = new THREE.MeshStandardMaterial({
          color: secondaryColor,
          emissive: 0xfff0a0,
          emissiveIntensity: 1.2,
          flatShading: true
        });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        inner.position.y = 0.36;
        group.add(inner);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 1.2;
          flame.scale.y = 1.0 + Math.sin(time * 5.0) * 0.08;
          flame.scale.x = 1.0 + Math.cos(time * 4.0) * 0.05;
        };
        break;
      }

      case 'gas': {
        const ringGeo = new THREE.TorusGeometry(0.38, 0.08, 4, 8);
        const ringMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.8,
          flatShading: true
        });
        const r1 = new THREE.Mesh(ringGeo, ringMat);
        r1.position.y = 0.35;
        r1.rotation.x = Math.PI / 3;
        group.add(r1);

        const r2 = new THREE.Mesh(ringGeo, ringMat);
        r2.position.y = 0.55;
        r2.rotation.x = -Math.PI / 4;
        group.add(r2);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          r1.rotation.z += dt * 1.2;
          r2.rotation.z -= dt * 1.0;
          group.rotation.y += dt * 0.6;
        };
        break;
      }

      case 'electric': {
        const orbGeo = new THREE.DodecahedronGeometry(0.32, 0);
        const orbMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 1.1,
          roughness: 0.2,
          flatShading: true
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.y = 0.48;
        orb.castShadow = true;
        group.add(orb);

        const ringGeo = new THREE.TorusGeometry(0.48, 0.035, 4, 8);
        const ringMat = new THREE.MeshBasicMaterial({ color: secondaryColor });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = 0.48;
        group.add(ring);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          orb.rotation.x += dt * 2.0;
          orb.rotation.y += dt * 2.5;
          ring.rotation.x += dt * 1.5;
          ring.rotation.y += dt * 1.8;
        };
        break;
      }

      case 'flora': {
        const stemGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.65, 5);
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8, flatShading: true });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 0.32;
        stem.castShadow = true;
        group.add(stem);

        const petalGeo = new THREE.DodecahedronGeometry(0.26, 0);
        const petalMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.4,
          roughness: 0.5,
          flatShading: true
        });
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.position.y = 0.68;
        petal.castShadow = true;
        group.add(petal);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 0.8;
          petal.position.y = 0.68 + Math.sin(time * 2.0) * 0.03;
        };
        break;
      }

      case 'fabric': {
        const rollGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.65, 7);
        const rollMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          roughness: 0.85,
          metalness: 0.05,
          flatShading: true
        });
        const roll = new THREE.Mesh(rollGeo, rollMat);
        roll.position.y = 0.38;
        roll.rotation.z = Math.PI / 4;
        roll.castShadow = true;
        group.add(roll);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 0.8;
        };
        break;
      }

      case 'magic':
      case 'relic': {
        const crystalGeo = new THREE.OctahedronGeometry(0.42, 0);
        crystalGeo.scale(0.85, 1.3, 0.85);
        const crystalMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.8,
          roughness: 0.2,
          metalness: 0.3,
          flatShading: true
        });
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.position.y = 0.5;
        crystal.castShadow = true;
        group.add(crystal);

        const auraGeo = new THREE.TorusGeometry(0.5, 0.03, 4, 8);
        const auraMat = new THREE.MeshBasicMaterial({ color: secondaryColor });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        aura.position.y = 0.5;
        aura.rotation.x = Math.PI / 2;
        group.add(aura);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 1.1;
          crystal.position.y = 0.5 + Math.sin(time * 2.2) * 0.05;
          aura.position.y = crystal.position.y;
          aura.rotation.z += dt * 1.5;
        };
        break;
      }

      case 'mineral':
      case 'solid':
      default: {
        const baseGeo = new THREE.CylinderGeometry(0.5, 0.62, 0.28, 6);
        const baseMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.3,
          roughness: 0.7,
          metalness: 0.25,
          flatShading: true
        });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.16;
        base.castShadow = true;
        group.add(base);

        const gemGeo = new THREE.OctahedronGeometry(0.3, 0);
        const gemMat = new THREE.MeshStandardMaterial({
          color: secondaryColor,
          emissive: secondaryColor,
          emissiveIntensity: 0.6,
          roughness: 0.25,
          metalness: 0.45,
          flatShading: true
        });
        const gem = new THREE.Mesh(gemGeo, gemMat);
        gem.position.set(0.04, 0.46, 0.02);
        gem.rotation.set(0.2, 0.3, 0.1);
        gem.castShadow = true;
        group.add(gem);

        group.userData.update = (time, delta) => {
          const dt = delta || 0.016;
          group.rotation.y += dt * 0.9;
        };
        break;
      }
    }

    return group;
  }

  static _createDefaultMesh(def) {
    return this._createArchetypeMesh(def);
  }

  static _generateFracturePieces(def) {
    const pieces = [];
    const mat = new THREE.MeshStandardMaterial({
      color: def.colorPalette?.primary || 0x6366f1,
      roughness: 0.5,
      emissive: def.colorPalette?.emissive || '#000000',
      emissiveIntensity: 0.3,
      flatShading: true
    });

    for (let i = 0; i < 5; i++) {
      const pieceGeo = new THREE.TetrahedronGeometry(0.22 + Math.random() * 0.12, 0);
      const piece = new THREE.Mesh(pieceGeo, mat);
      piece.userData.breakVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 4
      );
      pieces.push(piece);
    }
    return pieces;
  }
  static _createSiberKristalMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Çift Piramit Siber Kristal
    const crysGeo = new THREE.OctahedronGeometry(0.48, 0);
    crysGeo.scale(0.75, 1.4, 0.75);
    const crysMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      metalness: 0.2,
      flatShading: true
    });
    const crys = new THREE.Mesh(crysGeo, crysMat);
    crys.position.y = 0.45;
    crys.add(this._createOutline(crysGeo, 0x0284c7, 0.035));
    group.add(crys);

    // İçte parlayan fasetli siber çekirdek
    const coreGeo = new THREE.OctahedronGeometry(0.18, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.0,
      flatShading: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.45;
    group.add(core);

    const light = new THREE.PointLight(0x38bdf8, 2.5, 3.0);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      core.rotation.y += dt * 1.2;
      crys.position.y = 0.45 + Math.sin(time * 2.5) * 0.035;
      core.position.y = crys.position.y;
    };

    return group;
  }

  static _createHologramKupuMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Koyu Siber Çerçeve
    const frameGeo = new THREE.BoxGeometry(0.68, 0.68, 0.68);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.42;
    frame.add(this._createOutline(frameGeo, 0x0f172a, 0.035));
    group.add(frame);

    // İçte 45 derece dönük parlayan zümrüt hologram küpü
    const holoGeo = new THREE.BoxGeometry(0.44, 0.44, 0.44);
    const holoMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.95,
      roughness: 0.2,
      flatShading: true
    });
    const holo = new THREE.Mesh(holoGeo, holoMat);
    holo.position.y = 0.42;
    holo.rotation.set(0.4, 0.4, 0.2);
    group.add(holo);

    const light = new THREE.PointLight(0x34d399, 2.2, 2.5);
    light.position.set(0, 0.42, 0.2);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      holo.rotation.x += dt * 0.8;
      holo.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createBuharJeneratoruMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Bronz Buhar Silindiri (8 köşeli silindir)
    const tankGeo = new THREE.CylinderGeometry(0.28, 0.3, 0.54, 8);
    const tankMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.75,
      roughness: 0.35,
      flatShading: true
    });
    const tank = new THREE.Mesh(tankGeo, tankMat);
    tank.position.set(0.12, 0.38, 0);
    tank.add(this._createOutline(tankGeo, 0x78350f, 0.035));
    group.add(tank);

    // Fasetli yan dişli çark (6 köşeli prizma)
    const gearGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 6);
    gearGeo.rotateZ(Math.PI / 2);
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const gear = new THREE.Mesh(gearGeo, gearMat);
    gear.position.set(-0.22, 0.38, 0);
    group.add(gear);

    // Üst fasetli buhar bacası (6 köşeli)
    const pipeGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.22, 6);
    const pipe = new THREE.Mesh(pipeGeo, tankMat);
    pipe.position.set(0.12, 0.72, 0);
    group.add(pipe);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      gear.rotation.x += dt * 2.0;
    };

    return group;
  }

  static _createMekaZirhiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Ağır Meka Göğüs Zırhı
    const chestGeo = new THREE.BoxGeometry(0.7, 0.62, 0.34);
    const chestMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const chest = new THREE.Mesh(chestGeo, chestMat);
    chest.position.y = 0.42;
    chest.add(this._createOutline(chestGeo, 0x1e293b, 0.04));
    group.add(chest);

    // Fasetli köşeli omuzluklar
    const shoulderGeo = new THREE.BoxGeometry(0.25, 0.28, 0.36);
    [-0.44, 0.44].forEach((x) => {
      const shoulder = new THREE.Mesh(shoulderGeo, chestMat);
      shoulder.position.set(x, 0.6, 0);
      shoulder.add(this._createOutline(shoulderGeo, 0x1e293b, 0.035));
      group.add(shoulder);
    });

    // Merkezde fasetli turuncu reaktör çekirdeği (6 köşeli prizma)
    const reactorGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 6);
    reactorGeo.rotateX(Math.PI / 2);
    const reactorMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 1.2,
      flatShading: true
    });
    const reactor = new THREE.Mesh(reactorGeo, reactorMat);
    reactor.position.set(0, 0.42, 0.16);
    group.add(reactor);

    const light = new THREE.PointLight(0xf97316, 2.2, 2.0);
    light.position.set(0, 0.42, 0.25);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      reactor.scale.setScalar(0.95 + Math.sin(time * 3.0) * 0.06);
    };

    return group;
  }

  static _createPlazmaTufegiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Tüfek Gövdesi
    const bodyGeo = new THREE.BoxGeometry(0.82, 0.22, 0.14);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0.38, 0);
    body.add(this._createOutline(bodyGeo, 0x0f172a, 0.035));
    group.add(body);

    // 6 fasetli heksagonal plazma namlusu
    const barrelGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.46, 6);
    barrelGeo.rotateZ(Math.PI / 2);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.85,
      flatShading: true
    });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.set(0.48, 0.38, 0);
    group.add(barrel);

    // Üst fasetli dürbün (5 köşeli prizma)
    const scopeGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.34, 5);
    scopeGeo.rotateZ(Math.PI / 2);
    const scope = new THREE.Mesh(scopeGeo, bodyMat);
    scope.position.set(0.05, 0.54, 0);
    group.add(scope);

    // Lazer namlu ucu ışığı
    const light = new THREE.PointLight(0xec4899, 2.0, 2.0);
    light.position.set(0.72, 0.38, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createFelsefeTasiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Yakut Felsefe Taşı (Dodecahedron)
    const stoneGeo = new THREE.DodecahedronGeometry(0.42, 0);
    stoneGeo.scale(0.85, 1.3, 0.85);
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.75,
      roughness: 0.2,
      metalness: 0.1,
      flatShading: true
    });
    const stone = new THREE.Mesh(stoneGeo, stoneMat);
    stone.position.y = 0.45;
    stone.add(this._createOutline(stoneGeo, 0x7f1d1d, 0.035));
    group.add(stone);

    // Fasetli 8 köşeli altın yuva taç
    const goldGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.1, 8);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const goldRing = new THREE.Mesh(goldGeo, goldMat);
    goldRing.position.y = 0.38;
    group.add(goldRing);

    const light = new THREE.PointLight(0xef4444, 2.5, 2.8);
    light.position.set(0, 0.48, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      stone.position.y = 0.45 + Math.sin(time * 2.4) * 0.03;
    };

    return group;
  }

  static _createGunesPaneliMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Eğimli Güneş Paneli
    const panelGeo = new THREE.BoxGeometry(0.76, 0.58, 0.06);
    panelGeo.rotateX(0.45);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45,
      metalness: 0.6,
      roughness: 0.2,
      flatShading: true
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.y = 0.42;
    panel.add(this._createOutline(panelGeo, 0x0c4a6e, 0.035));
    group.add(panel);

    // Fasetli 6 köşeli çelik kaide
    const standGeo = new THREE.CylinderGeometry(0.05, 0.08, 0.35, 6);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.75,
      roughness: 0.3,
      flatShading: true
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.set(0, 0.16, -0.08);
    group.add(stand);

    const light = new THREE.PointLight(0xfde047, 1.8, 2.0);
    light.position.set(0, 0.6, 0.2);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createYercekimsizPlatformMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli 8 Köşeli Metal İniş Platformu
    const discGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.12, 8);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.25
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.y = 0.28;
    disc.add(this._createOutline(discGeo, 0x0f172a, 0.035));
    group.add(disc);

    // Üstündeki mor parıldayan anti-yerçekimi ışık halkası
    const glowGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.03, 24);
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 1.2
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.y = 0.35;
    group.add(glow);

    // Yukarı uzanan hüzme konisi
    const beamGeo = new THREE.ConeGeometry(0.45, 0.5, 16, 1, true);
    beamGeo.rotateX(Math.PI);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 0.62;
    group.add(beam);

    const light = new THREE.PointLight(0xa855f7, 2.4, 2.5);
    light.position.set(0, 0.45, 0);
    group.add(light);
    return group;
  }

  static _createBiyonikKolMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Biyonik Kol Gövdesi (6 köşeli silindir)
    const armGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.54, 6);
    armGeo.rotateZ(-0.4);
    const armMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.set(-0.08, 0.38, 0);
    arm.add(this._createOutline(armGeo, 0x1e293b, 0.035));
    group.add(arm);

    // Fasetli mekanik el (köşeli prizma)
    const handGeo = new THREE.BoxGeometry(0.2, 0.22, 0.12);
    handGeo.rotateZ(-0.4);
    const hand = new THREE.Mesh(handGeo, armMat);
    hand.position.set(0.14, 0.62, 0);
    hand.add(this._createOutline(handGeo, 0x1e293b, 0.035));
    group.add(hand);

    // Mavi siber eklem / neon sinir hattı
    const jointGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.14, 6);
    jointGeo.rotateX(Math.PI / 2);
    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.2,
      flatShading: true
    });
    const joint = new THREE.Mesh(jointGeo, jointMat);
    joint.position.set(0.03, 0.5, 0);
    group.add(joint);

    const light = new THREE.PointLight(0x06b6d4, 1.8, 2.0);
    light.position.set(0.05, 0.45, 0.15);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createUsturlapMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Sekizgen Altın Kaide
    const baseGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.08, 8);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const base = new THREE.Mesh(baseGeo, goldMat);
    base.position.y = 0.08;
    base.add(this._createOutline(baseGeo, 0xa16207, 0.035));
    group.add(base);

    // İçte fasetli lacivert gök küresi (Icosahedron)
    const sphereGeo = new THREE.IcosahedronGeometry(0.24, 0);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      flatShading: true
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.y = 0.45;
    group.add(sphere);

    // 2 adet fasetli altın yörünge halkası (4 segmentli Torus)
    const ringGeo = new THREE.TorusGeometry(0.38, 0.03, 4, 12);
    const ring1 = new THREE.Mesh(ringGeo, goldMat);
    ring1.position.y = 0.45;
    ring1.rotation.x = 0.6;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, goldMat);
    ring2.position.y = 0.45;
    ring2.rotation.y = 0.8;
    ring2.rotation.z = 0.5;
    group.add(ring2);

    const light = new THREE.PointLight(0xfacc15, 2.0, 2.2);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ring1.rotation.z += dt * 0.7;
      ring2.rotation.x += dt * 0.5;
    };

    return group;
  }

  static _createTeslaBobiniMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Taban Standı (8 köşeli silindir)
    const baseGeo = new THREE.CylinderGeometry(0.3, 0.36, 0.12, 8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.75,
      roughness: 0.3,
      flatShading: true
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.08;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.035));
    group.add(base);

    // Fasetli bakır sarımlı sütun (6 köşeli)
    const colGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.48, 6);
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    const col = new THREE.Mesh(colGeo, copperMat);
    col.position.y = 0.38;
    group.add(col);

    // Tepe plazma küresi (Icosahedron - fasetli)
    const orbGeo = new THREE.IcosahedronGeometry(0.18, 0);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.1,
      metalness: 0.3,
      roughness: 0.15,
      flatShading: true
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 0.68;
    group.add(orb);

    const light = new THREE.PointLight(0x38bdf8, 2.8, 3.0);
    light.position.set(0, 0.68, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      orb.rotation.y += dt * 1.5;
      orb.scale.setScalar(0.95 + Math.sin(time * 6.0) * 0.06);
    };

    return group;
  }

  static _createKuantumIslemciMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Kare Çip Substratı
    const chipGeo = new THREE.BoxGeometry(0.68, 0.1, 0.68);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.y = 0.32;
    chip.add(this._createOutline(chipGeo, 0x0284c7, 0.035));
    group.add(chip);

    // Merkezde parlayan fasetli kuantum çekirdek (dönük kutu)
    const coreGeo = new THREE.BoxGeometry(0.32, 0.14, 0.32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.1,
      roughness: 0.2,
      flatShading: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.34;
    core.rotation.y = Math.PI / 4;
    group.add(core);

    // Dışarı uzanan metalik bağlantı pinleri
    const pinGeo = new THREE.BoxGeometry(0.76, 0.03, 0.76);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.2,
      flatShading: true
    });
    const pins = new THREE.Mesh(pinGeo, pinMat);
    pins.position.y = 0.3;
    group.add(pins);

    const light = new THREE.PointLight(0x38bdf8, 2.4, 2.8);
    light.position.set(0, 0.42, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      core.rotation.y += dt * 0.8;
    };

    return group;
  }

  static _createMinyaturYildizMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Manyetik Muhafaza Kafesi Halkaları
    const ringGeo = new THREE.TorusGeometry(0.44, 0.035, 4, 12);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.y = 0.45;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.position.y = 0.45;
    ring2.rotation.x = Math.PI / 2;
    group.add(ring2);

    // İçte alev alev parıldayan fasetli mikro süpernova çekirdeği (Icosahedron)
    const starGeo = new THREE.IcosahedronGeometry(0.26, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xef4444,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      flatShading: true
    });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.y = 0.45;
    group.add(star);

    const light = new THREE.PointLight(0xf97316, 3.2, 3.5);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      ring1.rotation.z += dt * 0.8;
      ring2.rotation.y += dt * 0.6;
      star.rotation.y += dt * 1.2;
      star.scale.setScalar(0.96 + Math.sin(time * 4.0) * 0.05);
    };

    return group;
  }

  // ================= KATEGORİ 10: DOĞA & COĞRAFYA 3D MODELLERİ ================
  static _createDagMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Dağ Ana Konisi (5 köşeli piramit)
    const mntGeo = new THREE.ConeGeometry(0.55, 0.75, 5);
    const mntMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.8,
      flatShading: true
    });
    const mnt = new THREE.Mesh(mntGeo, mntMat);
    mnt.position.y = 0.38;
    mnt.add(this._createOutline(mntGeo, 0x1e293b, 0.035));
    group.add(mnt);

    // Karlı fasetli zirve şapkası (5 köşeli)
    const snowGeo = new THREE.ConeGeometry(0.26, 0.32, 5);
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      flatShading: true
    });
    const snow = new THREE.Mesh(snowGeo, snowMat);
    snow.position.y = 0.6;
    group.add(snow);

    // Yan küçük fasetli etek tepesi (4 köşeli)
    const subGeo = new THREE.ConeGeometry(0.24, 0.36, 4);
    const subMnt = new THREE.Mesh(subGeo, mntMat);
    subMnt.position.set(0.28, 0.18, 0.15);
    group.add(subMnt);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createKayaMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Düzensiz Monolit Kaya (Dodecahedron)
    const rockGeo = new THREE.DodecahedronGeometry(0.46, 0);
    rockGeo.scale(1.0, 0.85, 0.9);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.85,
      flatShading: true
    });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.y = 0.38;
    rock.add(this._createOutline(rockGeo, 0x292524, 0.035));
    group.add(rock);

    // Fasetli yosun lekesi (küçük fasetli parça)
    const mossGeo = new THREE.DodecahedronGeometry(0.18, 0);
    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x65a30d,
      roughness: 0.8,
      flatShading: true
    });
    const moss = new THREE.Mesh(mossGeo, mossMat);
    moss.position.set(0.18, 0.52, 0.2);
    group.add(moss);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createGunesMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Parlak Güneş Küresi (Icosahedron)
    const sunGeo = new THREE.IcosahedronGeometry(0.36, 0);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      flatShading: true
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.y = 0.45;
    sun.add(this._createOutline(sunGeo, 0xb45309, 0.035));
    group.add(sun);

    // Çevresindeki 8 adet fasetli ışın sivrisi (4 köşeli koniler)
    const rayGeo = new THREE.ConeGeometry(0.08, 0.22, 4);
    const rayMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      flatShading: true
    });
    const rayGroup = new THREE.Group();
    rayGroup.position.y = 0.45;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(Math.cos(angle) * 0.48, Math.sin(angle) * 0.48, 0);
      ray.rotation.z = angle - Math.PI / 2;
      rayGroup.add(ray);
    }
    group.add(rayGroup);

    const light = new THREE.PointLight(0xfde047, 2.8, 3.5);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      rayGroup.rotation.z += dt * 0.5;
    };

    return group;
  }

  static _createOkyanusMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Kıvrılan Turkuaz Dalga (5 segmentli fasetli yay)
    const waveGeo = new THREE.TorusGeometry(0.42, 0.16, 5, 8, Math.PI * 1.25);
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.1,
      flatShading: true
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.position.set(0, 0.42, 0);
    wave.rotation.z = -0.6;
    wave.add(this._createOutline(waveGeo, 0x0c4a6e, 0.035));
    group.add(wave);

    // Fasetli beyaz köpük tepesi (Icosahedron)
    const foamGeo = new THREE.IcosahedronGeometry(0.13, 0);
    const foamMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      flatShading: true
    });
    const foam = new THREE.Mesh(foamGeo, foamMat);
    foam.position.set(0.24, 0.65, 0);
    group.add(foam);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      wave.rotation.z = -0.6 + Math.sin(time * 2.0) * 0.08;
    };

    return group;
  }

  static _createVolkanMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Yanardağ Konisi (7 köşeli koni)
    const volcanoGeo = new THREE.CylinderGeometry(0.16, 0.58, 0.65, 7);
    const volcanoMat = new THREE.MeshStandardMaterial({
      color: 0x44403c,
      roughness: 0.85,
      flatShading: true
    });
    const volcano = new THREE.Mesh(volcanoGeo, volcanoMat);
    volcano.position.y = 0.35;
    volcano.add(this._createOutline(volcanoGeo, 0x1c1917, 0.035));
    group.add(volcano);

    // Kraterdeki fasetli fokurdayan kızgın lav havuzu (7 köşeli)
    const craterGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.06, 7);
    const lavaMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 1.4,
      flatShading: true
    });
    const lava = new THREE.Mesh(craterGeo, lavaMat);
    lava.position.y = 0.68;
    group.add(lava);

    // Fasetli lav damlası
    const dropGeo = new THREE.OctahedronGeometry(0.06, 0);
    const drop = new THREE.Mesh(dropGeo, lavaMat);
    drop.position.set(0, 0.8, 0);
    group.add(drop);

    const light = new THREE.PointLight(0xf97316, 2.5, 2.5);
    light.position.set(0, 0.72, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      drop.position.y = 0.78 + Math.sin(time * 4.0) * 0.06;
    };

    return group;
  }

  static _createAdaMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Turkuaz Okyanus Tabanı (8 köşeli silindir)
    const waterGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.06, 8);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      flatShading: true
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.12;
    group.add(water);

    // Fasetli altın kum tepesi (7 köşeli silindir)
    const sandGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.12, 7);
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.75,
      flatShading: true
    });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.position.y = 0.2;
    sand.add(this._createOutline(sandGeo, 0xca8a04, 0.035));
    group.add(sand);

    // Fasetli palmiye ağacı (gövde + fasetli yapraklar)
    const trunkGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.38, 5);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.8,
      flatShading: true
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(0, 0.42, 0);
    trunk.rotation.z = -0.15;
    group.add(trunk);

    const leafGeo = new THREE.ConeGeometry(0.24, 0.16, 6);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(0, 0.62, 0);
    group.add(leaf);

    return group;
  }

  static _createNehirMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Kanyon / Çayır Vadisi Kaidesi (İki Yakası Çimen)
    const baseGeo = new THREE.CylinderGeometry(0.52, 0.56, 0.1, 7);
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8, flatShading: true });
    const base = new THREE.Mesh(baseGeo, grassMat);
    base.position.y = 0.07;
    base.add(this._createOutline(baseGeo, 0x14532d, 0.035));
    group.add(base);

    // Kıyı Taşları
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x64748b, flatShading: true });
    [[-0.24, 0.14, 0.15], [0.26, 0.14, -0.18], [-0.18, 0.14, -0.22]].forEach(([sx, sy, sz]) => {
      const pebble = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), stoneMat);
      pebble.position.set(sx, sy, sz);
      group.add(pebble);
    });

    // 2. Kıvrılarak Akan Fasetli Turkuaz Nehir
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      flatShading: true
    });
    const riverGeo = new THREE.BoxGeometry(0.32, 0.06, 0.95);
    riverGeo.rotateY(0.4);
    const river = new THREE.Mesh(riverGeo, waterMat);
    river.position.set(0, 0.12, 0);
    river.add(this._createOutline(riverGeo, 0x0c4a6e, 0.035));
    group.add(river);

    // Köpük Parçacıkları (Foam)
    const foamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    const foam1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), foamMat);
    foam1.position.set(-0.06, 0.15, 0.12);
    group.add(foam1);

    const foam2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.04, 0), foamMat);
    foam2.position.set(0.08, 0.15, -0.14);
    group.add(foam2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      foam1.position.x = -0.06 + Math.sin(time * 4.0) * 0.03;
      foam2.position.z = -0.14 + Math.cos(time * 4.0) * 0.03;
    };

    return group;
  }

  static _createOrmanMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Orman Kaidesi ve 3 Çam Ağacı
    const groundGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.08, 8);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.8,
      flatShading: true
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = 0.08;
    ground.add(this._createOutline(groundGeo, 0x14532d, 0.035));
    group.add(ground);

    const createTree = (x, z, scale) => {
      const treeGroup = new THREE.Group();
      const trunkGeo = new THREE.CylinderGeometry(0.035 * scale, 0.05 * scale, 0.22 * scale, 5);
      const trunkMat = new THREE.MeshStandardMaterial({
        color: 0x5c4033,
        roughness: 0.8,
        flatShading: true
      });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.11 * scale;
      treeGroup.add(trunk);

      // Çift katmanlı fasetli çam yaprağı (5 köşeli koniler)
      const foilMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        roughness: 0.7,
        flatShading: true
      });
      const foil1 = new THREE.Mesh(new THREE.ConeGeometry(0.22 * scale, 0.32 * scale, 5), foilMat);
      foil1.position.y = 0.28 * scale;
      foil1.add(this._createOutline(foil1.geometry, 0x14532d, 0.03));
      treeGroup.add(foil1);

      const foil2 = new THREE.Mesh(new THREE.ConeGeometry(0.16 * scale, 0.26 * scale, 5), foilMat);
      foil2.position.y = 0.44 * scale;
      treeGroup.add(foil2);

      treeGroup.position.set(x, 0.08, z);
      return treeGroup;
    };

    group.add(createTree(0, -0.05, 1.25));
    group.add(createTree(-0.24, 0.1, 0.95));
    group.add(createTree(0.24, 0.08, 1.0));

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createFirtinaBulutuMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Koyu Fırtına Bulutu Kümeleri (Icosahedron)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      emissive: 0x1e293b,
      emissiveIntensity: 0.3,
      roughness: 0.85,
      flatShading: true
    });
    const c1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 0), cloudMat);
    c1.position.set(0, 0.5, 0);
    c1.add(this._createOutline(c1.geometry, 0x0f172a, 0.035));
    group.add(c1);

    const c2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), cloudMat);
    c2.position.set(-0.25, 0.44, 0);
    group.add(c2);

    const c3 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 0), cloudMat);
    c3.position.set(0.25, 0.46, 0);
    group.add(c3);

    // Aşağı sarkan fasetli sarı şimşek oku (4 köşeli koni)
    const boltGeo = new THREE.ConeGeometry(0.09, 0.34, 4);
    const boltMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 1.4,
      flatShading: true
    });
    const bolt = new THREE.Mesh(boltGeo, boltMat);
    bolt.position.set(0, 0.16, 0.05);
    bolt.rotation.z = Math.PI;
    group.add(bolt);

    const light = new THREE.PointLight(0xfef08a, 2.4, 2.5);
    light.position.set(0, 0.2, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      bolt.scale.y = 0.85 + Math.sin(time * 8.0) * 0.2;
    };

    return group;
  }

  static _createMagaraMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Dağ Yamacı Kaidesi
    const mountainBaseGeo = new THREE.CylinderGeometry(0.52, 0.58, 0.12, 7);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9, flatShading: true });
    const mBase = new THREE.Mesh(mountainBaseGeo, rockMat);
    mBase.position.y = 0.08;
    mBase.add(this._createOutline(mountainBaseGeo, 0x0f172a, 0.035));
    group.add(mBase);

    // Yosunlu Üst Kaya Kubbesi (Mağara Girişi Kemeri)
    const archMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85, flatShading: true });
    const archGeo = new THREE.DodecahedronGeometry(0.36, 0);
    archGeo.scale(1.3, 1.1, 0.9);
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(0, 0.44, 0);
    arch.add(this._createOutline(archGeo, 0x1e293b, 0.035));
    group.add(arch);

    // Girişte Yosun Katmanı
    const mossMat = new THREE.MeshStandardMaterial({ color: 0x15803d, flatShading: true });
    const moss = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), mossMat);
    moss.position.set(-0.28, 0.58, 0.15);
    group.add(moss);

    // 2. Derin Karanlık Mağara Ağzı (Kovuk)
    const caveVoidGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.32, 5);
    caveVoidGeo.rotateX(Math.PI / 2);
    const voidMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const caveVoid = new THREE.Mesh(caveVoidGeo, voidMat);
    caveVoid.position.set(0, 0.32, 0.18);
    group.add(caveVoid);

    // Mağara İçinden Parlayan Mor Kristaller
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.9,
      flatShading: true
    });
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), crystalMat);
    crystal.position.set(0.06, 0.34, 0.14);
    group.add(crystal);

    const glowLight = new THREE.PointLight(0xa855f7, 2.2, 2.2);
    glowLight.position.set(0, 0.36, 0.2);
    group.add(glowLight);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      crystal.scale.setScalar(0.9 + Math.sin(time * 3.0) * 0.15);
      glowLight.intensity = 1.8 + Math.sin(time * 3.0) * 0.6;
    };

    return group;
  }

  static _createGokkusagiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Renkli Gökkuşağı Yayı (4 fasetli yay)
    const rainbowGeo = new THREE.TorusGeometry(0.48, 0.07, 4, 12, Math.PI);
    const rainbowMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.65,
      roughness: 0.25,
      flatShading: true
    });
    const rainbow = new THREE.Mesh(rainbowGeo, rainbowMat);
    rainbow.position.y = 0.26;
    rainbow.add(this._createOutline(rainbowGeo, 0x831843, 0.03));
    group.add(rainbow);

    // İki uçtaki fasetli beyaz puf bulutlar (Icosahedron)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.4,
      flatShading: true
    });
    const cLeft = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15, 0), cloudMat);
    cLeft.position.set(-0.48, 0.26, 0);
    group.add(cLeft);

    const cRight = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15, 0), cloudMat);
    cRight.position.set(0.48, 0.26, 0);
    group.add(cRight);

    const light = new THREE.PointLight(0xf472b6, 2.0, 2.5);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createKanyonMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli İki Yan Kızıl Kanyon Duvarı
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.85,
      flatShading: true
    });
    const wallGeo = new THREE.BoxGeometry(0.28, 0.65, 0.6);
    const leftWall = new THREE.Mesh(wallGeo, rockMat);
    leftWall.position.set(-0.25, 0.38, 0);
    leftWall.rotation.z = 0.08;
    leftWall.add(this._createOutline(wallGeo, 0x431407, 0.035));
    group.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeo, rockMat);
    rightWall.position.set(0.25, 0.38, 0);
    rightWall.rotation.z = -0.08;
    rightWall.add(this._createOutline(wallGeo, 0x431407, 0.035));
    group.add(rightWall);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createFayHattiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli İkiye Ayrılmış Çatlak Zemin Plakaları
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x57534e,
      roughness: 0.9,
      flatShading: true
    });
    const p1Geo = new THREE.BoxGeometry(0.34, 0.16, 0.68);
    const p1 = new THREE.Mesh(p1Geo, groundMat);
    p1.position.set(-0.2, 0.25, 0);
    p1.rotation.y = 0.15;
    p1.rotation.z = -0.05;
    p1.add(this._createOutline(p1Geo, 0x1c1917, 0.035));
    group.add(p1);

    const p2Geo = new THREE.BoxGeometry(0.34, 0.16, 0.68);
    const p2 = new THREE.Mesh(p2Geo, groundMat);
    p2.position.set(0.2, 0.25, 0);
    p2.rotation.y = -0.15;
    p2.rotation.z = 0.05;
    p2.add(this._createOutline(p2Geo, 0x1c1917, 0.035));
    group.add(p2);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createBulutMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Pamuksu Beyaz Bulut Kümeleri (Icosahedron)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      flatShading: true
    });
    const c1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 0), cloudMat);
    c1.position.set(0, 0.42, 0);
    c1.add(this._createOutline(c1.geometry, 0x94a3b8, 0.035));
    group.add(c1);

    const c2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), cloudMat);
    c2.position.set(-0.24, 0.38, 0);
    group.add(c2);

    const c3 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), cloudMat);
    c3.position.set(0.24, 0.4, 0);
    group.add(c3);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 1.8) * 0.03;
    };

    return group;
  }

  // ================= KATEGORİ 3 & 2: CANLILAR, FAUNA & DOĞA 3D MODELLERİ ================
  static _createAtMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Otlak Kaidesi
    const baseGeo = new THREE.CylinderGeometry(0.52, 0.56, 0.08, 7);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.8,
      flatShading: true
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.06;
    base.add(this._createOutline(baseGeo, 0x14532d, 0.035));
    group.add(base);

    // 2. Fasetli Kestane At Gövdesi (6 köşeli prizma)
    const horseMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      roughness: 0.6,
      flatShading: true
    });
    const darkManeMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.7,
      flatShading: true
    });

    const bodyGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.68, 6);
    bodyGeo.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, horseMat);
    body.position.set(0, 0.48, 0);
    body.add(this._createOutline(bodyGeo, 0x713f12, 0.035));
    group.add(body);

    // 3. Güçlü 4 Uzun Bacak ve Siyah Toynaklar
    const legGeo = new THREE.CylinderGeometry(0.045, 0.038, 0.38, 5);
    const hoofMat = new THREE.MeshStandardMaterial({ color: 0x18181b, flatShading: true });
    [[-0.14, -0.22], [0.14, -0.22], [-0.14, 0.22], [0.14, 0.22]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, horseMat);
      leg.position.set(lx, 0.24, lz);
      group.add(leg);

      const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.06, 0.075), hoofMat);
      hoof.position.set(lx, 0.08, lz);
      group.add(hoof);
    });

    // 4. Dik Asil Boyun ve Baş
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.38, 5);
    neckGeo.rotateX(0.45);
    const neck = new THREE.Mesh(neckGeo, horseMat);
    neck.position.set(0, 0.66, 0.26);
    group.add(neck);

    // Fasetli Yele (Mane)
    const maneGeo = new THREE.BoxGeometry(0.07, 0.36, 0.15);
    maneGeo.rotateX(0.45);
    const mane = new THREE.Mesh(maneGeo, darkManeMat);
    mane.position.set(0, 0.72, 0.2);
    group.add(mane);

    const headGeo = new THREE.DodecahedronGeometry(0.15, 0);
    headGeo.scale(0.85, 1.0, 1.3);
    const head = new THREE.Mesh(headGeo, horseMat);
    head.position.set(0, 0.82, 0.4);
    head.add(this._createOutline(headGeo, 0x713f12, 0.035));
    group.add(head);

    // Siyah parlak gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    [-0.09, 0.09].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), eyeMat);
      eye.position.set(ex, 0.85, 0.45);
      group.add(eye);
    });

    // Kulaklar
    const earGeo = new THREE.ConeGeometry(0.04, 0.14, 4);
    [-0.07, 0.07].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, horseMat);
      ear.position.set(ex, 0.96, 0.34);
      ear.rotation.set(-0.2, 0, i === 0 ? -0.2 : 0.2);
      group.add(ear);
    });

    // 5. Akıcı Fasetli Uzun Kuyruk
    const tailGeo = new THREE.ConeGeometry(0.08, 0.42, 4);
    tailGeo.rotateX(-Math.PI / 2.3);
    const tail = new THREE.Mesh(tailGeo, darkManeMat);
    tail.position.set(0, 0.52, -0.38);
    group.add(tail);

    // 60 FPS Canlı Şahlanış & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      head.position.y = 0.82 + Math.sin(time * 2.8) * 0.02;
      tail.rotation.z = Math.sin(time * 3.8) * 0.2;
    };

    return group;
  }

  static _createKoyunMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Canlı Yeşil Otlak Kaidesi
    const meadowGeo = new THREE.CylinderGeometry(0.5, 0.54, 0.08, 6);
    const meadowMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.8,
      flatShading: true
    });
    const meadow = new THREE.Mesh(meadowGeo, meadowMat);
    meadow.position.y = 0.06;
    meadow.add(this._createOutline(meadowGeo, 0x14532d, 0.035));
    group.add(meadow);

    // Sarı minik papatya
    const flower = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), new THREE.MeshStandardMaterial({ color: 0xfacc15, flatShading: true }));
    flower.position.set(-0.24, 0.12, 0.18);
    group.add(flower);

    // 2. Fasetli Pofuduk Beyaz Yün Gövdesi (3 Bulut Yumağı)
    const woolMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
      flatShading: true
    });
    const wool1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), woolMat);
    wool1.position.set(0, 0.42, 0);
    wool1.scale.set(1.0, 0.95, 1.3);
    wool1.add(this._createOutline(wool1.geometry, 0x94a3b8, 0.035));
    group.add(wool1);

    const wool2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), woolMat);
    wool2.position.set(0, 0.52, 0.08);
    group.add(wool2);

    // 3. Fasetli Sevimli Siyah Kafa ve Yüz
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      flatShading: true
    });
    const headGeo = new THREE.DodecahedronGeometry(0.14, 0);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 0.44, 0.36);
    head.scale.set(0.9, 1.1, 1.0);
    head.add(this._createOutline(headGeo, 0x0f172a, 0.035));
    group.add(head);

    // Sevimli parlayan beyaz gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    [-0.08, 0.08].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.02), eyeMat);
      eye.position.set(ex, 0.47, 0.45);
      group.add(eye);
      const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.018, 0.025), pupilMat);
      pupil.position.set(ex, 0.47, 0.46);
      group.add(pupil);
    });

    // Sarkan fasetli kulaklar
    const earGeo = new THREE.ConeGeometry(0.045, 0.14, 4);
    [-0.14, 0.14].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, skinMat);
      ear.position.set(ex, 0.42, 0.32);
      ear.rotation.set(0.3, 0, i === 0 ? 0.8 : -0.8);
      group.add(ear);
    });

    // 4. Kısa Sevimli Siyah Bacaklar
    const legGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.26, 5);
    [[-0.12, -0.18], [0.12, -0.18], [-0.12, 0.18], [0.12, 0.18]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, skinMat);
      leg.position.set(lx, 0.17, lz);
      group.add(leg);
    });

    // Minik yün kuyruk
    const tail = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), woolMat);
    tail.position.set(0, 0.44, -0.36);
    group.add(tail);

    // 60 FPS Canlı Otlama & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      head.position.y = 0.44 + Math.sin(time * 2.5) * 0.025;
      tail.position.y = 0.44 + Math.sin(time * 4.0) * 0.015;
    };

    return group;
  }

  static _createKurtMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Gri Zirve Kayası Kaidesi
    const rockGeo = new THREE.CylinderGeometry(0.52, 0.58, 0.1, 7);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.9,
      flatShading: true
    });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.y = 0.07;
    rock.add(this._createOutline(rockGeo, 0x1e293b, 0.035));
    group.add(rock);

    // Yan kayacık
    const subRock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), rockMat);
    subRock.position.set(0.28, 0.14, 0.2);
    group.add(subRock);

    // 2. Fasetli Atletik Gri Kurt Gövdesi (6 köşeli prizma)
    const furMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.75,
      flatShading: true
    });
    const darkFurMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8,
      flatShading: true
    });

    const bodyGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.62, 6);
    bodyGeo.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.set(0, 0.44, 0);
    body.add(this._createOutline(bodyGeo, 0x1e293b, 0.035));
    group.add(body);

    // Sırt tüyü katmanı
    const backGeo = new THREE.ConeGeometry(0.18, 0.48, 5);
    backGeo.rotateX(-Math.PI / 2);
    const backFur = new THREE.Mesh(backGeo, darkFurMat);
    backFur.position.set(0, 0.54, -0.05);
    group.add(backFur);

    // 3. Fasetli 4 Bacak ve Pençeler
    const legGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.32, 5);
    const pawMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, flatShading: true });
    [[-0.13, -0.2], [0.13, -0.2], [-0.13, 0.2], [0.13, 0.2]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, furMat);
      leg.position.set(lx, 0.22, lz);
      group.add(leg);

      const paw = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.05, 0.08), pawMat);
      paw.position.set(lx, 0.08, lz + 0.02);
      group.add(paw);
    });

    // 4. Göğe Doğru Uluyan Baş & Boyun
    const neckGeo = new THREE.CylinderGeometry(0.11, 0.16, 0.28, 5);
    neckGeo.rotateX(0.55);
    const neck = new THREE.Mesh(neckGeo, furMat);
    neck.position.set(0, 0.58, 0.24);
    group.add(neck);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.72, 0.36);

    const headGeo = new THREE.DodecahedronGeometry(0.15, 0);
    const head = new THREE.Mesh(headGeo, furMat);
    head.add(this._createOutline(headGeo, 0x1e293b, 0.035));
    headGroup.add(head);

    // Uluyan sivri burun/çene
    const muzzleGeo = new THREE.ConeGeometry(0.08, 0.24, 4);
    muzzleGeo.rotateX(Math.PI / 3);
    const muzzle = new THREE.Mesh(muzzleGeo, darkFurMat);
    muzzle.position.set(0, 0.08, 0.14);
    headGroup.add(muzzle);

    // Sarı parlayan fasetli gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    [-0.08, 0.08].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), eyeMat);
      eye.position.set(ex, 0.06, 0.12);
      headGroup.add(eye);
    });

    // Sivri kurt kulakları (4 köşeli koniler)
    const earGeo = new THREE.ConeGeometry(0.05, 0.15, 4);
    [-0.09, 0.09].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, darkFurMat);
      ear.position.set(ex, 0.16, -0.04);
      ear.rotation.set(-0.35, 0, i === 0 ? -0.3 : 0.3);
      headGroup.add(ear);
    });

    group.add(headGroup);

    // 5. Kabarık Fasetli Kurt Kuyruğu
    const tailGeo = new THREE.ConeGeometry(0.09, 0.36, 5);
    tailGeo.rotateX(-Math.PI / 2.6);
    const tail = new THREE.Mesh(tailGeo, darkFurMat);
    tail.position.set(0, 0.44, -0.34);
    group.add(tail);

    // 60 FPS Canlı Uluma & Salınım Animasyonu
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const howl = Math.sin(time * 2.2) * 0.08;
      headGroup.rotation.x = -0.35 + howl;
      tail.rotation.z = Math.sin(time * 3.5) * 0.18;
    };

    return group;
  }

  static _createAriMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Dev Çiçek Kaidesi (Ayçiçeği Tablası)
    const flowerBase = new THREE.CylinderGeometry(0.48, 0.52, 0.07, 8);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.6,
      flatShading: true
    });
    const flower = new THREE.Mesh(flowerBase, petalMat);
    flower.position.y = 0.06;
    flower.add(this._createOutline(flowerBase, 0xca8a04, 0.035));
    group.add(flower);

    // Çiçeğin polenli kahverengi göbeği
    const centerGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 7);
    const centerMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    const center = new THREE.Mesh(centerGeo, centerMat);
    center.position.y = 0.08;
    group.add(center);

    // 2. Çiçek Üstünde Süzülen Bombus Arısı Grubu
    const beeGroup = new THREE.Group();
    beeGroup.position.set(0, 0.46, 0);

    // Sarı gövde (Dodecahedron)
    const beeMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4, flatShading: true });
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0x09090b, flatShading: true });

    const beeBody = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), beeMat);
    beeBody.scale.set(0.9, 0.9, 1.4);
    beeBody.add(this._createOutline(beeBody.geometry, 0x713f12, 0.035));
    beeGroup.add(beeBody);

    // Siyah arı çizgileri
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.1, 6), stripeMat);
    stripe.rotateX(Math.PI / 2);
    stripe.position.z = 0.02;
    beeGroup.add(stripe);

    // Siyah kafa ve gözler
    const beeHead = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), stripeMat);
    beeHead.position.set(0, 0, 0.24);
    beeGroup.add(beeHead);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    [-0.07, 0.07].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), eyeMat);
      eye.position.set(ex, 0.04, 0.32);
      beeGroup.add(eye);
    });

    // İğne
    const stinger = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 4), stripeMat);
    stinger.rotateX(-Math.PI / 2);
    stinger.position.set(0, -0.02, -0.32);
    beeGroup.add(stinger);

    // Şeffaf fasetli çift kanat
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      flatShading: true
    });
    const wingGeo = new THREE.CircleGeometry(0.18, 5);

    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-0.16, 0.16, 0.02);
    leftWing.rotation.set(-0.3, 0.2, 0.4);
    beeGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(0.16, 0.16, 0.02);
    rightWing.rotation.set(-0.3, -0.2, -0.4);
    beeGroup.add(rightWing);

    group.add(beeGroup);

    // 60 FPS Canlı Vızıldama ve Hızlı Kanat Çırpma
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      beeGroup.position.y = 0.46 + Math.sin(time * 5.0) * 0.06;
      beeGroup.position.x = Math.cos(time * 3.0) * 0.05;
      leftWing.rotation.z = 0.4 + Math.sin(time * 26.0) * 0.45;
      rightWing.rotation.z = -0.4 - Math.sin(time * 26.0) * 0.45;
    };

    return group;
  }

  static _createYilanMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Çöl Kumu ve Taş Kaidesi
    const sandGeo = new THREE.CylinderGeometry(0.5, 0.54, 0.08, 6);
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.9,
      flatShading: true
    });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.position.y = 0.06;
    sand.add(this._createOutline(sandGeo, 0x92400e, 0.035));
    group.add(sand);

    // Çöl çakılı
    const pebble = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1, 0), new THREE.MeshStandardMaterial({ color: 0x78716c, flatShading: true }));
    pebble.position.set(-0.25, 0.12, 0.2);
    group.add(pebble);

    // 2. Fasetli Kıvrık Zümrüt Kobra Gövdesi (Torus ve Silindirler)
    const snakeMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.55,
      flatShading: true
    });
    const yellowBellyMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.6,
      flatShading: true
    });

    // Alt kıvrım (çöreklenmiş gövde)
    const coilGeo = new THREE.TorusGeometry(0.24, 0.09, 5, 8);
    coilGeo.rotateX(Math.PI / 2);
    const coil = new THREE.Mesh(coilGeo, snakeMat);
    coil.position.y = 0.14;
    coil.add(this._createOutline(coilGeo, 0x14532d, 0.035));
    group.add(coil);

    // Şahlanan boyun sütunu
    const neckGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.44, 6);
    const neck = new THREE.Mesh(neckGeo, snakeMat);
    neck.position.set(0, 0.38, 0.08);
    neck.rotation.x = -0.2;
    group.add(neck);

    // Sarı karın çizgisi
    const bellyGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.42, 4);
    const belly = new THREE.Mesh(bellyGeo, yellowBellyMat);
    belly.position.set(0, 0.38, 0.13);
    belly.rotation.x = -0.2;
    group.add(belly);

    // 3. Kobra Başlığı (Hood) ve Kafa
    const hoodGeo = new THREE.ConeGeometry(0.22, 0.3, 5);
    hoodGeo.scale(1.2, 0.4, 1.0);
    hoodGeo.rotateX(Math.PI / 2);
    const hood = new THREE.Mesh(hoodGeo, snakeMat);
    hood.position.set(0, 0.6, 0.14);
    group.add(hood);

    const headGeo = new THREE.DodecahedronGeometry(0.12, 0);
    headGeo.scale(0.9, 0.7, 1.3);
    const head = new THREE.Mesh(headGeo, snakeMat);
    head.position.set(0, 0.68, 0.22);
    head.add(this._createOutline(headGeo, 0x14532d, 0.035));
    group.add(head);

    // Sarı parlayan gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    [-0.08, 0.08].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), eyeMat);
      eye.position.set(ex, 0.7, 0.28);
      group.add(eye);
    });

    // Çatallı kırmızı dil
    const tongueMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.015, 0.14), tongueMat);
    tongue.position.set(0, 0.66, 0.38);
    group.add(tongue);

    // 60 FPS Tehditkar Tıslama & S-Salınımı
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      neck.rotation.z = Math.sin(time * 3.0) * 0.12;
      head.rotation.z = Math.sin(time * 3.0) * 0.14;
      tongue.scale.z = 0.8 + Math.sin(time * 8.0) * 0.4;
    };

    return group;
  }

  static _createBaykusMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Yaşlı Meşe Kütüğü Kaidesi
    const stumpGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.1, 6);
    const stumpMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.85,
      flatShading: true
    });
    const stump = new THREE.Mesh(stumpGeo, stumpMat);
    stump.position.y = 0.07;
    stump.add(this._createOutline(stumpGeo, 0x451a03, 0.035));
    group.add(stump);

    // Kütük halkaları (üst kesit)
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x92400e, flatShading: true });
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.02, 6), ringMat);
    ring.position.y = 0.125;
    group.add(ring);

    // 2. Fasetli Bilge Baykuş Gövdesi
    const owlMat = new THREE.MeshStandardMaterial({
      color: 0x573926,
      roughness: 0.75,
      flatShading: true
    });
    const breastMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      roughness: 0.7,
      flatShading: true
    });

    const bodyGeo = new THREE.DodecahedronGeometry(0.28, 0);
    bodyGeo.scale(0.85, 1.25, 0.9);
    const body = new THREE.Mesh(bodyGeo, owlMat);
    body.position.set(0, 0.44, 0);
    body.add(this._createOutline(bodyGeo, 0x27170e, 0.035));
    group.add(body);

    // Krem rengi fasetli göğüs tüyleri
    const breast = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), breastMat);
    breast.position.set(0, 0.42, 0.16);
    breast.scale.set(0.9, 1.2, 0.6);
    group.add(breast);

    // Fasetli Katlanmış Kanatlar
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x451a03, flatShading: true });
    const wingGeo = new THREE.ConeGeometry(0.12, 0.38, 4);
    wingGeo.scale(0.4, 1, 0.85);
    [-0.24, 0.24].forEach((wx, i) => {
      const wing = new THREE.Mesh(wingGeo, wingMat);
      wing.position.set(wx, 0.42, -0.02);
      wing.rotation.set(0.4, 0, i === 0 ? 0.3 : -0.3);
      group.add(wing);
    });

    // 3. Meraklı Dönen Baş Grubu
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.68, 0.02);

    const headGeo = new THREE.DodecahedronGeometry(0.18, 0);
    headGeo.scale(1.05, 0.95, 1.0);
    const head = new THREE.Mesh(headGeo, owlMat);
    head.add(this._createOutline(headGeo, 0x27170e, 0.035));
    headGroup.add(head);

    // Fasetli Sivri Kulak Tüyleri
    const earGeo = new THREE.ConeGeometry(0.055, 0.16, 4);
    [-0.12, 0.12].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, wingMat);
      ear.position.set(ex, 0.18, 0);
      ear.rotation.set(-0.2, 0, i === 0 ? -0.3 : 0.3);
      headGroup.add(ear);
    });

    // Kocaman Parlak Kehribar Gözler
    const eyeBaseMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, flatShading: true });
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
      flatShading: true
    });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });

    [-0.09, 0.09].forEach(ex => {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 6), eyeBaseMat);
      disc.rotateX(Math.PI / 2);
      disc.position.set(ex, 0.04, 0.16);
      headGroup.add(disc);

      const iris = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.025, 6), irisMat);
      iris.rotateX(Math.PI / 2);
      iris.position.set(ex, 0.04, 0.17);
      headGroup.add(iris);

      const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), pupilMat);
      pupil.position.set(ex, 0.04, 0.18);
      headGroup.add(pupil);
    });

    // Fasetli Kavisli Gaga
    const beakGeo = new THREE.ConeGeometry(0.045, 0.12, 4);
    beakGeo.rotateX(Math.PI / 2.3);
    const beak = new THREE.Mesh(beakGeo, new THREE.MeshStandardMaterial({ color: 0xd97706, flatShading: true }));
    beak.position.set(0, -0.04, 0.19);
    headGroup.add(beak);

    group.add(headGroup);

    // Kütüğü Kavrayan Pençeler
    const talonMat = new THREE.MeshStandardMaterial({ color: 0xd97706, flatShading: true });
    [-0.1, 0.1].forEach(tx => {
      const talon = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.09), talonMat);
      talon.position.set(tx, 0.14, 0.14);
      group.add(talon);
    });

    // 60 FPS Meraklı 180° Kafa Çevirme & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      headGroup.rotation.y = Math.sin(time * 1.5) * 0.9; // Merakla sağa sola bakış
      headGroup.rotation.z = Math.sin(time * 3.0) * 0.08;
    };

    return group;
  }

  static _createKaplumbagaMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Sahil Kumu ve Minik Çakıl Kaidesi
    const sandGeo = new THREE.CylinderGeometry(0.5, 0.54, 0.07, 6);
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.9,
      flatShading: true
    });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.position.y = 0.05;
    sand.add(this._createOutline(sandGeo, 0xb45309, 0.035));
    group.add(sand);

    // Minik fasetli deniz kabuğu süsü
    const shellProp = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.12, 5), new THREE.MeshStandardMaterial({ color: 0xfecdd3, flatShading: true }));
    shellProp.position.set(0.26, 0.1, 0.18);
    shellProp.rotation.set(0.5, 0.3, 0.8);
    group.add(shellProp);

    // 2. Fasetli Zümrüt Kubbe Kabuk
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.65,
      flatShading: true
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xca8a04,
      flatShading: true
    });

    const shellGeo = new THREE.DodecahedronGeometry(0.32, 0);
    shellGeo.scale(1.0, 0.65, 1.2);
    const shell = new THREE.Mesh(shellGeo, shellMat);
    body: shell.position.set(0, 0.28, 0);
    shell.add(this._createOutline(shellGeo, 0x14532d, 0.035));
    group.add(shell);

    // Kabuk sarı bordürü
    const rimGeo = new THREE.TorusGeometry(0.32, 0.035, 4, 7);
    rimGeo.rotateX(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.y = 0.18;
    rim.scale.set(1.0, 1.2, 1.0);
    group.add(rim);

    // 3. Kabuktan Uzanan Baş Grubu
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.6,
      flatShading: true
    });

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.24, 0.36);

    const headGeo = new THREE.DodecahedronGeometry(0.12, 0);
    headGeo.scale(0.85, 0.8, 1.25);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.add(this._createOutline(headGeo, 0x15803d, 0.035));
    headGroup.add(head);

    // Siyah boncuk gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    [-0.07, 0.07].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.028, 0.028), eyeMat);
      eye.position.set(ex, 0.04, 0.1);
      headGroup.add(eye);
    });

    group.add(headGroup);

    // 4. Dört Fasetli Kürek Yüzgeç
    const flipperGeo = new THREE.BoxGeometry(0.16, 0.04, 0.12);
    [[-0.24, -0.16], [0.24, -0.16], [-0.26, 0.16], [0.26, 0.16]].forEach(([fx, fz], i) => {
      const flipper = new THREE.Mesh(flipperGeo, skinMat);
      flipper.position.set(fx, 0.12, fz);
      flipper.rotation.y = (i < 2 ? (fx < 0 ? 0.4 : -0.4) : (fx < 0 ? -0.5 : 0.5));
      group.add(flipper);
    });

    // Minik sivri kuyruk
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 4), skinMat);
    tail.rotateX(-Math.PI / 2.2);
    tail.position.set(0, 0.16, -0.4);
    group.add(tail);

    // 60 FPS Baş Çıkarma & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      headGroup.position.z = 0.36 + Math.sin(time * 2.0) * 0.035;
    };

    return group;
  }

  static _createBalMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Kil Bal Çömleği (8 köşeli silindir)
    const potMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.75,
      flatShading: true
    });
    const potGeo = new THREE.CylinderGeometry(0.28, 0.36, 0.46, 8);
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.y = 0.32;
    pot.add(this._createOutline(potGeo, 0x78350f, 0.035));
    group.add(pot);

    // Ağzından taşan fasetli amber balı (6 köşeli prizma)
    const honeyMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      flatShading: true
    });
    const honeyGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.1, 8);
    const honey = new THREE.Mesh(honeyGeo, honeyMat);
    honey.position.y = 0.56;
    group.add(honey);

    // Damlayan fasetli bal damlası (Octahedron)
    const dropGeo = new THREE.OctahedronGeometry(0.08, 0);
    dropGeo.scale(0.8, 1.4, 0.8);
    const drop = new THREE.Mesh(dropGeo, honeyMat);
    drop.position.set(0.24, 0.4, 0);
    group.add(drop);

    const light = new THREE.PointLight(0xfde047, 2.0, 2.0);
    light.position.set(0, 0.6, 0.1);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      drop.position.y = 0.4 + Math.sin(time * 3.0) * 0.04;
    };

    return group;
  }

  static _createNiluferMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Yeşil Nilüfer Yaprağı (8 köşeli silindir)
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.8,
      flatShading: true
    });
    const padGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.04, 8);
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.y = 0.12;
    pad.add(this._createOutline(padGeo, 0x14532d, 0.035));
    group.add(pad);

    // Pembe fasetli çiçek taç yaprakları (4 köşeli koniler)
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xdb2777,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      flatShading: true
    });
    const petalGeo = new THREE.ConeGeometry(0.1, 0.32, 4);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set(Math.cos(angle) * 0.18, 0.28, Math.sin(angle) * 0.18);
      petal.rotation.z = Math.cos(angle) * 0.4;
      petal.rotation.x = Math.sin(angle) * -0.4;
      group.add(petal);
    }

    // Çiçek sarı fasetli göbeği
    const centerGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 6);
    const centerMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, flatShading: true });
    const center = new THREE.Mesh(centerGeo, centerMat);
    center.position.y = 0.26;
    group.add(center);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createElmaMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Kırmızı Elma (Dodecahedron)
    const appleMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      flatShading: true
    });
    const appleGeo = new THREE.DodecahedronGeometry(0.36, 0);
    appleGeo.scale(1.0, 0.95, 1.0);
    const apple = new THREE.Mesh(appleGeo, appleMat);
    apple.position.y = 0.38;
    apple.add(this._createOutline(appleGeo, 0x7f1d1d, 0.035));
    group.add(apple);

    // Fasetli sap (5 köşeli)
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x451a03, flatShading: true });
    const stemGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.16, 5);
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(0, 0.72, 0);
    stem.rotation.z = -0.15;
    group.add(stem);

    // Fasetli yeşil yaprak (4 köşeli koni)
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, flatShading: true });
    const leafGeo = new THREE.ConeGeometry(0.08, 0.18, 4);
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(0.08, 0.74, 0);
    leaf.rotation.z = -1.0;
    group.add(leaf);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createKurbagaMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Berrak Su Kaidesi
    const waterGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.06, 6);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.2,
      flatShading: true
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.05;
    water.add(this._createOutline(waterGeo, 0x0369a1, 0.035));
    group.add(water);

    // Dev fasetli yeşil nilüfer yaprağı (Lilypad)
    const padGeo = new THREE.CylinderGeometry(0.38, 0.4, 0.04, 7);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, flatShading: true });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.y = 0.08;
    group.add(pad);

    // 2. Fasetli Parlak Yeşil Kurbağa Gövdesi
    const frogMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.5,
      flatShading: true
    });
    const bellyMat = new THREE.MeshStandardMaterial({
      color: 0xbbf7d0,
      flatShading: true
    });

    const bodyGeo = new THREE.DodecahedronGeometry(0.24, 0);
    bodyGeo.scale(1.1, 0.85, 1.25);
    const body = new THREE.Mesh(bodyGeo, frogMat);
    body.position.set(0, 0.26, 0);
    body.add(this._createOutline(bodyGeo, 0x15803d, 0.035));
    group.add(body);

    // Açık yeşil göbek
    const bellyGeo = new THREE.DodecahedronGeometry(0.18, 0);
    bellyGeo.scale(1.0, 0.6, 1.1);
    const belly = new THREE.Mesh(bellyGeo, bellyMat);
    belly.position.set(0, 0.23, 0.08);
    group.add(belly);

    // 3. Güçlü Bükülü Zıplama Arka Bacakları
    const legGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.28, 5);
    [-0.22, 0.22].forEach((lx, i) => {
      const leg = new THREE.Mesh(legGeo, frogMat);
      leg.position.set(lx, 0.2, -0.06);
      leg.rotation.set(0.6, 0, i === 0 ? -0.8 : 0.8);
      group.add(leg);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.12), frogMat);
      foot.position.set(lx < 0 ? lx - 0.06 : lx + 0.06, 0.1, 0.04);
      group.add(foot);
    });

    // Ön bacaklar
    [-0.14, 0.14].forEach(lx => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.18, 4), frogMat);
      arm.position.set(lx, 0.16, 0.18);
      group.add(arm);
    });

    // 4. İri Fasetli Gözler (Tepeye yerleşik)
    const eyeBaseGeo = new THREE.DodecahedronGeometry(0.09, 0);
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

    [-0.12, 0.12].forEach(ex => {
      const eyeBase = new THREE.Mesh(eyeBaseGeo, frogMat);
      eyeBase.position.set(ex, 0.42, 0.12);
      group.add(eyeBase);

      const iris = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.03), irisMat);
      iris.position.set(ex, 0.44, 0.19);
      group.add(iris);

      const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.035), eyePupilMat);
      pupil.position.set(ex, 0.44, 0.2);
      group.add(pupil);
    });

    // 60 FPS Şişip İnen Nefes & Zıplama Bekleyişi
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      const breathe = Math.sin(time * 3.5) * 0.04;
      body.scale.set(1.1 + breathe, 0.85 + breathe, 1.25);
    };

    return group;
  }

  static _createSincapMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Sonbahar Orman Zemini Kaidesi
    const groundGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.08, 6);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x573926,
      roughness: 0.9,
      flatShading: true
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = 0.06;
    ground.add(this._createOutline(groundGeo, 0x331c11, 0.035));
    group.add(ground);

    // Fasetli turuncu sonbahar yaprağı süsü
    const leaf = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), new THREE.MeshStandardMaterial({ color: 0xea580c, flatShading: true }));
    leaf.scale.set(1.2, 0.3, 1.4);
    leaf.position.set(-0.25, 0.11, 0.18);
    group.add(leaf);

    // 2. Fasetli Kızıl Sincap Gövdesi
    const furMat = new THREE.MeshStandardMaterial({
      color: 0xc2410c,
      roughness: 0.7,
      flatShading: true
    });
    const bellyMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      flatShading: true
    });

    const bodyGeo = new THREE.DodecahedronGeometry(0.22, 0);
    bodyGeo.scale(0.85, 1.25, 0.9);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.set(0, 0.38, 0);
    body.add(this._createOutline(bodyGeo, 0x7c2d12, 0.035));
    group.add(body);

    // Krem göbek
    const belly = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), bellyMat);
    belly.position.set(0, 0.36, 0.13);
    belly.scale.set(0.8, 1.1, 0.6);
    group.add(belly);

    // Oturmuş arka bacaklar
    const legGeo = new THREE.DodecahedronGeometry(0.1, 0);
    [-0.14, 0.14].forEach(lx => {
      const leg = new THREE.Mesh(legGeo, furMat);
      leg.position.set(lx, 0.2, 0);
      leg.scale.set(0.8, 1.3, 1.1);
      group.add(leg);
    });

    // 3. Fasetli Baş, Kulaklar ve Gözler
    const headGeo = new THREE.DodecahedronGeometry(0.15, 0);
    headGeo.scale(0.9, 0.95, 1.15);
    const head = new THREE.Mesh(headGeo, furMat);
    head.position.set(0, 0.58, 0.14);
    head.add(this._createOutline(headGeo, 0x7c2d12, 0.035));
    group.add(head);

    // Sivri tüylü kulaklar
    const earGeo = new THREE.ConeGeometry(0.045, 0.14, 4);
    [-0.08, 0.08].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, furMat);
      ear.position.set(ex, 0.72, 0.1);
      ear.rotation.set(-0.2, 0, i === 0 ? -0.25 : 0.25);
      group.add(ear);
    });

    // Siyah parlak boncuk gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    [-0.09, 0.09].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), eyeMat);
      eye.position.set(ex, 0.6, 0.24);
      group.add(eye);
    });

    // 4. Patilerinde Tuttuğu Meşe Palamudu (Acorn)
    const acornGroup = new THREE.Group();
    acornGroup.position.set(0, 0.38, 0.22);

    const nutGeo = new THREE.DodecahedronGeometry(0.07, 0);
    const nut = new THREE.Mesh(nutGeo, new THREE.MeshStandardMaterial({ color: 0x92400e, flatShading: true }));
    acornGroup.add(nut);

    const capGeo = new THREE.ConeGeometry(0.08, 0.06, 5);
    const cap = new THREE.Mesh(capGeo, new THREE.MeshStandardMaterial({ color: 0x451a03, flatShading: true }));
    cap.position.y = 0.06;
    acornGroup.add(cap);

    group.add(acornGroup);

    // 5. Sırtına Kıvrılmış Devasa Pofuduk Fasetli Kuyruk
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0.28, -0.16);

    const tailGeo = new THREE.TorusGeometry(0.24, 0.12, 5, 8, Math.PI * 1.3);
    const tail = new THREE.Mesh(tailGeo, furMat);
    tail.rotation.set(0, Math.PI / 2, 0.6);
    tail.add(this._createOutline(tailGeo, 0x7c2d12, 0.035));
    tailGroup.add(tail);

    group.add(tailGroup);

    // 60 FPS Canlı Kemirme & Kuyruk Titremesi
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      acornGroup.position.y = 0.38 + Math.sin(time * 8.0) * 0.015;
      tailGroup.rotation.x = Math.sin(time * 4.0) * 0.15;
    };

    return group;
  }

  static _createGeyikMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Otlak Kaidesi
    const meadowGeo = new THREE.CylinderGeometry(0.52, 0.56, 0.08, 7);
    const meadowMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.8,
      flatShading: true
    });
    const meadow = new THREE.Mesh(meadowGeo, meadowMat);
    meadow.position.y = 0.06;
    meadow.add(this._createOutline(meadowGeo, 0x14532d, 0.035));
    group.add(meadow);

    // 2. Fasetli Asil Geyik Gövdesi (6 köşeli silindir)
    const deerMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.65,
      flatShading: true
    });
    const bodyGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.62, 6);
    bodyGeo.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, deerMat);
    body.position.set(0, 0.46, 0);
    body.add(this._createOutline(bodyGeo, 0x78350f, 0.035));
    group.add(body);

    // Beyaz fasetli sırt benekleri
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, flatShading: true });
    [[-0.06, -0.1], [0.06, -0.1], [-0.05, 0.08], [0.05, 0.08]].forEach(([bx, bz]) => {
      const dot = new THREE.Mesh(new THREE.DodecahedronGeometry(0.04, 0), whiteMat);
      dot.position.set(bx, 0.57, bz);
      group.add(dot);
    });

    // 3. Uzun Zarif 4 Bacak ve Siyah Toynaklar
    const legGeo = new THREE.CylinderGeometry(0.038, 0.032, 0.38, 5);
    const hoofMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, flatShading: true });
    [[-0.13, -0.2], [0.13, -0.2], [-0.13, 0.2], [0.13, 0.2]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, deerMat);
      leg.position.set(lx, 0.23, lz);
      group.add(leg);

      const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.05, 0.065), hoofMat);
      hoof.position.set(lx, 0.08, lz);
      group.add(hoof);
    });

    // 4. Asil Boyun ve Baş
    const neckGeo = new THREE.CylinderGeometry(0.09, 0.13, 0.32, 5);
    neckGeo.rotateX(0.45);
    const neck = new THREE.Mesh(neckGeo, deerMat);
    neck.position.set(0, 0.64, 0.24);
    group.add(neck);

    const headGeo = new THREE.DodecahedronGeometry(0.14, 0);
    headGeo.scale(0.85, 0.95, 1.3);
    const head = new THREE.Mesh(headGeo, deerMat);
    head.position.set(0, 0.78, 0.36);
    head.add(this._createOutline(headGeo, 0x78350f, 0.035));
    group.add(head);

    // Siyah Gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    [-0.08, 0.08].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), eyeMat);
      eye.position.set(ex, 0.81, 0.42);
      group.add(eye);
    });

    // Kulaklar
    const earGeo = new THREE.ConeGeometry(0.04, 0.16, 4);
    [-0.1, 0.1].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, deerMat);
      ear.position.set(ex, 0.88, 0.3);
      ear.rotation.set(-0.3, 0, i === 0 ? -0.4 : 0.4);
      group.add(ear);
    });

    // 5. Devasa Dallı Fasetli Altın Boynuzlar
    const hornMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.4,
      flatShading: true
    });
    [-0.09, 0.09].forEach((hx, i) => {
      const mainHorn = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.36, 4), hornMat);
      mainHorn.position.set(hx, 0.98, 0.3);
      mainHorn.rotation.set(-0.25, 0, i === 0 ? -0.35 : 0.35);
      group.add(mainHorn);

      // Yan çatal boynuz
      const subHorn = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.16, 4), hornMat);
      subHorn.position.set(hx < 0 ? hx - 0.07 : hx + 0.07, 1.02, 0.34);
      subHorn.rotation.set(-0.1, 0, i === 0 ? -0.7 : 0.7);
      group.add(subHorn);
    });

    // Minik beyaz kuyruk
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 4), whiteMat);
    tail.rotateX(-Math.PI / 2.5);
    tail.position.set(0, 0.48, -0.34);
    group.add(tail);

    // 60 FPS Canlı Baş Hareketi & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      head.position.y = 0.78 + Math.sin(time * 2.2) * 0.02;
      tail.rotation.z = Math.sin(time * 4.0) * 0.2;
    };

    return group;
  }

  static _createKelebekMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Çiçek Bahçesi Kaidesi
    const gardenGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.07, 6);
    const gardenMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.8,
      flatShading: true
    });
    const garden = new THREE.Mesh(gardenGeo, gardenMat);
    garden.position.y = 0.05;
    garden.add(this._createOutline(gardenGeo, 0x15803d, 0.035));
    group.add(garden);

    // İki Farklı Renkli Fasetli Bahçe Çiçeği
    const f1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), new THREE.MeshStandardMaterial({ color: 0xf43f5e, flatShading: true }));
    f1.position.set(-0.2, 0.11, 0.16);
    group.add(f1);

    const f2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: 0xfacc15, flatShading: true }));
    f2.position.set(0.22, 0.11, -0.15);
    group.add(f2);

    // 2. Çiçekler Üstünde Uçuşan Kelebek Grubu
    const bflyGroup = new THREE.Group();
    bflyGroup.position.set(0, 0.44, 0);

    // İnce fasetli siyah gövde ve baş
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x09090b, flatShading: true });
    const bodyGeo = new THREE.CylinderGeometry(0.03, 0.035, 0.38, 5);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = 0.2;
    bflyGroup.add(body);

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), bodyMat);
    head.position.set(0, 0.18, 0.06);
    bflyGroup.add(head);

    // Fasetli Morfo Mavi-Turuncu Parlayan Çift Kanat
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
      flatShading: true
    });
    const wingGeo = new THREE.CircleGeometry(0.24, 5);

    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-0.16, 0.06, 0);
    leftWing.rotation.set(0.3, 0.2, 0.3);
    leftWing.add(this._createOutline(wingGeo, 0x075985, 0.035));
    bflyGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(0.16, 0.06, 0);
    rightWing.rotation.set(0.3, -0.2, -0.3);
    rightWing.add(this._createOutline(wingGeo, 0x075985, 0.035));
    bflyGroup.add(rightWing);

    group.add(bflyGroup);

    // 60 FPS Canlı Kanat Çırpma & Bahçe Üstünde Salınım
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      bflyGroup.position.y = 0.44 + Math.sin(time * 4.0) * 0.06;
      bflyGroup.position.x = Math.sin(time * 2.5) * 0.05;
      leftWing.rotation.y = 0.2 + Math.sin(time * 20.0) * 0.55;
      rightWing.rotation.y = -0.2 - Math.sin(time * 20.0) * 0.55;
    };

    return group;
  }

  // --- YENİ BASİT EŞYA 3D MODELLERİ ---
  static _createSisMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Sis/Pus Bulutları (Icosahedron)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.75,
      roughness: 0.9,
      flatShading: true
    });
    [-0.2, 0, 0.2].forEach((x, i) => {
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32 + i * 0.04, 0), cloudMat);
      puff.position.set(x, 0.4 + (i % 2) * 0.08, (i - 1) * 0.08);
      group.add(puff);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      group.position.y = Math.sin(time * 1.5) * 0.03;
    };

    return group;
  }

  static _createGayzerMesh(def) {
    const group = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 });
    const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.15, 8), rockMat);
    pool.position.y = 0.1;
    group.add(pool);

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const steamJet = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.16, 0.7, 8), waterMat);
    steamJet.position.y = 0.55;
    group.add(steamJet);
    return group;
  }

  static _createKaktusMesh(def) {
    const group = new THREE.Group();
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 });
    const mainStem = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.8, 8), stemMat);
    mainStem.position.y = 0.45;
    mainStem.add(this._createOutline(mainStem.geometry, 0x14532d, 0.035));
    group.add(mainStem);

    const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 6);
    const leftArm = new THREE.Mesh(armGeo, stemMat);
    leftArm.position.set(-0.2, 0.5, 0);
    leftArm.rotation.z = 0.5;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, stemMat);
    rightArm.position.set(0.2, 0.4, 0);
    rightArm.rotation.z = -0.5;
    group.add(rightArm);
    return group;
  }

  static _createCamAgaciMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Gövde (5 köşeli)
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.8,
      flatShading: true
    });
    const trunkGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.32, 5);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.15;
    group.add(trunk);

    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.7,
      flatShading: true
    });
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.4,
      flatShading: true
    });

    // 3 kademeli fasetli çam yaprağı ve kar şapkaları (5 köşeli koniler)
    [0.4, 0.64, 0.86].forEach((y, i) => {
      const radius = 0.52 - i * 0.12;
      const coneGeo = new THREE.ConeGeometry(radius, 0.38, 5);
      const cone = new THREE.Mesh(coneGeo, foliageMat);
      cone.position.y = y;
      cone.add(this._createOutline(coneGeo, 0x14532d, 0.035));
      group.add(cone);

      const snowGeo = new THREE.ConeGeometry(radius * 0.7, 0.16, 5);
      const snowCone = new THREE.Mesh(snowGeo, snowMat);
      snowCone.position.y = y + 0.12;
      group.add(snowCone);
    });

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createTavukMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Saman/Çiftlik Toprağı Kaidesi
    const groundGeo = new THREE.CylinderGeometry(0.46, 0.5, 0.08, 6);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.9,
      flatShading: true
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = 0.06;
    ground.add(this._createOutline(groundGeo, 0x78350f, 0.035));
    group.add(ground);

    // Saman demeti parçacığı
    const straw = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.08), new THREE.MeshStandardMaterial({ color: 0xfde047, flatShading: true }));
    straw.position.set(-0.2, 0.11, 0.15);
    straw.rotation.y = 0.4;
    group.add(straw);

    // 2. Fasetli Beyaz Tavuk Gövdesi
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.7,
      flatShading: true
    });
    const bodyGeo = new THREE.DodecahedronGeometry(0.28, 0);
    bodyGeo.scale(0.9, 1.0, 1.3);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0.38, 0);
    body.add(this._createOutline(bodyGeo, 0x94a3b8, 0.035));
    group.add(body);

    // Fasetli Yan Kanatlar
    const wingGeo = new THREE.ConeGeometry(0.12, 0.32, 4);
    wingGeo.scale(0.35, 1, 0.8);
    [-0.22, 0.22].forEach((wx, i) => {
      const wing = new THREE.Mesh(wingGeo, bodyMat);
      wing.position.set(wx, 0.4, 0.02);
      wing.rotation.set(0.4, 0, i === 0 ? 0.3 : -0.3);
      group.add(wing);
    });

    // 3. Fasetli Baş, Kırmızı İbik ve Gerdan
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.58, 0.24);

    const headGeo = new THREE.DodecahedronGeometry(0.15, 0);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.add(this._createOutline(headGeo, 0x94a3b8, 0.035));
    headGroup.add(head);

    // Kırmızı İbik
    const combMat = new THREE.MeshStandardMaterial({ color: 0xef4444, flatShading: true });
    const comb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.14, 0.18), combMat);
    comb.position.set(0, 0.18, -0.02);
    headGroup.add(comb);

    // Kırmızı Gerdan
    const wattle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.06), combMat);
    wattle.position.set(0, -0.1, 0.14);
    headGroup.add(wattle);

    // Sarı Gaga
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, flatShading: true });
    const beakGeo = new THREE.ConeGeometry(0.05, 0.14, 4);
    beakGeo.rotateX(Math.PI / 2);
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.position.set(0, 0.02, 0.18);
    headGroup.add(beak);

    // Siyah Gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    [-0.08, 0.08].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), eyeMat);
      eye.position.set(ex, 0.06, 0.1);
      headGroup.add(eye);
    });

    group.add(headGroup);

    // 4. Sarı Bacaklar ve Ayaklar
    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.24, 4);
    [[-0.1, 0], [0.1, 0]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, beakMat);
      leg.position.set(lx, 0.18, lz);
      group.add(leg);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.03, 0.1), beakMat);
      foot.position.set(lx, 0.08, lz + 0.03);
      group.add(foot);
    });

    // 60 FPS Canlı Yem Arama & Baş Hareketi
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      headGroup.position.y = 0.58 + Math.sin(time * 4.5) * 0.04;
      headGroup.rotation.x = Math.sin(time * 4.5) * 0.15;
    };

    return group;
  }

  static _createKediMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Ahşap Parke/Halı Kaidesi
    const carpetGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.08, 6);
    const carpetMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      roughness: 0.8,
      flatShading: true
    });
    const carpet = new THREE.Mesh(carpetGeo, carpetMat);
    carpet.position.y = 0.06;
    carpet.add(this._createOutline(carpetGeo, 0x6b21a8, 0.035));
    group.add(carpet);

    // 2. Fasetli Turuncu Tekir Kedi Gövdesi
    const catMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.65,
      flatShading: true
    });
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.65,
      flatShading: true
    });

    const bodyGeo = new THREE.DodecahedronGeometry(0.26, 0);
    bodyGeo.scale(0.9, 0.95, 1.3);
    const body = new THREE.Mesh(bodyGeo, catMat);
    body.position.set(0, 0.36, 0);
    body.add(this._createOutline(bodyGeo, 0xc2410c, 0.035));
    group.add(body);

    // Beyaz Göğüs
    const chest = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), whiteMat);
    chest.position.set(0, 0.36, 0.22);
    group.add(chest);

    // 4 Fasetli Beyaz Patili Bacak
    const legGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.24, 5);
    [[-0.12, -0.16], [0.12, -0.16], [-0.12, 0.16], [0.12, 0.16]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, catMat);
      leg.position.set(lx, 0.18, lz);
      group.add(leg);

      const paw = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.07), whiteMat);
      paw.position.set(lx, 0.08, lz + 0.02);
      group.add(paw);
    });

    // 3. Fasetli Kedi Başlığı, Kulaklar ve Yeşil Gözler
    const headGeo = new THREE.DodecahedronGeometry(0.17, 0);
    const head = new THREE.Mesh(headGeo, catMat);
    head.position.set(0, 0.54, 0.26);
    head.add(this._createOutline(headGeo, 0xc2410c, 0.035));
    group.add(head);

    // Sivri pembe iç kulaklar
    const earGeo = new THREE.ConeGeometry(0.06, 0.15, 4);
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, flatShading: true });
    [-0.1, 0.1].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, catMat);
      ear.position.set(ex, 0.7, 0.24);
      ear.rotation.set(-0.25, 0, i === 0 ? -0.3 : 0.3);
      group.add(ear);

      const innerEar = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.1, 4), pinkMat);
      innerEar.position.set(ex, 0.69, 0.27);
      innerEar.rotation.set(-0.25, 0, i === 0 ? -0.3 : 0.3);
      group.add(innerEar);
    });

    // Zümrüt Yeşili Parlayan Kedi Gözleri
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    [-0.08, 0.08].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.035), eyeMat);
      eye.position.set(ex, 0.56, 0.38);
      group.add(eye);
    });

    // Pembe burun
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.025, 0.03), pinkMat);
    nose.position.set(0, 0.5, 0.42);
    group.add(nose);

    // 4. Kıvrık Hareketli Kuyruk
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0.38, -0.3);
    const tailGeo = new THREE.CylinderGeometry(0.035, 0.03, 0.38, 5);
    tailGeo.rotateX(-0.7);
    const tail = new THREE.Mesh(tailGeo, catMat);
    tail.position.set(0, 0.14, -0.1);
    tailGroup.add(tail);
    group.add(tailGroup);

    // 60 FPS Canlı Kuyruk Salınımı & Yavaş Dönüş
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      tailGroup.rotation.y = Math.sin(time * 3.5) * 0.35;
      head.position.y = 0.54 + Math.sin(time * 2.0) * 0.015;
    };

    return group;
  }

  static _createMesaleMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Ahşap Sap (6 köşeli)
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.8,
      flatShading: true
    });
    const handleGeo = new THREE.CylinderGeometry(0.06, 0.045, 0.68, 6);
    const handle = new THREE.Mesh(handleGeo, woodMat);
    handle.position.y = 0.35;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Tepe metal kelepçe
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, flatShading: true });
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.08, 6), ironMat);
    collar.position.y = 0.68;
    group.add(collar);

    // Fasetli parıldayan meşale alevi (5 köşeli koni)
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xef4444,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      flatShading: true
    });
    const flameGeo = new THREE.ConeGeometry(0.15, 0.34, 5);
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.84;
    group.add(flame);

    const light = new THREE.PointLight(0xf59e0b, 2.5, 3.0);
    light.position.set(0, 0.88, 0);
    group.add(light);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      flame.scale.y = 0.9 + Math.sin(time * 8.0) * 0.15;
    };

    return group;
  }

  static _createSomonMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Hızlı Nehir Akıntısı ve Şelale Taşı Kaidesi
    const riverGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.08, 6);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3,
      roughness: 0.25,
      flatShading: true
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.position.y = 0.06;
    river.add(this._createOutline(riverGeo, 0x0c4a6e, 0.035));
    group.add(river);

    // Nehir köpüğü parçacıkları
    const foamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    [-0.2, 0.22].forEach(fx => {
      const foam = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), foamMat);
      foam.position.set(fx, 0.12, fx * 0.5);
      group.add(foam);
    });

    // 2. Akıntıya Karşı Zıplayan Fasetli Pembe Somon Balığı
    const salmonMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xbe123c,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      flatShading: true
    });
    const bellySalmonMat = new THREE.MeshStandardMaterial({
      color: 0xfecdd3,
      flatShading: true
    });

    const fishGroup = new THREE.Group();
    fishGroup.position.set(0, 0.38, 0);

    const bodyGeo = new THREE.DodecahedronGeometry(0.26, 0);
    bodyGeo.scale(0.65, 0.9, 1.55);
    const body = new THREE.Mesh(bodyGeo, salmonMat);
    body.rotation.x = -0.3; // Zıplama açısı
    body.add(this._createOutline(bodyGeo, 0x881337, 0.035));
    fishGroup.add(body);

    // Gümüş-pembe karın
    const belly = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), bellySalmonMat);
    belly.position.set(0, -0.06, 0.08);
    fishGroup.add(belly);

    // Siyah gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    [-0.12, 0.12].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), eyeMat);
      eye.position.set(ex, 0.06, 0.32);
      fishGroup.add(eye);
    });

    // Fasetli sırt ve yüzgeçler
    const finMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, flatShading: true });
    const finGeo = new THREE.ConeGeometry(0.07, 0.2, 3);
    finGeo.rotateX(-0.5);
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.set(0, 0.2, -0.05);
    fishGroup.add(fin);

    // Fasetli kuyruk
    const tailGeo = new THREE.ConeGeometry(0.16, 0.3, 3);
    tailGeo.rotateX(-Math.PI / 2);
    const tail = new THREE.Mesh(tailGeo, finMat);
    tail.position.set(0, -0.08, -0.42);
    fishGroup.add(tail);

    group.add(fishGroup);

    // 60 FPS Canlı Zıplama ve Çırpınma
    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      fishGroup.position.y = 0.38 + Math.sin(time * 5.0) * 0.08;
      tail.rotation.y = Math.sin(time * 7.0) * 0.35;
    };

    return group;
  }

  static _createYayMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Ahşap Yay Kavis (4 segmentli Torus)
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      roughness: 0.7,
      flatShading: true
    });
    const bowGeo = new THREE.TorusGeometry(0.4, 0.04, 4, 10, Math.PI);
    const bowCurve = new THREE.Mesh(bowGeo, woodMat);
    bowCurve.position.set(0, 0.45, 0);
    bowCurve.rotation.z = -Math.PI / 2;
    bowCurve.add(this._createOutline(bowGeo, 0x451a03, 0.035));
    group.add(bowCurve);

    // Fasetli gergin kiriş ipi
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.8, 4), stringMat);
    string.position.set(0, 0.45, 0);
    group.add(string);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createBarutFicisiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Kırmızı Barut Fıçısı (8 köşeli silindir)
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.7,
      flatShading: true
    });
    const barrelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.65, 8);
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.y = 0.35;
    barrel.add(this._createOutline(barrelGeo, 0x7f1d1d, 0.035));
    group.add(barrel);

    // Siyah demir çemberler (8 köşeli halkalar)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.3,
      flatShading: true
    });
    [-0.16, 0.16].forEach((y) => {
      const ringGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 8, 1, true);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 0.35 + y;
      group.add(ring);
    });

    // Fasetli fitil ve parlayan kıvılcım (Octahedron)
    const fuseMat = new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true });
    const fuse = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 4), fuseMat);
    fuse.position.set(0, 0.72, 0);
    group.add(fuse);

    const sparkMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xf97316,
      emissiveIntensity: 1.5,
      flatShading: true
    });
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.05, 0), sparkMat);
    spark.position.set(0, 0.79, 0);
    group.add(spark);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      spark.scale.setScalar(0.8 + Math.sin(time * 12.0) * 0.3);
    };

    return group;
  }

  static _createSuDegirmeniMesh(def) {
    const group = new THREE.Group();

    // 1. Fasetli Nehir Yatağı Kaidesi
    const baseGeo = new THREE.CylinderGeometry(0.52, 0.56, 0.1, 7);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0369a1, emissiveIntensity: 0.3, flatShading: true });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.07;
    base.add(this._createOutline(baseGeo, 0x0c4a6e, 0.035));
    group.add(base);

    // 2. Fasetli Ahşap Değirmen Evi (Cabin)
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, flatShading: true });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.7, flatShading: true });

    const house = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.44), woodMat);
    house.position.set(-0.16, 0.28, 0);
    house.add(this._createOutline(house.geometry, 0x451a03, 0.035));
    group.add(house);

    // Çatı (Koni/Prizma)
    const roofGeo = new THREE.ConeGeometry(0.34, 0.24, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(-0.16, 0.58, 0);
    group.add(roof);

    // 3. Fasetli Dönen Ahşap Değirmen Çarkı Grubu
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(0.18, 0.32, 0);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.7, flatShading: true });
    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 8);
    rimGeo.rotateX(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, wheelMat);
    rim.add(this._createOutline(rimGeo, 0x713f12, 0.035));
    wheelGroup.add(rim);

    // 6 Kanat Paleti
    const paddleGeo = new THREE.BoxGeometry(0.06, 0.54, 0.06);
    for (let i = 0; i < 3; i++) {
      const paddle = new THREE.Mesh(paddleGeo, wheelMat);
      paddle.rotation.z = (i * Math.PI) / 3;
      wheelGroup.add(paddle);
    }
    group.add(wheelGroup);

    // Su Sıçrama Köpükleri
    const foamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    const foam = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), foamMat);
    foam.position.set(0.18, 0.14, 0.12);
    group.add(foam);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      wheelGroup.rotation.z -= dt * 2.5;
      foam.scale.setScalar(0.8 + Math.sin(time * 6.0) * 0.3);
    };

    return group;
  }

  static _createBuzDagiMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli Kutup Buz Dağı Piramidi (5 köşeli koni)
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.1,
      flatShading: true
    });
    const peakGeo = new THREE.ConeGeometry(0.48, 0.78, 5);
    const mainPeak = new THREE.Mesh(peakGeo, iceMat);
    mainPeak.position.y = 0.45;
    mainPeak.add(this._createOutline(peakGeo, 0x0284c7, 0.035));
    group.add(mainPeak);

    // Yan küçük fasetli tepe (4 köşeli)
    const subGeo = new THREE.ConeGeometry(0.32, 0.52, 4);
    const subPeak = new THREE.Mesh(subGeo, iceMat);
    subPeak.position.set(0.22, 0.3, 0.1);
    group.add(subPeak);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      mainPeak.position.y = 0.45 + Math.sin(time * 2.0) * 0.03;
      subPeak.position.y = 0.3 + Math.sin(time * 2.0) * 0.03;
    };

    return group;
  }

  static _createKalkanMesh(def) {
    const group = new THREE.Group();
    // Low-Poly Fasetli 6 Köşeli Metal Kalkan Plakası
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.75,
      roughness: 0.3,
      flatShading: true
    });
    const shieldGeo = new THREE.CylinderGeometry(0.4, 0.35, 0.08, 6);
    shieldGeo.rotateX(Math.PI / 2);
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shield.position.y = 0.45;
    shield.add(this._createOutline(shieldGeo, 0x1e293b, 0.035));
    group.add(shield);

    // Merkezdeki fasetli altın armut göbek (Dodecahedron)
    const bossMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const boss = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), bossMat);
    boss.position.set(0, 0.45, 0.06);
    group.add(boss);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
    };

    return group;
  }

  static _createIksirKazaniMesh(def) {
    const group = new THREE.Group();

    // Fasetli 3 Bacaklı Döküm Demir Kazan (Tablosuz, doğrudan merkezli)
    const potGroup = new THREE.Group();
    potGroup.position.set(0, 0.32, 0);

    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.45,
      flatShading: true
    });
    const potGeo = new THREE.DodecahedronGeometry(0.36, 0);
    potGeo.scale(1.2, 0.95, 1.2);
    const pot = new THREE.Mesh(potGeo, ironMat);
    pot.position.y = 0.16;
    pot.add(this._createOutline(potGeo, 0x09090b, 0.04));
    potGroup.add(pot);

    // Kazan Ağzı Bordürü (Rim)
    const rimGeo = new THREE.TorusGeometry(0.34, 0.045, 4, 8);
    rimGeo.rotateX(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, ironMat);
    rim.position.y = 0.28;
    potGroup.add(rim);

    // 3 Bacak
    const legGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.28, 5);
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI) / 3;
      const leg = new THREE.Mesh(legGeo, ironMat);
      leg.position.set(Math.cos(angle) * 0.26, -0.04, Math.sin(angle) * 0.26);
      leg.rotation.z = Math.cos(angle) * 0.25;
      potGroup.add(leg);
    }

    // İçte Kaynayan Parlak Mor Büyü İksiri
    const potionMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      flatShading: true
    });
    const liquidGeo = new THREE.CircleGeometry(0.3, 7);
    liquidGeo.rotateX(-Math.PI / 2);
    const liquid = new THREE.Mesh(liquidGeo, potionMat);
    liquid.position.y = 0.27;
    potGroup.add(liquid);

    // Fokurdayan Kabarcıklar
    const bubbleMat = new THREE.MeshStandardMaterial({ color: 0xf3e8ff, flatShading: true });
    const b1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), bubbleMat);
    b1.position.set(0.1, 0.33, 0.08);
    potGroup.add(b1);

    const b2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), bubbleMat);
    b2.position.set(-0.11, 0.31, -0.06);
    potGroup.add(b2);

    const light = new THREE.PointLight(0xa855f7, 2.5, 2.5);
    light.position.set(0, 0.4, 0);
    potGroup.add(light);

    group.add(potGroup);

    group.userData.update = (time, delta) => {
      const dt = delta || 0.016;
      group.rotation.y += dt * 1.0;
      b1.position.y = 0.33 + Math.sin(time * 4.0) * 0.035;
      b2.position.y = 0.31 + Math.cos(time * 4.0) * 0.035;
      light.intensity = 2.2 + Math.sin(time * 4.0) * 0.6;
    };

    return group;
  }

  static _createDefaultMesh(def) {
    const group = new THREE.Group();
    const color = def?.colorPalette?.primary ? new THREE.Color(def.colorPalette.primary) : 0x38bdf8;
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.4,
      metalness: 0.2
    });
    const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42), mat);
    mesh.position.y = 0.45;
    mesh.add(this._createOutline(mesh.geometry, 0x0f172a, 0.04));
    group.add(mesh);
    return group;
  }
}



