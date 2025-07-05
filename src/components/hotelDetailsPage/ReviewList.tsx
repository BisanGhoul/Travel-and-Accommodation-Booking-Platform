import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import ReviewCard from '../cards/ReviewCard';
import type { HotelReview } from '../../types/review';

interface ReviewListProps {
    reviews?: HotelReview[];
    loading: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading }) => {
    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Box key={review.reviewId}>
                        <ReviewCard review={review} />
                        {index !== reviews.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                ))
            ) : (
                <Typography>No reviews yet.</Typography>
            )}
        </Box>
    );
};

export default ReviewList;
