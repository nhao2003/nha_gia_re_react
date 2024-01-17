import React, { useState } from 'react';
import { Button, useTheme, useMediaQuery, Stack, Drawer, Avatar, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CUSTOM_COLOR from '../../../classic/constants/colors';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/images/logo_app.png';
import avatar from '../../assets/images/user.png';
import classes from './Header.module.css';
import UserService from '../../../../services/user.service';
import type { User } from '../../../../models/User';

const Header: React.FC = () => {
  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(false);
  };

  const hanlderDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const navigate = useNavigate();

  const headerItems = [
    { id: 'home', href: '/', label: 'Mua bán' },
    { id: 'blogs', href: '/blogs', label: 'Blogs' },
    { id: 'dangtin', href: '/create-post', label: 'Đăng tin' },
    { id: 'profile', href: '/profile', label: 'Hồ sơ' },
    { id: 'signin', href: '/signin', label: 'Đăng nhập' },
    { id: 'signup', href: '/signup', label: 'Đăng ký' },
    { id: 'chat', href: '/chat', label: 'Tin nhắn' },
    { id: 'purchase', href: '/purchase', label: 'Thanh toán' },
    { id: 'about-us', href: '/about-us', label: 'Về chúng tôi' },
  ];

  const handleNavigate = (idRoute: string) => {
    const href = headerItems.find((item) => item.id === idRoute)?.href;
    if (href == null) return;
    navigate(href);
  };
  const themes = [
    { value: 'modern', label: 'Hiện đại' },
    { value: 'classic', label: 'Cổ điển' },
  ];
  const currentTheme = localStorage.getItem('theme') ?? 'modern';

  const handleThemeChange = (value: string) => {
    localStorage.setItem('theme', value);
    window.location.reload();
  };

  const [user, setUser] = useState<User | null>(null);
  function getMyInfo() {
    UserService.getInstance()
      .getMyProfile()
      .then((res: any) => {
        if (res.status !== 'success') {
          throw new Error(res.message);
        }
        console.log("Get user's info successfully", res);
        setUser(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      // marginBottom={5}
      sx={{
        backgroundColor: CUSTOM_COLOR.white,
        width: '100%',
        height: '80px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Stack direction={'row'} spacing={2} marginLeft={2} alignItems={'center'}>
        <Button
          sx={{
            display: matches1440 ? 'none' : 'block',
          }}
          onClick={hanlderDrawer}
        >
          <MenuIcon
            sx={{
              color: CUSTOM_COLOR.black,
            }}
          />
        </Button>

        <img
          src={logo}
          style={{
            width: '125px',
            height: '91px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => {
            handleNavigate('home');
          }}
        />

        <Button
          variant='text'
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => {
            handleNavigate('home');
          }}
        >
          Trang chủ
        </Button>

        <Button
          variant='text'
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => {
            handleNavigate('blogs');
          }}
        >
          Blogs
        </Button>

        <Button
          variant='text'
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => {
            handleNavigate('dangtin');
          }}
        >
          Đăng tin
        </Button>

        {/* <Button
          variant='text'
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => handleNavigate('profile')}
        >
          Hồ sơ
        </Button> */}
        <Button
          variant='text'
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => {
            handleNavigate('chat');
          }}
        >
          Tin nhắn
        </Button>
        <Button
          variant='text'
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => {
            handleNavigate('purchase');
          }}
        >
          Thanh toán
        </Button>
        <Button
          variant='text'
          sx={{
            color: CUSTOM_COLOR.black,
            fontWeight: 'bold',
            fontSize: '16px',
            display: matches1440 ? 'block' : 'none',
          }}
          onClick={() => {
            handleNavigate('about-us');
          }}
        >
          Về chúng tôi
        </Button>
      </Stack>

      <Drawer open={openDrawer} anchor={'left'} onClose={toggleDrawer}>
        <Stack height={'100%'} width={'250px'}>
          <Stack direction={'row'}>
            <Button sx={{}} onClick={hanlderDrawer}>
              <MenuIcon
                sx={{
                  color: CUSTOM_COLOR.black,
                }}
              />
            </Button>

            <img
              src={logo}
              style={{
                width: '125px',
                height: '91px',
                display: matches1440 ? 'block' : 'none',
              }}
              onClick={() => {
                handleNavigate('home');
              }}
            />
          </Stack>
          <Button
            variant='text'
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
            onClick={() => {
              handleNavigate('blogs');
            }}
          >
            Blogs
          </Button>
          <Button
            variant='text'
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
            onClick={() => {
              handleNavigate('dangtin');
            }}
          >
            Đăng tin
          </Button>
          <Button
            variant='text'
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
            onClick={() => {
              handleNavigate('profile');
            }}
          >
            Hồ sơ
          </Button>
          <Button
            variant='text'
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
            onClick={() => {
              handleNavigate('chat');
            }}
          >
            Tin nhắn
          </Button>
          <Button
            variant='text'
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
            onClick={() => {
              handleNavigate('purchase');
            }}
          >
            Thanh toán
          </Button>
          <Button
            variant='text'
            sx={{
              color: CUSTOM_COLOR.black,
              fontWeight: 'bold',
              fontSize: '16px',
              // display: matches1440 ? 'block' : 'none'
            }}
            onClick={() => {
              handleNavigate('about-us');
            }}
          >
            Về chúng tôi
          </Button>
          {localStorage.getItem('access_token') === null && (
            <>
              <Button
                variant='text'
                sx={{
                  color: CUSTOM_COLOR.black,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  display: !matches ? 'inherit' : 'none',
                }}
                onClick={() => {
                  handleNavigate('signup');
                }}
              >
                Đăng ký
              </Button>

              <Button
                variant='text'
                sx={{
                  color: CUSTOM_COLOR.black,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  display: !matches ? 'inherit' : 'none',
                }}
                onClick={() => {
                  handleNavigate('signin');
                }}
              >
                Đăng nhập
              </Button>
            </>
          )}
        </Stack>
      </Drawer>

      <img
        src={logo}
        style={{
          width: '135px',
          height: '80px',
          display: matches1440 ? 'none' : 'block',
        }}
        onClick={() => {
          handleNavigate('home');
        }}
      />

      <Stack direction={'row'} alignItems={'center'} spacing={2} marginRight={2}>
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          sx={{
            display: matches1440 ? 'block' : 'none',
          }}
        >
          {themes.map((theme) => (
            <Button
              key={theme.value}
              sx={{
                backgroundColor: theme.value === currentTheme ? CUSTOM_COLOR.green : CUSTOM_COLOR.white,
                color: theme.value === currentTheme ? CUSTOM_COLOR.white : CUSTOM_COLOR.black,
                fontWeight: 'bold',
                fontSize: '16px',
                ':hover': {
                  backgroundColor: theme.value === currentTheme ? CUSTOM_COLOR.green : CUSTOM_COLOR.white,
                  color: theme.value === currentTheme ? CUSTOM_COLOR.white : CUSTOM_COLOR.black,
                },
              }}
              onClick={() => handleThemeChange(theme.value)}
            >
              {theme.label}
            </Button>
          ))}
        </ButtonGroup>

        {localStorage.getItem('access_token') === null ? (
          <>
            <Button
              variant='contained'
              style={{
                backgroundColor: CUSTOM_COLOR.white,
              }}
              sx={{
                width: '180px',
                height: 'fit-content',
                color: CUSTOM_COLOR.black,
                fontSize: '14px',
                borderRadius: '10px',
                display: matches ? 'inherit' : 'none',
              }}
              onClick={() => {
                handleNavigate('signup');
              }}
            >
              Đăng ký
            </Button>

            <Button
              variant='contained'
              style={{
                backgroundColor: CUSTOM_COLOR.green,
              }}
              sx={{
                width: '180px',
                height: 'fit-content',
                color: CUSTOM_COLOR.white,
                fontSize: '14px',
                borderRadius: '10px',
                display: matches ? 'inherit' : 'none',
              }}
              onClick={() => {
                handleNavigate('signin');
              }}
            >
              Đăng nhập
            </Button>
          </>
        ) : (
          <>
            <div
              className={classes.user}
              onClick={() => {
                handleNavigate('profile');
              }}
            >
              <Avatar sx={{ marginRight: '8px' }} src={user?.avatar ?? avatar} alt='avatar' />
              <span>
                {user?.first_name == null || user?.last_name == null
                  ? 'Chưa cung cấp'
                  : user?.first_name + ' ' + user?.last_name}
              </span>
            </div>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export { Header };
