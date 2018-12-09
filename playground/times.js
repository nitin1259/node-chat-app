const moment = require('moment');

const date = moment();

console.log('date: ', date);
const someTimeStamp  = moment().valueOf();
console.log('someTimeStamp:', someTimeStamp)

console.log(date.format('MMM Do YYYY'));

date.add(5, 'years').subtract(10, 'months');
console.log(date.format('MMM Do, YYYY'));



// challenge - 1:09 am

const newDate = moment();

console.log(newDate.format('h:mm a'))

