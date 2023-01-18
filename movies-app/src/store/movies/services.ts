import api from '../api';

type PostTransferMovie = { movieId: number; studioToId: number };
export const postTransferMovie = async (body: PostTransferMovie) => {
  return await api.post('transfer', body);
};
