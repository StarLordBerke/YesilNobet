import authorAlperen from '../assets/images/author_alperen_kaya_1790674386276.jpg';
import authorDerya from '../assets/images/author_derya_sungur_1790674403532.jpg';
import authorSelin from '../assets/images/author_selin_yilmaz_1790674418231.jpg';
import authorMetehan from '../assets/images/author_metehan_celik_1790674436203.jpg';
import authorEce from '../assets/images/author_ece_karadag_1790674452860.jpg';
import authorBaris from '../assets/images/author_baris_taner_1790674471268.jpg';
import authorZeynep from '../assets/images/author_zeynep_arslan_1790674974936.jpg';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Teknoloji' | 'Saha Operasyonu' | 'Biyoçeşitlilik' | 'Topluluk & Gönüllülük' | 'Orman Yangınları' | 'Orman Tahribatı';
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  content: string[];
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-fire-1',
    slug: 'termal-uydu-ve-iot-ile-orman-yangini-erken-uyarisi',
    title: 'Termal Uydu Taramaları ve IoT Duman Sensörleri ile Erken Yangın Tespiti',
    excerpt: 'MODIS/VIIRS termal sıcak nokta verileri ile orman içi CO2 ve ısı sensörlerinin entegre edilmesi yangınlara ilk 10 dakikada müdahale imkanı sunuyor.',
    category: 'Orman Yangınları',
    author: {
      name: 'Dr. Alperen Kaya',
      role: 'Afet Erken Uyarı Sistemleri & Yangın Ekolojisti',
      avatarUrl: authorAlperen,
    },
    date: '27 Mart 2026',
    readTime: '7 dk okuma',
    imageUrl: 'wildfire',
    tags: ['Orman Yangını', 'Termal Uydu', 'VIIRS', 'Erken Müdahale', 'IoT'],
    content: [
      'Akdeniz ve Ege kuşağındaki orman yangınlarının %85’i rüzgarın şiddetlendiği ilk 30 dakikada kontrol edilemez boyuta ulaşır. Bu nedenle geleneksel kule gözetlemeciliğinin ötesinde mikrosaniyeler mertebesinde çalışan otonom algoritmalar hayati önem taşır.',
      'YeşilNöbet altyapısında konuşlandırılan termal kuyu sensörleri ve NASA FIRMS VIIRS 375m aktif yangın haritalama katmanı, yaprak döküntüsü altındaki içten içe yanmaları (smoldering) alev boyu yükselmeden önce tespit eder.',
      'Sistem anlık sıcaklık artışını ve rüzgar hızı vektörlerini yapay zeka yangın yayılım modeliyle simüle ederek yangın söndürme helikopterleri ve arazöz ekipleri için en güvenli su atım koordinatlarını üretir.'
    ]
  },
  {
    id: 'post-land-1',
    slug: 'orman-tahribati-ve-kacak-isgaller-nasil-durdurulur',
    title: 'Orman Tahribatı ve Kaçak Açmalar: Zamansal Uydu Analizleri Suçüstü Yakalıyor',
    excerpt: 'Kaçak yol açma, maden taşması ve plansız hafriyatla orman dokusunu kemiren tahribatları Sentinel-2 zamansal NDVI fark haritalarıyla gün gün kanıtlıyoruz.',
    category: 'Orman Tahribatı',
    author: {
      name: 'Yük. Müh. Derya Sungur',
      role: 'Orman Kadastrosu & GIS Uzmanı',
      avatarUrl: authorDerya,
    },
    date: '21 Mart 2026',
    readTime: '6 dk okuma',
    imageUrl: 'land_degradation',
    tags: ['Orman Tahribatı', 'Sentinel-2', 'Kadastro', 'Çevre Suçu', 'Ağaç Koruma'],
    content: [
      'Orman kaybı yalnızca motorlu testereyle ağaç kesmekten ibaret değildir; orman tabanında dozerle kaçak koridor açmak, izinsiz hafriyat dökmek ve orman sınırlarını parselleyip işgal etmek en büyük yapısal orman tahribatları arasındadır.',
      'Platformumuz, Orman Genel Müdürlüğü kadastro sınır poligonlarını Avrupa Uzay Ajansı’nın güncel piksel yansımalarıyla çakıştırır. Orman sınırında 1 metrelik bile yapay toprak sıyırma veya bitki örtüsü kazıma hareketi algılandığında sistem turuncu alarm üretir.',
      'Toplanan zaman damgalı multispektral uydu fotoğrafları mahkemelerde adli delil niteliği taşıyacak şekilde kriptografik özetle mühürlenmekte ve Orman Bölge Şeflikleri üzerinden resmi soruşturma dosyalarına aktarılmaktadır.'
    ]
  },
  {
    id: 'post-1',
    slug: 'biyo-akustik-sensorler-ile-testere-sesi-tespiti',
    title: 'Biyo-Akustik Sensörler ile Motorlu Testere Frekanslarının Tespiti: Yapay Zeka Nasıl Çalışır?',
    excerpt: 'Orman tabanındaki güneş enerjili LoRaWAN mikrofon düğümlerinin 1200 - 2400 Hz harmoniklerini rüzgar ve kuş cıvıltılarından nasıl saniyeler içinde ayıkladığını inceliyoruz.',
    category: 'Teknoloji',
    author: {
      name: 'Dr. Selin Yılmaz',
      role: 'Yapay Zeka & Biyo-Akustik Araştırmacısı',
      avatarUrl: authorSelin,
    },
    date: '24 Mart 2026',
    readTime: '6 dk okuma',
    imageUrl: 'acoustic',
    tags: ['Biyo-Akustik', 'PyTorch', 'IoT', 'LoRaWAN', 'Orman Koruma'],
    content: [
      'Geleneksel orman muhafaza süreçlerinde devasa kanyonları ve dağlık silsileleri insan devriyeleriyle anlık denetlemek lojistik olarak imkansızdır. Bir motorlu testere çalışmaya başladığında, çevre dokuya ve yaban hayatına birkaç saat içinde telafisi yıllar sürecek tahribat verir.',
      'YeşilNöbet projesinde geliştirdiğimiz Edge-AI mikrofon üniteleri, 100 Hz ile 8000 Hz arasındaki ses spektrumunu sürekli dinler. Motorlu testerelerin 2 zamanlı içten yanmalı motorları ve dönen zincir dişlileri, 1.2 kHz - 2.4 kHz frekans bandında çok belirgin, periyodik bir akustik iz bırakır.',
      'Geliştirdiğimiz PyTorch ResNet tabanlı hafif model, ağaç gövdesindeki düşük enerjili mikrodenetleyicide doğrudan çalışarak yanlış alarmları (kuş kanat çırpışları, şiddetli rüzgar uğultusu, gök gürültüsü) %94.8 doğrulukla eler ve yalnızca gerçek tehdit sinyallerini OGM merkezine LoRaWAN telsiz ağıyla şifreli olarak fırlatır.'
    ]
  },
  {
    id: 'post-2',
    slug: 'kopuk-ekolojik-koridorlar-ve-yaban-hayati-gecisleri',
    title: 'Kopuk Ekolojik Koridorlar: Yaban Hayatının Görünmez Duvarları ve Çözüm Rotaları',
    excerpt: 'Karayolları, maden ocakları ve plansız yerleşimlerle bölünen orman parçaları hayvan popülasyonlarını genetik bir çıkmaza sürüklüyor. Çözüm: Bilimsel fidan koridorları.',
    category: 'Biyoçeşitlilik',
    author: {
      name: 'Prof. Dr. Metehan Çelik',
      role: 'Yaban Hayatı Ekolojisi Uzmanı',
      avatarUrl: authorMetehan,
    },
    date: '18 Mart 2026',
    readTime: '8 dk okuma',
    imageUrl: 'wildlife',
    tags: ['Ekolojik Koridor', 'Biyoçeşitlilik', 'Kazdağları', 'Restorasyon'],
    content: [
      'Orman yangınları ve yasadışı kesimler yalnızca ağaçların yok olması anlamına gelmez; asıl görünmeyen felaket, geniş ekosistemlerin birbiriyle temasının kopması yani habitat parçalanmasıdır (fragmentation).',
      'Birbirinden kopmuş iki orman adacığı arasında kalan 5-10 kilometrelik çıplak açıklıklar, bozayı, karaca, vaşak ve kızıl geyik gibi büyük memeliler için aşılamaz birer ölüm tuzağına dönüşür. Hayvanlar diğer orman bloklarındaki akrabalarıyla eşleşemediğinde genetik çeşitlilik çöker.',
      'YeşilNöbet platformunda uydu verileriyle belirlediğimiz boşluk haritası sayesinde, TEMA ve yerel STK gönüllüleri rasgele değil, tam da bu kopuk damarları birleştirecek stratejik rotalarda yerli ağaç fidanlarını toprakla buluşturuyor.'
    ]
  },
  {
    id: 'post-3',
    slug: 'sentinel-2-ve-landsat-ile-gunluk-kanopi-takibi',
    title: 'Uzaydan Orman Nöbeti: Sentinel-2 Multispektral Verisi ile Kanopi Değişimi Nasıl İzlenir?',
    excerpt: 'Avrupa Uzay Ajansı’nın 5 günde bir geçen uyduları, Türkiye ormanlarındaki NDVI (Normalize Edilmiş Fark Bitki Örtüsü İndeksi) değişimini piksel piksel raporluyor.',
    category: 'Teknoloji',
    author: {
      name: 'Ece Karadağ',
      role: 'Uzaktan Algılama ve GIS Mühendisi',
      avatarUrl: authorEce,
    },
    date: '12 Mart 2026',
    readTime: '5 dk okuma',
    imageUrl: 'satellite',
    tags: ['Sentinel-2', 'Copernicus', 'NDVI', 'Uzaktan Algılama'],
    content: [
      'Görünür ışık dalga boyu insan gözünün gördüğü yeşili verirken, kızılötesi (NIR) spektrum yaprak hücrelerindeki klorofilin canlılığını ve su miktarını yansıtır. Sentinel-2 uydusunun B8 (Near Infrared) ve B4 (Red) bantları kullanılarak hesaplanan NDVI indeksi, ormandaki en ufak yeşil doku zayıflamasını anında gösterir.',
      'Sistemimiz günlük olarak Türkiye orman bölgelerinin ortofoto ve spektrum katmanlarını indirerek bir önceki geçişle piksel farkı çıkarır. Eğer 100 metrekarelik bir alanda NDVI değeri aniden 0.8’den 0.3’e düşmüşse, bu durum ya taze bir yasadışı kesim ya da kaçak yol açma faaliyetine işaret eder.',
      'Yapay zeka tabanlı uydu anomali modülümüz, bu pikselleri anında kırmızı/turuncu ısı haritası pini olarak harita modülümüze düşürür.'
    ]
  },
  {
    id: 'post-4',
    slug: 'kazdaglari-madra-arasi-fidan-seferberligi-raporu',
    title: 'Saha Raporu: Kazdağları - Madra Dağı Arasındaki İlk 15.000 Fidan Toprakla Buluştu',
    excerpt: 'YeşilNöbet gönüllüleri ve OGM fidanlık ekipleri, Balıkesir Edremit havzasında tespit edilen 14.2 kilometrelik kritik kırılma hattının ilk etabını tamamladı.',
    category: 'Saha Operasyonu',
    author: {
      name: 'Barış Taner',
      role: 'YeşilNöbet Saha ve Topluluk Koordinatörü',
      avatarUrl: authorBaris,
    },
    date: '04 Mart 2026',
    readTime: '4 dk okuma',
    imageUrl: 'reforestation',
    tags: ['Saha Raporu', 'Kazdağları', 'Fidan Dikimi', 'Gönüllüler'],
    content: [
      'Geçtiğimiz hafta sonu YeşilNöbet üzerinden fidan dikim gönüllüsü olan 240 doğasever ve OGM Balıkesir Bölge Müdürlüğü ormancıları Edremit Madra Dağı eteklerinde bir araya geldi.',
      'Toprak ve iklim analiz modellerimizin önerdiği endemik Kazdağı Göknarı (Abies nordmanniana equi-trojani) ve tüylü meşe fidanları, yaban hayatı göç patikasını yeniden birbirine kavuşturmak üzere dikildi.',
      'Saha çalışmaları drone ile haritalanarak platformdaki canlı koridor katmanına işlendi ve fidanların tutma oranı sensör nem verileriyle takip edilmeye başlandı.'
    ]
  },
  {
    id: 'post-5',
    slug: 'vatandas-ihbarlari-orman-muhafazasinda-nasil-fark-yaratiyor',
    title: 'Vatandaş İhbarı ile Önlenen 3 Kaçak Kesim Vakası: Toplumsal Denetimin Gücü',
    excerpt: 'Doğa yürüyüşçülerinin YeşilNöbet platformu üzerinden tek tıkla GPS ve fotoğraf yükleyerek bildirdiği şüpheli aktiviteler, OGM ekiplerini saatler içinde hedefe ulaştırdı.',
    category: 'Topluluk & Gönüllülük',
    author: {
      name: 'Av. Zeynep Arslan',
      role: 'Çevre Hukuku ve STK İletişim Masası',
      avatarUrl: authorZeynep,
    },
    date: '26 Şubat 2026',
    readTime: '5 dk okuma',
    imageUrl: 'citizen',
    tags: ['Vatandaş İhbarı', 'Hukuk', 'OGM', 'Doğa Koruma'],
    content: [
      'Antalya Kemer, Bolu Yedigöller ve Muğla Köyceğiz kırsalında yürüyüş yapan vatandaşlarımızın sistemimize gönderdiği fotoğraflı bildirimler, kaçak kesim faillerinin suçüstü yakalanmasını sağladı.',
      'Vatandaş İhbar Formu sayesinde aktarılan konum verileri, OGM bölge devriye araçlarının navigasyon sistemlerine rota olarak düştü. Kanıt fotoğraflarındaki EXIF ve metadata bilgileri resmi tutanaklara eklenerek yasal işlem süreci rekor hızda başlatıldı.',
      'Unutmayalım: Bir akıllı telefon ve duyarlı bir göz, binlerce hektarlık ormanımızın en güçlü bekçisi olabilir.'
    ]
  }
];
