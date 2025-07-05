import { axiosInstance } from './axiosInstance';
import type { Room } from '../types/room';

export const fetchRooms = async (): Promise<Room[]> => {
    const res: { data: Room[] } = await axiosInstance.get('/api/rooms');
    return res.data;
};

export const createRoom = async (room: Omit<Room, 'roomId'>): Promise<Room> => {
    const res: { data: Room } = await axiosInstance.post('/api/rooms', room);
    return res.data;
};

export const updateRoom = async (room: Room): Promise<Room> => {
    const res: { data: Room } = await axiosInstance.put(`/api/rooms/${room.roomId}`, room);
    return res.data;
};

export const updateAvailabilty = async (room: Room): Promise<Room> => {
    const updatedRoom = { ...room, available: !room.availability };
    const res: { data: Room } = await axiosInstance.put(`/api/rooms/${updatedRoom.roomId}`, updatedRoom);
    return res.data;
};

export const deleteRoom = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/rooms/${id}`);
};
