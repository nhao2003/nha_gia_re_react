import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PackageCard from './components/PackageCard';
import { Button, Card, CardActions, CardContent, Radio, Stack, Typography } from '@mui/material';
import PackageTimeCard from './components/PackageTimeCard';
import checkIcon from '../../assets/images/check.svg';
import unCheckIcon from '../../assets/images/uncheckIcon.svg';
import packageIcon from '../../assets/images/package_icon.svg';
import { useParams } from 'react-router-dom';
import { ApiServiceBuilder } from '../../../../services/api.service';

const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

const DetailedPackage = () => {
  const { id } = useParams();
  const [packageItem, setPackageItem] = React.useState<any>({});
  const [selectedValue, setSelectedValue] = React.useState('1');

  const packagePrice = packageItem.price_per_month * Number(selectedValue);
  const userId = localStorage.getItem('userId');

  async function fetchPackage() {
    try {
      const response = await new ApiServiceBuilder().withUrl(`/membership-package?id[eq]='${id}'`).build().get();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  React.useEffect(() => {
    fetchPackage()
      .then((data) => {
        console.log(data.result[0]);
        if (data.status === 'success') {
          setPackageItem(data.result[0]);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  async function createOrderRequest() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/membership-package/check-out')
        .withBody({
          membership_package_id: id,
          num_of_subscription_month: selectedValue,
          user_id: userId,
          redirect_url: 'http://localhost:3000/transaction/:id',
        })
        .build()
        .post();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  function handleCheckout() {
    createOrderRequest()
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          window.location.href = data.result.order_url;
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Card
          variant='outlined'
          sx={{
            border: '0px',
            borderRight: '1px solid',
            borderColor: '#BCB8BE',
            backgroundColor: '#F5F5F5',
            height: '100vh',
          }}
        >
          <CardContent>
            <img src={packageIcon} alt='icon' />
            <Typography variant='h5' component='div' color='#0F2C59'>
              {packageItem.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {packageItem.description}
            </Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 1.5 }} color='text.primary'>
              {formatter.format(packageItem.price_per_month)}
            </Typography>

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
        </Card>
      </Grid>
      <Grid xs={6}>
        <Stack>
          <p
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 20,
            }}
          >
            Thời hạn gói mong muốn
          </p>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <PackageTimeCard
                price={packageItem.price_per_month}
                value='1'
                isSelected={selectedValue === '1'}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={6}>
              <PackageTimeCard
                price={packageItem.price_per_month * 3}
                value='3'
                isSelected={selectedValue === '3'}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={6}>
              <PackageTimeCard
                price={packageItem.price_per_month * 6}
                value='6'
                isSelected={selectedValue === '6'}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={6}>
              <PackageTimeCard
                price={packageItem.price_per_month * 12}
                value='12'
                isSelected={selectedValue === '12'}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Stack padding='12px' spacing={1}>
            <Stack direction='row' spacing={1} justifyContent='flex-end'>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 'normal',
                }}
              >
                Giá gói:
              </p>
              <p
                style={{
                  fontSize: 20,

                  color: '#0F2C59',
                }}
              >
                {formatter.format(packagePrice)}
              </p>
            </Stack>
            <Stack direction='row' spacing={1} justifyContent='flex-end'>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Tổng tiền:
              </p>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#0F2C59',
                }}
              >
                {formatter.format(packagePrice)}
              </p>
            </Stack>
          </Stack>
          <Button
            variant='contained'
            size='small'
            sx={{
              backgroundColor: '#0F2C59', // change color
              borderRadius: '12px', // set border width
              width: '100%',
              padding: '10px 0px',
              marginBottom: '16px',
            }}
            onClick={handleCheckout}
          >
            Mua ngay
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DetailedPackage;
