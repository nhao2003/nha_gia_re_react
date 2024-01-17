import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import checkIcon from '../../../assets/images/check.svg';
import unCheckIcon from '../../../assets/images/uncheck.svg';
import packageIcon from '../../../assets/images/package_icon.svg';
import { useNavigate } from 'react-router-dom';

interface PackageCardProps {
  key: string;
  packageItem: any;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageItem, ...props }) => {
  const navigate = useNavigate();

  const navigateToDetails = (id: any) => {
    navigate(`/package/${id}`);
  };

  return (
    <Card
      variant='outlined'
      sx={{
        border: '1px solid',
        borderRadius: '24px',
        borderColor: '#BCB8BE',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        width: {
          xs: '25%', // 25%% width on extra small screens
          sm: '50%', // 50% width on small screens
          md: '50%', // 50% width on medium screens
          lg: '28rem', // 25% width on large screens
        },
      }}
    >
      <React.Fragment>
        <CardContent>
          <img src={packageIcon} alt='icon' />
          <Typography variant='h5' component='div' color='#0F2C59'>
            {packageItem.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {packageItem.description}
          </Typography>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 1.5 }} color='text.primary'>
            {packageItem.price_per_month}đ
          </Typography>

          <Button
            variant='contained'
            size='small'
            sx={{
              backgroundColor: '#0F2C59', // change color
              borderRadius: '24px', // set border width
              width: '100%',
              padding: '10px 0px',
              marginBottom: '16px',
            }}
            onClick={() => {
              console.log(packageItem);
              navigateToDetails(packageItem.id);
            }}
          >
            Mua ngay
          </Button>

          <Stack
            key='123'
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{
              marginBottom: '10px',
            }}
          >
            <img src={checkIcon} alt='icon' />
            <p
              style={{
                fontSize: 18,
              }}
            >
              {packageItem.monthly_post_limit} tin đăng - Hiển thị 14 ngày
            </p>
          </Stack>

          <Stack
            key='123'
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{
              marginBottom: '10px',
            }}
          >
            <img src={packageItem.display_priority_point !== 0 ? checkIcon : unCheckIcon} alt='icon' />
            <p
              style={{
                fontSize: 18,
              }}
            >
              Ưu tiên hiển thị tin đăng
            </p>
          </Stack>

          <Stack
            key='123'
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{
              marginBottom: '10px',
            }}
          >
            <img src={packageItem.post_approval_priority_point !== 0 ? checkIcon : unCheckIcon} alt='icon' />
            <p
              style={{
                fontSize: 18,
              }}
            >
              Ưu tiên duyệt tin đăng
            </p>
          </Stack>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};

export default PackageCard;
