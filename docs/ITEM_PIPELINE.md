# Yeni İtem Ekleme Pipeline & Otomasyon Rehberi

Bu rehber, oyuna yeni 14'lü eşya seti (yeni kategori) eklemek istediğinizde izlenecek uçtan uca akışı tanımlar.

---

## 1. Sistem Mimarisi & Adımlar

1. **Mevcut İtem Havuzunun Taranması & Analizi:**
   - `python tools/item_generator.py --scan`
   - Sistem mevcut 124 eşyayı ve 71 tarifi inceler.
   - **Kural:** Mevcut tarif kombinasyonları korunur; yalnızca aralarındaki anlamsal bağlamı (alakalılık düzeyini) belirgin derecede güçlendirecek durumlar varsa alternatif kombinasyon değerlendirilir.

2. **Görsel Promptunun Oluşturulması:**
   - Referans formattaki 5x3 grid (14 eşya) düzeninde NanoBanana / Gemini / Midjourney promptu oluşturulur.
   - Örnek:
     ```
     A neat 5x3 grid spritesheet containing exactly 14 individual 2D casual mobile game icons, completely isolated on a solid pure white background. Clean vector art, vibrant cell shading, bold crisp outlines, flat shading, zero background drop shadows. NO text, NO labels, NO words, NO titles, NO typography, NO numbers, strictly icon illustrations only. The image must distinctly feature each of these 14 separate items arranged in orderly rows: (1)... (14)... Generous empty white space between all items, bottom right corner is empty, perfectly modular for sprite slicing --ar 16:9 --v 6.0 --no text, font, letters, watermark, labels, names, words, typography, numbers
     ```

3. **Görselin Üretilmesi:**
   - AI asistanı (`generate_image` aracı) veya harici jeneratör üzerinden görsel üretilir.
   - Görsel `assets/raw_sheets/<dosya_adi>.png` yoluna kaydedilir.

4. **Arka Plan Temizleme ve Dilimleme (Otomatik):**
   - `tools/item_generator.py` görseldeki beyaz arka planı akıllı flood-fill ile şeffaf hale getirir.
   - 14 eşyayı sırasıyla kesip 256x256 şeffaf PNG olarak `public/textures/items/<item_id>.png` altına yazar.

5. **Kategori ve Eşya Tanımlarının Entegrasyonu:**
   - Üretilen tanımlar `src/items/itemDefinitions.js` dosyasına eklenir (`ITEM_DEFINITIONS` ve `RECIPES_CAT_X`).

6. **3D Three.js Geometri & Model Üretimi:**
   - 2D kesilen görsel referans alınarak `src/items/ItemFactory.js` içine prosedürel Three.js 3D modelleri (`_create<ItemId>Mesh(def)`) eklenir.

---

## 2. Hazır Komutlar

```bash
# Mevcut item havuzunu tara
python tools/item_generator.py --scan

# Yeni spritesheet görselini 14 parçaya böl ve textures klasörüne aktar
python tools/item_generator.py --slice assets/raw_sheets/yeni_sayfa.png --items-json tools/yeni_set.json
```
