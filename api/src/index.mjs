import express from "express";
import morgan from "morgan";
import logger from "./logger.mjs";
import cors from "cors";
import bodyParser from "body-parser";
import { getAllMoviesFromStudios } from "../src/helpers.mjs";
import {
  sony,
  warner,
  disney,
  movieAge,
  GENRE_ID,
} from "../constants/studio_constants.mjs";
import { transferMovie } from "./services/movie_service.mjs";
import { getStudios } from "./services/studio_service.mjs";

const app = express();

app.use(cors());
app.use(morgan("dev"))
app.use(bodyParser.json());

app.get("/studios", function(_, res) {
  const studios = getStudios();
  res.json(studios);
});

app.get("/movies", function(_, res) {
  try {
    res.json(getAllMoviesFromStudios([disney, warner, sony]));
  } catch (e) {
    res.status(500);
  }
});

app.get("/genre", function(_, res) {
  res.json(
    Object.entries(GENRE_ID).map((genre) => ({ id: genre[1], name: genre[0] }))
  );
});

app.get("/movieAge", function(_, res) {
  res.json(movieAge);
});

app.post("/transfer", function(req, res) {
  const { movieId, studioId } = req.body;
  const result = transferMovie(movieId, studioId);

  handleServiceResponse(result, res);
});

function handleServiceResponse(serviceResponse, res) {
  if (serviceResponse.success) {
    res.status(serviceResponse.status).json(serviceResponse.value || "Ok");
  } else {
    res
      .status(serviceResponse.status || 500)
      .json({ error: serviceResponse.message });
  }
}

app.listen(4000, () => {
  logger.info(`Server up and running at port 4000! 🚀`);
});
