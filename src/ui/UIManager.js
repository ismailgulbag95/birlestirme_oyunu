import gsap from 'gsap';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions.js';

export class UIManager {
  constructor(onItemSelect, onGetHint, onWatchAd, onCleanup) {
    this.onItemSelect = onItemSelect;
    this.onGetHint = onGetHint; // (itemId) => result
    this.onWatchAd = onWatchAd; // (itemId) => void
    this.onCleanup = onCleanup; // () => void
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

      /* Temizlik Butonu */
      #cleanup-btn {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(239, 68, 68, 0.85);
        backdrop-filter: blur(8px);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }

      #cleanup-btn:active {
        transform: translateX(-50%) scale(0.92);
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
          <span>💡 İpuçları</span>
          <span class="hint-badge" id="hint-rights-badge">Hak: 3</span>
        </div>
        <div class="drawer-content" id="drawer-hints-list">
          <!-- Kilitli eşyalar dinamik yüklenecek -->
        </div>
      </div>

      <div id="right-panel">
        <div id="inv-controls" style="display: flex; flex-direction: column; gap: 5px; width: 100%; align-items: center; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.15);">
          <input type="text" id="item-search-input" placeholder="🔍 Ara..." autocomplete="off" spellcheck="false">
          <div style="display: flex; gap: 3px; width: 100%;">
            <button id="filter-btn" title="Kategoriye Göre Filtrele" style="flex: 1; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 6px; font-size: 8px; padding: 4px 1px; cursor: pointer; text-align: center; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">📁 Tümü</button>
            <button id="sort-btn" title="Sıralama Şekli" style="flex: 1; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 6px; font-size: 8px; padding: 4px 1px; cursor: pointer; text-align: center; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">⏳ Keşif</button>
          </div>
        </div>
        <div id="inv-items-container">
          <!-- Keşfedilen itemler dinamik yüklenecek -->
        </div>
      </div>

      <button id="cleanup-btn">🧹 Temizlik</button>

      <div id="discovery-banner">
        <div class="discovery-icon" id="discovery-icon"></div>
        <div>
          <div class="discovery-title" id="discovery-title">Yeni Keşif</div>
          <div class="discovery-desc" id="discovery-desc">Keşfedilen nesne açıklaması...</div>
        </div>
      </div>

      <div id="ad-modal">
        <div class="ad-box">
          <h3>📺 Reklam İzle</h3>
          <p>İpucu hakkınız bitti! Kısa bir reklam izleyerek hemen +1 İpucu kazanabilirsiniz.</p>
          <button class="ad-btn" id="watch-ad-btn">Reklamı İzle (+1 İpucu)</button>
          <button class="ad-close" id="close-ad-btn">Vazgeç</button>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    this._setupDrawerLogic();
    this._setupInventoryControls();
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

