import type { Room } from '../types/room';
import type { AvailableRoom } from '../types/room'; 

export function mapAvailableRoomToRoom(availableRoom: AvailableRoom): Room {
    return {
        ...availableRoom,
        amenities: availableRoom.roomAmenities,
    };
}
