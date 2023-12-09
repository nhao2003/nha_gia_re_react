import { Stack, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ErrorMessage = () => {
    return (

        <Stack direction={'row'}
            sx={{
                border: 'solid #FA0000',
                backgroundColor: '#FBBCBC',
                borderRadius: '10px',
                padding: '10px',
                marginTop: '10px'
            }}
        >
            <ErrorOutlineIcon sx={{
                color: '#FA0000',
                marginRight: '10px'
            }} />
            <Typography>Mật khẩu không chính xác. Vui lòng thử lại</Typography>
        </Stack>

    )
}