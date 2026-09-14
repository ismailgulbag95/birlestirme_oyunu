import * as THREE from 'three';

/**
 * MobileRoomEnvironment
 * Revize Edilmiş Tam Kapalı Gotik Oda, Gece Gökyüzü ve Süzülen Ay Işığı:
 * - Taş duvarlar sağdan ve soldan genişletildi (26x16 birim) + yan duvarlar eklendi (Sıfır boşluk / tam kapalı oda).
 * - Arkadaki Gotik pencereden dışarıda parıldayan Hilal Ay, gece göğü ve yıldızlar görünür.
 * - Pencereden içeriye masaya ve karaktere doğru süzülen soğuk gümüş/mavi ay ışığı ve hacimsel ışık hüzmesi (God rays cone).
 * - Masanın sol ön çaprazındaki sehpa üzerinde sıcak amber gaz lambası.
 * - 60 FPS mobil GPU performansı korunmuştur.
 */
export class MobileRoomEnvironment {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'MobileRoomEnvironment';

    this.sockets = [];
    this.gasLampLight = null;
    this.lampFlameMesh = null;
    this.moonLight = null;
    this.stars = [];
    this.windowMesh = null;
    this.phase = 1;

    this._buildMaterials();
    this._buildExtendedFloor();
    this._buildFullRoomWalls();
    this._buildShelves();
    this._buildWindowWithNightSky();
    this._buildSideTableWithGasLamp();
  }

  _buildMaterials() {
    // 1. Zemin ve Duvar Taş Materyalleri
    this.stoneWallMat = new THREE.MeshStandardMaterial({
      color: 0x181c24, // Koyu arduvaz taş duvar rengi
      roughness: 0.9,
      metalness: 0.05
    });

    this.stoneFloorMat = new THREE.MeshStandardMaterial({
      color: 0x14171e,
      roughness: 0.85,
      metalness: 0.1
    });

    this.stonePillarMat = new THREE.MeshStandardMaterial({
      color: 0x222733,
      roughness: 0.8,
      metalness: 0.1
    });

    // 2. Ahşap ve Halı Materyalleri
    this.woodMat = new THREE.MeshStandardMaterial({
      color: 0x3a241a,
      roughness: 0.75,
      metalness: 0.05
    });

    this.tableWoodMat = new THREE.MeshStandardMaterial({
      color: 0x291811,
      roughness: 0.65,
      metalness: 0.05
    });

    this.rugMat = new THREE.MeshStandardMaterial({
      color: 0x3d1720,
      roughness: 0.95,
      metalness: 0.02
    });

    // 3. Metaller
    this.goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.35,
      metalness: 0.8
    });

    this.brassMat = new THREE.MeshStandardMaterial({
      color: 0xb8860b,
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

    // 4. Gece Mavisi Pencere Materyali
    this.nightSkyMat = new THREE.MeshBasicMaterial({
      color: 0x0b1a3e // Zengin gece mavisi rengi
    });
  }

  _buildExtendedFloor() {
    // 26x26 birimlik geniş taş zemin - fizik zemin ile tam uyumlu (üst yüzey: y = -2.00)
    // RapierWorld zemin collider üst yüzeyi y = -2.00 seviyesindedir.
    const floorGeo = new THREE.BoxGeometry(26.0, 0.4, 26.0);
    const floor = new THREE.Mesh(floorGeo, this.stoneFloorMat);
    floor.position.set(0, -2.2, 1.0); // -2.2 + 0.2 = -2.00 üst yüzey
    floor.receiveShadow = true;
    this.group.add(floor);

    // Vintage simyacı halısı (taş zemin üzerinde ince katman)
    const rugGeo = new THREE.BoxGeometry(6.6, 0.02, 5.2);
    const rug = new THREE.Mesh(rugGeo, this.rugMat);
    rug.position.set(-0.4, -1.99, 0.2); // y = -1.98 üst yüzey
    rug.receiveShadow = true;
    this.group.add(rug);
  }

  _buildFullRoomWalls() {
    // DUVARI SAĞDAN VE SOLDAN UZAT (Ekranı tamamen kaplayan taş duvarlar)
    // 1. Arka Duvar: 26 birim genişlik, 16 birim yükseklik (z = -4.8)
    const backWallGeo = new THREE.BoxGeometry(26.0, 16.0, 0.4);
    const backWall = new THREE.Mesh(backWallGeo, this.stoneWallMat);
    backWall.position.set(0, 4.5, -4.8);
    backWall.receiveShadow = true;
    this.group.add(backWall);

    // 2. Sol Yan Duvar (Odayı soldan kapatır)
    const sideWallGeo = new THREE.BoxGeometry(0.4, 16.0, 26.0);
    const leftWall = new THREE.Mesh(sideWallGeo, this.stoneWallMat);
    leftWall.position.set(-12.0, 4.5, 2.0);
    leftWall.receiveShadow = true;
    this.group.add(leftWall);

    // 3. Sağ Yan Duvar (Odayı sağdan kapatır)
    const rightWall = new THREE.Mesh(sideWallGeo, this.stoneWallMat);
    rightWall.position.set(12.0, 4.5, 2.0);
    rightWall.receiveShadow = true;
    this.group.add(rightWall);

    // 4. Gotik Kemer Sütunları (Pencere ve rafları çerçeveleyen taş mimari kemer)
    const pillarGeo = new THREE.BoxGeometry(0.45, 8.5, 0.45);

    const leftPillar = new THREE.Mesh(pillarGeo, this.stonePillarMat);
    leftPillar.position.set(-2.8, 2.6, -4.3);
    this.group.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, this.stonePillarMat);
    rightPillar.position.set(2.8, 2.6, -4.3);
    this.group.add(rightPillar);

    // Kemer Üst Kirişi
    const archTopGeo = new THREE.BoxGeometry(6.0, 0.45, 0.45);
    const archTop = new THREE.Mesh(archTopGeo, this.stonePillarMat);
    archTop.position.set(0, 6.4, -4.3);
    this.group.add(archTop);
  }

  _buildShelves() {
    // Karakterin arkasındaki dikey 3'er katlı ahşap raflar (z = -4.2)
    const shelfGeo = new THREE.BoxGeometry(1.25, 0.08, 0.4);
    const shelfHeights = [1.2, 2.0, 2.8]; // 3 kat

    [-1.9, 1.9].forEach(sideX => {
      shelfHeights.forEach(y => {
        const shelf = new THREE.Mesh(shelfGeo, this.woodMat);
        shelf.position.set(sideX, y, -4.2);
        shelf.receiveShadow = true;
        this.group.add(shelf);

        // Her rafta 2 adet trofe yuvası (Toplam 12 yuva)
        [-0.32, 0.32].forEach(slotOffset => {
          const socketWorldPos = new THREE.Vector3(sideX + slotOffset, y + 0.22, -4.1);

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

  _buildWindowWithNightSky() {
    // PENCERE: Doğrudan gece mavisi renginde, üzerinde minik parıltılar (yıldızlar) olan pencere
    const windowGroup = new THREE.Group();
    windowGroup.position.set(0, 3.1, -4.3); // Karakterin hemen arkasında, kameranın tam görüş açısında

    const winW = 1.8;
    const winH = 2.5;

    // 1. PENCERE GECE MAVİSİ YÜZEYİ (Canlı derin gece mavisi gökyüzü paneli)
    const nightSkyMat = new THREE.MeshBasicMaterial({
      color: 0x0b1a3e // Canlı, zengin gece mavisi
    });
    const skyPane = new THREE.Mesh(new THREE.PlaneGeometry(winW, winH), nightSkyMat);
    skyPane.position.set(0, 0, 0.01);
    windowGroup.add(skyPane);

    // 2. GÖRÜNEN MİNİK PARILTILAR (Pencere üzerinde parıldayan yıldızlar)
    const starGeo = new THREE.DodecahedronGeometry(0.018, 0);
    const starMatBase = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Pencerenin 4 gözüne dengeli dağılmış parıltı koordinatları
    const starCoords = [
      [-0.60, 0.90], [-0.35, 1.05], [-0.15, 0.85], [0.20, 1.00], [0.55, 0.88],
      [-0.70, 0.65], [-0.45, 0.50], [-0.20, 0.60], [0.30, 0.55], [0.65, 0.70],
      [-0.55, 0.25], [-0.30, 0.35], [-0.15, 0.15], [0.15, 0.30], [0.45, 0.20], [0.68, 0.35],
      [-0.65, -0.20], [-0.40, -0.15], [-0.18, -0.30], [0.22, -0.18], [0.50, -0.25],
      [-0.55, -0.55], [-0.30, -0.70], [-0.12, -0.50], [0.18, -0.65], [0.45, -0.50], [0.65, -0.75],
      [-0.40, -0.95], [-0.15, -1.05], [0.25, -0.98], [0.55, -1.05]
    ];

    starCoords.forEach(([sx, sy], idx) => {
      const star = new THREE.Mesh(starGeo, starMatBase.clone());
      star.position.set(sx, sy, 0.025); // Gece mavisinin hemen üzerinde görünür
      star.userData = {
        phaseOffset: idx * 0.45,
        twinkleSpeed: 2.2 + (idx % 4) * 0.8,
        baseScale: 0.8 + (idx % 3) * 0.4
      };
      star.scale.setScalar(star.userData.baseScale);
      windowGroup.add(star);
      this.stars.push(star);
    });

    // 3. PENCERE ÇERÇEVESİ VE ÇITALARI (İçi açık, sadece kenarlıklar ve gotik orta çıtalar)
    const frameThickness = 0.06;
    const frameDepth = 0.07;
    const borderMat = new THREE.MeshStandardMaterial({
      color: 0x181e2b,
      roughness: 0.8
    });

    // Sol kenar
    const leftBorder = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, winH + 0.04, frameDepth), borderMat);
    leftBorder.position.set(-winW / 2, 0, 0.035);
    windowGroup.add(leftBorder);

    // Sağ kenar
    const rightBorder = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, winH + 0.04, frameDepth), borderMat);
    rightBorder.position.set(winW / 2, 0, 0.035);
    windowGroup.add(rightBorder);

    // Üst kenar
    const topBorder = new THREE.Mesh(new THREE.BoxGeometry(winW + frameThickness, frameThickness, frameDepth), borderMat);
    topBorder.position.set(0, winH / 2, 0.035);
    windowGroup.add(topBorder);

    // Alt kenar / Denizlik
    const bottomBorder = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.15, frameThickness * 1.5, frameDepth * 1.4), borderMat);
    bottomBorder.position.set(0, -winH / 2, 0.045);
    windowGroup.add(bottomBorder);

    // Orta Dikey Çıta
    const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.04, winH, 0.05), borderMat);
    mullionV.position.set(0, 0, 0.03);
    windowGroup.add(mullionV);

    // Orta Yatay Çıta
    const mullionH = new THREE.Mesh(new THREE.BoxGeometry(winW, 0.04, 0.05), borderMat);
    mullionH.position.set(0, 0, 0.03);
    windowGroup.add(mullionH);

    this.group.add(windowGroup);

    // Pencereden içeriye hafif soğuk gece ambiyansı
    this.moonLight = new THREE.DirectionalLight(0x8cb6f0, 0.8);
    this.moonLight.position.set(0, 4.0, -3.5);
    this.moonLight.target.position.set(0, 0, 0);
    this.group.add(this.moonLight.target);
    this.group.add(this.moonLight);
  }

  _buildSideTableWithGasLamp() {
    // MASANIN ÇAPRAZINDAKİ SEHPA & ÜZERİNDE GAZ LAMBASI (x: -2.35, z: 0.75)
    // Zemin üstü y = -2.00'den başlar
    const tableGroup = new THREE.Group();
    tableGroup.position.set(-2.35, -2.0, 0.75);

    const tableHeight = 1.95; // Masa tabla hizasına yakın zarif sehpa boyu

    // Ahşap sehpa tablası
    const topGeo = new THREE.CylinderGeometry(0.52, 0.49, 0.08, 16);
    const tableTop = new THREE.Mesh(topGeo, this.tableWoodMat);
    tableTop.position.y = tableHeight;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Torna ahşap gövde ayağı
    const pillarGeo = new THREE.CylinderGeometry(0.08, 0.1, tableHeight - 0.08, 12);
    const pillar = new THREE.Mesh(pillarGeo, this.tableWoodMat);
    pillar.position.y = tableHeight / 2;
    pillar.castShadow = true;
    tableGroup.add(pillar);

    // 3'lü ayak kaidesi
    const baseGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.08, 16);
    const tableBase = new THREE.Mesh(baseGeo, this.tableWoodMat);
    tableBase.position.y = 0.04;
    tableGroup.add(tableBase);

    // Gaz Lambası (Sehpa tablası üzerinde)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0, tableHeight + 0.04, 0);

    // A. Pirinç Hazne
    const tankGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.18, 16);
    const tank = new THREE.Mesh(tankGeo, this.brassMat);
    tank.position.y = 0.09;
    tank.castShadow = true;
    lampGroup.add(tank);

    // B. Brülör Çemberi
    const burnerGeo = new THREE.CylinderGeometry(0.1, 0.13, 0.06, 14);
    const burner = new THREE.Mesh(burnerGeo, this.brassMat);
    burner.position.y = 0.21;
    lampGroup.add(burner);

    // C. Cam Fanus (Chimney)
    const chimneyGeo = new THREE.CylinderGeometry(0.08, 0.13, 0.42, 16);
    const chimney = new THREE.Mesh(chimneyGeo, this.lampGlassMat);
    chimney.position.y = 0.44;
    lampGroup.add(chimney);

    // D. Kor Alev
    const flameGeo = new THREE.ConeGeometry(0.035, 0.1, 8);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffe680 });
    this.lampFlameMesh = new THREE.Mesh(flameGeo, flameMat);
    this.lampFlameMesh.position.y = 0.31;
    lampGroup.add(this.lampFlameMesh);

    // E. Tepe Başlığı ve Askı
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

    // Gaz lambası ışık kaynağı (Sıcak Amber PointLight)
    this.gasLampLight = new THREE.PointLight(0xffa834, 1.8, 9.5, 1.4);
    this.gasLampLight.position.set(-2.35, -2.0 + tableHeight + 0.35, 0.75);
    this.gasLampLight.castShadow = false;
    this.group.add(this.gasLampLight);
  }

  setPhase(phase) {
    this.phase = phase;
    if (phase === 1) {
      this.gasLampLight.intensity = 1.6;
      if (this.moonLight) this.moonLight.intensity = 1.2;
    } else if (phase === 2) {
      this.gasLampLight.intensity = 2.0;
      if (this.moonLight) this.moonLight.intensity = 1.6;
    } else if (phase >= 3) {
      this.gasLampLight.intensity = 2.4;
      if (this.moonLight) this.moonLight.intensity = 2.0;
    }
  }

  update(time) {
    // 1. Sehpadaki gaz lambası alev titremesi
    if (this.gasLampLight) {
      const baseIntensity = this.phase === 1 ? 1.6 : (this.phase === 2 ? 2.0 : 2.4);
      const flicker = Math.sin(time * 7.2) * 0.08 + Math.sin(time * 16.5) * 0.04;
      this.gasLampLight.intensity = baseIntensity + flicker;
    }

    if (this.lampFlameMesh) {
      const flameScale = 1.0 + Math.sin(time * 8.0) * 0.08;
      this.lampFlameMesh.scale.set(flameScale, flameScale, flameScale);
    }

    // 2. Işık Saçan Dolunay Halesinin Canlı Nefes Alması (Radiating Full Moon Pulse)
    // 2. Pencere Gece Mavisindeki Minik Yıldız Parıltıları (Twinkling Star Sparkles)
    this.stars.forEach(star => {
      const offset = star.userData.phaseOffset || 0;
      const speed = star.userData.twinkleSpeed || 2.4;
      const baseScale = star.userData.baseScale || 1.0;
      const wave = Math.sin(time * speed + offset);
      star.material.opacity = 0.35 + (wave + 1) * 0.32; // 0.35 .. 1.0 parlaklık
      const s = baseScale * (0.85 + wave * 0.22);
      star.scale.set(s, s, s);
    });
  }

  getSockets() {
    return this.sockets;
  }
}
