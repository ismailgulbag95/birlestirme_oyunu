import * as THREE from 'three';

/**
 * MobileRoomEnvironment
 * Revize Edilmiş Gotik Kemer & Uzatılmış Zemin + Sehpa Üzerinde Gaz Lambası:
 * - Zemin tüm görüş alanını kaplayacak şekilde genişletildi (18x18 birim), gerçek bir odanın içindeymiş hissi verir.
 * - Masanın altında vintage şarap kırmızısı simyacı halısı.
 * - Masanın sol ön çaprazında (x: -2.3, z: 0.8) ahşap zarif bir sehpa.
 * - Sehpa üzerinde detaylı pirinç hazneli, cam fanuslu ve alevli Gaz Lambası (Kerosene Lamp).
 * - Gaz lambasının yaydığı sıcak amber ışık odayı ve masayı çapraz açıyla aydınlatır.
 * - Arka plandaki Gotik Taş Kemer, vitray pencere ve trofe rafları (z = -4.5) derinliğini korur.
 */
export class MobileRoomEnvironment {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'MobileRoomEnvironment';

    this.sockets = [];
    this.gasLampLight = null;
    this.lampFlameMesh = null;
    this.windowMesh = null;
    this.phase = 1;

    this._buildMaterials();
    this._buildExtendedFloor();
    this._buildRoomStructure();
    this._buildShelves();
    this._buildWindow();
    this._buildSideTableWithGasLamp();
  }

  _buildMaterials() {
    // 1. Zemin ve Taş Materyalleri
    this.stoneWallMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e27,
      roughness: 0.9,
      metalness: 0.05
    });

    this.stoneFloorMat = new THREE.MeshStandardMaterial({
      color: 0x161920,
      roughness: 0.85,
      metalness: 0.1
    });

    this.stonePillarMat = new THREE.MeshStandardMaterial({
      color: 0x242a36,
      roughness: 0.8,
      metalness: 0.1
    });

    // 2. Ahşap ve Halı Materyalleri
    this.woodMat = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      roughness: 0.75,
      metalness: 0.05
    });

    this.tableWoodMat = new THREE.MeshStandardMaterial({
      color: 0x2c1a12, // Sehpa için koyu ceviz ahşap
      roughness: 0.65,
      metalness: 0.05
    });

    this.rugMat = new THREE.MeshStandardMaterial({
      color: 0x3d1720, // Vintage şarap kırmızısı simyacı halısı
      roughness: 0.95,
      metalness: 0.02
    });

    // 3. Metal ve Cam Materyalleri
    this.goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.35,
      metalness: 0.8
    });

    this.brassMat = new THREE.MeshStandardMaterial({
      color: 0xb8860b, // Gaz lambası eskitme pirinç gövde
      roughness: 0.3,
      metalness: 0.85
    });

    this.lampGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      transmission: 0.9,
      ior: 1.45
    });

    this.windowMat = new THREE.MeshBasicMaterial({
      color: 0x223a5e,
      transparent: true,
      opacity: 0.88
    });
  }

  _buildExtendedFloor() {
    // ZEMİNİ UZAT: Kameranın altından arka duvara ve yanlara kadar 18x18 birimlik devasa taş taban
    // Oyuncu artık havada süzülen bir masa yerine gerçek, kapalı bir odanın içinde hisseder.
    const floorGeo = new THREE.BoxGeometry(18.0, 0.4, 18.0);
    const floor = new THREE.Mesh(floorGeo, this.stoneFloorMat);
    floor.position.set(0, -1.6, 1.0);
    floor.receiveShadow = true;
    this.group.add(floor);

    // Masanın ve sehpanın altına oturan antik simyacı halısı
    const rugGeo = new THREE.BoxGeometry(6.6, 0.02, 5.2);
    const rug = new THREE.Mesh(rugGeo, this.rugMat);
    rug.position.set(-0.4, -1.39, 0.2);
    rug.receiveShadow = true;
    this.group.add(rug);
  }

  _buildRoomStructure() {
    // 1. Arka Taş Duvar (Karakterden 2.7 birim geride: z = -4.5)
    const backWallGeo = new THREE.BoxGeometry(8.5, 9.5, 0.3);
    const backWall = new THREE.Mesh(backWallGeo, this.stoneWallMat);
    backWall.position.set(0, 3.0, -4.5);
    backWall.receiveShadow = true;
    this.group.add(backWall);

    // 2. Gotik Kemer Yan Sütunları
    const pillarGeo = new THREE.BoxGeometry(0.45, 8.0, 0.45);

    const leftPillar = new THREE.Mesh(pillarGeo, this.stonePillarMat);
    leftPillar.position.set(-2.8, 2.4, -4.2);
    this.group.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, this.stonePillarMat);
    rightPillar.position.set(2.8, 2.4, -4.2);
    this.group.add(rightPillar);

    // 3. Kemer Üst Kirişi
    const archTopGeo = new THREE.BoxGeometry(6.0, 0.45, 0.45);
    const archTop = new THREE.Mesh(archTopGeo, this.stonePillarMat);
    archTop.position.set(0, 6.2, -4.2);
    this.group.add(archTop);
  }

  _buildShelves() {
    // Karakterin arkasındaki dikey 3'er katlı kompakt ahşap raflar (z = -4.15)
    const shelfGeo = new THREE.BoxGeometry(1.25, 0.08, 0.4);
    const shelfHeights = [1.2, 2.0, 2.8]; // 3 kat

    [-1.9, 1.9].forEach(sideX => {
      shelfHeights.forEach(y => {
        const shelf = new THREE.Mesh(shelfGeo, this.woodMat);
        shelf.position.set(sideX, y, -4.15);
        shelf.receiveShadow = true;
        this.group.add(shelf);

        // Her rafta 2 adet trofe yuvası (Toplam 12 yuva)
        [-0.32, 0.32].forEach(slotOffset => {
          const socketWorldPos = new THREE.Vector3(sideX + slotOffset, y + 0.22, -4.05);

          const ringGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.025, 12);
          const ring = new THREE.Mesh(ringGeo, this.goldMat);
          ring.position.set(socketWorldPos.x, y + 0.02, socketWorldPos.z);
          this.group.add(ring);

          this.sockets.push({
            id: `socket_${this.sockets.length}`,
            position: socketWorldPos,
            isOccupied: false,
            trophyMesh: null,
            itemId: null
          });
        });
      });
    });
  }

  _buildWindow() {
    // Gotik Vitray Pencere (y: 3.5, z: -4.35)
    const winFrameGeo = new THREE.BoxGeometry(1.6, 2.2, 0.12);
    const winFrameMat = new THREE.MeshStandardMaterial({ color: 0x141820, roughness: 0.9 });
    const winFrame = new THREE.Mesh(winFrameGeo, winFrameMat);
    winFrame.position.set(0, 3.5, -4.35);
    this.group.add(winFrame);

    const winGlassGeo = new THREE.PlaneGeometry(1.35, 1.95);
    this.windowMesh = new THREE.Mesh(winGlassGeo, this.windowMat);
    this.windowMesh.position.set(0, 3.5, -4.28);
    this.group.add(this.windowMesh);
  }

  _buildSideTableWithGasLamp() {
    // 1. MASANIN ÇAPRAZINDAKİ SEHPA (x: -2.35, z: 0.75)
    // Masanın sol ön çaprazında yer alır, slotları ve karakteri asla engellemez
    const tableGroup = new THREE.Group();
    tableGroup.position.set(-2.35, -1.4, 0.75);

    // Sehpa yuvarlak üst tablası (y: 2.5 seviyesine kadar yükselen torna bacak)
    const topGeo = new THREE.CylinderGeometry(0.55, 0.52, 0.08, 16);
    const tableTop = new THREE.Mesh(topGeo, this.tableWoodMat);
    tableTop.position.y = 2.45;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Sehpa merkezi oyma ayağı (Pedestal pillar)
    const pillarGeo = new THREE.CylinderGeometry(0.08, 0.1, 2.4, 12);
    const pillar = new THREE.Mesh(pillarGeo, this.tableWoodMat);
    pillar.position.y = 1.2;
    pillar.castShadow = true;
    tableGroup.add(pillar);

    // Sehpa taban ayağı (3'lü kıvrımlı ayak kaidesi)
    const baseGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.08, 16);
    const tableBase = new THREE.Mesh(baseGeo, this.tableWoodMat);
    tableBase.position.y = 0.04;
    tableGroup.add(tableBase);

    // 2. SEHPA ÜZERİNDEKİ GAZ LAMBASI (Kerosene Lamp)
    // Tabla yüzeyi: y = 2.49 (dünya koordinatında y ≈ 1.09)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0, 2.49, 0);

    // A. Pirinç Gaz Haznesi (Alt Tank)
    const tankGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.18, 16);
    const tank = new THREE.Mesh(tankGeo, this.brassMat);
    tank.position.y = 0.09;
    tank.castShadow = true;
    lampGroup.add(tank);

    // B. Brülör Çemberi ve Fitil Yuvası
    const burnerGeo = new THREE.CylinderGeometry(0.1, 0.13, 0.06, 14);
    const burner = new THREE.Mesh(burnerGeo, this.brassMat);
    burner.position.y = 0.21;
    lampGroup.add(burner);

    // C. Cam Lamba Fanusu (Chimney)
    const chimneyGeo = new THREE.CylinderGeometry(0.08, 0.13, 0.42, 16);
    const chimney = new THREE.Mesh(chimneyGeo, this.lampGlassMat);
    chimney.position.y = 0.44;
    lampGroup.add(chimney);

    // D. Lamba İçi Kor Alev
    const flameGeo = new THREE.ConeGeometry(0.035, 0.1, 8);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffe680 });
    this.lampFlameMesh = new THREE.Mesh(flameGeo, flameMat);
    this.lampFlameMesh.position.y = 0.31;
    lampGroup.add(this.lampFlameMesh);

    // E. Lamba Tepe Başlığı ve Taşıma Halkası
    const capGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.04, 12);
    const cap = new THREE.Mesh(capGeo, this.brassMat);
    cap.position.y = 0.66;
    lampGroup.add(cap);

    const handleGeo = new THREE.TorusGeometry(0.05, 0.012, 6, 12);
    const handle = new THREE.Mesh(handleGeo, this.brassMat);
    handle.position.y = 0.72;
    lampGroup.add(handle);

    tableGroup.add(lampGroup);
    this.group.add(tableGroup);

    // 3. GAZ LAMBASI IŞIĞI (Sıcak Amber PointLight)
    // Sehpa üzerindeki lambanın tam alev noktasında (Dünya koordinatı: x: -2.35, y: 1.4, z: 0.75)
    this.gasLampLight = new THREE.PointLight(0xffa834, 1.8, 9.5, 1.4);
    this.gasLampLight.position.set(-2.35, 1.4, 0.75);
    this.gasLampLight.castShadow = false; // Mobilde yüksek 60 FPS performansı
    this.group.add(this.gasLampLight);
  }

  setPhase(phase) {
    this.phase = phase;
    if (phase === 1) {
      this.gasLampLight.intensity = 1.6;
      this.gasLampLight.color.setHex(0xff9933);
      this.windowMat.color.setHex(0x1a283e);
    } else if (phase === 2) {
      this.gasLampLight.intensity = 2.0;
      this.gasLampLight.color.setHex(0xffaa44);
      this.windowMat.color.setHex(0x284b63);
    } else if (phase >= 3) {
      this.gasLampLight.intensity = 2.4;
      this.gasLampLight.color.setHex(0xffbe4d);
      this.windowMat.color.setHex(0x483d8b);
    }
  }

  update(time) {
    // Sehpa üzerindeki gaz lambasının doğal alev titremesi
    if (this.gasLampLight) {
      const baseIntensity = this.phase === 1 ? 1.6 : (this.phase === 2 ? 2.0 : 2.4);
      const flicker = Math.sin(time * 7.2) * 0.08 + Math.sin(time * 16.5) * 0.04;
      this.gasLampLight.intensity = baseIntensity + flicker;
    }

    if (this.lampFlameMesh) {
      // Alevin hafif nefes alıp vermesi (scale pulse)
      const flameScale = 1.0 + Math.sin(time * 8.0) * 0.08;
      this.lampFlameMesh.scale.set(flameScale, flameScale, flameScale);
    }
  }

  getSockets() {
    return this.sockets;
  }
}
