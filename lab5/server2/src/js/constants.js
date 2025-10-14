export const SERVER = {
    PORT: 3000,
    ENDPOINT: {
        insert: "/db/insert",
        select: "/db/select"
    },

    HEADERS: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": Object.values(RequestType).join(", "),
        "Access-Control-Allow-Headers": "Content-Type",
    },

    STATUS: Object.freeze({
        OK: 200,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        INTERNAL_ERROR: 500,
    }),

    REQUEST_TYPE: Object.freeze({
        GET: "GET",
        POST: "POST",
        OPTIONS: "OPTIONS"
    }),

}