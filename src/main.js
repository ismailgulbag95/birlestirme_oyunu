import * as THREE from 'three';
import gsap from 'gsap';
import { SceneManager } from './core/SceneManager.js';
import { TableScene } from './scenes/TableScene.js';
import { RapierWorld } from './physics/RapierWorld.js';
import { ItemFactory } from './items/ItemFactory.js';
import { 
  ITEM_DEFINITIONS, 
  getItemDefinitionsForMode, 
  getCanonicalId 
} from './items/itemDefinitions.js';
import { CraftingSystem } from './systems/CraftingSystem.js';
import { HintSystem } from './systems/HintSystem.js';
import { EnvironmentProgressionManager } from './systems/EnvironmentProgressionManager.js';
import { UIManager } from './ui/UIManager.js';
import { i18n } from './i18n/translations.js';
import { audioManager } from './core/AudioManager.js';
import { FreeTierManager } from './systems/FreeTierManager.js';
import { subscriptionManager } from './systems/SubscriptionManager.js';
import { achievementManager } from './systems/AchievementManager.js';
import { adManager } from './systems/AdManager.js';

class Game {
  async init() {
    const canvas = document.getElementById('canvas');
    this.failedCraftAttempts = 0;

    const defaultUnlocked = ['ates', 'su', 'toprak', 'hava'];

    // Kayıtlı oyunu yükle
    const savedData = this._loadSavedGame();
    this.gameMode = savedData.gameMode || 'classic'; // 'classic' (92 eşya) veya 'grandmaster' (666 eşya)
    this.crafting = new CraftingSystem(this.gameMode);
    this.hintSystem = new HintSystem(this.gameMode);

    const modeDefs = getItemDefinitionsForMode(this.gameMode);
    const allDefKeys = Object.keys(modeDefs);

    const defaultLocked = allDefKeys.filter(id => {
      const canonical = getCanonicalId(id) || id;
      return !defaultUnlocked.includes(id) && !defaultUnlocked.includes(canonical);
    });
    this.defaultLockedItems = defaultLocked;

    this.unlockedItems = (savedData.unlockedItems || defaultUnlocked).filter(id => {
      const canonical = getCanonicalId(id) || id;
      return allDefKeys.includes(id) || allDefKeys.includes(canonical);
    });
    if (this.unlockedItems.length === 0) {
      this.unlockedItems = [...defaultUnlocked];
    }

    this.lockedItems = allDefKeys.filter(id => {
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

    // Karakter kilidi ve başlangıç karakteri:
    // character1: daima açık (0 eşya)
    // character2 (Gözlemci): 40 eşyada açılır
    // character3 (Gezgin): Sadece Grandmaster aboneliğinde açılır
    const savedChar = savedData.activeCharacterId || 'character1';
    let initialChar = 'character1';
    const isGm = subscriptionManager.isGrandmaster() || this.gameMode === 'grandmaster';
    if (savedChar === 'character3' && isGm) {
      initialChar = 'character3';
    } else if (savedChar === 'character2' && this.unlockedItems.length >= 40) {
      initialChar = 'character2';
    } else {
      initialChar = 'character1';
    }

    this.sceneManager = new SceneManager(canvas);
    this.tableScene = new TableScene(this.sceneManager, initialChar);
    this.tableScene.setMode(this.gameMode, false);
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
        if (charId === 'character3' && !subscriptionManager.isGrandmaster() && this.gameMode !== 'grandmaster') {
          this.ui.showToast(i18n.t('char_wanderer_gm_locked'), 'warn');
          this.ui.showGrandmasterOfferModal('character_unlock');
          return;
        }
        this.tableScene.switchCharacter(charId);
        this._saveGame();
      },
      () => audioManager.cycleMusicMode(),
      debugHandlers,
      () => {
        this.tableScene.playTalkingAnimation();
        this.triggerCrafting();
      },
      (newMode) => this.switchGameMode(newMode)
    );

    const removeLoadingScreen = () => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.remove();
          }
        }, 400);
      }
    };

    try {
      this.ui.setGameMode(this.gameMode);
      this.ui.setUnlockedItemCount(this.unlockedItems.length);
      this.ui.updateCharacterButton(initialChar);
      this.ui._populateInventory(this.unlockedItems);
      this.ui.updateHintRights(this.hintSystem.hintRights);
      this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);

      const loadingTitle = document.getElementById('loading-title-text');
      const loadingSubtitle = document.getElementById('loading-subtitle-text');
      if (loadingTitle) loadingTitle.textContent = i18n.t('loading_title');
      if (loadingSubtitle) loadingSubtitle.textContent = i18n.t('loading_subtitle');

      this._setupRaycasting(canvas);
      this._startLoop();

      // 3D Masa ve Karakter modeli yüklenene kadar bekle (maksimum 1.5sn timeout)
      await Promise.race([
        this.tableScene.whenReady(),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
    } catch (err) {
      console.warn("Init aşamasında hata yakalandı, oyun yine de başlatılıyor:", err);
    } finally {
      // Her koşulda kum saati yükleme ekranını kaldır
      removeLoadingScreen();
    }

    // Hoşgeldiniz Ekranı (İlk Girişte)
    try {
      const welcomeSeen = localStorage.getItem('alchemy_welcome_seen');
      if (!welcomeSeen) {
        setTimeout(() => {
          this.ui.showWelcomeModal();
        }, 300);
      }
    } catch (e) {
      console.warn("Welcome modal uyarısı:", e);
    }
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
        gameMode: this.gameMode || 'classic',
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

  switchGameMode(newMode) {
    if (this.gameMode === newMode) return;
    this.gameMode = newMode;
    this._saveGame();
    setTimeout(() => {
      window.location.reload();
    }, 150);
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
    if (!emptySlot) {
      const maxCount = this.gameMode === 'classic' ? 2 : 3;
      const msgKey = this.gameMode === 'classic' ? 'table_full_classic' : 'table_full_grandmaster';
      this.ui.showToast(i18n.t(msgKey) || (i18n.currentLang === 'tr' ? `Masa dolu! (En fazla ${maxCount} eşya)` : `Table is full! (Max ${maxCount} items)`), 'warn');
      return;
    }


    emptySlot.userData.isOccupied = true;
    emptySlot.userData.currentItem = itemId;

    const itemMesh = ItemFactory.createItemMesh(itemId);
    itemMesh.position.set(emptySlot.position.x, 3.0, emptySlot.position.z);
    itemMesh.scale.set(0, 0, 0);
    this.sceneManager.add(itemMesh);

    emptySlot.userData.mesh = itemMesh;
    itemMesh.userData.slot = emptySlot; // Doğrudan slot bağlantısı

    // GSAP Drop & Bounce animation onto slot (Zarif süzülme ve büyüme)
    gsap.to(itemMesh.position, {
      y: emptySlot.position.y + 0.42,
      duration: 0.55,
      ease: 'back.out(1.4)'
    });
    gsap.to(itemMesh.scale, {
      x: 0.8, y: 0.8, z: 0.8,
      duration: 0.45,
      ease: 'back.out(1.7)'
    });

    this._updateCraftButtonState();
  }

  _updateCraftButtonState() {
    if (!this.tableScene || !this.ui) return;
    const slots = this.tableScene.getSlots();
    const count = slots.filter(s => s.userData && s.userData.isOccupied).length;
    this.ui.updateCraftButton(count);
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

  async onWatchAd(itemId) {
    const isGm = subscriptionManager.isGrandmaster();
    const mult = isGm ? 3 : 1;
    const adRes = await adManager.showRewardedAd({ rewardType: 'hint', itemId, multiplier: mult });
    if (adRes.success) {
      this.hintSystem.watchAdForHint(itemId, mult);
      this.ui.updateHintRights(this.hintSystem.hintRights);
      this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
      this._saveGame();
      const msg = isGm ? i18n.t('ad_reward_subscriber') : i18n.t('ad_watched_alert');
      this.ui.showToast(msg, 'success');
    }
  }

  _setupRaycasting(canvas) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    canvas.addEventListener('pointerdown', (e) => {
      // Yalnızca sol fare tuşu veya dokunmatik olay
      if (e.button !== undefined && e.button !== 0) return;

      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.sceneManager.camera);
      const intersects = raycaster.intersectObjects(this.sceneManager.scene.children, true);

      if (intersects.length === 0) return;

      const firstHit = intersects[0];

      // 1. Aşama: Kullanıcının parmağının / faresinin DOĞRUDAN bastığı nesne masadaki bir eşya mı?
      let targetSlot = null;
      let curr = firstHit.object;
      while (curr && curr !== this.sceneManager.scene) {
        if (curr.userData) {
          if (curr.userData.slot) {
            targetSlot = curr.userData.slot;
            break;
          } else if (curr.userData.slotIndex !== undefined && curr.userData.isOccupied) {
            targetSlot = curr;
            break;
          }
        }
        curr = curr.parent;
      }

      // Sadece ve sadece kullanıcı doğrudan masadaki dolu bir eşyaya bastıysa fırlatıp kır
      if (targetSlot && targetSlot.userData && targetSlot.userData.isOccupied && targetSlot.userData.mesh) {
        this.throwAndBreakItem(targetSlot);
        return;
      }

      // 2. Aşama: Masadaki eşyaya doğrudan basılmadıysa; sahneye, karaktere veya masaya yapılan her dokunuş BİRLEŞTİRME (CRAFT) eylemidir!
      console.log("Karakter/Masa etkileşimi algılandı! Craft tetikleniyor...");
      try {
        this.tableScene.playTalkingAnimation();
      } catch (err) {
        console.warn("Karakter konuşma animasyonu hatası:", err);
      }
      this.triggerCrafting();
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
        this._updateCraftButtonState();
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
    this._updateCraftButtonState();
  }

  triggerCrafting() {
    const slots = this.tableScene.getSlots();
    // 3 girdi yuvası bulunur; boş yuvalar null kabul edilir.
    const itemIds = slots.map(s => s.userData.currentItem || null);

    if (itemIds.every(id => id === null)) {
      this.ui.showToast(i18n.t('craft_no_items'), 'warn');
      return;
    }

    const resultId = this.crafting.checkRecipe(itemIds);

    if (resultId) {
      this.failedCraftAttempts = 0;
      this.ui.showToast(i18n.t('craft_success'), 'success');
      try {
        this.tableScene.playSuccessAnimation();
      } catch (err) {
        console.warn("Karakter başarı animasyonu hatası:", err);
      }
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
        gsap.to(mesh.scale, {
          x: 0, y: 0, z: 0, duration: 0.3, onComplete: () => {
            this.sceneManager.remove(mesh);
          }
        });
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

        gsap.to(resultMesh.scale, { x: 0.85, y: 0.85, z: 0.85, duration: 0.45, ease: 'back.out(1.7)' });
        gsap.to(resultMesh.position, {
          x: middleSlot.position.x,
          y: middleSlot.position.y + 0.45,
          z: middleSlot.position.z,
          duration: 0.45,
          ease: 'power2.out'
        });

        // Üretilen çıktı unlockedItems listesine eklenir
        const canonicalResult = getCanonicalId(resultId) || resultId;
        const isFirstDiscovery = !this.unlockedItems.includes(canonicalResult);
        if (isFirstDiscovery) {
          const prevDiscoveryCount = this.unlockedItems.length;
          this.unlockedItems.push(canonicalResult);
          const newDiscoveryCount = this.unlockedItems.length;
          this.ui.setUnlockedItemCount(newDiscoveryCount);

          // Odaya süzülme animasyonu
          if (this.envProgression) {
            this.envProgression.flyItemToShelf(canonicalResult, new THREE.Vector3(0, 1.2, 0));
          }
          // Masanın önünde yeni keşif bildirimini göster
          this.ui.showDiscoveryAnnouncement(canonicalResult);

          // Başarımları ve Milestone'ları kontrol et
          achievementManager.checkMilestones(newDiscoveryCount);

          // 40 eşyaya ulaşıldığında Gözlemci karakter kilidi açılma kutlaması
          if (prevDiscoveryCount < 40 && newDiscoveryCount >= 40) {
            setTimeout(() => {
              this.ui.showCharacterUnlockCelebration('character2');
            }, 1200);
          }

          // Klasik modda 80 eşya tamamlandığında Grand Finale / Grandmaster Davet Ekranı
          const isGm = subscriptionManager.isGrandmaster() || this.gameMode === 'grandmaster';
          const prog = FreeTierManager.getProgression(this.unlockedItems, isGm);
          if (!isGm && prog.isComplete) {
            setTimeout(() => {
              achievementManager.unlockBadge('badge_80');
              this.ui.showGrandmasterOfferModal('classic_complete');
            }, 1800);
          }

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
        this._updateCraftButtonState();
      }, 320);

    } else {
      this.failedCraftAttempts++;
      this.ui.showToast(i18n.t('craft_no_recipe'), 'warn');
      console.log(`Başarısız üretim denemesi: ${this.failedCraftAttempts}/20`);

      try {
        if (this.failedCraftAttempts >= 20) {
          console.log("20 kez başarısız üretim yapıldı! Karakter ölüm animasyonu tetikleniyor.");
          this.tableScene.playDeathAnimation();
          this.failedCraftAttempts = 0; // Animasyon oynatıldıktan sonra sayacı sıfırla
        } else {
          this.tableScene.playFailAnimation();
        }
      } catch (err) {
        console.warn("Karakter başarısızlık animasyonu hatası:", err);
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
    this._updateCraftButtonState();
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
    this.ui.setUnlockedItemCount(this.unlockedItems.length);
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
    this.ui.setUnlockedItemCount(this.unlockedItems.length);
    this.tableScene.switchCharacter('character1');
    this.ui.updateCharacterButton('character1');
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
