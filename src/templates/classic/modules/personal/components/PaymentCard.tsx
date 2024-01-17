import React from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import successIcon from '../../../assets/images/success-credit-card.svg';
import failIcon from '../../../assets/images/fail-credit-card.svg';

const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

interface PaymentCardProps {
  key: string;
  paymentItem: any;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentItem, ...props }) => {
  const date = new Date(paymentItem.timestamp);

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
      <CardContent
        sx={{
          padding: '1px 12px', // 16px vertical padding, 8px horizontal padding
          '&.MuiCardContent-root:last-child': {
            paddingBottom: '8px !important', // remove bottom padding from last child
          },
        }}
      >
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={2} alignItems='center'>
            <img src={paymentItem.status === 'paid' ? successIcon : failIcon} alt='icon' />
            <Stack spacing={0}>
              <Typography variant='h6' component='div' color={paymentItem.status === 'paid' ? '#0F2C59' : '#D00000'}>
                {paymentItem.package.name + ' ' + paymentItem.num_of_subscription_month + ' tháng'}
              </Typography>
              <Typography variant='body2' color='#6A6A6A'>
                Thời gian giao dịch: {formattedDate}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant='h6' component='div' color='#EB7910'>
            {formatter.format(paymentItem.amount)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
