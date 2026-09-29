import { SensorAlert, HabitatCorridor, MonthlyTrendData, CitizenReport } from '../types/forest';

// TODO: Fetch data from Python ML API endpoint (e.g., GET /api/v1/sensors/live-alerts from FastAPI / PyTorch bio-acoustic classifier)
// Endpoint: https://api.yesilnobet.gov.tr/ml/v1/acoustic-stream
export const INITIAL_ALERTS: SensorAlert[] = [
  {
    id: 'ALT-2026-902',
    region: 'İzmir',
    subLocation: 'Menderes - Gümüldür Kızılçam ve Makilik Kuşak',
    lat: 38.125,
    lng: 27.054,
    type: 'fire_risk',
    title: 'Termal Uydu & IoT: Yangın Sıcak Noktası ve Duman İhlali',
    description: 'VIIRS 375m gece termal spektrumunda 380°C yüzey sıcaklık anomalisine rastlandı. Rüzgar hızı güneybatıdan 34 km/s ile orman içine doğru yayılıyor.',
    timestamp: '5 dakika önce',
    confidenceScore: 0.98,
    status: 'critical',
    sensorNodeId: 'SAT-VIIRS-HOTSPOT-09',
    assignedUnit: 'İzmir OGM Yangın İlk Müdahale Helikopteri'
  },
  {
    id: 'ALT-2026-898',
    region: 'Muğla',
    subLocation: 'Milas Güllük Körfezi Kıyı Ormanı Sınırı',
    lat: 37.242,
    lng: 27.618,
    type: 'heavy_machinery',
    title: 'Orman Tahribatı: Kaçak Dozer ile Orman Sınırı Kazıma',
    description: 'Sentinel-2 kadastro çakıştırmasında 1.9 hektar devlet ormanı arazisinin kaçak yol ve orman alanı tahribatı için iş makineleriyle kazındığı saptandı.',
    timestamp: '18 dakika önce',
    confidenceScore: 0.94,
    canopyLossHectares: 1.9,
    ndviDropPercentage: 54.0,
    status: 'critical',
    sensorNodeId: 'SAT-SENTINEL2-GEOENC',
    assignedUnit: 'Milas Orman İşletmesi & Jandarma Çevre Timi'
  },
  {
    id: 'ALT-2026-891',
    region: 'Muğla',
    subLocation: 'Köyceğiz Sandras Dağı Kızılçam Kuşağı',
    lat: 36.985,
    lng: 28.692,
    type: 'acoustic_chainsaw',
    title: 'Akustik Sensör: Motorlu Testere Frekansı Tespit Edildi',
    description: 'Node-KÖY-42 sensörü 1200-2400 Hz harmoniklerinde sürekli mekanik kesim sesi algıladı. Sinyal desibeli kritik eşiğin üstünde.',
    timestamp: '12 dakika önce',
    confidenceScore: 0.96,
    decibelLevel: 94.2,
    audioFrequencyHz: 2150,
    status: 'critical',
    sensorNodeId: 'NODE-KYC-042',
    assignedUnit: 'Köyceğiz OGM 3. Motorize Tim'
  },
  {
    id: 'ALT-2026-889',
    region: 'Balıkesir / Çanakkale',
    subLocation: 'Kazdağları Milli Parkı Tampon Bölgesi',
    lat: 39.712,
    lng: 26.845,
    type: 'satellite_canopy_loss',
    title: 'Uydu Analizi: Ani Bitki Örtüsü (NDVI) Kaybı',
    description: 'Sentinel-2 multispektral geçişinde 3 gün öncesine kıyasla kanopi örtüsünde %42 düşüş saptandı. 2.8 hektarlık alanda şüpheli açma faaliyeti.',
    timestamp: '47 dakika önce',
    confidenceScore: 0.91,
    canopyLossHectares: 2.8,
    ndviDropPercentage: 42.5,
    status: 'critical',
    sensorNodeId: 'SAT-SENTINEL2-B4'
  },
  {
    id: 'ALT-2026-884',
    region: 'Antalya',
    subLocation: 'Manavgat Oymapınar Havzası',
    lat: 36.903,
    lng: 31.542,
    type: 'acoustic_chainsaw',
    title: 'Akustik Sensör: Ağaç Devrilme & Testere Rezonansı',
    description: 'Oymapınar derin kanyon hattında akustik üçgenleme ile yüksek desibel darbe ve motorlu testere sesi lokalize edildi.',
    timestamp: '1 saat önce',
    confidenceScore: 0.88,
    decibelLevel: 89.6,
    audioFrequencyHz: 1980,
    status: 'in_review',
    sensorNodeId: 'NODE-MNV-118'
  },
  {
    id: 'ALT-2026-879',
    region: 'Bolu',
    subLocation: 'Yedigöller Giriş Koridoru Kayın Ormanları',
    lat: 40.892,
    lng: 31.698,
    type: 'heavy_machinery',
    title: 'Akustik & Sismik: Şüpheli Ağır İş Makinesi İlerlemesi',
    description: 'Yedigöller orman içi patikada ruhsatsız traktör/çekici titreşimi ve hidrolik kepçe gürültüsü kaydedildi.',
    timestamp: '2 saat önce',
    confidenceScore: 0.85,
    decibelLevel: 86.4,
    status: 'dispatched',
    sensorNodeId: 'NODE-BLU-027',
    assignedUnit: 'Bolu Orman Bölge Devriye 1'
  },
  {
    id: 'ALT-2026-872',
    region: 'Artvin',
    subLocation: 'Borçka Karagöl Havzası Yaşlı Ladin Meşceresi',
    lat: 41.385,
    lng: 41.854,
    type: 'satellite_canopy_loss',
    title: 'Uydu Spektrogramı: Koruma Altındaki Ladin Kaybı',
    description: 'Landsat-9 termal ve vejetasyon karşılaştırmasında 1.4 hektar alanda ani ağaç dokusu eksilmesi gözlemlendi.',
    timestamp: '4 saat önce',
    confidenceScore: 0.93,
    canopyLossHectares: 1.4,
    ndviDropPercentage: 35.1,
    status: 'in_review',
    sensorNodeId: 'SAT-LANDSAT9-C2'
  },
  {
    id: 'ALT-2026-865',
    region: 'Kastamonu',
    subLocation: 'Küre Dağları Milli Parkı Güney Sektörü',
    lat: 41.674,
    lng: 33.412,
    type: 'acoustic_chainsaw',
    title: 'Akustik Sensör: Gece Kesimi Şüphesi',
    description: 'Sıfır ışık koşullarında mikrometre titreşimli testere paterni doğrulandı. 3 sensör nodu ile kesim açısı sabitlendi.',
    timestamp: '6 saat önce',
    confidenceScore: 0.95,
    decibelLevel: 91.8,
    audioFrequencyHz: 2300,
    status: 'resolved',
    sensorNodeId: 'NODE-KRE-009',
    assignedUnit: 'Küre Doğa Koruma Ekipleri'
  }
];

