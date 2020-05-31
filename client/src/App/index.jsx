import React, { Fragment } from 'react';
import './FontStyles.css';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';

const App = () => {
  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <h1>abundant</h1>
    </Fragment>
  );
};

export default App;
