import React from 'react';
import classes from './ModernUpdateProfile.module.css';

import avatar from './../../../assets/images/user.png';
import { Avatar, Box, FormControl, InputAdornment, TextField } from '@mui/material';
import { Camera } from '@mui/icons-material';
import MuiInput from '../components/MuiInputField';
import SubmitButton from '../components/SubmitButton';

const ModernUpdateProfile = () => {
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
                  <MuiInput id='ho' placeholder='Họ' />
                </div>
                <div className={classes.input}>
                  <label htmlFor='ten'>Tên</label>
                  <MuiInput id='ten' placeholder='Tên' />
                </div>
              </Box>
              <div className={classes.input}>
                <label htmlFor='phone'>Số điện thoại</label>
                <MuiInput
                  fullWidth
                  id='phone'
                  placeholder='Số điện thoại'
                  startAdornment={<InputAdornment position='start'>+84</InputAdornment>}
                />
              </div>
              <div className={classes.input}>
                <label htmlFor='email'>Email</label>
                <MuiInput fullWidth id='email' placeholder='Email' />
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
                  <MuiInput id='birthday' placeholder='Ngày sinh' />
                </div>
                <div className={classes.input}>
                  <label htmlFor='gender'>Giới tính</label>
                  <MuiInput id='gender' placeholder='Giới tính' />
                </div>
              </Box>
              <div className={classes.input}>
                <label htmlFor='location'>Địa chỉ</label>
                <MuiInput fullWidth id='location' placeholder='Địa chỉ' />
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
