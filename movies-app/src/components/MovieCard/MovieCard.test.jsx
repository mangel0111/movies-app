import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

const testStudio = "Disney studios";
const referreIssueMovie = {
  name: "The avengers",
  studio: "Warner Bros",
  img: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/The_Avengers_Poster.png/revision/latest?cb=20150610135853&path-prefix=es",
};

describe("MovieItem", () => {
  it("Renders", () => {
    render(<MovieCard movie={referreIssueMovie} studio={testStudio} />);

    const name = screen.queryByText(referreIssueMovie.name);
    const studio = screen.queryByText(testStudio);

    expect(name).toBeTruthy();
    expect(studio).toBeTruthy();
  });

  it("Should have referrer attribute", () => {
    render(<MovieCard movie={referreIssueMovie} studio={testStudio} />);
    const img = screen.queryByAltText(referreIssueMovie.name);
    expect(img).toBeTruthy(); 
    expect(img).toHaveAttribute("referrerPolicy", "no-referrer");
  });
});
