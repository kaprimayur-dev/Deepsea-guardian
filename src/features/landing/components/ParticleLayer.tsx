import { useEffect, useRef } from 'react';

export default function ParticleLayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const particleCount = 40;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      
      const size = Math.random() * 2 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const driftX = (Math.random() - 0.5) * 50;
      const driftY = (Math.random() - 0.5) * 50;
      const duration = 5 + Math.random() * 10;
      const delay = Math.random() * 5;

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${x}%`;
      p.style.top = `${y}%`;
      p.style.setProperty('--x', `${driftX}px`);
      p.style.setProperty('--y', `${driftY}px`);
      p.style.setProperty('--duration', `${duration}s`);
      p.style.animationDelay = `${delay}s`;
      
      container.appendChild(p);
      particles.push(p);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      container.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-1 pointer-events-none" id="particle-container" />;
}
