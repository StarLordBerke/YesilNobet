import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Shield, Satellite, Radio, HeartHandshake, PhoneCall, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Tablet Optimized Grid: 1 column on mobile, 2 columns on tablet (sm/md), 4 columns on desktop (lg/xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 xl:gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-bold text-white hover:text-emerald-400 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Trees className="w-5 h-5" />
              </div>
              <span>YeşilNöbet</span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Yapay zeka tabanlı uydu multispektral analizi ve orman içi bio-akustik sensör düğümleriyle yasadışı kesimleri durduran bağımsız koruma ağı.
            </p>
            {/* Sosyal Medya İkonları */}
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-all border border-stone-700/80 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-all border border-stone-700/80 shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-all border border-stone-700/80 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-3.5 pb-1 border-b border-stone-800/80">
              Platform Modülleri
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Genel Bakış & Akış
                </Link>
              </li>
              <li>
                <Link to="/hakkinda" className="hover:text-emerald-400 transition-colors">
                  Proje Hakkında & Vizyon
                </Link>
              </li>
              <li>
                <Link to="/fidan-bagisi" className="hover:text-emerald-400 transition-colors">
                  Fidan Bağışı & Ağaçlandırma
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-400 transition-colors">
                  Blog & Ekolojik Raporlar
                </Link>
              </li>
              <li>
                <Link to="/harita" className="hover:text-emerald-400 transition-colors">
                  Canlı Risk & Isı Haritası
                </Link>
              </li>
              <li>
                <Link to="/ihbar" className="hover:text-emerald-400 transition-colors">
                  Vatandaş İhbar Formu
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-emerald-400 transition-colors">
                  OGM & STK Komuta Paneli
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="hover:text-emerald-400 transition-colors">
                  İletişim & Koordinasyon
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Integration */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-3.5 pb-1 border-b border-stone-800/80">
              Kurumsal İşbirlikleri
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Orman Genel Müdürlüğü (OGM)</span>
              </li>
              <li className="flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>TEMA Vakfı & Doğa STK'ları</span>
              </li>
              <li className="flex items-center gap-2">
                <Satellite className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>TÜBİTAK UZAY Uydu Takip</span>
              </li>
              <li className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>LoRaWAN Orman Sensör Topluluğu</span>
              </li>
            </ul>
          </div>

          {/* Emergency Hotline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-3.5 pb-1 border-b border-stone-800/80">
              Acil İhbar Hattı
            </h4>
            <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/70 shadow-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1.5">
                <PhoneCall className="w-4 h-4 animate-bounce shrink-0" />
                <span>ALO 112 / ALO 177</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Orman yangını veya aktif yasadışı ağaç kesimi durumunda derhal resmi kolluk ve Orman Muhafaza timlerine ulaşın.
              </p>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              YeşilNöbet sistemi doğrulanmış ihbarları otomatik olarak OGM Bölge Müdürlüğü nöbetçi komuta masasına yönlendirir.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Tablet ve mobilde asla kırılmayan, temiz ve dengeli yerleşim */}
        <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col lg:flex-row items-center justify-between text-xs text-stone-500 gap-4 text-center lg:text-left">
          <p className="leading-relaxed">
            © 2026 YeşilNöbet. Gelecek nesillere nefes olacak ormanlar için açık kaynaklı ekolojik izleme girişimi.
          </p>
          <div className="flex items-center gap-3 sm:gap-5 text-stone-400 whitespace-nowrap shrink-0">
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Veri Gizliliği</span>
            <span className="text-stone-700">|</span>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">API Dokümantasyonu</span>
            <span className="text-stone-700">|</span>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Açık Kaynak Kod</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
