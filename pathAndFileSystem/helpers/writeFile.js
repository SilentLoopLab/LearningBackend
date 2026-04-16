const fs = require("node:fs/promises");

module.exports = async (absPath, data) => {
    try {
        await fs.writeFile(absPath, data);
        return { data: "successful", error: null };
    } catch (error) {
        return { data: null, error };
    }
};
