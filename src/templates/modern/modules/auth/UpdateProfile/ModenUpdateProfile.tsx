import React from 'react';
import classes from './ModernUpdateProfile.module.css';

import avatar from './../../../assets/images/user.png';
import { Avatar, Box, FormControl, InputAdornment, MenuItem, Popper, Select, TextField } from '@mui/material';
import { CalendarMonth, Camera } from '@mui/icons-material';
import MuiInputField from '../components/MuiInputField';
import SubmitButton from '../components/SubmitButton';
import type { Dayjs } from 'dayjs';
import { MobileDatePicker, DatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const newTheme = (theme: any) =>
  createTheme({
    ...theme,

    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: '#026d4d',
            backgroundColor: '#fff',
          },
        },
      },
    },
  });

const ModernUpdateProfile = () => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [gender, setGender] = React.useState('');

  const handleGenderChange = (event: { target: { value: string } }) => {
    setGender(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={classes.background}>
      <div className={classes.card}>
        <Avatar className={classes.avatar} src={avatar} alt='avatar' />
        <button className={classes['change-avatar']}>
          <Camera />
          <span>Thay đổi ảnh đại diện</span>
        </button>
        <form onSubmit={submitHandler}>
          <FormControl>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <div className={classes.input}>
                  <label htmlFor='ho'>Họ</label>
                  <MuiInputField id='ho' placeholder='Họ' />
                </div>
                <div className={classes.input}>
                  <label htmlFor='ten'>Tên</label>
                  <MuiInputField id='ten' placeholder='Tên' />
                </div>
              </Box>
              <div className={classes.input}>
                <label htmlFor='phone'>Số điện thoại</label>
                <MuiInputField
                  fullWidth
                  id='phone'
                  placeholder='Số điện thoại'
                  startAdornment={<InputAdornment position='start'>+84</InputAdornment>}
                />
              </div>
              <div className={classes.input}>
                <label htmlFor='email'>Email</label>
                <MuiInputField fullWidth id='email' placeholder='Email' />
              </div>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <div className={classes.input}>
                  <label htmlFor='birthday'>Ngày sinh</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ThemeProvider theme={newTheme}>
                      <MobileDatePicker
                        format='DD/MM/YYYY'
                        value={value}
                        onChange={(newValue: any) => {
                          setValue(newValue);
                        }}
                        slots={{
                          textField: (props) => (
                            <TextField
                              {...props}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='start'>
                                    <CalendarMonth />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiInputBase-root': {
                                  padding: 0,
                                  paddingTop: 1.5,
                                  paddingBottom: 1.5,
                                },
                                '& .MuiButtonBase-root': {
                                  padding: 0,
                                  marginRight: 1.5,
                                },
                                '& .MuiInputBase-input': {
                                  padding: 0,
                                  paddingLeft: 1.5,
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    fontSize: 16,
                                    borderRadius: 1,
                                    border: '2px solid',
                                    borderColor: '#79747E',
                                    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#026d4d',
                                  },
                                  '&.Mui-focused fieldset': {
                                    boxShadow: '#026d4d 0 0 0 0.05rem',
                                    borderColor: '#026d4d',
                                  },
                                },
                              }}
                            />
                          ),
                        }}
                        slotProps={{
                          field: {},
                        }}
                        showDaysOutsideCurrentMonth
                      />
                    </ThemeProvider>
                  </LocalizationProvider>
                </div>
                <div className={classes.input}>
                  <label htmlFor='gender'>Giới tính</label>
                  {/* <MuiInputField id='gender' placeholder='Giới tính' /> */}
                  <Select
                    id='gender'
                    value={gender}
                    onChange={handleGenderChange}
                    input={<MuiInputField />}
                    displayEmpty
                    sx={{ width: '100%', textAlign: 'left' }}
                  >
                    <MenuItem value=''>
                      <em>Giới tính</em>
                    </MenuItem>
                    <MenuItem value={'Nam'}>Nam</MenuItem>
                    <MenuItem value={'Nữ'}>Nữ</MenuItem>
                  </Select>
                </div>
              </Box>
              <div className={classes.input}>
                <label htmlFor='location'>Địa chỉ</label>
                <MuiInputField fullWidth id='location' placeholder='Địa chỉ' />
              </div>
              <SubmitButton type='submit'>Lưu</SubmitButton>
            </Box>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default ModernUpdateProfile;
