
const http = require("http");
const url = require("url");
const { SERVER } = require("./src/js/constants")

const PORT = SERVER.PORT;
const listenMessage = `Server running on https//localhost:${PORT}`


class Server {
    constructor() {
        http.createServer((req, res) => {
            this.setHeaders(res)

            const handlers = {
                [RequestType.GET]: this.handleGetRequest,
                [RequestType.POST]: this.handlePostRequest,
            }

            const handler = handlers[req.method];

            if (!handler) {
                res.writeHead(SERVER.STATUS.METHOD_NOT_ALLOWED)
            }

            handler(req, res);

        }).listen(PORT, () => console.log(listenMessage))
    }

    handleGetRequest(req, res) {
        console.log("GET Request", req)
    }

    handlePostRequest(req, res) {
        console.log("POST Request", req)
    }

    handleOptionsRequest(req, res) {
        console.log("OPTIONS Request", req)
    }

    setHeaders(res) {
        for (const [key, value] of Object.entries(SERVER.HEADERS)) {
            res.setHeader(key, value)
        }
    }

    isPostRequest({ method }) {
        return method === SERVER.REQUEST_TYPE.POST;
    }

    isGetRequest({ method }) {
        return method === SERVER.REQUEST_TYPE.GET;
    }


}

new Server();