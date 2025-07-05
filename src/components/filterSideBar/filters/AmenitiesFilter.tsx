import { type FC, useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Tooltip,
    Link,
} from '@mui/material';

type Amenity = {
    name: string;
    description?: string;
};

type Props = {
    amenities: Amenity[];
    selected: string[];
    onChange: (updated: string[]) => void;
};

const AmenitiesFilter: FC<Props> = ({ amenities, selected, onChange }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleAmenity = (name: string) => {
        const updated = selected.includes(name)
            ? selected.filter(item => item !== name)
            : [...selected, name];
        onChange(updated);
    };

    const amenitiesToShow = showAll ? amenities : amenities.slice(0, 5);

    return (
        <Box>
            <Typography variant="h6" component="h2" gutterBottom>
                Amenities
            </Typography>
            <FormGroup>
                {amenitiesToShow.map(({ name, description }) => (
                    <FormControlLabel
                        key={name}
                        control={
                            <Checkbox
                                sx={{
                                    color: 'slider.main',
                                    '&.Mui-checked': {
                                        color: 'slider.main',
                                    },
                                }}
                                checked={selected.includes(name)}
                                onChange={() => toggleAmenity(name)}
                            />
                        }
                        label={
                            <Tooltip
                                title={description || ''}
                                followCursor
                                enterTouchDelay={0}
                                disableFocusListener
                                disableTouchListener
                            >
                                <span>{name}</span>
                            </Tooltip>
                        }
                    />
                ))}
            </FormGroup>
            {amenities.length > 5 && (
                <Box mt={1}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => setShowAll(!showAll)}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'none',
                                opacity: 0.8,
                            },
                        }}
                    >
                        {showAll ? 'Show less' : 'Show more...'}
                    </Link>

                </Box>
            )}
        </Box>
    );
};

export default AmenitiesFilter;
