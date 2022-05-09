import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { domain } from "./api/api";
import { movies, genres, studios } from "./__mocks__/api";

const moviesResponse = rest.get(`${domain}/movies`, (req, res, ctx) => {
  return res(ctx.json(movies));
});
const studiosResponse = rest.get(`${domain}/studios`, (req, res, ctx) => {
  return res(ctx.json(studios));
});
const genresResponse = rest.get(`${domain}/genres`, (req, res, ctx) => {
  return res(ctx.json(genres));
});

const handlers = [moviesResponse, studiosResponse, genresResponse];
const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("Renders the movies list", async () => {
  const { container } = render(<App />);
  expect(container.getElementsByClassName("App").length).toBe(1);
});

it("Renders the movies cards", async () => {
  const { container } = render(<App />);
  await waitFor(
    () => {
      expect(container.getElementsByClassName("movie-wrapper").length).toBe(
        movies.length
      );
    },
    { timeout: 3000 }
  );
});

it("Renders the movies filtered by genre", async () => {
  const { container, getByTestId } = render(<App />);
  const genreInput = getByTestId("genre-input-test");
  fireEvent.change(genreInput, { target: { value: "9" } });
  await waitFor(
    () => {
      expect(container.getElementsByClassName("movie-wrapper").length).toBe(3);
    },
    { timeout: 1000 }
  );
});
