import type { 
  EnvironmentalSnapshot, 
  AutonomousAsset, 
  BiodiversityObservation, 
  IntelligenceSource 
} from '../../domain/types';
import type { GuardianInput } from '../models/guardian.types';
import { evaluateGuardianAssessment } from '../engine/guardianEngine';

// Deep structural comparison utility to verify determinism
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepEquals(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEquals(a[key], b[key])) return false;
  }
  return true;
}

function runTests() {
  console.log('=== Guardian Intelligence Engine Standalone Verifier ===\n');

  let passedAll = true;

  const runAssert = (name: string, condition: boolean) => {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
    } else {
      console.log(`❌ [FAIL] ${name}`);
      passedAll = false;
    }
  };

  // MOCK TELEMETRY SEED SCENARIOS
  const mockNormalEnv: EnvironmentalSnapshot = {
    seaSurfaceTemperature: 24.5,
    baselineSeaSurfaceTemperature: 24.5,
    dissolvedOxygen: 7.2,
    currentSpeed: 0.6,
    currentDirection: 340,
    salinity: 34.9,
    depth: 2.0
  };

  const mockSources: IntelligenceSource[] = [
    {
      id: 'source-1',
      name: 'TEST-BUOY-01',
      type: 'buoy',
      status: 'nominal',
      location: { lat: 10, lng: 10 },
      regionId: 'region-test',
      lastTransmission: '2026-07-24T14:00:00Z',
      telemetry: mockNormalEnv
    }
  ];

  // ----------------------------------------------------
  // CASE A: BASELINE NOMINAL SCENARIO
  // ----------------------------------------------------
  const baselineInput: GuardianInput = {
    regionId: 'region-baseline',
    environmentalState: mockNormalEnv,
    activeThreats: [],
    activeAssets: [],
    biodiversitySummary: [],
    sources: mockSources,
    canonicalRisk: { score: 12, level: 'low' }
  };

  const baselineAssessment = evaluateGuardianAssessment(baselineInput);
  runAssert(
    'Baseline Scenario: classification is SURVEILLANCE_BASELINE',
    baselineAssessment.classification === 'SURVEILLANCE_BASELINE'
  );
  runAssert(
    'Baseline Scenario: no contributing factors',
    baselineAssessment.contributingFactors.length === 0
  );
  runAssert(
    'Baseline Scenario: no correlations',
    baselineAssessment.correlations.length === 0
  );
  runAssert(
    'Baseline Scenario: nominal monitoring recommendation generated',
    baselineAssessment.recommendedActions.some(r => r.priority === 'low')
  );

  // ----------------------------------------------------
  // CASE B: ENVIRONMENTAL STRESS SCENARIO
  // ----------------------------------------------------
  const stressEnv: EnvironmentalSnapshot = {
    ...mockNormalEnv,
    seaSurfaceTemperature: 30.0,
    baselineSeaSurfaceTemperature: 28.0, // Anomaly of +2.0C
    dissolvedOxygen: 5.8 // Hypoxia stress
  };

  const stressInput: GuardianInput = {
    regionId: 'region-stress',
    environmentalState: stressEnv,
    activeThreats: [
      {
        id: 'threat-bleaching',
        category: 'coral-bleaching',
        title: 'Thermal stress trigger',
        severity: 'high',
        confidence: 85,
        status: 'active',
        location: { lat: 10, lng: 10 },
        regionId: 'region-stress',
        evidenceSourceIds: ['source-1'],
        timestamp: '2026-07-24T14:00:00Z'
      }
    ],
    activeAssets: [],
    biodiversitySummary: [],
    sources: mockSources,
    canonicalRisk: { score: 45, level: 'medium' }
  };

  const stressAssessment = evaluateGuardianAssessment(stressInput);
  runAssert(
    'Environmental Stress: classification is ATTENTION_REQUIRED',
    stressAssessment.classification === 'ATTENTION_REQUIRED'
  );
  runAssert(
    'Environmental Stress: flags thermal stress contributing factor',
    stressAssessment.contributingFactors.some(f => f.id === 'env-sst-anomaly')
  );
  runAssert(
    'Environmental Stress: resolves CORRELATED_THERMAL_STRESS correlation',
    stressAssessment.correlations.some(c => c.id === 'CORRELATED_THERMAL_STRESS')
  );

  // ----------------------------------------------------
  // CASE C: MULTI-SIGNAL ECOLOGICAL RISK
  // ----------------------------------------------------
  const endangeredTurtle: BiodiversityObservation = {
    id: 'bio-turtle-1',
    speciesName: 'Green Sea Turtle',
    category: 'reptile',
    conservationStatus: 'endangered',
    count: 10,
    location: { lat: 10, lng: 10 },
    regionId: 'region-ecological',
    timestamp: '2026-07-24T14:00:00Z'
  };

  const activeAUV: AutonomousAsset = {
    id: 'asset-drone-1',
    name: 'AUV-01 (Scan)',
    type: 'sub-surface-drone',
    status: 'patrolling',
    location: { lat: 10, lng: 10 },
    regionId: 'region-ecological',
    battery: 90,
    assignedMission: null
  };

  const ecologicalInput: GuardianInput = {
    regionId: 'region-ecological',
    environmentalState: mockNormalEnv,
    activeThreats: [
      {
        id: 'threat-net-1',
        category: 'ghost-net',
        title: 'Drifting net danger',
        severity: 'critical',
        confidence: 94,
        status: 'active',
        location: { lat: 10, lng: 10 },
        regionId: 'region-ecological',
        evidenceSourceIds: ['source-1'],
        timestamp: '2026-07-24T14:15:00Z'
      }
    ],
    activeAssets: [activeAUV],
    biodiversitySummary: [endangeredTurtle],
    sources: mockSources,
    canonicalRisk: { score: 88, level: 'critical' }
  };

  const ecoAssessment = evaluateGuardianAssessment(ecologicalInput);
  runAssert(
    'Ecological Risk: classification is CRITICAL_ATTENTION',
    ecoAssessment.classification === 'CRITICAL_ATTENTION'
  );
  runAssert(
    'Ecological Risk: resolves ENTANGLEMENT_RISK_CORRELATION correlation',
    ecoAssessment.correlations.some(c => c.id === 'ENTANGLEMENT_RISK_CORRELATION')
  );
  runAssert(
    'Ecological Risk: generates critical AUV redirection recommendation',
    ecoAssessment.recommendedActions.some(r => r.priority === 'critical' && r.relevantAssetId === 'asset-drone-1')
  );

  // ----------------------------------------------------
  // CASE D: INSUFFICIENT EVIDENCE SCENARIO
  // ----------------------------------------------------
  const weakInput: GuardianInput = {
    regionId: 'region-weak',
    environmentalState: mockNormalEnv,
    activeThreats: [
      {
        id: 'threat-weak-1',
        category: 'pollution-slick',
        title: 'Uncorroborated slick alert',
        severity: 'medium',
        confidence: 72, // low confidence
        status: 'active',
        location: { lat: 10, lng: 10 },
        regionId: 'region-weak',
        evidenceSourceIds: [],
        timestamp: '2026-07-24T14:00:00Z'
      }
    ],
    activeAssets: [],
    biodiversitySummary: [],
    sources: [], // no operational sources transmitting
    canonicalRisk: { score: 20, level: 'low' }
  };

  const weakAssessment = evaluateGuardianAssessment(weakInput);
  runAssert(
    'Weak Evidence: corroboration strength is WEAK',
    weakAssessment.corroborationStrength === 'WEAK'
  );
  runAssert(
    'Weak Evidence: recommends additional surveillance before asset dispatch',
    weakAssessment.recommendedActions.some(r => r.priority === 'medium' && r.action.includes('surveillance'))
  );

  // ----------------------------------------------------
  // CASE E: CORAL TRIANGLE EXPECTED VALUES SCENARIO
  // ----------------------------------------------------
  const ctSST: EnvironmentalSnapshot = {
    seaSurfaceTemperature: 30.2,
    baselineSeaSurfaceTemperature: 27.4, // Anomaly is +2.8
    dissolvedOxygen: 5.8,
    currentSpeed: 1.4,
    currentDirection: 120,
    salinity: 34.1,
    depth: 1.5
  };

  const ctInput: GuardianInput = {
    regionId: 'region-coral-triangle',
    environmentalState: ctSST,
    activeThreats: [
      {
        id: 'threat-ct-ghost-net',
        category: 'ghost-net',
        title: 'Drifting Commercial Drift Net Detected',
        severity: 'critical',
        confidence: 94,
        status: 'active',
        location: { lat: 1.2721, lng: 124.3601 },
        regionId: 'region-coral-triangle',
        evidenceSourceIds: ['source-ct-satellite-04'],
        timestamp: '2026-07-24T14:15:00Z'
      },
      {
        id: 'threat-ct-bleaching',
        category: 'coral-bleaching',
        title: 'Extreme Reef Thermal Stress Alert',
        severity: 'high',
        confidence: 88,
        status: 'active',
        location: { lat: 1.2501, lng: 124.3312 },
        regionId: 'region-coral-triangle',
        evidenceSourceIds: ['source-ct-buoy-01'],
        timestamp: '2026-07-24T14:00:00Z'
      }
    ],
    activeAssets: [
      {
        id: 'asset-ct-auv04',
        name: 'AUV-04 (Guardian DeepSea)',
        type: 'sub-surface-drone',
        status: 'en-route',
        location: { lat: 1.2410, lng: 124.3120 },
        regionId: 'region-coral-triangle',
        battery: 82,
        assignedMission: 'Deploying deep sonar scans at drift net coordinates'
      }
    ],
    biodiversitySummary: [
      {
        id: 'bio-ct-turtle',
        speciesName: 'Green Sea Turtle',
        category: 'reptile',
        conservationStatus: 'endangered',
        count: 14,
        location: { lat: 1.2512, lng: 124.3421 },
        regionId: 'region-coral-triangle',
        timestamp: '2026-07-24T13:40:00Z'
      },
      {
        id: 'bio-ct-whale',
        speciesName: 'Pygmy Blue Whale',
        category: 'cetacean',
        conservationStatus: 'endangered',
        count: 3,
        location: { lat: 1.2910, lng: 124.3820 },
        regionId: 'region-coral-triangle',
        timestamp: '2026-07-24T12:10:00Z'
      }
    ],
    sources: [
      {
        id: 'source-ct-buoy-01',
        name: 'CT-BUOY-Alpha',
        type: 'buoy',
        status: 'nominal',
        location: { lat: 1.2501, lng: 124.3312 },
        regionId: 'region-coral-triangle',
        lastTransmission: '2026-07-24T14:00:00Z',
        telemetry: ctSST
      },
      {
        id: 'source-ct-satellite-04',
        name: 'SAT-Sentinel-Ocean4',
        type: 'satellite-feed',
        status: 'nominal',
        location: { lat: 1.2721, lng: 124.3601 },
        regionId: 'region-coral-triangle',
        lastTransmission: '2026-07-24T14:15:00Z',
        telemetry: ctSST
      }
    ],
    canonicalRisk: { score: 88, level: 'critical' }
  };

  const ctAssessment = evaluateGuardianAssessment(ctInput);
  
  // ----------------------------------------------------
  // INVARIANTS AND SPECIFIC RULES VERIFICATIONS
  // ----------------------------------------------------
  
  // Invariant A: Canonical Risk levels remain completely unchanged
  runAssert(
    'Invariant A: Canonical Risk Score remains exactly 88',
    ctAssessment.canonicalRiskScore === 88
  );
  runAssert(
    'Invariant A: Canonical Risk Level remains exactly "critical"',
    ctAssessment.canonicalRiskLevel === 'critical'
  );

  // Invariant B: Threat evidence confidence values remain completely unchanged
  const netThreat = ctInput.activeThreats.find(t => t.id === 'threat-ct-ghost-net');
  runAssert(
    'Invariant B: Threat evidence confidence remains exactly 94%',
    netThreat?.confidence === 94
  );

  // Invariant C: Every Recommended Action has traceable triggers
  const actionsHaveTriggers = ctAssessment.recommendedActions.every(
    act => act.triggeringCorrelationIds.length > 0 || act.triggeringFactorIds.length > 0 || act.priority === 'low'
  );
  runAssert(
    'Invariant C: Every recommended action references a triggering correlation or factor',
    actionsHaveTriggers
  );

  // Invariant D: Every correlation references actual participating signals
  const correlationsHaveSignals = ctAssessment.correlations.every(
    c => c.participatingSignals.length > 0
  );
  runAssert(
    'Invariant D: Every correlation references actual participating signals/factors',
    correlationsHaveSignals
  );

  // Invariant E: No assessment output depends on region ID string checks for reasoning
  const dummyCTInput: GuardianInput = {
    ...ctInput,
    regionId: 'region-dummy-test-different' // Change the ID!
  };
  const dummyAssessment = evaluateGuardianAssessment(dummyCTInput);
  
  // Assert both outputs match exactly, proving zero hardcoding of regionId
  const reasoningMatched = 
    dummyAssessment.classification === ctAssessment.classification &&
    dummyAssessment.contributingFactors.length === ctAssessment.contributingFactors.length &&
    dummyAssessment.correlations.length === ctAssessment.correlations.length &&
    dummyAssessment.recommendedActions.length === ctAssessment.recommendedActions.length;
  
  runAssert(
    'Invariant E / No-Hardcoding: Rule evaluation is independent of regionId',
    reasoningMatched
  );

  // Determinism test (Invariant: running twice yields identical structures)
  const ctAssessment2 = evaluateGuardianAssessment(ctInput);
  const isDeterministic = deepEquals(ctAssessment, ctAssessment2);
  runAssert(
    'Determinism Invariant: Two evaluations with identical input yield structurally identical output',
    isDeterministic
  );

  console.log('\n======================================================');
  if (passedAll) {
    console.log('✅ ALL GUARDIAN VERIFIER CHECKS PASSED SUCCESSFULLY.');
  } else {
    console.error('❌ SOME GUARDIAN VERIFIER CHECKS FAILED.');
    throw new Error('Guardian verifier failed.');
  }
}

runTests();
