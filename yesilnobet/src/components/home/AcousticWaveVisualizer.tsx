import React, { useState, useEffect } from 'react';
import { Volume2, Play, Square, Activity, Radio, Cpu, ShieldAlert } from 'lucide-react';

export const AcousticWaveVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'chainsaw' | 'ambient'>('chainsaw');
  const [audioBars, setAudioBars] = useState<number[]>([]);

  // Simulate audio frequency bar heights
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const barsCount = 36;
        const newBars = Array.from({ length: barsCount }, (_, i) => {
          if (mode === 'chainsaw') {
            // Chainsaws peak intensely around indices 12-24 (1200-2400 Hz range)
            if (i >= 11 && i <= 24) {
              return Math.floor(65 + Math.random() * 35);
            }
            return Math.floor(15 + Math.random() * 30);
          } else {
            // Ambient forest sound: gentle, low-to-mid breeze & birds
            return Math.floor(10 + Math.sin(i * 0.3 + Date.now() * 0.005) * 15 + Math.random() * 10);
          }
        });
        setAudioBars(newBars);
      }, 90);
    } else {
      setAudioBars(Array.from({ length: 36 }, () => 12));
    }
    return () => clearInterval(interval);
  }, [isPlaying, mode]);

  return (
    <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 shadow-xl text-stone-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-base font-semibold text-white">Akustik Spektrogram Analiz Simülasyonu</h3>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Ağaçlara monte edilen güneş enerjili mikrofon nodları, motorlu testere ve dozer seslerini yerinde (Edge AI) sınıflandırır.
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-800 rounded-lg self-start sm:self-center">
          <button
            onClick={() => setMode('chainsaw')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'chainsaw'
                ? 'bg-rose-900/60 text-rose-300 border border-rose-700/50'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Motorlu Testere İmzası
          </button>
          <button
            onClick={() => setMode('ambient')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'ambient'
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Doğal Orman Arka Planı
          </button>
        </div>
      </div>

      {/* Visualizer Spectrum Display */}
      <div className="mt-5 p-4 rounded-xl bg-stone-950 border border-stone-800/80 relative overflow-hidden">
        {/* Frequency guidelines */}
        <div className="flex justify-between text-[10px] font-mono text-stone-500 mb-2">
          <span>100 Hz (Düşük)</span>
          <span className="text-amber-400/80">Testere Kritik Bölgesi [1200 - 2400 Hz]</span>
          <span>8000 Hz (Yüksek)</span>
        </div>

        {/* Dynamic Spectrum Bars */}
        <div className="h-28 flex items-end gap-1 sm:gap-1.5 justify-between px-1">
          {audioBars.map((height, idx) => {
            const isCriticalZone = idx >= 11 && idx <= 24;
            const barBg = mode === 'chainsaw' && isCriticalZone
              ? 'bg-gradient-to-t from-rose-600 to-amber-400'
              : 'bg-emerald-600/80';

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col justify-end items-center h-full"
              >
                <div
                  className={`w-full rounded-t transition-all duration-75 ${barBg}`}
                  style={{ height: `${height}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* AI Confidence Overlay */}
        <div className="mt-3 pt-3 border-t border-stone-800/60 flex flex-wrap items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-stone-400">Edge ML Model:</span>
            <span className="text-emerald-300">PyTorch-Audio-ResNet18</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-400">Algılanan Güven:</span>
            <span className={`font-semibold tabular-nums ${mode === 'chainsaw' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {mode === 'chainsaw' ? (isPlaying ? '%96.4 Kritik Alarm' : '%96.4 (Duraklatıldı)') : '%2.1 Güvenli'}
            </span>
          </div>
        </div>
      </div>

      {/* Control row */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              isPlaying
                ? 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-950'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Simülasyonu Durdur</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Canlı Akustik Analizi Başlat</span>
              </>
            )}
          </button>
          
          <div className="text-xs text-stone-400 hidden sm:block">
            {mode === 'chainsaw' ? (
              <span className="text-rose-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Testere frekans harmonikleri tespit edildi (94.2 dB)
              </span>
            ) : (
              <span className="text-emerald-400">
                Doğal biyoçeşitlilik sesleri (Kuş, rüzgar, su akıntısı)
              </span>
            )}
          </div>
        </div>

        {/* Python backend notice */}
        <div className="text-[11px] font-mono text-stone-500 text-right">
          {/* TODO: Fetch data from Python ML API endpoint (e.g. POST /api/v1/predict/acoustic-stream) */}
          <span>LoRaWAN Düğümü: NODE-KYC-042</span>
        </div>
      </div>
    </div>
  );
};
