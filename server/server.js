const path = require('path');
const express = require('express')
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

// app.get('/', (req,res)=>{
//     res.sendFile(path.join(publicPath, 'index.html'));
// })
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.on('disconnect', ()=>{
        console.log('Disconnect from client');
    })
})



server.listen(port, ()=>{
    console.log('chat app server starting on port', port);
})




// console.log(__dirname + '\..\\public');
// console.log(publicPath);

