const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorization = async (req, res, next) => {
  const token = req.headers['authorization'];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token,
      'tokens.type': 'auth'
    });

    if (!user) {
      throw new Error('Invalid user');
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).send(err.message || err);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin')
    return next();

  res.status(403).send('Ruta solo para administradores')
};

module.exports = { authorization, isAdmin };