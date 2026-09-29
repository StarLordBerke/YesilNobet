import React, { useState } from 'react';
import { ForestMapView } from '../components/map/ForestMapView';
import { MapFilterSidebar } from '../components/map/MapFilterSidebar';
import { MapStatusTickerBar } from '../components/map/MapStatusTickerBar';
import { CorridorPlannerModal } from '../components/map/CorridorPlannerModal';
import { INITIAL_ALERTS, HABITAT_CORRIDORS } from '../data/mockData';
import { SensorAlert } from '../types/forest';

export const MapPage: React.FC = () => {
  // Alerts and Corridors data state
  // TODO: Fetch data from Python ML API endpoint (GET /api/v1/sensors/live-alerts)
  const [alerts, setAlerts] = useState<SensorAlert[]>(INITIAL_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  // Filter States
  const [showAcoustic, setShowAcoustic] = useState<boolean>(true);
  const [showSatellite, setShowSatellite] = useState<boolean>(true);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);
  const [activeSeverity, setActiveSeverity] = useState<string>('all'); // 'all' | 'critical'
  const [dateRange, setDateRange] = useState<string>('24h');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Corridor Modal State
  const [isCorridorModalOpen, setIsCorridorModalOpen] = useState<boolean>(false);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100dvh-64px)] relative bg-stone-950">
      {/* Sol Filtre Paneli */}
      <MapFilterSidebar
        showAcoustic={showAcoustic}
        setShowAcoustic={setShowAcoustic}
        showSatellite={showSatellite}
        setShowSatellite={setShowSatellite}
        showCorridors={showCorridors}
        setShowCorridors={setShowCorridors}
        activeSeverity={activeSeverity}
        setActiveSeverity={setActiveSeverity}
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        alerts={alerts}
        onSelectAlert={(id) => setSelectedAlertId(id)}
        onOpenCorridorModal={() => setIsCorridorModalOpen(true)}
      />

      {/* Ekranı Kaplayan İnteraktif Harita ve Alt Detaylı Telemetri Paneli */}
      <main className="flex-1 flex flex-col relative overflow-hidden min-h-[500px] sm:min-h-[550px] lg:min-h-full">
        {/* Harita */}
        <div className="flex-1 relative w-full min-h-[380px] sm:min-h-[440px]">
          <ForestMapView
            alerts={alerts}
            corridors={HABITAT_CORRIDORS}
            selectedAlertId={selectedAlertId}
            onSelectAlert={(id) => setSelectedAlertId(id)}
            showAcoustic={showAcoustic}
            showSatellite={showSatellite}
            showCorridors={showCorridors}
            activeSeverity={activeSeverity}
          />
        </div>

        {/* Canlı Nöbet Durumu & Sensör Telemetrisi Paneli */}
        <MapStatusTickerBar
          alerts={alerts}
          corridors={HABITAT_CORRIDORS}
          selectedAlertId={selectedAlertId}
          onSelectAlert={(id) => setSelectedAlertId(id)}
          onOpenCorridorModal={() => setIsCorridorModalOpen(true)}
        />
      </main>

      {/* Kopuk Koridor Fidan Rota Modal */}
      <CorridorPlannerModal
        isOpen={isCorridorModalOpen}
        onClose={() => setIsCorridorModalOpen(false)}
      />
    </div>
  );
};
