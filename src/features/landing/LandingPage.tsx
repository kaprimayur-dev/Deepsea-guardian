import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ParticleLayer from './components/ParticleLayer';
import AbyssalBackground from './components/AbyssalBackground';
import HeroSection from './sections/HeroSection';
import FragmentationSection from './sections/FragmentationSection';
import ConvergenceSection from './sections/ConvergenceSection';
import ThreatSection from './sections/ThreatSection';
import BiodiversitySection from './sections/BiodiversitySection';
import MissionControlClimax from './sections/MissionControlClimax';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-on-surface">
      {/* Background Ambience Layers */}
      <AbyssalBackground />
      <ParticleLayer />

      {/* Navigation HUD */}
      <Header />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <FragmentationSection />
        <ConvergenceSection />
        <ThreatSection />
        <BiodiversitySection />
        <MissionControlClimax />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
