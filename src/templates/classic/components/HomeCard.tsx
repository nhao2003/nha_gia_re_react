import { Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CUSTOM_COLOR from '../constants/colors';
import bedroom from '../assets/images/bedroom.svg';
import bathroom from '../assets/images/bathroom.svg';
import area from '../assets/images/area.svg';
import { FacilityTag } from './FacilityTag';
import { useNavigate } from 'react-router-dom';

interface PrivateProps {
  image: string;
  price: any;
  title: string;
  address: string;
  type: string;
  sx?: object;
  onClick?: () => void;
}

export const HomeCard = ({ image, price, title, address, type, sx, onClick }: PrivateProps) => {
  const navigate = useNavigate();

  const handlDetailHome = () => {
    navigate('/details');
  };

  const numberFormat = new Intl.NumberFormat('en-US');

  return (
    <Stack
      onClick={onClick}
      direction={'column'}
      sx={{
        ...sx,
        width: '280px',
        height: '410px',
        borderRadius: '10px',
        border: '2px solid',
        borderColor: CUSTOM_COLOR.grayNobel,
        transition: 'transform 0.3s ease-in-out', // Add a transition for the transform property
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          transform: 'scale(1.05)', // Scale up on hover
        },
        '&:active': {
          transform: 'scale(0.95)', // Scale down on click
        },
      }}
    >
      <img
        src={image}
        style={{
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          height: '180px',
          objectFit: 'cover',
        }}
      />

      <Stack
        direction={'row'}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: '15px',
        }}
      >
        <Typography
          sx={{
            color: CUSTOM_COLOR.primary,
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {numberFormat.format(price).replaceAll(',', '.')} VNĐ
        </Typography>
      </Stack>

      <Stack
        sx={{
          marginLeft: '20px',
          marginRight: '20px',

          minHeight: '62px',
        }}
      >
        <Typography
          sx={{
            color: CUSTOM_COLOR.black,
            fontSize: '22px',
            fontWeight: 'bold',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Stack
        sx={{
          marginLeft: '20px',
          marginRight: '20px',
          minHeight: '65px',
        }}
      >
        <Typography
          sx={{
            color: CUSTOM_COLOR.grayScorpion,
            fontSize: '18px',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {address}
        </Typography>
      </Stack>

      <Stack
        sx={{
          width: '100%',
          borderBlockEnd: '2px solid',
          borderColor: CUSTOM_COLOR.grayNobel,
          marginTop: '10px',
        }}
      ></Stack>

      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} padding={1}>
        <Typography
          sx={{
            color: CUSTOM_COLOR.grayScorpion,
            fontSize: '20px',
            display: '-webkit-box',
          }}
        >
          {type}
        </Typography>
      </Stack>
    </Stack>
  );
};
