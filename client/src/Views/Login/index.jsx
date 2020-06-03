import * as React from 'react';
import { login } from '../../Shared/Utils/request';
import LoginStyles from './LoginStyles';

export function LogInScreen(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className='login_screen'>
      <LoginStyles />
      <div className='login_content'>
        <h1>abundant</h1>
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
            if (login({ email: username, password: password }) !== 'Error') {
              props.setLoggedIn(true);
            }
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
