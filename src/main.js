import * as THREE from 'three';
import gsap from 'gsap';
import { SceneManager } from './core/SceneManager.js';
import { TableScene } from './scenes/TableScene.js';
import { ItemFactory } from './items/ItemFactory.js';
import { 
  ITEM_DEFINITIONS, 
  getItemDefinitionsForMode, 
  getCanonicalId 
} from './items/itemDefinitions.js';
import { CraftingSystem } from './systems/CraftingSystem.js';
import { HintSystem } from './systems/HintSystem.js';
import { EnvironmentProgressionManager, SHELF_ITEMS } from './systems/EnvironmentProgressionManager.js';
import { UIManager } from './ui/UIManager.js';
import { i18n } from './i18n/translations.js';
import { audioManager } from './core/AudioManager.js';
import { FreeTierManager } from './systems/FreeTierManager.js';
import { achievementManager } from './systems/AchievementManager.js';
import { adManager } from './systems/AdManager.js';
import { TrioFormulaQuotaManager } from './systems/TrioFormulaQuotaManager.js';

class Game {
  async init() {
    const canvas = document.getElementById('canvas');
    this.failedCraftAttempts = 0;
    this.craftingInProgress = false;
    this.trioFormulaAdPending = false;

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
      const defaultUnlocked = ['ates', 'su', 'toprak', 'hava'];

      // Kayıtlı oyunu yükle
      const savedData = this._loadSavedGame();
      this.gameMode = savedData.gameMode || 'classic'; // classic: 2-item, grandmaster: 2-item and 3-item recipes
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

      const legacyFormulaKeys = [];
      if (!Array.isArray(savedData.trioDiscoveredFormulaKeys)) {
        const unlockedCanonicals = new Set(this.unlockedItems.map(id => getCanonicalId(id) || id));
        Object.entries(getItemDefinitionsForMode('grandmaster')).forEach(([id, def]) => {
          const outputId = getCanonicalId(def.id || id) || def.id || id;
          if (!unlockedCanonicals.has(outputId) || !Array.isArray(def.trioRecipes)) return;
          def.trioRecipes.forEach(inputs => {
            if (Array.isArray(inputs) && inputs.length === 3) {
              legacyFormulaKeys.push(CraftingSystem.getFormulaKey(inputs));
            }
          });
        });
      }
      this.trioFormulaQuota = new TrioFormulaQuotaManager(savedData, legacyFormulaKeys);

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
      if (savedData.lastWheelSpinDate) {
        this.hintSystem.lastWheelSpinDate = savedData.lastWheelSpinDate;
      }
      if (savedData.lastFreeHintDate) {
        this.hintSystem.lastFreeHintDate = savedData.lastFreeHintDate;
      }

      // Karakter kilidi ve başlangıç karakteri:
      const savedChar = savedData.activeCharacterId || 'character1';
      let initialChar = 'character1';
      const isGm = this.gameMode === 'grandmaster';
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
      
      try {
        this.envProgression = new EnvironmentProgressionManager(this.sceneManager, this.tableScene.getRoomEnvironment());
        this.envProgression.syncWithUnlockedItems(this.unlockedItems);
      } catch (e) {
        console.warn("EnvironmentProgression uyarısı:", e);
      }

      this.physics = null;
      // Rapier/WASM yüklemesi sahne ve arayüz hazırlığıyla paralel ilerlesin.
      this._initPhysicsInBackground();

      this.ui = new UIManager(
        (itemId) => this.onInventoryItemSelect(itemId),
        (itemId) => this.onGetHint(itemId),
        (itemId) => this.onWatchAd(itemId),
        () => this.clearTableAndPieces(),
        (charId) => {
          if (charId === 'character3' && this.gameMode !== 'grandmaster') {
            this.ui.showToast(i18n.t('char_wanderer_three_mode'), 'warn');
            return;
          }
          this.tableScene.switchCharacter(charId);
          this._saveGame();
        },
        () => audioManager.cycleMusicMode(),
        () => {
          this.tableScene.playTalkingAnimation();
          this.triggerCrafting();
        },
        (newMode) => this.switchGameMode(newMode),
        (volume, persist) => audioManager.setVolume(volume, persist),
        audioManager.volume
      );

      this.ui.setGameMode(this.gameMode);
      this.ui.onUnlockTrioFormulas = () => this.unlockTrioFormulaBatch();
      this.ui.updateTrioFormulaQuota(this.trioFormulaQuota.getStatus());
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

      // Yükleme ekranını, masa ve etkin karakter hazır olup en az bir kare çizilene kadar tut.
      await this.tableScene.whenReady();
      await new Promise(resolve => requestAnimationFrame(resolve));
      removeLoadingScreen();
    } catch (err) {
      console.error("Oyun başlatılamadı; yükleme ekranı açık tutuluyor:", err);
      const loadingSubtitle = document.getElementById('loading-subtitle-text');
      if (loadingSubtitle) {
        loadingSubtitle.textContent = i18n.currentLang === 'tr'
          ? 'Yükleme tamamlanamadı. Tekrar denemek için sayfayı yenileyin.'
          : 'Loading failed. Reload the page to try again.';
      }
      return;
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

  async _initPhysicsInBackground() {
    try {
      const { RapierWorld } = await import('./physics/RapierWorld.js');
      const physics = new RapierWorld();
      await physics.init();
      this.physics = physics;
    } catch (e) {
      console.warn("Fizik dünyası başlatma uyarısı:", e);
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
        lastWheelSpinDate: this.hintSystem ? this.hintSystem.lastWheelSpinDate : null,
        lastFreeHintDate: this.hintSystem ? this.hintSystem.lastFreeHintDate : null,
        trioDiscoveredFormulaKeys: this.trioFormulaQuota ? [...this.trioFormulaQuota.discoveredFormulaKeys] : [],
        trioRewardedFormulaSlots: this.trioFormulaQuota ? this.trioFormulaQuota.rewardedFormulaSlots : 0,
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
    if (newMode === 'grandmaster') achievementManager.unlockBadge('badge_grandmaster_unlocked');
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

    const itemMesh = ItemFactory.createItemMesh(itemId, this.gameMode);
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
    const adRes = await adManager.showRewardedAd({ rewardType: 'hint', itemId, multiplier: 1 });
    if (adRes.success) {
      this.hintSystem.watchAdForHint(itemId, 1);
      this.ui.updateHintRights(this.hintSystem.hintRights);
      this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);
      this._saveGame();
      this.ui.showToast(i18n.t('ad_watched_alert'), 'success');
    } else {
      this.ui.showToast(i18n.t(adRes.error === 'unavailable' ? 'ad_unavailable' : 'ad_not_completed'), 'warn');
    }
  }

  async unlockTrioFormulaBatch() {
    if (this.trioFormulaAdPending) return;
    this.trioFormulaAdPending = true;

    try {
      const result = await adManager.showRewardedAd({ rewardType: 'trio_formula_batch' });
      if (!result.success) {
        this.ui.showToast(i18n.t(result.error === 'unavailable' ? 'trio_gate_ad_unavailable' : 'trio_gate_ad_failed'), 'warn');
        return;
      }

      this.trioFormulaQuota.grantRewardedBatch();
      this.ui.closeTrioFormulaGate();
      this.ui.updateTrioFormulaQuota(this.trioFormulaQuota.getStatus());
      this._saveGame();
      this.trioFormulaAdPending = false;
      this.triggerCrafting();
    } finally {
      this.trioFormulaAdPending = false;
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

      // 1. Aşama: Raflardaki 12 Rozet / Koleksiyon 3D sembollerinden birine mi tıklandı?
      let badgeOrCol = null;
      let curr = firstHit.object;
      while (curr && curr !== this.sceneManager.scene) {
        if (curr.userData && (curr.userData.isBadgeOrCollection || curr.userData.id)) {
          const itemId = curr.userData.id;
          const shelfItem = SHELF_ITEMS.find(s => s.id === itemId || (curr.userData.slotIndex !== undefined && s.slotIndex === curr.userData.slotIndex));
          if (shelfItem) {
            badgeOrCol = shelfItem;
            break;
          }
        }
        curr = curr.parent;
      }

      if (badgeOrCol) {
        console.log(`Raflardaki 3D sembole tıklandı: ${badgeOrCol.id} (${badgeOrCol.type})`);
        try {
          audioManager.playClick();
        } catch (e) {}
        this.ui.openAchievementsSubtab(badgeOrCol.type, badgeOrCol.id);
        return;
      }

      // 2. Aşama: Kullanıcının parmağının / faresinin DOĞRUDAN bastığı nesne masadaki bir eşya mı?
      let targetSlot = null;
      curr = firstHit.object;
      while (curr && curr !== this.sceneManager.scene) {
        if (curr.userData) {
          if (curr.userData.slot) {
            targetSlot = curr.userData.slot;
            break;
          } else if (curr.userData.slotIndex !== undefined && curr.userData.isOccupied && curr.userData.mesh) {
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

      // 3. Aşama: Masadaki eşyaya veya rafa basılmadıysa; sahneye, karaktere veya masaya yapılan her dokunuş BİRLEŞTİRME (CRAFT) eylemidir!
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

    const currentItemId = slot.userData.currentItem;

    slot.userData.isOccupied = false;
    slot.userData.currentItem = null;
    slot.userData.mesh = null;
    mesh.userData.slot = null;

    if (!mesh.userData.fracturePieces) {
      const canonicalId = getCanonicalId(currentItemId) || currentItemId;
      const def = mesh.userData.definition || ITEM_DEFINITIONS[canonicalId] || ITEM_DEFINITIONS[currentItemId] || ITEM_DEFINITIONS.ates;
      mesh.userData.fracturePieces = ItemFactory._generateFracturePieces(def);
    }

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
      this.physics?.addPiece(piece, mesh.position, originalPiece.userData.breakVelocity);
          });
        }
      }
    });
    this._updateCraftButtonState();
  }

  triggerCrafting() {
    if (this.craftingInProgress || this.trioFormulaAdPending) return;
    const slots = this.tableScene.getSlots();
    // 3 girdi yuvası bulunur; boş yuvalar null kabul edilir.
    const itemIds = slots.map(s => s.userData.currentItem || null);

    if (itemIds.every(id => id === null)) {
      this.ui.showToast(i18n.t('craft_no_items'), 'warn');
      return;
    }

    const recipe = this.crafting.getRecipeDetails(itemIds);
    const resultId = recipe?.resultId;

    if (resultId && this.gameMode === 'grandmaster' && recipe.inputCount === 3 && adManager.isAdConfigured() &&
      !this.trioFormulaQuota.canDiscover(recipe.formulaKey)) {
      this.ui.showTrioFormulaGate(this.trioFormulaQuota.getStatus());
      return;
    }

    if (resultId) {
      this.craftingInProgress = true;
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

        const resultMesh = ItemFactory.createItemMesh(resultId, this.gameMode);
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

          // Başarımları ve Milestone'ları kontrol et
          achievementManager.checkMilestones(newDiscoveryCount);

          // Odaya süzülme animasyonu ve rafları güncelleme
          if (this.envProgression) {
            this.envProgression.flyItemToShelf(canonicalResult, new THREE.Vector3(0, 1.2, 0));
          }

          // 40 eşyaya ulaşıldığında Gözlemci karakter kilidi açılma kutlaması
          if (prevDiscoveryCount < 40 && newDiscoveryCount >= 40) {
            setTimeout(() => {
              this.ui.showCharacterUnlockCelebration('character2');
            }, 1200);
          }

          // Klasik modun koleksiyonu tamamlandığında başarı rozetini aç
          const isGm = this.gameMode === 'grandmaster';
          const prog = FreeTierManager.getProgression(this.unlockedItems, isGm);
          if (!isGm && prog.isComplete) {
            setTimeout(() => {
              achievementManager.unlockBadge('badge_80');
            }, 1800);
          }

          // Her 3 yeni keşifte 1 ipucu hakkı verilir
          const gained = this.hintSystem.recordDiscovery();
          this.ui.updateHintRights(this.hintSystem.hintRights);
          if (gained) {
            console.log("3 yeni keşif tamamlandı! +1 İpucu Hakkı kazanıldı.");
          }
        }

        if (this.gameMode === 'grandmaster' && recipe.inputCount === 3) {
          this.trioFormulaQuota.recordDiscovery(recipe.formulaKey);
          this.ui.updateTrioFormulaQuota(this.trioFormulaQuota.getStatus());
        }

        this.lockedItems = this.lockedItems.filter(id => id !== resultId && getCanonicalId(id) !== canonicalResult);

        // Arayüzü ve ipuçlarını güncelle
        this.ui._populateInventory(this.unlockedItems);
        this.ui.populateHints(this.unlockedItems, this.lockedItems, this.hintSystem);

        // İlerleme veya ipucu hakkı değiştiğinde kaydet
        this._saveGame();
        this._updateCraftButtonState();
        this.craftingInProgress = false;
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
    this.physics?.clearPieces(this.sceneManager.scene);
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

  _startLoop() {
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

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
      if (this.envProgression) {
        this.envProgression.update(delta);
      }
      this.physics?.step(this.sceneManager.scene);
      this.sceneManager.render();
    };

    animate();
  }
}

function startGame() {
  const game = new Game();
  game.init().catch(err => {
    console.error("Game initialization failed:", err);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startGame);
} else {
  startGame();
}

