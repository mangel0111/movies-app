export const getMovies = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/movies`).then((response) => {
    return response.json();
  });
};
