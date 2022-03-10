export const getStudios = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/studios`).then((response) => {
    return response.json();
  });
};
