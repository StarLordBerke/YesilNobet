import React from 'react';
import {
  Trees,
  Building2,
  Globe2,
  Shield,
  Leaf,
  Cpu,
  HeartHandshake
} from 'lucide-react';

interface SponsorItem {
  id: string;
  name: string;
  category: string;
  subtext: string;
  icon: React.ElementType;
  badge: string;
}

export const SponsorsSection: React.FC = () => {
  const sponsors: SponsorItem[] = [
    {
      id: 'sp-1',
      name: 'Orman Genel Müdürlüğü',
      category: 'Resmi Kurum & Kolluk Desteği',
      subtext: 'Nöbetçi devriye ve fidan tahsis işbirliği',
      icon: Trees,
      badge: 'OGM',
    },
    {
      id: 'sp-2',
      name: 'TEMA Vakfı',
      category: 'Ekolojik Restorasyon Partneri',
      subtext: 'Kopuk koridor fidan dikim seferleri',
      icon: Leaf,
      badge: 'TEMA',
    },
    {
      id: 'sp-3',
      name: 'TÜBİTAK BİLGEM',
      category: 'Ar-Ge & Yapay Zeka Hibe Desteği',
      subtext: 'Biyo-akustik model ve frekans optimizasyonu',
      icon: Cpu,
      badge: 'TÜBİTAK',
    },
    {
      id: 'sp-4',
      name: 'Avrupa Uzay Ajansı (ESA)',
      category: 'Copernicus Veri Sağlayıcısı',
      subtext: 'Sentinel-2 multispektral açık uydu akışı',
      icon: Globe2,
      badge: 'ESA',
    },
    {
      id: 'sp-5',
      name: 'Doğa Koruma ve Milli Parklar (DKMP)',
      category: 'Yaban Hayatı Koruma Partneri',
      subtext: 'Biyolojik geçiş koridorları envanteri',
      icon: Shield,
      badge: 'DKMP',
    },
    {
      id: 'sp-6',
      name: 'ODTÜ Teknokent Bilişim İnovasyon',
      category: 'Teknoloji Kuluçka & Sunucu Sponsoru',
      subtext: 'Edge-IoT LoRaWAN sunucu altyapısı',
      icon: Building2,
      badge: 'ODTÜ',
    },
  ];

  // We duplicate the list to ensure a seamless infinite seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <section className="py-16 bg-white border-b border-stone-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
          <span>Birlikte Daha Güçlüyüz</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Destekçilerimiz ve Sponsorlarımız
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
          Kamu kurumları, uzay ajansları ve çevre vakıflarının teknolojik ve lojistik güç birliğiyle ormanlarımızı 7/24 koruyoruz.
        </p>
      </div>

      {/* Infinite Marquee Carousel (Left to Right) */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right gradient fades for smooth blending */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Animated Track (Flowing from left to right) */}
        <div className="animate-marquee-infinite flex items-center gap-6 cursor-default">
          {duplicatedSponsors.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-4 px-6 py-4 bg-stone-50/90 hover:bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all shrink-0 w-80 select-none group"
              >
                {/* Logo / Badge container */}
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-emerald-50 text-emerald-800 border border-stone-200 group-hover:border-emerald-200 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <Icon className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-700">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold truncate">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors mt-0.5 truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {item.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
