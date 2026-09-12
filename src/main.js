import * as THREE from 'three';
import gsap from 'gsap';
import { SceneManager } from './core/SceneManager.js';
import { TableScene } from './scenes/TableScene.js';
import { RapierWorld } from './physics/RapierWorld.js';
import { ItemFactory } from './items/ItemFactory.js';
import { ITEM_DEFINITIONS, getCanonicalId } from './items/itemDefinitions.js';
import { CraftingSystem } from './systems/CraftingSystem.js';
import { HintSystem } from './systems/HintSystem.js';
import { UIManager } from './ui/UIManager.js';

class Game {
  async init() {
    const canvas = document.getElementById('canvas');
    this.sceneManager = new SceneManager(canvas);
    this.tableScene = new TableScene(this.sceneManager);
    this.physics = new RapierWorld();
    await this.physics.init();

    this.crafting = new CraftingSystem();
    this.hintSystem = new HintSystem();

    this.unlockedItems = ['fire', 'water', 'earth', 'air'];
    this.lockedItems = [
      'steam', 'mud', 'lava', 'rain', 'energy', 'wind', 'stone',
      'sand', 'glass', 'cloud', 'lightning', 'plant', 'tree',
      'wood', 'splinter', 'fiber', 'obsidian', 'rope', 'mushroom',
      'cotton', 'fabric', 'coal', 'ash', 'paper', 'life', 'bird',
      'animal', 'fish', 'primitive_knife', 'feather', 'leather',
      'cooked_meat', 'resin', 'pottery', 'water_jug', 'bottle',
      'flint', 'bow', 'arrow', 'torch', 'raw_metal', 'iron_ingot',
      'metal_knife', 'pickaxe', 'sword', 'wooden_shield', 'iron_shield',
      'leather_armor', 'iron_armor', 'bed',
      // Kategori 5: Kimya, Simya & Büyü Eşyaları
      'zehirli_sivi', 'zehir_sisesi', 'zehirli_kilic', 'sifa_iksiri', 'mana_iksiri',
      'barut', 'bomba', 'buyu_parsomeni', 'yildirim_parsomeni', 'ates_topu_kitabi',
      // Kategori 6: Mekanik & Medeniyet Eşyaları
      'buhar_motoru', 'tekerlek', 'el_arabasi', 'lokomotif', 'ampul', 'fener', 'pusula', 'miknatis', 'elektrik_motoru',
      // Kategori 7: Ağır Sanayi, Metalurji ve İleri İnşaat Eşyaları
      'celik_kulce', 'ors', 'civi', 'tugla', 'harc', 'tugla_duvar', 'saglam_sandik', 'kristal', 'teleskop', 'vinc',
      // Kategori 8
      'yildiz_tozu', 'prizma_tasi', 'kahin_kuresi', 'portal_runu', 'bosluk_sisesi', 'boyut_kapisi', 'anka_kulu', 'runik_zirh', 'firtina_kilici', 'yildiz_gecidi_cekirdegi',
      // Yeni 32 Eşya
      'kar', 'buz', 'col',
      'tohum', 'bugday', 'nane', 'agac_kabugu',
      'inek', 'sut', 'yumurta', 'mercan',
      'olta', 'yelken', 'sal', 'obsidyen_bicak',
      'peynir', 'un', 'hamur', 'ekmek',
      'disli_cark', 'degirmen', 'ayna', 'saat',
      'demir_parmaklik', 'savas_baltasi', 'gozetleme_kulesi', 'kale_kapisi',
      'buz_runu', 'cehennem_tasi', 'zaman_kum_saati', 'illuzyon_aynasi'
    ];

    this.ui = new UIManager(
      (itemId) => this.onInventoryItemSelect(itemId),
      (itemId) => this.onGetHint(itemId),
      (itemId) => this.onWatchAd(itemId),
      () => this.physics.clearPieces(this.sceneManager.scene)
    );

    this.ui._populateInventory(this.unlockedItems);
    this.ui.updateHintRights(this.hintSystem.hintRights);
    this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);

