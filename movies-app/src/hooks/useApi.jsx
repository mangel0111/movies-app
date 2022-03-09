import axios from "axios";

export function apiCall(path) {
  return api(`${process.env.REACT_APP_API_URL}${path}`)
    .then((data) => data.data)
    .catch((error) => {
      return Promise.reject(error);
    });
}

function api(path) {
  const axiosRequestConfig = {
    url: path,
  };
  return axios.request(axiosRequestConfig);
}
