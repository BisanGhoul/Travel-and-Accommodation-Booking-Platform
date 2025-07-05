import { useQuery } from '@tanstack/react-query';
import { fetchAmenities } from '../api/amenityApi';
import type { Amenity } from '../types/amenity';

export const useAmenities = () => {
    return useQuery<Amenity[]>({
        queryKey: ['amenities'],
        queryFn: fetchAmenities,
        staleTime: 5 * 60 * 1000,
    });
};
