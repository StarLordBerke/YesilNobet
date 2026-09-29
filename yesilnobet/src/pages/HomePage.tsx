import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { LiveStatsSection } from '../components/home/LiveStatsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { AcousticWaveVisualizer } from '../components/home/AcousticWaveVisualizer';
import { LivePollutionFeedSection } from '../components/home/LivePollutionFeedSection';
import { FeaturedBlogSection } from '../components/home/FeaturedBlogSection';
import { SponsorsSection } from '../components/home/SponsorsSection';
import { FeaturedTestimonialsSection } from '../components/home/FeaturedTestimonialsSection';
import { Link } from 'react-router-dom';
import { Map, AlertTriangle, Route, Trees, ArrowRight, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Telemetry Data Stats */}
      <LiveStatsSection />

      {/* 3. How It Works (3 Steps) */}
      <HowItWorksSection />

      {/* 4. Interactive Acoustic Spectrogram Feature */}
      <section className="py-20 bg-stone-900 border-b border-stone-800 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
              Derin Öğrenme & Biyo-Akustik
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Motorlu Testere Sesini Milisaniyeler İçinde Ayırt Edin
            </h2>
            <p className="mt-3 text-base text-stone-300 leading-relaxed">
              Orman içinde çalışan testerelerin karakteristik 1200 - 2400 Hz harmonik frekansları, yapay zeka spektrogram filtrelerimiz sayesinde doğadaki diğer seslerden anında ayrıştırılır.
            </p>
          </div>

          <AcousticWaveVisualizer />
        </div>
      </section>

      {/* 5. Canlı Veri Beslemesi - Son Bildirilen Kirlilik Noktaları (BLOG BÖLÜMÜNÜN HEMEN ÜZERİNDE) */}
      <LivePollutionFeedSection />

      {/* 6. Öne Çıkan Blog Yazıları & Raporlar Bölümü */}
      <FeaturedBlogSection />

      {/* 7. Destekçilerimiz ve Sponsorlarımız (Sürekli Kayan Sonsuz Marquee) */}
      <SponsorsSection />

      {/* 8. Öne Çıkan Yorumlar & Saha Görüşleri */}
      <FeaturedTestimonialsSection />

      {/* 9. Ecological Corridor Callout Banner */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-emerald-950/60 border border-emerald-800 rounded-3xl p-8 sm:p-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                <Route className="w-4 h-4" />
                <span>Habitat Parçalanmasını Birlikte Onarıyoruz</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Kopuk Yeşil Koridorları Belirleyip Fidan Dikim Seferberliği Başlatın
              </h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                Yol, maden veya yasadışı kesim sebebiyle birbirinden kopan orman ekosistemlerini Sentinel-2 uydu verisiyle tespit ediyoruz. Gönüllü ordumuzla yerli ağaç türlerini dikerek yaban hayatına nefes koridoru açıyoruz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <Link
                to="/harita"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-50 transition-all shadow-lg"
              >
                <Map className="w-4 h-4" />
                <span>Koridor Haritasını İncele</span>
              </Link>
              <Link
                to="/fidan-bagisi"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-all border border-emerald-500/60"
              >
                <Trees className="w-4 h-4" />
                <span>Fidan Gönüllüsü Ol</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
