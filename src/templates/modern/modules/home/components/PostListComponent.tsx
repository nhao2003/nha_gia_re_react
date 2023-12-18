import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import EastIcon from '@mui/icons-material/East';
import { PostNewCard } from './PostNewCard';
import type RealEstatePost from '../../../../../models/RealEstatePost';

interface PostListComponentProps {
  title: string;
  posts: RealEstatePost[];
}

const PostListComponent = ({ title, posts }: PostListComponentProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(950));
  const endSlice = matches ? 4 : 2;

  return (
    <Stack
      direction={'column'}
      marginTop={2}
      marginBottom={2}
      sx={{
        display: 'flex',
      }}
    >
      <Stack direction={'row'} marginBottom={1} justifyContent={'space-between'}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: '600',
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
        <Stack
          direction={'row'}
          spacing={1}
          alignItems={'center'}
          sx={{
            color: CUSTOM_COLOR.primary,
          }}
        >
          <Typography>Xem thêm</Typography>
          <EastIcon />
        </Stack>
      </Stack>

      <Stack direction={'row'} spacing={2}>
        {posts.map((post, index) => (
          <PostNewCard
            key={index}
            image={post.images[0]}
            title={post.title}
            price={`${post.price}đ/$m2`}
            address={post.address_detail ?? 'Chưa cập nhật'}
            time='1 ngày trước'
            sx={{
              overflow: 'hidden',
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default PostListComponent;
