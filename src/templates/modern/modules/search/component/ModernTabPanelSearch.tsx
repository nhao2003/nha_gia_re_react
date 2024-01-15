import { Box, CircularProgress, Grid, Pagination, Stack } from '@mui/material';
import { ModernHomeCardHorizontal } from './ModernHomeCardHorizontal';
import type RealEstatePost from '../../../../../models/RealEstatePost';
import React from 'react';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import dateUtils from '../../../../../utils/dateUtils';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getParsedParams } from '../../../../../services/paramsSearch';

interface SearchProps {
  posts: RealEstatePost[];
  numOfPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export function ModernTabPanelSearch(props: SearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = React.useState({});

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ?? '1';
  const searchTerm = searchParams.get('q') ?? ''; // Add this line to get the search term from the URL
  const [province, setProvince] = React.useState<string | undefined>(undefined);

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
          count={props.numOfPages}
          size='large'
          defaultPage={parseInt(page)}
          onChange={(event, page) => {
            props.onPageChange?.(page);
          }}
        />
      </Stack>
    </Grid>
  );
}
