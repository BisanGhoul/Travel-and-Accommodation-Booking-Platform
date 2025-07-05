import { useState, useRef } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useBookings } from '../../hooks/useBooking';

const CheckoutDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { state } = useBookings();
    const { bookings } = state;
    const receiptRef = useRef(null);

    const total = bookings.reduce((sum, b) => sum + b.totalPayment, 0);

    const handleDownload = async () => {
        if (!receiptRef.current) return;

        const canvas = await html2canvas(receiptRef.current);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('reservation_receipt.pdf');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Reservation Summary</DialogTitle>
            <DialogContent dividers>
                <Box ref={receiptRef} p={2}>
                    <Typography variant="h6" gutterBottom>
                        Booking Summary
                    </Typography>
                    <Stack spacing={2}>
                        {bookings.map((b) => (
                            <Card key={b.bookingId} variant="outlined" sx={{ p: 2 }}>
                                <CardContent>
                                    <Typography fontWeight={600} variant="subtitle1" gutterBottom>
                                        Booking ID: {b.bookingId}
                                    </Typography>
                                    <Typography>
                                        <strong>Hotel:</strong> {b.hotelName} (Room {b.roomNumber})
                                    </Typography>
                                    <Typography>
                                        <strong>Customer Name:</strong> {b.customerName}
                                    </Typography>
                                    <Typography>
                                        <strong>National ID:</strong> {b.nationalId}
                                    </Typography>
                                    <Typography>
                                        <strong>Phone Number:</strong> {b.phoneNumber}
                                    </Typography>
                                    <Typography>
                                        <strong>Check-in:</strong> {new Date(b.checkIn).toLocaleDateString()}
                                    </Typography>
                                    <Typography>
                                        <strong>Check-out:</strong> {new Date(b.checkOut).toLocaleDateString()}
                                    </Typography>
                                    <Typography color="primary" fontWeight={600} mt={1}>
                                        Total Payment: ${b.totalPayment.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>

                    <Box mt={2}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Total Payment: ${total.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleDownload} variant="contained" color="primary">
                    Confirm & Download PDF
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckoutDialog;
