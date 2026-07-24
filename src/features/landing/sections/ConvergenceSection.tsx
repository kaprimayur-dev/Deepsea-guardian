import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Waves, Eye, ShieldAlert } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ConvergenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
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
      const getTargetX = (startLeftPercent: number, node: HTMLDivElement | null) => {
        const workspace = workspaceRef.current;
        if (!workspace) return 0;
        const w = workspace.clientWidth;
        const target = w * 0.5;
        const start = w * startLeftPercent;
        const nodeWidth = node ? node.clientWidth : 0;
        return target - start - nodeWidth / 2;
      };

      const getTargetY = (startTopPercent: number, node: HTMLDivElement | null) => {
        const workspace = workspaceRef.current;
        if (!workspace) return 0;
        const h = workspace.clientHeight;
        const target = h * 0.5;
        const start = h * startTopPercent;
        const nodeHeight = node ? node.clientHeight : 0;
        return target - start - nodeHeight / 2;
      };

      // Set initial states
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
          invalidateOnRefresh: true,
        }
      });

      const statusText = document.getElementById('core-status-text');

      // Phase 1 - Signal Initialization & Noise fading
      tl.to(noiseRef.current, { opacity: 0.02, scale: 0.95, duration: 2 })
        
        // Phase 2 - Nodes Moving to Center (Convergence) calculated dynamically
        .to(nodeSatRef.current, { 
          x: () => getTargetX(0.08, nodeSatRef.current), 
          y: () => getTargetY(0.10, nodeSatRef.current), 
          scale: 0.7, 
          opacity: 0.3, 
          duration: 4 
        }, 'converge')
        .to(nodeSensRef.current, { 
          x: () => getTargetX(0.90, nodeSensRef.current), 
          y: () => getTargetY(0.15, nodeSensRef.current), 
          scale: 0.7, 
          opacity: 0.3, 
          duration: 4 
        }, 'converge')
        .to(nodeSonarRef.current, { 
          x: () => getTargetX(0.06, nodeSonarRef.current), 
          y: () => getTargetY(0.85, nodeSonarRef.current), 
          scale: 0.7, 
          opacity: 0.3, 
          duration: 4 
        }, 'converge')
        .to(nodeDroneRef.current, { 
          x: () => getTargetX(0.92, nodeDroneRef.current), 
          y: () => getTargetY(0.82, nodeDroneRef.current), 
          scale: 0.7, 
          opacity: 0.3, 
          duration: 4 
        }, 'converge')
        .to(nodeResRef.current, { 
          x: () => getTargetX(0.45, nodeResRef.current), 
          y: () => getTargetY(0.95, nodeResRef.current), 
          scale: 0.7, 
          opacity: 0.3, 
          duration: 4 
        }, 'converge')
        
        // Phase 3 & 4 - Drawing lines (dashoffset animation)
        .to([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 4
        }, 'converge')

        // Phase 5 - Core Activates & Release
        .to(coreRef.current, { scale: 1.12, borderColor: '#6fd6e0', duration: 1.8 }, 'resolve')
        .to(noiseRef.current, { opacity: 0, duration: 1 }, 'resolve')
        
        // Change status text on complete
        .call(() => {
          if (statusText) statusText.textContent = 'SYNC COMPLETE';
        }, undefined, 'resolve')
        // For reverse scrolling, set it back
        .call(() => {
          if (statusText) statusText.textContent = 'SYNC RESOLVING';
        }, undefined, 'converge')

        // Restrained single sonar/intelligence pulse
        .to(pulseRef.current, { scale: 1.1, opacity: 0.8, duration: 0.1 }, 'resolve')
        .to(pulseRef.current, { scale: 2.5, opacity: 0, duration: 1.8, ease: 'power2.out' }, 'resolve+=0.1')
        
        // ONLY THEN reveal/emphasize the headline
        .to(titleRef.current, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 'resolve+=0.4');
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-background/50">
      <div ref={viewportRef} className="relative h-screen w-full flex flex-col overflow-hidden">
        {/* Navigation Gap Safe Zone */}
        <div className="h-16 w-full shrink-0"></div>

        {/* Editorial Section Title */}
        <div ref={titleRef} className="w-full text-center px-margin-desktop shrink-0 z-10 select-none pb-4">
          <div className="flex flex-col items-center gap-2 mb-2">
            <span className="font-technical text-xs text-on-surface-variant font-bold">02</span>
            <span className="h-6 w-[1px] bg-tertiary"></span>
            <span className="font-technical text-[10px] tracking-[0.3em] text-tertiary uppercase">One Ocean</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
            ONE OCEAN. ONE INTELLIGENCE LAYER.
          </h2>
        </div>

        {/* Core & Intelligence Workspace Zone (centered in the remaining vertical space) */}
        <div ref={workspaceRef} className="relative flex-1 w-full flex items-center justify-center min-h-[350px]">
          
          {/* Noise Watermark */}
          <div ref={noiseRef} className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-1 select-none">
            <span className="font-display text-[25vw] font-black uppercase tracking-widest text-slate-800">NOISE</span>
          </div>

          {/* Sonar/Intelligence Pulse Visual Element */}
          <div ref={pulseRef} className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-tertiary/60 pointer-events-none z-15"></div>

          {/* Core Structure */}
          <div ref={coreRef} className="relative z-20 w-48 h-48 md:w-64 md:h-64 rounded-full border border-deep-teal flex items-center justify-center bg-background/95 backdrop-blur-md transition-colors duration-700">
            <div className="absolute inset-0 rounded-full border-2 border-tertiary/20 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full border border-tertiary/10 animate-[spin_25s_linear_infinite]"></div>
            <div className="text-center p-4">
              <div className="font-technical text-[8px] text-tertiary opacity-60 mb-2 tracking-[0.2em]">INTELLIGENCE_CORE</div>
              <span className="font-display text-lg md:text-xl tracking-widest text-white font-extrabold">GUARDIAN</span>
              <div id="core-status-text" className="font-technical text-[9px] text-slate-500 mt-1 tracking-widest uppercase">SYNC RESOLVING</div>
            </div>
          </div>

          {/* Fragmented Observation Sources */}
          {/* SATELLITES - Top Left */}
          <div ref={nodeSatRef} className="absolute top-[10%] left-[8%] p-3 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[8px] text-tertiary mb-1">SAT-09 / APER_RESOLVE</span>
            <span className="font-display text-base font-bold tracking-widest text-on-surface uppercase">SATELLITES</span>
          </div>

          {/* SENSORS - Top Right */}
          <div ref={nodeSensRef} className="absolute top-[15%] right-[10%] p-3 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[8px] text-tertiary mb-1">SENS-GT / THERM_GRID</span>
            <span className="font-display text-base font-bold tracking-widest text-on-surface uppercase">SENSORS</span>
          </div>

          {/* SONAR - Bottom Left */}
          <div ref={nodeSonarRef} className="absolute bottom-[15%] left-[6%] p-3 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[8px] text-on-surface-variant mb-1">SON-21 / FLOATED_SUB</span>
            <span className="font-display text-base font-bold tracking-widest text-on-surface uppercase">SONAR</span>
          </div>

          {/* DRONES - Bottom Right */}
          <div ref={nodeDroneRef} className="absolute bottom-[18%] right-[8%] p-3 border border-deep-teal/40 bg-background/50 z-10 transition-opacity">
            <span className="block font-technical text-[8px] text-on-surface-variant mb-1">AUV-04 / FLOATED_AUV</span>
            <span className="font-display text-base font-bold tracking-widest text-on-surface uppercase">DRONES</span>
          </div>

          {/* RESEARCH - Bottom Center */}
          <div ref={nodeResRef} className="absolute bottom-[5%] left-[45%] p-3 border border-deep-teal/40 bg-background/50 z-10 transition-opacity hidden md:block">
            <span className="block font-technical text-[8px] text-on-surface-variant mb-1">VESSEL-09 / STREAM</span>
            <span className="font-display text-base font-bold tracking-widest text-on-surface uppercase">RESEARCH</span>
          </div>

          {/* SVG Trajectory Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {/* Top Left -> Center (500, 300) */}
            <path
              ref={line1Ref}
              d="M 80 60 Q 300 200 500 300"
              fill="none"
              stroke="#6fd6e0"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            {/* Top Right -> Center (500, 300) */}
            <path
              ref={line2Ref}
              d="M 900 90 Q 700 200 500 300"
              fill="none"
              stroke="#6fd6e0"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            {/* Bottom Left -> Center (500, 300) */}
            <path
              ref={line3Ref}
              d="M 60 510 Q 300 450 500 300"
              fill="none"
              stroke="#6fd6e0"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            {/* Bottom Right -> Center (500, 300) */}
            <path
              ref={line4Ref}
              d="M 920 492 Q 700 450 500 300"
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
