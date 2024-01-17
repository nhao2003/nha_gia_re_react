import React from 'react';
import SuccessIcon from '../../assets/images/Success-Ilustrations.svg';
import FailIcon from '../../assets/images/Fail-Ilustrations.svg';
import CircleIcon from '../../assets/images/CircleIcon.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiServiceBuilder } from '../../../../services/api.service';

const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

const PaymentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { id } = useParams();

  const status = queryParams.get('status');

  const isSuccess = Number(status) === 1;
  const transactionStatus = isSuccess ? 'Giao dịch thành công' : 'Giao dịch không thành công';

  const [transaction, setTransaction] = React.useState<any>({});
  const [name, setName] = React.useState('');

  async function fetchTransaction() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl(`/membership-package/transactions?id[eq]='${id}'`)
        .withHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        })
        .build()
        .get();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  const date = new Date(transaction.timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const endMonth = (date.getMonth() + 1 + transaction.num_of_subscription_month).toString().padStart(2, '0'); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
  const formattedEndDate = `${hours}:${minutes} ${day}/${endMonth}/${year}`;

  React.useEffect(() => {
    fetchTransaction()
      .then((data) => {
        console.log(data.result[0]);
        if (data.status === 'success') {
          setTransaction(data.result[0]);
          setName(data.result[0].package.name);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '0 20%' }}>
      <div
        style={{
          marginTop: '30px',
          marginBottom: '10px',
          fontWeight: 'bold',
          color: '#0F2C59',
          fontSize: '1.5em',
          textAlign: 'center',
          marginLeft: '20px',
          marginRight: '20px',
        }}
      >
        Kết quả giao dịch
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
          {formatter.format(Number(transaction.amount))}
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
          <p>{transaction.app_trans_id}</p>
          <p>{formattedDate}</p>
          <p>Mua {name + ' ' + transaction.num_of_subscription_month} tháng</p>
          <p>{isSuccess ? formattedDate : 'Không tồn tại'}</p>
          <p>{isSuccess ? formattedEndDate : 'Không tồn tại'}</p>
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
            navigate('/');
          }}
          style={{
            width: '450px',
            backgroundColor: 'white',
            color: '#4A5568',
            fontWeight: 'bold',
            borderRadius: '5px',
            height: '50px',
            boxShadow: 'none',
            border: '2px solid #4A5568',
            marginLeft: '20px',
            marginRight: '20px',
            cursor: 'pointer',
          }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;
