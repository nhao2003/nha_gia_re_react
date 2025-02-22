import React from 'react';
import ServicePackage from '../component/ServicePackage';
import { useNavigate } from 'react-router-dom';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import type IMembershipPackage from '../../../../../models/interfaces/IMembershipPackage';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { formatMoney } from '../../../../../services/fortmat.service';
import AuthService from '../../../../../services/auth.service';
import type ISubscription from '../../../../../models/interfaces/ISubscription';

const ModernPackageListPage: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const handleClick = (pack: IMembershipPackage) => {
    navigate(`/purchase/choose-package/${pack.id}`, {
      state: pack,
    });
  };

  // get data from api
  const [packages, setPackages] = React.useState<{
    numOfPages: number;
    packages: IMembershipPackage[];
  }>({ numOfPages: 1, packages: [] });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ?? '1';
  async function fetchMemberPackage() {
    // Fake delay
    const query = new ApiServiceBuilder()
      .withUrl('/membership-package')
      .withParams({
        page: page,
      })
      .build();
    const response = await query.get();
    return response.data as any;
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetchMemberPackage()
      .then((response) => {
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
    handleGetmenberShip();
  }, [page]);

  // get current package
  const [curPackage, setCurPackage] = React.useState<ISubscription | null>(null);

  async function fetchCurrentPackage() {
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
    fetchCurrentPackage()
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

  return isLoading ? (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
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
        Danh sách các gói dịch vụ
        <hr style={{ width: '100%', border: '2px solid #026D4D' }} />
      </div>
      <div>
        {packages.packages.map((item, index) =>
          item.is_active ? (
            <ServicePackage
              key={index}
              name={item.name}
              price={formatMoney(item.price_per_month)}
              description={item.description}
              canBuy={curPackage === null}
              infoList={[
                { check: true, text: `${item.monthly_post_limit} tin đăng/tháng (Hiển thị 14 ngày)` },
                { check: true, text: 'Huy hiệu xác minh' },
                { check: item.display_priority_point > 0, text: 'Ưu tiên hiển thị tin' },
                { check: item.post_approval_priority_point > 0, text: 'Ưu tiên duyệt tin' },
              ]}
              onButtonClick={() => {
                // Xử lý khi button được click
                handleClick(item);
              }}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default ModernPackageListPage;
