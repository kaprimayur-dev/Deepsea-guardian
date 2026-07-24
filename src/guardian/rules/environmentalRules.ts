import type { EnvironmentalSnapshot } from '../../domain/types';
import type { ContributingFactor } from '../models/guardian.types';
import {
  SIMULATION_POLICY_SST_ANOMALY_THRESHOLD,
  SIMULATION_POLICY_DISSOLVED_OXYGEN_HYPOXIA_THRESHOLD,
  SIMULATION_POLICY_CURRENT_SPEED_ABNORMAL_THRESHOLD,
  SIMULATION_POLICY_SALINITY_MIN_THRESHOLD,
  SIMULATION_POLICY_SALINITY_MAX_THRESHOLD
} from '../constants';

export function evaluateEnvironmentalRules(state: EnvironmentalSnapshot): ContributingFactor[] {
  const factors: ContributingFactor[] = [];

  // Anomaly calculation: only calculate if reference/baseline is explicitly supplied
  if (state.baselineSeaSurfaceTemperature !== undefined) {
    const anomaly = state.seaSurfaceTemperature - state.baselineSeaSurfaceTemperature;
    if (anomaly >= SIMULATION_POLICY_SST_ANOMALY_THRESHOLD) {
      factors.push({
        id: 'env-sst-anomaly',
        type: 'environment',
        description: `Elevated Sea Surface Temperature anomaly of +${anomaly.toFixed(1)}°C detected.`,
        severity: anomaly >= 2.5 ? 'critical' : 'high'
      });
    }
  }

  // Dissolved Oxygen
  if (state.dissolvedOxygen < SIMULATION_POLICY_DISSOLVED_OXYGEN_HYPOXIA_THRESHOLD) {
    factors.push({
      id: 'env-hypoxia',
      type: 'environment',
      description: `Critical dissolved oxygen depletion (${state.dissolvedOxygen} mg/L) indicates localized hypoxia.`,
      severity: 'high'
    });
  }

  // Current Speed
  if (state.currentSpeed > SIMULATION_POLICY_CURRENT_SPEED_ABNORMAL_THRESHOLD) {
    factors.push({
      id: 'env-current-velocity',
      type: 'environment',
      description: `Anomalous current speed (${state.currentSpeed} kn) registered.`,
      severity: 'medium'
    });
  }

  // Salinity
  if (state.salinity < SIMULATION_POLICY_SALINITY_MIN_THRESHOLD || state.salinity > SIMULATION_POLICY_SALINITY_MAX_THRESHOLD) {
    factors.push({
      id: 'env-salinity-instability',
      type: 'environment',
      description: `Salinity imbalance (${state.salinity} PSU) indicating abnormal water density profiles.`,
      severity: 'medium'
    });
  }

  return factors;
}
