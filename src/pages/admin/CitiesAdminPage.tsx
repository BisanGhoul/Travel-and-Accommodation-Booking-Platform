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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useCities, useCreateCity, useUpdateCity, useDeleteCity } from '../../hooks/useCities';
import type { City } from '../../types/city';
import AdminSearchBar from '../../components/admin/AdminSearchBar';

const AdminCitiesPage: FC = () => {
    const { data: cities = [], isLoading } = useCities();
    const createMut = useCreateCity();
    const updateMut = useUpdateCity();
    const deleteMut = useDeleteCity();
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<City | null>(null);

    const filtered = useMemo(
        () => cities.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [cities, searchTerm]
    );

    const [form, setForm] = useState<Omit<City, 'id'>>({ name: '', description: '' });

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', description: '' });
        setDialogOpen(true);
    };
    const openEdit = (c: City) => {
        setEditing(c);
        setForm({ name: c.name, description: c.description });
        setDialogOpen(true);
    };
    const closeDialog = () => setDialogOpen(false);

    const onSave = () => {
        if (!form.name.trim()) {
            alert('City name is required');
            return;
        }

        if (editing) {
            updateMut.mutate(
                { id: editing.id, ...form },
                {
                    onError: (error) => alert(`Update failed: ${error.message}`),
                }
            );
        } else {
            createMut.mutate(form, {
                onError: (error) => alert(`Creation failed: ${error.message}`),
            });
        }
        setDialogOpen(false);
    };

    const handleDelete = (city: City) => {
        if (window.confirm(`Are you sure you want to delete "${city.name}"?`)) {
            deleteMut.mutate(city.id, {
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

    const isSaving = createMut.isLoading || updateMut.isLoading;

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Manage Cities
            </Typography>

            <AdminSearchBar
                placeholder="Search cities..."
                onSearch={setSearchTerm}
            />

            <Button
                variant="contained"
                onClick={openCreate}
                sx={{ mb: 2, backgroundColor: 'secondaryButton.main', color: 'secondaryButton.contrastText' }}
            >
                + Create City
            </Button>

            <Paper>
                <Table>
                    <TableHead
                        sx={{
                            "& th": {
                                color: "secondaryHeader.contrastText",
                                backgroundColor: "secondaryHeader.main",
                            }
                        }}
                    >
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map(city => (
                            <TableRow key={city.id}
                                sx={{
                                    bgcolor: 'hsla(139, 90.30%, 20.20%, 0.04)',
                                    '& .MuiTableCell-root': {
                                        color: 'secondaryHeader.main',
                                    },
                                }}
                            >
                                <TableCell>{city.name}</TableCell>
                                <TableCell>{city.description || '—'}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => openEdit(city)}
                                        aria-label={`Edit ${city.name}`}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(city)}
                                        aria-label={`Delete ${city.name}`}
                                    >
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No cities found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>

            {/* Create / Edit Dialog */}
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>
                    {editing ? 'Edit City' : 'Create City'}
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        fullWidth
                        required
                        error={form.name.trim() === ''}
                        helperText={form.name.trim() === '' ? 'Name is required' : ''}
                    />
                    <TextField
                        label="Description"
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} disabled={isSaving}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={onSave}
                        disabled={isSaving || form.name.trim() === ''}
                        startIcon={isSaving ? <CircularProgress size={20} /> : null}
                    >
                        {editing ? 'Save' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminCitiesPage;
