require("dotenv").config();
const PORT = process.env.PORT || 3001;
const http = require("http");
const usersRoutes = require("./routes/users.routes.js");
const productsRoutes = require("./routes/products.routes.js");
const ordersRoutes = require("./routes/orders.routes.js");
const parseURL = require("./utils/parseURL.js");
const sendResponse = require("./utils/sendResponse.js");
const statusCode = require("./constants/statusCode.js");

const server = http.createServer((req, res) => {
    const [endpoint, id] = parseURL(req.url);
    if (endpoint === "users") {
        usersRoutes(req, res, endpoint, id);
    } else if (endpoint === "products") {
        productsRoutes(req, res, endpoint, id);
    } else if (endpoint === "orders") {
        ordersRoutes(req, res, endpoint, id);
    } else {
        sendResponse(res, statusCode.Not_Found, {
            status: 404,
            error: "Not Found",
            message: `Endpoint ${req.url} not found`,
        });
    }
});

server.listen(PORT, () => {
    console.log(`server running in PORT:${PORT}`);
});
