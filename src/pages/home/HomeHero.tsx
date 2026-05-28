import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const guestsRef = useRef<HTMLSpanElement>(null);
  const roomsRef = useRef<HTMLSpanElement>(null);
  const satisfactionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Text lines reveal
    gsap.fromTo(textRefs.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
    );

    // Number counting animation
    const stats = { guests: 0, rooms: 0, satisfaction: 0 };
    gsap.to(stats, {
      guests: 50,
      rooms: 3,
      satisfaction: 98,
      duration: 2.5,
      ease: 'power3.out',
      delay: 1,
      onUpdate: () => {
        if (guestsRef.current) guestsRef.current.innerText = Math.floor(stats.guests) + '+';
        if (roomsRef.current) roomsRef.current.innerText = Math.floor(stats.rooms).toString();
        if (satisfactionRef.current) satisfactionRef.current.innerText = Math.floor(stats.satisfaction) + '%';
      }
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-center overflow-hidden pt-[72px]"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/back.webm" type="video/webm" />
          <source src="/videos/back.mp4" type="video/mp4" />
        </video>    
        {/* DARK OVERLAY FOR LUXURY VIBE */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* MAIN CONTENT - LEFT ALIGNED LIKE IMAGE */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-label text-[12px] uppercase tracking-[0.5em] text-[var(--lords-gold)] mb-6 block"
          >
            HAPUTALE · SRI LANKA
          </motion.span>
          
          <h1 className="font-display font-light text-[clamp(44px,7vw,80px)] text-[var(--lords-cream)] leading-[1.1] mb-8 tracking-tight">
            <span ref={el => { textRefs.current[0] = el; }} className="block">Elegance</span>
            <span ref={el => { textRefs.current[1] = el; }} className="block">above the <span className="font-serif italic text-[var(--lords-gold)]">hills.</span></span>
          </h1>
          
          <p ref={el => { textRefs.current[2] = el; }} className="font-body text-[16px] md:text-[18px] text-[var(--lords-smoke)] leading-[1.8] max-w-[500px]">
            A sanctuary where misty mountains meet modern elegance. Haputale's finest boutique experience.
          </p>
        </div>
      </div>

      {/* FLOATING PILL STATS BAR */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="absolute bottom-12 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:right-auto z-20"
      >
        <div className="glass-panel px-8 md:px-16 py-6 md:py-8 rounded-[32px] flex flex-row items-center justify-between md:justify-center gap-8 md:gap-24 shadow-2xl border border-[var(--lords-gold)]/10">
          
          <div className="flex flex-col items-center md:items-start">
            <span ref={guestsRef} className="font-display font-light text-3xl md:text-4xl text-[var(--lords-gold)]">0+</span>
            <span className="font-label text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--lords-smoke)] mt-1 md:mt-2">Happy Guests</span>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-[var(--lords-stone)]"></div>
          
          <div className="flex flex-col items-center md:items-start">
            <span ref={roomsRef} className="font-display font-light text-3xl md:text-4xl text-[var(--lords-gold)]">0</span>
            <span className="font-label text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--lords-smoke)] mt-1 md:mt-2">Room Types</span>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-[var(--lords-stone)]"></div>
          
          <div className="flex flex-col items-center md:items-start">
            <span ref={satisfactionRef} className="font-display font-light text-3xl md:text-4xl text-[var(--lords-gold)]">0%</span>
            <span className="font-label text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--lords-smoke)] mt-1 md:mt-2">Satisfaction</span>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
