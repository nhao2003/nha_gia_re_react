import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material';
import { ModernHomeCardHorizontal } from './ModernHomeCardHorizontal';
import type RealEstatePost from '../../../../../models/RealEstatePost';
import React from 'react';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import dateUtils from '../../../../../utils/dateUtils';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getParsedParams } from '../../../../../services/paramsSearch';
import CUSTOM_COLOR from '../../../../classic/constants/colors';

interface SearchProps {
  posts: RealEstatePost[];
  numOfPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function ModernTabPanelSearch(props: SearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = React.useState({});

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const searchParams = new URLSearchParams(location.search);
  const { currentPage } = props;
  const searchTerm = searchParams.get('q') ?? ''; // Add this line to get the search term from the URL
  const [province, setProvince] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    setIsLoading(false);
    console.log('num_of_page', props.numOfPages);
  }, [props]);

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
      {props.posts.map((post, index) => (
        <Grid item xs={4} sm={8} md={12} key={index}>
          <ModernHomeCardHorizontal
            image={post.images[0]}
            title={post.title}
            price={post.price + ' VNĐ'}
            address={post.address_detail ?? 'Chưa cập nhật'}
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
      >
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
    </Grid>
  );
}
