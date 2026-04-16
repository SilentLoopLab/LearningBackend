const fs = require("node:fs/promises");
const path = require("node:path");

const isTarget = (fileName, ext) => fileName.endsWith(ext);

const filterDir = async (dirPath, fileExt) => {
    try {
        const files = await fs.readdir(dirPath);
        const absoluteDir = path.resolve(dirPath);

        files.forEach((file) => {
            if (isTarget(file, fileExt)) {
                console.log(path.join(absoluteDir, file));
            }
        });
    } catch (err) {
        console.error(err);
    }
};

filterDir("../firstTask", ".js");
module.exports = filterDir;