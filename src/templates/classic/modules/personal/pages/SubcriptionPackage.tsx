import { Backdrop, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { TextFieldTitle } from '../components/TextFieldTitle';
import { DatePicker } from '@mui/x-date-pickers';
import SubscriptionPackageCard from '../components/SubscriptionPackageCard';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../../../services/auth.service';

const SubcriptionPackage = () => {
  const userId = AuthService.getInstance().getUserIdFromToken();
  const token = localStorage.getItem('access_token');
  const [packageItem, setPackageItem] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  async function fetchPackage() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl(`/membership-package/user-with-subscription?user_id=${userId}`)
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
    fetchPackage()
      .then((data) => {
        console.log(data.result.subscription.membership_package);
        if (data.status === 'success') {
          setPackageItem(data.result.subscription);
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

  async function cancelPackage() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/membership-package/unsubscribe')
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .build()
        .post();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  function handleCancelPackage() {
    setIsLoading(true);
    cancelPackage()
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          setPackageItem(null);
          setIsLoading(false);
        } else {
          console.log(data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  console.log(packageItem);

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
        Gói dịch vụ đã đăng ký
      </Typography>

      {isLoading ? (
        <CircularProgress color='inherit' />
      ) : packageItem !== null ? (
        <SubscriptionPackageCard key='1' packageItem={packageItem} />
      ) : (
        <Typography variant='h6'>Bạn chưa đăng ký gói dịch vụ nào</Typography>
      )}
      {packageItem !== null ? (
        <Button
          variant='contained'
          size='small'
          sx={{
            backgroundColor: '#D00000', // change color
            borderRadius: '12px', // set border width
            width: '100%',
            padding: '10px 0px',
            marginBottom: '16px',
            fontWeight: 'bold',
          }}
          onClick={handleCancelPackage}
        >
          Hủy gói
        </Button>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default SubcriptionPackage;
