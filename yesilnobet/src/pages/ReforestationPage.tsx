import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trees,
  Sprout,
  Heart,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Droplets,
  Calendar,
  Send,
  Loader2,
  Award,
  Leaf,
  Layers,
  HeartHandshake,
  Share2
} from 'lucide-react';
import reforestationHeroImg from '../assets/images/forest_reforestation_1790591935001.jpg';
import canopyImg from '../assets/images/hero_forest_canopy_1790591910625.jpg';

interface ReforestationProject {
  id: string;
  name: string;
  region: string;
  subLocation: string;
  threatReason: string;
  targetSaplings: number;
  plantedSaplings: number;
  targetSpecies: string[];
  severity: 'critical' | 'high' | 'medium';
  coordinates: string;
  nextPlantingDate: string;
  status: 'active' | 'preparing' | 'completed';
}

const REFORESTATION_PROJECTS: ReforestationProject[] = [
  {
    id: 'REF-01',
    name: 'Madra Dağı Ekolojik Onarım & Koridor Tamamlama',
    region: 'Balıkesir / Çanakkale',
    subLocation: 'Madra Dağı - Kazdağları Geçiş Hattı',
    threatReason: 'Maden sahası genişlemesi ve kaçak yol açımı sonucu 38 kilometrelik yaban hayatı koridoru koptu.',
    targetSaplings: 120000,
    plantedSaplings: 84500,
    targetSpecies: ['Kazdağı Göknarı (Abies nordmanniana)', 'Doğu Kayını', 'Kestane'],
    severity: 'critical',
    coordinates: '39.712° K, 26.845° D',
    nextPlantingDate: '18 Ekim 2026',
    status: 'active'
  },
  {
    id: 'REF-02',
    name: 'Milas & Güllük Kıyı Ormanları Canlandırma',
    region: 'Muğla',
    subLocation: 'Milas Güllük Körfezi Kıyı Şeridi',
    threatReason: 'Ağır iş makineleriyle yapılan izinsiz arazi tahribatı ve kıyı ormanı parçalanması.',
    targetSaplings: 65000,
    plantedSaplings: 39200,
    targetSpecies: ['Kızılçam (Pinus brutia)', 'Sandal Ağacı', 'Yabani Zeytin (Delice)'],
    severity: 'critical',
    coordinates: '37.242° K, 27.618° D',
    nextPlantingDate: '25 Ekim 2026',
    status: 'active'
  },
  {
    id: 'REF-03',
    name: 'Köyceğiz Sandras Dağı Sığla Ormanları Rehabilitasyonu',
    region: 'Muğla',
    subLocation: 'Köyceğiz - Gökova Biyolojik Geçiş Kuşağı',
    threatReason: 'Yasadışı motorlu testere kesimleri ve dere yatağı drenaj bozulması.',
    targetSaplings: 52000,
    plantedSaplings: 31000,
    targetSpecies: ['Anadolu Sığla Ağacı (Liquidambar orientalis)', 'Çınar', 'Kızılçam'],
    severity: 'high',
    coordinates: '36.985° K, 28.692° D',
    nextPlantingDate: '08 Kasım 2026',
    status: 'active'
  },
  {
    id: 'REF-04',
    name: 'Menderes Gümüldür Kızılçam Kuşağı Yenileme',
    region: 'İzmir',
    subLocation: 'Menderes - Değirmendere Orman Sınırı',
    threatReason: 'Geçmiş yangın alanları ve kaçak orman içi yapılaşma baskısı.',
    targetSaplings: 80000,
    plantedSaplings: 58400,
    targetSpecies: ['Kızılçam', 'Harnup (Keçiboynuzu)', 'Defne'],
    severity: 'high',
    coordinates: '38.125° K, 27.054° D',
    nextPlantingDate: '15 Kasım 2026',
    status: 'active'
  },
];

