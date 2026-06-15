import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero component representing the architectural viewport and overlay text reveals
export default function AboutHero() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the central arch container
      if (heroImageContainerRef.current) {
        gsap.fromTo(
          heroImageContainerRef.current,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
            scale: 0.98,
            opacity: 0
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      // Word reveal animations (sliding from sides)
      if (wordRefs.current[0]) {
        gsap.fromTo(wordRefs.current[0],
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.6, ease: 'power4.out', delay: 0.8 }
        );
      }
      if (wordRefs.current[1]) {
        gsap.fromTo(wordRefs.current[1],
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.6, ease: 'power4.out', delay: 1.0 }
        );
      }

      // Parallax scroll effect on the main hero image
      if (heroImageRef.current && heroImageContainerRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroSectionRef}
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Core Content Container */}
      <div className="relative w-full max-w-[1440px] mx-auto min-h-[80vh] flex flex-col justify-center items-center px-6">
        
        {/* Breadcrumbs - Top Left */}
        <div className="absolute top-8 left-6 md:left-16 lg:left-24 z-25">
          <span className="font-label text-[9px] uppercase tracking-[0.45em] text-[var(--lords-muted)]">
            Home / About Us
          </span>
        </div>

        {/* Latitude & Longitude stats - Top Right */}
        <div className="absolute top-8 right-6 md:right-16 lg:right-24 z-25 text-right flex flex-col items-end gap-1">
          <span className="font-label text-[9px] uppercase tracking-[0.45em] text-[var(--lords-gold)]">
            9.0298° N, 80.9575° E
          </span>
          <span className="font-label text-[8px] uppercase tracking-[0.3em] text-[var(--lords-muted)]">
            Altitude 1,430M
          </span>
        </div>

        {/* Tagline Block - Bottom Left */}
        <div className="absolute bottom-8 left-6 md:left-16 lg:left-24 z-25 max-w-[320px] text-left">
          <div className="w-8 h-[1px] bg-[var(--lords-gold)] mb-4" />
          <p className="font-quote italic text-sm md:text-[15px] text-[var(--lords-smoke)] leading-relaxed">
            Step into luxury at Lord's Haputale, where modern elegance meets misty mountain charm.
          </p>
        </div>

        {/* Architectural Subtitle stamp - Bottom Right */}
        <div className="absolute bottom-8 right-6 md:right-16 lg:right-24 z-25 text-right">
          <span className="font-label text-[8px] uppercase tracking-[0.35em] text-[var(--lords-muted)] block">
            LORD'S HAPUTALE
          </span>
          <span className="font-label text-[7px] uppercase tracking-[0.25em] text-[var(--lords-gold)] mt-0.5 block">
            PORTRAIT VIEWPORT · EST. 2023
          </span>
        </div>

        {/* CENTERPIECE: Architectural Archway Portal */}
        <div 
          ref={heroImageContainerRef}
          className="relative w-[75%] sm:w-[45%] md:w-[35%] aspect-[3/4.5] md:h-[65vh] md:max-h-[580px] overflow-hidden rounded-t-full border border-[var(--lords-gold)]/20 shadow-[0_30px_70px_rgba(0,0,0,0.85)] z-10 bg-[var(--lords-stone)]/20"
        >
          <img 
            ref={heroImageRef}
            src="/images/about/hero.webp" 
            alt="Lord's Haputale aerial view through viewport" 
            className="w-full h-[100%] object-cover absolute -top-[10%]"
          />
          {/* Embedded dark inner vignette shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* OVERLAY TYPOGRAPHY: Spanning 3D Depth Layer */}
        {/* "Our" - Overlapping Top Left of Arch */}
        <div className="absolute top-[22%] left-[4%] sm:left-[15%] md:left-[22%] lg:left-[25%] z-20 pointer-events-none">
          <span 
            ref={el => { wordRefs.current[0] = el; }}
            className="block font-display font-light italic text-[clamp(80px,13vw,175px)] text-[var(--lords-gold)] leading-none select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
          >
            Our
          </span>
        </div>

        {/* "Story" - Overlapping Bottom Right of Arch */}
        <div className="absolute bottom-[22%] right-[4%] sm:right-[15%] md:right-[22%] lg:right-[25%] z-20 pointer-events-none">
          <span 
            ref={el => { wordRefs.current[1] = el; }}
            className="block font-display font-bold uppercase tracking-tighter text-[clamp(80px,13vw,175px)] text-[var(--lords-cream)] leading-none select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
          >
            Story
          </span>
        </div>

      </div>
    </section>
  );
}
