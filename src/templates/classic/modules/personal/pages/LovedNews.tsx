import { Box, Grid, Typography } from '@mui/material'
import { HomeCard } from '../../../components/HomeCard'

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
                fontWeight: 'bold',
                marginBottom: '10px'
            }}>Tin đã yêu thích</Typography>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <HomeCard
                            image='https://mediawinwin.vn/cosy/admin/upload/images/%E1%BA%A2nh%20N%E1%BB%99i%20Th%E1%BA%A5t/%E1%BA%A3nh%20n%E1%BB%99i%20th%E1%BA%A5t%2014.jpg'
                            title='Căn hộ cao cấp sân vườn full nội thất'
                            price={'6 tỷ 599 triệu'}
                            loved={true}
                            address='Q5, TP. Hồ Chí Minh'
                            bedrooms={2}
                            bathrooms={2}
                            areas={234}
                        />
                    </Grid>
                ))}
            </Grid>

        </Box>
    )

}