import { Box, Grid, Typography } from '@mui/material'
import { HomeCard } from '../components/HomeCard'

export const LovedNews = () => {
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
            }}>Tin đã yêu thích</Typography>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <HomeCard />
                    </Grid>
                ))}
            </Grid>

        </Box>
    )

}