import { useReducer, useEffect, type ReactNode } from 'react';
import BookingContext, { type BookingState } from './BookingContext';
import { listBookings, createBooking, updateBooking, deleteBooking } from '../api/bookingApi';
import type { Booking } from '../types/booking';
import type { Room } from '../types/room';
import { bookingReducer, type BookingAction } from './BookingReducer';


export const BookingProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(bookingReducer, {
        bookings: [],
        loading: false,
        error: null,
    });

    const fetchAll = async () => {
        dispatch({ type: 'LOADING', loading: true });
        try {
            const list = await listBookings();
            console.log('Fetched bookings:', list);
            dispatch({ type: 'SET', bookings: list });
        } catch (e: any) {
            dispatch({ type: 'ERROR', error: e.message || 'Failed to load' });
        }
    };

    const add = async (b: Omit<Booking, 'bookingId'>, room: Room) => {
        dispatch({ type: 'LOADING', loading: true });
        try {
            const created = await createBooking(b, room);
            dispatch({ type: 'ADD', booking: created });
        } catch (e: any) {
            dispatch({ type: 'ERROR', error: e.message || 'Create failed' });
        }
    };

    const update = async (b: Booking) => {
        dispatch({ type: 'LOADING', loading: true });
        try {
            const updated = await updateBooking(b);
            dispatch({ type: 'UPDATE', booking: updated });
        } catch (e: any) {
            dispatch({ type: 'ERROR', error: e.message || 'Update failed' });
        }
    };

    const remove = async (id: number) => {
        dispatch({ type: 'LOADING', loading: true });
        try {
            await deleteBooking(id);
            dispatch({ type: 'REMOVE', id });
        } catch (e: any) {
            dispatch({ type: 'ERROR', error: e.message || 'Delete failed' });
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <BookingContext.Provider value={{ state, fetchAll, add, update, remove }}>
            {children}
        </BookingContext.Provider>
    );
};
