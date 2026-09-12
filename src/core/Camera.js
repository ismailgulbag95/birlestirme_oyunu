// Camera Sınıfı - Dikey Mobil Görünüm İçin Kamera Ayarları
import * as THREE from 'three';

export class GameCamera extends THREE.PerspectiveCamera {
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far);
    // TODO: Kamera pozisyonu ve dikey ekran optimizasyonu
  }
}
