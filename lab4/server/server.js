const http = require("http");
const url = require("url");

const { ENDPOINT } = require("../client/src/js/api/routes.js");
const { STATUS, REQUEST_TYPE } = require("./constants.js");

const PORT = process.env.PORT || 3000;

// The Object stored in the server definitionList
class Definition {
  constructor(word, definition) {
    this.word = word;
    this.definition = definition;
  }
}

// The object that the server returns to the client
class Response {
  constructor(requestNumber, { word, definition }) {
    this.requestNumber = requestNumber;
    this.word = word;
    this.definition = definition;
  }
}

// HTTP Server for the api
class Server {
  constructor() {
    // Pre load the server with 3 definitions ready to search
    this.definitionList = [
      new Definition("cat", "a small domesticated feline"),
      new Definition("dog", "a loyal four-legged animal often kept as a pet"),
      new Definition("bird", "a warm-blooded animal with feathers and wings"),
    ];
    // Keep track of the number of requests to the api
    this.requestCount = 0;

    // Create the http server
    this.run();
  }

  // Create the http server that handles GET and POST Requests
  run() {
    http
      .createServer((req, res) => {
        this.incrementRequestCount();

        // CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.writeHead(204);
          res.end();
        }

        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        if (!path.startsWith(ENDPOINT)) {
          console.log("Path Error:", path);
          res.end();
        }

        // Handle GET request to get a Definition
        if (req.method === REQUEST_TYPE.GET) {
          const word = parsedUrl.query.word;

          const foundDefinition = this.getDefinition(word);

          if (!foundDefinition) {
            res.writeHead(STATUS.NOT_FOUND, {
              "Content-Type": "application/json",
            });
            const response = new Response(this.requestCount, {
              word: word,
              definition: null,
            });
            res.end(JSON.stringify(response));
          } else {
            res.writeHead(STATUS.SUCCESS, {
              "Content-Type": "application/json",
            });

            const response = new Response(this.requestCount, foundDefinition);
            res.end(JSON.stringify(response));
          }
        }

        // Handle POST request to add a new item
        else if (req.method === REQUEST_TYPE.POST) {
          let query = "";

          req.on("data", (chunk) => {
            query += chunk;
          });
          req.on("end", () => {
            try {
              const params = new URLSearchParams(query);
              const word = params.get("word");

              if (this.hasDefinition(word)) {
                res.writeHead(STATUS.BAD_REQUEST, {
                  "Content-Type": "text/plain",
                });
                res.end(`"${word}" already has a definition.`);
                return;
              }

              const definition = params.get("definition");

              if (word && definition) {
                this.addDefinition(word, definition);
                res.writeHead(STATUS.SUCCESS, { "Content-Type": "text/plain" });
                res.end(`Stored definition for ${word}`);
              } else {
                res.writeHead(STATUS.BAD_REQUEST, {
                  "Content-Type": "text/plain",
                });
                res.end("Word and definition parameters are required.");
              }
            } catch (error) {
              res.writeHead(STATUS.BAD_REQUEST, {
                "Content-Type": "text/plain",
              });
              res.end("Invalid request.");
            }
          });
        }

        //FOR TESTING PURPOSES
        else if (req.method === "GET" && path === "/print") {
          console.log("Current items:", this.definitionList);
          res.writeHead(STATUS.SUCCESS, { "Content-Type": "text/plain" });
          res.end("Items printed to console.");
        } else {
          res.writeHead(STATUS.NOT_FOUND, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
      })
      .listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
  }

  addDefinition(word, definition) {
    console.log(word, definition);
    const newEntry = new Definition(word, definition);
    this.definitionList.push(newEntry);
    console.log(this.definitionList);
  }

  hasDefinition(word) {
    return this.definitionList.find((definition) => definition.word === word);
  }

  getDefinition(word) {
    return this.definitionList.find((definition) => definition.word === word);
  }

  incrementRequestCount() {
    this.requestCount++;
    console.log(`Request #${this.requestCount}`);
  }
}
new Server();
