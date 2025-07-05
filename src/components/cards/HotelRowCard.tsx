import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating,
    Skeleton,
} from '@mui/material';
import type { HotelSearchResult } from '../../types/hotelSearchResults';

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

type HotelRowCardProps = HotelSearchResult & {
    loading: boolean;
};

const HotelRowCard: FC<HotelRowCardProps> = ({ loading, hotelId, hotelName, roomPhotoUrl, starRating, roomPrice, discount }) => {
    const navigate = useNavigate();
    const thumbnail: string = roomPhotoUrl || 'https://via.placeholder.com/250';
    const price: number = roomPrice - (roomPrice * (discount / 100));

    const handleClick = () => {
        navigate(`/hotels/${hotelId}`);
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                display: 'flex',
                borderRadius: 1,
                overflow: 'hidden',
                height: 200,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
            }}
        >
            {/* Hotel thumbnail */}
            {loading ? (
                <Skeleton variant="rectangular" width={180} height={200} />
            ) : (
                <CardMedia
                    component="img"
                    sx={{
                        width: 250,
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    image={thumbnail}
                    alt={hotelName}
                />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    {/* Hotel name */}
                    <Typography variant="gridCardTitle" fontWeight={600}>
                        {loading ? <Skeleton width="60%" /> : hotelName}
                    </Typography>

                    {/* Hotel Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.25, mb: 2 }}>
                        {loading ? (
                            <Skeleton width={80} height={24} />
                        ) : (
                            <>
                                <Rating
                                    sx={{
                                        fontSize: '1.4rem',
                                        '& .MuiRating-iconFilled': {
                                            color: 'secondary.main',
                                        }
                                    }}
                                    value={starRating}
                                    precision={0.1}
                                    readOnly
                                    size="medium"
                                />
                                <Typography variant="body2" sx={{ ml: 0.5 }}>
                                    {starRating.toFixed(1)}
                                </Typography>
                            </>
                        )}
                    </Box>

                    {/* Description */}
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                        {loading ? <Skeleton width="100%" /> : description}
                    </Typography>

                    {/* Price per night */}
                    {loading ? (
                        <Skeleton width="40%" />
                    ) : (
                        <Typography
                            variant="gridCardPrice"
                            aria-label="Price for room per night"
                        >
                            ${price.toFixed(2)}
                            <Typography variant="body2" component="span" color="text.secondary" fontFamily={'inherit'}>
                                / night
                            </Typography>
                        </Typography>
                    )}
                </CardContent>
            </Box>
        </Card>
    );
};

export default HotelRowCard;
