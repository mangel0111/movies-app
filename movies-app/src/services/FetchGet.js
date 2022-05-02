import { domain } from '../env/env';

export const FetchGet = (url) => {
  return fetch(domain + url)
    .then((response) => response.json())
    .catch((err) => err);
};
