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
      :root {
        --rc-canvas: #07080a;
        --rc-surface: #0d0d0d;
        --rc-surface-card: #121212;
        --rc-surface-elevated: #18191a;
        --rc-surface-hover: #1f2124;
        --rc-hairline: #242728;
        --rc-hairline-soft: rgba(255, 255, 255, 0.08);
        --rc-hairline-strong: rgba(255, 255, 255, 0.16);
        --rc-ink: #f4f4f6;
        --rc-ink-muted: #9c9c9d;
        --rc-ink-subtle: #6a6b6c;
        --rc-accent-red: #ff6161;
        --rc-accent-blue: #57c1ff;
        --rc-accent-green: #59d499;
        --rc-accent-yellow: #ffc533;
        --rc-accent-purple: #a78bfa;
        --rc-font: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      #ui-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        font-family: var(--rc-font);
        z-index: 10;
        overflow: hidden;
      }

      /* =================================================== */
      /* RAYCAST SAĞ PANEL: Keşif & Envanter Çantası         */
      /* =================================================== */
      #right-panel {
        position: absolute;
        right: 0;
        top: 16px;
        height: calc(100% - 84px);
        background: var(--rc-surface);
        border: 1px solid var(--rc-hairline);
        border-right: none;
        border-radius: 14px 0 0 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 8px 14px 8px;
        gap: 8px;
        pointer-events: auto;
        box-shadow: -12px 0 35px rgba(0, 0, 0, 0.8), inset 0 1px 0 var(--rc-hairline-soft);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 20;
      }

      #right-panel.state-closed {
        transform: translateX(100%);
        width: 64px;
      }

      #right-panel.state-narrow {
        transform: translateX(0);
        width: 64px;
      }

      #right-panel.state-wide {
        transform: translateX(0);
        width: 128px;
      }

      #right-panel.state-fullscreen {
        transform: translateX(0);
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        border-radius: 0;
        border: none;
        padding: 16px 20px 24px 20px;
        background: var(--rc-canvas);
        z-index: 100;
        box-shadow: none;
      }

      #right-panel.state-fullscreen .panel-header-badge {
        max-width: 900px;
        width: 100%;
        margin: 0 auto 8px auto;
        font-size: 13px;
        padding: 8px 14px;
      }

      #right-panel.state-fullscreen #inv-controls {
        max-width: 900px;
        width: 100%;
        margin: 0 auto 12px auto;
      }

      #right-panel.state-fullscreen #inv-items-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
        gap: 10px;
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
        justify-items: center;
        max-height: calc(100% - 110px);
        overflow-y: auto;
      }

      #right-panel.state-fullscreen .item-icon-btn {
        width: 76px;
        height: 80px;
      }

      /* Keşif Çekmece Kulakçığı */
      #right-panel-toggle {
        position: absolute;
        left: -44px;
        top: 24px;
        width: 44px;
        height: 60px;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-right: none;
        border-radius: 10px 0 0 10px;
        color: var(--rc-ink);
        font-size: 13px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: -4px 6px 14px rgba(0, 0, 0, 0.6), inset 0 1px 0 var(--rc-hairline-soft);
        transition: all 0.15s ease;
      }

      #right-panel-toggle:hover {
        background: var(--rc-surface-hover);
        border-color: var(--rc-hairline-strong);
        color: #ffffff;
      }

      #right-panel-fullscreen-btn {
        position: absolute;
        left: -44px;
        top: 92px;
        width: 44px;
        height: 52px;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-right: none;
        border-radius: 10px 0 0 10px;
        color: var(--rc-accent-blue);
        font-size: 12px;
        font-weight: 700;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: -4px 6px 14px rgba(0, 0, 0, 0.6), inset 0 1px 0 var(--rc-hairline-soft);
        transition: all 0.15s ease;
      }

      #right-panel-fullscreen-btn:hover {
        background: var(--rc-surface-hover);
        border-color: var(--rc-accent-blue);
        color: #ffffff;
      }

      #right-panel.state-fullscreen #right-panel-toggle {
        left: auto;
        right: 18px;
        top: 14px;
        border-right: 1px solid var(--rc-hairline);
        border-radius: 8px;
        width: 42px;
        height: 42px;
      }

      #right-panel.state-fullscreen #right-panel-fullscreen-btn {
        display: none !important;
      }

      /* Panel Başlık Şeridi */
      .panel-header-badge {
        width: 100%;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        padding: 6px 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        color: var(--rc-ink);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        box-shadow: inset 0 1px 0 var(--rc-hairline-soft);
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
        border-bottom: 1px solid var(--rc-hairline);
        flex-shrink: 0;
      }

      #right-panel.state-narrow #inv-controls {
        display: none;
      }

      #inv-items-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
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

      /* Raycast Tarzı Komut Paleti Arama Kutusu */
      #item-search-input {
        width: 100%;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        padding: 7px 10px;
        color: var(--rc-ink);
        font-family: var(--rc-font);
        font-size: 12px;
        font-weight: 500;
        outline: none;
        box-sizing: border-box;
        transition: all 0.15s ease;
        text-align: left;
      }

      #item-search-input:focus {
        border-color: var(--rc-accent-red);
        background: var(--rc-surface-elevated);
        box-shadow: 0 0 0 1px var(--rc-accent-red);
      }

      #item-search-input::placeholder {
        color: var(--rc-ink-subtle);
        font-size: 11px;
      }

      /* Raycast Segmented Control (Pill Switcher) */
      .inv-btn-segment {
        display: flex;
        gap: 4px;
        width: 100%;
        background: var(--rc-surface-card);
        padding: 2px;
        border-radius: 6px;
        border: 1px solid var(--rc-hairline);
      }

      .inv-segment-btn {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--rc-ink-muted);
        border-radius: 4px;
        font-family: var(--rc-font);
        font-size: 10px;
        padding: 4px 2px;
        cursor: pointer;
        text-align: center;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.15s ease;
      }

      .inv-segment-btn:hover {
        color: var(--rc-ink);
        background: var(--rc-surface-elevated);
      }

      .inv-segment-btn:active {
        transform: translateY(1px);
      }

      /* Raycast Eşya Kartı */
      .item-icon-btn {
        width: 112px;
        min-height: 72px;
        border-radius: 8px;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--rc-ink);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.12s ease;
        flex-shrink: 0;
        padding: 6px 4px;
        position: relative;
      }

      .item-icon-btn:hover {
        border-color: var(--rc-hairline-strong);
        background: var(--rc-surface-hover);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      }

      .item-icon-btn:active {
        transform: translateY(1px);
      }

      #right-panel.state-narrow .item-icon-btn {
        width: 48px;
        min-height: 48px;
        height: 48px;
        padding: 2px;
        border-radius: 8px;
      }

      #right-panel.state-narrow .item-icon-btn .icon-symbol {
        width: 30px;
        height: 30px;
        margin-bottom: 0;
      }

      #right-panel.state-narrow .item-icon-btn .item-label,
      #right-panel.state-narrow .item-icon-btn .item-formula {
        display: none !important;
      }

      .item-img-icon {
        width: 32px;
        height: 32px;
        object-fit: contain;
        filter: drop-shadow(0 2px 5px rgba(0,0,0,0.6));
        pointer-events: none;
      }

      .item-formula {
        font-size: 9px;
        color: var(--rc-accent-yellow);
        font-weight: 500;
        text-align: center;
        margin-top: 2px;
        line-height: 1.15;
        max-width: 104px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* =================================================== */
      /* RAYCAST SOL PANEL: İpuçları & Simya Kodeksi         */
      /* =================================================== */
      #left-drawer {
        position: absolute;
        left: -240px;
        top: 16px;
        width: 240px;
        height: calc(100% - 84px);
        background: var(--rc-surface);
        border: 1px solid var(--rc-hairline);
        border-left: none;
        border-radius: 0 14px 14px 0;
        pointer-events: auto;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        z-index: 20;
        box-shadow: 12px 0 35px rgba(0, 0, 0, 0.8), inset 0 1px 0 var(--rc-hairline-soft);
      }

      #left-drawer.open {
        transform: translateX(240px);
      }

      #drawer-toggle {
        position: absolute;
        right: -44px;
        top: 24px;
        width: 44px;
        height: 60px;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-left: none;
        border-radius: 0 10px 10px 0;
        color: var(--rc-ink);
        font-size: 13px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: 4px 6px 14px rgba(0, 0, 0, 0.6), inset 0 1px 0 var(--rc-hairline-soft);
        transition: all 0.15s ease;
      }

      #drawer-toggle:hover {
        background: var(--rc-surface-hover);
        border-color: var(--rc-hairline-strong);
        color: #ffffff;
      }

      .drawer-header {
        padding: 12px 14px;
        background: var(--rc-surface-card);
        border-bottom: 1px solid var(--rc-hairline);
        border-radius: 0 14px 0 0;
        font-size: 12px;
        font-weight: 700;
        color: var(--rc-ink);
        display: flex;
        justify-content: space-between;
        align-items: center;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      .hint-badge {
        background: var(--rc-surface-elevated);
        color: var(--rc-accent-yellow);
        border: 1px solid var(--rc-hairline);
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
      }

      .drawer-content {
        flex: 1;
        padding: 12px 10px;
        overflow-y: auto;
        color: var(--rc-ink-muted);
        font-size: 12px;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .locked-item-card {
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        padding: 10px;
        position: relative;
        transition: all 0.15s ease;
      }

      .locked-item-card:hover {
        border-color: var(--rc-hairline-strong);
        background: var(--rc-surface-elevated);
      }

      .locked-item-card h4 {
        color: var(--rc-ink);
        margin-bottom: 3px;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .locked-item-card p {
        color: var(--rc-ink-muted);
        font-size: 11px;
        margin-bottom: 8px;
        line-height: 1.4;
      }

      /* Raycast Yeşil İpucu Butonu */
      .hint-btn {
        background: var(--rc-accent-green);
        color: #07080a;
        border: none;
        padding: 5px 12px;
        border-radius: 6px;
        font-family: var(--rc-font);
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.12s ease;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .hint-btn:hover {
        background: #6ee7b7;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(89, 212, 153, 0.4);
      }

      .hint-btn:active {
        transform: translateY(1px);
      }

      .hint-btn:disabled {
        background: var(--rc-surface-elevated);
        border: 1px solid var(--rc-hairline);
        color: var(--rc-ink-subtle);
        cursor: not-allowed;
      }

      /* =================================================== */
      /* ALT AKSİYON BARI & BİRLEŞTİR (CRAFT) BUTONU         */
      /* =================================================== */
      #bottom-action-bar {
        position: fixed;
        bottom: max(24px, calc(env(safe-area-inset-bottom, 0px) + 16px));
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

      .bottom-side-btn {
        background: var(--rc-surface);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        color: var(--rc-ink);
        font-family: var(--rc-font);
        font-size: 12px;
        font-weight: 600;
        padding: 8px 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.15s ease;
        user-select: none;
        pointer-events: auto;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
      }

      .bottom-side-btn:hover {
        background: var(--rc-surface-hover);
        border-color: var(--rc-hairline-strong);
        color: #ffffff;
        transform: translateY(-1px);
      }

      .bottom-side-btn:active {
        transform: translateY(1px);
      }

      #bottom-cleanup-btn {
        color: var(--rc-accent-red);
      }
      #bottom-cleanup-btn:hover {
        border-color: var(--rc-accent-red);
        background: rgba(255, 97, 97, 0.12);
        color: #ffffff;
      }

      /* Raycast Kırmızı-Mercan Signature Craft Butonu */
      #craft-action-btn {
        position: fixed;
        left: 50%;
        bottom: max(24px, calc(env(safe-area-inset-bottom, 0px) + 16px));
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff5757 0%, #d62828 100%);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 9999px;
        padding: 10px 22px;
        color: #ffffff;
        font-family: var(--rc-font);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.3px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-shadow: 0 0 24px rgba(255, 87, 87, 0.45), 0 8px 24px rgba(0, 0, 0, 0.6);
        transition: transform 0.15s ease, box-shadow 0.2s ease;
        user-select: none;
        pointer-events: auto;
        z-index: 30;
      }

      #craft-action-btn:hover {
        box-shadow: 0 0 32px rgba(255, 87, 87, 0.75), 0 10px 28px rgba(0, 0, 0, 0.7);
        transform: translateX(-50%) translateY(-1px);
      }

      #craft-action-btn:active {
        transform: translateX(-50%) translateY(1px);
      }

      @media (max-width: 768px), (max-height: 850px) {
        #bottom-action-bar {
          bottom: max(28px, calc(env(safe-area-inset-bottom, 0px) + 20px));
          padding: 0 12px;
        }
        #craft-action-btn {
          bottom: max(28px, calc(env(safe-area-inset-bottom, 0px) + 20px));
        }
        .bottom-side-btn {
          padding: 7px 12px;
          font-size: 11px;
        }
        #craft-action-btn {
          padding: 8px 18px;
          font-size: 12px;
        }
      }

      /* =================================================== */
      /* MODALLAR (AYARLAR, ABONELİK, BAŞARIMLAR, REHBER)    */
      /* =================================================== */
      #settings-modal, #grandmaster-offer-modal, #achievements-modal, #welcome-modal, #char-unlock-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 8, 10, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        z-index: 120;
        padding: 16px;
        box-sizing: border-box;
      }

      #settings-modal.show, #grandmaster-offer-modal.show, #achievements-modal.show, #welcome-modal.show, #char-unlock-modal.show {
        display: flex;
      }

      .settings-box, .gm-offer-box, .achievements-box, .welcome-card, .celebrate-card {
        background: var(--rc-surface);
        border: 1px solid var(--rc-hairline);
        border-radius: 14px;
        padding: 20px;
        width: 90%;
        max-width: 440px;
        color: var(--rc-ink);
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 var(--rc-hairline-soft);
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: 88vh;
        overflow-y: auto;
        position: relative;
        animation: settingsModalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes settingsModalPop {
        from {
          opacity: 0;
          transform: scale(0.96) translateY(8px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .settings-top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        width: 100%;
      }

      .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 10px;
        padding: 8px 12px;
      }

      .settings-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--rc-ink);
        letter-spacing: 0.3px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .settings-close-icon {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        background: var(--rc-surface-elevated);
        border: 1px solid var(--rc-hairline);
        color: var(--rc-ink-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }

      .settings-close-icon:hover {
        background: var(--rc-surface-hover);
        border-color: var(--rc-hairline-strong);
        color: #ffffff;
      }

      .settings-tabs {
        display: flex;
        gap: 4px;
        background: var(--rc-surface-card);
        padding: 3px;
        border-radius: 8px;
        border: 1px solid var(--rc-hairline);
        flex: 1;
      }

      .settings-tab-btn {
        flex: 1;
        padding: 7px 4px;
        border-radius: 6px;
        border: none;
        background: transparent;
        color: var(--rc-ink-muted);
        font-family: var(--rc-font);
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: center;
        letter-spacing: 0.2px;
      }

      .settings-tab-btn.active {
        background: var(--rc-surface-elevated);
        color: #ffffff;
        border: 1px solid var(--rc-hairline-strong);
      }

      .settings-tab-pane {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .settings-btn-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        padding: 10px 12px;
        gap: 10px;
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
        color: #f4f4f6;
        letter-spacing: 0.2px;
      }

      .settings-btn-sub {
        font-size: 11px;
        color: var(--rc-ink-muted);
      }

      /* Raycast Buton Seti */
      .settings-action-btn {
        padding: 6px 14px;
        border-radius: 6px;
        font-family: var(--rc-font);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.12s ease;
        white-space: nowrap;
        user-select: none;
        border: 1px solid var(--rc-hairline);
      }

      .settings-action-btn:active {
        transform: translateY(1px);
      }

      .btn-primary-white {
        background: #ffffff;
        color: #000000;
        border: none;
      }
      .btn-primary-white:hover {
        background: #e8e8e8;
      }

      .btn-danger {
        background: rgba(255, 97, 97, 0.15);
        color: var(--rc-accent-red);
        border-color: rgba(255, 97, 97, 0.35);
      }
      .btn-danger:hover {
        background: rgba(255, 97, 97, 0.25);
        border-color: var(--rc-accent-red);
        color: #ffffff;
      }

      .btn-danger-outline {
        background: transparent;
        color: var(--rc-accent-red);
        border: 1px solid rgba(255, 97, 97, 0.4);
      }
      .btn-danger-outline:hover {
        background: rgba(255, 97, 97, 0.2);
        color: #ffffff;
      }

      .btn-purple {
        background: rgba(167, 139, 250, 0.15);
        color: var(--rc-accent-purple);
        border-color: rgba(167, 139, 250, 0.35);
      }
      .btn-purple:hover {
        background: rgba(167, 139, 250, 0.25);
        border-color: var(--rc-accent-purple);
        color: #ffffff;
      }

      .btn-green {
        background: rgba(89, 212, 153, 0.15);
        color: var(--rc-accent-green);
        border-color: rgba(89, 212, 153, 0.35);
      }
      .btn-green:hover {
        background: rgba(89, 212, 153, 0.25);
        border-color: var(--rc-accent-green);
        color: #ffffff;
      }
      .btn-green.muted {
        background: var(--rc-surface-card);
        color: var(--rc-ink-subtle);
        border-color: var(--rc-hairline);
      }

      .btn-blue {
        background: rgba(87, 193, 255, 0.15);
        color: var(--rc-accent-blue);
        border-color: rgba(87, 193, 255, 0.35);
      }
      .btn-blue:hover {
        background: rgba(87, 193, 255, 0.25);
        border-color: var(--rc-accent-blue);
        color: #ffffff;
      }

      .btn-amber {
        background: rgba(255, 197, 51, 0.15);
        color: var(--rc-accent-yellow);
        border-color: rgba(255, 197, 51, 0.35);
      }
      .btn-amber:hover {
        background: rgba(255, 197, 51, 0.25);
        border-color: var(--rc-accent-yellow);
        color: #ffffff;
      }
      .btn-amber.active {
        background: var(--rc-accent-yellow);
        color: #07080a;
      }

      .btn-cyan {
        background: rgba(87, 193, 255, 0.15);
        color: var(--rc-accent-blue);
        border-color: rgba(87, 193, 255, 0.35);
      }
      .btn-cyan:hover {
        background: rgba(87, 193, 255, 0.25);
        color: #ffffff;
      }

      .btn-indigo {
        background: var(--rc-surface-elevated);
        color: var(--rc-ink);
        border-color: var(--rc-hairline-strong);
      }
      .btn-indigo:hover {
        background: var(--rc-surface-hover);
        color: #ffffff;
      }

      .btn-emerald {
        background: rgba(89, 212, 153, 0.15);
        color: var(--rc-accent-green);
        border-color: rgba(89, 212, 153, 0.35);
      }
      .btn-emerald:hover {
        background: rgba(89, 212, 153, 0.25);
        color: #ffffff;
      }

      .btn-slate {
        background: var(--rc-surface-elevated);
        color: var(--rc-ink-muted);
        border-color: var(--rc-hairline);
      }
      .btn-slate:hover {
        background: var(--rc-surface-hover);
        color: var(--rc-ink);
      }
      .btn-slate.active {
        background: rgba(87, 193, 255, 0.2);
        border-color: var(--rc-accent-blue);
        color: var(--rc-accent-blue);
      }

      .btn-gold-primary {
        background: #ffffff;
        color: #07080a;
        font-family: var(--rc-font);
        font-size: 13px;
        font-weight: 700;
        padding: 10px 18px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .btn-gold-primary:hover {
        background: #e8e8e8;
      }

      .btn-dark-secondary {
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        color: var(--rc-ink);
        font-family: var(--rc-font);
        font-size: 12px;
        font-weight: 600;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .btn-dark-secondary:hover {
        background: var(--rc-surface-hover);
        border-color: var(--rc-hairline-strong);
      }

      /* FPS HUD */
      #fps-counter-hud {
        position: absolute;
        top: 16px;
        left: 16px;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 6px;
        padding: 4px 8px;
        color: var(--rc-accent-blue);
        font-family: monospace, Consolas, sans-serif;
        font-size: 11px;
        font-weight: 600;
        pointer-events: none;
        z-index: 50;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      }

      /* Masanın Önündeki Keşif Bilgilendirme Banner'ı */
      #discovery-banner {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(20px) scale(0.95);
        background: var(--rc-surface);
        border: 1px solid var(--rc-accent-yellow);
        border-radius: 12px;
        padding: 10px 18px;
        color: var(--rc-ink);
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 197, 51, 0.25);
        pointer-events: none;
        opacity: 0;
        z-index: 50;
        max-width: 90vw;
        transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }

      #discovery-banner.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }

      .discovery-icon {
        width: 38px;
        height: 38px;
        border-radius: 8px;
        background: var(--rc-surface-card);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid var(--rc-hairline);
      }

      .discovery-title {
        font-size: 13px;
        font-weight: 700;
        color: var(--rc-accent-yellow);
        margin-bottom: 2px;
      }

      .discovery-desc {
        font-size: 11px;
        color: var(--rc-ink-muted);
        line-height: 1.35;
      }

      /* Toast Bildirimi */
      #alchemy-toast {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-15px);
        background: var(--rc-surface);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        padding: 7px 16px;
        color: var(--rc-ink);
        font-size: 12px;
        font-weight: 600;
        pointer-events: none;
        opacity: 0;
        z-index: 99;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
        transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
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
        border-color: var(--rc-accent-yellow);
        color: var(--rc-accent-yellow);
      }
      #alchemy-toast.success {
        border-color: var(--rc-accent-green);
        color: var(--rc-accent-green);
      }

      /* Freemium & Grandmaster Elements */
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
        font-weight: 600;
        color: var(--rc-ink-muted);
      }
      .inv-progress-track {
        width: 100%;
        height: 4px;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 4px;
        overflow: hidden;
      }
      .inv-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--rc-accent-red), var(--rc-accent-yellow));
        border-radius: 4px;
        transition: width 0.3s ease;
      }
      .gm-mini-badge {
        background: rgba(167, 139, 250, 0.15);
        color: var(--rc-accent-purple);
        border: 1px solid rgba(167, 139, 250, 0.35);
        border-radius: 6px;
        font-size: 9px;
        font-weight: 700;
        padding: 2px 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .gm-mini-badge:hover {
        background: rgba(167, 139, 250, 0.25);
        color: #ffffff;
      }

      .daily-hint-action-btn {
        width: 100%;
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        color: var(--rc-accent-blue);
        padding: 6px 10px;
        border-radius: 6px;
        font-family: var(--rc-font);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 6px;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .daily-hint-action-btn:hover {
        background: var(--rc-surface-hover);
        border-color: var(--rc-accent-blue);
      }

      .gm-plans-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 4px;
      }
      .gm-plan-card {
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 10px;
        padding: 12px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 4px;
        cursor: pointer;
        position: relative;
        transition: all 0.15s ease;
      }
      .gm-plan-card:hover {
        border-color: var(--rc-hairline-strong);
        background: var(--rc-surface-hover);
        transform: translateY(-1px);
      }
      .gm-plan-card.recommended {
        border-color: var(--rc-accent-yellow);
        background: rgba(255, 197, 51, 0.08);
      }
      .gm-plan-badge {
        position: absolute;
        top: -7px;
        background: var(--rc-accent-yellow);
        color: #07080a;
        font-size: 8px;
        font-weight: 800;
        padding: 1px 5px;
        border-radius: 4px;
      }

      /* Badges & Collections */
      .badges-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 6px;
      }
      .badge-row-card {
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        padding: 8px 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.2s ease;
      }
      .badge-row-card.unlocked {
        border-color: rgba(89, 212, 153, 0.4);
        background: rgba(89, 212, 153, 0.08);
      }
      .badge-row-card.locked {
        opacity: 0.5;
        border: 1px dashed var(--rc-hairline);
        background: rgba(255, 255, 255, 0.02);
      }
      .collections-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .col-card-box {
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .col-chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      .col-item-chip {
        padding: 3px 6px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 4px;
        background: var(--rc-surface-elevated);
        color: var(--rc-ink-muted);
        border: 1px solid var(--rc-hairline);
        transition: all 0.15s ease;
      }
      .col-item-chip.owned {
        background: rgba(89, 212, 153, 0.12);
        color: var(--rc-accent-green);
        border-color: rgba(89, 212, 153, 0.35);
      }
      .col-item-chip.locked {
        opacity: 0.45;
        border: 1px dashed var(--rc-hairline);
      }

      /* Rehber (Tutorial) Kartı */
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
      #tutorial-modal.show {
        display: block;
      }

      .tutorial-card {
        background: var(--rc-surface);
        border: 1px solid var(--rc-hairline);
        border-radius: 12px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.9);
        max-width: 420px;
        width: calc(100% - 24px);
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: auto;
        animation: settingsModalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tutorial-card.pos-bottom {
        top: auto !important;
        bottom: 24px !important;
        transform: translateX(-50%) !important;
      }
      .tutorial-card.pos-top {
        bottom: auto !important;
        top: 24px !important;
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
        background: var(--rc-surface-card);
        color: var(--rc-accent-yellow);
        font-size: 11px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 6px;
        border: 1px solid var(--rc-hairline);
      }
      .tutorial-close-btn {
        background: transparent;
        border: none;
        color: var(--rc-ink-muted);
        font-size: 16px;
        cursor: pointer;
        padding: 2px 4px;
      }
      .tutorial-close-btn:hover {
        color: var(--rc-accent-red);
      }
      .tutorial-progress-track {
        width: 100%;
        height: 4px;
        background: var(--rc-surface-card);
        border-radius: 4px;
        overflow: hidden;
      }
      .tutorial-progress-bar {
        height: 100%;
        width: 20%;
        background: var(--rc-accent-yellow);
        border-radius: 4px;
        transition: width 0.25s ease;
      }
      .tutorial-body {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .tutorial-step-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--rc-ink);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .tutorial-step-desc {
        font-size: 12px;
        color: var(--rc-ink-muted);
        line-height: 1.45;
        margin: 0;
      }

      .tutorial-char-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        margin-top: 4px;
      }
      .tutorial-char-card {
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        border-radius: 8px;
        padding: 8px 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 4px;
      }
      .tutorial-char-card.unlocked {
        border-color: rgba(89, 212, 153, 0.4);
        background: rgba(89, 212, 153, 0.08);
      }
      .tutorial-char-card.locked {
        border-color: var(--rc-hairline);
      }
      .tutorial-char-icon {
        font-size: 18px;
      }
      .tutorial-char-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--rc-ink);
      }
      .tutorial-char-badge {
        font-size: 8px;
        font-weight: 700;
        padding: 1px 4px;
        border-radius: 4px;
      }
      .badge-unlocked {
        background: rgba(89, 212, 153, 0.2);
        color: var(--rc-accent-green);
      }
      .badge-locked {
        background: var(--rc-surface-elevated);
        color: var(--rc-ink-muted);
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
        padding: 8px 12px;
        border-radius: 6px;
        font-family: var(--rc-font);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: center;
      }
      .tutorial-nav-btn.prev {
        background: var(--rc-surface-card);
        border: 1px solid var(--rc-hairline);
        color: var(--rc-ink-muted);
      }
      .tutorial-nav-btn.prev:hover {
        color: var(--rc-ink);
      }
      .tutorial-nav-btn.next {
        background: #ffffff;
        border: none;
        color: #07080a;
      }
      .tutorial-nav-btn.next:hover {
        background: #e8e8e8;
      }

      /* Dinamik Gösterici Ok & Vurgu */
      #tutorial-pointer-arrow {
        position: fixed;
        z-index: 10005;
        pointer-events: none;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 0 10px rgba(255, 197, 51, 0.8));
      }
      .arrow-svg {
        width: 40px;
        height: 40px;
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
        100% { transform: translateX(10px); }
      }
      @keyframes arrowBounceDown {
        0% { transform: translateY(0); }
        100% { transform: translateY(10px); }
      }
      @keyframes arrowPulseCenter {
        0% { transform: scale(0.95); opacity: 0.85; }
        50% { transform: scale(1.15); opacity: 1; }
        100% { transform: scale(0.95); opacity: 0.85; }
      }
      .tutorial-element-highlight {
        outline: 2px solid var(--rc-accent-yellow) !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 20px rgba(255, 197, 51, 0.7) !important;
        z-index: 10002 !important;
      }

      /* Ad Modal */
      #ad-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 8, 10, 0.85);
        backdrop-filter: blur(12px);
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        z-index: 130;
      }
      .ad-box {
        background: var(--rc-surface);
        border: 1px solid var(--rc-hairline);
        border-radius: 12px;
        padding: 22px;
        width: 85%;
        max-width: 320px;
        text-align: center;
        color: var(--rc-ink);
      }
      .ad-box h3 {
        margin-bottom: 10px;
        color: var(--rc-accent-yellow);
        font-size: 15px;
      }
      .ad-box p {
        font-size: 12px;
        color: var(--rc-ink-muted);
        margin-bottom: 16px;
      }
      .ad-btn {
        background: var(--rc-accent-green);
        color: #07080a;
        border: none;
        padding: 9px 16px;
        border-radius: 6px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        margin-bottom: 6px;
      }
      .ad-close {
        background: transparent;
        color: var(--rc-ink-subtle);
        border: none;
        padding: 6px;
        cursor: pointer;
        font-size: 11px;
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
          <img src="./textures/ui/icon_codex.png" style="width: 20px; height: 20px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size: 15px;\\'>📜</span>';">
          <span style="font-size: 8px; font-weight: 700; letter-spacing: 0.5px; line-height: 1;">İPUCU</span>
        </div>
        <div class="drawer-header">
          <span id="drawer-hints-title">${i18n.t('hints_title')}</span>
          <span class="hint-badge" id="hint-rights-badge">${i18n.t('hint_rights', { n: 3 })}</span>
        </div>
        <div style="padding: 6px 10px 0 10px;">
          <button id="daily-free-hint-btn" class="daily-hint-action-btn">${i18n.t('free_daily_hint_btn')}</button>
        </div>
        <div class="drawer-content" id="drawer-hints-list">
          <!-- Kilitli eşyalar dinamik yüklenecek -->
        </div>
      </div>

      <div id="right-panel" class="state-closed">
        <div id="right-panel-toggle" title="Keşif">
          <img src="./textures/ui/icon_discovery.png" style="width: 20px; height: 20px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size: 15px;\\'>🧭</span>';">
          <span style="font-size: 8px; font-weight: 700; letter-spacing: 0.5px; line-height: 1;">KEŞİF</span>
        </div>
        <div id="right-panel-fullscreen-btn" title="Tam Ekran" style="display: none;">
          <span style="font-size: 13px;">⛶</span>
          <span style="font-size: 7px; font-weight: 700; letter-spacing: 0.3px; line-height: 1;">TAM EKRAN</span>
        </div>
        <div class="panel-header-badge">
          <span>🧭</span>
          <span class="badge-text">KEŞFEDİLENLER</span>
        </div>
        <div class="inv-progress-container" id="inv-progress-box">
          <div class="inv-progress-header">
            <span id="inv-progress-text">4 Keşfedildi</span>
            <button id="grandmaster-open-badge-btn" class="gm-mini-badge">🔮 Grandmaster</button>
          </div>
          <div class="inv-progress-track" id="inv-progress-track" style="display: none;">
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
        <button id="craft-action-btn" class="craft-magic-btn" style="display: none;">
          <span id="craft-btn-label">${i18n.t('craft_btn')}</span>
          <span id="craft-btn-counter" style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.2); padding: 1px 6px; border-radius: 9999px; font-size: 10px; margin-left: 4px; font-weight: 700; color: #ffffff;">2/2</span>
        </button>
        <button id="settings-open-btn" class="bottom-side-btn">
          <span id="settings-open-btn-label">${i18n.t('settings_btn')}</span>
        </button>
      </div>

      <div id="settings-modal">
        <div class="settings-box">
          <div class="settings-top-bar">
            <div class="settings-tabs">
              <button class="settings-tab-btn active" id="tab-general-btn" data-tab="general">${i18n.t('tab_general')}</button>
              <button class="settings-tab-btn" id="tab-collections-btn" data-tab="collections">${i18n.t('tab_collections')}</button>
              <button class="settings-tab-btn" id="tab-pro-btn" data-tab="pro">${i18n.t('tab_pro')}</button>
              <button class="settings-tab-btn" id="tab-debug-btn" data-tab="debug">${i18n.t('tab_debug')}</button>
            </div>
            <button class="settings-close-icon" id="settings-close-btn" title="${i18n.t('settings_close')}">✕</button>
          </div>

          <!-- 1. Genel Ayarlar Sekmesi -->
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
                    <span style="font-size: 9px; font-weight: 600; background: rgba(87, 193, 255, 0.15); color: var(--rc-accent-blue); border: 1px solid rgba(87, 193, 255, 0.3); padding: 1px 5px; border-radius: 4px;">CC BY 4.0</span>
                  </a>
                </div>
                <span class="settings-btn-sub" id="sub-character">Gözlemci (40 eşya), Gezgin (Grandmaster)</span>
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
            <div style="background: var(--rc-surface-card); border: 1px solid var(--rc-hairline); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 11px; font-weight: 600; color: var(--rc-ink); display: flex; align-items: center; gap: 6px;">
                  <span>🎨</span> <span id="general-credits-heading">${i18n.t('credits_character_heading')}</span>
                </span>
                <span style="font-size: 9px; font-weight: 600; background: rgba(87, 193, 255, 0.15); color: var(--rc-accent-blue); border: 1px solid rgba(87, 193, 255, 0.3); padding: 1px 5px; border-radius: 4px;">CC BY 4.0</span>
              </div>
              <p style="font-size: 11px; color: var(--rc-ink-muted); line-height: 1.4; margin: 0;" id="general-credits-desc">
                ${i18n.t('credits_character_desc')}
              </p>
              <div style="display: flex; justify-content: flex-end; margin-top: 2px;">
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: var(--rc-accent-blue); text-decoration: none; padding: 3px 6px; background: rgba(87, 193, 255, 0.1); border: 1px solid rgba(87, 193, 255, 0.25); border-radius: 4px; transition: all 0.2s;">
                  <span id="general-credits-link-text">${i18n.t('credits_view_license')}</span>
                  <span style="font-size: 9px;">↗</span>
                </a>
              </div>
            </div>
          </div>

          <!-- 2. Koleksiyon & Rozetler Sekmesi -->
          <div class="settings-tab-pane" id="pane-collections" style="display: none;">
            <div style="display: flex; gap: 4px; background: var(--rc-surface-card); padding: 2px; border-radius: 6px; border: 1px solid var(--rc-hairline);">
              <button class="settings-tab-btn active" id="subtab-badges-btn" style="font-size: 10px; padding: 4px 6px;">🏆 ${i18n.t('tab_badges')}</button>
              <button class="settings-tab-btn" id="subtab-sets-btn" style="font-size: 10px; padding: 4px 6px;">🗂️ ${i18n.t('tab_collections')}</button>
            </div>

            <div id="subpane-badges" style="display: block;">
              <div class="badges-grid" id="badges-container">
                <!-- Rozetler dinamik yüklenecek -->
              </div>
            </div>

            <div id="subpane-sets" style="display: none;">
              <div class="collections-list" id="collections-container">
                <!-- Koleksiyon setleri dinamik yüklenecek -->
              </div>
            </div>
          </div>

          <!-- 3. Grandmaster (Pro) Sekmesi -->
          <div class="settings-tab-pane" id="pane-pro" style="display: none;">
            <div style="background: rgba(167, 139, 250, 0.08); border: 1px solid rgba(167, 139, 250, 0.25); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
                <span style="font-size: 12px; font-weight: 700; color: #e9d5ff; display: flex; align-items: center; gap: 6px;">
                  <span>👑</span> <span>Grandmaster Ayrıcalıkları</span>
                </span>
                <span style="font-size: 9px; font-weight: 700; background: var(--rc-accent-purple); color: #fff; padding: 1px 6px; border-radius: 4px;">PRO</span>
              </div>
              <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_1')}</div>
              <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_2')}</div>
              <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_3')}</div>
              <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_4')}</div>
            </div>

            <div class="gm-plans-grid">
              <div class="gm-plan-card recommended" data-plan="intro_monthly">
                <span class="gm-plan-badge">ÖNERİLEN</span>
                <span style="font-size: 11px; font-weight: 600; color: var(--rc-accent-yellow);">Tanışma Paketi</span>
                <span style="font-size: 16px; font-weight: 800; color: #ffffff;">₺49,99</span>
                <span style="font-size: 9px; color: var(--rc-ink-muted);">İlk ay (sonra ₺79,99)</span>
                <button class="btn-gold-primary" style="padding: 5px 10px; font-size: 10px; margin-top: 4px; width: 100%;">Başla</button>
              </div>
              <div class="gm-plan-card" data-plan="yearly">
                <span class="gm-plan-badge" style="background: var(--rc-accent-purple); color: #fff;">%48 İNDİRİM</span>
                <span style="font-size: 11px; font-weight: 600; color: var(--rc-accent-purple);">Yıllık Grandmaster</span>
                <span style="font-size: 16px; font-weight: 800; color: #ffffff;">₺499,99</span>
                <span style="font-size: 9px; color: var(--rc-ink-muted);">Yılda bir faturalandırılır</span>
                <button class="btn-dark-secondary" style="padding: 5px 10px; font-size: 10px; margin-top: 4px; width: 100%;">Seç</button>
              </div>
            </div>

            <div style="display: flex; gap: 6px; margin-top: 2px;">
              <button class="gm-plan-card" data-plan="monthly" style="flex: 1; padding: 6px;">
                <span style="font-size: 10px; font-weight: 600; color: var(--rc-ink-muted);">Aylık Standart</span>
                <span style="font-size: 12px; font-weight: 700; color: #ffffff;">₺79,99/ay</span>
              </button>
              <button class="gm-plan-card" data-plan="lifetime" style="flex: 1; padding: 6px;">
                <span style="font-size: 10px; font-weight: 600; color: var(--rc-ink-muted);">Ömür Boyu</span>
                <span style="font-size: 12px; font-weight: 700; color: #ffffff;">₺999,99</span>
              </button>
            </div>

            <div style="display: flex; justify-content: center; margin-top: 2px;">
              <button id="pro-restore-btn" style="background: none; border: none; color: var(--rc-ink-subtle); font-size: 10px; cursor: pointer; text-decoration: underline;">Satın Alımları Geri Yükle</button>
            </div>
          </div>

          <!-- 4. Debug Sekmesi -->
          <div class="settings-tab-pane" id="pane-debug" style="display: none;">
            <div style="background: rgba(255, 197, 51, 0.1); border: 1px solid rgba(255, 197, 51, 0.3); border-radius: 6px; padding: 6px 10px; font-size: 11px; color: var(--rc-accent-yellow); display: flex; align-items: center; gap: 6px;">
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
                <span class="settings-btn-label" id="label-debug-reset" style="color: var(--rc-accent-red);">${i18n.t('debug_reset_progress')}</span>
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
          <div style="font-size: 36px; margin-bottom: 4px;">⚗️</div>
          <h2 class="settings-title" style="font-size: 17px; justify-content: center;" id="welcome-modal-title">${i18n.t('welcome_title')}</h2>
          <p style="font-size: 12px; color: var(--rc-ink-muted); line-height: 1.5; margin: 0;" id="welcome-modal-sub">${i18n.t('welcome_subtitle')}</p>
          <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 6px;">
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
                <span class="tutorial-char-badge badge-locked">🔒 40 Eşya</span>
              </div>
              <div class="tutorial-char-card locked" id="tut-card-char3">
                <span class="tutorial-char-icon">🧭</span>
                <span class="tutorial-char-name">Gezgin</span>
                <span class="tutorial-char-badge badge-locked">🔒 Grandmaster</span>
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
          <path id="tutorial-pointer-path" d="M24 4L24 38M24 38L12 26M24 38L36 26" stroke="#ffc533" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Yeni Karakter Kilit Açılış Kutlama Modalı -->
      <div id="char-unlock-modal">
        <div class="celebrate-card">
          <div style="font-size: 36px; margin-bottom: 4px;">🎉</div>
          <h2 class="settings-title" style="font-size: 16px; justify-content: center;" id="celebrate-title">Yeni Karakter Açıldı!</h2>
          <p style="font-size: 12px; color: var(--rc-ink-muted); line-height: 1.45;" id="celebrate-desc">Tebrikler! Yeni bir karakterin kilidi açıldı.</p>
          <div style="width: 100%; margin-top: 6px;">
            <button id="celebrate-close-btn" class="btn-gold-primary" style="width: 100%;">Harika!</button>
          </div>
        </div>
      </div>

      <!-- Başarımlar & Koleksiyonlar Modalı -->
      <div id="achievements-modal">
        <div class="achievements-box">
          <div class="settings-header">
            <div class="settings-title" style="color: var(--rc-accent-yellow);">
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

      <!-- Grandmaster Davet / Abonelik Modalı -->
      <div id="grandmaster-offer-modal">
        <div class="gm-offer-box">
          <div class="settings-header">
            <div class="settings-title" style="color: var(--rc-accent-purple);">
              <span>🔮</span>
              <span id="gm-modal-title">${i18n.t('grandmaster_offer_title')}</span>
              <span>⚗️</span>
            </div>
            <button class="settings-close-icon" id="gm-offer-close-btn" title="Kapat">✕</button>
          </div>

          <p style="font-size: 12px; color: var(--rc-ink-muted); line-height: 1.45; margin: 0;" id="gm-modal-subtitle">
            ${i18n.t('grandmaster_offer_subtitle')}
          </p>

          <div style="background: rgba(167, 139, 250, 0.08); border: 1px solid rgba(167, 139, 250, 0.25); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 4px;">
            <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_1')}</div>
            <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_2')}</div>
            <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_3')}</div>
            <div style="font-size: 11px; font-weight: 600; color: #e9d5ff;">${i18n.t('grandmaster_feature_4')}</div>
          </div>

          <div class="gm-plans-grid">
            <div class="gm-plan-card recommended" data-plan="intro_monthly">
              <span class="gm-plan-badge">ÖNERİLEN</span>
              <span style="font-size: 11px; font-weight: 600; color: var(--rc-accent-yellow);">Tanışma Paketi</span>
              <span style="font-size: 16px; font-weight: 800; color: #ffffff;">₺49,99</span>
              <span style="font-size: 9px; color: var(--rc-ink-muted);">İlk ay (sonra ₺79,99)</span>
              <button class="btn-gold-primary" style="padding: 5px 10px; font-size: 10px; margin-top: 4px; width: 100%;">Başla</button>
            </div>
            <div class="gm-plan-card" data-plan="yearly">
              <span class="gm-plan-badge" style="background: var(--rc-accent-purple); color: #fff;">%48 İNDİRİM</span>
              <span style="font-size: 11px; font-weight: 600; color: var(--rc-accent-purple);">Yıllık Grandmaster</span>
              <span style="font-size: 16px; font-weight: 800; color: #ffffff;">₺499,99</span>
              <span style="font-size: 9px; color: var(--rc-ink-muted);">Yılda bir faturalandırılır</span>
              <button class="btn-dark-secondary" style="padding: 5px 10px; font-size: 10px; margin-top: 4px; width: 100%;">Seç</button>
            </div>
          </div>

          <div style="display: flex; gap: 6px; margin-top: 2px;">
            <button class="gm-plan-card" data-plan="monthly" style="flex: 1; padding: 6px;">
              <span style="font-size: 10px; font-weight: 600; color: var(--rc-ink-muted);">Aylık Standart</span>
              <span style="font-size: 12px; font-weight: 700; color: #ffffff;">₺79,99/ay</span>
            </button>
            <button class="gm-plan-card" data-plan="lifetime" style="flex: 1; padding: 6px;">
              <span style="font-size: 10px; font-weight: 600; color: var(--rc-ink-muted);">Ömür Boyu</span>
              <span style="font-size: 12px; font-weight: 700; color: #ffffff;">₺999,99</span>
            </button>
          </div>

          <div style="display: flex; justify-content: center; margin-top: 2px;">
            <button id="gm-restore-btn" style="background: none; border: none; color: var(--rc-ink-subtle); font-size: 10px; cursor: pointer; text-decoration: underline;">Satın Alımları Geri Yükle</button>
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
    const tabGeneralBtn = document.getElementById('tab-general-btn');
    if (tabGeneralBtn) tabGeneralBtn.textContent = i18n.t('tab_general');
    const tabCollectionsBtn = document.getElementById('tab-collections-btn');
    if (tabCollectionsBtn) tabCollectionsBtn.textContent = i18n.t('tab_collections');
    const tabProBtn = document.getElementById('tab-pro-btn');
    if (tabProBtn) tabProBtn.textContent = i18n.t('tab_pro');
    const tabDebugBtn = document.getElementById('tab-debug-btn');
    if (tabDebugBtn) tabDebugBtn.textContent = i18n.t('tab_debug');

    const subtabBadgesBtn = document.getElementById('subtab-badges-btn');
    if (subtabBadgesBtn) subtabBadgesBtn.textContent = `🏆 ${i18n.t('tab_badges')}`;
    const subtabSetsBtn = document.getElementById('subtab-sets-btn');
    if (subtabSetsBtn) subtabSetsBtn.textContent = `🗂️ ${i18n.t('tab_collections')}`;

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

    // 4 Ana Sekme Butonları & Panelleri
    const tabGeneralBtn = document.getElementById('tab-general-btn');
    const tabCollectionsBtn = document.getElementById('tab-collections-btn');
    const tabProBtn = document.getElementById('tab-pro-btn');
    const tabDebugBtn = document.getElementById('tab-debug-btn');

    const paneGeneral = document.getElementById('pane-general');
    const paneCollections = document.getElementById('pane-collections');
    const panePro = document.getElementById('pane-pro');
    const paneDebug = document.getElementById('pane-debug');

    const switchTab = (activeTab) => {
      tabGeneralBtn?.classList.toggle('active', activeTab === 'general');
      tabCollectionsBtn?.classList.toggle('active', activeTab === 'collections');
      tabProBtn?.classList.toggle('active', activeTab === 'pro');
      tabDebugBtn?.classList.toggle('active', activeTab === 'debug');

      if (paneGeneral) paneGeneral.style.display = activeTab === 'general' ? 'flex' : 'none';
      if (paneCollections) {
        paneCollections.style.display = activeTab === 'collections' ? 'flex' : 'none';
        if (activeTab === 'collections') {
          this._renderBadges();
          this._renderCollections();
        }
      }
      if (panePro) panePro.style.display = activeTab === 'pro' ? 'flex' : 'none';
      if (paneDebug) paneDebug.style.display = activeTab === 'debug' ? 'flex' : 'none';
    };

    this.switchSettingsTab = switchTab;

    tabGeneralBtn?.addEventListener('click', () => switchTab('general'));
    tabCollectionsBtn?.addEventListener('click', () => switchTab('collections'));
    tabProBtn?.addEventListener('click', () => switchTab('pro'));
    tabDebugBtn?.addEventListener('click', () => switchTab('debug'));

    // Koleksiyon Alt Sekmeleri (Rozetler vs Setler)
    const subtabBadgesBtn = document.getElementById('subtab-badges-btn');
    const subtabSetsBtn = document.getElementById('subtab-sets-btn');
    const subpaneBadges = document.getElementById('subpane-badges');
    const subpaneSets = document.getElementById('subpane-sets');

    subtabBadgesBtn?.addEventListener('click', () => {
      subtabBadgesBtn.classList.add('active');
      subtabSetsBtn?.classList.remove('active');
      if (subpaneBadges) subpaneBadges.style.display = 'block';
      if (subpaneSets) subpaneSets.style.display = 'none';
      this._renderBadges();
    });

    subtabSetsBtn?.addEventListener('click', () => {
      subtabSetsBtn.classList.add('active');
      subtabBadgesBtn?.classList.remove('active');
      if (subpaneBadges) subpaneBadges.style.display = 'none';
      if (subpaneSets) subpaneSets.style.display = 'block';
      this._renderCollections();
    });

    // Pro / Grandmaster Sekmesi Abonelik Plan Butonları
    const proPlans = panePro?.querySelectorAll('.gm-plan-card');
    proPlans?.forEach(card => {
      card.addEventListener('click', async (e) => {
        e.stopPropagation();
        const planId = card.getAttribute('data-plan') || 'intro_monthly';
        const res = await subscriptionManager.subscribe(planId);
        if (res.success) {
          achievementManager.unlockBadge('badge_grandmaster_unlocked');
          this.showToast(i18n.currentLang === 'tr' ? '👑 Grandmaster aboneliğiniz aktif edildi! Hoş geldiniz!' : '👑 Grandmaster active! Welcome!', 'success');
          this._populateInventory();
          if (this.onModeSwitch && this.gameMode !== 'grandmaster') {
            this.onModeSwitch('grandmaster');
          }
        }
      });
    });

    const proRestoreBtn = document.getElementById('pro-restore-btn');
    proRestoreBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showToast(i18n.currentLang === 'tr' ? 'Satın alımlar başarıyla kontrol edildi ve güncellendi.' : 'Purchases restored successfully.', 'info');
    });

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
    const invProgressTrack = document.getElementById('inv-progress-track');
    const gmBadgeBtn = document.getElementById('grandmaster-open-badge-btn');

    if (invProgressText) {
      if (isGm) {
        invProgressText.textContent = i18n.t('free_progress_label', {
          current: prog.current,
          max: prog.max,
          pct: prog.percentage
        });
      } else {
        // Free modda oyuncu toplam içeriği ve yüzdeyi bilmesin, sadece keşfedilen miktar gösterilsin
        invProgressText.textContent = i18n.currentLang === 'tr'
          ? `${prog.current} Keşfedildi`
          : `${prog.current} Discovered`;
      }
    }
    if (invProgressTrack && invProgressFill) {
      if (isGm) {
        invProgressTrack.style.display = 'block';
        invProgressFill.style.width = `${prog.percentage}%`;
      } else {
        invProgressTrack.style.display = 'none';
      }
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
  /* BAŞARIMLAR, KOLEKSİYONLAR & ROZETLER               */
  /* =================================================== */
  _setupAchievementsLogic() {
    // Rozet açılma dinleyicisi
    achievementManager.onBadgeUnlocked((newBadges) => {
      newBadges.forEach(badge => {
        this.showBadgeUnlockedCelebration(badge);
      });
      this.updateAchievementsUI();
    });
  }

  showAchievementsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    modal.classList.add('show');
    if (this.switchSettingsTab) {
      this.switchSettingsTab('collections');
    } else {
      this._renderBadges();
      this._renderCollections();
    }
  }

  _renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;
    container.innerHTML = '';

    const badges = achievementManager.getBadges();
    badges.forEach(badge => {
      const card = document.createElement('div');
      card.className = `badge-row-card ${badge.isUnlocked ? 'unlocked' : 'locked'}`;
      const title = i18n.currentLang === 'tr' ? badge.titleTr : badge.titleEn;
      const desc = i18n.currentLang === 'tr' ? badge.descTr : badge.descEn;

      card.innerHTML = `
        <div style="font-size: 24px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: ${badge.isUnlocked ? 'rgba(89, 212, 153, 0.15)' : 'rgba(255,255,255,0.04)'}; border-radius: 12px; border: 1px solid ${badge.isUnlocked ? 'rgba(89, 212, 153, 0.3)' : 'rgba(255,255,255,0.08)'}; flex-shrink: 0; filter: ${badge.isUnlocked ? 'none' : 'grayscale(1) opacity(0.6)'};">
          ${badge.icon}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
            <h4 style="font-size: 13px; font-weight: 700; color: ${badge.isUnlocked ? 'var(--rc-accent-green)' : 'var(--rc-ink-muted)'}; margin: 0;">
              ${badge.isUnlocked ? title : (i18n.currentLang === 'tr' ? '🔒 Kilitli Rozet' : '🔒 Locked Badge')}
            </h4>
            <span style="font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 6px; ${badge.isUnlocked ? 'background: rgba(89, 212, 153, 0.2); color: var(--rc-accent-green);' : 'background: rgba(255,255,255,0.06); color: var(--rc-ink-subtle);'}">
              ${badge.isUnlocked ? (i18n.currentLang === 'tr' ? 'KAZANILDI' : 'UNLOCKED') : (i18n.currentLang === 'tr' ? 'KİLİTLİ' : 'LOCKED')}
            </span>
          </div>
          <p style="font-size: 11px; color: ${badge.isUnlocked ? 'var(--rc-ink-muted)' : 'var(--rc-ink-subtle)'}; margin: 3px 0 0 0; line-height: 1.4;">${desc}</p>
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
        <div class="col-item-chip ${it.isOwned ? 'owned' : 'locked'}" title="${it.isOwned ? it.name : (i18n.currentLang === 'tr' ? 'Kilitli Eşya' : 'Locked Item')}">
          <span>${it.isOwned ? it.icon : '🔒'}</span>
          <span>${it.isOwned ? it.name : '???'}</span>
        </div>
      `).join('');

      card.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--rc-ink);">
            <span>${col.icon}</span>
            <span>${col.title}</span>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: ${col.isComplete ? 'var(--rc-accent-green)' : 'var(--rc-accent-yellow)'};">
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
    const settingsModal = document.getElementById('settings-modal');
    const paneCollections = document.getElementById('pane-collections');
    if (settingsModal?.classList.contains('show') && paneCollections?.style.display !== 'none') {
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


