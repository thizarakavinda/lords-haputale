import { BadgeCheck, Gift, RotateCcw, UserCheck } from 'lucide-react';

// BookingWhyDirect displays direct booking perks cards
export default function BookingWhyDirect() {
  return (
    <section
      className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 bg-transparent"
    >
      <div className="max-w-[1280px] mx-auto">

        <h2 className="font-display text-[var(--lords-cream)] text-[clamp(28px,4vw,44px)] font-light leading-tight text-center mb-16">
          Why book directly with us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Best Rate Card */}
          <div
            className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
          >
            <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
              <BadgeCheck size={26} />
            </div>
            <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
              Best Rate Guaranteed
            </h3>
            <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
              By booking directly, you bypass third-party OTA commissions, securing the absolute lowest rates available online.
            </p>
          </div>

          {/* Welcome Gift Card */}
          <div
            className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
          >
            <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
              <Gift size={26} />
            </div>
            <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
              Welcome Gift
            </h3>
            <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
              Receive premium Ceylon tea tins and fresh fruit arrangements upon arrival at our boutique highlands sanctuary.
            </p>
          </div>

          {/* Free Cancellation Card */}
          <div
            className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
          >
            <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
              <RotateCcw size={26} />
            </div>
            <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
              Free Cancellation
            </h3>
            <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
              Plans change, and we adapt. Modify or cancel your reservation request without penalty up to 7 days before check-in.
            </p>
          </div>

          {/* Personal Service Card */}
          <div
            className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
          >
            <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
              <UserCheck size={26} />
            </div>
            <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
              Personal Service
            </h3>
            <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
              Contact our local hosts directly. Tailor excursions, dietary requests, and tea estates transfers instantly.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
