import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, 
  X, 
  BedDouble, 
  ArrowRight, 
  Calendar, 
  Users 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Rooms() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroTitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const heroBarRef = useRef<HTMLDivElement>(null);
  const heroBottomRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);

  const roomImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const roomContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Default interactive states for check-in bar
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDateString = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDateString(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateString(dayAfter));
  const [guests, setGuests] = useState('2');
  const [activeTab01, setActiveTab01] = useState<'space' | 'experience' | 'specs'>('space');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO ENTRANCE ANIMATIONS ──
      gsap.fromTo(
        heroTitleRefs.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo(
        heroBarRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.8 }
      );

      gsap.fromTo(
        heroBottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power3.out', delay: 1.2 }
      );

      // ── STICKY IMAGE PARALLAX ANIMATIONS ──
      roomImageRefs.current.forEach((img) => {
        if (img && img.parentElement) {
          gsap.to(img, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });

      // ── CONTENT PANEL STAGGERED FADE TRIGGERS ──
      roomContentRefs.current.forEach((content) => {
        if (content) {
          gsap.from(content.children, {
            scrollTrigger: {
              trigger: content,
              start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          });
        }
      });

      // ── COMPARISON TABLE TRIGGER ──
      if (comparisonRef.current) {
        gsap.from(comparisonRef.current.querySelector('table'), {
          scrollTrigger: {
            trigger: comparisonRef.current,
            start: 'top 75%',
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleScrollToRooms = (e: React.MouseEvent) => {
    e.preventDefault();
    const roomsSection = document.getElementById('room-list-start');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToComparison = (e: React.MouseEvent) => {
    e.preventDefault();
    const tableSection = document.getElementById('compare-section');
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-transparent text-[var(--lords-charcoal)] overflow-hidden">
      
      {/* ================================================================
          SECTION 1 — HERO
          ================================================================ */}
      <section 
        ref={heroSectionRef}
        className="relative h-screen min-h-[750px] flex flex-col justify-between overflow-hidden"
      >
        {/* Loop Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/videos/room back.webp" type="video/webm" />
          </video>
          {/* Deep Overlay for Luxury Contrast */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-40 flex-grow flex flex-col justify-center">
          
          <div className="text-center md:text-left mb-6">
            <span className="font-label text-[10px] uppercase tracking-[0.45em] text-[var(--lords-gold)] block mb-4">
              BOUTIQUE SANCTUARY
            </span>
            <h1 className="font-display text-[clamp(48px,8vw,96px)] text-[var(--lords-cream)] leading-[1.05] tracking-tighter uppercase mb-4">
              <span ref={el => { heroTitleRefs.current[0] = el; }} className="block font-light text-white/50">Our</span>
              <span ref={el => { heroTitleRefs.current[1] = el; }} className="block font-bold text-[var(--lords-gold)]">Rooms</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <p ref={heroTextRef} className="font-body text-sm md:text-[16px] text-[var(--lords-smoke)] max-w-[420px] leading-relaxed text-center md:text-left">
              Three carefully curated room types. Each designed for a different kind of escape.
            </p>
            
            <div className="hidden md:flex flex-col items-end text-right absolute right-20 bottom-44 z-20">
              <a 
                href="#compare-section" 
                onClick={handleScrollToComparison}
                className="font-label text-[11px] uppercase tracking-widest text-[var(--lords-gold)] hover:text-[var(--lords-gold-light)] flex items-center gap-2 border-b border-[var(--lords-gold)]/20 hover:border-[var(--lords-gold-light)] pb-1 transition-all"
              >
                Compare Rooms <ArrowRight size={12} className="rotate-90" />
              </a>
            </div>
          </div>

          {/* Availability Check Bar (Screenshot Inspired) */}
          <div 
            ref={heroBarRef}
            className="w-full max-w-[1000px] mx-auto mt-2 z-20 px-4 md:px-0"
          >
            <div 
              className="glass-panel w-full rounded-2xl md:rounded-full py-5 px-8 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[28%_28%_20%_24%] gap-6 md:gap-4 items-center border border-[var(--lords-gold)]/20 shadow-2xl backdrop-blur-md"
            >
              {/* Check In Date */}
              <div className="flex flex-col">
                <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--lords-muted)] mb-1.5 flex items-center gap-1.5">
                  <Calendar size={11} className="text-[var(--lords-gold)]" /> Check In
                </span>
                <input 
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent border-0 text-[14px] font-body text-[var(--lords-cream)] focus:outline-none focus:ring-0 w-full"
                />
              </div>

              {/* Check Out Date */}
              <div className="flex flex-col md:border-l md:border-[var(--lords-stone)]/40 md:pl-6">
                <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--lords-muted)] mb-1.5 flex items-center gap-1.5">
                  <Calendar size={11} className="text-[var(--lords-gold)]" /> Check Out
                </span>
                <input 
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent border-0 text-[14px] font-body text-[var(--lords-cream)] focus:outline-none focus:ring-0 w-full"
                />
              </div>

              {/* Guests Count */}
              <div className="flex flex-col md:border-l md:border-[var(--lords-stone)]/40 md:pl-6">
                <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--lords-muted)] mb-1.5 flex items-center gap-1.5">
                  <Users size={11} className="text-[var(--lords-gold)]" /> Guests
                </span>
                <select 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-0 text-[14px] font-body text-[var(--lords-cream)] focus:outline-none focus:ring-0 w-full cursor-pointer pr-4"
                >
                  <option value="1" className="bg-[var(--lords-mist)] text-white">1 Guest</option>
                  <option value="2" className="bg-[var(--lords-mist)] text-white">2 Guests</option>
                  <option value="3" className="bg-[var(--lords-mist)] text-white">3 Guests</option>
                </select>
              </div>

              {/* Book Action */}
              <div className="w-full md:pl-4">
                <Link
                  to={`/booking?in=${checkIn}&out=${checkOut}&guests=${guests}`}
                  className="w-full bg-[var(--lords-gold)] hover:bg-[var(--lords-gold-light)] text-[var(--lords-mist)] font-label text-[11px] uppercase tracking-widest font-semibold py-4.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Check Rates
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Panel & Landscape Preview Strip */}
        <div ref={heroBottomRef} className="w-full mt-16 relative z-10">
          
          {/* Stats Bar */}
          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-20 py-6 border-b border-[var(--lords-stone)]/20 bg-black/25 backdrop-blur-sm">
            {/* Mobile: 3-column centered stats only */}
            <div className="grid grid-cols-3 gap-4 md:hidden">
              {[
                { value: '50+', label: 'Happy Guests' },
                { value: '3', label: 'Bespoke Rooms' },
                { value: '1,430m', label: 'Elevation' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <span className="font-display text-3xl text-[var(--lords-gold)] leading-none">{stat.value}</span>
                  <span className="font-label text-[9px] uppercase tracking-wider text-[var(--lords-muted)] mt-1.5">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Desktop: two-column with description + stats */}
            <div className="hidden md:grid grid-cols-2 gap-8 items-center">
              <p className="font-body text-[12px] text-[var(--lords-smoke)]/80 leading-relaxed max-w-[480px]">
                We embrace the allure of wanderlust, offering bespoke lodging to embark on your mountain adventure, discovering highland comfort amidst the clouds.
              </p>
              <div className="flex justify-end gap-16">
                <div className="flex flex-col">
                  <span className="font-display text-2xl text-[var(--lords-gold)]">50+</span>
                  <span className="font-label text-[8px] uppercase tracking-wider text-[var(--lords-muted)]">Happy Guests</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl text-[var(--lords-gold)]">3</span>
                  <span className="font-label text-[8px] uppercase tracking-wider text-[var(--lords-muted)]">Bespoke Rooms</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl text-[var(--lords-gold)]">1,430m</span>
                  <span className="font-label text-[8px] uppercase tracking-wider text-[var(--lords-muted)]">Elevation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Image Landscape Preview Strip */}
          <div className="grid grid-cols-3 gap-0 h-[120px] md:h-[180px] w-full overflow-hidden border-t border-[var(--lords-stone)]/30">
            {[
              { img: '/images/triple room.jpg', name: 'Triple Room' },
              { img: '/images/double room.jpg', name: 'Double Room' },
              { img: '/images/small double room.jpg', name: 'Small Double' },
            ].map((room, idx) => (
              <a 
                key={idx}
                href={`#room-0${idx + 1}`}
                onClick={handleScrollToRooms}
                className="group relative h-full w-full overflow-hidden border-r border-[var(--lords-stone)]/20 last:border-0"
              >
                <img 
                  src={room.img} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-label text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--lords-cream)] border border-[var(--lords-gold)]/10 px-3 py-1.5 bg-black/40 rounded-sm backdrop-blur-sm group-hover:border-[var(--lords-gold)] group-hover:text-[var(--lords-gold)] transition-colors">
                    {room.name}
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>

      </section>

      {/* Anchor Element to start the Room Full Page sections list */}
      <div id="room-list-start" className="w-full h-px bg-transparent" />

      {/* ================================================================
          SECTION 2 — ROOM 1: TRIPLE ROOM (Asymmetrical Architectural Collage with Interactive Tabs)
          ================================================================ */}
      <section 
        id="room-01" 
        className="w-full py-24 md:py-32 px-6 md:px-16 lg:px-20 relative z-10 border-b border-[var(--lords-stone)]/20"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Asymmetrical Layered Photo Frame Collage */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] max-w-[580px] mx-auto">
            {/* Background Decorative Frame Layer */}
            <div className="absolute -inset-4 rounded-3xl border border-[var(--lords-gold)]/10 bg-[var(--lords-fog)]/30 backdrop-blur-sm -rotate-2 scale-98 pointer-events-none" />
            
            {/* Fine Grid Blueprint Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--lords-gold)_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
            
            {/* Primary Portrait Image */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--lords-gold)]/20 shadow-2xl relative group">
              <div className="w-full h-[120%] absolute -top-[10%] left-0 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-103">
                <img 
                  ref={el => { roomImageRefs.current[0] = el; }}
                  src="/images/triple room.jpg" 
                  alt="Luxury Triple Room Suite" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />
              
              {/* Gold coordinates stamp inside the photo */}
              <div className="absolute bottom-6 left-6 font-label text-[9px] tracking-[0.25em] text-[var(--lords-gold-light)] bg-black/45 px-3 py-1.5 rounded-sm backdrop-blur-sm border border-[var(--lords-gold)]/15 z-20">
                9.0298° N, 80.9575° E · ALT 1,430M
              </div>
            </div>

            {/* Overlapping Floating Second Detail Image/Badge */}
            <div className="absolute -bottom-6 -right-6 w-[160px] h-[200px] hidden sm:block rounded-xl overflow-hidden border border-[var(--lords-gold)]/25 shadow-2xl z-25 group">
              <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105">
                <img 
                  src="/images/triple room.jpg" 
                  alt="Triple Room Closeup Detail" 
                  className="w-full h-full object-cover object-left filter brightness-90"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 z-10" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                <span className="font-label text-[8px] uppercase tracking-widest text-[var(--lords-gold)] block mb-1">
                  curated
                </span>
                <span className="font-display text-sm text-[var(--lords-cream)] font-light leading-tight">
                  Highland Sanctuary
                </span>
              </div>
            </div>

            {/* Float Gold Badge */}
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-[var(--lords-gold)] text-[var(--lords-mist)] font-label text-[9px] uppercase tracking-[0.25em] px-4 py-2 font-semibold shadow-md rounded-full">
                MOST POPULAR
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Elegant Floating Editorial Card with Showcase Tabs */}
          <div 
            ref={el => { roomContentRefs.current[0] = el; }}
            className="relative flex flex-col justify-center w-full"
          >
            {/* Watermark background word */}
            <span className="font-display text-[120px] text-[var(--lords-gold)] opacity-[0.02] select-none absolute -top-16 -left-10 font-bold leading-none pointer-events-none italic">
              Sanctuary
            </span>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--lords-gold)]">
                01 / THE GRAND TRIPLE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--lords-gold)]" />
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--lords-muted)]">
                3 GUESTS
              </span>
            </div>

            <h2 className="font-display text-[clamp(40px,5vw,56px)] text-[var(--lords-cream)] leading-none font-light mb-8">
              Triple Room
            </h2>

            {/* INTERACTIVE SHOWCASE TABS */}
            <div className="flex border-b border-[var(--lords-stone)]/40 gap-6 mb-8 pb-3">
              {[
                { id: 'space', label: 'THE SPACE' },
                { id: 'experience', label: 'THE EXPERIENCE' },
                { id: 'specs', label: 'SPECIFICATIONS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab01(tab.id as any)}
                  className={`font-label text-[10px] md:text-[11px] uppercase tracking-[0.25em] pb-1.5 transition-all relative cursor-pointer ${
                    activeTab01 === tab.id 
                      ? 'text-[var(--lords-gold)] font-medium' 
                      : 'text-[var(--lords-smoke)]/60 hover:text-[var(--lords-smoke)]'
                  }`}
                >
                  {tab.label}
                  {activeTab01 === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--lords-gold)]" />
                  )}
                </button>
              ))}
            </div>

            {/* TAB PANELS */}
            <div className="min-h-[220px] flex flex-col justify-between">
              {activeTab01 === 'space' && (
                <div className="animate-fadeIn">
                  <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-[1.9] max-w-[480px] mb-8 font-light">
                    Perfect for families or groups of friends. Our Triple Room offers spacious comfort with modern amenities and breathtaking mountain views of the Haputale highlands. It provides a spacious escape beautifully decorated with custom timber and ambient lighting.
                  </p>
                  <div className="flex gap-8 mb-6">
                    <div>
                      <span className="font-label text-[9px] uppercase tracking-wider text-[var(--lords-muted)] block mb-1">
                        BED CONFIGURATION
                      </span>
                      <span className="font-body text-[14px] text-[var(--lords-cream)] flex items-center gap-1.5">
                        <BedDouble size={14} className="text-[var(--lords-gold)]" /> 1 King Bed
                      </span>
                    </div>
                    <div>
                      <span className="font-label text-[9px] uppercase tracking-wider text-[var(--lords-muted)] block mb-1">
                        VIEW OUTLOOK
                      </span>
                      <span className="font-body text-[14px] text-[var(--lords-cream)]">
                        Highland Mountain Vista
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab01 === 'experience' && (
                <div className="animate-fadeIn">
                  <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-[1.9] max-w-[480px] mb-8 font-light">
                    Immerse yourself in high-altitude luxury with curated bespoke stay amenities, crafted specifically to evoke Ceylon's rich heritage and tranquil mountain living.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      '☕ Sunrise Ceylon Tea Trolley Service',
                      '🧖 Luxury Spa Bathing Amenities Kit',
                      '🔭 Balcony Star-Gazing Telescope',
                      '🍷 Complimentary Highland Fruit Platter',
                    ].map((item, idx) => (
                      <li key={idx} className="font-body text-[13.5px] text-[var(--lords-cream)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab01 === 'specs' && (
                <div className="animate-fadeIn">
                  <p className="font-body text-[14px] text-[var(--lords-smoke)]/80 leading-relaxed mb-6">
                    Modern details seamlessly integrated into our spacious triple-occupancy sanctuary.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: '🛏', text: '1 King Bed' },
                      { icon: '🚿', text: 'Private Bath' },
                      { icon: '📺', text: 'Smart TV' },
                      { icon: '📶', text: 'Free WiFi' },
                      { icon: '🏔', text: 'Mountain View' },
                      { icon: '❄️', text: 'Hot Water' },
                    ].map((pill, idx) => (
                      <span 
                        key={idx}
                        className="flex items-center gap-2 bg-[var(--lords-stone)]/40 text-[var(--lords-cream)] font-label text-[10px] uppercase tracking-wider px-3 py-2 rounded-sm border border-[var(--lords-gold)]/10"
                      >
                        <span>{pill.icon}</span>
                        <span>{pill.text}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & CTA integrated at bottom of tabs */}
              <div className="border-t border-[var(--lords-stone)]/30 pt-6 mt-4 flex items-center justify-between flex-wrap gap-6 max-w-[500px]">
                <div className="flex flex-col">
                  <span className="font-label text-[9px] uppercase tracking-widest text-[var(--lords-muted)]">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-body text-lg text-[var(--lords-gold)] font-medium">$</span>
                    <span className="font-display text-4xl text-[var(--lords-gold)] font-light leading-none">125</span>
                    <span className="font-body text-[12px] text-[var(--lords-muted)]">/ night</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link
                    to="/booking?room=triple"
                    className="bg-[var(--lords-gold)] hover:bg-[var(--lords-gold-light)] text-[var(--lords-mist)] font-label text-[11px] uppercase tracking-widest font-semibold px-8 py-4 rounded-sm transition-colors shadow-md"
                  >
                    Book Suite
                  </Link>
                  <a
                    href="#compare-section"
                    onClick={handleScrollToComparison}
                    className="font-label text-[11px] uppercase tracking-widest text-[var(--lords-cream)] hover:text-[var(--lords-gold)] border-b border-transparent hover:border-[var(--lords-gold)] pb-1 transition-all"
                  >
                    Specs →
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[rgba(197,168,128,0.15)]" />

      {/* ================================================================
          SECTION 3 — ROOM 2: DOUBLE ROOM (Widescreen Cinematic Letterbox & Staggered Columns)
          ================================================================ */}
      <section 
        id="room-02" 
        className="w-full py-24 md:py-32 px-6 md:px-16 lg:px-20 relative z-10 bg-transparent border-b border-[var(--lords-stone)]/20"
      >
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-16">
          
          {/* CINEMATIC WIDESCREEN VIEWPORT (21:9 Widescreen Frame) */}
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[var(--lords-gold)]/20 shadow-2xl relative group">
            <div className="absolute inset-0 bg-black/35 z-10 transition-colors duration-700 group-hover:bg-black/20" />
            <div className="w-full h-[120%] absolute -top-[10%] left-0 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-102">
              <img 
                ref={el => { roomImageRefs.current[1] = el; }}
                src="/images/double room.jpg" 
                alt="Luxury Double Room Accommodation" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Absolute Badges Inside Cinematic Frame */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 flex items-center gap-3">
              <span className="bg-black/60 backdrop-blur-md border border-[var(--lords-gold)]/20 text-[var(--lords-gold)] font-label text-[9px] uppercase tracking-[0.25em] px-4 py-2 font-semibold rounded-sm">
                02 / STARLIT RETREAT
              </span>
            </div>
            
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 max-w-[420px] hidden sm:block">
              <span className="font-label text-[9px] uppercase tracking-widest text-[var(--lords-gold)] block mb-1">
                EXQUISITE HIGH-ALTITUDE COMFORT
              </span>
              <h3 className="font-display text-2xl text-[var(--lords-cream)] font-light">
                Double Room
              </h3>
            </div>
          </div>

          {/* STAGGERED THREE-COLUMN EDITORIAL SPREAD */}
          <div 
            ref={el => { roomContentRefs.current[1] = el; }}
            className="grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr_0.9fr] gap-8 md:gap-12 lg:gap-16 items-start"
          >
            
            {/* COLUMN 1: Large Typographic Quote Callout */}
            <div className="relative border-l-2 border-[var(--lords-gold)]/30 pl-6 py-2">
              <span className="font-display text-6xl text-[var(--lords-gold)] opacity-10 absolute -top-8 -left-4 font-serif">
                “
              </span>
              <p className="font-serif italic text-lg lg:text-xl text-[var(--lords-smoke)] leading-relaxed">
                A gorgeous window into the starlit highland dream, where the mountain mist drifts across your private overlook.
              </p>
              <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--lords-muted)] block mt-4">
                THE RETREAT EXPERIENCE
              </span>
            </div>

            {/* COLUMN 2: Breathing Narrative & Pricing */}
            <div className="flex flex-col">
              <h4 className="font-display text-2xl text-[var(--lords-cream)] font-light mb-4">
                Refined Space for Shared Solace
              </h4>
              <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-[1.9] mb-8 font-light">
                Elegant comfort paired with stunning mountain vistas. Our Double Room is equipped with premium bespoke furnishings, tea amenities, and a deeply peaceful atmosphere designed for couples or individuals looking to immerse themselves in highland tranquility above the clouds.
              </p>
              
              <div className="flex items-center gap-6 mt-auto">
                <Link
                  to="/booking?room=double"
                  className="bg-[var(--lords-gold)] hover:bg-[var(--lords-gold-light)] text-[var(--lords-mist)] font-label text-[11px] uppercase tracking-widest font-semibold px-8 py-4.5 rounded-sm transition-colors shadow-md"
                >
                  Book This Room
                </Link>
                <a
                  href="#compare-section"
                  onClick={handleScrollToComparison}
                  className="font-label text-[11px] uppercase tracking-widest text-[var(--lords-cream)] hover:text-[var(--lords-gold)] border-b border-transparent hover:border-[var(--lords-gold)] pb-1 transition-all"
                >
                  View Table →
                </a>
              </div>
            </div>

            {/* COLUMN 3: Glass Curated Spec List Card */}
            <div className="glass-panel-light p-6 rounded-xl border border-[var(--lords-gold)]/20 shadow-2xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--lords-gold)]/5 rounded-full blur-xl" />
              
              <div className="border-b border-[var(--lords-stone)]/40 pb-4 mb-4">
                <span className="font-label text-[9px] uppercase tracking-widest text-[var(--lords-muted)] block">
                  NIGHTLY RATES FROM
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-body text-lg text-[var(--lords-gold)]">$</span>
                  <span className="font-display text-3xl text-[var(--lords-gold)] font-medium">105</span>
                  <span className="font-body text-[11px] text-[var(--lords-muted)] pl-1">/ night</span>
                </div>
              </div>

              <span className="font-label text-[9px] uppercase tracking-widest text-[var(--lords-muted)] block mb-3">
                ROOM SPECIFICATIONS
              </span>
              <ul className="flex flex-col gap-3 font-body text-[13.5px] text-[var(--lords-smoke)]">
                <li className="flex justify-between border-b border-[var(--lords-stone)]/20 pb-2">
                  <span>Occupancy</span>
                  <span className="text-[var(--lords-cream)]">2 Guests</span>
                </li>
                <li className="flex justify-between border-b border-[var(--lords-stone)]/20 pb-2">
                  <span>Bed Size</span>
                  <span className="text-[var(--lords-cream)]">1 Double Bed</span>
                </li>
                <li className="flex justify-between border-b border-[var(--lords-stone)]/20 pb-2">
                  <span>Outlook</span>
                  <span className="text-[var(--lords-cream)]">Sunset Highlands</span>
                </li>
                <li className="flex justify-between border-b border-[var(--lords-stone)]/20 pb-2">
                  <span>Hot Water</span>
                  <span className="text-[var(--lords-cream)] flex items-center gap-1">✓ Available</span>
                </li>
                <li className="flex justify-between">
                  <span>Ceylon Tea</span>
                  <span className="text-[var(--lords-cream)]">Complementary</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[rgba(197,168,128,0.15)]" />

      {/* ================================================================
          SECTION 4 — ROOM 3: SMALL DOUBLE ROOM (Architectural Rectangular Viewport & Offset Minimalist Mosaic)
          ================================================================ */}
      <section 
        id="room-03" 
        className="w-full py-24 md:py-32 px-6 md:px-16 lg:px-20 relative z-10 bg-transparent border-b border-[var(--lords-stone)]/20"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Architectural Image Frame (Aspect 4/3 to prevent cropping) */}
          <div className="relative w-full max-w-[540px] aspect-[4/3] mx-auto order-1 lg:order-1">
            
            {/* Outline Blueprint Markings (Fine Golden Borders) */}
            <div className="absolute -inset-4 border border-[var(--lords-gold)]/15 rounded-3xl pointer-events-none scale-102" />
            <div className="absolute -top-8 left-6 font-label text-[8px] tracking-[0.4em] text-[var(--lords-muted)]">
              ARCHITECTURAL COMPACT RETREAT
            </div>
            
            {/* The Framed Image */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--lords-gold)]/25 shadow-2xl relative group">
              <div className="absolute inset-0 bg-black/25 z-10 transition-colors duration-500 group-hover:bg-black/15" />
              <div className="w-full h-[120%] absolute -top-[10%] left-0 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-103">
                <img 
                  ref={el => { roomImageRefs.current[2] = el; }}
                  src="/images/small double room.jpg" 
                  alt="Boutique Small Double Room" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-15" />
              
              {/* Watermark in image */}
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-label text-[9px] uppercase tracking-[0.3em] text-[var(--lords-cream)]">
                03 / THE HIGHLAND NEST
              </span>
            </div>

            {/* Overlapping coordinates block */}
            <div className="absolute -bottom-4 -left-6 z-25 bg-[var(--lords-moss)] border border-[var(--lords-gold)]/20 px-4 py-2 shadow-lg hidden sm:block">
              <span className="font-label text-[9px] uppercase tracking-wider text-[var(--lords-gold)]">
                ELEVATION 1,430M
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Offset Minimalist Content Card Overlay */}
          <div 
            ref={el => { roomContentRefs.current[2] = el; }}
            className="flex flex-col justify-center order-2 lg:order-2 relative"
          >
            {/* Oversized watermark number */}
            <span className="font-display text-[150px] text-[var(--lords-gold)] opacity-[0.02] select-none absolute -top-16 right-0 font-bold leading-none pointer-events-none">
              03
            </span>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--lords-gold)]">
                BOUTIQUE VALUE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--lords-gold)]" />
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--lords-muted)]">
                2 GUESTS
              </span>
            </div>

            <h2 className="font-display text-[clamp(40px,5vw,56px)] text-[var(--lords-cream)] leading-none font-light mb-6">
              Small Double
            </h2>
            <div className="w-12 h-[2px] bg-[var(--lords-gold)] mb-8" />

            {/* Premium Quote Callout */}
            <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-[1.9] max-w-[480px] mb-8 font-light">
              Cozy elegance offering excellent boutique value. The Small Double room is a beautifully compact, perfectly comfortable space with all boutique essentials and gorgeous mountain-themed decor—crafted for short stays or solo travelers seeking high-altitude sanctuary on the Haputale slopes.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 mb-10 max-w-[480px]">
              {[
                { icon: '🛏', text: '1 Double Bed' },
                { icon: '🚿', text: 'Private Bath' },
                { icon: '📺', text: 'Smart TV' },
                { icon: '📶', text: 'Free WiFi' },
                { icon: '🏔', text: 'Hill View' },
                { icon: '🧴', text: 'Amenities Kit' },
              ].map((pill, idx) => (
                <span 
                  key={idx}
                  className="flex items-center gap-1.5 bg-[var(--lords-stone)]/40 text-[var(--lords-cream)] font-label text-[10px] uppercase tracking-wider px-3.5 py-2 border border-[var(--lords-gold)]/10"
                >
                  <span>{pill.icon}</span>
                  <span>{pill.text}</span>
                </span>
              ))}
            </div>

            {/* Price Section and CTAs stacked staggered */}
            <div className="glass-panel w-full max-w-[500px] p-6 rounded-xl border border-[var(--lords-gold)]/20 shadow-xl flex items-center justify-between flex-wrap gap-6">
              <div className="flex flex-col">
                <span className="font-label text-[9px] uppercase tracking-widest text-[var(--lords-muted)]">
                  Starting from
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-body text-lg text-[var(--lords-gold)]">$</span>
                  <span className="font-display text-4xl text-[var(--lords-gold)] font-light leading-none">95</span>
                  <span className="font-body text-[12px] text-[var(--lords-muted)]">/ night</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/booking?room=small-double"
                  className="bg-[var(--lords-gold)] hover:bg-[var(--lords-gold-light)] text-[var(--lords-mist)] font-label text-[11px] uppercase tracking-widest font-semibold px-8 py-4 rounded-sm transition-colors shadow-md"
                >
                  Book Nest
                </Link>
                <a
                  href="#compare-section"
                  onClick={handleScrollToComparison}
                  className="font-label text-[11px] uppercase tracking-widest text-[var(--lords-cream)] hover:text-[var(--lords-gold)] border-b border-transparent hover:border-[var(--lords-gold)] pb-1 transition-all"
                >
                  Specs →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — COMPARISON TABLE
          ================================================================ */}
      <section 
        id="compare-section"
        ref={comparisonRef}
        className="bg-[var(--lords-mist)] py-24 md:py-32 px-6 md:px-16 lg:px-20 relative z-10 border-t border-[var(--lords-stone)]/20"
      >
        <div className="max-w-[1200px] mx-auto w-full">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-label text-[10px] uppercase tracking-[0.45em] text-[var(--lords-gold)] block mb-3">
              ACCOMMODATION SPECS
            </span>
            <h2 className="font-display text-[var(--lords-cream)] text-[clamp(32px,5vw,56px)] font-light leading-tight">
              Compare Rooms
            </h2>
            <p className="font-body text-sm text-[var(--lords-smoke)] mt-3">
              Find your perfect fit.
            </p>
          </div>

          {/* Table Container */}
          <div className="glass-panel overflow-x-auto rounded-xl border border-[var(--lords-stone)]/50 shadow-2xl">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="bg-[var(--lords-moss)] text-[var(--lords-cream)] font-label text-[11px] uppercase tracking-[0.2em]">
                  <th className="py-5 px-6 font-semibold border-b border-[var(--lords-stone)]/40">Feature</th>
                  <th className="py-5 px-6 font-semibold border-b border-[var(--lords-stone)]/40 text-center">Triple Room</th>
                  <th className="py-5 px-6 font-semibold border-b border-[var(--lords-stone)]/40 text-center">Double Room</th>
                  <th className="py-5 px-6 font-semibold border-b border-[var(--lords-stone)]/40 text-center">Small Double</th>
                </tr>
              </thead>
              <tbody className="font-body text-[14px] text-[var(--lords-smoke)]">
                
                {/* Floor Size */}
                <tr className="bg-black/10 hover:bg-black/20 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Floor Size</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">32 m²</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">28 m²</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">22 m²</td>
                </tr>

                {/* Max Guests */}
                <tr className="bg-black/25 hover:bg-black/35 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Max Guests</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">3 Guests</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">2 Guests</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">2 Guests</td>
                </tr>

                {/* Bed Type */}
                <tr className="bg-black/10 hover:bg-black/20 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Bed Type</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center flex items-center justify-center gap-1.5 mt-0.5">
                    <BedDouble size={14} className="text-[var(--lords-gold)]" /> King size
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    Double size
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    Double size
                  </td>
                </tr>

                {/* Mountain View */}
                <tr className="bg-black/25 hover:bg-black/35 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Mountain View</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                </tr>

                {/* Hot Water */}
                <tr className="bg-black/10 hover:bg-black/20 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Hot Water</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                </tr>

                {/* WiFi */}
                <tr className="bg-black/25 hover:bg-black/35 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Free WiFi</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                </tr>

                {/* Smart TV */}
                <tr className="bg-black/10 hover:bg-black/20 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Smart TV</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                </tr>

                {/* Private Bath */}
                <tr className="bg-black/25 hover:bg-black/35 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Private Bath</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                </tr>

                {/* Tea Service */}
                <tr className="bg-black/10 hover:bg-black/20 transition-colors">
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 font-medium text-[var(--lords-cream)]">Tea Service</td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <Check size={16} className="text-[var(--lords-gold)] mx-auto" />
                  </td>
                  <td className="py-4 px-6 border-b border-[var(--lords-stone)]/20 text-center">
                    <X size={16} className="text-[var(--lords-muted)] mx-auto" />
                  </td>
                </tr>

                {/* Price (Highlighted) */}
                <tr className="bg-[var(--lords-gold)]/10 hover:bg-[var(--lords-gold)]/15 transition-all">
                  <td className="py-6 px-6 font-semibold text-[var(--lords-gold)]">Price per night</td>
                  <td className="py-6 px-6 text-center font-display text-[22px] text-[var(--lords-gold)] font-medium">$125</td>
                  <td className="py-6 px-6 text-center font-display text-[22px] text-[var(--lords-gold)] font-medium">$105</td>
                  <td className="py-6 px-6 text-center font-display text-[22px] text-[var(--lords-gold)] font-medium">$95</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ================================================================
          SECTION 6 — ROOM CTA
          ================================================================ */}
      <section 
        className="relative py-28 px-6 md:px-16 lg:px-20 text-center border-t border-[var(--lords-stone)]/20 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, var(--lords-fog) 0%, var(--lords-forest) 100%)',
        }}
      >
        {/* Background glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="font-label text-[10px] uppercase tracking-[0.45em] text-[var(--lords-gold)] mb-5">
            YOUR HIGHLAND ESCAPE
          </span>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] text-[var(--lords-cream)] font-light leading-tight mb-8">
            Ready to check in?
          </h2>
          <div className="w-12 h-[2px] bg-[var(--lords-gold)] mb-10" />

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/booking"
              className="bg-[var(--lords-gold)] hover:bg-[var(--lords-gold-light)] text-[var(--lords-mist)] font-label text-[12px] uppercase tracking-widest font-semibold px-12 py-[18px] transition-colors rounded-sm shadow-lg min-w-[200px]"
            >
              Book Your Room
            </Link>
            <Link
              to="/contact"
              className="border border-[var(--lords-cream)]/30 hover:border-[var(--lords-cream)] text-[var(--lords-cream)] font-label text-[12px] uppercase tracking-widest font-semibold px-12 py-[18px] transition-colors rounded-sm min-w-[200px]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
