import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { setupStore } from './store';
import { createResponseInterceptors } from './store/api';
import GlobalStyles from './styles/GlobalStyles';

const store = setupStore();

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <Fragment>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>,
);

// Doing this here allows the interceptor to dispatch actions
createResponseInterceptors(store.dispatch);
