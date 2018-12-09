const socket = io();

function scrollToBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-Child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight+ lastMessageHeight > scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

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

    var msgTextBox = jQuery('[name=message-input]');

    socket.emit('createMessage', {
        from: 'Some User',
        text: msgTextBox.val(),
    }, function callback(message) {
        console.log('Acknowledgement', message);
        msgTextBox.val(""); // clearing the thing after acknowledgement 
    });

});

socket.on('newMessage', function (newMsg) {
    console.log('New Message: ', newMsg);
    const timeStamp = moment(newMsg.createdAt).format('h:mm a');
    
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: newMsg.text,
        createdAt: timeStamp,
        from: newMsg.from
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // li.text(`${newMsg.from} ${timeStamp}: ${newMsg.text}`);
    // jQuery('#messages').append(li);
});

// send location

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    console.log('sending lcoation...');
    if (!navigator.geolocation) {
        return alert('GeoLocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location ...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('currentLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });

});

socket.on('newLocationMessage', function (newLocMsg) {
    console.log(`from: ${newLocMsg.from} and url: ${newLocMsg.url}`)
    const timeStamp = moment(newLocMsg.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: newLocMsg.url,
        createdAt: timeStamp,
        from: newLocMsg.from
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // li.text(`${newLocMsg.from} ${timeStamp}: `);
    // a.attr('href', newLocMsg.url)
    // li.append(a);
    // jQuery('#messages').append(li);

});