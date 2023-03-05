import { render, screen } from "@testing-library/react";
import MovieFilters from "./MovieFilters";

describe("MovieFilters", () => {
  it("Renders", () => {
    render(<MovieFilters filters={{}} onChangeFilter={() => { }} />);
    const title = screen.queryByLabelText("Title");
    const priceMin = screen.queryByLabelText("Price Min");
    const priceMax = screen.queryByLabelText("Price Max");
    const genre = screen.queryByLabelText("Genre");

    expect(title).toBeInTheDocument();
    expect(priceMin).toBeInTheDocument();
    expect(priceMax).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
  });

  it("Displays input values", () => {
    const filters = {
      title: "Hi",
      price: { min: 0, max: 900 },
      genre: { name: "Hola", id: 1 },
    };
    const genreOptions = [
      filters.genre
    ];
    render(
      <MovieFilters
        filters={filters}
        onChangeFilter={jest.fn()}
        genreOptions={genreOptions}
      />
    );

    const title = screen.queryByLabelText("Title");
    const priceMin = screen.queryByLabelText("Price Min");
    const priceMax = screen.queryByLabelText("Price Max");
    const genre = screen.queryByLabelText("Genre");

    expect(title).toHaveValue(filters.title);
    expect(priceMin).toHaveValue(filters.price.min);
    expect(priceMax).toHaveValue(filters.price.max);
    expect(genre).toHaveValue(filters.genre.name);
  });
});
