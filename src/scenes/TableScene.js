import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class TableScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.group = new THREE.Group();
    this.slots = [];
    this.mixer = null;
    this.clock = new THREE.Clock();

    this._buildTable();
    this._loadCharacterModel();
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

  _loadCharacterModel() {
    const loader = new GLTFLoader();
    loader.load(
      '/models/character.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -1.0, -1.8);
        model.scale.set(6.5, 6.5, 6.5);
        model.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.group.add(model);

        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(model);
          const action = this.mixer.clipAction(gltf.animations[0]);
          action.play();
        }
        console.log("Özel 3D karakter modeli (character.glb) başarıyla yüklendi!");
      },
      undefined,
      (error) => {
        console.warn("Özel karakter yüklenemedi. Procedural placeholder karakter kullanılıyor.", error);
        this._buildCharacterPlaceholder();
      }
    );
  }

  _buildCharacterPlaceholder() {
    const charGroup = new THREE.Group();
    charGroup.position.set(0, -0.5, -1.8);
    charGroup.scale.set(4.0, 4.0, 4.0);

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

    this.group.add(charGroup);
  }

  update(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }

  getSlots() {
    return this.slots;
  }
}
