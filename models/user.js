const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

let userSchema = new Schema(
  {
    userName: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: Number },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  });
  return token;
};

const User = mongoose.model('users', userSchema);

const validate = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label('User Name'),
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
    mobile: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
