const fs = require("node:fs/promises");
const path = require("node:path");
const generator = require("./generator");
const writeFile = require("../helpers/writeFile");
const createFile = async (file) => {
    try {
        const fileName = path.resolve(file);
        await writeFile(fileName, generator("My first Html"));
        console.log("File created");
    } catch (err) {
        console.error(err);
    }
};

createFile("index.html");
module.exports = createFile;