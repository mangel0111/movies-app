const domain = 'http://localhost:3030'

export const getMovies = ({ genreId, minPrice, maxPrice, title }) => {
    let url = `movies?`
    if (genreId) url += `&genreId=${genreId}`
    if (minPrice) url += `&minPrice=${minPrice}`
    if (maxPrice) url += `&maxPrice=${maxPrice}`
    if (title) url += `&title=${title}`
    return fetch(`${domain}/${url}`)
        .then(response => {
            return response.json();
        })

}

export const transferMovie = ({ movieId, movieStudioId, nextStudioId }) => {
    return fetch(`${domain}/transfer`, {
        method: 'POST',
        body: JSON.stringify({ movieId:movieId, movieStudioId:movieStudioId, nextStudioId:nextStudioId }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
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

export const getGenres = () => {
    return fetch(`${domain}/genres`)
        .then(response => {
            return response.json();
        })

}