const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    trim: true
  }
});

// Reescribimos el metodo toJSON de UserSchema para que devuelva un JSON sin la contraseña siempre. Utilizamos la libreria lodash y su método pick.
UserSchema.methods.toJSON = function () {
  const user = this;

  return _.pick(user, ['_id', 'username', 'email']);
};

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10).then(salt => {
      bcrypt.hash(user.password, salt).then(hash => {
        bcrypt.compare(user.password, hash).then(result => {
          console.log(result, user.password, hash);
          user.password = hash;
          next();
        })
      })
    })
  } else {
    next();
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;