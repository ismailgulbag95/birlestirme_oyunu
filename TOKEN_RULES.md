# Token Tasarrufu ve Mühendislik Kuralları (Token Rules & Guidelines)

Bu proje; token tüketimini minimumda tutmak, bağlam penceresini korumak ve aşırı mühendisliği (over-engineering) önlemek için optimize edilmiştir.

---

## 1. Temel İlkeler ve Davranış Standartları
- **Cerrahi Değişiklikler (Agency Minimal Change):** Dosyaları baştan sona yeniden yazdırmak yerine yalnızca ilgili satırları (`replace_file_content`) güncelleyin.
- **Yalın İletişim (Caveman):** Dolgu sözcükleri ve gereksiz teyit ifadelerini atlayın; doğrudan sonuca odaklanın.
- **YAGNI ve En Sade Çözüm (Ponytail):** İstenmeyen soyutlamalardan kaçının. Standart kütüphane ve yerel platform API'lerini kullanın.
- **Bağlam Bütçesi (Context Budget & Strategic Compact):** Dosyaların tamamını okumak yerine hedefe yönelik parçalı okuma (`StartLine`/`EndLine`, `grep_search`) yapın.

---

## 2. Projede Aktif Olan Yetenekler (.agents/skills)

| Yetenek (Skill) | Amaç ve Kapsam |
|---|---|
| [caveman](file:///d:/github/birlestirme_oyunu/.agents/skills/caveman/SKILL.md) | Çıktı token'larını kısmak için dolgusuz, ultra-öz teknik iletişim. |
| [caveman-compress](file:///d:/github/birlestirme_oyunu/.agents/skills/caveman-compress/SKILL.md) | Kural ve bellek dosyalarını sıkıştırarak girdi token maliyetini düşürme. |
| [ponytail](file:///d:/github/birlestirme_oyunu/.agents/skills/ponytail/SKILL.md) | Aşırı mühendisliği önleyen, en sade çözümü zorlayan kıdemli geliştirici refleksi. |
| [ponytail-audit](file:///d:/github/birlestirme_oyunu/.agents/skills/ponytail-audit/SKILL.md) | Kod tabanındaki gereksiz şişkinlikleri ve ölü kodları tarama. |
| [ponytail-review](file:///d:/github/birlestirme_oyunu/.agents/skills/ponytail-review/SKILL.md) | Diff incelemelerinde karmaşıklığı avlama ve satır azaltma odaklı review. |
| [ponytail-debt](file:///d:/github/birlestirme_oyunu/.agents/skills/ponytail-debt/SKILL.md) | Bilinçli ertelenen optimizasyonları ve borçları kayıt altında tutma. |
| [agency-minimal-change](file:///d:/github/birlestirme_oyunu/.agents/skills/agency-minimal-change/SKILL.md) | Kapsam kaymasını (scope creep) önleyen cerrahi kod müdahalesi. |
| [karpathy-guidelines](file:///d:/github/birlestirme_oyunu/.agents/skills/karpathy-guidelines/SKILL.md) | Kodlamadan önce düşünme, varsayım sorgulama ve basitlik ilkeleri. |
| [context-budget](file:///d:/github/birlestirme_oyunu/.agents/skills/context-budget/SKILL.md) | Bağlam penceresi tüketimini ve MCP/kural şişkinliklerini denetleme. |
| [strategic-compact](file:///d:/github/birlestirme_oyunu/.agents/skills/strategic-compact/SKILL.md) | Mantıksal aşamalarda stratejik bağlam temizleme rehberi. |
| [project-token-saver](file:///d:/github/birlestirme_oyunu/.agents/skills/project-token-saver/SKILL.md) | Projeye özel cerrahi müdahale ve token tasarruf yönergeleri. |

---

## 3. Aktif Kural Dosyası
- [token-efficiency.md](file:///d:/github/birlestirme_oyunu/.agents/rules/token-efficiency.md)
