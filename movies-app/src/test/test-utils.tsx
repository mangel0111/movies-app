import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../store';

type CustomOptions<T> = {
  store?: ReturnType<typeof setupStore>;
  preloadedState?: PreloadedState<T>;
} & RenderOptions;

export const reduxRender = <T,>(ui: ReactElement, customOptions: CustomOptions<T> = {}) => {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = customOptions;

  const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
