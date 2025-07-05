import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  useMediaQuery,
  useTheme,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 200;

const links = [
  { text: 'Cities', icon: <LocationCityIcon />, path: '/admin/cities' },
  { text: 'Hotels', icon: <NightShelterIcon />, path: '/admin/hotels' },
  { text: 'Rooms', icon: <BedIcon />, path: '/admin/rooms' },
  { text: 'Log out', icon: <LogoutIcon />, path: '/login' },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          boxSizing: 'border-box',
        },
      }}
      role="navigation"
      aria-label="Admin navigation"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={open ? 'space-between' : 'center'}
        px={1}
        py={1}
      >
        {open && <Typography variant="h6">Admin</Typography>}
        <IconButton
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider />

      <List>
        {links.map(({ text, icon, path }) => (
          <ListItemButton
            key={path}
            component={NavLink}
            to={path}
            selected={location.pathname === path}
            sx={{
              '&.active': {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >


            <ListItemIcon>{icon}</ListItemIcon>
            {open && <ListItemText primary={text} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
