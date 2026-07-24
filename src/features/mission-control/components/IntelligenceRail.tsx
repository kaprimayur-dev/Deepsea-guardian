/* eslint-disable react-refresh/only-export-components */
import { 
  ShieldAlert, 
  Eye, 
  Activity, 
  Heart, 
  Navigation,
  ArrowLeft
} from 'lucide-react';
import type { 
  OceanRegion, 
  RegionIntelligence 
} from '../../../domain/types';
import type { GuardianAssessment, RecommendedAction } from '../../../guardian/models/guardian.types';
import type { ResponseMission } from '../../../response/models/response.types';
import ResponseMissionPanel from './ResponseMissionPanel';

export function getRegionDisplayName(id: string): string {
  const names: Record<string, string> = {
    'region-coral-triangle': 'Coral Triangle',
    'region-mariana': 'Mariana Trench',
    'region-arabian-sea': 'Arabian Sea Corridor',
    'region-gbr-shelf': 'Great Barrier Reef Shelf',
    'region-bay-of-bengal': 'Bay of Bengal Nursery'
  };
  return names[id] || id;
}

export function getThreatDisplayDetails(category: string, title: string): { displayTitle: string; description: string } {
  if (category === 'ghost-net') {
    return {
      displayTitle: 'GHOST NET DETECTION',
      description: 'Derelict commercial drift net detected'
    };
  }
  if (category === 'coral-bleaching') {
    return {
      displayTitle: 'CORAL BLEACHING STRESS',
      description: 'Elevated thermal stress alarm active'
    };
  }
  if (category === 'pollution-slick') {
    return {
      displayTitle: 'POLLUTION SLICK DETECTED',
      description: 'Active microplastic boundary accumulation'
    };
  }
  return {
    displayTitle: title.toUpperCase(),
    description: 'Operational threat vector flagged'
  };
}