    document.getElementById('close-ad-btn').addEventListener('click', () => {
      document.getElementById('ad-modal').style.display = 'none';
    });
  }

  _setupInventoryControls() {
    const filterBtn = document.getElementById('filter-btn');
    const sortBtn = document.getElementById('sort-btn');

    const filters = ['all', 'elements', 'nature', 'life', 'craft_tools', 5, 6, 7, 8];
    const filterLabels = {
      all: '📁 Tümü',
      elements: '🔥 Element',
      nature: '🌱 Doğa',
      life: '🧬 Canlı',
      craft_tools: '⚔️ Zanaat',
      5: '🧪 Simya & Büyü',
      6: '⚙️ Mekanik',
      7: '🏗️ Ağır Sanayi',
      8: '🌌 Kozmoloji & Boyut'
    };

    filterBtn.addEventListener('click', () => {
      const idx = filters.indexOf(this.filterCategory);
      this.filterCategory = filters[(idx + 1) % filters.length];
      filterBtn.textContent = filterLabels[this.filterCategory] || '📁 Tümü';
      this._populateInventory();
    });

    const sorts = ['discovery', 'category'];
    const sortLabels = {
      discovery: '⏳ Keşif',
      category: '📂 Kategori'
    };

    sortBtn.addEventListener('click', () => {
      const idx = sorts.indexOf(this.sortMode);
      this.sortMode = sorts[(idx + 1) % sorts.length];
      sortBtn.textContent = sortLabels[this.sortMode];
      this._populateInventory();
    });

    const searchInput = document.getElementById('item-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLocaleLowerCase('tr');
        this._populateInventory();
      });
    }
  }

  updateHintRights(rights) {
    const badge = document.getElementById('hint-rights-badge');
    if (badge) badge.textContent = `Hak: ${rights}`;
  }

  populateHints(discoveredItems, lockedItems, hintSystem) {
    const list = document.getElementById('drawer-hints-list');
    list.innerHTML = '';

    const craftableItems = hintSystem.getCraftableLockedItems(discoveredItems, lockedItems);

    if (craftableItems.length === 0) {
      list.innerHTML = '<p style="text-align: center; color: #94a3b8; font-size: 12px; padding: 10px;">Şu an keşfedilebilir yeni ipucu yok. Farklı kombinasyonlar deneyin!</p>';
      return;
    }

    craftableItems.forEach(itemId => {
      const def = ITEM_DEFINITIONS[itemId];
      if (!def) return;

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

      const iconHtml = `<img src="/textures/items/${itemId}.png" class="item-img-icon" alt="${def.name}" style="filter: ${iconFilter};" onerror="this.onerror=null; this.parentNode.innerHTML='<span style=\\'filter: ${iconFilter};\\'>${def.icon || '✨'}</span>';">`;

      card.innerHTML = `
        <div class="icon-symbol" style="width: 36px; height: 36px; border-radius: 8px; background: ${iconBg}; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: ${iconShadow}; flex-shrink: 0; margin-top: 2px;">${iconHtml}</div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 13px; color: #f8fafc; margin-bottom: 2px;">${isNamed ? def.name : '???'}</h4>
          <p style="font-size: 11px; color: #94a3b8; margin-bottom: 6px; line-height: 1.4;">${hintObj.text}</p>
          ${canUse ? `<button class="hint-btn" data-id="${itemId}">İpucu Al (-1 Hak)</button>` : '<span style="font-size:11px; color:#10b981; font-weight:600;">✓ Tam İpucu Açık</span>'}
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
      // Search Query filter
      if (this.searchQuery) {
        const itemName = (def.name || '').toLocaleLowerCase('tr');
        if (!itemName.includes(this.searchQuery)) {
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
      const catOrder = { elements: 1, nature: 2, life: 3, craft_tools: 4, 5: 5, '5': 5, 6: 6, '6': 6, 7: 7, '7': 7, 8: 8, '8': 8 };
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
      const def = ITEM_DEFINITIONS[id];
      if (!def) return;

      const btn = document.createElement('div');
      btn.className = 'item-icon-btn';
      btn.innerHTML = `
        <div class="icon-symbol" style="font-size: 18px; margin-bottom: 2px; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.1); box-shadow: 0 0 8px ${def.colorPalette?.primary || '#38bdf8'};">
          <img src="/textures/items/${id}.png" class="item-img-icon" alt="${def.name}" onerror="this.onerror=null; this.parentNode.innerHTML='${def.icon || '✨'}';">
        </div>
        <span style="font-size: 9px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;">${def.name}</span>
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

    // Simge ve görsel (varsayılan yedek ilk harf veya boş)
    iconEl.innerHTML = `<img src="/textures/items/${itemId}.png" class="item-img-icon" alt="${def.name}" onerror="this.onerror=null; this.parentNode.innerHTML='<span style=\\'font-weight:700; font-size:16px; color:#cbd5e1;\\'>${def.name ? def.name[0].toUpperCase() : ''}</span>';">`;
    if (def.colorPalette?.primary) {
      iconEl.style.boxShadow = `0 0 16px ${def.colorPalette.primary}`;
    }

    // Başlık ve açıklama (emoji yok)
    titleEl.innerHTML = `Yeni Keşif: <span style="color: #67e8f9; margin-left: 4px;">"${def.name}"</span>`;
    descEl.textContent = def.description || 'Yeni bir element veya nesne ortaya çıkardın.';

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

