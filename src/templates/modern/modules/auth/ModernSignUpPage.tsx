import React from 'react';
import icon from './../../assets/images/Slogan.png';
import classes from './ModernAuthPage.module.css';
import InputField from './components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from './components/SubmitButton';

const ModernSignUpPage = () => {
  const navigate = useNavigate();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/signin');
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <img src={icon} alt='icon' />
        <h1>Đăng ký</h1>
        <form onSubmit={submitHandler}>
          <InputField type='email' placeholder='Nhập email' />
          <InputField type='password' placeholder='Nhập mật khẩu' />
          <InputField type='password' placeholder='Nhập lại mật khẩu' />
          <SubmitButton type='submit'>Đăng ký</SubmitButton>
        </form>
        <span>
          Đã có tài khoản? <Link to='/signin'>Đăng nhập ngay</Link>
        </span>
      </div>
    </div>
  );
};

export default ModernSignUpPage;
