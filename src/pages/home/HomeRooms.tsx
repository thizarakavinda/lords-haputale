import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

import 'swiper/css';
import 'swiper/css/navigation';

import { roomsData } from '../../data/roomsData';

export default function HomeRooms() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 30, opacity: 0, duration: 1, ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--lords-fog)] py-20 px-6 md:p-20 relative z-0">
      <div className="max-w-[1440px] mx-auto w-full">
        
        {/* HEADER ROW */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-[var(--lords-gold)] block mb-3">
              ACCOMMODATIONS
            </span>
            <h2 className="font-display text-[var(--text-h1)] text-[var(--lords-charcoal)] leading-none">
              Our Rooms
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              ref={prevRef}
              className="w-11 h-11 rounded-full border border-[var(--lords-gold)] flex items-center justify-center text-[var(--lords-gold)] hover:bg-[var(--lords-gold)] hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              ref={nextRef}
              className="w-11 h-11 rounded-full border border-[var(--lords-gold)] flex items-center justify-center text-[var(--lords-gold)] hover:bg-[var(--lords-gold)] hover:text-white transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* SWIPER CAROUSEL */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={24}
          slidesPerView={1.1}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 2.5 },
            1440: { slidesPerView: 3.2 }
          }}
          grabCursor={true}
          className="!pb-12"
        >
          {roomsData.map((room, index) => (
            <SwiperSlide key={room.id} className="h-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-lg overflow-hidden h-[520px] flex flex-col group cursor-pointer"
              >
                {/* IMAGE HALF */}
                <div className="h-[65%] relative overflow-hidden image-placeholder" data-image-name={`[REPLACE: ${room.image.split('/').pop()}]`}>
                  {/* The actual image would go here, scaled on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 z-10 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 font-label text-xs uppercase tracking-widest text-white border border-white px-6 py-2 transition-opacity duration-500 delay-100">
                      View Room
                    </span>
                  </div>
                </div>

                {/* CONTENT HALF */}
                <div className="h-[35%] p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-[var(--lords-fog)] text-[var(--lords-moss)] font-label text-[9px] uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                      {room.category}
                    </span>
                    <h3 className="font-serif text-2xl text-[var(--lords-charcoal)] leading-tight">
                      {room.name}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="font-body text-[12px] text-[var(--lords-muted)] mb-1">From</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-[28px] text-[var(--lords-gold)] leading-none">${room.price}</span>
                        <span className="font-body text-[12px] text-[var(--lords-muted)]">/ night</span>
                      </div>
                    </div>

                    <Link 
                      to={`/booking?room=${room.id}`}
                      className="font-label text-[11px] uppercase tracking-widest text-[var(--lords-moss)] flex items-center gap-1 group/link"
                    >
                      Book Now <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
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
