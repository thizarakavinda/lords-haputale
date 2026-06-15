import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingHero from './BookingHero';
import BookingWhyDirect from './BookingWhyDirect';
import BookingForm from './BookingForm';
import BookingSidebar from './BookingSidebar';
import { submitBooking, generateBookingRef } from '../../services/bookingService';

// Room types metadata definition
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

// Orchestrator for the Reservations / Booking page. Contains active states, dates parameters and pricing formulas.
export default function Booking() {
  const [searchParams] = useSearchParams();

  // 1. Core Booking Form State
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState<string>('triple');

  // Step 2 State (Guest Details)
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
    /* eslint-disable react-hooks/set-state-in-effect */
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
    /* eslint-enable react-hooks/set-state-in-effect */
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
  const handleBookingSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isStep1Valid || !isStep2Valid) return;

  setIsSubmitting(true);
  try {
    const ref = generateBookingRef();

    await submitBooking({
      fullName,
      email,
      phone,
      country,
      checkIn,
      checkOut,
      adults,
      children,
      roomType,
      roomName: selectedRoom.name,
      nights,
      totalPrice: pricing.total,
      specialRequests,
      bookingRef: ref,
    });

    setBookingRef(ref);
    setStep(4);
  } catch (error) {
    console.error("Booking submission failed:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  // Format Helper
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '—';
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  // Build WhatsApp inquiry Link
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
      
      {/* SECTION 1 — HERO Minimal Bar */}
      <BookingHero />

      {/* SECTION 2 — BOOKING INTERFACE */}
      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-transparent border-t border-[var(--lords-stone)]/30">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.62fr_1fr] gap-8 lg:gap-12 items-start">
          
          {/* Form container */}
          <BookingForm
            step={step}
            setStep={setStep}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            adults={adults}
            handleAdults={handleAdults}
            children={children}
            handleChildren={handleChildren}
            roomType={roomType}
            setRoomType={setRoomType}
            selectedRoom={selectedRoom}
            nights={nights}
            pricing={pricing}
            isOverCapacity={isOverCapacity}
            isStep1Valid={isStep1Valid}
            isStep2Valid={isStep2Valid}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            country={country}
            setCountry={setCountry}
            specialRequests={specialRequests}
            setSpecialRequests={setSpecialRequests}
            isSubmitting={isSubmitting}
            bookingRef={bookingRef}
            handleBookingSubmit={handleBookingSubmit}
            whatsAppLink={whatsAppLink}
            formatDisplayDate={formatDisplayDate}
            countries={COUNTRIES}
          />

          {/* Realtime Sidebar summary */}
          <BookingSidebar
            selectedRoom={selectedRoom}
            checkIn={checkIn}
            checkOut={checkOut}
            nights={nights}
            adults={adults}
            children={children}
            pricing={pricing}
            formatDisplayDate={formatDisplayDate}
          />

        </div>
      </section>

      {/* SECTION 3 — WHY BOOK DIRECT */}
      <BookingWhyDirect />

    </div>
  );
}
