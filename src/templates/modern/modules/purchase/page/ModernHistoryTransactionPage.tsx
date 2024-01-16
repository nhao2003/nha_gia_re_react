import React from 'react';
import CreditRedIcon from '../../../assets/images/credit-card-red.svg';
import CreditGreenIcon from '../../../assets/images/credit-card-green.svg';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import AuthService from '../../../../../services/auth.service';
import type ITransaction from '../../../../../models/interfaces/ITransaction';
import { formatDateTime, formatMoney } from '../../../../../services/fortmat.service';
import { useMediaQuery, useTheme } from '@mui/material';

const ModernHistoryTransactionPage: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  // get data from api
  const [packages, setPackages] = React.useState<{
    numOfPages: number;
    packages: ITransaction[];
  }>({ numOfPages: 1, packages: [] });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function fetchTransaction() {
    // Fake delay
    const accessToken = await AuthService.getInstance().getAccessToken();
    if (accessToken === null) {
      throw new Error('Bạn chưa đăng nhập');
    }
    const query = new ApiServiceBuilder()
      .withUrl(`/membership-package/transactions?is_active[eq]=true&orders=-timestamp&status[eq]='paid'`)
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
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Mô phỏng dữ liệu lịch sử giao dịch với trạng thái true hoặc false
  const transactionHistory = [
    { id: 1, package: 'Gói doanh nghiệp 12 tháng', time: '14:29 21/10/2023', amount: '14.400.000đ', status: true },
    { id: 2, package: 'Gói cá nhân 6 tháng', time: '16:45 21/10/2023', amount: '7.200.000đ', status: false },
    // Thêm các mục khác nếu cần
  ];

  return isLoading ? (
    <div style={{ textAlign: 'center' }}>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
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
        }}
      >
        Lịch sử giao dịch
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>

      {packages.packages.map((transaction) => (
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
            src={transaction.status === 'paid' ? CreditGreenIcon : CreditRedIcon}
            alt='Credit Icon'
            style={{
              width: '30px',
              height: '30px',
              marginRight: '10px',
            }}
          />
          <div style={{ flex: '1' }}>
            <p
              style={{
                fontWeight: 'bold',
                marginBottom: '2px',
                color: transaction.status === 'paid' ? '#026D4D' : '#D00000',
              }}
            >
              {transaction.package.name}
            </p>
            <p
              style={{ margin: '0', marginBottom: '15px' }}
            >{`Thời gian giao dịch: ${formatDateTime(new Date(transaction.timestamp))}`}</p>
          </div>
          <p style={{ fontWeight: 'bold', color: '#EB7910' }}>{formatMoney(transaction.amount)}</p>
        </div>
      ))}
    </div>
  );
};

export default ModernHistoryTransactionPage;
