const domain = 'http://localhost:3001';

const getMovies = async () => {
    const moviesResponse = await fetch(`${domain}/movies`);
    const moviesData = await moviesResponse.json();
    return moviesData
};

const getStudios = async () => {
    const studiosResponse = await fetch(`${domain}/studios`);
    const studiosData = await studiosResponse.json();
    return studiosData;
};

export default {
    getMovies,
    getStudios
}