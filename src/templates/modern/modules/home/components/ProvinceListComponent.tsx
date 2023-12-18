import { Grid, Stack } from '@mui/material';
import { ProvinceComponent } from './ProvinceComponent';

interface Province {
  name: string;
  background: string;
}

const provinceList: Province[] = [
  {
    name: 'Bình Dương',
    background: 'https://ranghammatsaigon.com/wp-content/uploads/2023/05/pho-di-bo-bach-dang-binh-duong.jpg',
  },
  {
    name: 'Hồ Chí Minh',
    background: 'https://picsum.photos/300/300?random=1',
  },
  {
    name: 'Hà Nội',
    background: 'https://picsum.photos/300/300?random=2',
  },
  {
    name: 'Đà Nẵng',
    background: 'https://picsum.photos/300/300?random=3',
  },
  {
    name: 'Nha Trang',
    background: 'https://picsum.photos/300/300?random=4',
  },
  {
    name: 'Đồng Nai',
    background: 'https://picsum.photos/300/300?random=5',
  },
  {
    name: 'Vũng Tàu',
    background: 'https://picsum.photos/300/300?random=6',
  },
  {
    name: 'Cần Thơ',
    background: 'https://picsum.photos/300/300?random=7',
  },
  {
    name: 'Quảng Ninh',
    background: 'https://picsum.photos/300/300?random=8',
  },
  {
    name: 'An Giang',
    background: 'https://picsum.photos/300/300?random=9',
  },
];

const handleProvinceClick = (provinceName: string) => {
  console.log(`Province clicked: ${provinceName}`);
  // Add logic specific to the clicked province
};

export const ProvinceListComponent: React.FC = () => {
  return (
    <Stack alignContent={'center'} justifyContent={'center'} marginTop={2} marginBottom={2}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 10, md: 15 }}>
        {provinceList.map((province, index) => (
          <Grid item xs={2} sm={4} md={3} key={index}>
            <ProvinceComponent
              sx={{
                width: '100%', // Chiều rộng 100% của ô chứa
                height: '100%',
              }}
              province={province.name}
              background={province.background}
              onClick={() => handleProvinceClick(province.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
