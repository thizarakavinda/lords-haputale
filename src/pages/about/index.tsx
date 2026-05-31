import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Star, Users, Mountain, DollarSign, Heart } from 'lucide-react';
import HomeCTA from '../home/HomeCTA';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  
  const storySectionRef = useRef<HTMLElement>(null);
  const storyCol1Ref = useRef<HTMLDivElement>(null);
  const storyCol2Ref = useRef<HTMLDivElement>(null);
  const storyCol3Ref = useRef<HTMLDivElement>(null);

  const statsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // ── SECTION 1: HERO ANIMATIONS ──
    const ctx = gsap.context(() => {
      // Archway reveal
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

      // Parallax scroll on hero image
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

      // ── SECTION 2: STORY EDITORIAL ANIMATIONS ──
      if (storySectionRef.current) {
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

        // Sticky stats counter animation on scroll trigger
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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' as const } }
  };

  const highlights = [
    { icon: <MapPin size={18} className="text-[var(--lords-gold)]" />, title: "Address", detail: "50 Beragala-Hali Ela, Haputale" },
    { icon: <Phone size={18} className="text-[var(--lords-gold)]" />, title: "Phone", detail: "070 700 7555" },
    { icon: <Mail size={18} className="text-[var(--lords-gold)]" />, title: "Email", detail: "info@lordshaputale.com" },
    { icon: <Star size={18} className="text-[var(--lords-gold)]" />, title: "Standard", detail: "5-Star Accommodations" },
    { icon: <Users size={18} className="text-[var(--lords-gold)]" />, title: "Suitability", detail: "Family & Couple Friendly" },
    { icon: <Mountain size={18} className="text-[var(--lords-gold)]" />, title: "Setting", detail: "Haputale Hill Country" },
  ];

  return (
    <div className="w-full bg-transparent text-[var(--lords-charcoal)] overflow-hidden">
      
      {/* ================================================================
          SECTION 1 — HERO (Architectural Window & Depth Overlay)
          ================================================================ */}
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

      {/* ================================================================
          SECTION 2 — STORY (Magazine Editorial)
          ================================================================ */}
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
              <span className="font-label text-xs uppercase tracking-widest text-[var(--lords-smoke)]">
                Happy guests and counting
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          SECTION 3 — VALUES (Diagonal Grid)
          ================================================================ */}
      <section 
        className="relative py-36 px-6 md:px-20 z-10"
        style={{
          clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0% 100%)',
          background: 'linear-gradient(to bottom, rgba(5, 10, 7, 0.75) 0%, rgba(17, 32, 23, 0.75) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1440px] mx-auto w-full relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <span className="font-label text-[11px] uppercase tracking-[0.45em] text-[var(--lords-gold)] block mb-3">
              WHAT WE STAND FOR
            </span>
            <h2 className="font-display text-[var(--lords-cream)] text-[clamp(36px,5vw,64px)] font-light leading-tight">
              Our Values
            </h2>
          </div>

          {/* Cards Grid */}
          <motion.div 
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto"
          >
            {/* Card 1 */}
            <motion.div 
              variants={cardVariants}
              className="glass-panel p-10 rounded-2xl flex flex-col relative overflow-hidden group hover:border-[var(--lords-gold)]/30 transition-all duration-300"
            >
              <span className="absolute right-6 top-0 font-display text-[96px] font-bold text-[var(--lords-gold)] opacity-[0.04] select-none group-hover:opacity-[0.07] transition-opacity">
                01
              </span>
              <div className="mb-6 p-3 bg-[var(--lords-moss)]/40 rounded-lg w-fit border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] group-hover:bg-[var(--lords-moss)]/60 transition-colors">
                <DollarSign size={28} />
              </div>
              <h3 className="font-serif text-[26px] text-[var(--lords-cream)] mb-3 font-light">
                Competitive Pricing
              </h3>
              <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed font-light">
                Unbeatable rates without compromising quality. Premium value every time.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={cardVariants}
              className="glass-panel p-10 rounded-2xl flex flex-col relative overflow-hidden group hover:border-[var(--lords-gold)]/30 transition-all duration-300"
            >
              <span className="absolute right-6 top-0 font-display text-[96px] font-bold text-[var(--lords-gold)] opacity-[0.04] select-none group-hover:opacity-[0.07] transition-opacity">
                02
              </span>
              <div className="mb-6 p-3 bg-[var(--lords-moss)]/40 rounded-lg w-fit border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] group-hover:bg-[var(--lords-moss)]/60 transition-colors">
                <Star size={28} />
              </div>
              <h3 className="font-serif text-[26px] text-[var(--lords-cream)] mb-3 font-light">
                Best Services
              </h3>
              <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed font-light">
                Excellence delivered every time. Professional, reliable, and custom tailored to your retreat.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={cardVariants}
              className="glass-panel p-10 rounded-2xl flex flex-col relative overflow-hidden group hover:border-[var(--lords-gold)]/30 transition-all duration-300"
            >
              <span className="absolute right-6 top-0 font-display text-[96px] font-bold text-[var(--lords-gold)] opacity-[0.04] select-none group-hover:opacity-[0.07] transition-opacity">
                03
              </span>
              <div className="mb-6 p-3 bg-[var(--lords-moss)]/40 rounded-lg w-fit border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] group-hover:bg-[var(--lords-moss)]/60 transition-colors">
                <Heart size={28} />
              </div>
              <h3 className="font-serif text-[26px] text-[var(--lords-cream)] mb-3 font-light">
                Happiness & Comfort
              </h3>
              <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed font-light">
                Your satisfaction is our guarantee. Stress-free and caring service that will make you feel at home.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================================================================
          SECTION 4 — PROPERTY HIGHLIGHTS
          ================================================================ */}
      <section className="bg-[var(--lords-fog)]/80 backdrop-blur-md py-28 md:py-36 px-6 md:px-20 relative z-10 border-t border-[var(--lords-stone)]/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN - Property Text and Feature Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-label text-[11px] uppercase tracking-[0.45em] text-[var(--lords-gold)] block mb-3">
              THE PROPERTY
            </span>
            <h2 className="font-display text-[var(--lords-cream)] text-[clamp(32px,4.5vw,52px)] font-light leading-tight mb-10">
              Lord's Haputale
            </h2>
            
            {/* Features 2x3 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 mb-12">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="p-3 bg-[var(--lords-stone)]/60 rounded-lg border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] shrink-0 shadow-md">
                    {highlight.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)]">
                      {highlight.title}
                    </span>
                    <span className="font-body text-[15px] text-[var(--lords-charcoal)] font-light mt-0.5">
                      {highlight.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Landscape Property Image */}
            <div className="w-full aspect-[16/9] overflow-hidden rounded-xl border border-[var(--lords-stone)]/40 shadow-2xl">
              <img 
                src="/images/about/lords-property.webp" 
                alt="Lord's Haputale modern architecture" 
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Overlapping Mosaic */}
          <div className="lg:col-span-5 relative pl-4 lg:pl-12 pt-12 lg:pt-0">
            

            {/* Base Portrait Image */}
            <div className="relative z-10 w-[90%] aspect-[3/4] shadow-[0_25px_50px_rgba(0,0,0,0.6)] overflow-hidden rounded-xl border border-[var(--lords-stone)]">
              <img 
                src="/images/about/lords-amenity.webp" 
                alt="Lord's Haputale luxury interior" 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Overlapping Landscape Image */}
            <div className="absolute bottom-[-40px] left-[-10px] md:left-[-30px] w-[75%] aspect-[4/3] border-4 border-[var(--lords-fog)] z-20 shadow-[0_20px_40px_rgba(0,0,0,0.7)] overflow-hidden rounded-lg">
              <img 
                src="/images/about/lords-interior.webp" 
                alt="Ceylon tea amenity" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Established Stamp Badge */}
            <div className="absolute -top-4 right-4 z-30 glass-panel-light px-5 py-3 shadow-xl border border-[var(--lords-gold)]/20 rounded-lg">
              <span className="font-label text-[10px] text-[var(--lords-gold)] tracking-[0.2em] uppercase font-semibold">
                Bespoke Luxury
              </span>
            </div>
            
          </div>

        </div>
      </section>

      {/* ================================================================
          SECTION 5 — FINAL CTA (Reused from Home)
          ================================================================ */}
      <HomeCTA />

    </div>
  );
}
