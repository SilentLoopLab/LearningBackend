const getAllUsers = require("./getAllUsers");
const addNewUser = require("./addNewUser");
const broadcast = require('./broadcast');
module.exports = async (socket) => {
    const allUsers = getAllUsers();
    if (allUsers.size >= 5)  {
        console.log(socket.end());
    }
    addNewUser(socket);
    socket.on('data', (data) => {
        const text = data.toString();
        console.log(text);
        broadcast(text);
    })
};
