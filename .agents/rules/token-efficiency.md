# Token Tasarrufu ve Verimlilik Kuralı (Token Efficiency & Conservation)

Bu kural seti; modelin token tüketimini (input & output) minimumda tutması, bağlam penceresini (context window) koruması ve kod değişikliklerini en yalın/cerrahi şekilde gerçekleştirmesi için zorunludur.

---

## 1. Çıktı ve İletişim Standartları (Caveman & Terse)
- **Gereksiz Nezaket ve Dolgu Yok:** "Tabii ki!", "Memnuniyetle", "Anladım, şimdi uyguluyorum" gibi gereksiz onay ifadeleri kullanma. Doğrudan sonuca ve koda odaklan.
- **Yalın ve Kısa Cümleler:** ASD-STE100 mantığıyla, az kelimeyle maksimum bilgi aktar.
- **Tekrarlayan Özetleri Atla:** Zaten diff'te açıkça görülen kod değişikliklerini paragraflarca tekrar anlatma. Gerekçeyi 1-2 kısa cümleyle belirt.
- **Yanıt Dili:** Kullanıcı kuralına uygun olarak tüm açıklamalar Türkçe verilir.

---

## 2. Kod ve Mühendislik İlkeleri (Ponytail, YAGNI & Karpathy)
- **YAGNI (You Aren't Gonna Need It):** İstenmeyen hiçbir soyutlama, arayüz, factory veya "ileride lazım olur" düşüncesiyle ek yapı kurma.
- **En Sade Çözüm Merdiveni:**
  1. Bu kodun gerçekten var olması gerekiyor mu? (Gereksizse yapma)
  2. Projede zaten benzer bir yardımcı fonksiyon/tip var mı? (Yeniden kullan)
  3. Standart kütüphane veya platform API'si bunu çözüyor mu? (Bağımlılık ekleme)
  4. Tek satırda yazılabilir mi? (En sade olanı seç)
- **Cerrahi Değişiklikler (Agency Minimal Change):**
  - Yalnızca görevin talep ettiği satırlara müdahale et.
  - İlgisiz fonksiyonları, formatları veya yorum satırlarını "daha iyi görünmesi için" elden geçirme.
  - 3 benzer satır, erken yapılmış gereksiz bir soyutlamadan daha iyidir.

---

## 3. Bağlam ve Araç Yönetimi (Context Budget & Strategic Compact)
- **Hedefe Yönelik Okuma:** Dosyaların tamamını okumak yerine satır aralıkları (`StartLine`, `EndLine`) veya `grep_search` kullanarak sadece ilgili kısımları oku.
- **Parçalı Düzenleme:** Dosyaları baştan sona yeniden yazmak yerine (`write_to_file`), cerrahi araçları (`replace_file_content` veya `multi_replace_file_content`) kullan.
- **Stratejik Bağlam Yönetimi:** Görev fazı değişimlerinde (keşif bittiğinde, yeni aşamaya geçerken) bağlamı şişiren gereksiz geçici verilerden arın.

---

## 4. Eşya Üretim Kuralı (14'lü Item Production Workflow)
Kullanıcı eşya üretimi / yeni eşyalar istediğinde [docs/ITEM_PIPELINE.md](file:///d:/github/birlestirme_oyunu/docs/ITEM_PIPELINE.md) standardı zorunludur:
1. **Analiz:** `python tools/item_generator.py --scan` ile mevcut havuzu incele.
2. **14'lü Plan:** Tam 14 eşyadan oluşan mantıksal set ve tarifleri hazırla.
3. **Spritesheet:** 5x3 ızgara formatında `generate_image` ile beyaz arka planlı görsel üret (`assets/raw_sheets/`). **Kural:** Promptta ve görselde kesinlikle hiçbir yazı, harf, numara, başlık veya etiket (`NO text, NO labels, NO words, strictly icons only`) bulunmamalıdır.
4. **Dilimleme:** `python tools/item_generator.py --slice` ile şeffaf 256x256 PNG'ler oluştur (`public/textures/items/`).
5. **Kodlama:** `itemDefinitions.js`, `CraftingSystem.js`, `ItemFactory.js` ve `main.js` dosyalarına sırayla entegre et.