// TODO: Fetch broken ecological corridors from Python GeoSpatial graph algorithm (e.g. NetworkX + QGIS python script)
export const HABITAT_CORRIDORS: HabitatCorridor[] = [
  {
    id: 'COR-01',
    name: 'Kazdağları - Madra Dağı Ekolojik Bağlantı Koridoru',
    region: 'Kuzey Ege',
    fragmentationSeverity: 'high',
    gapDistanceKm: 14.2,
    recommendedSaplings: 85000,
    targetSpecies: ['Kazdağı Göknarı (Abies nordmanniana)', 'Saçlı Meşe', 'Karaçam'],
    coordinates: [
      [39.712, 26.845],
      [39.640, 26.980],
      [39.520, 27.120],
      [39.380, 27.240]
    ],
    status: 'in_planting'
  },
  {
    id: 'COR-02',
    name: 'Köyceğiz - Gökova Biyolojik Geçiş Hattı',
    region: 'Güney Ege',
    fragmentationSeverity: 'medium',
    gapDistanceKm: 8.7,
    recommendedSaplings: 52000,
    targetSpecies: ['Sığla Ağacı (Liquidambar orientalis)', 'Kızılçam'],
    coordinates: [
      [36.985, 28.692],
      [36.960, 28.520],
      [36.910, 28.380]
    ],
    status: 'planned'
  },
  {
    id: 'COR-03',
    name: 'Küre Dağları - Ilgaz Yaban Hayatı Koridoru',
    region: 'Batı Karadeniz',
    fragmentationSeverity: 'high',
    gapDistanceKm: 21.5,
    recommendedSaplings: 140000,
    targetSpecies: ['Doğu Kayını', 'Sarıçam', 'Göknar'],
    coordinates: [
      [41.674, 33.412],
      [41.450, 33.560],
      [41.220, 33.680],
      [41.050, 33.720]
    ],
    status: 'planned'
  }
];

