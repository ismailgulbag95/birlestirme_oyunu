// Rapier Entegrasyonu - Fizik Dünyası ve Çarpışma Yöneticisi
import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three';

export class RapierWorld {
  constructor() {
    this.world = null;
    this.activeBodies = []; // [{ body, mesh }]
  }

  async init() {
    await RAPIER.init();
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    this.world = new RAPIER.World(gravity);

    // Zemin için statik collider
    const floorColliderDesc = RAPIER.ColliderDesc.cuboid(30, 0.5, 30).setTranslation(0, -2.5, 0);
    this.world.createCollider(floorColliderDesc);
  }

  addPiece(mesh, initialPos, velocity) {
    if (!this.world) return;

    // Rigid body desc: Dynamic
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(initialPos.x, initialPos.y, initialPos.z)
      .setLinvel(velocity.x, velocity.y, velocity.z);
    const body = this.world.createRigidBody(bodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.ball(0.2).setRestitution(0.4).setFriction(0.6);
    this.world.createCollider(colliderDesc, body);

    this.activeBodies.push({ body, mesh, groundTime: null, initialLinvel: null });
  }

  clearPieces(scene) {
    if (!this.world) return;
    this.activeBodies.forEach(item => {
      scene.remove(item.mesh);
      try {
        this.world.removeRigidBody(item.body);
      } catch (e) {}
    });
    this.activeBodies = [];
  }

  step(scene) {
    if (!this.world) return;
    this.world.step();

    const now = Date.now();

    this.activeBodies.forEach((item) => {
      const pos = item.body.translation();
      const rot = item.body.rotation();

      item.mesh.position.set(pos.x, pos.y, pos.z);
      item.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);

      const linvel = item.body.linvel();

      // Yere düştüğünde (y <= 1.5 yüksekliğine ulaştığında) yuvarlanma yavaşlamasını başlat
      if (!item.groundTime && pos.y <= 1.5) {
        item.groundTime = now;
        item.initialLinvel = { x: linvel.x, y: linvel.y, z: linvel.z };
      }

      if (item.groundTime) {
        const groundAge = (now - item.groundTime) / 1000; // saniye cinsinden
        if (groundAge <= 5) {
          // Her saniye hızı %20 azalarak (linear reduction: 1 - 0.2 * groundAge) 5 saniyede 0 olur
          const factor = Math.max(0, 1 - 0.2 * groundAge);
          item.body.setLinvel({
            x: item.initialLinvel.x * factor,
            y: item.initialLinvel.y * factor,
            z: item.initialLinvel.z * factor
          }, true);

          const angvel = item.body.angvel();
          item.body.setAngvel({
            x: angvel.x * factor,
            y: angvel.y * factor,
            z: angvel.z * factor
          }, true);
        } else {
          // 5 saniye sonunda tamamen durdur
          item.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
          item.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      }
    });
  }
}
