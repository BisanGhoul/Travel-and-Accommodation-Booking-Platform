import { Card, CardMedia, CardContent, Typography, Box, Skeleton } from '@mui/material';
import type { City } from '../../types/city';

interface CityCardProps {
    city?: City;
    loading?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({ city, loading = false }) => {
    if (loading || !city) {
        return (
            <Card sx={{ width: 280, height: 260, borderRadius: 2, boxShadow: 3 }}>
                <Skeleton variant="rectangular" height={140} />
                <CardContent>
                    <Skeleton width="80%" height={24} />
                    <Skeleton width="50%" height={20} />
                    <Skeleton width="90%" height={16} />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            sx={{
                width: 300,
                height: 280,
                borderRadius: 1,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={city.thumbnailUrl}
                alt={city.cityName}
                sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, objectFit: 'cover' }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h1" fontWeight="bold">
                        {city.cityName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {city.countryName}
                    </Typography>
                </Box>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    mt={1}
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {city.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CityCard;
