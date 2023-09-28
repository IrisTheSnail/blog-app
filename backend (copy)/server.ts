import express from "express";

const app = express();
const port = 8080;

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '0.0.0.0',
  database: 'database_blog',
  password: 'password',
  port: 5432,
})


app.get("/live", (req, res) => {
  res.send("200 OK");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  //now send this stuff to our database  
  //nah wait, hash the password first
  
  var saltRounds = 
  
  

  
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [username, email], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })


  res.send("user : " + username + "registered");
});