import * as React from 'react';
import { login, register } from '../../Shared/Utils/request';
import LoginStyles from './LoginStyles';

export function LogInScreen(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [isRegister, setIsRegister] = React.useState(true);

  return (
    <div className='login_screen'>
      <LoginStyles />
      <div className='login_content'>
        <h1>abundant</h1>
        {isRegister ? (
          <div>
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
            <button
              title='Register'
              variant='contained'
              onClick={() => {
                register(
                  {
                    firstName: firstName,
                    lastName: lastName,
                    email: username,
                    password: password,
                  },
                  () => props.setLoggedIn(true),
                );
              }}
            >
              Register
            </button>
            <div>
              <a onClick={() => setIsRegister(false)}>
                Already have an account
              </a>
            </div>
          </div>
        ) : (
          <div>
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
            <button
              title='Log In'
              variant='contained'
              onClick={() => {
                login({ email: username, password: password }, () =>
                  props.setLoggedIn(true),
                );
              }}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
