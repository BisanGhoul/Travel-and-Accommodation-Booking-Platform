export interface HotelSearchParams {
    city: string;
    checkInDate: string;     // "YYYY-MM-DD"
    checkOutDate: string;    // "YYYY-MM-DD"
    adults: number;
    children: number;
    numberOfRooms: number;
}