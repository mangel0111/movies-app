import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Filter from 'components/filter';
import { selectSelectedGenre } from 'redux/selectors/global-app';
import { getGenresMock } from 'mocks';
import { Provider } from 'react-redux';
import store from 'redux/store';
import {
  ALL_GENRES, GENRE, MAX_PRICE, MIN_PRICE, TITLE,
} from 'utils/constants';
import { selectGenresData } from 'redux/selectors/genres';
import { globalApp } from 'redux/reducers/global-app';

const mockDispatch = jest.fn();
jest.mock('redux/selectors/genres');
jest.mock('redux/selectors/global-app');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Filter component', () => {
  test('should render component, change inputs values and finally reset them', () => {
    selectGenresData.mockImplementation(() => getGenresMock.data);
    selectSelectedGenre.mockImplementation(() => ALL_GENRES);

    const title = 'Night';
    const minPrice = '100';
    const maxPrice = '1000';

    render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );

    expect(screen.queryByText(GENRE)).toBeDefined();
    expect(screen.queryByText(MIN_PRICE)).toBeDefined();
    expect(screen.queryByText(MAX_PRICE)).toBeDefined();
    expect(screen.queryByText(TITLE)).toBeDefined();
    expect(screen.queryByText(TITLE)).toBeDefined();

    const minPriceInput = screen.getByTestId('min-price-input').querySelector('input');
    fireEvent.change(minPriceInput, { target: { value: minPrice } });
    expect(minPriceInput.value).toBe(minPrice);

    const maxPriceInput = screen.getByTestId('max-price-input').querySelector('input');
    fireEvent.change(maxPriceInput, { target: { value: maxPrice } });
    expect(maxPriceInput.value).toBe(maxPrice);

    const titleInput = screen.getByTestId('title-input').querySelector('input');
    fireEvent.change(titleInput, { target: { value: title } });
    expect(titleInput.value).toBe(title);

    fireEvent.keyDown(titleInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    const { calls } = mockDispatch.mock;

    expect(calls[0][0]).toStrictEqual(globalApp.setMinPrice(minPrice));
    expect(calls[1][0]).toStrictEqual(globalApp.setMaxPrice(maxPrice));
    expect(calls[2][0]).toStrictEqual(globalApp.setTitleText(title));

    const resetFiltersButton = screen.getByTestId('reset-filters-button');
    fireEvent.click(resetFiltersButton);
    expect(minPriceInput.value).toBe('');
    expect(maxPriceInput.value).toBe('');
    expect(titleInput.value).toBe('');
    expect(calls[3][0]).toStrictEqual(globalApp.resetFilters());
  });
});
