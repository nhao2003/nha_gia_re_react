import React, { useState } from 'react';
import SuccessIcon from '../../../assets/images/success_transaction.svg';
import FailIcon from '../../../assets/images/fail_transaction.svg';

const ModernResultTransactionPage: React.FC = () => {
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
        Kết quả giao dịch
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {}}
          style={{
            width: '100%', // Chiều rộng 50%
            backgroundColor: 'white',
            color: '#4A5568',
            fontWeight: 'bold',
            borderRadius: '5px',
            height: '50px',
            boxShadow: 'none',
            border: '2px solid #4A5568',
            marginLeft: '15px',
            marginRight: '15px',
          }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ModernResultTransactionPage;
