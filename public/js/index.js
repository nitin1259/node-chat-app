const socket = io();

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server')
});

socket.on('newEmail', function (comingdata) {
    console.log('New Email...', comingdata);
});

socket.emit('createMail', {
    to: 'jane@example.com',
    text: 'Hey this is nitin!!!'
});

