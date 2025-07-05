import { axiosInstance } from './axiosInstance';
import type { City } from '../types/city';

export const getTrendingDestinations = async (): Promise<City[]> => {
    const { data } = await axiosInstance.get<City[]>('/api/home/destinations/trending');
    return data;
};
