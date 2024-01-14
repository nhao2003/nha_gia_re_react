import React, { useState } from 'react';

const ModernHistoryTransactionPage: React.FC = () => {
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
        Lịch sử giao dịch
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>
    </div>
  );
};

export default ModernHistoryTransactionPage;
