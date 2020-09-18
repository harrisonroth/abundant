import * as React from 'react';
import { login, register } from '../../Shared/Utils/request';
import LoginStyles from './LoginStyles';

export function LogInScreen(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [isRegister, setIsRegister] = React.useState(true);
  const [error, setLogInError] = React.useState(false);
  const [errorString, setErrorString] = React.useState('');

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
        <h1>abundant</h1>
        {isRegister ? (
          <div>
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
              <div>
                <a onClick={() => setIsRegister(false)}>
                  Already have an account
                </a>
              </div>
            </form>
          </div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              submitLogin();
            }}
          >
            {error ? (
              <div className='login_error'>Email or Password is incorrect</div>
            ) : null}
            <input
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={'password'}
            />
            <button title='Log In' variant='contained' type='submit'>
              Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
