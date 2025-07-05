import { type FC } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Fade,
  Stack,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface DescriptionSectionProps {
  title?: string;
  description: string;
  latitude: number;
  longitude: number;
}

const DescriptionSection: FC<DescriptionSectionProps> = ({
  title = 'Description',
  description,
  latitude,
  longitude,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <Fade in timeout={500}>
      <Box
        component="section"
        role="region"
        aria-labelledby="description-heading"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          width: '100%',
          mt: 4,
          p: { xs: 2, md: 3 },
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        {/* Left: Text Content */}
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <LocationOnIcon color="secondary" />
            <Typography
              id="description-heading"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              {title}
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.75,
              mb: 2,
            }}
          >
            {description}
          </Typography>

          <Divider sx={{ my: 1, display: { xs: 'block', md: 'none' } }} />
        </Box>

        {/* Right: Map */}
        <Box
          sx={{
            flex: 1,
            height: isMobile ? 200 : 250,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 2,
          }}
        >
          <iframe
            title="Map showing the hotel location"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label={`Location map centered at coordinates ${latitude}, ${longitude}`}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default DescriptionSection;
