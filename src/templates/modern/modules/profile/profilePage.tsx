import React, { useState } from 'react';
import {
  AppBar,
  Box,
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
} from '@mui/icons-material';
import { ChangePassword } from '../../components/ChangePassword';

const drawerWidth = 340;

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
  username: string;
  posts: number;
  followers: number;
  joinDate: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  posts,
  followers,
  joinDate,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', gap: '10px' }}>
      <AccountCircle sx={{ fontSize: 100 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
        <Typography variant="h6" noWrap component="div">
          {username}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <Typography variant="body2" noWrap component="div">
              {posts}
            </Typography>
            <Typography variant="body2" noWrap component="div">
              Bài viết
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <Typography variant="body2" noWrap component="div">
              {followers}
            </Typography>
            <Typography variant="body2" noWrap component="div">
              Người theo dõi
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" noWrap component="div"></Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItem>
            <CalendarToday />
            <ListItemText primary={`Tham gia từ ${joinDate}`} />
          </ListItem>
        </ListItem>
        <ListItem disablePadding>
          <ListItem>
            <LocalActivity />
            <ListItemText primary={`Tham gia từ ${joinDate}`} />
          </ListItem>
        </ListItem>
      </List>
    </Box>
  );
};


export const ProfilePage: React.FC = () => {
  const title = 'Profile';
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
        {
          key: 'saved-post',
          title: 'Bài viết đã lưu',
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

  const [openCollapse, setOpenCollapse] = useState<Record<string, boolean>>({});

  const handleCollapseToggle = (title: string) => {
    setOpenCollapse((prevOpenCollapse) => ({
      ...prevOpenCollapse,
      [title]: !prevOpenCollapse[title],
    }));
  };

  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  const drawer = (
    <div>
      <UserProfile username="Nguyễn Văn A" posts={10} followers={222} joinDate="01/01/2021" />
      <Divider />
      <List>
        {items.map((item, index) => (
          (item.children != null) ? (
            <React.Fragment key={item.title}>
              <ListItemButton onClick={() => { handleCollapseToggle(item.title); }}>
                <ListItemIcon sx={{ alignItems: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <ExpandMoreIcon
                  style={{ transform: openCollapse[item.title] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </ListItemButton>
              <Collapse in={openCollapse[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.title} disablePadding>
                      <ListItemButton sx={{ paddingLeft: 9 }} onClick={
                        () => {
                          setSelectedItemKey(child.key);
                        }
                      } selected={selectedItemKey === child.key
                      } >
                        <ListItemText primary={child.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem key={item.title} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ alignItems: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: 'flex', sm: 'none' }, // Hide on small screens
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Your App Title
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // Adjusted margin for the main content
        }}
      >
        {selectedItemKey === 'profile' ? (
          <div>
            <h1>Profile</h1>
          </div>
        ) : selectedItemKey === 'change-password' ? (
          <ChangePassword onConfirm={function (currentPassword: string, newPassword: string, confirmPassword: string): void {
            throw new Error('Function not implemented.');
          }} />
        ) : selectedItemKey === 'my-post' ? (
          <div>
            <h1>My post</h1>
          </div>
        ) : selectedItemKey === 'saved-post' ? (
          <div>
            <h1>Saved post</h1>
          </div>
        ) : selectedItemKey === 'logout' ? (
          <div>
            <h1>Logout</h1>
          </div>
        ) : (

          <Typography>Diam kasd amet at delenit et justo ut possim feugiat commodo consequat elitr rebum sit clita. Ipsum molestie sit lorem accusam ipsum nulla cum duo commodo eos elitr diam odio quis esse. Duo consetetur clita eirmod stet. Vero sit gubergren aliquyam gubergren illum duis ut sit dolore ut. Qui stet eos duo takimata enim facer duis diam veniam no sea et labore. Aliquyam autem invidunt amet. Diam invidunt placerat ut clita accumsan nonumy justo invidunt quis et wisi ea. Consetetur ullamcorper dolor lorem invidunt ut gubergren nulla accusam stet sadipscing nobis dolor. Iusto et no lorem gubergren labore et dolore possim sanctus takimata. Voluptua dignissim sanctus vel et veniam euismod ipsum. Tempor nonumy iriure lorem ipsum et velit. Vero vero feugiat sit clita dolore sea diam vero. Magna rebum eu et illum elitr tempor sed. Ipsum nonumy nisl magna eos eirmod amet nisl. Delenit lorem euismod justo eirmod lorem clita ad consequat et dolor eos lorem consetetur.</Typography>

        )}
      </Box>
    </Box>
  );
};
