module.exports = function dateNow() {
  return new Date(Date.now()).toISOString();
}