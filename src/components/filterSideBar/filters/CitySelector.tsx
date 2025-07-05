import type { FC } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from '@mui/material';

interface CitySelectorProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
    cities?: string[];
    label?: string;
}

const CitySelector: FC<CitySelectorProps> = ({
    value,
    onChange,
    cities = ['New York', 'Bali', 'London', 'Paris', 'Tokyo', 'Dubai'],
    label = 'City',
}) => {

    return (
        <FormControl
            sx={{
                minWidth: 200,
                '& .MuiInputLabel-root': {
                    color: 'text.primary',
                    fontSize: '1rem',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.dark',
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: 'primary.dark',
                    },

                },
            }}
        >
            <InputLabel id="city-select-label">{label}</InputLabel>
            <Select
                labelId="city-select-label"
                id="city-select"
                value={value}
                onChange={onChange}
                label={label}
                inputProps={{
                    'aria-label': label,
                }}
                sx={{
                    fontSize: '1rem',
                }}
            >
                {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                        {city}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CitySelector;
