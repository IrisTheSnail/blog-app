import express from "express";
import bodyParser from 'body-parser';

import {router } from './reqHandlers/user';

export const app = express();
const port = 8080;

app.use(bodyParser.json());


app.get("/live", (req, res) => {
  res.send("200 OK");
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
