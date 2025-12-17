const fs = require('node:fs');
const path = require('node:path');

function readJSON(endpoint) {
  const originalPath = path.resolve(__dirname, `../../data/${endpoint}.json`);
  try {
    const data = fs.readFileSync(originalPath, 'utf-8');
    if (!data.trim()) {
      fs.writeFileSync(originalPath, '[]', 'utf-8');
      return [];
    }
    return JSON.parse(data);
  } catch {
    fs.writeFileSync(originalPath, '[]', 'utf-8');
    return [];
  }
}

module.exports = readJSON;
