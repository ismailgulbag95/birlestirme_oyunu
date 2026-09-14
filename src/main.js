import * as THREE from 'three';
import gsap from 'gsap';
import { SceneManager } from './core/SceneManager.js';
import { TableScene } from './scenes/TableScene.js';
import { RapierWorld } from './physics/RapierWorld.js';
import { ItemFactory } from './items/ItemFactory.js';
import { ITEM_DEFINITIONS, getCanonicalId } from './items/itemDefinitions.js';
import { CraftingSystem } from './systems/CraftingSystem.js';
import { HintSystem } from './systems/HintSystem.js';
import { EnvironmentProgressionManager } from './systems/EnvironmentProgressionManager.js';
import { UIManager } from './ui/UIManager.js';
import { i18n } from './i18n/translations.js';
import { audioManager } from './core/AudioManager.js';

class Game {
  async init() {
    const canvas = document.getElementById('canvas');
    this.crafting = new CraftingSystem();
    this.hintSystem = new HintSystem();
    this.failedCraftAttempts = 0;

    const defaultUnlocked = ['ates', 'su', 'toprak', 'hava'];
    const defaultLocked = [
      'buhar', 'camur', 'lav', 'yagmur', 'enerji', 'ruzgar', 'tas',
      'kum', 'cam', 'bulut', 'yildirim', 'bitki', 'agac',
      'odun', 'kiymik', 'lif', 'obsidyen', 'ip', 'mantar',
      'pamuk', 'kumas', 'komur', 'kul', 'kagit', 'yasam', 'kus',
      'hayvan', 'balik', 'ilkel_bicak', 'kus_tuyu', 'deri',
      'kavrulmus_et', 'recine', 'comlek', 'su_comlegi', 'sise',
      'cakmaktasi', 'yay', 'ok', 'mesale', 'metal', 'demir_kulce',
      'metal_bicak', 'kazma', 'kilic', 'ahsap_kalkan', 'demir_kalkan',
      'deri_zirh', 'demir_zirh', 'yatak',
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
      'buz_runu', 'cehennem_tasi', 'zaman_kum_saati', 'illuzyon_aynasi',
      // Kategori 9 & 10 & Fauna
      'siber_kristal', 'hologram_kupu', 'buhar_jeneratoru', 'meka_zirhi', 'plazma_tufegi', 'felsefe_tasi', 'gunes_paneli', 'yercekimsiz_platform', 'biyonik_kol', 'usturlap', 'tesla_bobini', 'kuantum_islemci', 'minyatur_yildiz',
      'dag', 'kaya', 'gunes', 'okyanus', 'volkan', 'ada', 'nehir', 'orman', 'firtina_bulutu', 'magara', 'gokkusagi', 'kanyon', 'fay_hatti',
      'at', 'koyun', 'kurt', 'ari', 'yilan', 'baykus', 'kaplumbaga', 'bal', 'nilufer', 'elma', 'kurbaga', 'sincap', 'geyik', 'kelebek',
      // Yeni Basit Eşyalar
      'sis', 'gayzer', 'kaktus', 'cam_agaci', 'tavuk', 'kedi', 'mesale', 'somon', 'yay', 'barut_ficisi', 'su_degirmeni', 'buz_dagi', 'kalkan', 'iksir_kazani'
    ];
    this.defaultLockedItems = defaultLocked;

    // Kayıtlı oyunu yükle
    const savedData = this._loadSavedGame();
    this.unlockedItems = savedData.unlockedItems || defaultUnlocked;
    this.lockedItems = defaultLocked.filter(id => {
      const canonical = getCanonicalId(id) || id;
      return !this.unlockedItems.includes(id) && !this.unlockedItems.includes(canonical);
    });

    if (savedData.hintRights !== undefined) {
      this.hintSystem.hintRights = savedData.hintRights;
    }
    if (savedData.hintLevels) {
      this.hintSystem.hintLevels = savedData.hintLevels;
    }
    if (savedData.discoveryCount !== undefined) {
      this.hintSystem.discoveryCount = savedData.discoveryCount;
    } else if (savedData.successfulMatches !== undefined) {
      this.hintSystem.discoveryCount = savedData.successfulMatches;
    }
    if (savedData.successfulMatches !== undefined) {
      this.hintSystem.successfulMatches = savedData.successfulMatches;
    }

    const initialChar = savedData.activeCharacterId || 'character2'; // Oyun başlangıçta yeni karakter (Gözlemci) ile başlar

    this.sceneManager = new SceneManager(canvas);
    this.tableScene = new TableScene(this.sceneManager, initialChar);
    this.envProgression = new EnvironmentProgressionManager(this.sceneManager, this.tableScene.getRoomEnvironment());
    this.envProgression.syncWithUnlockedItems(this.unlockedItems);
    this.physics = new RapierWorld();
    await this.physics.init();

    const debugHandlers = {
      onUnlockAll: () => this.unlockAllItems(),
      onSetInfiniteHints: (enabled) => this.setInfiniteHints(enabled),
      onRevealAllHints: () => this.revealAllHints(),
      onResetProgress: () => this.resetProgress(),
      onSpawnBasics: () => this.spawnBasicElements(),
      onToggleFps: (enabled) => { this.fpsEnabled = enabled; }
    };

    this.ui = new UIManager(
      (itemId) => this.onInventoryItemSelect(itemId),
      (itemId) => this.onGetHint(itemId),
      (itemId) => this.onWatchAd(itemId),
      () => this.clearTableAndPieces(),
      (charId) => {
        this.tableScene.switchCharacter(charId);
        this._saveGame();
      },
      () => audioManager.cycleMusicMode(),
      debugHandlers
    );

    this.ui.updateCharacterButton(initialChar);
    this.ui._populateInventory(this.unlockedItems);
    this.ui.updateHintRights(this.hintSystem.hintRights);
    this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);

