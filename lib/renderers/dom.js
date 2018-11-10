import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import StoreApi from 'state-api';

const store = new StoreApi([]);

ReactDOM.hydrate(
  <BrowserRouter><App store={store} /></BrowserRouter>,
  document.getElementById('root'));

