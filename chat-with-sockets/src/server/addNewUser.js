const getAllUsers = require('./getAllUsers');
const crypto = require('node:crypto');

module.exports = async (socket) => {
    const allUsers = getAllUsers();
    if (allUsers.has(socket)) return;
    const newName = `user${Date.now()}`;
    allUsers.set(socket, newName);
    console.log('user succesfuuly added');
}

