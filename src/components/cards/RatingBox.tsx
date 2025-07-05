
import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface RatingBoxProps {
    color: string;
    rating: number;
    size?: number | string;
}

const RatingBox: FC<RatingBoxProps> = ({ color, rating, size = '1rem' }) => {
    const clampedRating = Math.min(Math.max(rating, 0), 5);

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: color,
                borderRadius: 1,
                p: 0.5,
            }}
        >
            <StarIcon
                sx={{
                    color: 'white',
                    fontSize: size,
                    mr: 0.5,
                }}
            />
            <Typography
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: size,
                    userSelect: 'none',
                }}
            >
                {clampedRating.toFixed(1)}
            </Typography>
        </Box>
    );
};

export default RatingBox;
