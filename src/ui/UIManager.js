import gsap from 'gsap';
import { ITEM_DEFINITIONS, getCanonicalId } from '../items/itemDefinitions.js';
import { i18n } from '../i18n/translations.js';

export class UIManager {
  constructor(onItemSelect, onGetHint, onWatchAd, onCleanup, onCharacterSwitch, onMusicToggle) {
    this.onItemSelect = onItemSelect;
    this.onGetHint = onGetHint; // (itemId) => result
    this.onWatchAd = onWatchAd; // (itemId) => void
    this.onCleanup = onCleanup; // () => void
    this.onCharacterSwitch = onCharacterSwitch; // (characterId) => void
    this.onMusicToggle = onMusicToggle; // () => boolean (isMuted)
    this.isMusicMuted = localStorage.getItem('alchemy_bgm_muted') === 'true';
    this.currentCharacterId = 'character2';
    this.filterCategory = 'all'; // 'all', 'elements', 'nature', 'life', 'craft_tools'
    this.sortMode = 'discovery'; // 'discovery', 'category'
    this.searchQuery = '';
    this.lastItemIds = [];
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

      /* Temizlik ve Karakter Butonları Barı */
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
        padding: 10px 18px;
        border-radius: 24px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
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

      #cleanup-btn {
        background: rgba(239, 68, 68, 0.85);
      }

      #cleanup-btn:hover {
        background: rgba(239, 68, 68, 1);
      }

      #character-switch-btn {
        background: linear-gradient(135deg, rgba(79, 70, 229, 0.85), rgba(147, 51, 234, 0.85));
        border: 1px solid rgba(167, 139, 250, 0.4);
      }

      #character-switch-btn:hover {
        background: linear-gradient(135deg, rgba(79, 70, 229, 1), rgba(147, 51, 234, 1));
        box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
      }

      #lang-toggle-btn {
        background: linear-gradient(135deg, rgba(14, 165, 233, 0.85), rgba(59, 130, 246, 0.85));
        border: 1px solid rgba(125, 211, 252, 0.4);
      }

      #lang-toggle-btn:hover {
        background: linear-gradient(135deg, rgba(14, 165, 233, 1), rgba(59, 130, 246, 1));
        box-shadow: 0 6px 20px rgba(14, 165, 233, 0.45);
      }

      #music-toggle-btn {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.85));
        border: 1px solid rgba(110, 231, 183, 0.4);
      }

      #music-toggle-btn:hover {
        background: linear-gradient(135deg, rgba(16, 185, 129, 1), rgba(5, 150, 105, 1));
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
      }

      #music-toggle-btn.muted {
        background: linear-gradient(135deg, rgba(100, 116, 139, 0.85), rgba(71, 85, 105, 0.85));
        border-color: rgba(148, 163, 184, 0.3);
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

      <div id="bottom-action-bar">
        <button id="cleanup-btn" class="action-pill-btn">${i18n.t('cleanup')}</button>
        <button id="character-switch-btn" class="action-pill-btn">${this.currentCharacterId === 'character2' ? i18n.t('char_observer') : i18n.t('char_apprentice')}</button>
        <button id="music-toggle-btn" class="action-pill-btn ${this.isMusicMuted ? 'muted' : ''}">${this.isMusicMuted ? i18n.t('music_off') : i18n.t('music_on')}</button>
        <button id="lang-toggle-btn" class="action-pill-btn">${i18n.t('lang_btn')}</button>
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
      musicBtn.textContent = this.isMusicMuted ? i18n.t('music_off') : i18n.t('music_on');
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

    // 7. Refresh inventory and hints
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
        this.isMusicMuted = this.onMusicToggle();
      } else {
        this.isMusicMuted = !this.isMusicMuted;
      }

      musicBtn.classList.toggle('muted', this.isMusicMuted);
      musicBtn.textContent = this.isMusicMuted ? i18n.t('music_off') : i18n.t('music_on');
    });
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

