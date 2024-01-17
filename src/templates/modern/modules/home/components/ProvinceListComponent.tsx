import { Grid, Stack, useMediaQuery } from '@mui/material';
import { ProvinceComponent } from './ProvinceComponent';
import { useNavigate } from 'react-router-dom';

interface Province {
  name: string;
  background: string;
  code: number;
}

const provinceList: Province[] = [
  {
    name: 'Bình Dương',
    background: 'https://ranghammatsaigon.com/wp-content/uploads/2023/05/pho-di-bo-bach-dang-binh-duong.jpg',
    code: 74,
  },
  {
    name: 'Hồ Chí Minh',
    background:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/DJI_0550-HDR-Pano.jpg/1200px-DJI_0550-HDR-Pano.jpg',
    code: 79,
  },
  {
    name: 'Hà Nội',
    background: 'https://owa.bestprice.vn/images/destinations/uploads/trung-tam-thanh-pho-ha-noi-603da1f235b38.jpg',
    code: 1,
  },
  {
    name: 'Đà Nẵng',
    background:
      'https://www.vietnamairlines.com/~/media/Images/Discovery/Vietnam/DANANG/Hoat%20dong/484x308/Danang_hoatdong3_968x616.jpg',
    code: 48,
  },
  {
    name: 'Khánh Hòa',
    background:
      'https://static1.cafeland.vn/cafelandnew/hinh-anh/2022/03/24/135/Khanh-Hoa-se-len-thanh-pho-truc-thuoc-trung-uong.jpg',
    code: 56,
  },
  {
    name: 'Đồng Nai',
    background:
      'https://i1-vnexpress.vnecdn.net/2022/03/05/long-khanh-jpeg-7023-1646479981.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=6PcjCCvM0GgY1aj8E2wMTg',
    code: 75,
  },
  {
    name: 'Vũng Tàu',
    background: 'https://zatida.com/wp-content/uploads/2018/09/thanh-pho-vung-tau-thuoc-tinh-nao-1.jpg',
    code: 77,
  },
  {
    name: 'Cần Thơ',
    background: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Can-tho-tuonglamphotos.jpg',
    code: 92,
  },
  {
    name: 'Quảng Ninh',
    background: 'https://dulichkhatvongviet.com/wp-content/uploads/2022/05/quang-ninh.jpg',
    code: 22,
  },
  {
    name: 'An Giang',
    background: 'https://photo-mekongasean.epicdn.me/w825/Uploaded/2024/bpiwvoiv/2023_08_11/14092022-1-5681.jpg',
    code: 89,
  },
];

export const ProvinceListComponent: React.FC = () => {
  const navigate = useNavigate();
  const handleProvinceClick = (provinceCode: number) => {
    navigate(`/search/province`, {
      state: provinceCode,
    });
  };

  return (
    <Stack alignItems={'center'} alignContent={'center'} justifyContent={'center'} marginTop={2} marginBottom={2}>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 5, sm: 10, md: 15 }} sx={{ justifyContent: 'center' }}>
        {provinceList.map((province, index) => (
          <Grid item xs={5} sm={5} md={3} lg={3} key={index} sx={{ textAlign: 'center' }}>
            <ProvinceComponent
              sx={{
                width: '100%', // Chiều rộng 100% của ô chứa
                height: '100%',
              }}
              province={province.name}
              background={province.background}
              onClick={() => handleProvinceClick(province.code)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
