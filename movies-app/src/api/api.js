export const domain = "http://localhost:3000";
export const defaultAvatar =
  "https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg";

export const fetchAPI = async (path, method = "GET", body) => {
  try {
    const res = await fetch(`${domain}/${path}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
