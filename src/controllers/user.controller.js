const UserValidator = require('../validators/user.validator');
const UserService = require('../services/user.services');

const getUsers = (req, res) => {
    const users = UserService.getUsers();
    res.send(users);
}

const getUser = (req, res) => {
    const id = req.params.id;
    const user = UserService.getUser(id);
    res.send(user);
}

const createUser = (req, res) => {
    const { error } = UserValidator.create.validate(req.body);
    if (error) { return res.status(400).send({ error: error.details[0].message }); }
    const user = UserService.createUser(req.body);
    res.send(user);
}
const updateUser = (req, res) => {
    const { error } = UserValidator.update.validate(req.body);
    if (error) { return res.status(400).send({ error: error.details[0].message }); }
    const user = UserService.updateUser(req.params.id, req.body);
    if (!user) { return res.status(404).send({ error: 'User not found' }); }
    res.send(user);
};

module.exports = {getUsers, getUser, createUser, updateUser };