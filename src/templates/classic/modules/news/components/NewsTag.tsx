import { Stack, Typography } from "@mui/material"

interface PrivateProps {
    title: string
   
}


export const NewsTag = ({ title }: PrivateProps) => {


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

          

            <Typography 
                sx={{
                    fontWeight: 600
                }}
            >{title}</Typography>

        </Stack>

    )
}
