import React from 'react';
import { SensorAlert } from '../../types/forest';
import { X, Radio, Satellite, MapPin, Cpu, Clock, ShieldAlert, CheckCircle2, Volume2 } from 'lucide-react';

interface InspectAlertModalProps {
  alert: SensorAlert | null;
  onClose: () => void;
  onDispatch: (id: string) => void;
}

export const InspectAlertModal: React.FC<InspectAlertModalProps> = ({ alert, onClose, onDispatch }) => {
  if (!alert) return null;

  const isAcoustic = alert.type === 'acoustic_chainsaw' || alert.type === 'heavy_machinery';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isAcoustic ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
            }`}>
              {isAcoustic ? <Radio className="w-4 h-4" /> : <Satellite className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-[11px] font-mono text-stone-400">
                {alert.id} · {alert.region}
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                {alert.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-stone-300 leading-relaxed">
            {alert.description}
          </p>

          {/* ML Telemetry Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono">
            <div>
              <span className="text-stone-500 text-[10px] block">Yapay Zeka Güven Skoru</span>
              <span className="text-emerald-400 font-bold text-sm">
                %{(alert.confidenceScore * 100).toFixed(0)} Doğrulandı
              </span>
            </div>

            <div>
              <span className="text-stone-500 text-[10px] block">
                {isAcoustic ? 'Desibel Şiddeti' : 'Tahribat Hacmi'}
              </span>
              <span className="text-amber-400 font-bold text-sm">
                {alert.decibelLevel ? `${alert.decibelLevel} dB (Kritik)` : `${alert.canopyLossHectares} ha`}
              </span>
            </div>

            <div>
              <span className="text-stone-500 text-[10px] block">Sensör Düğümü ID</span>
              <span className="text-stone-200 font-semibold">{alert.sensorNodeId || 'N/A'}</span>
            </div>

            <div>
              <span className="text-stone-500 text-[10px] block">GPS Konumu</span>
              <span className="text-stone-200">
                {alert.lat.toFixed(4)}°K, {alert.lng.toFixed(4)}°D
              </span>
            </div>
          </div>

          {/* Visual Spectrogram Mock */}
          {isAcoustic && (
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-2">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <Volume2 className="w-3.5 h-3.5" />
                  Akustik Spektrogram Harmonikleri (1200 - 2400 Hz)
                </span>
                <span className="text-emerald-400">Model: ResNet18-Audio</span>
              </div>
              <div className="h-16 flex items-end gap-1 px-1">
                {Array.from({ length: 28 }).map((_, i) => {
                  const isSpike = i >= 8 && i <= 18;
                  const height = isSpike ? 45 + ((i * 7) % 50) : 10 + ((i * 3) % 20);
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full">
                      <div
                        className={`w-full rounded-t ${
                          isSpike ? 'bg-rose-500' : 'bg-stone-700'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            >
              Kapat
            </button>
            {alert.status === 'critical' && (
              <button
                onClick={() => {
                  onDispatch(alert.id);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>OGM Devriye Sevk Et</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
