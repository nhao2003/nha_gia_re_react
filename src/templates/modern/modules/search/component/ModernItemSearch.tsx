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
import React, { useEffect } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import { ListItemFilter } from '../../../../classic/modules/search/components/ListItemFilter';
import { ModernTabPanelSearch } from './ModernTabPanelSearch';
import type RealEstatePost from '../../../../../models/RealEstatePost';

interface ModernItemSearchProps {
  posts: RealEstatePost[];
  numOfPages: number;
  onPageChange: (page: number) => void;
  isLease: boolean;
  onIsLeaseChange?: (isLease: boolean) => void;
  isLoading: boolean;
}

export const ModernItemSearch = (props: ModernItemSearchProps) => {
  const { posts, numOfPages } = props;

  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (props.onIsLeaseChange !== undefined) {
      props.onIsLeaseChange(newValue === '1');
    }
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

  useEffect(() => {
    console.log(posts);
  }, [posts]);

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
        <Box sx={{ width: matches ? '100%' : '98%', typography: 'body1' }}>
          <TabContext value={props.isLease ? '1' : '2'}>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='tab dbs'>
                <Tab
                  label='Cho thuê'
                  value='1'
                  sx={{
                    textTransform: 'none',
                    fontSize: '18px',
                  }}
                />
                <Tab
                  label='Mua bán'
                  value='2'
                  sx={{
                    textTransform: 'none',
                    fontSize: '18px',
                  }}
                />
              </TabList>
            </Stack>
            <TabPanel value='1'>
              <ModernTabPanelSearch
                posts={posts}
                numOfPages={numOfPages}
                currentPage={0}
                onPageChange={(page) => {
                  props.onPageChange(page);
                }}
                isLoading={props.isLoading}
              />
            </TabPanel>
            <TabPanel value='2'>
              <ModernTabPanelSearch
                posts={posts}
                numOfPages={numOfPages}
                currentPage={0}
                onPageChange={(page) => {
                  props.onPageChange(page);
                }}
                isLoading={props.isLoading}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </Stack>
  );
};
