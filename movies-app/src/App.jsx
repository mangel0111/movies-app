import './App.css';
import React from 'react';
import {Provider} from 'react-redux';

import store from './redux';

import Home from './pages/home';

const App = () => {
  return (
      <Provider store={store}>
        <Home />
      </Provider>
  );
};
export default App;
