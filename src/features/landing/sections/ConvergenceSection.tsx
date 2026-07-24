import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Waves, Eye, ShieldAlert } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ConvergenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const line3Ref = useRef<SVGPathElement>(null);
  const line4Ref = useRef<SVGPathElement>(null);

  // Nodes refs
  const nodeSatRef = useRef<HTMLDivElement>(null);
  const nodeSensRef = useRef<HTMLDivElement>(null);
  const nodeSonarRef = useRef<HTMLDivElement>(null);
  const nodeDroneRef = useRef<HTMLDivElement>(null);
  const nodeResRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Set initial state before scrolling
      gsap.set(titleRef.current, { opacity: 0, y: 25 });
      gsap.set(pulseRef.current, { scale: 0.8, opacity: 0 });

      // Create scrub timeline tied to scroll pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: viewportRef.current,
          anticipatePin: 1,
        }
      });

      // Phase 1 - Signal Initialization & Noise fading
      tl.to(noiseRef.current, { opacity: 0.02, scale: 0.9, duration: 2 })
        
        // Phase 2 - Nodes Moving to Center (Convergence)
        .to(nodeSatRef.current, { x: '25vw', y: '25vh', scale: 0.7, opacity: 0.5, duration: 4 }, 'converge')
        .to(nodeSensRef.current, { x: '-20vw', y: '20vh', scale: 0.7, opacity: 0.5, duration: 4 }, 'converge')
        .to(nodeSonarRef.current, { x: '-25vw', y: '-25vh', scale: 0.7, opacity: 0.5, duration: 4 }, 'converge')
        .to(nodeDroneRef.current, { x: '20vw', y: '-20vh', scale: 0.7, opacity: 0.5, duration: 4 }, 'converge')
        .to(nodeResRef.current, { x: '0vw', y: '-30vh', scale: 0.7, opacity: 0.5, duration: 4 }, 'converge')
        
        // Phase 3 & 4 - Drawing lines (dashoffset animation)
        .to([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], {
          strokeDashoffset: 0,
          opacity: 0.8,
          duration: 4
        }, 'converge')

        // Phase 5 - Core Activates & Release
        .to(coreRef.current, { scale: 1.15, borderColor: '#6fd6e0', duration: 2 }, 'resolve')
        .to(noiseRef.current, { opacity: 0, duration: 1 }, 'resolve')
        
        // Sonar/Intelligence pulse
        .to(pulseRef.current, { scale: 1.1, opacity: 0.8, duration: 0.1 }, 'resolve')
        .to(pulseRef.current, { scale: 2.8, opacity: 0, duration: 2, ease: 'power2.out' }, 'resolve+=0.1')
        
        // ONLY THEN reveal/emphasize the headline
        .to(titleRef.current, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 'resolve+=0.5');
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-background/50">
      <div ref={viewportRef} className="relative h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Editorial Section Title */}
        <div ref={titleRef} className="absolute top-20 left-0 w-full text-center z-10 px-margin-desktop">
          <div className="flex flex-col items-center gap-4 mb-4">
            <span className="font-technical text-sm text-on-surface-variant font-bold">02</span>
            <span className="h-10 w-[1px] bg-tertiary"></span>
            <span className="font-technical text-xs tracking-[0.3em] text-tertiary uppercase">One Ocean</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            ONE OCEAN. ONE INTELLIGENCE LAYER.
          </h2>
        </div>

        {/* Central Map Workspace Canvas Area */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          
          {/* Noise Watermark */}
          <div ref={noiseRef} className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-1 select-none">
            <span className="font-display text-[25vw] font-black uppercase tracking-widest text-slate-700">NOISE</span>
          </div>

          {/* Sonar/Intelligence Pulse Visual Element */}
          <div ref={pulseRef} className="absolute w-64 h-64 rounded-full border border-tertiary/60 pointer-events-none z-15"></div>

          {/* Core Structure */}
          <div ref={coreRef} className="relative z-20 w-64 h-64 rounded-full border border-deep-teal flex items-center justify-center bg-background/90 backdrop-blur-md transition-colors duration-700">
            <div className="absolute inset-0 rounded-full border-2 border-tertiary/20 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full border border-tertiary/10 animate-[spin_25s_linear_infinite]"></div>
            <div className="text-center p-6">
              <div className="font-technical text-[8px] text-tertiary opacity-60 mb-2 tracking-[0.2em]">INTELLIGENCE_CORE</div>
              <span className="font-display text-xl tracking-widest text-white font-extrabold">GUARDIAN</span>
              <div className="font-technical text-[9px] text-slate-500 mt-1 tracking-widest uppercase">Sync Resolving</div>
            </div>
          </div>

          {/* Fragmented Observation Sources */}
          {/* SATELLITES - Top Left */}
          <div ref={nodeSatRef} className="absolute top-[12%] left-[10%] p-4 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[9px] text-tertiary mb-1">SAT-09 / APER_RESOLVE</span>
            <span className="font-display text-lg font-bold tracking-widest text-on-surface uppercase">SATELLITES</span>
          </div>

          {/* SENSORS - Top Right */}
          <div ref={nodeSensRef} className="absolute top-[18%] right-[12%] p-4 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[9px] text-tertiary mb-1">SENS-GT / THERM_GRID</span>
            <span className="font-display text-lg font-bold tracking-widest text-on-surface uppercase">SENSORS</span>
          </div>

          {/* SONAR - Bottom Left */}
          <div ref={nodeSonarRef} className="absolute bottom-[16%] left-[8%] p-4 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[9px] text-on-surface-variant mb-1">SON-21 / FLOATED_SUB</span>
            <span className="font-display text-lg font-bold tracking-widest text-on-surface uppercase">SONAR</span>
          </div>

          {/* DRONES - Bottom Right */}
          <div ref={nodeDroneRef} className="absolute bottom-[22%] right-[10%] p-4 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[9px] text-on-surface-variant mb-1">AUV-04 / FLOATED_AUV</span>
            <span className="font-display text-lg font-bold tracking-widest text-on-surface uppercase">DRONES</span>
          </div>

          {/* RESEARCH - Bottom Center */}
          <div ref={nodeResRef} className="absolute bottom-[8%] left-[45%] p-4 border border-deep-teal/40 bg-background/50 z-10 transition-opacity hidden md:block">
            <span className="block font-technical text-[9px] text-on-surface-variant mb-1">VESSEL-09 / STREAM</span>
            <span className="font-display text-lg font-bold tracking-widest text-on-surface uppercase">RESEARCH</span>
          </div>

          {/* SVG Trajectory Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30" viewBox="0 0 1000 800" preserveAspectRatio="none">
            {/* Top Left -> Center */}
            <path
              ref={line1Ref}
              d="M 200 200 Q 500 250 500 400"
              fill="none"
              stroke="#6fd6e0"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            {/* Top Right -> Center */}
            <path
              ref={line2Ref}
              d="M 800 240 Q 500 300 500 400"
              fill="none"
              stroke="#6fd6e0"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            {/* Bottom Left -> Center */}
            <path
              ref={line3Ref}
              d="M 180 620 Q 500 550 500 400"
              fill="none"
              stroke="#6fd6e0"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            {/* Bottom Right -> Center */}
            <path
              ref={line4Ref}
              d="M 800 580 Q 500 500 500 400"
              fill="none"
              stroke="#6fd6e0"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
          </svg>

          {/* Interactive Intelligence Layers floating indicators */}
          <div className="absolute top-[25%] left-[28%] flex items-center gap-2 group cursor-pointer hover:text-tertiary transition-colors z-30">
            <Waves size={16} className="text-tertiary" />
            <span className="font-technical text-xs tracking-wider uppercase text-on-surface group-hover:text-tertiary">Current Velocity</span>
          </div>
          <div className="absolute top-[30%] right-[24%] flex items-center gap-2 group cursor-pointer hover:text-tertiary transition-colors z-30">
            <Eye size={16} className="text-tertiary" />
            <span className="font-technical text-xs tracking-wider uppercase text-on-surface group-hover:text-tertiary">Satellite Overlay</span>
          </div>
          <div className="absolute bottom-[28%] left-[22%] flex items-center gap-2 group cursor-pointer hover:text-tertiary transition-colors z-30">
            <ShieldAlert size={16} className="text-tertiary" />
            <span className="font-technical text-xs tracking-wider uppercase text-on-surface group-hover:text-tertiary">Threat Corridors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
