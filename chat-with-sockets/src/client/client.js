const net = require("node:net");
const PORT = 3001;
const IP = "localhost";
const client = net.createConnection({ host: IP, port: PORT }, () => {
    console.log("You are connected");
    client.write("Hi i'm client");
    client.on('data', (data) => {
        console.log(data.toString());
    })
});


