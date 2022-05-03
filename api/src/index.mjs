import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { getAllMoviesFromStudios } from '../src/helpers.mjs'
import { disney, movieAge, sony, warner } from '../constants/studio_constants.mjs'

const app = express();

app.use(cors());
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/studios', function (req, res) {
  let disneyTemp = {...disney}
  delete disneyTemp.movies
  let warnerTemp = {...warner}
  delete warnerTemp.movies
  let sonyTemp = {...sony}
  delete sonyTemp.movies
  res.json([
    disneyTemp,
    warnerTemp,
    sonyTemp
  ])
});

app.get('/movies', function (req, res) {
  try {
    res.json(getAllMoviesFromStudios([disney, warner, sony]))
  } catch (e) {
    res.statusCode(500)
  }
});

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});


app.post('/transfer', urlencodedParser, function (req, res) {
  // just return studio sold
  const { studio } = req.body;
  const studiosType = ['disney', 'movieAge', 'sony', 'warner'];
  if ( studio && studiosType.includes(studio)) {
    res.status(201).json(getAllMoviesFromStudios([eval(studio)]));
  } else {
    res.status(500).json({ message: 'any Error', status: 500});
  }
});


// apply authorization just in this http request
app.get('/disney', auth, function (req, res) {
  try {
    res.json(getAllMoviesFromStudios([disney]))
  } catch (e) {
    res.statusCode(500)
  }
});

function auth(req, res, next) {
  const MASTER_KEY = 'abc';
  const header = req.headers['authorization'];
  if (header) {
    const bearer = header.split(' ');
    const token = bearer[1];
    token === MASTER_KEY ? next() : res.json({ message: 'You dont have access'});
  } else {
    res.json({ message: 'You dont have access'})
  }
}

app.listen(3000)
