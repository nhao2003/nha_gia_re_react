import { Grid, Pagination, Stack } from '@mui/material'
import { HomeCardHorizontal } from './HomeCardHorizontal'

export const TabPanelSearch = () => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} width={'100%'}>
            {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={4} sm={8} md={12} key={index}>
                    <HomeCardHorizontal
                        image='https://mediawinwin.vn/cosy/admin/upload/images/%E1%BA%A2nh%20N%E1%BB%99i%20Th%E1%BA%A5t/%E1%BA%A3nh%20n%E1%BB%99i%20th%E1%BA%A5t%2014.jpg'
                        title='Căn hộ cao cấp sân vườn full nội thất'
                        price={'6 tỷ 599 triệu'}
                        loved={true}
                        address='Q5, TP. Hồ Chí Minh'
                        bedrooms={2}
                        bathrooms={2}
                        areas={234}
                        type={'personal'}
                        avatar={'https://i.pinimg.com/736x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg'}
                        name={'Nguyễn Van A'}
                        time={'Hôm nay'}
                    />
                </Grid>
            ))}
            <Stack sx={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px'
            }}>
                <Pagination count={10} size="large" />
            </Stack>

        </Grid>
    )
}