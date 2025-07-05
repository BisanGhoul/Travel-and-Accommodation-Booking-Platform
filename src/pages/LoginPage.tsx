import { type FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import LoginForm from '../components/form/LoginForm';
import loginImg from '../assets/imgs/login-img.jpg'

const LoginPage: FC = () => {
    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="hsl(210, 20%, 96%)"
            p={2}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: '100%',
                    maxWidth: 950,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Left: image */}
                <Box
                    flex={1}
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        backgroundImage: `url(${loginImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: 400,
                    }}
                />

                {/* Right: form */}
                <Box
                    flex={1}
                    p={{ xs: 2, sm: 4, md: 6 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Log In
                    </Typography>
                    <LoginForm />
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
