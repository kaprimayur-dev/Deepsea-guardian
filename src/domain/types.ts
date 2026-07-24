export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type SourceStatus = 'nominal' | 'degraded' | 'offline';
export type AssetStatus = 'patrolling' | 'en-route' | 'recharging' | 'standby';

export interface EnvironmentalSnapshot {
  seaSurfaceTemperature: number; // °C
  baselineSeaSurfaceTemperature?: number; // °C (optional reference baseline)
  dissolvedOxygen: number;       // mg/L
  currentSpeed: number;          // kn (knots)
  currentDirection: number;      // ° (degrees 0-359)
  salinity: number;              // PSU
  depth: number;                 // m
}

export interface IntelligenceSource {
  id: string;
  name: string;
  type: 'buoy' | 'acoustic-sonar' | 'satellite-feed' | 'thermal-sensor';
  status: SourceStatus;
  location: { lat: number; lng: number };
  regionId: string;
  lastTransmission: string;
  telemetry: EnvironmentalSnapshot;
}

export interface ThreatEvent {
  id: string;
  category: 'ghost-net' | 'coral-bleaching' | 'pollution-slick' | 'sanctuary-intrusion';
  title: string;
  severity: Severity;
  confidence: number;            // 0 - 100
  status: 'active' | 'mitigating' | 'resolved';
  location: { lat: number; lng: number };
  regionId: string;
  evidenceSourceIds: string[];  // References to IntelligenceSource IDs
  timestamp: string;
}

export interface AutonomousAsset {
  id: string;
  name: string;
  type: 'auv' | 'surface-drone' | 'sub-surface-drone';
  status: AssetStatus;
  location: { lat: number; lng: number };
  regionId: string;
  battery: number;               // 0 - 100
  assignedMission: string | null;
}

export interface BiodiversityObservation {
  id: string;
  speciesName: string;
  category: 'cetacean' | 'reptile' | 'elasmobranch' | 'coral';
  conservationStatus: 'least-concern' | 'vulnerable' | 'endangered' | 'critically-endangered';
  count: number;
  location: { lat: number; lng: number };
  regionId: string;
  timestamp: string;
}

export interface DerivedIntelligence {
  regionId: string;
  drivers: string[];
  recommendation: string;
}

export interface OceanRegion {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  bounds: [[number, number], [number, number]];
  riskScore: number;             // 0 - 100
  riskLevel: RiskLevel;
}

export interface OceanOverview {
  totalRegions: number;
  activeThreats: number;
  nominalSensors: number;
  activeAssets: number;
}

export interface RegionIntelligence {
  regionId: string;
  regionName: string;
  riskScore: number;
  riskLevel: RiskLevel;
  environmentalState: EnvironmentalSnapshot;
  sources: IntelligenceSource[];
  activeThreats: ThreatEvent[];
  activeAssets: AutonomousAsset[];
  biodiversitySummary: BiodiversityObservation[];
  derivedIntelligence: DerivedIntelligence;
}
