const http = require("http");
const Database = require("./src/js/Database");
const fs = require("fs");

// Server configuraion constants
const config = require("./src/js/config");
const path = require("path");
const { connected } = require("process");

class Server {
  constructor() {
    // MySql database connection
    this.database = new Database();

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

        // if no handler return a message
        if (!handler) {
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
      .listen(config.PORT, () => console.log(config.listenMessage));
  }

  handleSqlInsertData = async (req, res) => {
    if (req.method != config.REQUEST_TYPE.POST) {
      res.writeHead(config.STATUS.METHOD_NOT_ALLOWED, {
        "Content-Type": "text/plain",
      });
      res.end(`${req.method} not allowed at ${req.url}`);
      return;
    }

    try {
      const sql = fs.readFileSync(config.INSERT_DATA_PATH, "utf-8");
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
}

new Server();
