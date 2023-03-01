import { Grid, Autocomplete, TextField } from "@mui/material";

function MovieFilters({ filters, onChangeFilter, genreOptions }) {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ margin: "1rem" }}
    >
      <Grid item>
        <TextField
          id="filter-title"
          label="Title"
          value={filters.title}
          size={"small"}
          onChange={(e) => onChangeFilter("title", e.target.value)}
        />
      </Grid>

      <Grid item>
        <Autocomplete
          value={filters.genre}
          onChange={(_, newValue) => onChangeFilter("genre", newValue)}
          disablePortal
          id="filter-genre"
          options={genreOptions || []}
          size={"small"}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Genre" />}
        />
      </Grid>

      <Grid item>
        <TextField
          type="number"
          label="Price"
          size={"small"}
          value={filters.price}
          onChange={(e) => onChangeFilter("price", e.target.value)}
        />
      </Grid>
    </Grid>
  );
}

export default MovieFilters;
