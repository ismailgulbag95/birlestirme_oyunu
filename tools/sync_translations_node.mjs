import fs from 'fs';
import { GRANDMASTER_ITEM_DEFINITIONS } from '../src/items/itemDefinitions.js';
import { TRANSLATIONS } from '../src/i18n/translations.js';

const trItems = TRANSLATIONS.tr.items || {};
const enItems = TRANSLATIONS.en.items || {};

for (const [id, def] of Object.entries(GRANDMASTER_ITEM_DEFINITIONS)) {
  if (!trItems[id]) {
    trItems[id] = {
      name: def.name,
      description: def.description
    };
  }
  if (!enItems[id]) {
    enItems[id] = {
      name: def.name,
      description: def.description
    };
  }
}

TRANSLATIONS.tr.items = trItems;
TRANSLATIONS.en.items = enItems;

const content = `// Internationalization (i18n) Module
// Synchronized with ${Object.keys(GRANDMASTER_ITEM_DEFINITIONS).length} items for Multi-Mode Crafting

export const TRANSLATIONS = ${JSON.stringify(TRANSLATIONS, null, 2)};

export class I18nManager {
  constructor() {
    this.currentLanguage = this._detectLanguage();
    this.listeners = [];
  }

  _detectLanguage() {
    try {
      const saved = localStorage.getItem('alchemy_language') || localStorage.getItem('alchemy_lang');
      if (saved === 'en' || saved === 'tr') return saved;
    } catch (e) {}
    return 'tr';
  }

  get language() {
    return this.currentLanguage;
  }

  set language(lang) {
    this.setLanguage(lang);
  }

  setLanguage(lang) {
    if (lang !== 'tr' && lang !== 'en') return;
    this.currentLanguage = lang;
    try {
      localStorage.setItem('alchemy_language', lang);
      localStorage.setItem('alchemy_lang', lang);
    } catch (e) {}
    this.listeners.forEach(fn => {
      try { fn(lang); } catch (err) { console.warn("Language listener error:", err); }
    });
  }

  toggleLanguage() {
    const next = this.currentLanguage === 'tr' ? 'en' : 'tr';
    this.setLanguage(next);
    return next;
  }

  onLanguageChange(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    }
  }

  t(key, params = {}) {
    const dict = TRANSLATIONS[this.currentLanguage]?.ui || TRANSLATIONS['tr']?.ui || {};
    let text = dict[key] || TRANSLATIONS['tr']?.ui?.[key] || key;
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), v);
    }
    return text;
  }

  getItem(itemId) {
    const canonical = (itemId || '').toLowerCase().trim();
    const lang = this.currentLanguage;
    const itemData = TRANSLATIONS[lang]?.items?.[canonical] || 
                     TRANSLATIONS[lang]?.items?.[itemId] || 
                     TRANSLATIONS['tr']?.items?.[canonical] || 
                     TRANSLATIONS['tr']?.items?.[itemId];
    return itemData || null;
  }

  getItemName(itemId, fallback = '') {
    const data = this.getItem(itemId);
    return data?.name || fallback || itemId;
  }

  getItemDescription(itemId, fallback = '') {
    const data = this.getItem(itemId);
    return data?.description || data?.desc || fallback || '';
  }
}

export const i18n = new I18nManager();
`;

fs.writeFileSync('src/i18n/translations.js', content, 'utf-8');
console.log(`BAŞARILI: translations.js ${Object.keys(GRANDMASTER_ITEM_DEFINITIONS).length} eşya ile senkronize edildi.`);
