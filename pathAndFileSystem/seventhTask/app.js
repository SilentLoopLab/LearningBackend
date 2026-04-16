const directories = require("./directories");
const path = require("node:path");
const fs = require('fs/promises');

const createDir = async (directories) => {
    for (const dir of directories) {
        const absPath = path.resolve(__dirname, dir);

        try {
            await fs.mkdir(absPath, {recursive: true});
            console.log("Successful");
        } catch (err) {
            console.error("Something went wrong: err");
        }
    }
};

createDir(directories)