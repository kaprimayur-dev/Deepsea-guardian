import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../features/landing/LandingPage';
import MissionControlPage from '../features/mission-control/MissionControlPage';
import { OceanDataProvider } from '../context/OceanDataContext';
import { runRelationshipVerifier } from '../services/simulated/verifier';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/mission-control',
    element: <MissionControlPage />,
  },
]);

export default function App() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      runRelationshipVerifier().then(report => {
        console.group('DSG-002 Relationship Verification Report');
        console.log('Overall Status:', report.passed ? '✅ PASS' : '❌ FAIL');
        report.checks.forEach(check => {
          console.log(
            `${check.passed ? '✅' : '❌'} Check #${check.id}: ${check.name} - ${check.message || ''}`
          );
        });
        console.groupEnd();
      }).catch(err => {
        console.error('Verifier Execution Error:', err);
      });
    }
  }, []);

  return (
    <OceanDataProvider>
      <RouterProvider router={router} />
    </OceanDataProvider>
  );
}
