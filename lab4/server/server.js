const http = require("http");
const url = require("url");
const routes = require("../client/src/js/api/routes.js");

const { STATUS } = require("./constants.js");

const PORT = process.env.PORT || 3000;

class Definition {
  constructor({ word, definition }) {
    this.word = word;
    this.definition = definition
  }
}

class Server {
  constructor() {
    this.definitionList = [];
    this.requestCount = 0;

    this.run();
  }

  run() {
    http
      .createServer((req, res) => {
        this.requestCount++;
        console.log(`Request #${this.requestCount}`);
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

        // Handle GET request to fetch item definition
        if (!path.startsWith(routes.ENDPOINT)) {
          console.log("PATH ERROR", path);
          return;
        }

        if (req.method === "GET") {
          const params = parsedUrl.query;
          const word = params.name;

          const foundWord = this.getDefinition(word);

          if (!foundWord) {
            res.writeHead(STATUS.NOT_FOUND, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify({ error: "Item not found" }));
          } else {
            res.writeHead(STATUS.SUCCESS, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(foundWord));
          }
        }

        // Handle POST request to add a new item
        else if (req.method === "POST") {
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
    this.definitionList.push(new Definition(word, definition));
  }

  hasDefinition(word) {
    return this.definitionList.find((definition) => definition.word === word);
  }

  getDefinition(word) {
    return this.definitionList.find((definition) => definition.word === word);
  }
}
new Server();
