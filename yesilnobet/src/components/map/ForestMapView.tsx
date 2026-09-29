import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SensorAlert, HabitatCorridor } from '../../types/forest';
import {
  Radio,
  Satellite,
  Volume2,
  ShieldAlert,
  Sparkles,
  Navigation,
  X,
  Clock,
  MapPin,
  CheckCircle,
  Layers,
  ChevronDown
} from 'lucide-react';

interface ForestMapViewProps {
  alerts: SensorAlert[];
  corridors: HabitatCorridor[];
  selectedAlertId: string | null;
  onSelectAlert: (id: string | null) => void;
  showAcoustic: boolean;
  showSatellite: boolean;
  showCorridors: boolean;
  activeSeverity: string;
}

export const ForestMapView: React.FC<ForestMapViewProps> = ({
  alerts,
  corridors,
  selectedAlertId,
  onSelectAlert,
  showAcoustic,
  showSatellite,
  showCorridors,
  activeSeverity,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const corridorsLayerRef = useRef<L.LayerGroup | null>(null);
  const [mapTileStyle, setMapTileStyle] = useState<'terrain' | 'satellite'>('satellite');
  const [activeDispatchSuccess, setActiveDispatchSuccess] = useState<string | null>(null);
  const [legendOpen, setLegendOpen] = useState<boolean>(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center around Aegean / Mediterranean forest corridor in Turkey
      const map = L.map(mapContainerRef.current, {
        center: [38.4, 28.5],
        zoom: 7,
        zoomControl: false,
      });

      // Add Zoom Control at bottom right to prevent collision with top bars
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Layer groups for markers and polylines
      markersLayerRef.current = L.layerGroup().addTo(map);
      corridorsLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Base Tile Layer (Satellite vs Terrain)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapTileStyle === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sentinel-2 / Landsat / Maxar',
        maxZoom: 18,
      }).addTo(map);
    } else {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Topoğrafik Dağ & Orman Yükselti Haritası',
        maxZoom: 18,
      }).addTo(map);
    }
  }, [mapTileStyle]);

  // Render Markers and Corridors
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !corridorsLayerRef.current) return;

    const markersLayer = markersLayerRef.current;
    const corridorsLayer = corridorsLayerRef.current;

    markersLayer.clearLayers();
    corridorsLayer.clearLayers();

    // 1. Add Alert Markers
    alerts.forEach((alert) => {
      const isFire = alert.type === 'fire_risk';
      const isAcoustic = alert.type === 'acoustic_chainsaw';
      const isLandOrMachinery = alert.type === 'heavy_machinery';
      const isSatellite = alert.type === 'satellite_canopy_loss';

      if ((isAcoustic || isLandOrMachinery) && !showAcoustic) return;
      if ((isSatellite || isFire) && !showSatellite) return;
      if (activeSeverity === 'critical' && alert.status !== 'critical') return;

      const isSelected = selectedAlertId === alert.id;

      // Pin colors & icons by alert category
      let pinColor = 'bg-rose-600 border-rose-800';
      let pulseColor = 'bg-rose-500';
      let iconSymbol = '🪚';

      if (isFire) {
        pinColor = 'bg-orange-600 border-orange-900';
        pulseColor = 'bg-orange-500';
        iconSymbol = '🔥';
      } else if (isLandOrMachinery) {
        pinColor = 'bg-amber-600 border-amber-900';
        pulseColor = 'bg-amber-500';
        iconSymbol = '🚜';
      } else if (isSatellite) {
        pinColor = 'bg-amber-500 border-amber-700';
        pulseColor = 'bg-amber-400';
        iconSymbol = '🛰️';
      }

      const customIcon = L.divIcon({
        className: 'custom-forest-marker',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <span class="absolute w-8 h-8 rounded-full ${pulseColor} opacity-40 animate-ping"></span>
            <div class="relative w-7 h-7 rounded-full ${pinColor} border-2 text-white flex items-center justify-center text-xs font-bold shadow-lg transition-transform ${
              isSelected ? 'scale-125 ring-4 ring-white' : 'hover:scale-110'
            }">
              <span>${iconSymbol}</span>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-900/90 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              ${alert.region}
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([alert.lat, alert.lng], { icon: customIcon });
      marker.on('click', () => {
        onSelectAlert(alert.id);
      });

      marker.addTo(markersLayer);
    });

    // 2. Add Habitat Corridors Polylines
    if (showCorridors) {
      corridors.forEach((corridor) => {
        if (!corridor.coordinates || corridor.coordinates.length < 2) return;

        const corridorLine = L.polyline(corridor.coordinates, {
          color: '#10b981',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8',
        });

        corridorLine.bindTooltip(
          `<strong>${corridor.name}</strong><br/>Kopukluk: ${corridor.gapDistanceKm} km · ${corridor.recommendedSaplings.toLocaleString()} fidan hedefi`,
          { className: 'forest-tooltip', sticky: true }
        );

        corridorLine.addTo(corridorsLayer);

        // Milestone endpoints
        const startPoint = corridor.coordinates[0];
        const endPoint = corridor.coordinates[corridor.coordinates.length - 1];

        const corridorMilestoneIcon = L.divIcon({
          className: 'corridor-marker',
          html: `<div class="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        L.marker(startPoint, { icon: corridorMilestoneIcon }).addTo(corridorsLayer);
        L.marker(endPoint, { icon: corridorMilestoneIcon }).addTo(corridorsLayer);
      });
    }
  }, [alerts, corridors, selectedAlertId, showAcoustic, showSatellite, showCorridors, activeSeverity, onSelectAlert]);

  // Selected Alert Object
  const selectedAlert = alerts.find((a) => a.id === selectedAlertId);

  const handleDispatchPatrol = (alertId: string) => {
    setActiveDispatchSuccess(alertId);
    setTimeout(() => {
      setActiveDispatchSuccess(null);
    }, 4000);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] bg-stone-900 overflow-hidden flex flex-col">
      {/* Map Controls: Tile Switcher & Collapsible Legend (Top Right, completely responsive) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-col items-end gap-2 max-w-[calc(100%-24px)]">
        {/* Layer style toggle */}
        <div className="flex items-center gap-1 p-1 bg-stone-900/90 backdrop-blur-md border border-stone-700 rounded-xl shadow-lg">
          <button
            type="button"
            onClick={() => setMapTileStyle('terrain')}
            className={`px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              mapTileStyle === 'terrain'
                ? 'bg-stone-800 text-emerald-400 font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Topoğrafik
          </button>
          <button
            type="button"
            onClick={() => setMapTileStyle('satellite')}
            className={`px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              mapTileStyle === 'satellite'
                ? 'bg-stone-800 text-emerald-400 font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Sentinel Uydu
          </button>

          {/* Toggle Legend Button on Mobile/Tablet */}
          <button
            type="button"
            onClick={() => setLegendOpen(!legendOpen)}
            className={`sm:hidden p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] ${
              legendOpen
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-stone-800 text-stone-300 border-stone-700'
            }`}
            title="Harita Lejantı"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lejant</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${legendOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Legend: Hidden by default on mobile/small-tablet unless toggled, Always visible on sm+ (screens >= 640px) */}
        <div
          className={`${
            legendOpen ? 'block' : 'hidden'
          } sm:block bg-stone-900/95 backdrop-blur-md border border-stone-700/80 rounded-xl p-2.5 sm:p-3 text-[11px] sm:text-xs text-stone-200 shadow-xl space-y-1.5 w-64 sm:w-72 animate-fade-in`}
        >
          <div className="flex items-center justify-between border-b border-stone-800 pb-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
              Harita Lejantı & Tehditler
            </span>
            <button
              type="button"
              onClick={() => setLegendOpen(false)}
              className="sm:hidden text-stone-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block shadow-xs shrink-0" />
            <span className="truncate">Kırmızı: Akustik Testere Tespiti</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block shadow-xs shrink-0" />
            <span className="truncate">Turuncu: Termal Yangın Sıcak Noktası</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block shadow-xs shrink-0" />
            <span className="truncate">Kahve/Dozer: Orman Tahribatı & İş Makinesi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-xs shrink-0" />
            <span className="truncate">Sarı: Sentinel-2 Kanopi & NDVI Kaybı</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5 border-t border-stone-800">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-500 inline-block shrink-0" />
            <span className="truncate">Yeşil Kesikli: Kopuk Habitat Koridorları</span>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-1 z-10" />

      {/* Selected Alert Details Floating Drawer (Responsive positioning) */}
      {selectedAlert && (
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:w-96 z-20 bg-stone-900/95 backdrop-blur-lg border border-stone-700 rounded-2xl shadow-2xl p-4 sm:p-5 text-stone-100 transition-all max-h-[80vh] overflow-y-auto">
          <div className="flex items-start justify-between pb-3 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                    selectedAlert.status === 'critical'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {selectedAlert.status === 'critical' ? 'Kritik Tehdit' : 'İncelemede'}
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  {selectedAlert.id}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1.5">
                {selectedAlert.region} · {selectedAlert.subLocation}
              </h3>
            </div>
            <button
              onClick={() => onSelectAlert(null)}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-300 mt-3 leading-relaxed">
            {selectedAlert.description}
          </p>

          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Güven Skoru</span>
              <span className="text-emerald-400 font-bold font-mono">
                %{(selectedAlert.confidenceScore * 100).toFixed(0)} Doğruluk
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Algılama Kaynağı</span>
              <span className="text-stone-200 font-mono text-[11px] truncate block">
                {selectedAlert.sensorNodeId || 'IoT Gateway'}
              </span>
            </div>
            {selectedAlert.decibelLevel && (
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Ses Şiddeti</span>
                <span className="text-rose-400 font-bold font-mono">{selectedAlert.decibelLevel} dB</span>
              </div>
            )}
            {selectedAlert.canopyLossHectares && (
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Etkilenen Alan</span>
                <span className="text-amber-400 font-bold font-mono">
                  {selectedAlert.canopyLossHectares} hektar
                </span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-3.5 flex items-center gap-2">
            <button
              onClick={() => handleDispatchPatrol(selectedAlert.id)}
              disabled={activeDispatchSuccess === selectedAlert.id}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                activeDispatchSuccess === selectedAlert.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {activeDispatchSuccess === selectedAlert.id ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                  <span>Devriye Sevk Edildi!</span>
                </>
              ) : (
                <>
                  <Navigation className="w-3.5 h-3.5" />
                  <span>OGM Devriye Timini Sevk Et</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
