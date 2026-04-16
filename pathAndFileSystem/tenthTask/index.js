const data = require("./data");
const path = require("path");
const fs = require("fs/promises");
const writeFile = require("../helpers/writeFile");

const main = async (destPath) => {
    try {
        const destAbsPath = path.resolve(destPath);
        const { size } = await fs.stat(destAbsPath);
        if (size >= 1024) {
            throw new Error("Size of file is very big");
        }
        await writeFile(destAbsPath, JSON.stringify(data, null, 4));
    } catch (err) {
        console.error(`Something went wrong ${err}`);
        return;
    }
};

main("./output.json");
