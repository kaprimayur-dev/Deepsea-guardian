import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center px-margin-desktop overflow-hidden border-b border-deep-teal/20">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-deep-teal"></span>
          <span className="font-technical text-sm tracking-[0.3em] text-tertiary">INITIALIZING ABYSS_LAYER.v5</span>
        </div>

        <div className="relative inline-block">
          <h1 className="font-display text-5xl md:text-[120px] font-extrabold mb-8 leading-[1.05] tracking-[-0.04em] text-on-surface uppercase">
            THE OCEAN IS SPEAKING.
          </h1>
          <div className="absolute -top-4 -right-12 font-technical text-[10px] opacity-30 tracking-[0.2em] [writing-mode:vertical-rl] hidden md:block">
            SIGNAL_STRENGTH: 98.2%
          </div>
        </div>

        <p className="font-body text-lg text-on-surface-variant max-w-xl mb-12 border-l border-deep-teal pl-8 leading-relaxed">
          Every current, signal, migration, and disturbance tells a story. But our ability to listen is fragmented. We bridge the silence.
        </p>

        <div className="flex items-center gap-12">
          <Link 
            to="/mission-control"
            className="group flex items-center gap-4 font-technical text-xs tracking-[0.3em] uppercase text-tertiary hover:text-white transition-colors cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
            ENTER MISSION CONTROL →
          </Link>
        </div>
      </div>

      {/* Depth Indicator Overlay */}
      <div className="absolute top-0 right-16 h-full w-[1px] bg-deep-teal/20 hidden md:block">
        <div className="depth-marker absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          <div className="w-2.5 h-2.5 bg-tertiary rounded-full shadow-[0_0_10px_rgba(111,214,224,0.5)]"></div>
          <div className="font-technical text-[10px] text-tertiary whitespace-nowrap">DEPTH: 4,200m <span className="opacity-50">// 18.3421° N</span></div>
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 font-technical text-[8px] opacity-20">- 1000m</div>
        <div className="absolute top-2/4 left-1/2 -translate-x-1/2 font-technical text-[8px] opacity-20">- 2500m</div>
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 font-technical text-[8px] opacity-20">- 4000m</div>
      </div>

      {/* Technical Meta Overlay */}
      <div className="absolute bottom-12 left-margin-desktop font-technical text-[10px] opacity-40">
        <div>72.8812° E // SYSTEM_STABLE</div>
        <div>UPTIME: 124.5 DAYS</div>
      </div>
      <div className="absolute bottom-12 right-margin-desktop text-right font-technical text-[10px] opacity-40">
        <div>LAT: 45.1221° N</div>
        <div>LON: 123.4567° W</div>
        <div>SIGNAL: OPTIMAL</div>
      </div>
    </section>
  );
}
