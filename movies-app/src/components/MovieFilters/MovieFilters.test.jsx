import { render, screen } from "@testing-library/react";
import MovieFilters from "./MovieFilters";

describe("MovieFilters", () => {
  it("Renders", () => {
    render(<MovieFilters filters={{}} onChangeFilter={() => { }} />);
    const title = screen.queryByLabelText("Title");
    const price = screen.queryByLabelText("Price");
    const genre = screen.queryByLabelText("Genre");

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
  });

  it("Displays input values", () => {
    const filters = { title: "Hi", price: 90, genre: "1" };
    const genreOptions = ['1', '2']
    render(
      <MovieFilters
        filters={filters}
        onChangeFilter={jest.fn()}
        genreOptions={genreOptions}
      />
    );

    const title = screen.queryByLabelText("Title");
    const price = screen.queryByLabelText("Price");
    const genre = screen.queryByLabelText("Genre");

    expect(title).toHaveValue(filters.title);
    expect(price).toHaveValue(filters.price);
    expect(genre).toHaveValue("1");
  });
});
