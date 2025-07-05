import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchCities,
    createCity,
    updateCity,
    deleteCity,
} from '../api/cityApi';
import type { City } from '../types/city';

export const useCities = () => {
    return useQuery<City[], Error>({
        queryKey: ['cities'],
        queryFn: fetchCities,
    });
};

export const useCreateCity = () => {
    const qc = useQueryClient();
    return useMutation<City[], Error, Omit<City, 'id'>>({
        mutationFn: createCity,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cities'] });
        },
    });
};

export const useUpdateCity = () => {
    const qc = useQueryClient();
    return useMutation<City[], Error, City>({
        mutationFn: updateCity,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cities'] });
        },
    });
};

export const useDeleteCity = () => {
    const qc = useQueryClient();
    return useMutation<City[], Error, number>({
        mutationFn: deleteCity,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cities'] });
        },
    });
};
