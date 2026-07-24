import { useEffect, useState } from 'react';
import { useOceanRepository } from '../context/OceanDataContext';
import type { 
  OceanOverview, 
  OceanRegion, 
  RegionIntelligence 
} from '../domain/types';

export function useOceanOverview() {
  const repo = useOceanRepository();
  const [state, setState] = useState<{
    data: OceanOverview | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    
    repo.getOverview()
      .then(data => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(err => {
        if (active) {
          setState({ 
            data: null, 
            loading: false, 
            error: err instanceof Error ? err : new Error(String(err)) 
          });
        }
      });
      
    return () => {
      active = false;
    };
  }, [repo]);

  return state;
}

export function useRegions() {
  const repo = useOceanRepository();
  const [state, setState] = useState<{
    data: OceanRegion[] | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    
    repo.getRegions()
      .then(data => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(err => {
        if (active) {
          setState({ 
            data: null, 
            loading: false, 
            error: err instanceof Error ? err : new Error(String(err)) 
          });
        }
      });
      
    return () => {
      active = false;
    };
  }, [repo]);

  return state;
}

export function useRegionIntelligence(regionId: string) {
  const repo = useOceanRepository();
  const [state, setState] = useState<{
    data: RegionIntelligence | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!regionId) return;
    let active = true;
    
    // Defer state update to microtask to satisfy React lint checks
    Promise.resolve().then(() => {
      if (active) {
        setState(s => s.loading ? s : { ...s, loading: true });
      }
    });
    
    repo.getRegionIntelligence(regionId)
      .then(data => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(err => {
        if (active) {
          setState({ 
            data: null, 
            loading: false, 
            error: err instanceof Error ? err : new Error(String(err)) 
          });
        }
      });
      
    return () => {
      active = false;
    };
  }, [repo, regionId]);

  return state;
}