export function formatOperationalTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} · ${hours}:${minutes} UTC`;
  } catch {
    return isoString;
  }
}

export function getSourceTypeName(type: string): string {
  const types: Record<string, string> = {
    'buoy': 'BUOY FEED',
    'acoustic-sonar': 'ACOUSTIC SONAR ARRAY',
    'satellite-feed': 'SATELLITE ORBITAL FEED',
    'thermal-sensor': 'THERMAL PROBE FEED'
  };
  return types[type] || type.toUpperCase();
}

interface IntelligenceRailProps {
  regions: OceanRegion[];
  regionIntelligence: RegionIntelligence | null;
  guardianAssessment: GuardianAssessment | null;
  missions: ResponseMission[];
  proposeMission: (rec: RecommendedAction, regionId: string, assetId: string) => void;
  authorizeMission: (missionId: string) => void;
  advanceMission: (missionId: string) => void;
  abortMission: (missionId: string) => void;
  selectedRegionId: string | null;
  setSelectedRegionId: (id: string | null) => void;
  selectedThreatId: string | null;
  setSelectedThreatId: (id: string | null) => void;
  loading: boolean;
}

export default function IntelligenceRail({
  regions,
  regionIntelligence,
  guardianAssessment,
  missions,
  proposeMission,
  authorizeMission,
  advanceMission,
  abortMission,
  selectedRegionId,
  setSelectedRegionId,
  selectedThreatId,
  setSelectedThreatId,
  loading
}: IntelligenceRailProps) {
  
  const handleBackToGlobal = () => {
    setSelectedRegionId(null);
    setSelectedThreatId(null);
  };

  const handleBackToRegion = () => {
    setSelectedThreatId(null);
  };

  const selectedThreat = selectedThreatId && regionIntelligence
    ? regionIntelligence.activeThreats.find(t => t.id === selectedThreatId)
    : null;

  // 1. THREAT STATE (Investigation Detail View)
  if (selectedThreat) {
    const evidenceSources = regionIntelligence?.sources.filter(s => 
      selectedThreat.evidenceSourceIds.includes(s.id)
    ) || [];

    const displayInfo = getThreatDisplayDetails(selectedThreat.category, selectedThreat.title);

    return (
      <div className="flex flex-col h-full bg-surface-container">
        {/* Header / Back */}
        <div className="p-6 border-b border-outline flex items-center gap-4">
          <button 
            onClick={handleBackToRegion}
            className="p-1 hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors cursor-pointer"
            aria-label="Back to Region View"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-metadata text-xs tracking-wider uppercase text-on-surface-variant font-bold">Threat Investigation</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto intelligence-rail p-6 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-status-critical"></span>
              <span className="font-technical text-[9px] tracking-[0.2em] uppercase text-status-critical font-bold">
                {selectedThreat.severity} severity
              </span>
            </div>
            <h3 className="font-display text-2xl font-extrabold text-white leading-tight uppercase mb-2">
              {displayInfo.displayTitle}
            </h3>
            <p className="font-metadata text-[10px] text-on-surface-variant tracking-wider uppercase">
              {formatOperationalTime(selectedThreat.timestamp)}
            </p>
          </div>

          {/* Core confidence indicator */}
          <div className="py-2 border-b border-outline/30 pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-wider">EVIDENCE CONFIDENCE</span>
              <span className="font-technical text-xs text-tertiary font-bold">{selectedThreat.confidence}%</span>
            </div>
            <div className="w-full bg-outline/40 h-[2px]">
              <div 
                className="bg-tertiary h-[2px]" 
                style={{ width: `${selectedThreat.confidence}%` }}
              ></div>
            </div>
          </div>

          {/* Supporting Evidence Sources */}
          <div className="space-y-4">
            <h4 className="font-technical text-xs tracking-[0.15em] uppercase text-tertiary font-bold flex items-center gap-2">
              <Eye size={14} />
              SUPPORTING EVIDENCE
            </h4>
            <div className="space-y-3">
              {evidenceSources.length > 0 ? (
                evidenceSources.map(src => (
                  <div key={src.id} className="border-l border-l-tertiary pl-4 py-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-technical text-xs text-white font-bold">{src.name}</span>
                      <span className="font-metadata text-[9px] text-tertiary uppercase tracking-wider">{getSourceTypeName(src.type)}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      SST: {src.telemetry.seaSurfaceTemperature}°C. Salinity: {src.telemetry.salinity} PSU. Status: Nominal feed resolving.
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-on-surface-variant italic">No active evidence sources flagged.</p>
              )}
            </div>
          </div>

          {/* Regional Context */}
          <div className="space-y-4">
            <h4 className="font-technical text-xs tracking-[0.15em] uppercase text-on-surface-variant font-bold flex items-center gap-2">
              <Activity size={14} />
              REGIONAL CONTEXT
            </h4>
            <div className="space-y-3 font-technical text-xs text-on-surface-variant">
              <div className="flex justify-between border-b border-outline/20 pb-2">
                <span>REGION</span>
                <span className="text-white uppercase">{getRegionDisplayName(selectedThreat.regionId)}</span>
              </div>
              <div className="flex justify-between border-b border-outline/20 pb-2">
                <span>COORDINATES</span>
                <span className="text-white">{selectedThreat.location.lat.toFixed(4)}°N, {selectedThreat.location.lng.toFixed(4)}°E</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS</span>
                <span className="text-status-critical uppercase font-bold">{selectedThreat.status}</span>
              </div>
            </div>
          </div>

          {/* Mitigation Actions */}
          <div className="border-l border-l-status-critical pl-4 py-1">
            <h4 className="font-technical text-[9px] tracking-wider uppercase text-status-critical font-bold mb-2">RECOMMENDED MITIGATION</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Verify drift velocity vectors. Patrol assets en-route. Maintain passive sonar telemetry feed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. REGION STATE (Regional intelligence details view)
  if (selectedRegionId) {
    if (loading || !regionIntelligence) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-surface-container">
          <div className="w-8 h-8 border-2 border-tertiary border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="font-technical text-[10px] tracking-widest text-slate-500 uppercase">ANALYZING REGIONAL DATA...</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-surface-container">
        {/* Header / Back */}
        <div className="p-6 border-b border-outline flex items-center justify-between">
          <button 
            onClick={handleBackToGlobal}
            className="inline-flex items-center gap-2 font-technical text-xs tracking-wider uppercase text-on-surface-variant hover:text-white transition-colors cursor-pointer"
            aria-label="Back to Global Overview"
          >
            <ArrowLeft size={14} />
            Global View
          </button>
          <span className="font-technical text-[9px] text-tertiary opacity-60">CORAL_CORE_v5</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto intelligence-rail p-6 space-y-8">
          {/* Title and Risk Summary */}
          <div>
            <span className="font-technical text-[10px] text-on-surface-variant tracking-[0.2em] uppercase block mb-1">SELECTED REGION</span>
            <h3 className="font-display text-2xl font-extrabold text-white leading-tight uppercase mb-3">
              {getRegionDisplayName(regionIntelligence.regionId)}
            </h3>
            
            <div className="flex items-center gap-4 mt-2">
              <span className={`px-2 py-0.5 font-technical text-[9px] tracking-wider font-bold uppercase ${
                regionIntelligence.riskLevel === 'critical' ? 'bg-status-critical/15 text-status-critical border border-status-critical/30' :
                regionIntelligence.riskLevel === 'high' ? 'bg-status-warning/15 text-status-warning border border-status-warning/30' :
                'bg-tertiary/15 text-tertiary border border-tertiary/30'
              }`}>
                RISK: {regionIntelligence.riskLevel}
              </span>
              <span className="font-technical text-xs text-white font-bold">SCORE: {regionIntelligence.riskScore} / 100</span>
            </div>
          </div>

          {/* Derived Intelligence: GUARDIAN ASSESSMENT */}
          {guardianAssessment && (
            <div className="border-l-2 border-l-tertiary pl-4 py-1 space-y-3">
              <h4 className="font-technical text-[10px] tracking-[0.3em] uppercase text-tertiary font-bold flex items-center justify-between">
                <span>GUARDIAN SYSTEM ASSESSMENT</span>
                <span className="px-1.5 py-0.5 text-[8px] bg-tertiary/10 border border-tertiary/20 uppercase tracking-widest text-tertiary font-bold">
                  {guardianAssessment.classification.replace(/_/g, ' ')}
                </span>
              </h4>
              <div className="space-y-3 font-body text-xs text-on-surface-variant leading-relaxed">
                <div className="space-y-2">
                  {guardianAssessment.contributingFactors.map((factor, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className={`font-bold ${
                        factor.severity === 'critical' ? 'text-status-critical' :
                        factor.severity === 'high' ? 'text-status-warning' :
                        'text-tertiary'
                      }`}>•</span>
                      <span>{factor.description}</span>
                    </div>
                  ))}
                </div>

                {/* Show resolved correlations if any exist */}
                {guardianAssessment.correlations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-outline/25 space-y-2">
                    <span className="font-technical text-[9px] text-tertiary tracking-widest uppercase font-bold block">
                      RESOLVED SIGNAL CORRELATIONS ({guardianAssessment.correlations.length})
                    </span>
                    {guardianAssessment.correlations.map((cor, idx) => (
                      <div key={idx} className="p-2.5 bg-surface-container-low border border-outline/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-technical text-[9px] text-white font-bold tracking-wide">{cor.id.replace(/_/g, ' ')}</span>
                          <span className="font-technical text-[8px] text-status-critical uppercase tracking-wider">{cor.importance}</span>
                        </div>
                        <p className="text-[10px] text-on-surface-variant leading-relaxed">{cor.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Operational Response Panel */}
          {guardianAssessment && regionIntelligence && (
            <ResponseMissionPanel 
              regionId={regionIntelligence.regionId}
              guardianAssessment={guardianAssessment}
              missions={missions}
              activeAssets={regionIntelligence.activeAssets}
              proposeMission={proposeMission}
              authorizeMission={authorizeMission}
              advanceMission={advanceMission}
              abortMission={abortMission}
            />
          )}

          {/* Environmental snapshot (scientific readout) */}
          <div className="space-y-4">
            <h4 className="font-technical text-xs tracking-wider uppercase text-on-surface-variant font-bold flex items-center gap-2">
              <Activity size={14} />
              ENVIRONMENTAL SNAPSHOT
            </h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 py-2 border-b border-outline/30 pb-4">
              <div>
                <span className="font-metadata text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Sea Surface Temp</span>
                <span className="font-technical text-base text-white font-bold">{regionIntelligence.environmentalState.seaSurfaceTemperature}°C</span>
              </div>
              <div>
                <span className="font-metadata text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Dissolved O₂</span>
                <span className="font-technical text-base text-white font-bold">{regionIntelligence.environmentalState.dissolvedOxygen} mg/L</span>
              </div>
              <div>
                <span className="font-metadata text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Current Velocity</span>
                <span className="font-technical text-base text-white font-bold">{regionIntelligence.environmentalState.currentSpeed} kn</span>
              </div>
              <div>
                <span className="font-metadata text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Salinity</span>
                <span className="font-technical text-base text-white font-bold">{regionIntelligence.environmentalState.salinity} PSU</span>
              </div>
            </div>
          </div>

          {/* Active Threats list */}
          <div className="space-y-4">
            <h4 className="font-technical text-xs tracking-wider uppercase text-status-critical font-bold flex items-center gap-2">
              <ShieldAlert size={14} className="text-status-critical" />
              ACTIVE THREAT SIGNALS ({regionIntelligence.activeThreats.length})
            </h4>
            <div className="space-y-4">
              {regionIntelligence.activeThreats.length > 0 ? (
                regionIntelligence.activeThreats.map(t => {
                  const displayInfo = getThreatDisplayDetails(t.category, t.title);
                  return (
                    <div 
                      key={t.id} 
                      onClick={() => setSelectedThreatId(t.id)}
                      className="border-b border-outline/30 pb-3 hover:border-status-critical/60 transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-technical text-[9px] text-status-critical font-bold uppercase tracking-wider">
                          {t.severity}
                        </span>
                        <span className="font-metadata text-[9px] opacity-40">{t.confidence}% CONF</span>
                      </div>
                      <span className="font-display text-sm font-bold text-white uppercase group-hover:text-status-critical transition-colors block mb-1">
                        {displayInfo.displayTitle}
                      </span>
                      <p className="text-[11px] text-on-surface-variant leading-normal">
                        {displayInfo.description}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-on-surface-variant italic">No active threats detected in this region.</p>
              )}
            </div>
          </div>

          {/* Operational Assets list */}
          <div className="space-y-4">
            <h4 className="font-technical text-xs tracking-wider uppercase text-asset-blue font-bold flex items-center gap-2">
              <Navigation size={14} className="text-asset-blue rotate-45" />
              OPERATIONAL ASSETS ({regionIntelligence.activeAssets.length})
            </h4>
            <div className="space-y-4">
              {regionIntelligence.activeAssets.length > 0 ? (
                regionIntelligence.activeAssets.map(a => (
                  <div key={a.id} className="border-b border-outline/30 pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-technical text-xs text-white font-bold uppercase">{a.name}</span>
                      <span className="font-metadata text-[9px] text-asset-blue uppercase tracking-wider">{a.status}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Battery level: {a.battery}%. Mission: {a.assignedMission || 'Holding station.'}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-on-surface-variant italic">No mobile assets deployed in this sector.</p>
              )}
            </div>
          </div>

          {/* Biodiversity summary */}
          <div className="space-y-4">
            <h4 className="font-technical text-xs tracking-wider uppercase text-biodiversity font-bold flex items-center gap-2">
              <Heart size={14} className="text-biodiversity" />
              BIODIVERSITY OBSERVATIONS ({regionIntelligence.biodiversitySummary.length})
            </h4>
            <div className="space-y-4">
              {regionIntelligence.biodiversitySummary.length > 0 ? (
                regionIntelligence.biodiversitySummary.map(b => (
                  <div key={b.id} className="flex justify-between items-center border-b border-outline/30 pb-3">
                    <div>
                      <span className="font-technical text-xs text-white font-bold block">{b.speciesName}</span>
                      <span className="font-metadata text-[9px] text-on-surface-variant uppercase tracking-wider">{b.category} • {b.conservationStatus}</span>
                    </div>
                    <span className="font-technical text-xs text-biodiversity font-bold bg-biodiversity/10 px-2 py-0.5">
                      {b.count} count
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-on-surface-variant italic">No biodiversity monitoring tracks recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. GLOBAL STATE (Default)
  return (
    <div className="flex flex-col h-full bg-surface-container">
      {/* Header */}
      <div className="p-6 border-b border-outline">
        <h3 className="font-display text-xl font-extrabold text-white tracking-tight uppercase">Global Monitoring</h3>
        <p className="font-metadata text-[10px] text-on-surface-variant uppercase mt-1">Multi-core surveillance dashboard</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto intelligence-rail p-6 space-y-8">
        
        {/* System Overview info summary */}
        <div className="border-l-2 border-l-tertiary pl-4 py-1">
          <h4 className="font-technical text-[10px] tracking-wider uppercase text-tertiary font-bold mb-2">SECTOR OVERVIEW</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Five regional cores are online, monitoring baseline acoustic telemetry, thermal patterns, and conservation sanctuaries. Select a region on the map or list below to expand operational intelligence.
          </p>
        </div>

        {/* Active Monitored Regions list */}
        <div className="space-y-4">
          <h4 className="font-technical text-xs tracking-wider uppercase text-on-surface-variant font-bold">
            MONITORED SECTORS ({regions.length})
          </h4>
          
          <div className="space-y-3">
            {regions.map(r => (
              <div 
                key={r.id} 
                onClick={() => setSelectedRegionId(r.id)}
                className="p-4 border border-outline hover:border-tertiary bg-surface-container-lowest/30 hover:bg-surface-container-lowest/80 transition-all cursor-pointer flex justify-between items-center group"
              >
                <div>
                  <span className="font-display text-sm font-bold text-white group-hover:text-tertiary transition-colors uppercase">
                    {getRegionDisplayName(r.id)}
                  </span>
                  <span className="font-metadata text-[10px] text-on-surface-variant block mt-1">
                    LAT: {r.center.lat.toFixed(2)}°N • LON: {r.center.lng.toFixed(2)}°E
                  </span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 font-technical text-[9px] font-bold uppercase tracking-wider block mb-1 ${
                    r.riskLevel === 'critical' ? 'bg-status-critical/15 text-status-critical border border-status-critical/30' :
                    r.riskLevel === 'high' ? 'bg-status-warning/15 text-status-warning border border-status-warning/30' :
                    'bg-tertiary/15 text-tertiary border border-tertiary/30'
                  }`}>
                    {r.riskLevel}
                  </span>
                  <span className="font-technical text-xs text-on-surface-variant">Score: {r.riskScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
