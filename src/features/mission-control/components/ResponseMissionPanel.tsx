import { useState } from 'react';
import type { AutonomousAsset } from '../../../domain/types';
import type { GuardianAssessment, RecommendedAction } from '../../../guardian/models/guardian.types';
import type { ResponseMission, MissionStatus } from '../../../response/models/response.types';
import { isAssetBusy } from '../../../response/services/responseService';
import { getSimulationProfile } from '../../../response/services/simulationProfiles';
import { Play, CheckCircle2, ChevronRight, Ban } from 'lucide-react';

interface ResponseMissionPanelProps {
  regionId: string;
  guardianAssessment: GuardianAssessment;
  missions: ResponseMission[];
  activeAssets: AutonomousAsset[];
  proposeMission: (rec: RecommendedAction, regionId: string, assetId: string) => void;
  authorizeMission: (missionId: string) => void;
  advanceMission: (missionId: string) => void;
  abortMission: (missionId: string) => void;
}

export default function ResponseMissionPanel({
  regionId,
  guardianAssessment,
  missions,
  activeAssets,
  proposeMission,
  authorizeMission,
  advanceMission,
  abortMission
}: ResponseMissionPanelProps) {
  const [selectedAssetForRec, setSelectedAssetForRec] = useState<Record<string, string>>({});

  const regionMissions = missions.filter(m => m.regionId === regionId);
  const activeMissions = regionMissions.filter(m => 
    m.status === 'authorized' || m.status === 'en_route' || m.status === 'on_station' || m.status === 'investigating'
  );
  const proposedMissions = regionMissions.filter(m => m.status === 'proposed');
  const completedMissions = regionMissions.filter(m => m.status === 'completed' || m.status === 'aborted');

  const getStatusBadgeStyle = (status: MissionStatus) => {
    switch (status) {
      case 'proposed':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'authorized':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'en_route':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'on_station':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'investigating':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'aborted':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getAssetDisplayName = (assetId: string) => {
    const asset = activeAssets.find(a => a.id === assetId);
    return asset ? asset.name : assetId.toUpperCase();
  };

  return (
    <div className="space-y-6 pt-4 border-t border-outline/30">
      {/* 1. Proposed Responses Block */}
      {proposedMissions.length > 0 && (
        <div className="space-y-3">
          <span className="font-technical text-[9px] text-amber-400 tracking-wider font-bold block uppercase">
            AWAITING OPERATOR AUTHORIZATION ({proposedMissions.length})
          </span>
          <div className="space-y-2">
            {proposedMissions.map(m => {
              const isBusy = isAssetBusy(m.assignedAssetId, missions);
              return (
                <div key={m.id} className="p-3 bg-amber-500/5 border border-amber-500/20 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-technical text-[10px] text-white font-bold block leading-snug">{m.objective}</span>
                    <span className={`px-1.5 py-0.5 font-technical text-[8px] border uppercase font-semibold ${getStatusBadgeStyle(m.status)}`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-body">
                    <span className="text-amber-400/80">Assigned Asset:</span> {getAssetDisplayName(m.assignedAssetId)}
                  </div>
                  
                  {isBusy && (
                    <p className="text-[9px] text-status-critical font-technical">
                      ⚠️ Asset is busy on another active mission. Clear it first.
                    </p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      disabled={isBusy}
                      onClick={() => authorizeMission(m.id)}
                      className="px-3 py-1 font-technical text-[9px] tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      Authorize Mission
                    </button>
                    <button
                      onClick={() => abortMission(m.id)}
                      className="px-2 py-1 font-technical text-[9px] tracking-wider uppercase bg-transparent text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Active Response Missions Block */}
      {activeMissions.length > 0 && (
        <div className="space-y-3">
          <span className="font-technical text-[9px] text-cyan-400 tracking-wider font-bold block uppercase">
            ACTIVE OPERATION MISSIONS ({activeMissions.length})
          </span>
          <div className="space-y-3">
            {activeMissions.map(m => {
              const profile = getSimulationProfile(m.recommendationAction);
              const stepText = profile.stepsExplanation[m.status as Exclude<MissionStatus, 'proposed' | 'aborted' | 'completed'>] || '';
              return (
                <div key={m.id} className="p-3 bg-cyan-500/5 border border-cyan-500/20 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-technical text-[10px] text-white font-bold">{getAssetDisplayName(m.assignedAssetId)}</span>
                    <span className={`px-1.5 py-0.5 font-technical text-[8px] border uppercase font-semibold ${getStatusBadgeStyle(m.status)}`}>
                      {m.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="p-2 bg-black/40 border border-outline/10">
                    <p className="font-technical text-[9px] text-cyan-300 uppercase tracking-widest mb-1">Telemetry Status</p>
                    <p className="text-[10px] text-on-surface-variant font-body leading-normal">{stepText}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => advanceMission(m.id)}
                      className="flex items-center gap-1.5 px-3 py-1 font-technical text-[9px] tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
                    >
                      <Play size={10} />
                      Advance Simulation
                    </button>
                    <button
                      onClick={() => abortMission(m.id)}
                      className="flex items-center gap-1.5 px-2 py-1 font-technical text-[9px] tracking-wider uppercase bg-transparent text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors"
                    >
                      <Ban size={10} />
                      Abort
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Completed Responses Block */}
      {completedMissions.length > 0 && (
        <div className="space-y-3">
          <span className="font-technical text-[9px] text-slate-500 tracking-wider font-bold block uppercase">
            OPERATIONAL LOG SUMMARY ({completedMissions.length})
          </span>
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 intelligence-rail">
            {completedMissions.map(m => (
              <div key={m.id} className="p-2.5 bg-surface-container-low border border-outline/15 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-technical text-[9px] text-slate-300 font-bold">{getAssetDisplayName(m.assignedAssetId)}</span>
                  <span className={`px-1.5 py-0.5 font-technical text-[8px] border uppercase font-semibold ${getStatusBadgeStyle(m.status)}`}>
                    {m.status}
                  </span>
                </div>
                {m.status === 'completed' && m.outcome && (
                  <p className="text-[10px] text-emerald-400 font-technical leading-tight uppercase">
                    Outcome: {m.outcome.replace('-', ' ')}
                  </p>
                )}
                {m.status === 'aborted' && (
                  <p className="text-[10px] text-red-400 font-technical leading-tight uppercase">
                    Outcome: ABORTED BY OPERATOR
                  </p>
                )}
                <p className="text-[9px] text-slate-500 font-body italic leading-snug">
                  {m.objective}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Action Initiators for Guardian Recommendations */}
      <div className="space-y-3">
        <span className="font-technical text-[9px] text-tertiary tracking-wider font-bold block uppercase">
          GUARDIAN RESPONSE PROCEDURES
        </span>
        <div className="space-y-2">
          {guardianAssessment.recommendedActions.map((rec, idx) => {
            const isProposedOrActive = regionMissions.some(m => 
              m.recommendationAction === rec.action && m.status !== 'completed' && m.status !== 'aborted'
            );
            const isCompleted = regionMissions.some(m => 
              m.recommendationAction === rec.action && m.status === 'completed'
            );

            // Filter assets compatible or available
            const availableAssets = activeAssets.filter(a => !isAssetBusy(a.id, missions));
            const currentAssetSelection = selectedAssetForRec[rec.action] || (availableAssets[0]?.id || '');

            return (
              <div key={idx} className="p-3 bg-surface-container-low border border-outline/20 space-y-2">
                <p className="font-technical text-[10px] text-white font-bold leading-snug">{rec.action}</p>
                
                {isProposedOrActive ? (
                  <div className="flex items-center gap-1.5 text-[9px] text-cyan-400 font-technical uppercase">
                    <CheckCircle2 size={10} />
                    Active Response Engaged
                  </div>
                ) : isCompleted ? (
                  <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-technical uppercase">
                    <CheckCircle2 size={10} />
                    Response Procedures Completed
                  </div>
                ) : (
                  <div className="space-y-2 pt-1.5">
                    {availableAssets.length > 0 ? (
                      <div className="flex gap-2 items-center">
                        <select
                          value={currentAssetSelection}
                          onChange={(e) => setSelectedAssetForRec(prev => ({ ...prev, [rec.action]: e.target.value }))}
                          className="flex-1 bg-black text-on-surface text-[10px] font-technical px-2 py-1 border border-outline/40 outline-none focus:border-tertiary transition-colors"
                        >
                          {availableAssets.map(a => (
                            <option key={a.id} value={a.id}>{a.name} (Bat: {a.battery}%)</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            if (!currentAssetSelection) return;
                            proposeMission(rec, regionId, currentAssetSelection);
                          }}
                          className="px-2.5 py-1 font-technical text-[9px] uppercase tracking-wider bg-tertiary/20 text-tertiary border border-tertiary/40 hover:bg-tertiary/30 transition-colors flex items-center gap-1"
                        >
                          Propose Response
                          <ChevronRight size={10} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-[9px] text-status-critical font-technical">
                        ❌ No patrolling assets available in region.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
