import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Attraction item definition
interface AttractionItem {
  category: string;
  title: string;
  location: string;
  image: string;
  badgeBg: string;
}

const attractionItems: AttractionItem[] = [
  {
    category: "OUTLOOK",
    title: "Spectacular mist rising over the valleys",
    location: "Haputale Pass, Sri Lanka",
    image: "/images/about/hero.webp",
    badgeBg: "border border-[#c5a880]/30 bg-[#c5a880]/15 text-[#e6d5bf]",
  },
  {
    category: "ESTATE",
    title: "Historic colonial bungalow in Beragala Hills",
    location: "Lord's Haputale Grounds",
    image: "/images/about/lords-property.webp",
    badgeBg: "border border-[#5e7567]/30 bg-[#5e7567]/15 text-[#9ab0a2]",
  },
  {
    category: "HERITAGE",
    title: "The historic misty Adisham Bungalow",
    location: "Haputale Forest Reserve",
    image: "/images/about/lords-story-portrait.webp",
    badgeBg: "border border-[#1c3525]/30 bg-[#1c3525]/25 text-[#9ab0a2]",
  },
  {
    category: "SANCTUARY",
    title: "Bespoke tea estate lodging and high comfort",
    location: "Highland Suites",
    image: "/images/about/lords-amenity.webp",
    badgeBg: "border border-[#8b7355]/30 bg-[#8b7355]/15 text-[#e6d5bf]",
  },
  {
    category: "LOUNGE",
    title: "Cozy, warm interior lounge and antique decor",
    location: "Main Villa Clubroom",
    image: "/images/about/lords-interior.webp",
    badgeBg: "border border-[#c5a880]/20 bg-[#c5a880]/10 text-[#e6d5bf]",
  },
];

// Individual 3D Carousel Card
function AttractionCard({ item, isActive }: { item: AttractionItem; isActive: boolean }) {
  return (
    <div
      className={`w-full h-full rounded-2xl overflow-hidden border transition-all duration-750 ease-out relative flex flex-col justify-end p-6 select-none ${isActive
        ? 'border-[var(--lords-gold)]/40 shadow-[0_12px_32px_rgba(74,103,65,0.2)]'
        : 'border-[var(--lords-stone)]/55 shadow-[0_8px_16px_rgba(74,103,65,0.08)]'
        }`}
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out -z-10 ${isActive ? 'scale-105' : 'scale-100'
          }`}
      />

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent -z-10" />

      {/* Card Content */}
      <div className="text-left w-full font-body">
        {/* Category Pill Tag */}
        <span className={`inline-block font-label text-[10px] uppercase tracking-wider px-3 py-1 rounded-md mb-2.5 font-medium ${item.badgeBg}`}>
          {item.category}
        </span>

        {/* Title */}
        <h3 className="font-serif text-[17px] md:text-[20px] text-white font-light leading-snug tracking-wide mb-3">
          {item.title}
        </h3>

        {/* Location Pin & Name */}
        <div className="flex items-center gap-1.5 text-white/85">
          <MapPin size={13} className="text-[var(--lords-gold)] shrink-0" />
          <span className="font-body text-xs font-light tracking-wide truncate">
            {item.location}
          </span>
        </div>
      </div>
    </div>
  );
}

// Hero section containing circular sliding carousel
export default function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Manage Autoplay and responsive window width listeners
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 4500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  // GSAP animations for hero headings on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15, delay: 0.1 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative lg:h-[70vh] min-h-[600px] flex items-center pt-32 pb-16 px-6 md:px-16 lg:px-24 border-b border-[var(--lords-stone)]/30 overflow-hidden bg-transparent"
    >
      {/* Background Watermark */}
      <div className="absolute right-0 bottom-4 pointer-events-none select-none overflow-hidden opacity-[0.02] translate-y-6">
        <span className="font-display text-[22vw] leading-none tracking-tighter text-[var(--lords-cream)] font-bold">
          CONTACT
        </span>
      </div>

      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 overflow-visible">
        {/* Left Column: Headings & Quick Contact links */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center h-full text-left">
          {/* Coordinates Stamp */}
          <div className="hero-animate flex items-center gap-3 mb-4">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)]">
              PORTRAIT VIEWPORT · 9.0298° N
            </span>
            <div className="w-8 h-[1px] bg-[var(--lords-stone)]" />
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-muted)]">
              EST. 2018
            </span>
          </div>

          <h1 className="hero-animate font-display text-[clamp(36px,4.2vw,56px)] leading-[1.12] tracking-tight mb-8">
            <span className="text-[var(--lords-cream)] font-light block">Get in touch to</span>
            <span className="text-[var(--lords-gold)] font-bold block italic font-serif">experience luxury.</span>
          </h1>

          {/* Quick contact badge triggers */}
          <div className="hero-animate flex flex-wrap gap-3 mt-2 w-full">
            <a
              href="tel:0707007555"
              className="px-5 py-2.5 rounded-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] flex items-center gap-2.5 font-body text-xs md:text-sm text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] hover:border-[var(--lords-gold)]/40 transition-all duration-300 shadow-md group"
            >
              <Phone size={14} className="text-[var(--lords-gold)] group-hover:scale-110 transition-transform" />
              <span>070 700 7555</span>
            </a>
            <a
              href="mailto:info@lordshaputale.com"
              className="px-5 py-2.5 rounded-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] flex items-center gap-2.5 font-body text-xs md:text-sm text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] hover:border-[var(--lords-gold)]/40 transition-all duration-300 shadow-md group"
            >
              <Mail size={14} className="text-[var(--lords-gold)] group-hover:scale-110 transition-transform" />
              <span>info@lordshaputale.com</span>
            </a>
            <div className="px-5 py-2.5 rounded-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] flex items-center gap-2.5 font-body text-xs md:text-sm text-[var(--lords-smoke)] shadow-md">
              <MapPin size={14} className="text-[var(--lords-gold)]" />
              <span>Haputale, Sri Lanka</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Carousel Slider */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center w-full h-[320px] md:h-[380px] overflow-visible mt-8 lg:mt-0">
          <div className="relative w-full h-full flex items-center justify-center overflow-visible select-none">
            {attractionItems.map((item, index) => {
              let diff = index - activeIndex;
              if (diff < -2) diff += 5;
              if (diff > 2) diff -= 5;

              const isActive = diff === 0;
              const desktopX = diff * 105;
              const mobileX = diff * 75;

              let zIndex = 5;
              let scale = 0.72;
              let opacity = 0.45;

              if (diff === 0) {
                zIndex = 10;
                scale = 1.0;
                opacity = 1.0;
              } else if (Math.abs(diff) === 1) {
                zIndex = 8;
                scale = 0.85;
                opacity = 0.75;
              }

              return (
                <motion.div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: '200px',
                    height: '280px',
                    zIndex: zIndex,
                  }}
                  className="md:!w-[240px] md:!h-[340px] cursor-pointer origin-center"
                  animate={{
                    x: windowWidth < 768 ? mobileX : desktopX,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 110,
                    damping: 18,
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <AttractionCard item={item} isActive={isActive} />
                </motion.div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div className="attractions-pagination !mt-8">
            {attractionItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`attractions-bullet ${i === activeIndex ? 'attractions-bullet-active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
