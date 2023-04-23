import { useQuery } from 'react-query';
import api from '../../api';

export const useStudiosData = (onError) => {
    return useQuery(
        'studios',
        api.getStudios,
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            onError
        }
    );
}