import type { BiodiversityObservation } from '../../domain/types';
import type { ContributingFactor } from '../models/guardian.types';

export function evaluateBiodiversityRules(
  observations: BiodiversityObservation[]
): ContributingFactor[] {
  const factors: ContributingFactor[] = [];

  observations.forEach(obs => {
    const isVulnerable = obs.conservationStatus === 'endangered' || obs.conservationStatus === 'critically-endangered';
    if (isVulnerable) {
      factors.push({
        id: `bio-vulnerability-${obs.id}`,
        type: 'biodiversity',
        description: `Monitored group of ${obs.count} ${obs.speciesName}s (${obs.conservationStatus}) present in sector.`,
        severity: obs.conservationStatus === 'critically-endangered' ? 'critical' : 'high'
      });
    }
  });

  return factors;
}
