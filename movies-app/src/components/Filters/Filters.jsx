import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Selector from '../Selector/Selector'

const Filters = ({ filters, genresList, handleFilterChange }) => {
    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <Selector value={filters.genreId} options={genresList} onChange={handleFilterChange('genreId')} label="Genre" />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField fullWidth value={filters.minPrice} placeholder={"Enter min price"} id="minPrice" label="Min Price" onChange={handleFilterChange('minPrice')} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField fullWidth value={filters.maxPrice} id="maxPrice" label="Max Price" onChange={handleFilterChange('maxPrice')} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField fullWidth value={filters.title} id="Title" label="Title" onChange={handleFilterChange('title')} />
            </Grid>
        </Grid>
    )
}

export default Filters