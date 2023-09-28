import express from "express";
import bodyParser from 'body-parser';

import { saltHashPassword } from "./hash";

const app = express();
const port = 8080;

app.use(bodyParser.json())


app.get("/live", (req, res) => {
  res.send("200 OK");
});

app.post("/signup", (req, res) => {
  
  let data = JSON.stringify(req.body);
  
  let parsing = JSON.parse(data);
  let username = parsing.username;
  let email = parsing.email;
  let hash_salt = saltHashPassword(parsing.password);  

  res.send("user : " + username + "registered \n hash :" + hash_salt.passwordHash + "\n salt :" + hash_salt.salt);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});


// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: '0.0.0.0',
//   database: 'database_blog',
//   password: 'password',
//   port: 5432,
// })


  // pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [username, email], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   res.status(201).send(`User added with ID: ${results.rows[0].id}`)
  // })