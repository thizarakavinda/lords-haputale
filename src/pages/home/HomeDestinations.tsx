import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { destinationsData } from '../../data/destinationsData';

export default function HomeDestinations() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-[120px] px-6 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)] block mb-4">
            EXPLORE NEARBY
          </span>
          <h2 className="font-display text-[var(--text-h1)] text-[var(--lords-charcoal)] leading-tight mb-6">
            Top Destinations
          </h2>
          <p className="font-body text-[16px] text-[var(--lords-smoke)] max-w-[500px] mx-auto">
            Lord's Haputale sits at the gateway to Sri Lanka's most spectacular highlands.
          </p>
        </div>

        {/* CSS GRID MOSAIC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {destinationsData.map((dest, index) => {
            
            // Determine sizing classes based on design specs
            let sizeClass = 'col-span-1 h-[320px]';
            if (index === 0 || index === 4) {
              sizeClass = 'md:col-span-2 h-[320px] md:h-[400px]';
            } else if (index === 3) {
               // wait the spec said:
               // Row 1: [Large] [Small] -> meaning 2 cols, 1 col (index 0, 1)
               // Row 2: [Small] [Large] -> meaning 1 col, 2 cols (index 2, 3)
               // Let's adjust to match
            }
            
            // Let's manually set classes based on the index to exactly match 
            // Row 1: Large (0), Small (1)
            // Row 2: Small (2), Large (3)
            // Row 3: Large (4), Small (5)  (assuming repeating pattern for 6 items)
            if (index === 0 || index === 3 || index === 4) {
              sizeClass = 'md:col-span-2 h-[320px] md:h-[400px]';
            } else {
              sizeClass = 'md:col-span-1 h-[320px] md:h-[400px]';
            }

            return (
              <div 
                key={dest.id}
                ref={el => { cardsRef.current[index] = el; }}
                className={`${sizeClass} relative rounded-lg overflow-hidden group cursor-pointer`}
              >
                {/* IMAGE PLACEHOLDER */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105 image-placeholder"
                  data-image-name={`[REPLACE: ${dest.image.split('/').pop()}]`}
                />
                
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="font-serif text-[22px] text-white mb-3">
                    {dest.name}
                  </h3>
                  <div className="flex gap-2">
                    <span className="bg-[rgba(196,146,42,0.9)] text-white font-label text-[10px] uppercase tracking-wider px-3 py-1">
                      {dest.distance}
                    </span>
                    <span className="bg-[rgba(26,26,26,0.6)] backdrop-blur-md text-white font-label text-[10px] uppercase tracking-wider px-3 py-1">
                      {dest.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
