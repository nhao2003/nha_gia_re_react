import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import PaymentCard from '../components/PaymentCard';

const PaymentHistory = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('access_token');
  const [paymentItems, setPaymentItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchPayment() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl(`/membership-package/transactions?orders=-timestamp&user_id[eq]='${userId}'`)
        .withHeaders({ Authorization: `Bearer ${token}` })
        .build()
        .get();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetchPayment()
      .then((data) => {
        console.log(data.result);
        if (data.status === 'success') {
          setPaymentItems(data.result);
        } else {
          console.log(data.message);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  console.log(paymentItems);

  return (
    <Stack
      spacing={2}
      sx={{
        width: '50%',
        padding: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontWeight: 'bold',
        }}
      >
        Lịch sử giao dịch
      </Typography>

      {isLoading ? (
        <CircularProgress color='inherit' />
      ) : paymentItems.length !== 0 ? (
        paymentItems.map((item: any) => <PaymentCard key={item.id} paymentItem={item} />)
      ) : (
        <Typography variant='h6'>Bạn chưa có giao dịch nào</Typography>
      )}
    </Stack>
  );
};

export default PaymentHistory;
