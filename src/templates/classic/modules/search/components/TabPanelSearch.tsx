import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material';
import { HomeCardHorizontal } from './HomeCardHorizontal';
import type RealEstatePost from '../../../../../models/RealEstatePost';
import dateUtils from '../../../../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import CUSTOM_COLOR from '../../../constants/colors';

interface SearchProps {
  posts: RealEstatePost[];
  numOfPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const TabPanelSearch = (props: SearchProps) => {
  const navigate = useNavigate();

  return (
    <Stack>
      {props.isLoading ? (
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
          {props.posts.map((post, index) => (
            <Grid item xs={4} sm={8} md={12} key={index}>
              <HomeCardHorizontal
                image={post.images[0]}
                title={post.title}
                price={post.price}
                address={post.address_detail ?? 'Chưa cập nhật'}
                bedrooms={2}
                bathrooms={2}
                areas={234}
                type={post.is_pro_seller}
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
          ></Stack>
        </Grid>
      )}
      <Stack direction={'row'} justifyContent={'center'}>
        {props.posts.length > 0 ? (
          <Pagination
            count={props.numOfPages}
            size='large'
            onChange={(e, page) => {
              props.onPageChange(page);
            }}
          />
        ) : (
          <Typography
            margin={5}
            sx={{
              color: CUSTOM_COLOR.grayScorpion,
              fontSize: '18px',
            }}
          >
            Không tìm thấy kết quả!
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
