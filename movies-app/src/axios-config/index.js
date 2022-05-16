import axios from 'axios';
import { DOMAIN } from 'utils/constants';

const instance = axios.create({
  baseURL: DOMAIN,
});

export default instance;
