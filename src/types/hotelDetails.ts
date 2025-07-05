export interface HotelAmenity {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
}

export interface HotelRoomSummary {
    id: number;
    name: string;
    type: string;
    price: number;
    available: boolean;
    maxOccupancy: number;
}

export interface HotelDetails {
    id: number;
    hotelName: string;
    location: string;
    description: string;
    hotelType: string;
    starRating: number;
    latitude: number;
    longitude: number;
    imageUrl: string;
    availableRooms: number;
    cityId: number;
    amenities: HotelAmenity[];
    rooms: HotelRoomSummary[];
}

export interface HotelGalleryImage {
    id: number;
    url: string;
}
