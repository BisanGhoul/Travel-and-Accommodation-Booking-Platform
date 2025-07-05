import { useQuery } from '@tanstack/react-query';
import { getTrendingDestinations } from '../api/destinationsApi';
import type { City } from '../types/city';

export const useTrendingDestinations = () => {
    return useQuery<City[], Error>({
        queryKey: ['trendingDestinations'],
        queryFn: getTrendingDestinations,
    });
};
