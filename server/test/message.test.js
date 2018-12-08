const expect = require('expect');

const { generateMessage } = require('./../utils/message');

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
})