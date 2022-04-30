const domain = "http://localhost:3000";
export const defaultAvatar =
  "https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg";

export const fetchStudios = () =>
  fetch(`${domain}/studios`)
    .then((response) => {
      return response.json();
    })
    .then((studios) => studios);

export const fetchMovies = () =>
  fetch(`${domain}/movies`)
    .then((response) => {
      return response.json();
    })
    .then((movies) => movies);
