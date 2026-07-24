import type { 
  EnvironmentalSnapshot, 
  ThreatEvent, 
  AutonomousAsset, 
  BiodiversityObservation, 
  IntelligenceSource, 
  RiskLevel 
} from '../../domain/types';

export interface GuardianInput {
  regionId: string;
  environmentalState: EnvironmentalSnapshot;
  activeThreats: ThreatEvent[];
  activeAssets: AutonomousAsset[];
  biodiversitySummary: BiodiversityObservation[];
  sources: IntelligenceSource[];
  canonicalRisk: {
    score: number;
    level: RiskLevel;
  };
}

export interface ContributingFactor {
  id: string; // e.g. 'env-sst-anomaly', 'threat-ghost-net-critical'
  type: 'environment' | 'threat' | 'biodiversity';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SignalCorrelation {
  id: 'CORRELATED_THERMAL_STRESS' | 'ENTANGLEMENT_RISK_CORRELATION' | string;
  participatingSignals: string[]; // List of trigger IDs or threat IDs
  importance: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
}

export interface RecommendedAction {
  action: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  rationale: string;
  triggeringCorrelationIds: string[]; // Traceability
  triggeringFactorIds: string[];      // Traceability
  relatedThreatId?: string;           // Traceability
  relevantAssetId?: string;           // Traceability
}

export type GuardianClassification = 'SURVEILLANCE_BASELINE' | 'ATTENTION_REQUIRED' | 'CRITICAL_ATTENTION';

export interface GuardianAssessment {
  regionId: string;
  classification: GuardianClassification;
  canonicalRiskScore: number;
  canonicalRiskLevel: RiskLevel;
  corroborationStrength: 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY_STRONG';
  contributingFactors: ContributingFactor[];
  correlations: SignalCorrelation[];
  recommendedActions: RecommendedAction[];
  explanation: string;
}
