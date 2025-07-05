import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Button,
    Stack,
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { type Booking } from '../../types/booking';
import { useBookings } from '../../hooks/useBooking';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DateRangePicker from '../datePickers/DateRangePicker';

type Props = {
    booking: Booking;
};

const ReservationCard = ({ booking }: Props) => {
    const { update, remove } = useBookings();
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState<{
        checkIn: Dayjs | null;
        checkOut: Dayjs | null;
    }>({
        checkIn: dayjs(booking.checkIn),
        checkOut: dayjs(booking.checkOut),
    });

    const totalPayment = useMemo(() => {
        if (!form.checkIn || !form.checkOut) return 0;
        const nights = Math.max(form.checkOut.diff(form.checkIn, 'day'), 0);
        return booking.pricePerNight * nights;
    }, [form.checkIn, form.checkOut, booking.pricePerNight]);

    const handleUpdate = async () => {
        if (!form.checkIn || !form.checkOut) return;
        await update({
            ...booking,
            checkIn: form.checkIn.toISOString(),
            checkOut: form.checkOut.toISOString(),
            totalPayment,
        });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await remove(booking.bookingId);
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
                {isEditing ? (
                    <Stack spacing={2}>
                        <DateRangePicker
                            checkIn={form.checkIn}
                            checkOut={form.checkOut}
                            setCheckIn={(date) => setForm((f) => ({ ...f, checkIn: date }))}
                            setCheckOut={(date) => setForm((f) => ({ ...f, checkOut: date }))}
                        />
                        <Typography>Total: ${totalPayment.toFixed(2)}</Typography>
                        <Box>
                            <Button onClick={handleUpdate} variant="contained" sx={{ mr: 2 }}>
                                <Save sx={{ mr: 1 }} /> Save
                            </Button>
                            <Button onClick={() => setIsEditing(false)} variant="outlined">
                                <Cancel sx={{ mr: 1 }} /> Cancel
                            </Button>
                        </Box>
                    </Stack>
                ) : (
                    <>
                        <Typography fontWeight={600}>
                            Room {booking.roomNumber} – {booking.hotelName}
                        </Typography>
                        <Typography variant="body2">
                            {new Date(booking.checkIn).toLocaleDateString()} →{' '}
                            {new Date(booking.checkOut).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            Total: ${booking.totalPayment.toFixed(2)}
                        </Typography>
                        <Box mt={1}>
                            <IconButton onClick={() => setIsEditing(true)} aria-label="edit">
                                <Edit fontSize="small" />
                            </IconButton>
                            <IconButton onClick={handleDelete} aria-label="delete">
                                <Delete fontSize="small" color="error" />
                            </IconButton>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ReservationCard;
