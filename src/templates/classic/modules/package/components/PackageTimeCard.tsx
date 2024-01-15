import { Button, Card, CardActions, CardContent, Radio, Typography } from '@mui/material';
import React from 'react';

const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

interface PackageTimeCardProps {
  value?: any;
  price?: any;
  isSelected: boolean;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
}

const PackageTimeCard: React.FC<PackageTimeCardProps> = ({ price, value, isSelected, onChange }) => {
  return (
    <Card
      variant='outlined'
      sx={{
        border: '2px solid #0F2C59',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <CardActions>
        <Radio
          checked={isSelected}
          onChange={onChange}
          value={value}
          name='radio-buttons'
          sx={{
            '&.Mui-checked': {
              color: '#0F2C59', // color when checked
            },
          }}
        />
      </CardActions>
      <CardContent>
        <Typography variant='body1'>Gói {value} tháng</Typography>
        <Typography variant='h5' component='div' color='#0F2C59'>
          {formatter.format(price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PackageTimeCard;
