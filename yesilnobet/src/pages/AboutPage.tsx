import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trees,
  Target,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Users,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Radio,
  Satellite,
  Compass,
  FileCode2,
  Palette,
  KanbanSquare,
  ArrowRight,
  Route,
  CheckCircle2,
  Clock,
  Eye,
  HeartHandshake
} from 'lucide-react';
import forestImg from '../assets/images/hero_forest_canopy_1790591910625.jpg';
import sensorImg from '../assets/images/acoustic_sensor_device_1790591923119.jpg';
import volunteerImg from '../assets/images/forest_reforestation_1790591935001.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex-1 bg-stone-50 text-stone-900 pb-20">
      {/* 1. Header Banner & Project Identity */}
      <section className="relative bg-stone-900 text-stone-100 overflow-hidden py-16 sm:py-20 border-b border-stone-800">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={forestImg}
            alt="Türkiye orman örtüsü ve kanopi derinliği"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/90 to-stone-950/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span>Proje Manifestosu & Vizyon Belgesi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            Proje YeşilNöbet: <span className="text-emerald-400">Yapay Zeka ve Sensör Destekli Erken Uyarı Sistemi</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-3xl leading-relaxed font-normal">
            Gelişen termal uydu gözlemleri, multispektral uzaktan algılama ve IoT biyo-akustik teknolojilerini bir araya getirerek Türkiye'nin orman varlığını <span className="text-white font-medium">orman yangınlarından</span>, <span className="text-white font-medium">orman alanı tahribatı ve kaçak açmalardan</span>, yasadışı kesimlerden koruyor ve kopan yaban hayatı koridorlarını bilimsel verilerle birbirine bağlıyoruz.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">
        {/* 2. Projenin Amacı */}
        <section className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Target className="w-4 h-4 text-emerald-700" />
              <span>Stratejik Hedef</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-4">
              Projenin Amacı
            </h2>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-4xl">
              Ormanlık alanlardaki yasadışı ağaç kesimlerini, arazi tahribatını ve habitat parçalanmasını uydu görüntüleri ve akustik sensörler yardımıyla eşzamanlı olarak tespit etmek; bu kritik verileri sivil toplum kuruluşları, orman muhafaza memurları ve yerel halk için anlaşılır, interaktif bir web paneli üzerinden sunarak anında müdahale imkanı yaratmak.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                  <Satellite className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Eşzamanlı Tespit</div>
                  <div className="text-xs text-stone-500 mt-0.5">Sentinel-2 & LoRaWAN akustik füzyonu</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Anlaşılır İnteraktif UI</div>
                  <div className="text-xs text-stone-500 mt-0.5">Harita üzerinde sade ısı ve risk katmanları</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Anında Kolluk Müdahalesi</div>
                  <div className="text-xs text-stone-500 mt-0.5">OGM nöbetçi masasına doğrudan koordinat iletimi</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2.1 Misyon ve Vizyon (Yan Yana İki Kutu) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Misyon Kutusu */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-7 sm:p-9 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/60 hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-50 rounded-full blur-2xl -z-0 pointer-events-none group-hover:bg-emerald-100/50 transition-colors" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>Temel Misyonumuz</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mb-3">
                Misyonumuz
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Yüksek çözünürlüklü uydu verilerini, yapay zeka destekli akustik sensörleri ve sivil toplum katılımını tek bir açık ekosistemde buluşturarak; Türkiye'nin ormanlarını, biyoçeşitlilik koridorlarını ve doğal kaynaklarını kaçak kesim, orman yangınları ve plansız arazi tahribatına karşı milisaniyeler düzeyinde korumak ve karar alıcılara gerçek zamanlı eyleme dönüştürülebilir veri sağlamak.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Veriye Dayalı, Şeffaf ve Anında Koruma Kalkanı</span>
            </div>
          </div>

          {/* Vizyon Kutusu */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-7 sm:p-9 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-teal-500/60 hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-36 h-36 bg-teal-50 rounded-full blur-2xl -z-0 pointer-events-none group-hover:bg-teal-100/50 transition-colors" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4">
                <Eye className="w-3.5 h-3.5 text-teal-700" />
                <span>Gelecek Vizyonumuz</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mb-3">
                Vizyonumuz
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Teknolojinin doğa koruma hizmetinde en ileri düzeyde kullanıldığı, her orman parselinin ve kopuk ekolojik koridorun kesintisiz izlenebildiği, hiçbir ağacın sessizce yok olmadığı ve toplumun her ferdinin birer doğa nöbetçisine dönüştüğü sıfır kanopi kaybına sahip, sürdürülebilir ve yaşayan bir orman geleceği inşa etmek.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-teal-800">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Sıfır Kaçak Kesim, Kesintisiz Ekolojik Koridorlar</span>
            </div>
          </div>
        </section>

        {/* 3. Sorun Tespiti (Uyarı renkleriyle modern kartlar) */}
        <section className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Mevcut Durum Analizi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Sorun Tespiti
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Geleneksel devriye yöntemlerinin yetersiz kaldığı kritik darboğazlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sorun 1 */}
            <div className="rounded-2xl bg-white border-2 border-rose-200/90 hover:border-rose-300 p-6 shadow-xs flex flex-col justify-between transition-all group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4 border border-rose-100 group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  Gecikmeli Müdahale
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Yasadışı ağaç kesimi veya orman arazisi işgalleri genellikle devasa alanlarda insan devriyesi ile kontrol edilmeye çalışıldığından, tahribat ancak iş işten geçtikten sonra (ağaçlar yok olduğunda) fark edilmektedir.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-rose-100 text-[11px] font-mono text-rose-700 font-semibold">
                Kritik Risk: Geri Döndürülemez Ağaç Kaybı
              </div>
            </div>

            {/* Sorun 2 */}
            <div className="rounded-2xl bg-white border-2 border-amber-200/90 hover:border-amber-300 p-6 shadow-xs flex flex-col justify-between transition-all group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-100 group-hover:scale-105 transition-transform">
                  <Route className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  Habitat Bölünmesinin Takip Edilememesi
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Yollar, maden sahaları veya çarpık yapılaşma nedeniyle ormanların bölünmesi, yaban hayatı geçiş koridorlarını koparmakta ancak bu "görünmez" bariyerlerin haritalaması güncel tutulamamaktadır.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-amber-100 text-[11px] font-mono text-amber-700 font-semibold">
                Kritik Risk: Ekosistem Genetik İzolasyonu
              </div>
            </div>

            {/* Sorun 3 */}
            <div className="rounded-2xl bg-white border-2 border-stone-300/90 hover:border-stone-400 p-6 shadow-xs flex flex-col justify-between transition-all group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center mb-4 border border-stone-200 group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  Karmaşık Veri ve İletişim Kopukluğu
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Uydu verileri veya orman envanterleri genellikle uzman olmayanların (yerel halk, gönüllüler) okuyamayacağı kadar karmaşık formatlarda tutulmakta, bu da toplumsal denetimi ve katılımı zorlaştırmaktadır.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-600 font-semibold">
                Kritik Risk: Şeffaflık & Katılım Eksikliği
              </div>
            </div>
          </div>
        </section>

        {/* 4. Çözüm Önerisi (Proje Mimarisi) (Orman Yeşili güven veren yapı) */}
        <section className="bg-emerald-950 text-stone-100 rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <span>Yenilikçi Yaklaşım</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Çözüm Önerisi (Proje Mimarisi)
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              Proje, tahribatı anında tespit eden bir yapay zeka altyapısı ve bu durumu görselleştiren dijital bir platform olarak iki temel ayaktan oluşur:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Çözüm 1 */}
            <div className="p-6 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 hover:bg-emerald-900/90 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center mb-5 border border-emerald-600">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  Uydu ve Akustik Sensör Analizi
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Açık kaynaklı uydu görüntüleri (örn. Sentinel-2) makine öğrenmesi ile sürekli taranarak yeşil doku kayıpları tespit edilir. Eş zamanlı olarak, koruma altındaki kritik bölgelere yerleştirilen güneş enerjili akustik sensörler, motorlu testere veya ağır iş makinesi seslerini algılayarak sisteme sinyal gönderir.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edge ML + ResNet18 Spektrogramı</span>
              </div>
            </div>

            {/* Çözüm 2 */}
            <div className="p-6 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 hover:bg-emerald-900/90 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center mb-5 border border-emerald-600">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  Dinamik Risk Haritası ve UI Platformu
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Tespit edilen anomali ve tehlikeler, modern bir web arayüzünde "Isı Haritası" (Heatmap) olarak görselleştirilir. Orman muhafaza ekipleri bu ekrandan anlık bildirim ve konum koordinatı alır.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Leaflet.js + Anlık GPS Sevk Emri</span>
              </div>
            </div>

            {/* Çözüm 3 */}
            <div className="p-6 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 hover:bg-emerald-900/90 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center mb-5 border border-emerald-600">
                  <Route className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  Yeşil Koridor Planlaması
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Sistem sadece yok olanı değil, aynı zamanda yeniden ağaçlandırma yapılması gereken "kopuk habitat koridorlarını" da analiz ederek, doğa derneklerine fidan dikim kampanyaları için stratejik lokasyonlar önerir.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Biyolojik Geçiş Graf Analizi (GIS)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Kullanılacak Teknolojiler ve İş Akışı (Şık Rozetler / Teknoloji Kartları) */}
        <section className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>Mühendislik Yığını</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Kullanılacak Teknolojiler ve İş Akışı
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Veri biliminden tasarım sistemine, uçtan uca modern teknolojiler ile inşa edilmiştir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tech 1: Veri Bilimi ve Yapay Zeka */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">AI / ML Pipeline</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Veri Bilimi ve Yapay Zeka
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Uydu görüntülerinin sınıflandırılması ve sensörlerden gelen ses verilerinin işlenmesi için Python; verilerin ön işlemesi ve analizi için Pandas ve NumPy; görsel raporlamalar için Matplotlib ve Seaborn kullanılacaktır.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100">
                {['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'].map((badge) => (
                  <span key={badge} className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech 2: UI/UX Tasarımı */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
                    <Palette className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">Tasarım Mimarisi</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Kullanıcı Deneyimi ve Arayüz (UI/UX)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Ekiplerin acil durumlarda panik yaşamadan veriyi okuyabilmesi ve gönüllülerin sistemi kolayca kullanabilmesi için ekran mimarileri Figma üzerinde, erişilebilirlik ve görsel hiyerarşi kurallarına uygun tasarlanacaktır.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100">
                {['Figma', 'Design Systems', 'WCAG Erişilebilirlik', 'Hiyerarşik UI'].map((badge) => (
                  <span key={badge} className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech 3: Web Front-End */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                    <FileCode2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">İnteraktif Web</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Web Front-End Geliştirme
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Harita entegrasyonuna sahip interaktif kullanıcı arayüzü, HTML5, CSS3 ve JavaScript mimarisiyle kodlanacak ve tüm cihazlarda kusursuz (responsive) çalışacaktır.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100">
                {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Leaflet', 'Tailwind CSS'].map((badge) => (
                  <span key={badge} className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech 4: Görsel İletişim ve Markalama */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">Branding & Creative</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Görsel İletişim ve Markalama
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  YeşilNöbet projesinin logo tasarımı, dijital varlıkları, sosyal medya kampanyaları ve kurumsal kimlik çalışmaları Adobe Photoshop, Illustrator ve InDesign kullanılarak estetik bir bütünlük içinde inşa edilecektir.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100">
                {['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Kurumsal Kimlik'].map((badge) => (
                  <span key={badge} className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech 5: Proje Yönetimi */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
                    <KanbanSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">Agile Yönetim</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Proje Yönetimi
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Süreç takibi, görev atamaları ve ekip içi dokümantasyon Notion üzerinden yönetilecektir. Görev dağılımları ve sprint hedefleri eş zamanlı işbirliğiyle şeffaf şekilde takip edilir.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100">
                {['Notion', 'Sprint Tracking', 'Proje Dokümantasyonu', 'Ekip İçi Senkronizasyon'].map((badge) => (
                  <span key={badge} className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Hedef Kitle ve Paydaşlar */}
        <section className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Kullanıcı Profilleri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Hedef Kitle ve Paydaşlar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Birincil Kullanıcılar */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-emerald-800 text-white mb-3">
                  Birincil Kullanıcılar
                </span>
                <h3 className="text-lg font-bold text-stone-900 mb-3">
                  Resmi Kurumlar & Uzman Sahalar
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  Orman Genel Müdürlüğü (OGM) saha ekipleri, çevre koruma vakıfları, milli park görevlileri.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Doğrudan devriye sevk yetkisi ve telemetri alarm doğrulama</span>
              </div>
            </div>

            {/* İkincil Kullanıcılar */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-amber-800 text-white mb-3">
                  İkincil Kullanıcılar
                </span>
                <h3 className="text-lg font-bold text-stone-900 mb-3">
                  Sivil Toplum & Doğa Severler
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  Çevrede yaşayan ve şüpheli durumları teyit edip ihbarda bulunabilecek doğa yürüyüşçüleri, izciler ve kırsal bölge sakinleri.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-500 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Tek tıkla fotoğraflı ihbar ve fidan dikim gönüllü seferi</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Beklenen Etki ve Çıktılar (Orman Yeşili İkonlu Listeler) */}
        <section className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>Sosyal ve Ekolojik Kazanım</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Beklenen Etki ve Çıktılar
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Platformun sahada yaratacağı ölçülebilir ve somut değişimler:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Çıktı 1 */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Hızlı Müdahale Süresi
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Yasadışı kesim ve kaçak yapılaşmaya karşı müdahale süresinin haftalardan saatlere inmesi.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 font-mono text-xs text-emerald-800 font-bold">
                Müdahale: Haftalardan &lt; 2 Saate
              </div>
            </div>

            {/* Çıktı 2 */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Route className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Nokta Atışı Fidan Koridorları
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Yapay zekanın belirlediği kopuk habitat noktalarına yapılacak "nokta atışı" fidan dikimleri ile yaban hayatı geçiş koridorlarının bilimsel verilerle yeniden birleştirilmesi.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 font-mono text-xs text-emerald-800 font-bold">
                Ekolojik Bağlantı: %100 Bilimsel Rota
              </div>
            </div>

            {/* Çıktı 3 */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Şeffaf Toplumsal Denetim
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Karmaşık uydu verilerinin sade, estetik ve interaktif bir arayüzle sunulması sayesinde orman koruma faaliyetlerinin şeffaflaşması.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 font-mono text-xs text-emerald-800 font-bold">
                Açık Veri & Toplumsal Katılım
              </div>
            </div>
          </div>
        </section>

        {/* 8. Call to Action */}
        <section className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ormanlarımızı Koruma Ağına Şimdi Katılın
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
              Canlı risk haritasını inceleyebilir, bölgenizdeki şüpheli kesimleri bildirebilir ya da fidan dikim günlerine gönüllü olabilirsiniz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/harita"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-stone-900 bg-white hover:bg-stone-100 transition-all shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Canlı Harita Masası</span>
            </Link>
            <Link
              to="/iletisim"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-all border border-emerald-600"
            >
              <span>İletişime Geç</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
