import React from 'react';
import CurrentServicePackage from '../component/CurrentServicePackage';
import AuthService from '../../../../../services/auth.service';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import type IMembershipPackage from '../../../../../models/interfaces/IMembershipPackage';
import type ISubscription from '../../../../../models/interfaces/ISubscription';
import { formatDateTime } from '../../../../../services/fortmat.service';
import { useMediaQuery, useTheme } from '@mui/material';

const MordenCurrentPackagePage: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // get current package
  const [curPackage, setCurPackage] = React.useState<ISubscription | null>(null);

  async function fetchMemberPackage() {
    const accessToken = await AuthService.getInstance().getAccessToken();
    if (accessToken === null) {
      throw new Error('Bạn chưa đăng nhập');
    }
    const query = new ApiServiceBuilder()
      .withUrl('/membership-package/current-subscription')
      .withHeaders({ Authorization: `Bearer ${accessToken}` })
      .build();
    const response = await query.get();
    return response.data as any;
  }

  function handleGetmenberShip() {
    setIsLoading(true);
    fetchMemberPackage()
      .then((response) => {
        setCurPackage(response.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    handleGetmenberShip();
  }, []);

  // unsubsribe
  async function unSubscribe() {
    const accessToken = await AuthService.getInstance().getAccessToken();
    if (accessToken === null) {
      throw new Error('Bạn chưa đăng nhập');
    }
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/membership-package/unsubscribe')
        .withHeaders({ Authorization: `Bearer ${accessToken}` })
        .build()
        .post();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  async function handleUnsubsribe() {
    setIsLoading(true);
    await unSubscribe()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
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
        Gói hiện tại
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>
      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading...
        </div>
      ) : curPackage !== null ? (
        <div>
          <CurrentServicePackage
            name={curPackage.membership_package.name}
            expired={`Thời điểm hết hạn: ${formatDateTime(new Date(curPackage.expiration_date))}`}
            infoList={[
              {
                check: true,
                text: `${curPackage.membership_package.monthly_post_limit} tin đăng/tháng (Hiển thị 14 ngày)`,
              },
              { check: true, text: 'Huy hiệu xác minh' },
              { check: curPackage.membership_package.display_priority_point > 0, text: 'Ưu tiên hiển thị tin' },
              { check: curPackage.membership_package.post_approval_priority_point > 0, text: 'Ưu tiên duyệt tin' },
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => {
                void (async () => {
                  await handleUnsubsribe();
                  handleGetmenberShip();
                })();
              }}
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
      ) : (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            fontWeight: 'bold',
            color: '#026D4D',
            fontSize: '1.5em',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Bạn chưa đăng ký gói dịch vụ nào
        </div>
      )}
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default MordenCurrentPackagePage;
