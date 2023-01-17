import './index.css';

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { setupStore } from './store';
import { createResponseInterceptors } from './store/api';

const store = setupStore();

// Doing this here allows the interceptor to dispatch actions
createResponseInterceptors(store.dispatch);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById('app'));
