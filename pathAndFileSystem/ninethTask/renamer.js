const path = require("node:path");

module.exports = (absPath, destPath) => {
    const {name, ext} = path.parse(absPath);
    const newPath = path.resolve(destPath, `${name}_backup${ext}`);
    return newPath;
};
