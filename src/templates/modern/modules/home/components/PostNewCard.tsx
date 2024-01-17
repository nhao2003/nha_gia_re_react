import { ButtonBase, Stack, Typography } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import { IconText } from './IconText';
import moneyIcon from '../../../assets/images/currency-dollar.svg';
import homeIcon from '../../../assets/images/home.svg';
import timeIcon from '../../../assets/images/tabler_clock.svg';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import React from 'react';

interface PrivateProps {
  itemId: string;
  image: string;
  title: string;
  price: any;
  address: string;
  time: string;
  onClick?: () => void;
  sx?: object;
}

export const PostNewCard = ({ itemId, image, price, title, address, time, onClick, sx }: PrivateProps) => {
  const visibility = React.useContext(VisibilityContext);

  visibility.isItemVisible(itemId);

  const numberFormat = new Intl.NumberFormat('en-US');

  return (
    <ButtonBase
      component={Stack}
      direction={'column'}
      onClick={onClick}
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
          title={`${numberFormat.format(price).replaceAll(',', '.')} VNĐ`}
          color={CUSTOM_COLOR.orange}
          maxLine={1}
        />

        <IconText
          sx={{
            marginBottom: '5px',
          }}
          icon={homeIcon}
          title={address}
          color={CUSTOM_COLOR.textTitle}
          maxLine={1}
        />

        <IconText
          sx={{
            marginBottom: '5px',
          }}
          icon={timeIcon}
          title={time}
          color={CUSTOM_COLOR.textTitle}
          maxLine={1}
        />
      </Stack>
    </ButtonBase>
  );
};
