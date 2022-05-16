import { combineReducers } from 'redux';
import moviesReducer from './movies';
import studiosReducer from './studios';
import globalReducer from './global-app';
import genresReducer from './genres';

const rootReducer = combineReducers({
  movies: moviesReducer,
  studios: studiosReducer,
  globalApp: globalReducer,
  genres: genresReducer,
});

export default rootReducer;
