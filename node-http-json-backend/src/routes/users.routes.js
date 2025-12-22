const readJSON = require("../utils/readJSON.js");
const writeJSON = require("../utils/writeJSON.js");
const sendResponse = require("../utils/sendResponse.js");
const statusCode = require("../constants/statusCode.js");
const uniqID = require("../utils/uniqID");
const bodyParser = require("../utils/bodyParser.js");
const dateNow = require("../utils/dateNow.js");

const usersRoutes = async (req, res, endpoint, id) => {
    const method = req.method;
    if (method === "GET") {
        const allUsers = readJSON(endpoint);
        if (id !== undefined) {
            const user = allUsers.find((u) => u.id === id);
            user
                ? sendResponse(res, statusCode.Ok, user)
                : sendResponse(res, statusCode.Not_Found, {
                      status: 404,
                      error: "Not Found",
                      message: `User with id ${id} not found`,
                  });
            return;
        } else {
            sendResponse(res, statusCode.Ok, allUsers);
            return;
        }
    } else if (method === "POST") {
        try {
            let { name, email, role } = await bodyParser(req);
            if (typeof name !== "string" || typeof email !== "string") {
                sendResponse(res, statusCode.Bad_Request, {
                    error: "Invalid JSON body",
                });
                return;
            } else {
                role = role !== "user" && role !== "admin" ? "user" : role;
                const allUsers = readJSON(endpoint);
                if (allUsers.find((u) => u.email === email)) {
                    sendResponse(res, statusCode.Bad_Request, {
                        message: "Email must be unique",
                    });
                    return;
                } else {
                    const id = uniqID();
                    const createdAt = dateNow();
                    const updatedAt = createdAt;
                    const newUser = {
                        id,
                        name,
                        email,
                        role,
                        createdAt,
                        updatedAt,
                    };
                    allUsers.push(newUser);
                    writeJSON(endpoint, allUsers);
                    sendResponse(res, statusCode.Created, newUser);
                    return;
                }
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
                message: "User id is required",
            });
            return;
        }
        try {
            let { name, email, role } = await bodyParser(req);
            if (
                typeof name !== "string" ||
                typeof email !== "string" ||
                typeof role !== "string"
            ) {
                sendResponse(res, statusCode.Bad_Request, {
                    message: "Invalid JSON body",
                });
                return;
            } else {
                role = role !== "user" && role !== "admin" ? "user" : role;
                const allUsers = readJSON(endpoint);
                const putUser = allUsers.find((u) => u.id === id);
                if (!putUser) {
                    sendResponse(res, statusCode.Not_Found, {
                        message: `User with id ${id} not found`,
                    });
                    return;
                }
                const emailTaken = allUsers.some(
                    (u) => u.email === email && u.id !== id
                );
                if (emailTaken) {
                    sendResponse(res, statusCode.Bad_Request, {
                        message: "Email must be unique",
                    });
                    return;
                }
                const newUser = {
                    ...putUser,
                    name,
                    email,
                    role,
                    updatedAt: dateNow(),
                };
                const newUsers = allUsers.map((u) =>
                    u.id === id ? newUser : u
                );
                writeJSON(endpoint, newUsers);
                sendResponse(res, statusCode.Ok, newUser);
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
            let { name, email, role } = await bodyParser(req);
            if (!name && !email && !role) {
                sendResponse(res, statusCode.Bad_Request, {
                    status: 400,
                    error: "Bad Request",
                    message:
                        "Request body is empty. At least one field is required for update.",
                });
                return;
            }
            const allUsers = readJSON(endpoint);
            const patchUser = allUsers.find((u) => u.id === id);
            if (!patchUser) {
                sendResponse(res, statusCode.Not_Found, {
                    status: 404,
                    error: "Not Found",
                    message: `User with id ${id} not found`,
                });
                return;
            }
            if (email) {
                const emailTaken = allUsers.some(
                    (u) => u.email === email && u.id !== id
                );
                if (emailTaken) {
                    sendResponse(res, statusCode.Bad_Request, {
                        status: 400,
                        error: "Bad Request",
                        message: "Email must be unique",
                    });
                    return;
                }
            }
            const newUser = {
                ...patchUser,
                name: name ? name : patchUser.name,
                email: email ? email : patchUser.email,
                role:
                    role === undefined
                        ? patchUser.role
                        : role === "user" || role === "admin"
                        ? role
                        : patchUser.role,
                updatedAt: dateNow(),
            };
            const newUsers = allUsers.map((u) =>
                u.id === id ? { ...newUser } : u
            );
            writeJSON(endpoint, newUsers);
            sendResponse(res, statusCode.Ok, newUser);
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
                message: "User id is required",
            });
            return;
        }
        const allUsers = readJSON(endpoint);
        const exists = allUsers.findIndex((u) => u.id === id);
        if (exists === -1) {
            sendResponse(res, statusCode.Not_Found, {
                message: `User with id ${id} not found`,
            });
            return;
        }
        const newUsers = allUsers.filter((u) => u.id !== id);
        writeJSON(endpoint, newUsers);
        sendResponse(res, statusCode.No_Content);
        return;
    } else {
        sendResponse(res, statusCode.Method_Not_Allowed, {
            message: "Merhod Not Allowed",
        });
    }
};

module.exports = usersRoutes;
