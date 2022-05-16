import React from 'react';
import {
  render, screen, fireEvent, within,
} from '@testing-library/react';
import Drawer from 'components/drawer';
import { selectSelectedMovie, selectSelectedStudio } from 'redux/selectors/global-app';
import { selectMoviesData } from 'redux/selectors/movies';
import { selectStudiosData } from 'redux/selectors/studios';
import { getMoviesMock, getStudiosMock } from 'mocks';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { MOVIE_PRICE, STUDIO_MONEY } from 'utils/constants';

jest.mock('redux/selectors/global-app');
jest.mock('redux/selectors/movies');
jest.mock('redux/selectors/studios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Drawer component', () => {
  test('should render component and sell button should be disabled due to studio money is not enough', () => {
    const movie = getMoviesMock.data[0];
    selectSelectedMovie.mockImplementation(() => movie.id);
    selectSelectedStudio.mockImplementation(() => '');
    selectMoviesData.mockImplementation(() => getMoviesMock.data);
    selectStudiosData.mockImplementation(() => getStudiosMock.data);

    const {
      getByRole, queryAllByRole, queryByText,
    } = render(
      <Provider store={store}>
        <Drawer />
      </Provider>,
    );

    const sellButton = screen.getByTestId('sell-button');

    expect(screen.queryByText(movie.name)).toBeDefined();
    expect(screen.queryByText(MOVIE_PRICE)).toBeDefined();
    expect(screen.queryByText(STUDIO_MONEY)).toBeNull();
    expect(sellButton).toHaveProperty('disabled', true);

    fireEvent.mouseDown(queryAllByRole('button')[1]);
    const listbox = within(getByRole('listbox'));

    fireEvent.click(listbox.getByText(/Warner Bros./i));

    expect(within(queryByText(STUDIO_MONEY))).not.toBeNull();
    expect(sellButton).toHaveProperty('disabled', true);
  });

  test('should render component and sell button should be enable due to studio money is enough', () => {
    const movie = getMoviesMock.data[1];
    selectSelectedMovie.mockImplementation(() => movie.id);
    selectSelectedStudio.mockReturnValueOnce('').mockReturnValueOnce('2');
    selectMoviesData.mockImplementation(() => getMoviesMock.data);
    selectStudiosData.mockImplementation(() => getStudiosMock.data);

    const {
      getByRole, queryAllByRole, queryByText, getByTestId,
    } = render(
      <Provider store={store}>
        <Drawer />
      </Provider>,
    );

    const sellButton = screen.getByTestId('sell-button');

    expect(screen.queryByText(movie.name)).toBeDefined();
    expect(screen.queryByText(MOVIE_PRICE)).toBeDefined();
    expect(screen.queryByText(STUDIO_MONEY)).toBeNull();
    expect(sellButton).toHaveProperty('disabled', true);

    fireEvent.mouseDown(queryAllByRole('button')[1]);
    const listbox = within(getByRole('listbox'));

    fireEvent.click(listbox.getByText(/Warner Bros./i));

    expect(within(queryByText(STUDIO_MONEY))).not.toBeNull();
    expect(getByTestId('sell-button')).toHaveProperty('disabled', false);
  });
});
