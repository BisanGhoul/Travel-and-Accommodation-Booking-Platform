import { type FC } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Stack,
    useTheme,
    Button,
} from '@mui/material';
import type { AvailableRoom } from '../../types/room';

// export interface FilterAmenityDto {
//     name: string;
//     description: string;
// }

// export interface RoomAvailabilityResultDto {
//     roomId: number;
//     roomNumber: number;
//     roomPhotoUrl?: string | "";
//     roomType?: string | "";
//     capacityOfAdults: number;
//     capacityOfChildren: number;
//     roomAmenities?: FilterAmenityDto[] | [];
//     price: number;
//     availability: boolean;
// }

interface RoomCardProps {
    room: AvailableRoom;
    onBook?: (roomId: number) => void;
}

const RoomCard: FC<RoomCardProps> = ({ room, onBook }) => {
    const theme = useTheme();

    return (
        <Card
            component="article"
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                minHeight: { sm: 200 },
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
            }}
            aria-label={`Room ${room.roomNumber}, ${room.roomType || 'Type not specified'}`}
        >
            {/* Room Image */}
            <Box
                sx={{
                    width: { xs: '100%', sm: 200 },
                    height: { xs: 180, sm: 'auto' },
                    flexShrink: 0,
                }}
            >
                <CardMedia
                    component="img"
                    image={room.roomPhotoUrl || '/placeholder.jpg'}
                    alt={`Room ${room.roomNumber}`}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        backgroundColor: theme.palette.grey[200],
                    }}
                />
            </Box>

            {/* Room Info */}
            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1,
                    p: 2,
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: 2,
                            flexWrap: 'wrap',
                            mb: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Room {room.roomNumber} – {room.roomType || 'Standard'}
                        </Typography>

                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            disabled={!room.availability}
                            onClick={() => onBook?.(room.roomId)}
                            sx={{ whiteSpace: 'nowrap' }}
                            aria-label={`Book Room ${room.roomNumber}`}
                        >
                            Book Room
                        </Button>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Adults: {room.capacityOfAdults} · Children: {room.capacityOfChildren}
                    </Typography>

                    {room.roomAmenities?.length > 0 && (
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                            sx={{ mb: 1 }}
                            role="list"
                            aria-label="Room amenities"
                        >
                            {room.roomAmenities.map((amenity) => (
                                <Chip
                                    key={amenity.name}
                                    label={amenity.name}
                                    title={amenity.description}
                                    size="small"
                                    sx={{
                                        fontSize: '0.75rem',
                                        backgroundColor: 'chip.main',
                                        color: 'chip.contrastText',
                                        '&:hover': {
                                            backgroundColor: 'chip.light',
                                        },
                                    }}
                                    role="listitem"
                                />
                            ))}
                        </Stack>
                    )}
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight={600}>
                        ${room.price.toFixed(2)}
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 0.5 }}
                        >
                            / night
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body2"
                        color={room.availability ? 'success.main' : 'error.main'}
                        aria-label={`Availability: ${room.availability ? 'Available' : 'Unavailable'}`}
                    >
                        {room.availability ? 'Available' : 'Unavailable'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RoomCard;
