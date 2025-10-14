
const http = require("http");
const url = require("url");
const { } = require("./src/js/constants")


const PORT = 3000
const listenMessage = `Server running on https://localhost:${PORT}`

const ENDPOINT = {
    INSERT: "/db/insert",
    SELECT: "/db/select"
}

const REQUEST_TYPE = Object.freeze({
    GET: "GET",
    POST: "POST",
    OPTIONS: "OPTIONS"
})

const HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": Object.entries(REQUEST_TYPE).join(", "),
    "Access-Control-Allow-Headers": "Content-Type",
}

const STATUS = Object.freeze({
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_ERROR: 500,
})


class Server {
    constructor() {
        this.handlers = {
            [REQUEST_TYPE.GET]: this.handleGetRequest,
            [REQUEST_TYPE.POST]: this.handlePostRequest,
        }

        http.createServer((req, res) => {
            this.setHeaders(res)

            const handler = this.handlers[req.method];

            if (!handler) {
                res.writeHead(STATUS.METHOD_NOT_ALLOWED)
                res.end("Method not allowed")
                return;
            }

            handler(req, res);

        }).listen(PORT, () => console.log(listenMessage))
    }

    handleGetRequest = (req, res) => {
        console.log("GET Request", req.url)

        if (req.method != REQUEST_TYPE.GET) {
            res.writeHead(STATUS.METHOD_NOT_ALLOWED)
            res.end(`${req.method} not allowed at ${req.url}`)
            return;
        }
        res.end(`GET response from server`)
    }

    handlePostRequest = (req, res) => {
        console.log("POST Request", req)
    }

    handleOptionsRequest = (req, res) => {
        console.log("OPTIONS Request", req)
    }

    setHeaders(res) {
        for (const [key, value] of Object.entries(HEADERS)) {
            res.setHeader(key, value)
        }
    }

    isPostRequest({ method }) {
        return method === REQUEST_TYPE.POST;
    }

    isGetRequest({ method }) {
        return method === REQUEST_TYPE.GET;
    }


}

new Server();