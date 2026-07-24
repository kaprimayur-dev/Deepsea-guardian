import type { ThreatEvent, BiodiversityObservation } from '../../domain/types';
import type { ContributingFactor, SignalCorrelation } from '../models/guardian.types';

export function evaluateCorrelationRules(
  threats: ThreatEvent[],
  biodiversity: BiodiversityObservation[],
  factors: ContributingFactor[]
): SignalCorrelation[] {
  const correlations: SignalCorrelation[] = [];

  // 1. CORRELATED_THERMAL_STRESS
  const hasSSTAnomaly = factors.some(f => f.id === 'env-sst-anomaly');
  const bleachingThreat = threats.find(t => t.category === 'coral-bleaching' && t.status === 'active');
  if (hasSSTAnomaly && bleachingThreat) {
    correlations.push({
      id: 'CORRELATED_THERMAL_STRESS',
      participatingSignals: [bleachingThreat.id, 'env-sst-anomaly'],
      importance: bleachingThreat.severity === 'critical' ? 'critical' : 'high',
      explanation: 'High thermal anomalies combined with active reef stress indicates systemic reef bleaching event.'
    });
  }

  // 2. ENTANGLEMENT_RISK_CORRELATION
  const ghostNetThreat = threats.find(t => t.category === 'ghost-net' && t.status === 'active');
  const endangeredObservations = biodiversity.filter(b => 
    b.conservationStatus === 'endangered' || b.conservationStatus === 'critically-endangered'
  );
  if (ghostNetThreat && endangeredObservations.length > 0) {
    correlations.push({
      id: 'ENTANGLEMENT_RISK_CORRELATION',
      participatingSignals: [ghostNetThreat.id, ...endangeredObservations.map(o => o.id)],
      importance: 'critical',
      explanation: 'A drifting commercial drift net intersects migration corridors of endangered species, risking immediate ecological mortality.'
    });
  }

  return correlations;
}
