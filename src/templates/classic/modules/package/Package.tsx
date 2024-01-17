import { Stack } from '@mui/material';
import React from 'react';
import checkIcon from './../../assets/images/check.svg';
import background from './../../assets/images/package_background.png';
import PackageCard from './components/PackageCard';
import { ApiServiceBuilder } from '../../../../services/api.service';
import { useNavigate } from 'react-router-dom';

const Package = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = React.useState([]);
  const [isSubcribed, setIsSubcribed] = React.useState(false);
  const token = localStorage.getItem('access_token');

  async function fetchPackages() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/membership-package?is_active[eq]=true&page=all')
        .withParams({})
        .build()
        .get();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  async function getCurrentSubcription() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/membership-package/current-subscription')
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .build()
        .get();
      return response.data as any;
    } catch (error) {
      console.log(error);
      return (error as any).response.data;
    }
  }

  React.useEffect(() => {
    fetchPackages()
      .then((data) => {
        console.log(data.result);
        if (data.status === 'success') {
          getCurrentSubcription()
            .then((subData) => {
              console.log(subData.result);
              if (subData.status === 'success') {
                if (subData.result !== null) {
                  setIsSubcribed(true);
                }
              } else {
                console.log(subData.message);
              }
            })
            .catch((error) => console.log(error))
            .finally(() => {
              setPackages(data.result);
            });
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Stack
        sx={{
          backgroundImage: `${background}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          height: 'fit-content',
        }}
        spacing={3}
        alignItems='center'
      >
        <p
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: 20,
          }}
        >
          Lựa chọn gói theo nhu cầu của bạn
        </p>
        <p
          style={{
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Gói đăng tin cho môi giới BĐS chuyên nghiệp
          <br /> đáp ứng mọi nhu cầu cá nhân của bạn
        </p>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <img src={checkIcon} alt='icon' />
            <p
              style={{
                fontSize: 18,
              }}
            >
              Tiết kiệm đến 86% chi phí đăng tin
            </p>
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <img src={checkIcon} alt='icon' />
            <p
              style={{
                fontSize: 18,
              }}
            >
              Thêm kênh thu hút khách hàng có nhu cầu thực
            </p>
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <img src={checkIcon} alt='icon' />
            <p
              style={{
                fontSize: 18,
              }}
            >
              Quản lý kinh doanh và chi tiêu hiệu quả
            </p>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={2}>
          {packages.map((item: any) => (
            <PackageCard key={item.id} packageItem={item} isSubcribed={isSubcribed} />
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default Package;
