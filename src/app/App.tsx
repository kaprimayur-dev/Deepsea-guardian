import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import LandingPage from '../features/landing/LandingPage';
import { OceanDataProvider } from '../context/OceanDataContext';
import { runRelationshipVerifier } from '../services/simulated/verifier';

function MissionControl() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background">
      <header className="mb-8">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display uppercase">
          Mission Control
        </h1>
        <p className="mt-3 text-lg text-slate-400 max-w-md mx-auto font-body">
          Ocean Command Center
        </p>
      </header>

      <main className="max-w-sm w-full bg-surface-container/50 border border-deep-teal/30 rounded-none p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-slate-200 mb-4 font-display">Workspace Placeholder</h2>
        <p className="text-sm text-slate-400 mb-6 font-body">
          This is a placeholder for the future Mission Control workspace.
        </p>
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center px-4 py-2.5 rounded-none bg-slate-900 border border-deep-teal hover:bg-deep-teal hover:text-white text-slate-200 font-medium transition-colors font-technical tracking-wider"
        >
          Back to Home
        </Link>
      </main>

      <footer className="mt-12 text-xs text-slate-600 font-technical">
        DEEPSEA GUARDIAN • DSG-002
      </footer>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/mission-control',
    element: <MissionControl />,
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
