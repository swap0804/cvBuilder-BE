const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const Auth = require('../middleware/auth');

router.get('/get', UserController.getUsers);
router.post('/add', UserController.addUser);

router.use(Auth);
router.get('/get-userDetails', UserController.getUserDetails);
router.post('/add-basicDetails', UserController.addBasicDetails);

module.exports = router;
