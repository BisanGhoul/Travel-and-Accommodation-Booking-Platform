import { Box, Typography } from '@mui/material';
import type { HotelReview } from '../../types/review';

interface ReviewCardProps {
    review: HotelReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <Box>
            <Typography variant="subtitle2" fontWeight="bold">
                {review.customerName} - {review.rating.toFixed(1)} ⭐
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
                {review.description}
            </Typography>
        </Box>
    );
};

export default ReviewCard;
