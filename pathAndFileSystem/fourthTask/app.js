const path = require("node:path");
const readFile = require("../helpers/readFile");
const templateEngine = require("./template-engine");
const variable = require("./variable");
const writeFile = require("../helpers/writeFile");

const app = async () => {
    try {
        const { data, error } = await readFile(
            path.resolve("template.txt"),
            "utf-8",
        );
        if (!data) {
            console.error(error);
            return;
        }
        const newTemplate = templateEngine(data, variable);
        const writeResult = await writeFile(
            path.resolve(".", "new-template.txt"),
            newTemplate,
        );
        if (writeResult.error) {
            console.error(writeResult.error);
        }
        console.log(writeResult.data);
    } catch (err) {
        console.error(err);
    }
};
app();

module.exports = app;
