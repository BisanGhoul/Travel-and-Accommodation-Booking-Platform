import { type FC } from 'react';
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import type { HotelAmenity } from '../../types/hotelDetails';

interface ServicesSectionProps {
    title?: string;
    services: HotelAmenity[];
}

const ServicesSection: FC<ServicesSectionProps> = ({
    title = 'Our Services',
    services,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            component="section"
            aria-labelledby="services-heading"
            sx={{ my: 6 }}
        >
            <Typography
                id="services-heading"
                variant="h6"
                component="h2"
                sx={{ fontWeight: 600, mb: 2 }}
            >
                {title}
            </Typography>

            <Box
                component="ul"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: 2,
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                }}
            >
                {services.map((service, index) => (
                    <Box
                        component="li"
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1.5,
                        }}
                    >
                        <Box
                            component="img"
                            src={service.iconUrl}
                            alt={service.name}
                            sx={{
                                width: 24,
                                height: 24,
                                objectFit: 'contain',
                                flexShrink: 0,
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: 'text.secondary' }}
                        >
                            {service.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ServicesSection;
