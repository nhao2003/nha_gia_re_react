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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
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
          flexDirection: 'column',
          alignItems: 'flex-start',
          background: 'white',
          border: '2px solid #026D4D',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'left',
        }}
      >
        <div>
          <p>Mã giao dịch: ID29204912</p>
          <p>Thời gian giao dịch: 14:26 21/10/2023</p>
          <p>Loại giao dịch: Mua Gói chuyên nghiệp 1 tháng</p>
          <p>Ngày bắt đầu: 14:27 21/10/2023</p>
          <p>Ngày kết thúc: 14:27 21/11/2023</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom: '20px' }}>
        <img src={CircleIcon} alt='Circle Icon' style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <p style={{ color: '#6A6A6A', margin: '0' }}>
          Bạn có thể xem lại giao dịch trong lịch sử giao dịch. Nếu cần giúp đỡ có thể liên hệ qua
          <span style={{ color: '#EB7910', marginLeft: '5px' }}>0987654321</span>
          hoặc
          <span style={{ color: '#EB7910', marginLeft: '5px' }}>abc@abc.com</span>
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
