import { Avatar, Divider, Pagination, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CUSTOM_COLOR from '../../../../classic/constants/colors';

interface PrivateProps {
  image: string;
  price: any;
  title: string;
  address: string;
  type: string;
  avatar: string;
  name: string;
  time: any;
  onClick?: () => void;
}

export const ModernHomeCardHorizontal = (props: PrivateProps) => {
  const { image, price, title, address, type, avatar, name, time, onClick } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(800));

  return (
    <Stack
      direction={'row'}
      onClick={onClick}
      sx={{
        boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          borderRadius: '10px',
          width: '200px',
          height: '150px',
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          style={{
            borderRadius: '10px',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </div>

      <Stack
        direction={'column'}
        sx={{
          marginLeft: '15px',
          justifyContent: 'space-between',
          padding: '2px',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            color: CUSTOM_COLOR.black,
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: CUSTOM_COLOR.grayScorpion,
            fontSize: '18px',
          }}
        >
          {address}
        </Typography>

        <Typography
          sx={{
            color: CUSTOM_COLOR.primary,
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {price}
        </Typography>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            display: matches ? 'inherit' : 'none',
          }}
        >
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            {type === 'agency' ? <BusinessCenterIcon /> : <Avatar alt='Travis Howard' src={avatar} />}
            {type === 'agency' ? <Typography>Môi giới</Typography> : <Typography>{name}</Typography>}
            <Divider orientation='vertical' variant='middle' flexItem />
            <Typography>{time}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
