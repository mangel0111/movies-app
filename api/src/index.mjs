import logger from "./logger.mjs";
import app from "./server.mjs";

import { getMovies, transferMovie } from "./controllers/movies_controller.mjs";
import { getStudios } from "./controllers/studios_controller.mjs";
import { getGenre } from "./controllers/genres_controller.mjs";

app.get ("/movies", getMovies);
app.post("/movies/:id/transfer", transferMovie);
app.get ("/studios", getStudios);
app.get ("/genre", getGenre);

app.listen(4000, () => {
  logger.info(`Server up and running at port 4000! 🚀`);
});
