import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header 
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1280px] h-[72px] z-50 rounded-full border border-[var(--lords-stone)]/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{
          background: 'rgba(13, 26, 17, 0.78)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="w-full h-full px-8 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-1 z-50">
            <img
              src="/images/lords-logo.png"
              alt="Lord's Haputale Logo"
              className="w-13 h-13 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.2em] leading-tight text-[var(--lords-charcoal)]">LORD'S</span>
              <span className="font-label text-[9px] tracking-widest text-[var(--lords-muted)]">HAPUTALE</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="font-label text-xs uppercase tracking-widest text-[var(--lords-charcoal)] hover:text-[var(--lords-gold)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center gap-4 z-50">
            <Link 
              to="/booking"
              className="hidden md:flex items-center justify-center bg-[var(--lords-gold)] text-[var(--lords-mist)] font-label text-[11px] uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-[var(--lords-gold-light)] font-medium transition-colors"
            >
              Book Now
            </Link>
            
            <button 
              className="md:hidden text-[var(--lords-charcoal)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--lords-mist)] flex flex-col pt-24 px-6 pb-12"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl text-[var(--lords-charcoal)] hover:text-[var(--lords-gold)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Link 
                to="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center bg-[var(--lords-moss)] text-white font-label text-xs uppercase tracking-wider p-4 w-full rounded-sm"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
