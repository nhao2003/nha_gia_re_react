import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { ProvinceListComponent } from './components/ProvinceListComponent';
import PostListComponent from './components/PostListComponent';
import { Carousel } from './components/Carousel';
import { ApiServiceBuilder } from '../../../../services/api.service';
import React from 'react';
import type RealEstatePost from '../../../../models/RealEstatePost';

export function ModernHomePage(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search');
  };

  const handleNavigate = (type: string, value: string) => {
    navigate(`/search/${type}`, {
      state: value,
    });
  };

  const slides = [
    {
      id: 1,
      src: 'https://akenda.vn/wp-content/uploads/2022/12/banner-bat-dong-san-113.jpg',
      alt: 'Image 1 for carousel',
    },
    {
      id: 2,
      src: 'https://bdsweb.com.vn/upload_images/images/bbds/banner-bat-dong-san-00.jpg',
      alt: 'Image 2 for carousel',
    },
    {
      id: 3,
      src: 'https://img.pikbest.com/origin/06/43/34/25WpIkbEsTbZ9.jpg!w700wp',
      alt: 'Image 3 for carousel',
    },
  ];

  return (
    <Stack alignItems={'center'}>
      <Stack
        style={{
          objectFit: 'cover',
          width: matches ? '100%' : '95%',
          maxWidth: '1000px',
          minWidth: '390px',
          margin: '0 10px',
          marginTop: '20px',
        }}
      >
        <Carousel slides={slides} style={{ width: '100%' }} />
        {/* Text file tìm kiếm */}
        <OutlinedInput
          onClick={handleClick}
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            height: '45px',
          }}
          style={{ marginTop: '30px' }}
          placeholder={'Tìm kiếm trên nhà giá rẻ'}
          startAdornment={
            <InputAdornment position='start'>
              <IconButton edge='end'>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {/* Tỉnh thành */}
        <Stack direction={'column'} marginTop={2} marginBottom={2}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: '600',
              fontSize: '24px',
            }}
          >
            Tỉnh thành
          </Typography>
          <ProvinceListComponent />
        </Stack>
        {/* Gần bạn */}
        <PostListComponent
          title={'Gần bạn'}
          url={"/posts?post_is_active[eq]=true&user_status[eq]='verified'&post_expiry_date[gte]=now()"}
          onViewMoreClick={() => {
            handleNavigate('nearby', '');
          }}
        />
        <PostListComponent
          title={'Mua bán'}
          url={
            "/posts?post_is_active[eq]=true&user_status[eq]='verified'&post_expiry_date[gte]=now()&post_is_lease[eq]=" +
            false
          }
          onViewMoreClick={() => {
            handleNavigate('sell', '');
          }}
        />
        <PostListComponent
          title={'Cho thuê'}
          url={
            "/posts?post_is_active[eq]=true&user_status[eq]='verified'&post_expiry_date[gte]=now()&post_is_lease[eq]=" +
            true
          }
          onViewMoreClick={() => {
            handleNavigate('rent', '');
          }}
        />
      </Stack>
    </Stack>
  );
}
