const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    trim: true,
    validate: {
      isAsync: true,
      validator: (email) => {
        return validator.isEmail(email, {
          domain_specific_validation: true
        })
      },
      message: (props) => `Email ${props.value} is not valid.`
    }
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      isAsync: true,
      validator: (password) => {
        if (
          password.match(/[A-Z]+/) &&
          password.match(/[a-z]+/) &&
          password.match(/[0-9]+/) &&
          password.match(/\W+/)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    token: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }]
  // definir esquema del objeto de usuario
}, {
    strict: true
  });

UserSchema.methods.createAuthToken = function () {
  const user = this;

  const token = jwt.sign({
    _id: user._id,
    iat: Date.now() / 1000,
    exp: (Date.now() / 1000) + 60 * 60 * 22
  }, process.env.JWT_SECRET);

  user.tokens.push({
    token,
    type: 'auth'
  });

  return user.save().then(user => {
    return token;
  });
}

UserSchema.methods.toJSON = function () {
  const user = this;

  return _.pick(user, ['_id', 'username', 'email']);
}

UserSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    const verifiedPassword = await bcrypt.compare(password, user.password);
    if (verifiedPassword) {
      return user;
    }
  }
  return null;
};

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next();
    })
  } else {
    next();
  }
});

UserSchema.pre('update', function () {
  console.log('Actualizado')
  this.update({}, { $set: { updatedAt: new Date() } });
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
