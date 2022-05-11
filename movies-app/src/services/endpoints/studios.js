import {GET, POST} from '../../httpClient';

const BASE_URL = 'http://localhost:3000';

const endpoints = {
  v1: {
    studios: `${BASE_URL}/studios`,
    transferMovie: `${BASE_URL}/transfer`
  }
};

const StudiosAPI = {
  getStudiosAPI: () => GET(endpoints.v1.studios),
  postTransferMovieAPI: (movieId, studioId, buyerStudioId) =>
    POST(endpoints.v1.transferMovie, {
      movieId,
      studioId,
      buyerStudioId
    })
};

export default StudiosAPI;
