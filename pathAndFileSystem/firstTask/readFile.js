const fs = require("node:fs/promises");

module.exports = async (path) => {
    try {
        const data = await fs.readFile(path, "utf-8");
        return { data: JSON.parse(data), error: null };
    } catch (error) {
        return { data: null, error };
    }
};
