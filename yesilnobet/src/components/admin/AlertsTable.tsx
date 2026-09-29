import React, { useState } from 'react';
import { SensorAlert } from '../../types/forest';
import {
  ShieldAlert,
  CheckCircle,
  Eye,
  Radio,
  Satellite,
  Clock,
  MapPin,
  ExternalLink,
  Check,
  Send,
  X,
  Volume2
} from 'lucide-react';

interface AlertsTableProps {
  alerts: SensorAlert[];
  onUpdateStatus: (alertId: string, newStatus: SensorAlert['status']) => void;
  onInspectAlert: (alert: SensorAlert) => void;
}

export const AlertsTable: React.FC<AlertsTableProps> = ({
  alerts,
  onUpdateStatus,
  onInspectAlert,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filtered = alerts.filter((alert) => {
    if (filterType !== 'all' && alert.type !== filterType) return false;
    if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
    return true;
  });

  const handleAction = (alertId: string, newStatus: SensorAlert['status'], message: string) => {
    // TODO: Send status transition to Python OGM dispatch API (PATCH /api/v1/alerts/{alertId}/status)
    onUpdateStatus(alertId, newStatus);
    setActionNotice(message);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const getStatusBadge = (status: SensorAlert['status']) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-xs text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span>Kritik Alarm</span>
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-xs text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>İncelemede</span>
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-xs text-sky-700">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Devriye İntikalde</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-xs text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Müdahale Tamamlandı</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-6 border-b border-stone-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-stone-900">
              Son Gelen Sensör ve Uydu Alarmları
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Yapay zeka güven eşiği %85 üzerindeki orman içi olay akışı.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:border-emerald-600"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="critical">Kritik Bekleyenler</option>
            <option value="in_review">İncelemedekiler</option>
            <option value="dispatched">Devriye Gönderilenler</option>
            <option value="resolved">Sonuçlananlar</option>
          </select>

          {/* Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:border-emerald-600"
          >
            <option value="all">Tüm Kaynaklar</option>
            <option value="acoustic_chainsaw">Akustik (Testere Sesi)</option>
            <option value="satellite_canopy_loss">Uydu (Kanopi Kaybı)</option>
            <option value="heavy_machinery">Ağır İş Makinesi</option>
          </select>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)}>
            <X className="w-3.5 h-3.5 text-emerald-700" />
          </button>
        </div>
      )}

      {/* High-density Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50/70 border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
              <th className="py-3 px-4">Tarih & Zaman</th>
              <th className="py-3 px-4">Bölge & Konum</th>
              <th className="py-3 px-4">Alarm Türü & Kaynak</th>
              <th className="py-3 px-4 text-right">YZ Güven Skoru</th>
              <th className="py-3 px-4">Müdahale Durumu</th>
              <th className="py-3 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-stone-400">
                  Seçilen filtrelere uygun alarm bulunamadı.
                </td>
              </tr>
            ) : (
              filtered.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-stone-50/60 transition-colors group"
                >
                  {/* Tarih */}
                  <td className="py-3.5 px-4 font-mono text-stone-500 whitespace-nowrap tabular-nums">
                    <div className="text-stone-900 font-medium">{alert.timestamp}</div>
                    <div className="text-[11px] text-stone-400">{alert.id}</div>
                  </td>

                  {/* Bölge */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-stone-900">{alert.region}</div>
                    <div className="text-stone-500 text-[11px] truncate">
                      {alert.subLocation}
                    </div>
                  </td>

                  {/* Tür */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-stone-800">
                      {alert.type === 'acoustic_chainsaw' ? (
                        <Radio className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      ) : (
                        <Satellite className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                      <span>
                        {alert.type === 'acoustic_chainsaw'
                          ? 'Akustik Testere'
                          : alert.type === 'heavy_machinery'
                          ? 'Ağır İş Makinesi'
                          : 'Uydu NDVI Kaybı'}
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                      {alert.sensorNodeId} ·{' '}
                      {alert.decibelLevel ? `${alert.decibelLevel} dB` : `${alert.canopyLossHectares} ha`}
                    </div>
                  </td>

                  {/* YZ Güven Skoru */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold tabular-nums">
                    <span
                      className={
                        alert.confidenceScore >= 0.9
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      }
                    >
                      %{(alert.confidenceScore * 100).toFixed(0)}
                    </span>
                  </td>

                  {/* Durum */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(alert.status)}
                    {alert.assignedUnit && (
                      <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                        {alert.assignedUnit}
                      </div>
                    )}
                  </td>

                  {/* İşlemler: Onayla / Devriye Sevk Et */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onInspectAlert(alert)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                        title="Spektrogram & Detay İncele"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {alert.status === 'critical' && (
                        <button
                          onClick={() =>
                            handleAction(
                              alert.id,
                              'dispatched',
                              `${alert.id} nolu olaya OGM Devriye Timi sevk edildi!`
                            )
                          }
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-colors flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Devriye Sevk Et</span>
                        </button>
                      )}

                      {alert.status === 'dispatched' && (
                        <button
                          onClick={() =>
                            handleAction(
                              alert.id,
                              'resolved',
                              `${alert.id} nolu vaka OGM ekiplerince kontrol altına alındı ve çözüldü olarak işaretlendi.`
                            )
                          }
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Müdahaleyi Onayla</span>
                        </button>
                      )}

                      {alert.status === 'resolved' && (
                        <span className="text-xs text-stone-400 font-mono">
                          Kapandı
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
