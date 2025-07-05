import type { City } from '../types/city';
import type { CityOption } from '../types/cityOption';
import { axiosInstance } from './axiosInstance';


export const fetchCityOptions = async () => {
    const { data } = await axiosInstance.get<CityOption[]>('/api/cities');
    return data;
}

export const fetchCities = async (): Promise<City[]> => {
    const { data } = await axiosInstance.get<City[]>('/api/cities');
    return data;
};

export const createCity = async (newCity: Omit<City, 'id'>): Promise<City[]> => {
    const { data } = await axiosInstance.post<City[]>('/api/cities', newCity);
    return data;
};

export const updateCity = async (city: City): Promise<City[]> => {
    const { data } = await axiosInstance.put<City[]>(`/api/cities/${city.cityId}`, city);
    return data;
};

export const deleteCity = async (id: number): Promise<City[]> => {
    const { data } = await axiosInstance.delete<City[]>(`/api/cities/${id}`);
    return data;
};
