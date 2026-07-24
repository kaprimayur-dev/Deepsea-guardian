export type MissionStatus = 
  | 'proposed'
  | 'authorized'
  | 'en_route'
  | 'on_station'
  | 'investigating'
  | 'completed'
  | 'aborted';

export type MissionOutcome = 
  | 'target-confirmed'
  | 'target-not-found'
  | 'threat-mitigated'
  | 'inconclusive';

export interface SimulationProfile {
  id: string;
  expectedOutcome: MissionOutcome;
  stepsExplanation: Record<Exclude<MissionStatus, 'proposed' | 'aborted'>, string>;
}

export interface ResponseMission {
  id: string;
  regionId: string;
  recommendationId: string;            // Reference to originating RecommendedAction
  recommendationAction: string;        // Text snapshot for display
  triggeringCorrelationIds: string[];  // Provenance
  triggeringFactorIds: string[];       // Provenance
  relatedThreatId?: string;            // Provenance
  assignedAssetId: string;             // Assigned asset
  objective: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: MissionStatus;
  outcome?: MissionOutcome;
  simulationProfileId: string;         // References a deterministic simulation profile
  createdAt: string;                   // UTC ISO string
  authorizedAt?: string;               // UTC ISO string
  completedAt?: string;                // UTC ISO string
}
