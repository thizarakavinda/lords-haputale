import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  Mail, 
  Plus, 
  Minus, 
  BadgeCheck, 
  Gift, 
  RotateCcw, 
  UserCheck, 
  Check 
} from 'lucide-react';

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

// Room types metadata
interface RoomType {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  image: string;
  emoji: string;
}

const ROOMS: Record<string, RoomType> = {
  'triple': {
    id: 'triple',
    name: 'Triple Room',
    price: 125,
    maxGuests: 3,
    image: '/images/rooms/tripple room.webp',
    emoji: '🏠'
  },
  'double': {
    id: 'double',
    name: 'Double Room',
    price: 105,
    maxGuests: 2,
    image: '/images/rooms/double room.webp',
    emoji: '🛏'
  },
  'small-double': {
    id: 'small-double',
    name: 'Small Double Room',
    price: 95,
    maxGuests: 2,
    image: '/images/rooms/small double room.webp',
    emoji: '🛏'
  }
};

const COUNTRIES = [
  'Sri Lanka', 'United Kingdom', 'Germany', 'France', 'Australia', 
  'United States', 'Canada', 'India', 'Maldives', 'Singapore', 
  'Japan', 'Switzerland', 'Netherlands', 'Italy', 'Other'
];

export default function Booking() {
  const [searchParams] = useSearchParams();

  // 1. Core Booking Form State
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState<string>('triple');

  // Step 2 State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Sri Lanka');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // 2. Pre-fill States from URL params
  useEffect(() => {
    // Dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 3); // Default 2 nights

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    const inParam = searchParams.get('in');
    const outParam = searchParams.get('out');
    const guestsParam = searchParams.get('guests');
    const roomParam = searchParams.get('room');

    setCheckIn(inParam || formatDate(tomorrow));
    setCheckOut(outParam || formatDate(dayAfter));

    if (guestsParam) {
      const g = parseInt(guestsParam, 10);
      if (!isNaN(g) && g > 0) {
        setAdults(g);
      }
    }

    if (roomParam && ROOMS[roomParam]) {
      setRoomType(roomParam);
    }
  }, [searchParams]);

  // 3. Dynamic Price & Nights Calculations
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const selectedRoom = useMemo(() => {
    return ROOMS[roomType] || ROOMS['triple'];
  }, [roomType]);

  const pricing = useMemo(() => {
    const rate = selectedRoom.price;
    const base = rate * nights;
    const serviceCharge = base * 0.10; // 10% Service Charge
    const localTax = base * 0.08;       // 8% Local Taxes
    const tax = serviceCharge + localTax;
    const total = base + tax;

    return {
      rate,
      base,
      tax,
      total,
      isValid: nights > 0
    };
  }, [selectedRoom, nights]);

  // Check capacity limit
  const isOverCapacity = useMemo(() => {
    const totalGuests = adults + children;
    return totalGuests > selectedRoom.maxGuests;
  }, [adults, children, selectedRoom]);

  // Validation helpers
  const isStep1Valid = useMemo(() => {
    return (
      checkIn !== '' &&
      checkOut !== '' &&
      nights > 0 &&
      adults > 0 &&
      !isOverCapacity
    );
  }, [checkIn, checkOut, nights, adults, isOverCapacity]);

  const isStep2Valid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      fullName.trim().length >= 3 &&
      emailRegex.test(email)
    );
  }, [fullName, email]);

  // Handle Steppers
  const handleAdults = (val: number) => {
    const target = adults + val;
    if (target >= 1 && target <= 4) {
      setAdults(target);
    }
  };

  const handleChildren = (val: number) => {
    const target = children + val;
    if (target >= 0 && target <= 3) {
      setChildren(target);
    }
  };

  // Submit request
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || !isStep2Valid) return;

    setIsSubmitting(true);
    // Simulate booking API request
    setTimeout(() => {
      const randomRef = `LH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(randomRef);
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  // Format Helper
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '—';
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  // Build WhatsApp Link
  const whatsAppLink = useMemo(() => {
    const message = `Hello Lord's Haputale! I would like to make a reservation inquiry.
    
Ref: ${bookingRef || 'LH-New'}
Room: ${selectedRoom.name}
Dates: ${formatDisplayDate(checkIn)} to ${formatDisplayDate(checkOut)} (${nights} Nights)
Guests: ${adults} Adults, ${children} Children
Name: ${fullName}
Email: ${email}
Phone: ${phone || 'N/A'}
Country: ${country}
Special Requests: ${specialRequests || 'None'}`;

    return `https://wa.me/94707007555?text=${encodeURIComponent(message)}`;
  }, [bookingRef, selectedRoom, checkIn, checkOut, nights, adults, children, fullName, email, phone, country, specialRequests]);

  return (
    <div className="w-full bg-transparent text-[var(--lords-charcoal)] overflow-hidden">
      
      {/* ================================================================
          SECTION 1 — HERO (Minimal Bar)
          ================================================================ */}
      <section 
        className="relative h-[35vh] min-h-[280px] flex items-center justify-center pt-20 overflow-hidden bg-transparent"
        style={{
          background: 'radial-gradient(circle at center, rgba(13, 26, 18, 0.45) 0%, rgba(5, 10, 7, 0.6) 100%)'
        }}
      >
        {/* Fine Star Grid Watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--lords-gold)_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 text-center px-4">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-[var(--lords-gold-light)] block mb-2 font-medium">
            RESERVATIONS
          </span>
          <h1 className="font-display text-[var(--lords-cream)] text-[clamp(28px,4.5vw,48px)] leading-tight uppercase font-normal mb-2">
            Book Your Stay
          </h1>
          <p className="font-body text-xs md:text-sm text-[var(--lords-smoke)]/80">
            No payment required · Confirmation within 24 hours
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-6">
            <span className="font-label text-[10px] md:text-xs text-white/95 flex items-center gap-2 tracking-wider">
              <CheckCircle size={13} className="text-[var(--lords-gold-light)]" /> Best Rate Guaranteed
            </span>
            <span className="font-label text-[10px] md:text-xs text-white/95 flex items-center gap-2 tracking-wider">
              <CheckCircle size={13} className="text-[var(--lords-gold-light)]" /> Free Cancellation
            </span>
            <span className="font-label text-[10px] md:text-xs text-white/95 flex items-center gap-2 tracking-wider">
              <CheckCircle size={13} className="text-[var(--lords-gold-light)]" /> 24hr Quick Confirm
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — BOOKING INTERFACE
          ================================================================ */}
      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-transparent border-t border-[var(--lords-stone)]/30">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.62fr_1fr] gap-8 lg:gap-12 items-start">
          
          {/* LEFT — BOOKING FORM CARD */}
          <div 
            className="w-full bg-[rgba(9,18,13,0.8)] backdrop-blur-md rounded-xl border-t-[3px] border-t-[var(--lords-moss)] border-x border-b border-[var(--lords-stone)]/40 p-6 md:p-12 shadow-[0_12px_48px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Fine border decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--lords-gold)]/5 rounded-full blur-2xl pointer-events-none" />

            {/* STEP INDICATOR */}
            {step <= 3 && (
              <div className="mb-12 relative">
                <div className="flex justify-between items-center w-full max-w-[480px] mx-auto relative z-10">
                  
                  {/* Step 1 Node */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 flex items-center justify-center font-label text-xs font-semibold transition-all duration-300 border-2 rounded-none ${
                        step > 1 
                          ? 'bg-[var(--lords-moss)] border-[var(--lords-moss)] text-white' 
                          : step === 1 
                            ? 'border-[var(--lords-gold)] text-[var(--lords-gold)] bg-[var(--lords-stone)]' 
                            : 'border-[var(--lords-stone)] text-[var(--lords-muted)] bg-[var(--lords-fog)]'
                      }`}
                    >
                      {step > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
                    </div>
                    <span className="font-label text-[9px] uppercase tracking-wider text-[var(--lords-muted)] mt-2.5">
                      Dates & Rooms
                    </span>
                  </div>

                  {/* Connector 1 */}
                  <div className="flex-grow h-[2px] mx-4 bg-[var(--lords-stone)] relative overflow-hidden -mt-6">
                    <div 
                      className="absolute inset-y-0 left-0 bg-[var(--lords-moss)] transition-all duration-300"
                      style={{ width: step > 1 ? '100%' : '0%' }}
                    />
                  </div>

                  {/* Step 2 Node */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 flex items-center justify-center font-label text-xs font-semibold transition-all duration-300 border-2 rounded-none ${
                        step > 2 
                          ? 'bg-[var(--lords-moss)] border-[var(--lords-moss)] text-white' 
                          : step === 2 
                            ? 'border-[var(--lords-gold)] text-[var(--lords-gold)] bg-[var(--lords-stone)]' 
                            : 'border-[var(--lords-stone)] text-[var(--lords-muted)] bg-[var(--lords-fog)]'
                      }`}
                    >
                      {step > 2 ? <Check size={14} strokeWidth={3} /> : '2'}
                    </div>
                    <span className="font-label text-[9px] uppercase tracking-wider text-[var(--lords-muted)] mt-2.5">
                      Your Details
                    </span>
                  </div>

                  {/* Connector 2 */}
                  <div className="flex-grow h-[2px] mx-4 bg-[var(--lords-stone)] relative overflow-hidden -mt-6">
                    <div 
                      className="absolute inset-y-0 left-0 bg-[var(--lords-moss)] transition-all duration-300"
                      style={{ width: step > 2 ? '100%' : '0%' }}
                    />
                  </div>

                  {/* Step 3 Node */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 flex items-center justify-center font-label text-xs font-semibold transition-all duration-300 border-2 rounded-none ${
                        step === 3 
                          ? 'border-[var(--lords-gold)] text-[var(--lords-gold)] bg-[var(--lords-stone)]' 
                          : 'border-[var(--lords-stone)] text-[var(--lords-muted)] bg-[var(--lords-fog)]'
                      }`}
                    >
                      '3'
                    </div>
                    <span className="font-label text-[9px] uppercase tracking-wider text-[var(--lords-muted)] mt-2.5">
                      Confirm
                    </span>
                  </div>

                </div>
              </div>
            )}

            {/* FORM CONTAINER WITH STEP TRANSITIONS */}
            <AnimatePresence mode="wait">
              
              {/* STEP 1: DATES & ROOMS */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--lords-gold)] font-semibold">
                      01 — STAY DETAILS
                    </span>
                  </div>

                  <div className="flex flex-col gap-6">
                    
                    {/* Date Pickers Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Check-In */}
                      <div className="flex flex-col">
                        <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                          Check-in Date
                        </label>
                        <div className="relative">
                          <input 
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-3.5 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Check-Out */}
                      <div className="flex flex-col">
                        <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                          Check-out Date
                        </label>
                        <div className="relative">
                          <input 
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-3.5 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Calculated Nights Info Banner */}
                    {nights > 0 && (
                      <div className="bg-[var(--lords-stone)]/40 border border-[var(--lords-stone)] px-4 py-2.5 rounded-sm flex items-center justify-between text-xs font-body text-[var(--lords-smoke)] mt-1">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--lords-gold)]" />
                          <span>Stay duration calculated:</span>
                        </span>
                        <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-[var(--lords-gold-light)] bg-[var(--lords-moss)] px-2.5 py-1 rounded-sm border border-[var(--lords-gold)]/10">
                          {nights} {nights === 1 ? 'Night' : 'Nights'}
                        </span>
                      </div>
                    )}

                    {/* Guest Count Steppers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                      
                      {/* Adults Stepper */}
                      <div className="flex flex-col">
                        <span className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2.5">
                          Adults (Ages 12+)
                        </span>
                        <div className="flex items-center justify-between border border-[var(--lords-stone)] bg-[var(--lords-fog)] p-2 rounded-sm h-[56px]">
                          <button
                            type="button"
                            onClick={() => handleAdults(-1)}
                            disabled={adults <= 1}
                            className="w-10 h-10 flex items-center justify-center bg-[var(--lords-stone)] border border-[var(--lords-stone)] text-[var(--lords-cream)] hover:bg-[var(--lords-moss)] disabled:opacity-30 disabled:hover:bg-[var(--lords-stone)] transition-colors cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-display text-2xl text-[var(--lords-cream)] font-light min-w-[32px] text-center">
                            {adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdults(1)}
                            disabled={adults >= 4}
                            className="w-10 h-10 flex items-center justify-center bg-[var(--lords-stone)] border border-[var(--lords-stone)] text-[var(--lords-cream)] hover:bg-[var(--lords-moss)] disabled:opacity-30 disabled:hover:bg-[var(--lords-stone)] transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Children Stepper */}
                      <div className="flex flex-col">
                        <span className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2.5">
                          Children (Ages 0-11)
                        </span>
                        <div className="flex items-center justify-between border border-[var(--lords-stone)] bg-[var(--lords-fog)] p-2 rounded-sm h-[56px]">
                          <button
                            type="button"
                            onClick={() => handleChildren(-1)}
                            disabled={children <= 0}
                            className="w-10 h-10 flex items-center justify-center bg-[var(--lords-stone)] border border-[var(--lords-stone)] text-[var(--lords-cream)] hover:bg-[var(--lords-moss)] disabled:opacity-30 disabled:hover:bg-[var(--lords-stone)] transition-colors cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-display text-2xl text-[var(--lords-cream)] font-light min-w-[32px] text-center">
                            {children}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleChildren(1)}
                            disabled={children >= 3}
                            className="w-10 h-10 flex items-center justify-center bg-[var(--lords-stone)] border border-[var(--lords-stone)] text-[var(--lords-cream)] hover:bg-[var(--lords-moss)] disabled:opacity-30 disabled:hover:bg-[var(--lords-stone)] transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Room Type Selector */}
                    <div className="flex flex-col mt-2">
                      <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                        Select Accommodation
                      </label>
                      <div className="relative">
                        <select
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                          className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-4 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors appearance-none cursor-pointer pr-12"
                        >
                          <option value="triple" className="bg-[var(--lords-mist)] text-[var(--lords-cream)]">
                            🏠 Triple Room — $125/night (Max 3 Guests)
                          </option>
                          <option value="double" className="bg-[var(--lords-mist)] text-[var(--lords-cream)]">
                            🛏 Double Room — $105/night (Max 2 Guests)
                          </option>
                          <option value="small-double" className="bg-[var(--lords-mist)] text-[var(--lords-cream)]">
                            🛏 Small Double Room — $95/night (Max 2 Guests)
                          </option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--lords-gold)] pointer-events-none">
                          <ChevronDown size={18} />
                        </div>
                      </div>

                      {/* Guest Capacity Warnings */}
                      {isOverCapacity && (
                        <span className="text-red-400 font-label text-[10px] mt-2 uppercase tracking-wide">
                          ⚠ Selected room capacity exceeded (Max: {selectedRoom.maxGuests} Guests total).
                        </span>
                      )}
                    </div>

                    {/* Real-time Pricing Breakdown */}
                    <AnimatePresence>
                      {pricing.isValid && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div 
                            className="bg-[rgba(197,168,128,0.05)] border border-[rgba(197,168,128,0.18)] p-5 mt-4 rounded-sm"
                          >
                            <span className="font-label text-[9px] uppercase tracking-widest text-[var(--lords-gold)] block mb-3">
                              Est. Price Breakdown
                            </span>
                            <div className="flex flex-col gap-2 font-body text-xs text-[var(--lords-smoke)]">
                              <div className="flex justify-between">
                                <span>Base rate ({selectedRoom.name})</span>
                                <span>${pricing.rate} × {nights} nights</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-[var(--lords-cream)] font-medium">${pricing.base.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between border-b border-[var(--lords-stone)] pb-2">
                                <span>Taxes & Service Charges (18%)</span>
                                <span>${pricing.tax.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between pt-1 font-display text-base text-[var(--lords-gold-light)]">
                                <span>Estimated Total</span>
                                <span className="font-bold">${pricing.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* NEXT BUTTON */}
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!isStep1Valid}
                      className="w-full bg-[var(--lords-moss)] hover:bg-[var(--lords-forest)] disabled:opacity-40 disabled:hover:bg-[var(--lords-moss)] text-white font-label text-xs uppercase tracking-widest font-semibold py-4.5 rounded-sm transition-colors mt-4 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Continue to Details <ArrowRight size={13} />
                    </button>

                  </div>
                </motion.div>
              )}

              {/* STEP 2: GUEST DETAILS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--lords-gold)] font-semibold">
                      02 — GUEST DETAILS
                    </span>
                  </div>

                  <div className="flex flex-col gap-5">
                    
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-3.5 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                        className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-3.5 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Two Column details (Phone & Country) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Phone */}
                      <div className="flex flex-col">
                        <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                          Phone Number
                        </label>
                        <input 
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 234 567 890"
                          className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-3.5 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Country */}
                      <div className="flex flex-col">
                        <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                          Country / Nationality
                        </label>
                        <div className="relative">
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-3.5 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors appearance-none cursor-pointer pr-10"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c} className="bg-[var(--lords-mist)] text-[var(--lords-cream)]">
                                {c}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--lords-gold)] pointer-events-none">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Special Requests */}
                    <div className="flex flex-col">
                      <label className="font-label text-[10px] uppercase tracking-wider text-[var(--lords-muted)] mb-2">
                        Special Requests
                      </label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Early check-in, dietary needs, bedding configuration..."
                        rows={3}
                        className="w-full bg-[var(--lords-fog)] border border-[var(--lords-stone)] focus:border-[var(--lords-gold)] rounded-sm p-3.5 text-sm font-body text-[var(--lords-cream)] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Form Navigation Buttons */}
                    <div className="grid grid-cols-[1fr_2fr] gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full border border-[var(--lords-stone)] hover:border-[var(--lords-gold)] text-[var(--lords-cream)] hover:text-[var(--lords-gold)] font-label text-xs uppercase tracking-widest font-semibold py-4.5 rounded-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ArrowLeft size={13} /> Back
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!isStep2Valid}
                        className="w-full bg-[var(--lords-moss)] hover:bg-[var(--lords-forest)] disabled:opacity-40 disabled:hover:bg-[var(--lords-moss)] text-white font-label text-xs uppercase tracking-widest font-semibold py-4.5 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Review Details <ArrowRight size={13} />
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* STEP 3: REVIEW & CONFIRM */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--lords-gold)] font-semibold">
                      03 — REVIEW & CONFIRM
                    </span>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
                    
                    {/* Summary Card */}
                    <div className="bg-[var(--lords-fog)] border border-[var(--lords-stone)] p-6 rounded-sm flex flex-col gap-4">
                      
                      <h3 className="font-serif text-lg text-[var(--lords-cream)] border-b border-[var(--lords-stone)]/50 pb-2 mb-2 font-light">
                        Reservation Summary
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body text-[var(--lords-smoke)]">
                        <div className="flex justify-between md:flex-col md:gap-1">
                          <span className="text-[var(--lords-muted)] uppercase tracking-wider font-label text-[9px]">Check-In</span>
                          <span className="text-[var(--lords-cream)] font-medium text-sm">{formatDisplayDate(checkIn)}</span>
                        </div>
                        <div className="flex justify-between md:flex-col md:gap-1">
                          <span className="text-[var(--lords-muted)] uppercase tracking-wider font-label text-[9px]">Check-Out</span>
                          <span className="text-[var(--lords-cream)] font-medium text-sm">{formatDisplayDate(checkOut)}</span>
                        </div>
                        <div className="flex justify-between md:flex-col md:gap-1">
                          <span className="text-[var(--lords-muted)] uppercase tracking-wider font-label text-[9px]">Accommodation</span>
                          <span className="text-[var(--lords-cream)] font-medium text-sm">{selectedRoom.name}</span>
                        </div>
                        <div className="flex justify-between md:flex-col md:gap-1">
                          <span className="text-[var(--lords-muted)] uppercase tracking-wider font-label text-[9px]">Guests</span>
                          <span className="text-[var(--lords-cream)] font-medium text-sm">
                            {adults} {adults === 1 ? 'Adult' : 'Adults'}
                            {children > 0 && `, ${children} ${children === 1 ? 'Child' : 'Children'}`}
                          </span>
                        </div>
                        <div className="flex justify-between md:flex-col md:gap-1">
                          <span className="text-[var(--lords-muted)] uppercase tracking-wider font-label text-[9px]">Primary Guest</span>
                          <span className="text-[var(--lords-cream)] font-medium text-sm">{fullName}</span>
                        </div>
                        <div className="flex justify-between md:flex-col md:gap-1">
                          <span className="text-[var(--lords-muted)] uppercase tracking-wider font-label text-[9px]">Email Address</span>
                          <span className="text-[var(--lords-cream)] font-medium text-sm truncate">{email}</span>
                        </div>
                      </div>

                      {specialRequests && (
                        <div className="border-t border-[var(--lords-stone)]/50 pt-3 mt-1 flex flex-col gap-1 text-xs">
                          <span className="text-[var(--lords-muted)] uppercase tracking-wider font-label text-[9px]">Special Requests</span>
                          <p className="text-[var(--lords-smoke)] bg-[var(--lords-stone)]/40 p-3 rounded-sm italic">
                            "{specialRequests}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Total Box */}
                    <div className="bg-[var(--lords-moss)] text-white p-5 rounded-sm flex items-center justify-between shadow-lg">
                      <div className="flex flex-col">
                        <span className="font-label text-[9px] uppercase tracking-widest text-white/60">
                          Total Estimate
                        </span>
                        <span className="font-body text-xs text-white/60 mt-1">
                          for {nights} {nights === 1 ? 'night' : 'nights'} (taxes included)
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-display text-4xl text-[var(--lords-gold-light)] font-medium leading-none block">
                          ${pricing.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Booking Policies (Premium Checklist) */}
                    <div className="grid grid-cols-2 gap-3 text-[11px] font-label text-[var(--lords-smoke)] tracking-wide bg-[var(--lords-stone)]/30 p-4 border border-[var(--lords-stone)]/60 rounded-sm">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-400" /> No payment required now
                      </span>
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-400" /> Free cancellation anytime
                      </span>
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-400" /> Response within 24 hours
                      </span>
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-400" /> Secure & confidential
                      </span>
                    </div>

                    {/* Navigation and Submission Buttons */}
                    <div className="grid grid-cols-[1fr_2fr] gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full border border-[var(--lords-stone)] hover:border-[var(--lords-gold)] text-[var(--lords-cream)] hover:text-[var(--lords-gold)] font-label text-xs uppercase tracking-widest font-semibold py-4.5 rounded-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ArrowLeft size={13} /> Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting || !isStep1Valid || !isStep2Valid}
                        style={{
                          background: 'linear-gradient(135deg, #a78b5e 0%, var(--lords-gold) 50%, var(--lords-gold-light) 100%)'
                        }}
                        className="w-full text-[var(--lords-mist)] hover:filter hover:brightness-110 active:scale-[0.99] font-display text-[16px] italic font-medium uppercase tracking-widest py-4.5 rounded-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}

              {/* SUCCESS STATE */}
              {step === 4 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center text-center py-6"
                >
                  {/* Premium animated checkmark */}
                  <div className="w-24 h-24 bg-[var(--lords-stone)] rounded-full flex items-center justify-center border-2 border-[var(--lords-gold)]/35 mb-8 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                      className="text-[var(--lords-gold)]"
                    >
                      <Check size={44} strokeWidth={3} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[var(--lords-gold)]"
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.35 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </div>

                  <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--lords-gold)] mb-3 block font-semibold">
                    RESERVATION REQUESTED
                  </span>
                  
                  <h2 className="font-display text-[var(--lords-cream)] text-3xl font-light mb-4 leading-snug">
                    Booking Request Received!
                  </h2>
                  
                  <p className="font-body text-sm text-[var(--lords-smoke)] max-w-[420px] leading-relaxed mb-6">
                    Thank you, <span className="text-[var(--lords-cream)] font-medium">{fullName}</span>. We've received your request for the <span className="text-[var(--lords-cream)] font-medium">{selectedRoom.name}</span>. We will review availability and contact you within 24 hours.
                  </p>

                  <div className="bg-[var(--lords-fog)] border border-[var(--lords-stone)] px-6 py-4 rounded-sm mb-10 text-xs font-body tracking-wider">
                    <span className="text-[var(--lords-muted)] mr-2 uppercase font-label text-[10px]">Reference:</span>
                    <span className="text-[var(--lords-gold-light)] font-bold font-mono text-sm">{bookingRef}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[440px]">
                    <a
                      href={whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-body text-xs uppercase tracking-wider py-4 px-6 rounded-sm shadow-md transition-all hover:scale-102 cursor-pointer font-semibold"
                    >
                      <WhatsAppIcon size={16} /> WhatsApp Us
                    </a>
                    
                    <Link
                      to="/"
                      className="flex-grow flex items-center justify-center border border-[var(--lords-stone)] hover:border-[var(--lords-gold)] text-[var(--lords-cream)] hover:text-[var(--lords-gold)] font-label text-xs uppercase tracking-wider py-4 px-6 rounded-sm transition-all cursor-pointer font-semibold"
                    >
                      Return Home
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* RIGHT — LIVE SUMMARY SIDEBAR */}
          <div className="w-full lg:sticky lg:top-[100px] bg-[var(--lords-forest)] rounded-xl border border-[var(--lords-stone)]/40 overflow-hidden shadow-2xl">
            
            {/* Top Cover Image (dynamic based on state) */}
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

              {/* Summary details */}
              <div className="flex flex-col gap-3.5 border-b border-[var(--lords-stone)]/40 pb-5 mb-5 font-body text-xs">
                
                {/* Dates */}
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Dates</span>
                  <span className="text-white text-right">
                    {checkIn ? formatDisplayDate(checkIn) : '—'} to {checkOut ? formatDisplayDate(checkOut) : '—'}
                  </span>
                </div>

                {/* Nights */}
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Nights</span>
                  <span className="text-white">
                    {nights > 0 ? `${nights} ${nights === 1 ? 'Night' : 'Nights'}` : '—'}
                  </span>
                </div>

                {/* Room Category */}
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Selected Room</span>
                  <span className="text-white">{selectedRoom.name}</span>
                </div>

                {/* Guests */}
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Guests</span>
                  <span className="text-white">
                    {adults} {adults === 1 ? 'Adult' : 'Adults'}
                    {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
                  </span>
                </div>

              </div>

              {/* Live Cost Display */}
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

              {/* Help & Support Desk */}
              <div className="flex flex-col">
                <span className="font-label text-[9px] uppercase tracking-[0.2em] text-white/50 block mb-3.5">
                  NEED HELP?
                </span>

                {/* WhatsApp Help button */}
                <a
                  href="https://wa.me/94707007555?text=Hi%20Lord's%20Haputale%20Support!%20I'm%20on%20the%20booking%20page%20and%20need%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.25)] text-[#25D366] hover:bg-[rgba(37,211,102,0.2)] font-body text-xs py-3.5 rounded-sm flex items-center justify-center gap-2.5 transition-colors font-semibold"
                >
                  <WhatsAppIcon size={15} /> WhatsApp Help Desk
                </a>

                {/* Secondary Contacts details */}
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

        </div>
      </section>

      {/* ================================================================
          SECTION 3 — WHY BOOK DIRECT
          ================================================================ */}
      <section 
        className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 bg-transparent"
      >
        <div className="max-w-[1280px] mx-auto">
          
          <h2 className="font-display text-[var(--lords-cream)] text-[clamp(28px,4vw,44px)] font-light leading-tight text-center mb-16">
            Why book directly with us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Best Rate Card */}
            <div 
              className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
            >
              <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
                <BadgeCheck size={26} />
              </div>
              <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
                Best Rate Guaranteed
              </h3>
              <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
                By booking directly, you bypass third-party OTA commissions, securing the absolute lowest rates available online.
              </p>
            </div>

            {/* Welcome Gift Card */}
            <div 
              className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
            >
              <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
                <Gift size={26} />
              </div>
              <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
                Welcome Gift
              </h3>
              <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
                Receive premium Ceylon tea tins and fresh fruit arrangements upon arrival at our boutique highlands sanctuary.
              </p>
            </div>

            {/* Free Cancellation Card */}
            <div 
              className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
            >
              <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
                <RotateCcw size={26} />
              </div>
              <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
                Free Cancellation
              </h3>
              <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
                Plans change, and we adapt. Modify or cancel your reservation request without penalty up to 7 days before check-in.
              </p>
            </div>

            {/* Personal Service Card */}
            <div 
              className="bg-[var(--lords-stone)]/40 border-t-2 border-t-[var(--lords-gold)] border-x border-b border-[var(--lords-stone)]/60 p-8 rounded-b-lg text-center hover:border-[var(--lords-gold)]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
            >
              <div className="p-3 bg-[var(--lords-moss)]/20 border border-[var(--lords-gold)]/10 text-[var(--lords-gold)] rounded-full mb-5">
                <UserCheck size={26} />
              </div>
              <h3 className="font-serif text-lg text-[var(--lords-cream)] mb-2 font-medium">
                Personal Service
              </h3>
              <p className="font-body text-[12.5px] font-light text-[var(--lords-smoke)] leading-relaxed">
                Contact our local hosts directly. Tailor excursions, dietary requests, and tea estates transfers instantly.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
