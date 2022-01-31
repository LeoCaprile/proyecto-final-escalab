import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "core-js/stable";
import "regenerator-runtime/runtime"
import './index.css';
import App from './App';

if(!localStorage.getItem('favorites')){
localStorage.setItem('favorites','[]')};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


