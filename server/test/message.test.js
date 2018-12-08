const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./../utils/message');

describe('Generate message', () => {
    it('should generate the correct message object', () => {
        var from = 'sachin';
        var text = 'this is in the generate message testing';

        var msg = generateMessage(from, text);

        expect(msg.createdAt).toBeA('number');
        expect(msg.from).toBe(from);
        expect(msg).toBeA(Object);
        expect(msg).toInclude({
            text,
            from
        })
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate the correct location url object', ()=>{
        const lat = 17, long = 78;
        const from = 'sehwag';
        const url = `https://www.google.com/maps?q=${lat},${long}`
        const msg = generateLocationMessage(from, lat, long);

        expect(msg.createdAt).toBeA('number');
        expect(msg).toBeA(Object);
        expect(msg.url).toBe(url);
    });
});