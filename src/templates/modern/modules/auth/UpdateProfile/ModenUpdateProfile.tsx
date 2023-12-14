import React from 'react';
import classes from './ModernUpdateProfile.module.css';

import avatar from './../../../assets/images/user.png';
import { Avatar } from '@mui/material';
import { Camera } from '@mui/icons-material';

const ModernUpdateProfile = () => {
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Avatar sx={{ width: 100, height: 100 }} src={avatar} alt='avatar' />
        <button className={classes['change-avatar']}>
          <Camera />
          <span>Thay doi anh dai dien</span>
        </button>
      </div>
    </div>
  );
};

export default ModernUpdateProfile;
