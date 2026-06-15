import { Phone, Mail } from 'lucide-react';

function WhatsAppIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="currentColor"
      className={className}
    >
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
  );
}

interface RoomType {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  image: string;
  emoji: string;
}

interface PricingBreakdown {
  rate: number;
  base: number;
  tax: number;
  total: number;
  isValid: boolean;
}

interface BookingSidebarProps {
  selectedRoom: RoomType;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  pricing: PricingBreakdown;
  formatDisplayDate: (dateStr: string) => string;
}

// BookingSidebar displays the summary of the reservation in real-time
export default function BookingSidebar({
  selectedRoom,
  checkIn,
  checkOut,
  nights,
  adults,
  children,
  pricing,
  formatDisplayDate
}: BookingSidebarProps) {
  return (
    <div className="w-full lg:sticky lg:top-[100px] bg-[var(--lords-forest)] rounded-xl border border-[var(--lords-stone)]/40 overflow-hidden shadow-2xl">
      
      {/* Top Cover Image (dynamic based on selected room state) */}
      <div className="w-full h-[180px] relative overflow-hidden group border-b border-[var(--lords-stone)]/30">
        <div className="absolute inset-0 bg-black/30 z-10 transition-colors duration-300 group-hover:bg-black/15" />
        <img 
          src={selectedRoom.image} 
          alt={selectedRoom.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
        />
        <span className="absolute bottom-4 left-6 z-20 font-label text-[10px] uppercase tracking-widest text-[var(--lords-cream)] bg-black/40 px-3 py-1.5 rounded-sm backdrop-blur-sm border border-[var(--lords-gold)]/10">
          {selectedRoom.name}
        </span>
      </div>

      {/* Content Container */}
      <div className="p-7 md:p-8 flex flex-col">
        
        <span className="font-label text-[9px] uppercase tracking-[0.4em] text-white/50 mb-3 block">
          YOUR BOOKING
        </span>

        {/* Gold Accent Line */}
        <div className="w-8 h-[2px] bg-[var(--lords-gold)] mb-6" />

        {/* Summary details list */}
        <div className="flex flex-col gap-3.5 border-b border-[var(--lords-stone)]/40 pb-5 mb-5 font-body text-xs">
          
          {/* Dates */}
          <div className="flex justify-between items-center">
            <span className="text-white/50">Dates</span>
            <span className="text-white text-right">
              {checkIn ? formatDisplayDate(checkIn) : '—'} to {checkOut ? formatDisplayDate(checkOut) : '—'}
            </span>
          </div>

          {/* Nights count */}
          <div className="flex justify-between items-center">
            <span className="text-white/50">Nights</span>
            <span className="text-white">
              {nights > 0 ? `${nights} ${nights === 1 ? 'Night' : 'Nights'}` : '—'}
            </span>
          </div>

          {/* Room Type */}
          <div className="flex justify-between items-center">
            <span className="text-white/50">Selected Room</span>
            <span className="text-white">{selectedRoom.name}</span>
          </div>

          {/* Guest Breakdown */}
          <div className="flex justify-between items-center">
            <span className="text-white/50">Guests</span>
            <span className="text-white">
              {adults} {adults === 1 ? 'Adult' : 'Adults'}
              {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
            </span>
          </div>

        </div>

        {/* Live pricing breakdown */}
        <div className="border-b border-[var(--lords-stone)]/40 pb-5 mb-5">
          <span className="font-label text-[9px] uppercase tracking-[0.2em] text-white/50 block mb-1">
            ESTIMATED TOTAL
          </span>
          
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-display text-[44px] text-[var(--lords-gold-light)] font-normal leading-none">
              {pricing.isValid ? `$${pricing.total.toFixed(2)}` : '$—'}
            </span>
          </div>
          
          <span className="font-body text-[10px] text-white/40 block mt-1">
            All service fees & taxes included
          </span>
        </div>

        {/* Support block */}
        <div className="flex flex-col">
          <span className="font-label text-[9px] uppercase tracking-[0.2em] text-white/50 block mb-3.5">
            NEED HELP?
          </span>

          {/* Quick Help WhatsApp button */}
          <a
            href="https://wa.me/94707007555?text=Hi%20Lord's%20Haputale%20Support!%20I'm%20on%20the%20booking%20page%20and%20need%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.25)] text-[#25D366] hover:bg-[rgba(37,211,102,0.2)] font-body text-xs py-3.5 rounded-sm flex items-center justify-center gap-2.5 transition-colors font-semibold"
          >
            <WhatsAppIcon size={15} /> WhatsApp Help Desk
          </a>

          {/* Direct telephone & email links */}
          <div className="flex flex-col gap-2.5 mt-4 font-body text-[11px] text-white/50">
            <a href="tel:0707007555" className="flex items-center gap-2 hover:text-[var(--lords-gold-light)] transition-colors">
              <Phone size={13} className="text-[var(--lords-gold)]" />
              <span>070 700 7555</span>
            </a>
            <a href="mailto:info@lordshaputale.com" className="flex items-center gap-2 hover:text-[var(--lords-gold-light)] transition-colors">
              <Mail size={13} className="text-[var(--lords-gold)]" />
              <span>info@lordshaputale.com</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
