export const GET = async (path) => {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return [false, data];
  } catch (error) {
    return [true, error];
  }
};

export const POST = async (path, body) => {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return [false, data];
  } catch (error) {
    return [true, error];
  }
};
