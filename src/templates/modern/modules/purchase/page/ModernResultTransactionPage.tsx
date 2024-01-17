import React from 'react';
import SuccessIcon from '../../../assets/images/success_transaction.svg';
import FailIcon from '../../../assets/images/fail_transaction.svg';
import CircleIcon from '../../../assets/images/exclamation-circle.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import type ITransaction from '../../../../../models/interfaces/ITransaction';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { formatDateTime, formatMoney } from '../../../../../services/fortmat.service';
import AuthService from '../../../../../services/auth.service';

const ModernResultTransactionPage: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  // http://localhost:3000/purchase/result/c4ce2968-8941-4c18-8a2d-3d2b3e1c16b9?amount=100000&appid=2554&apptransid=240115_4933404831340&bankcode=&checksum=c0e0349e4335743ec7b52c7dbf2da18a2e3e57d1efecf6efba30e91b813ebc50&discountamount=0&pmcid=38&status=1
  const id = useLocation().pathname.split('/')[3];
  const amount = parseInt(useLocation().search.split('&')[0].split('=')[1]);
  const status = useLocation().search.split('&')[6].split('=')[1] === '1';

  // get data from api
  const [packages, setPackages] = React.useState<{
    numOfPages: number;
    packages: ITransaction[];
  }>({ numOfPages: 1, packages: [] });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(true);
  const [transactionStatus, setTransactionStatus] = React.useState<string>('');
  // const transactionStatus = isSuccess ? 'Giao dịch thành công' : 'Giao dịch không thành công';

  async function fetchTransaction() {
    // Fake delay
    const accessToken = await AuthService.getInstance().getAccessToken();
    if (accessToken === null) {
      throw new Error('Bạn chưa đăng nhập');
    }
    console.log(`/transactions?id[eq]='${id}'`);
    const query = new ApiServiceBuilder()
      .withUrl(`/membership-package/transactions?id[eq]='${id}'`)
      .withHeaders({ Authorization: `Bearer ${accessToken}` })
      .build();
    const response = await query.get();
    return response.data as any;
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetchTransaction()
      .then((response) => {
        console.log(response);
        setPackages({
          numOfPages: response.num_of_pages,
          packages: response.result,
        });
        if (response.result.length !== 0) {
          setIsSuccess(response.result[0].status === 'paid');
          setTransactionStatus(isSuccess ? 'Giao dịch thành công' : 'Giao dịch không thành công');
        } else {
          setIsSuccess(status);
          setTransactionStatus(status ? 'Giao dịch thành công' : 'Giao dịch không thành công');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function addMonthsToDate(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  return isLoading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <CircularProgress />
    </div>
  ) : (
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
        Kết quả giao dịch
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>

      {packages.packages.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={isSuccess ? SuccessIcon : FailIcon}
            alt='Transaction Icon'
            style={{ width: '250px', height: '250px' }}
          />
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black', margin: '0' }}>{transactionStatus}</p>
          <p
            style={{
              fontSize: '1.2em',
              fontWeight: 'bold',
              color: isSuccess ? '#026D4D' : '#FF3E3E',
              marginTop: '5px',
            }}
          >
            {formatMoney(amount)}
          </p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
            <img
              src={isSuccess ? SuccessIcon : FailIcon}
              alt='Transaction Icon'
              style={{ width: '250px', height: '250px' }}
            />
            <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black', margin: '0' }}>{transactionStatus}</p>
            <p
              style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: isSuccess ? '#026D4D' : '#FF3E3E',
                marginTop: '5px',
              }}
            >
              {formatMoney(packages.packages[0].amount)}
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
              <p>{packages.packages[0].id}</p>
              <p>{formatDateTime(new Date(packages.packages[0].timestamp))}</p>
              <p>
                Mua {packages.packages[0].package.name} {packages.packages[0].num_of_subscription_month} tháng
              </p>
              <p>{formatDateTime(new Date(packages.packages[0].timestamp))}</p>
              <p>
                {formatDateTime(
                  new Date(
                    addMonthsToDate(packages.packages[0].timestamp, packages.packages[0].num_of_subscription_month),
                  ),
                )}
              </p>
            </div>
          </div>
        </>
      )}

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
            navigate(`/`);
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
