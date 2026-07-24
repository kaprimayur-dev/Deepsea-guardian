import type { OceanRepository, ThreatFilters, SourceFilters } from '../../domain/repository';
import type { 
  OceanOverview, 
  OceanRegion, 
  RegionIntelligence, 
  ThreatEvent, 
  IntelligenceSource, 
  AutonomousAsset, 
  BiodiversityObservation 
} from '../../domain/types';
import { 
  SIMULATED_REGIONS, 
  SIMULATED_SOURCES, 
  SIMULATED_THREATS, 
  SIMULATED_ASSETS, 
  SIMULATED_BIODIVERSITY, 
  SIMULATED_INTELLIGENCE 
} from './simulatedData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class SimulatedOceanRepository implements OceanRepository {
  async getOverview(): Promise<OceanOverview> {
    await delay(250);
    const totalRegions = SIMULATED_REGIONS.length;
    const activeThreats = SIMULATED_THREATS.filter(t => t.status === 'active').length;
    const nominalSensors = SIMULATED_SOURCES.filter(s => s.status === 'nominal').length;
    const activeAssets = SIMULATED_ASSETS.filter(a => a.status === 'patrolling' || a.status === 'en-route').length;

    return {
      totalRegions,
      activeThreats,
      nominalSensors,
      activeAssets
    };
  }

  async getRegions(): Promise<OceanRegion[]> {
    await delay(250);
    return [...SIMULATED_REGIONS];
  }

  async getRegionDetail(id: string): Promise<OceanRegion | null> {
    await delay(250);
    const region = SIMULATED_REGIONS.find(r => r.id === id);
    return region ? { ...region } : null;
  }

  async getRegionIntelligence(regionId: string): Promise<RegionIntelligence | null> {
    await delay(250);
    const region = SIMULATED_REGIONS.find(r => r.id === regionId);
    if (!region) return null;

    const sources = SIMULATED_SOURCES.filter(s => s.regionId === regionId);
    const threats = SIMULATED_THREATS.filter(t => t.regionId === regionId && t.status === 'active');
    const assets = SIMULATED_ASSETS.filter(a => a.regionId === regionId);
    const biodiversity = SIMULATED_BIODIVERSITY.filter(b => b.regionId === regionId);
    const derived = SIMULATED_INTELLIGENCE.find(i => i.regionId === regionId) || {
      regionId,
      drivers: ['Data transmission nominal. Passive telemetry active.'],
      recommendation: 'Maintain surveillance parameters.'
    };

    // Aggregate regional environmental snapshot metrics from first nominal buoy or first source
    const primaryBuoy = sources.find(s => s.type === 'buoy' && s.status === 'nominal') || sources[0];
    const environmentalState = primaryBuoy ? { ...primaryBuoy.telemetry } : {
      seaSurfaceTemperature: 25.0,
      dissolvedOxygen: 6.5,
      currentSpeed: 1.0,
      currentDirection: 0,
      salinity: 34.0,
      depth: 10.0
    };

    return {
      regionId: region.id,
      regionName: region.name,
      riskScore: region.riskScore,
      riskLevel: region.riskLevel,
      environmentalState,
      sources: sources.map(s => ({ ...s })), // Aggregate supporting intelligence sources (CTO Correction 1)
      activeThreats: threats.map(t => ({ ...t })),
      activeAssets: assets.map(a => ({ ...a })),
      biodiversitySummary: biodiversity.map(b => ({ ...b })),
      derivedIntelligence: { ...derived }
    };
  }

  async getThreats(filters?: ThreatFilters): Promise<ThreatEvent[]> {
    await delay(250);
    let threats = [...SIMULATED_THREATS];

    if (filters) {
      if (filters.regionId) {
        threats = threats.filter(t => t.regionId === filters.regionId);
      }
      if (filters.category) {
        threats = threats.filter(t => t.category === filters.category);
      }
      if (filters.severity) {
        threats = threats.filter(t => t.severity === filters.severity);
      }
    }

    return threats;
  }

  async getSources(filters?: SourceFilters): Promise<IntelligenceSource[]> {
    await delay(250);
    let sources = [...SIMULATED_SOURCES];

    if (filters) {
      if (filters.regionId) {
        sources = sources.filter(s => s.regionId === filters.regionId);
      }
      if (filters.type) {
        sources = sources.filter(s => s.type === filters.type);
      }
    }

    return sources;
  }

  async getAssets(regionId?: string): Promise<AutonomousAsset[]> {
    await delay(250);
    let assets = [...SIMULATED_ASSETS];
    if (regionId) {
      assets = assets.filter(a => a.regionId === regionId);
    }
    return assets;
  }

  async getBiodiversity(regionId?: string): Promise<BiodiversityObservation[]> {
    await delay(250);
    let bio = [...SIMULATED_BIODIVERSITY];
    if (regionId) {
      bio = bio.filter(b => b.regionId === regionId);
    }
    return bio;
  }
}
