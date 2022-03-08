export const actionsTypes = {
    UPDATE_MOVIES: "UPDATE_MOVIES",
    UPDATE_STUDIOS: "UPDATE_STUDIOS",
    UPDATE_GENRES: "UPDATE_GENRES",
    UPDATE_FILTERS: "UPDATE_FILTERS"
}

export const updateMovies = (payload) => {
    return { type: actionsTypes.UPDATE_MOVIES, payload: payload }
}

export const updateStudios = (payload) => {
    return { type: actionsTypes.UPDATE_STUDIOS, payload: payload }
}

export const updateGenres = (payload) => {
    return { type: actionsTypes.UPDATE_GENRES, payload: payload }
}

export const updateFilters = (payload) => {
    return { type: actionsTypes.UPDATE_FILTERS, payload: payload }
}