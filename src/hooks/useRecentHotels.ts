import { useQuery } from '@tanstack/react-query';
import { fetchRecentHotels } from '../api/hotelApi';
import type { RecentHotel } from '../types/hotel';

export const useRecentHotels = (userId: number) => {
  return useQuery<RecentHotel[]>({
    queryKey: ['recentHotels', userId],
    queryFn: () => fetchRecentHotels(userId),
    staleTime: 5 * 60 * 1000,
    enabled: !!userId,
  });
};
