import { createContext } from 'react';
import type { Booking } from '../types/booking';
import type { Room } from '../types/room';

export type BookingState = {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
};

export type BookingContextType = {
  state: BookingState;
  fetchAll: () => Promise<void>;
  add: (b: Omit<Booking, 'bookingId'>, room: Room) => Promise<void>;
  update: (b: Booking) => Promise<void>;
  remove: (id: number) => Promise<void>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export default BookingContext;
