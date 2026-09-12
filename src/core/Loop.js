// Loop Sınıfı - RequestAnimationFrame ve Güncelleme Döngüsü
export class Loop {
  constructor(renderer, scene, camera, physics, systems) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.physics = physics;
    this.systems = systems;
    this.isRunning = false;
  }

  start() {
    // TODO: Döngüyü başlat
  }

  stop() {
    // TODO: Döngüyü durdur
  }
}
