const expect = require('expect');
const { isRealString } = require('./../validation/validation');


describe('testing the real string', () => {

    it('should reject non string value', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with empty spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('should allow string with non space character', () => {
        var res = isRealString('&*');
        expect(res).toBe(true);

        var res1 = isRealString('D');
        expect(res1).toBe(true);
    })
});