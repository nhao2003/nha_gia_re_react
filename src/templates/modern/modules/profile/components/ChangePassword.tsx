import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    useMediaQuery,
    ThemeProvider,
    createTheme,
    Alert,
    AlertTitle,
    Snackbar,
    type SnackbarOrigin,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AuthService from '../../../../../services/auth.service';

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: '#026D4D',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#026D4D',
                    },
                },
            },
        },
    },
});



const ChangePassword: React.FC = () => {
    const [passwordState, setPasswordState] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordState({ ...passwordState, [name]: value });
        setValidationErrors({ ...validationErrors, [name]: '' }); // Clear validation errors on input change
    };

    const handleConfirm = () => {
        // Basic validation
        let isValid = true;

        if (passwordState.currentPassword.trim() === '') {
            setValidationErrors((prev) => ({ ...prev, currentPassword: 'Vui lòng nhập mật khẩu hiện tại' }));
            isValid = false;
        }
        if (passwordState.currentPassword.trim().length < 8) {
            setValidationErrors((prev) => ({ ...prev, currentPassword: 'Mật khẩu phải có ít nhất 8 ký tự' }));
            isValid = false;
        }

        if (passwordState.newPassword.trim() === '') {
            setValidationErrors((prev) => ({ ...prev, newPassword: 'Vui lòng nhập mật khẩu mới' }));
            isValid = false;
        }
        if (passwordState.newPassword.trim().length < 8) {
            setValidationErrors((prev) => ({ ...prev, newPassword: 'Mật khẩu phải có ít nhất 8 ký tự' }));
            isValid = false;
        }
        if (passwordState.newPassword.trim() !== passwordState.confirmPassword) {
            setValidationErrors((prev) => ({ ...prev, confirmPassword: 'Mật khẩu không khớp' }));
            isValid = false;
        }
        if (isValid) {
            // Add any additional validation logic here before calling onConfirm
            handleChangePassword();
        }
    };
    interface State extends SnackbarOrigin {
        isSuccessful: boolean;
        open: boolean;
        message: string;
    }
    const [state, setState] = React.useState<State>({
        isSuccessful: false,
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
    });
    function handleCloseSnackbar() {
        setState({ ...state, open: false });
    }
    const [isLoading, setIsLoading] = React.useState(false);
    function handleChangePassword() {
        setIsLoading(true);
        AuthService.getInstance().changePassword(passwordState.currentPassword, passwordState.newPassword).then((res) => {
            setState({ ...state, open: true, message: res.message, isSuccessful: res.status });
        }).catch((e) => {
            console.log(e);
            setState({ ...state, open: true, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau', isSuccessful: false });
        }).finally(() => {
            setIsLoading(false);
        });
    }
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px', // Added gap between components
                }}
            >
                {/* <Alert severity="success" sx={{
                 
                }}>
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert — <strong>check it out!</strong>
                </Alert> */}
                <Snackbar open={state.open} autoHideDuration={6000} anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
                    onClose={handleCloseSnackbar}
                >
                    <Alert severity={state.isSuccessful ? 'success' : 'error'}>
                        <AlertTitle>{state.isSuccessful ? 'Thành công' : 'Thất bại'}</AlertTitle>
                        {
                            state.message
                        }
                    </Alert>
                </Snackbar>
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
                            helperText={validationErrors.currentPassword}
                            error={Boolean(validationErrors.currentPassword)}
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
                            helperText={validationErrors.newPassword}
                            error={Boolean(validationErrors.newPassword)}
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
                            helperText={validationErrors.confirmPassword}
                            error={Boolean(validationErrors.confirmPassword)}
                        />
                    </CardContent>
                </Card>
                <LoadingButton
                    variant="contained"
                    sx={{ backgroundColor: '#026D4D', color: '#FFFFFF', width: '200px' }}
                    onClick={handleConfirm}
                    loading={isLoading}
                >
                    Xác nhận
                </LoadingButton>
            </Box>
        </ThemeProvider>
    );
};

export { ChangePassword };
