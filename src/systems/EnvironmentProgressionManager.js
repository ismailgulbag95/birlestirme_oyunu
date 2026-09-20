import * as THREE from 'three';
import gsap from 'gsap';
import { BadgeFactory } from '../items/BadgeFactory.js';
import { achievementManager } from './AchievementManager.js';

/**
 * SHELF_ITEMS: Raflardaki 12 Yuvanın Sabit Rozet & Koleksiyon Eşleşmesi
 * Sol Raf (Yuva 0..5): 6 Tematik Koleksiyon
 * Sağ Raf (Yuva 6..11): 6 Simya Rozeti
 */
export const SHELF_ITEMS = [
  // Sol Raf (Yuvalar 0..5) - Koleksiyonlar
  { id: 'col_elements', type: 'collection', slotIndex: 0, titleTr: 'Dört Temel Unsur' },
  { id: 'col_nature', type: 'collection', slotIndex: 1, titleTr: 'Doğa & Botanik' },
  { id: 'col_minerals', type: 'collection', slotIndex: 2, titleTr: 'Maden & Jeoloji' },
  { id: 'col_craft', type: 'collection', slotIndex: 3, titleTr: 'Zanaat & Araçlar' },
  { id: 'col_life', type: 'collection', slotIndex: 4, titleTr: 'Canlılar Âlemi' },
  { id: 'col_mystic', type: 'collection', slotIndex: 5, titleTr: 'Mistik & Gökyüzü' },

  // Sağ Raf (Yuvalar 6..11) - Rozetler
  { id: 'badge_10', type: 'badge', slotIndex: 6, titleTr: 'İlk Kıvılcım' },
  { id: 'badge_30', type: 'badge', slotIndex: 7, titleTr: 'Zanaatkar Simyacı' },
  { id: 'badge_40', type: 'badge', slotIndex: 8, titleTr: 'Gözlemci Uyanışı' },
  { id: 'badge_70', type: 'badge', slotIndex: 9, titleTr: 'Usta Adayı' },
  { id: 'badge_80', type: 'badge', slotIndex: 10, titleTr: 'Klasik Simya Ustası' },
  { id: 'badge_grandmaster_unlocked', type: 'badge', slotIndex: 11, titleTr: 'Büyük Simyacı' }
];

/**
 * EnvironmentProgressionManager
 * Arkadaki 12 shelf slotunu 12 rozet ve koleksiyon ile yönetir.
 * Başlangıçta hepsi karartı (silhouette) halindedir.
 * Tamamlanan rozet veya koleksiyon olduğunda canlı 3D modeli belirir ve sürekli döner.
 */
export class EnvironmentProgressionManager {
  constructor(sceneManager, roomEnvironment) {
    this.sceneManager = sceneManager;
    this.room = roomEnvironment;
    this.trophyMeshes = [];
    this.shelfStates = new Map(); // slotIndex -> { isUnlocked: boolean, id: string }
  }

  /**
   * Oyuncunun keşfettiği eşyalara ve rozetlere göre 12 shelf yuvasını senkronize eder.
   * @param {string[]} unlockedItems
   */
  syncWithUnlockedItems(unlockedItems = []) {
    this.clearTrophies();

    const sockets = this.room.getSockets();
    if (!sockets || sockets.length === 0) return;

    // Koleksiyon durumlarını al
    const collectionsProgress = achievementManager.getCollectionsProgress(unlockedItems);
    const unlockedBadgeIds = achievementManager.unlockedBadgeIds;

    SHELF_ITEMS.forEach(item => {
      const socket = sockets[item.slotIndex];
      if (!socket) return;

      let isUnlocked = false;
      if (item.type === 'collection') {
        const col = collectionsProgress.find(c => c.id === item.id);
        isUnlocked = col ? col.isComplete : false;
      } else if (item.type === 'badge') {
        isUnlocked = unlockedBadgeIds.has(item.id);
      }

      this.shelfStates.set(item.slotIndex, { id: item.id, isUnlocked });

      try {
        const badgeMesh = BadgeFactory.createBadgeMesh(item.id, isUnlocked);
        badgeMesh.scale.set(0.85, 0.85, 0.85);
        badgeMesh.position.copy(socket.position);
        
        // Açık olanlar için ilk açı, kapalı olanlar sabit dursun
        badgeMesh.rotation.y = isUnlocked ? Math.PI * 0.15 : 0;

        badgeMesh.userData = {
          id: item.id,
          slotIndex: item.slotIndex,
          isUnlocked: isUnlocked,
          isBadgeOrCollection: true
        };

        this.sceneManager.add(badgeMesh);
        this.trophyMeshes.push(badgeMesh);

        socket.isOccupied = true;
        socket.itemId = item.id;
        socket.trophyMesh = badgeMesh;
      } catch (err) {
        console.warn(`Rozet/Koleksiyon 3D modeli oluşturulamadı: ${item.id}`, err);
      }
    });

    this._updatePhase(unlockedItems.length);
  }

