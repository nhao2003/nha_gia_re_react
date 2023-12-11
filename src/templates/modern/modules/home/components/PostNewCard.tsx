import { ButtonBase, Stack, Typography } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import { IconText } from './IconText';
import moneyIcon from '../../../assets/images/currency-dollar.svg';
import homeIcon from '../../../assets/images/home.svg';
import timeIcon from '../../../assets/images/tabler_clock.svg';
import { time } from 'console';
import { useNavigate } from 'react-router-dom';

interface PrivateProps {
  image: string;
  title: string;
  price: any;
  address: string;
  time: string;
  sx?: object;
}

export const PostNewCard = ({ image, price, title, address, time, sx }: PrivateProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/details');
  };

  return (
    <ButtonBase
      component={Stack}
      direction={'column'}
      onClick={handleClick}
      sx={{
        ...sx,
        width: '280px',
        height: 'fit-content',
        borderRadius: '10px',
        backgroundColor: CUSTOM_COLOR.backgroundCard,
        transition: 'transform 0.3s ease-in-out', // Add a transition for the transform property
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
          height: '150px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <Stack
        sx={{
          marginLeft: '10px',
          marginRight: '10px',
          marginTop: '10px',
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
        direction={'column'}
        sx={{
          alignItems: 'start',
          marginLeft: '10px',
          justifyContent: 'space-between',
          marginRight: '10px',
          marginTop: '15px',
        }}
      >
        <IconText
          sx={{
            marginBottom: '5px',
          }}
          icon={moneyIcon}
          title={price}
          color={CUSTOM_COLOR.orange}
        />

        <IconText
          sx={{
            marginBottom: '5px',
          }}
          icon={homeIcon}
          title={address}
          color={CUSTOM_COLOR.textTitle}
        />

        <IconText
          sx={{
            marginBottom: '5px',
          }}
          icon={timeIcon}
          title={time}
          color={CUSTOM_COLOR.textTitle}
        />
      </Stack>
    </ButtonBase>
  );
};
