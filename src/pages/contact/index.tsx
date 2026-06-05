import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Share2, Facebook, Instagram, Check } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

// Custom Accordion Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={`border-b border-[var(--lords-stone)] transition-all duration-500 ${isOpen
          ? 'pl-6 border-l-[3px] border-l-[var(--lords-gold)] bg-[var(--lords-stone)]/20'
          : 'pl-0 border-l-[3px] border-l-transparent bg-transparent'
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
      >
        <span className="font-serif text-lg text-[var(--lords-cream)] md:text-xl font-light tracking-wide pr-6 group-hover:text-[var(--lords-gold-light)] transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-[var(--lords-gold)] text-2xl font-light shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm md:text-[15px] font-body font-light text-[var(--lords-smoke)] leading-relaxed max-w-[90%]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Attractions / Destinations Data for 3D Carousel
interface AttractionItem {
  category: string;
  title: string;
  location: string;
  image: string;
  badgeBg: string;
}

const attractionItems: AttractionItem[] = [
  {
    category: "HISTORY",
    title: "Awesome Eiffel Tower",
    location: "Paris, France",
    image: "/images/about/hero.webp",
    badgeBg: "border border-[#c5a880]/30 bg-[#c5a880]/15 text-[#e6d5bf]",
  },
  {
    category: "MAYANS",
    title: "One of the safest states in Mexico",
    location: "The Yucatan, Mexico",
    image: "/images/about/lords-property.webp",
    badgeBg: "border border-[#5e7567]/30 bg-[#5e7567]/15 text-[#9ab0a2]",
  },
  {
    category: "NATIVE",
    title: "The most popular yachting destination",
    location: "Whitsunday Islands, Australia",
    image: "/images/about/lords-story-portrait.webp",
    badgeBg: "border border-[#1c3525]/30 bg-[#1c3525]/25 text-[#9ab0a2]",
  },
  {
    category: "DOMESTIC",
    title: "Enjoy the exotic of sunny Hawaii",
    location: "Maui, Hawaii",
    image: "/images/about/lords-amenity.webp",
    badgeBg: "border border-[#8b7355]/30 bg-[#8b7355]/15 text-[#e6d5bf]",
  },
  {
    category: "SUBTROPICAL",
    title: "The Island of Eternal Spring",
    location: "Lanzarote, Spanien",
    image: "/images/about/lords-interior.webp",
    badgeBg: "border border-[#c5a880]/20 bg-[#c5a880]/10 text-[#e6d5bf]",
  },
];

