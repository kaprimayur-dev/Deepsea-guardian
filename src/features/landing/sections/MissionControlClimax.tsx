import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionControlClimax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headlineRef.current, { opacity: 0, y: 40 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.95 });
      gsap.set(gridRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(gridRef.current, { opacity: 0.15, y: 0, duration: 1, ease: 'power2.out' })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section-gap px-margin-desktop bg-surface-container-lowest/30 backdrop-blur-xl relative border-t border-deep-teal/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-deep-teal/40 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-24">
          <div className="font-technical text-[10px] text-tertiary mb-6 tracking-[0.4em] uppercase font-bold">
            Ready for Deployment
          </div>
          
          <h2 ref={headlineRef} className="font-display text-4xl md:text-7xl font-extrabold mb-8 text-white leading-[1.1] tracking-tight uppercase">
            MISSION CONTROL FOR THE OCEAN.
          </h2>
          
          <p ref={textRef} className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-16 leading-relaxed">
            Transition from observer to operator. From fragmented observations to one operational view of the ocean.
          </p>

          <div ref={ctaRef} className="cta-container relative inline-block group">
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
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-10 grayscale hover:opacity-50 transition-all duration-1000">
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
