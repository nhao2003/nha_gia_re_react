import React from 'react';
import icon from './../../assets/images/Slogan.png';
import classes from './ModernAuthPage.module.css';
import InputField from './components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from './components/SubmitButton';
import { ApiServiceBuilder } from '../../../../services/api.service';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { type AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const ModernSignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);

  async function signup() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/auth/sign-up')
        .withBody({
          email,
          password,
          confirmPassword,
        })
        .build()
        .post();

      return response.data as any;
    } catch (error) {
      return (error as any).response.data;
    }
  }

  function emailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setEmailError('');
    setError('');
  }

  function passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setPasswordError('');
    setError('');
  }

  function confirmPasswordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError('');
    setError('');
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().length === 0) {
      setEmailError('Vui lòng nhập Email!');
      return;
    }
    if (password.trim().length === 0) {
      setPasswordError('Vui lòng nhập mật khẩu');
      return;
    }
    if (confirmPassword.trim().length === 0) {
      setPasswordError('Vui lòng nhập lại mật khẩu');
      return;
    }
    if (password.trim().length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError('Mật khẩu không khớp');
      return;
    }
    setIsLoading(true);
    signup()
      .then((response) => {
        if (response.status === 'success') {
          setSuccess(response.message);

          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
            setIsLoading(false);
            navigate('/signin');
          }, 2000);

          // navigate('/auth-update-profile');
        } else if (response.status === 'error') {
          setError(response.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }

  return (
    <div className={classes.background}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <div className={classes.container}>
        <Snackbar open={openAlert} autoHideDuration={600} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity='success' sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
        <img src={icon} alt='icon' />
        <h1>Đăng ký</h1>
        {error !== '' && (
          <Alert
            sx={{
              width: '100%',
              marginTop: 2,
            }}
            severity='error'
          >
            <strong>{error}</strong>
          </Alert>
        )}
        <form onSubmit={submitHandler}>
          <div className={classes.input}>
            <label htmlFor='email'>Email</label>
            <InputField
              id='email'
              value={email}
              type='email'
              placeholder='Nhập email'
              onChange={emailChangeHandler}
              isError={emailError !== ''}
            />
            {emailError !== '' && (
              <label className={classes.error} htmlFor='email'>
                {emailError}
              </label>
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor='password'>Mật khẩu</label>
            <InputField
              id='password'
              value={password}
              type='password'
              placeholder='Nhập mật khẩu'
              onChange={passwordChangeHandler}
              isError={passwordError !== ''}
            />
            {passwordError !== '' && (
              <label className={classes.error} htmlFor='password'>
                {passwordError}
              </label>
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor='confirm-password'>Nhập lại mật khẩu</label>
            <InputField
              id='confirm-password'
              value={confirmPassword}
              type='password'
              placeholder='Nhập lại mật khẩu'
              onChange={confirmPasswordChangeHandler}
              isError={confirmPasswordError !== ''}
            />
            {confirmPasswordError !== '' && (
              <label className={classes.error} htmlFor='password'>
                {confirmPasswordError}
              </label>
            )}
          </div>
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
