// Rapier Entegrasyonu - Fizik Dünyası ve Çarpışma Yöneticisi
import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three';

export class RapierWorld {
  constructor() {
    this.world = null;
    this.activeBodies = []; // [{ body, mesh, spawnTime }]
  }

  async init() {
    await RAPIER.init();
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    this.world = new RAPIER.World(gravity);

    // 1. Zemin için statik collider (üst yüzey: y = -2.00)
    const floorColliderDesc = RAPIER.ColliderDesc.cuboid(30, 0.5, 30)
      .setTranslation(0, -2.5, 0)
      .setRestitution(0.3)
      .setFriction(0.8);
    this.world.createCollider(floorColliderDesc);

    // 2. Karakterin arkasındaki taş duvar & pencere collider'ı (z = -4.8, ön yüzey: ~ -4.3)
    const backWallColliderDesc = RAPIER.ColliderDesc.cuboid(15, 10, 0.5)
      .setTranslation(0, 4.5, -4.8)
      .setRestitution(0.4)
      .setFriction(0.6);
    this.world.createCollider(backWallColliderDesc);

    // 3. Sol Taş Duvar Collider'ı (x = -12.0)
    const leftWallColliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 10, 15)
      .setTranslation(-12.0, 4.5, 0)
      .setRestitution(0.4)
      .setFriction(0.6);
    this.world.createCollider(leftWallColliderDesc);

    // 4. Sağ Taş Duvar Collider'ı (x = 12.0)
    const rightWallColliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 10, 15)
      .setTranslation(12.0, 4.5, 0)
      .setRestitution(0.4)
      .setFriction(0.6);
    this.world.createCollider(rightWallColliderDesc);

    // 5. Kamera tarafındaki görünmez ön bariyer (z = +5.0)
    const frontWallColliderDesc = RAPIER.ColliderDesc.cuboid(15, 10, 0.5)
      .setTranslation(0, 4.5, 5.0)
      .setRestitution(0.3)
      .setFriction(0.6);
    this.world.createCollider(frontWallColliderDesc);

    // 6. Simyacı masası tablası collider'ı (y = 0.1)
    const tableColliderDesc = RAPIER.ColliderDesc.cuboid(2.5, 0.1, 1.2)
      .setTranslation(0, 0.1, 0)
      .setRestitution(0.3)
      .setFriction(0.8);
    this.world.createCollider(tableColliderDesc);
  }

  addPiece(mesh, initialPos, velocity) {
    if (!this.world) return;

    // Parçaların doğarken çakışıp fırlamasını/titremesini önlemek için hafif konum kaydırması (jitter offset)
    const spawnX = initialPos.x + (Math.random() - 0.5) * 0.15;
    const spawnY = initialPos.y + (Math.random() - 0.5) * 0.15;
    const spawnZ = initialPos.z + (Math.random() - 0.5) * 0.15;

    // Rigid body: Dynamic, dahili hava/zemin yavaşlaması (damping) ve CCD aktif
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(spawnX, spawnY, spawnZ)
      .setLinvel(velocity.x, velocity.y, velocity.z)
      .setLinearDamping(1.2)  // Doğal lineer yavaşlama (sürtünme)
      .setAngularDamping(1.8) // Doğal açısal yavaşlama (yuvarlanma direnci)
      .setCcdEnabled(true);   // Sürekli Çarpışma Algılama (Titreme ve nesne içinden geçmeyi önler)

    const body = this.world.createRigidBody(bodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.ball(0.18)
      .setRestitution(0.3)
      .setFriction(0.8);
    this.world.createCollider(colliderDesc, body);

    this.activeBodies.push({ body, mesh, spawnTime: Date.now() });
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
    if (!this.world || this.activeBodies.length === 0) return;
    this.world.step();

    const now = Date.now();

    this.activeBodies.forEach((item) => {
      // Eğer cisim tamamen durup uyku moduna geçtiyse titremeyi önlemek için güncelleme yapılmaz
      if (item.body.isSleeping()) {
        return;
      }

      const pos = item.body.translation();
      const rot = item.body.rotation();

      item.mesh.position.set(pos.x, pos.y, pos.z);
      item.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);

      const linvel = item.body.linvel();
      const angvel = item.body.angvel();
      const speedSq = linvel.x * linvel.x + linvel.y * linvel.y + linvel.z * linvel.z;
      const rotSpeedSq = angvel.x * angvel.x + angvel.y * angvel.y + angvel.z * angvel.z;
      const age = (now - item.spawnTime) / 1000;

      // Hız sıfıra yaklaştığında veya 3.5 saniye geçtiğinde cismi tamamen dondur/uyut
      if ((speedSq < 0.01 && rotSpeedSq < 0.01) || age > 3.5) {
        item.body.setLinvel({ x: 0, y: 0, z: 0 }, false);
        item.body.setAngvel({ x: 0, y: 0, z: 0 }, false);
        item.body.sleep();
      }
    });
  }
}
