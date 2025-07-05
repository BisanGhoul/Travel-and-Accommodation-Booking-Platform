import { useState, useMemo, type FC } from 'react';
import {
    Box,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    CircularProgress,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
    useRooms,
    useCreateRoom,
    useUpdateRoom,
    useDeleteRoom,
} from '../../hooks/useRooms';
import type { Room } from '../../types/room';
import AdminSearchBar from '../../components/admin/AdminSearchBar';

const AdminRoomsPage: FC = () => {
    const { data: rooms = [], isLoading } = useRooms();
    const createMut = useCreateRoom();
    const updateMut = useUpdateRoom();
    const deleteMut = useDeleteRoom();

    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<Room | null>(null);

    const filtered = useMemo(
        () =>
            rooms.filter((r) =>
                r.roomType.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [rooms, searchTerm]
    );

    const [form, setForm] = useState<Omit<Room, 'roomId' | 'availability'>>({
        roomNumber: 0,
        roomPhotoUrl: '',
        roomType: '',
        capacityOfAdults: 0,
        capacityOfChildren: 0,
        price: 0,
        amenities: [],
    });

    const [availability, setAvailability] = useState(true);

    const isSaving = createMut.isLoading || updateMut.isLoading;
    const isDeleting = deleteMut.isLoading;

    const openCreate = () => {
        setEditing(null);
        setForm({
            roomNumber: 0,
            roomPhotoUrl: '',
            roomType: '',
            capacityOfAdults: 0,
            capacityOfChildren: 0,
            price: 0,
            amenities: [],
        });
        setAvailability(true);
        setDialogOpen(true);
    };

    const openEdit = (room: Room) => {
        setEditing(room);
        setForm({
            roomNumber: room.roomNumber,
            roomPhotoUrl: room.roomPhotoUrl,
            roomType: room.roomType,
            capacityOfAdults: room.capacityOfAdults,
            capacityOfChildren: room.capacityOfChildren,
            price: room.price,
            amenities: room.amenities,
        });
        setAvailability(room.availability);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setEditing(null);
    };

    const onSave = () => {
        if (!form.roomNumber || !form.roomType.trim() || !form.price) {
            alert('Room number, type, and price are required.');
            return;
        }

        if (editing) {
            updateMut.mutate(
                { roomId: editing.roomId, ...form, availability },
                {
                    onError: (error) => alert(`Update failed: ${error.message}`),
                }
            );
        } else {
            createMut.mutate(
                { ...form, availability },
                {
                    onError: (error) => alert(`Creation failed: ${error.message}`),
                }
            );
        }
        setDialogOpen(false);
        setEditing(null);
    };

    const handleDelete = (roomId: number) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            deleteMut.mutate(roomId, {
                onError: (error) => alert(`Delete failed: ${error.message}`),
            });
        }
    };

    if (isLoading) {
        return (
            <Box p={4} textAlign="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Manage Rooms
            </Typography>

            <AdminSearchBar placeholder="Search rooms..." onSearch={setSearchTerm} />

            <Button
                variant="contained"
                onClick={openCreate}
                sx={{
                    mb: 2,
                    backgroundColor: 'secondaryButton.main',
                    color: 'secondaryButton.contrastText',
                }}
                disabled={isSaving || isDeleting}
            >
                + Create Room
            </Button>

            <Paper>
                <Table>
                    <TableHead
                        sx={{
                            '& th': {
                                color: 'secondaryHeader.contrastText',
                                backgroundColor: 'secondaryHeader.main',
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell>
                                <strong>Room Number</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Type</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Price</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Availability</strong>
                            </TableCell>
                            <TableCell align="right">
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((room) => (
                            <TableRow
                                key={room.roomId}
                                sx={{
                                    bgcolor: 'hsla(139, 90.3%, 20.2%, 0.04)',
                                    '& .MuiTableCell-root': {
                                        color: 'secondaryHeader.main',
                                    },
                                }}
                            >
                                <TableCell>{room.roomNumber}</TableCell>
                                <TableCell>{room.roomType}</TableCell>
                                <TableCell>${room.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    {room.availability ? 'Available' : 'Unavailable'}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => openEdit(room)}
                                        aria-label={`Edit Room ${room.roomNumber}`}
                                        disabled={isSaving || isDeleting}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(room.roomId)}
                                        aria-label={`Delete Room ${room.roomNumber}`}
                                        disabled={isDeleting || isSaving}
                                    >
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No rooms found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                maxWidth="sm"
                fullWidth
                aria-labelledby="room-dialog-title"
            >
                <DialogTitle id="room-dialog-title">
                    {editing ? 'Edit Room' : 'Create Room'}
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {editing && (
                        <TextField
                            label="Room ID"
                            value={editing.roomId}
                            disabled
                            fullWidth
                            inputProps={{ 'aria-readonly': 'true' }}
                        />
                    )}
                    <TextField
                        label="Room Number"
                        type="number"
                        value={form.roomNumber}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                roomNumber: parseInt(e.target.value, 10) || 0,
                            }))
                        }
                        fullWidth
                        required
                        error={form.roomNumber <= 0}
                        helperText={form.roomNumber <= 0 ? 'Room number must be > 0' : ''}
                    />
                    <TextField
                        label="Room Type"
                        value={form.roomType}
                        onChange={(e) => setForm((f) => ({ ...f, roomType: e.target.value }))}
                        fullWidth
                        required
                        error={form.roomType.trim() === ''}
                        helperText={form.roomType.trim() === '' ? 'Room type is required' : ''}
                    />
                    <TextField
                        label="Photo URL"
                        value={form.roomPhotoUrl}
                        onChange={(e) => setForm((f) => ({ ...f, roomPhotoUrl: e.target.value }))}
                        fullWidth
                    />
                    <TextField
                        label="Adults Capacity"
                        type="number"
                        value={form.capacityOfAdults}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                capacityOfAdults: parseInt(e.target.value, 10) || 0,
                            }))
                        }
                        fullWidth
                    />
                    <TextField
                        label="Children Capacity"
                        type="number"
                        value={form.capacityOfChildren}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                capacityOfChildren: parseInt(e.target.value, 10) || 0,
                            }))
                        }
                        fullWidth
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                price: parseFloat(e.target.value) || 0,
                            }))
                        }
                        fullWidth
                        required
                        error={form.price <= 0}
                        helperText={form.price <= 0 ? 'Price must be > 0' : ''}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={availability}
                                onChange={(e) => setAvailability(e.target.checked)}
                                disabled={isSaving || isDeleting}
                            />
                        }
                        label="Available"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} disabled={isSaving || isDeleting}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onSave}
                        disabled={
                            isSaving ||
                            isDeleting ||
                            form.roomNumber <= 0 ||
                            form.roomType.trim() === '' ||
                            form.price <= 0
                        }
                        startIcon={isSaving ? <CircularProgress size={20} /> : null}
                    >
                        {editing ? 'Save' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminRoomsPage;
