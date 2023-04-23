import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../api';

const fetchMovies = ({ queryKey }) => {
    return api.getMovies(queryKey[1])
}

export const useMoviesData = (filters, onError) => {
    return useQuery(
        ['movies', filters],
        fetchMovies,
        {
            onError,
        }
    );
}

export const useTransferMovie = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation((transferData) => api.transferMovie(transferData), {
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries('movies');
        },
        onError,
    });
}