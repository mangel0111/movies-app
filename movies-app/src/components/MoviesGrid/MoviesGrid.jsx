import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Container from '../Container/Container'
import StudioContainer from '../StudioContainer/StudioContainer'
import Filters from '../Filters/Filters'
import * as Api from '../../api'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '../Card/Card'
import { useDispatch, useSelector } from "react-redux";
import { updateGenres, updateStudios, updateMovies, updateFilters } from "../../actions"

const MoviesGrid = () => {
    const dispatch = useDispatch();
    const { movies, studios, genresList, filters } = useSelector((state) => state);

    const isSmallCard = useMediaQuery('(max-width:600px)')

    React.useEffect(() => {
        if (!studios.length) {
            Api.getStudios()
                .then(studios => {
                    dispatch(updateStudios(studios))
                });
        }
        if (!genresList.length) {
            Api.getGenres()
                .then(genres => {
                    dispatch(updateGenres(genres))
                });
        }
    }, [dispatch, studios, genresList])

    React.useEffect(() => {
        Api.getMovies(filters)
            .then(movies => {
                dispatch(updateMovies(movies))
            });
    }, [filters, dispatch])

    const handleFilterChange = (id) => {
        return (e) => {
            let payload = { [id]: e.target.value }
            if (['minPrice', 'maxPrice'].includes(id) && !(/^\d*$/).test(e.target.value)) {
                payload = {}
            }
            dispatch(updateFilters(payload))
        }
    }

    return (
        <Container>
            <StudioContainer>
                <Typography variant="h3">Movies App</Typography>
                <Filters {...{ genresList, handleFilterChange, filters }} />
                <Grid container justify="center" spacing={2}>
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
