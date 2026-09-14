import * as THREE from 'three';
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MobileRoomEnvironment } from './MobileRoomEnvironment.js';

export class TableScene {
  constructor(sceneManager, initialCharacterId = 'character2') {
    this.sceneManager = sceneManager;
    this.group = new THREE.Group();
    this.roomEnvironment = new MobileRoomEnvironment();
    this.group.add(this.roomEnvironment.group);
    this.slots = [];
    this.mixer = null;
    this.clock = new THREE.Clock();
    this.characters = {
      character1: {
        id: 'character1',
        name: 'Simyacı Çırağı',
        modelPath: '/models/character.glb',
        scale: 6.5,
        position: [0, -1.0, -1.8],
        stoolY: -1.25,
        gltf: null,
        model: null,
        mixer: null,
        actions: {}
      },
      character2: {
        id: 'character2',
        name: 'Gözlemci',
        modelPath: '/models/character2.glb',
        scale: 4.5,
        position: [0, -1.5, -1.8],
        stoolY: -1.55,
        gltf: null,
        model: null,
        mixer: null,
        actions: {}
      },
      character3: {
        id: 'character3',
        name: 'Gezgin',
        modelPath: '/models/character3.glb',
        scale: 6.5,
        position: [0, -2.25, -1.8],
        rotation: [0, 0, 0],
        idleSpeed: 0.75, // Bekleme animasyon hızı %25 yavaşlatıldı (daha sakin/doğal)
        stoolY: -1.95,
        gltf: null,
        model: null,
        mixer: null,
        actions: {}
      }
    };
    this.activeCharacterId = initialCharacterId;
    this.activeCharacterModel = null;
    this.characterHitbox = null;
    this.stool = null;
    this.currentAction = null;
    this.isTalking = false;
    this.talkTimeout = null;

    this._buildTable();
    this._buildStool();
    this._buildCharacterHitbox();
    this._loadCharacter(this.activeCharacterId);
    this._buildSlots();

    this.sceneManager.add(this.group);
  }

  _buildTable() {
    const loader = new GLTFLoader();
    loader.load(
      '/models/old_small_bench.glb',
      (gltf) => {
        this._setupTableModel(gltf.scene);
        console.log("Masa modeli (old_small_bench.glb) başarıyla yüklendi ve ölçeklendirildi.");
      },
      undefined,
      (error) => {
        loader.load(
          '/models/bench.glb',
          (gltf2) => {
            this._setupTableModel(gltf2.scene);
            console.log("Masa modeli (bench.glb) başarıyla yüklendi ve ölçeklendirildi.");
          },
          undefined,
          () => {
            console.warn("Özel masa modeli bulunamadı, procedural masa kullanılıyor.", error);
            this._buildProceduralTable();
          }
        );
      }
    );
  }

  _setupTableModel(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const targetWidth = 4.2;
    const targetDepth = 2.0;
    const targetHeight = 1.8;

    const scaleX = targetWidth / size.x;
    const scaleY = targetHeight / size.y;
    const scaleZ = targetDepth / size.z;

    const uniformScale = Math.min(scaleX, scaleZ) * 1.5; // %50 büyütme
    model.scale.set(uniformScale, scaleY * 1.5, uniformScale);
    model.rotation.y = Math.PI / 2; // 90 derece döndürme

    box.setFromObject(model);
    box.getCenter(center);
    const min = box.min;

    model.position.x = -center.x;
    model.position.y = -1.0 - min.y;
    model.position.z = -center.z;

    model.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.group.add(model);
  }

  _buildProceduralTable() {
    // Masanın tablası
    const tableTopGeo = new THREE.BoxGeometry(4.2, 0.2, 2.0);
    const tableMat = new THREE.MeshStandardMaterial({
      color: '#3d2314',
      roughness: 0.7,
      metalness: 0.1
    });
    const tableTop = new THREE.Mesh(tableTopGeo, tableMat);
    tableTop.position.set(0, 0, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    this.group.add(tableTop);

    // Masa ayakları (4 adet)
    const legGeo = new THREE.CylinderGeometry(0.1, 0.08, 2.0, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: '#24130a', roughness: 0.8 });

    const positions = [
      [-1.9, -1.0, 0.8],
      [1.9, -1.0, 0.8],
      [-1.9, -1.0, -0.8],
      [1.9, -1.0, -0.8]
    ];

    positions.forEach(pos => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(...pos);
      leg.castShadow = true;
      this.group.add(leg);
    });

