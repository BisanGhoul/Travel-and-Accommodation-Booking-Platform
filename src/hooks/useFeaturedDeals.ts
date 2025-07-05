import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedDeals } from '../api/hotelApi';
import type { FeaturedDeal } from '../types/hotel';

export const useFeaturedDeals = () => {
  return useQuery<FeaturedDeal[]>({
    queryKey: ['featuredDeals'],
    queryFn: fetchFeaturedDeals,
    staleTime: 5 * 60 * 1000,
  });
};
