const express = require("express");
const multer = require("multer");
const mysql = require("mysql");
const path = require("path");
const app = express();
const port = 3000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow these HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow these headers
  next();
});
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Sayali20311!",
  database: "website",
  connectionLimit: 10,
});

const query = (sql, params) =>
  new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new application
app.post("/applications", upload.single("image"), (req, res) => {
  const { name, description, link, type_id } = req.body;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const imageUrl = req.file.path;
  insertApplicationIntoDatabase(name, description, imageUrl, link, type_id)
    .then(() => {
      res.status(201).send("Application created successfully");
    })
    .catch((error) => {
      console.error("Error creating application:", error);
      res.status(500).send("Internal Server Error");
    });
});

// Retrieve all applications
// app.get("/applications", (req, res) => {
//   getAllApplicationsFromDatabase()
//     .then((applications) => {
//       res.status(200).json(applications);
//     })
//     .catch((error) => {
//       console.error("Error retrieving applications:", error);
//       res.status(500).send("Internal Server Error");
//     });
// });

//Applications endpoint with pagination
app.get("/applications", (req, res) => {
  const { page = 1, limit = 9, search = "" } = req.query;
  const offset = (page - 1) * limit;

  let searchQuery = "WHERE apps.name LIKE ? ";
  let queryParams = [`${search}%`, Number(limit), Number(offset)];

  // If there's no search term, adjust the query and parameters accordingly
  if (!search) {
    searchQuery = "";
    queryParams = [Number(limit), Number(offset)];
  }

  // pool.query(
  //   `SELECT id, name, description, image, link, type_id FROM applications ${searchQuery} order by name asc LIMIT ? OFFSET ?`,
  //   queryParams,
  //   (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).json({ error: error.message });
  //     }

  //     // Optionally, also return total count for pagination metadata (not shown here)
  //     res.json(results);
  //   }
  // );

  const promises = [
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT apps.id,apps.name,apps.description,apps.image, apps.link, apps.type_id ,CASE      WHEN la.cardId IS NULL THEN 0  WHEN la.cardID IS NOT NULL and la.liked=0 then 0  ELSE 1    END AS liked  FROM applications apps  LEFT JOIN (   SELECT cardId,liked FROM user_likes )        la ON apps.id = la.cardId ${searchQuery} order by name asc LIMIT ? OFFSET ?`,
        queryParams,
        (err, results) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(*) as count FROM applications apps ${searchQuery}`,
        queryParams,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    }),
  ];

  // Use Promise.all() to run the queries simultaneously
  Promise.all(promises)
    .then((results) => {
      // Combine the results of the two queries
      const [data, count] = [results[0], results[1]];
      const combinedResults = { data, count };

      // Send the combined results back to the client
      res.send(combinedResults);
    })
    .catch((err) => {
      // Handle any errors
      res.send(err);
    });
});

// Retrieve a single application by ID
app.get("/applications/:id", (req, res) => {
  const id = req.params.id;
  getApplicationByIdFromDatabase(id)
    .then((application) => {
      if (!application) {
        res.status(404).send("Application not found");
      } else {
        res.status(200).json(application);
      }
    })
    .catch((error) => {
      console.error("Error retrieving application:", error);
      res.status(500).send("Internal Server Error");
    });
});

