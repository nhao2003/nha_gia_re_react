// Header.tsx
import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Stack, useTheme, useMediaQuery, Drawer } from '@mui/material'
import { Link, useNavigate, } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import CUSTOM_COLOR from '../constants/colors'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {


  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer =
    () => {
      setOpenDrawer(false)
    };

  const hanlderDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const navigate = useNavigate();

  const handleNews = () => {
    navigate('/news');
  };

  const handleHome = () => {
    navigate('/');
  };

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
        height: '80px'
      }}
    >
      <Stack direction={'row'}
        spacing={2}
        marginLeft={2}
        alignItems={'center'}
      >
        <Button sx={{
          display: matches1440 ? 'none' : 'block',
        }}
          onClick={hanlderDrawer}
        >
          <MenuIcon
            sx={{

              color: CUSTOM_COLOR.black
            }}
          />
        </Button>

        <img
          src={logo}
          style={{
            width: '135px',
            height: '80px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={handleHome}
        />

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none'
          }}
        >Mua bán</Button>


        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none'
          }}
        >Cho thuê</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none'
          }}
          onClick={handleNews}
        >Tin tức</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none'
          }}
        >Hỏi đáp</Button>



      </Stack>

      <Drawer open={openDrawer}
        anchor={'left'}
        onClose={toggleDrawer}
      >

        <Stack
          height={'100%'}
          width={'250px'}
        >

          <Stack
            direction={'row'}
          >

            <Button sx={{

            }}
              onClick={hanlderDrawer}
            >
              <MenuIcon
                sx={{

                  color: CUSTOM_COLOR.black
                }}
              />
            </Button>

            <img

              src={logo}
              style={{
                width: '135px',
                height: '80px',
                alignSelf: 'center'
              }}
            />



          </Stack>

          <Button variant="text"
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
          >Mua bán</Button>


          <Button variant="text"
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
          >Cho thuê</Button>

          <Button variant="text"
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
          >Tin tức</Button>

          <Button variant="text"
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
          >Hỏi đáp</Button>
          <Button variant="text"
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
          >Quản lý tin</Button>

          <Button variant="text"
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
          >Đăng tin</Button>



        </Stack>

      </Drawer>

      <img
        src={logo}
        style={{
          width: '135px',
          height: '80px',
          display: matches1440 ? 'none' : 'block',
        }}
      />

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
            fontSize: '14px',
            borderRadius: '10px',
            display: matches ? 'inherit' : 'none'
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
            fontSize: '14px',
            borderRadius: '10px',
            display: matches ? 'inherit' : 'none'
          }}
          startIcon={<NewspaperIcon />}
        >Đăng tin</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',

          }}
        >Đăng nhập</Button>

        <Button variant="text"
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',

          }}
        >Đăng ký</Button>

      </Stack>

    </Stack>

  )
}

export default Header
