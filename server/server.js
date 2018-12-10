const path = require('path');
const express = require('express')
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./validation/validation');
const { Users } = require('./utils/users');

app.use(express.static(publicPath));

// app.get('/', (req,res)=>{
//     res.sendFile(path.join(publicPath, 'index.html'));
// })
const server = http.createServer(app);

const io = socketIO(server);
const users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Disconnect from client');
        const user = users.removeUser(socket.id);

        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    });

    // socket.emit('newEmail', {
    //     from: 'nitin.singh@ca.com',
    //     subject: 'Something has to be done...',
    //     body: 'This is the part which has to go something in the body tag.'
    // });

    // socket.on('createMail', (newMail) => {
    //     console.log('New Mail : ', newMail);
    // })

    socket.on('join', (param, cb) => {
        if (!isRealString(param.name || !isRealString(param.room))) {
            return cb('Name and Room name are required !');
        }
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);

        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        // socket.leave('Developer');

        // io.emit -> io.to('room name').emit
        // socket.broadcast.emit -> socket.broadcast.to('room name').emit
        // socket.emit
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', 'New user joined'));

        cb();
    })

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (msg, callback) => {
        // console.log('New msg has been created, details: ', msg);
        const user = users.getUser(socket.id);

        if(user && isRealString(msg.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
        }
        callback({
            message: 'This msg is from server.'
        });
        // Broadcasting is the term for a emitting event to everybody but one specific user.
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createAt: new Date().getTime()
        // })

    });

    socket.on('currentLocationMessage', (latLongParam) => {
        const user = users.getUser(socket.id);

        if(user && isRealString(latLongParam.latitude) && isRealString(latLongParam.latitude)){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, latLongParam.latitude, latLongParam.longitude))
        }
    })

    // socket.emit('newMessage', {
    //     from: 'nitin.singh@exaple.com',
    //     text: 'New message has been emitted from the server for chat app',
    //     createAt: 12345
    // });
});



server.listen(port, () => {
    console.log('chat app server starting on port', port);
});




// console.log(__dirname + '\..\\public');
// console.log(publicPath);

