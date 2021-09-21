//FIX POST WITH ? (EASIER)
//WHEN THAT WORKS, GO AND DO SELECT

//Require
const path = require("path");
const express = require("express");
const CryptoJS = require("crypto-js");

const app = express();

const sqlite3 = require("sqlite3").verbose();

app.use(express.static(path.join(__dirname, "../build")));

// open the database
let db = new sqlite3.Database("./webshop.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the chinook database.");
});
//Check from validation
app.post("/api/getUser/:info", (req, res) => {
  let sql;
  let val;

  switch (req.params.info) {
    case "username": {
      sql = "SELECT COUNT(id) AS userCount FROM user WHERE username = ?";
      val = req.body.username;
      break;
    }
    case "email": {
      sql = "SELECT COUNT(id) AS userCount FROM user WHERE email = ?";
      val = req.body.email;
      break;
    }
  }

  db.all(sql, [val], (err, rows, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    let userCount = rows[0].userCount;
    console.log(userCount);
    return res.json({ amount: userCount });
  });
  return;
});

//Get all products
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    return res.json({ products: rows });
  });
});

//Add new user

// Get/read all products
app.get("/api/getUser/:info", (req, res) => {
  if (req.params.info === "email") {
    db.all(
      "SELECT COUNT(id) AS userCount FROM user WHERE email = ?",
      [req.body.value],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.status(200).json({ rows });
      }
    );
  }
});

// Get one product by id
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    return res.json({ products: rows });
  });
});

// Get one product by name
app.get("/api/products/byName/:name", (req, res) => {
  let stmt = db.prepare(`
    SELECT *
    FROM products
    WHERE name = :name
  `);
  res.json(stmt.all({ name: req.params.name }));
});

// Create a new product
app.post("/api/addUser", (req, res) => {
  let data = req.body;

  //Create SALT auth in auth_str
  //Salt SHA256 with SALT created and auth string
  let pwd = data.password;
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 64;
  var auth_str = "";
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    auth_str += chars.substring(rnum, rnum + 1);
  }
  let auth = "adb6f118edd6ca21cd88c2709b5b395266c0b3d71bd3c55bac875a31017c29fa";
  var hash_pwd = CryptoJS.SHA256(auth + auth_str + pwd).toString(
    CryptoJS.enc.Hex
  );

  db.run(
    `INSERT INTO user(username, firstname, lastname, email, password, auth) VALUES(?,?,?,?,?,?)`,
    [
      data.username,
      data.firstname,
      data.lastname,
      data.email,
      hash_pwd,
      auth_str,
    ],
    function (err) {
      db.run(
        `INSERT INTO user(username, firstname, lastname, email, password) VALUES(?,?,?,?,?)`,
        [
          data.username,
          data.firstname,
          data.lastname,
          data.email,
          data.password,
        ],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
        }
      );
    }
  );

  //Login user
  app.post("/api/loginUser", (req, res) => {
    let data = req.body;

    //Check if auth exist (User exist)
    db.all(
      "SELECT auth FROM user WHERE username = ?",
      [data.username],
      (err, rows, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }

        //If exist, get auth and encrypt with SHA256
        if (rows.length > 0) {
          let auth_str = rows[0].auth;
          let pwd = data.password;
          let auth =
            "adb6f118edd6ca21cd88c2709b5b395266c0b3d71bd3c55bac875a31017c29fa";
          let hash_pwd = CryptoJS.SHA256(auth + auth_str + pwd).toString(
            CryptoJS.enc.Hex
          );

          let sql =
            "SELECT id, username FROM user WHERE username = ? and password = '" +
            hash_pwd +
            "'";

          //Perform sql query to check if username and password matches the one in DB
          db.all(sql, [data.username], (err, rows, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            } else {
              //If matches = logged in
              if (rows.length > 0) {
                //User exists
                return res.json({ message: "Logged in" });
              } else {
                return res.json({ message: "Wrong info" });
              }
            }
          });
        }
      }
    );
  });

  // Update/change a product
  app.put("/api/products/:id", (req, res) => {
    // Only change fields that are mentioned in req.body
    // (so this query is built very dynamically)
    let query = `
    UPDATE products
    SET ${Object.keys(req.body)
      .map((x) => `${x} = :${x}`)
      .join(", ")}
    WHERE id = :id
  `;
    console.log(query);
    // Now make a prepared statment and run it
    let stmt = db.prepare(query);
    res.json(stmt.run({ id: req.params.id, ...req.body }));
  });

  // Delete a product
  app.delete("/api/products/:id", (req, res) => {
    let stmt = db.prepare(`
    DELETE FROM products WHERE id = :id
  `);
    res.json(stmt.run({ id: req.params.id }));
  });

  app.get("/api/changeImage", (req, res) => {
    db.all(
      "UPDATE products SET imageUrl = '../src/media/red/la-royal.jpg' WHERE imageUrl = '../media/red/la-royal.jpg'",
      (err, rows, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
      }
    );
  });

  app.get("/api/selectImage", (req, res) => {
    db.all("SELECT * FROM products", (err, rows, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log(rows);
    });
  });
});
// start the web server
app.listen(4000, () => console.log("Listening on port 3000"));
