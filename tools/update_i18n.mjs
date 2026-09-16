import fs from 'fs';
import { ITEM_DEFINITIONS } from '../src/items/itemDefinitions.js';

const i18nData = JSON.parse(fs.readFileSync('tools/full_i18n.json', 'utf8'));

const trItems = i18nData.tr?.items || {};
const enItems = i18nData.en?.items || {};

Object.entries(ITEM_DEFINITIONS).forEach(([itemId, def]) => {
  trItems[itemId] = {
    name: def.name || itemId,
    desc: def.description || ''
  };
  if (!enItems[itemId]) {
    enItems[itemId] = {
      name: def.name || itemId,
      desc: def.description || ''
    };
  }
});

i18nData.tr.items = trItems;
i18nData.en.items = enItems;

fs.writeFileSync('tools/full_i18n.json', JSON.stringify(i18nData, null, 2), 'utf8');

const code = `// Internationalization (i18n) Module
// Supports 'tr' and 'en' for all 521 items and UI elements.

export const TRANSLATIONS = ${JSON.stringify(i18nData, null, 2)};

class I18nManager {
  constructor() {
    let saved = null;
    try {
      saved = localStorage.getItem('alchemy_language');
    } catch (e) {}
    this.currentLanguage = (saved === 'en' || saved === 'tr') ? saved : 'tr';
    this.listeners = [];
  }

  get language() {
    return this.currentLanguage;
  }

  setLanguage(lang) {
    if (lang !== 'tr' && lang !== 'en') return;
    this.currentLanguage = lang;
    try {
      localStorage.setItem('alchemy_language', lang);
    } catch (e) {}
    this.listeners.forEach(fn => fn(lang));
  }

  toggleLanguage() {
    const next = this.currentLanguage === 'tr' ? 'en' : 'tr';
    this.setLanguage(next);
    return next;
  }

  onLanguageChange(listener) {
    this.listeners.push(listener);
  }

  t(key, params = {}) {
    const dict = TRANSLATIONS[this.currentLanguage]?.ui || TRANSLATIONS['tr'].ui;
    let text = dict[key] || key;
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp('\\\\{' + k + '\\\\}', 'g'), v);
    }
    return text;
  }

  getItem(itemId) {
    const lang = this.currentLanguage;
    const itemData = TRANSLATIONS[lang]?.items?.[itemId] || TRANSLATIONS['tr']?.items?.[itemId];
    return itemData || null;
  }

  getItemName(itemId, fallback = '') {
    const data = this.getItem(itemId);
    return data?.name || fallback || itemId;
  }

  getItemDescription(itemId, fallback = '') {
    const data = this.getItem(itemId);
    return data?.desc || fallback || '';
  }
}

export const i18n = new I18nManager();
`;

fs.writeFileSync('src/i18n/translations.js', code, 'utf8');
console.log('BAŞARILI: src/i18n/translations.js ve tools/full_i18n.json 521 item için güncellendi!');
