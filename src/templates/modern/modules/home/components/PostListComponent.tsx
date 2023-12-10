import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import EastIcon from '@mui/icons-material/East';
import { HomeCard } from '../../../../classic/components/HomeCard';

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
            <HomeCard
              key={index}
              image='https://mediawinwin.vn/cosy/admin/upload/images/%E1%BA%A2nh%20N%E1%BB%99i%20Th%E1%BA%A5t/%E1%BA%A3nh%20n%E1%BB%99i%20th%E1%BA%A5t%2014.jpg'
              title='Căn hộ cao cấp sân vườn full nội thất'
              price={'6 tỷ 599 triệu'}
              loved={true}
              address='Q5, TP. Hồ Chí Minh'
              bedrooms={2}
              bathrooms={2}
              areas={234}
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
