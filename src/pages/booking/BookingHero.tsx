import { CheckCircle } from 'lucide-react';

// BookingHero displays the page headline and trust badges (guarantees)
export default function BookingHero() {
  return (
    <section 
      className="relative h-[35vh] min-h-[280px] flex items-center justify-center pt-20 overflow-hidden bg-transparent"
      style={{
        background: 'radial-gradient(circle at center, rgba(13, 26, 18, 0.45) 0%, rgba(5, 10, 7, 0.6) 100%)'
      }}
    >
      {/* Fine Star Grid Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--lords-gold)_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold-light)] block mb-2 font-medium">
          RESERVATIONS
        </span>
        <h1 className="font-display text-[var(--lords-cream)] text-[clamp(28px,4.5vw,48px)] leading-tight uppercase font-normal mb-2">
          Book Your Stay
        </h1>
        <p className="font-body text-xs md:text-sm text-[var(--lords-smoke)]/80">
          No payment required · Confirmation within 24 hours
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-6">
          <span className="font-label text-[10px] md:text-xs text-white/95 flex items-center gap-2 tracking-wider">
            <CheckCircle size={13} className="text-[var(--lords-gold-light)]" /> Best Rate Guaranteed
          </span>
          <span className="font-label text-[10px] md:text-xs text-white/95 flex items-center gap-2 tracking-wider">
            <CheckCircle size={13} className="text-[var(--lords-gold-light)]" /> Free Cancellation
          </span>
          <span className="font-label text-[10px] md:text-xs text-white/95 flex items-center gap-2 tracking-wider">
            <CheckCircle size={13} className="text-[var(--lords-gold-light)]" /> 24hr Quick Confirm
          </span>
        </div>
      </div>
    </section>
  );
}
