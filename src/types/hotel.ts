export interface FeaturedDeal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export interface RecentHotel {
  hotelId: number;
  hotelName: string;
  starRating: number;
  visitDate: string;
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
}
