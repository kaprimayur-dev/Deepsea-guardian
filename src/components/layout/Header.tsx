import { Link } from 'react-router-dom';

export default function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-6 bg-background/20 backdrop-blur-md border-b border-deep-teal/15">
      <div className="font-display text-lg font-extrabold tracking-tighter text-on-surface">
        DEEPSEA GUARDIAN
      </div>
      <div className="hidden md:flex gap-12 font-technical text-xs tracking-[0.3em] uppercase items-center">
        <div className="flex flex-col">
          <span className="opacity-30 text-[8px] leading-none mb-1">ST-01 // ACTIVE</span>
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-tertiary font-bold hover:text-tertiary transition-colors text-left cursor-pointer"
          >
            MISSION
          </button>
        </div>
        <div className="flex flex-col">
          <span className="opacity-30 text-[8px] leading-none mb-1">ST-02 // NOMINAL</span>
          <button 
            onClick={() => scrollToSection('threats')} 
            className="text-on-surface-variant font-medium hover:text-tertiary transition-colors text-left cursor-pointer"
          >
            INTELLIGENCE
          </button>
        </div>
        <div className="flex flex-col">
          <span className="opacity-30 text-[8px] leading-none mb-1">ST-03 // STANDBY</span>
          <button 
            onClick={() => scrollToSection('biodiversity')} 
            className="text-on-surface-variant font-medium hover:text-tertiary transition-colors text-left cursor-pointer"
          >
            BIODIVERSITY
          </button>
        </div>
      </div>
      <Link 
        to="/mission-control"
        className="px-6 py-2 border border-deep-teal font-technical text-xs tracking-widest text-primary hover:border-tertiary hover:text-tertiary transition-all duration-300 active:scale-95 uppercase"
      >
        ENTER MISSION CONTROL →
      </Link>
    </nav>
  );
}
