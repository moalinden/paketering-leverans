//Require
const path = require("path");
const express = require("express");
const CryptoJS = require("crypto-js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(bodyParser.json());

require("dotenv").config({ path: "../.env" });

const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./webshop.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the chinook database.");
});


var productJwtPayload = {
  products: [],
  productDetails: [],
  productCount: 0,
  exp: 60000
};

function jwtProductHandler(data, newAmount) {

  if(data.action == "add" && !newAmount){
    let productsObj = {
      id: data.productId
    }
    let productDetailsObj = {
      id: data.product.id,
      imageUrl: data.product.imageUrl,
      name: data.product.name,
      count: data.orderedAmount,
      price: data.product.price,
      product_category: data.product.category,
      description: data.product.description
    }
    productJwtPayload.productCount = ++productJwtPayload.productCount ;
    productJwtPayload.products.push(productsObj);
    productJwtPayload.productDetails.push(productDetailsObj);
  }

  //Start with only update amount since nothing else is needed at first
  if(data.action  == "add" && newAmount){
    for(let i = 0; i < productJwtPayload.productDetails.length; i++){
      if(productJwtPayload.productDetails[i].id == data.productId){
        productJwtPayload.productDetails[i].count = newAmount;

        productJwtPayload.productCount = ++productJwtPayload.productCount;
      }
    }
  }

  //Start with only update amount since nothing else is needed at first
  if(data.action  == "decrease" && newAmount > 0){
    for(let i = 0; i < productJwtPayload.productDetails.length; i++){
      if(productJwtPayload.productDetails[i].id == data.productId){
        productJwtPayload.productDetails[i].count = newAmount;

        productJwtPayload.productCount = --productJwtPayload.productCount;
      }
    }
  }

  //Leave for one sec
  if(data.action  == "remove" || data.action  == "decrease" && newAmount == 0){
    for(let i = 0; i < productJwtPayload.products.length; i++){
      if(productJwtPayload.products[i].id == data.productId){
        productJwtPayload.products.splice(i,1);
      }
    }
    for(let i = 0; i < productJwtPayload.productDetails.length; i++){
      if(productJwtPayload.productDetails[i].id == data.productId){
        productJwtPayload.productCount = productJwtPayload.productCount - productJwtPayload.productDetails[i].count;
        productJwtPayload.productDetails.splice(i,1)
      }
    }
  }

  if(data.action  == "clear"){
    for(let i = 0; i < productJwtPayload.productDetails.length; i++){
      productJwtPayload.products.splice(i,1);
      productJwtPayload.productDetails.splice(i,1);
      productJwtPayload.productCount = 0;
    }
  }

  return jwt.sign(productJwtPayload, process.env.PRODUCT_SECRET_TOKEN);
}

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

// Create a new product
app.post("/api/addUser", (req, res) => {
  let data = req.body;
  console.log("registerdata: ", data);
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
    (err, rows) => {
      console.log(
        data.username,
        data.firstname,
        data.lastname,
        data.email,
        hash_pwd,
        auth_str
      );
      if (err) {
        res.status(400).json({ message: "Error", auth: false });
        console.log(err);
        return;
      } else {
        res.json({ message: "Welcome!", auth: true });
      }
    }
  );
});

//Login user
app.post("/api/loginUser", (req, res) => {
  let data = req.body;

  console.log("data: ", data);
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
      console.log("rows120: ", rows);
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
            console.log("rows: ", rows);
            //If matches = logged in
            if (rows.length > 0) {
              //User exists
              let userId = rows[0].id;
              let username = rows[0].username;
              const token = jwt.sign(
                { userId, username },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRES_IN,
                }
              );
              res.json({ message: "Logged in", token: token, auth: true });
              return;
            }
            res.json({ message: "Wrong password", auth: false });
          }
        });
      } else {
        res.json({ message: "No user with that username", auth: false });
      }
    }
  );
});

