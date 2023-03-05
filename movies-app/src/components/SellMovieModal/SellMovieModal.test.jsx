import { render, screen } from "@testing-library/react";
import SellMovieModal from "./SellMovieModal";

const studios = [{ id: 5, name: "Disney studios" }];
const movie = {
  name: "The avengers",
  studioId: 5,
};

describe("SellMovieModal", () => {
  it("Renders", () => {
    const onSubmit = jest.fn(() => { });
    const closeModal = jest.fn(() => { });
    render(
      <SellMovieModal
        isOpen={true}
        closeModal={closeModal}
        movie={movie}
        studios={studios}
        onSubmit={onSubmit}
      />
    );

    const name = screen.getByText(movie.name, { exact: false });
    const studiosLabel = screen.queryByLabelText('Studio');

    expect(onSubmit).not.toHaveBeenCalled();
    expect(closeModal).not.toHaveBeenCalled();
    expect(name).toBeTruthy();
    expect(studiosLabel).toBeTruthy();
  });
});
