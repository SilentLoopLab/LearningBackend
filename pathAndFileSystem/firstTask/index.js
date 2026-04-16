const readFile = require("../helpers/readFile");
const writeFile = require("../helpers/writeFile");
const path = require("node:path");
const dataProcessor = require("./data-processor");

const main = async () => {
    const readPath = path.resolve(".", "input.json");
    const { data, error } = await readFile(readPath, "utf-8");
    if (error) {
        console.error(error);
        return;
    }
    const writePath = path.resolve(".", "newFile.json");
    const newData = dataProcessor(JSON.parse(data));
    const writeResult = await writeFile(
        writePath,
        JSON.stringify(newData, null, 2),
    );
    if (writeResult.error) {
        console.error(error);
        return;
    }
    console.log(writeResult.data);
};

main();
module.exports = main;
