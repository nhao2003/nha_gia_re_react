import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { Card, Grid } from '@mui/material';
import PostCard from './components/PostCard ';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
const sampleData = [
  {
    image: 'https://picsum.photos/200/300?random=1',
    status: 'approved',
    title: 'Trọ quận Tân Bình giá rẻ, 2 tầng',
    address: '449/58 Trường Chinh, P14, Tân Bình, TP. HCM',
  },
  {
    image: 'https://picsum.photos/200/300?random=2',
    status: 'pending',
    title: 'Trọ quận Tân Bình giá rẻ, 2 tầng',
    address: '449/58 Trường Chinh, P14, Tân Bình, TP. HCM',
  },
  {
    image: 'https://picsum.photos/200/300?random=3',
    status: 'rejected',
    title: 'Trọ quận Tân Bình giá rẻ, 2 tầng',
    address: '449/58 Trường Chinh, P14, Tân Bình, TP. HCM',
  },
  {
    image: 'https://picsum.photos/200/300?random=4',
    status: 'approved',
    title: 'Trọ quận Tân Bình giá rẻ, 2 tầng',
    address: '449/58 Trường Chinh, P14, Tân Bình, TP. HCM',
  },
  {
    image: 'https://picsum.photos/200/300?random=5',
    status: 'pending',
    title: 'Trọ quận Tân Bình giá rẻ, 2 tầng',
    address: '449/58 Trường Chinh, P14, Tân Bình, TP. HCM',
  },
  {
    image: 'https://picsum.photos/200/300?random=6',
    status: 'rejected',
    title: 'Trọ quận Tân Bình giá rẻ, 2 tầng',
    address: '449/58 Trường Chinh, P14, Tân Bình, TP. HCM',
  },
  {
    image: 'https://picsum.photos/200/300?random=7',
    status: 'approved',
    title: 'Trọ quận Tân Bình giá rẻ, 2 tầng',
    address: '449/58 Trường Chinh, P14, Tân Bình, TP. HCM',
  }
];
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

export default function ModernPostManagement() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%', padding: '0px', margin: '0px'}}>
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
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={2}>
            {sampleData.map((item, index) => (
              item.status === 'pending' ?
                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                  <PostCard
                    image={item.image}
                    status={item.status as 'approved' | 'pending' | 'rejected'}
                    title={item.title}
                    address={item.address}
                    expiredDate={new Date()}
                  />
                </Grid>
                : null
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {
            <Grid container spacing={2}>
              {sampleData.map((item, index) => (
                item.status === 'approved' ?
                  <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                    <PostCard
                      image={item.image}
                      status={item.status as 'approved' | 'pending' | 'rejected'}
                      title={item.title}
                      address={item.address}
                      expiredDate={new Date()}
                    />
                  </Grid>
                  : null

              ))
              }
            </Grid>
          }
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {
            <Grid container spacing={2}>
              {sampleData.map((item, index) => (
                item.status === 'rejected' ?
                  <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                    <PostCard
                      image={item.image}
                      status={item.status as 'approved' | 'pending' | 'rejected'}
                      title={item.title}
                      address={item.address}
                      expiredDate={new Date()}
                    />
                  </Grid>
                  : null
              ))
              }
            </Grid>
          }
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {
            <Grid container spacing={2}>
              {
                sampleData.map((item, index) => (
                  item.status === 'approved' ?
                    <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                      <PostCard
                        image={item.image}
                        status={item.status as 'approved' | 'pending' | 'rejected'}
                        title={item.title}
                        address={item.address}
                        expiredDate={new Date()}
                      />
                    </Grid>
                    : null
                ))
              }
            </Grid>
          }
            </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

