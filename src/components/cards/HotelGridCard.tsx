import { type FC } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Skeleton,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RatingBox from "./RatingBox";
import type { FeaturedDeal, RecentHotel } from "../../types/hotel";

type Props = {
    hotel?: FeaturedDeal | RecentHotel;
    type: "featured" | "recent" | "loading";
};

const HotelGridCard: FC<Props> = ({ hotel, type }) => {
    if (type === "loading") {
        return (
            <Card sx={{ width: 345, borderRadius: 1, boxShadow: 3 }}>
                <Skeleton variant="rectangular" height={180} />
                <CardContent>
                    <Skeleton width="80%" height={28} />
                    <Skeleton width="60%" height={20} />
                    <Box mt={2}>
                        <Skeleton width="40%" height={24} />
                        <Skeleton width="60px" height={24} />
                    </Box>
                </CardContent>
            </Card>
        );
    }

    const isFeatured = type === "featured";

    const imageUrl = isFeatured
        ? (hotel as FeaturedDeal).roomPhotoUrl
        : (hotel as RecentHotel).thumbnailUrl;

    const hotelName = hotel!.hotelName;
    const location = hotel!.cityName;
    const rating = isFeatured
        ? (hotel as FeaturedDeal).hotelStarRating
        : (hotel as RecentHotel).starRating;

    const pricePerNight = isFeatured
        ? (hotel as FeaturedDeal).originalRoomPrice
        : (hotel as RecentHotel).priceUpperBound;

    const discountPrice = isFeatured
        ? (hotel as FeaturedDeal).finalPrice
        : (hotel as RecentHotel).priceLowerBound;

    return (
        <Card sx={{ width: 330, borderRadius: 1, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="150"
                image={imageUrl}
                alt={hotelName}
            />

            <CardContent sx={{ paddingBottom: 1 }}>
                {/* Name + Rating aligned in one row with ellipsis */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="gridCardTitle"
                        gutterBottom
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '70%',
                        }}
                        title={hotelName} // Tooltip for full name on hover
                    >
                        {hotelName}
                    </Typography>

                    <RatingBox color="primary.light" rating={rating} size="1rem" />
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                    <LocationOnOutlinedIcon fontSize="inherit" />
                    {location}
                </Typography>

                {pricePerNight && discountPrice && (
                    <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" gap={2}>
                            <Typography
                                variant="gridCardPrice"
                                component="del"
                                sx={{
                                    textDecoration: "line-through",
                                    color: "text.disabled",
                                    fontSize: "1.5rem",
                                }}
                                aria-label="Original price per night"
                            >
                                {pricePerNight}$
                            </Typography>
                            <Typography
                                variant="gridCardPrice"
                                aria-label="Discounted price per night"
                            >
                                {discountPrice}$
                            </Typography>
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>

    );
};

export default HotelGridCard;
