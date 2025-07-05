import type { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

type DateRangePickerProps = {
    space?: string | number;
    checkIn: Dayjs | null;
    checkOut: Dayjs | null;
    setCheckIn: (value: Dayjs | null) => void;
    setCheckOut: (value: Dayjs | null) => void;
};

const DateRangePicker: FC<DateRangePickerProps> = ({
    space = 3,
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
}) => {
    const handleCheckInChange = (newValue: Dayjs | null) => {
        setCheckIn(newValue);
        if (newValue && checkOut && newValue.isAfter(checkOut)) {
            setCheckOut(newValue.add(1, 'day'));
        }
    };

    const handleCheckOutChange = (newValue: Dayjs | null) => {
        if (checkIn && newValue && newValue.isBefore(checkIn.add(1, 'day'))) {
            setCheckOut(checkIn.add(1, 'day'));
        } else {
            setCheckOut(newValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: space }}>
                <DatePicker
                    label="Check-In"
                    value={checkIn}
                    onChange={handleCheckInChange}
                    disablePast
                    slotProps={{
                        textField: {
                            sx: {
                                width: 200,
                                '& .MuiInputBase-input': {
                                    fontSize: '1.5rem',
                                    // py: 5,              
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.25rem',
                                },
                            },
                        },
                        day: {
                            sx: {
                                fontSize: '1rem',
                            },
                        },
                        calendarHeader: {
                            sx: {
                                fontSize: '1.25rem',
                            },
                        },
                        popper: {
                            sx: {
                                '& .MuiPickersDay-root': {
                                    fontSize: '1.5rem',
                                    // width: 62,
                                    height: 62,
                                },
                                '& .MuiPickersCalendarHeader-label': {
                                    fontSize: '1.5rem',
                                },
                            }
                        }
                    }} />
                <DatePicker
                    label="Check-Out"
                    value={checkOut}
                    onChange={handleCheckOutChange}
                    disablePast
                    minDate={checkIn ? checkIn.add(1, 'day') : undefined}
                    slotProps={{
                        textField: {
                            sx: {
                                width: 200,
                                '& .MuiInputBase-input': {
                                    fontSize: '1.5rem',
                                    // py: 5,                
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.25rem',
                                },
                            },
                        },
                        day: {
                            sx: {
                                fontSize: '1rem',
                            },
                        },
                        calendarHeader: {
                            sx: {
                                fontSize: '1.25rem',
                            },
                        },
                        popper: {
                            sx: {
                                '& .MuiPickersDay-root': {
                                    fontSize: '1.5rem',
                                    // width: 62,
                                    height: 62,
                                },
                                '& .MuiPickersCalendarHeader-label': {
                                    fontSize: '1.5rem',
                                },
                            }
                        }
                    }} />
            </Box>
        </LocalizationProvider>
    );
};

export default DateRangePicker;
