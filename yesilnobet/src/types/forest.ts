/**
 * YeşilNöbet - Orman Erken Uyarı ve Koruma Platformu
 * Veri Tipleri & Kontratları
 */

export type AlertType = 'acoustic_chainsaw' | 'satellite_canopy_loss' | 'fire_risk' | 'heavy_machinery';

export type AlertStatus = 'critical' | 'in_review' | 'dispatched' | 'resolved';

export interface SensorAlert {
  id: string;
  region: string;
  subLocation: string;
  lat: number;
  lng: number;
  type: AlertType;
  title: string;
  description: string;
  timestamp: string;
  confidenceScore: number; // e.g. 0.94 (94%)
  decibelLevel?: number; // for acoustic (e.g. 98 dB)
  canopyLossHectares?: number; // for satellite (e.g. 2.4 ha)
  ndviDropPercentage?: number; // e.g. 38%
  status: AlertStatus;
  sensorNodeId?: string;
  audioFrequencyHz?: number;
  assignedUnit?: string;
}

export interface HabitatCorridor {
  id: string;
  name: string;
  region: string;
  fragmentationSeverity: 'high' | 'medium' | 'low';
  gapDistanceKm: number;
  recommendedSaplings: number;
  targetSpecies: string[];
  coordinates: [number, number][]; // Polyline points
  status: 'planned' | 'in_planting' | 'connected';
}

export interface CitizenReport {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  locationName: string;
  lat: number;
  lng: number;
  incidentType: 'illegal_logging' | 'unauthorized_road' | 'illegal_building' | 'suspicious_fire';
  description: string;
  photoUrl?: string;
  isVolunteerCandidate: boolean;
  submittedAt: string;
  status: 'pending' | 'verified' | 'dismissed';
}

export interface MonthlyTrendData {
  month: string;
  acousticAlerts: number;
  satelliteLossHa: number;
  preventedLoggingCases: number;
  reforestedSaplings: number;
}
