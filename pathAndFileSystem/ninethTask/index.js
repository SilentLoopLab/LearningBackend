const path = require("node:path");
const renamer = require("./renamer");
const fs = require("fs/promises");
const { secureHeapUsed } = require("node:crypto");
const main = async (srcPath, destPath) => {
    try {
        const srcAbsPath = path.resolve(srcPath);
        const destAbsPath = path.resolve(destPath);
        const newPath = renamer(srcAbsPath, destAbsPath);
        await fs.copyFile(srcAbsPath, newPath);
        console.log("Successfull");
    } catch (err) {
        console.error(`Something went wrong: ${err}`);
    }
};

main("./renamer.js", "./");
