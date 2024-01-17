import { Avatar, Box, Button, CircularProgress, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CUSTOM_COLOR from '../../../classic/constants/colors';
import { Tile } from './component/Tile';
import { ModernNewsPostedPage } from './component/ModernNewsPostedPage';
import React, { useState } from 'react';
import type { User } from '../../../../models/User';
import { useLocation } from 'react-router';
import { ApiServiceBuilder } from '../../../../services/api.service';
import dateUtils from '../../../../utils/dateUtils';
import addressUtils from '../../../../utils/addressUtils';
import { IconText } from '../home/components/IconText';
import locationIcon from '../../assets/images/location-marker.svg';
import calendarIcon from '../../assets/images/calendar.svg';
import AuthService from '../../../../services/auth.service';
import { Chat } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function ModernOthersInformation(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  // Get state
  const [user, setUser] = React.useState<User | null>(useLocation().state as User | null);
  const id = useLocation().pathname.split('/')[2];

  async function fetchUser() {
    const query = new ApiServiceBuilder()
      .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
      .withUrl("/admin/users?id[eq]='" + id + "'")
      .build();
    console.log(query);
    const response = await query.get();
    return response.data as any;
  }

  const [isMe, setIsMe] = useState(false);

  React.useEffect(() => {
    const userId = AuthService.getInstance().getUserIdFromToken();
    if (user === null)
      fetchUser()
        .then((response) => {
          setUser(response.result[0]);
          // Explicitly specify the type of 'response.result[0]'
          const firstuser = response.result[0] as User | undefined;

          if (firstuser !== undefined) {
            setUser(firstuser);
            setIsMe(firstuser.id === userId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    else setIsMe(user.id === userId);
  }, []);

  const navigate = useNavigate();

  const navigateToChat = () => {
    if (user !== null) navigate(`/chat/${user.id}`);
  };

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
    <Stack direction={matches ? 'row' : 'column'} spacing={2} justifyContent='center' marginTop={2}>
      <Stack
        direction='column'
        alignItems='flex-start'
        marginBottom={2}
        width={matches ? 'auto' : '95%'}
        style={{ alignSelf: matches ? 'none' : 'center' }}
      >
        {/* Hàng đầu */}
        <Grid
          container
          sx={{
            borderRadius: 2,
            borderColor: 'divider',
            backgroundColor: CUSTOM_COLOR.backgroundCard,
            padding: 2,
            height: 'fit-content',
          }}
        >
          <Grid item marginRight={2}>
            <Avatar
              alt='Avatar'
              style={{
                width: 100,
                height: 100,
              }}
              src={user.avatar ?? '/static/images/avatar/2.jpg'}
            />
          </Grid>

          <Grid item>
            <Typography variant='h6' fontWeight={'700'} color={CUSTOM_COLOR.green}>
              {user.first_name + ' ' + user.last_name}
            </Typography>
            <Typography variant='body2' color={'gray'}>
              SĐT: {user.phone ?? 'Chưa cung cấp'}
            </Typography>
            <Stack direction='row'>
              <Tile title={'Người theo dõi:'} value={0} />
              <Box marginRight={2} />
              <Tile title={'Đang theo dõi:'} value={0} />
            </Stack>
          </Grid>
        </Grid>

        {/* Hàng thứ hai */}
        <Stack
          direction='column'
          sx={{
            alignItems: 'flex-start',
            borderRadius: 2,
            borderColor: 'divider',
            backgroundColor: CUSTOM_COLOR.backgroundCard,
            padding: 2,
            paddingTop: 0,
            width: matches ? 'auto' : '100%',
            height: 'fit-content',
          }}
        >
          <IconText
            title={
              user.address !== null
                ? addressUtils.getDetailedAddress(
                    user.address.province_code,
                    user.address.district_code,
                    user.address.ward_code,
                  )
                : 'Chưa cung cấp'
            }
            sx={{
              marginBottom: '5px',
            }}
            icon={locationIcon}
            color={CUSTOM_COLOR.textTitle}
            sizeIcon='18px'
            fontSize='5'
            maxLine={3}
          />

          <IconText
            title={`Tham gia từ ${dateUtils.formatDate(user.created_at ?? '')}`}
            sx={{
              marginBottom: '5px',
            }}
            icon={calendarIcon}
            color={CUSTOM_COLOR.textTitle}
            sizeIcon='18px'
            fontSize='5'
            maxLine={3}
          />

          {!isMe && (
            <Button
              variant='contained'
              sx={{
                marginTop: 1,
                width: '100%',
                backgroundColor: CUSTOM_COLOR.white,
                borderColor: CUSTOM_COLOR.green,
                borderWidth: '2px',
                color: CUSTOM_COLOR.green,
              }}
              endIcon={<Chat />}
              onClick={navigateToChat}
            >
              Chat với người đăng
            </Button>
          )}
        </Stack>
      </Stack>

      <ModernNewsPostedPage user={user} />
    </Stack>
  );
}
