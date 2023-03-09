import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import { BASE_URL } from './Config';



axios.defaults.baseURL = BASE_URL
if (localStorage.token){

  axios.defaults.headers.common["Authorization"] = localStorage.token
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


