import React from 'react';
import ServicePackage from '../component/ServicePackage';
import { useNavigate } from 'react-router-dom';

const ModernPackageListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/purchase/choose-package');
  };

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
        Danh sách các gói dịch vụ
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>
      <div>
        <ServicePackage
          name='Gói cơ bản'
          price='50K'
          description='Giải pháp tiết kiệm dành cho môi giới mới vào nghề'
          infoList={[
            { check: true, text: '20 tin đăng/tháng (Hiển thị 14 ngày)' },
            { check: true, text: 'Ưu tiên hiển thị tin' },
            { check: true, text: 'Ưu tiên duyệt tin' },
            { check: false, text: 'Ưu tiên duyệt tin' },
            { check: false, text: 'Huy hiệu xác minh' },
            { check: false, text: 'Ưu tiên chăm sóc khách hàng' },
            { check: false, text: 'Duyệt tin siêu tốc' },
          ]}
          onButtonClick={() => {
            // Xử lý khi button được click
            handleClick();
          }}
        />
        <ServicePackage
          name='Gói tiêu chuẩn'
          price='100K'
          description='Giải pháp tiết kiệm dành cho môi giới mới vào nghề'
          infoList={[
            { check: false, text: 'Thông tin 4' },
            { check: true, text: 'Thông tin 5' },
            { check: false, text: 'Thông tin 6' },
          ]}
          onButtonClick={() => {
            // Xử lý khi button được click
            handleClick();
          }}
        />
        <ServicePackage
          name='Gói cao cấp'
          price='200K'
          description='Giải pháp tiết kiệm dành cho môi giới mới vào nghề'
          infoList={[
            { check: true, text: 'Thông tin 7' },
            { check: false, text: 'Thông tin 8' },
            { check: true, text: 'Thông tin 9' },
          ]}
          onButtonClick={() => {
            // Xử lý khi button được click
            handleClick();
          }}
        />
      </div>
    </div>
  );
};

export default ModernPackageListPage;
