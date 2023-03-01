import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import getStudios from "../../api/studios";
import getMovies from "../../api/movies";
import App from "./App";

const studios = [
  {
    id: "1",
    name: "Disney studios",
    shortName: "Disney",
    logo: "https://cdn.mos.cms.futurecdn.net/qfFFFhnM8LwZnjpTECN3oB.jpg",
    money: 1000,
  },
  {
    id: "2",
    name: "Warner Bros.",
    shortName: "Warner",
    logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12c6f684-d447-4457-84fa-12033cfd581e/d9z4nxu-626ae303-e830-4b4f-ab8b-4aff7f1bef0f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyYzZmNjg0LWQ0NDctNDQ1Ny04NGZhLTEyMDMzY2ZkNTgxZVwvZDl6NG54dS02MjZhZTMwMy1lODMwLTRiNGYtYWI4Yi00YWZmN2YxYmVmMGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gtKaGVrDg8gzU7QFThusbHJw2d6bKgnDauezUcZo-1A",
    money: 900,
  },
  {
    id: "3",
    name: "Sony Pictures",
    shortName: "Sony",
    logo: "https://logoeps.com/wp-content/uploads/2013/05/sony-pictures-entertainment-vector-logo.png",
    money: 700,
  },
];

const movies = [
  { name: "Spider-man into the spider-verse", genre: 4, studioId: "3" },
  { name: "Spider-man", genre: 1, studioId: "3" },
  { name: "Last action hero", genre: 9, studioId: "3" },
];

jest.mock("../MovieFilters", () => () => <div />);
jest.mock("../../api/movies.js");
jest.mock("../../api/studios.js");

it("Renders", async () => {
  getStudios.mockImplementation(() => Promise.resolve(studios));
  getMovies.mockImplementation(() => Promise.resolve(movies));

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => render(<App />));

  movies.forEach((movie) => {
    const movieElement = screen.queryByText(movie.name);
    expect(movieElement).toBeInTheDocument();
  });

  expect(getStudios).toHaveBeenCalledTimes(1);
  expect(getMovies).toHaveBeenCalledTimes(1);
});
