import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import initLogger from './logs/index.mjs';
import router from './routes/index.mjs';

const app = express();

app.use(initLogger());
app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(3000);
