const domain = 'http://localhost:3030'

export const getMovies = () => {
    return fetch(`${domain}/movies`)
        .then(response => {
            return response.json();
        })

}

export const getStudios = () => {
    return fetch(`${domain}/studios`)
        .then(response => {
            return response.json();
        })

}