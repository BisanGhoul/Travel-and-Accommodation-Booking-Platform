import { useState, type FC } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Divider,
    Stack,
    Button,
    Paper,
} from '@mui/material';
import { useBookings } from '../hooks/useBooking';
import Header from '../components/Header';
import HotelFooter from '../components/Footer';
import CheckoutDialog from '../components/checkoutPage/CheckoutDialog';
import ReservationCard from '../components/cards/ReservationCard';

const dummyUser = {
    name: 'Bisan Ghoul',
    email: 'bisan@gmail.com',
    phone: '0569123456',
    profilePic: '/profile-placeholder.png',
};

const ProfilePage: FC = () => {
    const { state } = useBookings();
    const { bookings } = state;

    const [showSummary, setShowSummary] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const totalPayment = bookings.reduce(
        (sum, b) => sum + b.totalPayment,
        0
    );

    return (
        <>
            <Header />

            <Box maxWidth="md" mx="auto" px={2} py={4}>
                {/* Profile Card */}
                <Paper
                    elevation={3}
                    sx={{ p: 4, borderRadius: 3, mb: 5, textAlign: 'center' }}
                >
                    <Avatar
                        src={dummyUser.profilePic}
                        alt={dummyUser.name}
                        sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                    />
                    <Typography variant="h5" fontWeight={600}>
                        {dummyUser.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {dummyUser.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dummyUser.phone}
                    </Typography>
                </Paper>

                {/* Reservation List */}
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Your Reservations
                </Typography>

                {bookings.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        You haven’t made any reservations yet.
                    </Typography>
                ) : (
                    <Stack spacing={2} mt={2}>
                        {bookings.map((b) => (
                            <ReservationCard key={b.bookingId} booking={b} />
                        ))}
                    </Stack>
                )}

                {/* Proceed to Checkout */}
                {!showSummary && bookings.length > 0 && (
                    <Box mt={5} textAlign="center">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => setShowSummary(true)}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                )}

                {/* Confirmation Summary */}
                {showSummary && (
                    <Paper elevation={4} sx={{ mt: 5, p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Confirm Your Reservations
                        </Typography>

                        <Stack spacing={2} mt={1}>
                            {bookings.map((b) => (
                                <Box
                                    key={b.bookingId}
                                    sx={{ borderBottom: '1px solid #ddd', pb: 1 }}
                                >
                                    <Typography variant="subtitle2" fontWeight={500}>
                                        Room {b.roomNumber} — {b.hotelName}
                                    </Typography>
                                    <Typography variant="body2">
                                        {new Date(b.checkIn).toLocaleDateString()} →{' '}
                                        {new Date(b.checkOut).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        ${b.totalPayment.toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Box mt={2}>
                            <Divider />
                            <Typography variant="h6" mt={2}>
                                Total Payment: ${totalPayment.toFixed(2)}
                            </Typography>
                        </Box>

                        <Box mt={3} textAlign="center">
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                onClick={() => setCheckoutOpen(true)}
                            >
                                Confirm &amp; Pay
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>

            <CheckoutDialog
                open={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
            />

            <Box sx={{ mt: 16 }}>
                <HotelFooter />
            </Box>
        </>
    );
};

export default ProfilePage;
