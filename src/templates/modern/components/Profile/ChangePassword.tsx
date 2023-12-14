import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    useMediaQuery,
    useTheme,
    ThemeProvider,
    createTheme,
} from '@mui/material';
const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-input": {
                        color: "#026D4D",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#026D4D",
                    },
                },
            },
        },
    },
});
interface ChangePasswordProps {
    onConfirm: (currentPassword: string, newPassword: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onConfirm }) => {
    const [passwordState, setPasswordState] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordState({ ...passwordState, [name]: value });
    };

    const handleConfirm = () => {
        // Add any validation logic here before calling onConfirm
        onConfirm(passwordState.currentPassword, passwordState.newPassword);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh', // Adjusted height for centering on the screen
                    gap: '20px', // Added gap between components
                }}
            >
                <Card sx={{ width: isMobile ? '100%' : '50%', backgroundColor: '#F6F6F6', boxShadow: 'none', borderRadius: '12px' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Mật khẩu hiện tại
                        </Typography>
                        <TextField
                            sx={{ backgroundColor: '#FFFFFF', color: '#026D4D' }}
                            label="Mật khẩu hiện tại"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={passwordState.currentPassword}
                            onChange={handlePasswordChange}
                            name="currentPassword"
                        />
                    </CardContent>
                </Card>
                <Card sx={{ width: isMobile ? '100%' : '50%', backgroundColor: '#F6F6F6', boxShadow: 'none', borderRadius: '12px' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Mật khẩu mới
                        </Typography>
                        <TextField
                            sx={{ backgroundColor: '#FFFFFF', color: '#026D4D' }}
                            label="Mật khẩu mới"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={passwordState.newPassword}
                            onChange={handlePasswordChange}
                            name="newPassword"
                        />
                        <TextField
                            sx={{ backgroundColor: '#FFFFFF', color: '#026D4D' }}
                            label="Xác nhận mật khẩu mới"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={passwordState.confirmPassword}
                            onChange={handlePasswordChange}
                            name="confirmPassword"
                        />
                    </CardContent>
                </Card>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#026D4D', color: '#FFFFFF', width: '200px' }}
                    onClick={handleConfirm}
                >
                    Xác nhận
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export { ChangePassword };
