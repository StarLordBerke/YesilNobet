import React, { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Trash2, 
  Flame, 
  Factory, 
  Droplets, 
  ExternalLink, 
  RefreshCw,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PollutionSpot {
  id: string;
  location: string;
  region: string;
  pollutantType: 'illegal_waste' | 'chemical_leak' | 'industrial_smoke' | 'plastic_debris' | 'thermal_anomaly';
  title: string;
  description: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium';
  sensorId: string;
  reportedBy: string;
  coords: { lat: number; lng: number };
  status: 'active' | 'investigating' | 'cleaned';
}

const POLLUTION_SPOTS_DATA: PollutionSpot[] = [
  {
    id: 'POL-TR-401',
    location: 'Dilovası Kömürcüler Vadisi - Çeltikdere Hattı',
    region: 'Kocaeli',
    pollutantType: 'industrial_smoke',
    title: 'Ağır Metal & PM2.5 Emisyon Pik Noktası',
    description: 'İstasyon sensörlerinde PM2.5 seviyesi Dünya Sağlık Örgütü sınır değerinin 6.2 katına fırladı. Gece saatlerinde filtre devre dışı bırakma şüphesi.',
    timestamp: '8 dakika önce',
    severity: 'critical',
    sensorId: 'AQI-KOC-DIL-04',
    reportedBy: 'Hava Kalitesi Sensör Ağı (TÜBİTAK)',
    coords: { lat: 40.782, lng: 29.541 },
    status: 'active'
  },
  {
    id: 'POL-TR-402',
    location: 'Ergene Nehri Çorlu - Muratlı Kolu Sınırı',
    region: 'Tekirdağ',
    pollutantType: 'chemical_leak',
    title: 'Organik Boyar Madde & Kimyasal Atık Deşarjı',
    description: 'Spektral su izleme sensörleri ve Sentinel-2 MSI bandında nehir suyunda aşırı kirlilik ve kimyasal oksijen ihtiyacı (KOİ) anomalisi tespit edildi.',
    timestamp: '24 dakika önce',
    severity: 'critical',
    sensorId: 'WATER-ERG-018',
    reportedBy: 'Otomatik Nehir Spektrometresi',
    coords: { lat: 41.154, lng: 27.798 },
    status: 'investigating'
  },
  {
    id: 'POL-TR-403',
    location: 'Belgrad Ormanı Neşet Suyu Kırsal Girişi',
    region: 'İstanbul',
    pollutantType: 'illegal_waste',
    title: 'Kaçak Moloz ve Tehlikeli İnşaat Atığı Dökümü',
    description: 'Biyo-akustik ve gece görüş kamera tuzağı, gece 02:40 sularında izinsiz kamyon girişi ve asbestli yıkım molozu dökümü kaydetti.',
    timestamp: '47 dakika önce',
    severity: 'high',
    sensorId: 'CAM-BLG-ENTRY-02',
    reportedBy: 'Vatandaş Bildirimi #4429',
    coords: { lat: 41.176, lng: 28.989 },
    status: 'active'
  },
  {
    id: 'POL-TR-404',
    location: 'Menderes Havzası - Aydın Söke Ovası Kanalı',
    region: 'Aydın',
    pollutantType: 'plastic_debris',
    title: 'Tarımsal Plastik & Zirai İlaç Ambalaj Yığılması',
    description: 'Sulama kanalı çıkışında ve orman kıyısında yoğun polietilen tarımsal naylon ve kimyasal kutu yığılması taşkın kapağını tıkamış durumda.',
    timestamp: '1 saat önce',
    severity: 'medium',
    sensorId: 'IOT-AYD-SOK-09',
    reportedBy: 'Yerel Doğa Koruma Gönüllüsü',
    coords: { lat: 37.749, lng: 27.404 },
    status: 'investigating'
  },
  {
    id: 'POL-TR-405',
    location: 'Kazdağları Ayvacık - Küçükkuyu Orman Eteği',
    region: 'Çanakkale',
    pollutantType: 'thermal_anomaly',
    title: 'Yasadışı Açık Atık Yakımı & Zehirli Duman',
    description: 'Termal multispektral uydu kamerasında orman sınırına 150m mesafede kontrolsüz açık çöp ateşi tespit edildi. Rüzgar çam ormanına esiyor.',
    timestamp: '2 saat önce',
    severity: 'high',
    sensorId: 'SAT-VIIRS-TH-11',
    reportedBy: 'NASA FIRMS Termal Algılayıcı',
    coords: { lat: 39.549, lng: 26.602 },
    status: 'cleaned'
  }
];

export const LivePollutionFeedSection: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [pollutionList, setPollutionList] = useState<PollutionSpot[]>(POLLUTION_SPOTS_DATA);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredSpots = filterType === 'all'
    ? pollutionList
    : pollutionList.filter(s => s.pollutantType === filterType);

  const getBadgeColor = (type: PollutionSpot['pollutantType']) => {
    switch (type) {
      case 'industrial_smoke':
        return 'bg-purple-950/70 text-purple-300 border-purple-800/80';
      case 'chemical_leak':
        return 'bg-rose-950/70 text-rose-300 border-rose-800/80';
      case 'illegal_waste':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/80';
      case 'plastic_debris':
        return 'bg-sky-950/70 text-sky-300 border-sky-800/80';
      case 'thermal_anomaly':
        return 'bg-orange-950/70 text-orange-300 border-orange-800/80';
    }
  };

  const getTypeIcon = (type: PollutionSpot['pollutantType']) => {
    switch (type) {
      case 'industrial_smoke':
        return <Factory className="w-3.5 h-3.5 shrink-0" />;
      case 'chemical_leak':
        return <Droplets className="w-3.5 h-3.5 shrink-0" />;
      case 'illegal_waste':
        return <Trash2 className="w-3.5 h-3.5 shrink-0" />;
      case 'plastic_debris':
        return <AlertTriangle className="w-3.5 h-3.5 shrink-0" />;
      case 'thermal_anomaly':
        return <Flame className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  const getTypeName = (type: PollutionSpot['pollutantType']) => {
    switch (type) {
      case 'industrial_smoke':
        return 'Sanayi Emisyonu';
      case 'chemical_leak':
        return 'Kimyasal Deşarj';
      case 'illegal_waste':
        return 'Kaçak Moloz / Atık';
      case 'plastic_debris':
        return 'Plastik Kirlilik';
      case 'thermal_anomaly':
        return 'Atık Yakma / Yangın';
    }
  };

  return (
    <section className="py-20 bg-stone-950 border-b border-stone-800/90 text-stone-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Canlı Veri Beslemesi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Son Bildirilen Kirlilik Noktaları
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
              Uydu multispektral spektrometreleri, hava kalitesi ölçüm istasyonları ve duyarlı vatandaş ihbarlarıyla anlık olarak doğrulanan ekolojik kirlilik ve atık noktaları.
            </p>
          </div>

          {/* Action / Refresh Bar */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 border border-stone-700/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-all shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Güncelleniyor...' : 'Veri Akışını Yenile'}</span>
            </button>

            <Link
              to="/ihbar"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-950/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kirlilik Bildir</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-stone-850">
          <div className="flex items-center gap-1.5 text-xs text-stone-400 mr-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-stone-500" />
            <span>Kategori Filtresi:</span>
          </div>

          {[
            { key: 'all', label: 'Tüm Kirlilik Noktaları' },
            { key: 'chemical_leak', label: 'Kimyasal Deşarj' },
            { key: 'industrial_smoke', label: 'Sanayi Emisyonu' },
            { key: 'illegal_waste', label: 'Kaçak Moloz & Atık' },
            { key: 'plastic_debris', label: 'Plastik Kirlilik' },
            { key: 'thermal_anomaly', label: 'Atık Yakma / Yangın' },
          ].map((tag) => (
            <button
              key={tag.key}
              onClick={() => setFilterType(tag.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterType === tag.key
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-900/90 text-stone-300 border border-stone-800 hover:bg-stone-800 hover:text-white'
              }`}
            >
              {tag.label}
            </button>
          ))}

          <span className="ml-auto text-xs text-stone-400 font-mono hidden md:inline">
            {filteredSpots.length} aktif kirlilik odağı izleniyor
          </span>
        </div>

        {/* Live Pollution Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-stone-900/80 backdrop-blur-md rounded-2xl border border-stone-800 p-5 hover:border-stone-700 hover:shadow-xl hover:shadow-black/50 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Header: Location & Badge cleanly arranged */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-300 transition-colors min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{spot.region} · {spot.location}</span>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border shrink-0 self-start sm:self-auto max-w-full truncate ${getBadgeColor(spot.pollutantType)}`}>
                    {getTypeIcon(spot.pollutantType)}
                    <span className="truncate">{getTypeName(spot.pollutantType)}</span>
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-sm font-bold text-white mb-2 leading-snug break-words">
                  {spot.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-4 break-words">
                  {spot.description}
                </p>
              </div>

              {/* Footer Meta & Telemetry */}
              <div className="pt-3 border-t border-stone-800/80 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{spot.timestamp}</span>
                  </span>

                  <span className="font-mono text-stone-300 bg-stone-950/60 px-2 py-0.5 rounded border border-stone-800">
                    {spot.sensorId}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 gap-2">
                  <span className="text-stone-400 truncate max-w-[170px]">
                    Kaynak: <strong className="text-stone-200">{spot.reportedBy}</strong>
                  </span>

                  <Link
                    to="/harita"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline shrink-0"
                  >
                    <span>Haritada Gör</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Live Telemetry Stats */}
        <div className="mt-10 p-5 bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950/60 border border-stone-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Doğrulanmış İhbarlar OGM ve Çevre Şehircilik Bakanlığı'na İletilir
              </h4>
              <p className="text-xs text-stone-300 mt-0.5">
                Vatandaş ihbarları ve sensör verileri çapraz doğrulamadan geçtikten sonra ilgili kolluk kuvvetine koordinatlı sevk edilir.
              </p>
            </div>
          </div>

          <Link
            to="/harita"
            className="shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Tüm Kirlilik & Yangın Haritasını Aç</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
