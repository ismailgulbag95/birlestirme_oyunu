# Google Play yayın kontrol listesi

Durum: 2 Ekim 2026. Bu liste projedeki Android/Capacitor sürümü ve hazırlanan ASO paketine göre düzenlendi.

## Projede hazır olanlar

- Uygulama paketi: `com.birlestirme.oyunu`. Play Console'da oluşturacağınız uygulamanın paket adı bununla birebir aynı olmalı; Play paket adları kalıcıdır.
- Android uygulama etiketi: Türkçe cihazlarda `Curio Simya`, İngilizce cihazlarda `Curio Alchemy`.
- Yayın hedefi: Android 16, API 36. Bu, 31 Ağustos 2026'dan itibaren yeni uygulamalar için gereken seviyedir.
- Sürüm: `versionCode 1`, `versionName 1.0.0`; bu kod Play Console'da daha önce kullanılmadıysa ilk yükleme için uygundur. Daha önce herhangi bir kanala yüklediyseniz Console'daki en yüksek koddan büyük olmalı.
- Android yapı araçları: `minSdk 22`, `compileSdk/targetSdk 36`, AGP `8.9.1`, Gradle `8.11.1`; bu bilgisayarda derleme JDK `21` ile geçti.
- Production web varlıkları: kullanılmayan üç karakter önizlemesi `dist/` çıktısından çıkarılıyor, `public/` kaynak dosyaları korunuyor. Üretim `dist` toplamı `155.26 MiB`; güncel production varlıklarıyla debug APK `144.90 MiB` oldu. Bu APK yalnızca yerel derleme kanıtıdır, Play'e yüklenmez. Google Play'in 200 MB üstü bildirimi engelleyici değildir; kesin indirme boyutu AAB Console'a yüklendiğinde hesaplanır ([boyut kuralları](https://support.google.com/googleplay/android-developer/answer/9859372?hl=en-GB)).
- Manifest: `usesCleartextTraffic=false`; giriş Activity'si launcher olarak dışa açık, Google/Android kütüphanelerinin diğer dışa açık bileşenleri sistem izinleriyle korunuyor. FileProvider dışa kapalı. Uygulama/AdMob için internet ve reklam tanımlayıcısı izinleri birleşik manifestte mevcut.
- Oyun JavaScript/WebAssembly kullanıyor; Android APK'sında yerel `.so` kütüphanesi bulunmadı. Play'in native kod içeren uygulamalara yönelik 64-bit ve 16 KB sayfa boyutu şartları şu anki pakette tetiklenmiyor ([teknik kalite kuralları](https://support.google.com/googleplay/android-developer/answer/17492799?hl=en-GB)).
- Release kaynağında `debuggable=false`, `jniDebuggable=false`; R8/minification kapalı bırakıldı. Test reklamları yalnızca development/test modunda etkinleşiyor; release geçidi demo reklam kimliklerini reddediyor.
- AdMob plugin'i GMA `23.0.0` getiriyor; UMP doğrudan `3.2.0` kullanıyor. GMA `25.5.0` minimum API 24 istediği için Ads SDK yükseltmesi minSdk 22 cihaz desteğini daraltır; bu mevcut Play yükleme blocker'ı değil, ayrı cihaz desteği kararıdır ([resmî Ads SDK sürüm notları](https://developers.google.com/admob/android/rel-notes?hl=tr), [API uyumluluğu](https://developers.google.com/admob/android/migration?hl=en)).
- Son yerel kontrol: `npm run build`, `npx cap sync android` ve `assembleDebug` başarılı. `bundleRelease` güvenlik kapısında durdu; henüz üretim AdMob kimlikleri, herkese açık politika URL'si ve `android/key.properties` içindeki imza değerleri yok. Bu nedenle imzalı AAB henüz üretilmedi.
- Google Play başlıkları ve açıklamaları: [Türkçe](STORE_COPY_TR.md) ve [İngilizce](STORE_COPY_EN.md).
- Google Play ikon, üçer ekran görüntüsü ve özellik görseli: [dosya haritası](UPLOAD_FILES.md). Görsellerin boyutları ve JPEG/PNG biçimleri yerel olarak kontrol edildi.
- Gizlilik politikası bağlantısı uygulama Ayarları'nda görünür; üretim derlemesi `VITE_PRIVACY_POLICY_URL` olmadan durur.
- Reklam isteği ancak UMP kullanıcı tercihini kontrol ettikten sonra yapılır. UMP gizlilik seçenekleri hesabın mesaj ayarı bu girişi gerektiriyorsa Ayarlar'da gösterilir.
- Yayınlanacak proje `android/` altındaki Capacitor uygulamasıdır. Depo kökündeki `app/` klasörü ayrı bir örnek Gradle modülüdür; Play paketi üretmek için kullanılmamalıdır.

## Sizin Play Console ve AdMob'da yapmanız gerekenler

1. **Hesabı ve paket adını doğrulayın.** Play Console'da geliştirici kimlik doğrulama durumunu ve paket kaydını kontrol edin. Yeni uygulama oluştururken Console paketi otomatik kaydeder; `com.birlestirme.oyunu` adının kayıt ekranında kabul edildiğini doğrulayın. Paket daha önce cihazlara/başka bir dağıtıma çıktıysa Console, o paketin imza anahtarıyla sahiplik kanıtı isteyebilir. Uygulama adını veya package name'i kendiliğinizden değiştirmeyin. Geliştirici kimliği ve paket kaydı [resmî yönergede](https://developer.android.com/developer-verification/guides/google-play-console?hl=en) açıklanıyor.
2. **Uygulamayı oluşturun.** Türü oyun, varsayılan mağaza dili ve dağıtım ülkelerini seçin. Türkiye odaklı çıkışta varsayılan dil Türkçe; daha geniş İngilizce erişimde İngilizce (ABD) seçip Türkçe yerelleştirmeyi ekleyin. Kayıtlı paket adını sonradan değiştiremezsiniz.
3. **AdMob'u hazırlayın.** AdMob'da aynı Android uygulaması için üretim uygulama kimliğini ve ödüllü reklam birimini oluşturun. Gizlilik ve Mesajlaşma bölümünde hedeflediğiniz ülkeler ve yaş grubu için kullanıcı mesajlarını ayarlayın. Test reklam kimliklerini üretim paketi için kullanmayın.
4. **Gizlilik politikasını bitirin ve yayınlayın.** [Türkçe](PRIVACY_POLICY_TR_DRAFT.md) ve [İngilizce](PRIVACY_POLICY_EN_DRAFT.md) taslaklardaki yayıncı adı ve iletişim e-postası alanlarını doldurun; gerçek veri akışını ve hedef yaş grubunu kontrol edin. Sayfayı herkese açık, HTTPS kullanan ve PDF olmayan bir web sayfasında barındırın. Aynı URL'yi Play Console'a ve `VITE_PRIVACY_POLICY_URL` değişkenine girin.
5. **App content bildirimlerini doldurun.** Reklam varsa “Contains ads” beyanını işaretleyin. Data safety cevaplarını AdMob SDK'sı dâhil tüm bileşenlere göre verin. Mevcut kaynakta oyun ilerlemesi, dil ve ses tercihleri cihazda tutuluyor; oyun hesabı veya oyun sunucusuna gönderim yok. Google Mobile Ads SDK ise varsayılan olarak IP adresi, uygulama etkileşimleri, tanılama bilgileri ve cihaz/hesap tanımlayıcılarını reklam, analiz ve sahtekârlık önleme amaçlarıyla toplar ve paylaşır. Bu cevapları [Google'ın güncel SDK açıklaması](https://developers.google.com/admob/android/privacy/play-data-disclosure) ile tekrar eşleştirin.
6. **Hedef kitleyi ve içerik derecelendirmesini kendiniz beyan edin.** Yaş grupları, IARC içerik derecelendirmesi ve reklamların yaşa uygunluğu oyun sahibi tarafından doğru şekilde seçilmeli. Çocukları hedefleyen ya da çocukları da içeren bir kitle seçerseniz Families ve çocuk reklamı şartlarını ayrıca tamamlayın. Kaynak kod tek başına hedef yaş grubunu belirlemez.
7. **Mağaza sayfasını doldurun.** İsim ve açıklamaları ilgili dil sürümünden kopyalayın; Puzzle kategorisini seçin. İkon ve ekran görüntülerini `UPLOAD_FILES.md` haritasından yükleyin. Destek e-postası/URL'si, gizlilik URL'si, ülke ve fiyat bilgilerini girin. Bu oyun hesap girişi istemiyor; App access bölümünde inceleme için oturum bilgisi gerekmediğini belirtin.
8. **Üretim reklam ayarlarını yerel dosyaya girin.** `.env.example` dosyasını `.env.local` adıyla kopyalayın; `ADMOB_APP_ID`, `VITE_ADMOB_REWARDED_AD_UNIT_ID` ve `VITE_PRIVACY_POLICY_URL` alanlarını üretim değerleriyle değiştirin. `.env.local` Git'e eklenmez. Buraya keystore parolası yazmayın.
9. **Play App Signing'i etkinleştirin ve imza ayarlarını girin.** `android/key.properties` dosyasını açıp `storeFile`, `keyAlias`, `storePassword` ve `keyPassword` alanlarına kendi değerlerinizi yazın. `storeFile` yolu `android/` klasörüne göredir; örneğin anahtar `android/app/upload-key.jks` konumundaysa `app/upload-key.jks` yazın. Dosya ve keystore Git'e eklenmiyor. Bu projedeki gerçek Gradle dosyası `android/app/build.gradle` olduğundan ayarları oradan okur.
10. **Test kanalını tamamlayın.** Önce internal test ile yükleme ve temel açılışı kontrol edin. Kişisel geliştirici hesabı 13 Kasım 2023'ten sonra açıldıysa üretime erişim için kapalı testte en az 12 test kullanıcısının aralıksız 14 gün kaydolmuş olması gerekir; ardından Console'daki production-access sorularını yanıtlayın. Diğer hesaplarda bu özel koşul olmayabilir. Yeni kişisel hesaplarda cihaz doğrulamasını da Console'da kontrol edin.
11. **AAB'yi üretime gönderin.** Mağaza ve bildirimler tamamlandıktan sonra imzalı `.aab` dosyasını test kanalına yükleyin. Play App Signing'e katılın, test geri bildirimlerini inceleyin, sürüm notlarını ve ülkeleri kontrol edin. Google incelemesini siz Console'dan başlatıp yayınlamalısınız.

## ASO ile tıklama ve yüklemeyi iyileştirme

- İlk mağaza sürümünde önerilen A ikonunu ve ilk ekran görüntüsü olarak `01-start` görselini kullanın. Başlık/açıklamalar kategori ve etkileşimi doğal biçimde anlatıyor; yanıltıcı anahtar kelime yığılması yok.
- İlk yayın sonrası trafik oluşunca Console'da önce tek değişkenli ikon deneyi açın: A temel ikonuna karşı B birleşim ikonunu deneyin. Sonuç B'yi seçerse uygulama içi başlatıcı ikonunu da aynı sürüme alın.
- Ardından ekran görüntüsünün ilk karesi veya kısa açıklama için ayrı deneyler yapın. İngilizce varsayılan liste ve Türkçe yerelleştirilmiş listeyi ayrı değerlendirin. Console deneyleri en fazla iki varyantı temel listeye karşı gösterebilir; sonuç yeterli veri toplamadan kazanan ilan etmeyin.
- Deneyde `Unique user install clicks` metriğini ve Console'un güven aralığı/örneklem sonucunu izleyin. Ayrıca mağaza görüntülenmesi → ürün sayfası ziyareti → yükleme dönüşümünü takip edin. Daha çok ziyaret her zaman daha fazla kaliteli yükleme anlamına gelmez.
- Önce-sonra karşılaştırması yerine Play Console'un mağaza listeleme deneylerini kullanın; deneyde tek bir alanı değiştirin. Google Play deneyleri ikon, özellik görseli, ekran görüntüsü ve açıklamaları test edebilir; başlık deney türleri arasında listelenmiyor.

Mevcut ASO araştırması arama hacmi satın alınmış bir anahtar kelime raporu değildir; kelime grupları alaka ve ürün uyumuna göre seçildi. Bu nedenle belirli indirme veya tıklama artışı garanti edilmez.

## İmzalama anahtarını yedekleme

İmza yapılandırması `android/key.properties` dosyasına yerel olarak girilir; bu dosya `.gitignore` tarafından yok sayılır. Örnek format `android/key.properties.example` dosyasında bulunur. Keystore dosyasını ve parolalarını ayrı, güvenli bir yerde yedekleyin. Bu bilgisayarda ayrıca `android/keys/curio-upload.jks` adlı bir upload anahtarı da oluşturuldu; bunu kullanacaksanız alias `curio-upload-2026` ve parolaları yerel DPAPI kaydından alabilirsiniz. Kendi mevcut anahtarınızı kullanacaksanız onun alias/parolaları ve `storeFile` yolu birlikte eşleşmeli.

Oluşturduğum yerel anahtarı kullanacaksanız, parolalarını yerel terminalinizde görmek için:

```powershell
. "$env:LOCALAPPDATA\CurioSimya\show-upload-signing-secrets.ps1"
```

Bu anahtarı `key.properties` içine girmek yerine ortam değişkenleriyle imzalamayı seçerseniz, release derlemesinden önce aynı PowerShell oturumuna ayarları yükleyebilirsiniz:

```powershell
. "$env:LOCALAPPDATA\CurioSimya\load-upload-signing.ps1"
```

Bu script `ANDROID_KEYSTORE_PATH`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` ve `ANDROID_KEY_PASSWORD` değişkenlerini o oturum için ayarlar. `key.properties` içindeki `REPLACE_ME` değerleri ortam değişkenlerinden gelen değerlerin kullanılmasına izin verir. Parolaları sohbete yazmayın.

## AAB almam için kalan girdiler

- Console'daki uygulamanın paket adı ve hesap türü (kişisel/kuruluş); kişisel hesapsa oluşturulma tarihi.
- AdMob uygulama kimliği ve ödüllü reklam birimi kimliği.
- Yayındaki gizlilik politikası HTTPS adresi ve mağaza destek e-postası.
- Hedef yaş grubu ve başlangıç ülkeleri.

İmza yapılandırmasının Gradle entegrasyonu hazır; kendi keystore dosyanızı ve değerlerinizi yerel `android/key.properties` dosyasına girmeniz gerekiyor. İlk Play Console yüklemesinde Play App Signing'i kabul edin; özel anahtarı veya parolaları Console'a/sohbete göndermeyin.

## Resmî kaynaklar

- [Yeni kişisel geliştirici hesapları için test şartları](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
- [Uygulama oluşturma, kalıcı paket adları, AAB ve imzalama](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en)
- [Hedef API seviyeleri](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
- [Mağaza listeleme deneyleri](https://support.google.com/googleplay/android-developer/answer/12053285?hl=en)
- [Aramada bulunma ve yerelleştirme](https://support.google.com/googleplay/android-developer/answer/4448378?hl=en)
- [Gizlilik politikası ve kullanıcı verisi](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)
- [Google Mobile Ads SDK veri açıklaması](https://developers.google.com/admob/android/privacy/play-data-disclosure)
- [UMP SDK gizlilik seçenekleri ve izin kontrolü](https://developers.google.com/admob/android/privacy?hl=en)
