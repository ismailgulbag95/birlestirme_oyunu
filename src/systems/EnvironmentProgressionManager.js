import * as THREE from 'three';
import gsap from 'gsap';
import { ItemFactory } from '../items/ItemFactory.js';

/**
 * EnvironmentProgressionManager
 * Keşif ilerlemesini dinler, raflara trofeleri yerleştirir,
 * masadan rafa parabolik mikro uçuş animasyonunu yönetir ve oda fazını günceller.
 */
export class EnvironmentProgressionManager {
  constructor(sceneManager, roomEnvironment) {
    this.sceneManager = sceneManager;
    this.room = roomEnvironment;
    this.trophyMeshes = [];
  }

  syncWithUnlockedItems(unlockedItems = []) {
    this.clearTrophies();

    const sockets = this.room.getSockets();
    // İlk temel elementler haricinde yeni keşfedilenleri veya listeyi al
    const displayItems = unlockedItems.slice(0, sockets.length);

    displayItems.forEach((itemId, idx) => {
      const socket = sockets[idx];
      if (!socket) return;

      try {
        const miniMesh = ItemFactory.createItemMesh(itemId);
        miniMesh.scale.set(0.26, 0.26, 0.26);
        miniMesh.position.copy(socket.position);
        miniMesh.rotation.y = Math.PI * 0.15; // Hafif açılı sergileme
        
        this.sceneManager.add(miniMesh);
        this.trophyMeshes.push(miniMesh);

        socket.isOccupied = true;
        socket.itemId = itemId;
        socket.trophyMesh = miniMesh;
      } catch (err) {
        console.warn(`Trofe oluşturulamadı: ${itemId}`, err);
      }
    });

    this._updatePhase(unlockedItems.length);
  }

  flyItemToShelf(itemId, startPosition = new THREE.Vector3(0, 1.2, 0)) {
    const sockets = this.room.getSockets();
    const targetSocket = sockets.find(s => !s.isOccupied) || sockets[sockets.length - 1];
    if (!targetSocket) return;

    try {
      const flyingMesh = ItemFactory.createItemMesh(itemId);
      flyingMesh.position.copy(startPosition);
      flyingMesh.scale.set(0.4, 0.4, 0.4);
      this.sceneManager.add(flyingMesh);

      // Parabolik uçuş: Önce biraz yükselip sonra arkadaki rafa kavis çizer
      const targetPos = targetSocket.position;
      const peakY = Math.max(startPosition.y, targetPos.y) + 1.2;

      // 1. X ve Z doğrudan hedefe
      gsap.to(flyingMesh.position, {
        x: targetPos.x,
        z: targetPos.z,
        duration: 0.85,
        ease: 'power2.inOut'
      });

      // 2. Y tepe noktası ve iniş
      gsap.to(flyingMesh.position, {
        y: peakY,
        duration: 0.4,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to(flyingMesh.position, {
            y: targetPos.y,
            duration: 0.45,
            ease: 'bounce.out'
          });
        }
      });

      // 3. Boyut küçülme ve rotasyon
      gsap.to(flyingMesh.scale, {
        x: 0.26,
        y: 0.26,
        z: 0.26,
        duration: 0.85,
        ease: 'power2.inOut'
      });

      gsap.to(flyingMesh.rotation, {
        y: Math.PI * 2 + 0.3,
        duration: 0.85,
        ease: 'power1.out',
        onComplete: () => {
          // Eski trofe varsa kaldır
          if (targetSocket.trophyMesh) {
            this.sceneManager.remove(targetSocket.trophyMesh);
          }

          targetSocket.isOccupied = true;
          targetSocket.itemId = itemId;
          targetSocket.trophyMesh = flyingMesh;
          this.trophyMeshes.push(flyingMesh);

          // Rafa oturma mikro-nabzı (pop/pulse)
          gsap.to(flyingMesh.scale, {
            x: 0.32,
            y: 0.32,
            z: 0.32,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
          });
        }
      });

    } catch (err) {
      console.warn(`Uçuş trofesi oluşturulamadı: ${itemId}`, err);
    }
  }

  _updatePhase(count) {
    if (count < 6) {
      this.room.setPhase(1);
    } else if (count < 15) {
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
  }
}