app.post("/api/cart/:action", (req, res) => {
  let data = req.body;

  switch (req.params.action) {
    case "add": {
      addProductAmount(data);
      break;
    }
    case "decrease": {
      decreaseProductAmount(data);
      break;
    }
    case "remove": {
      removeProduct(data);
      break;
    }
    case "get": {
      getCart(data);
      break;
    }
    case "clear": {
      let token = jwtProductHandler(req.body);
      res.json({ message: "Updated", token: token});
    }
  }

  function addProductAmount(data) {
    db.all(
      `SELECT cart_id, product_amount FROM cart WHERE user_id = ? AND product_id = ?`,
      [data.userId, data.productId],
      (err, rows) => {
        if (err) {
          res.status(400).json({ message: "Error", auth: false });
          console.log(err);
          return;
        }
        //if no error
        else {
          //if exist
          if (rows.length > 0) {
            let newAmount = rows[0].product_amount + data.orderedAmount;
            let cartId = rows[0].cart_id;

            db.all(
              "UPDATE cart SET product_amount = ? WHERE cart_id = ?",
              [newAmount, cartId],
              (err, rows) => {
                if (err) {
                  res.status(400).json({ message: "Error", auth: false });
                  console.log(err);
                  return;
                }
                //if no error
                else {
                  let token = jwtProductHandler(req.body, newAmount);
                  res.json({ message: "Updated", token: token});
                }
              }
            );
          }
          //create new row if not exist
          if (rows.length == 0) {
            db.run(
              `INSERT INTO cart(user_id, product_id, product_amount) VALUES(?,?,?)`,
              [data.userId, data.productId, data.orderedAmount],
              (err, rows) => {
                if (err) {
                  res.status(400).json({ message: "Error", auth: false });
                  console.log(err);
                  return;
                } else {
                  let token = jwtProductHandler(req.body);
                  res.json({ message: "Added", token:token });
                }
              }
            );
          }
        }
      }
    );
  }

  function decreaseProductAmount(data) {
    db.all(
      `SELECT cart_id, product_amount FROM cart WHERE user_id = ? AND product_id = ?`,
      [data.userId, data.productId],
      (err, rows) => {
        if (err) {
          res.status(400).json({ message: "Error", auth: false });
          console.log(err);
          return;
        }
        //if no error
        else {
          let newAmount = rows[0].product_amount - 1;
          let cartId = rows[0].cart_id;

          if (newAmount <= 0) {
            db.all(
              "DELETE FROM cart WHERE cart_id = ?",
              [cartId],
              (err, rows) => {
                if (err) {
                  res.status(400).json({ message: "Error", auth: false });
                  console.log(err);
                }
                //if no error
                else {
                  let token = jwtProductHandler(req.body, newAmount);
                  res.json({ message: "removed", token:token });
                }
              }
            );
            return;
          }

          db.all(
            "UPDATE cart SET product_amount = ? WHERE cart_id = ?",
            [newAmount, cartId],
            (err, rows) => {
              if (err) {
                res.status(400).json({ message: "Error", auth: false });
                console.log(err);
                return;
              }
              //if no error
              else {
                let token = jwtProductHandler(req.body, newAmount);
                res.json({ message: "Added", token:token });
                return;
              }
            }
          );
        }
      }
    );
  }

  function removeProduct(data) {
    db.all(
      `SELECT cart_id FROM cart WHERE user_id = ? AND product_id = ?`,
      [data.userId, data.productId],
      (err, rows) => {
        if (err) {
          res.status(400).json({ message: "Error", auth: false });
          console.log(err);
          return;
        }
        //if no error
        else {
          let cartId = rows[0].cart_id;

          db.all(
            "DELETE FROM cart WHERE cart_id = ?",
            [cartId],
            (err, rows) => {
              if (err) {
                res.status(400).json({ message: "Error", auth: false });
                console.log(err);
                return;
              }
              //if no error
              else {
                let token = jwtProductHandler(req.body);
                res.json({ message: "Added", token:token });
                return;
              }
            }
          );
        }
      }
    );
  }

  function getCart(data) {
    db.all(
      `SELECT cart.product_id, cart.product_amount, products.* FROM cart INNER JOIN products ON cart.product_id = products.id WHERE user_id = ?`,
      [data.userId],
      (err, rows) => {
        if (err) {
          res.status(400).json({ message: "Error", auth: false });
          console.log(err);
          return;
        } else {
          let token = jwtProductHandler(req.body);
          res.json({token : token, rows: rows});
        }
      }
    );
  }
});

//Dev purpose only REMOVE BEFORE ACTIVATE
app.get("/api/clearTable", (req, res) => {
  db.all("DELETE FROM user", [], (err, rows, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    return res.json(true);
  });
});

app.get("/api/clearTableCart", (req, res) => {
  db.all("DELETE FROM cart", [], (err, rows, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    return res.json(true);
  });
});

app.get("/api/getUserTable", (req, res) => {
  db.all("SELECT * FROM user", [], (err, rows, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(rows);

    return res.json(true);
  });
});

app.get("/api/addAuthCol", (req, res) => {
  db.all("ALTER TABLE user ADD auth varchar(255)", [], (err, rows, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log("HAGASFAS", rows);

    return res.json(true);
  });
});

app.get("/api/createTableCart", (req, res) => {
  db.all(
    "CREATE TABLE cart (cart_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, product_id INTEGER NOT NULL, product_amount INTEGER NOT NULL)",
    [],
    (err, rows, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("HAGASFAS", rows);

      return res.json(true);
    }
  );
});

// start the web server
app.listen(4000, () => console.log("Listening on port 4000"));
