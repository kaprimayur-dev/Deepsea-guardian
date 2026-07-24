import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FragmentationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const nodesWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(nodesWrapperRef.current,
        { opacity: 0, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section-gap px-margin-desktop grid grid-cols-12 gap-gutter relative border-b border-deep-teal/20">
      <div ref={headerRef} className="col-span-12 md:col-span-6 mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-technical text-sm text-on-surface-variant font-bold">01</span>
          <span className="w-24 h-[1px] bg-deep-teal"></span>
          <span className="font-technical text-xs tracking-widest text-tertiary uppercase">Fragmented Intelligence</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl leading-tight font-bold max-w-md text-on-surface">
          OCEAN DATA IS EVERYWHERE. OCEAN INTELLIGENCE ISN'T.
        </h2>
        <div className="mt-8 font-technical text-[10px] opacity-20 tracking-widest">QUERY_STATUS: PARSING_DATA_NODES...</div>
      </div>

      {/* Asymmetric Data Nodes Wrapper */}
      <div ref={nodesWrapperRef} className="col-span-12 relative min-h-[600px] border border-deep-teal/20 glass-etch bg-surface-dim/10 backdrop-blur-sm overflow-hidden">
        <div className="scanline z-20"></div>

        {/* SATELLITES */}
        <div className="absolute top-[10%] left-[5%] md:left-[15%] p-4 border-l border-t border-deep-teal z-30">
          <span className="block font-technical text-[10px] text-tertiary mb-1">SAT-09 / SATELLITE_ARRAY</span>
          <span className="font-display text-2xl font-bold tracking-widest text-on-surface uppercase">SATELLITES</span>
          <div className="mt-2 w-16 h-[1px] bg-deep-teal"></div>
        </div>

        {/* SENSORS */}
        <div className="absolute top-[20%] right-[5%] md:right-[30%] p-4 border-r border-b border-deep-teal/40 z-30">
          <span className="block font-technical text-[10px] text-tertiary mb-1">SENS-GT / THERMAL_GRID</span>
          <span className="font-display text-2xl font-bold tracking-widest text-on-surface uppercase">SENSORS</span>
        </div>

        {/* SONAR */}
        <div className="absolute top-[45%] right-[2%] md:right-[10%] p-4 text-right z-30">
          <span className="block font-technical text-[10px] text-on-surface-variant mb-1">SONAR-21 / HYDROPHONE_SUB</span>
          <span className="font-display text-2xl font-bold tracking-widest text-on-surface uppercase">SONAR</span>
          <div className="mt-2 ml-auto w-12 h-[1px] bg-status-warning"></div>
        </div>

        {/* DRONES */}
        <div className="absolute bottom-[20%] left-[8%] md:left-[25%] p-4 z-30">
          <span className="block font-technical text-[10px] text-on-surface-variant mb-1">AUV-04 / DEPLOYMENT_09</span>
          <span className="font-display text-2xl font-bold tracking-widest text-on-surface uppercase">DRONES</span>
        </div>

        {/* RESEARCH */}
        <div className="absolute bottom-[10%] right-[10%] md:right-[20%] p-4 border border-deep-teal/30 z-30">
          <span className="block font-technical text-[10px] text-on-surface-variant mb-1">LOG-V99 / VESSEL_STREAM</span>
          <span className="font-display text-2xl font-bold tracking-widest text-on-surface uppercase">RESEARCH</span>
        </div>

        {/* Center Noise Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-10 select-none">
          <span className="font-display text-[15vw] md:text-[25vw] font-extrabold uppercase tracking-widest">NOISE</span>
        </div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 grid-rows-6 md:grid-rows-12 opacity-10 pointer-events-none">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-deep-teal/30"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
