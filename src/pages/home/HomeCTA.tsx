import { Link } from 'react-router-dom';

export default function HomeCTA() {
  return (
    <section className="relative w-full h-[70vh] min-h-[520px] flex items-center justify-center pt-12 pb-24 z-10 overflow-hidden"
      style={{
        background: 'rgba(5,10,7,0.5)',
      }}
    >

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-full bg-[radial-gradient(circle_at_center,rgba(74,94,58,0.4)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        <span className="font-label text-[10px] uppercase tracking-[0.5em] text-[var(--lords-gold)] mb-6">
          READY TO ESCAPE?
        </span>

        <h2 className="font-display text-[clamp(48px,6vw,88px)] text-white font-normal leading-[1.1] mb-10 max-w-[800px]">
          <span className="block">Your mountain retreat</span>
          <span className="block">is waiting.</span>
        </h2>

        <Link
          to="/booking"
          className="bg-[var(--lords-gold)] text-[var(--lords-mist)] font-label text-[13px] uppercase tracking-wider px-12 py-[18px] hover:bg-[var(--lords-gold-light)] font-medium transition-colors duration-300 rounded-sm mb-6"
        >
          Book Your Stay
        </Link>

        <p className="font-body text-[12px] text-white/50">
          No credit card required · Free cancellation
        </p>

      </div>
    </section>
  );
}
