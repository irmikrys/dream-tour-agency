const express = require('express');

const router = express.Router();

/**
 * @route   GET api/trips
 * @desc    Trips main route
 * @access  Public
 */
router.get('/', (req, res) => res.send('Trips route'));

module.exports = router;
