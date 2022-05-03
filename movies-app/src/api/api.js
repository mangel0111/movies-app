const domain = "http://localhost:3000";
export const defaultAvatar =
  "https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg";

export const fetchAPI = (path, method = "GET", body) =>
  fetch(`${domain}/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data);
