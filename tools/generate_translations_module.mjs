import fs from 'fs';

const i18nData = JSON.parse(fs.readFileSync('tools/full_i18n.json', 'utf8'));

const code = `// Internationalization (i18n) Module
// Supports 'tr' and 'en' for all 180+ items and UI elements.

export const TRANSLATIONS = ${JSON.stringify(i18nData, null, 2)};

class I18nManager {
  constructor() {
    // Check localStorage or default to 'tr'
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
console.log('src/i18n/translations.js successfully generated!');
