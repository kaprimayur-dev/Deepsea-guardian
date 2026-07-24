import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  useOceanOverview, 
  useRegions, 
  useRegionIntelligence 
} from '../../hooks/useOceanData';
import { useGuardianAssessment } from '../../hooks/useGuardianAssessment';
import { useResponseMissions } from '../../hooks/useResponseMissions';
import OceanMap from './components/OceanMap';
import IntelligenceRail from './components/IntelligenceRail';
import MapLayerControls from './components/MapLayerControls';

export default function MissionControlPage() {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedThreatId, setSelectedThreatId] = useState<string | null>(null);
  const [intelligenceMode, setIntelligenceMode] = useState<'risk' | 'biodiversity' | 'operations'>('risk');
  const [activeLayers, setActiveLayers] = useState({
    threats: true,
    sources: true,
    biodiversity: true,
    assets: true
  });

  // Query global datasets
  const overviewState = useOceanOverview();
  const regionsState = useRegions();

  // Query detailed region intelligence dynamically
  const regionIntelligenceState = useRegionIntelligence(selectedRegionId || '');
  const guardianAssessmentState = useGuardianAssessment(selectedRegionId);

  const {
    missions,
    proposeMission,
    authorizeMission,
    advanceMission,
    abortMission
  } = useResponseMissions();

  const toggleLayer = (layer: 'threats' | 'sources' | 'biodiversity' | 'assets') => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  // Graceful loading state during repository initial load
  if (overviewState.loading || regionsState.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020607]">
        <div className="w-8 h-8 border-2 border-tertiary border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="font-technical text-xs tracking-widest text-slate-500 uppercase">INITIALIZING OCEAN LAYER...</span>
      </div>
    );
  }

  // Graceful error state
  if (overviewState.error || regionsState.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020607] p-8 text-center">
        <span className="font-technical text-status-critical text-sm tracking-widest uppercase mb-4">WORKSPACE INITIALIZATION FAILED</span>
        <p className="text-on-surface-variant max-w-md font-body text-sm leading-relaxed mb-6">
          Unable to resolve connection to the simulated repository layer. 
        </p>
        <Link 
          to="/"
          className="px-6 py-2 border border-deep-teal font-technical text-xs text-primary hover:border-tertiary hover:text-tertiary transition-colors"
        >
          BACK TO HOME
        </Link>
      </div>
    );
  }

  const regions = regionsState.data || [];
  const overview = overviewState.data || { totalRegions: 5, activeThreats: 4, nominalSensors: 7, activeAssets: 3 };

  // Collect active entity sets driven by selected region and active toggles
  const activeThreats = selectedRegionId && regionIntelligenceState.data
    ? regionIntelligenceState.data.activeThreats.filter(() => activeLayers.threats)
    : regionsState.data
      ? [] // Global view only shows regions to keep map clean, or we can resolve all threats globally
      : [];

  const activeSources = selectedRegionId && regionIntelligenceState.data && activeLayers.sources
    ? regionIntelligenceState.data.sources
    : [];

  const activeAssets = selectedRegionId && regionIntelligenceState.data && activeLayers.assets
    ? regionIntelligenceState.data.activeAssets
    : [];

  const activeBiodiversity = selectedRegionId && regionIntelligenceState.data && activeLayers.biodiversity
    ? regionIntelligenceState.data.biodiversitySummary
    : [];

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#020607] text-[#D6E5E7] font-body-sm select-none">
      {/* HUD Header top bar */}
      <header className="w-full h-14 md:h-20 bg-[#081517] border-b border-deep-teal/40 px-4 md:px-8 flex justify-between items-center z-40 shrink-0">
        <div className="flex items-center gap-4 md:gap-12">
          <Link to="/" className="flex items-center gap-2 md:gap-4 cursor-pointer group">
            <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-tertiary flex items-center justify-center group-hover:border-white transition-colors">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-tertiary group-hover:bg-white transition-colors"></div>
            </div>
            <span className="font-narrative-id text-[12px] md:text-[16px] tracking-[0.2em] md:tracking-[0.4em] text-on-surface uppercase font-bold group-hover:text-white transition-colors">
              DEEPSEA GUARDIAN
            </span>
          </Link>
          <div className="h-6 w-[1px] bg-deep-teal/50 hidden md:block"></div>
          <div className="items-center gap-3 hidden md:flex">
            <span className="w-2.5 h-2.5 bg-tertiary rounded-full animate-pulse shadow-[0_0_8px_#6FD6E0]"></span>
            <span className="font-metadata text-metadata text-on-surface uppercase tracking-wider">
              {overview.totalRegions} REGIONAL CORES ONLINE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex flex-col items-end">
            <span className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-wider">SYSTEM STATUS</span>
            <span className="font-metadata text-sm text-tertiary uppercase font-bold tracking-widest">
              OPERATIONAL / NOMINAL
            </span>
          </div>
          <div className="h-6 w-[1px] bg-deep-teal/30 hidden md:block"></div>
          <Link
            to="/"
            className="px-3 md:px-4 py-1.5 border border-deep-teal/60 font-technical text-[10px] tracking-widest text-on-surface hover:border-tertiary hover:text-tertiary transition-colors uppercase cursor-pointer whitespace-nowrap"
          >
            Exit<span className="hidden sm:inline"> Workspace</span>
          </Link>
        </div>
      </header>

      {/* Main workspace container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full relative">
        {/* Left Map Dominance Workspace */}
        <section className="w-full h-[50vh] lg:h-full flex-1 relative overflow-hidden bg-[#020607]">
          {/* Spatial Intelligence Mode Selector */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex bg-[#020607]/80 backdrop-blur-md border border-deep-teal/40 p-1 select-none">
            {(['risk', 'biodiversity', 'operations'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setIntelligenceMode(mode)}
                className={`px-4 py-1.5 font-technical text-[10px] tracking-wider uppercase transition-colors cursor-pointer ${
                  intelligenceMode === mode 
                    ? 'bg-tertiary/20 text-tertiary font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label={`Switch to ${mode} mode`}
              >
                {mode}
              </button>
            ))}
          </div>

          <OceanMap 
            regions={regions}
            threats={activeThreats}
            sources={activeSources}
            assets={activeAssets}
            biodiversity={activeBiodiversity}
            missions={missions}
            intelligenceMode={intelligenceMode}
            selectedRegionId={selectedRegionId}
            setSelectedRegionId={setSelectedRegionId}
            setSelectedThreatId={setSelectedThreatId}
            activeLayers={activeLayers}
          />

          {/* Layers Controls Overlay */}
          <MapLayerControls 
            activeLayers={activeLayers}
            toggleLayer={toggleLayer}
          />
        </section>

        {/* Right Contextual Intelligence Rail */}
        <aside className="w-full lg:w-[30%] lg:min-w-[380px] lg:max-w-[450px] h-[50vh] lg:h-full border-t lg:border-t-0 lg:border-l border-deep-teal/30 z-20 shrink-0 bg-background">
          <IntelligenceRail 
            regions={regions}
            regionIntelligence={regionIntelligenceState.data}
            guardianAssessment={guardianAssessmentState.assessment}
            missions={missions}
            proposeMission={proposeMission}
            authorizeMission={authorizeMission}
            advanceMission={advanceMission}
            abortMission={abortMission}
            selectedRegionId={selectedRegionId}
            setSelectedRegionId={setSelectedRegionId}
            selectedThreatId={selectedThreatId}
            setSelectedThreatId={setSelectedThreatId}
            loading={regionIntelligenceState.loading || guardianAssessmentState.loading}
          />
        </aside>
      </main>
    </div>
  );
}
