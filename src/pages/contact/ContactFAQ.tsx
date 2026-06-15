import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// ContactFAQ renders the accordion layout for frequent guest inquiries
export default function ContactFAQ() {
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // GSAP scroll trigger entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, faqRef);

    return () => ctx.revert();
  }, []);

  return (
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
  );
}
