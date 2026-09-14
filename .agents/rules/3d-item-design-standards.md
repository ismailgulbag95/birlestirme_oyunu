# 3D Item Tasarım ve Üretim Standartları (Low-Poly Stylized)

Bu kural, projede üretilecek veya revize edilecek tüm 3D eşyalar (items) için bağlayıcıdır.

## 1. Temel Görsel Standart: Low-Poly Stylized

Tüm 3D eşyalar *Clash Mini*, *Monument Valley* ve modern stilize mobil oyun standartlarında **Low-Poly Stylized** olarak tasarlanmalıdır.

### Kesinlikle Yasak Olanlar (Anti-Patterns):
* **İlkel Plastik Bloklar:** Basit `BoxGeometry` veya düz segmentli `SphereGeometry` bloklarını üst üste yapıştırıp düz renk vermek YASAKTIR.
* **Aşırı Pürüzsüzleştirme:** Segment sayısını çok yüksek tutup (örneğin 32-64 segment) pürüzsüz küre/silindir yapmak yasaktır; bu yaklaşım eşyalara plastik oyuncak görüntüsü vermektedir.
* **Cansız/Hareketsiz Modeller:** Masaya konduğunda tamamen donuk duran eşya üretilemez.
* **Kaidesiz / Havada Asılı İlkel Şekiller:** Altında fasetli zemin tablası, sunum sehpası veya diorama kaidesi (çimen, kaya, nehir, ahşap tezgâh vb.) olmadan havada tek başına asılı duran modeller üretmek YASAKTIR.
* **Aşırı Soyut ve İçi Boş Minimalizm:** Örneğin tüyün sadece 2 kaba koniden, derinin havada asılı kahverengi bir bloktan, külçelerin tek bir yamuk kutudan ibaret olması gibi içi boş basitleştirmeler YASAKTIR. Her eşya zengin fasetli katmanlara, detaylara ve parçacıklara sahip olmalıdır.
* **Yapay Zemin Tablaları (Tablo/Kaide Fazlalığı):** Taşınabilir nesnelerin, aletlerin, külçelerin, zırhların, yiyeceklerin veya silahların altına yapay silindir/kutu zemin kaidesi (tablo/tabla) EKLENMEZ. Örneğin demir veya çelik külçelerin altında taş masa olmamalı, 3 külçe doğrudan kendi istifiyle sahnede merkezlenmelidir. Zemin kaideleri yalnızca ada, orman, nehir gibi coğrafi arazi modellerinde doğal olarak bulunmalıdır.
* **2D İkon ile Görsel Kopukluk:** 2D ikondaki karakteristik unsurların 3D modele aktarılmaması YASAKTIR. 3D model, 2D ikonun büyüleyici bir minyatür maketi olmalıdır.


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
