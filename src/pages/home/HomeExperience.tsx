import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HomeExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current,
        { backgroundPosition: "50% 0%" },
        { 
          backgroundPosition: "50% 30%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      
      {/* PARALLAX BACKGROUND */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/img3.jpg')" }}
      />

      {/* OVERLAY */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0) 60%)'
        }}
      />

      {/* CONTENT LEFT */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-20 z-10 max-w-[600px]">
        <h2 className="font-display italic text-[clamp(40px,5vw,72px)] text-white leading-[1.1] font-normal">
          <span className="block">A sacred journey</span>
          <span className="block">above the clouds.</span>
        </h2>
        
        <p className="font-body text-[15px] text-white/75 mt-5">
          Where clouds dance with peaks and time stands still.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          {['Misty Valleys', 'Golden Sunrise', 'Tea Gardens'].map((tag) => (
            <span 
              key={tag}
              className="bg-white/15 backdrop-blur-[8px] border border-white/30 text-white font-label text-[11px] uppercase tracking-wider px-4 py-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CONTENT RIGHT */}
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 z-0 pointer-events-none select-none">
        <span className="font-display text-[200px] md:text-[320px] leading-none text-white opacity-5">
          1
        </span>
      </div>

    </section>
  );
}
