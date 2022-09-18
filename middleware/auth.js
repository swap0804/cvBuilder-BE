const JWT = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader)
    return res.status(401).json({
      status: false,
      message: 'Please re-login to use dashboard',
    });
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  if (!token)
    return res.status(401).json({
      status: false,
      message: 'Please re-login to use dashboard',
    });
  try {
    const decoded = JWT.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      // throw new Error()
      return res.status(401).json({
        status: false,
        message: 'Please re-login to use dashboard',
      });
    }

    next();
  } catch (error) {
    //if invalid token
    res.status(400).json({
      status: false,
      message: 'Please re-login to use dashboard',
    });
  }
};
