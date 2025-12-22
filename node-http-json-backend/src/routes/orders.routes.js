const readJSON = require("../utils/readJSON.js");
const writeJSON = require("../utils/writeJSON.js");
const sendResponse = require("../utils/sendResponse.js");
const statusCode = require("../constants/statusCode.js");
const uniqID = require("../utils/uniqID");
const bodyParser = require("../utils/bodyParser.js");
const dateNow = require("../utils/dateNow.js");
const allowedStatuses = ["pending", "completed", "cancelled"];

const ordersRoutes = async (req, res, endpoint, id) => {
    const method = req.method;
    if (method === "GET") {
        const allOrders = readJSON(endpoint);
        if (id !== undefined) {
            const order = allOrders.find((o) => o.id === id);
            order
                ? sendResponse(res, statusCode.Ok, order)
                : sendResponse(res, statusCode.Not_Found, {
                      status: 404,
                      error: "Not Found",
                      message: `Order with id ${id} not found`,
                  });
            return;
        } else {
            sendResponse(res, statusCode.Ok, allOrders);
            return;
        }
    } else if (method === "POST") {
        try {
            let { title, amount, status } = await bodyParser(req);
            if (
                typeof title !== "string" ||
                typeof amount !== "number" ||
                amount <= 0 ||
                typeof status !== "string" ||
                !allowedStatuses.includes(status)
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    error: "Invalid JSON body",
                });
                return;
            } else {
                const allOrders = readJSON(endpoint);
                const id = uniqID();
                const createdAt = dateNow();
                const updatedAt = createdAt;
                const newOrder = {
                    id,
                    title,
                    amount,
                    status,
                    createdAt,
                    updatedAt,
                };
                allOrders.push(newOrder);
                writeJSON(endpoint, allOrders);
                sendResponse(res, statusCode.Created, newOrder);
                return;
            }
        } catch {
            sendResponse(res, statusCode.Bad_Request, {
                error: "Invalid JSON body",
            });
            return;
        }
    } else if (method === "PUT") {
        if (id === undefined) {
            sendResponse(res, statusCode.Bad_Request, {
                status: 400,
                error: "Bad Request",
                message: "Order id is required",
            });
            return;
        }
        try {
            let { title, amount, status } = await bodyParser(req);
            if (
                typeof title !== "string" ||
                typeof amount !== "number" ||
                amount <= 0 ||
                typeof status !== "string" ||
                !allowedStatuses.includes(status)
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    error: "Invalid JSON body",
                });
                return;
            } else {
                const allOrders = readJSON(endpoint);
                const putOrder = allOrders.find((o) => o.id === id);
                if (!putOrder) {
                    sendResponse(res, statusCode.Not_Found, {
                        message: `Order with id ${id} not found`,
                    });
                    return;
                }
                const newOrder = {
                    ...putOrder,
                    title,
                    amount,
                    status,
                    updatedAt: dateNow(),
                };
                const newOrders = allOrders.map((o) =>
                    o.id === id ? { ...newOrder } : o
                );
                writeJSON(endpoint, newOrders);
                sendResponse(res, statusCode.Ok, newOrder);
                return;
            }
        } catch {
            sendResponse(res, statusCode.Bad_Request, {
                message: "Invalid JSON body",
            });
            return;
        }
    } else if (method === "PATCH") {
        if (id === undefined) {
            sendResponse(res, statusCode.Bad_Request, {
                status: 400,
                error: "Bad Request",
                message: "Order id is required",
            });
            return;
        }
        try {
            let { title, amount, status } = await bodyParser(req);
            if (
                title === undefined &&
                amount === undefined &&
                status === undefined
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    status: 400,
                    error: "Bad Request",
                    message:
                        "Request body is empty. At least one field is required for update.",
                });
                return;
            }
            if (
                (title !== undefined && typeof title !== "string") ||
                (amount !== undefined &&
                    (typeof amount !== "number" || amount <= 0)) ||
                (status !== undefined &&
                    (typeof status !== "string" ||
                        !allowedStatuses.includes(status)))
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    error: "Invalid JSON body",
                });
                return;
            }
            const allOrders = readJSON(endpoint);
            const patchOrder = allOrders.find((o) => o.id === id);
            if (!patchOrder) {
                sendResponse(res, statusCode.Not_Found, {
                    status: 404,
                    error: "Not Found",
                    message: `Order with id ${id} not found`,
                });
                return;
            }
            const newOrder = {
                ...patchOrder,
                title: title === undefined ? patchOrder.title : title,
                amount: amount === undefined ? patchOrder.amount : amount,
                status: status === undefined ? patchOrder.status : status,
                updatedAt: dateNow(),
            };
            const newOrders = allOrders.map((o) =>
                o.id === id ? { ...newOrder } : o
            );
            writeJSON(endpoint, newOrders);
            sendResponse(res, statusCode.Ok, newOrder);
            return;
        } catch {
            sendResponse(res, statusCode.Bad_Request, {
                error: "Invalid JSON body",
            });
            return;
        }
    } else if (method === "DELETE") {
        if (id === undefined) {
            sendResponse(res, statusCode.Bad_Request, {
                message: "Order id is required",
            });
            return;
        }
        const allOrders = readJSON(endpoint);
        const exists = allOrders.findIndex((o) => o.id === id);
        if (exists === -1) {
            sendResponse(res, statusCode.Not_Found, {
                message: `Order with id ${id} not found`,
            });
            return;
        }
        const newOrders = allOrders.filter((o) => o.id !== id);
        writeJSON(endpoint, newOrders);
        sendResponse(res, statusCode.No_Content);
        return;
    } else {
        sendResponse(res, statusCode.Method_Not_Allowed, {
            message: "Method Not Allowed",
        });
    }
};

module.exports = ordersRoutes;
