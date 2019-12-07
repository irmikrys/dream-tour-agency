const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

/**
 * @route   GET api/auth
 * @desc    Auth main route
 * @access  Protected
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    await res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send(`Server error: ${e.message}`);
  }
});

/**
 * @route   POST api/auth
 * @desc    Login user
 * @access  Public
 */
router.post('/', [
  check('email', 'Include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email: email});
    if (!user) {
      return res
        .status(400)
        .json({errors: [{msg: 'Invalid credentials'}]});
    }

    // password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res
        .status(400)
        .json({errors: [{msg: 'Invalid credentials'}]});
    }

    // return json-web-token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},
      (err, token) => {
        if (err) throw err;
        res.json({token});
      }
    );

  } catch (e) {
    console.log(e.message);
    res.status(500).send(`Server error: ${e.message}`);
  }

});

module.exports = router;
