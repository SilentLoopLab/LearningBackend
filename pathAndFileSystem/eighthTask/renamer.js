const path = require('path');

module.exports = (filename, index) => {
    const prefix = 'work_';
    const extname = path.extname(filename);
    const basename = path.basename(filename, extname);

    return `${prefix}${index+1}_${basename}${extname}`;
}