    // Simyacı Masası zemin tablosu / tahta altlık
    const clothGeo = new THREE.BoxGeometry(3.8, 0.02, 1.6);
    const clothMat = new THREE.MeshStandardMaterial({ color: '#1b3b2b', roughness: 0.9 });
    const cloth = new THREE.Mesh(clothGeo, clothMat);
    cloth.position.set(0, 0.11, 0);
    cloth.receiveShadow = true;
    this.group.add(cloth);
  }

  _buildStool() {
    // Basit Küçük 4 Ayaklı Simyacı Taburesi
    this.stool = new THREE.Group();
    this.stool.name = 'CharacterStool';

    this.stoolWoodMat = new THREE.MeshStandardMaterial({
      color: '#3e2619',
      roughness: 0.75,
      metalness: 0.05
    });

    this._rebuildSimpleStool(1.0);
    this.stool.position.set(0, -2.0, -1.8);
    this.group.add(this.stool);
  }

  _rebuildSimpleStool(height = 1.0) {
    while (this.stool.children.length > 0) {
      this.stool.remove(this.stool.children[0]);
    }

    const seatThickness = 0.09;
    const seatRadius = 0.462; // %10 büyütüldü (çap ~0.92)
    const legRadius = 0.039;
    const legHeight = Math.max(0.2, height - seatThickness);

    // 1. Basit Küçük Yuvarlak Ahşap Oturak Tablası
    const seatGeo = new THREE.CylinderGeometry(seatRadius, seatRadius * 0.95, seatThickness, 16);
    const seat = new THREE.Mesh(seatGeo, this.stoolWoodMat);
    seat.position.y = height - seatThickness / 2;
    seat.castShadow = true;
    seat.receiveShadow = true;
    this.stool.add(seat);

    // 2. Dört Adet Basit Ahşap Ayak
    const spreadTop = seatRadius * 0.55;
    const spreadBottom = seatRadius * 0.72; // Hafif dışa açılı sağlam ayaklar

    const legPositions = [
      [-spreadTop, -spreadBottom, -spreadTop, -spreadBottom],
      [spreadTop, spreadBottom, -spreadTop, -spreadBottom],
      [-spreadTop, -spreadBottom, spreadTop, spreadBottom],
      [spreadTop, spreadBottom, spreadTop, spreadBottom]
    ];

    legPositions.forEach(([xTop, xBottom, zTop, zBottom]) => {
      const legGeo = new THREE.CylinderGeometry(legRadius, legRadius * 0.85, legHeight, 8);
      const leg = new THREE.Mesh(legGeo, this.stoolWoodMat);

      leg.position.set(
        (xTop + xBottom) / 2,
        legHeight / 2,
        (zTop + zBottom) / 2
      );

      leg.rotation.z = (xBottom - xTop) / legHeight;
      leg.rotation.x = (zTop - zBottom) / legHeight;

      leg.castShadow = true;
      leg.receiveShadow = true;
      this.stool.add(leg);
    });

    // 3. Basit Ahşap Ara Bağlantı Çubukları
    const rungY = legHeight * 0.35;
    const rungGeo = new THREE.CylinderGeometry(0.018, 0.018, spreadBottom * 1.6, 6);
    rungGeo.rotateZ(Math.PI / 2);

    [-spreadBottom * 0.65, spreadBottom * 0.65].forEach(zPos => {
      const rung = new THREE.Mesh(rungGeo, this.stoolWoodMat);
      rung.position.set(0, rungY, zPos);
      this.stool.add(rung);
    });
  }

  _alignStoolWithCharacter(model, config) {
    if (!this.stool || !model) return;

    model.updateMatrixWorld(true);

    let hipsBone = null;
    model.traverse(child => {
      if (child.isBone && (child.name.toLowerCase().includes('hips') || child.name.toLowerCase().includes('pelvis'))) {
        hipsBone = child;
      }
    });

    let seatWorldY = -0.55; // Karakter popo hizası varsayılanı

    if (hipsBone) {
      const hipsPos = new THREE.Vector3();
      hipsBone.getWorldPosition(hipsPos);
      // Kalça kemiğinin hemen alt yüzeyi (popo oturma noktası)
      seatWorldY = hipsPos.y - 0.14;
    } else if (config && config.position) {
      seatWorldY = config.position[1] + (config.scale ? config.scale * 0.22 : 0.8);
    }

    const floorY = -2.0;
    const stoolHeight = Math.max(0.3, seatWorldY - floorY);

    this._rebuildSimpleStool(stoolHeight);
    this.stool.position.set(0, floorY, -1.8);
  }

  _buildSlots() {
    // 3 adet low-poly tabak (slot) bölgesi (x ekseninde soldan sağa sıralı)
    const slotPositions = [-1.2, 0, 1.2];

    slotPositions.forEach((x) => {
      const plateGroup = new THREE.Group();
      plateGroup.position.set(x, 1.75, 0);
      plateGroup.scale.set(0.8, 0.8, 0.8); // %20 küçültme

      // Low-poly plate base (8 segments for low-poly look)
      const baseGeo = new THREE.CylinderGeometry(0.55, 0.45, 0.05, 8);
      const plateMat = new THREE.MeshStandardMaterial({
        color: '#e2e8f0', // Seramik / porselen tabak rengi
        roughness: 0.4,
        metalness: 0.1
      });
      const base = new THREE.Mesh(baseGeo, plateMat);
      base.castShadow = true;
      base.receiveShadow = true;
      plateGroup.add(base);

      // Plate inner rim / dish depression
      const rimGeo = new THREE.CylinderGeometry(0.5, 0.48, 0.07, 8);
      const rimMat = new THREE.MeshStandardMaterial({
        color: '#cbd5e1',
        roughness: 0.3,
        metalness: 0.2
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.y = 0.01;
      rim.castShadow = true;
      plateGroup.add(rim);

      plateGroup.userData = { slotIndex: x, isOccupied: false, currentItem: null, mesh: null, slot: plateGroup };

      this.group.add(plateGroup);
      this.slots.push(plateGroup);
    });
  }

  _loadCharacter(charId) {
    const config = this.characters[charId];
    if (!config) return;

    // Eğer önceki model sahnede ise kaldır
    if (this.activeCharacterModel) {
      this.group.remove(this.activeCharacterModel);
      this.activeCharacterModel = null;
      this.mixer = null;
    }

    // Eğer daha önce yüklendiyse önbellekten kullan
    if (config.model && config.mixer) {
      this.activeCharacterId = charId;
      this.activeCharacterModel = config.model;
      this.activeCharacterModel.scale.set(config.scale, config.scale, config.scale);
      this.activeCharacterModel.position.set(...config.position);
      if (config.rotation) {
        this.activeCharacterModel.rotation.set(...config.rotation);
      }
      this.mixer = config.mixer;
      this.group.add(this.activeCharacterModel);
      this._playAction(config, 'Sitting_Idle');
      if (this.mixer) this.mixer.update(0.01);
      this._alignStoolWithCharacter(this.activeCharacterModel, config);
      setTimeout(() => this._alignStoolWithCharacter(this.activeCharacterModel, config), 60);
      return;
    }

    const loader = new GLTFLoader();
    loader.load(
      config.modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(...config.position);
        model.scale.set(config.scale, config.scale, config.scale);
        if (config.rotation) {
          model.rotation.set(...config.rotation);
        }
        model.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          child.userData.isCharacter = true;
          child.userData.characterId = charId;
        });

        config.gltf = gltf;
        config.model = model;
        config.mixer = new THREE.AnimationMixer(model);
        config.actions = {};

        if (gltf.animations && gltf.animations.length > 0) {
          gltf.animations.forEach(clip => {
            const action = config.mixer.clipAction(clip);
            config.actions[clip.name] = action;
          });
        }

        // Eğer hala aktif karakter bu ise sahneye ekle
        if (this.activeCharacterId === charId) {
          this.activeCharacterModel = model;
          this.mixer = config.mixer;
          this.group.add(model);
          this._playAction(config, 'Sitting_Idle');
          if (this.mixer) this.mixer.update(0.01);
          this._alignStoolWithCharacter(model, config);
          setTimeout(() => this._alignStoolWithCharacter(model, config), 60);
        }

        console.log(`3D karakter (${config.name}) başarıyla yüklendi!`);
      },
      undefined,
      (error) => {
        console.warn(`Karakter (${config.name}) yüklenemedi. Procedural karakter kullanılıyor.`, error);
        this._buildCharacterPlaceholder();
      }
    );
  }

  _playAction(config, clipName, loop = THREE.LoopRepeat, duration = 0.3) {
    if (!config || !config.actions) return;

    let targetAction = config.actions[clipName];
    // Eğer istenen isim yoksa ilk animasyonu al
    if (!targetAction && Object.keys(config.actions).length > 0) {
      targetAction = Object.values(config.actions)[0];
    }
    if (!targetAction) return;

    const speed = (clipName === 'Sitting_Idle' && config.idleSpeed !== undefined) ? config.idleSpeed : 1.0;
    targetAction.setEffectiveTimeScale(speed);

    if (this.currentAction && this.currentAction !== targetAction) {
      targetAction.reset();
      targetAction.setLoop(loop);
      targetAction.play();
      this.currentAction.crossFadeTo(targetAction, duration, true);
    } else {
      targetAction.reset();
      targetAction.setLoop(loop);
      targetAction.play();
    }
    this.currentAction = targetAction;
  }

  playTalkingAnimation() {
    const config = this.characters[this.activeCharacterId];
    if (!config || !config.actions) return;

    const talkingAction = config.actions['Sitting_Talking'];
    if (!talkingAction) {
      // Modelde konuşma animasyonu yoksa (örneğin Karakter 1 ve Karakter 3) küçük bir zıplama tepkisi ver
      if (this.activeCharacterModel) {
        const baseY = config.position ? config.position[1] : -1.0;
        gsap.killTweensOf(this.activeCharacterModel.position);
        gsap.to(this.activeCharacterModel.position, {
          y: baseY + 0.2,
          duration: 0.12,
          yoyo: true,
          repeat: 3,
          ease: 'power1.inOut',
          onComplete: () => {
            if (this.activeCharacterModel) {
              this.activeCharacterModel.position.set(...config.position);
            }
          }
        });
      }
      return;
    }

    if (this.talkTimeout) {
      clearTimeout(this.talkTimeout);
      this.talkTimeout = null;
    }

    this.isTalking = true;
    talkingAction.reset();
    talkingAction.setLoop(THREE.LoopRepeat);
    talkingAction.clampWhenFinished = false;
    talkingAction.play();

    if (this.currentAction && this.currentAction !== talkingAction) {
      this.currentAction.crossFadeTo(talkingAction, 0.25, true);
    }
    this.currentAction = talkingAction;

    // Konuşma animasyonunu 2.8 saniye oynattıktan sonra tekrar Sitting_Idle'a yumuşak geçiş yap
    this.talkTimeout = setTimeout(() => {
      this.isTalking = false;
      this._playAction(config, 'Sitting_Idle', THREE.LoopRepeat, 0.4);
      this.talkTimeout = null;
    }, 2800);
  }

  playDeathAnimation() {
    const config = this.characters[this.activeCharacterId];
    if (!config || !config.actions) return;

    // Model 3'teki 3. animasyon (Death_D)
    const deathAction = config.actions['Death_D'] || Object.values(config.actions).find(a => a.getClip().name.toLowerCase().includes('death'));
    if (!deathAction) {
      console.warn("Karakterde ölüm (Death) animasyonu bulunamadı.");
      return;
    }

    if (this.talkTimeout) {
      clearTimeout(this.talkTimeout);
      this.talkTimeout = null;
    }

    this.isTalking = false;
    deathAction.reset();
    deathAction.setLoop(THREE.LoopOnce);
    deathAction.clampWhenFinished = true;
    deathAction.play();

    if (this.currentAction && this.currentAction !== deathAction) {
      this.currentAction.crossFadeTo(deathAction, 0.3, true);
    }
    this.currentAction = deathAction;

    // Ölüm animasyonu sonrası (örneğin 4.5 saniye sonra) tekrar hayata dönüp oturma/salınım durumuna geç
    this.talkTimeout = setTimeout(() => {
      this._playAction(config, 'Sitting_Idle', THREE.LoopRepeat, 0.6);
      this.talkTimeout = null;
    }, 4500);
  }

  playSuccessAnimation() {
    const config = this.characters[this.activeCharacterId];
    if (!config || !config.actions) return;

    // character3 için 'Success_Craft' (Throwing Dice), character2 için 'Sitting_Talking'
    const successAction = config.actions['Success_Craft'] || config.actions['Sitting_Talking'];
    if (!successAction) {
      // Karakterin özel birleştirme animasyonu yoksa (örneğin sadece Sitting_Idle varsa),
      // modelin pozisyonunu eşyalarla birlikte yapay olarak zıplatma; mevcut salınımına devam etsin.
      return;
    }

    if (this.talkTimeout) {
      clearTimeout(this.talkTimeout);
      this.talkTimeout = null;
    }

    this.isTalking = false;
    successAction.reset();
    successAction.setLoop(THREE.LoopOnce);
    successAction.clampWhenFinished = true;
    successAction.play();

    if (this.currentAction && this.currentAction !== successAction) {
      this.currentAction.crossFadeTo(successAction, 0.25, true);
    }
    this.currentAction = successAction;

    // Gezgin (character3) birleştirme animasyonunu (Throwing Dice) masa üstüne yukarı taşı
    if (this.activeCharacterId === 'character3' && this.activeCharacterModel) {
      const baseY = config.position ? config.position[1] : -2.25;
      const baseZ = config.position ? config.position[2] : -1.8;
      gsap.killTweensOf(this.activeCharacterModel.position);
      gsap.to(this.activeCharacterModel.position, {
        y: baseY + 0.7, // Masanın üstünde net görünmesi için yukarı kaldır
        z: baseZ + 0.2, // Masaya hafif yaklaştır
        duration: 0.35,
        ease: 'power2.out'
      });
    }

    const clipDuration = (successAction.getClip() ? successAction.getClip().duration : 3.0) * 1000;
    this.talkTimeout = setTimeout(() => {
      // Animasyon bittiğinde Gezgin'i tekrar orijinal bekleme pozisyonuna geri indir
      if (this.activeCharacterId === 'character3' && this.activeCharacterModel) {
        gsap.killTweensOf(this.activeCharacterModel.position);
        gsap.to(this.activeCharacterModel.position, {
          y: config.position[1],
          z: config.position[2],
          duration: 0.5,
          ease: 'power2.inOut'
        });
      }
      this._playAction(config, 'Sitting_Idle', THREE.LoopRepeat, 0.4);
      this.talkTimeout = null;
    }, Math.min(clipDuration, 4000));
  }

  playFailAnimation() {
    const config = this.characters[this.activeCharacterId];
    if (!config || !config.actions) return;

    // character3 için 'Wrong_Craft' (Sitting Dodges)
    const failAction = config.actions['Wrong_Craft'];
    if (!failAction) {
      // Karakterin özel başarısızlık animasyonu yoksa modeli yapay olarak sağa-sola sarsma;
      // mevcut salınımına devam etsin.
      return;
    }

    if (this.talkTimeout) {
      clearTimeout(this.talkTimeout);
      this.talkTimeout = null;
    }

    this.isTalking = false;
    failAction.reset();
    failAction.setLoop(THREE.LoopOnce);
    failAction.clampWhenFinished = true;
    failAction.play();

    if (this.currentAction && this.currentAction !== failAction) {
      this.currentAction.crossFadeTo(failAction, 0.25, true);
    }
    this.currentAction = failAction;

    // Gezgin (character3) başarısız animasyonunu (Sitting Dodges) masanın üstünde net görünmesi için biraz yukarı taşı
    if (this.activeCharacterId === 'character3' && this.activeCharacterModel) {
      const baseY = config.position ? config.position[1] : -2.25;
      const baseZ = config.position ? config.position[2] : -1.8;
      gsap.killTweensOf(this.activeCharacterModel.position);
      gsap.to(this.activeCharacterModel.position, {
        y: baseY + 0.55, // Masanın arkasında kaybolmaması için yukarı yükselt
        z: baseZ + 0.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    const clipDuration = (failAction.getClip() ? failAction.getClip().duration : 2.5) * 1000;
    this.talkTimeout = setTimeout(() => {
      // Animasyon bitince Gezgin'i tekrar normal bekleme konumuna indir
      if (this.activeCharacterId === 'character3' && this.activeCharacterModel) {
        gsap.killTweensOf(this.activeCharacterModel.position);
        gsap.to(this.activeCharacterModel.position, {
          y: config.position[1],
          z: config.position[2],
          duration: 0.5,
          ease: 'power2.inOut'
        });
      }
      this._playAction(config, 'Sitting_Idle', THREE.LoopRepeat, 0.4);
      this.talkTimeout = null;
    }, Math.min(clipDuration, 3500));
  }

  switchCharacter(charId) {
    if (!this.characters[charId]) return;
    if (this.activeCharacterId === charId && this.activeCharacterModel) return;

    if (this.talkTimeout) {
      clearTimeout(this.talkTimeout);
      this.talkTimeout = null;
    }
    this.isTalking = false;

    this.activeCharacterId = charId;
    this._loadCharacter(charId);
  }

  _buildCharacterHitbox() {
    // Karakterin masanın arkasında oturduğu ve yükseldiği bölgeyi kapsayan geniş şeffaf dokunmatik etkileşim alanı
    const hitboxGeo = new THREE.BoxGeometry(3.2, 3.6, 2.0);
    const hitboxMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.0,
      depthWrite: false
    });
    this.characterHitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
    this.characterHitbox.position.set(0, 1.2, -1.7);
    this.characterHitbox.userData.isCharacter = true;
    this.characterHitbox.userData.isCharacterHitbox = true;
    this.group.add(this.characterHitbox);
  }

  isCharacterHit(object) {
    if (!object) return false;
    let curr = object;
    while (curr && curr !== this.sceneManager.scene) {
      if (curr.userData && (curr.userData.isCharacter || curr.userData.characterId || curr.userData.isCharacterHitbox)) {
        return true;
      }
      if (curr === this.characterHitbox || curr === this.activeCharacterModel) {
        return true;
      }
      curr = curr.parent;
    }
    return false;
  }

  _buildCharacterPlaceholder() {
    const charGroup = new THREE.Group();
    charGroup.position.set(0, -0.5, -1.8);
    charGroup.scale.set(4.0, 4.0, 4.0);
    charGroup.userData.isCharacter = true;

    // Gövde (Torso)
    const torsoGeo = new THREE.CylinderGeometry(0.5, 0.4, 1.2, 16);
    const torsoMat = new THREE.MeshStandardMaterial({ color: '#2c3e50', roughness: 0.7 });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.set(0, 0.6, 0);
    torso.castShadow = true;
    charGroup.add(torso);

    // Kafa (Head)
    const headGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({ color: '#f5d0b1', roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 1.4, 0);
    head.castShadow = true;
    charGroup.add(head);

    // Simyacı Şapkası (Kukuleta/Şapka detayı)
    const hatGeo = new THREE.ConeGeometry(0.4, 0.6, 16);
    const hatMat = new THREE.MeshStandardMaterial({ color: '#1a252f', roughness: 0.8 });
    const hat = new THREE.Mesh(hatGeo, hatMat);
    hat.position.set(0, 1.8, 0);
    charGroup.add(hat);

    // Masaya uzanan kollar (Arms reaching forward)
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 1.0, 12);
    const armMat = new THREE.MeshStandardMaterial({ color: '#34495e', roughness: 0.7 });

    const leftArms = new THREE.Mesh(armGeo, armMat);
    leftArms.rotation.x = Math.PI / 3;
    leftArms.rotation.z = -0.2;
    leftArms.position.set(-0.6, 0.7, 0.5);
    charGroup.add(leftArms);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.rotation.x = Math.PI / 3;
    rightArm.rotation.z = 0.2;
    rightArm.position.set(0.6, 0.7, 0.5);
    charGroup.add(rightArm);

    this.activeCharacterModel = charGroup;
    this.group.add(charGroup);
  }

  update(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
    if (this.roomEnvironment) {
      this.roomEnvironment.update(this.clock.getElapsedTime());
    }
  }

  getRoomEnvironment() {
    return this.roomEnvironment;
  }

  getSlots() {
    return this.slots;
  }
}

