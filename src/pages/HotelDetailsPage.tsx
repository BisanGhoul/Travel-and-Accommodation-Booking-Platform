import { type FC, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Rating,
    Tabs,
    Tab,
    Divider,
    CircularProgress,
    Skeleton,
} from '@mui/material';

import Header from '../components/Header';
import HotelImageGallery from '../components/hotelDetailsPage/ImageGallery';
import DescriptionSection from '../components/hotelDetailsPage/DescriptionSection';
import ServicesSection from '../components/hotelDetailsPage/ServicesSection';

import {
    useHotelDetails,
    useHotelGallery,
    useAvailableRooms,
    useHotelReviews,
} from '../hooks/useHotelDetails';
import RoomCardWithBooking from '../components/cards/RoomCardwithBooking';
import HotelFooter from '../components/Footer';
import ReviewList from '../components/hotelDetailsPage/ReviewList';

const HotelDetailsPage: FC = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const id = hotelId ?? '';

    const {
        data: details,
        isLoading: loadingDetails,
        error: detailsError,
    } = useHotelDetails(id);

    const {
        data: gallery,
        isLoading: loadingGallery,
    } = useHotelGallery(id);

    const {
        data: rooms,
        isLoading: loadingRooms,
    } = useAvailableRooms(id);

    const {
        data: reviews,
        isLoading: loadingReviews,
    } = useHotelReviews(id);

    const [activeTab, setActiveTab] = useState(0);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const amenitiesRef = useRef<HTMLDivElement>(null);
    const roomsRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (_: React.SyntheticEvent, newVal: number) => {
        setActiveTab(newVal);
        [descriptionRef, amenitiesRef, roomsRef, reviewsRef][newVal]?.current
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    if (detailsError) {
        return (
            <Box p={4}>
                <Header />
                <Typography color="error">Failed to load hotel details.</Typography>
            </Box>
        );
    }

    if (loadingDetails || !details) {
        return (
            <Box p={4}>
                <Header />
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    return (
        <Box>
            <Header />

            <Box maxWidth="lg" mx="auto" py={4} px={2} component="main">
                <Typography variant="h4" component="h1" gutterBottom>
                    {details.hotelName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {details.hotelType} — {details.location}
                </Typography>
                <Box display="flex" alignItems="center" mb={4}>
                    <Rating
                        value={details.starRating}
                        precision={0.5}
                        readOnly
                        size="medium"
                    />
                    <Typography variant="body2" color="text.secondary" ml={1}>
                        {details.starRating.toFixed(1)}{' '}
                        {details.starRating === 1 ? 'Star' : 'Stars'}
                    </Typography>
                </Box>

                {loadingGallery ? (
                    <Skeleton variant="rectangular" height={300} />
                ) : (
                    <HotelImageGallery images={gallery!} />
                )}

                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        mt: 2,
                        '& .MuiTabs-indicator': {
                            height: 4,
                            backgroundColor: 'secondary.main',
                        },
                    }}
                >
                    {['Description', 'Amenities', 'Rooms', 'Reviews'].map((label, idx) => (
                        <Tab
                            key={label}
                            label={label}
                            sx={{ fontWeight: activeTab === idx ? 600 : 400 }}
                        />
                    ))}
                </Tabs>

                <Box ref={descriptionRef} mt={4} mb={3}>
                    <DescriptionSection
                        title="Description"
                        description={details.description}
                        latitude={details.latitude}
                        longitude={details.longitude}
                    />
                </Box>
                <Divider />

                <Box ref={amenitiesRef} mt={4} mb={3}>
                    <ServicesSection
                        title="Amenities"
                        services={details.amenities}
                    />
                </Box>
                <Divider />

                <Box ref={roomsRef} mt={4} mb={3}>
                    <Typography variant="h5" gutterBottom>
                        Available Rooms
                    </Typography>
                    {loadingRooms ? (
                        <CircularProgress />
                    ) : rooms?.length ? (
                        rooms.map((room) => (
                            <Box key={room.roomId} mb={2}>
                                <RoomCardWithBooking room={room} hotelId={details.hotelName} hotelName={details.hotelName} />
                            </Box>
                        ))
                    ) : (
                        <Typography>No rooms available.</Typography>
                    )}
                </Box>
                <Divider />

                <Box ref={reviewsRef} mt={4} mb={3}>
                    <Typography variant="h5" gutterBottom>
                        Reviews
                    </Typography>

                    {reviews?.length ? (
                        <ReviewList reviews={reviews} loading={loadingReviews} />
                    ) : (
                        <Typography>No reviews yet.</Typography>
                    )}
                </Box>
            </Box>
            <Box sx={{ mt: 16 }}>
                <HotelFooter />
            </Box>
        </Box>
    );
};

export default HotelDetailsPage;
