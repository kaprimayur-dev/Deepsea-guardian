import { useState, useEffect } from 'react';
import type { RecommendedAction } from '../guardian/models/guardian.types';
import type { ResponseMission } from '../response/models/response.types';
import { 
  createMissionProposal, 
  authorizeResponseMission, 
  advanceResponseSimulation 
} from '../response/services/responseService';
import { transitionMissionState } from '../response/engine/missionStateMachine';

const STORAGE_KEY = 'dsg-response-missions';

export function useResponseMissions() {
  const [missions, setMissions] = useState<ResponseMission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  }, [missions]);

  const proposeMission = (rec: RecommendedAction, regionId: string, assetId: string) => {
    const exists = missions.some(m => 
      m.recommendationAction === rec.action && 
      m.regionId === regionId && 
      m.status !== 'completed' && 
      m.status !== 'aborted'
    );
    if (exists) return;

    const proposal = createMissionProposal(rec, regionId, assetId);
    setMissions(prev => [...prev, proposal]);
  };

  const authorizeMission = (missionId: string) => {
    setMissions(prev => {
      const target = prev.find(m => m.id === missionId);
      if (!target) return prev;
      try {
        const authorized = authorizeResponseMission(target, prev);
        return prev.map(m => m.id === missionId ? authorized : m);
      } catch (err) {
        alert(err instanceof Error ? err.message : String(err));
        return prev;
      }
    });
  };

  const advanceMission = (missionId: string) => {
    setMissions(prev => {
      const target = prev.find(m => m.id === missionId);
      if (!target) return prev;
      try {
        const advanced = advanceResponseSimulation(target);
        return prev.map(m => m.id === missionId ? advanced : m);
      } catch (err) {
        alert(err instanceof Error ? err.message : String(err));
        return prev;
      }
    });
  };

  const abortMission = (missionId: string) => {
    setMissions(prev => {
      const target = prev.find(m => m.id === missionId);
      if (!target) return prev;
      try {
        const aborted = transitionMissionState(target, 'aborted');
        return prev.map(m => m.id === missionId ? aborted : m);
      } catch (err) {
        alert(err instanceof Error ? err.message : String(err));
        return prev;
      }
    });
  };

  const clearMissions = () => {
    setMissions([]);
  };

  return {
    missions,
    proposeMission,
    authorizeMission,
    advanceMission,
    abortMission,
    clearMissions
  };
}
