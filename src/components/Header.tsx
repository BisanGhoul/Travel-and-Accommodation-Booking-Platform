import React, { useState, type FC } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  styled
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, NavLink as OgLink } from 'react-router-dom';
import Logo from "../assets/imgs/InnsightLogoLight.png"
const navLinks = [
  { label: 'Home', to: '/home' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const NavLink = styled(OgLink)({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: 'primary.main',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: 'white',
  },
});

const Header: FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleLogin = () => {
    navigate('/login');
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'secondaryButton.main' }}>
        {/* Left side: Logo*/}
        <Box>
          <img src={Logo} alt="Innsight Logo" style={{ height: 80, width: 80 }} />
        </Box>

        {/* Right side: Nav links + profile icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              color="inherit"
              sx={{
                textTransform: 'none',
                fontSize: 20,
                fontWeight: 500,
                color: 'secondaryHeader.contrastText',
                '&:hover': { color: 'rgb(223, 223, 223)' },
              }}
            >
              {label}
            </NavLink>
          ))}

          {/* Profile Menu */}
          <IconButton edge="end" onClick={handleMenuOpen} size="medium">
            <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {token ? (
              <>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
