import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { Button, Card, CircularProgress, Grid, Stack } from '@mui/material';
import PostCard from './components/PostCard';
import type RealEstatePost from '../../../../models/RealEstatePost';
import PostService from '../../../../services/post.service';
import CUSTOM_COLOR from '../../constants/colors';


async function getPost(status?: 'approved' | 'pending' | 'rejected' | 'expired', page: number = 1) {
  const queryParams: Record<string, any> = {
    'post_status[eq]': `'${status}'`,
  };
  if (status === 'expired') {
    queryParams['post_expiry_date[lt]'] = `'${new Date().toISOString()}'`;
  } else if (status !== 'approved') {
    queryParams['post_expiry_date[gt]'] = `'${new Date().toISOString()}'`;
  }
  return await PostService.getInstance().getAllPosts(
    {
      page,
      queryParams: {
        'post_status[eq]': `'${status}'`,
        ...queryParams,
      },
    }
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

interface PaginationProps {
  page: number;
  numOfPages: number;
  data: RealEstatePost[];
}

export default function PostManagement() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const [isLoading, setIsLoading] = React.useState(false);


  function handleGetPost(type: 'approved' | 'pending' | 'rejected' | 'expired', page: number = 1) {
    setIsLoading(true);
    getPost(type, page).then((res) => {
      const data = res.result as RealEstatePost[];
      console.log(res);
      const numOfPages = Number(res.num_of_pages);
      switch (type) {
        case 'approved':
          setApprovedPagination({
            page,
            numOfPages,
            data: [...approvedPagination.data, ...data],
          });
          break;
        case 'pending':
          setPendingPagination({
            page,
            numOfPages,
            data: [...pendingPagination.data, ...data],
          });
          break;
        case 'rejected':
          setRejectedPagination({
            page,
            numOfPages,
            data: [...rejectedPagination.data, ...data],
          });
          break;
        case 'expired':
          setExpiredPagination({
            page,
            numOfPages,
            data: [...expiredPagination.data, ...data],
          });
          break;
      }
    }).catch((err) => {
      alert(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }
  const [approvedPagination, setApprovedPagination] = React.useState<PaginationProps>({
    page: 1,
    numOfPages: 1,
    data: [],
  });

  const [pendingPagination, setPendingPagination] = React.useState<PaginationProps>({
    page: 1,
    numOfPages: 1,
    data: [],
  });

  const [rejectedPagination, setRejectedPagination] = React.useState<PaginationProps>({
    page: 1,
    numOfPages: 1,
    data: [],
  });

  const [expiredPagination, setExpiredPagination] = React.useState<PaginationProps>({
    page: 1,
    numOfPages: 1,
    data: [],
  });

  function checkCanLoadMore(type: number): boolean {
    switch (type) {
      case 0:
        return pendingPagination.page < pendingPagination.numOfPages;
      case 1:
        return approvedPagination.page < approvedPagination.numOfPages;
      case 2:
        return rejectedPagination.page < rejectedPagination.numOfPages;
      case 3:
        return expiredPagination.page < expiredPagination.numOfPages;
      default:
        return false;
    }
  }

  function handleLoadMore(type: number) {
    console.log(type);
    switch (type) {
      case 0:
        if (pendingPagination.page < pendingPagination.numOfPages)
          handleGetPost('pending', pendingPagination.page + 1);
        else {

          alert('Đã hết bài đăng: ' + pendingPagination.page + ' / ' + pendingPagination.numOfPages);
        }
        break;
      case 1:
        if (approvedPagination.page < approvedPagination.numOfPages)
          handleGetPost('approved', approvedPagination.page + 1);
        break;
      case 2:
        if (rejectedPagination.page < rejectedPagination.numOfPages)
          handleGetPost('rejected', rejectedPagination.page + 1);
        break;
      case 3:
        if (expiredPagination.page < expiredPagination.numOfPages)
          handleGetPost('expired', expiredPagination.page + 1);
        break;
    }
  }

  React.useEffect(() => {
    handleGetPost('pending');
    handleGetPost('approved');
    handleGetPost('rejected');
    handleGetPost('expired');
  }, []);
  return (
    <Stack alignItems={'center'}>
   <Box sx={{ bgcolor: 'background.paper', padding: '0px', margin: '0px',       width: '100%',
    maxWidth: '1200px',
    minWidth: '390px',}}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            color: '#026D4D',
            backgroundColor: '#FFFFFF',
            indicatorColor: CUSTOM_COLOR.primary,
          }} // Set text color
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
      
        >
          <Tab label="Chờ duyệt" {...a11yProps(0)} sx={{
            fontSize: '15px',
            fontWeight: 600
          }}
          />
          <Tab label="Đã duyệt" {...a11yProps(1)}sx={{
            fontSize: '15px',
            fontWeight: 600
          }} />
          <Tab label="Bị Từ chối" {...a11yProps(2)} sx={{
            fontSize: '15px',
            fontWeight: 600
          }}/>
          <Tab label="Đã hết hạn" {...a11yProps(3)} sx={{
            fontSize: '15px',
            fontWeight: 600
          }}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={2}>
            {pendingPagination.data.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                <PostCard
                  image={item.images[0]}
                  status={item.status as 'approved' | 'pending' | 'rejected'}
                  title={item.title}
                  address={item.address.detail ?? "Rỗng"}
                  expiredDate={new Date()}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {
            <Grid container spacing={2}>
              {approvedPagination.data.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                  <PostCard
                    image={item.images[0]}
                    status={item.status as 'approved' | 'pending' | 'rejected'}
                    title={item.title}
                    address={item.address.detail ?? "Rỗng"}
                    expiredDate={new Date()}
                  />
                </Grid>

              ))
              }
            </Grid>
          }
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {
            <Grid container spacing={2}>
              {rejectedPagination.data.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                  <PostCard
                    image={item.images[0]}
                    status={item.status as 'approved' | 'pending' | 'rejected'}
                    title={item.title}
                    address={item.address.detail ?? "Rỗng"}
                    expiredDate={new Date()}
                  />
                </Grid>
              ))
              }
            </Grid>
          }
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {
            <Grid container spacing={2}>
              {
                expiredPagination.data.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                    <PostCard
                      image={item.images[0]}
                      status={item.status as 'approved' | 'pending' | 'rejected'}
                      title={item.title}
                      address={item.address.detail ?? "Rỗng"}
                      expiredDate={new Date()}
                    />
                  </Grid>
                ))
              }
            </Grid>
          }
        </TabPanel>
      </SwipeableViews>
      {/* Xem thêm */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ display: isLoading  ? 'block' : 'none' }} />
        <Button variant='text' sx={{ display: isLoading || !checkCanLoadMore(value) ? 'none' : 'block' }} onClick={() => {
          handleLoadMore(value);
        }}>Xem thêm</Button>
      </Box>
    </Box>
    </Stack>
 
  );
}