    this._setupRaycasting(canvas);
    this._startLoop();
  }

  get discoveredItems() {
    return this.unlockedItems;
  }

  set discoveredItems(val) {
    this.unlockedItems = val;
  }

  onInventoryItemSelect(itemId) {
    // Yalnızca unlockedItems listesinde bulunan eşyalar masaya konulabilir
    const canonical = getCanonicalId(itemId);
    const isUnlocked = this.unlockedItems.some(id => id === itemId || getCanonicalId(id) === canonical);
    if (!isUnlocked) return;

    const slots = this.tableScene.getSlots();
    const emptySlot = slots.find(s => !s.userData.isOccupied);
    if (!emptySlot) return;

    emptySlot.userData.isOccupied = true;
    emptySlot.userData.currentItem = itemId;

    const itemMesh = ItemFactory.createItemMesh(itemId);
    itemMesh.position.set(emptySlot.position.x, 3.0, emptySlot.position.z);
    itemMesh.scale.set(0, 0, 0);
    this.sceneManager.add(itemMesh);

    emptySlot.userData.mesh = itemMesh;
    itemMesh.userData.slot = emptySlot; // Doğrudan slot bağlantısı

    // GSAP Drop & Bounce animation onto slot
    gsap.to(itemMesh.position, {
      y: emptySlot.position.y + 0.3,
      duration: 0.6,
      ease: 'bounce.out'
    });
    gsap.to(itemMesh.scale, {
      x: 0.5, y: 0.5, z: 0.5,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  }

  onGetHint(itemId) {
    const res = this.hintSystem.useHint(itemId);
    if (res.success) {
      this.ui.updateHintRights(this.hintSystem.hintRights);
      this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
    }
    return res;
  }

  onWatchAd(itemId) {
    this.hintSystem.watchAdForHint(itemId);
    this.ui.updateHintRights(this.hintSystem.hintRights);
    this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
    alert("📺 Reklam başarıyla izlendi! +1 İpucu hakkı harcanarak detaylı ipucu açıldı.");
  }

  _setupRaycasting(canvas) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.sceneManager.camera);
      const intersects = raycaster.intersectObjects(this.sceneManager.scene.children, true);

      if (intersects.length === 0) return;

      const hit = intersects[0];
      let obj = hit.object;
      let targetSlot = null;

      while (obj && obj.parent && obj !== this.sceneManager.scene) {
        if (obj.userData) {
          if (obj.userData.slot) {
            targetSlot = obj.userData.slot;
            break;
          } else if (obj.userData.slotIndex !== undefined && obj.userData.isOccupied) {
            targetSlot = obj;
            break;
          }
        }
        obj = obj.parent;
      }

      if (targetSlot && targetSlot.userData && targetSlot.userData.isOccupied && targetSlot.userData.mesh) {
        this.throwAndBreakItem(targetSlot);
        return;
      }

      // Check if clicked character (behind table)
      if (hit.point.z - (hit.point.z || 0) < -1.0 || (hit.point && hit.point.z < -1.0)) {
        this.triggerCrafting();
      }
    });
  }

  throwAndBreakItem(slot) {
    const mesh = slot.userData.mesh;
    if (!mesh) return;

    slot.userData.isOccupied = false;
    slot.userData.currentItem = null;
    slot.userData.mesh = null;
    mesh.userData.slot = null;

    // Animate throw upwards and backwards towards character
    gsap.to(mesh.position, {
      y: 3.5,
      z: -2.0,
      duration: 0.4,
      ease: 'power1.out',
      onComplete: () => {
        this.sceneManager.remove(mesh);
        if (mesh.userData.fracturePieces) {
          mesh.userData.fracturePieces.forEach(originalPiece => {
            const piece = originalPiece.clone();
            delete piece.userData.slot;
            piece.position.copy(mesh.position);
            piece.scale.set(0.5, 0.5, 0.5);
            this.sceneManager.add(piece);
            this.physics.addPiece(piece, mesh.position, originalPiece.userData.breakVelocity);
          });
        }
      }
    });
  }

  triggerCrafting() {
    const slots = this.tableScene.getSlots();
    // 3 girdi yuvası bulunur; boş yuvalar null kabul edilir.
    const itemIds = slots.map(s => s.userData.currentItem || null);

    if (itemIds.every(id => id === null)) return;

    const resultId = this.crafting.checkRecipe(itemIds);

    if (resultId) {
      const oldMeshes = [];
      slots.forEach(s => {
        if (s.userData.mesh) {
          oldMeshes.push(s.userData.mesh);
          s.userData.isOccupied = false;
          s.userData.currentItem = null;
          s.userData.mesh = null;
        }
      });

      oldMeshes.forEach(mesh => {
        gsap.to(mesh.position, { x: 0, y: 0.8, z: 0, duration: 0.3 });
        gsap.to(mesh.scale, { x: 0, y: 0, z: 0, duration: 0.3, onComplete: () => {
          this.sceneManager.remove(mesh);
        }});
      });

      const gained = this.hintSystem.recordMatch();
      this.ui.updateHintRights(this.hintSystem.hintRights);
      if (gained) {
        console.log("3 başarılı eşleşme! +1 İpucu Hakkı kazanıldı.");
      }

      setTimeout(() => {
        const middleSlot = slots[1] || slots[0];

        if (middleSlot.userData.mesh) {
          this.sceneManager.remove(middleSlot.userData.mesh);
        }

        middleSlot.userData.isOccupied = true;
        middleSlot.userData.currentItem = resultId;

        const resultMesh = ItemFactory.createItemMesh(resultId);
        resultMesh.position.set(0, 0.8, 0);
        resultMesh.scale.set(0, 0, 0);
        this.sceneManager.add(resultMesh);

        middleSlot.userData.mesh = resultMesh;
        resultMesh.userData.slot = middleSlot;

        gsap.to(resultMesh.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.4, ease: 'back.out(1.7)' });
        gsap.to(resultMesh.position, {
          x: middleSlot.position.x,
          y: middleSlot.position.y + 0.3,
          z: middleSlot.position.z,
          duration: 0.4,
          ease: 'power2.out'
        });

        // Üretilen çıktı unlockedItems listesine eklenir
        const canonicalResult = getCanonicalId(resultId) || resultId;
        const isFirstDiscovery = !this.unlockedItems.includes(canonicalResult);
        if (isFirstDiscovery) {
          this.unlockedItems.push(canonicalResult);
          // Masanın önünde yeni keşif bildirimini göster
          this.ui.showDiscoveryAnnouncement(canonicalResult);
        }

        this.lockedItems = this.lockedItems.filter(id => id !== resultId && getCanonicalId(id) !== canonicalResult);

        // Arayüzü ve ipuçlarını güncelle
        this.ui._populateInventory(this.unlockedItems);
        this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
      }, 320);

    } else {
      slots.forEach(s => {
        if (s.userData.mesh) {
          gsap.to(s.userData.mesh.position, {
            x: s.position.x + (Math.random() - 0.5) * 0.3,
            y: 0.5,
            duration: 0.1,
            yoyo: true,
            repeat: 3
          });
        }
      });
    }
  }

  _startLoop() {
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      this.tableScene.update(delta);
      this.physics.step(this.sceneManager.scene);
      this.sceneManager.render();
    };

    animate();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.init().catch(err => {
    console.error("Game initialization failed:", err);
    alert("Oyun başlatılırken hata oluştu: " + err.message);
  });
});
