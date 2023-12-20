import React from 'react';
import icon from './../../assets/images/Slogan.png';
import classes from './ModernAuthPage.module.css';
import InputField from './components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from './components/SubmitButton';
import facebook from './../../assets/images/facebook.png';
import google from './../../assets/images/google.png';
import { ApiServiceBuilder } from '../../../../services/api.service';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { type AlertProps } from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const ModernSignInPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);

  async function login() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/auth/sign-in')
        .withBody({
          email,
          password,
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
    if (password.trim().length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    setIsLoading(true);
    login()
      .then((response) => {
        if (response.status === 'success') {
          console.log(response);
          localStorage.setItem('token', response.result.access_token);
          setSuccess(response.message);

          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
            setIsLoading(false);
            navigate('/');
          }, 2000);

          // navigate('/auth-update-profile');
        } else if (response.status === 'fail') {
          setError('Email hoặc mật khẩu không đúng');
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
        <h1>Đăng nhập</h1>

        {error !== '' && (
          <Alert
            sx={{
              width: '100%',
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
            {emailError !== '' && <label htmlFor='email'>{emailError}</label>}
          </div>
          <div className={classes.input}>
            <label htmlFor='password'>Password</label>
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

          <Link to='/forgot-password'>Quên mật khẩu?</Link>
          <SubmitButton type='submit'>{isLoading ? 'Loading...' : 'Đăng nhập'}</SubmitButton>
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
