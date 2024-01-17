import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import checkIcon from '../../../assets/images/check.svg';
import unCheckIcon from '../../../assets/images/uncheckIcon.svg';
import packageIcon from '../../../assets/images/package_icon.svg';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPackageCardProps {
  key: string;
  packageItem: any;
}

const SubscriptionPackageCard: React.FC<SubscriptionPackageCardProps> = ({ packageItem, ...props }) => {
  const membershipPackage = packageItem.membership_package;

  const date = new Date(packageItem.expiration_date);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

  return (
    <Card
      variant='outlined'
      sx={{
        border: '1px solid',
        borderRadius: '12px',
        borderColor: '#BCB8BE',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <React.Fragment>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center'>
            <img src={packageIcon} alt='icon' />
            <Stack spacing={0}>
              <Typography variant='h5' component='div' color='#0F2C59'>
                {membershipPackage !== undefined ? membershipPackage.name : ''}
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }} color='#EB7910'>
                Thời điểm đến hạn {packageItem !== undefined ? formattedDate : ''}
              </Typography>
            </Stack>
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

export default SubscriptionPackageCard;
