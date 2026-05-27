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
      <header className="fixed top-0 left-0 w-full h-[72px] glass-panel z-50 border-b border-[var(--lords-stone)]/30">
        <div className="max-w-[1440px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 z-50">
            <img
              src="/images/lords-logo.png"
              alt="Lord's Haputale Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.2em] leading-tight text-[var(--lords-charcoal)]">LORD'S</span>
              <span className="font-label text-[10px] tracking-widest text-[var(--lords-muted)]">HAPUTALE</span>
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
              className="hidden md:flex items-center justify-center bg-[var(--lords-moss)] text-white font-label text-[11px] uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-[var(--lords-forest)] transition-colors"
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
