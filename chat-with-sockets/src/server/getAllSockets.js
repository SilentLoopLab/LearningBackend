const getAllUsers = require('./getAllUsers');

module.exports = () => {
    return getAllUsers().keys();
}