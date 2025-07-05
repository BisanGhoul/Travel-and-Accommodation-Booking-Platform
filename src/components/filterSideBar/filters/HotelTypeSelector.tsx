import { type FC } from 'react';
import {
    FormControl,
    MenuItem,
    Select,
    Typography,
    Box,
    Chip,
    type SelectChangeEvent,
} from '@mui/material';

interface HotelTypeSelectorProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: string[];
}

const HotelTypeSelector: FC<HotelTypeSelectorProps> = ({
    value,
    onChange,
    options,
}) => {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            aria-label="Hotel Type Selector"
            role="group"
        >
            <Typography variant="h6" component="h2" id="hotel-type-label">
                Type
            </Typography>
            <FormControl fullWidth variant="outlined">
                <Select
                    name="hotelType"
                    multiple
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    variant="outlined"
                    aria-labelledby="hotel-type-label"
                    renderValue={(selected) =>
                        selected.length === 0 ? (
                            <span style={{ opacity: 0.6 }}>Select hotel types</span>
                        ) : (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((val) => (
                                    <Chip
                                        key={val}
                                        label={val}
                                        sx={{ backgroundColor: 'secondaryButton.main', color: 'secondaryButton.contrastText' }}
                                    />
                                ))}
                            </Box>
                        )
                    }
                    sx={{
                        color: 'secondaryButton.main',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            borderBottom: '1px solid',
                            borderBottomColor: 'secondaryButton.main',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondaryButton.light',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondaryButton.light',
                        },
                        '& .MuiSelect-icon': {
                            color: 'secondaryButton.main',
                        },
                    }}
                >
                    {options.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default HotelTypeSelector;
