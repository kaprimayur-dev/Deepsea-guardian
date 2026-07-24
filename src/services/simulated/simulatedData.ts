import type { 
  OceanRegion, 
  ThreatEvent, 
  IntelligenceSource, 
  AutonomousAsset, 
  BiodiversityObservation, 
  DerivedIntelligence 
} from '../../domain/types';

export const SIMULATED_REGIONS: ReadonlyArray<OceanRegion> = [
  {
    id: 'region-coral-triangle',
    name: 'Coral Triangle Marine Reserve',
    center: { lat: 1.2582, lng: 124.3481 },
    bounds: [[1.2000, 124.3000], [1.3200, 124.4000]],
    riskScore: 88,
    riskLevel: 'critical'
  },
  {
    id: 'region-mariana',
    name: 'Mariana Trench Trench Trench',
    center: { lat: 11.3493, lng: 142.1996 },
    bounds: [[11.3000, 142.1500], [11.4000, 142.2500]],
    riskScore: 12,
    riskLevel: 'low'
  },
  {
    id: 'region-arabian-sea',
    name: 'Arabian Sea Shipping Corridor',
    center: { lat: 15.1221, lng: 65.2112 },
    bounds: [[15.0500, 65.1500], [15.2000, 65.2800]],
    riskScore: 45,
    riskLevel: 'medium'
  },
  {
    id: 'region-gbr-shelf',
    name: 'Great Barrier Reef Shelf',
    center: { lat: -18.2871, lng: 147.6992 },
    bounds: [[-18.3500, 147.6000], [-18.2000, 147.8000]],
    riskScore: 72,
    riskLevel: 'high'
  },
  {
    id: 'region-bay-of-bengal',
    name: 'Bay of Bengal Sanctuary',
    center: { lat: 18.3421, lng: 88.8812 },
    bounds: [[18.2500, 88.8000], [18.4500, 89.0000]],
    riskScore: 24,
    riskLevel: 'low'
  }
];

export const SIMULATED_SOURCES: ReadonlyArray<IntelligenceSource> = [
  // Coral Triangle Sources
  {
    id: 'source-ct-buoy-01',
    name: 'CT-BUOY-Alpha',
    type: 'buoy',
    status: 'nominal',
    location: { lat: 1.2501, lng: 124.3312 },
    regionId: 'region-coral-triangle',
    lastTransmission: '2026-07-24T14:00:00Z',
    telemetry: {
      seaSurfaceTemperature: 30.2, // +2.8C anomaly
      dissolvedOxygen: 5.8,
      currentSpeed: 1.4,
      currentDirection: 120,
      salinity: 34.1,
      depth: 1.5
    }
  },
  {
    id: 'source-ct-satellite-04',
    name: 'SAT-Sentinel-Ocean4',
    type: 'satellite-feed',
    status: 'nominal',
    location: { lat: 1.2721, lng: 124.3601 },
    regionId: 'region-coral-triangle',
    lastTransmission: '2026-07-24T14:15:00Z',
    telemetry: {
      seaSurfaceTemperature: 30.1,
      dissolvedOxygen: 5.9,
      currentSpeed: 1.3,
      currentDirection: 118,
      salinity: 34.0,
      depth: 0.0
    }
  },
  // Mariana Trench Sources
  {
    id: 'source-mariana-buoy-01',
    name: 'MARIANA-BUOY-01',
    type: 'buoy',
    status: 'nominal',
    location: { lat: 11.3493, lng: 142.1996 },
    regionId: 'region-mariana',
    lastTransmission: '2026-07-24T13:45:00Z',
    telemetry: {
      seaSurfaceTemperature: 24.5,
      dissolvedOxygen: 7.2,
      currentSpeed: 0.6,
      currentDirection: 340,
      salinity: 34.9,
      depth: 2.0
    }
  },
  // Arabian Sea Sources
  {
    id: 'source-arabian-sat-01',
    name: 'SAT-Sentinel-Arabian1',
    type: 'satellite-feed',
    status: 'nominal',
    location: { lat: 15.1221, lng: 65.2112 },
    regionId: 'region-arabian-sea',
    lastTransmission: '2026-07-24T14:10:00Z',
    telemetry: {
      seaSurfaceTemperature: 28.1,
      dissolvedOxygen: 6.1,
      currentSpeed: 2.1,
      currentDirection: 220,
      salinity: 35.4,
      depth: 0.0
    }
  },
  // GBR Sources
  {
    id: 'source-gbr-buoy-01',
    name: 'GBR-BUOY-01',
    type: 'buoy',
    status: 'nominal',
    location: { lat: -18.2871, lng: 147.6992 },
    regionId: 'region-gbr-shelf',
    lastTransmission: '2026-07-24T14:20:00Z',
    telemetry: {
      seaSurfaceTemperature: 29.8,
      dissolvedOxygen: 5.9,
      currentSpeed: 1.1,
      currentDirection: 90,
      salinity: 34.3,
      depth: 1.2
    }
  },
  {
    id: 'source-gbr-thermal-02',
    name: 'GBR-THERMAL-02',
    type: 'thermal-sensor',
    status: 'nominal',
    location: { lat: -18.2910, lng: 147.7120 },
    regionId: 'region-gbr-shelf',
    lastTransmission: '2026-07-24T14:22:00Z',
    telemetry: {
      seaSurfaceTemperature: 30.0,
      dissolvedOxygen: 5.8,
      currentSpeed: 1.1,
      currentDirection: 95,
      salinity: 34.2,
      depth: 10.5
    }
  },
  // Bay of Bengal Sources
  {
    id: 'source-bob-acoustic-01',
    name: 'BOB-ACOUSTIC-01',
    type: 'acoustic-sonar',
    status: 'nominal',
    location: { lat: 18.3421, lng: 88.8812 },
    regionId: 'region-bay-of-bengal',
    lastTransmission: '2026-07-24T13:50:00Z',
    telemetry: {
      seaSurfaceTemperature: 27.4,
      dissolvedOxygen: 6.4,
      currentSpeed: 1.8,
      currentDirection: 180,
      salinity: 33.2,
      depth: 45.0
    }
  }
];

