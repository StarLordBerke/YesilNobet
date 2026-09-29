import React from 'react';
import { AlertOctagon, CheckCircle2, ShieldCheck, TreePine, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardsProps {
  activeAlertsCount: number;
  resolvedCount: number;
  totalLossHectares: number;
  saplingsCount: number;
}

export const StatCards: React.FC<StatCardsProps> = ({
  activeAlertsCount,
  resolvedCount,
  totalLossHectares,
  saplingsCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 1. Aktif Alarmlar */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Aktif Kritik Alarmlar</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            {activeAlertsCount}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-rose-600 font-medium flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>2 acil intikal bekliyor</span>
          </span>
          <span className="text-stone-400 font-mono">Son 12 saat</span>
        </div>
      </div>

      {/* 2. Çözülen İhbarlar & Müdahaleler */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Çözülen İhbarlar (2026)</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            {resolvedCount}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-emerald-700 font-medium flex items-center gap-0.5">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>%88 ilk 30 dk müdahale</span>
          </span>
          <span className="text-stone-400 font-mono">OGM Kaydı</span>
        </div>
      </div>

      {/* 3. Kurtarılan / Önlenen Ağaç Hacmi */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Korunan Kanopi Alanı</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            184.2 <span className="text-sm font-medium text-stone-500">ha</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-600">Erken sinyal ile kurtarıldı</span>
          <span className="text-stone-400 font-mono">Sentinel-2</span>
        </div>
      </div>

      {/* 4. Kopuk Koridor Fidan Sevk Hedefi */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Fidan Dikim Seferi</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TreePine className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
            {saplingsCount.toLocaleString('tr-TR')}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-emerald-700 font-medium">3 aktif koridor rotası</span>
          <span className="text-stone-400 font-mono">STK & OGM</span>
        </div>
      </div>
    </div>
  );
};
