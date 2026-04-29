const getAllUsers = require('./getAllUsers');

module.exports = (userSocket) => {
    const allUsers = getAllUsers();
    for (const [socket, userName] of allUsers) {
        if (socket === userSocket) {
            return userName;
        }
    }
    return null;
}