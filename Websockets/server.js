const express = require("express");
const app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let messages = [];

app.use(express.static("./"));

app.get("/", function (req, res) {
    //index.html
    res.redirect("index.html");
});

server.listen(3000);

io.on('connection', function (socket) {
    for (let i in messages) {
        io.sockets.emit("display message", messages[i]);
    }
    
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);
    });
    
});