// TODO: Fetch aggregated monthly statistics from Python Analytics Service (FastAPI / Pandas backend)
export const MONTHLY_METRICS: MonthlyTrendData[] = [
  { month: 'Eki 25', acousticAlerts: 48, satelliteLossHa: 19.4, preventedLoggingCases: 39, reforestedSaplings: 18500 },
  { month: 'Kas 25', acousticAlerts: 41, satelliteLossHa: 16.2, preventedLoggingCases: 34, reforestedSaplings: 24000 },
  { month: 'Ara 25', acousticAlerts: 29, satelliteLossHa: 11.5, preventedLoggingCases: 25, reforestedSaplings: 12000 },
  { month: 'Oca 26', acousticAlerts: 22, satelliteLossHa: 8.7,  preventedLoggingCases: 19, reforestedSaplings: 8500 },
  { month: 'Şub 26', acousticAlerts: 31, satelliteLossHa: 12.1, preventedLoggingCases: 28, reforestedSaplings: 32000 },
  { month: 'Mar 26', acousticAlerts: 54, satelliteLossHa: 21.8, preventedLoggingCases: 46, reforestedSaplings: 58000 }
];

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'CIT-104',
    fullName: 'Ahmet Yılmaz',
    phone: '0532 *** ** 14',
    email: 'ahmet.y@gmail.com',
    locationName: 'Antalya Kemer Çamyuva Sırtları',
    lat: 36.565,
    lng: 30.560,
    incidentType: 'illegal_logging',
    description: 'Yürüyüş rotasında asırlık sedir ağaçlarının işaretlendiğini ve 4 tanesinin taze kesildiğini gördük. Traktör izleri mevcut.',
    isVolunteerCandidate: true,
    submittedAt: 'Bugün, 08:35',
    status: 'verified'
  },
  {
    id: 'CIT-103',
    fullName: 'Elif Demir',
    phone: '0544 *** ** 82',
    email: 'elif.d@outlook.com',
    locationName: 'Bursa İnegöl Oylat Ormanlık Alanı',
    lat: 39.952,
    lng: 29.582,
    incidentType: 'unauthorized_road',
    description: 'Dere yatağı boyunca dozerle izinsiz yol açılıyor. Ağaç kökleri sökülmüş durumda.',
    isVolunteerCandidate: true,
    submittedAt: 'Dün, 16:20',
    status: 'pending'
  },
  {
    id: 'CIT-102',
    fullName: 'Murat Can',
    phone: '0505 *** ** 99',
    locationName: 'İzmir Menderes Değirmendere Ormanı',
    lat: 38.182,
    lng: 27.142,
    incidentType: 'illegal_building',
    description: 'Milli park sınırına yakın yerde prefabrik yapı temeli kazılmış ve etrafındaki çamlar kesilmiş.',
    isVolunteerCandidate: false,
    submittedAt: '2 gün önce',
    status: 'verified'
  }
];