export const ReforestationPage: React.FC = () => {
  // Tab state: 'donation' (Fidan Bağışı) vs 'volunteer' (Fidan Gönüllüsü Başvurusu)
  const [activeTab, setActiveTab] = useState<'donation' | 'volunteer'>('donation');

  // Donation state
  const [selectedSaplingCount, setSelectedSaplingCount] = useState<number>(10);
  const [customCount, setCustomCount] = useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('REF-01');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [dedicationMessage, setDedicationMessage] = useState<string>('');
  const [isCertificateWanted, setIsCertificateWanted] = useState<boolean>(true);
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Volunteer state
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Balıkesir',
    preferredProject: 'REF-01',
    hasTools: false,
    experience: 'daha_once_katildim',
    notes: '',
  });
  const [volunteerSuccess, setVolunteerSuccess] = useState<boolean>(false);
  const [isSubmittingVolunteer, setIsSubmittingVolunteer] = useState<boolean>(false);

  const saplingUnitPrice = 45; // 45 TL per sapling

  const currentCount = customCount ? parseInt(customCount, 10) || 0 : selectedSaplingCount;
  const totalAmount = currentCount * saplingUnitPrice;

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCount <= 0 || !donorName || !donorEmail) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDonationSuccess(true);
    }, 1200);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.phone) return;

    setIsSubmittingVolunteer(true);
    setTimeout(() => {
      setIsSubmittingVolunteer(false);
      setVolunteerSuccess(true);
    }, 1200);
  };

  return (
    <div className="flex-1 bg-stone-50 text-stone-900 pb-24">
      {/* 1. Hero Section with Real Asset Image */}
      <section className="relative bg-stone-900 text-stone-100 overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-stone-800">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={reforestationHeroImg}
            alt="Tahrip olan orman alanlarına fidan dikimi ve doğa onarımı"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/90 to-stone-950/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tahrip Olan Ormanları Yaşama Döndürme Seferberliği</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            Kopuk Koridorları Fidanlarla Birleştiriyoruz: <span className="text-emerald-400">Geleceğe Nefes Ol</span>
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-stone-300 max-w-3xl leading-relaxed">
            Maden sahaları, kontrolsüz yol açımları, kaçak dozer tahribatı ve orman yangınlarıyla yitirilen alanları bilimsel yöntemlerle onarıyoruz. Sentinel-2 uydu verisiyle belirlenen en kritik ekolojik boşluklara yerli ağaç türlerini dikerek yaban hayatına nefes yolu açıyoruz.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                setActiveTab('donation');
                document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Hemen Fidan Bağışı Yap</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('volunteer');
                document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Saha Dikim Gönüllüsü Ol</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Impact Metrics / Seferberlik İstatistikleri */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-800 font-mono">
              213.100+
            </div>
            <div className="text-xs text-stone-600 font-medium mt-1">
              Toprakla Buluşan Yerli Fidan
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 font-mono">
              4 Ekolojik Hat
            </div>
            <div className="text-xs text-stone-600 font-medium mt-1">
              Aktif Yenilenen Koridor
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-700 font-mono">
              %91.4
            </div>
            <div className="text-xs text-stone-600 font-medium mt-1">
              Fidan Tutma & Yaşama Oranı
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 font-mono">
              4.850+
            </div>
            <div className="text-xs text-stone-600 font-medium mt-1">
              Aktif Saha Dikim Gönüllüsü
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 space-y-12 sm:space-y-16">
        {/* 3. Neden Bilimsel Koridor Onarımı? (Tablet ve Mobilde Ferah Grid & Yüksek Okunabilirlik) */}
        <section className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 lg:gap-10">
            {/* Sol Taraf: Açıklama ve 4 Özellik */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rastgele Değil, Ekolojik Matematikle Ağaçlandırma</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
                Tahrip Olan Alanları Nasıl Belirliyor ve Yaşama Döndürüyoruz?
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Her ağaç dikimi ekosisteme fayda sağlamayabilir; monokültür veya yabancı türler toprağın dengesini bozabilir. YeşilNöbet olarak:
              </p>

              {/* 4 Madde: Mobilde 1, Tablet ve Üstünde 2 Sütun */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">Sentinel-2 Spektral Analizi</h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">NDVI fark haritalarıyla en çok kopan habitat geçişleri tespit edilir.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">Yerli ve Dayanıklı Türler</h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">Kazdağı göknarı, sığla, meşe ve kızılçam gibi bölgeye özgü tohumlar kullanılır.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">3 Yıllık Can Suyu & Takip</h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">Dikilen fidanlar 3 yıl boyunca yerel muhtarlık ve orman şeflikleriyle izlenir.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">Dijital Koordinat Sertifikası</h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">Bağışlanan her fidanın ada/parsel koordinatı sertifikanızda yer alır.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf: Canlı Seferberlik Fidan Kartı (Tablet ve Mobilde Tam Uyumlu) */}
            <div className="w-full lg:w-80 shrink-0 self-center lg:self-auto">
              <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-7 border border-stone-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                  <span className="font-bold tracking-wider">CANLI SEFERBERLİK</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    1 Fidan: 45 ₺
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mt-2">
                    Tohum tedariği, tüplü fidan yetiştiriciliği, dikim kazısı ve ilk 3 yıl can suyu bakım masraflarını kapsar.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-800">
                  <button
                    onClick={() => {
                      setActiveTab('donation');
                      document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs sm:text-sm font-bold transition-all text-center block cursor-pointer shadow-md"
                  >
                    Bağış Formuna Git
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Aktif Onarım Projeleri Kartları */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>Kurtarılmayı Bekleyen Alanlar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Aktif Fidan Dikim ve İhya Projelerimiz
              </h2>
            </div>
            <Link
              to="/harita"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Tüm Koridorları Haritada İncele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REFORESTATION_PROJECTS.map((proj) => {
              const progressPct = Math.round((proj.plantedSaplings / proj.targetSaplings) * 100);
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-7 shadow-xs hover:border-emerald-500/60 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {proj.id} · {proj.region}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-2 leading-snug group-hover:text-emerald-800 transition-colors">
                          {proj.name}
                        </h3>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 shrink-0">
                        {proj.severity === 'critical' ? 'Kritik Koridor' : 'Yüksek Öncelik'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{proj.subLocation}</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      <strong>Tahribat Nedeni:</strong> {proj.threatReason}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-700">
                          Dikim İlerlemesi: %{progressPct}
                        </span>
                        <span className="font-mono text-stone-500">
                          {proj.plantedSaplings.toLocaleString('tr-TR')} / {proj.targetSaplings.toLocaleString('tr-TR')} fidan
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Target species tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {proj.targetSpecies.map((sp, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sıradaki Dikim: <strong>{proj.nextPlantingDate}</strong></span>
                    </span>

                    <button
                      onClick={() => {
                        setSelectedProjectId(proj.id);
                        setActiveTab('donation');
                        document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      Bu Sahaya Bağış Yap
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. ACTION SECTION: FİDAN BAĞIŞI VE FİDAN GÖNÜLLÜSÜ BAŞVURUSU (En Altta) */}
        <section
          id="action-section"
          className="bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden scroll-mt-24"
        >
          {/* Tabs Header */}
          <div className="bg-stone-900 p-6 sm:p-8 text-white border-b border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Adım Atın & Destek Olun
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                  Ormanlarımızı Birlikte Yeniden Yeşertelim
                </h3>
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex items-center gap-2 bg-stone-800/90 p-1.5 rounded-2xl border border-stone-700 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('donation')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'donation'
                      ? 'bg-emerald-500 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Fidan Bağışı Yap</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('volunteer')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'volunteer'
                      ? 'bg-emerald-500 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Fidan Gönüllüsü Ol</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab 1: Fidan Bağışı Formu */}
          {activeTab === 'donation' && (
            <div className="p-6 sm:p-10">
              {donationSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-stone-900">
                    Fidan Bağışınız Başarıyla Alındı!
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Sayın <strong>{donorName}</strong>, <strong>{currentCount} adet</strong> fidanınız {REFORESTATION_PROJECTS.find(p => p.id === selectedProjectId)?.name} sahasına eklenmiştir. Dijital fidan sertifikanız <strong>{donorEmail}</strong> adresinize gönderildi.
                  </p>
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setDonationSuccess(false);
                        setDonorName('');
                        setDonorEmail('');
                        setCustomCount('');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Yeni Bağış Yap
                    </button>
                    <Link
                      to="/harita"
                      className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
                    >
                      Koridor Haritasında Gör
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDonationSubmit} className="space-y-8">
                  {/* Step 1: Sahayı Seçin */}
                  <div>
                    <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                      1. Fidan Dikilecek Sahayı Seçin
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {REFORESTATION_PROJECTS.map((proj) => (
                        <label
                          key={proj.id}
                          className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedProjectId === proj.id
                              ? 'bg-emerald-50/60 border-emerald-600 shadow-xs ring-1 ring-emerald-600'
                              : 'bg-stone-50/60 border-stone-200 hover:bg-stone-100/60'
                          }`}
                        >
                          <input
                            type="radio"
                            name="project"
                            checked={selectedProjectId === proj.id}
                            onChange={() => setSelectedProjectId(proj.id)}
                            className="mt-1 text-emerald-600 focus:ring-emerald-500"
                          />
                          <div>
                            <div className="text-xs font-bold text-stone-900">{proj.name}</div>
                            <div className="text-[11px] text-stone-500">{proj.region} · {proj.subLocation}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Fidan Adedini Seçin */}
                  <div>
                    <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                      2. Bağışlamak İstediğiniz Fidan Sayısı
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[3, 5, 10, 25].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => {
                            setSelectedSaplingCount(cnt);
                            setCustomCount('');
                          }}
                          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            !customCount && selectedSaplingCount === cnt
                              ? 'bg-emerald-800 text-white border-emerald-800 font-bold shadow-sm'
                              : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 font-semibold'
                          }`}
                        >
                          <div className="text-lg">{cnt} Fidan</div>
                          <div className="text-[11px] opacity-80 font-mono mt-0.5">{cnt * saplingUnitPrice} ₺</div>
                        </button>
                      ))}

                      {/* Custom count input */}
                      <div className="col-span-2 sm:col-span-1">
                        <input
                          type="number"
                          min="1"
                          placeholder="Farklı Adet"
                          value={customCount}
                          onChange={(e) => setCustomCount(e.target.value)}
                          className={`w-full h-full p-3.5 rounded-2xl border text-center text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-700 ${
                            customCount
                              ? 'bg-emerald-800 text-white border-emerald-800 placeholder-white/70'
                              : 'bg-stone-50 border-stone-200 text-stone-800'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Bağışçı İletişim Bilgileri */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
                      3. Bağışçı & Sertifika Bilgileri
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-stone-600 mb-1 font-medium">Ad Soyad / Kurum Adı *</label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Örn: Mehmet Yılmaz"
                          className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-600 mb-1 font-medium">E-posta (Dijital Sertifika İçin) *</label>
                        <input
                          type="email"
                          required
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="ornek@alanadi.com"
                          className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-600 mb-1 font-medium">Telefon Numarası</label>
                        <input
                          type="tel"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="05XX XXX XX XX"
                          className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1 font-medium">Fidan Sertifikası Notu / İthaf (Opsiyonel)</label>
                      <input
                        type="text"
                        value={dedicationMessage}
                        onChange={(e) => setDedicationMessage(e.target.value)}
                        placeholder="Örn: Sevgili kızıma doğum günü hediyesi..."
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Summary & Submit */}
                  <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-stone-400">Toplam Bağış Bedeli ({currentCount} Fidan):</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                        {totalAmount.toLocaleString('tr-TR')} ₺
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        * Tüm bağışlar doğrudan fidan dikim ve can suyu havuzuna aktarılır.
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing || currentCount <= 0 || !donorName || !donorEmail}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>İşlem Yapılıyor...</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 fill-stone-950" />
                          <span>Bağışı Onayla ({totalAmount} ₺)</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab 2: Fidan Gönüllüsü Başvuru Formu */}
          {activeTab === 'volunteer' && (
            <div className="p-6 sm:p-10">
              {volunteerSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-stone-900">
                    Gönüllü Başvurunuz Alındı!
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Aramıza hoş geldiniz <strong>{volunteerForm.name}</strong>. Bir sonraki dikim etkinliği öncesinde saha koordinatörlerimiz <strong>{volunteerForm.phone}</strong> üzerinden sizinle iletişime geçecektir.
                  </p>
                  <button
                    onClick={() => {
                      setVolunteerSuccess(false);
                      setVolunteerForm({
                        name: '',
                        email: '',
                        phone: '',
                        city: 'Balıkesir',
                        preferredProject: 'REF-01',
                        hasTools: false,
                        experience: 'daha_once_katildim',
                        notes: '',
                      });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Yeni Başvuru Yap
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-stone-700 mb-1 font-bold">Ad Soyad *</label>
                      <input
                        type="text"
                        required
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        placeholder="Örn: Ayşe Demir"
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-700 mb-1 font-bold">E-posta Adresi *</label>
                      <input
                        type="email"
                        required
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        placeholder="ayse@alanadi.com"
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-700 mb-1 font-bold">Telefon Numarası *</label>
                      <input
                        type="tel"
                        required
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        placeholder="05XX XXX XX XX"
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-700 mb-1 font-bold">Katılmak İstediğiniz Saha *</label>
                      <select
                        value={volunteerForm.preferredProject}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, preferredProject: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      >
                        {REFORESTATION_PROJECTS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.nextPlantingDate})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-700 mb-1 font-bold">Fidan Dikim Tecrübeniz</label>
                      <select
                        value={volunteerForm.experience}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, experience: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      >
                        <option value="daha_once_katildim">Daha önce fidan dikim etkinliğine katıldım</option>
                        <option value="ilk_kez">İlk kez katılacağım (eğitim talep ediyorum)</option>
                        <option value="uzman">Ziraat / Orman öğrencisi / mezunuyum</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-700 mb-1 font-bold">Ekstra Notlar / Ulaşım Durumu</label>
                    <textarea
                      rows={3}
                      value={volunteerForm.notes}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, notes: e.target.value })}
                      placeholder="Şahsi aracınızla mı geleceksiniz veya OGM otobüs kalkış noktası servisinden yararlanmak ister misiniz?"
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingVolunteer || !volunteerForm.name || !volunteerForm.email || !volunteerForm.phone}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmittingVolunteer ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Başvuru İletiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4" />
                          <span>Gönüllü Başvurusunu Gönder</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
