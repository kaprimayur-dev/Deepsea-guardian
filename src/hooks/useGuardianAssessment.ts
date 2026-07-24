import { useRegionIntelligence, useRegions } from './useOceanData';
import { evaluateGuardianAssessment } from '../guardian/engine/guardianEngine';
import type { GuardianAssessment, GuardianInput } from '../guardian/models/guardian.types';

export function useGuardianAssessment(regionId: string | null): {
  assessment: GuardianAssessment | null;
  loading: boolean;
  error: unknown;
} {
  const { data: regionData, loading, error } = useRegionIntelligence(regionId || '');
  const { data: regions } = useRegions();

  if (!regionId || !regionData || !regions) {
    return { assessment: null, loading, error };
  }

  const regionMeta = regions.find(r => r.id === regionId);
  if (!regionMeta) {
    return { assessment: null, loading, error };
  }

  const input: GuardianInput = {
    regionId: regionId,
    environmentalState: regionData.environmentalState,
    activeThreats: regionData.activeThreats,
    activeAssets: regionData.activeAssets,
    biodiversitySummary: regionData.biodiversitySummary,
    sources: regionData.sources,
    canonicalRisk: {
      score: regionMeta.riskScore,
      level: regionMeta.riskLevel
    }
  };

  const assessment = evaluateGuardianAssessment(input);

  return { assessment, loading, error };
}
