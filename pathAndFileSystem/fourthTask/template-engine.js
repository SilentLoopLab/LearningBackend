const variable = require("./variable");
module.exports = (template, variables) => {
    return template.replace(/{{(.*?)}}/g, (match, key) => {
        const trimmedKey = key.trim();

        return variables[trimmedKey] !== undefined
            ? variables[trimmedKey]
            : match;
    });
};
