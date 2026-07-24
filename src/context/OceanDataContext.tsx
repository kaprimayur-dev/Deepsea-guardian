import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { OceanRepository } from '../domain/repository';
import { SimulatedOceanRepository } from '../services/simulated/repository';

const OceanDataContext = createContext<OceanRepository | null>(null);

export function OceanDataProvider({ children }: { children: ReactNode }) {
  const repoInstance = useMemo(() => new SimulatedOceanRepository(), []);

  return (
    <OceanDataContext.Provider value={repoInstance}>
      {children}
    </OceanDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOceanRepository(): OceanRepository {
  const context = useContext(OceanDataContext);
  if (!context) {
    throw new Error('useOceanRepository must be used within an OceanDataProvider');
  }
  return context;
}
