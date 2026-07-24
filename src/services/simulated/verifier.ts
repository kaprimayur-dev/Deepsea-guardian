import { 
  SIMULATED_REGIONS, 
  SIMULATED_SOURCES, 
  SIMULATED_THREATS, 
  SIMULATED_ASSETS, 
  SIMULATED_BIODIVERSITY, 
  SIMULATED_INTELLIGENCE 
} from './simulatedData';
import { SimulatedOceanRepository } from './repository';

export interface VerificationCheck {
  id: number;
  name: string;
  passed: boolean;
  message?: string;
}

export interface VerificationReport {
  passed: boolean;
  checks: VerificationCheck[];
}

export async function runRelationshipVerifier(): Promise<VerificationReport> {
  const checks: VerificationCheck[] = [];
  const addCheck = (name: string, checkFn: () => { passed: boolean; message?: string }) => {
    try {
      const res = checkFn();
      checks.push({
        id: checks.length + 1,
        name,
        passed: res.passed,
        message: res.message
      });
    } catch (e) {
      checks.push({
        id: checks.length + 1,
        name,
        passed: false,
        message: `Exception: ${e instanceof Error ? e.message : String(e)}`
      });
    }
  };

  // 1. Every region ID is unique.
  addCheck('1. Region ID uniqueness', () => {
    const ids = SIMULATED_REGIONS.map(r => r.id);
    const uniqueIds = new Set(ids);
    const passed = ids.length === uniqueIds.size;
    return { 
      passed, 
      message: passed ? `All ${ids.length} region IDs are unique.` : 'Duplicate region IDs discovered.' 
    };
  });

  // 2. Every IntelligenceSource.regionId references an existing region.
  addCheck('2. IntelligenceSource regionId resolution', () => {
    const regionIds = new Set(SIMULATED_REGIONS.map(r => r.id));
    const invalid = SIMULATED_SOURCES.filter(s => !regionIds.has(s.regionId));
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All sources map to valid region IDs.' 
        : `Invalid sources found: ${invalid.map(i => i.id).join(', ')}`
    };
  });

  // 3. Every ThreatEvent.regionId references an existing region.
  addCheck('3. ThreatEvent regionId resolution', () => {
    const regionIds = new Set(SIMULATED_REGIONS.map(r => r.id));
    const invalid = SIMULATED_THREATS.filter(t => !regionIds.has(t.regionId));
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All threat events map to valid region IDs.' 
        : `Invalid threats found: ${invalid.map(t => t.id).join(', ')}`
    };
  });

  // 4. Every threat evidenceSourceId references an existing IntelligenceSource.
  addCheck('4. Threat evidenceSourceIds resolution', () => {
    const sourceIds = new Set(SIMULATED_SOURCES.map(s => s.id));
    const invalid: string[] = [];
    SIMULATED_THREATS.forEach(t => {
      t.evidenceSourceIds.forEach(eid => {
        if (!sourceIds.has(eid)) {
          invalid.push(`${t.id} -> ${eid}`);
        }
      });
    });
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All threat evidence lists reference valid intelligence sources.' 
        : `Dangling source links discovered: ${invalid.join(', ')}`
    };
  });

  // 5. Every AutonomousAsset.regionId references an existing region.
  addCheck('5. AutonomousAsset regionId resolution', () => {
    const regionIds = new Set(SIMULATED_REGIONS.map(r => r.id));
    const invalid = SIMULATED_ASSETS.filter(a => !regionIds.has(a.regionId));
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All assets map to valid region IDs.' 
        : `Invalid assets: ${invalid.map(a => a.id).join(', ')}`
    };
  });

  // 6. Every BiodiversityObservation.regionId references an existing region.
  addCheck('6. BiodiversityObservation regionId resolution', () => {
    const regionIds = new Set(SIMULATED_REGIONS.map(r => r.id));
    const invalid = SIMULATED_BIODIVERSITY.filter(b => !regionIds.has(b.regionId));
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All biodiversity observations map to valid region IDs.' 
        : `Invalid observations: ${invalid.map(b => b.id).join(', ')}`
    };
  });

  // 7. Every DerivedIntelligence.regionId references an existing region.
  addCheck('7. DerivedIntelligence regionId resolution', () => {
    const regionIds = new Set(SIMULATED_REGIONS.map(r => r.id));
    const invalid = SIMULATED_INTELLIGENCE.filter(i => !regionIds.has(i.regionId));
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All derived intelligence reports map to valid region IDs.' 
        : `Invalid reports: ${invalid.map(i => i.regionId).join(', ')}`
    };
  });

  // 8. Region risk scores remain in 0-100.
  addCheck('8. Region risk score range [0-100]', () => {
    const invalid = SIMULATED_REGIONS.filter(r => r.riskScore < 0 || r.riskScore > 100);
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All region risk scores fall within [0-100].' 
        : `Invalid risk scores: ${invalid.map(r => `${r.id}: ${r.riskScore}`).join(', ')}`
    };
  });

  // 9. Threat confidence remains in 0-100.
  addCheck('9. Threat confidence range [0-100]', () => {
    const invalid = SIMULATED_THREATS.filter(t => t.confidence < 0 || t.confidence > 100);
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All threat confidence percentages fall within [0-100].' 
        : `Invalid confidence levels: ${invalid.map(t => `${t.id}: ${t.confidence}`).join(', ')}`
    };
  });

  // 10. Asset battery remains in 0-100.
  addCheck('10. Asset battery range [0-100]', () => {
    const invalid = SIMULATED_ASSETS.filter(a => a.battery < 0 || a.battery > 100);
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All asset battery percentages fall within [0-100].' 
        : `Invalid battery percentages: ${invalid.map(a => `${a.id}: ${a.battery}`).join(', ')}`
    };
  });

  // 11. Current direction remains in 0-359.
  addCheck('11. Environmental wind/current direction [0-359]', () => {
    const invalid = SIMULATED_SOURCES.filter(
      s => s.telemetry.currentDirection < 0 || s.telemetry.currentDirection > 359
    );
    return {
      passed: invalid.length === 0,
      message: invalid.length === 0 
        ? 'All current directions fall within compass limits [0-359].' 
        : `Invalid directions: ${invalid.map(s => `${s.id}: ${s.telemetry.currentDirection}`).join(', ')}`
    };
  });

  // 12. Referentially related primary-scenario entities actually resolve.
  addCheck('12. Primary scenario reference integrity', () => {
    const targetRegion = 'region-coral-triangle';
    const regionExists = SIMULATED_REGIONS.some(r => r.id === targetRegion);
    const relatedSources = SIMULATED_SOURCES.filter(s => s.regionId === targetRegion);
    const relatedThreats = SIMULATED_THREATS.filter(t => t.regionId === targetRegion);
    const relatedAssets = SIMULATED_ASSETS.filter(a => a.regionId === targetRegion);
    const relatedBio = SIMULATED_BIODIVERSITY.filter(b => b.regionId === targetRegion);

    const checkPassed = regionExists && 
                        relatedSources.length >= 2 && 
                        relatedThreats.length >= 2 && 
                        relatedAssets.length >= 1 && 
                        relatedBio.length >= 2;
                        
    return {
      passed: checkPassed,
      message: checkPassed 
        ? 'Primary Coral Triangle scenario connections are valid.' 
        : `Primary scenario missing nodes. Got: Sources=${relatedSources.length}, Threats=${relatedThreats.length}, Assets=${relatedAssets.length}, Biodiversity=${relatedBio.length}`
    };
  });

  // 13. getRegionIntelligence("region-coral-triangle") returns complete expected aggregate.
  const repo = new SimulatedOceanRepository();
  try {
    const intelligence = await repo.getRegionIntelligence('region-coral-triangle');
    const aggregateCheckPassed = intelligence !== null && 
                                 intelligence.sources.length === 2 && 
                                 intelligence.activeThreats.length === 2 && 
                                 intelligence.activeAssets.length === 1 && 
                                 intelligence.biodiversitySummary.length === 2 && 
                                 intelligence.derivedIntelligence.drivers.length === 2;

    checks.push({
      id: checks.length + 1,
      name: '13. Repository getRegionIntelligence aggregate query',
      passed: aggregateCheckPassed,
      message: aggregateCheckPassed 
        ? 'getRegionIntelligence resolves the full primary Scenario dataset.' 
        : `Repository query mismatch. Got: Sources=${intelligence?.sources.length}, Threats=${intelligence?.activeThreats.length}, Assets=${intelligence?.activeAssets.length}, Biodiversity=${intelligence?.biodiversitySummary.length}`
    });
  } catch (err) {
    checks.push({
      id: checks.length + 1,
      name: '13. Repository getRegionIntelligence aggregate query',
      passed: false,
      message: `Query failed: ${err instanceof Error ? err.message : String(err)}`
    });
  }

  const overallPassed = checks.every(c => c.passed);
  return {
    passed: overallPassed,
    checks
  };
}
