import React from 'react';
import { ShieldCheck, Activity, TreePine, Eye, AlertOctagon, TrendingUp } from 'lucide-react';

export const LiveStatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Son 24 Saatte Taranan Alan',
      value: '382.400',
      unit: 'hektar',
      change: 'Sentinel-2 & Landsat-9 multispektral geçişi',
      icon: Eye,
      accent: 'emerald',
    },
    {
      label: 'Aktif Biyo-Akustik Alarmlar',
      value: '6',
      unit: 'bölge',
      change: '2 kritik inceleme, 1 devriye intikalde',
      icon: AlertOctagon,
      accent: 'rose',
    },
    {
      label: 'Önlenen Kesim, Yangın & Tahribat',
      value: '184',
      unit: 'vaka (2026)',
      change: '142 kaçak kesim, 28 orman tahribatı, 14 yangın',
      icon: ShieldCheck,
      accent: 'emerald',
    },
    {
      label: 'Kopuk Koridor Fidan Hedefi',
      value: '277.000',
      unit: 'fidan',
      change: '3 öncelikli ekolojik koridor rota planı',
      icon: TreePine,
      accent: 'amber',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-1">
              Canlı Telemetri ve Koruma Göstergeleri
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Türkiye Ormanlarında Gerçek Zamanlı Nöbet
            </h2>
          </div>
          <div className="text-xs font-mono text-stone-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Son Veri Akışı: 2 dakika önce senkronize edildi</span>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-stone-600">
                      {stat.label}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-700">
                      <Icon className="w-4 h-4 text-emerald-700" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-medium text-stone-500 font-mono">
                      {stat.unit}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200/60 text-xs text-stone-500">
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
