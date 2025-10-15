
const PORT = 3000
const listenMessage = `Server running on http://localhost:${PORT}`

const ENDPOINT = {
    INSERT: "/api/db/insert",
    SELECT: "/api/db/select"
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

module.exports = {
    PORT,
    listenMessage,
    ENDPOINT,
    REQUEST_TYPE,
    HEADERS,
    STATUS
};