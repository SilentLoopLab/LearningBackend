require("dotenv").config();
const express = require("express");
const fs = require("node:fs").promises;
const path = require("node:path");
const statusCode = require("./statusCode");

const app = express();
const PORT = process.env.PORT || 3005;
const tasksFilePath = path.join(__dirname, "data", "tasks.json");

app.use(express.json());

const readTasks = async () => {
    try {
        const raw = await fs.readFile(tasksFilePath, "utf8");
        return JSON.parse(raw);
    } catch {
        return [];
    }
};

const writeTasks = async (tasks) => {
    const data = JSON.stringify(tasks, null, 2);
    await fs.writeFile(tasksFilePath, data, "utf8");
};

const dateNow = () => new Date(Date.now()).toISOString();

const hasRequiredFields = (task) =>
    task &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    typeof task.completed === "boolean";

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const tasks = await readTasks();
        if (id === undefined) {
            res.status(statusCode.Ok).json(tasks);
        } else {
            const task = tasks.find(t => t.id === id);
            if (task) {
                res.status(statusCode.Ok).json(task);
            } else {
                res.status(statusCode.Not_Found).json({
                    message: `Task with ${id} not found`
                })
            }
        }
    } catch {
        res.status(statusCode.Internal_Server_Error).json({
            message: "Read Error",
        });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const task = req.body;
        if (!hasRequiredFields(task)) {
            return res
                .status(statusCode.Bad_Request)
                .json({ message: "Invalid JSON body" });
        }

        const newTask = { ...task, createdAt: dateNow() };
        const tasks = await readTasks();
        if (tasks.some((t) => t.id === newTask.id)) {
            return res
                .status(statusCode.Bad_Request)
                .json({ message: "ID must be uniq" });
        }

        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(statusCode.Created).json(newTask);
    } catch {
        res.status(statusCode.Internal_Server_Error).json({
            message: "Failed to create task",
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updated = req.body;
        if (!hasRequiredFields(updated)) {
            return res
                .status(statusCode.Bad_Request)
                .json({ message: "Invalid JSON bodu" });
        }

        const tasks = await readTasks();
        const idx = tasks.findIndex((t) => t.id === id);
        if (idx === -1) {
            return res.status(statusCode.Not_Found).json({ message: "Bad ID" });
        }

        tasks[idx] = updated;
        await writeTasks(tasks);
        res.status(statusCode.Ok).json(updated);
    } catch {
        res.status(statusCode.Internal_Server_Error).json({
            message: "Task not updated",
        });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || typeof id !== "string") {
            return res
                .status(statusCode.Bad_Request)
                .json({ message: "Bad ID" });
        }

        const tasks = await readTasks();
        const idx = tasks.findIndex((t) => t.id === id);
        if (idx === -1) {
            return res
                .status(statusCode.Not_Found)
                .json({ message: "Task not found" });
        }

        tasks.splice(idx, 1);
        await writeTasks(tasks);
        res.status(statusCode.No_Content).send();
    } catch {
        res.status(statusCode.Internal_Server_Error).json({
            message: "Task not deleted",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
