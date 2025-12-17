const fs = require("fs");
const path = require("path");

const uniqID = () => {
  const filePath = path.resolve(__dirname, "../../data/UUID.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(data);
  json.id += 1;
  fs.writeFileSync(
    filePath,
    JSON.stringify(json, null, 2),
    "utf-8"
  );

  return json.id.toString();
};

module.exports = uniqID;
