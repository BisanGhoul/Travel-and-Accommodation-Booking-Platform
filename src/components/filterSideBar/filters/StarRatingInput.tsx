import { Box, Typography, Rating } from '@mui/material';

type StarRatingProps = {
    value: number;
    onChange: (value: number) => void;
    label?: string;
};

export default function StarRating({ value, onChange, label = 'Star rating' }: StarRatingProps) {
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            aria-label={label}
            role="group"
        >
            <Typography variant='h6' component='h2' id="star-rating-label">
                {label}
            </Typography>
            <Rating
                name="custom-star-rating"
                aria-labelledby="star-rating-label"
                value={value}
                precision={1}
                size='large'
                onChange={(event, newValue) => {
                    if (newValue !== null) onChange(newValue);
                }}
                sx={{
                    color: 'secondary.main',
                    '& .MuiRating-iconEmpty': {
                        color: 'grey.400',
                    },
                }}
            />
        </Box>
    );
}
