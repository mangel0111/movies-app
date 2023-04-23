import { useQuery } from 'react-query';
import api from '../../api';

export const useGenresData = (onError) => {
    return useQuery(
        'genres',
        api.getGenres,
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            onError,
        }
    );
}