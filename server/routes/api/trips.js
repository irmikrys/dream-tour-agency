const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isValidDate = require('../../utils/dateValidator');
const {check, validationResult} = require('express-validator');

const Trip = require('../../models/Trip');
const User = require('../../models/User');

/**
 * @route   GET api/trips
 * @desc    Trips main route
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    await res.json(trips);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/trips
 * @desc    Trips creation route
 * @access  Private
 */
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('country', 'Country is required').not().isEmpty(),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('startDate', 'Start date must be valid').custom(isValidDate),
  check('endDate', 'End date is required').not().isEmpty(),
  check('endDate', 'End date must be valid').custom(isValidDate),
  check('price', 'Price is required').not().isEmpty(),
  check('currency', 'Currency is required').not().isEmpty(),
  check('maxPlaces', 'Maximum number of places is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
]], async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('role -_id');
    if(user.role !== 'admin') {
      return res.status(400).json({msg: 'Only administrator can add a new trip', user})
    }
  } catch (e) {
    console.error(e.message);
    return res.status(500).send('Server error');
  }

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const {name, country, startDate, endDate, price, currency, maxPlaces, description} = req.body;
    const newTrip = new Trip({
      name,
      country,
      startDate,
      endDate,
      price,
      currency,
      maxPlaces,
      description,
      placesCount: maxPlaces,
    });
    await newTrip.save();
    await res.json(newTrip)
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
