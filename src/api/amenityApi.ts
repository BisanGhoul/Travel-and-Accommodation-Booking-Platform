import { axiosInstance } from "./axiosInstance";

export const fetchAmenities = async () => {
    const { data } = await axiosInstance.get('/api/search-results/amenities');
    return data;
}