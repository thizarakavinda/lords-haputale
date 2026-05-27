import { Link } from 'react-router-dom';
import MarqueeStrip from './MarqueeStrip';

export default function Footer() {
  return (
    <footer className="bg-[var(--lords-forest)] text-white relative overflow-hidden flex flex-col pt-24">
      
      {/* Massive Decorative Text Background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center mt-12">
        <span className="font-display text-[20vw] leading-none text-white opacity-[0.08] tracking-widest whitespace-nowrap">
          LORD'S
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 relative z-10 flex-grow">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-20">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--lords-gold)] flex items-center justify-center text-[var(--lords-charcoal)] font-serif text-xl leading-none">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base tracking-[0.2em] leading-tight">LORD'S</span>
                <span className="font-label text-[11px] tracking-widest text-white/70">HAPUTALE</span>
              </div>
            </Link>
            <p className="font-body text-[15px] text-white/70 leading-relaxed max-w-[260px]">
              A sanctuary where misty mountains meet modern elegance. Haputale's finest boutique experience.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-label text-[10px] tracking-widest text-[var(--lords-gold)] uppercase">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {['Home', 'About', 'Rooms', 'Contact', 'Booking'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="font-body text-[15px] text-white/80 hover:text-[var(--lords-gold)] transition-colors w-fit"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="font-label text-[10px] tracking-widest text-[var(--lords-gold)] uppercase">Contact Us</h4>
            <div className="flex flex-col gap-3 font-body text-[15px] text-white/80">
              <p>50 Beragala-Hali Ela 10/189,<br/>Haputale, Sri Lanka</p>
              <a href="tel:0707007555" className="hover:text-[var(--lords-gold)] transition-colors">070 700 7555</a>
              <a href="mailto:info@lordshaputale.com" className="hover:text-[var(--lords-gold)] transition-colors">info@lordshaputale.com</a>
            </div>
          </div>

          {/* Column 4: Social */}
          <div className="flex flex-col gap-6">
            <h4 className="font-label text-[10px] tracking-widest text-[var(--lords-gold)] uppercase">Follow Us</h4>
            <div className="flex flex-col gap-3 font-body text-[15px] text-white/80">
              <a href="#" className="hover:text-[var(--lords-gold)] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[var(--lords-gold)] transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </div>

      {/* Gold Marquee Strip */}
      <MarqueeStrip variant="gold" />

      {/* Bottom Copyright Bar */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="font-body text-[13px] text-white/50">
          © {new Date().getFullYear()} Lord's Haputale. All rights reserved.
        </p>
        <p className="font-body text-[13px] text-white/50">
          Designed by <span className="text-white/80">Sysflicx</span>
        </p>
      </div>

    </footer>
  );
}
