import './MovieFilter.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenresRequest } from '../../store/genres/reducer';
import Spinner from '../../components/Spinner';
import MovieFilterContent from './MovieFilterContent';

const MovieFilter = ({ filter, setFilter }) => {
  const { loading } = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenresRequest())
  }, []);

  if (loading) return <Spinner />;

  return <MovieFilterContent filter={filter} setFilter={setFilter} />;
};

export default MovieFilter;
