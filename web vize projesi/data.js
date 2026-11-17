/**
 * CEN227 Internet Programming Midterm Project
 * Yemek Tarifleri Portalı - Veri Deposu (data.js)
 * 
 * Bu dosya başlangıç tarif verilerini ve localStorage yönetimini içerir.
 * Tüm fotoğraflar yerel "images/" klasöründen çekilmekte olup her yemeğe
 * birebir uyan gerçek fotoğraflardır.
 */

// Güncellenmiş, birebir uyumlu yerel fotoğraflı 6 tariflik başlangıç verisi
const DEFAULT_RECIPES = [
  {
    id: 1,
    name: "Geleneksel Kırmızı Mercimek Çorbası",
    category: "Çorbalar",
    prepTime: "10 dk",
    cookTime: "25 dk",
    servings: "4 Kişilik",
    difficulty: "Kolay",
    image: "images/mercimek-corbasi.jpg",
    description: "Lokanta usulü ipeksi süzme kıvamı, tereyağlı nane ve pul biber sosuyla içinizi ısıtacak geleneksel kırmızı mercimek çorbası.",
    ingredients: [
      "1.5 su bardağı kırmızı mercimek (yıkanmış ve süzülmüş)",
      "1 adet orta boy kuru soğan",
      "1 adet orta boy havuç",
      "1 adet küçük patates",
      "1 diş sarımsak",
      "1 yemek kaşığı tereyağı",
      "2 yemek kaşığı zeytinyağı",
      "1 yemek kaşığı un",
      "6 su bardağı sıcak et veya tavuk suyu (veya sıcak su)",
      "1 tatlı kaşığı tuz",
      "1 çay kaşığı karabiber",
      "1 çay kaşığı kimyon",
      "Sosu için: 1 yemek kaşığı tereyağı, 1 tatlı kaşığı nane, 1 çay kaşığı pul biber"
    ],
    instructions: [
      "Tencereye tereyağı ve zeytinyağını alıp eritin. Unu ekleyip kokusu çıkana kadar 1-2 dakika kısık ateşte kavurun.",
      "İri parçalar halinde doğranmış soğan, havuç, patates ve sarımsağı ilave edip 2-3 dakika soteleyin.",
      "İyice yıkanıp süzülmüş kırmızı mercimekleri tencereye aktarın ve sebzelerle 1 dakika karıştırın.",
      "Sıcak et/tavuk suyunu, tuzu, karabiberi ve kimyonu ilave edin.",
      "Tencerenin kapağını kapatıp mercimekler ve sebzeler tamamen yumuşayana kadar orta ateşte yaklaşık 20-25 dakika kaynatın.",
      "Çorbayı pürüzsüz ve kadifemsi bir kıvam alana kadar el blenderından geçirin.",
      "Küçük bir sos tavasında tereyağını eritip nane ve pul biberi hafifçe köpürtün.",
      "Çorbayı kaselere pay edip üzerine sıcak tereyağlı sostan gezdirin, limon dilimleriyle servis yapın."
    ],
    nutrition: {
      calories: 185,
      protein: 9.8,
      carbs: 27.5,
      fat: 4.2
    }
  },
  {
    id: 2,
    name: "Fırında Sebzeli Tavuk",
    category: "Ana Yemekler",
    prepTime: "20 dk",
    cookTime: "45 dk",
    servings: "4 Kişilik",
    difficulty: "Kolay",
    image: "images/firinda-tavuk.jpg",
    description: "Yoğurt, salça ve baharatlı özel marine sosuyla harmanlanmış, elma dilim patates ve renkli biberlerle nar gibi kızaran fırında tavuk but.",
    ingredients: [
      "8 adet tavuk baget veya but",
      "3 adet orta boy patates (elma dilim doğranmış)",
      "2 adet havuç (iri halka doğranmış)",
      "3 adet yeşil köy biberi",
      "2 adet kapya biber",
      "10-12 adet çeri domates",
      "4 diş sarımsak",
      "Marine Sosu için: 2 yemek kaşığı yoğurt, 1 yemek kaşığı domates salçası, 1 tatlı kaşığı biber salçası, 4 yemek kaşığı zeytinyağı, 1 çay bardağı ılık su",
      "Baharatlar: 1 tatlı kaşığı kekik, 1 tatlı kaşığı toz kırmızı biber, 1 tatlı kaşığı tuz, yarım çay kaşığı karabiber"
    ],
    instructions: [
      "Tavuk bagetleri yıkayıp kuruladıktan sonra sosu içine çekmesi için üzerlerine bıçakla ikişer çizik atın.",
      "Geniş bir kapta yoğurt, domates ve biber salçası, zeytinyağı, ezilmiş sarımsak, su ve baharatları çırparak homojen bir sos hazırlayın.",
      "Elma dilim patatesleri, havuçları, iri doğranmış biberleri ve tavukları bu sosla iyice harmanlayıp en az 20 dakika dinlendirin.",
      "Soslanmış tavukları ve sebzeleri fırın tepsisine dengeli bir şekilde dizin, aralara çeri domatesleri serpiştirin.",
      "Tepsinin üzerini ıslatılmış ve sıkılmış yağlı kağıt ile kapatın.",
      "200°C önceden ısıtılmış fırında yaklaşık 35 dakika üzeri kapalı pişirin, ardından kağıdı alarak tavuklar nar gibi kızarana dek 10-15 dakika daha fırınlayın.",
      "Sıcak olarak pirinç pilavı eşliğinde servis edin."
    ],
    nutrition: {
      calories: 420,
      protein: 36.5,
      carbs: 22.0,
      fat: 21.0
    }
  },
  {
    id: 3,
    name: "Şehriyeli Klasik Pirinç Pilavı",
    category: "Ana Yemekler",
    prepTime: "20 dk",
    cookTime: "20 dk",
    servings: "4 Kişilik",
    difficulty: "Kolay",
    image: "images/pirinc-pilavi.jpg",
    description: "Tane tane dökülen, mis gibi tereyağı kokulu, kavrulmuş arpa şehriyesiyle geleneksel sofralarımızın baştacı pirinç pilavı.",
    ingredients: [
      "2 su bardağı baldo pirinç",
      "3 su bardağı sıcak tavuk suyu veya sıcak su",
      "3 yemek kaşığı tereyağı",
      "2 yemek kaşığı sıvı yağ (parlaklık için)",
      "3 yemek kaşığı arpa şehriye",
      "1.5 tatlı kaşığı tuz",
      "1 çay kaşığı toz şeker",
      "3-4 damla taze limon suyu (pirinçlerin beyaz ve diri kalması için)"
    ],
    instructions: [
      "Pirinci ılık ve tuzlu suda nişastası gidene kadar 20 dakika bekletin, ardından berrak su akana dek bol soğuk suyla yıkayıp süzün.",
      "Pilav tenceresine sıvı yağ ve tereyağını alın; arpa şehriyeleri ekleyip altın rengi alana dek orta ateşte kavurun.",
      "Süzülen pirinçleri ekleyin ve pirinç taneleri şeffaflaşıp tıkırdayana kadar kısık ateşte 4-5 dakika kırmadan kavurun.",
      "3 su bardağı kaynar tavuk suyunu, tuzu, şekeri ve birkaç damla limon suyunu ilave edip nazikçe karıştırın.",
      "Tencerenin kapağını kapatın; önce orta ateşte göz göz olana dek, ardından en kısık ateşte suyunu tamamen çekene dek (12-15 dakika) pişirin.",
      "Ocağı kapatıp tencere ile kapak arasına kağıt havlu sererek pilavı 15-20 dakika demlenmeye bırakın.",
      "Tahta kaşıkla alttan üste doğru nazikçe havalandırarak sıcak servis yapın."
    ],
    nutrition: {
      calories: 290,
      protein: 4.8,
      carbs: 52.0,
      fat: 7.5
    }
  },
  {
    id: 4,
    name: "Kıymalı Havuçlu Bezelye Yemeği",
    category: "Ana Yemekler",
    prepTime: "15 dk",
    cookTime: "30 dk",
    servings: "4 Kişilik",
    difficulty: "Kolay",
    image: "images/bezelye-yemegi.jpg",
    description: "Taze bezelye, küp doğranmış patates, havuç ve leziz kıymanın salçalı sosla buluştuğu besleyici ve doyurucu tencere yemeği.",
    ingredients: [
      "500 gr bezelye (taze veya dondurulmuş)",
      "150 gr orta yağlı dana kıyma",
      "1 adet orta boy kuru soğan",
      "1 adet orta boy patates (küp doğranmış)",
      "1 adet orta boy havuç (küp doğranmış)",
      "1 yemek kaşığı domates salçası",
      "1 tatlı kaşığı biber salçası",
      "3 yemek kaşığı zeytinyağı",
      "2.5 su bardağı sıcak su",
      "1 tatlı kaşığı tuz",
      "Yarım çay kaşığı karabiber",
      "1 çay kaşığı toz şeker"
    ],
    instructions: [
      "Tencereye zeytinyağını ve kıymayı alın; kıyma suyunu salıp çekene kadar orta ateşte kavurun.",
      "Yemeklik ince doğranmış soğanı ilave edip pembeleşene kadar 2-3 dakika kavurmaya devam edin.",
      "Domates ve biber salçasını ekleyip kokusu çıkana dek 1 dakika soteleyin.",
      "Küp doğranmış patates ve havuçları ekleyip 2 dakika çevirin.",
      "Bezelyeleri, sıcak suyu, tuzu, karabiberi ve şekeri ekleyerek karıştırın.",
      "Tencerenin kapağını kapatın; kaynadıktan sonra kısık ateşte sebzeler yumuşayana kadar yaklaşık 25-30 dakika pişirin.",
      "Yemeği 10 dakika dinlendirip pirinç pilavı ile birlikte sıcak servis edin."
    ],
    nutrition: {
      calories: 255,
      protein: 14.5,
      carbs: 24.0,
      fat: 11.2
    }
  },
  {
    id: 5,
    name: "Garnitürlü Klasik Rus Salatası",
    category: "Salatalar",
    prepTime: "15 dk",
    cookTime: "0 dk",
    servings: "6 Kişilik",
    difficulty: "Kolay",
    image: "images/rus-salatasi.jpg",
    description: "Küp patates, havuç ve bezelye garnitürünün kıtır kornişon turşu, süzme yoğurt ve mayonezli kadifemsi sosla buluştuğu nefis meze klasiği.",
    ingredients: [
      "2 su bardağı garnitür (haşlanmış küp patates, havuç ve bezelye)",
      "5-6 adet kornişon turşu (küp doğranmış)",
      "4 yemek kaşığı dolusu mayonez",
      "4 yemek kaşığı süzme yoğurt",
      "1 diş ezilmiş sarımsak (isteğe bağlı)",
      "1 yemek kaşığı zeytinyağı",
      "1 çay kaşığı tuz",
      "Çeyrek çay kaşığı karabiber",
      "Üzeri için: Taze dereotu veya maydanoz yaprakları"
    ],
    instructions: [
      "Garnitürü süzgece alıp fazla suyunu süzün, sudan geçirip iyice kurumasını sağlayın.",
      "Kornişon turşuları garnitür sebzeleri boyutunda küçük küpler halinde doğrayın.",
      "Geniş bir karıştırma kabında mayonez, süzme yoğurt, zeytinyağı, ezilmiş sarımsak, tuz ve karabiberi pürüzsüz kıvama gelene dek çırpın.",
      "Suyu süzülen garnitür ve doğranmış turşuları sos kabına aktarın.",
      "Sebzeleri ezmemeye özen göstererek spatula yardımıyla nazikçe alttan üste doğru harmanlayın.",
      "Salatayı servis tabağına alıp üzerini düzeltin ve buzdolabında en az 1 saat soğutun.",
      "Üzerini taze dereotu veya maydanoz yapraklarıyla süsleyip soğuk servis yapın."
    ],
    nutrition: {
      calories: 195,
      protein: 3.5,
      carbs: 16.2,
      fat: 13.0
    }
  },
  {
    id: 6,
    name: "Çilekli ve Muzlu Magnolia Tatlısı",
    category: "Tatlılar",
    prepTime: "20 dk",
    cookTime: "15 dk",
    servings: "6 Kişilik",
    difficulty: "Kolay",
    image: "images/magnolia-tatlisi.jpg",
    description: "İpeksi kıvamda vanilyalı muhallebisi, Burçak bisküvi kırıntıları, taze çilek ve muz dilimleriyle hafif, ferahlatıcı New York klasiği tatlı.",
    ingredients: [
      "1 litre süt",
      "1 su bardağı toz şeker",
      "2 yemek kaşığı dolusu buğday nişastası",
      "2 yemek kaşığı dolusu un",
      "1 adet yumurta sarısı",
      "1 paket vanilin (5 gr)",
      "1 paket soğuk sıvı krema (200 ml)",
      "1.5 paket Burçak veya bebe bisküvisi",
      "250 gr taze çilek (ince dilimlenmiş)",
      "2 adet muz (halka dilimlenmiş)"
    ],
    instructions: [
      "Tencereye süt, toz şeker, un, nişasta ve yumurta sarısını alıp çırpma teliyle pürüzsüz olana kadar karıştırın.",
      "Orta ateşte sürekli karıştırarak koyulaşıp göz göz kaynayana kadar pişirin.",
      "Ocaktan alıp vanilini ekleyin ve kabuk tutmaması için ara sıra karıştırarak ılımaya bırakın.",
      "Ilıyan pudinge soğuk sıvı kremayı ilave edin ve mikserle yüksek devirde 4-5 dakika pürüzsüz ve kadifemsi kıvam alana dek çırpın.",
      "Bisküvileri mutfak robotunda çekerek un kırıntısı haline getirin. Çilek ve muzları ince ince dilimleyin.",
      "Kupon veya kavanozların tabanına 2 kaşık bisküvi koyun, bardağın kenarlarına meyve dilimlerini dik yerleştirin.",
      "Üzerine kremayı paylaştırın; kat kat bisküvi ve krema şeklinde kupları doldurun.",
      "Buzdolabında en az 2-3 saat dinlendirdikten sonra soğuk servis yapın."
    ],
    nutrition: {
      calories: 325,
      protein: 6.2,
      carbs: 45.0,
      fat: 13.5
    }
  }
];

