const getMovieIndex = (movieId, studio) =>
  studio.movies.findIndex((movie) => movie.id === movieId);

const getStudioById = (studioId, studios) =>
  studios.find((studio) => studio.id === studioId);

const removeMovieFromSeller = (movieId, sellerStudio) => {
  //sumar el precio de la pelicula a money
  const movieIndex = getMovieIndex(movieId, sellerStudio);
  return sellerStudio.movies.splice(movieIndex, 1)[0];
};

const setMovieToBuyer = (movie, buyerStudio, sellerStudio) => {
  //restar el precio de la pelicula a money
  sellerStudio.money += movie.price;
  buyerStudio.money -= movie.price;
  buyerStudio.movies.push(movie);
};

export const updateStudio = (movieId, studioId, buyerStudioId, studios) => {
  const sellerStudio = getStudioById(studioId, studios);
  const buyerStudio = getStudioById(buyerStudioId, studios);
  if (!sellerStudio || !buyerStudio) {
    throw new Error('Studio not found');
  }
  const movie = removeMovieFromSeller(movieId, sellerStudio);
  setMovieToBuyer(movie, buyerStudio, sellerStudio);
  return 'Movie was sold successfully!';
};
