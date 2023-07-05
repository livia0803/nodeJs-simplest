const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/health', (req, res) => res.json({ status: "OK" }));
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);

module.exports = router;