const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const validator = require('mongoose-validator');

const emailValidate = validator({
  validator: 'isEmail',
  message: 'No es un email, payaso.'
});

const passValidate = validator({
  validator: 'isLength',
  arguments: [8],
  message: 'Must have at least 8 charachters'
});

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
    required: true,
    validate: passValidate
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    trim: true,
    validate: emailValidate
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
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next()
    })
  } else {
  }
});



const User = mongoose.model('user', UserSchema);

module.exports = User;