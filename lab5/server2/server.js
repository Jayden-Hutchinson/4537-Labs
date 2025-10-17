const http = require("http");
const url = require("url");
const Database = require("./src/js/Database")
const fs = require("fs")

// Server configuraion constants
const config = require("./src/js/config");
const path = require("path");

class Server {
  constructor() {
    // MySql database connection
    this.database = new Database();

    // Handle the request received from the client based on the url
    this.handlers = {
      [config.ENDPOINT.INSERT]: this.handleSqlInsert,
      [config.ENDPOINT.PREDEF_DATA]: this.handleInsertSqlButton,
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

        // handle the request with the chosen handler function
        handler(req, res);
      })
      .listen(config.PORT, () => console.log(config.listenMessage));
  }

  handleInsertSqlButton = async (req, res) => {
    debugger
    if (req.method != config.REQUEST_TYPE.POST) {
      res.writeHead(config.STATUS.METHOD_NOT_ALLOWED, {"Content-Type": "text/json"});
      res.end(`${req.method} not allowed at ${req.url}`);
      return;
    }

    try {
      const sql = fs.readFileSync(path.join(__dirname, "insertData.txt"), "utf-8");
      this.database.connection.query(sql, (err, res) => {
        if (err){
          throw err
        }
        console.log(res)
      });
      res.writeHead(config.STATUS.OK);
      res.end("Predefined data inserted successfully");
    } catch (err) {
      console.log(err);
      res.writeHead(config.STATUS.INTERNAL_ERROR, {"Content-Type": "text/json"});
      res.end("Failed to insert predefined data.")
    }
  };

  // Handle the request that inserts into the api database using sql
  handleSqlInsert = (req, res) => {
    if (req.method != config.REQUEST_TYPE.GET) {
      res.writeHead(config.STATUS.METHOD_NOT_ALLOWED, {"Content-Type": "text/json"});
      res.end(`${req.method} not allowed at ${req.url}`);
      return;
    }
    res.end("GET response from server");
  };

  // Handle the request that selects data from the api database using sql
  handleSqlSelect = (req, res) => {
    console.log("Sql Select", req.url);
    res.end(JSON.stringify("Message sent from server.js"));
  };

  // Set the headers for CORS in the http server
  setHeaders(res) {
    for (const [key, value] of Object.entries(config.HEADERS)) {
      res.setHeader(key, value);
    }
  }
}

new Server();
