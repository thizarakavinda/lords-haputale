import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HomeHero() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Left panel image reveal
    gsap.fromTo(leftPanelRef.current, 
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut', delay: 0.2 }
    );

    // Text lines reveal
    gsap.fromTo(textRefs.current,
      { clipPath: 'inset(100% 0 0 0)', y: 20 },
      { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.8 }
    );
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col md:flex-row overflow-hidden pt-[72px] md:pt-0">
      
      {/* LEFT HALF (60%) */}
      <div 
        ref={leftPanelRef}
        className="w-full md:w-[60%] h-[50vh] md:h-full relative image-placeholder"
        data-image-name="[REPLACE: lords-aerial-hero.jpg]"
      >
        {/* The actual image would go here with object-cover w-full h-full */}
      </div>

      {/* RIGHT HALF (40%) */}
      <div className="w-full md:w-[40%] h-[50vh] md:h-full bg-[var(--lords-mist)] flex flex-col justify-end p-8 md:p-12 pb-24 relative">
        
        {/* TOP RIGHT COORDS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-8 right-8 hidden md:block font-label text-[11px] text-[var(--lords-muted)] tracking-widest"
        >
          6°N · 80°E
        </motion.div>

        {/* CONTENT */}
        <div className="flex flex-col">
          <span className="font-label text-[10px] uppercase tracking-[0.5em] text-[var(--lords-gold)] mb-6">
            HAPUTALE · SRI LANKA
          </span>
          
          <h1 className="font-display text-[var(--text-display)] text-[var(--lords-charcoal)] leading-[0.88] flex flex-col gap-2">
            <span className="overflow-hidden"><span ref={el => { textRefs.current[0] = el; }} className="block">Elegance</span></span>
            <span className="overflow-hidden"><span ref={el => { textRefs.current[1] = el; }} className="block">above the</span></span>
            <span className="overflow-hidden"><span ref={el => { textRefs.current[2] = el; }} className="block">hills.</span></span>
          </h1>

          <p className="font-body text-[15px] text-[var(--lords-smoke)] leading-[1.8] mt-6 max-w-[320px]">
            A sanctuary where misty mountains meet modern elegance. Haputale's finest boutique experience.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link 
              to="/rooms"
              className="bg-[var(--lords-moss)] text-white font-label text-xs uppercase px-8 py-3.5 rounded-sm hover:bg-[var(--lords-forest)] transition-colors"
            >
              Explore Rooms
            </Link>
            <Link 
              to="/about"
              className="flex items-center gap-2 text-[var(--lords-charcoal)] font-label text-xs uppercase py-3.5 hover:text-[var(--lords-gold)] transition-colors group"
            >
              Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-[var(--lords-muted)]" />
          </motion.div>
          <span className="font-label text-[9px] tracking-[0.4em] text-[var(--lords-muted)]" style={{ writingMode: 'vertical-rl' }}>
            SCROLL
          </span>
        </motion.div>

      </div>

      {/* STATS BAR */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <div className="bg-white/80 backdrop-blur-md flex flex-wrap md:flex-nowrap items-center justify-between p-6 md:px-12 shadow-sm rounded-t-sm">
            
            <div className="flex flex-col items-center md:items-start w-1/3 border-r border-[var(--lords-stone)]/30">
              <span className="font-display text-3xl md:text-4xl text-[var(--lords-gold)]">50+</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-[var(--lords-muted)] mt-1">Happy Guests</span>
            </div>
            
            <div className="flex flex-col items-center w-1/3 border-r border-[var(--lords-stone)]/30">
              <span className="font-display text-3xl md:text-4xl text-[var(--lords-gold)]">3</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-[var(--lords-muted)] mt-1">Room Types</span>
            </div>
            
            <div className="flex flex-col items-center md:items-end w-1/3">
              <span className="font-display text-3xl md:text-4xl text-[var(--lords-gold)]">98%</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-[var(--lords-muted)] mt-1">Satisfaction</span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
