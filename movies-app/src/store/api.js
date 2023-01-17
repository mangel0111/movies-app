import axios from 'axios';
import { sendError, sendSuccess } from './messages/reducer';

const api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

export const createResponseInterceptors = (dispatch) => {
  api.interceptors.response.use(resp => {
    const message = resp.data?.message;
    if (message) { // will check for any 200 response having a 'message' attribute on its data (I'm using that on POST /transfer)
      dispatch(sendSuccess(message));
    }
    return Promise.resolve(resp);
  }, error => {
    const message = error?.response?.data?.message || error.message;
    dispatch(sendError(message));
    return Promise.reject(error);
  });
};

export default api;
