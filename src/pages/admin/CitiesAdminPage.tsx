// src/pages/admin/AdminCitiesPage.tsx
import { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    Typography,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import AdminSidebar from '../../components/admin/AdminSideBar';
import AdminSearchBar from '../../components/admin/AdminSearchBar';
import AdminTable from '../../components/admin/AdminTable';
import {
    useCities,
    useCreateCity,
    useUpdateCity,
    useDeleteCity,
} from '../../hooks/useCities';
import type { CityOption as City } from '../../types/cityOption';

const emptyCity: Omit<City, 'id'> = {
    name: '',
    description: '',
};

const AdminCitiesPage: React.FC = () => {
    const { data: cities = [], isLoading: loadingCities } = useCities();
    const createCity = useCreateCity();
    const updateCity = useUpdateCity();
    const deleteCity = useDeleteCity();

    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCity, setEditingCity] = useState<City | null>(null);
    const [formValues, setFormValues] = useState<Omit<City, 'id'>>(emptyCity);

    // snackbar
    const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });
    const openSnack = (msg: string, severity: 'success' | 'error') => setSnack({ open: true, message: msg, severity });
    const closeSnack = () => setSnack(s => ({ ...s, open: false }));

    // watch for each mutation’s success / error
    useEffect(() => {
        if (createCity.isSuccess) openSnack('City created!', 'success');
        if (createCity.isError) openSnack(`Create failed: ${createCity.error?.message}`, 'error');
    }, [createCity.isSuccess, createCity.isError]);

    useEffect(() => {
        if (updateCity.isSuccess) openSnack('City updated!', 'success');
        if (updateCity.isError) openSnack(`Update failed: ${updateCity.error?.message}`, 'error');
    }, [updateCity.isSuccess, updateCity.isError]);

    useEffect(() => {
        if (deleteCity.isSuccess) openSnack('City deleted!', 'success');
        if (deleteCity.isError) openSnack(`Delete failed: ${deleteCity.error?.message}`, 'error');
    }, [deleteCity.isSuccess, deleteCity.isError]);

    const filtered = useMemo(
        () =>
            cities.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [cities, searchTerm]
    );

    const openCreate = () => {
        setEditingCity(null);
        setFormValues(emptyCity);
        setDialogOpen(true);
    };
    const openEdit = (city: City) => {
        setEditingCity(city);
        setFormValues({ name: city.name, description: city.description });
        setDialogOpen(true);
    };
    const closeDialog = () => setDialogOpen(false);

    const handleSave = () => {
        if (editingCity) {
            updateCity.mutate({ id: editingCity.id, ...formValues });
        } else {
            createCity.mutate(formValues);
        }
        closeDialog();
    };

    const handleDelete = (row: City) => {
        deleteCity.mutate(row.id);
    };

    return (
        <Box display="flex" height="100vh">
            <AdminSidebar />

            <Box flexGrow={1} p={2}>
                <Typography variant="h5" gutterBottom>
                    Manage Cities
                </Typography>

                <Box display="flex" alignItems="center" mb={2} gap={2}>
                    <Button variant="contained" onClick={openCreate}>
                        + Add City
                    </Button>
                    <Box flexGrow={1}>
                        <AdminSearchBar placeholder="Search cities…" onSearch={setSearchTerm} />
                    </Box>
                </Box>

                {loadingCities ? (
                    <Box textAlign="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <AdminTable<City>
                        title="Cities"
                        data={filtered}
                        columns={[
                            { key: 'name', header: 'City Name' },
                            { key: 'description', header: 'Description' },
                        ]}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                    />
                )}

                {/* Create / Edit Dialog */}
                <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                    <DialogTitle>{editingCity ? 'Edit City' : 'Add City'}</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} mt={1}>
                            <TextField
                                label="City Name"
                                value={formValues.name}
                                onChange={e => setFormValues(f => ({ ...f, name: e.target.value }))}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={formValues.description}
                                onChange={e => setFormValues(f => ({ ...f, description: e.target.value }))}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>
                            {editingCity ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Snackbar
                open={snack.open}
                autoHideDuration={3000}
                onClose={closeSnack}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={closeSnack} severity={snack.severity} variant="filled">
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminCitiesPage;
