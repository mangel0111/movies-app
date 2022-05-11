export const isValidTransaction = (studio, movie) => {
  if (studio?.money - movie?.price >= 0) {
    return true;
  }
  return false;
};
