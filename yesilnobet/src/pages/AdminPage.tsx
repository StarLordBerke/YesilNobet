import React, { useState } from 'react';
import { StatCards } from '../components/admin/StatCards';
import { HabitatLossChart } from '../components/admin/HabitatLossChart';
import { AlertsTable } from '../components/admin/AlertsTable';
import { InspectAlertModal } from '../components/admin/InspectAlertModal';
import { INITIAL_ALERTS, MONTHLY_METRICS, INITIAL_CITIZEN_REPORTS } from '../data/mockData';
import { SensorAlert } from '../types/forest';
import { Shield, Download, RefreshCw, Radio, CheckCircle, BellRing, Route } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  // TODO: Fetch dashboard real-time data from Python ML / OGM API endpoint (GET /api/v1/ogm/dashboard-summary)
  const [alerts, setAlerts] = useState<SensorAlert[]>(INITIAL_ALERTS);
  const [inspectingAlert, setInspectingAlert] = useState<SensorAlert | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemAlertMessage, setSystemAlertMessage] = useState<string | null>(null);

  const activeAlertsCount = alerts.filter(
    (a) => a.status === 'critical' || a.status === 'in_review'
  ).length;
  const resolvedCount = alerts.filter((a) => a.status === 'resolved').length;
  const totalLossHectares = alerts.reduce(
    (acc, curr) => acc + (curr.canopyLossHectares || 0),
    0
  );

  const handleUpdateStatus = (alertId: string, newStatus: SensorAlert['status']) => {
    // TODO: Send status change to Python backend (PATCH /api/v1/alerts/{alertId})
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
    );
  };

  const handleDispatchFromModal = (alertId: string) => {
    handleUpdateStatus(alertId, 'dispatched');
    setSystemAlertMessage(`${alertId} nolu olaya OGM Devriye Timi başarıyla sevk edildi.`);
    setTimeout(() => setSystemAlertMessage(null), 4000);
  };

  const handleManualSync = () => {
    setIsRefreshing(true);
    // Simulate real-time sync with satellite pass and sensor nodes
    setTimeout(() => {
      setIsRefreshing(false);
      setSystemAlertMessage('Copernicus Sentinel-2 & LoRaWAN düğümleri başarıyla senkronize edildi.');
      setTimeout(() => setSystemAlertMessage(null), 3000);
    }, 800);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Bölge,Tür,Yapay Zeka Skoru,Durum,Tarih']
        .concat(
          alerts.map(
            (a) =>
              `${a.id},${a.region},${a.type},%${(a.confidenceScore * 100).toFixed(0)},${a.status},${a.timestamp}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `YesilNobet_OGM_Alarmlar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 bg-stone-100/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header / Breadcrumb & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Orman Genel Müdürlüğü (OGM) & STK Koordinasyon Masası</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Erken Uyarı & Müdahale Komuta Paneli
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleManualSync}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 shadow-xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Veri Alınıyor...' : 'Sensörleri Senkronize Et'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV Rapor İndir</span>
            </button>

            <Link
              to="/harita"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Canlı Harita Masası</span>
            </Link>
          </div>
        </div>

        {/* System Alert Notification */}
        {systemAlertMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between shadow-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{systemAlertMessage}</span>
            </div>
            <button
              onClick={() => setSystemAlertMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
            >
              Kapat
            </button>
          </div>
        )}

        {/* 1. Üstte Özet İstatistik Kartları */}
        <StatCards
          activeAlertsCount={activeAlertsCount}
          resolvedCount={resolvedCount}
          totalLossHectares={totalLossHectares}
          saplingsCount={277000}
        />

        {/* 2. Ortada Bar / Çizgi Grafiği (Aylara göre habitat kaybı ve alarmlar) */}
        <HabitatLossChart data={MONTHLY_METRICS} />

        {/* 3. Altta 'Son Gelen Alarmlar' Tablosu */}
        <AlertsTable
          alerts={alerts}
          onUpdateStatus={handleUpdateStatus}
          onInspectAlert={(alert) => setInspectingAlert(alert)}
        />

        {/* Quick Corridor Reconnection Spotlight */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <Route className="w-4 h-4" />
              <span>Ekolojik Koridor Onarım Öncelikleri</span>
            </div>
            <p className="text-xs text-stone-600">
              Kazdağları-Madra Dağı (14.2 km) ve Küre Dağları (21.5 km) koridorlarında 225.000 fidanlık dikim seferberliği için OGM fidanlık tahsisi onaylandı.
            </p>
          </div>
          <Link
            to="/harita"
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors"
          >
            Fidan Dikim Rotalarını Görüntüle
          </Link>
        </div>
      </div>

      {/* Inspect Alert Modal with Spectrogram */}
      <InspectAlertModal
        alert={inspectingAlert}
        onClose={() => setInspectingAlert(null)}
        onDispatch={handleDispatchFromModal}
      />
    </div>
  );
};
