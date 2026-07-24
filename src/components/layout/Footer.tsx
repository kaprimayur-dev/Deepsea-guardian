export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-20 px-margin-desktop grid grid-cols-12 gap-gutter border-t border-deep-teal/30 bg-background/80 backdrop-blur-md">
      <div className="col-span-12 md:col-span-4 mb-12 md:mb-0">
        <div className="font-technical text-deep-teal mb-4 tracking-tighter text-2xl font-extrabold uppercase">
          DEEPSEA GUARDIAN
        </div>
        <p className="font-technical text-xs tracking-wider text-on-secondary-container max-w-xs">
          Empowering the global scientific community through unified sub-surface intelligence. Built for the deep.
        </p>
      </div>
      <div className="col-span-6 md:col-span-2 space-y-4 font-technical text-xs uppercase tracking-widest">
        <a className="block text-on-secondary-container hover:text-tertiary transition-all" href="#">TERMINAL</a>
        <a className="block text-on-secondary-container hover:text-tertiary transition-all" href="#">COORDINATES</a>
        <a className="block text-on-secondary-container hover:text-tertiary transition-all" href="#">BATHYMETRY</a>
      </div>
      <div className="col-span-6 md:col-span-2 space-y-4 font-technical text-xs uppercase tracking-widest">
        <a className="block text-on-secondary-container hover:text-tertiary transition-all" href="#">ENCRYPTION</a>
        <a className="block text-on-secondary-container hover:text-tertiary transition-all" href="#">PROTOCOL</a>
        <a className="block text-on-secondary-container hover:text-tertiary transition-all" href="#">ARCHIVE</a>
      </div>
      <div className="col-span-12 md:col-span-4 mt-12 md:mt-0 md:text-right flex flex-col justify-between">
        <div className="font-technical text-xs text-on-surface-variant uppercase tracking-widest">
          SYSTEM_VERSION: 5.1.0-ABYSS
        </div>
        <div className="font-technical text-xs uppercase tracking-widest text-on-secondary-container">
          © 2026 DEEPSEA GUARDIAN // OPERATIONAL CORE
        </div>
      </div>
    </footer>
  );
}
