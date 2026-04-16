const fs = require("node:fs/promises");
module.exports = async (absPath, enc) => {
    try {
        const data = await fs.readFile(absPath, enc);
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
