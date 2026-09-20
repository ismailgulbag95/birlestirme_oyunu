import * as THREE from 'three';

/**
 * BadgeFactory.js
 * 12 adet Rozet ve Koleksiyon sembolü için 3D Mesh üreticisi.
 * Kilitli durum için karartı (silhouette) materyali,
 * Açık durum için zengin altın/kristal/emaye materyaller sunar.
 */
export class BadgeFactory {
  /**
   * Kilitli rozet ve koleksiyonlar için karartı (silhouette) materyali
   */
  static getSilhouetteMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0x121620,
      roughness: 0.95,
      metalness: 0.05,
      transparent: true,
      opacity: 0.85
    });
  }

  /**
   * Ana üretici fonksiyon: itemId ve isUnlocked parametresine göre 3D grup döndürür.
   * @param {string} id - 'col_elements', 'badge_10', vb.
   * @param {boolean} isUnlocked
   * @returns {THREE.Group}
   */
  static createBadgeMesh(id, isUnlocked = false) {
    const group = new THREE.Group();
    group.name = `badge_${id}`;

    switch (id) {
      case 'col_elements':
        this._buildElementsMesh(group, isUnlocked);
        break;
      case 'col_nature':
        this._buildNatureMesh(group, isUnlocked);
        break;
      case 'col_minerals':
        this._buildMineralsMesh(group, isUnlocked);
        break;
      case 'col_craft':
        this._buildCraftMesh(group, isUnlocked);
        break;
      case 'col_life':
        this._buildLifeMesh(group, isUnlocked);
        break;
      case 'col_mystic':
        this._buildMysticMesh(group, isUnlocked);
        break;
      case 'badge_10':
        this._buildBadge10Mesh(group, isUnlocked);
        break;
      case 'badge_30':
        this._buildBadge30Mesh(group, isUnlocked);
        break;
      case 'badge_40':
        this._buildBadge40Mesh(group, isUnlocked);
        break;
      case 'badge_70':
        this._buildBadge70Mesh(group, isUnlocked);
        break;
      case 'badge_80':
        this._buildBadge80Mesh(group, isUnlocked);
        break;
      case 'badge_grandmaster_unlocked':
        this._buildBadgeGrandmasterMesh(group, isUnlocked);
        break;
      default:
        this._buildElementsMesh(group, isUnlocked);
        break;
    }

    return group;
  }

  // 1. DÖRT TEMEL UNSUR KOLEKSİYONU (col_elements)
  static _buildElementsMesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 });
    const coreMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffa500, emissiveIntensity: 0.4, roughness: 0.2 }) : silMat;

    const baseGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.08, 16);
    const base = new THREE.Mesh(baseGeo, isUnlocked ? goldMat : silMat);
    group.add(base);

    const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), coreMat);
    core.position.y = 0.28;
    group.add(core);

    const ringMat = isUnlocked ? goldMat : silMat;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.025, 8, 24), ringMat);
    ring.position.y = 0.28;
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    // 4 Uydu Unsur Küresi
    const orbColors = [0xff4500, 0x1e90ff, 0x228b22, 0x87ceeb];
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const orbMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: orbColors[i], roughness: 0.3, metalness: 0.5 }) : silMat;
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), orbMat);
      orb.position.set(Math.cos(angle) * 0.32, 0.28, Math.sin(angle) * 0.32);
      group.add(orb);
    }
  }

  // 2. DOĞA & BOTANİK KOLEKSİYONU (col_nature)
  static _buildNatureMesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const woodMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.8 }) : silMat;
    const leafMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x2e7d32, emissive: 0x1b5e20, emissiveIntensity: 0.2, roughness: 0.4 }) : silMat;
    const flowerMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xe91e63, roughness: 0.3 }) : silMat;

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 16), isUnlocked ? woodMat : silMat);
    group.add(base);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.25, 12), woodMat);
    trunk.position.y = 0.16;
    group.add(trunk);

    // 3 Katlı Ağaç Taç Yaprağı
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28 - i * 0.06, 0.18, 12), leafMat);
      cone.position.y = 0.28 + i * 0.12;
      group.add(cone);
    }

    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), flowerMat);
    flower.position.y = 0.58;
    group.add(flower);
  }

  // 3. MADEN & JEOLOJİ KOLEKSİYONU (col_minerals)
  static _buildMineralsMesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const rockMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 }) : silMat;

    const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), rockMat);
    base.scale.set(1.1, 0.3, 1.1);
    base.position.y = 0.05;
    group.add(base);

    const gemColors = [0x9c27b0, 0x00bcd4, 0xffc107, 0x4caf50];
    const gemAngles = [0, 1.5, 3.1, 4.6];
    const gemHeights = [0.3, 0.24, 0.26, 0.22];

    gemColors.forEach((color, idx) => {
      const mat = isUnlocked ? new THREE.MeshStandardMaterial({ color, roughness: 0.1, metalness: 0.8, emissive: color, emissiveIntensity: 0.2 }) : silMat;
      const crystal = new THREE.Mesh(new THREE.ConeGeometry(0.07, gemHeights[idx], 5), mat);
      const angle = gemAngles[idx];
      crystal.position.set(Math.cos(angle) * 0.12, 0.15 + gemHeights[idx] / 2, Math.sin(angle) * 0.12);
      crystal.rotation.z = (Math.random() - 0.5) * 0.3;
      crystal.rotation.x = (Math.random() - 0.5) * 0.3;
      group.add(crystal);
    });
  }

  // 4. ZANAAT & ARAÇLAR KOLEKSİYONU (col_craft)
  static _buildCraftMesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const ironMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x424242, roughness: 0.4, metalness: 0.8 }) : silMat;
    const goldMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 }) : silMat;

    // Örs Gövdesi
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.1, 0.25), ironMat);
    base.position.y = 0.05;
    group.add(base);

    const mid = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.15, 0.2), ironMat);
    mid.position.y = 0.175;
    group.add(mid);

    const top = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.25), ironMat);
    top.position.y = 0.3;
    group.add(top);

    // Çark Dişlisi arka fon
    const gear = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 12), goldMat);
    gear.position.set(0, 0.42, -0.05);
    gear.rotation.x = Math.PI / 2;
    group.add(gear);
  }

  // 5. CANLILAR ÂLEMİ KOLEKSİYONU (col_life)
  static _buildLifeMesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const goldMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 }) : silMat;
    const dnaMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x9c27b0, emissive: 0x673ab7, emissiveIntensity: 0.3, roughness: 0.2 }) : silMat;

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 16), isUnlocked ? goldMat : silMat);
    group.add(base);

    // DNA Çift Sarmal
    for (let i = 0; i < 5; i++) {
      const y = 0.12 + i * 0.08;
      const angle = i * 0.8;

      const node1 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), dnaMat);
      node1.position.set(Math.cos(angle) * 0.14, y, Math.sin(angle) * 0.14);
      group.add(node1);

      const node2 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), dnaMat);
      node2.position.set(-Math.cos(angle) * 0.14, y, -Math.sin(angle) * 0.14);
      group.add(node2);

      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.28, 6), isUnlocked ? goldMat : silMat);
      bar.position.set(0, y, 0);
      bar.rotation.y = angle;
      bar.rotation.z = Math.PI / 2;
      group.add(bar);
    }
  }

  // 6. MİSTİK & GÖKYÜZÜ KOLEKSİYONU (col_mystic)
  static _buildMysticMesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const moonMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xffd54f, roughness: 0.2, metalness: 0.7 }) : silMat;
    const starMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x29b6f6, emissive: 0x0288d1, emissiveIntensity: 0.4, roughness: 0.1 }) : silMat;

    // Hilal Ay
    const moonShape = new THREE.TorusGeometry(0.24, 0.06, 12, 24, Math.PI * 1.3);
    const moon = new THREE.Mesh(moonShape, moonMat);
    moon.position.y = 0.28;
    moon.rotation.z = -Math.PI / 4;
    group.add(moon);

    // Mistik Yıldız
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), starMat);
    star.position.set(-0.04, 0.28, 0.02);
    group.add(star);
  }

  // 7. ROZET: İLK KIVILCIM (badge_10)
  static _buildBadge10Mesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const goldMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xff9800, roughness: 0.3, metalness: 0.8 }) : silMat;
    const flameMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xff3d00, emissive: 0xff6d00, emissiveIntensity: 0.5, roughness: 0.2 }) : silMat;

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 16), isUnlocked ? goldMat : silMat);
    group.add(base);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.18, 12), isUnlocked ? goldMat : silMat);
    stem.position.y = 0.13;
    group.add(stem);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.32, 12), flameMat);
    flame.position.y = 0.36;
    group.add(flame);
  }

  // 8. ROZET: ZANAATKAR SİMYACI (badge_30)
  static _buildBadge30Mesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const bronzeMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xcd7f32, roughness: 0.3, metalness: 0.85 }) : silMat;
    const ironMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x616161, roughness: 0.5, metalness: 0.7 }) : silMat;

    // Şövalye / Zanaat Kalkanı
    const shield = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 0.06), bronzeMat);
    shield.position.y = 0.28;
    group.add(shield);

    // Çapraz Çekiç Motifi
    const hammerHead = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.08), ironMat);
    hammerHead.position.set(0, 0.32, 0.05);
    group.add(hammerHead);

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8), ironMat);
    handle.position.set(0, 0.25, 0.05);
    handle.rotation.z = Math.PI / 4;
    group.add(handle);
  }

  // 9. ROZET: GÖZLEMCİ UYANIŞI (badge_40)
  static _buildBadge40Mesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const stoneMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.7, metalness: 0.2 }) : silMat;
    const eyeMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x00e676, emissive: 0x00b0ff, emissiveIntensity: 0.5, roughness: 0.1 }) : silMat;

    // Gözlemci Piramidi
    const pyr = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.42, 4), stoneMat);
    pyr.position.y = 0.25;
    pyr.rotation.y = Math.PI / 4;
    group.add(pyr);

    // Bilgelik Gözü
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), eyeMat);
    eye.position.set(0, 0.26, 0.16);
    group.add(eye);
  }

  // 10. ROZET: USTA ADAYI (badge_70)
  static _buildBadge70Mesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const brassMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xb8860b, roughness: 0.3, metalness: 0.85 }) : silMat;
    const orbMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xab47bc, emissive: 0x7b1fa2, emissiveIntensity: 0.6, roughness: 0.1 }) : silMat;

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 16), isUnlocked ? brassMat : silMat);
    group.add(base);

    // 4 Mistik Sütun
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.28, 8), isUnlocked ? brassMat : silMat);
      pillar.position.set(Math.cos(angle) * 0.2, 0.18, Math.sin(angle) * 0.2);
      group.add(pillar);
    }

    // Süzülen Mistik Küre
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), orbMat);
    orb.position.y = 0.36;
    group.add(orb);
  }

  // 11. ROZET: KLASİK SİMYA USTASI (badge_80)
  static _buildBadge80Mesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const crownGold = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.9 }) : silMat;
    const rubyMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0xd50000, emissive: 0xb71c1c, emissiveIntensity: 0.5, roughness: 0.1 }) : silMat;

    // Tacın Alt Çemberi
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.1, 16), crownGold);
    rim.position.y = 0.1;
    group.add(rim);

    // 5 Taç Sivrisi (Crest Points)
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.22, 8), crownGold);
      spike.position.set(Math.cos(angle) * 0.28, 0.24, Math.sin(angle) * 0.28);
      group.add(spike);
    }

    // Ortadaki Kraliyet Yakutu
    const ruby = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), rubyMat);
    ruby.position.y = 0.26;
    group.add(ruby);
  }

  // 12. ROZET: BÜYÜK SİMYACI (badge_grandmaster_unlocked)
  static _buildBadgeGrandmasterMesh(group, isUnlocked) {
    const silMat = this.getSilhouetteMaterial();
    const darkMetal = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x212121, roughness: 0.5, metalness: 0.8 }) : silMat;
    const potionMat = isUnlocked ? new THREE.MeshStandardMaterial({ color: 0x00e676, emissive: 0x00c853, emissiveIntensity: 0.6, roughness: 0.2 }) : silMat;

    // Kazan Gövdesi
    const cauldron = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), darkMetal);
    cauldron.scale.set(1.1, 0.85, 1.1);
    cauldron.position.y = 0.22;
    group.add(cauldron);

    // Kazan Ağzı Çemberi
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.03, 8, 20), darkMetal);
    rim.position.y = 0.36;
    rim.rotation.x = Math.PI / 2;
    group.add(rim);

    // Kaynayan İksir Yüzeyi
    const potion = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 16), potionMat);
    potion.position.y = 0.35;
    group.add(potion);

    // Kabarcıklar
    for (let i = 0; i < 3; i++) {
      const bubble = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), potionMat);
      const angle = i * 2.0;
      bubble.position.set(Math.cos(angle) * 0.12, 0.4 + i * 0.03, Math.sin(angle) * 0.12);
      group.add(bubble);
    }
  }
}
