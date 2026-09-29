import React, { useState } from 'react';
import { MonthlyTrendData } from '../../types/forest';
import { BarChart3, TrendingUp, HelpCircle, Activity } from 'lucide-react';

interface HabitatLossChartProps {
  data: MonthlyTrendData[];
}

export const HabitatLossChart: React.FC<HabitatLossChartProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<'alerts' | 'loss' | 'prevented'>('alerts');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Maximum scale determination
  const maxValues = {
    alerts: Math.max(...data.map((d) => d.acousticAlerts), 60),
    loss: Math.max(...data.map((d) => d.satelliteLossHa), 30),
    prevented: Math.max(...data.map((d) => d.preventedLoggingCases), 50),
  };

  const currentMax = maxValues[activeMetric];

  const getMetricLabel = () => {
    switch (activeMetric) {
      case 'alerts':
        return 'Akustik Testere Alarmları';
      case 'loss':
        return 'Uydu Kanopi Kaybı (Ha)';
      case 'prevented':
        return 'Önlenen Kesim Vakaları';
    }
  };

  const getMetricUnit = () => {
    switch (activeMetric) {
      case 'alerts':
        return 'adet';
      case 'loss':
        return 'ha';
      case 'prevented':
        return 'vaka';
    }
  };

  const getBarColor = (index: number) => {
    if (activeMetric === 'alerts') {
      return index === hoveredIndex ? 'fill-rose-500' : 'fill-rose-600/85';
    }
    if (activeMetric === 'loss') {
      return index === hoveredIndex ? 'fill-amber-500' : 'fill-amber-600/85';
    }
    return index === hoveredIndex ? 'fill-emerald-500' : 'fill-emerald-600/85';
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
      {/* Chart Header & Metric Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-700 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
              Aylık Trend & Müdahale Analitiği
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">
            Son 6 ayda sensör uyarıları, uydu kanopi dokusu ve korunan orman dengesi.
          </p>
        </div>

        {/* Metric Switcher - responsive grid on small screens */}
        <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveMetric('alerts')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
              activeMetric === 'alerts'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Testere
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('loss')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
              activeMetric === 'loss'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Örtü Kaybı
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('prevented')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
              activeMetric === 'prevented'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Önlenen
          </button>
        </div>
      </div>

      {/* SVG Responsive Bar Chart Container */}
      <div className="relative pt-2 pb-1 overflow-x-auto">
        <div className="h-60 sm:h-64 w-full min-w-[280px]">
          {/* viewBox with ample coordinate room for crisp rendering */}
          <svg className="w-full h-full" viewBox="0 0 540 230">
            {/* Grid horizontal lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = 175 - ratio * 140;
              const val = Math.round(currentMax * ratio);
              return (
                <g key={ratio}>
                  <line
                    x1="45"
                    y1={y}
                    x2="525"
                    y2={y}
                    stroke="#f0ece6"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="38"
                    y={y + 4}
                    textAnchor="end"
                    fill="#78716c"
                    style={{ fontSize: '13px', fontWeight: '600', fontFamily: 'monospace' }}
                    className="select-none"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Bars */}
            {data.map((item, index) => {
              // 6 items spaced across 540 width (index 0 to 5)
              const x = 70 + index * 76;
              let rawVal = item.acousticAlerts;
              if (activeMetric === 'loss') rawVal = item.satelliteLossHa;
              if (activeMetric === 'prevented') rawVal = item.preventedLoggingCases;

              const barHeight = Math.max((rawVal / currentMax) * 140, 6);
              const y = 175 - barHeight;

              return (
                <g
                  key={item.month}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer group"
                >
                  {/* Background hover pillar */}
                  <rect
                    x={x - 10}
                    y="25"
                    width="48"
                    height="150"
                    fill="transparent"
                    className="group-hover:fill-stone-100/70 transition-colors"
                  />

                  {/* Actual Data Bar */}
                  <rect
                    x={x}
                    y={y}
                    width="28"
                    height={barHeight}
                    rx="5"
                    className={`transition-all duration-300 ${getBarColor(index)}`}
                  />

                  {/* Value on top of bar (Large, clear, and high contrast) */}
                  <text
                    x={x + 14}
                    y={y - 8}
                    textAnchor="middle"
                    fill={hoveredIndex === index ? '#0c0a09' : '#292524'}
                    style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'monospace' }}
                    className="select-none"
                  >
                    {rawVal}
                  </text>

                  {/* X Axis Month Label (Clear, high legibility) */}
                  <text
                    x={x + 14}
                    y="200"
                    textAnchor="middle"
                    fill="#44403c"
                    style={{ fontSize: '13px', fontWeight: '600' }}
                    className="select-none"
                  >
                    {item.month}
                  </text>
                </g>
              );
            })}

            {/* Bottom baseline line */}
            <line x1="45" y1="175" x2="525" y2="175" stroke="#a8a29e" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Chart Footer with Clear Legend and Source Info (Readable & Wrapped on Mobile) */}
      <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-600 gap-2">
        <div className="flex flex-wrap items-center gap-1.5 font-medium">
          <span className="font-bold text-stone-900">{getMetricLabel()}</span>
          <span className="text-stone-400">({getMetricUnit()})</span>
          <span className="text-stone-300">·</span>
          <span className="text-stone-500">Sentinel-2 & LoRaWAN Verisi</span>
        </div>
        <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
          Senkron: Canlı Telemetri
        </div>
      </div>
    </div>
  );
};
