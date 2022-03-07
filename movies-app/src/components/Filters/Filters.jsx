import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Selector from '../Selector/Selector'

const Filters = ({ filters, genresList, handleFilterChange }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Selector
                    variant="outlined"
                    value={filters.genreId}
                    options={genresList}
                    onChange={handleFilterChange('genreId')}
                    label="Genre"
                    color="primary"
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={filters.minPrice}
                    placeholder={"Enter min price"}
                    id="minPrice"
                    label="Min Price"
                    onChange={handleFilterChange('minPrice')}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={filters.maxPrice}
                    id="maxPrice"
                    label="Max Price"
                    onChange={handleFilterChange('maxPrice')}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={filters.title}
                    id="title"
                    label="Title"
                    onChange={handleFilterChange('title')}
                />
            </Grid>
        </Grid>
    )
}

export default Filters