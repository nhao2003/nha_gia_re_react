import React from 'react';
import CurrentServicePackage from '../component/CurrentServicePackage';

const MordenCurrentPackagePage: React.FC = () => (
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
    <div>
      <CurrentServicePackage
        name='Gói cơ bản'
        expired='Thời điểm hết hạn: 10:03 02/11/2023'
        infoList={[
          { check: true, text: '20 tin đăng/tháng (Hiển thị 14 ngày)' },
          { check: true, text: 'Ưu tiên hiển thị tin' },
          { check: true, text: 'Ưu tiên duyệt tin' },
          { check: false, text: 'Ưu tiên duyệt tin' },
          { check: false, text: 'Huy hiệu xác minh' },
          { check: false, text: 'Ưu tiên chăm sóc khách hàng' },
          { check: false, text: 'Duyệt tin siêu tốc' },
        ]}
      />
    </div>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={() => {}}
        style={{
          width: '100%', // Chiều rộng 50%
          backgroundColor: '#D00000',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '5px',
          height: '50px',
          boxShadow: 'none',
          border: 'none',
          marginLeft: '15px',
          marginRight: '15px',
        }}
      >
        Hủy gói
      </button>
    </div>
  </div>
);

export default MordenCurrentPackagePage;
