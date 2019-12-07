const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
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

module.exports = router;
