import React from 'react';
import SuccessIcon from '../../../assets/images/success_transaction.svg';
import FailIcon from '../../../assets/images/fail_transaction.svg';
import CircleIcon from '../../../assets/images/exclamation-circle.svg';

const ModernResultTransactionPage: React.FC<{ isSuccess: boolean }> = ({ isSuccess }) => {
  const transactionStatus = isSuccess ? 'Giao dịch thành công' : 'Giao dịch không thành công';
  const transactionAmount = '720.000 VNĐ';

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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
        <img
          src={isSuccess ? SuccessIcon : FailIcon}
          alt='Transaction Icon'
          style={{ width: '250px', height: '250px' }}
        />
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black', margin: '0' }}>{transactionStatus}</p>
        <p
          style={{ fontSize: '1.2em', fontWeight: 'bold', color: isSuccess ? '#026D4D' : '#FF3E3E', marginTop: '5px' }}
        >
          {transactionAmount}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          background: '#F6F6F6',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'left',
          alignItems: 'center', // Căn giữa theo chiều dọc
          justifyContent: 'center', // Căn giữa theo chiều ngang
          maxWidth: '450px', // Điều chỉnh giá trị maxWidth tùy vào nhu cầu của bạn
          margin: '0 auto', // Để căn giữa theo chiều ngang
          marginBottom: '20px',
        }}
      >
        <div style={{ flex: '1', color: '#959BA0' }}>
          <p>Mã giao dịch:</p>
          <p>Thời gian giao dịch:</p>
          <p>Loại giao dịch:</p>
          <p>Ngày bắt đầu:</p>
          <p>Ngày kết thúc:</p>
        </div>
        <div style={{ flex: '1.5', color: '#2B3641' }}>
          <p>ID29204912</p>
          <p>14:26 21/10/2023</p>
          <p>Mua Gói chuyên nghiệp 1 tháng</p>
          <p>14:27 21/10/2023</p>
          <p>14:27 21/11/2023</p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          textAlign: 'left',
          margin: '0 auto', // Để căn giữa theo chiều ngang
          maxWidth: '600px', // Điều chỉnh giá trị maxWidth tùy vào nhu cầu của bạn
          marginBottom: '20px',
        }}
      >
        <img src={CircleIcon} alt='Circle Icon' style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <p style={{ color: 'black', margin: '0' }}>
          Bạn có thể xem lại giao dịch trong lịch sử giao dịch. Nếu cần giúp đỡ có thể liên hệ qua{' '}
          <span style={{ color: '#EB7910' }}>0987654321 </span>
          hoặc
          <span style={{ color: '#EB7910' }}> abc@abc.com</span>
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            // Xử lý khi nhấn nút Quay lại
          }}
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: '#4A5568',
            fontWeight: 'bold',
            borderRadius: '5px',
            height: '50px',
            boxShadow: 'none',
            border: '2px solid #4A5568',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ModernResultTransactionPage;
