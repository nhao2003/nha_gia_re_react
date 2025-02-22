import { Avatar, Box, Button, CircularProgress, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Chat } from '@mui/icons-material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import WcIcon from '@mui/icons-material/Wc';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CropIcon from '@mui/icons-material/Crop';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from '../home/components/Carousel';
import PostListComponent from '../home/components/PostListComponent';
import CUSTOM_COLOR from '../../../classic/constants/colors';
import { TileIcon } from '../../../classic/modules/Detail/components/TileIcon';
import type RealEstatePost from '../../../../models/RealEstatePost';
import { ApiServiceBuilder } from '../../../../services/api.service';
import dateUtils from '../../../../utils/dateUtils';
import { LegalDocumentStatus, PropertyTypes } from '../../../../constants/enums';
import AuthService from '../../../../services/auth.service';

export function ModernDetailPage(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [listImage, setListImage] = useState<ImageInfo[]>([]);

  const [isMe, setIsMe] = useState(false);

  // Get state
  const [post, setPost] = React.useState<RealEstatePost>(useLocation().state as RealEstatePost);
  const id = useLocation().pathname.split('/')[2];
  async function fetchPost() {
    const query = new ApiServiceBuilder()
      .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
      .withUrl("/posts?post_id[eq]='" + id + "'")
      .build();
    console.log(query);
    const response = await query.get();
    return response.data as any;
  }

  React.useEffect(() => {
    const userId = AuthService.getInstance().getUserIdFromToken();
    if (post === null)
      fetchPost()
        .then((response) => {
          setPost(response.result[0]);
          // Explicitly specify the type of 'response.result[0]'
          const firstPost = response.result[0] as RealEstatePost | undefined;

          if (firstPost !== undefined) {
            setPost(firstPost);
            // Add 2 array images and videos
            const medias = [...firstPost.images, ...(firstPost.videos ?? [])];
            setListImage(formatImages(medias));
            setIsMe(firstPost.user.id === userId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    else {
      const medias = [...post.images, ...(post.videos ?? [])];
      setListImage(formatImages(medias));
      setIsMe(post.user.id === userId);
    }
  }, []);

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

  const handleNavigateMore = (type: string, value: string) => {
    navigate(`/search/${type}`, {
      state: value,
    });
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

  const navigate = useNavigate();

  const navigateToProfile = () => {
    if (post !== null) navigate(`/user/${post.user.id}`, { state: post.user });
  };

  const navigateToChat = () => {
    if (post !== null) navigate(`/chat/${post.user.id}`);
  };

  // Get API Relate
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [postsRelate, setPostsRelate] = React.useState<{
    numOfPages: number;
    posts: RealEstatePost[];
  }>({ numOfPages: 1, posts: [] });

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ?? '1';
  async function fetchPosts() {
    const query = new ApiServiceBuilder()
      .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
      .withUrl('/posts')
      .withParams({
        page: page,
        search: post?.title,
      })
      .build();
    console.log(query);
    const response = await query.get();
    return response.data as any;
  }
  React.useEffect(() => {
    setIsLoading(true);
    fetchPosts()
      .then((response) => {
        setPostsRelate({
          numOfPages: response.num_of_pages,
          posts: response.result,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const features: any = post.features;

  const numberFormat = new Intl.NumberFormat('en-US');

  return post === null ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Stack alignItems={'center'}>
      <Stack width={'100%'} height={'fit-content'} alignItems={'center'} marginTop={'20px'}>
        <Stack
          style={{
            objectFit: 'cover',
            width: '100%',
            maxWidth: '1200px',
            minWidth: '390px',
          }}
          direction={matches ? 'row' : 'column'}
        >
          <Stack
            sx={{
              width: matches ? '70%' : '100%',
            }}
            spacing={2}
            alignItems={'center'}
          >
            <Carousel slides={listImage} style={{ width: '95%' } } isAutoPlay={false} />

            <Stack
              direction={'column'}
              spacing={1}
              style={{
                backgroundColor: CUSTOM_COLOR.backgroundCard,
                padding: '20px',
                borderRadius: '10px',
                width: '95%',
              }}
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
                {post.title}
              </Typography>

              <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                <Typography fontSize={'22px'} fontWeight={'700'} color={CUSTOM_COLOR.orange}>
                  {numberFormat.format(post.price).replaceAll(',', '.')} VNĐ - {post.area} <span>m</span>
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
                <Typography>{post.address_detail}</Typography>
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
                <Typography>{dateUtils.getTimeAgoVi(post.posted_date)}</Typography>
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
                <Typography>Tin đã được kiểm duyệt</Typography>
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
                  {features?.is_hand_over !== null ?? (
                    <TileIcon
                      icon={HomeWorkIcon}
                      title='Tình trạng bàn giao'
                      value={features.is_hand_over === true ? 'Đã bàn giao' : 'Chưa bàn giao'}
                    />
                  )}

                  <TileIcon
                    icon={MonetizationOnOutlinedIcon}
                    title='Giá'
                    value={post.price / post.area}
                    unit={
                      <>
                        <span>VND/m</span>
                        <sup style={{ fontSize: '12px' }}>2</sup>
                      </>
                    }
                  />
                  {
                    <TileIcon
                      icon={WcIcon}
                      title='Số phòng vệ sinh'
                      value={features?.num_of_toilets ?? 'Không có'}
                      unit={'phòng'}
                    />
                  }
                  <TileIcon
                    icon={LocationCityIcon}
                    title='Loại hình căn hộ'
                    value={
                      post.type_id === PropertyTypes.apartment
                        ? 'Căn hộ'
                        : post.type_id === PropertyTypes.house
                          ? 'Nhà ở'
                          : post.type_id === PropertyTypes.land
                            ? 'Đất'
                            : post.type_id === PropertyTypes.motel
                              ? 'Nhà trọ'
                              : 'Văn phòng'
                    }
                  />
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
                    value={post.area}
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
                    value={features?.num_of_bed_rooms ?? 'Không có'}
                    unit={
                      <>
                        <span>triệu/m</span>
                        <sup style={{ fontSize: '12px' }}>2</sup>
                      </>
                    }
                  />

                  {features?.legal_document_status ?? (
                    <TileIcon
                      icon={ReceiptLongOutlinedIcon}
                      title='Giấy tờ pháp lý'
                      value={
                        features.legal_document_status === LegalDocumentStatus.have_certificates
                          ? 'Đã có giấy tờ'
                          : features.legal_document_status === LegalDocumentStatus.waiting_for_certificates
                            ? 'Chờ giấy tờ'
                            : 'Giấy tờ khác'
                      }
                    />
                  )}
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
                  {post.description}
                </Typography>
              </React.Fragment>
            </Stack>
          </Stack>

          <Stack
            sx={{
              backgroundColor: CUSTOM_COLOR.backgroundCard,
              width: matches ? '30%' : '95%',
              height: 'fit-content',
              padding: '10px',
              borderRadius: '10px',
              marginLeft: matches ? '0px' : '20px',
              marginTop: matches ? '0px' : '10px',
            }}
          >
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Avatar alt='Travis Howard' src={post.user.avatar ?? '/static/images/avatar/2.jpg'} />

              <Stack>
                <Typography variant='h6'>{post.user.first_name + ' ' + post.user.last_name}</Typography>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  {post.is_pro_seller ? <PersonOutlineIcon /> : <BusinessCenterIcon />}
                  <Typography>{post.is_pro_seller ? 'Cá nhân' : 'Môi giới'}</Typography>
                </Stack>
              </Stack>
            </Stack>

            {!isMe && (
              <Button
                variant='contained'
                sx={{
                  marginTop: 1,
                  width: '100%',
                  backgroundColor: CUSTOM_COLOR.white,
                  borderColor: CUSTOM_COLOR.green,
                  borderWidth: '2px',
                  color: CUSTOM_COLOR.green,
                }}
                endIcon={<Chat />}
                onClick={navigateToChat}
              >
                Chat với người đăng
              </Button>
            )}
            <Button
              variant='contained'
              sx={{
                marginTop: 1,
                width: '100%',
                backgroundColor: CUSTOM_COLOR.green,
              }}
              endIcon={<ChevronRightIcon />}
              onClick={navigateToProfile}
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
          marginLeft: matches ? '0px' : '20px',
        }}
      >
        <PostListComponent
          title={'Bài đăng tương tự'}
          url={`/posts?post_is_active[eq]=true&user_status[eq]='verified'&post_expiry_date[gte]=now()&search=${post.title}`}
          onViewMoreClick={() => {
            handleNavigateMore('relate', post.title);
          }}
        />
      </Stack>
    </Stack>
  );
}

interface ImageInfo {
  id: number;
  src: string;
  alt: string;
}

const formatImages = (images: string[]): ImageInfo[] => {
  return images.map((image, index) => ({
    id: index,
    src: image,
    alt: `Image ${index + 1} for carousel`,
  }));
};
