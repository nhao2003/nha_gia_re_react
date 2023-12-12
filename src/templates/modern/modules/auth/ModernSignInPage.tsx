import React from 'react';
import icon from './../../assets/images/Slogan.png';
import classes from './ModernAuthPage.module.css';
import InputField from './components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from './components/SubmitButton';
import facebook from './../../assets/images/facebook.png';
import google from './../../assets/images/google.png';

const ModernSignInPage = () => {
  const navigate = useNavigate();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/auth-update-profile');
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <img src={icon} alt='icon' />
        <h1>Đăng nhập</h1>
        <form onSubmit={submitHandler}>
          <InputField type='email' placeholder='Nhập email' />
          <InputField type='password' placeholder='Nhập mật khẩu' />
          <Link to='/forgot-password'>Quên mật khẩu?</Link>
          <SubmitButton type='submit'>Đăng nhập</SubmitButton>
        </form>
        <span>Hoặc đăng nhập với</span>
        <div className={classes.social}>
          <img src={facebook} />
          <img src={google} />
        </div>
        <span>
          Chưa có tài khoản? <Link to='/signup'>Đăng ký ngay</Link>
        </span>
      </div>
    </div>
  );
};

export default ModernSignInPage;
