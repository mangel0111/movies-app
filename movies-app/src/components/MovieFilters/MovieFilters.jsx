/* import { Autocomplete, TextField } from "@material-ui/core"; */

function MovieFilters({ filters, onChangeFilter }) {
  return (
    <>
      <input
        placeholder="Title"
        value={filters.title}
        onChange={(e) => onChangeFilter("title", e.target.value)}
      />

      {/* <Autocomplete */}
      {/*   disablePortal */}
      {/*   id="genre" */}
      {/*   options={[]} */}
      {/*   sx={{ width: 300 }} */}
      {/*   renderInput={(params) => <TextField {...params} label="Genre" />} */}
      {/* /> */}

      <input
        type="number"
        placeholder="Price"
        value={filters.price}
        onChange={(e) => onChangeFilter("price", e.target.value)}
      />
    </>
  );
}

export default MovieFilters;
