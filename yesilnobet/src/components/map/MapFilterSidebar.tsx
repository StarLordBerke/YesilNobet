import React, { useState } from 'react';
import { Filter, Search, Calendar, AlertOctagon, Satellite, Route, RefreshCw, Trees, ChevronDown } from 'lucide-react';
import { SensorAlert } from '../../types/forest';

interface MapFilterSidebarProps {
  showAcoustic: boolean;
  setShowAcoustic: (val: boolean) => void;
  showSatellite: boolean;
  setShowSatellite: (val: boolean) => void;
  showCorridors: boolean;
  setShowCorridors: (val: boolean) => void;
  activeSeverity: string;
  setActiveSeverity: (val: string) => void;
  dateRange: string;
  setDateRange: (val: string) => void;
  selectedRegion: string;
  setSelectedRegion: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  alerts: SensorAlert[];
  onSelectAlert: (id: string) => void;
  onOpenCorridorModal: () => void;
}

export const MapFilterSidebar: React.FC<MapFilterSidebarProps> = ({
  showAcoustic,
  setShowAcoustic,
  showSatellite,
  setShowSatellite,
  showCorridors,
  setShowCorridors,
  activeSeverity,
  setActiveSeverity,
  dateRange,
  setDateRange,
  selectedRegion,
  setSelectedRegion,
  searchQuery,
  setSearchQuery,
  alerts,
  onSelectAlert,
  onOpenCorridorModal,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);
  const regions = ['Tümü', 'Muğla', 'Balıkesir / Çanakkale', 'Antalya', 'Bolu', 'Artvin', 'Kastamonu'];

  const filteredAlerts = alerts.filter((alert) => {
    if (activeSeverity === 'critical' && alert.status !== 'critical') return false;
    if (selectedRegion !== 'Tümü' && !alert.region.includes(selectedRegion)) return false;
    if (
      searchQuery &&
      !alert.region.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.subLocation.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <aside className="w-full lg:w-80 bg-stone-900 border-b lg:border-b-0 lg:border-r border-stone-800 text-stone-200 flex flex-col shrink-0 z-20">
      {/* Sidebar Header (Clickable on Mobile/Tablet to expand/collapse) */}
      <div className="p-3.5 sm:p-4 border-b border-stone-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
              Harita Filtreleri & Katmanlar
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-stone-400 tabular-nums">
              {filteredAlerts.length} Alarm
            </span>
            <button
              type="button"
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="lg:hidden p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
            >
              <span>{mobileExpanded ? 'Kapat' : 'Filtreler'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Live Search Input (Always visible) */}
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bölge veya Sensör ID ara..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-950 border border-stone-700/80 rounded-lg text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Collapsible Filter Body on Mobile/Tablet (Always open on lg screens) */}
      <div className={`${mobileExpanded ? 'block' : 'hidden'} lg:block p-4 space-y-5 flex-1 overflow-y-auto max-h-[60vh] lg:max-h-none`}>
        {/* Sadece Kırmızı Alarmlar Switch */}
        <div>
          <label className="text-xs font-semibold text-stone-300 block mb-2">
            Kritiklik Düzeyi
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-950 rounded-lg border border-stone-800">
            <button
              onClick={() => setActiveSeverity('all')}
              className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeSeverity === 'all'
                  ? 'bg-stone-800 text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Tüm Alarmlar
            </button>
            <button
              onClick={() => setActiveSeverity('critical')}
              className={`py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1 ${
                activeSeverity === 'critical'
                  ? 'bg-rose-900/80 text-rose-200 border border-rose-700/80 shadow-xs'
                  : 'text-stone-400 hover:text-rose-300'
              }`}
            >
              <AlertOctagon className="w-3 h-3 text-rose-400" />
              <span>Sadece Kırmızı</span>
            </button>
          </div>
        </div>

        {/* Katman Seçimi (Acoustic vs Satellite vs Corridors) */}
        <div>
          <label className="text-xs font-semibold text-stone-300 block mb-2">
            Veri Katmanları
          </label>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-2 rounded-lg bg-stone-950/60 border border-stone-800/80 cursor-pointer hover:bg-stone-850">
              <span className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span>Akustik Sensörler (Testere)</span>
              </span>
              <input
                type="checkbox"
                checked={showAcoustic}
                onChange={(e) => setShowAcoustic(e.target.checked)}
                className="rounded accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-stone-950/60 border border-stone-800/80 cursor-pointer hover:bg-stone-850">
              <span className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Uydu Kanopi Kaybı (Sentinel-2)</span>
              </span>
              <input
                type="checkbox"
                checked={showSatellite}
                onChange={(e) => setShowSatellite(e.target.checked)}
                className="rounded accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-stone-950/60 border border-stone-800/80 cursor-pointer hover:bg-stone-850">
              <span className="flex items-center gap-2 text-xs">
                <span className="w-4 h-0.5 border-t border-dashed border-emerald-500" />
                <span>Kopuk Habitat Koridorları</span>
              </span>
              <input
                type="checkbox"
                checked={showCorridors}
                onChange={(e) => setShowCorridors(e.target.checked)}
                className="rounded accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Tarih Aralığı */}
        <div>
          <label className="text-xs font-semibold text-stone-300 block mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Tarih Aralığı</span>
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full text-xs p-2.5 bg-stone-950 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="24h">Son 24 Saat (Canlı Akış)</option>
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün (Aylık Kümülatif)</option>
            <option value="season">Bu Sezon (2026)</option>
          </select>
        </div>

        {/* Orman Bölgesi Seçimi */}
        <div>
          <label className="text-xs font-semibold text-stone-300 block mb-2">
            Orman Bölge Masası
          </label>
          <div className="flex flex-wrap gap-1.5">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  selectedRegion === region
                    ? 'bg-emerald-800 text-white font-medium'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Kopuk Koridorlar Fidan Planlama Butonu */}
        <div className="pt-2">
          <button
            onClick={onOpenCorridorModal}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold bg-emerald-950/80 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition-colors shadow-sm"
          >
            <Route className="w-4 h-4 text-emerald-400" />
            <span>Kopuk Koridor Fidan Rota Simülatörü</span>
          </button>
        </div>

        {/* Alarmlar Mini Listesi */}
        <div className="pt-3 border-t border-stone-800">
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Haritadaki Alarmlar
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onSelectAlert(alert.id)}
                className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800/80 hover:border-emerald-500 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white truncate max-w-[170px]">
                    {alert.region}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {alert.timestamp}
                  </span>
                </div>
                <div className="text-[11px] text-stone-400 line-clamp-1">
                  {alert.title}
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px]">
                  <span
                    className={`font-semibold font-mono ${
                      alert.status === 'critical' ? 'text-rose-400' : 'text-amber-400'
                    }`}
                  >
                    %{Math.round(alert.confidenceScore * 100)} Güven
                  </span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400 font-mono">
                    {alert.decibelLevel
                      ? `${alert.decibelLevel} dB`
                      : alert.canopyLossHectares
                      ? `${alert.canopyLossHectares} ha`
                      : alert.type === 'fire_risk'
                      ? 'Termal VIIRS'
                      : 'Uydu Tespiti'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
