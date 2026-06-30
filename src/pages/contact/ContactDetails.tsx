import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Share2, Facebook, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ContactDetails displays the address, telephone, email, and social profiles
export default function ContactDetails() {
  const detailsRef = useRef<HTMLElement>(null);

  // GSAP animation on scroll viewport reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, detailsRef);

    return () => ctx.revert();
  }, []);

  return (
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
  );
}
