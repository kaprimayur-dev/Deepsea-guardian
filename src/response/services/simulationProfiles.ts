import type { SimulationProfile } from '../models/response.types';

export const SIMULATION_PROFILES: Record<string, SimulationProfile> = {
  'profile-ct-ghost-net': {
    id: 'profile-ct-ghost-net',
    expectedOutcome: 'target-confirmed',
    stepsExplanation: {
      'authorized': 'Mission authorized by operator. Target coordinates locked.',
      'en_route': 'Asset navigating en-route to target drift coordinates.',
      'on_station': 'Asset arrived on station. Deploying high-resolution acoustic sweeps.',
      'investigating': 'Investigating signal corroboration: Scanning net mesh density.',
      'completed': 'SIMULATED OPERATIONAL OUTCOME: Ghost net target confirmed at coordinates.'
    }
  },
  'profile-ct-bleaching': {
    id: 'profile-ct-bleaching',
    expectedOutcome: 'threat-mitigated',
    stepsExplanation: {
      'authorized': 'Thermal probe monitoring sweep authorized.',
      'en_route': 'Probes deploying en-route to shallow reef coordinates.',
      'on_station': 'Thermal sensors on station. Logging boundary temperatures.',
      'investigating': 'Investigating heat stress zones: logging deep boundary current speeds.',
      'completed': 'SIMULATED OPERATIONAL OUTCOME: Thermal anomaly risk mitigated; local heat stress dispersed.'
    }
  },
  'profile-default': {
    id: 'profile-default',
    expectedOutcome: 'inconclusive',
    stepsExplanation: {
      'authorized': 'Baseline calibration authorized.',
      'en_route': 'Asset deploying en-route to patrol sector bounds.',
      'on_station': 'Asset on station. Calibrating acoustic hydrophone baselines.',
      'investigating': 'Investigating localized anomalies.',
      'completed': 'SIMULATED OPERATIONAL OUTCOME: Mission inconclusive. Baseline nominal readings recorded.'
    }
  }
};

export function getSimulationProfile(recommendationId: string): SimulationProfile {
  const lower = recommendationId.toLowerCase();
  if (lower.includes('ghost-net') || lower.includes('drift-net') || lower.includes('auv04') || lower.includes('auv-04')) {
    return SIMULATION_PROFILES['profile-ct-ghost-net'];
  }
  if (lower.includes('bleaching') || lower.includes('thermal') || lower.includes('probe')) {
    return SIMULATION_PROFILES['profile-ct-bleaching'];
  }
  return SIMULATION_PROFILES['profile-default'];
}
