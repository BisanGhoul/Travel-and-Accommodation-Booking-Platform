import { type FC, useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    useTheme,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';

interface AdminSearchBarProps {
    onSearch: (term: string) => void;
    placeholder?: string;
}

const AdminSearchBar: FC<AdminSearchBarProps> = ({
    onSearch,
    placeholder = 'Search…',
}) => {
    const theme = useTheme();
    const [term, setTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTerm(value);
        onSearch(value);
    };

    const handleClear = () => {
        setTerm('');
        onSearch('');
    };

    return (
        <Box
            role="search"
            sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'flex-end',
            }}
        >
            <TextField
                fullWidth
                value={term}
                onChange={handleInputChange}
                placeholder={placeholder}
                size="small"
                variant="outlined"
                sx={{
                    width: { xs: '100%', sm: 300 },
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                    endAdornment: term ? (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={handleClear}
                                aria-label="Clear search"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
                inputProps={{ 'aria-label': 'Search records' }}
            />
        </Box>
    );
};

export default AdminSearchBar;
