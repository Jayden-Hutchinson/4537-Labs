
const http = require("http");
const url = require("url");

// Server configuraion constants
const config = require("./src/js/config")

class Server {
    constructor() {
        // Handle the request received from the client based on the url
        this.handlers = {
            [config.ENDPOINT.INSERT]: this.handleSqlInsert,
            [config.ENDPOINT.SELECT]: this.handleSqlSelect,
        }

        // Create the http server that handles the requests from the browser
        http.createServer((req, res) => {
            console.log("Request URL:", req.url)

            this.setHeaders(res)

            // Get the handler function for the request url
            const handler = this.handlers[req.url];
            console.log("Request Handler:", handler)

            // if no handler return a message 
            if (!handler) {
                res.writeHead(config.STATUS.METHOD_NOT_ALLOWED)
                res.end("Method not allowed")
                return;
            }

            // handle the request with the chosen handler function
            handler(req, res);

        }).listen(config.PORT, () => console.log(config.listenMessage))
    }

    // Handle the request that inserts into the api database using sql
    handleSqlInsert = (req, res) => {
        if (req.method != config.REQUEST_TYPE.GET) {
            res.writeHead(config.STATUS.METHOD_NOT_ALLOWED)
            res.end(`${req.method} not allowed at ${req.url}`)
            return;
        }
        res.end("GET response from server")
    }

    // Handle the request that selects data from the api database using sql
    handleSqlSelect = (req, res) => {
        console.log("Sql Select", req.url)
        res.end(JSON.stringify("Message sent from server.js"))
    }

    // Set the headers for CORS in the http server
    setHeaders(res) {
        for (const [key, value] of Object.entries(config.HEADERS)) {
            res.setHeader(key, value)
        }
    }
}

new Server();