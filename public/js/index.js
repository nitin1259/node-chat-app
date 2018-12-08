const socket = io();

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server')
});

// socket.on('newEmail', function (comingdata) {
//     console.log('New Email...', comingdata);
// });

// socket.emit('createMail', {
//     to: 'jane@example.com',
//     text: 'Hey this is nitin!!!'
// });

socket.on('newMessage', function (newMsg) {
    console.log('New Message: ', newMsg);
});

// socket.emit('createMessage', {
//     from: 'sachin.kumar@exaple.com',
//     text: 'This is going to be my first message create in chat app.'
// });

