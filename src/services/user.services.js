const _ = require('lodash');
let users = [];

class UserService {
    getUsers() {
        return users;
    }
    getUser(id) {
        const index = _.findIndex(users, u => u.id === parseInt(id));
        if (index === -1) {
            return {};
        }
        return users[index];
    }
    createUser(user) {
        user.id = users.length + 1;
        users.push(user);
        return user;
    }
    updateUser(id, user) {
        const index = _.findIndex(users, u => u.id == parseInt(id));
        if (index === -1) {
            return null;
        }
        users[index] = { id: parseInt(id), ...user };
        return users[index];
    }
}

module.exports = new UserService();