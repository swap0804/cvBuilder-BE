const bcrypt = require('bcrypt');
const Responder = require('../service/responder');
const { User, validate } = require('../models/user');
const BasicDetails = require('../models/basicDetails');
const WorkExperience = require('../models/workExperience');
const projects = require('../models/projects');
const skills = require('../models/skills');
const links = require('../models/links');

module.exports = {
  async getUsers(req, res) {
    try {
      const userDetails = await User.find({});
      return Responder.respondWithSuccess(
        req,
        res,
        userDetails,
        'User Details Fetched'
      );
    } catch (e) {
      console.log('error', e);
    }
  },

  async addUser(req, res) {
    try {
      const { error } = validate(req.body);
      if (error)
        return Responder.respondWithCustomError(
          req,
          res,
          error.details[0].message
        );
      const { email } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist)
        return Responder.respondWithCustomError(req, res, 'User Already Exist');
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        ...req.body,
        password: hashPassword,
      }).save();
      return Responder.respondWithSuccess(req, res, newUser, 'User added');
    } catch (e) {
      console.log('error', e);
    }
  },

  async getUserDetails(req, res) {
    try {
      let data = {};
      const userId = req.user._id;
      data.basicDetails = await BasicDetails.findOne({ userId });
      data.experience = await WorkExperience.find({ userId });
      data.project = await projects.find({ userId });
      data.skill = await skills.findOne({ userId });
      data.link = await links.findOne({ userId });
      return Responder.respondWithSuccess(
        req,
        res,
        data,
        'User details fetched'
      );
    } catch (e) {
      console.error(e);
    }
  },

  async addBasicDetails(req, res) {
    try {
      let user = await User.findOne({ _id: req.user._id });
      if (!user)
        return Responder.respondWithCustomError(req, res, 'User not found');
      let body = req.body;
      body.userId = user._id;
      let existingDetails = await BasicDetails.findOneAndUpdate(
        { userId: user._id },
        body,
        { new: true }
      );
      let details;
      console.log('ssss', body);
      if (existingDetails) details = existingDetails;
      else details = await new BasicDetails(body).save();
      return Responder.respondWithSuccess(
        req,
        res,
        details,
        'User details added'
      );
    } catch (e) {
      console.error(e);
    }
  },
};
