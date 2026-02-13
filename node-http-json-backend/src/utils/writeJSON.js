const fs = require("node:fs");
const path = require("node:path");

const writeJSON = (endpoint, data) => {
    const originalPath = path.resolve(__dirname, `../../data/${endpoint}.json`);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(originalPath, jsonData, "utf-8");
    return;
};

module.exports = writeJSON;