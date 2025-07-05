import type { FC } from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import PriceRangeFilter from './filters/PriceRangeFilter';
import AmenitiesFilter from './filters/AmenitiesFilter';
import StarRatingInput from './filters/StarRatingInput';
import HotelTypeSelector from './filters/HotelTypeSelector';
import { useAmenities } from '../../hooks/useAmenities';

export type FilterState = {
  priceRange: [number, number];
  starRating: number;       // e.g. 3
  amenities: string[];        // e.g. ['WiFi','Pool']
  roomType: string[];           // e.g. ['Deluxe','Suite','Standard']
};

interface Props {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

const roomTypes = [
  "Ocean View Suite",
  "Deluxe Room",
  "Standard Room",
  "Beachfront Villa",
  "Skyline Suite",
  "Desert Suite",
  "Oceanfront Room",
  "Royal Suite",
  "Lakeview Room",
  "Garden Room",
];

const HotelFilterSidebar: FC<Props> = ({ filters, onChange }) => {
  const { data: amenities = [] } = useAmenities();

  return (
    <Paper sx={{ width: 330, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter by:
      </Typography>

      <Box mb={2}>
        <PriceRangeFilter
          value={filters.priceRange}
          min={0}
          max={1000}
          step={50}
          onChange={(range) =>
            onChange({ ...filters, priceRange: range as [number, number] })
          }
        />
      </Box>
      <Divider />

      <Box mb={2}>
        <AmenitiesFilter
          amenities={amenities}
          selected={filters.amenities}
          onChange={(sel) => onChange({ ...filters, amenities: sel })}
        />
      </Box>
      <Divider />

      <Box mb={2}>
        <StarRatingInput
          value={filters.starRating}
          onChange={(stars) => onChange({ ...filters, starRating: stars })}
          label="Stars"
        />
      </Box>
      <Divider />

      <Box mb={2}>
        <HotelTypeSelector
          value={filters.roomType}
          options={roomTypes}
          onChange={(t) => onChange({ ...filters, roomType: t })}
        />
      </Box>
    </Paper>
  );
};

export default HotelFilterSidebar;
