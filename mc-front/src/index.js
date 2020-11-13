//libraries
import React from 'react';
import ReactDOM from 'react-dom';

//styles
import "./assets/scss/material-kit-react.scss?v=1.9.0";
import 'bootstrap/dist/css/bootstrap.css';

//layout
import MainLayout from './views/MainLayout';

ReactDOM.render(
  <MainLayout/>,
  document.getElementById('root')
);