import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSideBar';
import { Box } from '@mui/material';

const AdminPage = () => {
    return (
        <Box display="flex">
            <AdminSidebar />
            <Box flexGrow={1} p={2}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminPage;
