import {
  Avatar,
  Backdrop,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  Stack,
  Typography,
  createTheme,
  styled,
} from '@mui/material';
import * as React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LockResetIcon from '@mui/icons-material/LockReset';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { SelectedTab } from './components/SelectedTab';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Tile } from './components/Tile';
import { PersonalInformationPage } from './pages/PersonalInformationPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import CUSTOM_COLOR from '../../constants/colors';
import { LovedNews } from './pages/LovedNews';
import SubcriptionPackage from './pages/SubcriptionPackage';
import { useNavigate } from 'react-router-dom';
import PaymentHistory from './pages/PaymentHistory';
import { ApiServiceBuilder } from '../../../../services/api.service';

const defaultTheme = createTheme();

export function PersonalPage(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');
  const [user, setUser] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchUserProfile() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/users/profile')
        .withHeaders({ Authorization: `Bearer ${token}` })
        .build()
        .get();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetchUserProfile()
      .then((data) => {
        console.log(data.result);
        if (data.status === 'success') {
          setUser(data.result);
        } else {
          console.log(data.message);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  console.log(user);

  const handleListItemClick = (index: number) => (event: React.MouseEvent<Element, MouseEvent>) => {
    if (index === 5) {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
    setSelectedIndex(index);
  };

  const RoundButton = styled(Container)({
    borderRadius: '300%',
    display: 'inline-block',
    padding: 10,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
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
            height: 'fit-content',
          }}
        >
          {user !== null && (
            <>
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
                <Typography variant='h6'>{user.first_name + ' ' + user.last_name}</Typography>
                <Typography variant='body2' color={'gray'}>
                  Chưa có đánh giá
                </Typography>
                <Stack direction={'row'}>
                  <Tile title={'Người theo dõi:'} value={0} />
                  <Box marginRight={2} />
                  <Tile title={'Đang theo dõi:'} value={0} />
                </Stack>

                <Tile title={'SĐT:'} value={user.phone} />

                <Tile title={'Địa chỉ:'} value={user.address.detail} />
              </Grid>
            </>
          )}

          <Button
            variant='contained'
            startIcon={<ReplyOutlinedIcon />}
            sx={{
              marginTop: 1,
              width: '100%',
              backgroundColor: CUSTOM_COLOR.primary,
            }}
          >
            Chia sẻ trang của bạn
          </Button>

          <List sx={{ width: '100%', marginTop: 1 }}>
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
              icon={AccountBalanceWalletOutlinedIcon}
              title={'Gói dịch vụ hiện tại'}
            />

            <SelectedTab
              index={3}
              selected={selectedIndex === 3}
              setSelected={handleListItemClick(3)}
              icon={HistoryOutlinedIcon}
              title={'Lịch sử giao dịch'}
            />

            <SelectedTab
              index={3}
              selected={selectedIndex === 4}
              setSelected={handleListItemClick(4)}
              icon={LockResetIcon}
              title={'Thay đổi mật khẩu'}
            />

            <SelectedTab
              index={5}
              selected={selectedIndex === 5}
              setSelected={handleListItemClick(5)}
              icon={LogoutIcon}
              title={'Đăng xuất'}
            />
          </List>
        </Grid>
        {selectedIndex === 0 ? (
          user !== null ? (
            <PersonalInformationPage userInfo={user} />
          ) : null
        ) : selectedIndex === 1 ? (
          <LovedNews />
        ) : selectedIndex === 2 ? (
          <SubcriptionPackage />
        ) : selectedIndex === 3 ? (
          <PaymentHistory />
        ) : selectedIndex === 4 ? (
          <ChangePasswordPage />
        ) : null}
      </Stack>
    </LocalizationProvider>
  );
}
