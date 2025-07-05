import { useState, useMemo, useEffect, type FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  type SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Header from '../components/Header';
import DateRangePicker from '../components/datePickers/DateRangePicker';
import CounterInput from '../components/counters/CounterInput';
import CitySelector from '../components/filterSideBar/filters/CitySelector';
import HotelRowCard from '../components/cards/HotelRowCard';
import HotelFilterSidebar, {
  type FilterState,
} from '../components/filterSideBar/HotelFilterSidebar';

import { useCityOptions } from '../hooks/useCityOptions';
import { useAmenities } from '../hooks/useAmenities';
import { useHotelSearch } from '../hooks/useHotelSearch';

import { convertCityOptions } from '../utility/cityMapper';
import type { HotelSearchParams } from '../types/hotelSearchParams';
import HotelFooter from '../components/Footer';

const SearchAndFilterPage: FC = () => {
  const { data: cityOptionsRaw = [] } = useCityOptions();
  const cityOptions = convertCityOptions(cityOptionsRaw);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState<Dayjs | null>(() => {
    const raw = searchParams.get('checkIn') || '';
    const parsed = dayjs(raw);
    return parsed.isValid() ? parsed : dayjs();
  });
  const [checkOut, setCheckOut] = useState<Dayjs | null>(() => {
    const raw = searchParams.get('checkOut') || '';
    const parsed = dayjs(raw);
    return parsed.isValid() ? parsed : dayjs().add(1, 'day');
  });
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get('city') || ''
  );
  const safeSelectedCity = cityOptions.includes(selectedCity) ? selectedCity : '';

  const [adults, setAdults] = useState<number>(() =>
    parseInt(searchParams.get('adults') || '2', 10)
  );
  const [children, setChildren] = useState<number>(() =>
    parseInt(searchParams.get('children') || '0', 10)
  );
  const [rooms, setRooms] = useState<string>(
    searchParams.get('rooms') || '1'
  );

  const [executedSearchParams, setExecutedSearchParams] =
    useState<HotelSearchParams | null>(null);

  useEffect(() => {
    const initialParams: HotelSearchParams = {
      city: safeSelectedCity,
      checkInDate: checkIn?.format('YYYY-MM-DD') ?? '',
      checkOutDate: checkOut?.format('YYYY-MM-DD') ?? '',
      adults,
      children,
      numberOfRooms: parseInt(rooms, 10),
    };
    setExecutedSearchParams(initialParams);
  }, []);

  const handleSearchClick = () => {
    const nextParams: HotelSearchParams = {
      city: selectedCity,
      checkInDate: checkIn?.format('YYYY-MM-DD') ?? '',
      checkOutDate: checkOut?.format('YYYY-MM-DD') ?? '',
      adults,
      children,
      numberOfRooms: parseInt(rooms, 10),
    };
    setExecutedSearchParams(nextParams);
  };

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    starRating: 0,
    amenities: [],
    roomType: [],
  });

  const { data: hotels = [], isLoading: loadingHotels } = useHotelSearch(
    executedSearchParams!,
    !!executedSearchParams
  );

  const { data: amenities = [] } = useAmenities();

  const filteredHotels = useMemo(() => {
    return hotels.filter((h) => {
      const finalPrice = h.roomPrice * (1 - h.discount / 100);

      if (
        finalPrice < filters.priceRange[0] ||
        finalPrice > filters.priceRange[1]
      )
        return false;

      if (h.starRating < filters.starRating) return false;

      if (
        filters.amenities.length > 0 &&
        !filters.amenities.some((a) =>
          h.amenities.map((x) => x.name).includes(a)
        )
      )
        return false;

      if (
        filters.roomType.length > 0 &&
        !filters.roomType.includes(h.roomType)
      )
        return false;

      return true;
    });
  }, [hotels, filters]);

  return (
    <Box>
      <Header />

      {/* === Search Controls === */}
      <Box p={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Paper
            sx={{
              margin: '0 auto',
              padding: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              justifyContent: 'space-around',
              borderRadius: 1,
              boxShadow: 0,
              backgroundColor: 'background.paper',
              flexWrap: 'wrap',
            }}
          >
            <DateRangePicker
              space={3}
              checkIn={checkIn}
              checkOut={checkOut}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
            />

            <CitySelector
              value={safeSelectedCity}
              onChange={(e: SelectChangeEvent) =>
                setSelectedCity(e.target.value)
              }
              cities={cityOptions}
            />

            <CounterInput
              label="Adults"
              value={adults}
              setValue={setAdults}
              min={1}
              max={10}
            />
            <CounterInput
              label="Children"
              value={children}
              setValue={setChildren}
              min={0}
              max={10}
            />
            <CounterInput
              label="Rooms"
              value={parseInt(rooms)}
              setValue={(v) => setRooms(v.toString())}
              min={1}
              max={5}
            />

            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: 'secondaryButton.main',
                color: 'secondaryButton.contrastText',
                fontSize: '1rem',
                paddingY: 1,
                paddingX: 4,
                '&:hover': { backgroundColor: 'secondaryButton.light' },
              }}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Paper>
        </LocalizationProvider>
      </Box>

      {/* === Main Content & Sidebar === */}
      <Box display="flex" p={2}>
        {/* Sidebar */}
        <Box width="330px" mr={3}>
          <HotelFilterSidebar
            filters={filters}
            onChange={(next) => setFilters(next)}
          />
        </Box>

        {/* Results */}
        <Box flexGrow={1} display="flex" flexDirection="column" gap={2}>
          {loadingHotels ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={200}
            >
              <CircularProgress />
            </Box>
          ) : hotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelRowCard key={hotel.hotelId} {...hotel} loading={false} />
            ))
          ) : (
            <Typography>No rooms match your filters.</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 16 }}>
        <HotelFooter />
      </Box>
    </Box>
  );
};

export default SearchAndFilterPage;
