import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './themes/theme.ts';
import { BookingProvider } from './context/BookingProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BookingProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <CssBaseline />
        </QueryClientProvider>
      </BookingProvider>
    </ThemeProvider>
  </StrictMode>
)
