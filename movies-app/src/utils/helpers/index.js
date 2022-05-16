import { runSaga, stdChannel } from 'redux-saga';

export const getStudioDataFromMovie = (movie, studios) => studios.find(
  (studio) => studio.id === movie?.studioId,
);

export const getFilteredMovies = (movies, genre, title, minPrice, maxPrice) => {
  let filteredMovies = [...movies];
  if (genre.id !== 0) {
    filteredMovies = filteredMovies.filter(((movie) => movie.genre === genre.id));
  }

  filteredMovies = filteredMovies.filter(
    (movie) => {
      if (!maxPrice) {
        return movie.price >= minPrice;
      }
      return movie.price >= minPrice && movie.price <= maxPrice;
    },
  );

  filteredMovies = filteredMovies.filter(
    (movie) => movie.name.toUpperCase().includes(title.toUpperCase()),
  );

  return filteredMovies;
};

export const getFormattedPrice = (price) => new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
}).format(price);

export const getBuyerStudios = (movie, studios) => studios.filter(
  (studio) => studio.id !== movie?.studioId,
);

export const canBuyMovie = (movie, studio) => studio?.money >= movie?.price;

export const getUpdatedStudios = (studios, sellerId, buyerId, price) => studios.map((studio) => {
  if (studio.id === sellerId) {
    return {
      ...studio,
      money: studio.money + price,
    };
  }
  if (studio.id === buyerId) {
    return {
      ...studio,
      money: studio.money - price,
    };
  }
  return studio;
});

export const getUpdatedMovies = (movies, id, buyerId) => movies.map((movie) => {
  if (movie.id === id) {
    return {
      ...movie,
      studioId: buyerId,
    };
  }
  return movie;
});

export const getTextFieldCommonProps = (label, type, onKeyDown, startAdornment) => ({
  label,
  id: `${label.toLowerCase().replace(' ', '-')}-textfield`,
  'data-testid': `${label.toLowerCase().replace(' ', '-')}-input`,
  InputProps: {
    type,
    onKeyDown,
    startAdornment,
  },
});

export const run = (obj) => {
  const {
    getState,
    payload,
    saga,
    dispatchedActions = [],
    channel = stdChannel(),
  } = obj;

  dispatchedActions.length = 0;
  return runSaga(
    {
      dispatch: (action) => dispatchedActions.push(action),
      getState,
      channel,
    },
    saga,
    { payload },
  );
};
