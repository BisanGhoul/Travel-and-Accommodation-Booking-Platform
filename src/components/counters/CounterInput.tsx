import type { ChangeEvent } from 'react';

import {
    TextField,
    InputAdornment,
    IconButton,
    Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { type SxProps } from '@mui/system';

type CounterInputProps = {
    label: string;
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
    sx?: SxProps;
};

const CounterInput: React.FC<CounterInputProps> = ({
    label,
    value,
    setValue,
    min = 0,
    max = 10,
    sx = {},
}) => {
    const handleDecrease = () => setValue(Math.max(min, value - 1));
    const handleIncrease = () => setValue(Math.min(max, value + 1));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue)) {
            setValue(Math.min(max, Math.max(min, newValue)));
        } else if (e.target.value === '') {
            setValue(min);
        }
    };

    return (
        <Box sx={{ width: 150, ...sx }}>
            <TextField
                type="number"
                label={label}
                variant="outlined"
                fullWidth
                value={value}
                onChange={handleChange}
                InputProps={{ //slotProps api isnt stable yet for TextField especially for startAdornment so i had to use this, couldnt use min otherwise
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleDecrease} size="medium">
                                <RemoveIcon fontSize="medium" />
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleIncrease} size="medium">
                                <AddIcon fontSize="medium" />
                            </IconButton>
                        </InputAdornment>
                    ),
                    inputProps: {
                        min,
                        max,
                        inputMode: 'numeric',
                        style: {
                            fontSize: '1.25rem',
                            textAlign: 'center',
                            padding: '5px',
                        },
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        height: 52, //TODO
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '1.25rem',
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    '& input[type=number]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    '& input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                }}
            />

        </Box>
    );
};

export default CounterInput;
