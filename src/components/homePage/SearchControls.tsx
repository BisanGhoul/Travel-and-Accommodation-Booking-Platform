import type { Dispatch, SetStateAction } from 'react';

import { Button, type SelectChangeEvent } from '@mui/material';
import { Dayjs } from 'dayjs';

import DateRangePicker from '../datePickers/DateRangePicker';
import CounterInput from '../counters/CounterInput';
import CitySelector from '../filterSideBar/filters/CitySelector';
import { useCityOptions } from '../../hooks/useCityOptions';
import type { CityOption } from '../../types/cityOption';

interface Props {
    checkIn: Dayjs | null;
    checkOut: Dayjs | null;
    setCheckIn: (date: Dayjs | null) => void;
    setCheckOut: (date: Dayjs | null) => void;
    adults: number;
    setAdults: Dispatch<SetStateAction<number>>;
    children: number;
    setChildren: Dispatch<SetStateAction<number>>;
    rooms: string;
    setRooms: Dispatch<SetStateAction<string>>;
    city: string;
    setCity: Dispatch<SetStateAction<string>>;
    onSearch?: () => void;
}

const SearchControls = ({
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    adults,
    setAdults,
    children,
    setChildren,
    rooms,
    setRooms,
    city,
    setCity,
    onSearch,
}: Props) => {
    const { data: cityOptions = [], isLoading: isLoadingFeatured } = useCityOptions();
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch();
        }
    };
    const convertCityOptions = (options: CityOption[]) => {
        return options.map((option) => option.name);
    }
    const onCityChange = (event: SelectChangeEvent<string>) => {
        setCity(event.target.value);
    }

    return (
        <form
            onSubmit={handleSearch}
            role="group"
            aria-label="Search controls for accommodation booking"
            style={{
                display: 'flex',
                gap: 24,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
            }}
        >
            <DateRangePicker
                checkIn={checkIn}
                checkOut={checkOut}
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                aria-label="Select check-in and check-out dates"
            />
            <CitySelector
                value={city}
                onChange={onCityChange}
                cities={convertCityOptions(cityOptions)}
            />
            <CounterInput
                label="Adults"
                value={adults}
                setValue={setAdults}
                min={1}
                max={10}
                aria-label="Number of adults"
            />
            <CounterInput
                label="Children"
                value={children}
                setValue={setChildren}
                min={0}
                max={10}
                aria-label="Number of children"
            />
            <CounterInput
                label="Rooms"
                value={parseInt(rooms)}
                setValue={(val) => setRooms(val.toString())}
                min={1}
                max={5}
                aria-label="Number of rooms"
            />

            <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                    backgroundColor: 'secondaryButton.main',
                    color: 'secondaryButton.contrastText',
                    fontSize: '1.25rem',
                    paddingY: 1,
                    paddingX: 4,
                    '&:hover': { backgroundColor: 'secondaryButton.light' },
                    '&:focus-visible': {
                        outline: (theme) => `3px solid ${theme.palette.secondary.light}`,
                        outlineOffset: '2px',
                    },
                }}
                aria-label="Search accommodations"
            >
                Search
            </Button>
        </form>
    );
};

export default SearchControls;
