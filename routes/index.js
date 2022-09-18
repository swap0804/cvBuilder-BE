const express = require('express');
const router = express.Router();
const user = require('./user');
const auth = require('./auth');
const experience = require('./experience');

router.use('/users', user);
router.use('/auth', auth);
router.use('/exp', experience);

module.exports = router;
