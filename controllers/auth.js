const mongoose = require('mongoose');
const Responder = require('../service/responder');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('joi');

module.exports = {
  async login(req, res) {
    try {
      const { error } = validate(req.body);
      if (error)
        return Responder.respondWithCustomError(
          req,
          res,
          error.details[0].message
        );

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return Responder.respondWithCustomError(
          req,
          res,
          'Invalid Email or Password'
        );

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return Responder.respondWithCustomError(
          req,
          res,
          'Invalid Email or Password'
        );

      const token = user.generateAuthToken();
      return Responder.respondWithSuccess(
        req,
        res,
        { data: token },
        'logged in successfully'
      );
    } catch (e) {
      console.error('login error', e);
    }
  },
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};
