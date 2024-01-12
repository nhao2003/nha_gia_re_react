import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  AccountCircle,
  CalendarToday,
  ExitToApp,
  LocalActivity,
  ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon,
  EmailOutlined,
  Call,
} from '@mui/icons-material';
import { ChangePassword } from './ChangePassword';
import ModernPostManagement from '../../postManagement/ModernPostManagement';
import PostCreate from '../../createpost/PostCreate';
import type { User } from '../../../../../models/User';
import UserService from '../../../../../services/user.service';
import ModernUpdateProfile from '../../auth/UpdateProfile/ModenUpdateProfile';
import { useNavigate } from 'react-router';

const drawerWidth = '20%';

interface MenuItem {
  key: string;
  title: string;
  icon: React.ReactElement;
  children?: Array<{
    key: string;
    title: string;
  }>;
}

interface UserProfileProps {
  avatar: string;
  fullname: string;
  email: string;
  phone: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ avatar, fullname, email, phone }) => {
  const navagate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', gap: '10px' }}>
      <Avatar sx={{ width: '80%', height: '80%' }} alt={fullname} src={avatar} />
      <Typography variant='h6' component='div'>
        {fullname}
      </Typography>
      <ListItem disablePadding>
        <ListItemIcon sx={{ alignItems: 'center' }}>
          <EmailOutlined />
        </ListItemIcon>
        <ListItemText primary={email} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ alignItems: 'center' }}>
          <Call />
        </ListItemIcon>
        <ListItemText primary={phone} />
      </ListItem>
    </Box>
  );
};

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const items: MenuItem[] = [
    {
      title: 'Quản lý tài khoản',
      icon: <AccountCircle />,
      key: 'account',
      children: [
        {
          key: 'profile',
          title: 'Thông tin cá nhân',
        },
        {
          key: 'change-password',
          title: 'Đổi mật khẩu',
        },
      ],
    },
    {
      title: 'Quản lý bài viết',
      key: 'post',
      icon: <LocalActivity />,
      children: [
        {
          key: 'my-post',
          title: 'Bài viết của tôi',
        },
      ],
    },
    {
      key: 'logout',
      title: 'Đăng xuất',
      icon: <ExitToApp />,
    },
  ];
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function getMyInfo() {
    UserService.getInstance()
      .getMyProfile()
      .then((res: any) => {
        if (res.status !== 'success') {
          throw new Error(res.message);
        }
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    getMyInfo();
  }, []);

  const [openCollapse, setOpenCollapse] = useState<Record<string, boolean>>({});

  const handleCollapseToggle = (title: string) => {
    setOpenCollapse((prevOpenCollapse) => ({
      ...prevOpenCollapse,
      [title]: !prevOpenCollapse[title],
    }));
  };

  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const navagate = useNavigate();
  const drawer = (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      <UserProfile
        fullname={
          user?.first_name == null || user?.last_name == null
            ? 'Chưa cung cấp'
            : user?.first_name + ' ' + user?.last_name
        }
        avatar={user?.avatar ?? 'https://picsum.photos/200'}
        email={user?.email ?? 'Chưa cung cấp'}
        phone={user?.phone ?? 'Chưa cung cấp'}
      />
      <Divider />
      <List>
        {items.map((item, index) =>
          item.children != null ? (
            <React.Fragment key={item.title}>
              <ListItemButton
                onClick={() => {
                  console.log(item);
                  handleCollapseToggle(item.title);
                }}
              >
                <ListItemIcon sx={{ alignItems: 'center' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                <ExpandMoreIcon style={{ transform: openCollapse[item.title] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </ListItemButton>
              <Collapse in={openCollapse[item.title]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.title} disablePadding>
                      <ListItemButton
                        sx={{ paddingLeft: 9 }}
                        onClick={() => {
                          setSelectedItemKey(child.key);
                        }}
                        selected={selectedItemKey === child.key}
                      >
                        <ListItemText primary={child.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem key={item.title} disablePadding onClick={
              () => {
                if (item.key === 'logout') {
                  localStorage.removeItem('access_token');
                  navagate('/');
                }
              }
            }>
              <ListItemButton>
                <ListItemIcon sx={{ alignItems: 'center' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    </Box>
  );

  return user === null ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {/* <CssBaseline /> */}
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: 'flex', sm: 'none' }, // Hide on small screens
          position: 'fixed',
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Your App Title
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          sx={{
            display: mobileOpen ? 'none' : { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Box>
      </Box>
      <Divider orientation='vertical' flexItem />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {selectedItemKey === 'profile' ? (
          <ModernUpdateProfile />
        ) : selectedItemKey === 'change-password' ? (
          <ChangePassword />
        ) : selectedItemKey === 'my-post' ? (
          <ModernPostManagement />
        ) : selectedItemKey === 'logout' ? (
          <div>
            <h1>Logout</h1>
          </div>
        ) : (
          <ModernUpdateProfile />
        )}
      </Box>
    </Box>
  );
};
