import React, {useState, useEffect} from 'react';
import { useStyles } from './FilterSection.styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import api from '../api';

const FilterSection = ({setFilterValues}) => {

    const [genres, setGenres] = useState([]);
    const styles = useStyles();
    const [filters, setFilters] = useState({
        genre: '',
        minPrice: '',
        maxPrice: '',
        title: '',
    });

    const handleChange = (event, key) => {
        setFilters((prevState) => ({...prevState, [key]: event.target.value}));
    };

    const handleButtonClick = () => {
        setFilterValues(filters);
    };

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);
    
    const fetchData = async () => {
        const genresData = await api.getGenres();
        setGenres(genresData);
    };

    return(<>
        <h3>Filters:</h3>
        <div className={styles.filterSection}>
            <TextField
                id="genre-filter"
                name="genre-filter"
                label="Genre"
                className={styles.filterItem}
                inputProps={{ 'data-testid': 'genre-filter' }}
                select
                variant="outlined"
                onChange={(e) => handleChange(e, 'genre')}
                value={filters.genre}
            >
                <MenuItem key={"all"} value={''}>
                    All
                </MenuItem>
                {genres.map(genre => 
                <MenuItem key={genre.key} value={genre.key}>{genre.text}</MenuItem>
                )}
            </TextField>
            
            <TextField 
                id="title-filter"
                label="Title"
                className={styles.filterItem}
                inputProps={{ 'data-testid': 'title-filter' }}
                variant="outlined"
                onChange={(e) => handleChange(e, 'title')}
                value={filters.title}    
            />

            <TextField 
                id="min-price-filter"
                label="Min Price"
                className={styles.filterItem}
                variant="outlined"
                inputProps={{ type: 'number', 'data-testid': 'min-price-filter' }}
                onChange={(e) => handleChange(e, 'minPrice')}
                value={filters.price}
            />

            <TextField 
                id="max-price-filter"
                label="Max Price"
                className={styles.filterItem}
                variant="outlined"
                inputProps={{ type: 'number', 'data-testid': 'max-price-filter' }}
                onChange={(e) => handleChange(e, 'maxPrice')}
                value={filters.price}
            />
            <Button 
                id="filterButton"
                className={styles.filterButton}
                variant="contained"
                onClick={handleButtonClick}
            >
                Filter
            </Button>
        </div>
    </>
    );
}

export default FilterSection;