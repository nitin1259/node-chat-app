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

// socket.on('newMessage', function (newMsg) {
//     console.log('New Message: ', newMsg);
// });

// socket.emit('createMessage', {
//     from: 'sachin.kumar@exaple.com',
//     text: 'This is going to be my first message create in chat app.'
// }, function callback(message) {
//     console.log('Got it', message);
// });

// introducing jquery 

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var msg = jQuery('[name=message-input]').val();

    socket.emit('createMessage', {
        from: 'Some User',
        text: msg,
    }, function callback(message) {
        console.log('Got it', message);
    });
    
});

socket.on('newMessage', function (newMsg) {
    console.log('New Message: ', newMsg);
    var li = jQuery('<li></li>');
    li.text(`${newMsg.from} : ${newMsg.text}`);

    jQuery('#messages').append(li);
});

// send location

const locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    console.log('sending lcoation...');
    if(!navigator.geolocation){
        return alert('GeoLocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('currentLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location');
    });

});

socket.on('newLocationMessage', function(newLocMsg){
    console.log(`from: ${newLocMsg.from} and url: ${newLocMsg.url}`)
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${newLocMsg.from}: `);
    a.attr('href', newLocMsg.url)
    li.append(a);
    jQuery('#messages').append(li);

});