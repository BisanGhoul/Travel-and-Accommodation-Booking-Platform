import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import HotelDetailsPage from '../pages/HotelDetailsPage';
import AdminPage from '../pages/admin/AdminPage';
import AdminCitiesPage from '../pages/admin/CitiesAdminPage';
import RoomsAdminPage from '../pages/admin/RoomsAdminPage';
import BookingForm from '../components/form/BookingForm';
import ProfilePage from '../pages/ProfilePage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/search"
                element={
                    <PrivateRoute>
                        <SearchPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/form"
                element={
                    <BookingForm
                        roomPrice={100}
                        onSubmit={async (values) => {
                            console.log('Reservation submitted:', values);
                        }}
                    />
                }
            />
            <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                }
            >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<AdminCitiesPage />} />
                <Route path="rooms" element={<RoomsAdminPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}
