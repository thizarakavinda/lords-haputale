import { MapPin, Phone, Mail, Star, Users, Mountain } from 'lucide-react';

const highlights = [
  { icon: <MapPin size={18} className="text-[var(--lords-gold)]" />, title: "Address", detail: "50 Beragala-Hali Ela, Haputale" },
  { icon: <Phone size={18} className="text-[var(--lords-gold)]" />, title: "Phone", detail: "070 700 7555" },
  { icon: <Mail size={18} className="text-[var(--lords-gold)]" />, title: "Email", detail: "info@lordshaputale.com" },
  { icon: <Star size={18} className="text-[var(--lords-gold)]" />, title: "Standard", detail: "5-Star Accommodations" },
  { icon: <Users size={18} className="text-[var(--lords-gold)]" />, title: "Suitability", detail: "Family & Couple Friendly" },
  { icon: <Mountain size={18} className="text-[var(--lords-gold)]" />, title: "Setting", detail: "Haputale Hill Country" },
];

// AboutHighlights renders the property details mosaic layout and icon-based highlight list
export default function AboutHighlights() {
  return (
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
  );
}
