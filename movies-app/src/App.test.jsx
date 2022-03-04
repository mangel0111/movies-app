import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { movieServices } from "./Services/movieServices";

import MoviesSuccess from "./Mocks/movies--success.json";
import GenresSuccess from "./Mocks/genres--success.json";
import StudiosSuccess from "./Mocks/studios--success.json";

import "@testing-library/jest-dom";

jest.mock("./Services/movieServices");

describe("App", () => {
  const renderApp = () => render(<App />);

  movieServices.fetchMovies = jest.fn();
  movieServices.fetchGenres = jest.fn();
  movieServices.fetchStudios = jest.fn();

  beforeEach(() => {
    movieServices.fetchMovies.mockResolvedValue(MoviesSuccess);
    movieServices.fetchGenres.mockResolvedValue(GenresSuccess);
    movieServices.fetchStudios.mockResolvedValue(StudiosSuccess);

    return renderApp();
  });

  it("should render every movie", () => {
    expect(screen.getByRole("img", { name: /Nightmare before christmas/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Last action hero/i })).toBeInTheDocument();
  });

  it("should render a studios filter", async () => {
    const studiosFilter = screen.getByRole("button", { name: /Select a studio/i });
    expect(studiosFilter).toBeInTheDocument();
    fireEvent.mouseDown(studiosFilter);
    expect(await screen.getAllByRole("option").length).toEqual(StudiosSuccess.length + 1);
  });

  it("should filter by studio", () => {
    const studiosFilter = screen.getByRole("button", { name: /Select a studio/i });
    fireEvent.mouseDown(studiosFilter);
    const disneyOption = screen.getByRole("option", { name: "Disney studios" });
    fireEvent.click(disneyOption);
    expect(screen.getAllByRole("img").length).toEqual(4);
  });

  it("should render a genre filter", async () => {
    const genresFilter = screen.getByRole("button", { name: /Select a genre/i });
    expect(genresFilter).toBeInTheDocument();
    fireEvent.mouseDown(genresFilter);
    expect(await screen.getAllByRole("option").length).toEqual(GenresSuccess.length + 1);
  });

  it("should filter by genre", () => {
    const genresFilter = screen.getByRole("button", { name: /Select a genre/i });
    fireEvent.mouseDown(genresFilter);
    const heroOption = screen.getByRole("option", { name: "heroes" });
    fireEvent.click(heroOption);
    expect(screen.getAllByRole("img").length).toEqual(3);
  });

  it("should render a title filter", () => {
    const inputTitle = screen.getByPlaceholderText("Title");
    expect(inputTitle).toBeInTheDocument();
  });

  it("should filter by title", () => {
    const inputTitle = screen.getByPlaceholderText("Title");
    fireEvent.change(inputTitle, {
      target: {
        value: "Nightmare",
      },
    });
    expect(screen.getByRole("img", { name: /Nightmare before christmas/i })).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBe(1);
  });

  it("should render a transfer from filter", () => {
    const originFilter = screen.getByRole("button", { name: /From: Pick a origin/i });
    fireEvent.mouseDown(originFilter);
    expect(screen.getAllByRole("option").length).toEqual(StudiosSuccess.length + 1);
  })

  it("should render a destiny filter", () => {
    const destinyFilter = screen.getByRole("button", { name: /To: Pick a destiny/i });
    fireEvent.mouseDown(destinyFilter);
    expect(screen.getAllByRole("option").length).toEqual(StudiosSuccess.length + 1);
  })

  it("should render a movies filter", () => {
    const movieFilter = screen.getByRole("button", { name: /Movie:/i })
    fireEvent.mouseDown(movieFilter);
    expect(screen.getAllByRole("option").length).toEqual(MoviesSuccess.length + 1);
  })
});