    this._setupRaycasting(canvas);
    this._startLoop();
  }

  _loadSavedGame() {
    try {
      const json = localStorage.getItem('alchemy_game_save');
      if (json) {
        const parsed = JSON.parse(json);
        console.log("Kayıtlı oyun başarıyla yüklendi:", parsed);
        return parsed;
      }
    } catch (e) {
      console.warn("Kayıt yüklenirken hata oluştu:", e);
    }
    return {};
  }

  _saveGame() {
    try {
      const saveData = {
        unlockedItems: this.unlockedItems,
        activeCharacterId: this.tableScene ? this.tableScene.activeCharacterId : 'character2',
        hintRights: this.hintSystem ? this.hintSystem.hintRights : 3,
        hintLevels: this.hintSystem ? this.hintSystem.hintLevels : {},
        discoveryCount: this.hintSystem ? this.hintSystem.discoveryCount : 0,
        successfulMatches: this.hintSystem ? this.hintSystem.successfulMatches : 0,
        savedAt: Date.now()
      };
      localStorage.setItem('alchemy_game_save', JSON.stringify(saveData));
      console.log("Oyun ilerlemesi kaydedildi.");
    } catch (e) {
      console.warn("Oyun kaydedilirken hata oluştu:", e);
    }
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
      this._saveGame();
    }
    return res;
  }

  onWatchAd(itemId) {
    this.hintSystem.watchAdForHint(itemId);
    this.ui.updateHintRights(this.hintSystem.hintRights);
    this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
    this._saveGame();
    alert(i18n.t('ad_watched_alert'));
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

      // Check if clicked character (behind table or direct hit)
      const isCharHit = this.tableScene.isCharacterHit(obj) || (hit.point && hit.point.z < -1.0);
      if (isCharHit) {
        this.tableScene.playTalkingAnimation();
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
      this.failedCraftAttempts = 0;
      this.tableScene.playSuccessAnimation();
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
          // Odaya süzülme animasyonu
          if (this.envProgression) {
            this.envProgression.flyItemToShelf(canonicalResult, new THREE.Vector3(0, 1.2, 0));
          }
          // Masanın önünde yeni keşif bildirimini göster
          this.ui.showDiscoveryAnnouncement(canonicalResult);

          // Her 3 yeni keşifte 1 ipucu hakkı verilir
          const gained = this.hintSystem.recordDiscovery();
          this.ui.updateHintRights(this.hintSystem.hintRights);
          if (gained) {
            console.log("3 yeni keşif tamamlandı! +1 İpucu Hakkı kazanıldı.");
          }
        }

        this.lockedItems = this.lockedItems.filter(id => id !== resultId && getCanonicalId(id) !== canonicalResult);

        // Arayüzü ve ipuçlarını güncelle
        this.ui._populateInventory(this.unlockedItems);
        this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);

        // İlerleme veya ipucu hakkı değiştiğinde kaydet
        this._saveGame();
      }, 320);

    } else {
      this.failedCraftAttempts++;
      console.log(`Başarısız üretim denemesi: ${this.failedCraftAttempts}/20`);

      if (this.failedCraftAttempts >= 20) {
        console.log("20 kez başarısız üretim yapıldı! Karakter ölüm animasyonu tetikleniyor.");
        this.tableScene.playDeathAnimation();
        this.failedCraftAttempts = 0; // Animasyon oynatıldıktan sonra sayacı sıfırla
      } else {
        this.tableScene.playFailAnimation();
      }

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

  clearTableAndPieces() {
    this.physics.clearPieces(this.sceneManager.scene);
    const slots = this.tableScene.getSlots();
    slots.forEach(s => {
      if (s.userData.mesh) {
        this.sceneManager.remove(s.userData.mesh);
        s.userData.mesh = null;
      }
      s.userData.isOccupied = false;
      s.userData.currentItem = null;
    });
  }

  unlockAllItems() {
    const allDefs = Object.keys(ITEM_DEFINITIONS);
    allDefs.forEach(id => {
      const can = getCanonicalId(id) || id;
      if (!this.unlockedItems.includes(id) && !this.unlockedItems.includes(can)) {
        this.unlockedItems.push(can);
      }
    });
    this.lockedItems = [];
    this.ui._populateInventory(this.unlockedItems);
    this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
    if (this.envProgression) {
      this.envProgression.syncWithUnlockedItems(this.unlockedItems);
    }
    this._saveGame();
  }

  setInfiniteHints(enabled) {
    this.hintSystem.setInfiniteHints(enabled);
    this.ui.updateHintRights(this.hintSystem.hintRights);
    this._saveGame();
  }

  revealAllHints() {
    this.hintSystem.revealAllHints(this.lockedItems);
    this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
    this._saveGame();
  }

  spawnBasicElements() {
    this.clearTableAndPieces();
    const basics = ['ates', 'su', 'toprak'];
    basics.forEach(id => {
      this.onInventoryItemSelect(id);
    });
  }

  resetProgress() {
    localStorage.removeItem('alchemy_game_save');
    this.unlockedItems = ['ates', 'su', 'toprak', 'hava'];
    this.lockedItems = (this.defaultLockedItems || []).filter(id => {
      const canonical = getCanonicalId(id) || id;
      return !this.unlockedItems.includes(id) && !this.unlockedItems.includes(canonical);
    });
    this.hintSystem.hintRights = 3;
    this.hintSystem.hintLevels = {};
    this.hintSystem.discoveryCount = 0;
    this.hintSystem.successfulMatches = 0;
    this.hintSystem.setInfiniteHints(false);
    this.clearTableAndPieces();
    this.ui.updateHintRights(this.hintSystem.hintRights);
    this.ui._populateInventory(this.unlockedItems);
    this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
    if (this.envProgression) {
      this.envProgression.syncWithUnlockedItems(this.unlockedItems);
    }
    this._saveGame();
  }

  _startLoop() {
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    let currentFps = 60;

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // FPS & Performans takibi
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate >= 500) {
        currentFps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
        frameCount = 0;
        lastFpsUpdate = now;
        const sceneObjs = this.sceneManager.scene ? this.sceneManager.scene.children.length : 0;
        this.ui.updateFpsHud(currentFps, sceneObjs);
      }

      // Masadaki slotlarda bulunan animasyonlu eşyaları güncelle (örneğin dans eden ateş ve dönme)
      const slots = this.tableScene.getSlots();
      slots.forEach(slot => {
        const mesh = slot.userData?.mesh;
        if (mesh) {
          if (typeof mesh.userData?.update === 'function') {
            mesh.userData.update(elapsedTime, delta);
          } else if (mesh.children && mesh.children[0] && typeof mesh.children[0].userData?.update === 'function') {
            mesh.children[0].userData.update(elapsedTime, delta);
          }
        }
      });

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
