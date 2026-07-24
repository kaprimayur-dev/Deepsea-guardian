import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  
  const state1Ref = useRef<HTMLDivElement>(null);
  const state2Ref = useRef<HTMLDivElement>(null);
  const state3Ref = useRef<HTMLDivElement>(null);
  const state4Ref = useRef<HTMLDivElement>(null);

  const depthMarkerRef = useRef<HTMLDivElement>(null);
  const leftOverlayRef = useRef<HTMLDivElement>(null);
  const rightOverlayRef = useRef<HTMLDivElement>(null);

  const [reducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([state2Ref.current, state3Ref.current, state4Ref.current], { opacity: 0, y: 80 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinRef.current,
        }
      });

      // Scroll transitions between statement states
      tl.to(state1Ref.current, { opacity: 0, y: -80, duration: 2, ease: 'power1.inOut' })
        .to(state2Ref.current, { opacity: 1, y: 0, duration: 2, ease: 'power1.inOut' }, '-=1.5')
        
        .to(state2Ref.current, { opacity: 0, y: -80, duration: 2, ease: 'power1.inOut' })
        .to(state3Ref.current, { opacity: 1, y: 0, duration: 2, ease: 'power1.inOut' }, '-=1.5')
        
        .to(state3Ref.current, { opacity: 0, y: -80, duration: 2, ease: 'power1.inOut' })
        .to(state4Ref.current, { opacity: 1, y: 0, duration: 2, ease: 'power1.inOut' }, '-=1.5');

      // Depth indicator moves down along layout path
      tl.to(depthMarkerRef.current, { y: '45vh', duration: 6, ease: 'none' }, 0);

      // Background contour parallax translation
      const backgroundEl = document.getElementById('abyssal-background');
      if (backgroundEl) {
        tl.to(backgroundEl, { y: 50, duration: 6, ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="relative h-screen flex flex-col justify-center px-margin-desktop overflow-hidden border-b border-deep-teal/20">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-deep-teal"></span>
            <span className="font-technical text-sm tracking-[0.3em] text-tertiary">abyssal_noise.v5</span>
          </div>

          <h1 className="font-display text-5xl md:text-[80px] font-extrabold mb-8 leading-[1.1] tracking-[-0.04em] text-on-surface uppercase">
            BUT WE'RE LISTENING IN PIECES.
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <p className="font-body text-base text-on-surface-variant max-w-md border-l border-deep-teal pl-6 leading-relaxed">
              Every current, signal, migration, and disturbance tells a story. But our ability to listen is fragmented. We bridge the silence.
            </p>
            <Link 
              to="/mission-control"
              className="group inline-flex items-center gap-4 font-technical text-xs tracking-[0.3em] uppercase text-tertiary hover:text-white transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              ENTER MISSION CONTROL →
            </Link>
          </div>
        </div>

        {/* Static depth indicator */}
        <div className="absolute top-0 right-16 h-full w-[1px] bg-deep-teal/20 hidden md:block">
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="w-2.5 h-2.5 bg-tertiary rounded-full"></div>
            <div className="font-technical text-[10px] text-tertiary whitespace-nowrap">DEPTH: 4,200m</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} id="hero" className="relative h-[220vh] w-full bg-transparent">
      <div ref={pinRef} className="relative h-screen w-full flex flex-col justify-center px-margin-desktop overflow-hidden border-b border-deep-teal/20">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-5xl h-[60vh] flex flex-col justify-center">
          
          {/* STATE 1 */}
          <div ref={state1Ref} className="absolute inset-0 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-deep-teal"></span>
              <span className="font-technical text-sm tracking-[0.3em] text-tertiary">INITIALIZING ABYSS_LAYER.v5</span>
            </div>
            <h1 className="font-display text-5xl md:text-[80px] font-extrabold leading-[1.08] tracking-[-0.04em] text-on-surface uppercase select-none">
              THE OCEAN<br />IS SPEAKING.
            </h1>
          </div>

          {/* STATE 2 */}
          <div ref={state2Ref} className="absolute inset-0 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-deep-teal"></span>
              <span className="font-technical text-sm tracking-[0.3em] text-tertiary">SIGNAL_ACQUISITION</span>
            </div>
            <h1 className="font-display text-5xl md:text-[80px] font-extrabold leading-[1.08] tracking-[-0.04em] text-on-surface uppercase select-none">
              EVERY CURRENT<br />LEAVES A SIGNAL.
            </h1>
          </div>

          {/* STATE 3 */}
          <div ref={state3Ref} className="absolute inset-0 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-deep-teal"></span>
              <span className="font-technical text-sm tracking-[0.3em] text-tertiary">INTERPRET_PHASE</span>
            </div>
            <h1 className="font-display text-5xl md:text-[80px] font-extrabold leading-[1.08] tracking-[-0.04em] text-on-surface uppercase select-none">
              EVERY SIGNAL<br />TELLS A STORY.
            </h1>
          </div>

          {/* STATE 4 */}
          <div ref={state4Ref} className="absolute inset-0 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-deep-teal"></span>
              <span className="font-technical text-sm tracking-[0.3em] text-tertiary">abyssal_noise.v5</span>
            </div>
            <h1 className="font-display text-5xl md:text-[80px] font-extrabold leading-[1.08] tracking-[-0.04em] text-on-surface uppercase select-none">
              BUT WE'RE<br />LISTENING<br />IN PIECES.
            </h1>
            
            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <p className="font-body text-base text-on-surface-variant max-w-md border-l border-deep-teal pl-6 leading-relaxed">
                Every current, signal, migration, and disturbance tells a story. But our ability to listen is fragmented. We bridge the silence.
              </p>
              <Link 
                to="/mission-control"
                className="group inline-flex items-center gap-4 font-technical text-xs tracking-[0.3em] uppercase text-tertiary hover:text-white transition-colors cursor-pointer animate-[pulse_3s_infinite]"
              >
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                ENTER MISSION CONTROL →
              </Link>
            </div>
          </div>

        </div>

        {/* Depth Indicator Overlay */}
        <div className="absolute top-0 right-16 h-full w-[1px] bg-deep-teal/20 hidden md:block">
          <div ref={depthMarkerRef} className="absolute top-[20%] left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="w-2.5 h-2.5 bg-tertiary rounded-full shadow-[0_0_10px_rgba(111,214,224,0.5)]"></div>
            <div className="font-technical text-[10px] text-tertiary whitespace-nowrap">DEPTH: 4,200m <span className="opacity-50">// 18.3421° N</span></div>
          </div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 font-technical text-[8px] opacity-20">- 1000m</div>
          <div className="absolute top-2/4 left-1/2 -translate-x-1/2 font-technical text-[8px] opacity-20">- 2500m</div>
          <div className="absolute top-3/4 left-1/2 -translate-x-1/2 font-technical text-[8px] opacity-20">- 4000m</div>
        </div>

        {/* Technical Meta Overlay */}
        <div ref={leftOverlayRef} className="hidden md:block absolute bottom-12 left-margin-desktop font-technical text-[10px] opacity-40">
          <div>72.8812° E // SYSTEM_STABLE</div>
          <div>UPTIME: 124.5 DAYS</div>
        </div>
        <div ref={rightOverlayRef} className="hidden md:block absolute bottom-12 right-margin-desktop text-right font-technical text-[10px] opacity-40">
          <div>LAT: 45.1221° N</div>
          <div>LON: 123.4567° W</div>
          <div>SIGNAL: OPTIMAL</div>
        </div>
      </div>
    </div>
  );
}
