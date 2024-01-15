import React, { useState } from 'react';
import { Grid, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TermPackage {
  id: string;
  label: string;
  price: string;
}

const MordenChoosePackagePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/purchase/result');
  };

  const [selectedTerm, setSelectedTerm] = useState<string>('1-month');
  const [selectedPackagePrice, setSelectedPackagePrice] = useState<number>(360000);

  const termPackages: TermPackage[] = [
    { id: '1-month', label: 'Gói 1 tháng', price: '360.000đ' },
    { id: '3-month', label: 'Gói 3 tháng', price: '960.000đ' },
    { id: '6-month', label: 'Gói 6 tháng', price: '360.000đ' },
    { id: '12-month', label: 'Gói 12 tháng', price: '960.000đ' },
  ];

  // Cập nhật giá tiền và tổng tiền khi chọn Radio button
  const handleTermChange = (term: TermPackage) => {
    setSelectedTerm(term.id);
    setSelectedPackagePrice(parseInt(term.price.replace(/\D/g, ''), 10));
  };

  // Giảm giá
  const discount = 160000;

  // Tổng tiền
  const totalAmount = selectedPackagePrice - discount;

  return (
    <div style={{ textAlign: 'center', margin: '0 20%' }}>
      <div
        style={{
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#026D4D',
          fontSize: '1.5em',
          textAlign: 'left',
          marginLeft: '20px',
          marginRight: '20px',
        }}
      >
        Gói hiện tại
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
        <p style={{ fontSize: '1.2em' }}>Giá gói: {selectedPackagePrice}đ</p>
        <p style={{ fontSize: '1.2em' }}>Giảm giá: -{discount}đ</p>
        <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#026D4D' }}>Tổng tiền: {totalAmount}đ</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            handleClick();
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
