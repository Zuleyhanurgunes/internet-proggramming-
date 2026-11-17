# CEN227 İnternet Programcılığı - Vize Projesi
## Yemek Tarifleri ve Besin Değerleri Portalı

Bu proje, **CEN227 İnternet Programcılığı** dersi vize ödevi gereksinimlerine uygun olarak; herhangi bir backend çatısı (framework) veya harici kütüphane gerektirmeksizin, saf **HTML5**, **CSS3** ve **JavaScript (ES6+)** kullanılarak geliştirilmiş modern ve responsive bir web sitesidir.

---

### 📂 Proje Sayfa Yapısı ve İşleyişi

Proje, ödev kılavuzunda belirtilen 4 birbirine bağlı sayfadan oluşur:

1. **Liste Sayfası (`index.html`):**
   - Temadaki tüm yemek tariflerini görsel kartlar (div yapısı) halinde dinamik olarak listeler.
   - Gerçek zamanlı arama ve kategoriye göre filtreleme (Çorbalar, Ana Yemekler, Salatalar, Tatlılar vb.) içerir.
   - Her kartta hazırlama/pişirme süresi, porsiyon bilgisi ve "Tarifi İncele" bağlantısı bulunur.

2. **Detay Sayfası (`detail.html`):**
   - Kullanıcının listeden seçtiği tek bir tarifin tüm ayrıntılarını gösterir (`?id=X` URL parametresi ile dinamik veri aktarımı).
   - Malzemeler listesi, adım adım yapılış aşamaları ve porsiyon başına besin değerleri kutucukları sunulur.
   - Sayfa üzerinde diğer tariflere hızlıca geçiş yapmayı sağlayan bir seçim alanı da yer alır.

3. **Form Sayfası (`form.html`):**
   - Kullanıcıdan yeni tarif bilgilerini ve besin değerlerini toplar.
   - JavaScript tabanlı form doğrulaması (validation) ile boş alanları, karakter sayılarını ve pozitif sayısal değerleri denetler, kullanıcıya anlık hata mesajları verir.
   - Başarılı gönderimlerde yeni tarifi `localStorage`'a kaydederek liste, detay ve tablo sayfalarına anında yansıtır.

4. **Tablo Sayfası (`table.html`):**
   - Tüm kayıtlı tariflerin besin değerlerini (Kalori, Protein, Karbonhidrat, Yağ) düzenli bir HTML tablosu (`<table>`) halinde karşılaştırmalı olarak sunar.
   - Tablo üzerinde anlık arama/filtreleme yapılabilir.
   - Üst kısımda özet istatistik kartları (Toplam tarif sayısı, ortalama kalori, en yüksek proteinli ve en düşük kalorili yemek) bulunur.

---

### 🛠️ Kullanılan Teknolojiler ve Özellikler

- **HTML5:** Temiz, anlamsal (semantic) etiketler ve çoğunlukla `div` tabanlı modern hiyerarşi.
- **CSS3:** Flexbox ve Grid sistemleri, modern renk paleti, hover animasyonları, mobil cihazlarla tam uyumlu (responsive) tasarım.
- **Görseller (`images/`):** 6 yemeğin de birebir kendisine ait, yüksek çözünürlüklü ve yerel olarak depolanan orijinal yemek fotoğrafları (çorba, fırında tavuk, şehriyeli pilav, bezelye yemeği, rus salatası, magnolia tatlısı).
- **JavaScript (Vanilla ES6+):** 
  - Dinamik DOM manipülasyonu,
  - `URLSearchParams` ile sayfalar arası veri taşıma,
  - `localStorage` ile tarayıcıda kalıcı veri saklama,
  - Tarif ekleme ve silme (CRUD) desteği,
  - Kapsamlı istemci taraflı (client-side) form validasyonu.

---

### 🚀 Nasıl Çalıştırılır?

1. Bu klasörü bilgisayarınızda açın.
2. `index.html` dosyasını herhangi bir web tarayıcısında (Google Chrome, Edge, Firefox vb.) çift tıklayarak açmanız yeterlidir.
3. Herhangi bir sunucu kurulumu gerektirmez.

