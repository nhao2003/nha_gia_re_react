import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import checkIcon from '../../../assets/images/check.svg';
import packageIcon from '../../../assets/images/package_icon.svg';
import { useNavigate } from 'react-router-dom';

const item = [
  '10 tin đăng - Hiển thị 14 ngày',
  'Hiển thị tối đa 30 tin đăng',
  'Báo cáo hiệu suất tin đăng',
  'Thêm kênh liên hệ mới',
  'Công cụ quản lý khách hàng tiềm năng',
  'Ưu đãi nâng cấp lên tin nổi bật nhiều hình ảnh',
  'Duyệt tin nhanh dưới 5 phút',
];

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

          {item.map((item) => (
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
                {item}
              </p>
            </Stack>
          ))}
        </CardContent>
      </React.Fragment>
    </Card>
  );
};

export default PackageCard;
