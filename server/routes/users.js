const router = require('express').Router();
const User = require('../models/User');
const email = require('./email');
const { authorization, isAdmin } = require('../middlewares/authorization');

router.post('/', (req, res) => {
  new User(req.body).save().then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(400).send(err.message);
  });
});

router.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send('Invalid data.');

    const user = await User.findByCredentials(req.body);

    if (!user) {
      return res.status(401).send({
        message: 'Invalid credentials.'
      });
    }

    const token = await user.createAuthToken();

    res.header('Authorization', token).send(user);
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;