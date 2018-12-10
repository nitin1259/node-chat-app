const expect = require('expect');

const { Users } = require('./../utils/users');

describe('Users', () => {

    var users
    beforeEach(()=>{
        users = new Users();

        users.users = [
            {
                id:'1',
                name:'Mike',
                room: 'Node'
            },
            {
                id:'2',
                name:'Sam',
                room: 'React'
            },
            {
                id:'3',
                name:'Jane',
                room: 'Node'
            }
        ]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Nitin',
            room: 'office fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', ()=>{
        var remUser = users.users[2];
        var user = users.removeUser('3');
        expect(user).toEqual(remUser);
        expect(users.users.length).toEqual(2);
    });

    it('should not remove a user', ()=>{
        var user = users.removeUser('6');
        expect(user).toEqual(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should find user', ()=>{
        var user = users.getUser('1');
        expect(user).toEqual(users.users[0]);
    });

    it('should not find a user', ()=>{
        var user = users.getUser('6');
        expect(user).toNotExist();
        expect(user).toEqual(undefined);
    });

    it('should return the name for course Node', ()=>{
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Mike', 'Jane']);
    });

    it('should return the name for course React', ()=>{
        var userList = users.getUserList('React');

        expect(userList).toEqual(['Sam']);
    });
});