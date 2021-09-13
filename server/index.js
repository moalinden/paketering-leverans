//FIX POST WITH ? (EASIER)
//WHEN THAT WORKS, GO AND DO SELECT

//Require
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./webshop.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
// Get/read all products
app.get('/api/getUser/:info', (req, res) => {

  console.log(req.params.info);
  if(req.params.info == "email"){
    db.all("SELECT COUNT(id) AS userCount FROM user WHERE email = ?", [req.body.value], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json({rows})
    });
  }
});

// Get one product by id
app.get('/api/products/:id', (req, res) => {
  ;
  let stmt = db.prepare(`
    SELECT *
    FROM products
    WHERE id = :id
  `);
  // run the query and return all the data
  let result = stmt.all({ id: req.params.id });
  // send the result to the client as json
  res.json(result);
});

// Get one product by name
app.get('/api/products/byName/:name', (req, res) => {
  let stmt = db.prepare(`
    SELECT *
    FROM products
    WHERE name = :name
  `);
  res.json(stmt.all({ name: req.params.name }));
});

// Create a new product
app.post('/api/addUser', (req, res) => {

  let data = req.body;

  db.run(`INSERT INTO user(username, firstname, lastname, email, password) VALUES(?,?,?,?,?)`, [data.username, data.firstname, data.lastname, data.email, data.password], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
});

// Update/change a product
app.put('/api/products/:id', (req, res) => {
  // Only change fields that are mentioned in req.body
  // (so this query is built very dynamically)
  let query = `
    UPDATE products
    SET ${Object.keys(req.body).map(x => `${x} = :${x}`).join(', ')}
    WHERE id = :id
  `;
  console.log(query);
  // Now make a prepared statment and run it
  let stmt = db.prepare(query);
  res.json(stmt.run({ id: req.params.id, ...req.body }))
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  let stmt = db.prepare(`
    DELETE FROM products WHERE id = :id
  `);
  res.json(stmt.run({ id: req.params.id }));
});

// start the web server
app.listen(4000, () => console.log('Listening on port 4000'));