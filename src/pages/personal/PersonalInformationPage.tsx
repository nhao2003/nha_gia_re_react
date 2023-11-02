import { ThemeProvider } from '@emotion/react'
import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
    createTheme,
    styled,
} from '@mui/material'
import { ComponentType } from 'react'
import { green, red } from '@mui/material/colors'
import * as React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import Icon from '@mui/material/Icon'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LockResetIcon from '@mui/icons-material/LockReset'
import LogoutIcon from '@mui/icons-material/Logout'
import { SelectedTab } from './components/SelectedTab'
import MUIDatePicker from './components/MUIDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const defaultTheme = createTheme()

export function PersonalInformationPage(): JSX.Element {
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
                        <Stack direction={'row'} marginTop={1}>
                            <Typography variant='body2' color={'gray'}>
                                Người theo dõi:{' '}
                            </Typography>
                            <Typography variant='body2' marginLeft={1}>
                                0
                            </Typography>
                            <Typography variant='body2' color={'gray'} marginLeft={2}>
                                Đang theo dõi:{' '}
                            </Typography>
                            <Typography variant='body2' marginLeft={1}>
                                0
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} marginTop={1}>
                            <Typography variant='body2' color={'gray'}>
                                SĐT:{' '}
                            </Typography>
                            <Typography variant='body2' marginLeft={1}>
                                Chưa cung cấp
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} marginTop={1}>
                            <Typography variant='body2' color={'gray'}>
                                Địa chỉ:{' '}
                            </Typography>
                            <Typography variant='body2' marginLeft={1}>
                                Chưa cung cấp
                            </Typography>
                        </Stack>
                    </Grid>

                    <Button
                        variant='contained'
                        startIcon={<ReplyOutlinedIcon />}
                        sx={{
                            marginTop: 1,
                            width: '100%',
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
                <Box sx={{
                    width: '50%', padding: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                }}>
                    <Typography variant='h6' sx={{
                        fontWeight: 'bold'
                    }}>Thông tin cá nhân</Typography>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2
                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Họ và tên</Typography>
                            <Typography variant='inherit' color={'red'}>(*)</Typography>
                        </Stack>

                        <FormControl sx={{
                            width: '80%',
                        }}>


                            <TextField
                                sx={{

                                    '& fieldset': {
                                        borderRadius: '10px'
                                    }
                                }}
                                placeholder='Họ và tên'
                            />

                        </FormControl>


                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2

                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Ngày sinh</Typography>

                        </Stack>


                        <DatePicker sx={{
                            width: '80%',
                            '& fieldset': {
                                borderRadius: '10px'
                            }
                        }}
                        />
                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginTop: 2

                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Giới tính</Typography>

                        </Stack>


                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group"  >
                            <FormControlLabel value="Male" control={<Radio />} label="Nam" />
                            <FormControlLabel value="Female" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2

                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Địa chỉ</Typography>

                        </Stack>

                        <Stack direction={'column'} sx={{
                            width: '80%'
                        }}>
                            <Stack direction={'row'} >
                                <Typography variant='inherit'>Tỉnh/Thành phố</Typography>
                                <Typography variant='inherit' color={'red'}>(*)</Typography>
                            </Stack>

                            <FormControl sx={{
                                marginTop: 2
                            }}>
                                <InputLabel id="demo-simple-select-helper-label">--Tỉnh/Thành phố--</InputLabel>
                                <Select
                                    sx={{
                                        '& fieldset': {
                                            borderRadius: '10px'
                                        }
                                    }}
                                />

                            </FormControl>

                            <Stack direction={'row'} sx={{
                                marginTop: 2
                            }}>
                                <Typography variant='inherit'>Quận/Huyện</Typography>
                                <Typography variant='inherit' color={'red'}>(*)</Typography>
                            </Stack>

                            <FormControl sx={{
                                marginTop: 2
                            }}>
                                <InputLabel id="demo-simple-select-helper-label">--Quận/Huyện--</InputLabel>
                                <Select
                                    sx={{
                                        '& fieldset': {
                                            borderRadius: '10px'
                                        }
                                    }}
                                />

                            </FormControl>

                            <Stack direction={'row'} sx={{
                                marginTop: 2
                            }}>
                                <Typography variant='inherit'>Phường/Xã</Typography>
                                <Typography variant='inherit' color={'red'}>(*)</Typography>
                            </Stack>

                            <FormControl sx={{
                                marginTop: 2
                            }}>
                                <InputLabel id="demo-simple-select-helper-label">--Phường/Xã--</InputLabel>
                                <Select
                                    sx={{
                                        '& fieldset': {
                                            borderRadius: '10px'
                                        }
                                    }}
                                />

                            </FormControl>


                            <Stack direction={'row'} sx={{
                                marginTop: 2
                            }}>
                                <Typography variant='inherit'>Địa chỉ cụ thể</Typography>
                            </Stack>

                            <FormControl sx={{
                                marginTop: 2
                            }}>
                                <InputLabel id="demo-simple-select-helper-label">--Số nhà, đường--</InputLabel>

                                <TextField
                                    sx={{
                                        '& fieldset': {
                                            borderRadius: '10px'
                                        }
                                    }}

                                />

                            </FormControl>

                        </Stack>

                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginTop: 2

                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Giới thiệu</Typography>

                        </Stack>

                        <FormControl sx={{
                            width: '80%',
                            marginTop: 2
                        }}>


                            <TextField
                                sx={{
                                    '& fieldset': {
                                        borderRadius: '10px'
                                    }
                                }}

                                multiline
                                maxRows={4}
                                id="standard-multiline-flexible"

                                placeholder="Vài dòng giới thiệu về bạn"
                            />

                        </FormControl>
                    </Stack>

                    <Typography variant='h6' sx={{
                        fontWeight: 'bold'
                    }}>Thông tin liên lạc</Typography>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2
                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Số điện thoại</Typography>
                            <Typography variant='inherit' color={'red'}>(*)</Typography>
                        </Stack>

                        <FormControl sx={{
                            width: '80%',
                        }}>


                            <TextField
                                sx={{

                                    '& fieldset': {
                                        borderRadius: '10px'
                                    }
                                }}

                            />

                        </FormControl>


                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2
                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Email</Typography>
                            <Typography variant='inherit' color={'red'}>(*)</Typography>
                        </Stack>

                        <FormControl sx={{
                            width: '80%',
                        }}>


                            <TextField
                                sx={{

                                    '& fieldset': {
                                        borderRadius: '10px'
                                    }
                                }}

                            />

                        </FormControl>


                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2
                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>CCCD/CMND</Typography>
                        </Stack>

                        <FormControl sx={{
                            width: '80%',
                        }}>


                            <TextField
                                sx={{

                                    '& fieldset': {
                                        borderRadius: '10px'
                                    }
                                }}

                            />

                        </FormControl>


                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2
                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Facebook</Typography>
                        </Stack>

                        <FormControl sx={{
                            width: '80%',
                        }}>


                            <TextField
                                sx={{

                                    '& fieldset': {
                                        borderRadius: '10px'
                                    }
                                }}

                            />

                        </FormControl>


                    </Stack>

                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2
                    }}>

                        <Stack direction={'row'} sx={{
                            width: '20%'
                        }}>
                            <Typography variant='inherit'>Zalo</Typography>
                        </Stack>

                        <FormControl sx={{
                            width: '80%',
                        }}>


                            <TextField
                                sx={{

                                    '& fieldset': {
                                        borderRadius: '10px'
                                    }
                                }}

                            />

                        </FormControl>


                    </Stack>
                </Box>
            </Stack>
        </LocalizationProvider>
    )
}
