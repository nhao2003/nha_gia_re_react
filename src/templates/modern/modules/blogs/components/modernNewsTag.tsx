import { Stack, Typography } from "@mui/material"

interface PrivateProps {
    title: string
    index: number
}


export const ModernNewsTag = ({ title, index }: PrivateProps) => {
    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={1}
            sx={{
                paddingTop: '10px',
                paddingBottom: '2px',
                borderTop: '1px solid #ccc',
                marginTop: '10px'
            }}
        >

            <Stack
                sx={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '30px',
                    backgroundColor: '#8EA9D2'
                }}
                alignItems={'center'}
                justifyContent={'center'}
            >
                {index}

            </Stack>

            <Typography>{title}</Typography>

        </Stack>

    )
}
