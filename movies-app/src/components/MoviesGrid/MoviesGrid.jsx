import React from 'react'
import { Grid } from '@material-ui/core'
import Container from '../Container/Container'
import StudioContainer from '../StudioContainer/StudioContainer'
import Filters from '../Filters/Filters'
import * as Api from '../../api'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '../Card/Card'
import { useDispatch, useSelector } from "react-redux";
const MoviesGrid = () => {
    const dispatch = useDispatch();
    const {movies, studios, genresList, filters} = useSelector((state) => state);

    const isSmallCard = useMediaQuery('(max-width:600px)')

    React.useEffect(() => {
        Api.getStudios()
            .then(studios => {
                dispatch({type: "UPDATE_STUDIOS", payload: studios})
            });
        Api.getGenres()
            .then(genres => {
                dispatch({type: "UPDATE_GENRES", payload: genres})
            });
    }, [])

    React.useEffect(() => {
        Api.getMovies(filters)
            .then(movies => {
                dispatch({type: "UPDATE_MOVIES", payload: movies})
            });
    }, [filters])

    const handleFilterChange = (id) => {
        return (e) => {
            if (['minPrice', 'maxPrice'].includes(id)) {
                if ((/^\d*$/).test(e.target.value)) {
                    dispatch({type: "UPDATE_FILTERS", payload: {[id]: e.target.value}})
                }
            } else {
                dispatch({type: "UPDATE_FILTERS", payload: {[id]: e.target.value}})
            }
        }
    }

    return (
        <Container>
            <StudioContainer>
                <h3 id="title">Images:</h3>
                <Filters {...{ genresList, handleFilterChange, filters }} />
                <Grid container justify="center" alignItems="center">
                    {movies.map(movie =>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Card {...{ isSmallCard, movie }} />
                        </Grid>)}
                </Grid>
            </StudioContainer>
        </Container>
    )

}

export default MoviesGrid
