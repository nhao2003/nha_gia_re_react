import React from 'react';
import CreditRedIcon from '../../../assets/images/credit-card-red.svg';
import CreditGreenIcon from '../../../assets/images/credit-card-green.svg';

const ModernHistoryTransactionPage: React.FC = () => {
  // Mô phỏng dữ liệu lịch sử giao dịch với trạng thái true hoặc false
  const transactionHistory = [
    { id: 1, package: 'Gói doanh nghiệp 12 tháng', time: '14:29 21/10/2023', amount: '14.400.000đ', status: true },
    { id: 2, package: 'Gói cá nhân 6 tháng', time: '16:45 21/10/2023', amount: '7.200.000đ', status: false },
    // Thêm các mục khác nếu cần
  ];

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

      {transactionHistory.map((transaction) => (
        <div
          key={transaction.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: '8px',
            textAlign: 'left',
            border: '1px solid #3E3E3E', // Viền màu 6A6A6A
            margin: '0 20px',
            marginBottom: '20px',
            padding: '0 20px',
          }}
        >
          <img
            src={transaction.status ? CreditGreenIcon : CreditRedIcon}
            alt='Credit Icon'
            style={{
              width: '30px',
              height: '30px',
              marginRight: '10px',
            }}
          />
          <div style={{ flex: '1' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '2px', color: transaction.status ? '#026D4D' : '#D00000' }}>
              {transaction.package}
            </p>
            <p style={{ margin: '0', marginBottom: '15px' }}>{`Thời gian giao dịch: ${transaction.time}`}</p>
          </div>
          <p style={{ fontWeight: 'bold', color: '#EB7910' }}>{transaction.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default ModernHistoryTransactionPage;
