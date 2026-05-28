import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Compass, Shield, Coffee } from 'lucide-react';

export default function HomeAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'
      });
      gsap.from(rightColRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        x: 50, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Compass className="w-5 h-5 text-[var(--lords-gold)]" />,
      title: "Elevated Sanctuary",
      description: "Perched 1,430m above sea level amidst misty hills and tea fields."
    },
    {
      icon: <Shield className="w-5 h-5 text-[var(--lords-gold)]" />,
      title: "Bespoke Privacy",
      description: "Only 3 meticulously designed rooms for ultimate seclusion."
    },
    {
      icon: <Coffee className="w-5 h-5 text-[var(--lords-gold)]" />,
      title: "Highland Culinary",
      description: "Fine dining featuring fresh local ingredients and premium Ceylon tea."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="glass-panel py-20 md:py-28 px-6 md:px-16 relative z-10 mx-4 md:mx-12 my-16 rounded-[32px] border border-[var(--lords-stone)]"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT COLUMN - MAIN CONTENT & DETAILS (7 Columns) */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative">
            <span className="absolute top-[-50px] left-0 font-display text-[120px] md:text-[200px] leading-none text-[var(--lords-gold)] opacity-[0.03] select-none -z-10">
              01
            </span>
            
            <span className="font-label text-[11px] uppercase tracking-[0.4em] text-[var(--lords-gold)] block mb-4">
              WHO WE ARE
            </span>

            <h2 className="font-display text-[clamp(32px,4vw,56px)] text-[var(--lords-cream)] leading-[1.15] max-w-[620px] font-normal mb-8">
              Where modern elegance meets misty mountain charm.
            </h2>

            <p className="font-body text-[16px] text-[var(--lords-smoke)] leading-[1.8] max-w-[580px] mb-12">
              Step into Lord's Haputale — a sanctuary above the clouds where every sunrise feels like a new beginning. We've crafted a space where the warmth of Sri Lankan hospitality meets contemporary comfort.
            </p>
          </div>

          {/* HIGHLIGHTS SECTION - Fills empty space with premium cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-[680px]">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex flex-col p-5 rounded-xl border border-[var(--lords-stone)]/40 backdrop-blur-sm"
                style={{
                  background: 'rgba(5, 10, 7, 0.25)',
                }}
              >
                <div className="mb-3 p-2 bg-[var(--lords-moss)]/30 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h4 className="font-display text-[16px] text-[var(--lords-cream)] mb-1 font-medium">
                  {feature.title}
                </h4>
                <p className="font-body text-[14px] text-[var(--lords-smoke)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 font-label text-xs uppercase text-[var(--lords-gold)] hover:text-[var(--lords-gold-light)] group border-b border-[var(--lords-gold)]/30 hover:border-[var(--lords-gold-light)] pb-1 transition-all"
            >
              Discover More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN - IMAGE STACK (5 Columns) */}
        <div ref={rightColRef} className="lg:col-span-5 relative pl-4 lg:pl-8">
          
          {/* Main Large Image */}
          <div className="relative z-10 w-full aspect-[4/5] shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden rounded-2xl border border-[var(--lords-stone)]">
            <img src="/images/img1.jpg" alt="Lord's Haputale lobby" className="w-full h-full object-cover" />
          </div>

          {/* Overlapping Small Image */}
          <div className="absolute bottom-6 -left-6 md:-left-12 w-[70%] aspect-video border-4 border-[var(--lords-fog)] z-20 shadow-[0_15px_30px_rgba(0,0,0,0.7)] overflow-hidden rounded-lg">
            <img src="/images/img2.jpg" alt="Lord's Haputale view" className="w-full h-full object-cover" />
          </div>

          {/* Badge */}
          <div className="absolute -bottom-3 right-3 z-30 glass-panel-light px-5 py-2.5 shadow-xl border border-[var(--lords-gold)]/20 rounded-lg">
            <span className="font-label text-[10px] text-[var(--lords-gold)] tracking-[0.2em] uppercase font-semibold">
              EST. 2023
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
