const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const Auth = require('../middleware/auth');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'D:/New folder/Assessment/cvbuilder-FE/public');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + '-' + file.originalname);
    },
  }),
});

router.get('/get', UserController.getUsers);
router.post('/add', UserController.addUser);

router.use(Auth);
router.get('/get-userDetails', UserController.getUserDetails);
router.post('/add-basicDetails', UserController.addBasicDetails);
router
  .use(upload.single('picture'))
  .post('/add-userPhoto', UserController.uploadImage);

module.exports = router;
