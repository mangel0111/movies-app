import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getAllMoviesFromStudios,
  almostTransferMovie,
} from "../src/helpers.mjs";
import {
  sony,
  warner,
  disney,
  movieAge,
} from "../constants/studio_constants.mjs";

const app = express();

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
    res.statusCode(500);
  }
});

app.get("/movieAge", function (req, res) {
  res.json(movieAge);
});

app.post("/transfer", function (req, res) {
  const { movieId, movieStudioId, transferStudioId } = req.body;
  if (req.method === "POST") {
    try {
      const updatedStudiosMap = almostTransferMovie({
        movieId,
        movieStudioId,
        transferStudioId,
      });
      const updatedMovies = getAllMoviesFromStudios(
        Object.values(updatedStudiosMap),
        {}
      );
      res.json({ updatedMovies });
    } catch (error) {
      res.statusCode(500).json({
        status: "fail",
        message: `Error on movie transfer from ${movieStudioId} to ${transferStudioId}`,
      });
    }
  }
});

// TODO: 2 Add logging capabilities into the movies-app

app.listen(3001);
