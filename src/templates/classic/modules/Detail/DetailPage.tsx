import { Avatar, Button, CircularProgress, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
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
import React, { useState } from "react";
import { url } from "inspector";
import { TileIcon } from "./components/TileIcon";
import { HomeCard } from "../../../../templates/classic/components/HomeCard";
import CUSTOM_COLOR from "../../constants/colors";
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiServiceBuilder } from "../../../../services/api.service";
import type RealEstatePost from "../../../../models/RealEstatePost";
import { Direction, LegalDocumentStatus, PropertyTypes, legalDocumentStatusToString } from "../../../../constants/enums";


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
  


function DetailPage(): JSX.Element {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const id = useLocation().pathname.split('/')[2];
    const navigate = useNavigate();

    const [post, setPost] = React.useState<RealEstatePost>(useLocation().state as RealEstatePost);
    async function fetchPost() {
        const query = new ApiServiceBuilder()
          .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
          .withUrl("/posts?post_id[eq]='" + id + "'")
          .build();
        console.log(query);
        const response = await query.get();
        return response.data as any;
      }

    const [listImage, setListImage] = useState<string[]>(post.images);

    const [indexImage, setIndexImage] = useState(0)
    const [indexSelected, setIndexSelected] = useState(0)

    const previousImage = () => {
        const index = indexImage - 1
        if (indexImage > 0) setIndexImage(index)
        console.log(indexImage)
        console.log('previous')
    }

    const nextImage = () => {
        const index = indexImage + 1
        if (indexImage < listImage.length - 4) setIndexImage(index)
        console.log(indexImage)
        console.log('next')
    }


    const handlerSelectImage = (index: number) => {
        setIndexSelected(index)
    }




    // React.useEffect(() => {
    //     if (post === null)
    //       fetchPost()
    //         .then((response) => {
    //           setPost(response.result[0]);
    //           // Explicitly specify the type of 'response.result[0]'
    //           const firstPost = response.result[0] as RealEstatePost | undefined;
    //           console.log('psstttt',firstPost);
    //           if (firstPost !== undefined) {
    //             setPost(firstPost);
    //             setListImage(firstPost.images);
    //           }

    //           console.log('list image',listImage);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     else {
    //       setListImage(post.images);
    //     }
    //   }, []);

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

        console.log('posttt', post);

        setListImage(post.images);
        console.log('list image', listImage);

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

    return (
        <Stack
            alignItems={'center'}
        >
            <Stack
                width={'100%'}
                height={'fit-content'}
                alignItems={'center'}
                marginTop={'20px'}
            >
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
                            width: '70%',

                        }}
                        spacing={2}
                        alignItems={'center'}
                    >

                        <img
                            width={'90%'}

                            height={'500px'}
                            src={listImage[indexSelected]}
                        />

                        <Stack
                            direction={'row'}
                            spacing={1}
                            width={'100%'}

                            justifyContent={'center'}
                            sx={{
                                position: 'relative'
                            }}
                        >

                        {listImage.slice(indexImage, indexImage + 4).map((image, index) =>
                        {
                            console.log(listImage.indexOf(image))
                            return (
                                <Stack
                                key={index}
                                sx={{
                                    width: '23%',
    
                                    border: indexSelected === listImage.indexOf(image) ? '3px solid #000' : null,
                                }}
                                onClick={() => handlerSelectImage(listImage.indexOf(image))}
                                >
                                <img
                                    style={{
                                    overflow: 'hidden',
                                    objectFit: 'cover',
                                    height: '100px'
                                    }}
                                    src={image}
                                />
                                </Stack>
                            )
                        }
                        )}
                            <Stack
                                sx={{
                                    width: '100%',

                                    position: 'absolute',
                                    top: '40%'
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
                                        "&:hover": {
                                            backgroundColor: '#8E8C8C'
                                        }
                                    }}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    onClick={previousImage}
                                >
                                    <KeyboardArrowLeftIcon sx={{
                                        color: CUSTOM_COLOR.white
                                    }} />

                                </Stack>

                                <Stack
                                    height={'30px'}
                                    width={'30px'}
                                    sx={{
                                        borderRadius: '20px',
                                        backgroundColor: '#B8B7B7BB',
                                        marginRight: '20px',
                                        "&:hover": {
                                            backgroundColor: '#8E8C8C'
                                        }
                                    }}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    onClick={nextImage}
                                >
                                    <KeyboardArrowRightIcon sx={{
                                        color: CUSTOM_COLOR.white
                                    }} />

                                </Stack>


                            </Stack>


                        </Stack>


                        <Stack
                            direction={'column'}
                            spacing={1}
                            width={'100%'}
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

                            >{post.title}</Typography>

                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                width={'100%'}
                                alignItems={'center'}
                            >

                                <Typography
                                    fontSize={'18px'}
                                    fontWeight={'600'}
                                >{post.price} VND - {post.area} <span>m</span><sup style={{ fontSize: '12px' }}>2</sup></Typography>

                                <Stack
                                    direction={'row'}

                                >
                                    <Button variant="text"
                                        sx={{
                                            color: CUSTOM_COLOR.grayScorpion,
                                            fontSize: '18px'
                                        }}
                                        startIcon={<ReplyIcon />}
                                    >Chia sẻ</Button>

                                </Stack>

                            </Stack>

                            <Stack
                                direction={'row'}
                                alignSelf={'start'}
                                width={'100%'}
                                spacing={1}
                                marginLeft={'15px'}
                                sx={{
                                    color: CUSTOM_COLOR.grayScorpion
                                }}
                            >
                                <LocationOnOutlinedIcon />
                                <Typography>{post.address_detail}</Typography>

                            </Stack>

                            {/* <Stack
                                direction={'row'}
                                alignSelf={'start'}
                                width={'100%'}
                                spacing={1}
                                marginLeft={'15px'}
                                sx={{
                                    color: CUSTOM_COLOR.grayScorpion
                                }}
                            >
                                <AccessTimeOutlinedIcon />
                                <Typography>{home.time}</Typography>

                            </Stack> */}

                            <Stack
                                direction={'row'}
                                alignSelf={'start'}
                                width={'100%'}
                                spacing={1}
                                marginLeft={'15px'}
                                sx={{
                                    color: CUSTOM_COLOR.grayScorpion
                                }}
                            >
                                <BeenhereOutlinedIcon />
                                <Typography>Tin đã được kiểm duyệt</Typography>

                            </Stack>

                            <Typography
                                marginLeft={'20px'}
                                sx={{
                                    width: '100%',
                                    fontWeight: 'bold',
                                    fontSize: '18px',

                                }}
                            >Đặt điểm bất động sản</Typography>

                            <Stack direction={matches ? 'row' : 'column'}>

                                <Stack
                                    sx={{

                                        width: matches ? '50%' : '100%',
                                    }}
                                    spacing={1}
                                >
         
                            {                  
                                features?.is_hand_over !== null ??
                                       <TileIcon
                                       icon={HomeWorkIcon}
                                       title="Tình trạng bàn giao"
                                       value={features.is_hand_over === true ? "Đã bàn giao" : "Chưa bàn giao"}
                                   />
                            }

                                    <TileIcon
                                        icon={MonetizationOnOutlinedIcon}
                                        title="Giá"
                                        value={post.price / post.area}
                                        unit={<><span>VND/m</span><sup style={{ fontSize: '12px' }}>2</sup></>}
                                    />
                                    {
                                       
                                        <TileIcon
                                        icon={WcIcon}
                                        title="Số phòng vệ sinh"
                                        value={features?.num_of_toilets ?? "Không có"}
                                        unit={"phòng"}
                                        />
                                       
                                    }
                                    
                                    <TileIcon
                                        icon={LocationCityIcon}
                                        title="Loại hình căn hộ"
                                        value={post.type_id === PropertyTypes.apartment ? "Căn hộ" : 
                                        post.type_id === PropertyTypes.house ? "Nhà ở" :
                                        post.type_id === PropertyTypes.land ? "Đất" :
                                        post.type_id === PropertyTypes.motel ? "Nhà trọ" :
                                        "Văn phòng"
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
                                        title="Diện tích"
                                        value={post.area}
                                        unit={<><span>m</span><sup style={{ fontSize: '12px' }}>2</sup></>}
                                    />

                                    <TileIcon
                                        icon={BedroomParentOutlinedIcon}
                                        title="Số phòng ngủ"
                                        value={features?.num_of_bed_rooms ?? "Không có"}
                                        unit={"phòng"}
                                    />
                                    {
                                        features?.main_door_direction ??

                                        <TileIcon
                                        icon={MeetingRoomOutlinedIcon}
                                        title="Hướng cửa chính"
                                        value={features.main_door_direction === Direction.north ? "Bắc" :
                                        features.main_door_direction === Direction.south ? "Nam" :
                                        features.main_door_direction === Direction.west ? "Tây" : "Đông"
                                        }
                                       
                                    />
                                    }
                                    
                                    {
                                         features?.legal_document_status ??
                                         <TileIcon
                                        icon={ReceiptLongOutlinedIcon}
                                        title="Giấy tờ pháp lý"
                                        value={ features.legal_document_status === LegalDocumentStatus.have_certificates ? "Đã có giấy tờ" :
                                        features.legal_document_status === LegalDocumentStatus.waiting_for_certificates ? "Chờ giấy tờ" : "Giấy tờ khác" 
                                    }
                                        />


                                    }
                                    
                                </Stack>

                            </Stack>

                            <Typography
                                marginLeft={'20px'}
                                sx={{
                                    width: '100%',
                                    fontWeight: 'bold',
                                    fontSize: '18px',

                                }}
                            >Mô tả chi tiết</Typography>

                            <React.Fragment>
                                <Typography variant="body1" paragraph>
                                    {post.description}
                                </Typography>

                            </React.Fragment>



                        </Stack>



                    </Stack>

                    <Stack

                        sx={{
                            backgroundColor: 'ButtonFace',
                            width: '30%',
                            height: 'fit-content',
                            padding: '10px',
                            boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <Stack
                            direction={'row'}
                            spacing={2}
                            alignItems={'center'}
                        >

                            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />

                            <Stack>
                                <Typography variant='h6'>Đào Xuân Huy</Typography>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    {post.is_pro_seller ? <PersonOutlineIcon /> : <BusinessCenterIcon />}
                                    <Typography>{post.is_pro_seller ? 'Cá nhân' : 'Môi giới'}</Typography>
                                </Stack>

                            </Stack>

                        </Stack>

                        <Button
                            variant='contained'

                            sx={{
                                marginTop: 1,
                                width: '100%',
                                backgroundColor: CUSTOM_COLOR.primary
                            }}
                            endIcon={<ChevronRightIcon />}
                        >
                            Xem trang
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
                    display: 'flex'
                }}
            >

                <Stack
                    direction={'row'}
                    marginBottom={1}
                    justifyContent={'space-between'}
                >
                    <Typography variant='h6'
                        sx={{
                            fontWeight: '600',
                            fontSize: '24px'
                        }}
                    >Tin đăng tương tự</Typography>
                    <Stack direction={'row'} spacing={1}
                        alignItems={'center'}
                        sx={{
                            color: CUSTOM_COLOR.primary
                        }}
                    >
                        <Typography>Xem thêm</Typography>
                        <EastIcon />
                    </Stack>

                </Stack>

                <Stack
                    direction={'row'}
                    spacing={2}
                >
                     {isLoading ? 
                     <Stack
                        width={'100%'}
                        alignItems={'center'}
                        height={'200px'}
                     >
                         <CircularProgress/> 
                    </Stack>
             
              :
            postsRelate.posts.slice(0, 4).map((post, index) =>
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
                onClick={() => {
                  navigate(`/details/${post.id}`, {
                    state: post,
                  });
                  navigate(0)
                }}
              />
             )
            }
           )}
                </Stack> 


            </Stack>
        </Stack>

    )
}

export default DetailPage
