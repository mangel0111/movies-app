import { apiCall } from "../../hooks/useApi";

export const getMovies = () => apiCall(`/movies`);
