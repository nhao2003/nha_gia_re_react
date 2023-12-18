// Footer.tsx
import React from 'react'
import { AppBar, Stack, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import CUSTOM_COLOR from '../constants/colors'
import logo from '../assets/images/logo.svg'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import logoFacebook from '../assets/images/logo_facebook.svg'
import logoYoutube from '../assets/images/logo_youtube.svg'
import logoZalo from '../assets/images/logo_zalo.svg'
import logoChungNhan from '../assets/images/logoChungNhan.svg'

const Footer: React.FC = () => {

  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));


  return (
    // <AppBar position='static' sx={{ top: 'auto', bottom: 0 }}>
    //   <Toolbar>
    //     <Typography variant='body1' color='inherit'>
    //       © {new Date().getFullYear()} Your Company Name
    //     </Typography>
    //   </Toolbar>
    // </AppBar>

    <Stack
      marginTop={2}
      direction={'row'}
      sx={{
        backgroundColor: CUSTOM_COLOR.orrellBrown,
        width: '100%',
        height: '400px',
      }}
      spacing={10}
      justifyContent={'center'}
      alignItems={'center'}
    >

      <Stack
        direction={'column'}
        spacing={1}
      >

        <img
          src={logo}
          style={{
            width: '300px',
            height: '200px',
            alignSelf: matches ? 'start' : 'center'
          }}

        />


        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold'
          }}

        >CÔNG TY CỔ PHẦN NHÀ GIÁ RẺ VIỆT NAM</Typography>

        <Stack direction={'row'} spacing={1}>
          <LocationOnOutlinedIcon />
          <Typography
            variant='h6'
            sx={{
              fontWeight: '500',
              maxLines: '2',

              fontSize: '18px'
            }}
          >
            Tầng 31, Keangnam Hanoi Landmark, Phạm Hùng, Nam Từ Liêm, Hà Nội
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={1}>
          <PhoneEnabledOutlinedIcon />
          <Typography
            variant='h6'
            sx={{
              fontWeight: '500',
              maxLines: '2',

              fontSize: '18px'
            }}
          >
            (024) 1234 5678 - (024) 1235 5940
          </Typography>
        </Stack>



      </Stack>

      <Stack direction={'column'} spacing={4}
        sx={{
          display: matches ? 'block' : 'none'
        }}
      >
        <Stack direction={'row'} spacing={8}>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <PhoneEnabledOutlinedIcon />
            <Stack direction={'column'}>
              <Typography variant='inherit'>Hotline</Typography>
              <Typography variant='inherit' sx={{
                fontWeight: '500'
              }}>1900 1223</Typography>
            </Stack>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <SupportAgentIcon />
            <Stack direction={'column'}>
              <Typography variant='inherit'>Hỗ trợ khách hàng</Typography>
              <Typography variant='inherit' sx={{
                fontWeight: '500'
              }}>hotro.nhagiare.com.vn</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction={'row'} spacing={4}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='inherit' sx={{
              fontWeight: '500'
            }}>Hướng dẫn</Typography>
            <Typography variant='inherit'>Báo giá & Hỗ trợ</Typography>
            <Typography variant='inherit'>Câu hỏi thưởng gặp</Typography>
            <Typography variant='inherit'>Thông báo</Typography>
            <Typography variant='inherit'>Liên hệ</Typography>
          </Stack>

          <Stack direction={'column'} spacing={1}>
            <Typography variant='inherit' sx={{
              fontWeight: '500'
            }}>Quy định</Typography>
            <Typography variant='inherit'>Quy định đăng tin</Typography>
            <Typography variant='inherit'>Quy chế hoạt động</Typography>
            <Typography variant='inherit'>Điều khoản thỏa thuận</Typography>
            <Typography variant='inherit'>Chính sách bảo mật</Typography>
            <Typography variant='inherit'>Giải quyết tranh chấp</Typography>
            <Typography variant='inherit'>Góp ý báo lỗi</Typography>


          </Stack>

          <Stack direction={'column'} spacing={5}

            sx={{
              display: matches1440 ? 'block' : 'none'
            }}

          >
            <Stack direction={'column'} spacing={1}>
              <Typography variant='inherit' sx={{
                fontWeight: '500'
              }}>LIÊN KẾT</Typography>
              <Stack direction={'row'} spacing={2}>
                <img
                  src={logoFacebook}

                />

                <img
                  src={logoYoutube}

                />

                <img
                  src={logoZalo}

                />
              </Stack>
            </Stack>

            <Stack direction={'column'} spacing={1}>
              <Typography variant='inherit' sx={{
                fontWeight: '500'
              }}>CHỨNG NHẬN</Typography>
              <img
                src={logoChungNhan}

              />

            </Stack>
          </Stack>
        </Stack>


      </Stack>

    </Stack>
  )
}

export default Footer
