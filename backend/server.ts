import express from "express";
import bodyParser from 'body-parser';

import {router } from './routers/user';
import {routerAuth} from './routers/auth';

import { genRandomString } from './utils/hash';

export const app = express();
const port = 8080;
export const currentServerSalt = genRandomString(16);


app.use(bodyParser.json());


app.get("/live", (req, res) => {
  res.send("200 OK");
});

app.use('/', router);
app.use('/', routerAuth);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
