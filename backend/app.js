const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql");

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sayali20311!",
  database: "website",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow these HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow these headers
  next();
});

// Multer configuration for handling file uploads
const upload = multer();

// Routes
app.get("/applications", (req, res) => {
  connection.query("SELECT * FROM applications", (err, results) => {
    if (err) {
      console.error("Error fetching applications: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/applications/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT * FROM applications WHERE id = ?",
    id,
    (err, results) => {
      if (err) {
        console.error("Error fetching application: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("Application not found");
        return;
      }
      res.json(results[0]);
    }
  );
});

app.delete("/applications/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM applications WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.error("Error deleting application: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json({ message: "Application deleted successfully" });
    }
  );
});

// Update the application schema in the Node.js backend to include type_id
// Modify the POST and PUT routes to accept type_id as well

app.post("/applications", upload.single("image"), (req, res) => {
  const { name, description, image, link, type_id } = req.body;

  const sql =
    "INSERT INTO applications (name, description, image, link, type_id) VALUES (?, ?, ?, ?, ?)";
  const values = [name, description, image, link, type_id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting application: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json({
      message: "Application added successfully",
      id: result.insertId,
    });
  });
});

app.put("/applications/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name, description, image, link, type_id } = req.body;

  const sql =
    "UPDATE applications SET name=?, description=?, image=?, link=?, type_id=? WHERE id=?";
  const values = [name, description, image, link, type_id, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating application: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json({ message: "Application updated successfully" });
  });
});

// Modify the GET routes to join the applications table with the type table to get type_name
app.get("/applications", (req, res) => {
  connection.query(
    "SELECT applications.*, type.type_name FROM applications LEFT JOIN type ON applications.type_id = type.type_id",
    (err, results) => {
      if (err) {
        console.error("Error fetching applications: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results);
    }
  );
});

app.get("/applications/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT applications.*, type.type_name FROM applications LEFT JOIN type ON applications.type_id = type.type_id WHERE applications.id = ?",
    id,
    (err, results) => {
      if (err) {
        console.error("Error fetching application: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("Application not found");
        return;
      }
      res.json(results[0]);
    }
  );
});

app.get("/types", (req, res) => {
  connection.query("SELECT * FROM type", (err, results) => {
    if (err) {
      console.error("Error fetching types: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