// LocalStorage anahtarı (v5: Tüm 6 yemek için Yemek.com stüdyo fotoğrafları)
const STORAGE_KEY = "cen227_recipe_portal_recipes_v5";

/**
 * Mevcut tarifleri LocalStorage'dan çeker; yoksa varsayılanları kaydeder ve döner.
 */
function getRecipes() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECIPES));
    return DEFAULT_RECIPES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("LocalStorage parse hatası:", e);
    return DEFAULT_RECIPES;
  }
}

/**
 * ID'ye göre tek bir tarif çeker.
 */
function getRecipeById(id) {
  const recipes = getRecipes();
  return recipes.find(r => String(r.id) === String(id));
}

/**
 * Yeni bir tarif ekler ve LocalStorage'ı günceller.
 */
function addRecipe(recipeData) {
  const recipes = getRecipes();
  const newId = recipes.length > 0 ? Math.max(...recipes.map(r => Number(r.id) || 0)) + 1 : 1;
  const newRecipe = {
    id: newId,
    ...recipeData
  };
  recipes.push(newRecipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  return newRecipe;
}

/**
 * ID'ye göre tarifi siler ve LocalStorage'ı günceller.
 */
function deleteRecipe(id) {
  const recipes = getRecipes();
  const updated = recipes.filter(r => String(r.id) !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Verileri sıfırlayıp fabrika ayarlarına döndürür (test için pratik).
 */
function resetRecipesToDefault() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECIPES));
  return DEFAULT_RECIPES;
}
