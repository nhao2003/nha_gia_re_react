import React, { useState } from 'react';
import { Grid, Radio, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import type IMembershipPackage from '../../../../../models/interfaces/IMembershipPackage';
import { formatMoney } from '../../../../../services/fortmat.service';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import AuthService from '../../../../../services/auth.service';

interface TermPackage {
  id: string;
  label: string;
  price: string;
}

const MordenChoosePackagePage: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [curPackage, setCurPackage] = React.useState<IMembershipPackage>(useLocation().state as IMembershipPackage);
  const id = useLocation().pathname.split('/')[3];

  async function createOrderRequest() {
    const userId = AuthService.getInstance().getUserIdFromToken();
    const numOfMonths = selectedTerm.split('-')[0];
    const redirectUrl = 'http://localhost:3000/purchase/result/:id';
    console.log(userId, id, numOfMonths, redirectUrl);
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/membership-package/check-out')
        .withBody({
          user_id: userId,
          membership_package_id: id,
          num_of_subscription_month: numOfMonths,
          redirect_url: redirectUrl,
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

  const [selectedTerm, setSelectedTerm] = useState<string>('1-month');
  const [selectedPackagePrice, setSelectedPackagePrice] = useState<number>(curPackage.price_per_month);

  const termPackages: TermPackage[] = [
    { id: '1-month', label: 'Gói 1 tháng', price: `${formatMoney(curPackage.price_per_month)}` },
    { id: '3-month', label: 'Gói 3 tháng', price: `${formatMoney(curPackage.price_per_month * 3)}` },
    { id: '6-month', label: 'Gói 6 tháng', price: `${formatMoney(curPackage.price_per_month * 6)}` },
    { id: '12-month', label: 'Gói 12 tháng', price: `${formatMoney(curPackage.price_per_month * 12)}` },
  ];

  // Cập nhật giá tiền và tổng tiền khi chọn Radio button
  const handleTermChange = (term: TermPackage) => {
    setSelectedTerm(term.id);
    setSelectedPackagePrice(parseInt(term.price.replace(/\D/g, ''), 10));
  };

  // Giảm giá
  const discount = 0;

  // Tổng tiền
  const totalAmount = selectedPackagePrice - discount;

  return (
    <div style={{ textAlign: 'center', margin: matches ? '0 10px' : '0 20%' }}>
      <div
        style={{
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#026D4D',
          fontSize: '1.5em',
          textAlign: 'left',
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: '20px',
        }}
      >
        {curPackage.name}
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>
      <Grid container spacing={2}>
        {termPackages.map((term) => (
          <Grid item xs={6} key={term.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                border: '2px solid #026D4D',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Radio
                checked={selectedTerm === term.id}
                onChange={() => handleTermChange(term)}
                color='primary'
                style={{ color: '#026D4D' }} // Màu của Radio
              />
              <div style={{ marginLeft: '10px', textAlign: 'left' }}>
                <p style={{ marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>{term.label}</p>
                <p style={{ margin: '0', color: '#026D4D', fontWeight: 'normal', textAlign: 'left' }}>{term.price}</p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Thêm 3 text align bên phải */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <p style={{ fontSize: '1.2em' }}>Giá gói: {formatMoney(selectedPackagePrice)}</p>
        {/* <p style={{ fontSize: '1.2em' }}>Giảm giá: -{formatMoney(discount)}</p> */}
        <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#026D4D' }}>Tổng tiền: {formatMoney(totalAmount)}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            handleCheckout();
          }}
          style={{
            width: '100%',
            backgroundColor: '#026D4D',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '5px',
            height: '50px',
            boxShadow: 'none',
            border: 'none',
          }}
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default MordenChoosePackagePage;
