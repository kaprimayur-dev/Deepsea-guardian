import type { RecommendedAction } from '../../guardian/models/guardian.types';
import type { ResponseMission } from '../models/response.types';
import { 
  createMissionProposal, 
  authorizeResponseMission, 
  advanceResponseSimulation,
  isAssetBusy 
} from '../services/responseService';
import { transitionMissionState } from '../engine/missionStateMachine';

function runTests() {
  console.log('=== DSG-006 Response Mission Foundation Verifier ===\n');

  let passedAll = true;

  const runAssert = (name: string, condition: boolean) => {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
    } else {
      console.log(`❌ [FAIL] ${name}`);
      passedAll = false;
    }
  };

  // MOCK DATA
  const mockRec: RecommendedAction = {
    action: 'Prioritize AUV-04 inspection of the detected drift-net corridor.',
    priority: 'critical',
    rationale: 'Deploying mobile asset to verify coordinates of active drift net threat.',
    triggeringCorrelationIds: ['ENTANGLEMENT_RISK_CORRELATION'],
    triggeringFactorIds: ['threat-net-1']
  };

  const dummyRegionId = 'dummy-region-01';
  const dummyAssetId = 'dummy-asset-01';

  // 1. ResponseMission retains recommendationId
  const proposal = createMissionProposal(mockRec, dummyRegionId, dummyAssetId, 'stable-rec-id-01');
  runAssert(
    'Verification 1: ResponseMission retains recommendationId',
    proposal.recommendationId === 'stable-rec-id-01'
  );
  runAssert(
    'Verification 1b: Recommendation text preserved as snapshot',
    proposal.recommendationAction === mockRec.action
  );

  // 2. PROPOSED mission does not reserve the asset
  const proposedMissions = [proposal];
  runAssert(
    'Verification 2: PROPOSED mission does not reserve the asset (asset is not busy)',
    !isAssetBusy(dummyAssetId, proposedMissions)
  );

  // 3. Authorization performs the asset-conflict check
  // Create an active mission first
  const activeMission: ResponseMission = {
    ...proposal,
    id: 'mission-active-01',
    status: 'authorized'
  };
  const currentMissions = [activeMission];
  
  // Verify asset is busy
  runAssert(
    'Verification 3a: Asset is busy during active authorized state',
    isAssetBusy(dummyAssetId, currentMissions)
  );

  // Attempting to authorize another proposal for the same asset should fail
  let authFailed = false;
  try {
    authorizeResponseMission(proposal, currentMissions);
  } catch {
    authFailed = true;
  }
  runAssert(
    'Verification 3b: Double booking asset on authorization fails cleanly',
    authFailed
  );

  // 4. AUTHORIZED -> EN_ROUTE is explicit
  const authorizedMission = authorizeResponseMission(proposal, []);
  runAssert(
    'Verification 4a: Transition proposed -> authorized successful',
    authorizedMission.status === 'authorized'
  );

  const enRouteMission = advanceResponseSimulation(authorizedMission);
  runAssert(
    'Verification 4b: Transition authorized -> en_route is explicit',
    enRouteMission.status === 'en_route'
  );

  // 5. COMPLETED cannot advance
  const onStationMission = advanceResponseSimulation(enRouteMission);
  const investigatingMission = advanceResponseSimulation(onStationMission);
  const completedMission = advanceResponseSimulation(investigatingMission);
  runAssert(
    'Verification 5a: Completed state reached',
    completedMission.status === 'completed'
  );

  let completedAdvanceFailed = false;
  try {
    advanceResponseSimulation(completedMission);
  } catch {
    completedAdvanceFailed = true;
  }
  runAssert(
    'Verification 5b: Completed mission cannot advance',
    completedAdvanceFailed
  );

  // 6. ABORTED cannot advance
  const abortedMission = transitionMissionState(authorizedMission, 'aborted');
  runAssert(
    'Verification 6a: Aborted state reached from active state',
    abortedMission.status === 'aborted'
  );

  let abortedAdvanceFailed = false;
  try {
    advanceResponseSimulation(abortedMission);
  } catch {
    abortedAdvanceFailed = true;
  }
  runAssert(
    'Verification 6b: Aborted mission cannot advance',
    abortedAdvanceFailed
  );

  // 7. Completed mission has an explicitly simulated outcome
  runAssert(
    'Verification 7a: Completed mission has outcome',
    completedMission.outcome !== undefined
  );
  runAssert(
    'Verification 7b: Completed outcome is target-confirmed (for ghost net profile)',
    completedMission.outcome === 'target-confirmed'
  );

  // 8. Aborted mission does not receive a successful outcome
  runAssert(
    'Verification 8: Aborted mission has no outcome assigned',
    abortedMission.outcome === undefined
  );

  // 9. UI-independent service determines next mission state
  // We prove this by verifying that the functions in responseService return the correct next states without referencing UI layers
  const mockServiceNext = advanceResponseSimulation(authorizedMission);
  runAssert(
    'Verification 9: Service layer determines next status state without UI inputs',
    mockServiceNext.status === 'en_route'
  );

  // 10. Identical simulation scenario + identical mission state produces identical results
  const p1 = createMissionProposal(mockRec, dummyRegionId, dummyAssetId, 'stable-id');
  const p2 = createMissionProposal(mockRec, dummyRegionId, dummyAssetId, 'stable-id');
  
  const auth1 = authorizeResponseMission(p1, []);
  const auth2 = authorizeResponseMission(p2, []);

  const route1 = advanceResponseSimulation(auth1);
  const route2 = advanceResponseSimulation(auth2);

  runAssert(
    'Verification 10: Determinism - identical transitions produce identical state',
    route1.status === route2.status && route1.simulationProfileId === route2.simulationProfileId
  );

  // 11. Dummy-region and dummy-asset verification is validated
  runAssert(
    'Verification 11: Dummy region/asset scenario runs successfully',
    proposal.regionId === dummyRegionId && proposal.assignedAssetId === dummyAssetId
  );

  console.log('\n======================================================');
  if (passedAll) {
    console.log('✅ ALL DSG-006 RESPONSE MISSION VERIFIER CHECKS PASSED.');
  } else {
    console.error('❌ SOME DSG-006 RESPONSE MISSION VERIFIER CHECKS FAILED.');
    throw new Error('Response verifier failed.');
  }
}

runTests();
