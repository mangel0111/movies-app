/* eslint-disable testing-library/prefer-presence-queries */
import React from "react";
import { render } from "@testing-library/react";
import TestContainer from "../../components/Test/TestContainer";

import LoadingWrapper from ".";

const renderComponent = (loading) => {
  return render(
    <TestContainer>
      <LoadingWrapper loading={loading}>
        <p>Movies App Children</p>
      </LoadingWrapper>
    </TestContainer>
  );
};

describe("<LoadingWrapper/>", () => {
  it("Renders Loading Wrapper with no children as loading is true", async () => {
    const { findByTestId, queryByText } = renderComponent(true);
    expect(await findByTestId("movie-app-loader")).toBeInTheDocument();
    expect(queryByText("Movies App Children")).not.toBeInTheDocument();
  });

  it("Renders Loading Wrapper with children as loading is false", () => {
    const { getAllByText, queryByTestId } = renderComponent(false);
    expect(queryByTestId("movie-app-loader")).not.toBeInTheDocument();
    expect(getAllByText("Movies App Children")).not.toBeNull();
  });
});
