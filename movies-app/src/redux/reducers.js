import {combineReducers} from 'redux';
import moviesReducer from './sagas/movies/movies.reducer';
import studiosReducer from './sagas/studios/studios.reducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  studios: studiosReducer
});

export default rootReducer;
