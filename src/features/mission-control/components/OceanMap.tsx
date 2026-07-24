import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { 
  OceanRegion, 
  ThreatEvent, 
  IntelligenceSource, 
  AutonomousAsset, 
  BiodiversityObservation 
} from '../../../domain/types';
import type { ResponseMission } from '../../../response/models/response.types';
import { getRegionDisplayName } from './IntelligenceRail';

interface OceanMapProps {
  regions: OceanRegion[];
  threats: ThreatEvent[];
  sources: IntelligenceSource[];
  assets: AutonomousAsset[];
  biodiversity: BiodiversityObservation[];
  missions: ResponseMission[];
  intelligenceMode: 'risk' | 'biodiversity' | 'operations';
  selectedRegionId: string | null;
  setSelectedRegionId: (id: string | null) => void;
  setSelectedThreatId: (id: string | null) => void;
  activeLayers: {
    threats: boolean;
    sources: boolean;
    biodiversity: boolean;
    assets: boolean;
  };
}

export default function OceanMap({
  regions,
  threats,
  sources,
  assets,
  biodiversity,
  missions,
  intelligenceMode,
  selectedRegionId,
  setSelectedRegionId,
  setSelectedThreatId,
  activeLayers
}: OceanMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;

  // Use refs to avoid re-triggering map initialization effect on setter changes
  const setSelectedRegionIdRef = useRef(setSelectedRegionId);
  const setSelectedThreatIdRef = useRef(setSelectedThreatId);

  useEffect(() => {
    setSelectedRegionIdRef.current = setSelectedRegionId;
    setSelectedThreatIdRef.current = setSelectedThreatId;
  }, [setSelectedRegionId, setSelectedThreatId]);

  useEffect(() => {
    if (!mapContainer.current || !mapTilerKey) return;

    // Initialize MapLibre Map once with the oceanography bathymetric style
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/ocean/style.json?key=${mapTilerKey}`,
      center: [110.0, 5.0], // Centered around Indo-Pacific ocean area
      zoom: 2.5,
      minZoom: 1.5,
      maxZoom: 10
    });

    mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');
    map.current = mapInstance;

    mapInstance.on('load', () => {
      setMapLoaded(true);

      // Add GeoJSON sources
      mapInstance.addSource('regions', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      mapInstance.addSource('threats', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      mapInstance.addSource('sources', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      mapInstance.addSource('assets', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      mapInstance.addSource('biodiversity', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      mapInstance.addSource('relationships', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      // Add Layer Stylings
      // 1a. Outer Concentric Ring layer for Regions
      mapInstance.addLayer({
        id: 'regions-outer-layer',
        type: 'circle',
        source: 'regions',
        paint: {
          'circle-radius': [
            'match', ['get', 'riskLevel'],
            'critical', 18,
            'high', 14,
            'medium', 11,
            'low', 9,
            10
          ],
          'circle-color': 'transparent',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': [
            'match', ['get', 'riskLevel'],
            'critical', '#FF5F5F',
            'high', '#FFB347',
            'medium', '#6FD6E0',
            'low', '#4ADE80',
            '#8d9192'
          ],
          'circle-stroke-opacity': 0.85
        }
      });

      // 1b. Selection Ring highlight layer for Regions
      mapInstance.addLayer({
        id: 'regions-selection-layer',
        type: 'circle',
        source: 'regions',
        filter: ['==', ['get', 'id'], ''],
        paint: {
          'circle-radius': [
            'match', ['get', 'riskLevel'],
            'critical', 25,
            'high', 21,
            'medium', 17,
            'low', 14,
            16
          ],
          'circle-color': 'transparent',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#FFFFFF',
          'circle-stroke-opacity': 0.95
        }
      });

      // 1c. Inner Center Core Dot layer for Regions (◉)
      mapInstance.addLayer({
        id: 'regions-layer',
        type: 'circle',
        source: 'regions',
        paint: {
          'circle-radius': 5,
          'circle-color': [
            'match', ['get', 'riskLevel'],
            'critical', '#FF5F5F',
            'high', '#FFB347',
            'medium', '#6FD6E0',
            'low', '#4ADE80',
            '#8d9192'
          ],
          'circle-opacity': 0.9,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#020607'
        }
      });

      // Regions labels
      mapInstance.addLayer({
        id: 'regions-labels',
        type: 'symbol',
        source: 'regions',
        layout: {
          'text-field': '{name}',
          'text-font': ['Noto Sans Regular'],
          'text-size': 10,
          'text-offset': [0, 2.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#D6E5E7',
          'text-halo-color': '#020607',
          'text-halo-width': 1.5
        }
      });

      // 2. Threats Layer (Red Warning circles)
      mapInstance.addLayer({
        id: 'threats-layer',
        type: 'circle',
        source: 'threats',
        paint: {
          'circle-radius': 7,
          'circle-color': '#FF5F5F',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#020607'
        }
      });

      // 3. Intelligence Sources (Cyan circles)
      mapInstance.addLayer({
        id: 'sources-layer',
        type: 'circle',
        source: 'sources',
        paint: {
          'circle-radius': 5,
          'circle-color': '#6FD6E0',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#020607'
        }
      });

      // 4. Biodiversity Layer (Sea Green)
      mapInstance.addLayer({
        id: 'biodiversity-layer',
        type: 'circle',
        source: 'biodiversity',
        paint: {
          'circle-radius': 5,
          'circle-color': '#4ADE80',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#020607'
        }
      });

      // 4b. Biodiversity labels layer
      mapInstance.addLayer({
        id: 'biodiversity-labels',
        type: 'symbol',
        source: 'biodiversity',
        layout: {
          'text-field': ['concat', ['get', 'speciesName'], ' (', ['get', 'count'], ')'],
          'text-font': ['Noto Sans Regular'],
          'text-size': 9,
          'text-offset': [0, 1.5],
          'text-anchor': 'top',
          'visibility': 'none'
        },
        paint: {
          'text-color': '#4ADE80',
          'text-halo-color': '#020607',
          'text-halo-width': 1.5
        }
      });

      // 5. Assets Layer (Soft Ocean Blue)
      mapInstance.addLayer({
        id: 'assets-layer',
        type: 'circle',
        source: 'assets',
        paint: {
          'circle-radius': 6,
          'circle-color': '#60A5FA',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#020607'
        }
      });

      // 5b. Assets labels layer
      mapInstance.addLayer({
        id: 'assets-labels',
        type: 'symbol',
        source: 'assets',
        layout: {
          'text-field': ['concat', ['get', 'name'], ' (', ['get', 'status'], ')'],
          'text-font': ['Noto Sans Regular'],
          'text-size': 9,
          'text-offset': [0, 1.5],
          'text-anchor': 'top',
          'visibility': 'none'
        },
        paint: {
          'text-color': '#60A5FA',
          'text-halo-color': '#020607',
          'text-halo-width': 1.5
        }
      });

      // 6. Relationships Lines Layer (Restrained Cyan line)
      mapInstance.addLayer({
        id: 'relationships-layer',
        type: 'line',
        source: 'relationships',
        paint: {
          'line-width': 1.2,
          'line-color': '#6FD6E0',
          'line-opacity': 0.5,
          'line-dasharray': [4, 4]
        }
      });

      // Mouse Event Click Handlers
      mapInstance.on('click', 'regions-layer', (e: maplibregl.MapLayerMouseEvent) => {
        const feature = e.features?.[0];
        if (feature) {
          const id = feature.properties?.id;
          setSelectedRegionIdRef.current(id);
          setSelectedThreatIdRef.current(null);
        }
      });

      mapInstance.on('click', 'threats-layer', (e: maplibregl.MapLayerMouseEvent) => {
        const feature = e.features?.[0];
        if (feature) {
          const id = feature.properties?.id;
          const regId = feature.properties?.regionId;
          setSelectedRegionIdRef.current(regId);
          setSelectedThreatIdRef.current(id);
        }
      });

      // Hover Pointer Cursor Handlers
      const setupCursor = (layerId: string) => {
        mapInstance.on('mouseenter', layerId, () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
        });
        mapInstance.on('mouseleave', layerId, () => {
          mapInstance.getCanvas().style.cursor = '';
        });
      };

      setupCursor('regions-layer');
      setupCursor('threats-layer');
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapTilerKey]);

  // Update Data Sources when props change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // 1. Regions
    const regionsSource = map.current.getSource('regions') as maplibregl.GeoJSONSource;
    if (regionsSource) {
      regionsSource.setData({
        type: 'FeatureCollection',
        features: regions.map(r => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [r.center.lng, r.center.lat] },
          properties: { 
            id: r.id, 
            name: getRegionDisplayName(r.id), // CLEAN presentation names!
            riskScore: r.riskScore, 
            riskLevel: r.riskLevel 
          }
        }))
      });
    }

    // 2. Threats (only show active threats belonging to layers selection)
    const threatsSource = map.current.getSource('threats') as maplibregl.GeoJSONSource;
    if (threatsSource) {
      const activeThreats = threats.filter(t => t.status === 'active');
      threatsSource.setData({
        type: 'FeatureCollection',
        features: activeThreats.map(t => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [t.location.lng, t.location.lat] },
          properties: { id: t.id, regionId: t.regionId, title: t.title, severity: t.severity }
        }))
      });
    }

    // 3. Sources
    const sourcesSource = map.current.getSource('sources') as maplibregl.GeoJSONSource;
    if (sourcesSource) {
      sourcesSource.setData({
        type: 'FeatureCollection',
        features: sources.map(s => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [s.location.lng, s.location.lat] },
          properties: { id: s.id, name: s.name, type: s.type }
        }))
      });
    }

    // 4. Biodiversity
    const bioSource = map.current.getSource('biodiversity') as maplibregl.GeoJSONSource;
    if (bioSource) {
      bioSource.setData({
        type: 'FeatureCollection',
        features: biodiversity.map(b => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [b.location.lng, b.location.lat] },
          properties: { id: b.id, speciesName: b.speciesName, count: b.count }
        }))
      });
    }

    // 5. Assets
    const assetsSource = map.current.getSource('assets') as maplibregl.GeoJSONSource;
    if (assetsSource) {
      assetsSource.setData({
        type: 'FeatureCollection',
        features: assets.map(a => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [a.location.lng, a.location.lat] },
          properties: { id: a.id, name: a.name, type: a.type, status: a.status }
        }))
      });
    }
  }, [mapLoaded, regions, threats, sources, biodiversity, assets]);

  // Update Relationships contextual paths
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const relsSource = map.current.getSource('relationships') as maplibregl.GeoJSONSource;
    if (!relsSource) return;

    const features: Array<{
      type: 'Feature';
      geometry: {
        type: 'LineString';
        coordinates: number[][];
      };
    }> = [];

    // Draw active response mission lines in operations mode
    if (intelligenceMode === 'operations') {
      const activeStates = ['authorized', 'en_route', 'on_station', 'investigating'];
      const activeMissions = missions.filter(m => activeStates.includes(m.status));

      activeMissions.forEach(m => {
        const asset = assets.find(a => a.id === m.assignedAssetId);
        const threat = threats.find(t => t.id === m.relatedThreatId);
        if (asset && threat) {
          features.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [asset.location.lng, asset.location.lat],
                [threat.location.lng, threat.location.lat]
              ]
            }
          });
        }
      });
    } 
    // Otherwise draw standard relationships when Coral Triangle is selected
    else if (selectedRegionId === 'region-coral-triangle') {
      const ctBuoy = sources.find(s => s.id === 'source-ct-buoy-01');
      const ctSat = sources.find(s => s.id === 'source-ct-satellite-04');
      const ctGhostNet = threats.find(t => t.id === 'threat-ct-ghost-net');
      const ctBleaching = threats.find(t => t.id === 'threat-ct-bleaching');
      const ctAsset = assets.find(a => a.id === 'asset-ct-auv04');
      const ctTurtle = biodiversity.find(b => b.id === 'bio-ct-turtle');

      // 1. Satellite -> Ghost Net
      if (ctSat && ctGhostNet) {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [ctSat.location.lng + 0.005, ctSat.location.lat + 0.005],
              [ctGhostNet.location.lng, ctGhostNet.location.lat]
            ]
          }
        });
      }

      // 2. Buoy -> Coral Bleaching
      if (ctBuoy && ctBleaching) {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [ctBuoy.location.lng + 0.005, ctBuoy.location.lat - 0.005],
              [ctBleaching.location.lng, ctBleaching.location.lat]
            ]
          }
        });
      }

      // 3. Patrol Asset -> Ghost Net
      if (ctAsset && ctGhostNet) {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [ctAsset.location.lng, ctAsset.location.lat],
              [ctGhostNet.location.lng, ctGhostNet.location.lat]
            ]
          }
        });
      }

      // 4. Ghost Net -> Turtle Cluster
      if (ctGhostNet && ctTurtle) {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [ctGhostNet.location.lng, ctGhostNet.location.lat],
              [ctTurtle.location.lng, ctTurtle.location.lat]
            ]
          }
        });
      }
    }

    relsSource.setData({
      type: 'FeatureCollection',
      features
    });
  }, [mapLoaded, selectedRegionId, threats, sources, biodiversity, assets, missions, intelligenceMode]);

  // Handle Layer Visibility Toggles
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    map.current.setLayoutProperty('threats-layer', 'visibility', activeLayers.threats ? 'visible' : 'none');
    map.current.setLayoutProperty('sources-layer', 'visibility', activeLayers.sources ? 'visible' : 'none');
    map.current.setLayoutProperty('biodiversity-layer', 'visibility', activeLayers.biodiversity ? 'visible' : 'none');
    map.current.setLayoutProperty('assets-layer', 'visibility', activeLayers.assets ? 'visible' : 'none');

    // Labels layers visibility is tied to both layer active state AND current mode
    const showBioLabels = activeLayers.biodiversity && intelligenceMode === 'biodiversity';
    const showAssetLabels = activeLayers.assets && intelligenceMode === 'operations';

    map.current.setLayoutProperty('biodiversity-labels', 'visibility', showBioLabels ? 'visible' : 'none');
    map.current.setLayoutProperty('assets-labels', 'visibility', showAssetLabels ? 'visible' : 'none');
  }, [mapLoaded, activeLayers, intelligenceMode]);

  // Dynamic Mode Styles Update (without map recreation)
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const currentMode = intelligenceMode;

    if (currentMode === 'risk') {
      map.current.setPaintProperty('regions-layer', 'circle-opacity', 0.9);
      map.current.setPaintProperty('regions-outer-layer', 'circle-stroke-opacity', 0.85);
      
      map.current.setPaintProperty('threats-layer', 'circle-opacity', 0.35);
      map.current.setPaintProperty('sources-layer', 'circle-opacity', 0.35);
      map.current.setPaintProperty('assets-layer', 'circle-opacity', 0.25);
      map.current.setPaintProperty('assets-layer', 'circle-radius', 6);
      map.current.setPaintProperty('biodiversity-layer', 'circle-opacity', 0.25);
      map.current.setPaintProperty('biodiversity-layer', 'circle-radius', 5);

      map.current.setLayoutProperty('regions-labels', 'visibility', 'visible');
    } else if (currentMode === 'biodiversity') {
      map.current.setPaintProperty('biodiversity-layer', 'circle-opacity', 0.95);
      map.current.setPaintProperty('biodiversity-layer', 'circle-radius', 9);

      map.current.setPaintProperty('regions-layer', 'circle-opacity', 0.3);
      map.current.setPaintProperty('regions-outer-layer', 'circle-stroke-opacity', 0.2);
      map.current.setPaintProperty('sources-layer', 'circle-opacity', 0.2);
      map.current.setPaintProperty('assets-layer', 'circle-opacity', 0.2);
      map.current.setPaintProperty('assets-layer', 'circle-radius', 5);
      map.current.setPaintProperty('threats-layer', 'circle-opacity', 0.3);

      map.current.setLayoutProperty('regions-labels', 'visibility', 'visible');
    } else if (currentMode === 'operations') {
      map.current.setPaintProperty('assets-layer', 'circle-opacity', 0.95);
      map.current.setPaintProperty('assets-layer', 'circle-radius', 9);

      map.current.setPaintProperty('regions-layer', 'circle-opacity', 0.3);
      map.current.setPaintProperty('regions-outer-layer', 'circle-stroke-opacity', 0.2);
      map.current.setPaintProperty('sources-layer', 'circle-opacity', 0.2);
      map.current.setPaintProperty('threats-layer', 'circle-opacity', 0.35);
      map.current.setPaintProperty('biodiversity-layer', 'circle-opacity', 0.2);
      map.current.setPaintProperty('biodiversity-layer', 'circle-radius', 5);

      map.current.setLayoutProperty('regions-labels', 'visibility', 'visible');
    }
  }, [mapLoaded, intelligenceMode]);

  // Handle camera flying on selection
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (selectedRegionId) {
      const region = regions.find(r => r.id === selectedRegionId);
      if (region) {
        map.current.flyTo({
          center: [region.center.lng, region.center.lat],
          zoom: 5.5,
          speed: 1.2,
          essential: true
        });
      }
    } else {
      // Global overview zoom
      map.current.flyTo({
        center: [110.0, 5.0],
        zoom: 2.5,
        speed: 1.0,
        essential: true
      });
    }
  }, [mapLoaded, selectedRegionId, regions]);

  // Update dynamic WebGL selection ring filter
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    const selectionLayerId = 'regions-selection-layer';
    if (map.current.getLayer(selectionLayerId)) {
      map.current.setFilter(selectionLayerId, ['==', ['get', 'id'], selectedRegionId || '']);
    }
  }, [selectedRegionId, mapLoaded]);

  if (!mapTilerKey) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-lowest/80 text-center p-8 border border-deep-teal/20">
        <span className="font-technical text-status-critical text-sm tracking-widest uppercase mb-4">MAP SERVICE KEY MISSING</span>
        <p className="text-on-surface-variant max-w-md font-body text-sm leading-relaxed">
          The basemap service is offline. Please configure <code className="bg-surface p-1 text-tertiary">VITE_MAPTILER_KEY</code> in your local <code className="bg-surface p-1">.env.local</code> environment file.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
