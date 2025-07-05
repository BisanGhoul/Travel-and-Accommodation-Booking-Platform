import { useQuery } from '@tanstack/react-query';
import { fetchCityOptions } from '../api/cityApi';
import type { CityOption } from '../types/cityOption';


export const useCityOptions = () => {
  return useQuery<CityOption[]>({
    queryKey: ['cityOptions'],
    queryFn: fetchCityOptions,
    staleTime: 1 * 60 * 1000, //stale time = 1 min
  });
};
