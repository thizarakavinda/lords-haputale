import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import MarqueeStrip from './MarqueeStrip';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: 'rgb(13, 26, 17)', borderTop: '1px solid rgba(197, 168, 128, 0.14)' }}>

      {/* Dramatic watermark behind content */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display leading-none whitespace-nowrap text-[var(--lords-cream)]"
          style={{ fontSize: 'clamp(100px, 22vw, 280px)', opacity: 0.025, marginTop: '-2%' }}
        >
          LORD'S
        </span>
      </div>

      {/* Gold marquee at top */}
      <MarqueeStrip variant="gold" />

      {/* ─── Main content ─── */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 pt-20 pb-10 relative z-10">

        {/* Top section: brand + 3 link columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 mb-16">

          {/* ── Brand block ── */}
          <div className="flex flex-col gap-7">
            <Link to="/" className="flex items-center gap-1 w-fit group">
              {/* Logo badge */}
              <img
                src="/images/lords-logo.png"
                alt="Lord's Haputale Logo"
                className="w-14 h-14 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display text-[17px] tracking-[0.3em] text-[var(--lords-cream)] leading-tight">LORD'S</span>
                <span className="font-label text-[10px] tracking-[0.45em] text-[var(--lords-gold)]">HAPUTALE · EST. 2018</span>
              </div>
            </Link>

            <p className="font-body text-[15px] text-[var(--lords-smoke)] leading-[1.85] max-w-[300px]">
              A sanctuary perched 1,430m above sea level in Sri Lanka's hill country — where mist, forest and quiet luxury meet.
            </p>

            {/* Social row */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Facebook,  label: 'Facebook',  href: '#' },
                { Icon: Youtube,   label: 'YouTube',   href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center text-[var(--lords-smoke)] transition-all duration-300 hover:text-[var(--lords-gold)] rounded-sm"
                  style={{ border: '1px solid rgba(26, 48, 35, 0.7)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(197,168,128,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(26,48,35,0.7)')}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* Explore */}
            <div>
              <h4 className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)] mb-6">Explore</h4>
              <nav className="flex flex-col gap-3.5">
                {[
                  { label: 'Home',    to: '/' },
                  { label: 'About',   to: '/about' },
                  { label: 'Rooms',   to: '/rooms' },
                  { label: 'Gallery', to: '/gallery' },
                  { label: 'Contact', to: '/contact' },
                ].map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="font-body text-[14px] text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] transition-colors flex items-center gap-1 w-fit group"
                  >
                    {label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)] mb-6">Contact</h4>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:0707007555"
                  className="flex items-start gap-2.5 text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] transition-colors group"
                >
                  <Phone size={13} className="mt-0.5 shrink-0 text-[var(--lords-gold)]" />
                  <span className="font-body text-[14px]">070 700 7555</span>
                </a>
                <a
                  href="mailto:info@lordshaputale.com"
                  className="flex items-start gap-2.5 text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] transition-colors group"
                >
                  <Mail size={13} className="mt-0.5 shrink-0 text-[var(--lords-gold)]" />
                  <span className="font-body text-[14px] break-all">info@lordshaputale.com</span>
                </a>
                <div className="flex items-start gap-2.5 text-[var(--lords-smoke)]">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-[var(--lords-gold)]" />
                  <span className="font-body text-[14px] leading-relaxed">
                    50 Beragala-Hali Ela,<br />Haputale, Sri Lanka
                  </span>
                </div>
              </div>
            </div>

            {/* Book Direct CTA */}
            <div>
              <h4 className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold)] mb-6">Stay With Us</h4>
              <p className="font-body text-[14px] text-[var(--lords-smoke)] leading-relaxed mb-6">
                Best rates guaranteed when you book directly with us — no middleman fees.
              </p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-wider text-[var(--lords-mist)] px-5 py-3 transition-all duration-300 hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--lords-gold), var(--lords-gold-light))' }}
              >
                Reserve Now <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full mb-8" style={{ background: 'rgba(46, 125, 80, 0.18)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-[12px] text-[var(--lords-muted)]">
            © {year} Lord's Haputale. All rights reserved.
          </p>
          <p className="font-body text-[12px] text-[var(--lords-muted)]">
            Crafted by{' '}
            <span className="text-[var(--lords-smoke)] hover:text-[var(--lords-gold)] transition-colors cursor-pointer">
              Sysflicx
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
