const http = require("http");
const fs = require("fs");
const mysql = require("mysql2");
require("dotenv").config();

// Server configuraion constants
const config = require("./src/js/config");
const PORT = process.env.PORT;

const CONNECTION = {
  host: process.env.DB_HOST, // your hosting DB host
  user: process.env.DB_USER, // your DB username
  password: process.env.DB_PASS, // your DB password
  database: process.env.DB_NAME, // your DB name
  port: process.env.DB_PORT || 3306,
};

class Server {
  constructor() {
    // MySql database connection
    this.db = mysql.createConnection(CONNECTION);

    this.db.connect((err) => {
      console.log("Connecting to Database...");
      console.log(CONNECTION);
      if (err) {
        console.log("Connecting Failed.");
        console.log(err);
        return;
      }
      console.log(`Connected to Database on port ${CONNECTION.port}`);
    });

    // Handle the request received from the client based on the url
    this.handlers = {
      [config.ENDPOINT.INSERT]: this.handleSqlInsert,
      [config.ENDPOINT.INSERT_DATA]: this.handleSqlInsertData,
      [config.ENDPOINT.SELECT]: this.handleSqlSelect,
    };

    // Create the http server that handles the requests from the browser
    http
      .createServer((req, res) => {
        console.log("Request URL:", req.url);
        this.setHeaders(res);

        // Get the handler function for the request url
        const handler = this.handlers[req.url];
        console.log("Request Handler:", handler);
        console.log(req.url);

        if (req.url === "/") {
          res.end("Hello from the server");
        }

        if (req.url === "/favicon.ico") {
          res.writeHead(204); // 204 = No Content
          res.end();
          return;
        }

        if (!handler) {
          // if no handler return a message
          res.writeHead(config.STATUS.METHOD_NOT_ALLOWED);
          res.end("Method not allowed");
          return;
        }

        if (req.method === "OPTIONS") {
          res.writeHead(204);
          res.end();
          return;
        }
        // handle the request with the chosen handler function
        handler(req, res);
      })
      .listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
  }

  handleSqlInsertData = async (req, res) => {
    this.createTable();
    if (req.method != config.REQUEST_TYPE.POST) {
      res.writeHead(config.STATUS.METHOD_NOT_ALLOWED, {
        "Content-Type": "text/plain",
      });
      res.end(`${req.method} not allowed at ${req.url}`);
      return;
    }

    try {
      const sql = fs.readFileSync(config.FILE.SQL.INSERT_DATA, "utf-8");
      console.log("insert_data.sql:\n", sql);

      this.database.connection.query(sql, (err, result) => {
        if (err) {
          console.log("SQL Error:", err);
          res.writeHead(config.STATUS.INTERNAL_ERROR, {
            "Content-Type": "text/plain",
          });
          res.end(err.message);
          return;
        }

        console.log("Query Result:", result);
        res.writeHead(config.STATUS.OK, {
          "Content-Type": "text/plain",
        });
        res.end("Data inserted successfully");
      });
    } catch (err) {
      console.log("File Read Error:", err);
      res.writeHead(config.STATUS.INTERNAL_ERROR, {
        "Content-Type": "text/plain",
      });
      res.end("Failed to read SQL file.");
    }
  };

  // Handle the request that inserts into the api database using sql
  handleSqlInsert = (req, res) => {
    this.createTable();
    if (req.method !== config.REQUEST_TYPE.POST) {
      res.writeHead(config.STATUS.METHOD_NOT_ALLOWED, {
        "Content-Type": "text/plain",
      });
      res.end(`${req.method} not allowed at ${req.url}`);
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const sql = body.trim(); // plain text SQL

        console.log("Received SQL:", sql);

        this.database.connection.query(sql, (err, result) => {
          if (err) {
            res.writeHead(config.STATUS.INTERNAL_ERROR, {
              "Content-Type": "text/plain",
            });
            res.end(`SQL Error: ${err.message}`);
            return;
          }

          console.log(result);
          res.writeHead(config.STATUS.OK, {
            "Content-Type": "text/plain",
          });
          res.end("SQL executed successfully.");
          return;
        });
      } catch (err) {
        console.log(err);
        res.writeHead(config.STATUS.INTERNAL_ERROR, {
          "Content-Type": "text/plain",
        });
        res.end("Failed to execute SQL.");
        return;
      }
    });

    req.on("error", (err) => {
      console.log(err);
      res.writeHead(config.STATUS.INTERNAL_ERROR, {
        "Content-Type": "text/plain",
      });
      res.end("Request body error.");
      return;
    });
  };

  // Handle the request that selects data from the api database using sql
  handleSqlSelect = (req, res) => {
    if (req.method !== config.REQUEST_TYPE.GET) {
      res.writeHead(config.STATUS.METHOD_NOT_ALLOWED, {
        "Content-Type": "text/plain",
      });
      res.end(`${req.method} not allowed at ${req.url}`);
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const sql = body.trim(); // plain text SQL

        console.log("Received SQL:", sql);

        this.database.connection.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.writeHead(config.STATUS.INTERNAL_ERROR, {
              "Content-Type": "text/plain",
            });
            res.end(`SQL Error: ${err.message}`);
            return;
          }

          console.log(result);

          res.writeHead(config.STATUS.OK, {
            "Content-Type": "text/plain",
          });
          res.end("SQL executed successfully.");
          return;
        });
      } catch (err) {
        console.log(err);
        res.writeHead(config.STATUS.INTERNAL_ERROR, {
          "Content-Type": "text/plain",
        });
        res.end("Failed to execute SQL.");
        return;
      }
    });

    req.on("error", (err) => {
      console.log(err);
      res.writeHead(config.STATUS.INTERNAL_ERROR, {
        "Content-Type": "text/plain",
      });
      res.end("Request body error.");
      return;
    });
  };

  // Set the headers for CORS in the http server
  setHeaders(res) {
    for (const [key, value] of Object.entries(config.HEADERS)) {
      res.setHeader(key, value);
    }
  }

  createTable() {
    const sql = fs.readFileSync(config.FILE.SQL.CREATE_TABLE, "utf-8");
    console.log("Creating Table...");

    this.database.connection.query(sql, (err, result) => {
      if (err) {
        console.log("Creating Table Failed.", err);
        return;
      }

      console.log("Table Created.");
    });
  }
  catch(err) {
    console.log("File Read Error:", err);
    res.writeHead(config.STATUS.INTERNAL_ERROR, {
      "Content-Type": "text/plain",
    });
    res.end("Failed to read SQL file.");
  }
}

new Server();
