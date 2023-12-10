import {
  Grid,
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
import { Area } from '../../../classic/modules/home/components/Area';
import { ProvinceComponent } from './components/ProvinceComponent';
import { ProvinceListComponent } from './components/ProvinceListComponent';
import CUSTOM_COLOR from '../../../classic/constants/colors';
import EastIcon from '@mui/icons-material/East';
import { HomeCard } from '../../../classic/components/HomeCard';
import PostListComponent from './components/PostListComponent';

export function ModernHomePage() {
  const navigate = useNavigate();

  const advertisement = 'https://akenda.vn/wp-content/uploads/2022/12/banner-bat-dong-san-113.jpg';

  const handleClick = () => {
    navigate('/search');
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(950));
  const endSlice = matches ? 4 : 2;

  return (
    <Stack alignItems={'center'}>
      <Stack
        style={{
          objectFit: 'cover',
          width: '100%',
          maxWidth: '1000px',
          minWidth: '390px',
        }}
      >
        <img src={advertisement} height={'400px'} style={{ borderRadius: '10px' }} />
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
          endAdornment={
            <InputAdornment position='end'>
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
        <PostListComponent title={'Gần bạn'} />
        <PostListComponent title={'Mua bán'} />
        <PostListComponent title={'Cho thuê'} />
      </Stack>
    </Stack>
  );
}
