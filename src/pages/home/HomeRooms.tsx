import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Wifi, Tv, Bath, BedDouble } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

import 'swiper/css';
import 'swiper/css/navigation';

import { roomsData } from '../../data/roomsData';

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi':  <Wifi size={12} />,
  'TV':    <Tv size={12} />,
  'bath':  <Bath size={12} />,
  '1 bed': <BedDouble size={12} />,
};

export default function HomeRooms() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-[120px] px-6 md:px-20 relative z-10"
      style={{
        background: 'rgba(5, 10, 7, 0.4)',
      }}
    >
      <div className="max-w-[1440px] mx-auto w-full">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.45em] text-[var(--lords-gold)] block mb-3">
              ACCOMMODATIONS
            </span>
            <h2 className="font-display leading-none text-[var(--lords-cream)]" style={{ fontSize: 'var(--text-h1)' }}>
              Our Rooms
            </h2>
            <p className="font-body text-[15px] text-[var(--lords-smoke)] mt-3 max-w-md leading-relaxed">
              Every room crafted for comfort, with panoramic highland views.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-12 h-12 flex items-center justify-center text-[var(--lords-gold)] transition-all duration-300 hover:bg-[var(--lords-gold)] hover:text-[var(--lords-mist)]"
              style={{ border: '1px solid rgba(197,168,128,0.4)', borderRadius: '2px' }}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 flex items-center justify-center text-[var(--lords-gold)] transition-all duration-300 hover:bg-[var(--lords-gold)] hover:text-[var(--lords-mist)]"
              style={{ border: '1px solid rgba(197,168,128,0.4)', borderRadius: '2px' }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* ── SWIPER ── */}
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={28}
          slidesPerView={1.1}
          breakpoints={{
            640:  { slidesPerView: 1.4 },
            768:  { slidesPerView: 2.1 },
            1024: { slidesPerView: 2.5 },
            1440: { slidesPerView: 3.1 },
          }}
          grabCursor
          className="!pb-4"
        >
          {roomsData.map((room, index) => (
            <SwiperSlide key={room.id} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
                className="group cursor-pointer h-[590px] flex flex-col rounded-xl overflow-hidden relative"
                style={{
                  background: 'rgba(9, 18, 13, 0.25)',
                  border: '1px solid rgba(197,168,128,0.15)',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
                  transition: 'border-color 0.4s, box-shadow 0.4s, background-color 0.4s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,168,128,0.4)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(17, 32, 23, 0.35)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 30px 64px rgba(0,0,0,0.55), 0 0 30px rgba(197,168,128,0.04)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,168,128,0.15)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(9, 18, 13, 0.25)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(0,0,0,0.4)';
                }}
              >
                {/* Gold trim offset architectural frame */}
                <div className="absolute inset-2.5 border border-[var(--lords-gold)]/10 rounded-lg pointer-events-none group-hover:border-[var(--lords-gold)]/35 group-hover:inset-1.5 transition-all duration-500 z-20" />

                {/* ── IMAGE SECTION (65% height) ── */}
                <div className="relative overflow-hidden" style={{ height: '64%' }}>
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    style={{ transform: 'scale(1)', transition: 'transform 0.7s ease' }}
                  />

                  {/* Gradient fade to card body */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-28"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(9, 18, 13, 0.95))' }}
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className="font-label text-[9px] uppercase tracking-[0.35em] text-[var(--lords-gold)] px-3 py-1"
                      style={{ background: 'rgba(4,8,6,0.85)', border: '1px solid rgba(197,168,128,0.3)' }}
                    >
                      {room.category}
                    </span>
                  </div>

                  {/* Circular price badge floating top-right */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col items-center justify-center w-20 h-20 rounded-full border border-[var(--lords-gold)]/30 backdrop-blur-md shadow-lg"
                    style={{ background: 'rgba(5,10,7,0.75)' }}
                  >
                    <span className="font-body text-[9px] uppercase tracking-wider text-[var(--lords-smoke)]">From</span>
                    <span className="font-display text-[20px] text-[var(--lords-gold)] font-medium leading-none">${room.price}</span>
                    <span className="font-body text-[8px] text-[var(--lords-muted)] mt-0.5">/ night</span>
                  </div>

                  {/* Hover overlay with "View Room" */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    <span
                      className="font-label text-[11px] uppercase tracking-widest text-white px-6 py-2"
                      style={{ background: 'rgba(197,168,128,0.2)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(6px)' }}
                    >
                      View Room
                    </span>
                  </div>
                </div>

                {/* ── CONTENT SECTION (36% height) ── */}
                <div className="flex flex-col justify-between px-6 pt-5 pb-6" style={{ height: '36%' }}>
                  <div>
                    {/* Vertical left gold accent line next to header */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-0.5 h-5 bg-[var(--lords-gold)] scale-y-75 origin-center group-hover:scale-y-100 transition-transform duration-300" />
                      <h3 className="font-display text-[23px] text-[var(--lords-cream)] leading-tight font-light">
                        {room.name}
                      </h3>
                    </div>
                    
                    <p className="font-body text-[13px] text-[var(--lords-smoke)] leading-relaxed pl-3.5">
                      {room.description}
                    </p>
                  </div>

                  {/* Amenities and CTA Button */}
                  <div className="flex flex-col gap-4 mt-3 pl-3.5">
                    {/* Amenity pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {room.amenities.slice(0, 4).map((a) => (
                        <span
                          key={a}
                          className="flex items-center gap-1 font-label text-[9px] uppercase tracking-wider text-[var(--lords-smoke)] px-2.5 py-1 rounded-sm"
                          style={{ background: 'rgba(197,168,128,0.06)', border: '1px solid rgba(197,168,128,0.12)' }}
                        >
                          {amenityIcons[a] ?? null}
                          {a}
                        </span>
                      ))}
                    </div>

                    {/* Book link redesigned to be a sleek outline-fill button */}
                    <Link
                      to={`/booking?room=${room.id}`}
                      className="inline-flex items-center justify-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] text-[var(--lords-gold)] hover:text-[var(--lords-mist)] py-3 border border-[var(--lords-gold)]/30 hover:border-transparent rounded-sm relative overflow-hidden transition-all duration-300 hover:bg-[var(--lords-gold)]"
                    >
                      Book This Room <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
