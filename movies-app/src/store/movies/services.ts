import api from '../api';

export const postTransferMovie = async (body) => {
  return await api.post('transfer', body);
};
