import type { 
  OceanOverview, 
  OceanRegion, 
  RegionIntelligence, 
  ThreatEvent, 
  IntelligenceSource, 
  AutonomousAsset, 
  BiodiversityObservation,
  Severity
} from './types';

export interface ThreatFilters {
  regionId?: string;
  category?: 'ghost-net' | 'coral-bleaching' | 'pollution-slick' | 'sanctuary-intrusion';
  severity?: Severity;
}

export interface SourceFilters {
  regionId?: string;
  type?: 'buoy' | 'acoustic-sonar' | 'satellite-feed' | 'thermal-sensor';
}

export interface OceanRepository {
  getOverview(): Promise<OceanOverview>;
  getRegions(): Promise<OceanRegion[]>;
  getRegionDetail(id: string): Promise<OceanRegion | null>;
  getRegionIntelligence(regionId: string): Promise<RegionIntelligence | null>;
  getThreats(filters?: ThreatFilters): Promise<ThreatEvent[]>;
  getSources(filters?: SourceFilters): Promise<IntelligenceSource[]>;
  getAssets(regionId?: string): Promise<AutonomousAsset[]>;
  getBiodiversity(regionId?: string): Promise<BiodiversityObservation[]>;
}
