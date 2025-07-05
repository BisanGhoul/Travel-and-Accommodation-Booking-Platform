import { useQuery } from '@tanstack/react-query';
import {
    fetchHotelDetails,
    fetchHotelGallery,
    fetchAvailableRooms,
    fetchHotelReviews,
} from '../api/hotelApi';

export const useHotelDetails = (id: string) => {
    return useQuery({
        queryKey: ['hotelDetails', id],
        queryFn: () => fetchHotelDetails(id),
    });
};

export const useHotelGallery = (id: string) => {
    return useQuery({
        queryKey: ['hotelGallery', id],
        queryFn: () => fetchHotelGallery(id),
    });
};

export const useAvailableRooms = (id: string) => {
    return useQuery({
        queryKey: ['availableRooms', id],
        queryFn: () => fetchAvailableRooms(id),
    });
};

export const useHotelReviews = (id: string) => {
    return useQuery({
        queryKey: ['hotelReviews', id],
        queryFn: () => fetchHotelReviews(id),
    });
};
