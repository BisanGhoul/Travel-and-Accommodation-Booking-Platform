import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: 'hsl(168, 85.00%, 28.80%)',      
            main: 'hsl(168, 85.00%, 21.00%)',        
            dark: 'hsl(168, 90%, 14%)',       
            contrastText: 'hsl(0, 0%, 100%)',  // White
        },
        secondary: {
            main: 'hsl(39, 50%, 61%)',
            contrastText: 'hsl(0, 0%, 100%)',
            light: 'hsl(39, 50%, 70%)',
        },
        primaryButton: {
            main: 'hsl(0, 0%, 100%)',
            contrastText: 'hsl(168, 90%, 14%)',
            dark: 'hsl(0, 0.00%, 90.20%)',
        },
        secondaryButton: {
            main: 'hsl(168, 90%, 14%)',
            contrastText: 'hsl(0, 0%, 100%)',
            light: 'hsl(168, 85.00%, 21.00%)',
        },
        secondaryHeader: {
            main: 'hsl(168, 90%, 14%)',
            contrastText: 'hsl(0, 0%, 100%)',
            light: 'hsl(168, 85.00%, 21.00%)',
        },
        slider: {
            main: 'hsl(168, 85.00%, 21.00%)',
            light: 'hsl(168, 85.00%, 28.80%)',
            contrastText: 'hsl(0, 0%, 100%)',
        },
        chip: {
            main: 'hsl(168, 85.00%, 21.00%)',
            light: 'hsl(168, 85.00%, 28.80%)',
            contrastText: 'hsl(0, 0%, 100%)',
        }
    },
    typography: {
        fontFamily: `'Playfair Display', 'serif', 'Inter', 'Roboto', 'Arial', sans-serif`, // Inter is primary, Roboto fallback, etc.
        gridCardTitle: {
            fontSize: '1.5rem',
            fontWeight: 500,
            fontStyle: 'italic',
            fontFamily: "'Playfair Display', serif",
        },
        gridCardPrice: {
            fontFamily: `'Playfair Display', 'serif', 'Inter', 'Roboto', 'Arial', sans-serif`,
            fontSize: '1.625rem',
            fontWeight: 600,
            color: 'hsl(39, 50%, 61%)', // Same as secondary.main
        },
    },

});

export default theme;