export const SIMULATED_THREATS: ReadonlyArray<ThreatEvent> = [
  // Coral Triangle Threats
  {
    id: 'threat-ct-ghost-net',
    category: 'ghost-net',
    title: 'Drifting Commercial Drift Net Detected',
    severity: 'critical',
    confidence: 94,
    status: 'active',
    location: { lat: 1.2721, lng: 124.3601 },
    regionId: 'region-coral-triangle',
    evidenceSourceIds: ['source-ct-satellite-04'],
    timestamp: '2026-07-24T14:15:00Z'
  },
  {
    id: 'threat-ct-bleaching',
    category: 'coral-bleaching',
    title: 'Extreme Reef Thermal Stress Alert',
    severity: 'high',
    confidence: 88,
    status: 'active',
    location: { lat: 1.2501, lng: 124.3312 },
    regionId: 'region-coral-triangle',
    evidenceSourceIds: ['source-ct-buoy-01'],
    timestamp: '2026-07-24T14:00:00Z'
  },
  // Arabian Sea Threats
  {
    id: 'threat-arabian-pollution',
    category: 'pollution-slick',
    title: 'Microplastic Slick Accumulation Zone',
    severity: 'medium',
    confidence: 78,
    status: 'active',
    location: { lat: 15.1500, lng: 65.2300 },
    regionId: 'region-arabian-sea',
    evidenceSourceIds: ['source-arabian-sat-01'],
    timestamp: '2026-07-24T14:10:00Z'
  },
  // GBR Threats
  {
    id: 'threat-gbr-bleaching',
    category: 'coral-bleaching',
    title: 'Widespread Barrier Reef Thermal Anomaly',
    severity: 'high',
    confidence: 85,
    status: 'active',
    location: { lat: -18.2910, lng: 147.7120 },
    regionId: 'region-gbr-shelf',
    evidenceSourceIds: ['source-gbr-buoy-01', 'source-gbr-thermal-02'],
    timestamp: '2026-07-24T14:22:00Z'
  }
];

export const SIMULATED_ASSETS: ReadonlyArray<AutonomousAsset> = [
  // Coral Triangle Asset
  {
    id: 'asset-ct-auv04',
    name: 'AUV-04 (Guardian DeepSea)',
    type: 'sub-surface-drone',
    status: 'en-route',
    location: { lat: 1.2410, lng: 124.3120 },
    regionId: 'region-coral-triangle',
    battery: 82,
    assignedMission: 'Deploying deep sonar scans at drift net coordinates'
  },
  // Mariana Trench Asset
  {
    id: 'asset-mariana-surface',
    name: 'USV-01 (Trench Sentinel)',
    type: 'surface-drone',
    status: 'patrolling',
    location: { lat: 11.3502, lng: 142.2010 },
    regionId: 'region-mariana',
    battery: 95,
    assignedMission: 'Recording acoustic baseline metrics'
  },
  // GBR Asset
  {
    id: 'asset-gbr-auv08',
    name: 'AUV-08 (Coral Guardian)',
    type: 'auv',
    status: 'patrolling',
    location: { lat: -18.2882, lng: 147.7001 },
    regionId: 'region-gbr-shelf',
    battery: 64,
    assignedMission: 'Scanning coral thermal boundary conditions'
  }
];