// Update an existing application
// Endpoint to update an application
app.put("/applications/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, description, link, type_id } = req.body;
  let image = req.file ? req.file.path : null;

  // SQL query to update the application
  let sql = `UPDATE applications SET name = ?, description = ?, link = ?, type_id = ? ${
    image ? ", image = ?" : ""
  } WHERE id = ?`;

  let queryParams = [name, description, link, type_id];
  if (image) queryParams.push(image);
  queryParams.push(id);

  pool.query(sql, queryParams, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application updated successfully", id });
  });
});
// Delete an application by ID
app.delete("/applications/:id", (req, res) => {
  const id = req.params.id;
  deleteApplicationFromDatabase(id)
    .then(() => {
      res.status(200).send("Application deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting application:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/types", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sayali20311!",
    database: "website",
  });

  connection.query("SELECT * FROM type", (err, results) => {
    if (err) {
      console.error("Error fetching types: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the number of applications
app.get("/count", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sayali20311!",
    database: "website",
  });

  connection.query(
    "SELECT COUNT(*) as count FROM applications",
    (err, results) => {
      if (err) {
        console.error("Error fetching types: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results);
    }
  );
});

// Function to insert application data into the database
function insertApplicationIntoDatabase(
  name,
  description,
  imageUrl,
  link,
  type_id
) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO applications (name, description, image, link, type_id) VALUES (?, ?, ?, ?, ?)";
    pool.query(
      query,
      [name, description, imageUrl, link, type_id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

// Function to retrieve all applications from the database
function getAllApplicationsFromDatabase() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM applications order by `name` asc";
    pool.query(query, (error, results) => {
      console.log(results);
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to retrieve a single application by ID from the database
function getApplicationByIdFromDatabase(id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM applications WHERE id = ?";
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

// Function to update an existing application in the database
function updateApplicationInDatabase(
  id,
  name,
  description,
  imageUrl,
  link,
  type_id
) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE applications SET name = ?, description = ?, image = ?, link = ?, type_id = ? WHERE id = ?";
    pool.query(
      query,
      [name, description, imageUrl, link, type_id, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

// Function to delete an application by ID from the database
function deleteApplicationFromDatabase(id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM applications WHERE id = ?";
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

app.get("/data", (req, res) => {
  // Adjusted query to perform a join with the 'type' table and select 'type_name'
  const query = `
    SELECT yt.id, yt.name, yt.description, yt.image, yt.link, t.type_name
    FROM applications yt
    JOIN type t ON yt.type_id = t.type_id
    ORDER BY t.type_name
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error querying the database");
      return;
    }

    // Group results by 'type_name'
    const groupedByTypeName = results.reduce((acc, currentValue) => {
      (acc[currentValue.type_name] = acc[currentValue.type_name] || []).push({
        id: currentValue.id,
        name: currentValue.name,
        description: currentValue.description,
        image: currentValue.image,
        link: currentValue.link,
        // Exclude 'type_id' from each item, as we're now using 'type_name' for grouping
      });
      return acc;
    }, {});

    res.json(groupedByTypeName);
  });
});

app.post("/api/toggle-like", (req, res) => {
  console.log(req.body);
  const { userId, applicationId, liked } = req.body;

  // SQL to insert or update the like status in the `user_likes` table
  const sql = `
    INSERT INTO user_likes (userId, cardId, liked)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE liked = VALUES(liked);
  `;

  pool.query(sql, [userId, applicationId, liked], (err, result) => {
    if (err) {
      console.error("Error updating like status", err);
      return res.status(500).send("Server error");
    }
    res.send({ message: "Like status updated successfully" });
  });
});

app.get("/api/application-status/:userId", (req, res) => {
  const { userId } = req.params;
  const { applicationId } = req.query; // Get applicationId from query parameter

  const query = `
    SELECT liked
    FROM user_likes
    WHERE userId = ? AND cardId = ?
  `;

  pool.query(query, [userId, applicationId], (err, results) => {
    if (err) {
      console.error("Error fetching application status", err);
      return res.status(500).send("Server error");
    }
    // If there are no results, the application has neither been liked nor disliked
    if (results.length === 0) {
      return res.json({ status: "none" });
    }
    // Return the liked status
    const status = results[0].liked ? "liked" : "disliked";
    res.json({ status });
  });
});

app.get("/api/liked-applications/:userId", async (req, res) => {
  const { userId } = req.params;

  return new Promise((resolve, reject) => {
    const query = `SELECT a.* FROM applications a
    JOIN user_likes ul ON a.id = ul.cardId
    WHERE ul.userId = ? AND ul.liked = 1`;

    console.log(query);

    pool.query(query, [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  })
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((error) => {
      console.error("Error retrieving applications:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
