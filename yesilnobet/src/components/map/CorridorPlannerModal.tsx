import React, { useState } from 'react';
import { X, Trees, Route, CheckCircle, ArrowRight, Sparkles, MapPin, Users, HeartHandshake } from 'lucide-react';
import { HABITAT_CORRIDORS } from '../../data/mockData';
import { HabitatCorridor } from '../../types/forest';

interface CorridorPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorridorPlannerModal: React.FC<CorridorPlannerModalProps> = ({ isOpen, onClose }) => {
  const [selectedCorridor, setSelectedCorridor] = useState<HabitatCorridor>(HABITAT_CORRIDORS[0]);
  const [customVolunteers, setCustomVolunteers] = useState<number>(120);
  const [scheduledSuccess, setScheduledSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const estimatedDays = Math.ceil(
    selectedCorridor.recommendedSaplings / (customVolunteers * 45)
  );

  const handlePlanRoute = () => {
    // TODO: Send corridor planting plan to Python GIS routing API (POST /api/v1/corridors/plan-route)
    setScheduledSuccess(true);
    setTimeout(() => {
      setScheduledSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-stone-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/80 text-emerald-200 flex items-center justify-center">
              <Route className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Kopuk Yeşil Koridor Fidan Dikim Rota Planlayıcısı
              </h3>
              <p className="text-xs text-stone-400">
                Parçalanan orman habitatlarını yapay zeka algoritmasıyla birbirine bağlayın.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Corridor Selection */}
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-2">
              Öncelikli Ekolojik Geçiş Koridoru
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {HABITAT_CORRIDORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCorridor(c)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all ${
                    selectedCorridor.id === c.id
                      ? 'bg-emerald-950/90 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  <div className="font-semibold text-stone-100 line-clamp-1">{c.name}</div>
                  <div className="text-[10px] text-stone-400 mt-1">
                    {c.gapDistanceKm} km mesafe · {c.region}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Corridor Metrics */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-stone-500 text-[10px] block">Kopukluk Mesafesi</span>
              <span className="text-stone-100 font-bold text-sm">
                {selectedCorridor.gapDistanceKm} km
              </span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] block">Gerekli Fidan</span>
              <span className="text-emerald-400 font-bold text-sm tabular-nums">
                {selectedCorridor.recommendedSaplings.toLocaleString('tr-TR')} adet
              </span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] block">Parçalanma Risk</span>
              <span className="text-rose-400 font-bold text-sm uppercase">
                {selectedCorridor.fragmentationSeverity === 'high' ? 'Yüksek Kritik' : 'Orta'}
              </span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] block">Tahmini Tamamlanma</span>
              <span className="text-amber-400 font-bold text-sm">
                {estimatedDays} saha günü
              </span>
            </div>
          </div>

          {/* Recommended Species */}
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">
              Bölgeye Uygun Endemik Ağaç Türleri (Toprak Analizi Sonucu)
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedCorridor.targetSpecies.map((species, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs bg-stone-800 border border-stone-700 rounded-md text-emerald-300 font-medium"
                >
                  🌱 {species}
                </span>
              ))}
            </div>
          </div>

          {/* Volunteer Allocation Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tahsis Edilecek STK & Gönüllü Sayısı</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">
                {customVolunteers} Gönüllü / Gün
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={customVolunteers}
              onChange={(e) => setCustomVolunteers(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
              <span>20 Gönüllü</span>
              <span>250 Gönüllü</span>
              <span>500 Gönüllü</span>
            </div>
          </div>

          {/* Success Message or Action */}
          {scheduledSuccess ? (
            <div className="p-3.5 bg-emerald-950/80 border border-emerald-700 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Fidan dikim rotası başarıyla oluşturuldu! Koordinatlar OGM fidanlık birimine ve gönüllü ekiplerine sevk edildi.
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                Vazgeç
              </button>
              <button
                onClick={handlePlanRoute}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md active:translate-y-0.5 transition-all"
              >
                <Trees className="w-3.5 h-3.5" />
                <span>Rotayı Onayla & Sevk Et</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
