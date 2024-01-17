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

  // fetch Api
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<{
    numOfPages: number;
    posts: RealEstatePost[];
  }>({ numOfPages: 1, posts: [] });

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ?? '1';
  async function fetchPosts() {
    const query = new ApiServiceBuilder()
      .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
      .withUrl('/posts')
      .withParams({
        page: page,
      })
      .build();
    const response = await query.get();
    return response.data as any;
  }
  React.useEffect(() => {
    setIsLoading(true);
    fetchPosts()
      .then((response) => {
        setPosts({
          numOfPages: response.num_of_pages,
          posts: response.result,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <Stack alignItems={'center'}>
      <Stack
        style={{
          objectFit: 'cover',
          width: matches ? '100%' : '95%',
          maxWidth: '1000px',
          minWidth: '390px',
          margin: '0 10px',
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
        {isLoading ? (
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <PostListComponent title={'Gần bạn'} posts={posts.posts} />
        )}
        {isLoading ? (
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <PostListComponent title={'Mua bán'} posts={posts.posts} />
        )}
        {isLoading ? (
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <PostListComponent title={'Cho thuê'} posts={posts.posts} />
        )}
      </Stack>
    </Stack>
  );
}
