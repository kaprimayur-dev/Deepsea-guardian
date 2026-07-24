import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreatSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const marker1Ref = useRef<HTMLDivElement>(null);
  const marker2Ref = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headlineRef.current, { opacity: 0, y: 30 });
      gsap.set(card1Ref.current, { opacity: 0, x: -30 });
      gsap.set(card2Ref.current, { opacity: 0, x: -30 });
      gsap.set(mapContainerRef.current, { opacity: 0.2, scale: 0.98 });
      gsap.set(marker1Ref.current, { opacity: 0, scale: 0.8 });
      gsap.set(marker2Ref.current, { opacity: 0, scale: 0.8 });
      gsap.set(scanLineRef.current, { y: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        // Map resolves
        .to(mapContainerRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        // One-shot scan sweep event
        .to(scanLineRef.current, { opacity: 0.6, duration: 0.1 })
        .to(scanLineRef.current, { y: 600, opacity: 0, duration: 1.2, ease: 'power1.inOut' })
        // First card and marker resolves
        .to(card1Ref.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to(marker1Ref.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }, '-=0.4')
        // Second card and marker resolves
        .to(card2Ref.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to(marker2Ref.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="threats" className="py-section-gap px-margin-desktop grid grid-cols-12 gap-gutter border-b border-deep-teal/20">
      
      {/* Left Column: Alerts list */}
      <div className="col-span-12 md:col-span-5 mb-12 md:mb-0">
        <h2 ref={headlineRef} className="font-display text-3xl md:text-5xl font-extrabold mb-8 leading-tight text-white uppercase select-none">
          SEE THE THREATS BEFORE THEY BECOME DAMAGE.
        </h2>
        
        <div className="space-y-6">
          {/* Ghost Net Card */}
          <div ref={card1Ref} className="p-6 border border-deep-teal/40 bg-surface-dim/20 backdrop-blur-sm border-l-2 border-l-status-critical relative overflow-hidden group">
            <div className="absolute top-2 right-4 font-technical text-[8px] opacity-25 tracking-widest group-hover:opacity-100 transition-opacity uppercase text-slate-400">
              MARINE EVENT / DS-2048
            </div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-technical text-xs text-status-critical flex items-center gap-2 font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-status-critical animate-pulse"></span>
                CRITICAL ALERT
              </span>
              <span className="font-technical text-xs opacity-40">21:04 UTC</span>
            </div>
            <div className="font-display text-xl mb-2 font-bold text-white tracking-wide">
              GHOST NET DETECTION
            </div>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              High-probability detection of derelict fishing gear drifting in protected corridor 07-B. Response required.
            </p>
            <div className="mt-4 flex gap-6 font-technical text-[10px] uppercase opacity-60 text-tertiary">
              <span>CONFIDENCE: 94%</span>
              <span>THREAT: HIGH</span>
            </div>
          </div>

          {/* Thermal Anomaly Card */}
          <div ref={card2Ref} className="p-6 border border-deep-teal/40 bg-surface-dim/20 backdrop-blur-sm border-l-2 border-l-status-warning relative overflow-hidden group">
            <div className="absolute top-2 right-4 font-technical text-[8px] opacity-25 tracking-widest group-hover:opacity-100 transition-opacity uppercase text-slate-400">
              MARINE EVENT / DS-2049
            </div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-technical text-xs text-status-warning flex items-center gap-2 font-bold tracking-wider">
                <AlertTriangle size={12} className="text-status-warning" />
                WARNING
              </span>
              <span className="font-technical text-xs opacity-40">18:12 UTC</span>
            </div>
            <div className="font-display text-xl mb-2 font-bold text-white tracking-wide">
              THERMAL ANOMALY
            </div>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Thermal stress levels reaching critical thresholds near coral reef shelf. Bleaching probability increasing.
            </p>
            <div className="mt-4 flex gap-6 font-technical text-[10px] uppercase opacity-60 text-tertiary">
              <span>SENSITIVITY: 0.82</span>
              <span>TREND: RISING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Tactical Live Map Preview */}
      <div ref={mapContainerRef} className="col-span-12 md:col-start-7 md:col-span-6 h-[500px] md:h-[600px] relative overflow-hidden glass-etch group bg-surface-dim/30">
        <div 
          className="w-full h-full bg-cover bg-center grayscale opacity-40 group-hover:opacity-75 transition-all duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-background/50 pointer-events-none"></div>
        <div className="absolute top-4 left-4 font-technical text-[10px] text-tertiary opacity-60 uppercase tracking-widest">
          Live_Feed_Resolve: Delta-Quadrant
        </div>

        {/* Scan sweep line overlay */}
        <div ref={scanLineRef} className="absolute left-0 w-full h-[2px] bg-tertiary opacity-0 z-20 pointer-events-none"></div>
        
        {/* Floating Map Annotations */}
        <div ref={marker1Ref} className="absolute top-[25%] left-[20%] z-20">
          <div className="w-2.5 h-2.5 bg-status-critical rounded-full animate-ping mb-2"></div>
          <div className="p-3 bg-background/95 border border-deep-teal font-technical text-[10px] tracking-wider text-slate-300 backdrop-blur-md">
            <div>LOC: 12.049N 65.211W</div>
            <div>OBJ: DRFT_NET_01</div>
            <div>VEL: 1.2 KN</div>
          </div>
        </div>

        <div ref={marker2Ref} className="absolute bottom-[30%] right-[25%] z-20">
          <div className="w-2.5 h-2.5 bg-status-warning rounded-full animate-ping mb-2"></div>
          <div className="p-3 bg-background/95 border border-deep-teal font-technical text-[10px] tracking-wider text-slate-300 backdrop-blur-md">
            <div>TEMP: +2.1C</div>
            <div>DELTA: CRIT</div>
            <div>ZONE: CORAL_A</div>
          </div>
        </div>

        {/* Technical Grid annotations */}
        <div className="absolute bottom-4 right-4 font-technical text-[9px] opacity-35 text-right uppercase">
          <div>Grid Sector: DS-07</div>
          <div>Radar Resolving: 94.8%</div>
        </div>
      </div>

    </section>
  );
}
