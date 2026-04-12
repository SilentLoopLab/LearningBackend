const fs = require("node:fs/promises");

module.exports = async (path, data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(path, jsonData, "utf-8");
        return { data: "JSON written successfully", error: null };
    } catch (error) {
        return { data: null, error };
    }
};
