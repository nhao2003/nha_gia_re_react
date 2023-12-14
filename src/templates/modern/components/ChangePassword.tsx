import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, useMediaQuery, useTheme } from '@mui/material';

interface ChangePasswordProps {
    onConfirm: (currentPassword: string, newPassword: string, confirmPassword: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onConfirm }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

    const handleConfirm = () => {
        // Add any validation logic here before calling onConfirm
        onConfirm(currentPassword, newPassword, confirmPassword);
    };

    return (
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
            <Card sx={{ width: isMobile ? '100%' : '50%', backgroundColor: '#F6F6F6', boxShadow: 'none' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Mật khẩu hiện tại
                    </Typography>
                    <TextField
                        style={{
                            backgroundColor: '#FFFFFF',
                            color: '#026D4D'
                        }}
                        label="Mật khẩu hiện tại"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={currentPassword}
                        onChange={(e) => { setCurrentPassword(e.target.value); }}
                    />
                </CardContent>
            </Card>
            <Card sx={{ width: isMobile ? '100%' : '50%', backgroundColor: '#F6F6F6' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Mật khẩu mới
                    </Typography>
                    <TextField
                        label="Mật khẩu mới"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); }}
                    />
                    <TextField
                        label="Xác nhận mật khẩu mới"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); }}
                    />
                </CardContent>
            </Card>
            <Button
                variant="contained"
                sx={{ backgroundColor: '#026D4D', color: '#FFFFFF', width: '200px' }} // Adjusted button width
                onClick={handleConfirm}
            >
                Xác nhận
            </Button>
        </Box>
    );
};

export { ChangePassword };
