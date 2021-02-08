import * as React from 'react';
import { login, register } from '../../Shared/Utils/request';
import LoginStyles from './LoginStyles';
import WAVES from 'vanta/dist/vanta.waves.min';

export function LogInScreen(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [isRegister, setIsRegister] = React.useState(true);
  const [error, setLogInError] = React.useState(false);
  const [errorString, setErrorString] = React.useState('');
  const [vantaEffect, setVantaEffect] = React.useState(0);
  const myRef = React.useRef('.login_screen');

  React.useEffect(() => {
    console.log(WAVES);
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          mouseControls: false,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const submitLogin = () => {
    if (username && password) {
      login(
        { email: username, password: password },
        () => props.setLoggedIn(true),
        () => setLogInError(true),
      );
    } else {
      setLogInError(true);
    }
  };

  const submitRegister = () => {
    if (firstName && lastName && username && password) {
      let exp = new RegExp(
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,20})',
      );
      if (exp.test(password)) {
        register(
          {
            firstName: firstName,
            lastName: lastName,
            email: username,
            password: password,
          },
          () => props.setLoggedIn(true),
          () => setLogInError(true),
        );
      } else {
        console.log(password);
        setLogInError(true);
        setErrorString(
          'Password must contain at least one letter, number, and special character',
        );
      }
    } else {
      setLogInError(true);
      setErrorString('Fill in all fields');
    }
  };

  return (
    <div className='login_screen'>
      <LoginStyles />
      <div className='login_content'>
        {isRegister ? (
          <div>
            <h1>welcome to abundant</h1>
            {error ? (
              <div className='login_error'>
                {errorString !== ''
                  ? errorString
                  : 'Could not create account, try another email'}{' '}
              </div>
            ) : null}
            <form
              onSubmit={e => {
                e.preventDefault();
                submitRegister();
              }}
            >
              <input
                placeholder='First Name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <input
                placeholder='Last Name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />

              <input
                placeholder='Email'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={'password'}
              />
              <button title='Register' variant='contained'>
                Register
              </button>
              <p onClick={() => setIsRegister(false)}>
                Already have an account?
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h1 className='has_account'>welcome to abundant</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                submitLogin();
              }}
            >
              {error ? (
                <div className='login_error'>
                  Email or Password is incorrect
                </div>
              ) : null}
              <input
                className='has_account'
                placeholder='Email'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input
                className='has_account'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={'password'}
              />
              <button
                id='has_account'
                title='Log In'
                variant='contained'
                type='submit'
              >
                Log In
              </button>
              <p>Forgot Password?</p>
              <p onClick={() => setIsRegister(true)}>Don't have an account?</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
