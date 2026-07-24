import { ShieldAlert, Eye, Heart, Navigation } from 'lucide-react';

interface MapLayerControlsProps {
  activeLayers: {
    threats: boolean;
    sources: boolean;
    biodiversity: boolean;
    assets: boolean;
  };
  toggleLayer: (layer: 'threats' | 'sources' | 'biodiversity' | 'assets') => void;
}

export default function MapLayerControls({ activeLayers, toggleLayer }: MapLayerControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-30 bg-surface/90 border border-deep-teal/40 p-3 md:p-4 backdrop-blur-md shadow-2xl min-w-[180px] md:min-w-[200px]">
      <span className="font-technical text-[9px] tracking-[0.3em] text-on-surface-variant uppercase block mb-3 font-bold">
        WORKSPACE LAYERS
      </span>
      <div className="space-y-2">
        {/* Threats Layer Toggle */}
        <button
          onClick={() => toggleLayer('threats')}
          className="flex items-center justify-between w-full p-2 hover:bg-surface-container-high/40 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-none border border-status-critical/60 flex items-center justify-center ${activeLayers.threats ? 'bg-status-critical' : 'bg-transparent'}`}></span>
            <span className="font-technical text-[11px] text-white tracking-wider uppercase">Active Threats</span>
          </div>
          <ShieldAlert size={14} className="text-status-critical opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Sources Layer Toggle */}
        <button
          onClick={() => toggleLayer('sources')}
          className="flex items-center justify-between w-full p-2 hover:bg-surface-container-high/40 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-none border border-tertiary/60 flex items-center justify-center ${activeLayers.sources ? 'bg-tertiary' : 'bg-transparent'}`}></span>
            <span className="font-technical text-[11px] text-white tracking-wider uppercase">Data Sources</span>
          </div>
          <Eye size={14} className="text-tertiary opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Biodiversity Layer Toggle */}
        <button
          onClick={() => toggleLayer('biodiversity')}
          className="flex items-center justify-between w-full p-2 hover:bg-surface-container-high/40 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-none border border-biodiversity/60 flex items-center justify-center ${activeLayers.biodiversity ? 'bg-biodiversity' : 'bg-transparent'}`}></span>
            <span className="font-technical text-[11px] text-white tracking-wider uppercase">Biodiversity</span>
          </div>
          <Heart size={14} className="text-biodiversity opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Assets Layer Toggle */}
        <button
          onClick={() => toggleLayer('assets')}
          className="flex items-center justify-between w-full p-2 hover:bg-surface-container-high/40 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-none border border-asset-blue/60 flex items-center justify-center ${activeLayers.assets ? 'bg-asset-blue' : 'bg-transparent'}`}></span>
            <span className="font-technical text-[11px] text-white tracking-wider uppercase">Mobile Assets</span>
          </div>
          <Navigation size={14} className="text-asset-blue opacity-60 group-hover:opacity-100 transition-opacity rotate-45" />
        </button>
      </div>
    </div>
  );
}
