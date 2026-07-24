import type { RecommendedAction } from '../../guardian/models/guardian.types';
import type { ResponseMission, MissionStatus } from '../models/response.types';
import { transitionMissionState } from '../engine/missionStateMachine';
import { getSimulationProfile } from './simulationProfiles';

export function isAssetBusy(assetId: string, missions: ResponseMission[]): boolean {
  const activeStates: MissionStatus[] = ['authorized', 'en_route', 'on_station', 'investigating'];
  return missions.some(m => m.assignedAssetId === assetId && activeStates.includes(m.status));
}

export function createMissionProposal(
  rec: RecommendedAction,
  regionId: string,
  assetId: string,
  customRecId?: string // Allow inject for stable testing
): ResponseMission {
  const profile = getSimulationProfile(rec.action);
  const recId = customRecId || (rec.relatedThreatId 
    ? `rec-${rec.relatedThreatId}-${assetId}` 
    : `rec-default-${Math.random().toString(36).substring(2, 9)}`);

  return {
    id: `mission-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    regionId,
    recommendationId: recId,
    recommendationAction: rec.action,
    triggeringCorrelationIds: rec.triggeringCorrelationIds || [],
    triggeringFactorIds: rec.triggeringFactorIds || [],
    relatedThreatId: rec.relatedThreatId,
    assignedAssetId: assetId,
    objective: rec.action,
    priority: rec.priority,
    status: 'proposed',
    simulationProfileId: profile.id,
    createdAt: new Date().toISOString()
  };
}

export function authorizeResponseMission(
  mission: ResponseMission,
  allMissions: ResponseMission[]
): ResponseMission {
  if (isAssetBusy(mission.assignedAssetId, allMissions)) {
    throw new Error(`Asset '${mission.assignedAssetId}' is currently busy on an active operational mission.`);
  }
  return transitionMissionState(mission, 'authorized');
}

export function advanceResponseSimulation(
  mission: ResponseMission
): ResponseMission {
  const currentStatus = mission.status;
  let nextStatus: MissionStatus;

  switch (currentStatus) {
    case 'authorized':
      nextStatus = 'en_route';
      break;
    case 'en_route':
      nextStatus = 'on_station';
      break;
    case 'on_station':
      nextStatus = 'investigating';
      break;
    case 'investigating':
      nextStatus = 'completed';
      break;
    default:
      throw new Error(`Cannot advance simulation from current state: ${currentStatus}`);
  }

  const profile = getSimulationProfile(mission.recommendationAction);
  const outcome = nextStatus === 'completed' ? profile.expectedOutcome : undefined;

  return transitionMissionState(mission, nextStatus, outcome);
}
