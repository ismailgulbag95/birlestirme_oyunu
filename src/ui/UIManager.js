import gsap from 'gsap';
import { ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';
import { i18n } from '../i18n/translations.js';

export class UIManager {
  constructor(onItemSelect, onGetHint, onWatchAd, onCleanup, onCharacterSwitch, onMusicToggle, debugHandlers = {}) {
    this.onItemSelect = onItemSelect;
    this.onGetHint = onGetHint; // (itemId) => result
    this.onWatchAd = onWatchAd; // (itemId) => void
    this.onCleanup = onCleanup; // () => void
    this.onCharacterSwitch = onCharacterSwitch; // (characterId) => void
    this.onMusicToggle = onMusicToggle; // () => number (musicMode: 1, 2, 0)
    this.debugHandlers = debugHandlers; // { onUnlockAll, onSetInfiniteHints, onRevealAllHints, onResetProgress, onSpawnBasics }
    const savedMode = parseInt(localStorage.getItem('alchemy_music_mode'), 10);
    this.musicMode = isNaN(savedMode) ? 1 : savedMode;
    this.currentCharacterId = 'character2';
    this.filterCategory = 'all'; // 'all', 'elements', 'nature', 'life', 'craft_tools'
    this.sortMode = 'discovery'; // 'discovery', 'category'
    this.searchQuery = '';
    this.lastItemIds = [];
    this.infiniteHintsEnabled = false;
    this.fpsHudEnabled = false;
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

      /* Sağ Panel: Keşfedilen Itemler */
      #right-panel {
        position: absolute;
        right: 12px;
        top: 20px;
        width: 104px;
        height: calc(100% - 100px);
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 6px;
        gap: 8px;
        pointer-events: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        overflow: hidden;
      }

      #inv-items-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
        overflow-y: auto;
        flex: 1;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
      }

      #inv-items-container::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
        width: 0;
        height: 0;
      }

      #item-search-input {
        width: 100%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 8px;
        padding: 5px 6px;
        color: #f8fafc;
        font-size: 10px;
        font-weight: 500;
        outline: none;
        box-sizing: border-box;
        transition: all 0.2s ease;
        text-align: center;
      }

      #item-search-input:focus {
        background: rgba(255, 255, 255, 0.16);
        border-color: #38bdf8;
        box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
      }

      #item-search-input::placeholder {
        color: #94a3b8;
        font-size: 10px;
      }

      .item-icon-btn {
        width: 72px;
        height: 64px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
        padding: 4px 2px;
      }

      .item-icon-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-2px);
      }

      .item-icon-btn:active {
        transform: scale(0.92);
        background: rgba(255, 255, 255, 0.25);
      }

      .item-img-icon {
        width: 32px;
        height: 32px;
        object-fit: contain;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        pointer-events: none;
      }

      /* Sol Panel: Drawer (Kilitli Eşyalar & İpuçları) */
      #left-drawer {
        position: absolute;
        left: -280px;
        top: 60px;
        width: 260px;
        height: calc(100% - 140px);
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 0 20px 20px 0;
        pointer-events: auto;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        z-index: 20;
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
      }

      #left-drawer.open {
        transform: translateX(280px);
      }

      #drawer-toggle {
        position: absolute;
        right: -42px;
        top: 20px;
        width: 42px;
        height: 48px;
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-left: none;
        border-radius: 0 12px 12px 0;
        color: #ffffff;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        pointer-events: auto;
      }

      .drawer-header {
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 15px;
        font-weight: 700;
        color: #f8fafc;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .hint-badge {
        background: #f59e0b;
        color: #0f172a;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 700;
      }

      .drawer-content {
        flex: 1;
        padding: 12px;
        overflow-y: auto;
        color: #cbd5e1;
        font-size: 13px;
        line-height: 1.5;
      }

      .locked-item-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
      }

      .locked-item-card h4 {
        color: #f8fafc;
        margin-bottom: 4px;
        font-size: 13px;
      }

      .locked-item-card p {
        color: #94a3b8;
        font-size: 12px;
        margin-bottom: 8px;
      }

      .hint-btn {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }

      .hint-btn:hover {
        background: #2563eb;
      }

      .hint-btn:disabled {
        background: #475569;
        cursor: not-allowed;
      }

      /* Alt Bar: Şık Ayarlar Butonu */
      #bottom-action-bar {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
        align-items: center;
        pointer-events: auto;
        z-index: 15;
      }

      .action-pill-btn {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.25);
        padding: 10px 20px;
        border-radius: 24px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
      }

      .action-pill-btn:hover {
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.4);
      }

      .action-pill-btn:active {
        transform: scale(0.94);
      }

      #settings-open-btn {
        background: linear-gradient(135deg, rgba(30, 41, 59, 0.92), rgba(15, 23, 42, 0.98));
        border: 1.5px solid rgba(56, 189, 248, 0.4);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 15px rgba(56, 189, 248, 0.25);
      }

      #settings-open-btn:hover {
        background: linear-gradient(135deg, rgba(51, 65, 85, 0.95), rgba(30, 41, 59, 1));
        border-color: rgba(56, 189, 248, 0.7);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5), 0 0 25px rgba(56, 189, 248, 0.45);
      }

      /* Settings Modal */
      #settings-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
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
        background: linear-gradient(145deg, rgba(30, 41, 59, 0.96), rgba(15, 23, 42, 0.98));
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;
        padding: 20px 22px;
        width: 90%;
        max-width: 440px;
        color: white;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15);
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
          transform: scale(0.92) translateY(12px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        padding-bottom: 12px;
      }

      .settings-title {
        font-size: 17px;
        font-weight: 800;
        color: #f8fafc;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .settings-close-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #cbd5e1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        transition: all 0.2s ease;
      }

      .settings-close-icon:hover {
        background: rgba(239, 68, 68, 0.3);
        color: #ef4444;
        border-color: rgba(239, 68, 68, 0.5);
      }

      .settings-tabs {
        display: flex;
        gap: 8px;
        background: rgba(0, 0, 0, 0.3);
        padding: 4px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .settings-tab-btn {
        flex: 1;
        padding: 8px 12px;
        border-radius: 8px;
        border: none;
        background: transparent;
        color: #94a3b8;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }

      .settings-tab-btn.active {
        background: rgba(56, 189, 248, 0.2);
        color: #38bdf8;
        box-shadow: 0 2px 8px rgba(56, 189, 248, 0.2);
        border: 1px solid rgba(56, 189, 248, 0.4);
      }

      .settings-tab-pane {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .settings-btn-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 10px 14px;
        gap: 12px;
      }

      .settings-btn-row-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
      }

      .settings-btn-label {
        font-size: 13px;
        font-weight: 700;
        color: #f1f5f9;
      }

      .settings-btn-sub {
        font-size: 11px;
        color: #94a3b8;
      }

      .settings-action-btn {
        padding: 8px 14px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        user-select: none;
      }

      .settings-action-btn:active {
        transform: scale(0.95);
      }

      .btn-danger {
        background: rgba(239, 68, 68, 0.85);
        color: white;
        border-color: rgba(239, 68, 68, 0.4);
      }
      .btn-danger:hover {
        background: rgba(239, 68, 68, 1);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      }

      .btn-danger-outline {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
        border-color: rgba(239, 68, 68, 0.4);
      }
      .btn-danger-outline:hover {
        background: rgba(239, 68, 68, 0.3);
        border-color: rgba(239, 68, 68, 0.7);
      }

      .btn-purple {
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.85), rgba(168, 85, 247, 0.85));
        color: white;
        border-color: rgba(167, 139, 250, 0.4);
      }
      .btn-purple:hover {
        background: linear-gradient(135deg, rgba(124, 58, 237, 1), rgba(168, 85, 247, 1));
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
      }

      .btn-green {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.85));
        color: white;
        border-color: rgba(110, 231, 183, 0.4);
      }
      .btn-green:hover {
        background: linear-gradient(135deg, rgba(16, 185, 129, 1), rgba(5, 150, 105, 1));
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      }
      .btn-green.muted {
        background: linear-gradient(135deg, rgba(100, 116, 139, 0.85), rgba(71, 85, 105, 0.85));
        border-color: rgba(148, 163, 184, 0.3);
      }

      .btn-blue {
        background: linear-gradient(135deg, rgba(14, 165, 233, 0.85), rgba(59, 130, 246, 0.85));
        color: white;
        border-color: rgba(125, 211, 252, 0.4);
      }
      .btn-blue:hover {
        background: linear-gradient(135deg, rgba(14, 165, 233, 1), rgba(59, 130, 246, 1));
        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
      }

      .btn-amber {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.85), rgba(217, 119, 6, 0.85));
        color: white;
        border-color: rgba(251, 191, 36, 0.4);
      }
      .btn-amber:hover {
        background: linear-gradient(135deg, rgba(245, 158, 11, 1), rgba(217, 119, 6, 1));
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
      }
      .btn-amber.active {
        box-shadow: 0 0 14px rgba(245, 158, 11, 0.7);
        border-color: #fef08a;
      }

      .btn-cyan {
        background: linear-gradient(135deg, rgba(6, 182, 212, 0.85), rgba(14, 165, 233, 0.85));
        color: white;
        border-color: rgba(103, 232, 249, 0.4);
      }
      .btn-cyan:hover {
        background: linear-gradient(135deg, rgba(6, 182, 212, 1), rgba(14, 165, 233, 1));
        box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
      }

      .btn-indigo {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.85), rgba(79, 70, 229, 0.85));
        color: white;
        border-color: rgba(165, 180, 252, 0.4);
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
    `;
    document.head.appendChild(style);
  }

  _createUI() {
    const container = document.createElement('div');
    container.id = 'ui-container';
    container.innerHTML = `
      <div id="left-drawer">
        <div id="drawer-toggle">☰</div>
        <div class="drawer-header">
          <span id="drawer-hints-title">${i18n.t('hints_title')}</span>
          <span class="hint-badge" id="hint-rights-badge">${i18n.t('hint_rights', { n: 3 })}</span>
        </div>
        <div class="drawer-content" id="drawer-hints-list">
          <!-- Kilitli eşyalar dinamik yüklenecek -->
        </div>
      </div>

      <div id="right-panel">
        <div id="inv-controls" style="display: flex; flex-direction: column; gap: 5px; width: 100%; align-items: center; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.15);">
          <input type="text" id="item-search-input" placeholder="${i18n.t('search_placeholder')}" autocomplete="off" spellcheck="false">
          <div style="display: flex; gap: 3px; width: 100%;">
            <button id="filter-btn" title="Filter by Category" style="flex: 1; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 6px; font-size: 8px; padding: 4px 1px; cursor: pointer; text-align: center; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${this._getFilterLabel('all')}</button>
            <button id="sort-btn" title="Sort Order" style="flex: 1; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 6px; font-size: 8px; padding: 4px 1px; cursor: pointer; text-align: center; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${this._getSortLabel('discovery')}</button>
          </div>
        </div>
        <div id="inv-items-container">
          <!-- Keşfedilen itemler dinamik yüklenecek -->
        </div>
      </div>

      <div id="fps-counter-hud">FPS: -- | Nesne: 0</div>

      <div id="bottom-action-bar">
        <button id="settings-open-btn" class="action-pill-btn">
          <span style="font-size: 15px;">⚙️</span>
          <span id="settings-open-btn-label">${i18n.t('settings_btn')}</span>
        </button>
      </div>

      <div id="settings-modal">
        <div class="settings-box">
          <div class="settings-header">
            <div class="settings-title">
              <span>⚙️</span>
              <span id="settings-modal-title">${i18n.t('settings_title')}</span>
            </div>
            <button class="settings-close-icon" id="settings-close-btn" title="${i18n.t('settings_close')}">✕</button>
          </div>

          <div class="settings-tabs">
            <button class="settings-tab-btn active" id="tab-general-btn" data-tab="general">${i18n.t('tab_general')}</button>
            <button class="settings-tab-btn" id="tab-debug-btn" data-tab="debug">${i18n.t('tab_debug')}</button>
          </div>

          <!-- Genel Ayarlar Sekmesi -->
          <div class="settings-tab-pane" id="pane-general">
            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-cleanup">${i18n.t('cleanup')}</span>
                <span class="settings-btn-sub" id="sub-cleanup">Masadaki tüm eşyaları ve kırıkları temizle</span>
              </div>
              <button id="cleanup-btn" class="settings-action-btn btn-danger">${i18n.t('cleanup')}</button>
            </div>

            <div class="settings-btn-row">
              <div class="settings-btn-row-info">
                <span class="settings-btn-label" id="label-character">Karakter</span>
                <span class="settings-btn-sub" id="sub-character">Gözlemci veya Çırak arasında geçiş yap</span>
              </div>
              <button id="character-switch-btn" class="settings-action-btn btn-purple">${this.currentCharacterId === 'character2' ? i18n.t('char_observer') : i18n.t('char_apprentice')}</button>
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

      <div id="ad-modal">
        <div class="ad-box">
          <h3 id="ad-title">${i18n.t('ad_title')}</h3>
          <p id="ad-desc">${i18n.t('ad_desc')}</p>
          <button class="ad-btn" id="watch-ad-btn">${i18n.t('ad_watch_btn')}</button>
          <button class="ad-close" id="close-ad-btn">${i18n.t('ad_cancel_btn')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    this._setupDrawerLogic();
    this._setupInventoryControls();
    this._setupLanguageToggle();
    this._setupMusicToggle();
    this._setupSettingsLogic();
  }

  _getFilterLabel(cat) {
    const map = {
      all: 'all_categories',
      elements: 'cat_elements',
      nature: 'cat_nature',
      life: 'cat_life',
      craft_tools: 'cat_craft_tools',
      5: 'cat_5',
      6: 'cat_6',
      7: 'cat_7',
      8: 'cat_8',
      9: 'cat_9',
      10: 'cat_10'
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
    // 1. Language button label
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) langBtn.textContent = i18n.t('lang_btn');

    // 2. Action buttons
    const cleanupBtn = document.getElementById('cleanup-btn');
    if (cleanupBtn) cleanupBtn.textContent = i18n.t('cleanup');

    const charBtn = document.getElementById('character-switch-btn');
    if (charBtn) {
      charBtn.textContent = this.currentCharacterId === 'character2' ? i18n.t('char_observer') : i18n.t('char_apprentice');
    }

    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      musicBtn.textContent = this._getMusicButtonLabel();
      musicBtn.classList.toggle('muted', this.musicMode === 0);
    }

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
    const tabDebugBtn = document.getElementById('tab-debug-btn');
    if (tabDebugBtn) tabDebugBtn.textContent = i18n.t('tab_debug');
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

    // 8. Refresh inventory and hints
    this._populateInventory();
    if (this._lastHintsArgs) {
      this.populateHints(...this._lastHintsArgs);
    }
  }

  _setupDrawerLogic() {
    const drawer = document.getElementById('left-drawer');
    const toggle = document.getElementById('drawer-toggle');

    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
      toggle.textContent = drawer.classList.contains('open') ? '✕' : '☰';
    });

    document.getElementById('cleanup-btn').addEventListener('click', () => {
      if (this.onCleanup) {
        this.onCleanup();
      }
    });

    const charBtn = document.getElementById('character-switch-btn');
    if (charBtn) {
      charBtn.addEventListener('click', () => {
        // character1 <-> character2 değişimi
        this.currentCharacterId = this.currentCharacterId === 'character2' ? 'character1' : 'character2';
        const label = this.currentCharacterId === 'character2' ? i18n.t('char_observer') : i18n.t('char_apprentice');
        charBtn.textContent = label;

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
      openBtn.addEventListener('click', () => {
        modal.classList.add('show');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
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
    const tabDebugBtn = document.getElementById('tab-debug-btn');
    const paneGeneral = document.getElementById('pane-general');
    const paneDebug = document.getElementById('pane-debug');

    if (tabGeneralBtn && tabDebugBtn && paneGeneral && paneDebug) {
      tabGeneralBtn.addEventListener('click', () => {
        tabGeneralBtn.classList.add('active');
        tabDebugBtn.classList.remove('active');
        paneGeneral.style.display = 'flex';
        paneDebug.style.display = 'none';
      });

      tabDebugBtn.addEventListener('click', () => {
        tabDebugBtn.classList.add('active');
        tabGeneralBtn.classList.remove('active');
        paneDebug.style.display = 'flex';
        paneGeneral.style.display = 'none';
      });
    }

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

    const filters = ['all', 'elements', 'nature', 'life', 'craft_tools', 5, 6, 7, 8, 9, 10];

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

  updateCharacterButton(characterId) {
    this.currentCharacterId = characterId;
    const charBtn = document.getElementById('character-switch-btn');
    if (charBtn) {
      charBtn.textContent = characterId === 'character2' ? i18n.t('char_observer') : i18n.t('char_apprentice');
    }
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

      const iconFilter = isNamed ? 'none' : 'brightness(0)';
      const iconShadow = isNamed ? `0 0 10px ${def.colorPalette?.primary || '#38bdf8'}` : 'none';
      const iconBg = isNamed ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.35)';

      const canonicalId = getCanonicalId(itemId) || itemId;
      const iconHtml = `<img src="/textures/items/${canonicalId}.png" class="item-img-icon" alt="${localizedName}" style="filter: ${iconFilter};" onerror="this.onerror=null; this.parentNode.innerHTML='<span style=\\'filter: ${iconFilter};\\'>${def.icon || '✨'}</span>';">`;

      card.innerHTML = `
        <div class="icon-symbol" style="width: 36px; height: 36px; border-radius: 8px; background: ${iconBg}; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: ${iconShadow}; flex-shrink: 0; margin-top: 2px;">${iconHtml}</div>
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

      if (this.filterCategory === 'all') return true;
      const cat = def.category;
      if (this.filterCategory === 'elements' || this.filterCategory === 1 || this.filterCategory === '1') {
        return cat === 'elements' || String(cat) === '1';
      }
      if (this.filterCategory === 'nature' || this.filterCategory === 2 || this.filterCategory === '2') {
        return cat === 'nature' || String(cat) === '2';
      }
      if (this.filterCategory === 'life' || this.filterCategory === 3 || this.filterCategory === '3') {
        return cat === 'life' || String(cat) === '3';
      }
      if (this.filterCategory === 'craft_tools' || this.filterCategory === 4 || this.filterCategory === '4') {
        return cat === 'craft_tools' || String(cat) === '4';
      }
      return String(cat) === String(this.filterCategory);
    });

    // Sort
    if (this.sortMode === 'category') {
      const catOrder = { elements: 1, nature: 2, life: 3, craft_tools: 4, 5: 5, '5': 5, 6: 6, '6': 6, 7: 7, '7': 7, 8: 8, '8': 8, 9: 9, '9': 9, 10: 10, '10': 10 };
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

      const btn = document.createElement('div');
      btn.className = 'item-icon-btn';
      btn.innerHTML = `
        <div class="icon-symbol" style="font-size: 18px; margin-bottom: 2px; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.1); box-shadow: 0 0 8px ${def.colorPalette?.primary || '#38bdf8'};">
          <img src="/textures/items/${canonicalId}.png" class="item-img-icon" alt="${localizedName}" onerror="this.onerror=null; this.parentNode.innerHTML='${def.icon || '✨'}';">
        </div>
        <span style="font-size: 9px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;">${localizedName}</span>
      `;

      btn.addEventListener('click', () => {
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
    iconEl.innerHTML = `<img src="/textures/items/${canonicalId}.png" class="item-img-icon" alt="${localizedName}" onerror="this.onerror=null; this.parentNode.innerHTML='<span style=\\'font-weight:700; font-size:16px; color:#cbd5e1;\\'>${localizedName ? localizedName[0].toUpperCase() : ''}</span>';">`;
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
}

