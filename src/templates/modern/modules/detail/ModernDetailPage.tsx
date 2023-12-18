import { Avatar, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import WcIcon from '@mui/icons-material/Wc';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CropIcon from '@mui/icons-material/Crop';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EastIcon from '@mui/icons-material/East';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '../home/components/Carousel';
import PostListComponent from '../home/components/PostListComponent';
import Grid from '@mui/material/Grid';
import CUSTOM_COLOR from '../../../classic/constants/colors';
import { TileIcon } from '../../../classic/modules/Detail/components/TileIcon';

export function ModernDetailPage(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search');
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const listImage = [
    {
      id: 0,
      src: 'https://thanhvietcorp.vn/uploads/images/Bao%20chi/cac-mau-nha-vuon-dep.jpg',
      alt: 'Image 1 for carousel',
    },
    {
      id: 1,
      src: 'https://www.tapdoantrananh.com.vn/uploads/files/2023/01/18/biet-thu-dep-2.jpg',
      alt: 'Image 2 for carousel',
    },
    {
      id: 2,
      src: 'https://mogi.vn/news/wp-content/uploads/2018/12/anh-nha-dep-8.jpg',
      alt: 'Image 3 for carousel',
    },
    {
      id: 3,
      src: 'https://media.tapchitaichinh.vn/w1480/images/upload/phunganhtuan/2015_07_13/phong-thuy-cho-nha-o-8_CLCV.jpg',
      alt: 'Image 4 for carousel',
    },
    {
      id: 4,
      src: 'https://longvan.com.vn/wp-content/uploads/2020/11/mau-nha-cap-3-thiet-ke-dep-nhat-nam-31.jpg',
      alt: 'Image 5 for carousel',
    },
    {
      id: 5,
      src: 'https://mogi.vn/news/wp-content/uploads/2018/12/anh-nha-dep-8.jpg',
      alt: 'Image 6 for carousel',
    },
    {
      id: 6,
      src: 'https://www.tapdoantrananh.com.vn/uploads/files/2023/01/18/biet-thu-dep-2.jpg',
      alt: 'Image 7 for carousel',
    },
  ];

  const [selectImage, setSelectImage] = useState(0);
  const [indexImage, setIndexImage] = useState(0);

  const previousImage = () => {
    const index = indexImage - 1;
    if (indexImage > 0) setIndexImage(index);
    console.log(indexImage);
    console.log('previous');
  };

  const nextImage = () => {
    const index = indexImage + 1;
    if (indexImage < listImage.length - 4) setIndexImage(index);
    console.log(indexImage);
    console.log('next');
  };

  const handlerSelectImage = (index: number) => {
    setSelectImage(index + indexImage);
  };

  const home = {
    title: 'Nhà Trệt Q4-CĂN GÓC 2 MẶT TIỀN- VỪA Ở VỪA KINH DOANH giá mềm 4xxx tỷ',
    price: 4.9,
    area: 81,
    address: 'Tạ Quang Bửu, Phường 6, Quận 8, Tp Hồ Chí Minh',
    time: 'Đăng 3 giờ trước',
    news_status: 'Tin đã được kiểm duyệt',
    status: 'Đã bàn giao',
    price_per_m2: 28.19,
    toilet: 2,
    type: 'Chung cư',
    bedroom: 2,
    direction: 'Tây',
    legal: 'Đã có sổ',
    describe: `Cần bán gấp 2 căn hộ thuộc chung cư The Pegasuite 1 chất lượng và quy mô bật nhất Q. 8. 
      \n- Căn hộ thương mại 2PN 1WC 60m² giá 2.5 tỷ - giá ***. 
      \n- Căn hộ thương mại 2PN 2WC 68m² giá 2.6 tỷ - giá ***. 
      \n- Căn hộ thương mại 3PN 2WC 100m² góc 2 ban công giá 3.3 tỷ - giá ***. 
      \nNgoài ra em còn nắm một số căn Pega có sổ hồng giá tốt tại Pegasuite: 
      \n- Căn 2PN 60m² có sổ hồng giá 2.6 tỷ. 
      \n- Căn 2PN 68m² có sổ hồng giá 2.75 tỷ. 
      \n- Căn 2PN 75m² có sổ hồng giá 3.2 tỷ. 
      \n- Căn 2PN 89m² (căn góc 2 ban công View Q. 1) giá 3.6 tỷ.
      \n- Căn góc 92m² (căn góc 2 ban công View công viên) giá 3.6 tỷ. 
      \n- Căn góc 3PN 100m² căn góc 2 ban công có sổ hồng giá 4.1 tỷ. 
      \nHỗ trợ vay ngân hàng theo mong muốn của khách hàng. 
      \nChỉ cần anh chị muốn mua The Pegasuite, hãy gọi cho em - sẽ được bên em hỗ trợ mua bán giá ***, thủ tục nhanh nhất, cam kết uy tín nhất với khách hàng. 
      \n- Luôn báo giá và làm việc trung thực, uy tín, tận tâm, tận lực. 
      \n- Hỗ trợ thương lượng giá với chủ nhà để có giá ***. 
      \n- Hỗ trợ pháp lý và mọi thủ tục cho khách. 
      \n- Hỗ trợ vay ngân hàng nếu khách có nhu cầu. 
      \nLiên hệ ngay để được hỗ trợ tư vấn ! 
      \nLàm việc 24/24 cả ngày chủ nhật và ngày lễ) !`,
    mohinh: 'Cá nhân',
  };

  return (
    <Stack alignItems={'center'}>
      <Stack width={'100%'} height={'fit-content'} alignItems={'center'} marginTop={'20px'}>
        <Stack
          style={{
            objectFit: 'cover',
            width: '100%',
            maxWidth: '1200px',
            minWidth: '390px',
          }}
          direction={'row'}
        >
          <Stack
            sx={{
              width: matches ? '70%' : '100%',
            }}
            spacing={2}
            alignItems={'center'}
          >
            <Carousel slides={listImage} style={{ width: '95%' }} />
            <Stack
              direction={'row'}
              spacing={1}
              width={'100%'}
              justifyContent={'center'}
              sx={{
                position: 'relative',
              }}
            >
              {listImage.slice(indexImage, indexImage + 4).map((image, index) => (
                <Stack
                  key={index}
                  sx={{
                    width: '23%',

                    border: selectImage === image.id ? '3px solid #000' : null,
                  }}
                  onClick={() => handlerSelectImage(index)}
                >
                  <img
                    style={{
                      overflow: 'hidden',
                      objectFit: 'cover',
                    }}
                    src={image.src}
                  />
                </Stack>
              ))}

              <Stack
                sx={{
                  width: '100%',

                  position: 'absolute',
                  top: '40%',
                }}
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Stack
                  height={'30px'}
                  width={'30px'}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#B8B7B7BB',
                    marginLeft: '20px',
                    '&:hover': {
                      backgroundColor: '#8E8C8C',
                    },
                  }}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={previousImage}
                >
                  <KeyboardArrowLeftIcon
                    sx={{
                      color: CUSTOM_COLOR.white,
                    }}
                  />
                </Stack>
                <Stack
                  height={'30px'}
                  width={'30px'}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#B8B7B7BB',
                    marginRight: '20px',
                    '&:hover': {
                      backgroundColor: '#8E8C8C',
                    },
                  }}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={nextImage}
                >
                  <KeyboardArrowRightIcon
                    sx={{
                      color: CUSTOM_COLOR.white,
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack
              direction={'column'}
              spacing={1}
              style={{ backgroundColor: CUSTOM_COLOR.backgroundCard, padding: '20px', borderRadius: '10px' }}
            >
              <Typography
                width={'100%'}
                marginLeft={'20px'}
                marginRight={'20px'}
                alignSelf={'self-start'}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                {home.title}
              </Typography>

              <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                <Typography fontSize={'22px'} fontWeight={'700'} color={CUSTOM_COLOR.orange}>
                  {home.price} tỷ - {home.area} <span>m</span>
                  <sup style={{ fontSize: '12px' }}>2</sup>
                </Typography>

                <Stack direction={'row'}>
                  <Button
                    variant='text'
                    sx={{
                      color: CUSTOM_COLOR.grayScorpion,
                      fontSize: '18px',
                    }}
                    startIcon={<ReplyIcon />}
                  >
                    Chia sẻ
                  </Button>
                </Stack>
              </Stack>

              <Stack
                direction={'row'}
                alignSelf={'start'}
                width={'100%'}
                spacing={1}
                marginLeft={'15px'}
                sx={{
                  color: CUSTOM_COLOR.grayScorpion,
                }}
              >
                <LocationOnOutlinedIcon />
                <Typography>{home.address}</Typography>
              </Stack>

              <Stack
                direction={'row'}
                alignSelf={'start'}
                width={'100%'}
                spacing={1}
                marginLeft={'15px'}
                sx={{
                  color: CUSTOM_COLOR.grayScorpion,
                }}
              >
                <AccessTimeOutlinedIcon />
                <Typography>{home.time}</Typography>
              </Stack>

              <Stack
                direction={'row'}
                alignSelf={'start'}
                width={'100%'}
                spacing={1}
                marginLeft={'15px'}
                sx={{
                  color: CUSTOM_COLOR.grayScorpion,
                }}
              >
                <BeenhereOutlinedIcon />
                <Typography>{home.news_status}</Typography>
              </Stack>

              <Typography
                marginLeft={'20px'}
                marginTop={'50px'}
                sx={{
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                Chi tiết bất động sản
              </Typography>

              <Stack direction={matches ? 'row' : 'column'}>
                <Stack
                  sx={{
                    width: matches ? '50%' : '100%',
                  }}
                  spacing={1}
                >
                  <TileIcon icon={HomeWorkIcon} title='Tình trạng bất động sản' value={home.status} />

                  <TileIcon
                    icon={MonetizationOnOutlinedIcon}
                    title='Giá'
                    value={home.price_per_m2}
                    unit={
                      <>
                        <span>triệu/m</span>
                        <sup style={{ fontSize: '12px' }}>2</sup>
                      </>
                    }
                  />
                  <TileIcon icon={WcIcon} title='Số phòng vệ sinh' value={home.toilet} unit={'phòng'} />
                  <TileIcon icon={LocationCityIcon} title='Loại hình căn hộ' value={home.type} />
                </Stack>

                <Stack
                  spacing={1}
                  sx={{
                    width: matches ? '50%' : '100%',
                  }}
                >
                  <TileIcon
                    icon={CropIcon}
                    title='Diện tích'
                    value={home.area}
                    unit={
                      <>
                        <span>m</span>
                        <sup style={{ fontSize: '12px' }}>2</sup>
                      </>
                    }
                  />

                  <TileIcon
                    icon={BedroomParentOutlinedIcon}
                    title='Số phòng ngủ'
                    value={home.bedroom}
                    unit={
                      <>
                        <span>triệu/m</span>
                        <sup style={{ fontSize: '12px' }}>2</sup>
                      </>
                    }
                  />
                  <TileIcon
                    icon={MeetingRoomOutlinedIcon}
                    title='Hướng của chính'
                    value={home.direction}
                    unit={'phòng'}
                  />
                  <TileIcon icon={ReceiptLongOutlinedIcon} title='Giấy tờ pháp lý' value={home.legal} />
                </Stack>
              </Stack>

              <Typography
                marginLeft={'20px'}
                sx={{
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                Mô tả chi tiết
              </Typography>

              <React.Fragment>
                <Typography variant='body1' paragraph>
                  {home.describe}
                </Typography>
              </React.Fragment>
            </Stack>
          </Stack>

          <Stack
            sx={{
              backgroundColor: CUSTOM_COLOR.backgroundCard,
              width: matches ? '30%' : '100%',
              height: 'fit-content',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />

              <Stack>
                <Typography variant='h6'>Đào Xuân Huy</Typography>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  {home.mohinh === 'cá nhân' ? <PersonOutlineIcon /> : <BusinessCenterIcon />}
                  <Typography>{home.mohinh === 'cá nhân' ? 'Cá nhân' : 'Môi giới'}</Typography>
                </Stack>
              </Stack>
            </Stack>

            <Button
              variant='contained'
              sx={{
                marginTop: 1,
                width: '100%',
                backgroundColor: CUSTOM_COLOR.green,
              }}
              endIcon={<ChevronRightIcon />}
            >
              Xem Hồ Sơ
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={'column'}
        marginTop={2}
        marginBottom={2}
        width={'100%'}
        maxWidth={'1200px'}
        minWidth={'390px'}
        sx={{
          display: 'flex',
        }}
      >
        <Stack direction={'row'} marginBottom={1} justifyContent={'space-between'}>
          <PostListComponent title={'Bài đăng tương tự'} posts={[]} />
        </Stack>
      </Stack>
    </Stack>
  );
}
