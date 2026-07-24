import { Link } from 'react-router-dom';

export default function MissionControlClimax() {
  return (
    <section className="py-section-gap px-margin-desktop bg-surface-container-lowest/30 backdrop-blur-xl relative border-t border-deep-teal/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-deep-teal/40 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-24">
          <div className="font-technical text-[10px] text-tertiary mb-6 tracking-[0.4em] uppercase font-bold">
            Ready for Deployment
          </div>
          
          <h2 className="font-display text-4xl md:text-7xl font-extrabold mb-8 text-white leading-none tracking-tight uppercase">
            MISSION CONTROL FOR THE OCEAN.
          </h2>
          
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-16 leading-relaxed">
            Transition from observer to operator. From fragmented observations to one operational view of the ocean.
          </p>

          <div className="cta-container relative inline-block group">
            {/* CTA Meta labels */}
            <div className="cta-meta absolute -top-8 left-0 font-technical text-[10px] text-tertiary tracking-widest opacity-0 transition-opacity duration-300">
              INITIALIZING_PROTOCOL...
            </div>
            <div className="cta-meta absolute -bottom-8 right-0 font-technical text-[10px] text-tertiary tracking-widest opacity-0 transition-opacity duration-300">
              ACCESS_KEY: READY
            </div>
            
            {/* Cyan framing line */}
            <div className="cta-frame absolute inset-0 border border-tertiary -m-2 pointer-events-none"></div>
            
            <Link
              to="/mission-control"
              className="relative inline-block px-12 py-5 border-2 border-tertiary/30 text-tertiary font-display text-xl tracking-[0.2em] font-extrabold hover:bg-tertiary hover:text-background transition-all duration-500 uppercase z-10"
            >
              ENTER MISSION CONTROL →
            </Link>
          </div>
        </div>

        {/* Systematic Operational Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-10 grayscale hover:opacity-50 transition-all duration-1000">
          <div className="aspect-video glass-etch bg-surface-dim/40 flex items-center justify-center font-technical text-[8px] tracking-[0.3em] uppercase text-slate-300">
            Stream_A1
          </div>
          <div className="aspect-video glass-etch bg-surface-dim/40 flex items-center justify-center font-technical text-[8px] tracking-[0.3em] uppercase text-slate-300">
            Stream_B2
          </div>
          <div className="aspect-video glass-etch bg-surface-dim/40 flex items-center justify-center font-technical text-[8px] tracking-[0.3em] uppercase text-slate-300">
            Stream_C3
          </div>
          <div className="aspect-video glass-etch bg-surface-dim/40 flex items-center justify-center font-technical text-[8px] tracking-[0.3em] uppercase text-slate-300">
            Stream_D4
          </div>
        </div>
      </div>
    </section>
  );
}
