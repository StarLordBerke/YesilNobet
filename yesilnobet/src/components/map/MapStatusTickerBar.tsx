import React, { useState } from 'react';
import { 
  Activity, 
  Radio, 
  Flame, 
  Tractor, 
  Trees, 
  AlertTriangle, 
  ChevronUp, 
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { SensorAlert, HabitatCorridor } from '../../types/forest';

interface MapStatusTickerBarProps {
  alerts: SensorAlert[];
  corridors: HabitatCorridor[];
  selectedAlertId: string | null;
  onSelectAlert: (id: string) => void;
  onOpenCorridorModal: () => void;
}

export const MapStatusTickerBar: React.FC<MapStatusTickerBarProps> = ({
  alerts,
  corridors: _corridors,
  selectedAlertId,
  onSelectAlert,
  onOpenCorridorModal,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const criticalCount = alerts.filter((a) => a.status === 'critical').length;
  const fireCount = alerts.filter((a) => a.type === 'fire_risk').length;
  const machineryCount = alerts.filter((a) => a.type === 'heavy_machinery').length;

  return (
    <div className="bg-stone-900 border-t border-stone-800 text-stone-200 select-none z-20 transition-all flex flex-col shadow-2xl shrink-0">
      {/* Top Header / Toggle Bar */}
      <div className="px-3 sm:px-4 py-2 bg-stone-950/95 border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1.5 whitespace-nowrap">
              <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Canlı Telemetri</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-stone-400 truncate">
            <span className="text-stone-600">|</span>
            <span className="truncate">NASA VIIRS · Sentinel-2 · LoRaWAN Sensör Ağı</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Stats Badges */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px]">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/70 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" /> {criticalCount} <span className="hidden sm:inline">Kritik</span>
            </span>
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-orange-950/80 text-orange-300 border border-orange-800/70 font-medium flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" /> {fireCount} <span className="hidden sm:inline">Yangın</span>
            </span>
            <span className="hidden sm:flex px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/70 font-medium items-center gap-1">
              <Tractor className="w-3 h-3 text-amber-400" /> {machineryCount} Tahribat
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 sm:px-2 sm:py-1 rounded-lg text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-700 transition-colors flex items-center gap-1 text-xs cursor-pointer"
            title={isExpanded ? 'Paneli Küçült' : 'Paneli Genişlet'}
          >
            <span className="text-[11px] font-medium">
              {isExpanded ? 'Gizle' : 'Detay'}
            </span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content Panel */}
      {isExpanded && (
        <div className="p-3 sm:p-4 bg-stone-900 border-t border-stone-800/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto">
          {/* Active Sensor Nodes Summary */}
          <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-1.5">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Radio className="w-3.5 h-3.5" /> Akustik & Uydu İletişimi
                </span>
                <span className="text-emerald-400 text-[10px] font-mono">%99.8 Çevrimiçi</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                48 aktif biyo-akustik LoRaWAN düğümü ve NASA/Copernicus senkronizasyonu devrede.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
              <span className="text-stone-400">Son Veri Paketi:</span>
              <span className="text-emerald-400 font-mono font-medium">12 sn önce · Normal</span>
            </div>
          </div>

          {/* Quick Corridor Restoration Info */}
          <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-1.5">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Trees className="w-3.5 h-3.5" /> Kopuk Ekolojik Koridorlar
                </span>
                <span className="text-amber-400 text-[10px] font-mono">3 Bölge</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Muğla, Bolu ve Çanakkale'de parçalanan yaban hayatı koridorları için rota hesaplandı.
              </p>
            </div>
            <button
              onClick={onOpenCorridorModal}
              className="mt-2 w-full py-1.5 px-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-600/40 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Fidan Rota Simülatörünü Aç</span>
            </button>
          </div>

          {/* Recent Live Alert Cards */}
          <div className="md:col-span-2 lg:col-span-2 bg-stone-950/70 p-3 rounded-xl border border-stone-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-2">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                Öne Çıkan Aktif Olaylar (Haritada Odaklan)
              </span>
              <span className="text-[10px] text-stone-500 hidden sm:inline">Tıklayarak haritayı konuma uçurun</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {alerts.slice(0, 2).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => onSelectAlert(alert.id)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedAlertId === alert.id
                      ? 'bg-emerald-950/60 border-emerald-500'
                      : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                    <span className="truncate">{alert.region}</span>
                    <span className="text-[10px] font-mono text-stone-400">{alert.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-stone-400 truncate">{alert.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-[10px] font-mono">
                    <span className={alert.status === 'critical' ? 'text-rose-400 font-bold' : 'text-amber-400'}>
                      %{Math.round(alert.confidenceScore * 100)} Güven
                    </span>
                    <span className="text-stone-600">·</span>
                    <span className="text-stone-400">
                      {alert.decibelLevel ? `${alert.decibelLevel} dB` : 'Uydu Analizi'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
