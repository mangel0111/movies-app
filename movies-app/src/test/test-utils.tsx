import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../store';

export const reduxRender = (
  ui,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = {},
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};