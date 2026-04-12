const readFile = require("./readFile");
const writeFile = require("./writeFile");
const path = require("node:path");
const dataProcessor = require('./data-processor');

async function main() {
    const readPath = path.resolve(".", "input.json");
    const { data, error } = await readFile(readPath);
    if (error) {
        console.error(error);
        return;
    }
    const writePath = path.resolve(".", "newFile.json");
    const newData = dataProcessor(data);
    const writeResult = await writeFile(writePath, newData);
    if (writeResult.error) {
        console.error(error);
        return;
    }
    console.log(writeResult.data);
}

main();
