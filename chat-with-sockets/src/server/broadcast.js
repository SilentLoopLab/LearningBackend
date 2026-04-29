const getAllUsers = require('./getAllUsers');

module.exports = (data) => {
    const allUsers =  getAllUsers();
    for (const [socket, userName] of allUsers) {
        socket.write(`${userName}: ${data}`);
    }
}