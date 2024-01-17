import React from 'react';
import classes from './SignIn.module.css';
import TextInputField from './components/TextInputField';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../../assets/images/Logo.png';
import facebook from './../../assets/images/logos_facebook.svg';
import google from './../../assets/images/devicon_google.svg';
import { ApiServiceBuilder } from '../../../../services/api.service';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const [enteredEmail, setEnteredEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [enteredPassword, setEnteredPassword] = React.useState('');

  const [passwordError, setPasswordError] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);

  async function login() {
    try {
      const response = await new ApiServiceBuilder()
        .withUrl('/auth/sign-in')
        .withBody({
          email: enteredEmail,
          password: enteredPassword,
        })
        .build()
        .post();

      return response.data as any;
    } catch (error) {
      return (error as any).response.data;
    }
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (enteredEmail.trim().length === 0) {
      setEmailError('Vui lòng nhập Email!');
      return;
    }
    if (enteredPassword.trim().length === 0) {
      setPasswordError('Vui lòng nhập mật khẩu');
      return;
    }
    if (enteredPassword.trim().length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    setIsLoading(true);
    login()
      .then((response) => {
        console.log(enteredEmail, enteredPassword);
        console.log(response);
        if (response.status === 'success') {
          localStorage.setItem('access_token', response.result.access_token);
          setSuccess(response.message);

          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
            setIsLoading(false);
            navigate('/');
          }, 2000);

          // navigate('/auth-update-profile');
        } else if (response.status === 'fail') {
          setError(response.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
    setEmailError('');
    setError('');
  };

  const changePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
    setPasswordError('');
    setError('');
  };

  return (
    <div className={classes.login}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <img
        className={classes['image-cover']}
        src='https://hips.hearstapps.com/hmg-prod/images/1271-saint-ives-place-high-resolution-73-1666640275.jpg?crop=0.668xw:1.00xh;0.202xw,0&resize=1200:*'
        alt='Cover Image'
      />

      <div className={classes.form}>
        {/* <form onSubmit={submitHandler}> */}
        <div className={classes.logo}>
          <img src={logo} alt='logo' style={{ width: '10rem' }} />
        </div>
        <Snackbar open={openAlert} autoHideDuration={600} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity='success' sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
        <h2>Đăng nhập</h2>
        <form onSubmit={submitHandler}>
          <div className={`${classes.control} `}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Email' value={enteredEmail} onChange={changeEmailHandler} />
          </div>
          <div className={`${classes.control} `}>
            <label htmlFor='password'>Mật khẩu</label>
            <input
              type='password'
              id='password'
              placeholder='Mật khẩu'
              value={enteredPassword}
              onChange={changePasswordHandler}
            />
          </div>
          <div className={`${classes.control} `}>
            <a href='/'>Quên mật khẩu?</a>
          </div>
          <div className={classes.actions}>
            <button type='submit'>ĐĂNG NHẬP</button>
          </div>

          <div className={classes.control}>
            <span>Hoặc đăng nhập bằng</span>
          </div>

          <div className={classes['social-button']}>
            <button>
              <img src={facebook} alt='Logo' />
              Facebook
            </button>
            <button>
              <img src={google} alt='Logo' /> Google
            </button>
          </div>

          <div className={classes.control}>
            <span>
              Chưa có tài khoản? <Link to='/signup'>Đăng ký tài khoản mới</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
