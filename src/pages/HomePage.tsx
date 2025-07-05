
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate, NavLink as OgLink } from 'react-router-dom';

import {
    AppBar, Toolbar, Container, Box, Typography, Button, Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import HotelHero from '../assets/imgs/hotel-room-hero.jpg';
import SearchControls from '../components/homePage/SearchControls';
import HorizontalHotelList from '../components/homePage/HorizontalHotelList';
import Logo from '../assets/imgs/InnsightLogoLight.png';

import { useCityOptions } from '../hooks/useCityOptions';
import { convertCityOptions } from '../utility/cityMapper';
import HorizontalCityList from '../components/homePage/HorizontalDestinationsList';
import HotelFooter from '../components/Footer';


const HeroContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '90vh',
    backgroundImage: `url(${HotelHero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
    },
}));

const HeroContent = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
}));

const TransparentAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}));

const NavLink = styled(OgLink)({
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'white',
    textDecoration: 'none',
    '&:hover': { color: 'rgb(223, 223, 223)' },
    '&:active': { color: 'rgb(200, 200, 200)' },
    '&:focus': { color: 'rgb(200, 200, 200)' },

});



const HomePage = () => {
    const { data: cityOptionsRaw = [], isLoading: loadingCities } = useCityOptions();

    const cityOptions = convertCityOptions(cityOptionsRaw);
    const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
    const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(1, 'day'));
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState('1');
    const [city, setCity] = useState<string>('');
    const safeCity = cityOptions.includes(city) ? city : '';

    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams({
            checkIn: checkIn?.toISOString() || '',
            checkOut: checkOut?.toISOString() || '',
            adults: adults.toString(),
            children: children.toString(),
            rooms,
            city,
        });
        navigate(`/search?${params.toString()}`);
    };

    return (
        <Box bgcolor="hsla(210, 20.00%, 96.10%, 0.42)"
        >
            {/* Header */}
            <TransparentAppBar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    {/* Logo */}
                    <Box>
                        <img src={Logo} alt="Innsight Logo" style={{ height: 90, width: 90 }} />
                    </Box>
                    {/* Links and Button */}
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                        <NavLink to="/search">Search</NavLink>
                        <NavLink to="#">Contact Us</NavLink>
                        <NavLink to="#">About Us</NavLink>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: 'primaryButton.main',
                                color: 'primaryButton.contrastText',
                                '&:hover': { backgroundColor: 'primaryButton.dark' },
                            }}
                        >
                            {localStorage.getItem("userType") ? "Log out" : "Sign In"}
                        </Button>

                    </Box>
                </Toolbar>
            </TransparentAppBar>

            {/* Wrap hero and search controls in a relative container */}
            <Box sx={{ position: 'relative' }}>
                {/* hero section */}
                <HeroContainer>
                    <HeroContent maxWidth="md">
                        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
                            Stay Where Comfort Meets Simplicity
                        </Typography>
                        <Typography variant="h6">
                            Private stays and peaceful spaces always ready when you are.
                        </Typography>
                    </HeroContent>
                </HeroContainer>

                {/* Search Controls */}
                <Paper
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: 0,
                        padding: 2,
                        paddingY: 3,
                        transform: 'translate(-50%, 50%)',
                        maxWidth: 1480,
                        width: '90%',
                        borderRadius: 1,
                        boxShadow: 3,
                        zIndex: 10,
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <SearchControls
                            checkIn={checkIn}
                            checkOut={checkOut}
                            setCheckIn={setCheckIn}
                            setCheckOut={setCheckOut}
                            adults={adults}
                            setAdults={setAdults}
                            children={children}
                            setChildren={setChildren}
                            rooms={rooms}
                            setRooms={setRooms}
                            city={safeCity}
                            setCity={setCity}
                            onSearch={handleSearch}
                        />
                    </LocalizationProvider>
                </Paper>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ mt: { xs: 10, md: 15 }, mb: 10, px: { xs: 2, sm: 4, md: 8 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 14 } }}>
                    <Box>
                        <Typography variant="h4" component="h1" px={{ xs: 1, sm: 2 }} mb={3} gutterBottom>
                            Featured Deals
                        </Typography>
                        <HorizontalHotelList type="featured" />
                    </Box>
                    <Box>
                        <Typography variant="h4" component="h1" px={{ xs: 1, sm: 2 }} mb={3} gutterBottom>
                            Recently Visited
                        </Typography>
                        <HorizontalHotelList type="recent" />
                    </Box>
                    <Box>
                        <Typography variant="h4" component="h1" px={{ xs: 1, sm: 2 }} mb={3} gutterBottom>
                            Trending Destinations
                        </Typography>
                        <HorizontalCityList />
                    </Box>
                </Box>
            </Container>

            <Box sx={{ mt: 16 }}>
                <HotelFooter />
            </Box>
        </Box>
    );
};

export default HomePage;
