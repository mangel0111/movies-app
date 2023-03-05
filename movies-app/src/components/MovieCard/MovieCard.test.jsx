import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

const testStudio = {5: "Disney studios"};
const referreIssueMovie = {
  name: "The avengers",
  studioId: 5,
  img: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/The_Avengers_Poster.png/revision/latest?cb=20150610135853&path-prefix=es",
};

describe("MovieItem", () => {
  it("Renders", () => {
    render(<MovieCard movie={referreIssueMovie} studios={testStudio} />);

    const name = screen.queryByText(referreIssueMovie.name);
    const studio = screen.queryByText(Object.values(testStudio)[0]);

    expect(name).toBeTruthy();
    expect(studio).toBeTruthy();
  });

  it("Should have referrer attribute", () => {
    render(<MovieCard movie={referreIssueMovie} studios={testStudio} />);
    const img = screen.queryByAltText(referreIssueMovie.name);
    expect(img).toBeTruthy(); 
    expect(img).toHaveAttribute("referrerPolicy", "no-referrer");
  });
});
