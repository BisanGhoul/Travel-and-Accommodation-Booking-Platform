import { type FC, useState } from 'react';
import { Slider, styled, Typography } from '@mui/material';
import theme from '../../../themes/theme';

type RangeFilterProps = {
    value: number[];
    onChange: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
};

const PriceRangeFilter: FC<RangeFilterProps> = ({ value = [100, 500], onChange, min = 100, max = 10000, step = 50 }) => {

    const [internalValue, setInternalValue] = useState<number[]>(value);



    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) { // should be a range, meaning numbers[] not number 
            // onChange(newValue);
            setInternalValue(newValue);
            onChange?.(newValue);
        }
    };

    return (
        <>
            <Typography id="price-range-label" variant='h6' component='h2' gutterBottom>Price ({internalValue[0]} - {internalValue[1]})</Typography>
            <PrettoSlider
                aria-labelledby="price-range-label"
                getAriaLabel={(index) =>
                    `${index === 0 ? 'Minimum' : 'Maximum'} price ${value[index]}`}
                valueLabelFormat={(val) => `$${val}`}
                value={internalValue}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
                track="normal"
                valueLabelDisplay="auto"
            // sx={{
            //     color: theme.palette.slider?.main,  // TODO
            //     '& .MuiSlider-thumb': {
            //         borderColor: theme.palette.slider?.contrastText || 'white',
            //     },
            //     '& .MuiSlider-rail': {
            //         opacity: 0.5,
            //     },
            // }}
            />
        </>
    );
};
const PrettoSlider = styled(Slider)({
    color: theme.palette.slider?.main,
    height: 4,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        backgroundColor: theme.palette.slider?.contrastText || 'white',
        border: `2px solid ${theme.palette.slider?.main || "black"}`,
        // borderColor: theme.palette.slider?.contrastText || 'white',

        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0px 0px 0px 2px rgba(30, 159, 82, 0.24)',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: theme.palette.slider?.light || 'green',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});
export default PriceRangeFilter;
