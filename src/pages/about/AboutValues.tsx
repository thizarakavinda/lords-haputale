import { motion } from 'framer-motion';
import { Star, DollarSign, Heart } from 'lucide-react';

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

// AboutValues renders the diagonal grid displaying the brand values
export default function AboutValues() {
  return (
    <section 
      className="relative py-36 px-6 md:px-20 z-10"
      style={{
        clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0% 100%)',
        background: 'linear-gradient(to bottom, rgba(5, 10, 7, 0.75) 0%, rgba(17, 32, 23, 0.75) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-label text-[11px] uppercase tracking-[0.45em] text-[var(--lords-gold)] block mb-3">
            WHAT WE STAND FOR
          </span>
          <h2 className="font-display text-[var(--lords-cream)] text-[clamp(36px,5vw,64px)] font-light leading-tight">
            Our Values
          </h2>
        </div>

        {/* Cards Grid */}
        <motion.div 
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto"
        >
          {/* Card 1 - Pricing */}
          <motion.div 
            variants={cardVariants}
            className="glass-panel p-10 rounded-2xl flex flex-col relative overflow-hidden group hover:border-[var(--lords-gold)]/30 transition-all duration-300"
          >
            <span className="absolute right-6 top-0 font-display text-[96px] font-bold text-[var(--lords-gold)] opacity-[0.04] select-none group-hover:opacity-[0.07] transition-opacity">
              01
            </span>
            <div className="mb-6 p-3 bg-[var(--lords-moss)]/40 rounded-lg w-fit border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] group-hover:bg-[var(--lords-moss)]/60 transition-colors">
              <DollarSign size={28} />
            </div>
            <h3 className="font-serif text-[26px] text-[var(--lords-cream)] mb-3 font-light">
              Competitive Pricing
            </h3>
            <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed font-light">
              Unbeatable rates without compromising quality. Premium value every time.
            </p>
          </motion.div>

          {/* Card 2 - Services */}
          <motion.div 
            variants={cardVariants}
            className="glass-panel p-10 rounded-2xl flex flex-col relative overflow-hidden group hover:border-[var(--lords-gold)]/30 transition-all duration-300"
          >
            <span className="absolute right-6 top-0 font-display text-[96px] font-bold text-[var(--lords-gold)] opacity-[0.04] select-none group-hover:opacity-[0.07] transition-opacity">
              02
            </span>
            <div className="mb-6 p-3 bg-[var(--lords-moss)]/40 rounded-lg w-fit border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] group-hover:bg-[var(--lords-moss)]/60 transition-colors">
              <Star size={28} />
            </div>
            <h3 className="font-serif text-[26px] text-[var(--lords-cream)] mb-3 font-light">
              Best Services
            </h3>
            <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed font-light">
              Excellence delivered every time. Professional, reliable, and custom tailored to your retreat.
            </p>
          </motion.div>

          {/* Card 3 - Comfort */}
          <motion.div 
            variants={cardVariants}
            className="glass-panel p-10 rounded-2xl flex flex-col relative overflow-hidden group hover:border-[var(--lords-gold)]/30 transition-all duration-300"
          >
            <span className="absolute right-6 top-0 font-display text-[96px] font-bold text-[var(--lords-gold)] opacity-[0.04] select-none group-hover:opacity-[0.07] transition-opacity">
              03
            </span>
            <div className="mb-6 p-3 bg-[var(--lords-moss)]/40 rounded-lg w-fit border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] group-hover:text-[var(--lords-gold-light)] group-hover:bg-[var(--lords-moss)]/60 transition-colors">
              <Heart size={28} />
            </div>
            <h3 className="font-serif text-[26px] text-[var(--lords-cream)] mb-3 font-light">
              Happiness & Comfort
            </h3>
            <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed font-light">
              Your satisfaction is our guarantee. Stress-free and caring service that will make you feel at home.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
