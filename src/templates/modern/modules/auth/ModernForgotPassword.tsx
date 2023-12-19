import React from 'react';
import icon from './../../assets/images/forgot_password_icon.png';
import classes from './ModernAuthPage.module.css';
import InputField from './components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from './components/SubmitButton';

const ModernForgotPassword = () => {
  const navigate = useNavigate();
  const [isEmailEntered, setIsEmailEntered] = React.useState(false);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsEmailEntered(true);
  }

  let formContent = (
    <>
      <InputField id='email' type='email' placeholder='Nhập email' />
      <SubmitButton type='submit'>Tiếp tục</SubmitButton>
    </>
  );

  if (isEmailEntered) {
    formContent = (
      <>
        <InputField id='password' type='password' placeholder='Nhập mật khẩu mới' />
        <InputField id='confirm-password' type='password' placeholder='Nhập lại mật khẩu mới' />
        <SubmitButton type='submit'>Xác nhận</SubmitButton>
      </>
    );
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <img src={icon} alt='icon' />
        <h1>Quên mật khẩu</h1>
        <span>Vui lòng điền email gắn với tài khoản của bạn để nhận đường dẫn thay đổi mật khẩu</span>
        <form onSubmit={submitHandler}>{formContent}</form>
      </div>
    </div>
  );
};

export default ModernForgotPassword;
