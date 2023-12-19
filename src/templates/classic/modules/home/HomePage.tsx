import {
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import tom_rumble from '../../assets/images/tom_rumble.jpg';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import { Area } from './components/Area';
import { HomeCard } from '../../components/HomeCard';
import CUSTOM_COLOR from '../../constants/colors';
import React from 'react';
import PostService from '../../../../services/post.service';
import type RealEstatePost from '../../../../models/RealEstatePost';
import { PropertyTypes } from '../../../../constants/enums';
import AddressUtils from '../../../../utils/addressUtils'
import { ApiServiceBuilder } from '../../../../services/api.service';

function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const advertisement = 'https://akenda.vn/wp-content/uploads/2022/12/banner-bat-dong-san-113.jpg';
  const news = [
    {
      image: 'https://themreport.com/wp-content/uploads/2021/05/breno-assis-r3WAWU5Fi5Q-unsplash-300x200.jpg',
      title: 'Tiến Độ Triển Khai Đề Án 1 Triệu Căn Nhà Ở Xã Hội Hiện Ra Sao?',
    },
    {
      image: 'https://themreport.com/wp-content/uploads/2021/05/breno-assis-r3WAWU5Fi5Q-unsplash-300x200.jpg',
      title: 'Tìm thuê phòng trọ giá rẻ tại Sài Gòn không dễ',
    },
    {
      image: 'https://themreport.com/wp-content/uploads/2021/05/breno-assis-r3WAWU5Fi5Q-unsplash-300x200.jpg',
      title: 'Lãi suất vay ngân hàng thán 10/2023 mới nhất',
    },
    {
      image: 'https://themreport.com/wp-content/uploads/2021/05/breno-assis-r3WAWU5Fi5Q-unsplash-300x200.jpg',
      title: 'Cách tính gạch xây nhà thực tế, không lo đội phí',
    },
    {
      image: 'https://themreport.com/wp-content/uploads/2021/05/breno-assis-r3WAWU5Fi5Q-unsplash-300x200.jpg',
      title: 'Thiên can địa chi là gì?',
    },
    {
      image: 'https://themreport.com/wp-content/uploads/2021/05/breno-assis-r3WAWU5Fi5Q-unsplash-300x200.jpg',
      title: 'Lưu ngay mẹo kinh doanh nhà nghỉ vốn thấp, lợi nhuận cao',
    },
  ];

  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));

  const endSlice = matches ? 4 : 2;

  const [postsPurchase, setPostsPurchase] = React.useState<{
    numOfPages: number;
    posts: RealEstatePost[];
  }>({ numOfPages: 1, posts: [] });

  const [postsRent, setPostsRent] = React.useState<{
    numOfPages: number;
    posts: RealEstatePost[];
  }>({ numOfPages: 1, posts: [] });

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ?? '1';

  async function fetchPostsPurChase() {

      const query = new ApiServiceBuilder()
      .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
      .withUrl('/posts?post_is_lease[eq]=' + false)
      .withParams({
        page: page
      })
      .build();
      const response = await query.get();

      return response.data as any;
    
  }

  async function fetchPostsRent() {

    const query = new ApiServiceBuilder()
    .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
    .withUrl('/posts?post_is_lease[eq]=' + true)
    .withParams({
      page: page
    })
    .build();
    const response = await query.get();

    return response.data as any;
  
}

  const handleClick = () => {
    navigate('/search');
  };

  const stackStyle = {
    backgroundImage: `url(${tom_rumble})`,
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    backgroundRepeat: 'no-repeat', // Adjust as needed
    // Other styles if needed
  };

  const [isLoadingPostPurchase, setIsLoadingPostPurchase] = React.useState<boolean>(true);
  const [isLoadingPostRent, setIsLoadingPostRent] = React.useState<boolean>(true);
  React.useEffect(() =>{
    setIsLoadingPostPurchase(true);
    setIsLoadingPostRent(true);

    fetchPostsPurChase()
    .then((response) => {
        console.log('post', response.result)
        console.log('post12', typeof response.result)


        console.log(response);
        setPostsPurchase({
          numOfPages: response.num_of_pages,
          posts: response.result,
        });
        console.log('postPurchase', postsPurchase.posts)
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
          setIsLoadingPostPurchase(false);
      });

      fetchPostsRent()
      .then((response) => {
          console.log('post', response.result)
          console.log('post12', typeof response.result)
  
  
          console.log(response);
          setPostsRent({
            numOfPages: response.num_of_pages,
            posts: response.result,
          });
          console.log('postPurchase', postsPurchase.posts)
          }).catch((error) => {
              console.log(error);
          }).finally(() => {
            setIsLoadingPostRent(false);
        });

      // fetchPostsRent().then((result : any) => {
      //   console.log(result);
      //      setPostRent(result )
      //   }).catch((error) => {
      //       console.log(error);
      //   }).finally(() => {
      //     setIsLoadingPostRent(false);
      // });
  }, [page]);

  return (
    <Stack alignItems={'center'}>
      <Stack
        width={'100%'}
        justifyContent={'center'}
        alignSelf={'center'}
        marginTop={3}
        marginBottom={3}
        height={'300px'}
        style={stackStyle}
        sx={{
          marginTop: '-2px',
        }}
        alignItems={'center'}
      >
        <Stack
          height={'100px'}
          sx={{
            backgroundColor: 'rgba(44, 43, 43, 0.8)',
          }}
          justifyContent={'center'}
          alignItems={'center'}
          width={'80%'}
        >
          <FormControl
            sx={{
              width: '95%',
            }}
          >
            <OutlinedInput
              onClick={handleClick}
              sx={{
                backgroundColor: '#ffffff',

                // '& fieldset': {
                //

                // },
                borderRadius: '10px',
                height: '45px',
              }}
              placeholder={'Từ khóa, đường, quận...'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
      </Stack>

      <Stack
        style={{
          objectFit: 'cover',
          width: '100%',
          maxWidth: '1000px',
          minWidth: '390px',
        }}
      >
        <img src={advertisement} height={'400px'} />

        <Stack direction={'column'} marginTop={2} marginBottom={2}>
          <Stack direction={'row'} marginBottom={1} justifyContent={'space-between'}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '600',
                fontSize: '24px',
              }}
            >
              Tin tức
            </Typography>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                color: CUSTOM_COLOR.primary,
              }}
            >
              <Typography>Xem thêm</Typography>
              <EastIcon />
            </Stack>
          </Stack>

          <Stack direction={'row'}>
            <Stack
              direction={'column'}
              width={'70%'}
              spacing={1}
              sx={{
                display: matches ? 'inherit' : 'none',
              }}
            >
              <img
                src={news[0].image}
                alt=''
                style={{
                  borderRadius: '10px',
                  width: '95%',
                }}
              />
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '600',
                  fontSize: '20px',
                }}
              >
                {news[0].title}
              </Typography>
            </Stack>

            <Stack
              sx={{
                width: matches ? '100%' : 'none',
              }}
            >
              {news.slice(0, 6).map((item, index) => {
                return (
                  <Stack key={index}>
                    <Typography
                      variant='inherit'
                      sx={{
                        fontSize: '19px',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}></div>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>

        <Stack direction={'column'} marginTop={2} marginBottom={2}>
          <Stack direction={'row'} marginBottom={1} justifyContent={'space-between'}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '600',
                fontSize: '24px',
              }}
            >
              Bất động sản theo địa điểm
            </Typography>
          </Stack>

          <Stack direction={'row'} height={'400px'} spacing={2}>
            <Area
              sx={{
                width: '50%',
                height: '100%',
                display: matches ? 'inherit' : 'none',
              }}
              place='TP. Hồ Chí Minh'
              news={2356}
              background='https://upload.wikimedia.org/wikipedia/commons/f/f6/Ho_Chi_Minh_City_Skyline_%28night%29.jpg'
            />

            <Stack
              direction={'column'}
              sx={{
                width: matches ? '50%' : '100%',
                height: '100%',
              }}
              spacing={2}
            >
              <Stack
                sx={{
                  width: '100%',
                  height: '50%',
                }}
                spacing={2}
                direction={'row'}
              >
                <Area
                  sx={{
                    width: '50%',
                    height: '100%',
                  }}
                  place='Hà Nội'
                  news={2356}
                  background='https://vcdn1-dulich.vnecdn.net/2020/01/12/cover-1578768419-1710-1578769015.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=NVLGHkwAeKyDUpx9KW4p_g'
                />

                <Area
                  sx={{
                    width: '50%',
                    height: '100%',
                  }}
                  place='Đà Nẵng'
                  news={2356}
                  background='https://cdn.tgdd.vn/Files/2021/06/15/1360375/diem-qua-10-dia-diem-du-lich-da-nang-ve-dem-khien-ban-me-man-quen-loi-ve-202206041218228136.jpg'
                />
              </Stack>

              <Stack
                sx={{
                  width: '100%',
                  height: '50%',
                }}
                direction={'row'}
                spacing={2}
              >
                <Area
                  sx={{
                    width: '50%',
                    height: '100%',
                  }}
                  place='Bình Dương'
                  news={2356}
                  background='https://ranghammatsaigon.com/wp-content/uploads/2023/05/pho-di-bo-bach-dang-binh-duong.jpg'
                />

                <Area
                  sx={{
                    width: '50%',
                    height: '100%',
                  }}
                  place='Đồng Nai'
                  news={2356}
                  background='https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/dataimages/202203/original/images2439574_14b.jpg'
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={'column'}
          marginTop={2}
          marginBottom={2}
          sx={{
            display: 'flex',
          }}
        >
          <Stack direction={'row'} marginBottom={1} justifyContent={'space-between'}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '600',
                fontSize: '24px',
              }}
            >
              Bất động sản đăng bán
            </Typography>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                color: CUSTOM_COLOR.primary,
              }}
            >
              <Typography>Xem thêm</Typography>
              <EastIcon />
            </Stack>
          </Stack>

          <Stack direction={'row'} spacing={2}>

            {isLoadingPostPurchase ? 
              <CircularProgress/> 
              :
            postsPurchase.posts.slice(0, endSlice).map((post, index) =>
            {
              const type = post.type_id === PropertyTypes.motel ? 'Nhà trọ' 
                : post.type_id === PropertyTypes.house ? 'Nhà ở' 
                : post.type_id === PropertyTypes.apartment ? 'Căn hộ' 
                : post.type_id === PropertyTypes.land ? 'Đất' 
                : 'Văn phòng'
              return (
                <HomeCard
                key={index}
                image= {post.images[0]}
                title={post.title}  
                price={`${post.price} VND/m2`}
                address= {post.address_detail ?? "Chưa cập nhật"}
                sx={{
                  overflow: 'hidden',
                }}
                type= {type}
              />
             )
            }
           )}
           
          </Stack>
        </Stack>

        <Stack
          direction={'column'}
          marginTop={2}
          marginBottom={2}
          sx={{
            display: 'flex',
          }}
        >
          <Stack direction={'row'} marginBottom={1} justifyContent={'space-between'}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '600',
                fontSize: '24px',
              }}
            >
              Bất động sản cho thuê
            </Typography>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                color: CUSTOM_COLOR.primary,
              }}
            >
              <Typography>Xem thêm</Typography>
              <EastIcon />
            </Stack>
          </Stack>

          <Stack direction={'row'} spacing={2}>
          {isLoadingPostRent ? 
              <CircularProgress/> 
              :
            postsRent.posts.slice(0, endSlice).map((post, index) =>
            {
              const type = post.type_id === PropertyTypes.motel ? 'Nhà trọ' 
                : post.type_id === PropertyTypes.house ? 'Nhà ở' 
                : post.type_id === PropertyTypes.apartment ? 'Căn hộ' 
                : post.type_id === PropertyTypes.land ? 'Đất' 
                : 'Văn phòng;'
              return (
                <HomeCard
                key={index}
                image= {post.images[0]}
                title={post.title}  
                price={`${post.price} VND/m2`}
                address= {post.address_detail ?? "Chưa cập nhật"}
                sx={{
                  overflow: 'hidden',
                }}
                type= {type}
              />
             )
            }
           )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HomePage;
