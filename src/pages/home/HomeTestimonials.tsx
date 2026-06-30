import { useRef } from 'react';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "An absolute dream. Waking up to mist rolling over the mountains while having breakfast was the highlight of our Sri Lanka trip.",
    guest: "Sarah & James",
    origin: "United Kingdom",
    rating: 5,
  },
  {
    id: 2,
    quote: "The attention to detail here is incredible. It feels more like a private luxury home than a hotel. Staff anticipated our every need.",
    guest: "Michael T.",
    origin: "Australia",
    rating: 5,
  },
  {
    id: 3,
    quote: "A perfect sanctuary after hiking Horton Plains. The room design is stunning and the bed was incredibly comfortable.",
    guest: "Elena R.",
    origin: "Germany",
    rating: 5,
  },
  {
    id: 4,
    quote: "We only booked for one night but ended up staying for three. Views, food, and the peaceful atmosphere are unmatched in Haputale.",
    guest: "David Chen",
    origin: "Singapore",
    rating: 5,
  },
  {
    id: 5,
    quote: "Truly the most memorable stay of our honeymoon. Every moment felt like a postcard — we cannot wait to return.",
    guest: "Priya & Rajan",
    origin: "India",
    rating: 5,
  },
  {
    id: 6,
    quote: "The infinity-view breakfast terrace alone is worth the trip. Lord's Haputale redefines boutique luxury in Sri Lanka.",
    guest: "Thomas W.",
    origin: "Canada",
    rating: 5,
  },
];

const StarRow = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--lords-gold)" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ))}
  </div>
);

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="shrink-0 w-[340px] md:w-[400px] flex flex-col justify-between px-8 py-8 mx-3"
      style={{
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(168, 197, 160, 0.45)',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(74, 103, 65, 0.10)',
      }}
    >
      {/* Big decorative quote */}
      <span
        className="font-display leading-none select-none"
        style={{ fontSize: '72px', color: 'var(--lords-gold)', opacity: 0.18, lineHeight: 1 }}
        aria-hidden
      >
        "
      </span>

      <p
        className="font-body text-[15px] leading-[1.85] -mt-3"
        style={{ color: 'var(--lords-charcoal)' }}
      >
        {t.quote}
      </p>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <StarRow count={t.rating} />
          <p className="font-body font-medium text-[14px] mt-2" style={{ color: 'var(--lords-cream)' }}>
            {t.guest}
          </p>
          <p className="font-label text-[10px] uppercase tracking-[0.3em] mt-0.5" style={{ color: 'var(--lords-muted)' }}>
            {t.origin}
          </p>
        </div>

        {/* Rating badge */}
        <div
          className="flex flex-col items-center justify-center w-12 h-12"
          style={{ border: '1px solid rgba(168, 197, 160, 0.45)', background: 'rgba(74, 103, 65, 0.06)' }}
        >
          <span className="font-display text-[18px] leading-none" style={{ color: 'var(--lords-gold)' }}>5</span>
          <span className="font-label text-[7px] tracking-widest" style={{ color: 'var(--lords-muted)' }}>/ 5</span>
        </div>
      </div>
    </div>
  );
}

export default function HomeTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Double the array so the CSS seamless loop works
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials, ...testimonials];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-[120px] relative z-10 overflow-hidden"
      style={{
        background: 'rgba(240, 244, 239, 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 mb-14">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.45em] block mb-3" style={{ color: 'var(--lords-gold)' }}>
              GUEST REVIEWS
            </span>
            <h2
              className="font-display leading-tight"
              style={{ fontSize: 'var(--text-h1)', color: 'var(--lords-cream)' }}
            >
              What our guests say
            </h2>
          </div>

          {/* Aggregate rating badge */}
          <div
            className="flex items-center gap-4 px-6 py-4 shrink-0"
            style={{ border: '1px solid rgba(168, 197, 160, 0.45)', background: 'rgba(240, 244, 239, 0.6)' }}
          >
            <div>
              <span className="font-display text-[38px] leading-none" style={{ color: 'var(--lords-gold)' }}>5.0</span>
              <p className="font-label text-[9px] uppercase tracking-widest mt-1" style={{ color: 'var(--lords-muted)' }}>Average Rating</p>
            </div>
            <div className="h-12 w-px" style={{ background: 'rgba(168, 197, 160, 0.45)' }} />
            <div>
              <StarRow count={5} />
              <p className="font-label text-[9px] uppercase tracking-widest mt-1.5" style={{ color: 'var(--lords-muted)' }}>
                {testimonials.length * 12}+ Reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 1: scroll left ── */}
      <div className="relative mb-5 overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgb(240,244,239), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgb(240,244,239), transparent)' }}
        />

        <div
          className="flex"
          style={{
            animation: 'scroll-left 38s linear infinite',
            width: 'max-content',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
        >
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* ── Row 2: scroll right ── */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgb(240,244,239), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgb(240,244,239), transparent)' }}
        />

        <div
          className="flex"
          style={{
            animation: 'scroll-right 42s linear infinite',
            width: 'max-content',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
        >
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

    </section>
  );
}
