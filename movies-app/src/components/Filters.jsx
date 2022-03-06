import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Selector from './Selector'

const Filters = ({ filters, genresList, handleFilterChange }) => {
    return (
        <Grid container>
            <Grid item xs>
                <Selector value={filters.genreId} options={genresList} onChange={handleFilterChange('genreId')} label="Genre" />
            </Grid>
            <Grid item xs>
                <TextField inputProps={{ inputMode: 'numeric' }} value={filters.minPrice} label="Min Price" onChange={handleFilterChange('minPrice')} />
            </Grid>
            <Grid item xs>
                <TextField value={filters.maxPrice} label="Max Price" onChange={handleFilterChange('maxPrice')} />
            </Grid>
            <Grid item xs>
                <TextField value={filters.title} label="Title" onChange={handleFilterChange('title')} />
            </Grid>
        </Grid>
    )
}

export default Filters