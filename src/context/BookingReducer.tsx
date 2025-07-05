import type { BookingState } from './BookingContext';
import type { Booking } from '../types/booking';

type Action =
    | { type: 'SET'; bookings: Booking[] }
    | { type: 'ADD'; booking: Booking }
    | { type: 'UPDATE'; booking: Booking }
    | { type: 'REMOVE'; id: number }
    | { type: 'LOADING'; loading: boolean }
    | { type: 'ERROR'; error: string | null };

export function bookingReducer(state: BookingState, action: Action): BookingState {
    switch (action.type) {
        case 'SET':
            return { ...state, bookings: action.bookings, loading: false };
        case 'ADD':
            return { ...state, bookings: [...state.bookings, action.booking], loading: false };
        case 'UPDATE':
            return {
                ...state,
                bookings: state.bookings.map((b) =>
                    b.bookingId === action.booking.bookingId ? action.booking : b
                ),
                loading: false,
            };
        case 'REMOVE':
            return { ...state, bookings: state.bookings.filter((b) => b.bookingId !== action.id), loading: false };
        case 'LOADING':
            return { ...state, loading: action.loading };
        case 'ERROR':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
}

export type BookingAction = Action;
