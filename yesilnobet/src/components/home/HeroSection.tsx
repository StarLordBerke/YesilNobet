import React from 'react';
import { Link } from 'react-router-dom';
import { Map, AlertTriangle, ArrowRight, Shield, Radio, Sparkles } from 'lucide-react';
import heroImg from '../../assets/images/hero_forest_canopy_1790591910625.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 pt-12 pb-20 md:pt-16 md:pb-24 border-b border-stone-800">
      {/* Background Image with Dark Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Yoğun yeşil çam ormanı kanopisi ve sisli vadiler"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtle live kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Türkiye Ormanları Erken Uyarı & Koruma Ağı</span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-300 font-normal">Sentinel-2 & Biyo-Akustik Sensörler</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
            Ormanların Sesi Ol, <span className="text-emerald-400">Yeşili Koru.</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-5 text-lg sm:text-xl text-stone-300 leading-relaxed font-normal max-w-2xl">
            Yapay zeka destekli termal uydu taramaları, kanopi analizleri ve biyo-akustik sensörlerle <span className="text-white font-medium">orman yangınlarını</span>, <span className="text-white font-medium">orman tahribatı ve kaçak işgalleri</span> ve motorlu testere ile ağaç kesimlerini anında tespit ediyoruz.
          </p>

          {/* Action Buttons: 2 mandatory buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/harita"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 active:translate-y-0.5 transition-all"
            >
              <Map className="w-4 h-4" />
              <span>Canlı Haritayı Aç</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/ihbar"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-stone-100 bg-stone-800/90 hover:bg-stone-700 border border-stone-700 shadow-md active:translate-y-0.5 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Şüpheli Durumu İhbar Et</span>
            </Link>
          </div>

          {/* Adjacency Proof Bar */}
          <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                &lt; 3 dk
              </div>
              <div className="text-xs text-stone-400 mt-1">Akustik kesim tespit hızı</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                %94.8
              </div>
              <div className="text-xs text-stone-400 mt-1">Yapay zeka doğruluk oranı</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">
                277.000+
              </div>
              <div className="text-xs text-stone-400 mt-1">Hedeflenen fidan koridoru</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
