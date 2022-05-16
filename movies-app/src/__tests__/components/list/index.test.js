import React from 'react';
import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import List from 'components/list';
import { Provider } from 'react-redux';
import store from 'redux/store';
import {
  ALL_GENRES,
  MOVIE_NOT_FOUND,
} from 'utils/constants';
import { selectMoviesData } from 'redux/selectors/movies';
import { getMoviesMock, getStudiosMock } from 'mocks';
import { selectStudiosData } from 'redux/selectors/studios';
import {
  selectMinPrice, selectSelectedGenre, selectTitleText, selectMaxPrice,
} from 'redux/selectors/global-app';
import { globalApp } from 'redux/reducers/global-app';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));
jest.mock('redux/selectors/movies');
jest.mock('redux/selectors/studios');
jest.mock('redux/selectors/global-app');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('List component', () => {
  test('should render component with not found message', () => {
    selectMoviesData.mockImplementation(() => []);
    selectStudiosData.mockImplementation(() => getStudiosMock.data);
    selectSelectedGenre.mockImplementation(() => ALL_GENRES);
    selectTitleText.mockImplementation(() => '');
    selectMinPrice.mockImplementation(() => '');
    selectMaxPrice.mockImplementation(() => '');

    render(
      <Provider store={store}>
        <List />
      </Provider>,
    );

    expect(screen.queryByText(MOVIE_NOT_FOUND)).toBeDefined();
  });

  test('should render component with all the movies', () => {
    selectMoviesData.mockImplementation(() => getMoviesMock.data);
    selectStudiosData.mockImplementation(() => getStudiosMock.data);
    selectSelectedGenre.mockImplementation(() => ALL_GENRES);
    selectTitleText.mockImplementation(() => '');
    selectMinPrice.mockImplementation(() => '');
    selectMaxPrice.mockImplementation(() => '');

    render(
      <Provider store={store}>
        <List />
      </Provider>,
    );

    expect(screen.queryByText(MOVIE_NOT_FOUND)).toBeNull();
    getMoviesMock.data.map((movie) => expect(screen.queryByText(movie.name)).toBeDefined());
  });

  test('should render component with movies that only match the "Night" word and dispatch setSelectedMovie after the click event', () => {
    selectMoviesData.mockImplementation(() => getMoviesMock.data);
    selectStudiosData.mockImplementation(() => getStudiosMock.data);
    selectSelectedGenre.mockImplementation(() => ALL_GENRES);
    selectTitleText.mockImplementation(() => 'Night');
    selectMinPrice.mockImplementation(() => '');
    selectMaxPrice.mockImplementation(() => '');

    const id = '23';

    render(
      <Provider store={store}>
        <List />
      </Provider>,
    );

    expect(screen.queryByText(MOVIE_NOT_FOUND)).toBeNull();
    expect(screen.queryByText('The avengers')).toBeNull();
    expect(screen.queryByText('The dark knight rises')).toBeDefined();

    const gridMovie = screen.getByTestId(`grid-movie-${id}`);
    fireEvent.click(gridMovie);

    const { calls } = mockDispatch.mock;
    expect(calls[0][0]).toStrictEqual(globalApp.setSelectedMovie(id));
  });
});
