import { actionsTypes } from '../actions'

const initialState = {
    movies: [],
    studios: [],
    genresList: [],
    filters: {
        genreId: '',
        minPrice: 0,
        maxPrice: undefined,
        title: undefined
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.UPDATE_MOVIES:
            return { ...state, movies: action.payload };
        case actionsTypes.UPDATE_STUDIOS:
            return { ...state, studios: action.payload };
        case actionsTypes.UPDATE_GENRES:
            return { ...state, genresList: action.payload };
        case actionsTypes.UPDATE_FILTERS:
            return { ...state, filters: { ...state.filters, ...action.payload } };
        default:
            return state;
    }
};

export default reducer