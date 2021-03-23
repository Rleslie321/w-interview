// injector component

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './styles/index.css';
import App from './App';


ReactDOM.render(
  // used to make the SPA act like an MPA
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

