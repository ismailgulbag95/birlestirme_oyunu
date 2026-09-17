import gsap from 'gsap';
import { ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';
import { i18n } from '../i18n/translations.js';
import { FreeTierManager } from '../systems/FreeTierManager.js';
import { subscriptionManager, SUBSCRIPTION_PLANS } from '../systems/SubscriptionManager.js';
import { achievementManager } from '../systems/AchievementManager.js';
import { adManager } from '../systems/AdManager.js';

export class UIManager {
  constructor(onItemSelect, onGetHint, onWatchAd, onCleanup, onCharacterSwitch, onMusicToggle, debugHandlers = {}, onCraftClick = null, onModeSwitch = null) {
    this.onItemSelect = onItemSelect;
    this.onGetHint = onGetHint; // (itemId) => result
    this.onWatchAd = onWatchAd; // (itemId) => void
    this.onCleanup = onCleanup; // () => void
    this.onCharacterSwitch = onCharacterSwitch; // (characterId) => void
    this.onMusicToggle = onMusicToggle; // () => number (musicMode: 1, 2, 0)
    this.debugHandlers = debugHandlers; // { onUnlockAll, onSetInfiniteHints, onRevealAllHints, onResetProgress, onSpawnBasics }
    this.onCraftClick = onCraftClick; // () => void
    this.onModeSwitch = onModeSwitch; // (newMode) => void
    this.gameMode = 'classic'; // 'classic' or 'grandmaster'
    const savedMode = parseInt(localStorage.getItem('alchemy_music_mode'), 10);
    this.musicMode = isNaN(savedMode) ? 1 : savedMode;
    this.currentCharacterId = 'character2';
    this.filterCategory = 'all'; // 'all', 'elements', 'nature', 'life', 'craft_tools'
    this.sortMode = 'discovery'; // 'discovery', 'category'
    this.searchQuery = '';
    this.lastItemIds = [];
    this.infiniteHintsEnabled = false;
    this.fpsHudEnabled = false;
    this.rightPanelState = 'closed'; // 'closed', 'narrow', 'wide'
    this.unlockedItemCount = 4;
    this.currentTutorialStep = 1;
    this.totalTutorialSteps = 5;
    this._injectStyles();
    this._createUI();
  }


  _injectStyles() {
    if (document.getElementById('alchemy-ui-styles')) return;

    const style = document.createElement('style');
    style.id = 'alchemy-ui-styles';
    style.textContent = `
      #ui-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        z-index: 10;
        overflow: hidden;
      }

      /* =================================================== */
      /* ANTI-SLOP SAĞ PANEL: Çanta / Simyacı Envanteri       */
      /* 3 Durum: Kapalı -> Dar (60px) -> Geniş (120px)      */
      /* =================================================== */
      #right-panel {
        position: absolute;
        right: 0;
        top: 18px;
        height: calc(100% - 90px);
        background: linear-gradient(180deg, #181c26 0%, #10131a 100%);
        border: 2px solid #543d22;
        border-right: none;
        border-radius: 16px 0 0 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 6px 12px 6px;
        gap: 6px;
        pointer-events: auto;
        box-shadow: -10px 0 35px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(212, 163, 89, 0.4);
        transition: transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 20;
      }

      /* Durum 0: Kapalı (Tamamen ekran dışına gizli) */
      #right-panel.state-closed {
        transform: translateX(100%);
        width: 62px;
      }

      /* Durum 1: Dar Mod (60px - İtemler kompakt görünür) */
      #right-panel.state-narrow {
        transform: translateX(0);
        width: 62px;
      }

      /* Durum 2: Geniş Mod (120px - Formüller ve detaylar görünür) */
      #right-panel.state-wide {
        transform: translateX(0);
        width: 122px;
      }

      /* Durum 3: Tam Ekran Modu (Tüm ekranı kaplayan ferah ızgara görünümü) */
      #right-panel.state-fullscreen {
        transform: translateX(0);
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        border-radius: 0;
        border: none;
        padding: 12px 16px 20px 16px;
        background: #0f172a;
        z-index: 100;
        box-shadow: none;
      }

      #right-panel.state-fullscreen .panel-header-badge {
        max-width: 900px;
        width: 100%;
        margin: 0 auto 6px auto;
        font-size: 13px;
        padding: 8px 12px;
      }

      #right-panel.state-fullscreen #inv-controls {
        max-width: 900px;
        width: 100%;
        margin: 0 auto 10px auto;
      }

      #right-panel.state-fullscreen #inv-items-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
        gap: 8px;
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
        justify-items: center;
        max-height: calc(100% - 100px);
        overflow-y: auto;
      }

      #right-panel.state-fullscreen .item-icon-btn {
        width: 68px;
        height: 74px;
      }

      /* Keşif Kulakçığı (Kapat / Toggle Butonu) */
      #right-panel-toggle {
        position: absolute;
        left: -46px;
        top: 28px;
        width: 46px;
        height: 64px;
        background: linear-gradient(180deg, #782121 0%, #4a1010 100%);
        border: 2px solid #b48c48;
        border-right: none;
        border-radius: 14px 0 0 14px;
        color: #fef08a;
        font-size: 14px;
        font-weight: 800;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: -5px 6px 16px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }

      #right-panel-toggle:hover {
        background: linear-gradient(180deg, #942929 0%, #5e1515 100%);
        transform: scale(1.05);
        border-color: #fde047;
      }

      /* Çarpının Altındaki Tam Ekran Butonu */
      #right-panel-fullscreen-btn {
        position: absolute;
        left: -46px;
        top: 98px;
        width: 46px;
        height: 56px;
        background: linear-gradient(180deg, #1e3a8a 0%, #172554 100%);
        border: 2px solid #60a5fa;
        border-right: none;
        border-radius: 14px 0 0 14px;
        color: #93c5fd;
        font-size: 13px;
        font-weight: 800;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: -5px 6px 16px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }

      #right-panel-fullscreen-btn:hover {
        background: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
        transform: scale(1.05);
        border-color: #bfdbfe;
        color: #ffffff;
      }

      /* Tam Ekran modunda sadece 1 tane kapat butonu yer alır */
      #right-panel.state-fullscreen #right-panel-toggle {
        left: auto;
        right: 18px;
        top: 14px;
        border-right: 2px solid #b48c48;
        border-radius: 12px;
        width: 48px;
        height: 48px;
      }

      #right-panel.state-fullscreen #right-panel-fullscreen-btn {
        display: none !important;
      }

      /* Panel Başlık Şeridi */
      .panel-header-badge {
        width: 100%;
        background: linear-gradient(180deg, #2a2015 0%, #17120a 100%);
        border: 1px solid #785327;
        border-radius: 8px;
        padding: 5px 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        color: #fef08a;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.4);
        flex-shrink: 0;
        overflow: hidden;
      }

      #right-panel.state-narrow .panel-header-badge .badge-text {
        display: none;
      }

      #inv-controls {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        align-items: center;
        padding-bottom: 6px;
        border-bottom: 1.5px solid #3d2c18;
        flex-shrink: 0;
      }

      #right-panel.state-narrow #inv-controls {
        display: none;
      }

      #inv-items-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7px;
        width: 100%;
        overflow-y: auto;
        flex: 1;
        padding: 2px 0;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      #inv-items-container::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }

      /* Gömülü (Inset) Arama Kutusu */
      #item-search-input {
        width: 100%;
        background: #090b0f;
        border: 1.5px solid #3d2b17;
        border-radius: 8px;
        padding: 6px 8px;
        color: #fef08a;
        font-size: 11px;
        font-weight: 600;
        outline: none;
        box-sizing: border-box;
        transition: all 0.2s ease;
        text-align: left;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
      }

      #item-search-input:focus {
        border-color: #d97706;
        background: #0d1017;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(217, 119, 6, 0.35);
      }

      #item-search-input::placeholder {
        color: #71624f;
        font-size: 10px;
      }

      /* Segment Buton Grubu (Filtre & Sırala) */
      .inv-btn-segment {
        display: flex;
        gap: 3px;
        width: 100%;
      }

      .inv-segment-btn {
        flex: 1;
        background: linear-gradient(180deg, #2b3342 0%, #19202b 100%);
        border: 1px solid #4a3620;
        color: #e2e8f0;
        border-radius: 6px;
        font-size: 9px;
        padding: 5px 2px;
        cursor: pointer;
        text-align: center;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 0 #0b0e14;
        transition: all 0.15s ease;
      }

      .inv-segment-btn:hover {
        border-color: #b48c48;
        color: #fef08a;
        transform: translateY(-1px);
      }

      .inv-segment-btn:active {
        transform: translateY(1px);
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.6);
      }

      /* Anti-Slop: Taktil Envanter Yuvası (Inlaid Vault Slot) */
      .item-icon-btn {
        width: 106px;
        min-height: 72px;
        border-radius: 12px;
        background: linear-gradient(180deg, #1c212c 0%, #131720 100%);
        border: 1.5px solid #3d2b17;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #f1f5f9;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
        padding: 4px 4px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 3px 0 #080a0e, 0 5px 12px rgba(0, 0, 0, 0.6);
        position: relative;
      }

      .item-icon-btn:hover {
        border-color: #b48c48;
        background: linear-gradient(180deg, #262c3a 0%, #181d28 100%);
        transform: translateY(-2px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 5px 0 #080a0e, 0 8px 16px rgba(0, 0, 0, 0.7);
      }

      .item-icon-btn:active {
        transform: translateY(2px);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 0 #080a0e;
      }

      /* Dar Modda Eşya Yuvası (Kompakt 50x50px) */
      #right-panel.state-narrow .item-icon-btn {
        width: 50px;
        min-height: 50px;
        height: 50px;
        padding: 2px;
        border-radius: 10px;
      }

      #right-panel.state-narrow .item-icon-btn .icon-symbol {
        width: 32px;
        height: 32px;
        margin-bottom: 0;
      }

      #right-panel.state-narrow .item-icon-btn .item-label,
      #right-panel.state-narrow .item-icon-btn .item-formula {
        display: none !important;
      }

      .item-img-icon {
        width: 34px;
        height: 34px;
        object-fit: contain;
        filter: drop-shadow(0 3px 6px rgba(0,0,0,0.7));
        pointer-events: none;
      }

      /* Geniş Mod Formül Yazısı */
      .item-formula {
        font-size: 8px;
        color: #fde047;
        font-weight: 700;
        text-align: center;
        margin-top: 1px;
        line-height: 1.15;
        max-width: 98px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      }

      /* =================================================== */
      /* ANTI-SLOP SOL PANEL: Simya Kodeksi (Alchemical Codex) */
      /* =================================================== */
      #left-drawer {
        position: absolute;
        left: -232px;
        top: 50px;
        width: 232px;
        height: calc(100% - 120px);
        background: linear-gradient(180deg, #181c26 0%, #10131a 100%);
        border: 2px solid #543d22;
        border-left: none;
        border-radius: 0 18px 18px 0;
        pointer-events: auto;
        transition: transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
        display: flex;
        flex-direction: column;
        z-index: 20;
        box-shadow: 14px 0 45px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(212, 163, 89, 0.35);
      }

      #left-drawer.open {
        transform: translateX(232px);
      }

      /* Dikey Antika Kitap Sırtı / İpucu Kulakçığı */
      #drawer-toggle {
        position: absolute;
        right: -46px;
        top: 28px;
        width: 46px;
        height: 64px;
        background: linear-gradient(180deg, #782121 0%, #4a1010 100%);
        border: 2px solid #b48c48;
        border-left: none;
        border-radius: 0 14px 14px 0;
        color: #fef08a;
        font-size: 14px;
        font-weight: 800;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: 5px 6px 16px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }

      #drawer-toggle:hover {
        background: linear-gradient(180deg, #942929 0%, #5e1515 100%);
        transform: scale(1.05);
        border-color: #fde047;
      }

      .drawer-header {
        padding: 14px 16px;
        background: linear-gradient(180deg, #881324 0%, #5c0d18 100%);
        border-bottom: 2px solid #b48c48;
        border-radius: 0 16px 0 0;
        font-size: 13px;
        font-weight: 800;
        color: #fef08a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 3px 8px rgba(0, 0, 0, 0.5);
        letter-spacing: 0.8px;
        text-transform: uppercase;
      }

      .hint-badge {
        background: linear-gradient(180deg, #fbbf24 0%, #d97706 100%);
        color: #2e1502;
        border: 1px solid #fde68a;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 800;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5);
      }

      .drawer-content {
        flex: 1;
        padding: 14px 12px;
        overflow-y: auto;
        color: #cbd5e1;
        font-size: 13px;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      /* Kilitli Eşya Kartı: Simya Reçete Parşömeni */
      .locked-item-card {
        background: #0d1016;
        border: 1.5px solid #3d2b17;
        border-radius: 12px;
        padding: 12px;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4);
        position: relative;
      }

      .locked-item-card h4 {
        color: #fef08a;
        margin-bottom: 4px;
        font-size: 13px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .locked-item-card p {
        color: #9ca3af;
        font-size: 12px;
        margin-bottom: 10px;
        line-height: 1.4;
      }

      /* 3D Zümrüt Yeşili İpucu Butonu */
      .hint-btn {
        background: linear-gradient(180deg, #4ade80 0%, #22c55e 45%, #15803d 100%);
        color: #ffffff;
        border: 1.5px solid #14532d;
        padding: 7px 16px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 3px 0 #0f4021, 0 5px 10px rgba(0, 0, 0, 0.4);
        transition: all 0.12s ease;
        text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .hint-btn:hover {
        background: linear-gradient(180deg, #6ee7b7 0%, #34d399 45%, #16a34a 100%);
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 4px 0 #0f4021, 0 7px 12px rgba(0, 0, 0, 0.5);
      }

      .hint-btn:active {
        transform: translateY(2px);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 0 #0f4021;
      }

      .hint-btn:disabled {
        background: linear-gradient(180deg, #475569 0%, #334155 100%);
        border-color: #1e293b;
        box-shadow: none;
        color: #94a3b8;
        cursor: not-allowed;
      }

      /* Alt Bar: Sol Alt (Temizle) ve Sağ Alt (Ayarlar) */
      #bottom-action-bar {
        position: fixed;
        bottom: max(32px, calc(env(safe-area-inset-bottom, 0px) + 24px));
        left: 0;
        width: 100vw;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        pointer-events: none;
        z-index: 15;
        box-sizing: border-box;
      }

      /* Taktil Alt Köşe Butonları (Temizle & Ayarlar) */
      .bottom-side-btn {
        background: linear-gradient(180deg, #2a3342 0%, #1a212d 50%, #111620 100%);
        border: 1.5px solid #5c4426;
        border-radius: 18px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 0 #0d1117, 0 8px 18px rgba(0, 0, 0, 0.6);
        color: #fef08a;
        font-size: 13px;
        font-weight: 800;
        padding: 9px 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        pointer-events: auto;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }

      .bottom-side-btn:hover {
        background: linear-gradient(180deg, #374357 0%, #222b3a 50%, #161c28 100%);
        border-color: #b48c48;
        transform: translateY(-2px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 6px 0 #0d1117, 0 12px 24px rgba(0, 0, 0, 0.7);
      }

      .bottom-side-btn:active {
        transform: translateY(2px);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 0 #0d1117;
      }

      /* Temizle Butonuna Özel Hafif Amber/Kırmızı Vurgu */
      #bottom-cleanup-btn {
        border-color: #7f1d1d;
        color: #fca5a5;
      }
      #bottom-cleanup-btn:hover {
        border-color: #ef4444;
        color: #fee2e2;
      }

      /* Birleştir (Craft) Butonu - Ekranın Tam Merkezinde Sabit (Fixed) */
      #craft-action-btn {
        position: fixed;
        left: 50%;
        bottom: max(32px, calc(env(safe-area-inset-bottom, 0px) + 24px));
        transform: translateX(-50%);
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 40%, #b45309 75%, #78350f 100%);
        border: 2px solid #fef08a;
        border-radius: 28px;
        padding: 10px 24px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.5px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 22px rgba(245, 158, 11, 0.6), 0 8px 24px rgba(0, 0, 0, 0.6);
        transition: box-shadow 0.25s ease, border-color 0.25s ease;
        user-select: none;
        pointer-events: auto;
        z-index: 30;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        animation: craftBtnPulse 2s infinite alternate ease-in-out;
      }

      #craft-action-btn:hover {
        border-color: #ffffff;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 32px rgba(253, 224, 71, 0.85), 0 12px 28px rgba(0, 0, 0, 0.7);
      }

      @keyframes craftBtnPulse {
        0% {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 0 16px rgba(245, 158, 11, 0.45), 0 6px 18px rgba(0, 0, 0, 0.5);
        }
        100% {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 0 32px rgba(253, 224, 71, 0.9), 0 8px 25px rgba(0, 0, 0, 0.65);
        }
      }

      /* Mobil Ekranlar İçin Alt Bar İyileştirmesi */
      @media (max-width: 768px), (max-height: 850px) {
        #bottom-action-bar {
          bottom: max(36px, calc(env(safe-area-inset-bottom, 0px) + 28px));
          padding: 0 12px;
        }

        #craft-action-btn {
          bottom: max(36px, calc(env(safe-area-inset-bottom, 0px) + 28px));
        }

        .bottom-side-btn {
          padding: 8px 14px;
          font-size: 12px;
          border-radius: 16px;
        }

        #craft-action-btn {
          padding: 9px 20px;
          font-size: 13px;
          border-radius: 22px;
        }
      }

      /* Settings Modal (Koyu Ahşap/Obsidian Taş Panel & Kurdele Başlık) */
      #settings-modal {

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.82);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        z-index: 120;
      }

      #settings-modal.show {
        display: flex;
      }

      .settings-box {
        background: linear-gradient(180deg, #1c212d 0%, #12151e 100%);
        border: 2.5px solid #6b4d2c;
        border-radius: 24px;
        padding: 24px 22px;
        width: 90%;
        max-width: 440px;
        color: white;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(212, 163, 89, 0.35), inset 0 0 30px rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        gap: 14px;
        max-height: 85vh;
        overflow-y: auto;
        position: relative;
        animation: settingsModalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes settingsModalPop {
        from {
          opacity: 0;
          transform: scale(0.92) translateY(14px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      /* Pinterest Stili Ribbon (Kurdele) Başlık Rozeti */
      .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(180deg, #991b1b 0%, #7f1d1d 50%, #5d1212 100%);
        border: 2px solid #f59e0b;
        border-radius: 14px;
        padding: 10px 14px;
        box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 5px 12px rgba(0, 0, 0, 0.5);
      }

      .settings-title {
        font-size: 16px;
        font-weight: 800;
        color: #fef08a;
        letter-spacing: 1px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 8px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
      }

      .settings-close-icon {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background: linear-gradient(180deg, #450a0a 0%, #2b0606 100%);
        border: 1.5px solid #ef4444;
        color: #fca5a5;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 800;
        box-shadow: 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
        transition: all 0.15s ease;
      }

      .settings-close-icon:hover {
        background: #dc2626;
        color: #ffffff;
        transform: scale(1.08);
      }

      .settings-tabs {
        display: flex;
        gap: 8px;
        background: rgba(0, 0, 0, 0.45);
        padding: 5px;
        border-radius: 14px;
        border: 1.5px solid #4a3620;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);
      }

      .settings-tab-btn {
        flex: 1;
        padding: 8px 6px;
        border-radius: 10px;
        border: 1.5px solid transparent;
        background: transparent;
        color: #a8a29e;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .settings-tab-btn.active {
        background: linear-gradient(180deg, #855b2e 0%, #523719 100%);
        color: #fef08a;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
        border: 1.5px solid #d97706;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      }

      .settings-tab-pane {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .settings-btn-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.35);
        border: 1.5px solid #4a3620;
        border-radius: 14px;
        padding: 11px 14px;
        gap: 12px;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
      }

      .settings-btn-row-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
      }

      .settings-btn-label {
        font-size: 13px;
        font-weight: 800;
        color: #fef08a;
        letter-spacing: 0.3px;
      }

      .settings-btn-sub {
        font-size: 11px;
        color: #a8a29e;
      }

      /* 3D Taktil Düğme Temeli (Pinterest Chunky Bevel) */
      .settings-action-btn {
        padding: 8px 16px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        user-select: none;
        letter-spacing: 0.5px;
      }

      .settings-action-btn:active {
        transform: translateY(3px) !important;
      }

      /* 3D Kırmızı Buton */
      .btn-danger {
        background: linear-gradient(180deg, #f87171 0%, #dc2626 50%, #991b1b 100%);
        color: white;
        border: 1.5px solid #7f1d1d;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 3px 0 #450a0a, 0 5px 10px rgba(0, 0, 0, 0.5);
        text-shadow: 0 1px 2px rgba(0,0,0,0.7);
      }
      .btn-danger:hover {
        background: linear-gradient(180deg, #fca5a5 0%, #ef4444 50%, #b91c1c 100%);
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 4px 0 #450a0a, 0 7px 12px rgba(0, 0, 0, 0.6);
      }
      .btn-danger:active {
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 #450a0a;
      }

      .btn-danger-outline {
        background: rgba(239, 68, 68, 0.15);
        color: #fca5a5;
        border: 1.5px solid #ef4444;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.4);
      }
      .btn-danger-outline:hover {
        background: rgba(239, 68, 68, 0.3);
        color: white;
      }

      /* 3D Mor Buton (Karakter Değişimi) */
      .btn-purple {
        background: linear-gradient(180deg, #a78bfa 0%, #7c3aed 50%, #5b21b6 100%);
        color: white;
        border: 1.5px solid #4c1d95;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 3px 0 #2e1065, 0 5px 10px rgba(0, 0, 0, 0.5);
        text-shadow: 0 1px 2px rgba(0,0,0,0.7);
      }
      .btn-purple:hover {
        background: linear-gradient(180deg, #c4b5fd 0%, #8b5cf6 50%, #6d28d9 100%);
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 4px 0 #2e1065, 0 7px 12px rgba(0, 0, 0, 0.6);
      }
      .btn-purple:active {
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 #2e1065;
      }

      /* 3D Zümrüt Yeşili Buton (Referans Görseldeki Butonun Birebir Taktil Hali) */
      .btn-green {
        background: linear-gradient(180deg, #4ade80 0%, #22c55e 45%, #15803d 100%);
        color: white;
        border: 1.5px solid #14532d;
        box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.45), 0 4px 0 #0d381d, 0 6px 12px rgba(0, 0, 0, 0.5);
        text-shadow: 0 1px 2px rgba(0,0,0,0.7);
      }
      .btn-green:hover {
        background: linear-gradient(180deg, #86efac 0%, #4ade80 45%, #16a34a 100%);
        transform: translateY(-1px);
        box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.55), 0 5px 0 #0d381d, 0 8px 15px rgba(0, 0, 0, 0.6);
      }
      .btn-green:active {
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 #0d381d;
      }
      .btn-green.muted {
        background: linear-gradient(180deg, #64748b 0%, #475569 50%, #334155 100%);
        border-color: #1e293b;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 3px 0 #0f172a, 0 5px 10px rgba(0, 0, 0, 0.4);
      }

      /* 3D Mavi/Kraliyet Butonu (Dil Değiştir) */
      .btn-blue {
        background: linear-gradient(180deg, #38bdf8 0%, #0284c7 50%, #0369a1 100%);
        color: white;
        border: 1.5px solid #075985;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 3px 0 #0c4a6e, 0 5px 10px rgba(0, 0, 0, 0.5);
        text-shadow: 0 1px 2px rgba(0,0,0,0.7);
      }
      .btn-blue:hover {
        background: linear-gradient(180deg, #7dd3fc 0%, #38bdf8 50%, #0284c7 100%);
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 4px 0 #0c4a6e, 0 7px 12px rgba(0, 0, 0, 0.6);
      }
      .btn-blue:active {
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 #0c4a6e;
      }

      /* 3D Kehribar/Altın Buton (Debug Butonları vb.) */
      .btn-amber {
        background: linear-gradient(180deg, #fcd34d 0%, #f59e0b 50%, #b45309 100%);
        color: #451a03;
        border: 1.5px solid #78350f;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 3px 0 #451a03, 0 5px 10px rgba(0, 0, 0, 0.5);
        text-shadow: 0 1px 1px rgba(255,255,255,0.4);
      }
      .btn-amber:hover {
        background: linear-gradient(180deg, #fde68a 0%, #fbbf24 50%, #d97706 100%);
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 4px 0 #451a03, 0 7px 12px rgba(0, 0, 0, 0.6);
      }
      .btn-amber:active {
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 #451a03;
      }
      .btn-amber.active {
        box-shadow: 0 0 16px rgba(245, 158, 11, 0.8), inset 0 1px 0 rgba(255,255,255,0.6);
        border-color: #fde047;
      }

      .btn-cyan {
        background: linear-gradient(180deg, #67e8f9 0%, #06b6d4 50%, #0e7490 100%);
        color: white;
        border: 1.5px solid #155e75;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 3px 0 #164e63, 0 5px 10px rgba(0, 0, 0, 0.5);
      }
      .btn-cyan:hover {
        background: linear-gradient(180deg, #a5f3fc 0%, #22d3ee 50%, #0891b2 100%);
        transform: translateY(-1px);
      }
      .btn-cyan:active {
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 #164e63;
      }

      .btn-indigo {
        background: linear-gradient(180deg, #a5b4fc 0%, #6366f1 50%, #4338ca 100%);
        color: white;
        border: 1.5px solid #3730a3;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 3px 0 #312e81, 0 5px 10px rgba(0, 0, 0, 0.5);
      }
      .btn-indigo:hover {
        background: linear-gradient(180deg, #c7d2fe 0%, #818cf8 50%, #4f46e5 100%);
        transform: translateY(-1px);
      }
      .btn-indigo:active {
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 #312e81;
      }
      .btn-indigo:hover {
        background: linear-gradient(135deg, rgba(99, 102, 241, 1), rgba(79, 70, 229, 1));
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      }

      .btn-emerald {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(13, 148, 136, 0.85));
        color: white;
        border-color: rgba(110, 231, 183, 0.4);
      }
      .btn-emerald:hover {
        background: linear-gradient(135deg, rgba(16, 185, 129, 1), rgba(13, 148, 136, 1));
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      }

      .btn-slate {
        background: rgba(255, 255, 255, 0.15);
        color: #f1f5f9;
        border-color: rgba(255, 255, 255, 0.2);
      }
      .btn-slate:hover {
        background: rgba(255, 255, 255, 0.25);
      }
      .btn-slate.active {
        background: rgba(56, 189, 248, 0.3);
        border-color: #38bdf8;
        color: #38bdf8;
      }

      /* FPS HUD */
      #fps-counter-hud {
        position: absolute;
        top: 20px;
        left: 20px;
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 10px;
        padding: 6px 12px;
        color: #38bdf8;
        font-family: monospace, Consolas, sans-serif;
        font-size: 11px;
        font-weight: 700;
        pointer-events: none;
        z-index: 50;
        display: none;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      }

      /* Ad Modal */
      #ad-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        z-index: 100;
      }

      .ad-box {
        background: #1e293b;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 24px;
        width: 80%;
        max-width: 300px;
        text-align: center;
        color: white;
      }

      .ad-box h3 {
        margin-bottom: 12px;
        color: #f59e0b;
      }

      .ad-box p {
        font-size: 13px;
        color: #cbd5e1;
        margin-bottom: 20px;
      }

      .ad-btn {
        background: #10b981;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        margin-bottom: 8px;
      }

      .ad-close {
        background: transparent;
        color: #94a3b8;
        border: none;
        padding: 6px;
        cursor: pointer;
        font-size: 12px;
      }

      /* Masanın Önündeki Keşif Bilgilendirme Banner'ı */
      #discovery-banner {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(20px) scale(0.9);
        background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
        backdrop-filter: blur(14px);
        border: 1.5px solid rgba(245, 158, 11, 0.6);
        border-radius: 18px;
        padding: 12px 22px;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55), 0 0 20px rgba(245, 158, 11, 0.3);
        pointer-events: none;
        opacity: 0;
        z-index: 50;
        max-width: 90vw;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      #discovery-banner.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }

      /* Toast Bildirimi */
      #alchemy-toast {
        position: absolute;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 8px 18px;
        color: #f8fafc;
        font-size: 13px;
        font-weight: 700;
        pointer-events: none;
        opacity: 0;
        z-index: 99;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
        transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
      }
      #alchemy-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      #alchemy-toast.warn {
        border-color: rgba(245, 158, 11, 0.6);
        color: #fef08a;
      }
      #alchemy-toast.success {
        border-color: rgba(52, 211, 153, 0.6);
        color: #6ee7b7;
      }

      .discovery-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
      }

      .discovery-title {
        font-size: 15px;
        font-weight: 700;
        color: #fef08a;
        margin-bottom: 2px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .discovery-desc {
        font-size: 12px;
        color: #cbd5e1;
        line-height: 1.35;
      }

      /* =================================================== */
      /* HOŞGELDİNİZ & REHBER (TUTORIAL) MODALLARI & OK      */
      /* =================================================== */
      #welcome-modal, #char-unlock-modal {
        position: fixed;
        inset: 0;
        background: rgba(5, 7, 12, 0.78);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 9990;
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        padding: 16px;
        box-sizing: border-box;
      }

      /* Rehber Modalı: Flulaştırma (blur) KESİNLİKLE YOK, Arka plan net ve şeffaf */
      #tutorial-modal {
        position: fixed;
        inset: 0;
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        z-index: 9990;
        display: none;
        pointer-events: none;
        padding: 16px;
        box-sizing: border-box;
      }

      #welcome-modal.show, #char-unlock-modal.show {
        display: flex;
      }

      #tutorial-modal.show {
        display: block;
      }

      .welcome-card, .celebrate-card {
        background: linear-gradient(180deg, #1f2636 0%, #111520 100%);
        border: 2px solid #b48c48;
        border-radius: 20px;
        box-shadow: 0 16px 45px rgba(0, 0, 0, 0.9), 0 0 25px rgba(217, 119, 6, 0.35);
        max-width: 440px;
        width: 100%;
        padding: 28px 24px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        position: relative;
        animation: modalZoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes modalZoomIn {
        from { opacity: 0; transform: scale(0.9) translateY(15px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      .welcome-icon-glow {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0) 70%);
        border: 1.5px solid #d97706;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        box-shadow: 0 0 20px rgba(217, 119, 6, 0.4);
      }

      .welcome-title, .celebrate-title {
        font-size: 20px;
        font-weight: 800;
        color: #fef08a;
        margin: 0;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 6px rgba(0,0,0,0.8);
      }

      .welcome-sub {
        font-size: 13px;
        color: #cbd5e1;
        line-height: 1.5;
        margin: 0;
      }

      .welcome-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        margin-top: 6px;
      }

      .btn-gold-primary {
        background: linear-gradient(180deg, #d97706 0%, #92400e 100%);
        border: 1.5px solid #fde047;
        color: #ffffff;
        font-size: 14px;
        font-weight: 800;
        padding: 13px 20px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.15s ease;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 15px rgba(217, 119, 6, 0.4);
      }

      .btn-gold-primary:hover {
        background: linear-gradient(180deg, #f59e0b 0%, #b45309 100%);
        transform: translateY(-2px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 6px 20px rgba(217, 119, 6, 0.6);
      }

      .btn-gold-primary:active {
        transform: translateY(1px);
      }

      .btn-dark-secondary {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #94a3b8;
        font-size: 12px;
        font-weight: 600;
        padding: 9px 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .btn-dark-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
      }

      /* Rehber Kartı */
      .tutorial-card {
        background: linear-gradient(180deg, #1c2230 0%, #10141d 100%);
        border: 2px solid #b48c48;
        border-radius: 18px;
        box-shadow: 0 14px 40px rgba(0, 0, 0, 0.9), 0 0 20px rgba(217, 119, 6, 0.3);
        max-width: 440px;
        width: calc(100% - 24px);
        padding: 18px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: auto;
        transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease;
        animation: modalZoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .tutorial-card.pos-bottom {
        top: auto !important;
        bottom: 22px !important;
        transform: translateX(-50%) !important;
      }

      .tutorial-card.pos-top {
        bottom: auto !important;
        top: 22px !important;
        transform: translateX(-50%) !important;
      }

      .tutorial-card.pos-center {
        top: 50% !important;
        bottom: auto !important;
        transform: translate(-50%, -50%) !important;
      }

      .tutorial-top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .tutorial-step-tag {
        background: rgba(217, 119, 6, 0.2);
        color: #fde047;
        font-size: 11px;
        font-weight: 800;
        padding: 3px 10px;
        border-radius: 6px;
        border: 1px solid rgba(253, 224, 71, 0.4);
        letter-spacing: 0.5px;
      }

      .tutorial-close-btn {
        background: transparent;
        border: none;
        color: #94a3b8;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        padding: 2px 6px;
        line-height: 1;
        border-radius: 4px;
        transition: all 0.15s ease;
      }

      .tutorial-close-btn:hover {
        color: #f87171;
        background: rgba(248, 113, 113, 0.1);
      }

      .tutorial-progress-track {
        width: 100%;
        height: 5px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        overflow: hidden;
      }

      .tutorial-progress-bar {
        height: 100%;
        width: 20%;
        background: linear-gradient(90deg, #d97706, #fde047);
        border-radius: 10px;
        transition: width 0.3s ease;
      }

      .tutorial-body {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .tutorial-step-title {
        font-size: 16px;
        font-weight: 800;
        color: #fef08a;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .tutorial-step-desc {
        font-size: 13px;
        color: #cbd5e1;
        line-height: 1.5;
        margin: 0;
      }

      /* Karakter Vitrini (Rehber 5. Adım) */
      .tutorial-char-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        margin-top: 4px;
      }

      .tutorial-char-card {
        background: rgba(0, 0, 0, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 8px 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 4px;
      }

      .tutorial-char-card.unlocked {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.08);
      }

      .tutorial-char-card.locked {
        border-color: #f59e0b;
        background: rgba(245, 158, 11, 0.08);
      }

      .tutorial-char-icon {
        font-size: 20px;
      }

      .tutorial-char-name {
        font-size: 10px;
        font-weight: 700;
        color: #f1f5f9;
      }

      .tutorial-char-badge {
        font-size: 8px;
        font-weight: 800;
        padding: 2px 5px;
        border-radius: 4px;
      }

      .badge-unlocked {
        background: rgba(34, 197, 94, 0.25);
        color: #4ade80;
        border: 1px solid rgba(74, 222, 128, 0.4);
      }

      .badge-locked {
        background: rgba(245, 158, 11, 0.25);
        color: #fbbf24;
        border: 1px solid rgba(251, 191, 36, 0.4);
      }

      .tutorial-bottom-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-top: 4px;
      }

      .tutorial-nav-btn {
        flex: 1;
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: center;
      }

      .tutorial-nav-btn.prev {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #cbd5e1;
      }

      .tutorial-nav-btn.prev:hover {
        background: rgba(255, 255, 255, 0.14);
        color: #ffffff;
      }

      .tutorial-nav-btn.next {
        background: linear-gradient(180deg, #d97706 0%, #92400e 100%);
        border: 1.5px solid #fde047;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
      }

      .tutorial-nav-btn.next:hover {
        background: linear-gradient(180deg, #f59e0b 0%, #b45309 100%);
      }

      /* Dinamik Gösterici Ok (Pointer Arrow) */
      #tutorial-pointer-arrow {
        position: fixed;
        z-index: 10005;
        pointer-events: none;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: left 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), top 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.3s ease;
        filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.9));
      }

      .arrow-svg {
        width: 46px;
        height: 46px;
      }

      .arrow-bounce-right {
        animation: arrowBounceRight 1s infinite alternate ease-in-out;
      }

      .arrow-bounce-down {
        animation: arrowBounceDown 1s infinite alternate ease-in-out;
      }

      .arrow-pulse-center {
        animation: arrowPulseCenter 1.2s infinite ease-in-out;
      }

      @keyframes arrowBounceRight {
        0% { transform: translateX(0); }
        100% { transform: translateX(14px); }
      }

      @keyframes arrowBounceDown {
        0% { transform: translateY(0); }
        100% { transform: translateY(14px); }
      }

      @keyframes arrowPulseCenter {
        0% { transform: scale(0.95); opacity: 0.85; }
        50% { transform: scale(1.15); opaci      /* Vurgulanan Element Efekti */
      .tutorial-element-highlight {
        outline: 3px solid #f59e0b !important;
        outline-offset: 3px !important;
        box-shadow: 0 0 25px rgba(245, 158, 11, 0.85) !important;
        z-index: 10002 !important;
        animation: tutorialPulseGlow 1.2s infinite alternate ease-in-out !important;
      }

      @keyframes tutorialPulseGlow {
        from { box-shadow: 0 0 15px rgba(245, 158, 11, 0.6); }
        to { box-shadow: 0 0 30px rgba(253, 224, 71, 0.95); }
      }

      /* =================================================== */
      /* FREEMIUM İLERLEME ÇUBUĞU & GRANDMASTER MODALLARI    */
      /* =================================================== */
      .inv-progress-container {
        width: 100%;
        box-sizing: border-box;
        padding: 4px 6px 8px 6px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .inv-progress-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 700;
        color: #fde047;
      }
      .inv-progress-track {
        width: 100%;
        height: 6px;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(212, 163, 89, 0.3);
        border-radius: 6px;
        overflow: hidden;
      }
      .inv-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #f59e0b, #22c55e);
        border-radius: 6px;
        transition: width 0.3s ease;
      }
      .gm-mini-badge {
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 9px;
        font-weight: 800;
        padding: 2px 7px;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(139, 92, 246, 0.4);
        transition: transform 0.15s ease;
      }
      .gm-mini-badge:hover {
        transform: scale(1.05);
      }

      /* Daily Hint Button */
      .daily-hint-action-btn {
        width: 100%;
        background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
        border: 1.5px solid #7dd3fc;
        color: #ffffff;
        padding: 7px 10px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4);
        margin-bottom: 6px;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .daily-hint-action-btn:hover {
        background: linear-gradient(180deg, #7dd3fc 0%, #0369a1 100%);
        transform: translateY(-1px);
      }

      /* Grandmaster Modal & Achievements Modal */
      #grandmaster-offer-modal, #achievements-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        z-index: 130;
      }
      #grandmaster-offer-modal.show, #achievements-modal.show {
        display: flex;
      }

      .gm-offer-box, .achievements-box {
        background: linear-gradient(180deg, #1c212d 0%, #10141e 100%);
        border: 2.5px solid #8b5cf6;
        border-radius: 24px;
        padding: 24px 22px;
        width: 90%;
        max-width: 480px;
        color: white;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(139, 92, 246, 0.35);
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: 88vh;
        overflow-y: auto;
        animation: settingsModalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .achievements-box {
        border-color: #f59e0b;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(245, 158, 11, 0.3);
      }

      .gm-plans-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 4px;
      }
      .gm-plan-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1.5px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        padding: 12px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 4px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
      }
      .gm-plan-card:hover {
        border-color: #a78bfa;
        background: rgba(167, 139, 250, 0.12);
        transform: translateY(-2px);
      }
      .gm-plan-card.recommended {
        border-color: #f59e0b;
        background: linear-gradient(180deg, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0.06) 100%);
      }
      .gm-plan-badge {
        position: absolute;
        top: -8px;
        background: #f59e0b;
        color: #000;
        font-size: 8px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 6px;
      }

      /* Badges & Collections */
      .badges-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }
      .badge-row-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .badge-row-card.unlocked {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.08);
      }
      .collections-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .col-card-box {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .col-chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .col-item-chip {
        padding: 4px 8px;
        border-radius: 8px;
        font-size: 10px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 4px;
        background: rgba(255, 255, 255, 0.05);
        color: #94a3b8;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .col-item-chip.owned {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.4);
      }
    `;
    document.head.appendChild(style);
  }

  _createUI() {
    const container = document.createElement('div');
    container.id = 'ui-container';
    container.innerHTML = `
      <div id="left-drawer">
        <div id="drawer-toggle" title="İpuçları">
          <img src="./textures/ui/icon_codex.png" style="width: 20px; height: 20px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size: 16px;\\'>📜</span>';">
          <span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">İPUCU</span>
        </div>
        <div class="drawer-header">
          <span id="drawer-hints-title">${i18n.t('hints_title')}</span>
          <span class="hint-badge" id="hint-rights-badge">${i18n.t('hint_rights', { n: 3 })}</span>
        </div>
        <div style="padding: 6px 12px 0 12px;">
          <button id="daily-free-hint-btn" class="daily-hint-action-btn">${i18n.t('free_daily_hint_btn')}</button>
        </div>
        <div class="drawer-content" id="drawer-hints-list">
          <!-- Kilitli eşyalar dinamik yüklenecek -->
        </div>
      </div>

      <div id="right-panel" class="state-closed">
        <div id="right-panel-toggle" title="Keşif">
          <img src="./textures/ui/icon_discovery.png" style="width: 20px; height: 20px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size: 16px;\\'>🧭</span>';">
          <span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">KEŞİF</span>
        </div>
        <div id="right-panel-fullscreen-btn" title="Tam Ekran" style="display: none;">
          <span style="font-size: 14px;">⛶</span>
          <span style="font-size: 7px; font-weight: 800; letter-spacing: 0.3px; line-height: 1;">TAM EKRAN</span>
        </div>
        <div class="panel-header-badge">
          <span>🧭</span>
          <span class="badge-text">KEŞFEDİLENLER</span>
        </div>
        <div class="inv-progress-container" id="inv-progress-box">
          <div class="inv-progress-header">
            <span id="inv-progress-text">4 / 80 Keşfedildi (5%)</span>
            <button id="grandmaster-open-badge-btn" class="gm-mini-badge">🔮 Grandmaster</button>
          </div>
          <div class="inv-progress-track">
            <div class="inv-progress-fill" id="inv-progress-fill" style="width: 5%;"></div>
          </div>
        </div>
        <div id="inv-controls">
          <input type="text" id="item-search-input" placeholder="${i18n.t('search_placeholder')}" autocomplete="off" spellcheck="false">
          <div class="inv-btn-segment">
            <button id="filter-btn" class="inv-segment-btn" title="Kategori Filtrele">${this._getFilterLabel('all')}</button>
            <button id="sort-btn" class="inv-segment-btn" title="Sıralama Modu">${this._getSortLabel('discovery')}</button>
          </div>
        </div>
        <div id="inv-items-container">
          <!-- Keşfedilen itemler dinamik yüklenecek -->
        </div>
      </div>

      <div id="fps-counter-hud">FPS: -- | Nesne: 0</div>

      <div id="bottom-action-bar">
        <button id="bottom-cleanup-btn" class="bottom-side-btn">
          <span id="bottom-cleanup-btn-label">${i18n.t('cleanup')}</span>
        </button>
        <button id="achievements-open-btn" class="bottom-side-btn">
          <span id="achievements-open-btn-label">${i18n.t('achievements_btn')}</span>
        </button>
        <button id="craft-action-btn" class="craft-magic-btn" style="display: none;">
          <span id="craft-btn-label">${i18n.t('craft_btn')}</span>
          <span id="craft-btn-counter" style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(254, 240, 138, 0.4); padding: 2px 8px; border-radius: 12px; font-size: 11px; margin-left: 4px; font-weight: 800; color: #fef08a;">2/2</span>
        </button>
        <button id="settings-open-btn" class="bottom-side-btn">
          <span id="settings-open-btn-label">${i18n.t('settings_btn')}</span>
        </button>
      </div>

      <div id="settings-modal">
        <div class="settings-box">
          <div class="settings-header">
     </button>
      </div>


      <div id="settings-modal">
        <div class="settings-box">
          <div class="settings-header">
            <div class="settings-title">
              <span style="color: #fde047; font-size: 13px;">✦</span>
              <span id="settings-modal-title">${i18n.t('settings_title')}</span>
              <span style="color: #fde047; font-size: 13px;">✦</span>
            </div>
            <button class="settings-close-icon" id="settings-close-btn" title="${i18n.t('settings_close')}">✕</button>
          </div>

          <div class="settings-tabs">
            <button class="settings-tab-btn active" id="tab-general-btn" data-tab="general">${i18n.t('tab_general')}</button>
            <button class="settings-tab-btn" id="tab-credits-btn" data-tab="credits">${i18n.t('tab_credits')}</button>
            <button class="settings-tab-btn" id="tab-debug-btn" data-tab="debug">${i18n.t('tab_debug')}</button>
          </div>

          <!-- Genel Ayarlar Sekmesi -->
          <div class="settings-tab-pane" id="pane-general">
            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-game-mode">Oyun Modu</span>
                <span class="settings-btn-sub" id="sub-game-mode">${this.gameMode === 'classic' ? 'Klasik (Sadece 2\'li birleşimler)' : 'Simyacı Kazanı (2\'li ve 3\'lü birleşimler)'}</span>
              </div>
              <button id="mode-toggle-btn" class="settings-action-btn btn-indigo">${this._getModeButtonLabel()}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-cleanup">${i18n.t('cleanup')}</span>
                <span class="settings-btn-sub" id="sub-cleanup">Masadaki tüm eşyaları ve kırıkları temizle</span>
              </div>
              <button id="cleanup-btn" class="settings-action-btn btn-danger">${i18n.t('cleanup')}</button>
            </div>


            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span class="settings-btn-label" id="label-character">Karakter</span>
                  <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style="text-decoration: none;" title="Creative Commons Attribution 4.0 International">
                    <span style="font-size: 9px; font-weight: 700; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); padding: 1px 5px; border-radius: 4px;">CC BY 4.0</span>
                  </a>
                </div>
                <span class="settings-btn-sub" id="sub-character">Gözlemci (20 eşya), Gezgin (100 eşya)</span>
              </div>
              <button id="character-switch-btn" class="settings-action-btn btn-purple">${this._getCharacterLabel()}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-music">Müzik</span>
                <span class="settings-btn-sub" id="sub-music">Arka plan müziği modunu seç</span>
              </div>
              <button id="music-toggle-btn" class="settings-action-btn btn-green ${this.musicMode === 0 ? 'muted' : ''}">${this._getMusicButtonLabel()}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-lang">Dil / Language</span>
                <span class="settings-btn-sub" id="sub-lang">Oyun dilini değiştir</span>
              </div>
              <button id="lang-toggle-btn" class="settings-action-btn btn-blue">${i18n.t('lang_btn')}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-tutorial-open">${i18n.t('tutorial_title')}</span>
                <span class="settings-btn-sub" id="sub-tutorial-open">Oyun mekaniklerini ve rehberi adım adım incele</span>
              </div>
              <button id="tutorial-replay-btn" class="settings-action-btn btn-amber">${i18n.t('tutorial_replay_btn')}</button>
            </div>

            <!-- Karakter Lisansı & Atıf Kartı -->
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 10px 14px; display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px; font-weight: 700; color: #f1f5f9; display: flex; align-items: center; gap: 6px;">
                  <span>🎨</span> <span id="general-credits-heading">${i18n.t('credits_character_heading')}</span>
                </span>
                <span style="font-size: 9px; font-weight: 700; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); padding: 2px 6px; border-radius: 4px;">CC BY 4.0</span>
              </div>
              <p style="font-size: 11px; color: #94a3b8; line-height: 1.4; margin: 0;" id="general-credits-desc">
                ${i18n.t('credits_character_desc')}
              </p>
              <div style="display: flex; justify-content: flex-end; margin-top: 2px;">
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #38bdf8; text-decoration: none; padding: 4px 8px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; transition: all 0.2s;">
                  <span id="general-credits-link-text">${i18n.t('credits_view_license')}</span>
                  <span style="font-size: 9px;">↗</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Lisanslar & Atıflar Sekmesi -->
          <div class="settings-tab-pane" id="pane-credits" style="display: none;">
            <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <h4 style="font-size: 13px; font-weight: 700; color: #f8fafc; margin: 0; display: flex; align-items: center; gap: 6px;">
                  <span>📜</span> <span id="pane-credits-title">${i18n.t('credits_title')}</span>
                </h4>
                <span style="font-size: 10px; font-weight: 700; background: rgba(56, 189, 248, 0.25); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.5); padding: 3px 7px; border-radius: 6px;">CC BY 4.0</span>
              </div>
              
              <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5; margin: 0;" id="pane-credits-desc">
                ${i18n.t('credits_character_desc')}
              </p>

              <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #94a3b8; line-height: 1.4;">
                <div style="font-weight: 700; color: #e2e8f0; margin-bottom: 4px;" id="pane-credits-summary-title">Creative Commons Attribution 4.0:</div>
                <div id="pane-credits-summary-text">${i18n.t('credits_terms_summary')}</div>
              </div>

              <div style="display: flex; gap: 8px; align-items: center; margin-top: 4px;">
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" class="settings-action-btn btn-blue" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-size: 12px; padding: 8px 14px;">
                  <span id="pane-credits-link-btn">${i18n.t('credits_view_license')}</span>
                  <span style="font-size: 11px;">↗</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Debug Sekmesi -->
          <div class="settings-tab-pane" id="pane-debug" style="display: none;">
            <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 10px; padding: 7px 12px; font-size: 11px; color: #fef08a; display: flex; align-items: center; gap: 8px;">
              <span>⚠️</span>
              <span id="debug-warning-text">${i18n.t('debug_warning')}</span>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-debug-hints">${i18n.t('debug_infinite_hints')}</span>
                <span class="settings-btn-sub" id="sub-debug-hints">İpucu hakkı hiç eksilmez (999)</span>
              </div>
              <button id="debug-infinite-hints-btn" class="settings-action-btn btn-amber">${this.infiniteHintsEnabled ? 'Açık (Sınırsız)' : 'Aktif Et'}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-debug-unlock">${i18n.t('debug_unlock_all')}</span>
                <span class="settings-btn-sub" id="sub-debug-unlock">Tüm 180+ eşyayı anında aç</span>
              </div>
              <button id="debug-unlock-all-btn" class="settings-action-btn btn-cyan">${i18n.t('debug_unlock_all')}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-debug-reveal">${i18n.t('debug_reveal_hints')}</span>
                <span class="settings-btn-sub" id="sub-debug-reveal">Tüm tarifleri ipucunda göster</span>
              </div>
              <button id="debug-reveal-hints-btn" class="settings-action-btn btn-indigo">${i18n.t('debug_reveal_hints')}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-debug-spawn">${i18n.t('debug_spawn_basics')}</span>
                <span class="settings-btn-sub" id="sub-debug-spawn">4 elementi masaya koy</span>
              </div>
              <button id="debug-spawn-basics-btn" class="settings-action-btn btn-emerald">${i18n.t('debug_spawn_basics')}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-debug-fps">${i18n.t('debug_fps_counter')}</span>
                <span class="settings-btn-sub" id="sub-debug-fps">FPS ve sahne nesne sayısı</span>
              </div>
              <button id="debug-fps-toggle-btn" class="settings-action-btn btn-slate ${this.fpsHudEnabled ? 'active' : ''}">${this.fpsHudEnabled ? 'Açık' : 'Kapalı'}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-debug-reset" style="color: #f87171;">${i18n.t('debug_reset_progress')}</span>
                <span class="settings-btn-sub" id="sub-debug-reset">Kayıtları temizle ve sıfırla</span>
              </div>
              <button id="debug-reset-progress-btn" class="settings-action-btn btn-danger-outline">${i18n.t('debug_reset_progress')}</button>
            </div>
          </div>
        </div>
      </div>

      <div id="discovery-banner">
        <div class="discovery-icon" id="discovery-icon"></div>
        <div>
          <div class="discovery-title" id="discovery-title">${i18n.t('discovery_title')}</div>
          <div class="discovery-desc" id="discovery-desc">...</div>
        </div>
      </div>

      <div id="alchemy-toast"></div>

      <div id="ad-modal">
        <div class="ad-box">
          <h3 id="ad-title">${i18n.t('ad_title')}</h3>
          <p id="ad-desc">${i18n.t('ad_desc')}</p>
          <button class="ad-btn" id="watch-ad-btn">${i18n.t('ad_watch_btn')}</button>
          <button class="ad-close" id="close-ad-btn">${i18n.t('ad_cancel_btn')}</button>
        </div>
      </div>

      <!-- Hoşgeldiniz Ekranı Modalı -->
      <div id="welcome-modal">
        <div class="welcome-card">
          <div class="welcome-icon-glow">⚗️</div>
          <h2 class="welcome-title" id="welcome-modal-title">${i18n.t('welcome_title')}</h2>
          <p class="welcome-sub" id="welcome-modal-sub">${i18n.t('welcome_subtitle')}</p>
          <div class="welcome-actions">
            <button id="welcome-start-tutorial-btn" class="btn-gold-primary">${i18n.t('welcome_start_tutorial')}</button>
            <button id="welcome-skip-btn" class="btn-dark-secondary">${i18n.t('welcome_skip')}</button>
          </div>
        </div>
      </div>

      <!-- Rehber (Tutorial) Kartı Modalı -->
      <div id="tutorial-modal">
        <div class="tutorial-card" id="tutorial-card-box">
          <div class="tutorial-top-bar">
            <div class="tutorial-step-tag" id="tutorial-step-tag">${i18n.t('tutorial_step', { current: 1, total: 5 })}</div>
            <button class="tutorial-close-btn" id="tutorial-close-btn" title="${i18n.t('tutorial_skip')}">✕</button>
          </div>
          <div class="tutorial-progress-track">
            <div class="tutorial-progress-bar" id="tutorial-progress-bar" style="width: 20%;"></div>
          </div>
          <div class="tutorial-body">
            <h3 class="tutorial-step-title" id="tutorial-step-title">
              <span id="tutorial-step-icon">🎒</span>
              <span id="tutorial-step-title-text">${i18n.t('tutorial_step1_title')}</span>
            </h3>
            <p class="tutorial-step-desc" id="tutorial-step-desc-text">${i18n.t('tutorial_step1_desc')}</p>
            <div id="tutorial-chars-container" style="display: none;" class="tutorial-char-grid">
              <div class="tutorial-char-card unlocked" id="tut-card-char1">
                <span class="tutorial-char-icon">🧙‍♂️</span>
                <span class="tutorial-char-name">Çırak</span>
                <span class="tutorial-char-badge badge-unlocked">Açık</span>
              </div>
              <div class="tutorial-char-card locked" id="tut-card-char2">
                <span class="tutorial-char-icon">🔮</span>
                <span class="tutorial-char-name">Gözlemci</span>
                <span class="tutorial-char-badge badge-locked">🔒 20 Eşya</span>
              </div>
              <div class="tutorial-char-card locked" id="tut-card-char3">
                <span class="tutorial-char-icon">🧭</span>
                <span class="tutorial-char-name">Gezgin</span>
                <span class="tutorial-char-badge badge-locked">🔒 100 Eşya</span>
              </div>
            </div>
          </div>
          <div class="tutorial-bottom-nav">
            <button class="tutorial-nav-btn prev" id="tutorial-prev-btn" style="visibility: hidden;">${i18n.t('tutorial_prev')}</button>
            <button class="tutorial-nav-btn next" id="tutorial-next-btn">${i18n.t('tutorial_next')}</button>
          </div>
        </div>
      </div>

      <!-- Dinamik İşaretçi Ok (Pointer Arrow) -->
      <div id="tutorial-pointer-arrow">
        <svg class="arrow-svg" id="tutorial-pointer-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="tutorial-pointer-path" d="M24 4L24 38M24 38L12 26M24 38L36 26" stroke="#fde047" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Yeni Karakter Kilit Açılış Kutlama Modalı -->
      <div id="char-unlock-modal">
        <div class="celebrate-card">
          <div class="welcome-icon-glow" style="border-color: #22c55e; box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);">🎉</div>
          <h2 class="celebrate-title" id="celebrate-title">Yeni Karakter Açıldı!</h2>
          <p class="welcome-sub" id="celebrate-desc">Tebrikler! Yeni bir karakterin kilidi açıldı.</p>
          <div class="welcome-actions">
            <button id="celebrate-close-btn" class="btn-gold-primary">Harika!</button>
          </div>
        </div>
      </div>

      <!-- Başarımlar & Koleksiyonlar Modalı -->
      <div id="achievements-modal">
        <div class="achievements-box">
          <div class="settings-header">
            <div class="settings-title" style="color: #fde047;">
              <span>🏆</span>
              <span id="achievements-modal-title">${i18n.t('achievements_title')}</span>
              <span>🏆</span>
            </div>
            <button class="settings-close-icon" id="achievements-close-btn" title="Kapat">✕</button>
          </div>

          <div class="settings-tabs">
            <button class="settings-tab-btn active" id="tab-achieve-badges-btn">${i18n.t('tab_badges')}</button>
            <button class="settings-tab-btn" id="tab-achieve-collections-btn">${i18n.t('tab_collections')}</button>
          </div>

          <div class="settings-tab-pane" id="pane-achieve-badges">
            <div class="badges-grid" id="badges-container">
              <!-- Rozetler dinamik eklenecek -->
            </div>
          </div>

          <div class="settings-tab-pane" id="pane-achieve-collections" style="display: none;">
            <div class="collections-list" id="collections-container">
              <!-- Koleksiyonlar dinamik eklenecek -->
            </div>
          </div>
        </div>
      </div>

      <!-- Grandmaster Davet / Abonelik Modalı (Grand Finale) -->
      <div id="grandmaster-offer-modal">
        <div class="gm-offer-box">
          <div class="settings-header">
            <div class="settings-title" style="color: #c084fc;">
              <span>🔮</span>
              <span id="gm-modal-title">${i18n.t('grandmaster_offer_title')}</span>
              <span>⚗️</span>
            </div>
            <button class="settings-close-icon" id="gm-offer-close-btn" title="Kapat">✕</button>
          </div>

          <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5; margin: 0;" id="gm-modal-subtitle">
            ${i18n.t('grandmaster_offer_subtitle')}
          </p>

          <div style="background: rgba(139, 92, 246, 0.12); border: 1.5px solid rgba(139, 92, 246, 0.35); border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 12px; font-weight: 700; color: #e9d5ff;">${i18n.t('grandmaster_feature_1')}</div>
            <div style="font-size: 12px; font-weight: 700; color: #e9d5ff;">${i18n.t('grandmaster_feature_2')}</div>
            <div style="font-size: 12px; font-weight: 700; color: #e9d5ff;">${i18n.t('grandmaster_feature_3')}</div>
            <div style="font-size: 12px; font-weight: 700; color: #e9d5ff;">${i18n.t('grandmaster_feature_4')}</div>
          </div>

          <div class="gm-plans-grid">
            <div class="gm-plan-card recommended" data-plan="intro_monthly">
              <span class="gm-plan-badge">ÖNERİLEN</span>
              <span style="font-size: 11px; font-weight: 700; color: #fde047;">Tanışma Paketi</span>
              <span style="font-size: 16px; font-weight: 900; color: #ffffff;">₺49,99</span>
              <span style="font-size: 9px; color: #94a3b8;">İlk ay (sonra ₺79,99)</span>
              <button class="btn-gold-primary" style="padding: 6px 12px; font-size: 11px; margin-top: 4px; width: 100%;">Başla</button>
            </div>
            <div class="gm-plan-card" data-plan="yearly">
              <span class="gm-plan-badge" style="background: #a855f7; color: #fff;">%48 İNDİRİM</span>
              <span style="font-size: 11px; font-weight: 700; color: #c084fc;">Yıllık Grandmaster</span>
              <span style="font-size: 16px; font-weight: 900; color: #ffffff;">₺499,99</span>
              <span style="font-size: 9px; color: #94a3b8;">Yılda bir faturalandırılır</span>
              <button class="btn-dark-secondary" style="padding: 6px 12px; font-size: 11px; margin-top: 4px; width: 100%;">Seç</button>
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 4px;">
            <button class="gm-plan-card" data-plan="monthly" style="flex: 1; padding: 8px;">
              <span style="font-size: 10px; font-weight: 700; color: #cbd5e1;">Aylık Standart</span>
              <span style="font-size: 13px; font-weight: 800; color: #ffffff;">₺79,99/ay</span>
            </button>
            <button class="gm-plan-card" data-plan="lifetime" style="flex: 1; padding: 8px;">
              <span style="font-size: 10px; font-weight: 700; color: #cbd5e1;">Ömür Boyu</span>
              <span style="font-size: 13px; font-weight: 800; color: #ffffff;">₺999,99</span>
            </button>
          </div>

          <div style="display: flex; justify-content: center; margin-top: 4px;">
            <button id="gm-restore-btn" style="background: none; border: none; color: #94a3b8; font-size: 10px; cursor: pointer; text-decoration: underline;">Satın Alımları Geri Yükle</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    this._setupDrawerLogic();
    this._setupInventoryControls();
    this._setupLanguageToggle();
    this._setupMusicToggle();
    this._setupModeToggle();
    this._setupSettingsLogic();
    this._setupCraftButton();
    this._setupTutorialLogic();
    this._setupAchievementsLogic();
    this._setupGrandmasterOfferLogic();
    this._setupDailyHintLogic();
  }

  _setupCraftButton() {
    const craftBtn = document.getElementById('craft-action-btn');
    if (craftBtn && this.onCraftClick) {
      craftBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        gsap.to(craftBtn, {
          scale: 0.9,
          xPercent: -50,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            this.onCraftClick();
          }
        });
      });
    }
  }

  _setupModeToggle() {
    const toggleBtn = document.getElementById('mode-toggle-btn');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newMode = this.gameMode === 'classic' ? 'grandmaster' : 'classic';
        if (this.onModeSwitch) {
          this.onModeSwitch(newMode);
        }
      });
    }
  }

  _getModeButtonLabel(mode = this.gameMode) {
    return mode === 'classic' ? i18n.t('mode_btn_classic') : i18n.t('mode_btn_grandmaster');
  }

  setGameMode(mode) {
    this.gameMode = mode;
    const toggleBtn = document.getElementById('mode-toggle-btn');
    const subMode = document.getElementById('sub-game-mode');

    if (toggleBtn) toggleBtn.textContent = this._getModeButtonLabel(mode);
    if (subMode) {
      subMode.textContent = mode === 'classic'
        ? (i18n.currentLang === 'tr' ? 'Klasik (Sadece 2\'li birleşimler)' : 'Classic (2-Item combinations only)')
        : (i18n.currentLang === 'tr' ? 'Simyacı Kazanı (2\'li ve 3\'lü birleşimler)' : 'Grand Alchemist (2 & 3-Item combinations)');
    }

    this._populateInventory();
    if (this._lastHintsArgs) {
      this.populateHints(...this._lastHintsArgs);
    }
  }


  updateCraftButton(occupiedCount) {
    const btn = document.getElementById('craft-action-btn');
    const counter = document.getElementById('craft-btn-counter');
    if (!btn) return;

    const maxCount = this.gameMode === 'classic' ? 2 : 3;
    if (occupiedCount >= 1) {
      btn.style.display = 'inline-flex';
      if (counter) {
        counter.textContent = `${occupiedCount}/${maxCount}`;
      }
      gsap.killTweensOf(btn);
      gsap.fromTo(btn, { scale: 0.8, xPercent: -50 }, { scale: 1, xPercent: -50, duration: 0.3, ease: 'back.out(2)' });
    } else {
      btn.style.display = 'none';
    }
  }

  _getFilterLabel(cat) {
    const map = {
      all: 'all_categories',
      '01_elements': 'cat_elements',
      '02_doga': 'cat_nature',
      '03_canlilar': 'cat_life',
      '04_zanaat_ve_aletler': 'cat_craft_tools',
      '05_maden_ve_materyaller': 'cat_minerals',
      '06_yemek_ve_tarim': 'cat_food',
      '07_bilim_ve_teknoloji': 'cat_science',
      '08_mistik_ve_evren': 'cat_mystic'
    };
    const key = map[cat] || 'all_categories';
    return i18n.t(key);
  }

  _getSortLabel(mode) {
    return mode === 'category' ? i18n.t('sort_category') : i18n.t('sort_discovery');
  }

  _getMusicButtonLabel() {
    if (this.musicMode === 1) return i18n.t('music_1');
    if (this.musicMode === 2) return i18n.t('music_2');
    if (this.musicMode === 3) return i18n.t('music_3');
    return i18n.t('music_none');
  }

  _setupLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        i18n.toggleLanguage();
        this._updateUILanguage();
      });
    }

    i18n.onLanguageChange(() => {
      this._updateUILanguage();
    });
  }

  _updateUILanguage() {
    // 1. Language and Mode button labels
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) langBtn.textContent = i18n.t('lang_btn');

    const quickLabel = document.getElementById('mode-quick-btn-label');
    if (quickLabel) quickLabel.textContent = this._getModeQuickLabel();

    const toggleBtn = document.getElementById('mode-toggle-btn');
    if (toggleBtn) toggleBtn.textContent = this._getModeButtonLabel();

    const subMode = document.getElementById('sub-game-mode');
    if (subMode) {
      subMode.textContent = this.gameMode === 'classic'
        ? (i18n.currentLang === 'tr' ? 'Klasik (Sadece 2\'li birleşimler)' : 'Classic (2-Item combinations only)')
        : (i18n.currentLang === 'tr' ? 'Simyacı Kazanı (2\'li ve 3\'lü birleşimler)' : 'Grand Alchemist (2 & 3-Item combinations)');
    }

    // 2. Action buttons
    const cleanupBtn = document.getElementById('cleanup-btn');
    if (cleanupBtn) cleanupBtn.textContent = i18n.t('cleanup');

    const bottomCleanupLabel = document.getElementById('bottom-cleanup-btn-label');
    if (bottomCleanupLabel) bottomCleanupLabel.textContent = i18n.t('cleanup');

    const charBtn = document.getElementById('character-switch-btn');
    if (charBtn) {
      charBtn.textContent = this._getCharacterLabel();
    }


    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      musicBtn.textContent = this._getMusicButtonLabel();
      musicBtn.classList.toggle('muted', this.musicMode === 0);
    }

    const craftLabel = document.getElementById('craft-btn-label');
    if (craftLabel) craftLabel.textContent = i18n.t('craft_btn');

    // 3. Search placeholder
    const searchInput = document.getElementById('item-search-input');
    if (searchInput) searchInput.placeholder = i18n.t('search_placeholder');

    // 4. Filter & Sort buttons
    const filterBtn = document.getElementById('filter-btn');
    if (filterBtn) filterBtn.textContent = this._getFilterLabel(this.filterCategory);

    const sortBtn = document.getElementById('sort-btn');
    if (sortBtn) sortBtn.textContent = this._getSortLabel(this.sortMode);

    // 5. Drawer header
    const hintsTitle = document.getElementById('drawer-hints-title');
    if (hintsTitle) hintsTitle.textContent = i18n.t('hints_title');

    // 6. Ad modal
    const adTitle = document.getElementById('ad-title');
    if (adTitle) adTitle.textContent = i18n.t('ad_title');
    const adDesc = document.getElementById('ad-desc');
    if (adDesc) adDesc.textContent = i18n.t('ad_desc');
    const watchAdBtn = document.getElementById('watch-ad-btn');
    if (watchAdBtn) watchAdBtn.textContent = i18n.t('ad_watch_btn');
    const closeAdBtn = document.getElementById('close-ad-btn');
    if (closeAdBtn) closeAdBtn.textContent = i18n.t('ad_cancel_btn');

    // 7. Settings Modal & Debug Labels
    const settingsBtnLabel = document.getElementById('settings-open-btn-label');
    if (settingsBtnLabel) settingsBtnLabel.textContent = i18n.t('settings_btn');
    const settingsModalTitle = document.getElementById('settings-modal-title');
    if (settingsModalTitle) settingsModalTitle.textContent = i18n.t('settings_title');
    const tabGeneralBtn = document.getElementById('tab-general-btn');
    if (tabGeneralBtn) tabGeneralBtn.textContent = i18n.t('tab_general');
    const tabCreditsBtn = document.getElementById('tab-credits-btn');
    if (tabCreditsBtn) tabCreditsBtn.textContent = i18n.t('tab_credits');
    const tabDebugBtn = document.getElementById('tab-debug-btn');
    if (tabDebugBtn) tabDebugBtn.textContent = i18n.t('tab_debug');

    const genCreditsHeading = document.getElementById('general-credits-heading');
    if (genCreditsHeading) genCreditsHeading.textContent = i18n.t('credits_character_heading');
    const genCreditsDesc = document.getElementById('general-credits-desc');
    if (genCreditsDesc) genCreditsDesc.textContent = i18n.t('credits_character_desc');
    const genCreditsLinkText = document.getElementById('general-credits-link-text');
    if (genCreditsLinkText) genCreditsLinkText.textContent = i18n.t('credits_view_license');

    const paneCreditsTitle = document.getElementById('pane-credits-title');
    if (paneCreditsTitle) paneCreditsTitle.textContent = i18n.t('credits_title');
    const paneCreditsDesc = document.getElementById('pane-credits-desc');
    if (paneCreditsDesc) paneCreditsDesc.textContent = i18n.t('credits_character_desc');
    const paneCreditsSummaryText = document.getElementById('pane-credits-summary-text');
    if (paneCreditsSummaryText) paneCreditsSummaryText.textContent = i18n.t('credits_terms_summary');
    const paneCreditsLinkBtn = document.getElementById('pane-credits-link-btn');
    if (paneCreditsLinkBtn) paneCreditsLinkBtn.textContent = i18n.t('credits_view_license');

    const debugWarning = document.getElementById('debug-warning-text');
    if (debugWarning) debugWarning.textContent = i18n.t('debug_warning');

    const lblDebugHints = document.getElementById('label-debug-hints');
    if (lblDebugHints) lblDebugHints.textContent = i18n.t('debug_infinite_hints');
    const lblDebugUnlock = document.getElementById('label-debug-unlock');
    if (lblDebugUnlock) lblDebugUnlock.textContent = i18n.t('debug_unlock_all');
    const btnDebugUnlock = document.getElementById('debug-unlock-all-btn');
    if (btnDebugUnlock) btnDebugUnlock.textContent = i18n.t('debug_unlock_all');
    const lblDebugReveal = document.getElementById('label-debug-reveal');
    if (lblDebugReveal) lblDebugReveal.textContent = i18n.t('debug_reveal_hints');
    const btnDebugReveal = document.getElementById('debug-reveal-hints-btn');
    if (btnDebugReveal) btnDebugReveal.textContent = i18n.t('debug_reveal_hints');
    const lblDebugSpawn = document.getElementById('label-debug-spawn');
    if (lblDebugSpawn) lblDebugSpawn.textContent = i18n.t('debug_spawn_basics');
    const btnDebugSpawn = document.getElementById('debug-spawn-basics-btn');
    if (btnDebugSpawn) btnDebugSpawn.textContent = i18n.t('debug_spawn_basics');
    const lblDebugFps = document.getElementById('label-debug-fps');
    if (lblDebugFps) lblDebugFps.textContent = i18n.t('debug_fps_counter');
    const lblDebugReset = document.getElementById('label-debug-reset');
    if (lblDebugReset) lblDebugReset.textContent = i18n.t('debug_reset_progress');
    const btnDebugReset = document.getElementById('debug-reset-progress-btn');
    if (btnDebugReset) btnDebugReset.textContent = i18n.t('debug_reset_progress');

    // 8. Hoşgeldiniz, Rehber & Ayarlar Metinleri
    const welcomeTitle = document.getElementById('welcome-modal-title');
    if (welcomeTitle) welcomeTitle.textContent = i18n.t('welcome_title');
    const welcomeSub = document.getElementById('welcome-modal-sub');
    if (welcomeSub) welcomeSub.textContent = i18n.t('welcome_subtitle');
    const welcomeStartBtn = document.getElementById('welcome-start-tutorial-btn');
    if (welcomeStartBtn) welcomeStartBtn.textContent = i18n.t('welcome_start_tutorial');
    const welcomeSkipBtn = document.getElementById('welcome-skip-btn');
    if (welcomeSkipBtn) welcomeSkipBtn.textContent = i18n.t('welcome_skip');

    const lblTutorialOpen = document.getElementById('label-tutorial-open');
    if (lblTutorialOpen) lblTutorialOpen.textContent = i18n.t('tutorial_title');
    const replayBtn = document.getElementById('tutorial-replay-btn');
    if (replayBtn) replayBtn.textContent = i18n.t('tutorial_replay_btn');

    this._updateCharacterSubLabel();
    if (document.getElementById('tutorial-modal')?.classList.contains('show')) {
      this._updateTutorialStep();
    }

    // 9. Refresh inventory and hints
    this._populateInventory();
    if (this._lastHintsArgs) {
      this.populateHints(...this._lastHintsArgs);
    }
  }

  closeLeftDrawer() {
    const drawer = document.getElementById('left-drawer');
    const toggle = document.getElementById('drawer-toggle');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (toggle) {
        toggle.innerHTML = '<img src="./textures/ui/icon_codex.png" style="width: 20px; height: 20px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.onerror=null; this.outerHTML=\'<span style=\\\'font-size: 16px;\\\'>📜</span>\';"><span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">İPUCU</span>';
      }
    }
  }

  closeRightPanel() {
    const rightPanel = document.getElementById('right-panel');
    const rightToggle = document.getElementById('right-panel-toggle');
    const fullscreenBtn = document.getElementById('right-panel-fullscreen-btn');
    if (rightPanel && this.rightPanelState !== 'closed') {
      this.rightPanelState = 'closed';
      rightPanel.className = 'state-closed';
      if (rightToggle) {
        rightToggle.innerHTML = '<img src="./textures/ui/icon_discovery.png" style="width: 20px; height: 20px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.onerror=null; this.outerHTML=\'<span style=\\\'font-size: 16px;\\\'>🧭</span>\';"><span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">KEŞİF</span>';
      }
      if (fullscreenBtn) {
        fullscreenBtn.style.display = 'none';
      }
    }
  }

  _setupDrawerLogic() {
    const drawer = document.getElementById('left-drawer');
    const toggle = document.getElementById('drawer-toggle');

    toggle.addEventListener('click', () => {
      const willOpen = !drawer.classList.contains('open');
      if (willOpen) {
        this.closeRightPanel();
        drawer.classList.add('open');
        toggle.innerHTML = '<span style="font-size: 16px;">✕</span><span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px;">KAPAT</span>';
      } else {
        drawer.classList.remove('open');
        toggle.innerHTML = '<img src="./textures/ui/icon_codex.png" style="width: 20px; height: 20px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.onerror=null; this.outerHTML=\'<span style=\\\'font-size: 16px;\\\'>📜</span>\';"><span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">İPUCU</span>';
      }
    });

    // Sağ Panel (Keşfedilenler / Keşif Ekranı) Toggle & Tam Ekran Mantığı
    const rightPanel = document.getElementById('right-panel');
    const rightToggle = document.getElementById('right-panel-toggle');
    const fullscreenBtn = document.getElementById('right-panel-fullscreen-btn');

    if (rightToggle && rightPanel) {
      rightToggle.addEventListener('click', () => {
        if (this.rightPanelState === 'closed') {
          this.closeLeftDrawer();
          this.rightPanelState = 'wide';
          rightPanel.className = 'state-wide';
          rightToggle.innerHTML = '<span style="font-size: 14px;">✕</span><span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">KAPAT</span>';
          if (fullscreenBtn) {
            fullscreenBtn.style.display = 'flex';
            fullscreenBtn.innerHTML = '<span style="font-size: 14px;">⛶</span><span style="font-size: 7px; font-weight: 800; letter-spacing: 0.3px; line-height: 1;">TAM EKRAN</span>';
          }
          this._populateInventory();
        } else {
          this.closeRightPanel();
        }
      });
    }

    if (fullscreenBtn && rightPanel) {
      fullscreenBtn.addEventListener('click', () => {
        this.closeLeftDrawer();
        this.rightPanelState = 'fullscreen';
        rightPanel.className = 'state-fullscreen';
        fullscreenBtn.style.display = 'none';
        if (rightToggle) {
          rightToggle.innerHTML = '<span style="font-size: 16px;">✕</span><span style="font-size: 8px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">KAPAT</span>';
        }
        this._populateInventory();
      });
    }

    const modalCleanupBtn = document.getElementById('cleanup-btn');
    if (modalCleanupBtn) {
      modalCleanupBtn.addEventListener('click', () => {
        if (this.onCleanup) {
          this.onCleanup();
        }
      });
    }

    const bottomCleanupBtn = document.getElementById('bottom-cleanup-btn');
    if (bottomCleanupBtn) {
      bottomCleanupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        gsap.to(bottomCleanupBtn, {
          scale: 0.92,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            if (this.onCleanup) {
              this.onCleanup();
            }
          }
        });
      });
    }

    const charBtn = document.getElementById('character-switch-btn');
    if (charBtn) {
      charBtn.addEventListener('click', () => {
        const nextId = this._getNextCandidateCharacterId(this.currentCharacterId);
        if (!this.isCharacterUnlocked(nextId)) {
          const req = this.getCharacterRequiredCount(nextId);
          this.showToast(i18n.t('char_locked_msg', { count: req, current: this.unlockedItemCount }), 'warning');
          return;
        }

        this.currentCharacterId = nextId;
        charBtn.textContent = this._getCharacterLabel();
        this._updateCharacterSubLabel();

        if (this.onCharacterSwitch) {
          this.onCharacterSwitch(this.currentCharacterId);
        }
      });
    }

    document.getElementById('close-ad-btn').addEventListener('click', () => {
      document.getElementById('ad-modal').style.display = 'none';
    });
  }

  _setupMusicToggle() {
    const musicBtn = document.getElementById('music-toggle-btn');
    if (!musicBtn) return;

    musicBtn.addEventListener('click', () => {
      if (this.onMusicToggle) {
        this.musicMode = this.onMusicToggle();
      } else {
        if (this.musicMode === 1) this.musicMode = 2;
        else if (this.musicMode === 2) this.musicMode = 3;
        else if (this.musicMode === 3) this.musicMode = 0;
        else this.musicMode = 1;
      }

      musicBtn.classList.toggle('muted', this.musicMode === 0);
      musicBtn.textContent = this._getMusicButtonLabel();
    });
  }

  _setupSettingsLogic() {
    const modal = document.getElementById('settings-modal');
    const openBtn = document.getElementById('settings-open-btn');
    const closeBtn = document.getElementById('settings-close-btn');

    if (openBtn && modal) {
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        gsap.to(openBtn, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 });
        modal.classList.add('show');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.classList.remove('show');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      });
    }


    // Sekmeler
    const tabGeneralBtn = document.getElementById('tab-general-btn');
    const tabCreditsBtn = document.getElementById('tab-credits-btn');
    const tabDebugBtn = document.getElementById('tab-debug-btn');
    const paneGeneral = document.getElementById('pane-general');
    const paneCredits = document.getElementById('pane-credits');
    const paneDebug = document.getElementById('pane-debug');

    const switchTab = (activeTab) => {
      tabGeneralBtn?.classList.toggle('active', activeTab === 'general');
      tabCreditsBtn?.classList.toggle('active', activeTab === 'credits');
      tabDebugBtn?.classList.toggle('active', activeTab === 'debug');

      if (paneGeneral) paneGeneral.style.display = activeTab === 'general' ? 'flex' : 'none';
      if (paneCredits) paneCredits.style.display = activeTab === 'credits' ? 'flex' : 'none';
      if (paneDebug) paneDebug.style.display = activeTab === 'debug' ? 'flex' : 'none';
    };

    tabGeneralBtn?.addEventListener('click', () => switchTab('general'));
    tabCreditsBtn?.addEventListener('click', () => switchTab('credits'));
    tabDebugBtn?.addEventListener('click', () => switchTab('debug'));

    // Debug butonları
    // 1. Sınırsız İpucu
    const infHintsBtn = document.getElementById('debug-infinite-hints-btn');
    if (infHintsBtn) {
      infHintsBtn.addEventListener('click', () => {
        this.infiniteHintsEnabled = !this.infiniteHintsEnabled;
        if (this.debugHandlers.onSetInfiniteHints) {
          this.debugHandlers.onSetInfiniteHints(this.infiniteHintsEnabled);
        }
        infHintsBtn.classList.toggle('active', this.infiniteHintsEnabled);
        infHintsBtn.textContent = this.infiniteHintsEnabled 
          ? (i18n.currentLang === 'tr' ? 'Açık (Sınırsız)' : 'Enabled (Unlimited)')
          : (i18n.currentLang === 'tr' ? 'Aktif Et' : 'Enable');
      });
    }

    // 2. Tüm Tarifleri / Eşyaları Aç
    const unlockAllBtn = document.getElementById('debug-unlock-all-btn');
    if (unlockAllBtn) {
      unlockAllBtn.addEventListener('click', () => {
        if (this.debugHandlers.onUnlockAll) {
          this.debugHandlers.onUnlockAll();
        }
        alert(i18n.t('debug_all_unlocked_msg'));
      });
    }

    // 3. Tüm İpuçlarını Çöz
    const revealHintsBtn = document.getElementById('debug-reveal-hints-btn');
    if (revealHintsBtn) {
      revealHintsBtn.addEventListener('click', () => {
        if (this.debugHandlers.onRevealAllHints) {
          this.debugHandlers.onRevealAllHints();
        }
        alert(i18n.t('debug_all_hints_revealed_msg'));
      });
    }

    // 4. 4 Temel Elementi Masaya Koy
    const spawnBasicsBtn = document.getElementById('debug-spawn-basics-btn');
    if (spawnBasicsBtn) {
      spawnBasicsBtn.addEventListener('click', () => {
        if (this.debugHandlers.onSpawnBasics) {
          this.debugHandlers.onSpawnBasics();
        }
        modal.classList.remove('show');
      });
    }

    // 5. FPS Sayacı Toggle
    const fpsToggleBtn = document.getElementById('debug-fps-toggle-btn');
    const fpsHud = document.getElementById('fps-counter-hud');
    if (fpsToggleBtn) {
      fpsToggleBtn.addEventListener('click', () => {
        this.fpsHudEnabled = !this.fpsHudEnabled;
        if (fpsHud) {
          fpsHud.style.display = this.fpsHudEnabled ? 'block' : 'none';
        }
        fpsToggleBtn.classList.toggle('active', this.fpsHudEnabled);
        fpsToggleBtn.textContent = this.fpsHudEnabled
          ? (i18n.currentLang === 'tr' ? 'Açık' : 'ON')
          : (i18n.currentLang === 'tr' ? 'Kapalı' : 'OFF');
        if (this.debugHandlers.onToggleFps) {
          this.debugHandlers.onToggleFps(this.fpsHudEnabled);
        }
      });
    }

    // 6. İlerlemeyi Sıfırla
    const resetBtn = document.getElementById('debug-reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm(i18n.t('debug_reset_confirm'))) {
          if (this.debugHandlers.onResetProgress) {
            this.debugHandlers.onResetProgress();
          }
          modal.classList.remove('show');
        }
      });
    }
  }

  updateFpsHud(fps, sceneObjectCount = 0) {
    if (!this.fpsHudEnabled) return;
    const hud = document.getElementById('fps-counter-hud');
    if (hud) {
      hud.textContent = `FPS: ${fps} | Nesne: ${sceneObjectCount}`;
    }
  }

  _setupInventoryControls() {
    const filterBtn = document.getElementById('filter-btn');
    const sortBtn = document.getElementById('sort-btn');

    const filters = [
      'all',
      '01_elements',
      '02_doga',
      '03_canlilar',
      '04_zanaat_ve_aletler',
      '05_maden_ve_materyaller',
      '06_yemek_ve_tarim',
      '07_bilim_ve_teknoloji',
      '08_mistik_ve_evren'
    ];

    filterBtn.addEventListener('click', () => {
      const idx = filters.indexOf(this.filterCategory);
      this.filterCategory = filters[(idx + 1) % filters.length];
      filterBtn.textContent = this._getFilterLabel(this.filterCategory);
      this._populateInventory();
    });

    const sorts = ['discovery', 'category'];

    sortBtn.addEventListener('click', () => {
      const idx = sorts.indexOf(this.sortMode);
      this.sortMode = sorts[(idx + 1) % sorts.length];
      sortBtn.textContent = this._getSortLabel(this.sortMode);
      this._populateInventory();
    });

    const searchInput = document.getElementById('item-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this._populateInventory();
      });
    }
  }

  updateHintRights(rights) {
    this._lastHintRights = rights;
    const badge = document.getElementById('hint-rights-badge');
    if (badge) badge.textContent = i18n.t('hint_rights', { n: rights });
  }

  _getCharacterLabel(characterId = this.currentCharacterId) {
    if (characterId === 'character3') return i18n.t('char_wanderer');
    if (characterId === 'character2') return i18n.t('char_observer');
    return i18n.t('char_apprentice');
  }

  isCharacterUnlocked(characterId) {
    if (characterId === 'character1') return true;
    if (characterId === 'character2') return this.unlockedItemCount >= 40;
    if (characterId === 'character3') return subscriptionManager.isGrandmaster() || this.gameMode === 'grandmaster';
    return false;
  }

  getCharacterRequiredCount(characterId) {
    if (characterId === 'character2') return 40;
    if (characterId === 'character3') return 80;
    return 0;
  }

  _getNextCandidateCharacterId(currentId = this.currentCharacterId) {
    const chars = ['character1', 'character2', 'character3'];
    const idx = chars.indexOf(currentId);
    return chars[(idx + 1) % chars.length];
  }

  _getNextCharacterId(currentId = this.currentCharacterId) {
    const chars = ['character1', 'character2', 'character3'];
    const idx = chars.indexOf(currentId);
    for (let i = 1; i <= chars.length; i++) {
      const candidate = chars[(idx + i) % chars.length];
      if (this.isCharacterUnlocked(candidate)) {
        return candidate;
      }
    }
    return 'character1';
  }

  _updateCharacterSubLabel() {
    const subEl = document.getElementById('sub-character');
    if (!subEl) return;
    const c2Unlocked = this.isCharacterUnlocked('character2');
    const c3Unlocked = this.isCharacterUnlocked('character3');

    if (!c2Unlocked && !c3Unlocked) {
      subEl.textContent = i18n.currentLang === 'tr'
        ? `Gözlemci (🔒 40 Eşya: ${this.unlockedItemCount}/40), Gezgin (🔒 Grandmaster)`
        : `Observer (🔒 40 Items: ${this.unlockedItemCount}/40), Wanderer (🔒 Grandmaster)`;
    } else if (!c3Unlocked) {
      subEl.textContent = i18n.currentLang === 'tr'
        ? `Gözlemci (Açık), Gezgin (🔒 Grandmaster Aboneliği)`
        : `Observer (Unlocked), Wanderer (🔒 Grandmaster Subscription)`;
    } else {
      subEl.textContent = i18n.currentLang === 'tr'
        ? 'Tüm karakterlerin kilidi açık!'
        : 'All characters unlocked!';
    }
  }

  setUnlockedItemCount(count) {
    this.unlockedItemCount = count;
    this._updateCharacterSubLabel();

    // Rehber modalındaki 5. adım açık ise oradaki kartları da güncelle
    const tutCardChar2 = document.getElementById('tut-card-char2');
    const tutCardChar3 = document.getElementById('tut-card-char3');
    if (tutCardChar2) {
      const unl = this.isCharacterUnlocked('character2');
      tutCardChar2.className = `tutorial-char-card ${unl ? 'unlocked' : 'locked'}`;
      tutCardChar2.querySelector('.tutorial-char-badge').className = `tutorial-char-badge ${unl ? 'badge-unlocked' : 'badge-locked'}`;
      tutCardChar2.querySelector('.tutorial-char-badge').textContent = unl ? 'Açık' : '🔒 40 Eşya';
    }
    if (tutCardChar3) {
      const unl = this.isCharacterUnlocked('character3');
      tutCardChar3.className = `tutorial-char-card ${unl ? 'unlocked' : 'locked'}`;
      tutCardChar3.querySelector('.tutorial-char-badge').className = `tutorial-char-badge ${unl ? 'badge-unlocked' : 'badge-locked'}`;
      tutCardChar3.querySelector('.tutorial-char-badge').textContent = unl ? 'Açık' : '🔒 Grandmaster';
    }
  }

  updateCharacterButton(characterId) {
    this.currentCharacterId = characterId;
    const charBtn = document.getElementById('character-switch-btn');
    if (charBtn) {
      charBtn.textContent = this._getCharacterLabel(characterId);
    }
    this._updateCharacterSubLabel();
  }

  populateHints(discoveredItems, lockedItems, hintSystem) {
    this._lastHintsArgs = [discoveredItems, lockedItems, hintSystem];
    const list = document.getElementById('drawer-hints-list');
    list.innerHTML = '';

    const craftableItems = hintSystem.getCraftableLockedItems(discoveredItems, lockedItems);

    if (craftableItems.length === 0) {
      list.innerHTML = `<p style="text-align: center; color: #94a3b8; font-size: 12px; padding: 10px;">${i18n.t('hint_no_craftable')}</p>`;
      return;
    }

    craftableItems.forEach(itemId => {
      const def = ITEM_DEFINITIONS[itemId];
      if (!def) return;

      const localizedName = i18n.getItemName(itemId, def.name);
      const hintObj = hintSystem.getHint(itemId);
      const canUse = hintSystem.canUseHint(itemId);
      const isNamed = hintObj.level > 0;

      const card = document.createElement('div');
      card.className = 'locked-item-card';
      card.style.display = 'flex';
      card.style.alignItems = 'flex-start';
      card.style.gap = '10px';

      // İpucu açılmamışsa renksiz siyah siluet, ancak formu/şekli net seçilsin diye açık zemin ve dış hat konturu
      const iconFilter = isNamed
        ? 'none'
        : 'brightness(0) drop-shadow(0 0 1px rgba(255,255,255,0.95)) drop-shadow(0 0 3px rgba(212,163,89,0.5))';
      const iconShadow = isNamed
        ? `0 0 10px ${def.colorPalette?.primary || '#38bdf8'}`
        : 'inset 0 1px 3px rgba(0,0,0,0.6), 0 0 8px rgba(255,255,255,0.08)';
      const iconBg = isNamed
        ? 'rgba(255,255,255,0.12)'
        : 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)';
      const iconBorder = isNamed
        ? `1px solid ${def.colorPalette?.primary ? def.colorPalette.primary + '66' : 'rgba(255,255,255,0.2)'}`
        : '1px solid rgba(255,255,255,0.22)';

      const canonicalId = getCanonicalId(itemId) || itemId;
      const iconHtml = `<img src="./textures/items/${canonicalId}.png" class="item-img-icon" alt="${localizedName}" style="filter: ${iconFilter}; width: 28px; height: 28px; object-fit: contain;" onerror="this.onerror=null; this.parentNode.innerHTML='<span style=\\'filter: ${iconFilter};\\'>${def.icon || '✨'}</span>';">`;

      card.innerHTML = `
        <div class="icon-symbol" style="width: 38px; height: 38px; border-radius: 9px; background: ${iconBg}; border: ${iconBorder}; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: ${iconShadow}; flex-shrink: 0; margin-top: 2px;">${iconHtml}</div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 13px; color: #f8fafc; margin-bottom: 2px;">${isNamed ? localizedName : '???'}</h4>
          <p style="font-size: 11px; color: #94a3b8; margin-bottom: 6px; line-height: 1.4;">${hintObj.text}</p>
          ${canUse ? `<button class="hint-btn" data-id="${itemId}">${i18n.t('hint_get')}</button>` : `<span style="font-size:11px; color:#10b981; font-weight:600;">${i18n.t('hint_opened')}</span>`}
        </div>
      `;

      const btn = card.querySelector('.hint-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const result = this.onGetHint(itemId);
          if (result && result.needsAd) {
            const adModal = document.getElementById('ad-modal');
            adModal.style.display = 'flex';

            const watchBtn = document.getElementById('watch-ad-btn');
            const newWatchBtn = watchBtn.cloneNode(true);
            watchBtn.parentNode.replaceChild(newWatchBtn, watchBtn);

            newWatchBtn.addEventListener('click', () => {
              adModal.style.display = 'none';
              this.onWatchAd(itemId);
            });
          }
        });
      }

      list.appendChild(card);
    });
  }

  _populateInventory(itemIds) {
    if (itemIds) {
      this.lastItemIds = itemIds;
    }
    const targetIds = this.lastItemIds || [];

    // İlerleme çubuğunu güncelle
    const isGm = subscriptionManager.isGrandmaster() || this.gameMode === 'grandmaster';
    const prog = FreeTierManager.getProgression(targetIds, isGm);
    const invProgressText = document.getElementById('inv-progress-text');
    const invProgressFill = document.getElementById('inv-progress-fill');
    const gmBadgeBtn = document.getElementById('grandmaster-open-badge-btn');

    if (invProgressText) {
      invProgressText.textContent = i18n.t('free_progress_label', {
        current: prog.current,
        max: prog.max,
        pct: prog.percentage
      });
    }
    if (invProgressFill) {
      invProgressFill.style.width = `${prog.percentage}%`;
    }
    if (gmBadgeBtn) {
      gmBadgeBtn.textContent = isGm ? i18n.t('sub_active_badge') : '🔮 Grandmaster';
    }

    // Filter
    let filtered = targetIds.filter(id => {
      const def = ITEM_DEFINITIONS[id];
      if (!def) return false;
      const localizedName = i18n.getItemName(id, def.name);

      // Search Query filter
      if (this.searchQuery) {
        const query = this.searchQuery;
        const nameMatches = localizedName.toLowerCase().includes(query) || (def.name || '').toLowerCase().includes(query);
        if (!nameMatches) {
          return false;
        }
      }

      if (this.filterCategory !== 'all') {
        const cat = def.category;
        if (cat !== this.filterCategory) {
          return false;
        }
      }
      return true;
    });

    // Sort
    if (this.sortMode === 'category') {
      const catOrder = {
        '01_elements': 1,
        '02_doga': 2,
        '03_canlilar': 3,
        '04_zanaat_ve_aletler': 4,
        '05_maden_ve_materyaller': 5,
        '06_yemek_ve_tarim': 6,
        '07_bilim_ve_teknoloji': 7,
        '08_mistik_ve_evren': 8
      };
      filtered.sort((a, b) => {
        const catA = catOrder[ITEM_DEFINITIONS[a]?.category] || 99;
        const catB = catOrder[ITEM_DEFINITIONS[b]?.category] || 99;
        if (catA !== catB) return catA - catB;
        return 0;
      });
    }

    const container = document.getElementById('inv-items-container') || document.getElementById('right-panel');
    container.innerHTML = '';

    filtered.forEach(id => {
      const canonicalId = getCanonicalId(id) || id;
      const def = ITEM_DEFINITIONS[canonicalId] || ITEM_DEFINITIONS[id];
      if (!def) return;
      const localizedName = i18n.getItemName(canonicalId, def.name);

      // Formül hesaplama (Geniş ekranda parantez içinde görünür)
      let formulaHtml = '';
      if (this.rightPanelState === 'wide') {
        const recipeInputs = (this.gameMode === 'grandmaster' && def.trioRecipes && def.trioRecipes.length > 0)
          ? def.trioRecipes[0]
          : (def.recipe?.inputs || []);

        if (recipeInputs && recipeInputs.length > 0) {
          const parts = recipeInputs.map(inpId => {
            const canonicalInpId = getCanonicalId(inpId) || inpId;
            const inpDef = ITEM_DEFINITIONS[canonicalInpId] || ITEM_DEFINITIONS[inpId];
            return i18n.getItemName(canonicalInpId, inpDef?.name || inpId);
          });
          formulaHtml = `<span class="item-formula">(${parts.join(' + ')})</span>`;
        } else {
          formulaHtml = `<span class="item-formula">(${i18n.currentLang === 'tr' ? 'Temel' : 'Base'})</span>`;
        }
      }


      const btn = document.createElement('div');
      btn.className = 'item-icon-btn';
      btn.title = localizedName;
      btn.innerHTML = `
        <div class="icon-symbol" style="font-size: 18px; margin-bottom: 2px; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.08); box-shadow: 0 0 8px ${def.colorPalette?.primary || '#38bdf8'};">
          <img src="./textures/items/${canonicalId}.png" class="item-img-icon" alt="${localizedName}" onerror="this.onerror=null; this.parentNode.innerHTML='${def.icon || '✨'}';">
        </div>
        <span class="item-label" style="font-size: 9.5px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%; font-weight: 700; color: #f1f5f9;">${localizedName}</span>
        ${formulaHtml}
      `;

      btn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
      });

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        gsap.to(btn, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 });
        if (this.onItemSelect) {
          this.onItemSelect(id);
        }
      });

      container.appendChild(btn);
    });
  }

  showDiscoveryAnnouncement(itemId) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def) return;

    const banner = document.getElementById('discovery-banner');
    const iconEl = document.getElementById('discovery-icon');
    const titleEl = document.getElementById('discovery-title');
    const descEl = document.getElementById('discovery-desc');

    if (!banner || !iconEl || !titleEl || !descEl) return;

    const canonicalId = getCanonicalId(itemId) || itemId;
    const localizedName = i18n.getItemName(canonicalId, def.name);
    const localizedDesc = i18n.getItemDescription(canonicalId, def.description);

    // Simge ve görsel
    iconEl.innerHTML = `<img src="./textures/items/${canonicalId}.png" class="item-img-icon" alt="${localizedName}" onerror="this.onerror=null; this.parentNode.innerHTML='<span style=\\'font-weight:700; font-size:16px; color:#cbd5e1;\\'>${localizedName ? localizedName[0].toUpperCase() : ''}</span>';">`;
    if (def.colorPalette?.primary) {
      iconEl.style.boxShadow = `0 0 16px ${def.colorPalette.primary}`;
    }

    // Başlık ve açıklama
    titleEl.innerHTML = `${i18n.t('discovery_title')}: <span style="color: #67e8f9; margin-left: 4px;">"${localizedName}"</span>`;
    descEl.textContent = localizedDesc;

    // Önceki zamanlayıcı varsa temizle
    if (this._discoveryTimeout) {
      clearTimeout(this._discoveryTimeout);
    }

    // Göster ve animasyon tetikle
    banner.classList.add('show');

    // 4 saniye sonra yumuşakça gizle
    this._discoveryTimeout = setTimeout(() => {
      banner.classList.remove('show');
    }, 4200);
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('alchemy-toast');
    if (!toast) return;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }

    toast.className = 'show ' + (type || 'info');
    toast.textContent = message;

    this.toastTimeout = setTimeout(() => {
      toast.className = '';
      this.toastTimeout = null;
    }, 2200);
  }

  /* =================================================== */
  /* REHBER (TUTORIAL) & HOŞGELDİNİZ METODLARI           */
  /* =================================================== */
  _setupTutorialLogic() {
    // Hoşgeldiniz Modal Butonları
    const welcomeStartBtn = document.getElementById('welcome-start-tutorial-btn');
    const welcomeSkipBtn = document.getElementById('welcome-skip-btn');

    welcomeStartBtn?.addEventListener('click', () => {
      this.closeWelcomeModal();
      this.startTutorial();
    });

    welcomeSkipBtn?.addEventListener('click', () => {
      this.closeWelcomeModal();
      localStorage.setItem('alchemy_welcome_seen', 'true');
    });

    // Rehber Modal Butonları
    const tutCloseBtn = document.getElementById('tutorial-close-btn');
    const tutPrevBtn = document.getElementById('tutorial-prev-btn');
    const tutNextBtn = document.getElementById('tutorial-next-btn');

    tutCloseBtn?.addEventListener('click', () => {
      this.closeTutorial();
      localStorage.setItem('alchemy_welcome_seen', 'true');
    });

    tutPrevBtn?.addEventListener('click', () => {
      if (this.currentTutorialStep > 1) {
        this.currentTutorialStep--;
        this._updateTutorialStep();
      }
    });

    tutNextBtn?.addEventListener('click', () => {
      if (this.currentTutorialStep < this.totalTutorialSteps) {
        this.currentTutorialStep++;
        this._updateTutorialStep();
      } else {
        this.closeTutorial();
        localStorage.setItem('alchemy_welcome_seen', 'true');
      }
    });

    // Ayarlar sekmesindeki rehberi tekrar aç butonu
    const replayBtn = document.getElementById('tutorial-replay-btn');
    replayBtn?.addEventListener('click', () => {
      const settingsModal = document.getElementById('settings-modal');
      settingsModal?.classList.remove('show');
      this.startTutorial();
    });

    // Karakter Kilit Açılış Kutlama Modalını Kapat
    const celCloseBtn = document.getElementById('celebrate-close-btn');
    celCloseBtn?.addEventListener('click', () => {
      const modal = document.getElementById('char-unlock-modal');
      modal?.classList.remove('show');
    });
  }

  showWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    if (modal) modal.classList.add('show');
  }

  closeWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    if (modal) modal.classList.remove('show');
  }

  startTutorial() {
    this.currentTutorialStep = 1;
    const modal = document.getElementById('tutorial-modal');
    if (modal) modal.classList.add('show');
    this._updateTutorialStep();
  }

  closeTutorial() {
    const modal = document.getElementById('tutorial-modal');
    if (modal) modal.classList.remove('show');
    this._hideTutorialPointer();
    this._clearTutorialHighlights();
  }

  _updateTutorialStep() {
    const cardBox = document.getElementById('tutorial-card-box');
    const stepTag = document.getElementById('tutorial-step-tag');
    const progressBar = document.getElementById('tutorial-progress-bar');
    const stepIcon = document.getElementById('tutorial-step-icon');
    const stepTitle = document.getElementById('tutorial-step-title-text');
    const stepDesc = document.getElementById('tutorial-step-desc-text');
    const charsContainer = document.getElementById('tutorial-chars-container');
    const prevBtn = document.getElementById('tutorial-prev-btn');
    const nextBtn = document.getElementById('tutorial-next-btn');

    this._clearTutorialHighlights();

    if (stepTag) stepTag.textContent = i18n.t('tutorial_step', { current: this.currentTutorialStep, total: this.totalTutorialSteps });
    if (progressBar) progressBar.style.width = `${(this.currentTutorialStep / this.totalTutorialSteps) * 100}%`;
    if (prevBtn) prevBtn.style.visibility = this.currentTutorialStep > 1 ? 'visible' : 'hidden';
    if (nextBtn) nextBtn.textContent = this.currentTutorialStep === this.totalTutorialSteps ? i18n.t('tutorial_finish') : i18n.t('tutorial_next');

    if (charsContainer) charsContainer.style.display = 'none';

    switch (this.currentTutorialStep) {
      case 1:
        // Çanta menüsü sağda: Kutucuk altta durur
        if (cardBox) cardBox.className = 'tutorial-card pos-bottom';
        if (stepIcon) stepIcon.textContent = '🎒';
        if (stepTitle) stepTitle.textContent = i18n.t('tutorial_step1_title');
        if (stepDesc) stepDesc.textContent = i18n.t('tutorial_step1_desc');
        this._pointToElement('#right-panel-toggle', 'right');
        break;

      case 2:
        // Birleştir butonu altta: Kutucuk yukarı çekilir, buton ve ok rahat görünür
        if (cardBox) cardBox.className = 'tutorial-card pos-top';
        if (stepIcon) stepIcon.textContent = '⚡';
        if (stepTitle) stepTitle.textContent = i18n.t('tutorial_step2_title');
        if (stepDesc) stepDesc.textContent = i18n.t('tutorial_step2_desc');
        this._pointToElement('#craft-action-btn', 'down', true);
        break;

      case 3:
        // Masadaki tabaklar ekran ortasında: Kutucuk aşağı çekilir, tabaklar açıkta kalır
        if (cardBox) cardBox.className = 'tutorial-card pos-bottom';
        if (stepIcon) stepIcon.textContent = '🍽️';
        if (stepTitle) stepTitle.textContent = i18n.t('tutorial_step3_title');
        if (stepDesc) stepDesc.textContent = i18n.t('tutorial_step3_desc');
        this._pointToCenterTable();
        break;

      case 4:
        // Ayarlar butonu sol altta: Kutucuk yukarı çekilir, ayarlar butonu açıkta kalır
        if (cardBox) cardBox.className = 'tutorial-card pos-top';
        if (stepIcon) stepIcon.textContent = '⚙️';
        if (stepTitle) stepTitle.textContent = i18n.t('tutorial_step4_title');
        if (stepDesc) stepDesc.textContent = i18n.t('tutorial_step4_desc');
        this._pointToElement('#settings-open-btn', 'down');
        break;

      case 5:
        // Karakter kilitleri: Kutucuk ekran ortasında veya altında dengeli konumlanır
        if (cardBox) cardBox.className = 'tutorial-card pos-bottom';
        if (stepIcon) stepIcon.textContent = '🧙';
        if (stepTitle) stepTitle.textContent = i18n.t('tutorial_step5_title');
        if (stepDesc) stepDesc.textContent = i18n.t('tutorial_step5_desc');
        if (charsContainer) charsContainer.style.display = 'grid';
        this._hideTutorialPointer();
        break;
    }
  }

  _pointToElement(selector, direction = 'down', forceVisible = false) {
    const el = document.querySelector(selector);
    const arrow = document.getElementById('tutorial-pointer-arrow');
    if (!arrow) return;

    if (!el) {
      this._hideTutorialPointer();
      return;
    }

    let wasHidden = false;
    if (forceVisible && el.style.display === 'none') {
      el.style.display = 'flex';
      wasHidden = true;
    }

    el.classList.add('tutorial-element-highlight');
    this._highlightedElement = el;
    this._highlightedWasHidden = wasHidden;

    const rect = el.getBoundingClientRect();
    arrow.style.display = 'flex';
    arrow.className = '';

    if (direction === 'right') {
      const left = Math.max(10, rect.left - 54);
      const top = rect.top + (rect.height / 2) - 24;
      arrow.style.left = `${left}px`;
      arrow.style.top = `${top}px`;
      arrow.style.transform = 'rotate(-90deg)';
      arrow.classList.add('arrow-bounce-right');
    } else if (direction === 'down') {
      const left = rect.left + (rect.width / 2) - 24;
      const top = Math.max(10, rect.top - 54);
      arrow.style.left = `${left}px`;
      arrow.style.top = `${top}px`;
      arrow.style.transform = 'rotate(0deg)';
      arrow.classList.add('arrow-bounce-down');
    } else if (direction === 'up') {
      const left = rect.left + (rect.width / 2) - 24;
      const top = rect.bottom + 10;
      arrow.style.left = `${left}px`;
      arrow.style.top = `${top}px`;
      arrow.style.transform = 'rotate(180deg)';
      arrow.classList.add('arrow-bounce-down');
    }
  }

  _pointToCenterTable() {
    const arrow = document.getElementById('tutorial-pointer-arrow');
    if (!arrow) return;
    arrow.style.display = 'flex';
    arrow.className = '';
    const left = (window.innerWidth / 2) - 24;
    const top = (window.innerHeight * 0.42) - 24;
    arrow.style.left = `${left}px`;
    arrow.style.top = `${top}px`;
    arrow.style.transform = 'rotate(0deg)';
    arrow.classList.add('arrow-pulse-center');
  }

  _hideTutorialPointer() {
    const arrow = document.getElementById('tutorial-pointer-arrow');
    if (arrow) arrow.style.display = 'none';
  }

  _clearTutorialHighlights() {
    if (this._highlightedElement) {
      this._highlightedElement.classList.remove('tutorial-element-highlight');
      if (this._highlightedWasHidden) {
        this._highlightedElement.style.display = 'none';
        this._highlightedWasHidden = false;
      }
      this._highlightedElement = null;
    }
    document.querySelectorAll('.tutorial-element-highlight').forEach(el => {
      el.classList.remove('tutorial-element-highlight');
    });
  }

  showCharacterUnlockCelebration(characterId) {
    const modal = document.getElementById('char-unlock-modal');
    const titleEl = document.getElementById('celebrate-title');
    const descEl = document.getElementById('celebrate-desc');
    if (!modal || !titleEl || !descEl) return;

    const charName = this._getCharacterLabel(characterId);
    const req = this.getCharacterRequiredCount(characterId);

    titleEl.textContent = i18n.currentLang === 'tr' ? '🎉 YENİ KARAKTER AÇILDI!' : '🎉 NEW CHARACTER UNLOCKED!';
    descEl.textContent = i18n.t('char_unlocked_celebration', { count: req, name: charName });
    modal.classList.add('show');
    this.setUnlockedItemCount(this.unlockedItemCount);
  }

  /* =================================================== */
  /* BAŞARIMLAR, KOLEKSİYONLAR & GRANDMASTER ABONELİK    */
  /* =================================================== */
  _setupAchievementsLogic() {
    const openBtn = document.getElementById('achievements-open-btn');
    const closeBtn = document.getElementById('achievements-close-btn');
    const modal = document.getElementById('achievements-modal');

    openBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showAchievementsModal();
    });

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      modal?.classList.remove('show');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });

    // Sekmeler
    const tabBadgesBtn = document.getElementById('tab-achieve-badges-btn');
    const tabColBtn = document.getElementById('tab-achieve-collections-btn');
    const paneBadges = document.getElementById('pane-achieve-badges');
    const paneCol = document.getElementById('pane-achieve-collections');

    tabBadgesBtn?.addEventListener('click', () => {
      tabBadgesBtn.classList.add('active');
      tabColBtn?.classList.remove('active');
      if (paneBadges) paneBadges.style.display = 'block';
      if (paneCol) paneCol.style.display = 'none';
      this._renderBadges();
    });

    tabColBtn?.addEventListener('click', () => {
      tabColBtn.classList.add('active');
      tabBadgesBtn?.classList.remove('active');
      if (paneBadges) paneBadges.style.display = 'none';
      if (paneCol) paneCol.style.display = 'block';
      this._renderCollections();
    });

    // Rozet açılma dinleyicisi
    achievementManager.onBadgeUnlocked((newBadges) => {
      newBadges.forEach(badge => {
        this.showBadgeUnlockedCelebration(badge);
      });
      this.updateAchievementsUI();
    });
  }

  showAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (!modal) return;
    modal.classList.add('show');
    this._renderBadges();
    this._renderCollections();
  }

  _renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;
    container.innerHTML = '';

    const badges = achievementManager.getBadges();
    badges.forEach(badge => {
      const card = document.createElement('div');
      card.className = `badge-row-card ${badge.isUnlocked ? 'unlocked' : ''}`;
      const title = i18n.currentLang === 'tr' ? badge.titleTr : badge.titleEn;
      const desc = i18n.currentLang === 'tr' ? badge.descTr : badge.descEn;

      card.innerHTML = `
        <div style="font-size: 24px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.06); border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); flex-shrink: 0;">
          ${badge.icon}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
            <h4 style="font-size: 13px; font-weight: 800; color: ${badge.isUnlocked ? '#4ade80' : '#fef08a'}; margin: 0;">${title}</h4>
            <span style="font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px; ${badge.isUnlocked ? 'background: rgba(34,197,94,0.25); color: #4ade80;' : 'background: rgba(255,255,255,0.1); color: #94a3b8;'}">
              ${badge.isUnlocked ? (i18n.currentLang === 'tr' ? 'KAZANILDI' : 'UNLOCKED') : (i18n.currentLang === 'tr' ? 'KİLİTLİ' : 'LOCKED')}
            </span>
          </div>
          <p style="font-size: 11px; color: #94a3b8; margin: 4px 0 0 0; line-height: 1.4;">${desc}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  _renderCollections() {
    const container = document.getElementById('collections-container');
    if (!container) return;
    container.innerHTML = '';

    const cols = achievementManager.getCollectionsProgress(this.lastItemIds || []);
    cols.forEach(col => {
      const card = document.createElement('div');
      card.className = 'col-card-box';

      const chipsHtml = col.items.map(it => `
        <div class="col-item-chip ${it.isOwned ? 'owned' : ''}" title="${it.name}">
          <span>${it.isOwned ? it.icon : '🔒'}</span>
          <span>${it.isOwned ? it.name : '???'}</span>
        </div>
      `).join('');

      card.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 800; color: #f1f5f9;">
            <span>${col.icon}</span>
            <span>${col.title}</span>
          </div>
          <span style="font-size: 11px; font-weight: 800; color: ${col.isComplete ? '#4ade80' : '#fde047'};">
            ${col.collected} / ${col.total} (${col.percentage}%)
          </span>
        </div>
        <div class="inv-progress-track">
          <div class="inv-progress-fill" style="width: ${col.percentage}%;"></div>
        </div>
        <div class="col-chips-row">
          ${chipsHtml}
        </div>
      `;
      container.appendChild(card);
    });
  }

  showBadgeUnlockedCelebration(badge) {
    const title = i18n.currentLang === 'tr' ? badge.titleTr : badge.titleEn;
    const desc = i18n.currentLang === 'tr' ? badge.descTr : badge.descEn;
    this.showToast(`🏆 ROZET KAZANILDI: "${title}" - ${desc}`, 'success');
  }

  updateAchievementsUI() {
    if (document.getElementById('achievements-modal')?.classList.contains('show')) {
      this._renderBadges();
      this._renderCollections();
    }
  }

  _setupGrandmasterOfferLogic() {
    const gmModal = document.getElementById('grandmaster-offer-modal');
    const closeBtn = document.getElementById('gm-offer-close-btn');
    const openBadgeBtn = document.getElementById('grandmaster-open-badge-btn');
    const restoreBtn = document.getElementById('gm-restore-btn');

    openBadgeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showGrandmasterOfferModal('badge_click');
    });

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      gmModal?.classList.remove('show');
    });

    gmModal?.addEventListener('click', (e) => {
      if (e.target === gmModal) gmModal.classList.remove('show');
    });

    // Plan butonları
    const planCards = gmModal?.querySelectorAll('.gm-plan-card');
    planCards?.forEach(card => {
      card.addEventListener('click', async (e) => {
        e.stopPropagation();
        const planId = card.getAttribute('data-plan') || 'intro_monthly';
        const res = await subscriptionManager.subscribe(planId);
        if (res.success) {
          gmModal.classList.remove('show');
          achievementManager.unlockBadge('badge_grandmaster_unlocked');
          this.showToast(i18n.currentLang === 'tr' ? '👑 Grandmaster aboneliğiniz aktif edildi! Hoş geldiniz!' : '👑 Grandmaster active! Welcome!', 'success');
          this._populateInventory();
          if (this.onModeSwitch && this.gameMode !== 'grandmaster') {
            this.onModeSwitch('grandmaster');
          }
        }
      });
    });

    restoreBtn?.addEventListener('click', () => {
      this.showToast(i18n.currentLang === 'tr' ? 'Satın alımlar başarıyla kontrol edildi ve güncellendi.' : 'Purchases restored successfully.', 'info');
    });
  }

  showGrandmasterOfferModal(reason = 'classic_complete') {
    const modal = document.getElementById('grandmaster-offer-modal');
    if (!modal) return;
    const titleEl = document.getElementById('gm-modal-title');
    const subEl = document.getElementById('gm-modal-subtitle');

    if (reason === 'classic_complete') {
      if (titleEl) titleEl.textContent = i18n.currentLang === 'tr' ? '🎉 KLASİK MOD TAMAMLANDI!' : '🎉 CLASSIC REALM COMPLETED!';
      if (subEl) subEl.textContent = i18n.currentLang === 'tr'
        ? 'Tebrikler Simyacı! 80 eşyayı eksiksiz çözdün. Şimdi 3\'lü kombinasyonlar ve 521 eşyanın kadim evrenine geçiş yapma zamanı!'
        : 'Congratulations! You mastered all 80 items. Step into the realm of 3-item recipes and 521 items!';
    } else {
      if (titleEl) titleEl.textContent = i18n.t('grandmaster_offer_title');
      if (subEl) subEl.textContent = i18n.t('grandmaster_offer_subtitle');
    }

    modal.classList.add('show');
  }

  _setupDailyHintLogic() {
    const dailyBtn = document.getElementById('daily-free-hint-btn');
    dailyBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const claimed = this.hintSystem?.claimDailyFreeHint();
      if (claimed) {
        this.updateHintRights(this.hintSystem.hintRights);
        this.showToast(i18n.t('free_daily_hint_claimed'), 'success');
      } else {
        this.showToast(i18n.t('free_daily_hint_already'), 'info');
      }
    });
  }
}


