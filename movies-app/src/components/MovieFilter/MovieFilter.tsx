import './MovieFilter.css';

import { useEffect } from 'react';

import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchGenresRequest } from '../../store/genres/reducer';
import { Filter } from '../../store/movies/reducer';
import MovieFilterContent from './MovieFilterContent';

type Props = { filter: Filter; setFilter: React.Dispatch<React.SetStateAction<Filter>> };
const MovieFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const { loading } = useAppSelector((state) => state.genres);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenresRequest());
  }, []);

  if (loading) return <Spinner />;

  return <MovieFilterContent filter={filter} setFilter={setFilter} />;
};

export default MovieFilter;
