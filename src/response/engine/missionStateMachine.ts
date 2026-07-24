import type { MissionStatus, MissionOutcome, ResponseMission } from '../models/response.types';

export function transitionMissionState(
  mission: ResponseMission,
  nextStatus: MissionStatus,
  expectedOutcome?: MissionOutcome
): ResponseMission {
  const currentStatus = mission.status;

  // Terminal state protection
  if (currentStatus === 'completed' || currentStatus === 'aborted') {
    throw new Error(`Cannot transition from terminal state: ${currentStatus}`);
  }

  let isValid: boolean;

  // Allow Aborting from any active state
  if (nextStatus === 'aborted') {
    isValid = true;
  } else {
    switch (currentStatus) {
      case 'proposed':
        isValid = nextStatus === 'authorized';
        break;
      case 'authorized':
        isValid = nextStatus === 'en_route';
        break;
      case 'en_route':
        isValid = nextStatus === 'on_station';
        break;
      case 'on_station':
        isValid = nextStatus === 'investigating';
        break;
      case 'investigating':
        isValid = nextStatus === 'completed';
        break;
      default:
        isValid = false;
    }
  }

  if (!isValid) {
    throw new Error(`Invalid state transition from '${currentStatus}' to '${nextStatus}'.`);
  }

  const updatedMission = { ...mission, status: nextStatus };
  const utcNow = new Date().toISOString();

  if (nextStatus === 'authorized') {
    updatedMission.authorizedAt = utcNow;
  } else if (nextStatus === 'completed') {
    updatedMission.completedAt = utcNow;
    updatedMission.outcome = expectedOutcome || 'inconclusive';
  } else if (nextStatus === 'aborted') {
    updatedMission.completedAt = utcNow;
    // Explicitly do not set any successful outcome on abort
  }

  return updatedMission;
}