  /**
   * Üretim tamamlandığında masadan ilgili rozet/koleksiyon yuvasına mikro süzülme ve kilit açma efekti
   * @param {string} canonicalResult
   * @param {THREE.Vector3} startPosition
   */
  flyItemToShelf(canonicalResult, startPosition = new THREE.Vector3(0, 1.2, 0)) {
    const sockets = this.room.getSockets();
    if (!sockets || sockets.length === 0) return;

    // Güncel durumu tekrar kontrol edip yeni açılan var mı tespit edelim
    const collectionsProgress = achievementManager.getCollectionsProgress(this.sceneManager.unlockedItems || []);
    const unlockedBadgeIds = achievementManager.unlockedBadgeIds;

    let newlyUnlockedItem = null;

    SHELF_ITEMS.forEach(item => {
      let currentUnlocked = false;
      if (item.type === 'collection') {
        const col = collectionsProgress.find(c => c.id === item.id);
        currentUnlocked = col ? col.isComplete : false;
      } else if (item.type === 'badge') {
        currentUnlocked = unlockedBadgeIds.has(item.id);
      }

      const prevState = this.shelfStates.get(item.slotIndex);
      if (currentUnlocked && (!prevState || !prevState.isUnlocked)) {
        newlyUnlockedItem = item;
      }
    });

    // Eğer yeni bir rozet/koleksiyon açıldıysa onun yuvasına görkemli kilit açma efekti
    if (newlyUnlockedItem) {
      const socket = sockets[newlyUnlockedItem.slotIndex];
      if (socket && socket.trophyMesh) {
        const oldMesh = socket.trophyMesh;

        // Eski karartı mesh'ini küçültüp kaldır
        gsap.to(oldMesh.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            this.sceneManager.remove(oldMesh);
            const idx = this.trophyMeshes.indexOf(oldMesh);
            if (idx !== -1) this.trophyMeshes.splice(idx, 1);

            // Canlı 3D Modeli Oluştur ve Parlamayla Büyüt
            const newMesh = BadgeFactory.createBadgeMesh(newlyUnlockedItem.id, true);
            newMesh.position.copy(socket.position);
            newMesh.scale.set(0, 0, 0);
            newMesh.userData = {
              id: newlyUnlockedItem.id,
              slotIndex: newlyUnlockedItem.slotIndex,
              isUnlocked: true,
              isBadgeOrCollection: true
            };

            this.sceneManager.add(newMesh);
            this.trophyMeshes.push(newMesh);
            socket.trophyMesh = newMesh;
            this.shelfStates.set(newlyUnlockedItem.slotIndex, { id: newlyUnlockedItem.id, isUnlocked: true });

            // Görkemli Kutlama Patlaması (Pulse & Pop)
            gsap.to(newMesh.scale, {
              x: 1.2,
              y: 1.2,
              z: 1.2,
              duration: 0.5,
              ease: 'back.out(2)',
              onComplete: () => {
                gsap.to(newMesh.scale, {
                  x: 0.85,
                  y: 0.85,
                  z: 0.85,
                  duration: 0.3,
                  ease: 'power1.inOut'
                });
              }
            });
          }
        });
      }
    } else {
      // Standart süzülme: Üretim yapıldığında masadan raflara uçuşan altın yıldız parçacık efekti
      this._spawnSparkleFly(startPosition);
    }
  }

  /**
   * Masadan rafa uçan minik altın ışık kıvılcımı efekti
   */
  _spawnSparkleFly(startPos) {
    const starGeo = new THREE.OctahedronGeometry(0.08, 0);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.copy(startPos);
    this.sceneManager.add(star);

    // Rastgele bir shelf yuvasına doğru süzülsün
    const randomSocketIdx = Math.floor(Math.random() * 12);
    const sockets = this.room.getSockets();
    const targetPos = sockets[randomSocketIdx] ? sockets[randomSocketIdx].position : new THREE.Vector3(0, 2, -4);

    gsap.to(star.position, {
      x: targetPos.x,
      y: targetPos.y + 0.3,
      z: targetPos.z,
      duration: 0.75,
      ease: 'power2.out',
      onComplete: () => {
        this.sceneManager.remove(star);
      }
    });

    gsap.to(star.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.75,
      ease: 'power2.in'
    });
  }

  /**
   * Her karede çalışan animasyon güncellemesi:
   * Tamamlanan rozet ve koleksiyon 3D modellerinin sürekli dönmesini sağlar.
   * @param {number} delta - Geçen süre (saniye)
   */
  update(delta) {
    if (!this.trophyMeshes || this.trophyMeshes.length === 0) return;

    const rotStep = delta * 1.2; // Akıcı sürekli dönüş hızı

    this.trophyMeshes.forEach(mesh => {
      if (mesh && mesh.userData && mesh.userData.isUnlocked) {
        mesh.rotation.y += rotStep;
      }
    });
  }

  _updatePhase(count) {
    if (count < 10) {
      this.room.setPhase(1);
    } else if (count < 40) {
      this.room.setPhase(2);
    } else {
      this.room.setPhase(3);
    }
  }

  clearTrophies() {
    this.trophyMeshes.forEach(mesh => {
      this.sceneManager.remove(mesh);
    });
    this.trophyMeshes = [];

    const sockets = this.room.getSockets();
    sockets.forEach(s => {
      s.isOccupied = false;
      s.itemId = null;
      s.trophyMesh = null;
    });

    this.shelfStates.clear();
  }
}
