export interface Booking {
  bookingId: number;
  customerId: number;
  customerName: string;
  nationalId: string;
  phoneNumber: string;
  checkIn: string;
  checkOut: string;
  totalPayment: number;
  pricePerNight: number;
  hotelName: string;
  hotelId: string;
  roomNumber: number;
}
