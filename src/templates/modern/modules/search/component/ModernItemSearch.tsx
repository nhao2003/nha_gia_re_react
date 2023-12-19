import {
  Box,
  Breadcrumbs,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tab,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import { ListItemFilter } from '../../../../classic/modules/search/components/ListItemFilter';
import { ModernTabPanelSearch } from './ModernTabPanelSearch';

export const ModernItemSearch = () => {
  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const breadcrumbs = [
    <Link underline='hover' key='1' color='inherit' href='/'>
      NhaGiaRe
    </Link>,
    <Typography
      key='3'
      sx={{
        color: CUSTOM_COLOR.black,
      }}
    >
      Mua bán bất động sản
    </Typography>,
  ];

  return (
    <Stack
      justifyContent={'center'}
      alignSelf={'center'}
      marginTop={3}
      marginBottom={3}
      style={{
        objectFit: 'cover',
        width: '100%',
        maxWidth: '1000px',
        minWidth: '390px',
      }}
    >
      <Breadcrumbs separator='›' aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>

      <Typography
        sx={{
          fontSize: '30px',
          color: CUSTOM_COLOR.black,
          marginTop: '10px',
          fontWeight: 'bold',
        }}
      >
        Mua bán bất động sản giá tốt
      </Typography>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box sx={{ width: matches ? '72%' : '98%', typography: 'body1' }}>
          <TabContext value={value}>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='tab dbs'>
                <Tab
                  label='Liên quan'
                  value='1'
                  sx={{
                    textTransform: 'none',
                    fontSize: '18px',
                  }}
                />
                <Tab
                  label='Tin mới nhất'
                  value='2'
                  sx={{
                    textTransform: 'none',
                    fontSize: '18px',
                  }}
                />
              </TabList>
            </Stack>
            <TabPanel value='1'>
              <ModernTabPanelSearch />
            </TabPanel>
            <TabPanel value='2'>
              <ModernTabPanelSearch />
            </TabPanel>
          </TabContext>
        </Box>
        <Stack
          direction={'column'}
          sx={{
            width: '25%',
            display: matches ? 'inherit' : 'none',
          }}
          spacing={2}
        >
          <Stack
            direction={'column'}
            sx={{
              border: '1px solid',
              borderColor: CUSTOM_COLOR.grayNobel,
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Loại bất động sản
            </Typography>
            <List disablePadding>
              <ListItemFilter title='Căn hộ/Chung cư' />
              <ListItemFilter title='Nhà ở' />
              <ListItemFilter title='Đất' />
              <ListItemFilter title='Văn phòng/Mặt bằng kinh doanh' />
            </List>
          </Stack>

          <Stack
            direction={'column'}
            sx={{
              border: '1px solid',
              borderColor: CUSTOM_COLOR.grayNobel,
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Khu vực
            </Typography>
            <List disablePadding>
              <ListItemFilter title='TP. Hồ Chí Minh' />
              <ListItemFilter title='Hà Nội' />
              <ListItemFilter title='Đà Nẵng' />
              <ListItemFilter title='Cần Thơ' />
              <ListItemFilter title='Bình Dương' />
              <ListItemFilter title='An Giang' />
              <ListItemFilter title='Đồng Nai' />
              <ListItemFilter title='Bà Rịa - Vũng Tàu' />

              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary='Xem thêm'
                  primaryTypographyProps={{
                    fontSize: '17px',
                    color: CUSTOM_COLOR.primary,
                    fontWeight: 'bold',
                  }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </List>
          </Stack>

          <Stack
            direction={'column'}
            sx={{
              border: '1px solid',
              borderColor: CUSTOM_COLOR.grayNobel,
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Khoảng giá
            </Typography>
            <List disablePadding>
              <ListItemFilter title='Thỏa thuận' />
              <ListItemFilter title='Dưới 500 triệu' />
              <ListItemFilter title='500 triệu - 1 tỷ' />
              <ListItemFilter title='1 - 2 tỷ' />
              <ListItemFilter title='2 - 3 tỷ' />
              <ListItemFilter title='3 - 5 tỷ' />
              <ListItemFilter title='5 - 7 tỷ' />
              <ListItemFilter title='7 - 10 tỷ' />
              <ListItemFilter title='10 - 20 tỷ' />
              <ListItemFilter title='20 - 40 tỷ' />
              <ListItemFilter title='40 - 60 tỷ' />
              <ListItemFilter title='Trên 60 tỷ' />
            </List>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
