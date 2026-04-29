require("dotenv").config();
const net = require("node:net");
const PORT = process.env.PORT || 3001;
const IP = process.env.IP || 'localhost'
const handleConnection = require('./src/server/handleConnection');

const server = net.createServer(handleConnection);

server.listen(PORT, IP, () => {
    console.log(`server listen on ${IP}: ${PORT}`);
});
