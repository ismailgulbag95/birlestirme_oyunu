/**
 * AudioManager.js
 * Oyun müziği ve ses yöneticisi.
 * - 3 Müzik Modu:
 *   1: Stride of the Traveler (music1.mp3)
 *   2: Beneath The Northern Peak (music2.mp3)
 *   0: Müzik Yok / Kapalı
 * - Kesintisiz döngü (Seamless loop)
 * - Fade-in / Fade-out yumuşak geçişleri
 * - Autoplay kısıtlamalarına karşı ilk kullanıcı etkileşiminde başlatma (unlockAudio)
 * - Seçili müzik modu (LocalStorage persistanslı)
 */

export const TRACKS = [
  { id: 1, name: 'Stride of the Traveler', src: '/audio/music1.mp3' },
  { id: 2, name: 'Beneath The Northern Peak', src: '/audio/music2.mp3' },
  { id: 3, name: 'Morning in the Clearing', src: '/audio/music3.mp3' }
];

export class AudioManager {
  constructor() {
    this.bgm = null;
    const savedMode = parseInt(localStorage.getItem('alchemy_music_mode'), 10);
    // Varsayılan olarak 1. müzik (Stride of the Traveler), eğer daha önce kapatılmışsa 0 veya geçerli mod
    this.musicMode = isNaN(savedMode) ? 1 : savedMode;
    this.volume = 0.55;
    this.isPlaying = false;
    this.audioUnlocked = false;

    this._setupAudio();
    this._setupUnlockListeners();
  }

  _setupAudio() {
    try {
      if (this.bgm) {
        this.bgm.pause();
        this.bgm.src = '';
      }

      const track = TRACKS.find(t => t.id === this.musicMode);
      if (track) {
        this.bgm = new Audio(track.src);
        this.bgm.loop = true;
        this.bgm.volume = this.volume;
        this.bgm.preload = 'auto';
      } else {
        this.bgm = null;
      }
    } catch (err) {
      console.warn('Audio desteği başlatılamadı:', err);
    }
  }

  _setupUnlockListeners() {
    const unlock = () => {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;

      if (this.musicMode !== 0 && this.bgm) {
        this.play();
      }

      ['click', 'touchstart', 'keydown', 'pointerdown'].forEach(evt => {
        window.removeEventListener(evt, unlock);
      });
    };

    ['click', 'touchstart', 'keydown', 'pointerdown'].forEach(evt => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }

  play() {
    if (!this.bgm || this.musicMode === 0) return;

    this.bgm.play().then(() => {
      this.isPlaying = true;
      this._fadeIn(1500);
    }).catch(() => {
      console.log('Müzik kullanıcı etkileşimi bekliyor...');
    });
  }

  pause() {
    if (!this.bgm) return;
    this._fadeOut(1000, () => {
      if (this.bgm) {
        this.bgm.pause();
      }
      this.isPlaying = false;
    });
  }

  /**
   * Müzik seçenekleri arasında geçiş yapar:
   * 1 -> 2 -> 3 -> 0 (Kapalı) -> 1 ...
   * @returns {number} Yeni müzik modu
   */
  cycleMusicMode() {
    if (this.musicMode === 0) {
      this.setMusicMode(1);
    } else if (this.musicMode < TRACKS.length) {
      this.setMusicMode(this.musicMode + 1);
    } else {
      this.setMusicMode(0);
    }
    return this.musicMode;
  }

  setMusicMode(newMode) {
    const prevBgm = this.bgm;
    this.musicMode = newMode;
    localStorage.setItem('alchemy_music_mode', this.musicMode.toString());

    if (prevBgm) {
      this._fadeOut(400, () => {
        prevBgm.pause();
        prevBgm.src = '';
      });
    }

    const track = TRACKS.find(t => t.id === this.musicMode);
    if (track) {
      this.bgm = new Audio(track.src);
      this.bgm.loop = true;
      this.bgm.volume = 0;
      this.bgm.preload = 'auto';

      if (this.audioUnlocked) {
        this.bgm.play().then(() => {
          this.isPlaying = true;
          this._fadeIn(800);
        }).catch(() => {});
      }
    } else {
      this.bgm = null;
      this.isPlaying = false;
    }
  }

  getMusicMode() {
    return this.musicMode;
  }

  isMuted() {
    return this.musicMode === 0;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgm) {
      this.bgm.volume = this.volume;
    }
  }

  _fadeIn(durationMs = 1500) {
    if (!this.bgm || this.musicMode === 0) return;
    const currentAudio = this.bgm;
    const targetVol = this.volume;
    const stepTime = 50;
    const steps = durationMs / stepTime;
    const volIncrement = targetVol / steps;

    currentAudio.volume = 0;
    let currentVol = 0;

    const interval = setInterval(() => {
      if (this.bgm !== currentAudio || this.musicMode === 0) {
        clearInterval(interval);
        return;
      }
      currentVol += volIncrement;
      if (currentVol >= targetVol) {
        currentAudio.volume = targetVol;
        clearInterval(interval);
      } else {
        currentAudio.volume = currentVol;
      }
    }, stepTime);
  }

  _fadeOut(durationMs = 1000, onComplete) {
    if (!this.bgm) {
      if (onComplete) onComplete();
      return;
    }

    const currentAudio = this.bgm;
    const startVol = currentAudio.volume;
    const stepTime = 50;
    const steps = durationMs / stepTime;
    const volDecrement = startVol / steps;

    let currentVol = startVol;

    const interval = setInterval(() => {
      currentVol -= volDecrement;
      if (currentVol <= 0.01) {
        currentAudio.volume = 0;
        clearInterval(interval);
        if (onComplete) onComplete();
      } else {
        currentAudio.volume = currentVol;
      }
    }, stepTime);
  }
}

export const audioManager = new AudioManager();
