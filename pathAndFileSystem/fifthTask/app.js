const fs = require('fs').promises;
const path = require('path');
const timestep = require('./timestep');

const main = async (log) => {
    try {
    const timeLog = timestep(log);
    const absPath = path.resolve('.', 'log.txt');
    const data = await fs.appendFile(absPath, timeLog, 'utf-8');
    console.log(data);
    } catch (err) {
        console.error(err);
        return;
    }
}

main(/* every string*/'hello world');
module.exports = main;