import type { ThreatEvent, AutonomousAsset } from '../../domain/types';
import type { ContributingFactor, SignalCorrelation, RecommendedAction } from '../models/guardian.types';

export function evaluateRecommendationRules(
  threats: ThreatEvent[],
  assets: AutonomousAsset[],
  factors: ContributingFactor[],
  correlations: SignalCorrelation[]
): RecommendedAction[] {
  const recommendations: RecommendedAction[] = [];

  // 1. Ghost Net + Available AUV
  const ghostNet = threats.find(t => t.category === 'ghost-net' && t.status === 'active');
  const availableAsset = assets.find(a => a.type === 'sub-surface-drone' || a.type === 'auv');
  const entanglementCor = correlations.find(c => c.id === 'ENTANGLEMENT_RISK_CORRELATION');

  if (ghostNet && availableAsset) {
    recommendations.push({
      action: `Prioritize ${availableAsset.name.split(' ')[0]} inspection of the detected drift-net corridor.`,
      priority: 'critical',
      rationale: `Deploying mobile asset to verify coordinates of active drift net threat ${ghostNet.id}.`,
      triggeringCorrelationIds: entanglementCor ? [entanglementCor.id] : [],
      triggeringFactorIds: [`threat-${ghostNet.id}`],
      relatedThreatId: ghostNet.id,
      relevantAssetId: availableAsset.id
    });
  }

  // 2. Thermal stress anomaly
  const sstFactor = factors.find(f => f.id === 'env-sst-anomaly');
  if (sstFactor) {
    recommendations.push({
      action: 'Increase thermal probe logging frequency across regional sensor network.',
      priority: 'high',
      rationale: 'Thermal stress warning detected; elevated SST anomaly demands higher resolution log intervals.',
      triggeringCorrelationIds: [],
      triggeringFactorIds: ['env-sst-anomaly']
    });
  }

  // 3. Low evidence confidence (< 80)
  threats.forEach(t => {
    if (t.status === 'active' && t.confidence < 80) {
      recommendations.push({
        action: `Increase satellite and acoustic telemetry surveillance to corroborate active threat.`,
        priority: 'medium',
        rationale: `Threat signal ${t.id} has moderate/low confidence (${t.confidence}%). Telemetry validation required.`,
        triggeringCorrelationIds: [],
        triggeringFactorIds: [`threat-${t.id}`],
        relatedThreatId: t.id
      });
    }
  });

  // 4. Default nominal baseline recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      action: 'Continue recording baseline passive acoustic and thermal profiles.',
      priority: 'low',
      rationale: 'Sector environmental conditions nominal. Passive baseline monitoring mode active.',
      triggeringCorrelationIds: [],
      triggeringFactorIds: []
    });
  }

  return recommendations;
}
