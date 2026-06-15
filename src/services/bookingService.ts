import { ref, push } from "firebase/database";
import { database } from "../config/firebaseConfig";

interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string;
  roomName: string;
  nights: number;
  totalPrice: number;
  specialRequests: string;
  bookingRef: string;
}

export const submitBooking = async (data: BookingData): Promise<void> => {
  const bookingsRef = ref(database, "bookings");

  const newBooking = {
    name: data.fullName,
    email: data.email,
    phone: data.phone || "N/A",
    country: data.country,
    checkin: data.checkIn,
    checkout: data.checkOut,
    adults: String(data.adults),
    children: String(data.children),
    room: data.roomName,
    nights: String(data.nights),
    totalPrice: String(data.totalPrice.toFixed(2)),
    request: data.specialRequests || "no",
    bookingRef: data.bookingRef,
    status: "pending",
    timestamp: Date.now(),
    formattedTime: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };

  await push(bookingsRef, newBooking);
};

export const generateBookingRef = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "LH-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};