/**
 * AudioManager.js
 * Valheim tarzı atmosferik arka plan müziği ve ses efektleri yöneticisi.
 * - Seamless looping
 * - Fade-in / Fade-out geçişleri
 * - Autoplay kısıtlamalarına karşı ilk kullanıcı etkileşiminde başlatma (unlockAudio)
 * - Mute / Unmute durumu (LocalStorage persistanslı)
 */

export class AudioManager {
  constructor() {
    this.bgm = null;
    this.isMuted = localStorage.getItem('alchemy_bgm_muted') === 'true';
    this.volume = 0.55;
    this.isInitialized = false;
    this.isPlaying = false;
    this.audioUnlocked = false;

    this._setupAudio();
    this._setupUnlockListeners();
  }

  _setupAudio() {
    try {
      this.bgm = new Audio('/audio/valheim_ambient.wav');
      this.bgm.loop = true;
      this.bgm.volume = this.isMuted ? 0 : this.volume;
      this.bgm.preload = 'auto';
    } catch (err) {
      console.warn('Audio desteği başlatılamadı:', err);
    }
  }

  _setupUnlockListeners() {
    const unlock = () => {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;

      // Tarayıcının autoplay kilidini aç
      if (!this.isMuted && this.bgm) {
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
    if (!this.bgm || this.isMuted) return;

    this.bgm.play().then(() => {
      this.isPlaying = true;
      this._fadeIn(1500);
    }).catch(err => {
      // Kullanıcı henüz etkileşime girmediğinde tarayıcı autoplay'i engelleyebilir
      console.log('Arka plan müziği kullanıcı etkileşimi bekliyor...');
    });
  }

  pause() {
    if (!this.bgm) return;
    this._fadeOut(1000, () => {
      this.bgm.pause();
      this.isPlaying = false;
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('alchemy_bgm_muted', this.isMuted ? 'true' : 'false');

    if (this.isMuted) {
      if (this.bgm) {
        this._fadeOut(500, () => {
          this.bgm.pause();
          this.bgm.volume = 0;
          this.isPlaying = false;
        });
      }
    } else {
      if (this.bgm) {
        this.bgm.volume = 0;
        this.bgm.play().then(() => {
          this.isPlaying = true;
          this._fadeIn(1000);
        }).catch(() => {});
      }
    }

    return this.isMuted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, min(1, vol));
    if (!this.isMuted && this.bgm) {
      this.bgm.volume = this.volume;
    }
  }

  _fadeIn(durationMs = 1500) {
    if (!this.bgm || this.isMuted) return;
    const targetVol = this.volume;
    const stepTime = 50;
    const steps = durationMs / stepTime;
    const volIncrement = targetVol / steps;

    this.bgm.volume = 0;
    let currentVol = 0;

    const interval = setInterval(() => {
      if (this.isMuted) {
        clearInterval(interval);
        return;
      }
      currentVol += volIncrement;
      if (currentVol >= targetVol) {
        this.bgm.volume = targetVol;
        clearInterval(interval);
      } else {
        this.bgm.volume = currentVol;
      }
    }, stepTime);
  }

  _fadeOut(durationMs = 1000, onComplete) {
    if (!this.bgm) {
      if (onComplete) onComplete();
      return;
    }

    const startVol = this.bgm.volume;
    const stepTime = 50;
    const steps = durationMs / stepTime;
    const volDecrement = startVol / steps;

    let currentVol = startVol;

    const interval = setInterval(() => {
      currentVol -= volDecrement;
      if (currentVol <= 0.01) {
        this.bgm.volume = 0;
        clearInterval(interval);
        if (onComplete) onComplete();
      } else {
        this.bgm.volume = currentVol;
      }
    }, stepTime);
  }
}

export const audioManager = new AudioManager();
