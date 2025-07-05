import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RoomCard from './RoomCard';
import BookingForm from '../form/BookingForm';
import type { AvailableRoom } from '../../types/room';
import type { BookingFormValues } from '../../types/bookingFormValues';
import { useBookings } from '../../hooks/useBooking';
import { mapAvailableRoomToRoom } from '../../utility/roomMapper';

interface RoomCardWithBookingProps {
    room: AvailableRoom;
    hotelId: string;
    hotelName: string;
}

const RoomCardWithBooking: React.FC<RoomCardWithBookingProps> = ({ room, hotelId, hotelName }) => {
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { add } = useBookings();

    const handleBookClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (values: BookingFormValues) => {
        const nights = values.dateRange.endDate!.diff(values.dateRange.startDate!, 'day');
        const totalPayment = nights * room.price;

        await add({
            customerId: 1, // TODO: replace 
            customerName: values.reserverName,
            nationalId: values.nationalId,
            phoneNumber: values.phoneNumber,
            checkIn: values.dateRange.startDate!.toISOString(),
            checkOut: values.dateRange.endDate!.toISOString(),
            totalPayment,
            hotelName,
            hotelId: (hotelId),
            roomNumber: room.roomNumber,
        }, mapAvailableRoomToRoom(room));

        setOpen(false);
        setOpenSnackbar(true);
    };

    return (
        <>
            <RoomCard room={room} onBook={handleBookClick} />

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby="booking-dialog-title">
                <DialogTitle id="booking-dialog-title">
                    Book Room {room.roomNumber}
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <BookingForm roomPrice={room.price} onSubmit={handleSubmit} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setOpenSnackbar(false)} variant="filled">
                    Room booked successfully!
                </Alert>
            </Snackbar>
        </>
    );

};

export default RoomCardWithBooking;
