const readJSON = require("../utils/readJSON.js");
const writeJSON = require("../utils/writeJSON.js");
const sendResponse = require("../utils/sendResponse.js");
const statusCode = require("../constants/statusCode.js");
const uniqID = require("../utils/uniqID");
const bodyParser = require("../utils/bodyParser.js");
const dateNow = require("../utils/dateNow.js");

const productsRoutes = async (req, res, endpoint, id) => {
    const method = req.method;
    if (method === "GET") {
        const allProducts = readJSON(endpoint);
        if (id !== undefined) {
            const product = allProducts.find((p) => p.id === id);
            product
                ? sendResponse(res, statusCode.Ok, product)
                : sendResponse(res, statusCode.Not_Found, {
                      status: 404,
                      error: "Not Found",
                      message: `Product with id ${id} not found`,
                  });
            return;
        } else {
            sendResponse(res, statusCode.Ok, allProducts);
            return;
        }
    } else if (method === "POST") {
        try {
            let { title, price, inStock } = await bodyParser(req);
            if (
                typeof title !== "string" ||
                typeof price !== "number" ||
                typeof inStock !== "boolean"
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    error: "Invalid JSON body",
                });
                return;
            } else {
                const allProducts = readJSON(endpoint);
                const id = uniqID();
                const createdAt = dateNow();
                const updatedAt = createdAt;
                const newProduct = {
                    id,
                    title,
                    price,
                    inStock,
                    createdAt,
                    updatedAt,
                };
                allProducts.push(newProduct);
                writeJSON(endpoint, allProducts);
                sendResponse(res, statusCode.Created, newProduct);
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
                message: "Product id is required",
            });
            return;
        }
        try {
            let { title, price, inStock } = await bodyParser(req);
            if (
                typeof title !== "string" ||
                typeof price !== "number" ||
                typeof inStock !== "boolean"
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    error: "Invalid JSON body",
                });
                return;
            } else {
                const allProducts = readJSON(endpoint);
                const putProduct = allProducts.find((p) => p.id === id);
                if (!putProduct) {
                    sendResponse(res, statusCode.Not_Found, {
                        message: `Product with id ${id} not found`,
                    });
                    return;
                }
                const newProduct = {
                    ...putProduct,
                    title,
                    price,
                    inStock,
                    updatedAt: dateNow(),
                };
                const newProducts = allProducts.map((p) =>
                    p.id === id ? { ...newProduct } : p
                );
                writeJSON(endpoint, newProducts);
                sendResponse(res, statusCode.Ok, newProduct);
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
                message: "User id is required",
            });
            return;
        }
        try {
            let { title, price, inStock } = await bodyParser(req);
            if (
                typeof title !== "string" &&
                typeof price !== "number" &&
                typeof inStock !== "boolean"
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    error: "Invalid JSON body",
                });
                return;
            }
            const allProducts = readJSON(endpoint);
            const patchProduct = allProducts.find((p) => p.id === id);
            if (!patchProduct) {
                sendResponse(res, statusCode.Not_Found, {
                    status: 404,
                    error: "Not Found",
                    message: `Product with id ${id} not found`,
                });
                return;
            }
            const newProduct = {
                ...patchProduct,
                title: title ? title : patchProduct.title,
                price: price ? price : patchProduct.price,
                inStock: inStock === undefined ? patchProduct.inStock : inStock,
                updatedAt: dateNow(),
            };
            const newProducts = allProducts.map((p) =>
                p.id === id ? { ...newProduct } : p
            );
            writeJSON(endpoint, newProducts);
            sendResponse(res, statusCode.Ok, newProduct);
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
                message: "Product id is required",
            });
            return;
        }
        const allProducts = readJSON(endpoint);
        const exists = allProducts.findIndex((p) => p.id === id);
        if (exists === -1) {
            sendResponse(res, statusCode.Not_Found, {
                message: `Product with id ${id} not found`,
            });
            return;
        }
        const newProducts = allProducts.filter((p) => p.id !== id);
        writeJSON(endpoint, newProducts);
        sendResponse(res, statusCode.No_Content);
        return;
    } else {
        sendResponse(res, statusCode.Method_Not_Allowed, {
            message: "Method Not Allowed",
        });
    }
};

module.exports = productsRoutes;
