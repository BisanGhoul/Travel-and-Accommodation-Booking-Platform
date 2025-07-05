import React from "react";
import { Box } from "@mui/material";
import HotelGridCard from "../cards/HotelGridCard";
import { useFeaturedDeals } from "../../hooks/useFeaturedDeals";
import { useRecentHotels } from "../../hooks/useRecentHotels";
import type { FeaturedDeal, RecentHotel } from "../../types/hotel";

interface Props {
  type: "featured" | "recent";
  userId?: number;
}

const HorizontalHotelList: React.FC<Props> = ({ type, userId = 2 }) => {
  const {
    data: featuredDeals = [],
    isLoading: isFeaturedLoading,
  } = useFeaturedDeals();

  const {
    data: recentHotels = [],
    isLoading: isRecentLoading,
  } = useRecentHotels(userId);

  const hotelsToShow = type === "featured" ? featuredDeals : recentHotels;
  const isLoading = type === "featured" ? isFeaturedLoading : isRecentLoading;

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        paddingX: 2,
        paddingBottom: 1,
        width: "100%",
        scrollSnapType: "x mandatory",
        "& > *": {
          flexShrink: 0,
          scrollSnapAlign: "start",
        },
        "&::-webkit-scrollbar": {
          height: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: 3,
        },
      }}
    >
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Box key={index} width={345}>
            <HotelGridCard type="loading" />
          </Box>
        ))
      ) : (
        hotelsToShow.map((hotel) => {
          const hotelData =
            type === "featured"
              ? (hotel as FeaturedDeal)
              : (hotel as RecentHotel);

          return (
            <Box key={hotelData.hotelId} width={345}>
              <HotelGridCard hotel={hotelData} type={type} />
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default HorizontalHotelList;
