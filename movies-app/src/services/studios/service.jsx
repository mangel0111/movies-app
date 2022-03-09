import { apiCall } from "../../hooks/useApi";

export const getStudios = () => apiCall(`/studios`);
