import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { TextFieldTitle } from '../components/TextFieldTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SelectAddress } from '../components/SelectAddress';
import CUSTOM_COLOR from '../../../constants/colors';
import React from 'react';

interface PersonalInformationPageProps {
  userInfo: any;
}

export const PersonalInformationPage: React.FC<PersonalInformationPageProps> = ({ userInfo, ...props }) => {
  const gender = userInfo === null ? '' : userInfo.gender === true ? 'Male' : 'Female';

  const [genderValue, setGenderValue] = React.useState(gender);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue((event.target as HTMLInputElement).value);
  };

  return (
    <Box
      sx={{
        width: '50%',
        padding: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontWeight: 'bold',
        }}
      >
        Thông tin cá nhân
      </Typography>

      <TextFieldTitle
        title={'Họ và tên'}
        placeholder={'Họ và tên'}
        require={true}
        value={userInfo !== null ? `${userInfo.last_name + ' ' + userInfo.first_name}` : null}
      />

      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            width: '20%',
          }}
        >
          <Typography variant='inherit'>Ngày sinh</Typography>
        </Stack>

        <DatePicker
          sx={{
            width: '80%',
            '& fieldset': {
              borderRadius: '10px',
            },
          }}
        />
      </Stack>

      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'start',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            width: '20%',
          }}
        >
          <Typography variant='inherit'>Giới tính</Typography>
        </Stack>

        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
          value={genderValue}
          onChange={handleGenderChange}
        >
          <FormControlLabel value='Male' control={<Radio />} label='Nam' />
          <FormControlLabel value='Female' control={<Radio />} label='Nữ' />
        </RadioGroup>
      </Stack>

      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            width: '20%',
          }}
        >
          <Typography variant='inherit'>Địa chỉ</Typography>
        </Stack>

        <Stack
          direction={'column'}
          sx={{
            width: '80%',
          }}
        >
          <SelectAddress
            title={'Tỉnh/Thành phố'}
            require={true}
            placeholder={'Tỉnh/Thành phố'}
            addressCode={userInfo.address.province_code}
          />

          <SelectAddress
            title={'Quận/Huyện'}
            require={true}
            placeholder={'Quận/Huyện'}
            addressCode={userInfo.address.district_code}
          />
          <SelectAddress
            title={'Phường/Xã'}
            require={true}
            placeholder={'Phường/Xã'}
            addressCode={userInfo.address.ward_code}
          />

          <TextFieldTitle
            title=''
            placeholder={'--Số nhà, tên đường--'}
            require={false}
            value={userInfo !== null ? `${userInfo.address.detail}` : null}
          />
        </Stack>
      </Stack>

      <TextFieldTitle title={'Giới thiệu'} placeholder={'Vài dòng giới thiệu về bạn'} require={false} />

      <Typography
        variant='h6'
        sx={{
          fontWeight: 'bold',
        }}
      >
        Thông tin liên lạc
      </Typography>
      <TextFieldTitle
        title={'Số điện thoại'}
        placeholder={''}
        require={true}
        value={userInfo !== null ? userInfo.phone : null}
      />

      <TextFieldTitle
        title={'Email'}
        placeholder={''}
        require={true}
        value={userInfo !== null ? userInfo.email : null}
      />
      <TextFieldTitle title={'CCCD/CMND'} placeholder={''} require={false} />

      <TextFieldTitle title={'Facebook'} placeholder={''} require={false} />

      <TextFieldTitle title={'Zalo'} placeholder={''} require={false} />

      <Stack width={'100%'} alignItems={'center'} marginTop={5} marginBottom={5}>
        <Button
          variant='contained'
          sx={{
            marginTop: 1,
            width: 'fit-content',
            backgroundColor: CUSTOM_COLOR.primary,
            alignSelf: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Lưu thông tin
        </Button>
      </Stack>
    </Box>
  );
};
