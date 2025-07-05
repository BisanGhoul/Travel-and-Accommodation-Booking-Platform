import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
} from '../api/roomApi';
import type { Room } from '../types/room';

export const useRooms = () => {
    return useQuery<Room[], Error>({
        queryKey: ['rooms'],
        queryFn: fetchRooms,
    });
};

export const useCreateRoom = () => {
    const qc = useQueryClient();
    return useMutation<Room, Error, Omit<Room, 'roomId'>>({
        mutationFn: createRoom,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['rooms'] });
        },
    });
};

export const useUpdateRoom = () => {
    const qc = useQueryClient();
    return useMutation<Room, Error, Room>({
        mutationFn: updateRoom,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['rooms'] });
        },
    });
};

export const useDeleteRoom = () => {
    const qc = useQueryClient();
    return useMutation<void, Error, number>({
        mutationFn: deleteRoom,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['rooms'] });
        },
    });
};
