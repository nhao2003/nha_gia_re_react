// Header.tsx
import React from 'react'
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material'
import { Link, } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import CUSTOM_COLOR from '../constants/colors'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Header: React.FC = () => {
  return (
    // <AppBar position='static'>
    //   <Toolbar>
    //     <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
    //       Dashboard
    //     </Typography>
    //     <Button color='inherit' component={Link} to='/personal_information'>Thông tin tài khoản</Button>
    //     <Button color='inherit' component={Link} to='/welcome'>
    //       Welcome
    //     </Button>
    //     <Button color='inherit' component={Link} to='/login'>
    //       Login
    //     </Button>
    //   </Toolbar>
    // </AppBar>

    <Stack
      direction={'row'}
      justifyContent={'space-between'}


      sx={{
        backgroundColor: CUSTOM_COLOR.orrellBrown,
        width: '100%',
        height: '90px'
      }}
    >
      <Stack direction={'row'}
        spacing={2}
        marginLeft={2}
      >

        <img
          src={logo}
          style={{
            width: '135px',
            height: '90px'
          }}
        />

        <Link to={'/search'}>
          <Button variant="text"
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >Mua bán</Button>
        </Link>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >Cho thuê</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >Tin tức</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >Hỏi đáp</Button>

      </Stack>

      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        marginRight={2}
      >

        <NotificationsNoneIcon
          sx={{
            width: '30px',
            height: '30px'
          }}
        />
        <ForumOutlinedIcon
          sx={{
            width: '30px',
            height: '30px'
          }}
        />

        <Button variant="contained"
          style={{
            backgroundColor: CUSTOM_COLOR.starkWhite
          }}
          sx={{
            width: '180px',
            height: 'fit-content',
            // backgroundColor: CUSTOM_COLOR.starkWhite,
            color: CUSTOM_COLOR.black,
            fontSize: '16px',
            borderRadius: '10px',
          }}
          startIcon={<NewspaperIcon />}
        >Quản lý tin</Button>

        <Button variant="contained"
          style={{
            backgroundColor: CUSTOM_COLOR.primary
          }}

          sx={{
            width: '180px',
            height: 'fit-content',
            // backgroundColor: CUSTOM_COLOR.primary,
            color: CUSTOM_COLOR.white,
            fontSize: '16px',
            borderRadius: '10px'
          }}
          startIcon={<NewspaperIcon />}
        >Đăng tin</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >Đăng nhập</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >Đăng ký</Button>

      </Stack>

    </Stack>

  )
}

export default Header
