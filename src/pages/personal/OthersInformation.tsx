import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import { Tile } from './components/Tile';

export function OthersInformation(): JSX.Element {
    return (
        <Stack direction={'row'} spacing={2} justifyContent='center' marginTop={2}>
            <Grid
                container
                sx={{
                    width: '20%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                    padding: 2,
                    height: 'fit-content'
                }}
            >
                <Grid item marginRight={2}>

                    <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />

                </Grid>

                <Grid>
                    <Typography variant='h6'>Đào Xuân Huy</Typography>
                    <Typography variant='body2' color={'gray'}>
                        Chưa có đánh giá
                    </Typography>
                    <Stack direction={'row'} >

                        <Tile
                            title={'Người theo dõi:'}
                            value={0}

                        />
                        <Box marginRight={2} />
                        <Tile
                            title={'Đang theo dõi:'}
                            value={0}
                        />

                    </Stack>


                    <Tile
                        title={'SĐT:'}
                        value={'Chưa cung cấp'}
                    />


                    <Tile
                        title={'Địa chỉ:'}
                        value={'Chưa cung cấp'}
                    />

                </Grid>
            </Grid>
        </Stack>
    )
}