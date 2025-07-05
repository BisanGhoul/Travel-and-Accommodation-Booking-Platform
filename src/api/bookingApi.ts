import { axiosInstance } from './axiosInstance';
import type { Booking } from '../types/booking';
import { updateAvailabilty } from './roomApi'; 
import type { Room } from '../types/room'; 

export const listBookings = async (): Promise<Booking[]> => {
    const { data } = await axiosInstance.get<Booking[]>('/api/bookings');
    return data;
};

export const createBooking = async (
    b: Omit<Booking, 'bookingId'>,
    room: Room 
): Promise<Booking> => {
    const { data } = await axiosInstance.post<Booking>('/api/bookings', b);

    if (!data || !data.bookingId) {
        throw new Error('Invalid booking data received from API');
    }

    try {
        await updateAvailabilty(room);
    } catch (e: any) {
        console.error('Failed to update room availability:', e.message);
    }

    return data;
};


export const updateBooking = async (b: Booking): Promise<Booking> => {
    const { data } = await axiosInstance.put<Booking>(`/api/bookings/${b.bookingId}`, b);
    return data;
};

export const deleteBooking = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/bookings/${id}`);
};
