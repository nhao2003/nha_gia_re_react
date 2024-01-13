import { Box, CircularProgress, Grid, Pagination, Stack } from '@mui/material';
import { ModernHomeCardHorizontal } from './ModernHomeCardHorizontal';
import type RealEstatePost from '../../../../../models/RealEstatePost';
import React from 'react';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import dateUtils from '../../../../../utils/dateUtils';
import { useLocation, useNavigate } from 'react-router-dom';

export function ModernTabPanelSearch(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<{
    numOfPages: number;
    posts: RealEstatePost[];
  }>({ numOfPages: 1, posts: [] });

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ?? '1';
  const searchTerm = searchParams.get('q') ?? ''; // Add this line to get the search term from the URL

  async function fetchPosts() {
    const query = new ApiServiceBuilder()
      .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
      .withUrl('/posts')
      .withParams({
        page: page,
        q: searchTerm,
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

  return isLoading ? (
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
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} width={'100%'}>
      {posts.posts.map((post, index) => (
        <Grid item xs={4} sm={8} md={12} key={index}>
          <ModernHomeCardHorizontal
            image={post.images[0]}
            title={post.title}
            price={post.price + 'VNĐ'}
            address={post.address_detail ?? 'Chưa cập nhật'}
            type={'personal'}
            avatar={post.user.avatar ?? 'https://i.pinimg.com/736x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg'}
            name={post.user.first_name + ' ' + post.user.last_name}
            time={dateUtils.getTimeAgoVi(post.posted_date)}
            onClick={() => {
              navigate(`/details/${post.id}`, {
                state: post,
              });
            }}
          />
        </Grid>
      ))}
      <Stack
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <Pagination
          count={posts.numOfPages}
          size='large'
          defaultPage={parseInt(page)}
          onChange={(event, page) => {
            // navigate(`/search?page=${page}`);
            navigate(`/search?page=${page}&q=${encodeURIComponent(searchTerm)}`);
          }}
        />
      </Stack>
    </Grid>
  );
}
