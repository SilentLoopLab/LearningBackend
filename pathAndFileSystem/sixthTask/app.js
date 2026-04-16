const fs = require("fs").promises;
const path = require("path");
const parseAndValidate = require("./config-validator");

const configPath = path.resolve(__dirname, "config.env");
const REQUIRED_FIELDS = new Set(["PORT", "DB_URL", "API_KEY"]);

const app = async () => {
    try {
        const data = await fs.readFile(configPath, 'utf-8');
        const isValidate = parseAndValidate(data, REQUIRED_FIELDS);
        if (isValidate) {
            console.log("Successfull");
            return;
        }
        console.log('reject');
        return;
    } catch(err) {
        console.error(err);
        return;
    }
}
app()