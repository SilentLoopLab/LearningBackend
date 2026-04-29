const getAllUsers = require('./getAllUsers');

module.exports = (name) => {
    const allUsers = getAllUsers();
    for(const [socket, userName] of allUsers) {
        if (name === userName) return socket;
    }
    return null;
}