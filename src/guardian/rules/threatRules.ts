import type { ThreatEvent } from '../../domain/types';
import type { ContributingFactor } from '../models/guardian.types';

export function evaluateThreatRules(threats: ThreatEvent[]): ContributingFactor[] {
  return threats
    .filter(t => t.status === 'active')
    .map(t => {
      const displayCategory = t.category.replace('-', ' ').toUpperCase();
      return {
        id: `threat-${t.id}`,
        type: 'threat' as const,
        description: `Active ${displayCategory} threat detected: "${t.title}".`,
        severity: t.severity // Preserves canonical threat severity exactly
      };
    });
}
