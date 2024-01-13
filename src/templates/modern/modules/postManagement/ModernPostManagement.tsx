import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { Button, Card, CircularProgress, Grid, Menu, MenuItem } from '@mui/material';
import PostCard from './components/PostCard ';
import type RealEstatePost from '../../../../models/RealEstatePost';
import PostService from '../../../../services/post.service';
import addressUtils from '../../../../utils/addressUtils';
import { on } from 'events';
import { set } from 'immer/dist/internal';


async function getPost(status?: 'approved' | 'pending' | 'rejected' | 'expired', page: number = 1) {
  const queryStatus = status === 'expired' ? 'approved' : status;
  const queryParams: Record<string, any> = {
    'post_status[eq]': `'${queryStatus}'`,
  };
  if (status === 'expired') {
    queryParams['post_expiry_date[lt]'] = `'${new Date().toISOString()}'`;
  } else if (status === 'approved') {
    queryParams['post_expiry_date[gt]'] = `'${new Date().toISOString()}'`;
  }
  const data = await PostService.getInstance().getAllPosts(
    {
      page,
      queryParams: {
        'post_status[eq]': queryStatus,
        'post_is_active[eq]': true,
        'user_id[eq]': '\'1a9a5785-721a-4bb5-beb7-9d752e2070d4\'',
        ...queryParams,
      },
    }
  );
  console.log('queryStatus', queryStatus);
  console.log('data', data);
  return data;
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

export default function ModernPostManagement() {
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

  function handleDeletePost(id: string, type: 'approved' | 'pending' | 'rejected' | 'expired') {
    PostService.getInstance().deletePost(id).then((res) => {
      switch (type) {
        case 'approved':
          setApprovedPagination({
            ...approvedPagination,
            data: approvedPagination.data.filter((item) => item.id !== id),
          });
          break;
        case 'pending':
          setPendingPagination({
            ...pendingPagination,
            data: pendingPagination.data.filter((item) => item.id !== id),
          });
          break;
        case 'rejected':
          setRejectedPagination({
            ...rejectedPagination,
            data: rejectedPagination.data.filter((item) => item.id !== id),
          });
          break;
        case 'expired':
          setExpiredPagination({
            ...expiredPagination,
            data: expiredPagination.data.filter((item) => item.id !== id),
          });
          break;
      }
    }).catch((err) => {
      console.log("Delete Error: ", err);
      // alert(err);
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
  const [currentPostId, setCurrentPostId] = React.useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setCurrentPostId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCurrentPostId('');
  };
  function onMenuClick() {
    console.log('currentPostId', currentPostId);
    handleDeletePost(currentPostId, value === 0 ? 'pending' : value === 1 ? 'approved' : value === 2 ? 'rejected' : 'expired');
    handleClose();
  }
  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%', padding: '0px', margin: '0px' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            color: '#026D4D',
            backgroundColor: '#FFFFFF',
            indicatorColor: '#026D4D',
          }} // Set text color
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="Chờ duyệt" {...a11yProps(0)} />
          <Tab label="Đã duyệt" {...a11yProps(1)} />
          <Tab label="Bị Từ chối" {...a11yProps(2)} />
          <Tab label="Đã hết hạn" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={
          onMenuClick
        }>Xoá bài viết</MenuItem>
      </Menu>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} >
          <Grid container spacing={2}>
            {pendingPagination.data.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                <PostCard
                  id={item.id}
                  image={item.images[0]}
                  status={item.status as 'approved' | 'pending' | 'rejected'}
                  title={item.title}
                  address={item.address !== null ? addressUtils.getDetail(item.address) ?? '' : ''}
                  expiredDate={new Date(item.expiry_date)}
                  info_message={item.info_message}
                  onClick={
                    (e) => {
                      handleClick(e, item.id);
                    }
                  }
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
                    id={item.id}
                    image={item.images[0]}
                    status={item.status as 'approved' | 'pending' | 'rejected'}
                    title={item.title}
                    address={item.address !== null ? addressUtils.getDetail(item.address) ?? '' : ''}
                    expiredDate={new Date(item.expiry_date)}
                    onClick={
                      (e) => {
                        handleClick(e, item.id);
                      }
                    }
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
                    id={item.id}
                    image={item.images[0]}
                    status={item.status as 'approved' | 'pending' | 'rejected'}
                    title={item.title}
                    address={item.address !== null ? addressUtils.getDetail(item.address) ?? '' : ''}
                    expiredDate={new Date(item.expiry_date)}
                    onClick={
                      (e) => {
                        handleClick(e, item.id);
                      }
                    }

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
                      id={item.id}
                      image={item.images[0]}
                      status={item.status as 'approved' | 'pending' | 'rejected'}
                      title={item.title}
                      address={item.address !== null ? addressUtils.getDetail(item.address) ?? '' : ''}
                      expiredDate={new Date(item.expiry_date)}
                      onClick={
                        (e) => {
                          handleClick(e, item.id);
                        }
                      }

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
        <CircularProgress sx={{ display: isLoading ? 'block' : 'none' }} />
        <Button variant='text' sx={{ display: isLoading || !checkCanLoadMore(value) ? 'none' : 'block' }} onClick={() => {
          handleLoadMore(value);
        }}>Xem thêm</Button>
      </Box>
    </Box>
  );
}

