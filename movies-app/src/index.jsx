import './index.css'

import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import App from './App.jsx'
import { setupStore } from './store'

const store = setupStore();

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById('app'));
