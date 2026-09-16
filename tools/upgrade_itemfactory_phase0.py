import re

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

new_archetype_method = """  static _createArchetypeMesh(def) {
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
  }"""

# Replace from static _createArchetypeMesh up to static _createDefaultMesh
pattern = r'  static _createArchetypeMesh\(def\) \{.*?return group;\s*\}'
updated_text = re.sub(pattern, new_archetype_method, text, flags=re.DOTALL)

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(updated_text)

print("ItemFactory.js _createArchetypeMesh replaced successfully!")
