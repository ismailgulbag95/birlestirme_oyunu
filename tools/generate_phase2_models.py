import json
import re

PHASE2_MODELS = """
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
"""

PHASE2_CASES = """      case 'aslan':
      case 'lion':
        mainMesh = this._createAslanMesh(def);
        break;
      case 'kopek':
      case 'dog':
        mainMesh = this._createKopekMesh(def);
        break;
      case 'ayi':
      case 'bear':
        mainMesh = this._createAyiMesh(def);
        break;
      case 'kurt':
      case 'wolf':
      case 'kurt_adam':
        mainMesh = this._createKurtMesh(def);
        break;
      case 'ejderha':
      case 'dragon':
        mainMesh = this._createEjderhaMesh(def);
        break;
      case 'dinozor':
      case 'dinazor':
      case 'dinosaur':
        mainMesh = this._createDinozorMesh(def);
        break;
      case 'ahtapot':
      case 'octopus':
        mainMesh = this._createAhtapotMesh(def);
        break;
      case 'denizanasi':
      case 'jellyfish':
        mainMesh = this._createDenizanasiMesh(def);
        break;
      case 'balina':
      case 'whale':
        mainMesh = this._createBalinaMesh(def);
        break;
      case 'kopekbaligi':
      case 'shark':
        mainMesh = this._createKopekbaligiMesh(def);
        break;
      case 'kartal':
      case 'eagle':
        mainMesh = this._createKartalMesh(def);
        break;
      case 'sahin':
        mainMesh = this._createSahinMesh(def);
        break;
      case 'pegasus':
        mainMesh = this._createPegasusMesh(def);
        break;
      case 'akrep':
      case 'scorpion':
        mainMesh = this._createAkrepMesh(def);
        break;
      case 'orumcek':
      case 'spider':
        mainMesh = this._createOrumcekMesh(def);
        break;
      case 'karinca':
      case 'ant':
        mainMesh = this._createKarincaMesh(def);
        break;
      case 'timsah':
      case 'crocodile':
        mainMesh = this._createTimsahMesh(def);
        break;
      case 'golem':
        mainMesh = this._createGolemMesh(def);
        break;
"""

with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Insert methods before static _createArchetypeMesh
pos = text.find('  static _createArchetypeMesh(def)')
if pos != -1:
    text = text[:pos] + PHASE2_MODELS + "\n" + text[pos:]

# Insert cases before default:
case_pos = text.find('      default:')
if case_pos != -1:
    text = text[:case_pos] + PHASE2_CASES + text[case_pos:]

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully injected Phase 2 Living Beings & Creatures into ItemFactory.js!")
