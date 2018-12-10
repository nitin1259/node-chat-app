[
    {
        id: 'kjdfas;dl23235klj;4jkl',
        name: 'Nitin',
        room: 'somerome'
    }
]

// addUser(id, name, room);
// removeUser(id)
// getUser(id);
// getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        // return the removed user
        var user = this.users.find(user => user.id === id);
        if (user) {
            this.users.splice(this.users.findIndex(el => el.id === id), 1);
            return user;
        }
    }
    getUser(id) {
        return this.users.find(user => user.id === id);
    }
    getUserList(room) {
        var userList = this.users.filter(user => user.room === room);
        var nameArr = userList.map(user => user.name);

        return nameArr;
    }
}


module.exports = {
    Users
}