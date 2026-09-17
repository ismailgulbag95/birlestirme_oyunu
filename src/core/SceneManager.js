import * as THREE from 'three';

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0b0f19');

    // Camera: Dikey mobil ekrana tam oturan, masa ve karakteri ekranın alt kısmına alan sinematik açı
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 7.2, 9.6);
    this.camera.lookAt(0, 1.3, 0);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
    this.isMobile = isMobile;

    // Renderer (Mobil 60 FPS Optimizasyonu)
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !isMobile, // Mobilde MSAA kapatılarak GPU yükü yarıya indirilir
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // Mobilde Full HD ekranları 1.35x ile renderlayarak GPU overdraw ve aşırı ısınmayı engelle
    this.renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.35) : Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = isMobile ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;

    this._setupLighting();
    this._setupResizeHandler();
  }

  _setupLighting() {
    // Soft Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional Key Light (Mobil gölge haritası 512x512 yapılarak %75 bellek/GPU tasarrufu sağlanır)
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    keyLight.position.set(4, 9, 5);
    keyLight.castShadow = true;
    const shadowSize = this.isMobile ? 512 : 1024;
    keyLight.shadow.mapSize.width = shadowSize;
    keyLight.shadow.mapSize.height = shadowSize;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    // Fill Light (Yumuşak dolgu ışığı)
    const fillLight = new THREE.DirectionalLight(0x88bbff, 0.4);
    fillLight.position.set(-4, 5, -3);
    this.scene.add(fillLight);
  }

  _setupResizeHandler() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(this.isMobile ? Math.min(window.devicePixelRatio, 1.35) : Math.min(window.devicePixelRatio, 2));
    });
  }

  add(object) {
    this.scene.add(object);
  }

  remove(object) {
    this.scene.remove(object);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
