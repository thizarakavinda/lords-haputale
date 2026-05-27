import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    id: 1,
    quote: "An absolute dream. Waking up to the mist rolling over the mountains while having breakfast was the highlight of our trip to Sri Lanka.",
    guest: "Sarah & James, UK",
    offset: "md:mt-0"
  },
  {
    id: 2,
    quote: "The attention to detail here is incredible. It feels more like a private luxury home than a hotel. The staff anticipated our every need.",
    guest: "Michael T., Australia",
    offset: "md:mt-10"
  },
  {
    id: 3,
    quote: "A perfect sanctuary after a long day hiking Horton Plains. The room design is stunning and the bed was incredibly comfortable.",
    guest: "Elena R., Germany",
    offset: "md:mt-5"
  },
  {
    id: 4,
    quote: "We only booked for one night but ended up staying for three. The views, the food, and the peaceful atmosphere are unmatched in Haputale.",
    guest: "David Chen, Singapore",
    offset: "md:mt-16"
  }
];

export default function HomeTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[var(--lords-fog)] py-24 md:py-[120px] px-6 md:px-20 relative z-10"
      style={{ clipPath: 'polygon(0 3%, 100% 0%, 100% 97%, 0% 100%)', marginTop: '-3vw', marginBottom: '-3vw' }}
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 max-w-2xl">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)] block mb-4">
            TESTIMONIALS
          </span>
          <h2 className="font-display text-[var(--text-h2)] text-[var(--lords-charcoal)] leading-tight">
            What our guests say
          </h2>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test, index) => (
            <div 
              key={test.id}
              ref={el => { cardsRef.current[index] = el; }}
              className={`glass-panel p-8 rounded-lg border-t-[3px] border-[var(--lords-gold)] relative ${test.offset}`}
            >
              <span className="absolute top-4 left-6 font-display text-[80px] text-[var(--lords-gold)] opacity-15 leading-none select-none">
                "
              </span>
              
              <div className="relative z-10 mt-6">
                <p className="font-quote italic text-[16px] text-[var(--lords-smoke)] leading-[1.8] mb-8">
                  {test.quote}
                </p>
                
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 text-[var(--lords-gold)]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-body font-medium text-[14px] text-[var(--lords-charcoal)]">
                    {test.guest}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
