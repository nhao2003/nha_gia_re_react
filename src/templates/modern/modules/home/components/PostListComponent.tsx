import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import EastIcon from '@mui/icons-material/East';
import { HomeCard } from '../../../../classic/components/HomeCard';
import { PostNewCard } from './PostNewCard';

interface PostListComponentProps {
  title: string;
}

const PostListComponent = ({ title }: PostListComponentProps) => {
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
        {Array.from(Array(6))
          .slice(0, endSlice)
          .map((_, index) => (
            <PostNewCard
              key={index}
              image='https://static.asianpaints.com/content/dam/asian_paints/blog/wood/benefits-of-wooden-furniture/image-1-asian-paints-m.jpeg'
              title='Căn hộ cao cấp sân vườn full nội thất'
              price={'11.900.000đ/căn'}
              address='Q5, TP. Hồ Chí Minh'
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
