import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function HomeAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(col1Ref.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out'
      });
      gsap.from(col2Ref.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2
      });
      gsap.from(col3Ref.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        x: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="glass-panel py-24 md:py-[120px] px-6 md:px-20 relative z-10 mx-4 md:mx-12 my-12 rounded-[40px]"
      style={{ clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0% 100%)', marginTop: '-2vw' }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-8">
        
        {/* COLUMN 1 - STICKY LABEL */}
        <div ref={col1Ref} className="hidden lg:block relative">
          <div className="sticky top-[40vh]">
            <span 
              className="font-label text-[10px] text-[var(--lords-gold)] tracking-widest inline-block"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              ABOUT US
            </span>
          </div>
        </div>

        {/* COLUMN 2 - MAIN CONTENT */}
        <div ref={col2Ref} className="relative pt-12 lg:pt-0">
          <span className="absolute top-[-40px] left-0 font-display text-[120px] md:text-[220px] leading-none text-[var(--lords-charcoal)] opacity-5 select-none -z-10">
            01
          </span>
          
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)] block mb-6">
            WHO WE ARE
          </span>

          <h2 className="font-display text-[var(--text-h1)] text-[var(--lords-charcoal)] leading-tight max-w-[500px]">
            Where modern elegance meets misty mountain charm.
          </h2>

          <p className="font-body text-[16px] text-[var(--lords-smoke)] leading-[1.9] mt-6 max-w-[480px]">
            Step into Lord's Haputale — a sanctuary above the clouds where every sunrise feels like a new beginning. We've crafted a space where the warmth of Sri Lankan hospitality meets contemporary comfort.
          </p>

          <Link 
            to="/about"
            className="inline-flex items-center gap-2 mt-10 font-label text-xs uppercase text-[var(--lords-gold)] hover:text-[var(--lords-gold-light)] group border-b border-transparent hover:border-[var(--lords-gold-light)] pb-1 transition-all"
          >
            Discover More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* COLUMN 3 - IMAGE STACK */}
        <div ref={col3Ref} className="relative mt-12 lg:mt-0 pb-16 lg:pb-0 pl-8 lg:pl-0">
          
          <div className="relative z-10 w-full aspect-[3/4] shadow-lg overflow-hidden rounded-sm">
            <img src="/images/img1.jpg" alt="Lord's Haputale lobby" className="w-full h-full object-cover" />
          </div>

          <div className="absolute bottom-4 -left-8 w-[80%] aspect-video border-[4px] border-white z-20 shadow-xl overflow-hidden">
            <img src="/images/img2.jpg" alt="Lord's Haputale view" className="w-full h-full object-cover" />
          </div>

          <div className="absolute -bottom-4 right-4 z-30 glass-panel-light px-4 py-2 shadow-xl border border-white/10 rounded-md">
            <span className="font-label text-[10px] text-[var(--lords-gold)] tracking-widest uppercase">
              EST. 2023
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
