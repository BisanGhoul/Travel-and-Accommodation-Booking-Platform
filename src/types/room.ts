interface BaseRoom {
    roomId: number;
    roomNumber: number;
    roomPhotoUrl?: string;
    roomType?: string;
    capacityOfAdults: number;
    capacityOfChildren: number;
    availability: boolean;
    price: number;
}
export interface RoomAmenity {
    id: number;
    name: string;
    description: string;
}

export interface Amenity {
    id: number;
    name: string;
    description: string;
}

export interface Room extends BaseRoom {
    amenities: RoomAmenity[];
}

export interface AvailableRoom extends BaseRoom {
    roomAmenities: Amenity[];
}
