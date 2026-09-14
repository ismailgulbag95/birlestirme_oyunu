# 3D Item Tasarım ve Üretim Standartları (Low-Poly Stylized)

Bu kural, projede üretilecek veya revize edilecek tüm 3D eşyalar (items) için bağlayıcıdır.

## 1. Temel Görsel Standart: Low-Poly Stylized

Tüm 3D eşyalar *Clash Mini*, *Monument Valley* ve modern stilize mobil oyun standartlarında **Low-Poly Stylized** olarak tasarlanmalıdır.

### Kesinlikle Yasak Olanlar (Anti-Patterns):
* **İlkel Plastik Bloklar:** Basit `BoxGeometry` veya düz segmentli `SphereGeometry` bloklarını üst üste yapıştırıp düz renk vermek YASAKTIR.
* **Aşırı Pürüzsüzleştirme:** Segment sayısını çok yüksek tutup (örneğin 32-64 segment) pürüzsüz küre/silindir yapmak yasaktır; bu yaklaşım eşyalara plastik oyuncak görüntüsü vermektedir.
* **Cansız/Hareketsiz Modeller:** Masaya konduğunda tamamen donuk duran eşya üretilemez.

---

## 2. Geometri ve Materyal Kuralları

1. **Flat Shading Zorunluluğu:**
   * Tüm materyallerde `flatShading: true` kullanılmalıdır.
   * Yüzeyler elmas veya kristal gibi belirgin fasetlerden (düzgen yüzeylerden) oluşmalıdır.
   * `IcosahedronGeometry(r, 0 veya 1)`, `DodecahedronGeometry(r, 0)`, `TetrahedronGeometry` veya düşük segmentli koni/silindirler (örneğin 4-7 segmentli `ConeGeometry`, `CylinderGeometry`) tercih edilmelidir.

2. **Canlı Renk ve Aydınlatma Paleti:**
   * Düz ve soluk renkler yerine doygun, pastel ve zengin renkler kullanılmalıdır.
   * Materyalde gerekirse hafif `emissive` ve `emissiveIntensity` kullanılarak parıldama etkisi verilmelidir.
   * Gerektiğinde `MeshToonMaterial` veya `MeshPhysicalMaterial` (berrak sıvılar/camlar için) kullanılmalıdır.

3. **Ölçek ve Zemin Uyumu:**
   * Her eşya masadaki tabak (slot) üzerinde dengeli durmalı; taban yüksekliği `0.05 - 0.1` seviyesinden başlamalı ve toplam yükseklik yaklaşık `0.9 - 1.2` birimi geçmemelidir.
   * Eşyanın tabanında organik bir parça (kaya, odun, su dalgası, minik kaide) bulunması minyatür maket hissini güçlendirir.

---

## 3. Canlı Mikro-Animasyonlar (`userData.update`)

Her eşya grubu mutlaka `group.userData.update = (time, delta) => { ... }` fonksiyonunu içermelidir:
* **Hafif Nefes Alma / Salınım:** `scale` veya `position.y` değerinde `Math.sin(time * speed)` salınımı.
* **Yavaş Dönüş veya Yörünge:** Etrafındaki küçük parçacıkların (kıvılcım, yaprak, damla, parıltı) eliptik yörüngede dönmesi.
* **Işık Titremesi:** Varsa `PointLight` yoğunluğunun ritmik dalgalanması.
* Tüm animasyonlar hafif, optimize ve 60 FPS dostu olmalıdır.
