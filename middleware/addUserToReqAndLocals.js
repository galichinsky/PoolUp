const User = require('../models/user');

module.exports = async function(req, res, next) {
  req.user = req.session.user ? await User.findById(req.session.user._id) : null;
  res.locals.user = req.user;
  next();
};