export const SIMULATED_BIODIVERSITY: ReadonlyArray<BiodiversityObservation> = [
  // Coral Triangle Biodiversity
  {
    id: 'bio-ct-turtle',
    speciesName: 'Green Sea Turtle',
    category: 'reptile',
    conservationStatus: 'endangered',
    count: 14,
    location: { lat: 1.2512, lng: 124.3421 },
    regionId: 'region-coral-triangle',
    timestamp: '2026-07-24T13:40:00Z'
  },
  {
    id: 'bio-ct-whale',
    speciesName: 'Pygmy Blue Whale',
    category: 'cetacean',
    conservationStatus: 'endangered',
    count: 3,
    location: { lat: 1.2910, lng: 124.3820 },
    regionId: 'region-coral-triangle',
    timestamp: '2026-07-24T12:10:00Z'
  },
  // Mariana Trench Biodiversity
  {
    id: 'bio-mariana-snailfish',
    speciesName: 'Mariana Snailfish',
    category: 'cetacean', // Mapping to generic placeholder categories
    conservationStatus: 'least-concern',
    count: 8,
    location: { lat: 11.3490, lng: 142.1990 },
    regionId: 'region-mariana',
    timestamp: '2026-07-24T10:00:00Z'
  },
  // Arabian Sea Biodiversity
  {
    id: 'bio-arabian-whale',
    speciesName: 'Arabian Humpback Whale',
    category: 'cetacean',
    conservationStatus: 'critically-endangered',
    count: 2,
    location: { lat: 15.1100, lng: 65.2000 },
    regionId: 'region-arabian-sea',
    timestamp: '2026-07-24T11:30:00Z'
  },
  // GBR Biodiversity
  {
    id: 'bio-gbr-coral',
    speciesName: 'Staghorn Coral Reef Colony',
    category: 'coral',
    conservationStatus: 'vulnerable',
    count: 450,
    location: { lat: -18.2910, lng: 147.7120 },
    regionId: 'region-gbr-shelf',
    timestamp: '2026-07-24T14:22:00Z'
  },
  // Bay of Bengal Biodiversity
  {
    id: 'bio-bob-dolphin',
    speciesName: 'Irrawaddy Dolphin',
    category: 'cetacean',
    conservationStatus: 'endangered',
    count: 7,
    location: { lat: 18.3410, lng: 88.8800 },
    regionId: 'region-bay-of-bengal',
    timestamp: '2026-07-24T12:00:00Z'
  }
];

export const SIMULATED_INTELLIGENCE: ReadonlyArray<DerivedIntelligence> = [
  {
    regionId: 'region-coral-triangle',
    drivers: [
      'Elevated SST (+2.8°C anomaly) triggering coral bleaching stress warnings',
      'Satellite imaging confirms derelict commercial drift net (ghost net) drifting in sanctuary reserve boundary corridor 07-B'
    ],
    recommendation: 'Direct patrolling AUV-04 to survey drift net coordinates and record sensor snapshots.'
  },
  {
    regionId: 'region-mariana',
    drivers: [
      'Ambient ocean noise registers below baseline threshold limits',
      'Telemetry transmissions nominal across deep seafloor arrays'
    ],
    recommendation: 'Continue recording passive acoustic profiles.'
  },
  {
    regionId: 'region-arabian-sea',
    drivers: [
      'Satellite visual feeds indicate high-concentration microplastic slick accumulation along shipping corridors'
    ],
    recommendation: 'Monitor drift velocity forecasts to predict shoreline reef impacts.'
  },
  {
    regionId: 'region-gbr-shelf',
    drivers: [
      'Multi-sensor triggers confirm regional thermal stress (+1.8°C thermal anomaly)'
    ],
    recommendation: 'Direct Coral Guardian drone AUV-08 to measure deep shelf current transfers.'
  },
  {
    regionId: 'region-bay-of-bengal',
    drivers: [
      'Acoustic array verifies cetacean breeding pod groups in sanctuary sector'
    ],
    recommendation: 'Alert regional shipping authority vectors to enforce speed limit mandates.'
  }
];