// 3D Carousel Card Component matching the screenshot style 100%
function AttractionCard({ item, isActive }: { item: AttractionItem; isActive: boolean }) {
  return (
    <div
      className={`w-full h-full rounded-2xl overflow-hidden border transition-all duration-750 ease-out relative flex flex-col justify-end p-6 select-none ${
        isActive
          ? 'border-[var(--lords-gold)]/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)]'
          : 'border-[var(--lords-stone)]/55 shadow-[0_12px_24px_rgba(0,0,0,0.4)]'
      }`}
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out -z-10 ${
          isActive ? 'scale-105' : 'scale-100'
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
        <h3 className="font-serif text-[17px] md:text-[20px] text-[var(--lords-cream)] font-light leading-snug tracking-wide mb-3">
          {item.title}
        </h3>

        {/* Location Pin & Name */}
        <div className="flex items-center gap-1.5 text-[var(--lords-smoke)]">
          <MapPin size={13} className="text-[var(--lords-gold)] shrink-0" />
          <span className="font-body text-xs font-light tracking-wide truncate">
            {item.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Carousel Slider Active Index State
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Autoplay and responsive width handler
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

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion State
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // FAQ Items Data
  const faqItems = [
    {
      question: 'What are check-in/out times?',
      answer: 'Check-in is at 12 PM, and check-out is at 10 AM. Early check-in or late check-out can be requested in advance and is subject to availability.',
    },
    {
      question: 'Is breakfast included?',
      answer: 'Yes, we offer complimentary traditional Sri Lankan or continental breakfast prepared fresh by our local chefs each morning.',
    },
    {
      question: 'Airport transfer available?',
      answer: 'Absolutely. We can arrange premium airport transfers directly to Lord\'s Haputale from Bandaranaike International Airport (CMB) on request. Please inform us of your flight details at least 48 hours prior to arrival.',
    },
    {
      question: 'Children welcome?',
      answer: 'Yes, we welcome families and children of all ages. Extra beds and baby cots can be provided upon request depending on room size constraints.',
    },
    {
      question: 'Payment methods?',
      answer: 'We accept all major international credit/debit cards (Visa, MasterCard, Amex) as well as direct cash payments in LKR, USD, or EUR.',
    },
    {
      question: 'WiFi available?',
      answer: 'Free high-speed fiber WiFi is available throughout the property, including guest suites and common outdoor relaxation lounges.',
    },
    {
      question: 'Special occasion arrangements?',
      answer: 'We love hosting special occasions! Contact us in advance to organize custom tea estate dinners, anniversary celebrations, custom birthday events, or flower bouquets.',
    },
    {
      question: 'Nearby attractions?',
      answer: 'We are situated close to iconic highland locations including Lipton\'s Seat, Horton Plains National Park, Bambarakanda Falls, Adisham Bungalow, and Diyaluma Falls. Guided excursions can be curated upon request.',
    },
  ];

  // GSAP animations on load / scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero elements reveal
      gsap.fromTo(
        '.hero-animate',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15, delay: 0.1 }
      );

      // Scroll trigger for Details cards
      gsap.fromTo(
        '.detail-card-animate',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: detailsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Scroll trigger for FAQ Section
      gsap.fromTo(
        '.faq-title-animate',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.faq-accordion-animate',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1200);
  };

  return (
    <div ref={heroRef} className="w-full bg-transparent text-[var(--lords-charcoal)] overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO (Modern split columns with 3D Carousel on the right)
          ================================================================ */}
      <section 
        className="relative lg:h-[70vh] min-h-[600px] flex items-center pt-32 pb-16 px-6 md:px-16 lg:px-24 border-b border-[var(--lords-stone)]/30 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at center, #0e1e14 0%, #050a07 100%)'
        }}
      >
        {/* Subtle background text watermark */}
        <div className="absolute right-0 bottom-4 pointer-events-none select-none overflow-hidden opacity-[0.02] translate-y-6">
          <span className="font-display text-[22vw] leading-none tracking-tighter text-[var(--lords-cream)] font-bold">
            CONTACT
          </span>
        </div>

        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 overflow-visible">
          {/* Left Column: Headings & Contact pills */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center h-full text-left">
            {/* Coordinate / Stamp Line */}
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

            {/* Contact chips container */}
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

          {/* Right Column: 3D Circular Card Carousel Slider */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center w-full h-[320px] md:h-[380px] overflow-visible mt-8 lg:mt-0">
            <div className="relative w-full h-full flex items-center justify-center overflow-visible select-none">
              {attractionItems.map((item, index) => {
                // Circular layout difference (-2 to +2)
                let diff = index - activeIndex;
                if (diff < -2) diff += 5;
                if (diff > 2) diff -= 5;

                const isActive = diff === 0;

                // Animate properties based on relative index 'diff'
                const desktopX = diff * 105; // Spacing offset
                const mobileX = diff * 75;

                // Determine zIndex, scale, opacity
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

            {/* Custom Pagination Bullets */}
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

      {/* ================================================================
          SECTION 2 — MAP + FORM (Layered)
          ================================================================ */}
      <section className="relative w-full lg:h-[700px] flex flex-col lg:block bg-[var(--lords-mist)]">
        {/* Layer 1: Google Maps Embed (Styled to dark-theme using CSS Filters) */}
        <div className="w-full h-[350px] sm:h-[450px] lg:h-full relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.047735751085!2d80.95021397399582!3d6.764034393232658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4719a8a6f3a89%3A0x4fc8d27c72ac07ec!2s50%2C%2010%20Beragala-Hali%20Ela%2C%20Haputale%2090160!5e0!3m2!1sen!2slk!4v1749019333270!5m2!1sen!2slk"
            className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lord's Haputale Location Map"
          />
          {/* Subtle vignette overlays to blend map edges with site background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--lords-mist)] via-transparent to-[var(--lords-mist)]/30 pointer-events-none lg:hidden" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--lords-mist)] to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--lords-mist)] to-transparent pointer-events-none hidden lg:block" />
        </div>

        {/* Layer 2: Floating Contact Form Card */}
        <div className="px-6 py-12 lg:py-0 w-full lg:absolute lg:inset-y-0 lg:right-24 lg:flex lg:items-center lg:justify-end z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="pointer-events-auto w-full max-w-[440px] bg-[rgba(9,18,13,0.92)] backdrop-blur-[20px] border border-[rgba(197,168,128,0.18)] shadow-[0_24px_64px_rgba(0,0,0,0.65)] rounded-lg p-8 md:p-10 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-[28px] text-[var(--lords-cream)] font-light mb-1 leading-tight">
                    Send a Message
                  </h2>
                  <div className="w-10 h-[2px] bg-[var(--lords-gold)] mb-8 mt-2" />

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Full Name */}
                    <div className="relative w-full group">
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder=" "
                        required
                        className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer"
                      />
                      <label
                        htmlFor="fullname"
                        className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                      >
                        Full Name *
                      </label>
                    </div>

                    {/* Email Address */}
                    <div className="relative w-full group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        required
                        className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                      >
                        Email Address *
                      </label>
                    </div>

                    {/* Phone Number */}
                    <div className="relative w-full group">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                      >
                        Phone Number
                      </label>
                    </div>

                    {/* Message Area */}
                    <div className="relative w-full group mt-2">
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder=" "
                        rows={4}
                        required
                        className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer resize-none"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                      >
                        Message *
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--lords-moss)] text-white hover:bg-[var(--lords-forest)] disabled:opacity-50 text-[11px] font-label font-medium uppercase tracking-[0.25em] py-4 rounded-sm transition-colors duration-300 shadow-md cursor-pointer mt-4"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  {/* Premium animated checkmark wrapper */}
                  <div className="w-20 h-20 bg-[var(--lords-stone)]/50 rounded-full flex items-center justify-center border border-[var(--lords-gold)]/20 mb-6 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="text-[var(--lords-gold)]"
                    >
                      <Check size={36} strokeWidth={2.5} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[var(--lords-gold)]"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.3 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </div>

                  <h3 className="font-serif text-2xl text-[var(--lords-cream)] mb-3 font-light">
                    Message Sent!
                  </h3>
                  <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed mb-6 font-light">
                    Thank you for reaching out. We have received your message and will reply to you within 24 hours.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="font-label text-xs text-[var(--lords-gold)] hover:text-[var(--lords-gold-light)] uppercase tracking-widest border-b border-[var(--lords-gold)] pb-1 hover:border-[var(--lords-gold-light)] transition-all cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — CONTACT DETAILS STRIP
          ================================================================ */}
      <section
        ref={detailsRef}
        className="bg-[var(--lords-fog)] py-24 px-6 md:px-16 lg:px-24 border-y border-[var(--lords-stone)]/30"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Location */}
            <div className="detail-card-animate w-full flex flex-col bg-[var(--lords-stone)]/30 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-xl shadow-lg hover:border-[var(--lords-gold)]/30 transition-all duration-500 group hover:-translate-y-1">
              <div className="p-3.5 bg-[var(--lords-moss)]/30 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-lg w-fit mb-6 transition-colors duration-300 group-hover:bg-[var(--lords-moss)]/50">
                <MapPin size={24} />
              </div>
              <h3 className="font-serif text-xl text-[var(--lords-cream)] mb-3 font-light">
                Our Address
              </h3>
              <p className="font-body text-sm text-[var(--lords-smoke)] leading-relaxed mb-6 font-light">
                50 Beragala-Hali Ela 10/189
                <br />
                Haputale, Sri Lanka
              </p>
              <a
                href="https://maps.google.com/?q=50,+10+Beragala-Hali+Ela,+Haputale+90160"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto font-label text-xs uppercase tracking-widest text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] flex items-center gap-1.5 transition-colors duration-300"
              >
                <span>View on Map</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>

            {/* Card 2: Phone */}
            <div className="detail-card-animate w-full flex flex-col bg-[var(--lords-stone)]/30 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-xl shadow-lg hover:border-[var(--lords-gold)]/30 transition-all duration-500 group hover:-translate-y-1">
              <div className="p-3.5 bg-[var(--lords-moss)]/30 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-lg w-fit mb-6 transition-colors duration-300 group-hover:bg-[var(--lords-moss)]/50">
                <Phone size={24} />
              </div>
              <h3 className="font-serif text-xl text-[var(--lords-cream)] mb-3 font-light">
                Call Us
              </h3>
              <p className="font-body text-sm text-[var(--lords-smoke)] leading-relaxed mb-6 font-light">
                070 700 7555
                <br />
                <span className="text-[var(--lords-muted)] italic">Available 24/7 for booking inquiries</span>
              </p>
              <a
                href="tel:0707007555"
                className="mt-auto font-label text-xs uppercase tracking-widest text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] flex items-center gap-1.5 transition-colors duration-300"
              >
                <span>Call Now</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>

            {/* Card 3: Email */}
            <div className="detail-card-animate w-full flex flex-col bg-[var(--lords-stone)]/30 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-xl shadow-lg hover:border-[var(--lords-gold)]/30 transition-all duration-500 group hover:-translate-y-1">
              <div className="p-3.5 bg-[var(--lords-moss)]/30 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-lg w-fit mb-6 transition-colors duration-300 group-hover:bg-[var(--lords-moss)]/50">
                <Mail size={24} />
              </div>
              <h3 className="font-serif text-xl text-[var(--lords-cream)] mb-3 font-light">
                Email Us
              </h3>
              <p className="font-body text-sm text-[var(--lords-smoke)] leading-relaxed mb-6 font-light">
                info@lordshaputale.com
                <br />
                <span className="text-[var(--lords-muted)]">We reply within 24 hours</span>
              </p>
              <a
                href="mailto:info@lordshaputale.com"
                className="mt-auto font-label text-xs uppercase tracking-widest text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] flex items-center gap-1.5 transition-colors duration-300"
              >
                <span>Send Email</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>

            {/* Card 4: Social */}
            <div className="detail-card-animate w-full flex flex-col bg-[var(--lords-stone)]/30 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-xl shadow-lg hover:border-[var(--lords-gold)]/30 transition-all duration-500 group hover:-translate-y-1">
              <div className="p-3.5 bg-[var(--lords-moss)]/30 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-lg w-fit mb-6 transition-colors duration-300 group-hover:bg-[var(--lords-moss)]/50">
                <Share2 size={24} />
              </div>
              <h3 className="font-serif text-xl text-[var(--lords-cream)] mb-3 font-light">
                Follow Us
              </h3>
              <div className="flex items-center gap-4.5 mb-6">
                <a
                  href="https://facebook.com/lordshaputale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] transition-colors duration-300 p-1 bg-[var(--lords-stone)]/50 hover:bg-[var(--lords-stone)] border border-[var(--lords-stone)] rounded"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://instagram.com/lordshaputale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] transition-colors duration-300 p-1 bg-[var(--lords-stone)]/50 hover:bg-[var(--lords-stone)] border border-[var(--lords-stone)] rounded"
                >
                  <Instagram size={18} />
                </a>
                <span className="font-body text-xs text-[var(--lords-smoke)] truncate">
                  @lordshaputale
                </span>
              </div>
              <a
                href="https://instagram.com/lordshaputale"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto font-label text-xs uppercase tracking-widest text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] flex items-center gap-1.5 transition-colors duration-300"
              >
                <span>Follow Us</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — FAQ
          ================================================================ */}
      <section
        ref={faqRef}
        className="bg-[var(--lords-mist)] py-28 px-6 md:px-16 lg:px-24 relative z-10"
      >
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[38%_62%] gap-16 items-start">
          {/* LEFT: FAQ Headings */}
          <div className="faq-title-animate lg:sticky lg:top-32 self-start">
            <span className="font-label text-[10px] tracking-[0.45em] uppercase text-[var(--lords-gold)] mb-3 block">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="font-display text-[var(--lords-cream)] text-[clamp(32px,4vw,48px)] font-light leading-[1.15] mb-6">
              Common Questions
            </h2>
            <div className="w-12 h-[2px] bg-[var(--lords-gold)] mb-6" />
            <p className="font-body text-[15px] text-[var(--lords-smoke)] font-light leading-relaxed max-w-[340px]">
              Find answers to core details regarding your stay, check-in logistics, amenities, and cancellations at our highland sanctuary.
            </p>
          </div>

          {/* RIGHT: Accordions list */}
          <div className="faq-accordion-animate flex flex-col">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQIndex === index}
                onToggle={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
