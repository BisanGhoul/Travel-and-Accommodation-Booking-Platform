import { axiosInstance } from './axiosInstance';
import type { HotelDetails } from '../types/hotelDetails';
import type { AvailableRoom } from '../types/room';
import type { HotelReview } from '../types/review';
import type { HotelGalleryImage } from '../types/hotelDetails';
import type { HotelSearchParams } from '../types/hotelSearchParams';
import type { HotelSearchResult } from '../types/hotelSearchResults';
import type { FeaturedDeal } from '../types/hotel';
import type { RecentHotel } from '../types/hotel';

export const fetchFeaturedDeals = async (): Promise<FeaturedDeal[]> => {
    const { data } = await axiosInstance.get<FeaturedDeal[]>('/api/home/featured-deals');
    return data;
};

export const fetchRecentHotels = async (userId: number): Promise<RecentHotel[]> => {
    const { data } = await axiosInstance.get<RecentHotel[]>(`/api/home/users/${userId}/recent-hotels`);
    return data;
};

export const fetchHotelDetails = async (id: string): Promise<HotelDetails> => {
    const res = await axiosInstance.get(`/api/hotels/${id}`);
    return res.data;
};

export const fetchHotelGallery = async (id: string): Promise<HotelGalleryImage[]> => {
    const res = await axiosInstance.get(`/api/hotels/${id}/gallery`);
    return res.data;
};

export const fetchAvailableRooms = async (id: string): Promise<AvailableRoom[]> => {
    const res = await axiosInstance.get(`/api/hotels/${id}/available-rooms`);
    return res.data;
};

export const fetchHotelReviews = async (id: string): Promise<HotelReview[]> => {
    const res = await axiosInstance.get(`/api/hotels/${id}/reviews`);
    return res.data;
};

export const fetchHotelSearch = async (
    params: HotelSearchParams
): Promise<HotelSearchResult[]> => {
    console.log('Search params:', params);

    const response = await axiosInstance.get<HotelSearchResult[]>('/api/home/search', {
        params: {
            city: params.city,
            checkIn: params.checkInDate,
            checkOut: params.checkOutDate,
            adults: params.adults,
            children: params.children,
            rooms: params.numberOfRooms,
        },
    });
    console.log('Hotel search response:', response.data);
    if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from hotel search API');
    }
    return response.data;
};
