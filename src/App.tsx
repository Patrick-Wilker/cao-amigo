import React from 'react';
import { ToastContainer } from 'react-toastify';

import './assets/styles/global.css';

import Routes from './routes';

function App() {
  return (
    <>
      <ToastContainer autoClose={5000} />
      <Routes/>
    </>
  );
}

export default App;
