import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BiodiversitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Parallax scroll for the cinematic background image
      gsap.fromTo(bgImageRef.current, 
        { yPercent: -8, scale: 1.05 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          yPercent: 8,
          ease: 'none',
        }
      );

      // Restrained text content fade-in
      gsap.fromTo(textContainerRef.current,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }
      );

      // Subtle metadata reveal
      gsap.fromTo(metadataRef.current,
        { opacity: 0, x: -10 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0.35,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="biodiversity" className="relative py-section-gap px-margin-desktop overflow-hidden min-h-[700px] flex items-center border-b border-deep-teal/20">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={bgImageRef}
          className="w-full h-[120%] absolute -top-[10%] left-0 bg-cover bg-center opacity-25 mix-blend-screen" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div ref={textContainerRef} className="relative z-10 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="w-24 h-[1px] bg-tertiary"></span>
          <span className="font-technical text-sm tracking-widest text-tertiary uppercase">Biodiversity Monitoring</span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-12 text-white leading-tight">
          WE DON'T ONLY MONITOR THREATS. WE MONITOR WHAT WE'RE PROTECTING.
        </h2>

        {/* Technical Data dossiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-lg font-technical text-xs tracking-widest uppercase">
          <div className="border-t border-deep-teal/40 pt-4 relative group">
            <div className="absolute -top-[1px] left-0 w-8 h-[1px] bg-tertiary transition-all group-hover:w-full duration-500"></div>
            <div className="text-tertiary mb-1 font-bold">MIGRATION / ACTIVE</div>
            <div className="text-4xl font-extrabold font-display text-white">
              1,248 <span className="text-xs opacity-40 font-technical">TRACKS</span>
            </div>
          </div>
          <div className="border-t border-deep-teal/40 pt-4 relative group">
            <div className="absolute -top-[1px] left-0 w-8 h-[1px] bg-tertiary transition-all group-hover:w-full duration-500"></div>
            <div className="text-tertiary mb-1 font-bold">SPECIES / INDEXED</div>
            <div className="text-4xl font-extrabold font-display text-white">
              4.8M <span className="text-xs opacity-40 font-technical">PTS</span>
            </div>
          </div>
        </div>

        {/* Scattered Scientific Labels */}
        <div ref={metadataRef} className="mt-20 font-technical text-[8px] opacity-35 tracking-[0.5em] space-y-2 uppercase text-slate-400">
          <div>// BIO_TELEMETRY: NOMINAL</div>
          <div>// ACOUSTIC_SIGNATURE: WHALE_BLUE_A1</div>
          <div>// HEART_RATE: 12 BPM</div>
        </div>
      </div>
    </section>
  );
}
