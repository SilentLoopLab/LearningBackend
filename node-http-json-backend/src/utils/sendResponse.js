
const sendResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  message === undefined ? res.end() : res.end(JSON.stringify(message));
  return;
}

module.exports = sendResponse;