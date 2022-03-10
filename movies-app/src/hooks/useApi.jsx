import axios from "axios";

const defaultOptions = {
  body: {},
  method: "GET",
  noAuth: false,
  hide4xxErrorNotifications: false,
};

export function apiCall(path, options = defaultOptions) {
  return api(`${process.env.REACT_APP_API_URL}${path}`, options)
    .then((data) => data.data)
    .catch((error) => {
      return Promise.reject(error);
    });
}

function api(path, { method, body }) {
  const axiosRequestConfig = {
    url: path,
    method,
    data: {
      ...body,
    },
  };
  return axios.request(axiosRequestConfig);
}
