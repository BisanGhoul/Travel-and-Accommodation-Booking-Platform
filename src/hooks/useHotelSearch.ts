import { useQuery } from '@tanstack/react-query';
import { fetchHotelSearch } from '../api/hotelApi';
import type { HotelSearchParams } from '../types/hotelSearchParams';

export const useHotelSearch = (params: HotelSearchParams, enabled: boolean,) =>
  useQuery({
    queryKey: ['hotelSearch', params],
    queryFn: () => fetchHotelSearch(params),
    enabled,
  });
