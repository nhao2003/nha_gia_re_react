import React from 'react'
import classes from './SignUp.module.css'
import TextInputField from './components/TextInputField'
import { Link } from 'react-router-dom'
import logo from './../../assets/images/Logo.png'
import facebook from './../../assets/images/logos_facebook.svg'
import google from './../../assets/images/devicon_google.svg'

const SignUp = () => {
  const [enteredEmail, setEnteredEmail] = React.useState('')
  const [enteredPassword, setEnteredPassword] = React.useState('')

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(enteredEmail, enteredPassword)
  }

  const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value)
  }

  const changePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value)
  }

  return (
    <div className={classes.signup}>
      <img
        className={classes['image-cover']}
        src='https://hips.hearstapps.com/hmg-prod/images/1271-saint-ives-place-high-resolution-73-1666640275.jpg?crop=0.668xw:1.00xh;0.202xw,0&resize=1200:*'
        alt='Cover Image'
      />

      <div className={classes.form}>
        {/* <form onSubmit={submitHandler}> */}
        <div className={classes.logo}>
          <img src={logo} alt='logo' />
        </div>
        <h2>Đăng ký</h2>
        <form onSubmit={submitHandler}>
          <div className={`${classes.control} `}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Email'
              value={enteredEmail}
              onChange={changeEmailHandler}
            />
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
            <label htmlFor='confirm_password'>Xác nhận mật khẩu</label>
            <input type='password' id='confirm_password' placeholder='Nhập lại mật khẩu' />
          </div>
          <div className={`${classes.control} `}>
            <a href='/'>Quên mật khẩu?</a>
          </div>
          <div className={classes.actions}>
            <button type='submit'>ĐĂNG KÝ</button>
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
              Đã có tài khoản? <Link to='/login'>Đăng nhập ngay</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
