const express = require("express");
const sql = require("mssql");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const app = express();

const port = 3002;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow these HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow these headers
  next();
});

// Configuration object for your database
const config = {
  user: "sa",
  password: "SayaliK20311",
  server: "localhost", // You can use 'localhost\\instance' if your SQL Server runs on the same machine
  database: "website",
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    trustServerCertificate: false, // Use this to trust the SQL Server certificate (only in development)
  },
};

// async function connectToDatabase() {
//   try {
//     // Establish a connection
//     await sql.connect(config);
//     console.log("Connected to the MSSQL database successfully.");

//     // Your database queries go here
//   } catch (err) {
//     console.error("Failed to connect to the MSSQL database:", err);
//   } finally {
//     // Close the connection
//     await sql.close();
//   }
// }

// connectToDatabase();

// Function to retrieve a single application by ID from the database
async function getApplicationByIdFromDatabase(id) {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM application WHERE id = ${id}`;
    return result.recordset[0]; // Assuming 'id' is a unique identifier, there should only be one or zero rows returned
  } catch (err) {
    console.error("Database operation failed:", err);
    throw err; // Rethrow the error to be handled by the caller
  } finally {
    await sql.close();
  }
}

//Applications endpoint with pagination
app.get("/api/applications", async (req, res) => {
  const { page = 1, limit = 9, search = "" } = req.query;
  const offset = (page - 1) * limit;

  let searchQuery = "WHERE apps.name LIKE @search ";
  let queryParams = {
    search: `${search}%`,
    limit: Number(limit),
    offset: Number(offset),
  };

  // If there's no search term, adjust the query and parameters accordingly
  if (!search) {
    searchQuery = "";
    delete queryParams.search; // Remove 'search' as it's not needed
  }

  try {
    // Ensure connection to the database
    let pool = await sql.connect(config);

    // Run both queries simultaneously
    const [data, count] = await Promise.all([
      pool
        .request()
        .input("search", sql.VarChar, queryParams.search)
        .input("limit", sql.Int, queryParams.limit)
        .input("offset", sql.Int, queryParams.offset)
        .query(
          `SELECT apps.id, apps.name, apps.description, apps.image, apps.link, apps.type_id, CASE WHEN la.cardId IS NULL THEN 0 WHEN la.cardID IS NOT NULL and la.liked = 0 THEN 0 ELSE 1 END AS liked FROM application apps LEFT JOIN ( SELECT cardId, liked FROM user_likes ) la ON apps.id = la.cardId ${searchQuery} ORDER BY name ASC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`
        ),
      pool
        .request()
        .input("search", sql.VarChar, queryParams.search)
        .query(`SELECT COUNT(*) as count FROM application apps ${searchQuery}`),
    ]);

    // Send the combined results back to the client
    res.send({ data: data.recordset, count: count.recordset[0].count });
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).send(err.message);
  } finally {
    sql.close();
  }
});

// Endpoint to retrieve a single application by ID
app.get("/api/applications/:id", (req, res) => {
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

// Endpoint to update an application
app.put("/api/applications/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, description, link, type_id } = req.body;
  let image = req.file ? req.file.path : null;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("name", sql.NVarChar, name);
    request.input("description", sql.NVarChar, description);
    request.input("link", sql.NVarChar, link);
    request.input("type_id", sql.Int, type_id);
    if (image) {
      request.input("image", sql.NVarChar, image);
    }
    request.input("id", sql.Int, id);

    // SQL query to update the application
    let updateQuery = `UPDATE application SET name = @name, description = @description, link = @link, type_id = @type_id ${
      image ? ", image = @image" : ""
    } WHERE id = @id`;

    const { rowsAffected } = await request.query(updateQuery);
    if (rowsAffected[0] === 0)
      return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application updated successfully", id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    await sql.close();
  }
});

// Delete an application by ID
app.delete("/api/applications/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    const { rowsAffected } =
      await request.query`DELETE FROM application WHERE id = @id`;

    if (rowsAffected[0] === 0) {
      return res.status(404).send("Application not found");
    }
    res.status(200).send("Application deleted successfully");
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await sql.close();
  }
});

app.get("/api/types", async (req, res) => {
  try {
    // Ensure connection to the database
    await sql.connect(config);

    // Perform the query
    const result = await sql.query`SELECT * FROM type`;

    // Send the results back to the client
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching types: ", err);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the connection
    sql.close();
  }
});

app.get("/api/count", async (req, res) => {
  try {
    // Ensure connection to the database
    await sql.connect(config);

    // Perform the query
    const result = await sql.query`SELECT COUNT(*) as count FROM application`;

    // Send the results back to the client
    // result.recordset is an array of objects, and since COUNT(*) returns a single value, access the first object
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching count: ", err);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the connection
    sql.close();
  }
});

app.get("/api/data", async (req, res) => {
  // Assuming you have a way to identify the current user, perhaps through authentication middleware
  //const userId = req.user.id; // Replace this with your method of retrieving the current user's ID
  const userId = 1;

  // Adjusted query to perform a join with the 'user_likes' table
  const query = `
        SELECT yt.id, yt.name, yt.description, yt.image, yt.link, t.type_name, CASE WHEN ul.liked IS NULL THEN 0 ELSE ul.liked END AS liked
        FROM application yt
        JOIN type t ON yt.type_id = t.type_id
        LEFT JOIN user_likes ul ON yt.id = ul.cardId AND ul.userId = @userId
        ORDER BY yt.name asc
    `;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("userId", sql.Int, userId); // Correctly bind the @userId parameter

    const result = await request.query(query);

    // Group results by 'type_name'
    const groupedByTypeName = result.recordset.reduce((acc, currentValue) => {
      (acc[currentValue.type_name] = acc[currentValue.type_name] || []).push({
        id: currentValue.id,
        name: currentValue.name,
        description: currentValue.description,
        image: currentValue.image,
        link: currentValue.link,
        liked: currentValue.liked, // This now includes the 'liked' status
      });
      return acc;
    }, {});

    res.json(groupedByTypeName);
  } catch (err) {
    console.error("Error querying the database: ", err);
    res.status(500).send("Error querying the database");
  } finally {
    sql.close();
  }
});

app.post("/api/toggle-like", async (req, res) => {
  const { userId, applicationId, liked } = req.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("userId", sql.Int, userId);
    request.input("applicationId", sql.Int, applicationId);
    request.input("liked", sql.Bit, liked);

    // Attempt to update first
    let result = await request.query(`
        UPDATE user_likes SET liked = @liked
        WHERE userId = @userId AND cardId = @applicationId
      `);

    if (result.rowsAffected[0] === 0) {
      // If no rows were updated, perform an insert
      await request.query(`
          INSERT INTO user_likes (userId, cardId, liked)
          VALUES (@userId, @applicationId, @liked)
        `);
    }

    res.send({ message: "Like status updated successfully" });
  } catch (err) {
    console.error("Error updating like status", err);
    res.status(500).send("Server error");
  } finally {
    sql.close();
  }
});

app.get("/api/application-status/:userId", async (req, res) => {
  const { userId } = req.params;
  const { applicationId } = req.query; // Get applicationId from query parameter

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("userId", sql.Int, userId);
    request.input("applicationId", sql.Int, applicationId);

    const result = await request.query(`
        SELECT liked
        FROM user_likes
        WHERE userId = @userId AND cardId = @applicationId
      `);

    if (result.recordset.length === 0) {
      return res.json({ status: "none" });
    }
    const status = result.recordset[0].liked ? "liked" : "disliked";
    res.json({ status });
  } catch (err) {
    console.error("Error fetching application status", err);
    res.status(500).send("Server error");
  } finally {
    sql.close();
  }
});

app.get("/api/liked-applications/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("userId", sql.Int, userId);

    const result = await request.query(`
        SELECT a.* FROM application a
        JOIN user_likes ul ON a.id = ul.cardId
        WHERE ul.userId = @userId AND ul.liked = 1
        order by a.name
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error retrieving applications:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
