/**
 * GUARDIAN SYSTEM surveillance and intelligence evaluation thresholds.
 * These are deterministic SIMULATION-POLICY THRESHOLDS used by the prototype engine
 * to classify environmental readings and identify threat correlations.
 */

// Temperature anomaly threshold: difference in °C between SST observation and reference baseline
export const SIMULATION_POLICY_SST_ANOMALY_THRESHOLD = 1.5;

// Dissolved Oxygen threshold: reading below this level in mg/L indicates hypoxia stress
export const SIMULATION_POLICY_DISSOLVED_OXYGEN_HYPOXIA_THRESHOLD = 6.0;

// Current velocity threshold: reading above this speed in knots indicates anomalous current movements
export const SIMULATION_POLICY_CURRENT_SPEED_ABNORMAL_THRESHOLD = 2.0;

// Salinity bounds: values outside this range in PSU suggest environmental instability/imbalances
export const SIMULATION_POLICY_SALINITY_MIN_THRESHOLD = 33.5;
export const SIMULATION_POLICY_SALINITY_MAX_THRESHOLD = 35.2;
