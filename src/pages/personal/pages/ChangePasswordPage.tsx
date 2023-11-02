import { Box, Button, Stack, Typography } from '@mui/material'
import { TextFieldTitle } from '../components/TextFieldTitle'
import React from 'react';
import { ErrorMessage } from '../components/ErrorMessage';

export const ChangePasswordPage = () => {

    const [error, setError] = React.useState(false)

    return (
        <Box
            sx={{
                width: '50%',
                padding: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.default',
                height: 'fit-content'
            }}
        >

            <Typography variant='h6' sx={{
                fontWeight: 'bold'
            }}>Thông tin cá nhân</Typography>

            {error ? <ErrorMessage /> : null}

            <TextFieldTitle
                title={'Mật khẩu hiện tại'}
                placeholder={'Mật khẩu hiện tại'}
                require={true}
            />


            <TextFieldTitle
                title={'Mật khẩu mới'}
                placeholder={'Mật khẩu mới'}
                require={false}
            />


            <TextFieldTitle
                title={'Nhập lại mật khẩu mới'}
                placeholder={'Nhập lại mật khẩu mới'}
                require={false}

            />

            <Stack
                direction={'row'} sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Button
                    variant='contained'
                    onClick={() => { setError(!error) }}
                >
                    Cập nhật
                </Button>

            </Stack>


        </Box>
    )
}