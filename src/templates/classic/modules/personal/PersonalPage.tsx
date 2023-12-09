import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Grid,
    List,
    Stack,
    Typography,
    createTheme,
    styled,
} from '@mui/material'
import * as React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LockResetIcon from '@mui/icons-material/LockReset'
import LogoutIcon from '@mui/icons-material/Logout'
import { SelectedTab } from './components/SelectedTab'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Tile } from './components/Tile'
import { PersonalInformationPage } from './pages/PersonalInformationPage'
import { ChangePasswordPage } from './pages/ChangePasswordPage'
import CUSTOM_COLOR from '../../constants/colors'
import { LovedNews } from './pages/LovedNews'

const defaultTheme = createTheme()

export function PersonalPage(): JSX.Element {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleListItemClick = (index: number) => (event: React.MouseEvent<Element, MouseEvent>) => {
        setSelectedIndex(index)
    }

    const RoundButton = styled(Container)({
        borderRadius: '300%',
        display: 'inline-block',
        padding: 10,
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>


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
                        <Badge
                            overlap='circular'
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <RoundButton color='primary'>
                                    <CreateOutlinedIcon></CreateOutlinedIcon>
                                </RoundButton>
                            }
                        >
                            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                        </Badge>
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

                    <Button
                        variant='contained'
                        startIcon={<ReplyOutlinedIcon />}

                        sx={{
                            marginTop: 1,
                            width: '100%',
                            backgroundColor: CUSTOM_COLOR.primary
                        }}
                    >
                        Chia sẻ trang của bạn
                    </Button>

                    <List sx={{ width: '100%', marginTop: 1 }} >


                        <SelectedTab
                            index={0}
                            selected={selectedIndex === 0}
                            setSelected={handleListItemClick(0)}
                            icon={AccountCircleIcon}
                            title={'Thông tin cá nhân'}
                        />

                        <SelectedTab
                            index={1}
                            selected={selectedIndex === 1}
                            setSelected={handleListItemClick(1)}
                            icon={FavoriteBorderIcon}
                            title={'Bất động sản yêu thích'}
                        />

                        <SelectedTab
                            index={2}
                            selected={selectedIndex === 2}
                            setSelected={handleListItemClick(2)}
                            icon={LockResetIcon}
                            title={'Thay đổi mật khẩu'}
                        />

                        <SelectedTab
                            index={3}
                            selected={selectedIndex === 3}
                            setSelected={handleListItemClick(3)}
                            icon={LogoutIcon}
                            title={'Đăng xuất'}
                        />



                    </List>
                </Grid>
                {selectedIndex === 0 ? <PersonalInformationPage /> : selectedIndex === 1 ? <LovedNews /> : selectedIndex === 2 ? <ChangePasswordPage /> : null}
            </Stack>
        </LocalizationProvider >
    )
}
