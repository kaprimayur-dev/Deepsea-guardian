import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Header() {
  const [activeState, setActiveState] = useState<'mission' | 'intelligence' | 'biodiversity'>('mission');

  useEffect(() => {
    // Add scroll triggers to track current section active state
    const t1 = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top 40%',
      end: 'bottom 40%',
      onToggle: (self) => self.isActive && setActiveState('mission'),
    });

    const t2 = ScrollTrigger.create({
      trigger: '#threats',
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => self.isActive && setActiveState('intelligence'),
    });

    const t3 = ScrollTrigger.create({
      trigger: '#biodiversity',
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => self.isActive && setActiveState('biodiversity'),
    });

    const t4 = ScrollTrigger.create({
      trigger: '#climax',
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => self.isActive && setActiveState('mission'),
    });

    return () => {
      t1.kill();
      t2.kill();
      t3.kill();
      t4.kill();
    };
  }, []);

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
            className={`text-left cursor-pointer transition-colors ${
              activeState === 'mission' 
                ? 'text-tertiary font-bold border-b border-tertiary pb-1' 
                : 'text-on-surface-variant font-medium hover:text-tertiary'
            }`}
          >
            MISSION
          </button>
        </div>
        <div className="flex flex-col">
          <span className="opacity-30 text-[8px] leading-none mb-1">ST-02 // NOMINAL</span>
          <button 
            onClick={() => scrollToSection('threats')} 
            className={`text-left cursor-pointer transition-colors ${
              activeState === 'intelligence' 
                ? 'text-tertiary font-bold border-b border-tertiary pb-1' 
                : 'text-on-surface-variant font-medium hover:text-tertiary'
            }`}
          >
            INTELLIGENCE
          </button>
        </div>
        <div className="flex flex-col">
          <span className="opacity-30 text-[8px] leading-none mb-1">ST-03 // STANDBY</span>
          <button 
            onClick={() => scrollToSection('biodiversity')} 
            className={`text-left cursor-pointer transition-colors ${
              activeState === 'biodiversity' 
                ? 'text-tertiary font-bold border-b border-tertiary pb-1' 
                : 'text-on-surface-variant font-medium hover:text-tertiary'
            }`}
          >
            BIODIVERSITY
          </button>
        </div>
      </div>
      <Link 
        to="/mission-control"
        className="px-4 md:px-6 py-2 border border-deep-teal font-technical text-[10px] md:text-xs tracking-widest text-primary hover:border-tertiary hover:text-tertiary transition-all duration-300 active:scale-95 uppercase whitespace-nowrap"
      >
        <span className="hidden sm:inline">ENTER </span>MISSION CONTROL <span className="hidden sm:inline">→</span>
      </Link>
    </nav>
  );
}
