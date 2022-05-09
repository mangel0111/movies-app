import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getAllMoviesFromStudios,
  getGenres,
  transferMovie,
} from "../src/helpers.mjs";
import {
  sony,
  warner,
  disney,
  movieAge,
} from "../constants/studio_constants.mjs";
import winston from "winston";

const app = express();

// TODO: 2 Add logging capabilities into the movies-app
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

app.use(cors());
app.use(bodyParser.json());

app.get("/studios", function (req, res) {
  let disneyTemp = { ...disney };
  delete disneyTemp.movies;
  let warnerTemp = { ...warner };
  delete warnerTemp.movies;
  let sonyTemp = { ...sony };
  delete sonyTemp.movies;
  res.json([disneyTemp, warnerTemp, sonyTemp]);
});

app.get("/movies", function (req, res) {
  try {
    res.json(getAllMoviesFromStudios([disney, warner, sony]));
  } catch (e) {
    logger.error(e);
    res.statusCode(500);
  }
});

app.get("/movieAge", function (req, res) {
  res.json(movieAge);
});

app.get("/genres", function (req, res) {
  try {
    res.json(getGenres());
  } catch (e) {
    logger.error(e);
    res.statusCode(500);
  }
});

app.post("/movies/search", function (req, res) {
  const { body: filter } = req;
  try {
    res.json(getAllMoviesFromStudios([disney, warner, sony], filter));
  } catch (e) {
    logger.error(e);
    res.statusCode(500);
  }
});

//TODO: 1 add the capability to sell the movie rights to another studio
app.post("/transfer", function (req, res) {
  const {
    body: { movieId, studioId },
  } = req;
  try {
    const transferred = transferMovie(movieId, studioId);
    if (transferred) {
      res.json({
        movies: getAllMoviesFromStudios([disney, warner, sony]),
        ok: true,
      });
    } else {
      res.json({
        movies: getAllMoviesFromStudios([disney, warner, sony]),
        ok: false,
      });
    }
  } catch (e) {
    logger.error(e);
    res.statusCode(500);
  }
});

app.listen(3000);
