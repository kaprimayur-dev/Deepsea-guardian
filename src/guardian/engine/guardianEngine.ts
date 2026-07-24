import type { GuardianInput, GuardianAssessment, GuardianClassification } from '../models/guardian.types';
import { evaluateEnvironmentalRules } from '../rules/environmentalRules';
import { evaluateThreatRules } from '../rules/threatRules';
import { evaluateBiodiversityRules } from '../rules/biodiversityRules';
import { evaluateCorrelationRules } from '../rules/correlationRules';
import { evaluateRecommendationRules } from '../rules/recommendationRules';

export function evaluateGuardianAssessment(input: GuardianInput): GuardianAssessment {
  // Evaluate independent contributing factors
  const envFactors = evaluateEnvironmentalRules(input.environmentalState);
  const threatFactors = evaluateThreatRules(input.activeThreats);
  const bioFactors = evaluateBiodiversityRules(input.biodiversitySummary);

  const contributingFactors = [...envFactors, ...threatFactors, ...bioFactors];

  // Evaluate correlations
  const correlations = evaluateCorrelationRules(input.activeThreats, input.biodiversitySummary, contributingFactors);

  // Evaluate recommendations
  const recommendedActions = evaluateRecommendationRules(
    input.activeThreats,
    input.activeAssets,
    contributingFactors,
    correlations
  );

  // 1. Calculate Corroboration Strength (categorical)
  let corroborationStrength: 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY_STRONG';
  const activeThreats = input.activeThreats.filter(t => t.status === 'active');
  const nominalSourceIds = new Set(input.sources.filter(s => s.status === 'nominal').map(s => s.id));

  if (activeThreats.length === 0) {
    const nominalCount = input.sources.filter(s => s.status === 'nominal').length;
    if (nominalCount >= 2) corroborationStrength = 'VERY_STRONG';
    else if (nominalCount === 1) corroborationStrength = 'STRONG';
    else corroborationStrength = 'MODERATE';
  } else {
    const supportingNominalSources = new Set<string>();
    activeThreats.forEach(t => {
      t.evidenceSourceIds.forEach(srcId => {
        if (nominalSourceIds.has(srcId)) {
          supportingNominalSources.add(srcId);
        }
      });
    });

    const supportCount = supportingNominalSources.size;
    const maxConfidence = activeThreats.length > 0 ? Math.max(...activeThreats.map(t => t.confidence)) : 0;

    if (supportCount >= 2 && maxConfidence >= 90) {
      corroborationStrength = 'VERY_STRONG';
    } else if (supportCount >= 1 && maxConfidence >= 80) {
      corroborationStrength = 'STRONG';
    } else if (supportCount >= 1 && maxConfidence >= 60) {
      corroborationStrength = 'MODERATE';
    } else {
      corroborationStrength = 'WEAK';
    }
  }

  // 2. Classify Surveillance Attention (operational classification)
  let classification: GuardianClassification = 'SURVEILLANCE_BASELINE';
  const hasCriticalFactor = contributingFactors.some(f => f.severity === 'critical');
  const hasHighFactor = contributingFactors.some(f => f.severity === 'high');
  const hasMediumFactor = contributingFactors.some(f => f.severity === 'medium');
  const hasCriticalCorrelation = correlations.some(c => c.importance === 'critical');
  const hasHighOrMediumCorrelation = correlations.some(c => c.importance === 'high' || c.importance === 'medium');

  if (hasCriticalFactor || hasCriticalCorrelation) {
    classification = 'CRITICAL_ATTENTION';
  } else if (hasHighFactor || hasMediumFactor || hasHighOrMediumCorrelation) {
    classification = 'ATTENTION_REQUIRED';
  }

  // 3. Generate Explanation Statement
  const factorsCount = contributingFactors.length;
  let explanation: string;
  if (classification === 'CRITICAL_ATTENTION') {
    explanation = `System surveillance status escalated to CRITICAL_ATTENTION. Evaluated ${factorsCount} signal factors indicating immediate ecological consequence. ${correlations.length} signal correlations resolved. Corroboration is ${corroborationStrength}.`;
  } else if (classification === 'ATTENTION_REQUIRED') {
    explanation = `Surveillance status set to ATTENTION_REQUIRED. Detected ${factorsCount} environmental/threat factors requiring surveillance tracking. Corroboration is ${corroborationStrength}.`;
  } else {
    explanation = `Surveillance baseline verified. Conditions nominal. Passive acoustic and thermal logging baseline verified.`;
  }

  return {
    regionId: input.regionId,
    classification,
    canonicalRiskScore: input.canonicalRisk.score, // Preserves canonical regional risk score exactly
    canonicalRiskLevel: input.canonicalRisk.level, // Preserves canonical regional risk level exactly
    corroborationStrength,
    contributingFactors,
    correlations,
    recommendedActions,
    explanation
  };
}
