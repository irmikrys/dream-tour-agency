const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const generateError = require('../../utils/errorsGenerator');

/**
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 */
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('surname', 'Surname is required').not().isEmpty(),
  check('email', 'Include a valid email').isEmail(),
  check('password', 'Enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {name, surname, email, password, role} = req.body;

  try {
    let user = await User.findOne({email: email});
    if (user) {
      return res.status(400).json(generateError('User already exists'));
    }

    user = new User({
      name,
      surname,
      email,
      password,
      role
    });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    await res.json({msg: 'User successfully created!'});

  } catch (e) {
    console.log(e.message);
    res.status(500).json(generateError(`Server error: ${e.message}`));
  }

});

module.exports = router;
