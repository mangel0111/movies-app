import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useMoviesBoard from "../../hooks/useMoviesBoard";  
import MoviesBoard from "./MoviesBoard";

const studios = [
  {
    id: "1",
    name: "Disney studios",
    money: 1000,
  },
  {
    id: "2",
    name: "Warner Bros.",
    money: 900,
  },
  {
    id: "3",
    name: "Sony Pictures",
    money: 700,
  },
];

const movies = [
  { name: "Spider-man into the spider-verse", genre: 4, studioId: 3 },
  { name: "Spider-man", genre: 1, studioId: 3 },
  { name: "Last action hero", genre: 9, studioId: 3 },
];

jest.mock("../MovieFilters", () => () => <div />);
jest.mock("../../hooks/useMoviesBoard.js");
/* jest.mock("../../api/studios.js"); */

it("Renders", async () => {
  useMoviesBoard.mockImplementation(() => ({
    movies,
    studios,
    genre: [],
    reFetchMovies: () => {}
  }));

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => render(<MoviesBoard />));

  movies.forEach((movie) => {
    const movieElement = screen.queryByText(movie.name);
    expect(movieElement).toBeInTheDocument();
  });

  expect(useMoviesBoard).toHaveBeenCalled();
});
