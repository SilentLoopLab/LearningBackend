const path = require("node:path")
const fs = require('fs/promises');
const renamer = require("./renamer");

const renameFiles = async(dir) => {
    try {
        const dirPath = path.resolve(__dirname, dir);
        const files = await fs.readdir(dirPath);

        for (let i = 0; i < files.length; ++i) {
            const oldName = files[i];
            if (oldName.startsWith('.')) continue;
            const newName = renamer(oldName, i);
            const oldFullPath = path.join(dirPath, oldName);
            const newFullPath = path.join(dirPath, newName);

            await fs.rename(oldFullPath, newFullPath);
            console.log(`Successfull ${oldName}, ${newName}`);
        }
        console.log("All done");
    } catch(err) {
        console.error(`Something went wrong: ${err}`)
    }
}
renameFiles('./test-folder');