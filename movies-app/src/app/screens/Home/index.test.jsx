/* eslint-disable testing-library/prefer-presence-queries */
import React from "react";
import {
  act,
  fireEvent,
  getAllByText,
  queryByText,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import TestContainer from "../../../components/Test/TestContainer";
import { rest, server } from "../../../utils/MockServer/node";
import { MOVIES_TEST_MOCK } from "../../../constants/mocks";

import Home from ".";

const renderComponent = () => {
  return render(
    <TestContainer>
      <Home />
    </TestContainer>
  );
};

beforeEach(() => {
  server.use(
    rest.get(`http://localhost:3001/movies`, (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(MOVIES_TEST_MOCK));
    })
  );
});

describe("<Home/>", () => {
  it("Renders Home with all Movies", async () => {
    const { findByTestId, getByTestId, findByText, getByText } =
      renderComponent();
    expect(await findByTestId("movie-app-loader")).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId("movie-app-loader"));
    expect(await findByText("Images")).toBeInTheDocument();
    expect(
      getByText(`${MOVIES_TEST_MOCK[0].name} - $${MOVIES_TEST_MOCK[0].price}`)
    ).not.toBeNull();
    expect(
      getByText(`${MOVIES_TEST_MOCK[1].name} - $${MOVIES_TEST_MOCK[1].price}`)
    ).not.toBeNull();
    expect(
      getByText(`${MOVIES_TEST_MOCK[2].name} - $${MOVIES_TEST_MOCK[2].price}`)
    ).not.toBeNull();
  });

  it("Renders Home with all Movies and it filters by name", async () => {
    const { findByTestId, getByTestId, getByText, findByText, queryByText } =
      renderComponent();
    expect(await findByTestId("movie-app-loader")).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId("movie-app-loader"));
    expect(await findByText("Images")).toBeInTheDocument();

    //Find search input
    const searchInput = await findByTestId("movies-app-search-input");

    // Write The Lord Of The Rings in the search input and press Enter
    await act(async () => {
      await fireEvent.change(searchInput, {
        target: { value: MOVIES_TEST_MOCK[0].name },
      });
      await fireEvent.keyDown(searchInput, {
        key: "Enter",
        code: 13,
        charCode: 13,
      });
    });

    expect(
      getByText(`${MOVIES_TEST_MOCK[0].name} - $${MOVIES_TEST_MOCK[0].price}`)
    ).not.toBeNull();
    expect(queryByText(MOVIES_TEST_MOCK[1].name)).toBeNull();
    expect(queryByText(MOVIES_TEST_MOCK[2].name)).toBeNull();
  });

  it("Renders Home with all Movies and it filters by price", async () => {
    const { findByTestId, getByTestId, getByText, findByText, queryByText } =
      renderComponent();
    expect(await findByTestId("movie-app-loader")).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId("movie-app-loader"));
    expect(await findByText("Images")).toBeInTheDocument();

    //Find search input
    const searchInput = await findByTestId("movies-app-search-input");

    // Write the price 666 for Harry Potter in the search input and press Enter
    await act(async () => {
      await fireEvent.change(searchInput, {
        target: { value: 666 },
      });
      await fireEvent.keyDown(searchInput, {
        key: "Enter",
        code: 13,
        charCode: 13,
      });
    });

    expect(queryByText(MOVIES_TEST_MOCK[0].name)).toBeNull();
    expect(
      getByText(`${MOVIES_TEST_MOCK[1].name} - $${MOVIES_TEST_MOCK[1].price}`)
    ).not.toBeNull();
    expect(queryByText(MOVIES_TEST_MOCK[2].name)).toBeNull();
  });

  it("Renders Home with all Movies and it filters by genre", async () => {
    const { findByTestId, getByTestId, getByText, findByText, queryByText } =
      renderComponent();
    expect(await findByTestId("movie-app-loader")).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId("movie-app-loader"));
    expect(await findByText("Images")).toBeInTheDocument();

    //Find search input
    const searchInput = await findByTestId("movies-app-search-input");

    // Write the category HEROES genre for Back To The Future in the search input and press Enter
    await act(async () => {
      await fireEvent.change(searchInput, {
        target: { value: "HEROES" },
      });
      await fireEvent.keyDown(searchInput, {
        key: "Enter",
        code: 13,
        charCode: 13,
      });
    });

    expect(queryByText(MOVIES_TEST_MOCK[0].name)).toBeNull();
    expect(queryByText(MOVIES_TEST_MOCK[1].name)).toBeNull();
    expect(
      getByText(`${MOVIES_TEST_MOCK[2].name} - $${MOVIES_TEST_MOCK[2].price}`)
    ).not.toBeNull();
  });
});
