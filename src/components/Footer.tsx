import type { FC } from 'react';

import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  LocationOn,
  Email,
  Phone,
} from '@mui/icons-material';

const HotelFooter: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        color: 'white',
        pt: 6,
        pb: 3,
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-felt.png")',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'hsla(150, 93.30%, 5.90%, 0.88)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          useFlexGap
          flexWrap="wrap"
        >
          {/* Logo and Description */}
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography variant="h6" gutterBottom>
              Innsight Accomodation
            </Typography>
            <Typography variant="body2" color="grey.400">
              Luxury redefined. Nestled in elegance, designed for comfort and unforgettable stays.
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ flex: 1, minWidth: 160 }}>
            <Typography variant="h6" gutterBottom>
              Explore
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" color="inherit" underline="hover">About Us</Link>
              <Link href="/search" color="inherit" underline="hover">Search</Link>
              <Link href="/home" color="inherit" underline="hover">Home</Link>
              <Link href="/contact" color="inherit" underline="hover">Contact</Link>
            </Stack>
          </Box>

          {/* Contact Info */}
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">Ramllah, West Bank</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">innsight@thebest.com</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">+972 53 6666 9876</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Social Media */}
          <Box sx={{ flex: 1, minWidth: 160 }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Facebook"
                href="https://facebook.com"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://instagram.com"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                href="https://twitter.com"
                color="inherit"
              >
                <Twitter />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: 'grey.600' }} />

        <Typography variant="body2" color="grey.500" align="center">
          © {new Date().getFullYear()} Innsight Accomodation. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default HotelFooter;
