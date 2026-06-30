import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// AboutStory renders the editorial text layout, custom stats counter and image mosaic
export default function AboutStory() {
  const storySectionRef = useRef<HTMLElement>(null);
  const storyCol1Ref = useRef<HTMLDivElement>(null);
  const storyCol2Ref = useRef<HTMLDivElement>(null);
  const storyCol3Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (storySectionRef.current) {
        // Staggered slide in animation of the columns
        gsap.from(storyCol1Ref.current, {
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: 'top 75%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });

        gsap.from(storyCol2Ref.current, {
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: 'top 70%',
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.15,
        });

        gsap.from(storyCol3Ref.current, {
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: 'top 65%',
          },
          y: 60,
          opacity: 0,
          duration: 1.4,
          ease: 'power3.out',
          delay: 0.3,
        });

        // Sticky stats counter animation triggering on scroll view
        const stats = { guests: 0 };
        gsap.to(stats, {
          guests: 50,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyCol3Ref.current,
            start: 'top 80%',
          },
          onUpdate: () => {
            if (statsRef.current) {
              statsRef.current.innerText = Math.floor(stats.guests) + '+';
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={storySectionRef}
      className="bg-[var(--lords-fog)]/80 backdrop-blur-md py-24 md:py-32 relative z-10 border-y border-[var(--lords-stone)]/20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[28%_42%_30%] gap-12 lg:gap-8 items-start">

        {/* COL 1 - Sticky Sidebar */}
        <div ref={storyCol1Ref} className="lg:sticky lg:top-32 self-start flex flex-col gap-4 px-2 lg:px-6">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)]">
            OUR BEGINNING
          </span>
          <h2 className="font-display text-[44px] lg:text-[50px] text-[var(--lords-cream)] leading-[1.1] font-light">
            A vision brought to life.
          </h2>
          <div className="w-12 h-[2px] bg-[var(--lords-gold)] my-2" />
          <div className="relative mt-4">
            <span className="font-display text-[120px] leading-none text-[var(--lords-gold)] opacity-[0.12] select-none font-bold">
              2023
            </span>
          </div>
        </div>

        {/* COL 2 - Narrative Story */}
        <div ref={storyCol2Ref} className="flex flex-col gap-8 px-2 lg:px-6">
          <p className="font-body text-[16px] text-[var(--lords-smoke)] leading-[1.95] font-light">
            Founded in 2023 in the heart of Haputale, Lord's was born from a vision to create an intimate boutique luxury sanctuary. Situated at 50 Beragala-Hali Ela, our location was chosen for its unparalleled views and serene connection to nature.
          </p>
          <p className="font-body text-[16px] text-[var(--lords-smoke)] leading-[1.95] font-light">
            Our core philosophy centers on providing competitive, value-driven rates without ever compromising on quality. We believe premium boutique lodging should offer maximum value for every guest, combining world-class comfort with the genuine warmth of Sri Lankan hospitality.
          </p>
          <p className="font-body text-[16px] text-[var(--lords-smoke)] leading-[1.95] font-light">
            At Lord's, the experience is shaped by the land. Awake to misty mountains unfolding outside your window, witness golden sunrises painting the tea estates, and immerse yourself in the highland culture that makes Haputale a unique escape.
          </p>

          {/* Pull Quote */}
          <div className="border-l-2 border-[var(--lords-gold)] pl-6 py-2 my-6">
            <blockquote className="font-quote italic text-xl text-[var(--lords-cream)] leading-relaxed">
              "Where each sunrise feels like a new beginning."
            </blockquote>
          </div>
        </div>

        {/* COL 3 - Image & Stat Card */}
        <div ref={storyCol3Ref} className="flex flex-col gap-8 px-2 lg:px-6">
          <div className="w-full aspect-[2/3] overflow-hidden rounded-md border border-[var(--lords-stone)]/40 shadow-xl">
            <img
              src="/images/about/lords-story-portrait.webp"
              alt="Boutique tea estate views"
              className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
            />
          </div>

          {/* Floating Stat Card */}
          <div className="bg-[var(--lords-moss)] p-8 rounded-xl border border-[var(--lords-gold)]/10 shadow-lg relative overflow-hidden group">
            {/* Background glowing circle */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[var(--lords-gold)]/5 rounded-full blur-2xl group-hover:scale-120 transition-transform duration-500" />

            <span
              ref={statsRef}
              className="font-display text-5xl text-[var(--lords-gold-light)] block font-light leading-none mb-2"
            >
              0+
            </span>
            <span className="font-label text-xs uppercase tracking-widest text-white/90">
              Happy guests and counting
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
